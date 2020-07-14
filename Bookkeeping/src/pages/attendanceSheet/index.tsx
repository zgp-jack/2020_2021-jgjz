import Taro, { Config, useEffect, useState, useRouter } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import CalendarModal from '../../components/attendanceModal';
import { bkgetExcelDataAction } from '../../utils/request/index';
import Msg from '../../utils/msg';
import './index.scss'

export default function AttendanceSheet() {
  // 月份
  const [date, setDate] = useState('');
  // 年
  const [year, setYear] = useState();
  //月
  const [month, setMonth] = useState('');
  const [fixedTab, setFixedTab] = useState<any[]>([])
  const [tebArr, setTabArr] = useState<any[]>([])
  const [data, setData] = useState<any>([{}, {}, {}])
  const [display, setDisplay] = useState<boolean>(false)
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
    // 进来获取本月数据
    const time = new Date();
    const newTime = time.getFullYear() + '-' + addZero(time.getMonth() + 1);
    const years = time.getFullYear();
    const months = addZero(time.getMonth() + 1);
    setYear(years)
    setMonth(months)
    setDate(newTime);
    getList(newTime);
  }, [])
  // 获取数据
  const getList = (newTime: string) => {
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
    tebArrList.push(arrObj);
    const fixedTabList = JSON.parse(JSON.stringify(fixedTab));
    const defaultArr = [
      { id: 1, name: '工人',default:true },
      { id: 2, name: '记工类型',default:true },
    ]
    const fixedTabObj = {
      list: defaultArr
    }
    fixedTabList.push(fixedTabObj);
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
    tatalArr.push(tatalLeftObj);
    bkgetExcelDataAction(params).then(res => {
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
          leftData.push(leftObj);
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
                          overtime: data[i].hour[k].list[0].overtime
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
                          overtime: data[i].work[k].list[0].overftime
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
          rightData.push(rightDataObj)
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
          borrow: borrowSum,
          hour: { work_time: hourWorkTimeSum, over_time: hourOverTimeSum },
          work: { work_time: workWorkTimeSum, over_time: workOverTimeSum }
        }
      }
      obj.list.push(sumObj);
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
      for (let i = 0; i < jigongSums.length;i++){
        jigongSums[i].total.over_time = 0;
        jigongSums[i].total.work_time =0;
      }
      // 按天
      for (let i = 0; i < workSums.length; i++) {
        workSums[i].total.over_time = 0;
        workSums[i].total.work_time = 0;
      }
      // 按量
      // 借支
      for (let i = 0; i < borrowNumSums.length; i++) {
        borrowNumSums[i].total.borrow = 0;
      }
      // 循环相加
      // 记工
      for (let i = 0; i < jigongSum.length;i++){
        for (let j = 0; j < jigongSums.length;j++){
          if (jigongSum[i].date_num === jigongSums[j].date_num){
            jigongSums[j].total.work_time += (+jigongSum[i].total.work_time);
            jigongSums[j].total.over_time += (+jigongSum[i].total.over_time);
          }
        }
      }
      // 按天
      for (let i = 0; i < workSum.length; i++) {
        for (let j = 0; j < workSums.length; j++) {
          if (workSum[i].date_num === workSums[j].date_num) {
            workSums[j].total.work_time += (+workSum[i].total.work_time);
            workSums[j].total.over_time += (+workSum[i].total.over_time);
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
      const dayArrItme = JSON.parse(JSON.stringify(dayArr));
      for (let i = 0; i < dayArrItme.length;i++){
        let obj:any = {
          type:{
            hour:{
              over_time:'',
              work_time:'',
            },
            borrow:'',
            work:{
              over_time: '',
              work_time: '',
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
            obj.type.hour.over_time= jigongSums[j].total.over_time;
            obj.type.hour.work_time = jigongSums[j].total.work_time;
            // dayArrItme[i] = obj;
          }
        }
        // 按天
        for (let j = 0; j < workSums.length; j++) {
          if (dayArrItme[i].name === workSums[j].date_num) {
            obj.type.work.over_time = workSums[j].total.over_time;
            obj.type.work.work_time = workSums[j].total.work_time;
          }
        }
        // 借支
        for (let j = 0; j < borrowNumSums.length; j++) {
          if (dayArrItme[i].name === borrowNumSums[j].date_num) {
            obj.name= borrowNumSums[j].date_num,
            obj.type.borrow = borrowNumSums[j].total.borrow;
          }
        }
        dayArrItme[i] = obj;
      }
      setFixedTab([...fixedTabList, ...leftData, ...tatalArr]);
      console.log(obj,'obj')
      obj.list.push(...dayArrItme);
      rightData.push(obj)
      console.log(rightData,'rightData')
      setTabArr([...tebArrList, ...rightData]);
    })
  }
  // 设置时间
  const handleTime = (e) => {
    const time = e.detail.value;
    setYear(e.detail.value.slice(0, 4));
    setMonth(e.detail.value.slice(5, 8));
    getList(time);
  }
  // 跳转
  const userRouteJump = (url: string) => {
    Taro.navigateTo({
      url: url
    })
  }
  console.log(tebArr,'tebArr')
  return (
    <View>
      <View className='top'>
        <View className='top-time'>
          <Picker
            mode='date'
            fields='month'
            onChange={(e) => handleTime(e)}
            value={''}
          >
            <Text>{year}年<Text>{month}</Text></Text>
          </Picker>
        </View>
        <View>以下是你的记工，点击可查看详情</View>
      </View>
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
                    <View className='blued'>
                      微信对工 >
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
                        {val.type.hour && <View className='box-list-bao'>
                          {val.type.hour.work_time && <View>{val.type.hour.work_time}个工</View>}
                          {val.type.hour.over_time && <View>{val.type.hour.over_time}小时</View>}
                          </View>
                        }
                        {val.type.work && val.type.work.work_time && <View className='box-list-bao'>
                          {val.type.work.work_time && <View>{val.type.work.work_time}个工</View>}
                          {val.type.work.over_time && <View>{val.type.work.over_time}小时</View>}
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
                                {val.type.amount.sum &&<View >{val.type.amount.sum}</View>}
                                {val.type.amount.unit_name && <View >{val.type.amount.unit_name}</View>}
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
      <View className='footer-btn'>
        <View className='footer-btn-box'>
          <View className='footer-btn-box-left' onClick={handleShare}>
            <View>一键对工</View>
            <View className='footer-btn-box-left-title'>发送到工人微信群快速对工</View>
          </View>
          <View className='footer-btn-box-right' onClick={() => userRouteJump(`/pages/recorder/index`)}>
            <View>记工</View>
            <View className='footer-btn-box-right-title'>(点工 包工 借支)</View>
          </View>
        </View>
      </View>
      <CalendarModal display={display} handleClose={handleClose} />
    </View>
  )
}

AttendanceSheet.config = {
  navigationBarTitleText: '考勤表',
} as Config