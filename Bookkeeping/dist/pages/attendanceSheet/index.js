(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/attendanceSheet/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/attendanceSheet/index.tsx?taro&type=script&parse=PAGE&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/attendanceSheet/index.tsx?taro&type=script&parse=PAGE& ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _index = __webpack_require__(/*! ../../utils/request/index */ "./src/utils/request/index.ts");

__webpack_require__(/*! ./index.scss */ "./src/pages/attendanceSheet/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AttendanceSheet = (_temp2 = _class = function (_Taro$Component) {
  _inherits(AttendanceSheet, _Taro$Component);

  function AttendanceSheet() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AttendanceSheet);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AttendanceSheet.__proto__ || Object.getPrototypeOf(AttendanceSheet)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '考勤表'
    }, _this.$usedState = ["$compid__253", "tebArr", "fixedTab", "year", "month"], _this.customComponents = ["CalendarModal"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AttendanceSheet, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(AttendanceSheet.prototype.__proto__ || Object.getPrototypeOf(AttendanceSheet.prototype), '_constructor', this).call(this, props);

      this.$$refs = new _taroWeapp2.default.RefsArray();
    }
  }, {
    key: '_createData',
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__253"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__253 = _genCompid2[0],
          $compid__253 = _genCompid2[1];

      // 月份


      var _useState = (0, _taroWeapp.useState)(''),
          _useState2 = _slicedToArray(_useState, 2),
          date = _useState2[0],
          setDate = _useState2[1];
      // 年


      var _useState3 = (0, _taroWeapp.useState)(),
          _useState4 = _slicedToArray(_useState3, 2),
          year = _useState4[0],
          setYear = _useState4[1];
      //月


      var _useState5 = (0, _taroWeapp.useState)(''),
          _useState6 = _slicedToArray(_useState5, 2),
          month = _useState6[0],
          setMonth = _useState6[1];

      var _useState7 = (0, _taroWeapp.useState)([]),
          _useState8 = _slicedToArray(_useState7, 2),
          fixedTab = _useState8[0],
          setFixedTab = _useState8[1];

      var _useState9 = (0, _taroWeapp.useState)([]),
          _useState10 = _slicedToArray(_useState9, 2),
          tebArr = _useState10[0],
          setTabArr = _useState10[1];

      var _useState11 = (0, _taroWeapp.useState)([{}, {}, {}]),
          _useState12 = _slicedToArray(_useState11, 2),
          data = _useState12[0],
          setData = _useState12[1];

      var _useState13 = (0, _taroWeapp.useState)(false),
          _useState14 = _slicedToArray(_useState13, 2),
          display = _useState14[0],
          setDisplay = _useState14[1];
      // 一键对公


      var handleShare = function handleShare() {
        setDisplay(true);
      };
      // 取消
      var handleClose = function handleClose() {
        setDisplay(false);
      };
      var addZero = function addZero(num) {
        if (parseInt(num) < 10) {
          num = '0' + num;
        }
        return num;
      };
      (0, _taroWeapp.useEffect)(function () {
        // 进来获取本月数据
        var time = new Date();
        var newTime = time.getFullYear() + '-' + addZero(time.getMonth() + 1);
        var years = time.getFullYear();
        var months = addZero(time.getMonth() + 1);
        setYear(years);
        setMonth(months);
        setDate(newTime);
        getList(newTime);
      }, []);
      // 获取数据
      var getList = function getList(newTime) {
        var params = {
          date: newTime
        };
        // 获取本月天数
        // const time = newTime.setDate(0);
        // const day = time.getDate();
        // console.log(day);
        var curDate = new Date(newTime);
        /* 获取当前月份 */
        var curMonth = curDate.getMonth();
        /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        curDate.setMonth(curMonth + 1);
        /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
        curDate.setDate(0);
        var day = curDate.getDate();
        // 设置第一列的天数
        var dayArr = [];
        for (var k = 1; k <= day; k++) {
          var _obj = {
            id: k,
            name: k,
            default: true
          };
          dayArr.push(_obj);
        }
        //本月统计push 到数组第一个
        var obj = { id: '00', name: '本月统计', default: true };
        var arr = [obj].concat(dayArr);
        var arrObj = {
          list: arr
        };
        var tebArrList = JSON.parse(JSON.stringify(tebArr));
        tebArrList.push(arrObj);
        var fixedTabList = JSON.parse(JSON.stringify(fixedTab));
        var defaultArr = [{ id: 1, name: '工人', default: true }, { id: 2, name: '记工类型', default: true }];
        var fixedTabObj = {
          list: defaultArr
        };
        fixedTabList.push(fixedTabObj);
        var tatalArr = [];
        // 左边总计
        var tatalLeft = [{ name: '总计', id: Math.random(), default: true }, {
          type: {
            hour: true,
            work: true,
            amount: true,
            borrow: true
          }, id: Math.random()
        }];
        var tatalLeftObj = {};
        tatalLeftObj.list = tatalLeft;
        tatalArr.push(tatalLeftObj);
        (0, _index.bkgetExcelDataAction)(params).then(function (res) {
          var _obj$list;

          var data = res.data;
          var leftData = [];
          var rightData = [];
          var tatalDataArr = [];
          var jigongSum = [];
          var daySum = [];
          var workSum = [];
          var borrowNumSum = [];
          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              var leftObj = {};
              // 右边第一个总计
              var rightObj = {};
              rightObj.name = 0;
              rightObj.type = {};
              rightObj.type.amount = '';
              rightObj.type.hour = {
                work_time: '',
                over_time: ''
              };
              rightObj.type.work = {
                work_time: '',
                over_time: ''
              };
              rightObj.type.borrow = '';
              // 设置左边的参数
              var leftListData = [];
              // 姓名
              var leftName = { name: data[i].name };
              //点工类型
              var leftType = {};
              var hour = undefined;
              if (data[i].hour.length) {
                hour = true;
              }
              // 包工(天)
              var work = undefined;
              if (data[i].work.length) {
                work = true;
              }
              // 包工(量)
              var amount = undefined;
              if (data[i].amount.length) {
                amount = true;
              }
              // 借支
              var borrow = undefined;
              if (data[i].borrow.length) {
                borrow = true;
              }
              var Type = {
                hour: hour,
                work: work,
                amount: amount,
                borrow: borrow
              };
              leftType.type = Type;
              leftListData.push(leftName, leftType);
              leftObj.list = leftListData;
              leftData.push(leftObj);
              // 设置右边参数
              var rightListData = [];
              // 数组长度超过1就是显示几笔，为1的时候就显示内容
              // 记工
              var dayArrs = JSON.parse(JSON.stringify(dayArr));
              var numSumWorkTime = 0;
              // 借支总金额
              var numBorrow = 0;
              // 遍历每一天
              for (var j = 0; j < dayArrs.length; j++) {
                dayArrs[j].type = {};
                // 判断有记工
                var sumWorkTime = 0;
                var sumOverTime = 0;
                if (data[i].hour.length > 0) {
                  var num = [];
                  for (var _k = 0; _k < data[i].hour.length; _k++) {
                    num.push(data[i].hour[_k].total);
                    sumWorkTime = sumWorkTime + +data[i].hour[_k].total.work_time;
                    sumOverTime = sumOverTime + +data[i].hour[_k].total.over_time;
                    // 判断是哪天给哪天设置值
                    if (data[i].hour[_k].date_num == dayArrs[j].name) {
                      if (data[i].hour[_k].list) {
                        if (data[i].hour[_k].list.length > 0) {
                          if (data[i].hour[_k].list.length == 1) {
                            var hourData = {
                              work_time: data[i].hour[_k].list[0].work_time,
                              over_time: data[i].hour[_k].list[0].overtime
                            };
                            dayArrs[j].type.hour = hourData;
                          } else if (data[i].hour[_k].list.length > 1) {
                            var _hourData = {
                              num: data[i].hour[_k].list.length + '笔'
                            };
                            dayArrs[j].type.hour = _hourData;
                          }
                        }
                      }
                    }
                  }
                  var work_time = 0;
                  var over_time = 0;
                  if (num.length > 0) {
                    for (var z = 0; z < num.length; z++) {
                      if (num[z].work_time) {
                        work_time = work_time + +num[z].work_time;
                      }
                      if (num[z].over_time) {
                        over_time = over_time + +num[z].over_time;
                      }
                    }
                  }
                  rightObj.type.hour.work_time = work_time;
                  rightObj.type.hour.over_time = over_time;
                }
                numSumWorkTime = numSumWorkTime + sumOverTime;
                // 判断有按天work
                if (data[i].work.length > 0) {
                  var _num = [];
                  for (var _k2 = 0; _k2 < data[i].work.length; _k2++) {
                    _num.push(data[i].work[_k2].total);
                    // 判断是哪天给哪天设置值
                    if (data[i].work[_k2].date_num == dayArrs[j].name) {
                      if (data[i].work[_k2].list) {
                        if (data[i].work[_k2].list.length > 0) {
                          if (data[i].work[_k2].list.length == 1) {
                            var _hourData2 = {
                              work_time: data[i].work[_k2].list[0].work_time,
                              over_time: data[i].work[_k2].list[0].overtime
                            };
                            dayArrs[j].type.work = _hourData2;
                          } else if (data[i].work[_k2].list.length > 1) {
                            var _hourData3 = {
                              num: data[i].work[_k2].list.length
                            };
                            dayArrs[j].type.work = _hourData3;
                          }
                        }
                      }
                    }
                  }
                  var _work_time = 0;
                  var _over_time = 0;
                  if (_num.length > 0) {
                    for (var _z = 0; _z < _num.length; _z++) {
                      if (_num[_z].work_time) {
                        _work_time = _work_time + +_num[_z].work_time;
                      }
                      if (_num[_z].over_time) {
                        _over_time = _over_time + +_num[_z].over_time;
                      }
                    }
                  }
                  rightObj.type.work.work_time = _work_time;
                  rightObj.type.work.over_time = _over_time;
                }
                // 判断按量 amount
                if (data[i].amount.length > 0) {
                  var _num2 = [];
                  for (var _k3 = 0; _k3 < data[i].amount.length; _k3++) {
                    // 判断是哪天给哪天设置值
                    if (data[i].amount[_k3].date_num == dayArrs[j].name) {
                      // 按量返回的是数组
                      if (data[i].amount[_k3].total.length > 0) {
                        for (var b = 0; b < data[i].amount[_k3].total.length; b++) {
                          _num2.push(data[i].amount[_k3].total[b]);
                        }
                      }
                      if (data[i].amount[_k3].list) {
                        if (data[i].amount[_k3].list.length > 0) {
                          if (data[i].amount[_k3].list.length == 1) {
                            var _hourData4 = {
                              unit_num: data[i].amount[_k3].list[0].unit_num,
                              unit: data[i].amount[_k3].list[0].unit
                            };
                            dayArrs[j].type.amount = _hourData4;
                          } else if (data[i].amount[_k3].list.length > 1) {
                            var _hourData5 = {
                              num: data[i].amount[_k3].list.length + '笔'
                            };
                            dayArrs[j].type.amount = _hourData5;
                          }
                        }
                      }
                    }
                  }
                  var _arr = [];
                  if (_num2.length > 0) {
                    for (var c = 0; c < _num2.length; c++) {
                      if (_arr.length === 0) {
                        _arr.push(_num2[c]);
                      } else {
                        for (var m = 0; m < _arr.length; m++) {
                          if (_arr[m].unit_name !== _num2[c].unit_name) {
                            // arr[m].unit_name = num[c].unit_name;
                            // arr[m].sum = num[c].sum;
                            _arr.push(_num2[c]);
                          } else {
                            _arr[m].sum += +_num2[c].sum;
                          }
                        }
                      }
                    }
                    rightObj.type.amount = _arr[0];
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
                  var _num3 = [];
                  for (var _k4 = 0; _k4 < data[i].borrow.length; _k4++) {
                    _num3.push(data[i].borrow[_k4].total);
                    // 判断是哪天给哪天设置值
                    if (data[i].borrow[_k4].date_num == dayArrs[j].name) {
                      if (data[i].borrow[_k4].list) {
                        if (data[i].borrow[_k4].list.length > 0) {
                          if (data[i].borrow[_k4].list.length == 1) {
                            var _hourData6 = {
                              money: data[i].borrow[_k4].list[0].money
                            };
                            dayArrs[j].type.borrow = _hourData6;
                          } else if (data[i].borrow[_k4].list.length > 1) {
                            var _hourData7 = {
                              num: data[i].borrow[_k4].list.length + '笔'
                            };
                            dayArrs[j].type.borrow = _hourData7;
                          }
                        }
                      }
                    }
                  }
                  var money = 0;
                  if (_num3.length > 0) {
                    for (var _z2 = 0; _z2 < _num3.length; _z2++) {
                      if (_num3[_z2].money) {
                        money = money + +_num3[_z2].money;
                      }
                    }
                  }
                  rightObj.type.borrow = money;
                  numBorrow = numBorrow + rightObj.type.borrow;
                }
              }
              var list = [rightObj].concat(_toConsumableArray(dayArrs));
              rightListData.push(list);
              var rightDataObj = {
                list: rightListData[0]
              };
              rightData.push(rightDataObj);
              // 获取总的
              // 遍历这个月天数
              // 获取每一个的30天
              // 记工
              for (var _c = 0; _c < data[i].hour.length; _c++) {
                jigongSum.push(data[i].hour[_c]);
              }
              //按量
              for (var _c2 = 0; _c2 < data[i].amount.length; _c2++) {
                daySum.push(data[i].amount[_c2]);
              }
              // 按天
              for (var _c3 = 0; _c3 < data[i].work.length; _c3++) {
                workSum.push(data[i].work[_c3]);
              }
              // 借支
              for (var _c4 = 0; _c4 < data[i].borrow.length; _c4++) {
                borrowNumSum.push(data[i].borrow[_c4]);
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
          var borrowSum = 0;
          // 点工时间
          var hourWorkTimeSum = 0;
          // 点工加班时间
          var hourOverTimeSum = 0;
          // 按天时间
          var workWorkTimeSum = 0;
          // 按天加班时间
          var workOverTimeSum = 0;
          // 按量
          var sumSum = 0;
          var unitNameSum = '';
          // console.log(rightData,'rightData')
          for (var _i = 0; _i < rightData.length; _i++) {
            if (rightData[_i].list[0].name === 0) {
              // 借支
              if (rightData[_i].list[0].type.borrow) {
                borrowSum += +rightData[_i].list[0].type.borrow;
              }
              // 点工
              if (Object.keys(rightData[_i].list[0].type.hour).length) {
                hourWorkTimeSum += +rightData[_i].list[0].type.hour.work_time;
                hourOverTimeSum += +rightData[_i].list[0].type.hour.over_time;
              }
              // 按天
              if (Object.keys(rightData[_i].list[0].type.work).length) {
                workWorkTimeSum += +rightData[_i].list[0].type.work.work_time;
                workOverTimeSum += +rightData[_i].list[0].type.work.over_time;
              }
              // 按量
              if (Object.keys(rightData[_i].list[0].type.amount).length) {
                sumSum += +rightData[_i].list[0].type.amount.sum;
                unitNameSum = rightData[_i].list[0].type.amount.unit_name;
              }
            }
          }
          console.log(sumSum, 'sumSum');
          console.log(unitNameSum, 'unitNameSum');
          var obj = {};
          obj.list = [];
          var sumObj = {
            id: 0,
            type: {
              amount: {
                sum: sumSum,
                unit_name: unitNameSum
              },
              borrow: {
                money: borrowSum
              },
              hour: { work_time: hourWorkTimeSum.toFixed(2), over_time: hourOverTimeSum.toFixed(2) },
              work: { work_time: workWorkTimeSum.toFixed(2), over_time: workOverTimeSum.toFixed(2) }
            }
          };
          obj.list.push(sumObj);
          //计算出哪些天数有数据
          // 记工
          var objItem = {};
          var jigongSums = jigongSum.reduce(function (item, next) {
            objItem[next.date_num] ? '' : objItem[next.date_num] = item.push(next);
            return item;
          }, []);
          console.log(jigongSums, 'objItem');
          // 按量
          var dayObj = {};
          var daySums = daySum.reduce(function (item, next) {
            dayObj[next.date_num] ? '' : dayObj[next.date_num] = item.push(next);
            return item;
          }, []);
          // 按天
          var workObj = {};
          var workSums = workSum.reduce(function (item, next) {
            workObj[next.date_num] ? '' : workObj[next.date_num] = item.push(next);
            return item;
          }, []);
          //借支
          var borrowObj = {};
          var borrowNumSums = borrowNumSum.reduce(function (item, next) {
            borrowObj[next.date_num] ? '' : borrowObj[next.date_num] = item.push(next);
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
          for (var _i2 = 0; _i2 < jigongSum.length; _i2++) {
            for (var _j = 0; _j < jigongSums.length; _j++) {
              if (jigongSum[_i2].date_num === jigongSums[_j].date_num) {
                jigongSums[_j].total.work_time += parseInt(jigongSum[_i2].total.work_time);
                jigongSums[_j].total.over_time += parseInt(jigongSum[_i2].total.over_time);
              }
            }
          }
          // 按天
          for (var _i3 = 0; _i3 < workSum.length; _i3++) {
            for (var _j2 = 0; _j2 < workSums.length; _j2++) {
              if (workSum[_i3].date_num === workSums[_j2].date_num) {
                workSums[_j2].total.work_time += parseInt(workSum[_i3].total.work_time);
                workSums[_j2].total.over_time += parseInt(workSum[_i3].total.over_time);
              }
            }
          }
          // 借支
          for (var _i4 = 0; _i4 < borrowNumSum.length; _i4++) {
            for (var _j3 = 0; _j3 < borrowNumSums.length; _j3++) {
              if (borrowNumSum[_i4].date_num === borrowNumSums[_j3].date_num) {
                // console.log(borrowNumSum[i].total.money,'borrowNumSum[i].total.money')
                borrowNumSums[_j3].total.borrow += +borrowNumSum[_i4].total.money;
              }
            }
          }
          //按量 daySums
          for (var _i5 = 0; _i5 < daySums.length; _i5++) {
            for (var _j4 = 0; _j4 < daySums.length; _j4++) {
              if (daySums[_i5].date_num === borrowNumSums[_j4].date_num) {
                daySums[_j4].total.borrow += +daySums[_i5].total.money;
              }
            }
          }
          var dayArrItme = JSON.parse(JSON.stringify(dayArr));
          for (var _i6 = 0; _i6 < dayArrItme.length; _i6++) {
            var _obj2 = {
              type: {
                hour: {
                  over_time: '',
                  work_time: ''
                },
                borrow: {
                  money: ''
                },
                work: {
                  over_time: '',
                  work_time: ''
                }
              }
            };
            // 记工
            for (var _j5 = 0; _j5 < jigongSums.length; _j5++) {
              if (dayArrItme[_i6].name === jigongSums[_j5].date_num) {
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
                console.log(dayArrItme[_i6], 'dayArrItme[i]dayArrItme[i]');
                _obj2.type.hour.over_time = parseInt(jigongSums[_j5].total.over_time).toFixed(2);
                _obj2.type.hour.work_time = parseInt(jigongSums[_j5].total.work_time).toFixed(2);
                // dayArrItme[i] = obj;
              }
            }
            console.log(_obj2, 'objobjobjobj');
            // 按天
            for (var _j6 = 0; _j6 < workSums.length; _j6++) {
              if (dayArrItme[_i6].name === workSums[_j6].date_num) {
                _obj2.type.work.over_time = parseInt(workSums[_j6].total.over_time).toFixed(2);
                _obj2.type.work.work_time = parseInt(workSums[_j6].total.work_time).toFixed(2);
              }
            }
            // 借支
            for (var _j7 = 0; _j7 < borrowNumSums.length; _j7++) {
              if (dayArrItme[_i6].name === borrowNumSums[_j7].date_num) {
                console.log(borrowNumSums[_j7].total.borrow, '312312312');
                _obj2.name = borrowNumSums[_j7].date_num, _obj2.type.borrow.money = borrowNumSums[_j7].total.borrow;
              }
            }
            dayArrItme[_i6] = _obj2;
          }
          setFixedTab([].concat(_toConsumableArray(fixedTabList), leftData, tatalArr));
          console.log(obj, 'obj');
          (_obj$list = obj.list).push.apply(_obj$list, _toConsumableArray(dayArrItme));
          rightData.push(obj);
          console.log(rightData, 'rightData');
          setTabArr([].concat(_toConsumableArray(tebArrList), rightData));
        });
      };
      // 设置时间
      var handleTime = function handleTime(e) {
        var time = e.detail.value;
        setYear(e.detail.value.slice(0, 4));
        setMonth(e.detail.value.slice(5, 8));
        getList(time);
      };
      // 跳转
      var userRouteJump = function userRouteJump(url) {
        _taroWeapp2.default.navigateTo({
          url: url
        });
      };
      console.log(tebArr.length, 'tebArr');

      this.anonymousFunc0 = function (e) {
        return handleTime(e);
      };

      this.anonymousFunc1 = handleShare;

      this.anonymousFunc2 = function () {
        return userRouteJump("/pages/recorder/index");
      };

      this.anonymousFunc3 = function () {
        return userRouteJump("/pages/recorder/index");
      };

      _taroWeapp.propsManager.set({
        "display": display,
        "handleClose": handleClose
      }, $compid__253, $prevCompid__253);
      Object.assign(this.__state, {
        $compid__253: $compid__253,
        tebArr: tebArr,
        fixedTab: fixedTab,
        year: year,
        month: month
      });
      return this.__state;
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
    key: 'anonymousFunc2',
    value: function anonymousFunc2(e) {
      ;
    }
  }, {
    key: 'anonymousFunc3',
    value: function anonymousFunc3(e) {
      ;
    }
  }]);

  return AttendanceSheet;
}(_taroWeapp2.default.Component), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3"], _class.$$componentPath = "pages/attendanceSheet/index", _temp2);


AttendanceSheet.config = { navigationBarTitleText: '考勤表' };
exports.default = AttendanceSheet;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(AttendanceSheet, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/attendanceSheet/index.tsx?taro&type=template&parse=PAGE&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/attendanceSheet/index.tsx?taro&type=template&parse=PAGE& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/attendanceSheet/index.wxml";

/***/ }),

/***/ "./src/pages/attendanceSheet/index.scss":
/*!**********************************************!*\
  !*** ./src/pages/attendanceSheet/index.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/attendanceSheet/index.tsx":
/*!*********************************************!*\
  !*** ./src/pages/attendanceSheet/index.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=PAGE& */ "./src/pages/attendanceSheet/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=PAGE& */ "./src/pages/attendanceSheet/index.tsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/attendanceSheet/index.tsx?taro&type=script&parse=PAGE&":
/*!**************************************************************************!*\
  !*** ./src/pages/attendanceSheet/index.tsx?taro&type=script&parse=PAGE& ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/attendanceSheet/index.tsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/attendanceSheet/index.tsx?taro&type=template&parse=PAGE&":
/*!****************************************************************************!*\
  !*** ./src/pages/attendanceSheet/index.tsx?taro&type=template&parse=PAGE& ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/attendanceSheet/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./src/pages/attendanceSheet/index.tsx","runtime","taro","vendors","common"]]]);