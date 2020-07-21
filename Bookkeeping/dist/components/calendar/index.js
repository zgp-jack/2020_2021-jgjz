(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["components/calendar/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/components/calendar/index.tsx?taro&type=script&parse=COMPONENT&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/components/calendar/index.tsx?taro&type=script&parse=COMPONENT& ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _redux = __webpack_require__(/*! @tarojs/redux */ "./node_modules/@tarojs/redux/index.js");

var _index = __webpack_require__(/*! ../../config/index */ "./src/config/index.ts");

__webpack_require__(/*! ./index.scss */ "./src/components/calendar/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// interface TimeType{
//   year:string,
//   monent:string,
// }

var CalendarModal = (_temp2 = _class = function (_Taro$Component) {
  _inherits(CalendarModal, _Taro$Component);

  function CalendarModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CalendarModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CalendarModal.__proto__ || Object.getPrototypeOf(CalendarModal)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["loopArray53", "display", "IMGCDNURL", "weeks", "calendarDays", "time", "handleClickCalendar", "getMonthDaysCurrent", "handleCalendar", "setModel", "model", "setTimeData", "recorderType", "arr", "clickData", "handleCalendarClose", "handleChangeTime", "handleCalendarSub", "__fn_onClick", "onScrollToUpper", "onScrollToLower"], _this.anonymousFunc2Map = {}, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CalendarModal, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(CalendarModal.prototype.__proto__ || Object.getPrototypeOf(CalendarModal.prototype), '_constructor', this).call(this, props);

      this.$$refs = new _taroWeapp2.default.RefsArray();
    }
  }, {
    key: '_createData',
    value: function _createData() {
      var _this2 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var _props = this.__props,
          display = _props.display,
          handleClickCalendar = _props.handleClickCalendar,
          calendarDays = _props.calendarDays,
          getMonthDaysCurrent = _props.getMonthDaysCurrent,
          time = _props.time,
          handleCalendar = _props.handleCalendar,
          setModel = _props.setModel,
          model = _props.model,
          setTimeData = _props.setTimeData,
          recorderType = _props.recorderType,
          arr = _props.arr,
          clickData = _props.clickData,
          handleCalendarClose = _props.handleCalendarClose,
          handleChangeTime = _props.handleChangeTime,
          handleCalendarSub = _props.handleCalendarSub,
          onScrollToUpper = _props.onScrollToUpper,
          onScrollToLower = _props.onScrollToLower;

      // 储存点击天数
      // 获取存入的公用内容

      var useSelectorItem = (0, _redux.useSelector)(function (state) {
        return state;
      });
      var dispatch = (0, _redux.useDispatch)();
      // const [arr,setArr] = useState<any[]>([]);
      // const [obj,setObj] = useState<any>()
      // 星期
      var weeks = [{ id: 1, name: '日' }, { id: 2, name: '一' }, { id: 3, name: '二' }, { id: 4, name: '三' }, { id: 5, name: '四' }, { id: 6, name: '五' }, { id: 7, name: '六' }];
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

      this.anonymousFunc0 = function () {
        return handleChangeTime(0);
      };

      this.anonymousFunc1 = function () {
        return handleChangeTime(1);
      };

      var loopArray53 = display ? calendarDays.map(function (v, i) {
        v = {
          $original: (0, _taroWeapp.internal_get_original)(v)
        };
        var $loopState__temp2 = display ? i + i : null;

        var _$indexKey = "bbdzz" + i;

        _this2.anonymousFunc2Map[_$indexKey] = function () {
          handleClickCalendar(v.$original);
        };

        var $loopState__temp4 = display ? (0, _classnames2.default)({
          'content-days-day': v.$original.current,
          'content-days-day-no': !v.$original.current,
          'content-days-day-choice': v.$original.choice,
          'content-days-day-click': v.$original.click
        }) : null;
        var $loopState__temp6 = !v.$original.next && !v.$original.up ? (0, _classnames2.default)({
          'checkbox': !v.$original.click,
          'checkbox-click': v.$original.click
        }) : null;
        return {
          $loopState__temp2: $loopState__temp2,
          _$indexKey: _$indexKey,
          $loopState__temp4: $loopState__temp4,
          $loopState__temp6: $loopState__temp6,
          $original: v.$original
        };
      }) : [];
      Object.assign(this.__state, {
        loopArray53: loopArray53,
        display: display,
        IMGCDNURL: _index.IMGCDNURL,
        weeks: weeks,
        calendarDays: calendarDays,
        time: time
      });
      return this.__state;
    }
  }, {
    key: 'funPrivatebajzz',
    value: function funPrivatebajzz() {
      return this.props.handleCalendarClose.apply(undefined, Array.prototype.slice.call(arguments, 1));
    }
  }, {
    key: 'funPrivatebbazz',
    value: function funPrivatebbazz() {
      return this.props.handleCalendarSub.apply(undefined, Array.prototype.slice.call(arguments, 1));
    }
  }, {
    key: 'anonymousFunc0',
    value: function anonymousFunc0(e) {
      ;
    }
  }, {
    key: 'anonymousFunc1',
    value: function anonymousFunc1(e) {
      ;
    }
  }, {
    key: 'funPrivatebbbzz',
    value: function funPrivatebbbzz() {
      return this.props.onScrollToUpper.apply(undefined, Array.prototype.slice.call(arguments, 1));
    }
  }, {
    key: 'funPrivatebbczz',
    value: function funPrivatebbczz() {
      return this.props.onScrollToLower.apply(undefined, Array.prototype.slice.call(arguments, 1));
    }
  }, {
    key: 'anonymousFunc2',
    value: function anonymousFunc2(_$indexKey) {
      var _anonymousFunc2Map;

      ;

      for (var _len2 = arguments.length, e = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        e[_key2 - 1] = arguments[_key2];
      }

      return this.anonymousFunc2Map[_$indexKey] && (_anonymousFunc2Map = this.anonymousFunc2Map)[_$indexKey].apply(_anonymousFunc2Map, e);
    }
  }]);

  return CalendarModal;
}(_taroWeapp2.default.Component), _class.$$events = ["funPrivatebajzz", "funPrivatebbazz", "anonymousFunc0", "anonymousFunc1", "funPrivatebbbzz", "funPrivatebbczz", "anonymousFunc2"], _class.$$componentPath = "components/calendar/index", _temp2);
exports.default = CalendarModal;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(CalendarModal));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/components/calendar/index.tsx?taro&type=template&parse=COMPONENT&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/components/calendar/index.tsx?taro&type=template&parse=COMPONENT& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "components/calendar/index.wxml";

/***/ }),

/***/ "./src/components/calendar/index.scss":
/*!********************************************!*\
  !*** ./src/components/calendar/index.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/calendar/index.tsx":
/*!*******************************************!*\
  !*** ./src/components/calendar/index.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=COMPONENT& */ "./src/components/calendar/index.tsx?taro&type=template&parse=COMPONENT&");
/* harmony import */ var _index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=COMPONENT& */ "./src/components/calendar/index.tsx?taro&type=script&parse=COMPONENT&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/components/calendar/index.tsx?taro&type=script&parse=COMPONENT&":
/*!*****************************************************************************!*\
  !*** ./src/components/calendar/index.tsx?taro&type=script&parse=COMPONENT& ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=script&parse=COMPONENT& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/components/calendar/index.tsx?taro&type=script&parse=COMPONENT&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/calendar/index.tsx?taro&type=template&parse=COMPONENT&":
/*!*******************************************************************************!*\
  !*** ./src/components/calendar/index.tsx?taro&type=template&parse=COMPONENT& ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=template&parse=COMPONENT& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/components/calendar/index.tsx?taro&type=template&parse=COMPONENT&");
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./src/components/calendar/index.tsx","runtime","taro","vendors","common"]]]);