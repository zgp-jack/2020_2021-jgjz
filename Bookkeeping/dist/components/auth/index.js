(wx.webpackJsonp=wx.webpackJsonp||[]).push([[7],{"136":function(e,t,n){e.exports=n.p+"components/auth/index.wxml"},"242":function(e,t,n){"use strict";n.r(t);n(243);var o=n(83);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a)},"243":function(e,t,n){"use strict";n(136)},"244":function(e,t,n){},"36":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{"value":!0});var o,a,_slicedToArray=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function sliceIterator(e,t){var n=[],o=!0,a=!1,r=void 0;try{for(var s,i=e[Symbol.iterator]();!(o=(s=i.next()).done)&&(n.push(s.value),!t||n.length!==t);o=!0);}catch(e){a=!0,r=e}finally{try{!o&&i.return&&i.return()}finally{if(a)throw r}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},r=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),s=n(0),i=_interopRequireDefault(s),u=n(2),c=_interopRequireDefault(n(3)),d=n(4),l=n(6);function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}n(244);var f=(a=o=function(e){function Auth(){var e,t,n;_classCallCheck(this,Auth);for(var o=arguments.length,a=Array(o),r=0;r<o;r++)a[r]=arguments[r];return t=n=_possibleConstructorReturn(this,(e=Auth.__proto__||Object.getPrototypeOf(Auth)).call.apply(e,[this].concat(a))),n.$usedState=["display","IMGCDNURL","warrant","handleClose","callback"],n.customComponents=[],_possibleConstructorReturn(n,t)}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Auth,e),r(Auth,[{"key":"_constructor","value":function _constructor(e){(function get(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var a=Object.getPrototypeOf(e);return null===a?void 0:get(a,t,n)}if("value"in o)return o.value;var r=o.get;return void 0!==r?r.call(n):void 0})(Auth.prototype.__proto__||Object.getPrototypeOf(Auth.prototype),"_constructor",this).call(this,e),this.$$refs=new i.default.RefsArray}},{"key":"_createData","value":function _createData(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var e=this.__props,t=e.display,n=e.handleClose,o=e.callback,a=(0,s.useState)(),r=_slicedToArray(a,2),f=r[0],y=r[1],p=(0,s.useState)(!1),h=_slicedToArray(p,2),g=h[0],_=h[1],v=function userAuthAction(e){console.log(e,"e"),e.detail.userInfo?i.default.login({"success":function success(e){e.code?(console.log(e.code,"code"),(0,u.getUserSessionKeyAction)(e.code).then((function(e){var t=e.session_key;console.log(t,"sessionKeysessionKeysessionKey"),m(t)}))):(0,c.default)("授权失败")}}):(0,c.default)("您取消了授权")},m=function decodeSessionKey(e){i.default.getSetting({"success":function success(t){t.authSetting["scope.userInfo"]?k(e):i.default.getUserInfo({"success":function success(){k(e)},"fail":function fail(){i.default.openSetting()}})}})},k=function doAuthRequest(e){i.default.getUserInfo({"success":function success(t){var n=t.encryptedData,a=t.iv,r={"session_key":e,"encryptedData":n,"iv":a,"refId":0,"source":"","type":"phone"};console.log(e,"keykeykeykey"),y(r),(0,u.GetUserInfoAction)(r).then((function(e){if(console.log(e,"全部返回内容1"),40003===e.code)_(!0);else if(200===e.code){var t={"userId":e.data.id,"token":e.data.sign.token,"tokenTime":e.data.sign.time,"uuid":e.data.uuid,"login":!0};console.log(e,"resMid"),e.data.yupao_id=e.data.id,i.default.setStorageSync(d.UserInfo,t),i.default.setStorageSync(d.MidData,e.data);var n={"mid":e.data.id};(0,u.bkMemberAuthAction)(n).then((function(t){if(200!==t.code)i.default.showModal({"content":t.msg||""});else{console.log(e.data.worker_id,"dsadsadasd");var n=i.default.getStorageSync(d.MidData);n.worker_id=t.data.worker_id,i.default.setStorageSync(d.MidData,n),i.default.setStorageSync(d.CreationTime,t.data.created_time)}})),i.default.setStorageSync(d.UserInfo,t),_(!0),o&&o()}else i.default.showModal({"content":e.msg})}))}})},b=function userRouteJump(e){i.default.navigateTo({"url":e})},S=function getPhoneNumber(e){var t=JSON.parse(JSON.stringify(f));if(console.log(e),"getPhoneNumber:ok"==e.detail.errMsg){var n={"session_key":t.session_key,"wechat_encryptedData":e.detail.encryptedData,"wechat_iv":e.detail.iv,"encryptedData":t.encryptedData,"iv":t.iv,"refId":0,"type":"wechat","source":""};(0,u.GetUserInfoAction)(n).then((function(e){if(console.log(e,"全部返回内容1"),40003===e.code)b("/pages/login/index?session_key="+t.session_key+"&encryptedData="+t.encryptedData+"&iv="+t.iv);else if(200===e.code){var n={"userId":e.data.id,"token":e.data.sign.token,"tokenTime":e.data.sign.time,"uuid":e.data.uuid,"login":!0};e.data.yupao_id=e.data.id,i.default.setStorageSync(d.UserInfo,n),i.default.setStorageSync(d.MidData,e.data);var a={"mid":e.data.id};(0,u.bkMemberAuthAction)(a).then((function(t){200!==t.code?(0,c.default)(t.msg):(e.data.worker_id=t.data.worker_id,i.default.setStorageSync(d.MidData,e.data),i.default.setStorageSync(d.CreationTime,t.data.created_time))})),i.default.setStorageSync(d.UserInfo,n),o&&o()}else i.default.showModal({"content":e.msg})}))}else b("/pages/login/index?session_key="+t.session_key+"&encryptedData="+t.encryptedData+"&iv="+t.iv)};return this.anonymousFunc0=function(e){return v(e)},this.anonymousFunc1=S,this.anonymousFunc2=function(){return n(!1)},this.anonymousFunc3=function(){b("/pages/login/index?session_key="+f.session_key+"&encryptedData="+f.encryptedData+"&iv="+f.iv)},Object.assign(this.__state,{"display":t,"IMGCDNURL":l.IMGCDNURL,"warrant":g}),this.__state}},{"key":"anonymousFunc0","value":function anonymousFunc0(e){}},{"key":"anonymousFunc1","value":function anonymousFunc1(e){}},{"key":"anonymousFunc2","value":function anonymousFunc2(e){}},{"key":"anonymousFunc3","value":function anonymousFunc3(e){}}]),Auth}(i.default.Component),o.$$events=["anonymousFunc0","anonymousFunc1","anonymousFunc2","anonymousFunc3"],o.$$componentPath="components/auth/index",a);t.default=f,Component(n(0).default.createComponent(f))},"83":function(e,t,n){"use strict";n.r(t);var o=n(36),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t.default=a.a}},[[242,0,1,2,3]]]);