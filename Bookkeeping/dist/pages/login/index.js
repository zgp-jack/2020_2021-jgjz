(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/login/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/login/index.tsx?taro&type=script&parse=PAGE&":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/login/index.tsx?taro&type=script&parse=PAGE& ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendTypeNo = exports.SendTypeHave = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _index = __webpack_require__(/*! ../../utils/request/index */ "./src/utils/request/index.ts");

var _index2 = __webpack_require__(/*! ../../utils/v/index */ "./src/utils/v/index.ts");

var _store = __webpack_require__(/*! ../../config/store */ "./src/config/store.ts");

var _index3 = __webpack_require__(/*! ../../utils/msg/index */ "./src/utils/msg/index.ts");

var _index4 = _interopRequireDefault(_index3);

__webpack_require__(/*! ./index.scss */ "./src/pages/login/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 用户获取验证码
var SendTypeHave = exports.SendTypeHave = 'have';
var SendTypeNo = exports.SendTypeNo = 'no';

var Login = (_temp2 = _class = function (_Taro$Component) {
  _inherits(Login, _Taro$Component);

  function Login() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["$compid__44", "$compid__45", "liked", "time"], _this.customComponents = ["AtInput"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Login, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Login.prototype.__proto__ || Object.getPrototypeOf(Login.prototype), "_constructor", this).call(this, props);

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

      var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "$compid__45"),
          _genCompid4 = _slicedToArray(_genCompid3, 2),
          $prevCompid__45 = _genCompid4[0],
          $compid__45 = _genCompid4[1];

      var router = (0, _taroWeapp.useRouter)();
      var _router$params = router.params,
          session_key = _router$params.session_key,
          encryptedData = _router$params.encryptedData,
          iv = _router$params.iv;

      var _useState = (0, _taroWeapp.useState)(60),
          _useState2 = _slicedToArray(_useState, 2),
          time = _useState2[0],
          setTime = _useState2[1];

      var _useState3 = (0, _taroWeapp.useState)(true),
          _useState4 = _slicedToArray(_useState3, 2),
          liked = _useState4[0],
          setLike = _useState4[1];

      var _useState5 = (0, _taroWeapp.useState)({
        phone: '',
        code: ''
      }),
          _useState6 = _slicedToArray(_useState5, 2),
          model = _useState6[0],
          setModel = _useState6[1];

      var countDown = function countDown(settiems) {
        var times = void 0;
        if (settiems) {
          times = settiems;
        } else {
          times = JSON.parse(JSON.stringify(time));
        }
        if (times === 1) {
          setTime(60);
          setLike(true);
        } else {
          if (times === 60) {
            console.log(1);
            // 获取验证码
            getVcode();
          }
          setLike(false);
          setTime(times - 1);
          setTimeout(function () {
            countDown(times - 1);
          }, 1000);
        }
      };
      console.log(time, 'xxx');
      var handleBtn = function handleBtn() {
        if (!liked) {
          return;
        }
        countDown(60);
      };
      // 验证码请求
      var getVcode = function getVcode() {
        console.log(32131231);
        console.log(model.phone, 'model.phone');
        if (!(0, _index2.isPhone)(model.phone)) {
          (0, _index4.default)('请先输入正确的手机号码');
          return;
        }
        var params = {
          tel: model.phone,
          sendType: SendTypeNo
        };
        // 验证码
        (0, _index.bkGetCodeAction)(params).then(function (res) {
          (0, _index4.default)(res.errmsg, 2500);
        });
      };
      // 获取验证码
      var handleInput = function handleInput(type, e) {
        console.log(e);
        var data = JSON.parse(JSON.stringify(model));
        data[type] = e;
        setModel(data);
      };
      var handleLogin = function handleLogin() {
        if (!(0, _index2.isPhone)(model.phone)) {
          (0, _index4.default)('请先输入正确的手机号码');
          return;
        }
        if (!model.code) {
          (0, _index4.default)('请先输入手机验证码');
          return;
        }
        var params = {
          session_key: session_key,
          encryptedData: encryptedData,
          iv: iv,
          refId: 0,
          source: '',
          tel: model.phone,
          code: model.code,
          type: 'phone'
        };
        (0, _index.GetUserInfoAction)(params).then(function (res) {
          if (res.errcode === 'ok') {
            var user = {
              userId: res.data.id,
              token: res.data.sign.token,
              tokenTime: res.data.sign.time,
              uuid: res.data.uuid,
              login: true
            };
            res.data.yupao_id = res.data.id;
            _taroWeapp2.default.setStorageSync(_store.UserInfo, user);
            _taroWeapp2.default.setStorageSync(_store.MidData, res.data);
            var midParams = {
              mid: res.data.id
            };
            (0, _index.bkMemberAuthAction)(midParams).then(function (res) {
              console.log(321321);
              if (res.code !== 200) {
                (0, _index4.default)(res.msg);
              } else {
                var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
                midData.worker_id = res.data.worker_id;
                _taroWeapp2.default.setStorageSync(_store.MidData, midData);
                _taroWeapp2.default.navigateBack();
              }
            });
          } else {
            (0, _index4.default)(res.msg);
          }
        });
      };

      this.anonymousFunc0 = function (e) {
        return handleInput('phone', e);
      };

      this.anonymousFunc1 = function (e) {
        return handleInput('code', e);
      };

      this.anonymousFunc2 = handleBtn;
      this.anonymousFunc3 = handleLogin;
      _taroWeapp.propsManager.set({
        "name": "number",
        "clear": true,
        "type": "text",
        "maxLength": 11,
        "placeholder": "\u8F93\u5165\u624B\u673A\u53F7",
        "value": model.phone,
        "onChange": this.anonymousFunc0
      }, $compid__44, $prevCompid__44);
      _taroWeapp.propsManager.set({
        "className": "codeInput",
        "name": "number",
        "clear": true,
        "border": false,
        "type": "text",
        "placeholder": "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
        "value": model.code,
        "onChange": this.anonymousFunc1
      }, $compid__45, $prevCompid__45);
      Object.assign(this.__state, {
        $compid__44: $compid__44,
        $compid__45: $compid__45,
        liked: liked,
        time: time
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
  }]);

  return Login;
}(_taroWeapp2.default.Component), _class.$$events = ["anonymousFunc2", "anonymousFunc3"], _class.$$componentPath = "pages/login/index", _temp2);
exports.default = Login;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Login, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/login/index.tsx?taro&type=template&parse=PAGE&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/login/index.tsx?taro&type=template&parse=PAGE& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/login/index.wxml";

/***/ }),

/***/ "./src/pages/login/index.scss":
/*!************************************!*\
  !*** ./src/pages/login/index.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/login/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/login/index.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=PAGE& */ "./src/pages/login/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=PAGE& */ "./src/pages/login/index.tsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/login/index.tsx?taro&type=script&parse=PAGE&":
/*!****************************************************************!*\
  !*** ./src/pages/login/index.tsx?taro&type=script&parse=PAGE& ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/login/index.tsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/login/index.tsx?taro&type=template&parse=PAGE&":
/*!******************************************************************!*\
  !*** ./src/pages/login/index.tsx?taro&type=template&parse=PAGE& ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/login/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/utils/v/index.ts":
/*!******************************!*\
  !*** ./src/utils/v/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPhone = isPhone;
exports.isNumber = isNumber;
exports.isVaildNumber = isVaildNumber;
exports.randIntNumber = randIntNumber;
exports.getRandNumber = getRandNumber;
exports.isUrl = isUrl;
exports.isRequire = isRequire;
exports.isVaildVal = isVaildVal;
exports.isIdcard = isIdcard;
exports.isType = isType;
exports.isIos = isIos;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 是否是电话号码
function isPhone(tel) {
  var reg = /^1[0-9]{10}$/;
  return reg.test(tel);
}
// 是否是数字
function isNumber(num) {
  var reg = /^[0-9]+$/;
  return reg.test(num);
}
function isVaildNumber(_ref) {
  var num = _ref.num,
      _ref$min = _ref.min,
      min = _ref$min === undefined ? 0 : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === undefined ? 10 : _ref$max;

  if (!isNumber(num)) return false;
  return num >= min && num <= max;
}
// 生成区间整数
function randIntNumber() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;

  return Math.floor(Math.random() * (max - min)) + min;
}
// 生成随机数
function getRandNumber() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;

  return min + Math.random() * (max - min);
}
// 检测是否是网址
function isUrl(url) {
  var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
  return reg.test(url);
}
// 检测必填
function isRequire(val) {
  var str = val.replace(/\s+/g, '');
  return str != '' && str != null && str != undefined && str != 'null' && str != undefined;
}
// 内容必须有汉字 且不少于 min 字
function isVaildVal(val) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var reg = new RegExp('[\\u4E00-\\u9FFF]+');
  return max ? reg.test(val) && val.length >= min && val.length <= max : reg.test(val) && val.length >= min;
}
// 检测是否是身份证
function isIdcard(val) {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(val);
}
// 检测数据类型
function isType(data, type) {
  var reg = Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  if (!type) return reg;
  if (reg == type) return true;
  return false;
}
// 检测是否是ios客户端
function isIos() {
  var system = _taroWeapp2.default.getSystemInfoSync();
  return system.platform === 'ios';
}

/***/ })

},[["./src/pages/login/index.tsx","runtime","taro","vendors","common"]]]);