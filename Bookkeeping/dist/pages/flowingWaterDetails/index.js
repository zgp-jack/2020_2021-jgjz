(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/flowingWaterDetails/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/flowingWaterDetails/index.tsx?taro&type=script&parse=PAGE&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/flowingWaterDetails/index.tsx?taro&type=script&parse=PAGE& ***!
  \***************************************************************************************************************************************************************/
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

var _index = __webpack_require__(/*! ../flowingWater/index */ "./src/pages/flowingWater/index.tsx");

var _index2 = __webpack_require__(/*! ../../utils/request/index */ "./src/utils/request/index.ts");

var _index3 = __webpack_require__(/*! ../../utils/msg/index */ "./src/utils/msg/index.ts");

var _index4 = _interopRequireDefault(_index3);

__webpack_require__(/*! ./index.scss */ "./src/pages/flowingWaterDetails/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlowingWaterDetails = (_temp2 = _class = function (_Taro$Component) {
  _inherits(FlowingWaterDetails, _Taro$Component);

  function FlowingWaterDetails() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FlowingWaterDetails);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FlowingWaterDetails.__proto__ || Object.getPrototypeOf(FlowingWaterDetails)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '包工'
    }, _this.$usedState = ["anonymousState__temp", "obj", "$compid__44", "time", "week"], _this.customComponents = ["AtList"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FlowingWaterDetails, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(FlowingWaterDetails.prototype.__proto__ || Object.getPrototypeOf(FlowingWaterDetails.prototype), "_constructor", this).call(this, props);

      this.$$refs = new _taroWeapp2.default.RefsArray();
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__44"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__44 = _genCompid2[0],
          $compid__44 = _genCompid2[1];

      var router = (0, _taroWeapp.useRouter)();
      var _router$params = router.params,
          time = _router$params.time,
          id = _router$params.id,
          week = _router$params.week;
      // 父级的值

      var _useContext = (0, _taroWeapp.useContext)(_index.context),
          dataArr = _useContext.dataArr;

      var _useState = (0, _taroWeapp.useState)(),
          _useState2 = _slicedToArray(_useState, 2),
          obj = _useState2[0],
          setObj = _useState2[1];
      // 获取存入的公用内容


      (0, _taroWeapp.useEffect)(function () {
        var data = void 0;
        if (dataArr.item) {
          dataArr.item.map(function (v) {
            if (v.time === time) {
              v.arr.map(function (val) {
                if (val.id === id) {
                  data = val;
                }
              });
            }
          });
        }
        console.log(data, 'datadata');
        var title = void 0;
        if (data.business_type === '1') {
          title = '点工';
        } else if (data.business_type === '2') {
          if (data.type === '1') {
            title = '包工按天';
          } else if (data.type === '2') {
            title = '包工按量';
          }
        } else if (data.business_type === '4') {
          title = '借支';
        }
        _taroWeapp2.default.setNavigationBarTitle({
          title: title
        });
        var typeDes = void 0;
        if (data.type === '3') {
          typeDes = '工资';
        } else if (data.type === '4') {
          typeDes = '生活费';
        } else if (data.type === '5') {
          typeDes = '补贴';
        } else if (data.type === '6') {
          typeDes = '奖励';
        } else if (data.type === '7') {
          typeDes = '其他';
        }
        data.typeDes = typeDes;
        console.log(data);
        setObj(data);
        // if (useSelectorItem.flowingWater.data){
        //   let obj;
        //   useSelectorItem.notepad.data.map(v => {
        //     if (v.id === id) {
        //       obj = v;
        //     }
        //   });
        //   setData(obj)
        // }
      });
      // 0 点工 1 包工按天 2 包工按量 3借支
      // 删除
      var handleDel = function handleDel() {
        var params = {
          ids: [obj.id]
        };
        _taroWeapp2.default.showModal({
          title: "提示",
          content: '确认删除',
          showCancel: true,
          success: function success() {
            (0, _index2.bkDeleteBusinessAction)(params).then(function (res) {
              if (res.code === 200) {
                _taroWeapp2.default.navigateBack();
              } else {
                (0, _index4.default)(res.msg);
              }
            });
          }
        });
      };
      console.log(obj, 'obj');
      var anonymousState__temp = obj.business_type == '1' ? (obj.worker_overtime / obj.overtime).toFixed(2) || 0 : null;
      this.anonymousFunc0 = handleDel;
      _taroWeapp.propsManager.set({
        "className": "list"
      }, $compid__44, $prevCompid__44);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        obj: obj,
        $compid__44: $compid__44,
        time: time,
        week: week
      });
      return this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function anonymousFunc0(e) {
      ;
    }
  }]);

  return FlowingWaterDetails;
}(_taroWeapp2.default.Component), _class.$$events = ["anonymousFunc0"], _class.$$componentPath = "pages/flowingWaterDetails/index", _temp2);


FlowingWaterDetails.config = { navigationBarTitleText: '包工' };
exports.default = FlowingWaterDetails;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(FlowingWaterDetails, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/flowingWaterDetails/index.tsx?taro&type=template&parse=PAGE&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/flowingWaterDetails/index.tsx?taro&type=template&parse=PAGE& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/flowingWaterDetails/index.wxml";

/***/ }),

/***/ "./src/pages/flowingWaterDetails/index.scss":
/*!**************************************************!*\
  !*** ./src/pages/flowingWaterDetails/index.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/flowingWaterDetails/index.tsx":
/*!*************************************************!*\
  !*** ./src/pages/flowingWaterDetails/index.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=PAGE& */ "./src/pages/flowingWaterDetails/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=PAGE& */ "./src/pages/flowingWaterDetails/index.tsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/flowingWaterDetails/index.tsx?taro&type=script&parse=PAGE&":
/*!******************************************************************************!*\
  !*** ./src/pages/flowingWaterDetails/index.tsx?taro&type=script&parse=PAGE& ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/flowingWaterDetails/index.tsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/flowingWaterDetails/index.tsx?taro&type=template&parse=PAGE&":
/*!********************************************************************************!*\
  !*** ./src/pages/flowingWaterDetails/index.tsx?taro&type=template&parse=PAGE& ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/flowingWaterDetails/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./src/pages/flowingWaterDetails/index.tsx","runtime","taro","vendors","common"]]]);