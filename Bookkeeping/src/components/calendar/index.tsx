import Taro, { useState, useEffect,useDidHide } from '@tarojs/taro'
import { View, Image, Text, Input, Checkbox, Picker,ScrollView } from '@tarojs/components'
import classnames from 'classnames'
import { useDispatch, useSelector } from '@tarojs/redux'
import { setClickTIme } from '../../actions/clickTIme'
import {IMGCDNURL} from '../../config'
import './index.scss'
import Msg from '../../utils/msg';

interface PROPS {
  display: boolean //是否跳转到页面授权
  // handleClose: () => void,
  handleCalendar:(v)=>void,
  setModel:(v)=>void,
  model:any,
  // setCalendarModalDisplay:(v)=>void
  setTimeData:(v)=>void,
  recorderType:number, //判断是不是借支
  calendarDays:any,
  time:any,
  arr:any
  // setCalendarDays:()=>void,
  clickData:any,
  // setClickData:()=>void,
  handleClickCalendar:(v:any)=>void,
  getMonthDaysCurrent:(e:any)=>void,
  handleCalendarClose:()=>void,
  handleChangeTime:(e:number)=>void,
  handleCalendarSub:()=>void,
  onScrollToUpper: () => void,
  onScrollToLower: () => void,
}
// interface TimeType{
//   year:string,
//   monent:string,
// }

export default function CalendarModal({ 
  // setRecorderType, calendarDays, setCalendarDays, clickData, setClickData,
  display, handleClickCalendar, calendarDays, getMonthDaysCurrent, time, handleCalendar, setModel, model, setTimeData, recorderType, arr, clickData, handleCalendarClose, handleChangeTime, handleCalendarSub, onScrollToUpper,onScrollToLower}: PROPS) {
  // 储存点击天数
  // 获取存入的公用内容
  const useSelectorItem = useSelector<any, any>(state => state)
  const dispatch = useDispatch()
  // const [arr,setArr] = useState<any[]>([]);
  // const [obj,setObj] = useState<any>()
  // 星期
  const weeks =[
    { id: 1,name: '日' },
    { id: 2, name: '一' },
    { id: 3, name: '二' },
    { id: 4, name: '三' },
    { id: 5, name: '四' },
    { id: 6, name: '五' },
    { id: 7, name: '六' },
  ]
  // // 设置点击了的日历
  // const [clickData,setClickData] = useState<any[]>([])
  //农历1949-2100年查询表
  // let lunarYearArr = [
  //   0x0b557, //1949
  //   0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
  //   0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
  //   0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
  //   0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
  //   0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
  //   0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
  //   0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
  //   0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
  //   0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
  //   0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
  //   0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
  //   0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
  //   0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
  //   0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
  //   0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
  //   0x0d520 //2100
  // ];
  // let lunarMonth = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
  // let lunarDay = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '初', '廿'];
  // let tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  // let diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  // // // 获取当月天数
  // // const [calendarDays, setCalendarDays] = useState<any[]>([]);
  // // 左边时间
  // const [time,setTime ] = useState<TimeType>({
  //   year: '',
  //   monent: '',
  // })
  // // 设置存redux的日期
  // const [reduxTime, setReduxTime] = useState<any[]>([])
  // useEffect(()=>{
  //   // setTimeData([]);
  //   // const calendar = JSON.parse(JSON.stringify(calendarDays));
  //   // console.log(calendar,'calendarcalendar')
  //   // for (let i = 0; i < calendar.length; i++) {
  //   //   calendar[i].click = false
  //   // }
  //   // console.log(calendar,'calendar')
  //   // setCalendarDays(calendar);
  //   // setClickData([]);
  //   getMonthDaysCurrent(new Date());
  //   if (useSelectorItem.clickTIme.length>0){
  //     setReduxTime(useSelectorItem.clickTIme);
  //   }
  // }, [])
  // // 对应月份日期
  // const getMonthDaysCurrent = (e)=>{
  //   let data;
  //   if (useSelectorItem.clickTIme.length > 0) {
  //     data = useSelectorItem.clickTIme;
  //   }
  //   // const data = JSON.parse(JSON.stringify(reduxTime));
  //   let year = e.getFullYear() //年
  //   let month = e.getMonth() + 1 //月
  //   let date = e.getDate() // 日
  //   let day = e.getDay() // 周几
  //   let days = new Date(year, month, 0).getDate() //当月天数(即下个月0号=当月最后一天)
  //   let firstDayDate = new Date(year, month - 1, 1) // 当月1号
  //   let firstDay = firstDayDate.getDay() //当月1号对应的星期
  //   let lastDate = new Date(year, month - 1, days) //当月最后一天日期
  //   let lastDay = lastDate.getDay() //当月最后一天对应的星期
  //   // 设置时间
  //   setTime({ year, monent: month})
  //   // 上个月显示的天数及日期
  //   const calendarDaysArr:any = [];
  //   for (let i = firstDay - 1; i >= 0; i--) {
  //     let date = new Date(year, month - 1, -i)
  //     const lunarCalendarItem = sloarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  //     calendarDaysArr.push({
  //       'year': date.getFullYear(),
  //       'month': date.getMonth() + 1,
  //       'date': date.getDate(),
  //       'day': date.getDay(),
  //       'lunarCalendarItem': lunarCalendarItem.lunarDay,
  //       'current': false,
  //       'selected': false,
  //       'up':true,
  //     })
  //   }
  //   // 当月显示的日期
  //   for (let i = 1; i <= days; i++) {
  //     const lunarCalendarItem = sloarToLunar(year, month, i);
  //     calendarDaysArr.push({
  //       'year': year,
  //       'month': month,
  //       'date': i,
  //       'day': new Date(year, month - 1, i).getDay(),
  //       'current': true,
  //       'lunarCalendarItem': lunarCalendarItem.lunarDay,
  //       'selected': i == date, // 判断当前日期
  //       'stop':i>date
  //     })
  //   }
  //   // 下个月显示的天数及日期
  //   for (let i = 1; i < 7 - lastDay; i++) {
  //     let date = new Date(year, month, i)
  //     const lunarCalendarItem = sloarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  //     calendarDaysArr.push({
  //       'year': date.getFullYear(),
  //       'month': date.getMonth() + 1,
  //       'date': date.getDate(),
  //       'day': date.getDay(),
  //       'lunarCalendarItem': lunarCalendarItem.lunarDay,
  //       'current': false,
  //       'selected': false,
  //       'next':true,
  //       // 'stop':true
  //     })
  //   }
  //   // 设置内容
  //   if(data){
  //     if(data.length>0){
  //       for (let i = 0; i < calendarDaysArr.length;i++){
  //         for(let j=0;j<data[0].length;j++){
  //           if (calendarDaysArr[i].year == data[0][j].year && calendarDaysArr[i].month == data[0][j].month && calendarDaysArr[i].day == data[0][j].day && calendarDaysArr[i].lunarCalendarItem == data[0][j].lunarCalendarItem){
  //             calendarDaysArr[i].click = true
  //           }
  //         }
  //       }
  //     }
  //   }
  //   setCalendarDays(calendarDaysArr)
  // }
  // // 公历转农历函数
  // const sloarToLunar = (sy, sm, sd)=> {
  //   // 输入的月份减1处理
  //   sm -= 1;

  //   // 计算与公历基准的相差天数
  //   // Date.UTC()返回的是距离公历1970年1月1日的毫秒数,传入的月份需要减1
  //   let daySpan = (Date.UTC(sy, sm, sd) - Date.UTC(1949, 0, 29)) / (24 * 60 * 60 * 1000) + 1;
  //   let ly, lm, ld;
  //   // 确定输出的农历年份
  //   for (let j = 0; j < lunarYearArr.length; j++) {
  //     daySpan -= lunarYearDays(lunarYearArr[j]);
  //     if (daySpan <= 0) {
  //       ly = 1949 + j;
  //       // 获取农历年份确定后的剩余天数
  //       daySpan += lunarYearDays(lunarYearArr[j]);
  //       break
  //     }
  //   }

  //   // 确定输出的农历月份
  //   for (let k = 0; k < lunarYearMonths(lunarYearArr[ly - 1949]).length; k++) {
  //     daySpan -= lunarYearMonths(lunarYearArr[ly - 1949])[k];
  //     if (daySpan <= 0) {
  //       // 有闰月时，月份的数组长度会变成13，因此，当闰月月份小于等于k时，lm不需要加1
  //       if (hasLeapMonth(lunarYearArr[ly - 1949]) && hasLeapMonth(lunarYearArr[ly - 1949]) <= k) {
  //         if (hasLeapMonth(lunarYearArr[ly - 1949]) < k) {
  //           lm = k;
  //         } else if (hasLeapMonth(lunarYearArr[ly - 1949]) === k) {
  //           lm = '闰' + k;
  //         } else {
  //           lm = k + 1;
  //         }
  //       } else {
  //         lm = k + 1;
  //       }
  //       // 获取农历月份确定后的剩余天数
  //       daySpan += lunarYearMonths(lunarYearArr[ly - 1949])[k];
  //       break
  //     }
  //   }

  //   // 确定输出农历哪一天
  //   ld = daySpan;

  //   // 将计算出来的农历月份转换成汉字月份，闰月需要在前面加上闰字
  //   if (hasLeapMonth(lunarYearArr[ly - 1949]) && (typeof (lm) === 'string' && lm.indexOf('闰') > -1)) {
  //     lm = `闰${lunarMonth[parseInt(lm) - 1]}`
  //   } else {
  //     lm = lunarMonth[lm - 1];
  //   }

  //   // 将计算出来的农历年份转换为天干地支年
  //   ly = getTianGan(ly) + getDiZhi(ly);

  //   // 将计算出来的农历天数转换成汉字
  //   if (ld < 11) {
  //     ld = `${lunarDay[10]}${lunarDay[ld - 1]}`
  //   } else if (ld > 10 && ld < 20) {
  //     ld = `${lunarDay[9]}${lunarDay[ld - 11]}`
  //   } else if (ld === 20) {
  //     ld = `${lunarDay[1]}${lunarDay[9]}`
  //   } else if (ld > 20 && ld < 30) {
  //     ld = `${lunarDay[11]}${lunarDay[ld - 21]}`
  //   } else if (ld === 30) {
  //     ld = `${lunarDay[2]}${lunarDay[9]}`
  //   }
  //   return {
  //     lunarYear: ly,
  //     lunarMonth: lm,
  //     lunarDay: ld,
  //   }
  // }
  // // 计算农历年是否有闰月，参数为存储农历年的16进制
  // // 农历年份信息用16进制存储，其中16进制的最后1位可以用于判断是否有闰月
  // function hasLeapMonth(ly) {
  //   // 获取16进制的最后1位，需要用到&与运算符
  //   if (ly & 0xf) {
  //     return ly & 0xf
  //   } else {
  //     return false
  //   }
  // }

  // // 如果有闰月，计算农历闰月天数，参数为存储农历年的16进制
  // // 农历年份信息用16进制存储，其中16进制的第1位（0x除外）可以用于表示闰月是大月还是小月
  // const leapMonthDays = (ly)=> {
  //   if (hasLeapMonth(ly)) {
  //     // 获取16进制的第1位（0x除外）
  //     return (ly & 0xf0000) ? 30 : 29
  //   } else {
  //     return 0
  //   }
  // }

  // // 计算农历一年的总天数，参数为存储农历年的16进制
  // // 农历年份信息用16进制存储，其中16进制的第2-4位（0x除外）可以用于表示正常月是大月还是小月
  // function lunarYearDays(ly) {
  //   let totalDays = 0;

  //   // 获取正常月的天数，并累加
  //   // 获取16进制的第2-4位，需要用到>>移位运算符
  //   for (let i = 0x8000; i > 0x8; i >>= 1) {
  //     let monthDays = (ly & i) ? 30 : 29;
  //     totalDays += monthDays;
  //   }
  //   // 如果有闰月，需要把闰月的天数加上
  //   if (hasLeapMonth(ly)) {
  //     totalDays += leapMonthDays(ly);
  //   }

  //   return totalDays
  // }

  // // 获取农历每个月的天数
  // // 参数需传入16进制数值
  // function lunarYearMonths(ly) {
  //   let monthArr:any = [];

  //   // 获取正常月的天数，并添加到monthArr数组中
  //   // 获取16进制的第2-4位，需要用到>>移位运算符
  //   for (let i = 0x8000; i > 0x8; i >>= 1) {
  //     monthArr.push((ly & i) ? 30 : 29);
  //   }
  //   // 如果有闰月，需要把闰月的天数加上
  //   if (hasLeapMonth(ly)) {
  //     monthArr.splice(hasLeapMonth(ly), 0, leapMonthDays(ly));
  //   }

  //   return monthArr
  // }

  // // 将农历年转换为天干，参数为农历年
  // const getTianGan = (ly) => {
  //   let tianGanKey = (ly - 3) % 10;
  //   if (tianGanKey === 0) tianGanKey = 10;
  //   return tianGan[tianGanKey - 1]
  // }

  // // 将农历年转换为地支，参数为农历年
  // function getDiZhi(ly) {
  //   let diZhiKey = (ly - 3) % 12;
  //   if (diZhiKey === 0) diZhiKey = 12;
  //   return diZhi[diZhiKey - 1]
  // }
  // // 选择日期
  // const handleClick  = (v)=>{
  //   const date = v.year + '-' + addZero(v.month) + '-' + addZero(v.date);
  //   const dates = (new Date(date)).valueOf();
  //   const newDate = (new Date()).valueOf();
  //   if (newDate < dates){
  //     Msg('请设置今天之前的日期');
  //     return;
  //   }
  //   const calendarDaysArr = JSON.parse(JSON.stringify(calendarDays));
  //   const reduxItem = JSON.parse(JSON.stringify(reduxTime));
  //   const arrList = JSON.parse(JSON.stringify(arr));
  //   if(recorderType === 3){
  //     if(arrList.length  === 0){
  //       for (let i = 0; i < calendarDaysArr.length;i++){
  //         if (v.date == calendarDaysArr[i].date && v.month == calendarDaysArr[i].month && v.year == calendarDaysArr[i].year) {
  //           calendarDaysArr[i].click = true
  //           setArr([calendarDaysArr[i]])
  //         }
  //       }
  //       setCalendarDays(calendarDaysArr);
  //       return;
  //     }else{
  //       for (let i = 0; i < arrList.length; i++) {
  //         if (v.date == arrList[i].date && v.month == arrList[i].month && v.year == arrList[i].year) {
  //           for (let j = 0; j < calendarDaysArr.length; j++) {
  //               calendarDaysArr[j].click = false;
  //           }
  //           setCalendarDays(calendarDaysArr);
  //           setArr([])
  //         }else{
  //           for (let i = 0; i < calendarDaysArr.length; i++) {
  //             calendarDaysArr[i].click = false;
  //             if (v.date == calendarDaysArr[i].date && v.month == calendarDaysArr[i].month && v.year == calendarDaysArr[i].year) {
  //               calendarDaysArr[i].click = true
  //               setArr([calendarDaysArr[i]])
  //             }
  //           }
  //           setCalendarDays(calendarDaysArr);
  //         }
  //       }
  //       return;
  //       }
  //   }
  //   for (let i = 0; i < calendarDaysArr.length;i++){
  //     // 判断是同一天就设置点击
  //     if (v.date == calendarDaysArr[i].date && v.month == calendarDaysArr[i].month && v.year == calendarDaysArr[i].year && !v.up && !v.next){
  //       calendarDaysArr[i].click = !calendarDaysArr[i].click;
  //       let data:any[] = [];
  //       for (let i = 0; i < calendarDaysArr.length;i++){
  //         if (calendarDaysArr[i].click){
  //           data.push(calendarDaysArr[i]);
  //         }
  //       }
  //       if (reduxItem.length > 0) {
  //         for (let i = 0; i < reduxItem.length; i++) {
  //           for (let j = 0; j <data.length;j++){
  //             if (reduxItem[i].year === data[j].year && reduxItem[i].month === data[j].month && reduxItem[i].day === data[j].day){
  //               // reduxItem.splice(i,1)
  //             }else{
  //               reduxItem.push(data[i]);
  //             }
  //           }
  //         }
  //       }else{
  //         reduxItem.push(data)
  //       }
  //       dispatch(setClickTIme(reduxItem))
  //       setClickData(data)
  //       setCalendarDays(calendarDaysArr);
  //       return;
  //       // }
  //       //就刷新更改
  //     }else{
  //       // 判断向上还是向下
  //       // 向上
  //       if(v.up){
  //         let date = new Date(calendarDaysArr[i].year, calendarDaysArr[i].month - 1, calendarDaysArr[i].date);
  //         getMonthDaysCurrent(date);
  //         return;
  //         // 向下
  //       }else if(v.next){
  //         let date = new Date(calendarDaysArr[i].year, calendarDaysArr[i].month + 1, calendarDaysArr[i].date)
  //         getMonthDaysCurrent(date);
  //         return;
  //       }
  //     }
  //   }
  // }
  // 切换时间
  // const handleChangeTime = (type:number)=>{
  //   if(type === 0){
  //     let date = new Date(JSON.parse(time.year), JSON.parse(time.monent)-2,1)
  //     getMonthDaysCurrent(date);
  //     return;
  //   }else{
  //     let date = new Date(JSON.parse(time.year), JSON.parse(time.monent), 1)
  //     getMonthDaysCurrent(date);
  //     return;
  //   }
  // }
  // // 左
  // const onScrollToUpper = ()=>{
  //   let date = new Date(JSON.parse(time.year), JSON.parse(time.monent), 1)
  //   getMonthDaysCurrent(date);
  // }
  // // 右
  // const onScrollToLower = ()=>{
  //   let date = new Date(JSON.parse(time.year), JSON.parse(time.monent) - 2, 1)
  //   getMonthDaysCurrent(date);
  // }
  // const handleCalendarSub = ()=>{
  //   if (recorderType === 3){
  //     const data = JSON.parse(JSON.stringify(arr));
  //     let time ;
  //     if(data.length>0){
  //       time = data[0].year + '-' + addZero(data[0].month) + '-' + addZero(data[0].date);
  //     }
  //     setModel({ ...model, time: time });
  //     setCalendarModalDisplay(false);
  //   }else{
  //     const data = JSON.parse(JSON.stringify(clickData));
  //     const time = data.length +'天';
  //     setModel({ ...model, time: time});
  //     setCalendarModalDisplay(false);
  //     setTimeData(data);
  //   }
  // }
  // // 设置年月日小于0前面加0
  // const addZero = (num) => {
  //   if (parseInt(num) < 10) {
  //     num = '0' + num;
  //   }
  //   return num;
  // }
  // const handleClose = ()=>{
  //   setCalendarModalDisplay(false);
  //   // 并清空
  //   setTimeData([]);
  //   const calendar = JSON.parse(JSON.stringify(calendarDays));
  //   for(let i=0;i<calendar.length;i++){
  //     calendar[i].click = false
  //   }
  //   setCalendarDays(calendar);
  //   setClickData([]);
  // }
  // console.log(calendarDays,'calendarDays')
  return(
    <View>
    {display &&
    <View className='calendarModal-complaintModal'>
      <View className='calendarModal-complaintModal-content'>
          <View className='icon-left'><Image src={`${IMGCDNURL}rili.png`} className='icon-left-image'/></View>
          <View className='icon-right'><Image src={`${IMGCDNURL}rili.png`} className='icon-right-image'/></View>
        <View className='calendarModal-complaintModal-content-top'>
            <View className='content-top-close' onClick={handleCalendarClose}>取消</View>
            <View className='content-top-title'>选择日期(可选多天)</View>
            <View className='content-top-change' onClick={handleCalendarSub}>确定</View>
        </View>
        <View className='content-tips'>
          <View className='content-tips-time'> 
              {time.year}年 <View className='leftIcon' onClick={() => handleChangeTime(0)} />{time.monent}月<View className='righticon' onClick={() => handleChangeTime(1)}/>
          </View>
          <View><Text className='content-tips-box'></Text>表示当天已有记工</View>
        </View>
        <View className='content-times'>
          <ScrollView
            className='scrollView'
            scrollX
            scrollWithAnimation
            upperThreshold={50}
            lowerThreshold={50}
            onScrollToUpper={onScrollToUpper}
            onScrollToLower={onScrollToLower}
            >
            <View className='scrollView-content'>
            <View className='content-weekes'>
              {weeks.map((v) => (
                <View key={v.id} className='content-weekes-week'>{v.name}</View>
              ))}
            </View>
            <View className='content-days'>
            {calendarDays.map((v,i)=>(
              <View key={i + i} 
                onClick={() => { handleClickCalendar(v)}}
                style={v.record ? { background: 'rgba(240,189,48,0.3)' } : ''}
                // className={v.current ? 'content-days-day' :'content-days-day-no'}
                className={classnames({
                  'content-days-day': v.current,
                  'content-days-day-no': !v.current,
                  'content-days-day-choice': v.choice,
                  'content-days-day-click': v.click,
                })}
                >
                <View style={v.record ? { color: '#3C3B3B' } : ''}>{v.date}</View>
                <View className='lunarCalendarItem' style={v.record ? { color: '#BABABAFF' } : ''}>{v.lunarCalendarItem}</View>
                {/* {recorderType === 3 && <View className='noCheckbox'></View>
                } */}
                {/* {recorderType !== 3 &&  */}
                <View>
                  {!v.next && !v.up && <View><Checkbox className={classnames({
                    'checkbox': !v.click,
                    'checkbox-click': v.click,
                  })} 
                    disabled={v.stop}
                    checked={v.click}
                    value={v.value}
                    color='rgba(253, 120, 13, 1)'
                  /></View>
                  }
                </View>
                {/* } */}
              </View>
            ))}
          </View>
          </View>
        </ScrollView>
        </View>
      </View>
    </View>
      }
    </View>
  )
}