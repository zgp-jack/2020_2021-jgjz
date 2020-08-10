import Taro, { Config, useEffect, useState, useRouter, useShareAppMessage } from '@tarojs/taro'
import { View, Text, Picker, Button, Image } from '@tarojs/components'
import CalendarModal from '../../components/attendanceModal';
import { bkgetExcelDataAction, bkGetProjectTeamAction, bkAddProjectTeamAction } from '../../utils/request/index';
import Msg from '../../utils/msg';
import { IMGCDNURL } from '../../config';
import CreateProject from '../../components/createProject';
import ProjectModal from '../../components/projectModal'
import {Type,Earliest_month} from '../../config/store'
import './index.scss'

export default function AttendanceSheet() {
  // 月份
  const [date, setDate] = useState('');
  // 年
  const [year, setYear] = useState<string|number>('');
  //月
  const [month, setMonth] = useState('');
  const [fixedTab, setFixedTab] = useState<any[]>([])
  const [tebArr, setTabArr] = useState<any[]>([])
  const [data, setData] = useState<any>([{}, {}, {}])
  const [identity, setIdentity ] = useState<number>(0)
  const [display, setDisplay] = useState<boolean>(false)
  // 班组长创建项目
  const [createProjectDisplay, setCreateProjectDisplay] = useState<boolean>(false)
  // 项目班组
  const [project, setProject] = useState<boolean>(false)
  // 日期需要的开始时间
  const [datestart,setDatestart] = useState<string>()
  // 日期需要的结束时间
  const [dateEnd,setdateEnd] = useState<string>()
  // 判断左边是否需要icon
  const [leftTime, setleftTime] = useState<boolean>(false)
  // 判断右边是否需要icon
  const [rightTime, setrightTime] = useState<boolean>(false)
  //判断是否追加
  const [additional, setAdditional]= useState<number>(0)
  // 弹框内容
  const [model, setModel] = useState<any>({
    groupName: '',
    teamName: '',
  })
  // 异常界面
  const [busy,setBusy] = useState<boolean>(false);
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
    let earliest_month = Taro.getStorageSync(Earliest_month);
    let yeartime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(0,4));
    let montime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(5, 7));
    setdateEnd(yeartime+'-'+montime);
    if(!earliest_month){
      setleftTime(false);
      setrightTime(false);
      setDatestart(yeartime+'-'+montime);
    }else{
      setDatestart(earliest_month);
      if(Number(earliest_month.split('-')[0]) == yeartime){
        setrightTime(false);
        Number(earliest_month.split('-')[1])<montime?setleftTime(true):setleftTime(false);
      }else if(Number(earliest_month.split('-')[0]) < yeartime) {
        setrightTime(false);
        setleftTime(true);
      }
    }
    setYear(years)
    setMonth(months)
    // setDate(newTime);
    getList(newTime)
    // getDateList(newTime);
  }, [])
  // 获取数据
  const getDateList = (newTime:string)=>{
    console.log(newTime,'newTime')
    let params = {
      date: newTime
    };
    bkgetExcelDataAction(params).then(res => {
      if(res.code === 200){
        setBusy(false)
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
      console.log(day,'xxx')
      //  设置第一列
      const dayArr: any[] = [];
      for (var k = 1; k <= day; k++) {
        let obj: any = {
          id: k,
          name: k,
          default:true
        }
        dayArr.push(obj);
      }
      console.log(dayArr,'dayarr')
      // 设置列表左边
      const defaultArr = [
        { id: 1, name: '工人',default:true },
        { id: 2, name: '记工类型',default:true },
        { id: 3, name: '本月统计', default: true },
      ]
        let arrObj = {
          list: dayArr,
        }
        let List:any[] = [];
        List.push(arrObj);
        const fixedTabObj = {
          list: defaultArr
        }
        // 左边第一行
        let leftArr:any[] = [];
        leftArr.push(fixedTabObj);
        // 右边第一行
        let rightArr:any[] = [];
        let firstArr:any=[];
        firstArr = dayArr;
        let first ={list:firstArr};
        rightArr.push(first);
        setFixedTab(leftArr);
        setTabArr(rightArr);
        // 设置里面的内容

      }
      }else{
        Msg(res.msg)
      }
    })
    .catch((e)=>{
      setleftTime(false);
      setrightTime(false);
      setBusy(true)
      setleftTime(false);
      setrightTime(false);
    })
  }
  // 获取数据
  const getList = (newTime: string) => {
    console.log(identity,'identity')
    let params = {
      date: newTime
    };
    // 获取本月天数
    // const time = newTime.setDate(0);
    // const day = time.getDate();
    // console.log(day);
    const curDate = new Date(newTime);
    /* 获取当前月份 */
    const curMonth = curDate.getMonth();
    /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    curDate.setMonth(curMonth + 1);
    /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
    curDate.setDate(0);
    const day = curDate.getDate();
    // 设置第一列的天数
    const dayArr: any[] = [];
    for (var k = 1; k <= day; k++) {
      let obj: any = {
        id: k,
        name: k,
        default:true
      }
      dayArr.push(obj);
    }
    //本月统计push 到数组第一个
    const obj = { id: '00', name: '本月统计',default:true };
    const arr = [obj, ...dayArr];
    let arrObj = {
      list: arr,
    }
    const tebArrList = JSON.parse(JSON.stringify(tebArr));
    if (additional == 0){
      tebArrList.push(arrObj);
    }
    const fixedTabList = JSON.parse(JSON.stringify(fixedTab));
    const defaultArr = [
      { id: 1, name: '工人',default:true },
      { id: 2, name: '记工类型',default:true },
      // { id: 3, name: '本月统计', default: true },
    ]
    const fixedTabObj = {
      list: defaultArr
    }
    if (fixedTabList ==0 ){
      fixedTabList.push(fixedTabObj);
    }
    let tatalArr:any[] = [];
    // 左边总计
    const tatalLeft = [
      { name: '总计', id: Math.random(), default: true },
      {
        type: {
          hour: true,
          work: true,
          amount: true,
          borrow: true,
        }, id: Math.random()
      }

    ]
    let tatalLeftObj: any = {};
    tatalLeftObj.list = tatalLeft;
    if (identity === 1){
      tatalArr.push(tatalLeftObj);
    }
    bkgetExcelDataAction(params).then(res => {
      if(res.code === 200 ){
      setBusy(false)
      if(res.data.length>0){
      const data = res.data;
      let leftData: any = [];
      let rightData: any = [];
      let tatalDataArr :any = [];
      let jigongSum:any =[];
      let daySum:any=[];
      let workSum:any=[];
      let borrowNumSum:any=[];
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let leftObj: any = {};
          // 右边第一个总计
          let rightObj: any = {};
          rightObj.name = 0;
          rightObj.type = {};
          rightObj.type.amount = '';
          rightObj.type.hour = {
            work_time: '',
            over_time: '',
          };
          rightObj.type.work = {
            work_time: '',
            over_time: '',
          };
          rightObj.type.borrow = '';
          // 设置左边的参数
          const leftListData: any[] = [];
          // 姓名
          const leftName = { name: data[i].name };
          //点工类型
          const leftType: any = {};
          let hour;
          if (data[i].hour.length) {
            hour = true;
          }
          // 包工(天)
          let work;
          if (data[i].work.length) {
            work = true;
          }
          // 包工(量)
          let amount;
          if (data[i].amount.length) {
            amount = true
          }
          // 借支
          let borrow;
          if (data[i].borrow.length) {
            borrow = true;
          }
          const Type = {
            hour,
            work,
            amount,
            borrow,
          }
          leftType.type = Type;
          leftListData.push(leftName, leftType);
          leftObj.list = leftListData;
          if (additional === 0){
            leftData.push(leftObj);
          }
          // 设置右边参数
          const rightListData: any[] = [];
          // 数组长度超过1就是显示几笔，为1的时候就显示内容
          // 记工
          const dayArrs = JSON.parse(JSON.stringify(dayArr));
          let numSumWorkTime = 0;
          // 借支总金额
          let numBorrow = 0;
          // 遍历每一天
          for (let j = 0; j < dayArrs.length; j++) {
            dayArrs[j].type = {}
            // 判断有记工
            let sumWorkTime = 0;
            let sumOverTime = 0;
            if (data[i].hour.length > 0) {
              let num: any[] = [];
              for (let k = 0; k < data[i].hour.length; k++) {
                num.push(data[i].hour[k].total);
                sumWorkTime = sumWorkTime +(+data[i].hour[k].total.work_time);
                sumOverTime = sumOverTime + (+data[i].hour[k].total.over_time);
                // 判断是哪天给哪天设置值
                if (data[i].hour[k].date_num == dayArrs[j].name) {
                  if (data[i].hour[k].list) {
                    if (data[i].hour[k].list.length > 0) {
                      if (data[i].hour[k].list.length == 1) {
                        let hourData = {
                          work_time: data[i].hour[k].list[0].work_time,
                          over_time: data[i].hour[k].list[0].overtime
                        }
                        dayArrs[j].type.hour = hourData;
                      } else if (data[i].hour[k].list.length > 1) {
                        let hourData = {
                          num: data[i].hour[k].list.length + '笔'
                        }
                        dayArrs[j].type.hour = hourData;
                      }
                    }
                  }
                }
              }
              let work_time = 0;
              let over_time = 0;
              if (num.length > 0) {
                for (let z = 0; z < num.length; z++) {
                  if (num[z].work_time) {
                    work_time = work_time + (+num[z].work_time);
                  }
                  if (num[z].over_time) {
                    over_time = over_time + (+num[z].over_time);
                  }
                }
              }
              rightObj.type.hour.work_time = work_time;
              rightObj.type.hour.over_time = over_time;
            }
            numSumWorkTime = numSumWorkTime + sumOverTime;
            // 判断有按天work
            if (data[i].work.length > 0) {
              let num: any[] = [];
              for (let k = 0; k < data[i].work.length; k++) {
                num.push(data[i].work[k].total);
                // 判断是哪天给哪天设置值
                if (data[i].work[k].date_num == dayArrs[j].name) {
                  if (data[i].work[k].list) {
                    if (data[i].work[k].list.length > 0) {
                      if (data[i].work[k].list.length == 1) {
                        let hourData = {
                          work_time: data[i].work[k].list[0].work_time,
                          over_time: data[i].work[k].list[0].overtime
                        }
                        dayArrs[j].type.work = hourData;
                      } else if (data[i].work[k].list.length > 1) {
                        let hourData = {
                          num: data[i].work[k].list.length
                        }
                        dayArrs[j].type.work = hourData;
                      }
                    }
                  }
                }
              }
              let work_time = 0;
              let over_time = 0;
              if (num.length > 0) {
                for (let z = 0; z < num.length; z++) {
                  if (num[z].work_time) {
                    work_time = work_time + (+num[z].work_time);
                  }
                  if (num[z].over_time) {
                    over_time = over_time + (+num[z].over_time);
                  }
                }
              }
              rightObj.type.work.work_time = work_time;
              rightObj.type.work.over_time = over_time;
            }
            // 判断按量 amount
            if (data[i].amount.length > 0) {
              let num: any[] = [];
              for (let k = 0; k < data[i].amount.length; k++) {
                // 判断是哪天给哪天设置值
                if (data[i].amount[k].date_num == dayArrs[j].name) {
                  // 按量返回的是数组
                  if (data[i].amount[k].total.length > 0) {
                    for (let b = 0; b < data[i].amount[k].total.length; b++) {
                      num.push(data[i].amount[k].total[b]);
                    }
                  }
                  if (data[i].amount[k].list) {
                    if (data[i].amount[k].list.length > 0) {
                      if (data[i].amount[k].list.length == 1) {
                        let hourData = {
                          unit_num: data[i].amount[k].list[0].unit_num,
                          unit: data[i].amount[k].list[0].unit
                        }
                        dayArrs[j].type.amount = hourData;
                      } else if (data[i].amount[k].list.length > 1) {
                        let hourData = {
                          num: data[i].amount[k].list.length + '笔'
                        }
                        dayArrs[j].type.amount = hourData;
                      }
                    }
                  }
                }
              }
              let arr:any[] = [];
              if (num.length > 0) {
                for(let c =0;c<num.length;c++){
                  if (arr.length === 0){
                    arr.push(num[c]);
                  }else{
                    for(let m =0;m<arr.length;m++){
                      if (arr[m].unit_name !== num[c].unit_name){
                        // arr[m].unit_name = num[c].unit_name;
                        // arr[m].sum = num[c].sum;
                        arr.push(num[c])
                      }else{
                        arr[m].sum += (+num[c].sum)
                      }
                    }
                  }
                }
                rightObj.type.amount = arr[0];
                // const unitMap = {}
                // console.log(num,'num')
                // num.forEach((item) => {
                //   if (unitMap[item.unit_name]) {
                //     unitMap[item.unit_name] += +item.sum
                //   } else {
                //     unitMap[item.unit_name] = +item.sum
                //   }
                // })
                // num.forEach((item) => {
                //   console.log(item,'itme')
                //   if (unitMap[item.unit_name]){
                //     console.log()
                //   }
                // })
                // console.log(unitMap,'unitMapunitMap')
                // rightObj.type.amount = [unitMap];
                // console.log(unitMap,'unitMap')
              }
            }
            // 借支
            if (data[i].borrow.length > 0) {
              let num: any[] = [];
              for (let k = 0; k < data[i].borrow.length; k++) {
                num.push(data[i].borrow[k].total);
                // 判断是哪天给哪天设置值
                if (data[i].borrow[k].date_num == dayArrs[j].name) {
                  if (data[i].borrow[k].list) {
                    if (data[i].borrow[k].list.length > 0) {
                      if (data[i].borrow[k].list.length == 1) {
                        let hourData = {
                          money: data[i].borrow[k].list[0].money
                        }
                        dayArrs[j].type.borrow = hourData;
                      } else if (data[i].borrow[k].list.length > 1) {
                        let hourData = {
                          num: data[i].borrow[k].list.length + '笔'
                        }
                        dayArrs[j].type.borrow = hourData;
                      }
                    }
                  }
                }
              }
              let money = 0;
              if (num.length > 0) {
                for (let z = 0; z < num.length; z++) {
                  if (num[z].money) {
                    money = money + (+num[z].money);
                  }
                }
              }
              rightObj.type.borrow = money;
              numBorrow = numBorrow + rightObj.type.borrow
            }
          }
          const list = [rightObj, ...dayArrs];
          rightListData.push(list)
          let rightDataObj = {
            list: rightListData[0],
          }
          if (additional===0){
            rightData.push(rightDataObj)
          }
          // 获取总的
          // 遍历这个月天数
          // 获取每一个的30天
          // 记工
          for(let c = 0;c<data[i].hour.length;c++){
            jigongSum.push(data[i].hour[c]);
          }
          //按量
          for(let c= 0;c<data[i].amount.length;c++){
            daySum.push(data[i].amount[c])
          }
          // 按天
          for (let c = 0; c < data[i].work.length; c++) {
            workSum.push(data[i].work[c])
          }
          // 借支
          for (let c = 0; c < data[i].borrow.length; c++) {
            borrowNumSum.push(data[i].borrow[c])
          }
          // if(data[i].hour){
          //   for(let x =0;x<dayArrs.length;x++){
          //     dayArrs[x].type={}
          //     for(let c =0;c<data[i].hour.length;c++){
          //       if (dayArrs[x].name === data[i].hour[c].date_num){
          //         console.log(data[i].hour[c].date_num,'222')
          //         tatalDataArr.push(data[i].hour[c].total.work_time)
          //         dayArrs[x].type.work_time += data[i].hour[c].total.work_time;
          //       }
          //     }
          //   }
          // }
          // console.log(dayArrs,'xxx')
          // let work_timeNum:any=[];
          // for (let s = 0; s < dayArr.length; s++) {
          //   if(data[i].hour.length>0){
          //     for (let z = 0; z < data[i].hour.length;z++){
          //         work_timeNum.push(data[i].hour[z]);
          //     }
          //   }
          // }
          // console.log(work_timeNum,'work_timeNum');
          // let num = 0;
          // for(let x=0;x<dayArr.length;x++){
          //   for (let c = 0; c < work_timeNum.length;c++){
          //     if (dayArr[x].name === work_timeNum[c].date_num){
          //       num += (+work_timeNum[c].total.work_time)
          //     }
          //   }
          // }
          // console.log(num,'num')
          // 借支
          // let borrowNum: any = [];
          // for (let s = 0; s < dayArr.length; s++) {
          //   if (data[i].borrow.length > 0) {
          //     for (let z = 0; z < data[i].borrow.length; z++) {
          //       borrowNum.push(data[i].borrow[z]);
          //     }
          //   }
          // }
          // let hoursObj:any={};
          // hoursObj.list = work_timeNum;
          // let hourArr:any[]=[];
          // tatalDataArr .push(hoursObj);
          // // console.log(hourArr,'work_timeNum')
          // for(let z=0;z<dayArr.length;z++){
          //   let nums=0;
          //   for (let m = 0; m < work_timeNum.length;m++){
          //       if (dayArr[z].name === work_timeNum[m].date_num){
          //         nums += (+work_timeNum[m].total.over_time);
          //         // console.log(+work_timeNum[m].total.over_time,'+work_timeNum[m].total.over_time')
          //       }
          //   }
            // console.log(nums,'nums')
          // }
          // for (let u = 0; u < hourArr.length;u++){

          // }
        }
      }
      // 借支总额
      let borrowSum = 0;
      // 点工时间
      let hourWorkTimeSum = 0;
      // 点工加班时间
      let hourOverTimeSum = 0;
      // 按天时间
      let workWorkTimeSum = 0;
      // 按天加班时间
      let workOverTimeSum = 0;
      // 按量
      let sumSum = 0;
      let unitNameSum = '';
      // console.log(rightData,'rightData')
      for(let i =0;i<rightData.length;i++){
        if(rightData[i].list[0].name === 0){
          // 借支
          if (rightData[i].list[0].type.borrow){
            borrowSum += (+rightData[i].list[0].type.borrow)
          }
          // 点工
          if (Object.keys(rightData[i].list[0].type.hour).length) {
            hourWorkTimeSum += (+rightData[i].list[0].type.hour.work_time);
            hourOverTimeSum += (+rightData[i].list[0].type.hour.over_time);
          }
          // 按天
          if (Object.keys(rightData[i].list[0].type.work).length) {
            workWorkTimeSum += (+rightData[i].list[0].type.work.work_time);
            workOverTimeSum += (+rightData[i].list[0].type.work.over_time);
          }
          // 按量
          if (Object.keys(rightData[i].list[0].type.amount).length) {
            sumSum += (+rightData[i].list[0].type.amount.sum);
            unitNameSum = rightData[i].list[0].type.amount.unit_name
          }
        }
      }
      let obj:any = {};
      obj.list = [];
      let sumObj = {
        id : 0,
        type:{
          amount: {
            sum: sumSum,
            unit_name:unitNameSum
          },
          borrow: {
            money: borrowSum
          },
          hour: { work_time: hourWorkTimeSum.toFixed(2), over_time: hourOverTimeSum.toFixed(2) },
          work: { work_time: workWorkTimeSum.toFixed(2), over_time: workOverTimeSum.toFixed(2) }
        }
      }
      if (identity === 1){
        obj.list.push(sumObj);
      }
      //计算出哪些天数有数据
      // 记工
      let objItem = {};
      const jigongSums = jigongSum.reduce(function (item, next) {
        objItem[next.date_num] ? '' : objItem[next.date_num] = true && item.push(next);
        return item;
      }, []);
      // 按量
      let dayObj = {};
      const daySums = daySum.reduce(function (item, next) {
        dayObj[next.date_num] ? '' : dayObj[next.date_num] = true && item.push(next);
        return item;
      }, []);
      // 按天
      let workObj = {};
      const workSums = workSum.reduce(function (item, next) {
        workObj[next.date_num] ? '' : workObj[next.date_num] = true && item.push(next);
        return item;
      }, []);
      //借支
      let borrowObj = {};
      const borrowNumSums = borrowNumSum.reduce(function (item, next) {
        borrowObj[next.date_num] ? '' : borrowObj[next.date_num] = true && item.push(next);
        return item;
      }, []);
      // 有的天数的内容设置为空方便相加
      // 记工
      // for (let i = 0; i < jigongSums.length;i++){
      //   jigongSums[i].total.over_time = 0;
      //   jigongSums[i].total.work_time =0;
      // }
      // 按天
      // for (let i = 0; i < workSums.length; i++) {
      //   workSums[i].total.over_time = 0;
      //   workSums[i].total.work_time = 0;
      // }
      // 按量
      // 借支
      // for (let i = 0; i < borrowNumSums.length; i++) {
      //   borrowNumSums[i].total.borrow = 0;
      // }
      // 循环相加
      // 记工
      for (let i = 0; i < jigongSum.length;i++){
        for (let j = 0; j < jigongSums.length;j++){
          if (jigongSum[i].date_num === jigongSums[j].date_num){
            jigongSums[j].total.work_time += (parseInt(jigongSum[i].total.work_time));
            jigongSums[j].total.over_time += (parseInt(jigongSum[i].total.over_time));
          }
        }
      }
      // 按天
      for (let i = 0; i < workSum.length; i++) {
        for (let j = 0; j < workSums.length; j++) {
          if (workSum[i].date_num === workSums[j].date_num) {
            workSums[j].total.work_time += (parseInt(workSum[i].total.work_time));
            workSums[j].total.over_time += (parseInt(workSum[i].total.over_time));
          }
        }
      }
      // 借支
      for (let i = 0; i < borrowNumSum.length; i++) {
        for (let j = 0; j < borrowNumSums.length; j++) {
          if (borrowNumSum[i].date_num === borrowNumSums[j].date_num) {
            // console.log(borrowNumSum[i].total.money,'borrowNumSum[i].total.money')
            borrowNumSums[j].total.borrow += (+borrowNumSum[i].total.money);
          }
        }
      }
      // 按量 daySums
      for (let i = 0; i < daySum.length; i++) {
        for (let j = 0; j < daySums.length; j++) {
          if (daySum[i].date_num === daySums[j].date_num) {
            daySums[j].total[0].sum += (+daySum[i].total[0].sum);
            daySums[j].total[0].unit_name = daySum[i].total[0].unit_name;
          }
        }
      }
      const dayArrItme = JSON.parse(JSON.stringify(dayArr));
      for (let i = 0; i < dayArrItme.length;i++){
        let obj:any = {
          type:{
            hour:{
              over_time:'',
              work_time:'',
            },
            borrow:{
              money:'',
            },
            work:{
              over_time: '',
              work_time: '',
            },
            amount:{
              sum:'',
              unit_name:'',
            }
          }
        };
        // 记工
        for (let j = 0; j < jigongSums.length;j++){
          if (dayArrItme[i].name === jigongSums[j].date_num){
            // obj ={
            //   name: jigongSums[j].date_num,
            //   type:{
            //     hour:{
            //       over_time: jigongSums[j].total.over_time,
            //       work_time: jigongSums[j].total.work_time,
            //     }
            //   }
            // }
            // dayArrItme[i] = jigongSums[j];
            // dayArrItme[i].type.hour.over_time = jigongSums[j].total.over_time
            obj.type.hour.over_time = (parseInt(jigongSums[j].total.over_time)).toFixed(2);
            obj.type.hour.work_time = (parseInt(jigongSums[j].total.work_time)).toFixed(2);
            // dayArrItme[i] = obj;
          }
        }
        // 按天
        for (let j = 0; j < workSums.length; j++) {
          if (dayArrItme[i].name === workSums[j].date_num) {
            obj.type.work.over_time = (parseInt(workSums[j].total.over_time)).toFixed(2);
            obj.type.work.work_time = (parseInt(workSums[j].total.work_time)).toFixed(2);
          }
        }
        // 借支
        for (let j = 0; j < borrowNumSums.length; j++) {
          if (dayArrItme[i].name === borrowNumSums[j].date_num) {
            obj.name= borrowNumSums[j].date_num,
              obj.type.borrow.money = borrowNumSums[j].total.money;
          }
        }
        // 按量
        for (let j = 0; j < daySums.length; j++) {
          if (dayArrItme[i].name === daySums[j].date_num) {
            obj.name = daySums[j].date_num,
              console.log(daySums[j].total[0].unit_name,'daySums[j]')
            obj.type.amount.sum = (parseInt(daySums[j].total[0].sum));
            obj.type.amount.unit_name = (daySums[j].total[0].unit_name);
          }
        }
        dayArrItme[i] = obj;
      }
      if (identity === 1){
        obj.list.push(...dayArrItme);
      }
      console.log(obj,'obj23123')
      rightData.push(obj)
        console.log(tebArrList,'tebArrList');
        console.log(rightData,'rightData')
      // if (additional==0){
        setFixedTab([...fixedTabList, ...leftData, ...tatalArr]);
        setTabArr([...tebArrList, ...rightData]);
      // }else{
        // setFixedTab([...fixedTabList]);
        // setTabArr([...tebArrList, ...rightData]);
      // }
      // 判断是否添加
      setAdditional(additional+1);
      }else{
        setAdditional(0);
      }
    }
    })
    .catch((e)=>{
      setBusy(true)
      setleftTime(false);
      setrightTime(false);
    })
  }
  // 设置时间
  const handleTime = (e) => {
    if(busy)return;
    const time = e.detail.value;
    setFixedTab([]);
    setTabArr([]);
    setYear(e.detail.value.slice(0, 4));
    setMonth(e.detail.value.slice(5, 8));
    changeIcon(e.detail.value);
    getDateList(time);
  }
  const changeIcon = (e) => {
    console.log("zgsdfasdfasdf",e);
    let earliest_month = Taro.getStorageSync(Earliest_month);
    let yeartime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(0,4));
    let montime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(5, 7));
    if(!earliest_month){
      setleftTime(false);
      setrightTime(false);
    }else{
      if(yeartime == Number(earliest_month.split('-')[0])){
        if(Number(earliest_month.split('-')[1])==montime){
          setleftTime(false);
          setrightTime(false);
        }else{
          if(Number(e.split('-')[1])==Number(earliest_month.split('-')[1])){
            setrightTime(true);
            setleftTime(false);
          }else if(Number(e.split('-')[1])==montime){
            setrightTime(false);
            setleftTime(true);
          }else{
            setrightTime(true);
            setleftTime(true);
          }
        }
      }else{
        if(Number(earliest_month.split('-')[0])==Number(e.split('-')[0])){
          setrightTime(true);
          Number(e.split('-')[1])>Number(earliest_month.split('-')[1])?setleftTime(true):setleftTime(false);
        }else if(Number(e.split('-')[0])==yeartime){
          setleftTime(true);
          Number(e.split('-')[1])<montime?setrightTime(true):setrightTime(false);
        }else{
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
  console.log(tebArr.length,'tebArr')
  useShareAppMessage(() => {
    return {
      // title: '记工记账',
      title: '记工记账怕丢失？用鱼泡网记工，方便安全！数据永不丢失~',
      path: '/pages/share/index'
    }
  })
  // 跳转
  const handleJump = ()=>{
    bkGetProjectTeamAction({}).then(res=>{
      if (res.data.length === 0) {
        setCreateProjectDisplay(true)
      }else{
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
  console.log(tebArr,'tebArr');
  console.log(fixedTab,'fixedTab')
  console.log()
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
              <Image src={`${IMGCDNURL}greyLeft.png`} className='leftIcon' style={{visibility: leftTime?'visible':'hidden'}} />
            {month}月
              <Image className='righticon' src={`${IMGCDNURL}greyRight.png`} style={{visibility: rightTime?'visible':'hidden'}} />
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
          <View className='refresh' onClick={() => getList(year + '-' + month)}>刷新</View>
        </View>
        }
        {!busy && 
        <View className='box'>
          {/* 左边固定 */}
          <View>
            {fixedTab.map(v => (
              <View className='box-left'>
                {v.list.map(val => (
                  <View className='box-border'>
                    {!val.type && <View className={val.default ? 'box-list-default' :'box-list'}>
                      <View className='name'>{val.name}</View>
                      {!val.default && 
                        <View open-type="share">
                        <Button className='blued'  open-type="share">
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
          </View>
          {/* 右边 */}
          <View className='box-scroll'>
            {tebArr.map(v => (
              <View>
                <View className='box-right'>
                  {v.list.map(val => (
                    <View className='box-border'>
                      {!val.type && <View className={val.default ?'box-list-default':'box-list'}>{val.name}</View>}
                      {val.type &&
                        <View >
                          {val.name == 0 && <View>
                          {val.type.hour && val.type.hour.work_time && <View className='box-list-bao'>
                            {/* {val.type.hour.work_time && */}
                              <View>{val.type.hour.work_time}个工</View>
                               {/* } */}
                            {/* {val.type.hour.over_time && */}
                              <View>{val.type.hour.over_time}小时</View>
                               {/* } */}
                            </View>
                          }
                          {val.type.work && val.type.work.work_time && <View className='box-list-bao'>
                            {/* {val.type.work.work_time &&  */}
                            <View>{val.type.work.work_time}个工</View>
                            {/* } */}
                            {/* {val.type.work.over_time &&  */}
                            <View>{val.type.work.over_time}小时</View>
                            {/* } */}
                          </View>
                          }
                          {val.type.amount && <View className='box-list-bao'>
                              <View>{val.type.amount.sum}</View>
                              <View>{val.type.amount.unit_name}</View> 
                          </View>
                          }
                          {val.type.borrow && <View className='box-list-money'>{val.type.borrow}</View>}
                          </View>}
                          {val.name != 0 && <View>
                            <View className='box-list-type'>
                              {val.type.hour && <View className='box-list-bao'>
                                {val.type.hour.num && <View>{val.type.hour.num}</View>}
                                {(val.type.hour.work_time || val.type.hour.over_time) &&
                                <View >
                                  <View>{val.type.hour.work_time}个工</View>
                                  <View>{val.type.hour.over_time}小时</View>
                                </View>
                                }
                              </View>}
                              {val.type.work && <View className='box-list-bao'>
                                {val.type.work.num && <View>{val.type.work.num}</View>}
                              {(val.type.work.work_time || val.type.work.over_time) &&
                                  <View>
                                    <View>{val.type.work.work_time}个工</View>
                                    <View>{val.type.work.over_time}小时</View>
                                  </View>
                                }
                              </View>}
                              {val.type.amount &&<View className='box-list-bao'>
                                {val.type.amount.num && <View>{val.type.amount.num}</View>}
                                {(val.type.amount.sum || val.type.amount.unit_name) && <View>
                                  {/* {val.type.amount.sum && */}
                                  <View >{val.type.amount.sum}</View>
                                  {/* // } */}
                                  {/* {val.type.amount.unit_name &&  */}
                                  <View >{val.type.amount.unit_name}</View>
                                  {/* } */}
                                </View>}
                              </View>}
                            {val.type.borrow && <View className='box-list-bao'>{val.type.borrow.money}</View>}
                            </View>
                          </View>}
                        </View>
                      }
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
        }
      </View>
      {
        !busy &&tebArr.length<=2&&<View className='noData'>暂无数据哦～</View>
      }
      {!busy && tebArr.length > 2 &&
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
        !busy &&tebArr.length <= 2 && <View className='btnBox'>
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
