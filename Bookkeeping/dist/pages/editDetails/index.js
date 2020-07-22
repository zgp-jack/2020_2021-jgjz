(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/editDetails/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/editDetails/index.tsx?taro&type=script&parse=PAGE&":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/editDetails/index.tsx?taro&type=script&parse=PAGE& ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _index2 = __webpack_require__(/*! ../../utils/upload/index */ "./src/utils/upload/index.tsx");

var _index3 = _interopRequireDefault(_index2);

var _index4 = __webpack_require__(/*! ../../utils/request/index */ "./src/utils/request/index.ts");

var _index5 = __webpack_require__(/*! ../../utils/msg/index */ "./src/utils/msg/index.ts");

var _index6 = _interopRequireDefault(_index5);

__webpack_require__(/*! ./index.scss */ "./src/pages/editDetails/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditDetails = (_temp2 = _class = function (_Taro$Component) {
  _inherits(EditDetails, _Taro$Component);

  function EditDetails() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EditDetails);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditDetails.__proto__ || Object.getPrototypeOf(EditDetails)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["borrowing", "loopArray58", "$compid__64", "$compid__65", "$compid__66", "$compid__67", "businessType", "type", "typeName", "val", "identity", "unit"], _this.anonymousFunc9Map = {}, _this.customComponents = ["ImageView", "WageStandard", "WorkOvertime", "WorkingHours"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EditDetails, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(EditDetails.prototype.__proto__ || Object.getPrototypeOf(EditDetails.prototype), "_constructor", this).call(this, props);

      this.$$refs = new _taroWeapp2.default.RefsArray();
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this2 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__64"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__64 = _genCompid2[0],
          $compid__64 = _genCompid2[1];

      var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "$compid__65"),
          _genCompid4 = _slicedToArray(_genCompid3, 2),
          $prevCompid__65 = _genCompid4[0],
          $compid__65 = _genCompid4[1];

      var _genCompid5 = (0, _taroWeapp.genCompid)(__prefix + "$compid__66"),
          _genCompid6 = _slicedToArray(_genCompid5, 2),
          $prevCompid__66 = _genCompid6[0],
          $compid__66 = _genCompid6[1];

      var _genCompid7 = (0, _taroWeapp.genCompid)(__prefix + "$compid__67"),
          _genCompid8 = _slicedToArray(_genCompid7, 2),
          $prevCompid__67 = _genCompid8[0],
          $compid__67 = _genCompid8[1];

      var router = (0, _taroWeapp.useRouter)();
      var id = router.params.id;
      // 班组长还是工人

      var _useState = (0, _taroWeapp.useState)(1),
          _useState2 = _slicedToArray(_useState, 2),
          identity = _useState2[0],
          setIdentity = _useState2[1];
      // 图片


      var _useState3 = (0, _taroWeapp.useState)({
        item: []
      }),
          _useState4 = _slicedToArray(_useState3, 2),
          image = _useState4[0],
          setImage = _useState4[1];
      // 类型


      var _useState5 = (0, _taroWeapp.useState)(1),
          _useState6 = _slicedToArray(_useState5, 2),
          businessType = _useState6[0],
          setBusinessType = _useState6[1];
      // 包工类型名称


      var _useState7 = (0, _taroWeapp.useState)(''),
          _useState8 = _slicedToArray(_useState7, 2),
          typeName = _useState8[0],
          setTypeName = _useState8[1];

      var _useState9 = (0, _taroWeapp.useState)(1),
          _useState10 = _slicedToArray(_useState9, 2),
          type = _useState10[0],
          setType = _useState10[1];
      // 选择加班时长弹窗


      var _useState11 = (0, _taroWeapp.useState)(false),
          _useState12 = _slicedToArray(_useState11, 2),
          workOvertimeDisplay = _useState12[0],
          setWorkOvertimeDisplay = _useState12[1];
      // 上班时长选择


      var _useState13 = (0, _taroWeapp.useState)(false),
          _useState14 = _slicedToArray(_useState13, 2),
          workingHoursDisplay = _useState14[0],
          setWorkingHoursDisplay = _useState14[1];
      // 单位


      var _useState15 = (0, _taroWeapp.useState)('平方米'),
          _useState16 = _slicedToArray(_useState15, 2),
          unit = _useState16[0],
          setUnit = _useState16[1];
      // 上班时长选择类型


      var _useState17 = (0, _taroWeapp.useState)(0),
          _useState18 = _slicedToArray(_useState17, 2),
          timeType = _useState18[0],
          setTimeType = _useState18[1];
      // 借支


      var _useState19 = (0, _taroWeapp.useState)({
        item: [{ id: 3, name: '工资', click: false }, { id: 4, name: '生活费', click: false }, { id: 5, name: '补贴', click: false }, { id: 6, name: '奖励', click: false }, { id: 7, name: '其他', click: false }]
      }),
          _useState20 = _slicedToArray(_useState19, 2),
          borrowing = _useState20[0],
          setBorrowing = _useState20[1];
      // 上班时长


      var _useState21 = (0, _taroWeapp.useState)([{ id: 1, name: '一个工', click: false, num: 1 }, { id: 2, name: '半个工', click: false, num: 0.5 }, { id: 3, name: '休息', click: false, num: 0 }, { id: 4, name: '0.0小时', click: false, num: 0 }]),
          _useState22 = _slicedToArray(_useState21, 2),
          timeArr = _useState22[0],
          setTimeArr = _useState22[1];
      //加班时长


      var _useState23 = (0, _taroWeapp.useState)([{ id: 1, name: '无加班', click: false, num: 0 }, { id: 2, name: '0.0小时', click: false, num: 0 }]),
          _useState24 = _slicedToArray(_useState23, 2),
          addWorkArr = _useState24[0],
          setAddWorkArr = _useState24[1];
      // 工资标准


      var _useState25 = (0, _taroWeapp.useState)(false),
          _useState26 = _slicedToArray(_useState25, 2),
          display = _useState26[0],
          setDisplay = _useState26[1];
      // 内容


      var _useState27 = (0, _taroWeapp.useState)({
        data: [{ id: 1, name: '按小时计算', click: false }, { id: 2, name: '按天算', click: false }],
        work: 0,
        money: 0,
        addWork: 0,
        type: 1,
        day: 0,
        dayAddWork: 0,
        state: '',
        group_info: '',
        id: ''
      }),
          _useState28 = _slicedToArray(_useState27, 2),
          wageStandard = _useState28[0],
          setWageStandard = _useState28[1];

      var _useState29 = (0, _taroWeapp.useState)({
        note: '',
        name: '',
        workername: '',
        leaderName: '',
        time: '',
        workingHours: '',
        working: '',
        duration: '',
        wages: '',
        unitNum: '',
        unit: '',
        unitPrice: '',
        money: ''
      }),
          _useState30 = _slicedToArray(_useState29, 2),
          val = _useState30[0],
          setVal = _useState30[1];
      // 工资标准内容


      var _useState31 = (0, _taroWeapp.useState)({
        worktime_define: '',
        money: '',
        overtime_type: '',
        worker_overtime: '',
        overtime: '',
        overtime_money: '',
        work_time: ''
      }),
          _useState32 = _slicedToArray(_useState31, 2),
          standard = _useState32[0],
          setStandard = _useState32[1];
      // 工资标准


      var _useState33 = (0, _taroWeapp.useState)(false),
          _useState34 = _slicedToArray(_useState33, 2),
          wageStandardDisplay = _useState34[0],
          setWageStandardDisplay = _useState34[1];

      (0, _taroWeapp.useEffect)(function () {
        console.log(id, 'xxxx');
        if (id) {
          (0, _index4.bkBusinessOneAction)({ id: id }).then(function (res) {
            if (res.code === 200) {
              var data = JSON.parse(JSON.stringify(wageStandard));
              var obj = JSON.parse(JSON.stringify(val));
              var standardObj = JSON.parse(JSON.stringify(standard));
              // setType((parseInt(res.data.type)));
              setBusinessType(parseInt(res.data.business_type));
              setIdentity(parseInt(res.data.identity));
              setImage({ item: res.data.view_images });
              obj.name = res.data.group_info_name;
              obj.note = res.data.note;
              obj.workername = res.data.workername;
              obj.leaderName = res.data.workername;
              // 这里是工要获取到多少工资标里的设置的时间再算
              var duration = res.data.work_time + '个工' + res.data.overtime + '小时';
              obj.duration = duration;
              obj.money = res.data.money;
              var newData = new Date();
              var newTime = newData.getFullYear() + '-' + addZero(newData.getMonth() + 1) + '-' + addZero(newData.getDate());
              obj.time = newTime;
              data.work = res.data.worktime_define;
              data.addWork = res.data.overtime_money;
              data.money = res.data.worker_money;
              data.day = res.data.overtime;
              if (parseInt(res.data.money) && parseInt(res.data.overtime)) {
                data.dayAddWork = parseInt(res.data.money) / parseInt(res.data.overtime) || 0;
              } else {
                data.dayAddWork = 0;
              }
              data.group_info = res.data.group_info;
              data.type = parseInt(res.data.overtime_type);
              console.log(data.type, 'xxxx111');
              for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].id == res.data.overtime_type) {
                  data.data[i].click = true;
                }
              }
              // 设置工资标准内容
              // data.overtime=res.data.overtime_money;
              standardObj.worktime_define = res.data.worktime_define;
              standardObj.money = res.data.worker_money;
              standardObj.overtime_type = res.data.overtime_type;
              standardObj.worker_overtime = res.data.worker_overtime;
              standardObj.overtime = res.data.overtime;
              standardObj.overtime_money = res.data.overtime_money;
              standardObj.work_time = res.data.work_time;
              setStandard(standardObj);
              // 工钱
              var wages = undefined;
              if (parseInt(res.data.overtime_type) === 1) {
                // 每个工多少钱/上班时间*选择的上班时长 + 加班多选小时*加班一小时多少钱
                // 每个工的钱*百分比 + 时间 *加班工钱
                wages = +res.data.worker_money * +res.data.work_time + +res.data.overtime * +res.data.overtime_money;
              } else {
                // 每个工多少钱/上班时间*选择的上班时长 + 每个工多少钱/多少钱算一个工*加班时长
                wages = +res.data.worker_money * +res.data.work_time + +res.data.worker_money / +res.data.worker_overtime * +res.data.overtime;
              }
              obj.wages = wages;
              obj.unitNum = res.data.unit_num;
              obj.unitPrice = res.data.unit_price;
              obj.unit = res.data.unit;
              setVal(obj);
              console.log(data, '3213213');
              setWageStandard(data);
              // 设置数据上班时长数据
              var timeArrData = JSON.parse(JSON.stringify(timeArr));
              // 判读返回的值
              for (var _i = 0; _i < timeArrData.length; _i++) {
                // if ((+res.data.work_time) === timeArrData[i].num ){
                //   timeArrData[i].click = true
                // }else{
                // 返回的是工为单位的 小时为单位的数据
                var setTime = (+res.data.worktime_define / (1 / +res.data.work_time)).toFixed(1);
                console.log(setTime, 'setTime');
                var _obj = { id: 4, name: setTime + "\u5C0F\u65F6", click: true, num: setTime };
                var index = [timeArrData.length - 1];
                if (_i === index[0]) {
                  timeArrData[_i] = _obj;
                }
                // }
              }
              console.log(timeArrData, 'timeArrData');
              setTimeArr(timeArrData);
              // 修改加班时长数据
              var addWorkArrData = JSON.parse(JSON.stringify(addWorkArr));
              for (var _i2 = 0; _i2 < addWorkArrData.length; _i2++) {
                if (res.data.overtime === '0.00') {
                  addWorkArrData[0].click = true;
                } else {
                  var _obj2 = { id: 2, name: res.data.overtime + "\u5C0F\u65F6", click: true, num: res.data.overtime };
                  console.log(_obj2);
                  console.log(res.data.overtime, 'overtime');
                  var _index = [addWorkArrData.length - 1];
                  if (_i2 === _index[0]) {
                    addWorkArrData[_i2] = _obj2;
                  }
                }
                // if(res.data.overtime === addWorkArrData[i].num){
                //   addWorkArrData[i].click = true;
                // }
              }
              console.log(addWorkArrData, 'toFixed');
              setAddWorkArr(addWorkArrData);
              // data.dayAddWork = res.data.
              if (res.data.business_type === '1') {
                // setTypeName('点工')
                _taroWeapp2.default.setNavigationBarTitle({
                  title: '点工'
                });
              } else if (res.data.business_type === '2') {
                // setTypeName('包工')
                if (res.data.type === '1') {
                  setTypeName('按天记');
                  _taroWeapp2.default.setNavigationBarTitle({
                    title: '包工按天计'
                  });
                } else {
                  setTypeName('按量记');
                  _taroWeapp2.default.setNavigationBarTitle({
                    title: '包工按量计'
                  });
                }
              } else if (res.data.business_type === '3') {
                _taroWeapp2.default.setNavigationBarTitle({
                  title: '借支'
                });
                var borrowingArr = JSON.parse(JSON.stringify(borrowing.item));
                for (var _i3 = 0; _i3 < borrowingArr.length; _i3++) {
                  if (parseInt(res.data.type) == borrowingArr[_i3].id) {
                    borrowingArr[_i3].click = true;
                  }
                }
                setBorrowing({ item: borrowingArr });
              }
            } else {
              (0, _index6.default)(res.msg);
            }
          });
        }
      }, []);
      var addZero = function addZero(num) {
        if (parseInt(num) < 10) {
          num = '0' + num;
        }
        return num;
      };
      // 图片
      var userUploadImg = function userUploadImg() {
        var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

        (0, _index3.default)().then(function (res) {
          var imageItem = {
            url: res.url,
            httpurl: res.httpurl
          };
          if (i === -1) {
            setImage(_extends({}, image, { item: [].concat(_toConsumableArray(image.item), [imageItem]) }));
          } else {
            image.item[i] = imageItem;
            setImage(_extends({}, image));
          }
        });
      };
      // 用户删除图片
      var userDelImg = function userDelImg(i) {
        if (!image.item) {
          return;
        }var bakModel = JSON.parse(JSON.stringify(image.item));
        bakModel.splice(i, 1);
        setImage({ item: bakModel });
      };
      var handelAdd = function handelAdd() {
        if (image.item.length < 4) {
          userUploadImg && userUploadImg(-1);
        } else {
          (0, _index6.default)('最多上传四张照片');
          return;
        }
      };
      // 支借Radio
      var handleRadioBorrowing = function handleRadioBorrowing(v) {
        console.log(v);
        var data = JSON.parse(JSON.stringify(borrowing.item));
        for (var i = 0; i < data.length; i++) {
          if (v.id = data[i].id) {
            data[i].click = true;
          }
        }
        setBorrowing(data);
      };
      // 关闭
      var handleClose = function handleClose() {
        setDisplay(false);
      };
      // 输入框
      var handleWageStandard = function handleWageStandard(type, e) {
        if (type == 'day') {
          var item = JSON.parse(JSON.stringify(wageStandard));
          var dayAddWork = item.money / e;
          item[type] = e;
          item.dayAddWork = dayAddWork.toFixed(2);
          setWageStandard(item);
          return;
        }
        if (type === 'money') {
          var _item = JSON.parse(JSON.stringify(wageStandard));
          var _dayAddWork = e / _item.day;
          _item[type] = e;
          _item.dayAddWork = _dayAddWork.toFixed(2);
          setWageStandard(_item);
          return;
        }
        var data = JSON.parse(JSON.stringify(wageStandard));
        data[type] = e;
        setWageStandard(data);
      };
      // 确定
      var handleAddWage = function handleAddWage() {
        // 获取数据
        var valData = JSON.parse(JSON.stringify(val));
        // 获取工资标准
        var data = JSON.parse(JSON.stringify(wageStandard));
        // 获取上班时长
        var timeArrs = JSON.parse(JSON.stringify(timeArr));
        // 获取加班时长
        var addWorkArrs = JSON.parse(JSON.stringify(addWorkArr));
        //模板金额 
        var moneyNum = data.money;
        // 模板时间
        var workNum = data.work;
        //加班金钱
        var addWorkNum = data.addWork;
        // 加班时间
        var dayNum = data.day;
        if (workNum === 0) {
          (0, _index6.default)('上班标准必须必须大于0');
          return;
        }
        // 每个工多少钱提示
        if (moneyNum === 0) {
          (0, _index6.default)('每个工工钱必须大于0');
          return;
        }
        console.log(data.type, 'xxx');
        //按天数 一个工
        if (data.type === 2) {
          if (data.day == 0) {
            (0, _index6.default)('一个工必须大于0小时');
            return;
          }
        }
        if (data.type === 1) {
          if (data.addWork == 0) {
            (0, _index6.default)('每小时加班金额必须大于0');
            return;
          }
        }
        var time = 0;
        console.log(timeArrs, 'timeArrstimeArrs');
        for (var i = 0; i < timeArrs.length; i++) {
          if (timeArrs[i].click) {
            console.log(timeArr[i]);
            // 选择工
            if (timeArrs[i].id != 1 && timeArrs[i].id != 2 && timeArrs[i].id != 3) {
              time = 1 / workNum * timeArrs[i].num;
              // 选择时间
            } else {
              if (timeArrs[i].id == 1) {
                // 等于模板时间
                time = workNum;
              } else if (timeArrs[i].id == 2) {
                // 等于模板时间的一半
                time = workNum / 2;
              } else if (timeArrs[i].id == 3) {
                // 等于0 
                time = 0;
              }
            }
          }
        }
        console.log(time, 'tiem');
        // return;
        // 加班时间
        var addTime = 0;
        for (var _i4 = 0; _i4 < addWorkArrs.length; _i4++) {
          if (addWorkArrs[_i4].click) {
            addTime = addWorkArrs[_i4].num;
          }
        }
        //工资标准 每个工多少钱/上班标准 * 上班时长  判断加班是按小时算还是i按天算
        // let total = 0;
        // console.log(moneyNum,'moneyNum')
        // console.log(workNum, 'workNum')
        // console.log(time, 'time')
        // console.log(addWorkNum,'addWorkNum')
        // console.log(typeof addWorkNum)
        // console.log(addTime, 'addTime')
        // console.log(dayNum, 'dayNum')
        // 按小时
        var sum = 0;
        if (data.type === 1) {
          console.log(time, 'time');
          sum = moneyNum / workNum * (time * workNum) + addWorkNum * addTime;
        } else {
          // 按天
          // 1除以模板时间*上班时间*模板金额  + 上班时长/多少小时算一个工*模板金额
          sum = moneyNum / workNum * (time * workNum) + moneyNum / dayNum * addTime;
        }
        console.log(sum, 'sum');
        // return;
        // if (data.type === 1) {
        //   // 按小时算 加班小时* 模板加班金额
        //   total = ((parseInt(moneyNum)||0 / parseInt(workNum))||0 * (time) )+ (parseInt(addWorkNum)||0 * (addTime));
        //   console.log(total,'total')
        // } else {
        //   console.log('else')
        //   // 按天算 每个工多少钱/模板定义的多少小时算一个工 * 加班时长
        //   console.log(parseFloat(moneyNum) || 0 / parseFloat(workNum) || 0 * time ,'121');
        //   console.log((parseFloat(moneyNum) || 0 / parseFloat(dayNum) || 0 * addTime),'212')
        //   total = (parseFloat(moneyNum) || 0 / parseFloat(workNum) || 0 * (time)) + (parseFloat(moneyNum) || 0 / parseFloat(dayNum)||0 * (addTime));
        //   console.log(total,'total1')
        // }
        // const num = total.toFixed(2);
        var num = 0;
        // if (num && !Object.is(num, NaN)){
        num = sum.toFixed(2);
        console.log(num);
        setVal(_extends({}, valData, { wages: num }));
        setWageStandardDisplay(false);
        var params = {
          identity: identity,
          worktime_define: data.work,
          overtime_type: data.type,
          overtime_money: data.dayAddWork,
          money: data.money,
          overtime: data.day,
          group_info: data.group_info
        };
        (0, _index4.bkSetWorkerIdentityWageAction)(params).then(function (res) {
          if (res.code !== 200) {
            (0, _index6.default)(res.msg);
          }
        });
        // }
        // // 上班时间
        // let time = 0;
        // for (let i = 0; i < timeArrs.length; i++) {
        //   if (timeArrs[i].click) {
        //     time = timeArrs[i].num;
        //   }
        // }
        // console.log(time, 'time')
        // // 加班时间
        // let addTime = 0;
        // for (let i = 0; i < addWorkArrs.length; i++) {
        //   if (addWorkArrs[i].click) {
        //     addTime = addWorkArrs[i].num
        //   }
        // }
        //工资标准 每个工多少钱/上班标准 * 上班时长  判断加班是按小时算还是i按天算
        // let total;
        // if (data.type === 1) {
        //   // 按小时算 加班小时* 模板加班金额
        //   console.log(moneyNum,'moneyNum');
        //   console.log(workNum,'workNum');
        //   console.log(time,'time')
        //   console.log((moneyNum / workNum) * time,'xxxx')
        //   console.log(addWorkNum * addTime, 'addWorkNum * addTime')
        //   total = (moneyNum / workNum) * time + addWorkNum * addTime;
        // } else {
        //   // 按天算 每个工多少钱/模板定义的多少小时算一个工 * 加班时长
        //   total = moneyNum / workNum * time + (moneyNum / dayNum * addTime);
        // }
        // console.log(total, 'xxx')
        // const num = total.toFixed(2);
        // console.log(num,'num')
        // return;
        // // setModel({ ...model, workersWages: num });
        // setVal({ ...valData, wages:num})
        // setWageStandardDisplay(false);
        // const data = JSON.parse(JSON.stringify(wageStandard));
        // const valData = JSON.parse(JSON.stringify(val));
        // // valData.
        // console.log(31321);
        // 获取上班时长
      };
      // Radio
      var handleWageStandardRadio = function handleWageStandardRadio(e) {
        console.log(e);
        var data = JSON.parse(JSON.stringify(wageStandard));
        data.type = e.id;
        var arr = data.data.map(function (v) {
          if (e.id === v.id) {
            v.click = true;
          } else {
            v.click = false;
          }
          return v;
        });
        data.data = arr;
        setWageStandard(data);
      };
      // 选择加班时长
      console.log(identity, 'identity');
      var handleworkOvertime = function handleworkOvertime(type, val) {
        setTimeType(type);
        if (type === 1) {
          if (val.id === 4) {
            var arr = timeArr.map(function (v) {
              if (v.id === val.id) {
                v.click = !v.click;
              } else {
                v.click = false;
              }
              return v;
            });
            setTimeArr(arr);
            setWorkOvertimeDisplay(false);
            setWorkingHoursDisplay(true);
            return;
          } else {
            var _arr = timeArr.map(function (v) {
              if (v.id === val.id) {
                v.click = !v.click;
              } else {
                if (v.id === 4) {
                  v.name = '0.0小时';
                }
                v.click = false;
              }
              return v;
            });
            setTimeArr(_arr);
          }
        } else {
          if (val.id != 2) {
            var _arr2 = addWorkArr.map(function (v) {
              if (v.id === val.id) {
                v.click = !v.click;
              } else {
                if (v.id === 2) {
                  v.name = '0.0小时';
                }
                v.click = false;
              }
              return v;
            });
            setAddWorkArr(_arr2);
          } else {
            var _arr3 = addWorkArr.map(function (v) {
              if (v.id === val.id) {
                v.click = !v.click;
              } else {
                v.click = false;
              }
              return v;
            });
            setAddWorkArr(_arr3);
            setWorkOvertimeDisplay(false);
            setWorkingHoursDisplay(true);
            return;
          }
        }
      };
      // 确认时间选择
      var handleWorkOvertimeOk = function handleWorkOvertimeOk() {
        var data = timeArr.filter(function (v) {
          return v.click;
        });
        var dataList = addWorkArr.filter(function (v) {
          return v.click;
        });
        var item = JSON.parse(JSON.stringify(wageStandard));
        console.log(item);
        // return;
        var title = void 0;
        if (data || dataList) {
          if (data.length > 0) {
            if (data[0].name == '休息') {
              title = data[0].name;
            } else {
              title = '上班' + data[0].name;
            }
          }
          if (dataList.length > 0) {
            if (dataList[0].name !== '无加班') {
              title = '加班' + dataList[0].name;
            } else {
              title = dataList[0].name;
            }
          }
          if (data.length > 0 && dataList.length > 0) {
            if (data[0].name == '休息' && dataList[0].name == '无加班') {
              title = data[0].name + dataList[0].name;
            } else {
              if (data[0].name == '休息') {
                title = '加班' + dataList[0].name;
              }
              if (dataList[0].name == '无加班') {
                title = '上班' + data[0].name + dataList[0].name;
              }
              title = '上班' + data[0].name + '加班' + dataList[0].name;
            }
          }
        }
        var standardObj = JSON.parse(JSON.stringify(standard));
        // console.log(standardObj,'xxx')
        var wages = void 0;
        // 计算
        // console.log(standardObj.money);
        // console.log(standardObj.worktime_define);
        // console.log(standardObj.work_time);
        // console.log()
        if (item.type == '1') {
          wages = parseInt(standardObj.money) || 0 / parseInt(standardObj.worktime_define) || 0 * parseInt(standardObj.work_time) || 0 + parseInt(standardObj.worker_overtime) || 0 * parseInt(standardObj.overtime_money) || 0;
        } else {
          wages = parseInt(standardObj.money) || 0 / parseInt(standardObj.worktime_define) || 0 * parseInt(standardObj.work_time) || 0 + (parseInt(standardObj.money) || 0 / parseInt(standardObj.worker_overtime) || 0 * parseInt(standardObj.overtime)) || 0;
        }
        setVal(_extends({}, val, { duration: title, wages: wages }));
        setDisplay(false);
      };
      // 关闭上班时长
      var handleWorkingHoursClose = function handleWorkingHoursClose() {
        setWorkingHoursDisplay(false);
      };
      // 加班时长弹框选择
      var handleWorkingHours = function handleWorkingHours(type, e) {
        if (type === 1) {
          var data = timeArr.map(function (v) {
            if (v.id === 4) {
              v.name = e.name;
              v.click = true;
              v.num = e.num;
            }
            return v;
          });
          setTimeArr(data);
        } else {
          var _data = addWorkArr.map(function (v) {
            if (v.id === 2) {
              v.name = e.name;
              v.click = true;
              v.num = e.num;
            }
            return v;
          });
          setAddWorkArr(_data);
        }
        setWorkingHoursDisplay(false);
        setWorkOvertimeDisplay(true);
      };
      // 保存
      var handlesub = function handlesub() {
        var data = JSON.parse(JSON.stringify(val));
        var items = JSON.parse(JSON.stringify(wageStandard));
        var businessTypes = JSON.parse(JSON.stringify(businessType));
        var borrowingArr = JSON.parse(JSON.stringify(borrowing.item));
        var img_url = image.item.map(function (item) {
          return item.url;
        });
        // 借支的时候radio
        // 
        console.log(businessTypes, 'businessTypes');
        console.log(borrowingArr, 'borrowingArr');
        var type = void 0;
        if (businessTypes == 3) {
          console.log(32132131);
          for (var i = 0; i < borrowingArr.length; i++) {
            console.log(borrowingArr[i], '111');
            if (borrowingArr[i].click) {
              console.log(borrowingArr[i].id, 'x');
              type = borrowingArr[i].id;
            }
          }
        } else {
          type = businessTypes;
        }
        console.log(type, 'type');
        // 工资标准
        // const Item = JSON.parse(JSON.stringify(wageStandard));
        // 时间
        console.log(val, 'val');
        console.log(timeArr, 'timaeArr');
        console.log(addWorkArr, 'addWorkArr');
        console.log(items, 'xxxeqweqw');
        var times = 0,
            work_time_hour = 0;
        timeArr.map(function (v) {
          if (v.click) {
            if (v.num) {
              if (v.id !== 4) {
                console.log(v.num, 'v.numv.numv.num');
                console.log(items.work, 'items.work');
                times = v.num;
                work_time_hour = items.work * v.num;
              } else {
                console.log(items.work, '1111');
                console.log(v.num, '2222');
                times = 1 / items.work * v.num;
                work_time_hour = v.num;
              }
            }
          }
        });
        // 加班时间
        var overtime = 0;
        addWorkArr.map(function (v) {
          if (v.click) {
            if (v.num) {
              overtime = v.num;
            }
          }
        });
        console.log(times, work_time_hour, overtime);
        // return;
        // 图片
        var params = {
          money: data.money,
          time: data.time,
          type: type,
          img_url: img_url,
          id: id,
          overtime: overtime || 0,
          work_time: times || 0,
          work_time_hour: work_time_hour || 0,
          note: val.note
        };
        (0, _index4.updateBusinessAction)(params).then(function (res) {
          console.log(res);
          if (res.code === 200) {
            (0, _index6.default)(res.msg);
            setTimeout(function () {
              _taroWeapp2.default.navigateBack({ delta: 2 });
            }, 1000);
          } else {
            (0, _index6.default)(res.msg);
          }
        });
      };
      // 输入框
      var handleInput = function handleInput(type, e) {
        var data = JSON.parse(JSON.stringify(val));
        data[type] = e.detail.value;
        setVal(data);
      };
      // 关闭
      var handleWageStandardDisplay = function handleWageStandardDisplay() {
        setWageStandardDisplay(false);
      };

      this.anonymousFunc0 = function () {};

      this.anonymousFunc1 = function () {};

      this.anonymousFunc2 = function () {};

      this.anonymousFunc3 = function () {};

      this.anonymousFunc4 = function (e) {
        handleInput('unitNum', e);
      };

      this.anonymousFunc5 = function () {};

      this.anonymousFunc6 = function (e) {
        handleInput('unitPrice', e);
      };

      this.anonymousFunc7 = function (e) {
        handleInput('money', e);
      };

      this.anonymousFunc8 = function (e) {
        handleInput('money', e);
      };

      this.anonymousFunc10 = function () {
        setDisplay(true);
      };

      this.anonymousFunc11 = function () {
        setWageStandardDisplay(true);
      };

      this.anonymousFunc12 = function () {};

      this.anonymousFunc13 = function (e) {
        return handleInput('note', e);
      };

      this.anonymousFunc14 = handlesub;
      var loopArray58 = businessType === 3 ? borrowing.item.map(function (v, __index9) {
        v = {
          $original: (0, _taroWeapp.internal_get_original)(v)
        };

        var _$indexKey = "bbgzz" + __index9;

        _this2.anonymousFunc9Map[_$indexKey] = function () {
          return handleRadioBorrowing(v.$original);
        };

        return {
          _$indexKey: _$indexKey,
          $original: v.$original
        };
      }) : [];
      _taroWeapp.propsManager.set({
        "images": image.item,
        "max": 4,
        "userUploadImg": userUploadImg,
        "userDelImg": userDelImg
      }, $compid__64, $prevCompid__64);
      _taroWeapp.propsManager.set({
        "display": wageStandardDisplay,
        "handleClose": handleWageStandardDisplay,
        "wageStandard": wageStandard,
        "handleWageStandard": handleWageStandard,
        "handleAddWage": handleAddWage,
        "handleWageStandardRadio": handleWageStandardRadio
      }, $compid__65, $prevCompid__65);
      _taroWeapp.propsManager.set({
        "display": display,
        "handleWorkOvertimeClose": handleClose,
        "handleworkOvertime": handleworkOvertime,
        "data": timeArr,
        "dataArr": addWorkArr,
        "handleWorkOvertimeOk": handleWorkOvertimeOk,
        "model": val
      }, $compid__66, $prevCompid__66);
      _taroWeapp.propsManager.set({
        "display": workingHoursDisplay,
        "handleWorkingHoursClose": handleWorkingHoursClose,
        "type": timeType,
        "handleWorkingHours": handleWorkingHours
      }, $compid__67, $prevCompid__67);
      Object.assign(this.__state, {
        borrowing: borrowing,
        loopArray58: loopArray58,
        $compid__64: $compid__64,
        $compid__65: $compid__65,
        $compid__66: $compid__66,
        $compid__67: $compid__67,
        businessType: businessType,
        type: type,
        typeName: typeName,
        val: val,
        identity: identity,
        unit: unit
      });
      return this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function anonymousFunc0(e) {
      ;
    }
  }, {
    key: "anonymousFunc1",
    value: function anonymousFunc1(e) {
      ;
    }
  }, {
    key: "anonymousFunc2",
    value: function anonymousFunc2(e) {
      ;
    }
  }, {
    key: "anonymousFunc3",
    value: function anonymousFunc3(e) {
      ;
    }
  }, {
    key: "anonymousFunc4",
    value: function anonymousFunc4(e) {
      ;
    }
  }, {
    key: "anonymousFunc5",
    value: function anonymousFunc5(e) {
      ;
    }
  }, {
    key: "anonymousFunc6",
    value: function anonymousFunc6(e) {
      ;
    }
  }, {
    key: "anonymousFunc7",
    value: function anonymousFunc7(e) {
      ;
    }
  }, {
    key: "anonymousFunc8",
    value: function anonymousFunc8(e) {
      ;
    }
  }, {
    key: "anonymousFunc9",
    value: function anonymousFunc9(_$indexKey) {
      var _anonymousFunc9Map;

      ;

      for (var _len2 = arguments.length, e = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        e[_key2 - 1] = arguments[_key2];
      }

      return this.anonymousFunc9Map[_$indexKey] && (_anonymousFunc9Map = this.anonymousFunc9Map)[_$indexKey].apply(_anonymousFunc9Map, e);
    }
  }, {
    key: "anonymousFunc10",
    value: function anonymousFunc10(e) {
      ;
    }
  }, {
    key: "anonymousFunc11",
    value: function anonymousFunc11(e) {
      ;
    }
  }, {
    key: "anonymousFunc12",
    value: function anonymousFunc12(e) {
      ;
    }
  }, {
    key: "anonymousFunc13",
    value: function anonymousFunc13(e) {
      ;
    }
  }, {
    key: "anonymousFunc14",
    value: function anonymousFunc14(e) {
      ;
    }
  }]);

  return EditDetails;
}(_taroWeapp2.default.Component), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "anonymousFunc6", "anonymousFunc7", "anonymousFunc8", "anonymousFunc9", "anonymousFunc10", "anonymousFunc11", "anonymousFunc12", "anonymousFunc13", "anonymousFunc14"], _class.$$componentPath = "pages/editDetails/index", _temp2);
exports.default = EditDetails;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(EditDetails, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/editDetails/index.tsx?taro&type=template&parse=PAGE&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/editDetails/index.tsx?taro&type=template&parse=PAGE& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/editDetails/index.wxml";

/***/ }),

/***/ "./src/pages/editDetails/index.scss":
/*!******************************************!*\
  !*** ./src/pages/editDetails/index.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/editDetails/index.tsx":
/*!*****************************************!*\
  !*** ./src/pages/editDetails/index.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=PAGE& */ "./src/pages/editDetails/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=PAGE& */ "./src/pages/editDetails/index.tsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/editDetails/index.tsx?taro&type=script&parse=PAGE&":
/*!**********************************************************************!*\
  !*** ./src/pages/editDetails/index.tsx?taro&type=script&parse=PAGE& ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/editDetails/index.tsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/editDetails/index.tsx?taro&type=template&parse=PAGE&":
/*!************************************************************************!*\
  !*** ./src/pages/editDetails/index.tsx?taro&type=template&parse=PAGE& ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/editDetails/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./src/pages/editDetails/index.tsx","runtime","taro","vendors","common"]]]);