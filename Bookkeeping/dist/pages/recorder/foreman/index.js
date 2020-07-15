(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/recorder/foreman/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/recorder/foreman/index.tsx?taro&type=script&parse=COMPONENT&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/recorder/foreman/index.tsx?taro&type=script&parse=COMPONENT& ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.context = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _index = __webpack_require__(/*! ../../../utils/request/index */ "./src/utils/request/index.ts");

var _index2 = __webpack_require__(/*! ../../../utils/upload/index */ "./src/utils/upload/index.tsx");

var _index3 = _interopRequireDefault(_index2);

var _index4 = __webpack_require__(/*! ../../../hooks/foreman/index */ "./src/hooks/foreman/index.ts");

var _index5 = _interopRequireDefault(_index4);

var _redux = __webpack_require__(/*! @tarojs/redux */ "./node_modules/@tarojs/redux/index.js");

var _clickTIme = __webpack_require__(/*! ../../../actions/clickTIme */ "./src/actions/clickTIme.ts");

var _index6 = __webpack_require__(/*! ../../../config/index */ "./src/config/index.ts");

var _classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

__webpack_require__(/*! ./index.scss */ "./src/pages/recorder/foreman/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var context = exports.context = (0, _taroWeapp.createContext)({});

var Foreman = (_temp2 = _class = function (_Taro$Component) {
  _inherits(Foreman, _Taro$Component);

  function Foreman() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Foreman);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Foreman.__proto__ || Object.getPrototypeOf(Foreman)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp5", "anonymousState__temp6", "anonymousState__temp7", "recorderTypeArr", "contractorArr", "borrowing", "loopArray61", "loopArray62", "loopArray63", "loopArray64", "loopArray65", "$compid__68", "$compid__69", "$compid__70", "$compid__71", "$compid__72", "$compid__73", "$compid__74", "$compid__75", "$compid__76", "$compid__77", "$compid__78", "$compid__79", "$compid__80", "$compid__81", "IMGCDNURL", "recorderType", "model", "identity", "foremanTitle", "workerItem", "delType", "contractor", "edit", "projectArr", "clickNum", "unit"], _this.anonymousFunc0Map = {}, _this.anonymousFunc1Map = {}, _this.anonymousFunc5Map = {}, _this.anonymousFunc6Map = {}, _this.anonymousFunc7Map = {}, _this.anonymousFunc8Map = {}, _this.anonymousFunc19Map = {}, _this.anonymousFunc31Map = {}, _this.anonymousFunc32Map = {}, _this.anonymousFunc33Map = {}, _this.anonymousFunc34Map = {}, _this.customComponents = ["WordsTotal", "ImageView", "ProjectModal", "RecorderPopup", "Quantities", "WorkOvertime", "WorkingHours", "CreateProject", "CalendarModal", "WageStandard", "AddMember", "WagesModal", "EditProject", "AtDrawer"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Foreman, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Foreman.prototype.__proto__ || Object.getPrototypeOf(Foreman.prototype), "_constructor", this).call(this, props);

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

      var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__68"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__68 = _genCompid2[0],
          $compid__68 = _genCompid2[1];

      var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "$compid__69"),
          _genCompid4 = _slicedToArray(_genCompid3, 2),
          $prevCompid__69 = _genCompid4[0],
          $compid__69 = _genCompid4[1];

      var _genCompid5 = (0, _taroWeapp.genCompid)(__prefix + "$compid__70"),
          _genCompid6 = _slicedToArray(_genCompid5, 2),
          $prevCompid__70 = _genCompid6[0],
          $compid__70 = _genCompid6[1];

      var _genCompid7 = (0, _taroWeapp.genCompid)(__prefix + "$compid__71"),
          _genCompid8 = _slicedToArray(_genCompid7, 2),
          $prevCompid__71 = _genCompid8[0],
          $compid__71 = _genCompid8[1];

      var _genCompid9 = (0, _taroWeapp.genCompid)(__prefix + "$compid__72"),
          _genCompid10 = _slicedToArray(_genCompid9, 2),
          $prevCompid__72 = _genCompid10[0],
          $compid__72 = _genCompid10[1];

      var _genCompid11 = (0, _taroWeapp.genCompid)(__prefix + "$compid__73"),
          _genCompid12 = _slicedToArray(_genCompid11, 2),
          $prevCompid__73 = _genCompid12[0],
          $compid__73 = _genCompid12[1];

      var _genCompid13 = (0, _taroWeapp.genCompid)(__prefix + "$compid__74"),
          _genCompid14 = _slicedToArray(_genCompid13, 2),
          $prevCompid__74 = _genCompid14[0],
          $compid__74 = _genCompid14[1];

      var _genCompid15 = (0, _taroWeapp.genCompid)(__prefix + "$compid__75"),
          _genCompid16 = _slicedToArray(_genCompid15, 2),
          $prevCompid__75 = _genCompid16[0],
          $compid__75 = _genCompid16[1];

      var _genCompid17 = (0, _taroWeapp.genCompid)(__prefix + "$compid__76"),
          _genCompid18 = _slicedToArray(_genCompid17, 2),
          $prevCompid__76 = _genCompid18[0],
          $compid__76 = _genCompid18[1];

      var _genCompid19 = (0, _taroWeapp.genCompid)(__prefix + "$compid__77"),
          _genCompid20 = _slicedToArray(_genCompid19, 2),
          $prevCompid__77 = _genCompid20[0],
          $compid__77 = _genCompid20[1];

      var _genCompid21 = (0, _taroWeapp.genCompid)(__prefix + "$compid__78"),
          _genCompid22 = _slicedToArray(_genCompid21, 2),
          $prevCompid__78 = _genCompid22[0],
          $compid__78 = _genCompid22[1];

      var _genCompid23 = (0, _taroWeapp.genCompid)(__prefix + "$compid__79"),
          _genCompid24 = _slicedToArray(_genCompid23, 2),
          $prevCompid__79 = _genCompid24[0],
          $compid__79 = _genCompid24[1];

      var _genCompid25 = (0, _taroWeapp.genCompid)(__prefix + "$compid__80"),
          _genCompid26 = _slicedToArray(_genCompid25, 2),
          $prevCompid__80 = _genCompid26[0],
          $compid__80 = _genCompid26[1];

      var _genCompid27 = (0, _taroWeapp.genCompid)(__prefix + "$compid__81"),
          _genCompid28 = _slicedToArray(_genCompid27, 2),
          $prevCompid__81 = _genCompid28[0],
          $compid__81 = _genCompid28[1];

      var dispatch = (0, _redux.useDispatch)();
      // 获取存入的公用内容
      var useSelectorItem = (0, _redux.useSelector)(function (state) {
        return state;
      });

      var _userForeman = (0, _index5.default)(),
          model = _userForeman.model,
          setModel = _userForeman.setModel,
          handleInput = _userForeman.handleInput,
          handleAddProject = _userForeman.handleAddProject,
          project = _userForeman.project,
          setProject = _userForeman.setProject,
          handleworkOvertime = _userForeman.handleworkOvertime,
          setWorkOvertimeDisplay = _userForeman.setWorkOvertimeDisplay,
          workOvertimeDisplay = _userForeman.workOvertimeDisplay,
          workingHoursDisplay = _userForeman.workingHoursDisplay,
          setWorkingHoursDisplay = _userForeman.setWorkingHoursDisplay,
          timeType = _userForeman.timeType,
          handleWorkingHours = _userForeman.handleWorkingHours,
          timeArr = _userForeman.timeArr,
          addWorkArr = _userForeman.addWorkArr,
          handleWorkOvertimeOk = _userForeman.handleWorkOvertimeOk,
          company = _userForeman.company,
          handleQuantities = _userForeman.handleQuantities,
          quantitiesDisplay = _userForeman.quantitiesDisplay,
          setQuantitiesDisplay = _userForeman.setQuantitiesDisplay,
          unit = _userForeman.unit,
          borrowing = _userForeman.borrowing,
          setBorrowing = _userForeman.setBorrowing,
          handleRadioBorrowing = _userForeman.handleRadioBorrowing,
          workerItem = _userForeman.workerItem,
          setWorkerItem = _userForeman.setWorkerItem,
          handleEstablish = _userForeman.handleEstablish,
          addMemberDisplay = _userForeman.addMemberDisplay,
          setAddMemberDisplay = _userForeman.setAddMemberDisplay,
          handleDel = _userForeman.handleDel,
          handleDelList = _userForeman.handleDelList,
          delType = _userForeman.delType,
          setDeldelType = _userForeman.setDeldelType,
          handleAddStandard = _userForeman.handleAddStandard,
          wagesModalDisplay = _userForeman.wagesModalDisplay,
          setWagesModalDisplay = _userForeman.setWagesModalDisplay,
          wageStandardDisplay = _userForeman.wageStandardDisplay,
          setWageStandardDisplay = _userForeman.setWageStandardDisplay,
          wageStandard = _userForeman.wageStandard,
          handleWageStandard = _userForeman.handleWageStandard,
          handlePreservation = _userForeman.handlePreservation,
          recorderTypeArr = _userForeman.recorderTypeArr,
          setRecorderTypeArr = _userForeman.setRecorderTypeArr,
          handleCalendar = _userForeman.handleCalendar,
          projectArr = _userForeman.projectArr,
          handleProject = _userForeman.handleProject,
          show = _userForeman.show,
          setShow = _userForeman.setShow,
          workerList = _userForeman.workerList,
          setWorkerList = _userForeman.setWorkerList,
          _handleCheckbox = _userForeman.handleCheckbox,
          memberList = _userForeman.memberList,
          _setMemberList = _userForeman.setMemberList,
          standard = _userForeman.standard,
          handleAddWage = _userForeman.handleAddWage,
          handleWageStandardRadio = _userForeman.handleWageStandardRadio,
          handleOpenWagesModal = _userForeman.handleOpenWagesModal,
          moneyList = _userForeman.moneyList,
          handleEditWages = _userForeman.handleEditWages,
          handleEditWageStandard = _userForeman.handleEditWageStandard,
          tab = _userForeman.tab,
          handleAtSwitch = _userForeman.handleAtSwitch,
          handleDelProject = _userForeman.handleDelProject,
          editProjectDisplay = _userForeman.editProjectDisplay,
          setEditProjectDisplay = _userForeman.setEditProjectDisplay,
          handleEditProject = _userForeman.handleEditProject,
          handleEditProjectModal = _userForeman.handleEditProjectModal,
          editProjectData = _userForeman.editProjectData,
          handleEditProjectData = _userForeman.handleEditProjectData,
          handleSetWagesModal = _userForeman.handleSetWagesModal,
          handleWagesList = _userForeman.handleWagesList,
          setWorkList = _userForeman.setWorkList,
          handleCheckboxStandard = _userForeman.handleCheckboxStandard,
          groupInfo = _userForeman.groupInfo,
          image = _userForeman.image,
          setImage = _userForeman.setImage,
          bkGetWorker = _userForeman.bkGetWorker,
          contractorArr = _userForeman.contractorArr,
          setContractorArr = _userForeman.setContractorArr,
          num = _userForeman.num,
          handleWorkerItem = _userForeman.handleWorkerItem,
          timeData = _userForeman.timeData,
          setTimeData = _userForeman.setTimeData,
          handleAllChange = _userForeman.handleAllChange,
          clickNum = _userForeman.clickNum,
          clickModalNum = _userForeman.clickModalNum,
          refresh = _userForeman.refresh,
          setRefresh = _userForeman.setRefresh,
          handleLongClick = _userForeman.handleLongClick,
          identity = _userForeman.identity,
          foremanTitle = _userForeman.foremanTitle,
          handleAllClick = _userForeman.handleAllClick,
          setContractor = _userForeman.setContractor,
          handleRadio = _userForeman.handleRadio,
          contractor = _userForeman.contractor,
          handleAdd = _userForeman.handleAdd,
          recorderType = _userForeman.recorderType,
          setRecorderType = _userForeman.setRecorderType,
          calendarDays = _userForeman.calendarDays,
          setCalendarDays = _userForeman.setCalendarDays,
          clickData = _userForeman.clickData,
          setClickData = _userForeman.setClickData,
          handleClickCalendar = _userForeman.handleClickCalendar,
          time = _userForeman.time,
          getMonthDaysCurrent = _userForeman.getMonthDaysCurrent,
          arr = _userForeman.arr,
          handleCalendarClose = _userForeman.handleCalendarClose,
          handleChangeTime = _userForeman.handleChangeTime,
          calendarModalDisplay = _userForeman.calendarModalDisplay,
          handleCalendarSub = _userForeman.handleCalendarSub,
          setCalendarModalDisplay = _userForeman.setCalendarModalDisplay,
          onScrollToUpper = _userForeman.onScrollToUpper,
          onScrollToLower = _userForeman.onScrollToLower,
          onTouchEnd = _userForeman.onTouchEnd,
          onTouchStart = _userForeman.onTouchStart,
          onLongPress = _userForeman.onLongPress;
      // const [contractor, setContractor] = useState<number>(0)
      // 成功弹窗


      var _useState = (0, _taroWeapp.useState)(false),
          _useState2 = _slicedToArray(_useState, 2),
          display = _useState2[0],
          setDisplay = _useState2[1];
      // 创建项目引导


      var _useState3 = (0, _taroWeapp.useState)(false),
          _useState4 = _slicedToArray(_useState3, 2),
          createProjectDisplay = _useState4[0],
          setCreateProjectDisplay = _useState4[1];
      // 项目列表取消，删除/修改


      var _useState5 = (0, _taroWeapp.useState)(false),
          _useState6 = _slicedToArray(_useState5, 2),
          edit = _useState6[0],
          setEdit = _useState6[1];
      // 项目名称


      var _useState7 = (0, _taroWeapp.useState)([{}, {}]),
          _useState8 = _slicedToArray(_useState7, 2),
          projectList = _useState8[0],
          setProjectList = _useState8[1];
      // useDidShow(()=>{
      //   if (useSelectorItem.workerList.length>0){
      //     setWorkerItem(useSelectorItem.workerList)
      //   }
      // })


      var _useState9 = (0, _taroWeapp.useState)({
        group_info: '',
        team_name: '',
        group_name: ''
      }),
          _useState10 = _slicedToArray(_useState9, 2),
          editProject = _useState10[0],
          setEditProject = _useState10[1];
      // 获取数据
      // useEffect(()=>{
      //   // 获取项目列表
      //   // bkGetProjectTeam();
      // },[])
      // 获取项目列表


      var bkGetProjectTeam = function bkGetProjectTeam() {
        var params = {};
        (0, _index.bkGetProjectTeamAction)(params).then(function (res) {
          console.log(res);
        });
      };
      // 切换tabber
      var handleClckTabber = function handleClckTabber(v) {
        console.log(v);
        var recorderTypeArrList = JSON.parse(JSON.stringify(recorderTypeArr.item));
        var data = recorderTypeArrList.map(function (val) {
          if (val.id === v.id) {
            val.click = true;
            setRecorderType(val.id);
            // if(v.id===3){
            // 设置日历rudux为空
            dispatch((0, _clickTIme.setClickTIme)([]));
            // }
          } else {
            val.click = false;
          }
          return val;
        });
        setRecorderTypeArr({ item: data });
      };
      // 上传图片
      var userUploadImg = function userUploadImg() {
        var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

        setRefresh(true);
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
      // 点击保存成功弹窗
      var handleRecorderPopup = function handleRecorderPopup(type) {
        // 跳转
        if (!(type === 1)) {
          _taroWeapp2.default.navigateBack({
            delta: 1
          });
        }
        setDisplay(false);
      };
      // 关闭选择单位
      var handleClose = function handleClose() {
        setQuantitiesDisplay(false);
      };
      //关闭加班时长
      var handleWorkOvertimeClose = function handleWorkOvertimeClose() {
        setWorkOvertimeDisplay(false);
      };
      // 关闭上班时长
      var handleWorkingHoursClose = function handleWorkingHoursClose() {
        setWorkingHoursDisplay(false);
      };
      // 引导创建项目
      var handleCreateProjectClose = function handleCreateProjectClose() {
        setCreateProjectDisplay(false);
      };
      // 关闭日历
      var handleCalendarModalDisplayClose = function handleCalendarModalDisplayClose() {
        // setCalendarModalDisplay(false);
        // 并清空
        setTimeData([]);
      };
      // 关闭工资标准
      var handleWageStandardClose = function handleWageStandardClose() {
        setWageStandardDisplay(false);
      };
      // 关闭添加成员
      var handleAddMemberClose = function handleAddMemberClose() {
        setAddMemberDisplay(false);
      };
      // 关闭工资
      var handleWagesModalClose = function handleWagesModalClose() {
        setWagesModalDisplay(false);
      };
      // 修改删除
      var handleEdit = function handleEdit(type) {
        if (type === 0) {
          setEdit(true);
        } else {
          setEdit(false);
        }
      };
      // 上一步
      var handleBack = function handleBack() {
        setProject(false);
        setCreateProjectDisplay(true);
      };
      // 跳转
      var userRouteJump = function userRouteJump(url) {
        _taroWeapp2.default.navigateTo({
          url: url
        });
      };
      var value = {
        dataArr: workerList,
        handleCheckbox: function handleCheckbox(e) {
          return _handleCheckbox(e);
        },
        memberList: memberList,
        setMemberList: function setMemberList(e) {
          return _setMemberList(e);
        }
      };
      // // 选择工人添加，没有选择项目无法选择
      // const handleAdd = ()=>{
      //   if (!model.name){
      //     Msg('请选择项目')
      //     return
      //   }
      //   bkGetWorker(groupInfo);
      //   userRouteJump(`/pages/addTeamMember/index?groupInfo=${groupInfo}`) 
      // }
      context.Provider(value);

      this.anonymousFunc2 = function () {
        bkGetProjectTeam(), setShow(true);
      };

      this.anonymousFunc3 = function () {
        bkGetWorker(), userRouteJump("/pages/addTeamMember/index?groupInfo=" + groupInfo + "&type=2");
      };

      this.anonymousFunc4 = function (e) {
        e.stopPropagation(), e.preventDefault(), handleAllChange();
      };

      this.anonymousFunc9 = function () {
        return handleDel(1);
      };

      this.anonymousFunc10 = handleAdd;

      this.anonymousFunc11 = function () {
        return handleDel(0);
      };

      this.anonymousFunc12 = function () {
        return setWorkOvertimeDisplay(true);
      };

      this.anonymousFunc13 = function () {
        setWageStandardDisplay(true);
      };

      this.anonymousFunc14 = function (e) {
        return handleInput('amount', e);
      };

      this.anonymousFunc15 = function () {
        return setQuantitiesDisplay(true);
      };

      this.anonymousFunc16 = function (e) {
        return handleInput('price', e);
      };

      this.anonymousFunc17 = function (e) {
        return handleInput('wages', e);
      };

      this.anonymousFunc18 = function (e) {
        return handleInput('borrowing', e);
      };

      this.anonymousFunc20 = function () {
        return setCalendarModalDisplay(true);
      };

      this.anonymousFunc21 = function (e) {
        return handleInput('time', e);
      };

      this.anonymousFunc22 = function (e) {
        return handleInput('details', e);
      };

      this.anonymousFunc23 = function () {
        return handlePreservation(1);
      };

      this.anonymousFunc24 = function () {
        return handlePreservation(0);
      };

      var anonymousState__temp5 = function anonymousState__temp5() {
        return setProject(false);
      };

      var anonymousState__temp6 = function anonymousState__temp6() {
        setCreateProjectDisplay(false), setProject(true);
      };

      this.anonymousFunc25 = onScrollToLower;
      this.anonymousFunc26 = onScrollToUpper;

      var anonymousState__temp7 = function anonymousState__temp7() {
        return setEditProjectDisplay(false);
      };

      this.anonymousFunc27 = function () {
        setShow(false);
      };

      this.anonymousFunc28 = function () {
        setShow(false);
      };

      this.anonymousFunc29 = function () {
        return handleEdit(0);
      };

      this.anonymousFunc30 = function () {
        return handleEdit(1);
      };

      this.anonymousFunc35 = function () {
        setCreateProjectDisplay(true), setShow(false);
      };

      var loopArray61 = recorderTypeArr.item.map(function (v, __index0) {
        v = {
          $original: (0, _taroWeapp.internal_get_original)(v)
        };

        var _$indexKey = "bbhzz" + __index0;

        _this2.anonymousFunc0Map[_$indexKey] = function () {
          return handleClckTabber(v.$original);
        };

        var $loopState__temp2 = (0, _classnames2.default)({
          'tabber-list-image-dian': v.$original.id === 1,
          'tabber-list-image-bao': v.$original.id === 2,
          'tabber-list-image-jie': v.$original.id === 3
        });
        return {
          _$indexKey: _$indexKey,
          $loopState__temp2: $loopState__temp2,
          $original: v.$original
        };
      });
      var loopArray62 = recorderType === 2 ? contractorArr.item.map(function (v, __index1) {
        v = {
          $original: (0, _taroWeapp.internal_get_original)(v)
        };

        var _$indexKey2 = "bbizz" + __index1;

        _this2.anonymousFunc1Map[_$indexKey2] = function () {
          return handleRadio(v.$original);
        };

        return {
          _$indexKey2: _$indexKey2,
          $original: v.$original
        };
      }) : [];
      var loopArray63 = identity === 1 ? workerItem.map(function (v, __index5) {
        v = {
          $original: (0, _taroWeapp.internal_get_original)(v)
        };

        var _$indexKey3 = "bbjzz" + __index5;

        _this2.anonymousFunc5Map[_$indexKey3] = function () {
          return setWagesModalDisplay(true);
        };

        var _$indexKey4 = "bcazz" + __index5;

        _this2.anonymousFunc6Map[_$indexKey4] = function () {
          return handleWorkerItem(v.$original);
        };

        var $loopState__temp4 = v.$original.id === 1 ? v.$original.name.slice(0, 2) : null;

        var _$indexKey5 = "bcbzz" + __index5;

        _this2.anonymousFunc7Map[_$indexKey5] = function (e) {
          e.stopPropagation(), handleOpenWagesModal();
        };

        var _$indexKey6 = "bcczz" + __index5;

        _this2.anonymousFunc8Map[_$indexKey6] = function (e) {
          e.stopPropagation(), handleDelList(v.$original);
        };

        return {
          _$indexKey3: _$indexKey3,
          _$indexKey4: _$indexKey4,
          $loopState__temp4: $loopState__temp4,
          _$indexKey5: _$indexKey5,
          _$indexKey6: _$indexKey6,
          $original: v.$original
        };
      }) : [];
      var loopArray64 = recorderType === 3 ? borrowing.item.map(function (v, __index19) {
        v = {
          $original: (0, _taroWeapp.internal_get_original)(v)
        };

        var _$indexKey7 = "bcdzz" + __index19;

        _this2.anonymousFunc19Map[_$indexKey7] = function () {
          return handleRadioBorrowing(v.$original);
        };

        return {
          _$indexKey7: _$indexKey7,
          $original: v.$original
        };
      }) : [];
      var loopArray65 = projectArr.map(function (v, __index31) {
        v = {
          $original: (0, _taroWeapp.internal_get_original)(v)
        };

        var _$indexKey8 = "bcezz" + __index31;

        _this2.anonymousFunc31Map[_$indexKey8] = function () {
          return handleProject(v.$original);
        };

        var _$indexKey9 = "bcfzz" + __index31;

        _this2.anonymousFunc32Map[_$indexKey9] = function (e) {
          return e.stopPropagation();
        };

        var _$indexKey10 = "bcgzz" + __index31;

        _this2.anonymousFunc33Map[_$indexKey10] = function (e) {
          e.stopPropagation(), handleEditProjectModal(v.$original);
        };

        var _$indexKey11 = "bchzz" + __index31;

        _this2.anonymousFunc34Map[_$indexKey11] = function (e) {
          e.stopPropagation(), handleDelProject(v.$original.id);
        };

        return {
          _$indexKey8: _$indexKey8,
          _$indexKey9: _$indexKey9,
          _$indexKey10: _$indexKey10,
          _$indexKey11: _$indexKey11,
          $original: v.$original
        };
      });
      _taroWeapp.propsManager.set({
        "num": num
      }, $compid__68, $prevCompid__68);
      _taroWeapp.propsManager.set({
        "images": image.item,
        "max": 4,
        "userUploadImg": userUploadImg,
        "userDelImg": userDelImg
      }, $compid__69, $prevCompid__69);
      _taroWeapp.propsManager.set({
        "display": project,
        "handleSubmit": handleAddProject,
        "handleInput": handleInput,
        "teamName": model && model.teamName,
        "handleBack": handleBack,
        "handleClose": anonymousState__temp5
      }, $compid__70, $prevCompid__70);
      _taroWeapp.propsManager.set({
        "display": display,
        "handleRecorderPopup": handleRecorderPopup
      }, $compid__71, $prevCompid__71);
      _taroWeapp.propsManager.set({
        "display": quantitiesDisplay,
        "handleClose": handleClose,
        "data": company,
        "handleQuantities": handleQuantities
      }, $compid__72, $prevCompid__72);
      _taroWeapp.propsManager.set({
        "display": workOvertimeDisplay,
        "handleWorkOvertimeClose": handleWorkOvertimeClose,
        "handleworkOvertime": handleworkOvertime,
        "data": timeArr,
        "dataArr": addWorkArr,
        "handleWorkOvertimeOk": handleWorkOvertimeOk,
        "model": model
      }, $compid__73, $prevCompid__73);
      _taroWeapp.propsManager.set({
        "display": workingHoursDisplay,
        "handleWorkingHoursClose": handleWorkingHoursClose,
        "type": timeType,
        "handleWorkingHours": handleWorkingHours
      }, $compid__74, $prevCompid__74);
      _taroWeapp.propsManager.set({
        "display": createProjectDisplay,
        "handleClose": handleCreateProjectClose,
        "val": model && model.groupName,
        "handleSubmit": anonymousState__temp6,
        "handleInput": handleInput
      }, $compid__75, $prevCompid__75);
      _taroWeapp.propsManager.set({
        "display": calendarModalDisplay,
        "handleCalendar": handleCalendar,
        "model": model,
        "setModel": setModel,
        "setTimeData": setTimeData,
        "recorderType": recorderType,
        "handleClickCalendar": handleClickCalendar,
        "time": time,
        "getMonthDaysCurrent": getMonthDaysCurrent,
        "arr": arr,
        "clickData": clickData,
        "handleCalendarClose": handleCalendarClose,
        "handleChangeTime": handleChangeTime,
        "handleCalendarSub": handleCalendarSub,
        "onScrollToLower": this.anonymousFunc25,
        "onScrollToUpper": this.anonymousFunc26,
        "calendarDays": calendarDays
      }, $compid__76, $prevCompid__76);
      _taroWeapp.propsManager.set({
        "display": wageStandardDisplay,
        "handleClose": handleWageStandardClose,
        "wageStandard": wageStandard,
        "handleWageStandard": handleWageStandard,
        "handleAddWage": handleAddWage,
        "handleWageStandardRadio": handleWageStandardRadio
      }, $compid__77, $prevCompid__77);
      _taroWeapp.propsManager.set({
        "display": addMemberDisplay,
        "handleClose": handleAddMemberClose,
        "handleEstablish": handleEstablish,
        "handleInput": handleInput,
        "groupInfo": groupInfo
      }, $compid__78, $prevCompid__78);
      _taroWeapp.propsManager.set({
        "display": wagesModalDisplay,
        "handleClose": handleWagesModalClose,
        "data": setWorkList,
        "handleAddStandard": handleAddStandard,
        "standard": standard,
        "moneyList": moneyList,
        "handleEditWages": handleEditWages,
        "handleAtSwitch": handleAtSwitch,
        "tab": tab,
        "handleSetWagesModal": handleSetWagesModal,
        "handleWagesList": handleWagesList,
        "handleCheckboxStandard": handleCheckboxStandard,
        "clickModalNum": clickModalNum,
        "handleAllClick": handleAllClick
      }, $compid__79, $prevCompid__79);
      _taroWeapp.propsManager.set({
        "display": editProjectDisplay,
        "handleEditProjectData": handleEditProjectData,
        "data": editProjectData,
        "handleClose": anonymousState__temp7,
        "handleSubmit": handleEditProject
      }, $compid__80, $prevCompid__80);
      _taroWeapp.propsManager.set({
        "show": show,
        "right": true,
        "mask": true,
        "className": "atDrawer",
        "onClose": this.anonymousFunc27
      }, $compid__81, $prevCompid__81);
      Object.assign(this.__state, {
        anonymousState__temp5: anonymousState__temp5,
        anonymousState__temp6: anonymousState__temp6,
        anonymousState__temp7: anonymousState__temp7,
        recorderTypeArr: recorderTypeArr,
        contractorArr: contractorArr,
        borrowing: borrowing,
        loopArray61: loopArray61,
        loopArray62: loopArray62,
        loopArray63: loopArray63,
        loopArray64: loopArray64,
        loopArray65: loopArray65,
        $compid__68: $compid__68,
        $compid__69: $compid__69,
        $compid__70: $compid__70,
        $compid__71: $compid__71,
        $compid__72: $compid__72,
        $compid__73: $compid__73,
        $compid__74: $compid__74,
        $compid__75: $compid__75,
        $compid__76: $compid__76,
        $compid__77: $compid__77,
        $compid__78: $compid__78,
        $compid__79: $compid__79,
        $compid__80: $compid__80,
        $compid__81: $compid__81,
        IMGCDNURL: _index6.IMGCDNURL,
        recorderType: recorderType,
        model: model,
        identity: identity,
        foremanTitle: foremanTitle,
        workerItem: workerItem,
        delType: delType,
        contractor: contractor,
        edit: edit,
        projectArr: projectArr,
        clickNum: clickNum,
        unit: unit
      });
      return this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function anonymousFunc0(_$indexKey) {
      var _anonymousFunc0Map;

      ;

      for (var _len2 = arguments.length, e = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        e[_key2 - 1] = arguments[_key2];
      }

      return this.anonymousFunc0Map[_$indexKey] && (_anonymousFunc0Map = this.anonymousFunc0Map)[_$indexKey].apply(_anonymousFunc0Map, e);
    }
  }, {
    key: "anonymousFunc1",
    value: function anonymousFunc1(_$indexKey2) {
      var _anonymousFunc1Map;

      ;

      for (var _len3 = arguments.length, e = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        e[_key3 - 1] = arguments[_key3];
      }

      return this.anonymousFunc1Map[_$indexKey2] && (_anonymousFunc1Map = this.anonymousFunc1Map)[_$indexKey2].apply(_anonymousFunc1Map, e);
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
      e.stopPropagation();
    }
  }, {
    key: "anonymousFunc5",
    value: function anonymousFunc5(_$indexKey3) {
      var _anonymousFunc5Map;

      ;

      for (var _len4 = arguments.length, e = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        e[_key4 - 1] = arguments[_key4];
      }

      return this.anonymousFunc5Map[_$indexKey3] && (_anonymousFunc5Map = this.anonymousFunc5Map)[_$indexKey3].apply(_anonymousFunc5Map, e);
    }
  }, {
    key: "anonymousFunc6",
    value: function anonymousFunc6(_$indexKey4) {
      var _anonymousFunc6Map;

      ;

      for (var _len5 = arguments.length, e = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        e[_key5 - 1] = arguments[_key5];
      }

      return this.anonymousFunc6Map[_$indexKey4] && (_anonymousFunc6Map = this.anonymousFunc6Map)[_$indexKey4].apply(_anonymousFunc6Map, e);
    }
  }, {
    key: "anonymousFunc7",
    value: function anonymousFunc7(_$indexKey5) {
      var _anonymousFunc7Map;

      for (var _len6 = arguments.length, e = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        e[_key6 - 1] = arguments[_key6];
      }

      (typeof e === "undefined" ? "undefined" : _typeof(e)) === 'object' && e.stopPropagation && e.stopPropagation();
      return this.anonymousFunc7Map[_$indexKey5] && (_anonymousFunc7Map = this.anonymousFunc7Map)[_$indexKey5].apply(_anonymousFunc7Map, e);
    }
  }, {
    key: "anonymousFunc8",
    value: function anonymousFunc8(_$indexKey6) {
      var _anonymousFunc8Map;

      for (var _len7 = arguments.length, e = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        e[_key7 - 1] = arguments[_key7];
      }

      (typeof e === "undefined" ? "undefined" : _typeof(e)) === 'object' && e.stopPropagation && e.stopPropagation();
      return this.anonymousFunc8Map[_$indexKey6] && (_anonymousFunc8Map = this.anonymousFunc8Map)[_$indexKey6].apply(_anonymousFunc8Map, e);
    }
  }, {
    key: "anonymousFunc9",
    value: function anonymousFunc9(e) {
      ;
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
  }, {
    key: "anonymousFunc15",
    value: function anonymousFunc15(e) {
      ;
    }
  }, {
    key: "anonymousFunc16",
    value: function anonymousFunc16(e) {
      ;
    }
  }, {
    key: "anonymousFunc17",
    value: function anonymousFunc17(e) {
      ;
    }
  }, {
    key: "anonymousFunc18",
    value: function anonymousFunc18(e) {
      ;
    }
  }, {
    key: "anonymousFunc19",
    value: function anonymousFunc19(_$indexKey7) {
      var _anonymousFunc19Map;

      ;

      for (var _len8 = arguments.length, e = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        e[_key8 - 1] = arguments[_key8];
      }

      return this.anonymousFunc19Map[_$indexKey7] && (_anonymousFunc19Map = this.anonymousFunc19Map)[_$indexKey7].apply(_anonymousFunc19Map, e);
    }
  }, {
    key: "anonymousFunc20",
    value: function anonymousFunc20(e) {
      ;
    }
  }, {
    key: "anonymousFunc21",
    value: function anonymousFunc21(e) {
      ;
    }
  }, {
    key: "anonymousFunc22",
    value: function anonymousFunc22(e) {
      ;
    }
  }, {
    key: "anonymousFunc23",
    value: function anonymousFunc23(e) {
      ;
    }
  }, {
    key: "anonymousFunc24",
    value: function anonymousFunc24(e) {
      ;
    }
  }, {
    key: "anonymousFunc25",
    value: function anonymousFunc25(e) {
      ;
    }
  }, {
    key: "anonymousFunc26",
    value: function anonymousFunc26(e) {
      ;
    }
  }, {
    key: "anonymousFunc27",
    value: function anonymousFunc27(e) {
      ;
    }
  }, {
    key: "anonymousFunc28",
    value: function anonymousFunc28(e) {
      ;
    }
  }, {
    key: "anonymousFunc29",
    value: function anonymousFunc29(e) {
      ;
    }
  }, {
    key: "anonymousFunc30",
    value: function anonymousFunc30(e) {
      ;
    }
  }, {
    key: "anonymousFunc31",
    value: function anonymousFunc31(_$indexKey8) {
      var _anonymousFunc31Map;

      ;

      for (var _len9 = arguments.length, e = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
        e[_key9 - 1] = arguments[_key9];
      }

      return this.anonymousFunc31Map[_$indexKey8] && (_anonymousFunc31Map = this.anonymousFunc31Map)[_$indexKey8].apply(_anonymousFunc31Map, e);
    }
  }, {
    key: "anonymousFunc32",
    value: function anonymousFunc32(_$indexKey9) {
      var _anonymousFunc32Map;

      for (var _len10 = arguments.length, e = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
        e[_key10 - 1] = arguments[_key10];
      }

      (typeof e === "undefined" ? "undefined" : _typeof(e)) === 'object' && e.stopPropagation && e.stopPropagation();
      return this.anonymousFunc32Map[_$indexKey9] && (_anonymousFunc32Map = this.anonymousFunc32Map)[_$indexKey9].apply(_anonymousFunc32Map, e);
    }
  }, {
    key: "anonymousFunc33",
    value: function anonymousFunc33(_$indexKey10) {
      var _anonymousFunc33Map;

      for (var _len11 = arguments.length, e = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
        e[_key11 - 1] = arguments[_key11];
      }

      (typeof e === "undefined" ? "undefined" : _typeof(e)) === 'object' && e.stopPropagation && e.stopPropagation();
      return this.anonymousFunc33Map[_$indexKey10] && (_anonymousFunc33Map = this.anonymousFunc33Map)[_$indexKey10].apply(_anonymousFunc33Map, e);
    }
  }, {
    key: "anonymousFunc34",
    value: function anonymousFunc34(_$indexKey11) {
      var _anonymousFunc34Map;

      for (var _len12 = arguments.length, e = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
        e[_key12 - 1] = arguments[_key12];
      }

      (typeof e === "undefined" ? "undefined" : _typeof(e)) === 'object' && e.stopPropagation && e.stopPropagation();
      return this.anonymousFunc34Map[_$indexKey11] && (_anonymousFunc34Map = this.anonymousFunc34Map)[_$indexKey11].apply(_anonymousFunc34Map, e);
    }
  }, {
    key: "anonymousFunc35",
    value: function anonymousFunc35(e) {
      ;
    }
  }]);

  return Foreman;
}(_taroWeapp2.default.Component), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "anonymousFunc6", "anonymousFunc7", "anonymousFunc8", "anonymousFunc9", "anonymousFunc10", "anonymousFunc11", "anonymousFunc12", "anonymousFunc13", "anonymousFunc14", "anonymousFunc15", "anonymousFunc16", "anonymousFunc17", "anonymousFunc18", "anonymousFunc19", "anonymousFunc20", "anonymousFunc21", "anonymousFunc22", "anonymousFunc23", "anonymousFunc24", "anonymousFunc28", "anonymousFunc29", "anonymousFunc30", "anonymousFunc31", "anonymousFunc32", "anonymousFunc33", "anonymousFunc34", "anonymousFunc35"], _class.$$componentPath = "pages/recorder/foreman/index", _temp2);
exports.default = Foreman;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Foreman));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/recorder/foreman/index.tsx?taro&type=template&parse=COMPONENT&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/recorder/foreman/index.tsx?taro&type=template&parse=COMPONENT& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/recorder/foreman/index.wxml";

/***/ }),

/***/ "./src/pages/recorder/foreman/index.scss":
/*!***********************************************!*\
  !*** ./src/pages/recorder/foreman/index.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/recorder/foreman/index.tsx":
/*!**********************************************!*\
  !*** ./src/pages/recorder/foreman/index.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=COMPONENT& */ "./src/pages/recorder/foreman/index.tsx?taro&type=template&parse=COMPONENT&");
/* harmony import */ var _index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=COMPONENT& */ "./src/pages/recorder/foreman/index.tsx?taro&type=script&parse=COMPONENT&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/recorder/foreman/index.tsx?taro&type=script&parse=COMPONENT&":
/*!********************************************************************************!*\
  !*** ./src/pages/recorder/foreman/index.tsx?taro&type=script&parse=COMPONENT& ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=script&parse=COMPONENT& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/recorder/foreman/index.tsx?taro&type=script&parse=COMPONENT&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/recorder/foreman/index.tsx?taro&type=template&parse=COMPONENT&":
/*!**********************************************************************************!*\
  !*** ./src/pages/recorder/foreman/index.tsx?taro&type=template&parse=COMPONENT& ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!../../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=template&parse=COMPONENT& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/recorder/foreman/index.tsx?taro&type=template&parse=COMPONENT&");
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./src/pages/recorder/foreman/index.tsx","runtime","taro","vendors","common"]]]);