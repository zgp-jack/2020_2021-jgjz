import Taro, { Config, useEffect, useState, useRouter, useShareAppMessage } from '@tarojs/taro'
import { View, Text, Picker, Button, Image } from '@tarojs/components'
import CalendarModal from '../../components/attendanceModal';
import { bkgetExcelDataAction, bkGetProjectTeamAction, bkAddProjectTeamAction } from '../../utils/request/index';
import Msg from '../../utils/msg';
import { IMGCDNURL } from '../../config';
import CreateProject from '../../components/createProject';
import ProjectModal from '../../components/projectModal'
import { Type } from '../../config/store'
import './index.scss'

interface DateTyep {
  id:string|number,
  name:string|number,
  type?:{
    amount?:{
      num:string|number
    },
    borrow?:{
      borrow:string|number
    },
    hour?:{
      work_time: string,
      over_time: string,
    },
    work?:{
      work_time: string,
      over_time: string,
    }
  }
  amount:boolean,
  borrow:boolean,
  hour:boolean,
  work:boolean,
}
export default function AttendanceSheet() {
  // 月份
  const [date, setDate] = useState('');
  // 年
  const [year, setYear] = useState<string | number>('');
  //月
  const [month, setMonth] = useState('');
  const [fixedTab, setFixedTab] = useState<any[]>([])
  const [tebArr, setTabArr] = useState<any[]>([])
  const [data, setData] = useState<any>([{}, {}, {}])
  const [identity, setIdentity] = useState<number>(0)
  const [display, setDisplay] = useState<boolean>(false)
  // 班组长创建项目
  const [createProjectDisplay, setCreateProjectDisplay] = useState<boolean>(false)
  // 项目班组
  const [project, setProject] = useState<boolean>(false)
  // 日期需要的开始时间
  const [datestart, setDatestart] = useState<string>()
  // 日期需要的结束时间
  const [dateEnd, setdateEnd] = useState<string>()
  // 判断左边是否需要icon
  const [leftTime, setleftTime] = useState<boolean>(false)
  // 判断右边是否需要icon
  const [rightTime, setrightTime] = useState<boolean>(false)
  //判断是否追加
  const [additional, setAdditional] = useState<number>(0)
  // 弹框内容
  const [model, setModel] = useState<any>({
    groupName: '',
    teamName: '',
  })
  // 异常界面
  const [busy, setBusy] = useState<boolean>(false);
  // const [refresh, setRefresh] = useState<number>(0)
  // 一键对公
  const handleShare = () => {
    setDisplay(true)
  }
  // 取消
  const handleClose = () => {
    setDisplay(false)
  }
  const addZero = (num) => {
    if (parseInt(num) < 10) {
      num = '0' + num;
    }
    return num;
  }
  useEffect(() => {
    // 获取身份
    let type = Taro.getStorageSync(Type);
    setIdentity(type)
    // 进来获取本月数据
    const time = new Date();
    const newTime = time.getFullYear() + '-' + addZero(time.getMonth() + 1);
    const years = time.getFullYear();
    const months = addZero(time.getMonth() + 1);
    setYear(years)
    setMonth(months)
    // setDate(newTime);
    // getList(newTime)
    getDateList(newTime);
  }, [])
  const toFixedFn = (num:any)=>{
    let nums = num + '';
    if(nums.indexOf('.')+1>0){
      nums = nums.substring(0,nums.indexOf(".")+3);
    }
    return  Number(nums);
  }
  // 获取数据
  const getDateList = (newTime: string) => {
    let params = {
      date: newTime
    };
    bkgetExcelDataAction(params).then(res => {
      if (res.code === 200) {
        setBusy(false)
        let yeartime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(0,4));
        let montime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(5, 7));
        setdateEnd(yeartime+'-'+montime);
        if(!res.month){
          setDatestart(yeartime+'-'+montime);
          changeIcon(newTime,res.month)
        }else{
          setDatestart(res.month);
          changeIcon(newTime,res.month)
        }
        // 设置内容
        if (res.data.length > 0) {
          const curDate = new Date(newTime);
          /* 获取当前月份 */
          const curMonth = curDate.getMonth();
          /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
          curDate.setMonth(curMonth + 1);
          /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
          curDate.setDate(0);
          const day = curDate.getDate();
          //  设置第一列
          const dayArr: DateTyep[] = [];
          for (var k = 1; k <= day; k++) {
            let obj: any = {
              id: k,
              name: k,
              // default: true
            }
            dayArr.push(obj);
          }
          // 设置列表左边
          const defaultArr = [
            { id: 1, name: '工人',  },
            { id: 2, name: '记工类型' },
            { id: 3, name: '本月统计' },
          ]
          let arrObj = {
            list: dayArr,
          }
          let List: any[] = [];
          List.push(arrObj);
          const fixedTabObj = {
            list: defaultArr
          }
          // 左边第一行
          let leftArr: any[] = [];
          leftArr.push(fixedTabObj);
          // 右边第一行
          let rightArr: any[] = [];
          let firstArr: any = [];
          const item = JSON.parse(JSON.stringify(dayArr))
          for(let i =0;i<item.length;i++){
            item[i].default = true;
          }
          firstArr = item;
          let first = { list: firstArr };
          rightArr.push(first);
          // 日期
          // 工人
          let arr:any[]=[];
          let listArr:any[]=[];
          let numArr: any[] = [];
          let numDate:any[]=[];
          let jigongSum: any = [];
          let daySum: any = [];
          let workSum: any = [];
          let borrowNumSum: any = [];
          let hourNumList: any[] = [];
          let workNumList:any[] = [];
          if(res.data.length>0){
            for(let i =0;i<res.data.length;i++){
              let arrObj:any = {};
              let dayObj:any = {};
              let list:any[]=[];
              let dayList:any[]=[];
              let obj:any={};
              obj.id = res.data[i].id;
              obj.name = res.data[i].name;
              obj.default = true;
              let typeObj:any={};
              typeObj.type={};
              // 记工,包工(量),借支, 包工(天)
              let hourSumWork, hourSumTime, amountSum, borrowSum, workSumWork, workSumTime;
              // 右边内容
              const dayItem: DateTyep[] = JSON.parse(JSON.stringify(dayArr));
              // 遍历每一天
              // for (let j = 0; j < dayItem.length; j++) {
                // 记工
                if (res.data[i].hour.length > 0) {
                  typeObj.type.hour = true;
                  hourSumWork = res.data[i].hour.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.total.work_time), 0)
                  hourSumTime = res.data[i].hour.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.total.over_time), 0)
                  // for (let z = 0; z < res.data[i].hour.length;z++){
                  //   if (res.data[i].hour[z].date_num == dayItem[j].name){
                  //     let type:any = {
                  //       hour:{
                  //         work_time:'',
                  //         over_time:'',
                  //       }
                  //     };
                  //     type.hour.work_time = res.data[i].hour[z].total.work_time;
                  //     type.hour.over_time = res.data[i].hour[z].total.over_time;
                  //     dayItem[j].type = type;
                  //   }
                  // }
                }
                //  包工(量)
                if (res.data[i].amount.length > 0) {
                  typeObj.type.amount = true;
                  amountSum = res.data[i].amount.reduce((accumulator, currentValue) => accumulator + currentValue.list.length, 0);
                  // for (let z = 0; z < res.data[i].amount.length; z++) {
                  //   if (res.data[i].amount[z].date_num == dayItem[j].name) {
                  //     let type: any = {
                  //       amount: {
                  //         num: '',
                  //       }
                  //     };
                  //     type.amount.num = res.data[i].amount[z].list.length;
                  //     dayItem[j].type = type;
                  //   }
                  // }
                }
                //借支
                if (res.data[i].borrow.length > 0) {
                  typeObj.type.borrow = true;
                  borrowSum = toFixedFn(res.data[i].borrow.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.total.money), 0))
                  // for (let z = 0; z < res.data[i].borrow.length; z++) {
                  //   if (res.data[i].borrow[z].date_num == dayItem[j].name) {
                  //     let type: any = {
                  //       borrow: {
                  //         borrow: '',
                  //       }
                  //     };
                  //     type.borrow.borrow = res.data[i].borrow[z].total.money;
                  //     dayItem[j].type = type;
                  //   }
                  // }
                }
                // 包工(天)
                if (res.data[i].work.length > 0) {
                  typeObj.type.work = true
                  workSumWork = res.data[i].work.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.total.work_time), 0)
                  workSumTime = res.data[i].work.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.total.over_time), 0)
                  // for (let z = 0; z < res.data[i].work.length; z++) {
                  //   if (res.data[i].work[z].date_num == dayItem[j].name) {
                  //     let type: any = {
                  //       work: {
                  //         work_time: '',
                  //         over_time: '',
                  //       }
                  //     };
                  //     type.work.work_time = res.data[i].work[z].total.work_time;
                  //     type.work.over_time = res.data[i].work[z].total.over_time;
                  //     dayItem[j].type = type;
                  //   }
                  // }
                }
              // }
              for (let j = 0; j < dayItem.length; j++) {
                if (res.data[i].hour.length > 0) {
                  for (let z = 0; z < res.data[i].hour.length; z++) {
                    if (res.data[i].hour[z].date_num == dayItem[j].name) {
                      let type: any = {
                        hour: {
                          work_time: '',
                          over_time: '',
                        }
                      };
                      if (dayItem[j].type) {
                        const data = JSON.parse(JSON.stringify(dayItem[j]));
                        if (data.type) {
                          // data.type.amount.num = res.data[i].amount[z].list.length;
                          data.type.hour.work_time = parseFloat(res.data[i].hour[z].total.work_time);
                          data.type.hour.over_time = parseFloat(res.data[i].hour[z].total.over_time);
                          dayItem[j] = data;
                        }
                      } else {
                        type.hour.work_time = parseFloat(res.data[i].hour[z].total.work_time);
                        type.hour.over_time = parseFloat(res.data[i].hour[z].total.over_time);
                        dayItem[j].type = type;
                      }
                      // type.hour.work_time = res.data[i].hour[z].total.work_time;
                      // type.hour.over_time = res.data[i].hour[z].total.over_time;
                      // dayItem[j].type = type;
                    }
                  }
                }
                if (res.data[i].amount.length > 0) {
                  for (let z = 0; z < res.data[i].amount.length; z++) {
                    if (res.data[i].amount[z].date_num == dayItem[j].name) {
                      let type: any = {
                        amount: {
                          num: '',
                        }
                      };
                      if (dayItem[j].type){
                        if (dayItem[j].type){
                          const data = JSON.parse(JSON.stringify(dayItem[j]))
                          type.amount.num = res.data[i].amount[z].list.length;
                          data.type.amount = type.amount;
                          dayItem[j] = data;
                        }
                      }else{
                        type.amount.num = res.data[i].amount[z].list.length;
                        dayItem[j].type = type;
                      }
                    }
                  }
                }
                if (res.data[i].borrow.length > 0) {
                  for (let z = 0; z < res.data[i].borrow.length; z++) {
                    if (res.data[i].borrow[z].date_num == dayItem[j].name) {
                      let type: any = {
                        borrow: {
                          borrow: '',
                        }
                      };
                      if (dayItem[j].type) {
                        if (dayItem[j].type) {
                          const data = JSON.parse(JSON.stringify(dayItem[j]))
                          type.borrow.borrow = toFixedFn(parseFloat(res.data[i].borrow[z].total.money));
                          data.type.borrow = type.borrow;
                          dayItem[j] = data;
                        }
                      } else {
                        type.borrow.borrow = toFixedFn(parseFloat(res.data[i].borrow[z].total.money));
                        dayItem[j].type = type;
                      }
                    }
                  }
                }
                if (res.data[i].work.length > 0) {
                  for (let z = 0; z < res.data[i].work.length; z++) {
                    if (res.data[i].work[z].date_num == dayItem[j].name) {
                      let type: any = {
                        work: {
                          work_time: '',
                          over_time: '',
                        }
                      };
                      if (dayItem[j].type) {
                        if (dayItem[j].type) {
                          const data = JSON.parse(JSON.stringify(dayItem[j]))
                          type.work.work_time = parseFloat(res.data[i].work[z].total.work_time);
                          type.work.over_time = parseFloat(res.data[i].work[z].total.over_time);
                          data.type.work = type.work;
                          dayItem[j] = data;
                        }
                      } else {
                        type.work.work_time = parseFloat(res.data[i].work[z].total.work_time);
                        type.work.over_time = parseFloat(res.data[i].work[z].total.over_time);
                        dayItem[j].type = type;
                      }
                    }
                  }
                }
              }
              const lastDay = JSON.parse(JSON.stringify(dayArr));
              let numHour, numWork, numBorrow, numAmount;
              for(let b =0;b<lastDay.length;b++){
                // 记工
                if(res.data[i].work.length>0){
                  for (let n = 0; n < res.data[i].work.length; n++) {
                    if (res.data[i].work[n].date_num == lastDay[b].name) {
                      numWork = true
                      if (res.data[i].work[n].list) {
                        let work:any= {
                            work_time: '',
                            over_time: '',
                          }
                        work.work_time = res.data[i].work[n].list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.work_time), 0)
                        work.over_time = res.data[i].work[n].list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.over_time || 0), 0)
                        let obj = {
                          name: lastDay[b].name,
                          work_time: res.data[i].work[n].list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.work_time), 0),
                          over_time: res.data[i].work[n].list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.over_time || 0), 0)
                        }
                        workNumList.push(obj)
                        if (lastDay[b].type) {
                          const data = JSON.parse(JSON.stringify(lastDay[b].type));
                          // data.type.work.work_time = hour;
                          // data.type.work.over_time = time;
                          data.hour = work;
                          lastDay[b] = data;
                        } else {
                          let type = {
                            work: {
                              work_time: '',
                              over_time: '',
                            }
                          }
                          type.work.work_time = res.data[i].work[n].list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.work_time || 0), 0);
                          type.work.over_time = res.data[i].work[n].list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.over_time || 0), 0)
                          lastDay[b].type = type;
                        }
                      }
                    }
                  }
                }
                // 记天
                if (res.data[i].hour.length > 0) {
                  for(let n=0;n<res.data[i].hour.length;n++){
                    if (res.data[i].hour[n].date_num == lastDay[b].name){
                      numHour = true;
                      if (res.data[i].hour[n].list){
                        let hour: any = {
                          work_time: '',
                          over_time: '',
                        }
                        for(let j=0;j<res.data[i].hour.length;j++){
                        }
                        hour.work_time = res.data[i].hour[n].list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.work_time), 0)
                        hour.over_time = res.data[i].hour[n].list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.over_time||0), 0);
                        let obj = {
                          name: lastDay[b].name,
                          work_time: res.data[i].hour[n].list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.work_time), 0),
                          over_time: res.data[i].hour[n].list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.over_time || 0), 0)
                        }
                        hourNumList.push(obj)
                        if (lastDay[b].type){
                          const data = JSON.parse(JSON.stringify(lastDay[b].type));
                          data.hour = hour;
                          lastDay[b] = data;
                        }else{
                          let type = {
                            hour:{
                              work_time: '',
                              over_time: '',
                            }
                          }
                          type.hour.work_time = res.data[i].hour[n].list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.work_time || 0), 0);
                          type.hour.over_time = res.data[i].hour[n].list.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.over_time || 0), 0)
                          lastDay[b].type = type;
                        }
                      }
                    }
                  }
                }
                // 按量
                if(res.data[i].amount.length>0){
                  for (let n = 0; n < res.data[i].amount.length; n++) {
                    if (res.data[i].amount[n].date_num == lastDay[b].name) {
                      numAmount = true
                      if (res.data[i].amount[n].list) {
                        let amount: any = {
                          num: '',
                        }
                        amount.num = res.data[i].amount.reduce((accumulator, currentValue) => accumulator + (currentValue.list.length || 0), 0)
                        if (lastDay[b].type) {
                          const data = JSON.parse(JSON.stringify(lastDay[b]));
                          data.type.amount = amount;
                          lastDay[b] = data;
                        }else{
                          let type:any = {
                            amount: {
                              num:'',
                            }
                          }
                          type.amount.num = res.data[i].amount.reduce((accumulator, currentValue) => accumulator + (currentValue.list.length || 0), 0)
                          lastDay[b].type = type;
                        }
                      }
                    }
                  }
                }
                // 借支
                if (res.data[i].borrow.length > 0) {
                  for (let n = 0; n < res.data[i].borrow.length; n++) {
                    if (res.data[i].borrow[n].date_num == lastDay[b].name) {
                      numBorrow = true;
                      if (res.data[i].borrow[n].list) {
                        let borrowList:any = {
                          borrow: '',
                        }
                        borrowList.borrow = res.data[i].borrow[n].list.reduce((accumulator, currentValue) => accumulator + (currentValue.money || 0), 0)
                        if (lastDay[b].type) {
                          const data = JSON.parse(JSON.stringify(lastDay[b].type));
                          data.borrow = borrowList;
                          lastDay[b] = data;
                        } else {
                          let type: any = {
                            borrow: {
                              borrow: '',
                            }
                          }
                          type.borrow.borrow = res.data[i].borrow[n].list.reduce((accumulator, currentValue) => accumulator + (currentValue.money.length || 0), 0)
                          lastDay[b].type = type;
                        }
                      }
                    }
                  }
                }
              }
              let lastObj = [
                {id:1,name:'总计'},
                { id: 1, type:{
                  hour: numHour,
                  work: numWork,
                  borrow: numBorrow,
                  num: numAmount,
                } },
                {
                  hour: {
                    work_time: hourSumWork,
                    over_time: hourSumTime,
                  },
                  work: {
                    work_time: workSumWork,
                    over_time: workSumTime,
                  },
                  borrow: {
                    borrow: borrowSum
                  },
                  amount: {
                    num: amountSum
                  }
                }
              ]
              let sumObj={
                hour:{
                  work_time: hourSumWork,
                  over_time: hourSumTime,
                },
                work:{
                  work_time: workSumWork,
                  over_time: workSumTime,
                },
                borrow:{
                  borrow: borrowSum
                },
                amount:{
                  num: amountSum
                }
              }
              list.push(obj, typeObj, sumObj);
              arrObj.list = list;
              arrObj.type ={
                hour: false,
                borrow: false,
                amount: false,
                work: false,
              }
              // dayList.push(dayItem);
              dayObj.list = dayItem;
              dayObj.type={
                hour:false,
                borrow:false,
                amount:false,
                work:false,
              };
              for(let z=0;z<dayItem.length;z++){
                if(dayItem[z].type){
                  if (dayItem[z].type.hour){
                    dayObj.type.hour = true;
                    arrObj.type.hour = true
                  }
                  if (dayItem[z].type.borrow) {
                    dayObj.type.borrow = true
                    arrObj.type.hour = true
                  }
                  if (dayItem[z].type.amount) {
                    dayObj.type.amount = true
                    arrObj.type.hour = true
                  }
                  if (dayItem[z].type.work) {
                    dayObj.type.work = true
                    arrObj.type.hour = true
                  }
                }
              }
              // numArr =
              let numObj={
                list: lastObj
              }
              let numDateObj={
                list: lastDay,
                type:{
                  hour: numHour,
                  work: numWork,
                  borrow: numBorrow,
                  num: numAmount,
                }
              }
              numDate = [numDateObj]
              numArr = [numObj];
              arr.push(arrObj);
              listArr.push(dayObj);
            };
          }
          const Item = JSON.parse(JSON.stringify(dayArr));
          console.log(hourNumList,'hourNumList');
          console.log(workNumList,'workNumList')
          for(let i =0;i<Item.length;i++){
            if (hourNumList.length>0){
              for (let j = 0; j < hourNumList.length;j++){
                if(Item[i].name == hourNumList[j].name){
                  let type = {
                    hour: {
                      work_time: '',
                      over_time: '',
                    }
                  }
                  const work = hourNumList.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.work_time), 0);
                  const over = hourNumList.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.over_time), 0);
                  // Item[i].type.work_time = work;
                  // Item[i].type.over_time = over;
                  type.hour.work_time = work;
                  type.hour.over_time = over;
                  if(Item[i].type){
                    const data = JSON.parse(JSON.stringify(Item[i].type));
                    data.hour = type.hour;
                    console.log(Item[i],'Item[i]Item[i]')
                    Item[i] = data;
                  }else{
                    Item[i].type = type;
                  }
                }
              }
            }
            if (workNumList.length > 0) {
              for (let j = 0; j < workNumList.length; j++) {
                if (Item[i].name == workNumList[j].name) {
                  let type = {
                    work: {
                      work_time: '',
                      over_time: '',
                    }
                  }
                  const work = workNumList.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.work_time), 0);
                  const over = workNumList.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.over_time), 0);
                  // Item[i].type.work_time = work;
                  // Item[i].type.over_time = over;
                  type.work.work_time = work;
                  type.work.over_time = over;
                  if (Item[i].type) {
                    const data = JSON.parse(JSON.stringify(Item[i].type));
                    data.work = type.work;
                    Item[i] = data;
                  } else {
                    Item[i].type = type;
                  }
                }
              }
            }
          }
          console.log(Item,'Item')
          // 本月统计
          // 获取身份
          let type = Taro.getStorageSync(Type);
          if(type === 1){
            setFixedTab([...leftArr, ...arr]);
            setTabArr([...rightArr, ...listArr]);
          }else{
            setFixedTab([...leftArr, ...arr]);
            setTabArr([...rightArr, ...listArr]);
          }
          // 设置里面的内容
        }
      } else {
        Msg(res.msg)
      }
    })
      .catch((e) => {
        setleftTime(false);
        setrightTime(false);
        setBusy(true)
        setleftTime(false);
        setrightTime(false);
      })
  }
  // 设置时间
  const handleTime = (e) => {
    if (busy) return;
    const time = e.detail.value;
    setFixedTab([]);
    setTabArr([]);
    setYear(e.detail.value.slice(0, 4));
    setMonth(e.detail.value.slice(5, 8));
    getDateList(time);
  }
  const changeIcon = (e,earliest_month) => {
    let yeartime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(0, 4));
    let montime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(5, 7));
    if (!earliest_month) {
      setleftTime(false);
      setrightTime(false);
    } else {
      if (yeartime == Number(earliest_month.split('-')[0])) {
        if (Number(earliest_month.split('-')[1]) == montime) {
          setleftTime(false);
          setrightTime(false);
        } else {
          if (Number(e.split('-')[1]) == Number(earliest_month.split('-')[1])) {
            setrightTime(true);
            setleftTime(false);
          } else if (Number(e.split('-')[1]) == montime) {
            setrightTime(false);
            setleftTime(true);
          } else {
            setrightTime(true);
            setleftTime(true);
          }
        }
      } else {
        if (Number(earliest_month.split('-')[0]) == Number(e.split('-')[0])) {
          setrightTime(true);
          Number(e.split('-')[1]) > Number(earliest_month.split('-')[1]) ? setleftTime(true) : setleftTime(false);
        } else if (Number(e.split('-')[0]) == yeartime) {
          setleftTime(true);
          Number(e.split('-')[1]) < montime ? setrightTime(true) : setrightTime(false);
        } else {
          setleftTime(true);
          setrightTime(true);
        }
      }
    }
  }
  // 跳转
  const userRouteJump = (url: string) => {
    Taro.navigateTo({
      url: url
    })
  }
  useShareAppMessage(() => {
    
    let type = Taro.getStorageSync(Type);
    return {
      // title: '记工记账',
      title: '记工记账怕丢失？用鱼泡网记工，方便安全！数据永不丢失~',
      path: `/pages/share/index?time=${month}&identity=${type}`
    }
  })
  // 跳转
  const handleJump = () => {
    bkGetProjectTeamAction({}).then(res => {
      if (res.data.length === 0) {
        setCreateProjectDisplay(true)
      } else {
        let type = Taro.getStorageSync(Type);
        userRouteJump(`/pages/recorder/index?type=${type}`)
      }
    })
  }
  // 关闭创建项目
  const handleCreateProjectClose = () => {
    setCreateProjectDisplay(false)
    setModel({ groupName: '', teamName: '' })
  }
  // 弹框输入
  const handleInput = (type: string, e) => {
    let data = JSON.parse(JSON.stringify(model));
    data[type] = e.detail.value;
    setModel(data);
  }
  // 确认弹框
  const handleAddProject = () => {
    let params = {
      group_name: model.groupName,
      team_name: model.teamName,
    }
    bkAddProjectTeamAction(params).then(res => {
      if (res.code === 200) {
        setProject(false);
        setModel({ groupName: '', teamName: '' })
        let type = Taro.getStorageSync(Type);
        userRouteJump(`/pages/recorder/index?type=${type}`)
      } else {
        Msg(res.msg);
        return;
      }
    })
  }
  // 填写项目返回上一步
  const handleBack = () => {
    setProject(false)
    setCreateProjectDisplay(true)
  }
  // 分享
  return (
    <View className='AttendanceSheetContent'>
      <View className='top'>
        <View className='top-time'>
          <Picker
            mode='date'
            fields='month'
            onChange={(e) => handleTime(e)}
            value={''}
          >
            <View>{year}年
              <Image src={`${IMGCDNURL}greyLeft.png`} className='leftIcon' style={{ visibility: leftTime ? 'visible' : 'hidden' }} />
              {month}月
              <Image className='righticon' src={`${IMGCDNURL}greyRight.png`} style={{ visibility: rightTime ? 'visible' : 'hidden' }} />
            </View>
          </Picker>
        </View>
        <View>以下是你的记工，点击可查看详情</View>
      </View>
      {/* {tebArr.length>2&& */}
      <View>
        {busy &&
          <View className='busyBox'>
            <View>系统繁忙，刷新试试</View>
            <View className='refresh' onClick={() => getDateList(year + '-' + month)}>刷新</View>
          </View>
        }
        {!busy &&
          <View className='box'>
            {/* 左边固定 */}
          <View className='borderBottom'>
            {fixedTab.map(v => (
              <View className='box-left'>
                {v.list.map(val => (
                  <View className='middle'>
                    {!val.type && (!val.hour || !val.work || !val.borrow || !val.amount) && <View className={val.default && (!v.type.hour || !v.type.work || !v.type.borrow || !v.type.amount) ? 'box-none' : 'box-list-default'}>
                      <View className={(((v.type.hour && (!v.type.work) && (!v.type.borrow) && (!v.type.amount)|| (!v.type.amount)))) || ((v.type.work && (!v.type.hour) && (!v.type.borrow) || (!v.type.amount)) || ((v.type.borrow && (!v.type.work) && (!v.type.hour) || (!v.type.amount))) || ((v.type.amount && (!v.type.work) && (!v.type.borrow) || (!v.type.hour))))?'':'mt20'}>{val.name}</View>
                      {val.default &&
                        <View open-type="share">
                          <Button className='blued' open-type="share">
                            微信对工
                        </Button>
                        </View>
                      }
                    </View>}
                    {val.type && <View>
                      <View className='box-list-type'>
                        {val.type.hour && <View className='box-height'>点工</View>}
                        {val.type.work && <View className='box-list-bao'>包工<View>（按天记）</View></View>}
                        {val.type.amount && <View className='box-list-bao'>包工<View>（按量记）</View></View>}
                        {val.type.borrow && <View className='box-height'>借支</View>}
                      </View>
                    </View>}
                    {!val.type && (val.hour || val.work || val.borrow || val.amount) && <View>
                      {JSON.stringify(val.hour) !== '{}' && <View className='box-list'>
                        <View>{val.hour.work_time}{val.hour.work_time||'0'?'个工':''}</View>
                        <View>{val.hour.over_time}{val.hour.over_time||'0' ? '小时' : ''}</View>
                      </View>}
                      {JSON.stringify(val.work) !== '{}' && <View className='box-list-bao'>
                        <View>{val.work.work_time}{val.work.work_time||'0' ? '个工' : ''}</View>
                        <View>{val.work.over_time}{val.work.over_time||'0' ? '小时' : ''}</View>
                      </View>}
                      {JSON.stringify(val.amount) !== '{}' && <View className='box-height'>
                        <View>{val.amount.num}{val.amount.num?'笔':''}</View>
                      </View>}
                      {JSON.stringify(val.borrow) !== '{}' && <View className='box-height'>
                        <View>{val.borrow.borrow}</View>
                      </View>}
                    </View> }
                  </View>
                ))}
              </View>
            ))}
            </View>
            {/* <View>
              {fixedTab.map(v => (
                <View className='box-left'>
                  {v.list.map(val => (
                    <View className='box-border'>
                      {!val.type && <View className={val.default ? 'box-list-default' : 'box-list'}>
                        <View className='name'>{val.name}</View>
                        {!val.default &&
                          <View open-type="share">
                            <Button className='blued' open-type="share">
                              微信对工
                        </Button>
                          </View>
                        }
                      </View>}
                      {val.type &&
                        <View className='box-list-type'>
                          {val.type.hour && <View className='box-list'>点工</View>}
                          {val.type.work && <View className='box-list-bao'>包工<View>（按天记）</View></View>}
                          {val.type.amount && <View className='box-list-bao'>包工<View>（按量记）</View></View>}
                          {val.type.borrow && <View className='box-list'>借支</View>}
                        </View>
                      }
                    </View>
                  ))}
                </View>
              ))}
            </View> */}
            {/* 右边 */}
            <View className='box-scroll'>
              {tebArr.map(v => (
                <View className='box-right'>
                  {v.list.map(val => (
                    <View className='border'>
                      {val.default && <View className='box-list-default'>{val.name}</View>}
                      {/* {!val.default && !val.type && <View className='box-height'></View>} */}
                      {val.type &&<View>
                        {val.type.hour && v.type.hour?
                          <View className='box-list-bao'>
                            <View>{val.type.hour.work_time}{val.type.hour.work_time||'0'?'个工':''}</View>
                            <View>{val.type.hour.over_time}{val.type.hour.over_time||'0' ? '小时' : ''}</View>
                          </View>:
                          <View>{v.type.hour && <View className='box-list-bao'></View>}</View>
                        }
                        {val.type.work && v.type.work ?
                          <View className='box-list-bao'>
                            <View>{val.type.work.work_time}{val.type.work.work_time||'0' ? '个工' : ''}</View>
                            <View>{val.type.work.over_time}{val.type.work.over_time||'0' ? '小时' : ''}</View>
                          </View>:
                          <View>{v.type.work && <View className='box-list-bao'></View>}</View>
                        }
                        {val.type.amount && v.type.amount ?
                          <View className='box-height'>
                          <View>{val.type.amount.num}{val.type.amount.num?'笔':''}</View>
                          </View>:
                          <View>{v.type.amount && <View className='box-list-bao'></View>}</View>
                        }
                        {val.type.borrow && v.type.borrow ?
                          <View className='box-height'>
                            <View>{val.type.borrow.borrow}</View>
                          </View>:
                          <View>{v.type.borrow && <View className='box-list-bao'></View>}</View>
                        }
                      </View>}
                      {!val.type && v.type.hour && <View className='box-list-bao'></View>}
                      {!val.type && v.type.work && <View className='box-list-bao'></View>}
                      {!val.type && v.type.amount && <View className='box-list-bao'></View>}
                      {!val.type && v.type.borrow && <View className='box-list-bao'></View>}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        }
      </View>
      {
        !busy && tebArr.length <= 1 && <View className='noData'>暂无数据哦～</View>
      }
      {!busy && tebArr.length > 1 &&
        <View className='footer-btn'>
          <View className='footer-btn-box'>
            <View className='footer-btn-box-left'
            //  onClick={handleShare}
            >
              {/* <View>分享给微信好友</View> */}
              <Button open-type="share" className='shareBtn'>分享给微信好友</Button>
              {/* <View className='footer-btn-box-left-title'>发送到工人微信群快速对工</View> */}
            </View>
            <View className='footer-btn-box-right' onClick={handleJump}>
              <View>记工</View>
              <View className='footer-btn-box-right-title'>(点工 包工 借支)</View>
            </View>
          </View>
        </View>
      }
      {
        !busy && tebArr.length <= 1 && <View className='btnBox'>
          <View className='btn' onClick={handleJump}>
            <View>记工<Text className='title'>(点工 包工 借支)</Text></View>
          </View>
        </View>
      }
      <CalendarModal display={display} handleClose={handleClose} />
      {/* 创建项目 */}
      <CreateProject display={createProjectDisplay} handleClose={handleCreateProjectClose} val={model && model.groupName} handleSubmit={() => { setCreateProjectDisplay(false), setProject(true) }} handleInput={handleInput} />
      {/* 填写班组 */}
      <ProjectModal display={project} handleSubmit={handleAddProject} handleInput={handleInput} teamName={model && model.teamName} handleBack={handleBack} handleClose={() => { setProject(false), setModel({ groupName: '', teamName: '' }) }} />
    </View>
  )
}

AttendanceSheet.config = {
  navigationBarTitleText: '考勤表',
} as Config
