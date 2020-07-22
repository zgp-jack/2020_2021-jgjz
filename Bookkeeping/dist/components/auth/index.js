(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["components/auth/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/components/auth/index.tsx?taro&type=script&parse=COMPONENT&":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/components/auth/index.tsx?taro&type=script&parse=COMPONENT& ***!
  \**********************************************************************************************************************************************************/
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

var _index2 = __webpack_require__(/*! ../../utils/msg/index */ "./src/utils/msg/index.ts");

var _index3 = _interopRequireDefault(_index2);

var _store = __webpack_require__(/*! ../../config/store */ "./src/config/store.ts");

var _index4 = __webpack_require__(/*! ../../config/index */ "./src/config/index.ts");

__webpack_require__(/*! ./index.scss */ "./src/components/auth/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Auth = (_temp2 = _class = function (_Taro$Component) {
  _inherits(Auth, _Taro$Component);

  function Auth() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Auth);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Auth.__proto__ || Object.getPrototypeOf(Auth)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["display", "IMGCDNURL", "warrant", "handleClose", "callback"], _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Auth, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Auth.prototype.__proto__ || Object.getPrototypeOf(Auth.prototype), "_constructor", this).call(this, props);

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
      var _props = this.__props,
          display = _props.display,
          handleClose = _props.handleClose,
          callback = _props.callback;

      var _useState = (0, _taroWeapp.useState)(),
          _useState2 = _slicedToArray(_useState, 2),
          data = _useState2[0],
          setData = _useState2[1];
      // 状态


      var _useState3 = (0, _taroWeapp.useState)(false),
          _useState4 = _slicedToArray(_useState3, 2),
          warrant = _useState4[0],
          setWarrant = _useState4[1];

      var userAuthAction = function userAuthAction(e) {
        console.log(e, 'e');
        if (e.detail.userInfo) {
          _taroWeapp2.default.login({
            success: function success(res) {
              if (res.code) {
                console.log(res.code, 'code');
                (0, _index.getUserSessionKeyAction)(res.code).then(function (res) {
                  var sessionKey = res.session_key;
                  console.log(sessionKey, 'sessionKeysessionKeysessionKey');
                  decodeSessionKey(sessionKey);
                  // callback && callback()
                });
              } else {
                (0, _index3.default)("\u6388\u6743\u5931\u8D25");
              }
            }
          });
        } else {
          (0, _index3.default)('您取消了授权');
        }
      };
      // 解密sessionkey
      var decodeSessionKey = function decodeSessionKey(key) {
        _taroWeapp2.default.getSetting({
          success: function success(res) {
            if (!res.authSetting['scope.userInfo']) {
              _taroWeapp2.default.getUserInfo({
                success: function success() {
                  doAuthRequest(key);
                },
                fail: function fail() {
                  _taroWeapp2.default.openSetting();
                }
              });
            } else {
              doAuthRequest(key);
            }
          }
        });
      };
      // 发起授权请求
      var doAuthRequest = function doAuthRequest(key) {
        _taroWeapp2.default.getUserInfo({
          success: function success(res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            var data = {
              session_key: key,
              encryptedData: encryptedData,
              iv: iv,
              refId: 0,
              source: '',
              type: 'phone'
            };
            console.log(key, 'keykeykeykey');
            setData(data);
            (0, _index.GetUserInfoAction)(data).then(function (res) {
              console.log(res, '全部返回内容1');
              if (res.code === 40003) {
                // Taro.showModal({
                //   title: '微信账号还没有绑定手机号',
                //   content: '微信账号绑定手机号后，才可使用手机号后快速填写工能',
                //   showCancel: true,
                //   success:(res)=>{
                //     if(res.confirm){
                // 没有绑定手机好就选择微信登陆还是手机登陆
                setWarrant(true);
                // userRouteJump(`/pages/login/index?session_key=${key}&encryptedData=${encryptedData}&iv=${iv}`)
                //     }
                //   }
                // })
                // setWarrant(true)
              } else if (res.code === 200) {
                var user = {
                  userId: res.data.id,
                  token: res.data.sign.token,
                  tokenTime: res.data.sign.time,
                  uuid: res.data.uuid,
                  login: true
                };
                console.log(res, 'resMid');
                // let midDatas = Taro.getStorageSync(MidData);
                // const midData = JSON.parse(JSON.stringify(midDatas))
                // console.log(midData,'midDatamidDatamidDatamidData')
                // midData.yupao_id = res.data.id;
                res.data.yupao_id = res.data.id;
                _taroWeapp2.default.setStorageSync(_store.UserInfo, user);
                _taroWeapp2.default.setStorageSync(_store.MidData, res.data);
                var midParams = {
                  mid: res.data.id
                };
                // let worker_id;
                (0, _index.bkMemberAuthAction)(midParams).then(function (resItem) {
                  if (resItem.code !== 200) {
                    // Msg(resItem.msg)
                    _taroWeapp2.default.showModal({
                      content: resItem.msg || ''
                    });
                  } else {
                    // worker_id = resItem.data.worker_id;
                    // res.data.worker_id = resItem.data.worker_id;
                    var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
                    midData.worker_id = res.data.worker_id;
                    _taroWeapp2.default.setStorageSync(_store.MidData, midData);
                    // Taro.setStorageSync(MidData, res.data)
                    _taroWeapp2.default.setStorageSync(_store.CreationTime, resItem.data.created_time);
                  }
                });
                _taroWeapp2.default.setStorageSync(_store.UserInfo, user);
                setWarrant(true);
                // dispatch(setUserInfo(user))
                callback && callback();
                // if (page) pageBack()
              } else {
                // let msg;
                // if (res.msg) {
                //   msg = res.msg;
                //   console.log(res.msg, 'res.msg')
                // } else if (res.errmsg) {
                //   msg = res.errmsg
                //   console.log(res.errmsg, 'res.errmsg')
                // }
                // let msg;
                // if (res.msg) {
                //   msg = res.msg;
                // } else if (res.errmsg) {
                //   msg = res.errmsg
                // }
                // console.log(msg,'msg')
                // Taro.showModal({
                //   content: msg
                // })
                _taroWeapp2.default.showModal({
                  content: res.msg
                });
                // Msg(res.msg||res.errmsg)
              }
            });
          }
        });
      };
      // 返回上一页
      var pageBack = function pageBack() {
        _taroWeapp2.default.navigateBack();
      };
      // 跳转
      var userRouteJump = function userRouteJump(url) {
        _taroWeapp2.default.navigateTo({
          url: url
        });
      };
      // 微信登陆
      var handleLogin = function handleLogin() {
        // 需要判断有没有手机号
        userRouteJump("/pages/login/index");
      };
      var getPhoneNumber = function getPhoneNumber(e) {
        var item = JSON.parse(JSON.stringify(data));
        console.log(e);
        if (e.detail.errMsg == "getPhoneNumber:ok") {
          // Taro.navigateBack();
          var params = {
            session_key: item.session_key,
            wechat_encryptedData: e.detail.encryptedData,
            wechat_iv: e.detail.iv,
            encryptedData: item.encryptedData,
            iv: item.iv,
            refId: 0,
            type: 'wechat',
            source: ''
          };
          (0, _index.GetUserInfoAction)(params).then(function (res) {
            console.log(res, '全部返回内容1');
            if (res.code === 40003) {
              // Taro.showModal({
              //   title: '微信账号还没有绑定手机号',
              //   content: '微信账号绑定手机号后，才可使用手机号后快速填写工能',
              //   showCancel: true,
              //   success: (res) => {
              //     if (res.confirm) {
              userRouteJump("/pages/login/index?session_key=" + item.session_key + "&encryptedData=" + item.encryptedData + "&iv=" + item.iv);
              //     }
              //   }
              // })
            } else if (res.code === 200) {
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
              (0, _index.bkMemberAuthAction)(midParams).then(function (resItem) {
                if (resItem.code !== 200) {
                  (0, _index3.default)(resItem.msg);
                } else {
                  // worker_id = resItem.data.worker_id;
                  res.data.worker_id = resItem.data.worker_id;
                  _taroWeapp2.default.setStorageSync(_store.MidData, res.data);
                  _taroWeapp2.default.setStorageSync(_store.CreationTime, resItem.data.created_time);
                }
              });
              _taroWeapp2.default.setStorageSync(_store.UserInfo, user);
              // Taro.navigateBack();
              callback && callback();
            } else {
              // let msg;
              // if (res.msg){
              //   msg = res.msg;
              //   // console.log(res.msg, 'res.msg1')
              // } else if (res.errmsg){
              //   msg = res.errmsg
              //   // console.log(res.errmsg,'res.errmsg1')
              // }
              // console.log(msg, 'msg')
              _taroWeapp2.default.showModal({
                content: res.msg
              });
              // Msg(res.msg || res.errmsg)
            }
          });
        } else {
          userRouteJump("/pages/login/index?session_key=" + item.session_key + "&encryptedData=" + item.encryptedData + "&iv=" + item.iv);
        }
      };

      this.anonymousFunc0 = function (e) {
        return userAuthAction(e);
      };

      this.anonymousFunc1 = getPhoneNumber;

      this.anonymousFunc2 = function () {
        return handleClose(false);
      };

      this.anonymousFunc3 = function () {
        userRouteJump("/pages/login/index?session_key=" + data.session_key + "&encryptedData=" + data.encryptedData + "&iv=" + data.iv);
      };

      Object.assign(this.__state, {
        display: display,
        IMGCDNURL: _index4.IMGCDNURL,
        warrant: warrant
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

  return Auth;
}(_taroWeapp2.default.Component), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3"], _class.$$componentPath = "components/auth/index", _temp2);
exports.default = Auth;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Auth));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/components/auth/index.tsx?taro&type=template&parse=COMPONENT&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/components/auth/index.tsx?taro&type=template&parse=COMPONENT& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "components/auth/index.wxml";

/***/ }),

/***/ "./src/components/auth/index.scss":
/*!****************************************!*\
  !*** ./src/components/auth/index.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/auth/index.tsx":
/*!***************************************!*\
  !*** ./src/components/auth/index.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=COMPONENT& */ "./src/components/auth/index.tsx?taro&type=template&parse=COMPONENT&");
/* harmony import */ var _index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=COMPONENT& */ "./src/components/auth/index.tsx?taro&type=script&parse=COMPONENT&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/components/auth/index.tsx?taro&type=script&parse=COMPONENT&":
/*!*************************************************************************!*\
  !*** ./src/components/auth/index.tsx?taro&type=script&parse=COMPONENT& ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=script&parse=COMPONENT& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/components/auth/index.tsx?taro&type=script&parse=COMPONENT&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/auth/index.tsx?taro&type=template&parse=COMPONENT&":
/*!***************************************************************************!*\
  !*** ./src/components/auth/index.tsx?taro&type=template&parse=COMPONENT& ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=template&parse=COMPONENT& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/components/auth/index.tsx?taro&type=template&parse=COMPONENT&");
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./src/components/auth/index.tsx","runtime","taro","vendors","common"]]]);