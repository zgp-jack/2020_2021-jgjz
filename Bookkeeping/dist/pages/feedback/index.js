(wx.webpackJsonp=wx.webpackJsonp||[]).push([[38],{"119":function(e,t,n){e.exports=n.p+"pages/feedback/index.wxml"},"18":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{"value":!0});var r,o,a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},_slicedToArray=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function sliceIterator(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{!r&&u.return&&u.return()}finally{if(o)throw a}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},i=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),u=n(0),c=_interopRequireDefault(u),s=_interopRequireDefault(n(13)),l=n(2),f=_interopRequireDefault(n(3)),p=n(6);function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}n(192);var d=(o=r=function(e){function Feedback(){var e,t,n;_classCallCheck(this,Feedback);for(var r=arguments.length,o=Array(r),a=0;a<r;a++)o[a]=arguments[a];return t=n=_possibleConstructorReturn(this,(e=Feedback.__proto__||Object.getPrototypeOf(Feedback)).call.apply(e,[this].concat(o))),n.config={"navigationBarTitleText":"意见反馈"},n.$usedState=["loopArray32","$compid__41","evaluate","image","PHONE"],n.anonymousFunc1Map={},n.customComponents=["ImageView"],_possibleConstructorReturn(n,t)}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Feedback,e),i(Feedback,[{"key":"_constructor","value":function _constructor(e){(function get(e,t,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:get(o,t,n)}if("value"in r)return r.value;var a=r.get;return void 0!==a?a.call(n):void 0})(Feedback.prototype.__proto__||Object.getPrototypeOf(Feedback.prototype),"_constructor",this).call(this,e),this.$$refs=new c.default.RefsArray}},{"key":"_createData","value":function _createData(){var e=this;this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var t=this.$prefix,n=(0,u.genCompid)(t+"$compid__41"),r=_slicedToArray(n,2),o=r[0],i=r[1],d=[{"id":1,"title":"差评"},{"id":2,"title":"不太好"},{"id":3,"title":"一般"},{"id":4,"title":"挺好的"},{"id":4,"title":"好评"}],y=(0,u.useState)({"item":[]}),m=_slicedToArray(y,2),v=m[0],h=m[1],b=(0,u.useState)(0),_=_slicedToArray(b,2),g=_[0],F=_[1],k=(0,u.useState)(""),O=_slicedToArray(k,2),w=O[0],A=O[1],C=function userUploadImg(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;(0,s.default)().then((function(t){var n={"url":t.url,"httpurl":t.httpurl};-1===e?h(a({},v,{"item":[].concat(_toConsumableArray(v.item),[n])})):(v.item[e]=n,h(a({},v)))}))},P=function userDelImg(e){if(v.item){var t=JSON.parse(JSON.stringify(v.item));t.splice(e,1),h({"item":t})}},$=function handlebkAddFeedbackAction(){if(0!=g)if(w){var e=v.item.map((function(e){return e.url})),t={"type":g,"note":w,"img":e};(0,l.bkAddFeedbackAction)(t).then((function(e){console.log(e),200===e.code?((0,f.default)("提交成功，记工记账将因您的意见而变得更好！"),setTimeout((function(){c.default.navigateBack({"delta":1})}),1e3)):(0,f.default)("保存失败")}))}else(0,f.default)("您还没有写下意见");else(0,f.default)("请选择评价")},j=function handleCopy(){c.default.setClipboardData({"data":p.PHONE,"success":function success(){c.default.hideToast(),(0,f.default)("微信号复制成功")}})};this.anonymousFunc0=j,this.anonymousFunc2=function(e){return A(e.detail.value)},this.anonymousFunc3=$;var x=d.map((function(t,n){t={"$original":(0,u.internal_get_original)(t)};var r="ggzzz"+n;return e.anonymousFunc1Map[r]=function(){return F(t.$original.id)},{"_$indexKey":r,"$original":t.$original}}));return u.propsManager.set({"images":v.item,"max":4,"userUploadImg":C,"userDelImg":P},i,o),Object.assign(this.__state,{"loopArray32":x,"$compid__41":i,"evaluate":d,"image":v,"PHONE":p.PHONE}),this.__state}},{"key":"anonymousFunc0","value":function anonymousFunc0(e){}},{"key":"anonymousFunc1","value":function anonymousFunc1(e){for(var t,n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return this.anonymousFunc1Map[e]&&(t=this.anonymousFunc1Map)[e].apply(t,r)}},{"key":"anonymousFunc2","value":function anonymousFunc2(e){}},{"key":"anonymousFunc3","value":function anonymousFunc3(e){}}]),Feedback}(c.default.Component),r.$$events=["anonymousFunc0","anonymousFunc1","anonymousFunc2","anonymousFunc3"],r.$$componentPath="pages/feedback/index",o);d.config={"navigationBarTitleText":"意见反馈"},t.default=d,Component(n(0).default.createComponent(d,!0))},"190":function(e,t,n){"use strict";n.r(t);n(191);var r=n(65);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o)},"191":function(e,t,n){"use strict";n(119)},"192":function(e,t,n){},"65":function(e,t,n){"use strict";n.r(t);var r=n(18),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t.default=o.a}},[[190,0,1,2,3]]]);