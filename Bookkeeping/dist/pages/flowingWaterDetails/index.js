(wx.webpackJsonp=wx.webpackJsonp||[]).push([[40],{"127":function(e,t,n){e.exports=n.p+"pages/flowingWaterDetails/index.wxml"},"218":function(e,t,n){"use strict";n.r(t);n(219);var o=n(73);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r)},"219":function(e,t,n){"use strict";n(127)},"220":function(e,t,n){},"26":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{"value":!0});var o,r,_slicedToArray=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function sliceIterator(e,t){var n=[],o=!0,r=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(o=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{!o&&u.return&&u.return()}finally{if(r)throw i}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},i=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),a=n(0),u=_interopRequireDefault(a),s=n(213),c=n(2),l=_interopRequireDefault(n(3));function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}n(220);var p=(r=o=function(e){function FlowingWaterDetails(){var e,t,n;_classCallCheck(this,FlowingWaterDetails);for(var o=arguments.length,r=Array(o),i=0;i<o;i++)r[i]=arguments[i];return t=n=_possibleConstructorReturn(this,(e=FlowingWaterDetails.__proto__||Object.getPrototypeOf(FlowingWaterDetails)).call.apply(e,[this].concat(r))),n.config={"navigationBarTitleText":"包工"},n.$usedState=["obj","loopArray34","$compid__45","time","week"],n.anonymousFunc0Map={},n.customComponents=["AtList"],_possibleConstructorReturn(n,t)}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(FlowingWaterDetails,e),i(FlowingWaterDetails,[{"key":"_constructor","value":function _constructor(e){(function get(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:get(r,t,n)}if("value"in o)return o.value;var i=o.get;return void 0!==i?i.call(n):void 0})(FlowingWaterDetails.prototype.__proto__||Object.getPrototypeOf(FlowingWaterDetails.prototype),"_constructor",this).call(this,e),this.$$refs=new u.default.RefsArray}},{"key":"_createData","value":function _createData(){var e=this;this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var t=this.$prefix,n=(0,a.genCompid)(t+"$compid__45"),o=_slicedToArray(n,2),r=o[0],i=o[1],p=(0,a.useRouter)(),f=p.params,y=f.time,d=f.id,v=f.week,m=(0,a.useContext)(s.context),_=m.dataArr,g=(0,a.useState)(),h=_slicedToArray(g,2),w=h[0],b=h[1];(0,a.useEffect)((function(){var e=void 0;_.item&&_.item.map((function(t){t.time===y&&t.arr.map((function(t){t.id===d&&(e=t)}))})),console.log(e,"datadata");var t=void 0;"1"===e.business_type?t="点工":"2"===e.business_type?"1"===e.type?t="包工按天":"2"===e.type&&(t="包工按量"):"4"===e.business_type&&(t="借支"),u.default.setNavigationBarTitle({"title":t});var n=void 0;"3"===e.type?n="工资":"4"===e.type?n="生活费":"5"===e.type?n="补贴":"6"===e.type?n="奖励":"7"===e.type&&(n="其他"),e.typeDes=n;var o=0;parseInt(e.worker_overtime)&&parseInt(e.worker_overtime)>0&&parseInt(e.overtime)&&parseInt(e.overtime)>0&&(o=parseInt(e.overtime)/parseInt(e.worker_overtime)),e.addTime=o.toFixed(2),console.log(e),b(e)}));var F=function handleDel(){var e={"ids":[w.id]};u.default.showModal({"title":"提示","content":"确认删除","showCancel":!0,"success":function success(t){1==t.confirm&&(0,c.bkDeleteBusinessAction)(e).then((function(e){200===e.code?u.default.navigateBack():(0,l.default)(e.msg)}))}})},D=function handleImage(e){u.default.previewImage({"current":e.httpurl,"urls":[e.httpurl]})};this.anonymousFunc1=F,this.anonymousFunc2=function(){u.default.navigateTo({"url":"/pages/editDetails/index?id="+w.id})};var k=w.view_images&&w.view_images.length>0?w.view_images.map((function(t,n){t={"$original":(0,a.internal_get_original)(t)};var o="gizzz"+n;return e.anonymousFunc0Map[o]=function(){return D(t.$original)},{"_$indexKey":o,"$original":t.$original}})):[];return a.propsManager.set({"className":"list"},i,r),Object.assign(this.__state,{"obj":w,"loopArray34":k,"$compid__45":i,"time":y,"week":v}),this.__state}},{"key":"anonymousFunc0","value":function anonymousFunc0(e){for(var t,n=arguments.length,o=Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return this.anonymousFunc0Map[e]&&(t=this.anonymousFunc0Map)[e].apply(t,o)}},{"key":"anonymousFunc1","value":function anonymousFunc1(e){}},{"key":"anonymousFunc2","value":function anonymousFunc2(e){}}]),FlowingWaterDetails}(u.default.Component),o.$$events=["anonymousFunc0","anonymousFunc1","anonymousFunc2"],o.$$componentPath="pages/flowingWaterDetails/index",r);p.config={"navigationBarTitleText":"包工"},t.default=p,Component(n(0).default.createComponent(p,!0))},"73":function(e,t,n){"use strict";n.r(t);var o=n(26),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t.default=r.a}},[[218,0,1,2,3]]]);