(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/index/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/index/index.tsx?taro&type=script&parse=PAGE&":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/index/index.tsx?taro&type=script&parse=PAGE& ***!
  \*************************************************************************************************************************************************/
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

var _redux = __webpack_require__(/*! @tarojs/redux */ "./node_modules/@tarojs/redux/index.js");

var _store = __webpack_require__(/*! ../../config/store */ "./src/config/store.ts");

var _type3 = __webpack_require__(/*! ../../actions/type */ "./src/actions/type.ts");

var _index2 = __webpack_require__(/*! ../../config/index */ "./src/config/index.ts");

var _index3 = __webpack_require__(/*! ../../utils/msg/index */ "./src/utils/msg/index.ts");

var _index4 = _interopRequireDefault(_index3);

var _clickTIme = __webpack_require__(/*! ../../actions/clickTIme */ "./src/actions/clickTIme.ts");

__webpack_require__(/*! ./index.scss */ "./src/pages/index/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 设置新手指引图片
var Images = [{
  url: _index2.IMGCDNURL + "noviceGuidance1.png",
  id: 1
}, {
  url: _index2.IMGCDNURL + "noviceGuidance2.png",
  id: 2
}, {
  url: _index2.IMGCDNURL + "noviceGuidance3.png",
  id: 3
}, {
  url: _index2.IMGCDNURL + "noviceGuidance4.png",
  id: 4
}, {
  url: _index2.IMGCDNURL + "noviceGuidance5.png",
  id: 5
}];

var Index = (_temp2 = _class = function (_Taro$Component) {
  _inherits(Index, _Taro$Component);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp5", "anonymousState__temp6", "loopArray98", "loopArray99", "$compid__184", "$compid__185", "$compid__186", "$compid__187", "$compid__188", "$compid__189", "image", "closeImage", "IMGCDNURL", "start", "end", "vals", "newMonth", "type", "prompt", "item", "show", "busy", "list", "month", "newTime", "week"], _this.anonymousFunc13Map = {}, _this.anonymousFunc15Map = {}, _this.customComponents = ["AtBadge", "AtModal", "Auth", "CreateProject", "ProjectModal"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), '_constructor', this).call(this, props);

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

      var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__184"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__184 = _genCompid2[0],
          $compid__184 = _genCompid2[1];

      var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "$compid__185"),
          _genCompid4 = _slicedToArray(_genCompid3, 2),
          $prevCompid__185 = _genCompid4[0],
          $compid__185 = _genCompid4[1];

      var _genCompid5 = (0, _taroWeapp.genCompid)(__prefix + "$compid__186"),
          _genCompid6 = _slicedToArray(_genCompid5, 2),
          $prevCompid__186 = _genCompid6[0],
          $compid__186 = _genCompid6[1];

      var _genCompid7 = (0, _taroWeapp.genCompid)(__prefix + "$compid__187"),
          _genCompid8 = _slicedToArray(_genCompid7, 2),
          $prevCompid__187 = _genCompid8[0],
          $compid__187 = _genCompid8[1];

      var _genCompid9 = (0, _taroWeapp.genCompid)(__prefix + "$compid__188"),
          _genCompid10 = _slicedToArray(_genCompid9, 2),
          $prevCompid__188 = _genCompid10[0],
          $compid__188 = _genCompid10[1];

      var _genCompid11 = (0, _taroWeapp.genCompid)(__prefix + "$compid__189"),
          _genCompid12 = _slicedToArray(_genCompid11, 2),
          $prevCompid__189 = _genCompid12[0],
          $compid__189 = _genCompid12[1];

      var dispatch = (0, _redux.useDispatch)();
      // 弹框内容

      var _useState = (0, _taroWeapp.useState)({
        groupName: '',
        teamName: ''
      }),
          _useState2 = _slicedToArray(_useState, 2),
          model = _useState2[0],
          setModel = _useState2[1];
      // 授权
      // =====


      var _useState3 = (0, _taroWeapp.useState)(false),
          _useState4 = _slicedToArray(_useState3, 2),
          display = _useState4[0],
          setDisplay = _useState4[1];

      var _useState5 = (0, _taroWeapp.useState)(''),
          _useState6 = _slicedToArray(_useState5, 2),
          vals = _useState6[0],
          setVal = _useState6[1];
      //获取当前时间


      var _useState7 = (0, _taroWeapp.useState)(''),
          _useState8 = _slicedToArray(_useState7, 2),
          time = _useState8[0],
          setTime = _useState8[1];
      // 当前月份


      var _useState9 = (0, _taroWeapp.useState)(''),
          _useState10 = _slicedToArray(_useState9, 2),
          newMonth = _useState10[0],
          setNewMonth = _useState10[1];
      //显示月份


      var _useState11 = (0, _taroWeapp.useState)(''),
          _useState12 = _slicedToArray(_useState11, 2),
          month = _useState12[0],
          setMonth = _useState12[1];
      // 记工时间


      var _useState13 = (0, _taroWeapp.useState)(''),
          _useState14 = _slicedToArray(_useState13, 2),
          start = _useState14[0],
          setStart = _useState14[1];
      // 结束时间


      var _useState15 = (0, _taroWeapp.useState)(''),
          _useState16 = _slicedToArray(_useState15, 2),
          end = _useState16[0],
          setEnd = _useState16[1];
      // 获取当前时间与当前是星期几


      var _useState17 = (0, _taroWeapp.useState)(''),
          _useState18 = _slicedToArray(_useState17, 2),
          week = _useState18[0],
          setWeek = _useState18[1];
      // 时间索引


      var _useState19 = (0, _taroWeapp.useState)([0, 0]),
          _useState20 = _slicedToArray(_useState19, 2),
          time_id = _useState20[0],
          setTime_id = _useState20[1];
      // 时间选择


      var _useState21 = (0, _taroWeapp.useState)([]),
          _useState22 = _slicedToArray(_useState21, 2),
          timeList = _useState22[0],
          setTimeList = _useState22[1];
      // 工人还是班长


      var _useState23 = (0, _taroWeapp.useState)(0),
          _useState24 = _slicedToArray(_useState23, 2),
          type = _useState24[0],
          setType = _useState24[1];
      // 按量记


      var _useState25 = (0, _taroWeapp.useState)(0),
          _useState26 = _slicedToArray(_useState25, 2),
          measureType = _useState26[0],
          setMeasureType = _useState26[1];
      // 数据列表


      var _useState27 = (0, _taroWeapp.useState)([{}, {}, {}]),
          _useState28 = _slicedToArray(_useState27, 2),
          data = _useState28[0],
          setData = _useState28[1];
      // 弹窗


      var _useState29 = (0, _taroWeapp.useState)(false),
          _useState30 = _slicedToArray(_useState29, 2),
          tips = _useState30[0],
          setTips = _useState30[1];
      // 系统繁忙


      var _useState31 = (0, _taroWeapp.useState)(false),
          _useState32 = _slicedToArray(_useState31, 2),
          busy = _useState32[0],
          setBusy = _useState32[1];
      // 身份弹框


      var _useState33 = (0, _taroWeapp.useState)(false),
          _useState34 = _slicedToArray(_useState33, 2),
          identity = _useState34[0],
          setIdentity = _useState34[1];

      var _useState35 = (0, _taroWeapp.useState)([]),
          _useState36 = _slicedToArray(_useState35, 2),
          list = _useState36[0],
          setList = _useState36[1];
      // 云朵


      var _useState37 = (0, _taroWeapp.useState)('0'),
          _useState38 = _slicedToArray(_useState37, 2),
          num = _useState38[0],
          setNum = _useState38[1];

      var _useState39 = (0, _taroWeapp.useState)(),
          _useState40 = _slicedToArray(_useState39, 2),
          newTime = _useState40[0],
          setNewTime = _useState40[1];
      // 数据


      var _useState41 = (0, _taroWeapp.useState)(),
          _useState42 = _slicedToArray(_useState41, 2),
          item = _useState42[0],
          setItme = _useState42[1];

      var _useState43 = (0, _taroWeapp.useState)(Images[0].url),
          _useState44 = _slicedToArray(_useState43, 2),
          image = _useState44[0],
          setImage = _useState44[1];
      // 设置不是第一次获取数据


      var _useState45 = (0, _taroWeapp.useState)(false),
          _useState46 = _slicedToArray(_useState45, 2),
          repeat = _useState46[0],
          setRepeat = _useState46[1];
      // 班组长创建项目


      var _useState47 = (0, _taroWeapp.useState)(false),
          _useState48 = _slicedToArray(_useState47, 2),
          createProjectDisplay = _useState48[0],
          setCreateProjectDisplay = _useState48[1];
      // 项目班组


      var _useState49 = (0, _taroWeapp.useState)(false),
          _useState50 = _slicedToArray(_useState49, 2),
          project = _useState50[0],
          setProject = _useState50[1];
      // 关闭图片


      var _useState51 = (0, _taroWeapp.useState)(true),
          _useState52 = _slicedToArray(_useState51, 2),
          closeImage = _useState52[0],
          setCloseImage = _useState52[1];
      // 是否显示云朵


      var _useState53 = (0, _taroWeapp.useState)(false),
          _useState54 = _slicedToArray(_useState53, 2),
          show = _useState54[0],
          setShow = _useState54[1];
      // 工人转换提示


      var _useState55 = (0, _taroWeapp.useState)(false),
          _useState56 = _slicedToArray(_useState55, 2),
          prompt = _useState56[0],
          setPrompt = _useState56[1];
      // 工人上次身份


      var _useState57 = (0, _taroWeapp.useState)(''),
          _useState58 = _slicedToArray(_useState57, 2),
          lasted_business_identity = _useState58[0],
          setLasted_business_identity = _useState58[1];
      // 身份弹框不再提醒


      var _useState59 = (0, _taroWeapp.useState)(false),
          _useState60 = _slicedToArray(_useState59, 2),
          neverPrompt = _useState60[0],
          setNeverPrompt = _useState60[1];

      var getDates = function getDates() {
        var date = new Date().getDay();
        var time = new Date();
        var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        var week = weeks[date];
        var newTime = time.getFullYear() + '-' + addZero(time.getMonth() + 1) + '-' + addZero(time.getDate());
        var newMonth = time.getFullYear() + '-' + addZero(time.getMonth() + 1);
        // setTime(newTime);
        setNewTime(newTime);
        setNewMonth(newMonth);
        setMonth(addZero(time.getMonth() + 1));
        // 先写死
        // setStart(newTime)
        setWeek(week);
        return newMonth;
      };
      var addZero = function addZero(num) {
        if (parseInt(num) < 10) {
          num = '0' + num;
        }
        return num;
      };
      // 获取上个小程序传过来的值
      (0, _taroWeapp.onAppShow)(function (e) {
        console.log(e, '2312312');
        if (e.scene === 1037) {
          console.log(e.query);
          // 返回token ，tokenTime ,userId
          if (e.query.userId && e.query.token && e.query.tokenTime) {
            // 验证有没有手机号
          }
        }
      });
      (0, _taroWeapp.useDidShow)(function () {
        // Taro.onAppShow({
        // })
        var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
        var creationTime = _taroWeapp2.default.getStorageSync(_store.CreationTime);
        var neverPromptType = _taroWeapp2.default.getStorageSync(_store.NeverPrompt);
        if (neverPromptType) {
          setNeverPrompt(true);
        }
        // 判断有midDat就取消授权
        if (midData) {
          setDisplay(false);
        }
        var newTime = new Date().getTime() / 1000;
        // const time = 
        console.log(newTime, creationTime, 'xxx');
        // 七天显示内容
        if (creationTime && creationTime + 604800 > newTime) {
          setPrompt(true);
        }
        // 设置首页时间选择器时间
        // if (creationTime){
        //   // 开始时间
        //   let myDate = new Date(creationTime*1000);
        //   const nowY = myDate.getFullYear()-1;
        //   const nowM = myDate.getMonth();
        //   const time = nowY + '-' + nowM;
        //   setStart(time)
        //   console.log(nowY,'nowT')
        //   // 结束时间
        //   const date = new Date();
        //   const newMonth = date.getFullYear() + '-' + addZero(date.getMonth() + 1);
        //   setTime(newMonth);
        // }else{
        //   const date = new Date();
        //   const newMonth = date.getFullYear() + '-' + addZero(date.getMonth() + 1);
        //   const nowY = date.getFullYear() - 1;
        //   const nowM = date.getMonth();
        //   const time = nowY + '-' + nowM;
        //   setStart(time)
        //   setTime(newMonth);
        // }
        // 结束时间
        // const time = 
        // 清楚日历缓存
        dispatch((0, _clickTIme.setClickTIme)([]));
        // 判断有没有用户信息没有就显示
        // 获取缓存信息
        var type = _taroWeapp2.default.getStorageSync(_store.Type);
        // 有就设置
        if (type) {
          setType(type);
        }
        var userInfo = _taroWeapp2.default.getStorageSync(_store.UserInfo);
        // =======
        // if (!userInfo) {
        //   setDisplay(false);
        //   return
        // } else {
        //   setDisplay(false)
        // }
        dispatch((0, _type3.setTypes)(type));
        getData();
        // let midParams = {
        //   mid: userInfo.userId,
        // }
        // 登陆了就获取信息
        // let midData = Taro.getStorageSync(MidData);
        // if (midData) {
        //   bkMemberAuthAction(midParams).then(res => {
        //     if (res.code !== 200) {
        //       Msg(res.msg)
        //     } else {
        //       console.log(res, 'ressssssssssss')
        //       let userInfo = Taro.getStorageSync(UserInfo)
        //       res.data.sign = {}
        //       res.data.sign.token = userInfo.token;
        //       res.data.sign.time = res.data.created_time;
        //       res.data.uuid = userInfo.uuid;
        //       // res.data.worker_id = res.data.worker_id;
        //       Taro.setStorageSync(MidData, res.data)
        //     }
        //   })
        // }
      });
      (0, _taroWeapp.useEffect)(function () {}, []);
      // useEffect(()=>{
      //   // 判断有没有用户信息没有就显示
      //   // 获取缓存信息
      //   let type = Taro.getStorageSync(Type);
      //   setType(type)
      //   let userInfo = Taro.getStorageSync(UserInfo);
      //   if(!userInfo){
      //     setDisplay(true);
      //     return
      //   }else{
      //     setDisplay(false)
      //   }
      //   dispatch(setTypes(type))
      //   let midParams={
      //     mid: userInfo.userId,
      //   }
      //   let midData = Taro.getStorageSync(MidData);
      //   if (!midData){
      //     bkMemberAuthAction(midParams).then(res=>{
      //       if(res.code !== 200){
      //         Msg(res.msg)
      //       }else{
      //         console.log(res,'ressssssssssss')
      //         let userInfo = Taro.getStorageSync(UserInfo)
      //         res.data.sign={}
      //         res.data.sign.token = userInfo.token;
      //         res.data.sign.time = res.data.created_time;
      //         res.data.uuid = userInfo.uuid;
      //         // res.data.worker_id = res.data.worker_id;
      //         Taro.setStorageSync(MidData, res.data)
      //       }
      //     })
      //   }
      //   getData();
      // },[])
      // 获取项目名称
      var bkGetProjectTeam = function bkGetProjectTeam() {
        (0, _index.bkGetProjectTeamAction)({}).then(function (res) {
          // 判断为0就出现新增弹  框
          if (res.data.length === 0) {
            setCreateProjectDisplay(true);
          }
        });
      };
      // 获取首页数据
      var getData = function getData() {
        // 没登录直接进来默认是工人
        // =====
        // let type = Taro.getStorageSync(Type);
        // if(!type){
        //   setIdentity(true)
        //   return
        // }
        // setType(type);
        // 没有选择角色
        // if (type ===0){
        //   setIdentity(true)
        // }
        // 没有用户信息就默认设置为工人
        var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
        if (midData) {
          var _type = _taroWeapp2.default.getStorageSync(_store.Type);
          if (!_type) {
            setIdentity(true);
            return;
          } else {
            setType(_type);
          }
          //  没有选择角色
          if (_type === 0) {
            setIdentity(true);
          }
        }
        // 判断选没有选择时间
        var changeTime = void 0;
        if (!repeat) {
          changeTime = getDates();
        } else {
          changeTime = time;
          // 设置时间
          var date = new Date();
          var _newMonth = date.getFullYear() + '-' + addZero(date.getMonth() + 1);
          setStart(_newMonth);
          setEnd(_newMonth);
        }
        console.log(changeTime, 'changeTimechangeTime');
        var params = {
          time: changeTime,
          identity: type
        };
        // if(! )
        if (midData) {
          (0, _index.bkIndexAction)(params).then(function (res) {
            if (res.code === 200) {
              setItme(res.data);
              setNum(res.data.count_is_new);
              if (parseInt(res.data.count_is_new) == 0) {
                setShow(true);
              } else {
                setShow(false);
              }
              // 设置搜索开始结束时间
              // 设置最早时间
              setStart(res.data.earliest_month);
              // 最晚时间
              var _date = new Date();
              var _newMonth2 = _date.getFullYear() + '-' + addZero(_date.getMonth() + 1);
              setEnd(_newMonth2);
              if (Array.isArray(res.data.business_list.data)) {
                if (res.data.business_list.data) {
                  setList(res.data.business_list.data);
                } else {
                  setList([]);
                }
              } else if (res.data.business_list.data.constructor === Object) {
                if (res.data.business_list.data.data[0].arr) {
                  setList(res.data.business_list.data.data[0].arr);
                } else {
                  setList([]);
                }
              }
              console.log(3123123);
              // 存在缓存里用来判断是否新增时间
              setLasted_business_identity(res.data.lasted_business_identity);
              // 获取信息
              // 判断是班组长的时候出现弹框
              var _type2 = _taroWeapp2.default.getStorageSync(_store.Type);
              if (_type2 === 1) {
                bkGetProjectTeam();
              }
            } else {
              (0, _index4.default)(res.msg);
            }
          });
        }
      };
      // 选择时间
      var handleChangeTime = function handleChangeTime(e) {
        var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
        if (!midData) {
          setDisplay(true);
          return;
        }
        setVal(e.detail.value);
        setTime(e.detail.value);
        setRepeat(true);
        getData();
      };
      // 点击提示
      var handelTps = function handelTps() {
        var params = {
          identity: type
        };
        (0, _index.bkUpdateBusinessNewAction)(params).then(function (res) {
          if (res.code === 200) {
            (0, _index4.default)('\u60A8\u5B8C\u6210\u4E86[ ' + res.data + ' ]\u6761\u8BB0\u5DE5\u4FE1\u606F\u7684\u5907\u4EFD\uFF0C\u6570\u636E\u5B89\u5168\u4E0D\u4E22\u5931~');
            setShow(true);
          } else {
            (0, _index4.default)('放心使用，免费记工，数据永远不会丢失哟');
          }
        });
      };
      // 切换角色
      var handelChange = function handelChange(e, type) {
        var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
        if (!midData) {
          setDisplay(true);
          return;
        }
        // // 判断
        // if (neverPrompt) {
        //   return;
        // }
        // 判断点击了永不提示
        // console.log(neverPrompt,'neverPrompt')
        // if (lasted_business_identity !== 0 && type != lasted_business_identity && !neverPrompt){
        //   console.log(type,'type');
        //   console.log(lasted_business_identity,'lasted_business_identity')
        //     setTips(true)
        //     return;
        // }else{
        var msg = e === 2 ? '开始为自己记工吧' : '开始为工人记工吧';
        setType(e);
        _taroWeapp2.default.setStorageSync(_store.Type, e);
        if (!type) {
          (0, _index4.default)(msg);
          setTimeout(function () {
            getData();
          }, 1000);
        }
        // return;
        // }
      };
      var getNextPageData = function getNextPageData() {
        // console.log(31231)
        userRouteJump("/pages/flowingWater/index");
      };
      // 跳转
      var userRouteJump = function userRouteJump(url) {
        _taroWeapp2.default.navigateTo({
          url: url
        });
      };
      // 弹窗选择
      var handleType = function handleType(state) {
        var dignity = void 0;
        if (type === 1) {
          dignity = 2;
          // 不切换
        } else {
          dignity = 1;
        }
        // 切换
        if (state === 1) {
          console.log(type, 'typenjdskajdkjab');
          var msg = dignity === 1 ? '开始为自己记工吧' : '开始为工人记工吧';
          (0, _index4.default)(msg);
          console.log(dignity, 'neverPromptneverPrompt');
          // return;
          setType(dignity);
          _taroWeapp2.default.setStorageSync(_store.Type, dignity);
          // userRouteJump(`/pages/recorder/index?type=${dignity}`)
          // setTimeout(() => {
          //   getData();
          // }, 500)
        } else if (state === 2) {
          _taroWeapp2.default.setStorageSync(_store.NeverPrompt, true);
          setNeverPrompt(true);
        }
        // 切换后跳转页面
        userRouteJump("/pages/recorder/index?type=" + dignity);
        setTips(false);
      };
      // 返回鱼泡网
      var handleGoback = function handleGoback() {
        _taroWeapp2.default.navigateBackMiniProgram({
          extraData: {
            foo: 'bar'
          },
          success: function success(res) {
            // 返回成功
          }
        });
        // wx.navigateToMiniProgram({
        //   appId: '',
        //   path: 'pages/index/index?id=123',
        //   extraData: {
        //     foo: 'bar'
        //   },
        //   envVersion: 'develop',
        //   success(res) {
        //     // 打开成功
        //   }
        // })
      };
      // 点击图片
      var hanleImage = function hanleImage(v) {
        var url = void 0;
        if (v !== Images[Images.length - 1].url) {
          for (var i = 0; i < Images.length; i++) {
            if (v === Images[i].url) {
              url = Images[i + 1].url;
            }
          }
        } else {
          // 关闭
          setCloseImage(true);
          // 并开启选择身份
          getData();
        }
        setImage(url);
      };
      // 关闭授权
      var handleClose = function handleClose(e) {
        setDisplay(e);
      };
      var handleCallback = function handleCallback() {
        // userRouteJump(`/pages/login/index`)
        // return;
        // 打开新手指引
        setCloseImage(false);
        setDisplay(false);
      };
      //身份
      var handleChangeRole = function handleChangeRole(e) {
        setType(e);
        setIdentity(false);
        _taroWeapp2.default.setStorageSync(_store.Type, e);
        getData();
      };
      // 关闭创建项目
      var handleCreateProjectClose = function handleCreateProjectClose() {
        setCreateProjectDisplay(false);
      };
      // 弹框输入
      var handleInput = function handleInput(type, e) {
        var data = JSON.parse(JSON.stringify(model));
        data[type] = e.detail.value;
        setModel(data);
      };
      // 确认弹框
      var handleAddProject = function handleAddProject() {
        var params = {
          group_name: model.groupName,
          team_name: model.teamName
        };
        (0, _index.bkAddProjectTeamAction)(params).then(function (res) {
          if (res.code === 200) {
            setProject(false);
            bkGetProjectTeam();
          } else {
            (0, _index4.default)(res.msg);
            return;
          }
        });
      };
      // 填写项目返回上一步
      var handleBack = function handleBack() {
        setProject(false);
        setCreateProjectDisplay(true);
      };
      // 判断是授权进行下一步
      var nextStep = function nextStep() {
        console.log(2313123);
        var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
        if (!midData) {
          return;
        }
      };
      // 跳流水
      var handleJump = function handleJump(url, state) {
        var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
        if (!midData) {
          setDisplay(true);
          return;
        }
        if (state) {
          // 判断不是0 然后与当前身份不同就是提示
          console.log(type, 'type');
          console.log(lasted_business_identity, 'lasted_business_identity');
          if (parseInt(lasted_business_identity) !== 0 && type != parseInt(lasted_business_identity) && !neverPrompt) {
            console.log(type, 'type');
            console.log(lasted_business_identity, 'lasted_business_identity');
            setTips(true);
            return;
          } else {
            handelChange(type, true);
          }
        }
        userRouteJump(url);
        // userRouteJump('/pages/flowingWater/index')
      };
      console.log(item, 'item');

      this.anonymousFunc0 = function () {
        hanleImage(image);
      };

      this.anonymousFunc1 = function (e) {
        return handleChangeTime(e);
      };

      this.anonymousFunc2 = function () {
        handelChange(2);
      };

      this.anonymousFunc3 = function () {
        handelChange(1);
      };

      this.anonymousFunc4 = handelTps;

      this.anonymousFunc5 = function () {
        return handleJump('/pages/flowingWater/index');
      };

      this.anonymousFunc6 = function () {
        return handleJump('/pages/flowingWater/index');
      };

      this.anonymousFunc7 = function () {
        return handleJump('/pages/attendanceSheet/index');
      };

      this.anonymousFunc8 = function () {
        return handleJump("/pages/recorder/index?type=" + type + "&stateType=1", true);
      };

      this.anonymousFunc9 = function () {
        return handleJump("/pages/recorder/index?type=" + type + "&stateType=1", true);
      };

      this.anonymousFunc10 = function () {
        return handleJump("/pages/recorder/index?type=" + type);
      };

      this.anonymousFunc11 = function () {
        return handleJump("/pages/notepad/index");
      };

      this.anonymousFunc12 = function () {
        return getNextPageData();
      };

      this.anonymousFunc14 = function () {
        return getNextPageData();
      };

      this.anonymousFunc16 = function () {
        return userRouteJump('/pages/feedback/index');
      };

      this.anonymousFunc17 = handleGoback;

      this.anonymousFunc18 = function () {
        return handleType(0);
      };

      this.anonymousFunc19 = function () {
        return handleType(1);
      };

      this.anonymousFunc20 = function () {
        return handleType(2);
      };

      this.anonymousFunc21 = function () {
        return handleChangeRole(1);
      };

      this.anonymousFunc22 = function () {
        return handleChangeRole(2);
      };

      var anonymousState__temp5 = function anonymousState__temp5() {
        setCreateProjectDisplay(false), setProject(true);
      };

      var anonymousState__temp6 = function anonymousState__temp6() {
        return setProject(false);
      };

      var loopArray98 = type === 1 && list.length > 0 && !busy ? list.map(function (v, i) {
        v = {
          $original: (0, _taroWeapp.internal_get_original)(v)
        };
        var $loopState__temp2 = type === 1 && list.length > 0 && !busy ? i + i : null;

        var _$indexKey = "bgczz" + i;

        _this2.anonymousFunc13Map[_$indexKey] = getNextPageData;
        return {
          $loopState__temp2: $loopState__temp2,
          _$indexKey: _$indexKey,
          $original: v.$original
        };
      }) : [];
      var loopArray99 = type === 2 && list.length > 0 && !busy ? list.map(function (v, i) {
        v = {
          $original: (0, _taroWeapp.internal_get_original)(v)
        };
        var $loopState__temp4 = type === 2 && list.length > 0 && !busy ? i + i : null;

        var _$indexKey2 = "bgdzz" + i;

        _this2.anonymousFunc15Map[_$indexKey2] = getNextPageData;
        return {
          $loopState__temp4: $loopState__temp4,
          _$indexKey2: _$indexKey2,
          $original: v.$original
        };
      }) : [];
      item && !show && _taroWeapp.propsManager.set({
        "value": num,
        "maxValue": 99,
        "className": "AtBadge"
      }, $compid__184, $prevCompid__184);
      _taroWeapp.propsManager.set({
        "isOpened": tips,
        "closeOnClickOverlay": false
      }, $compid__185, $prevCompid__185);
      _taroWeapp.propsManager.set({
        "isOpened": identity,
        "closeOnClickOverlay": false
      }, $compid__186, $prevCompid__186);
      _taroWeapp.propsManager.set({
        "display": display,
        "handleClose": handleClose,
        "callback": handleCallback
      }, $compid__187, $prevCompid__187);
      _taroWeapp.propsManager.set({
        "display": createProjectDisplay,
        "handleClose": handleCreateProjectClose,
        "val": model && model.groupName,
        "handleSubmit": anonymousState__temp5,
        "handleInput": handleInput
      }, $compid__188, $prevCompid__188);
      _taroWeapp.propsManager.set({
        "display": project,
        "handleSubmit": handleAddProject,
        "handleInput": handleInput,
        "teamName": model && model.teamName,
        "handleBack": handleBack,
        "handleClose": anonymousState__temp6
      }, $compid__189, $prevCompid__189);
      Object.assign(this.__state, {
        anonymousState__temp5: anonymousState__temp5,
        anonymousState__temp6: anonymousState__temp6,
        loopArray98: loopArray98,
        loopArray99: loopArray99,
        $compid__184: $compid__184,
        $compid__185: $compid__185,
        $compid__186: $compid__186,
        $compid__187: $compid__187,
        $compid__188: $compid__188,
        $compid__189: $compid__189,
        image: image,
        closeImage: closeImage,
        IMGCDNURL: _index2.IMGCDNURL,
        start: start,
        end: end,
        vals: vals,
        newMonth: newMonth,
        type: type,
        prompt: prompt,
        item: item,
        show: show,
        busy: busy,
        list: list,
        month: month,
        newTime: newTime,
        week: week
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
  }, {
    key: 'anonymousFunc4',
    value: function anonymousFunc4(e) {
      ;
    }
  }, {
    key: 'anonymousFunc5',
    value: function anonymousFunc5(e) {
      ;
    }
  }, {
    key: 'anonymousFunc6',
    value: function anonymousFunc6(e) {
      ;
    }
  }, {
    key: 'anonymousFunc7',
    value: function anonymousFunc7(e) {
      ;
    }
  }, {
    key: 'anonymousFunc8',
    value: function anonymousFunc8(e) {
      ;
    }
  }, {
    key: 'anonymousFunc9',
    value: function anonymousFunc9(e) {
      ;
    }
  }, {
    key: 'anonymousFunc10',
    value: function anonymousFunc10(e) {
      ;
    }
  }, {
    key: 'anonymousFunc11',
    value: function anonymousFunc11(e) {
      ;
    }
  }, {
    key: 'anonymousFunc12',
    value: function anonymousFunc12(e) {
      ;
    }
  }, {
    key: 'anonymousFunc13',
    value: function anonymousFunc13(_$indexKey) {
      var _anonymousFunc13Map;

      ;

      for (var _len2 = arguments.length, e = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        e[_key2 - 1] = arguments[_key2];
      }

      return this.anonymousFunc13Map[_$indexKey] && (_anonymousFunc13Map = this.anonymousFunc13Map)[_$indexKey].apply(_anonymousFunc13Map, e);
    }
  }, {
    key: 'anonymousFunc14',
    value: function anonymousFunc14(e) {
      ;
    }
  }, {
    key: 'anonymousFunc15',
    value: function anonymousFunc15(_$indexKey2) {
      var _anonymousFunc15Map;

      ;

      for (var _len3 = arguments.length, e = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        e[_key3 - 1] = arguments[_key3];
      }

      return this.anonymousFunc15Map[_$indexKey2] && (_anonymousFunc15Map = this.anonymousFunc15Map)[_$indexKey2].apply(_anonymousFunc15Map, e);
    }
  }, {
    key: 'anonymousFunc16',
    value: function anonymousFunc16(e) {
      ;
    }
  }, {
    key: 'anonymousFunc17',
    value: function anonymousFunc17(e) {
      ;
    }
  }, {
    key: 'anonymousFunc18',
    value: function anonymousFunc18(e) {
      ;
    }
  }, {
    key: 'anonymousFunc19',
    value: function anonymousFunc19(e) {
      ;
    }
  }, {
    key: 'anonymousFunc20',
    value: function anonymousFunc20(e) {
      ;
    }
  }, {
    key: 'anonymousFunc21',
    value: function anonymousFunc21(e) {
      ;
    }
  }, {
    key: 'anonymousFunc22',
    value: function anonymousFunc22(e) {
      ;
    }
  }]);

  return Index;
}(_taroWeapp2.default.Component), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "anonymousFunc6", "anonymousFunc7", "anonymousFunc8", "anonymousFunc9", "anonymousFunc10", "anonymousFunc11", "anonymousFunc12", "anonymousFunc13", "anonymousFunc14", "anonymousFunc15", "anonymousFunc16", "anonymousFunc17", "anonymousFunc18", "anonymousFunc19", "anonymousFunc20", "anonymousFunc21", "anonymousFunc22"], _class.$$componentPath = "pages/index/index", _temp2);
// Index.config = {
//   navigationBarTitleText: '首页',
// } as Config


exports.default = Index;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Index, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/index/index.tsx?taro&type=template&parse=PAGE&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/index/index.tsx?taro&type=template&parse=PAGE& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/index/index.wxml";

/***/ }),

/***/ "./src/actions/type.ts":
/*!*****************************!*\
  !*** ./src/actions/type.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTypes = setTypes;
exports.getType = getType;

var _typs = __webpack_require__(/*! ../constants/typs */ "./src/constants/typs.ts");

function setTypes(data) {
  return {
    type: _typs.SETTYPE,
    data: data
  };
}
function getType() {
  return {
    type: _typs.GETTYPE
  };
}

/***/ }),

/***/ "./src/pages/index/index.scss":
/*!************************************!*\
  !*** ./src/pages/index/index.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/index/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/index/index.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=PAGE& */ "./src/pages/index/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=PAGE& */ "./src/pages/index/index.tsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/index/index.tsx?taro&type=script&parse=PAGE&":
/*!****************************************************************!*\
  !*** ./src/pages/index/index.tsx?taro&type=script&parse=PAGE& ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/index/index.tsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/index/index.tsx?taro&type=template&parse=PAGE&":
/*!******************************************************************!*\
  !*** ./src/pages/index/index.tsx?taro&type=template&parse=PAGE& ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/index/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./src/pages/index/index.tsx","runtime","taro","vendors","common"]]]);