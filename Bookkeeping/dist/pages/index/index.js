(wx.webpackJsonp=wx.webpackJsonp||[]).push([[41],{"117":function(e,n,t){e.exports=t.p+"pages/index/index.wxml"},"17":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{"value":!0});var o,a,_slicedToArray=function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function sliceIterator(e,n){var t=[],o=!0,a=!1,u=void 0;try{for(var r,s=e[Symbol.iterator]();!(o=(r=s.next()).done)&&(t.push(r.value),!n||t.length!==n);o=!0);}catch(e){a=!0,u=e}finally{try{!o&&s.return&&s.return()}finally{if(a)throw u}}return t}(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")},u=function(){function defineProperties(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,n,t){return n&&defineProperties(e.prototype,n),t&&defineProperties(e,t),e}}(),r=t(0),s=_interopRequireDefault(r),i=t(2),c=t(8),l=t(4),d=t(188),f=t(6),y=t(64),m=_interopRequireDefault(t(3)),p=t(118);function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}t(189);var g=[{"url":f.IMGCDNURL+"noviceGuidance1.png","id":1},{"url":f.IMGCDNURL+"noviceGuidance2.png","id":2},{"url":f.IMGCDNURL+"noviceGuidance3.png","id":3},{"url":f.IMGCDNURL+"noviceGuidance4.png","id":4},{"url":f.IMGCDNURL+"noviceGuidance5.png","id":5}],h=(a=o=function(e){function Index(){var e,n,t;_classCallCheck(this,Index);for(var o=arguments.length,a=Array(o),u=0;u<o;u++)a[u]=arguments[u];return n=t=_possibleConstructorReturn(this,(e=Index.__proto__||Object.getPrototypeOf(Index)).call.apply(e,[this].concat(a))),t.$usedState=["anonymousState__temp5","anonymousState__temp6","loopArray54","loopArray55","$compid__57","$compid__58","$compid__59","$compid__60","$compid__61","$compid__62","image","closeImage","IMGCDNURL","start","end","vals","newMonth","type","prompt","item","show","busy","list","month","newTime","week"],t.anonymousFunc13Map={},t.anonymousFunc15Map={},t.customComponents=["AtBadge","AtModal","Auth","CreateProject","ProjectModal"],_possibleConstructorReturn(t,n)}return function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(Index,e),u(Index,[{"key":"_constructor","value":function _constructor(e){(function get(e,n,t){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var a=Object.getPrototypeOf(e);return null===a?void 0:get(a,n,t)}if("value"in o)return o.value;var u=o.get;return void 0!==u?u.call(t):void 0})(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"_constructor",this).call(this,e),this.$$refs=new s.default.RefsArray}},{"key":"_createData","value":function _createData(){var e=this;this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var n=this.$prefix,t=(0,r.genCompid)(n+"$compid__57"),o=_slicedToArray(t,2),a=o[0],u=o[1],h=(0,r.genCompid)(n+"$compid__58"),_=_slicedToArray(h,2),v=_[0],F=_[1],S=(0,r.genCompid)(n+"$compid__59"),b=_slicedToArray(S,2),k=b[0],x=b[1],I=(0,r.genCompid)(n+"$compid__60"),D=_slicedToArray(I,2),M=D[0],w=D[1],T=(0,r.genCompid)(n+"$compid__61"),C=_slicedToArray(T,2),$=C[0],P=C[1],A=(0,r.genCompid)(n+"$compid__62"),O=_slicedToArray(A,2),j=O[0],N=O[1],R=(0,c.useDispatch)(),G=(0,r.useState)({"groupName":"","teamName":""}),U=_slicedToArray(G,2),E=U[0],L=U[1],J=(0,r.useState)(!1),B=_slicedToArray(J,2),Y=B[0],z=B[1],W=(0,r.useState)(""),q=_slicedToArray(W,2),K=q[0],V=q[1],Z=(0,r.useState)(""),H=_slicedToArray(Z,2),Q=(H[0],H[1]),X=(0,r.useState)(""),ee=_slicedToArray(X,2),ne=ee[0],te=ee[1],oe=(0,r.useState)(""),ae=_slicedToArray(oe,2),ue=ae[0],re=ae[1],se=(0,r.useState)(""),ie=_slicedToArray(se,2),ce=ie[0],le=ie[1],de=(0,r.useState)(""),fe=_slicedToArray(de,2),ye=fe[0],me=fe[1],pe=(0,r.useState)(""),ge=_slicedToArray(pe,2),he=ge[0],_e=ge[1],ve=(0,r.useState)([0,0]),Fe=_slicedToArray(ve,2),Se=(Fe[0],Fe[1],(0,r.useState)([])),be=_slicedToArray(Se,2),ke=(be[0],be[1],(0,r.useState)(0)),xe=_slicedToArray(ke,2),Ie=xe[0],De=xe[1],Me=(0,r.useState)(0),we=_slicedToArray(Me,2),Te=(we[0],we[1],(0,r.useState)([{},{},{}])),Ce=_slicedToArray(Te,2),$e=(Ce[0],Ce[1],(0,r.useState)(!1)),Pe=_slicedToArray($e,2),Ae=Pe[0],Oe=Pe[1],je=(0,r.useState)(!1),Ne=_slicedToArray(je,2),Re=Ne[0],Ge=(Ne[1],(0,r.useState)(!1)),Ue=_slicedToArray(Ge,2),Ee=Ue[0],Le=Ue[1],Je=(0,r.useState)([]),Be=_slicedToArray(Je,2),Ye=Be[0],ze=Be[1],We=(0,r.useState)("0"),qe=_slicedToArray(We,2),Ke=qe[0],Ve=qe[1],Ze=(0,r.useState)(),He=_slicedToArray(Ze,2),Qe=He[0],Xe=He[1],en=(0,r.useState)(),nn=_slicedToArray(en,2),tn=nn[0],on=nn[1],an=(0,r.useState)(g[0].url),un=_slicedToArray(an,2),rn=un[0],sn=un[1],cn=(0,r.useState)(!1),ln=_slicedToArray(cn,2),dn=ln[0],fn=ln[1],yn=(0,r.useState)(!1),mn=_slicedToArray(yn,2),pn=mn[0],gn=mn[1],hn=(0,r.useState)(!1),_n=_slicedToArray(hn,2),vn=_n[0],Fn=_n[1],Sn=(0,r.useState)(!0),bn=_slicedToArray(Sn,2),kn=bn[0],xn=bn[1],In=(0,r.useState)(!1),Dn=_slicedToArray(In,2),Mn=Dn[0],wn=Dn[1],Tn=(0,r.useState)(!1),Cn=_slicedToArray(Tn,2),$n=Cn[0],Pn=Cn[1],An=(0,r.useState)(""),On=_slicedToArray(An,2),jn=On[0],Nn=On[1],Rn=(0,r.useState)(!1),Gn=_slicedToArray(Rn,2),Un=Gn[0],En=Gn[1],Ln=function getDates(){var e=(new Date).getDay(),n=new Date,t=new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六")[e],o=n.getFullYear()+"-"+Jn(n.getMonth()+1)+"-"+Jn(n.getDate()),a=n.getFullYear()+"-"+Jn(n.getMonth()+1);return Xe(o),te(a),re(Jn(n.getMonth()+1)),le(o),me(a),_e(t),a},Jn=function addZero(e){return parseInt(e)<10&&(e="0"+e),e};(0,r.onAppShow)((function(e){if(console.log(e,"2312312"),1037===e.scene&&e.referrerInfo.extraData.userId&&e.referrerInfo.extraData.token&&e.referrerInfo.extraData.tokenTime){var n={"userId":e.referrerInfo.extraData.userId,"token":e.referrerInfo.extraData.token,"tokenTime":e.referrerInfo.extraData.tokenTime};console.log(312312312,"112"),(0,i.appletJumpAction)(n).then((function(n){if(console.log(n,"跳转返回结果"),200==n.code)n.data.userId=e.referrerInfo.extraData.userId,n.data.token=e.referrerInfo.extraData.token,n.data.tokenTime=e.referrerInfo.extraData.tokenTime,n.data.sign.token=e.referrerInfo.extraData.token,n.data.sign.time=e.referrerInfo.extraData.tokenTime,s.default.setStorageSync(l.MidData,n.data),Yn("",n.data);else if(40001==n.code);else if(4e4==n.code){s.default.setStorageSync(l.UserInfo,n.data);var t={"mid":n.data.id};(0,i.bkMemberAuthAction)(t).then((function(e){if(console.log(e),200!==e.code)(0,m.default)(e.msg);else{var n=s.default.getStorageSync(l.MidData);n.worker_id=e.data.worker_id,s.default.setStorageSync(l.MidData,n)}}))}else n.code}))}})),(0,r.useDidShow)((function(){var e=s.default.getStorageSync(l.MidData),n=s.default.getStorageSync(l.CreationTime);s.default.getStorageSync(l.NeverPrompt)&&En(!0),e&&z(!1);var t=(new Date).getTime()/1e3;console.log(t,n,"xxx"),n&&n+604800>t&&Pn(!0),R((0,p.setClickTIme)([])),R((0,y.setWorker)([]));var o=s.default.getStorageSync(l.Type);o&&De(o);s.default.getStorageSync(l.UserInfo);R((0,d.setTypes)(o)),Yn()}));var Bn=function bkGetProjectTeam(){(0,i.bkGetProjectTeamAction)({}).then((function(e){0===e.data.length&&gn(!0)}))},Yn=function getData(e,n){n&&s.default.setStorageSync(l.MidData,n);var t=s.default.getStorageSync(l.MidData);if(console.log(t,"有美誉mid"),t){var o=s.default.getStorageSync(l.Type);if(!o)return void Le(!0);De(o),0===o&&Le(!0)}var a=void 0;console.log(dn,"resdsada"),e&&""==e?a=e:(console.log(1),console.log(312312312312),a=Ln()),console.log(a,"changeTimechangeTime");var u={"time":a,"identity":Ie};t&&(0,i.bkIndexAction)(u).then((function(e){if(console.log("发起首页请求"),200===e.code){on(e.data),Ve(e.data.count_is_new),0==parseInt(e.data.count_is_new)?wn(!0):wn(!1),le(e.data.earliest_month);var n=new Date,t=n.getFullYear()+"-"+Jn(n.getMonth()+1);me(t),Array.isArray(e.data.business_list.data)?e.data.business_list.data?ze(e.data.business_list.data):ze([]):e.data.business_list.data.constructor===Object&&(e.data.business_list.data.data[0].arr?ze(e.data.business_list.data.data[0].arr):ze([])),console.log(3123123),Nn(e.data.lasted_business_identity);s.default.getStorageSync(l.Type)}else(0,m.default)(e.msg)}))},zn=function handleChangeTime(e){s.default.getStorageSync(l.MidData)?(console.log(e,"xxx"),V(e.detail.value),Q(e.detail.value),fn(!0),Yn(e.detail.value),console.log(e.detail.value.substring(e.detail.value.length-2),"e.detail.value.substring(e.detail.value.length - 2)"),re(e.detail.value.substring(e.detail.value.length-2))):z(!0)},Wn=function handelTps(){var e={"identity":Ie};(0,i.bkUpdateBusinessNewAction)(e).then((function(e){200===e.code?((0,m.default)("您完成了[ "+e.data+" ]条记工信息的备份，数据安全不丢失~"),wn(!0)):(0,m.default)("放心使用，免费记工，数据永远不会丢失哟")}))},qn=function handelChange(e,n){if(s.default.getStorageSync(l.MidData)){var t=2===e?"开始为自己记工吧":"开始为工人记工吧";De(e),s.default.setStorageSync(l.Type,e),n||((0,m.default)(t),setTimeout((function(){Yn()}),1e3))}else z(!0)},Kn=function getNextPageData(){Vn("/pages/flowingWater/index")},Vn=function userRouteJump(e){s.default.navigateTo({"url":e})},Zn=function handleType(e){var n=void 0;if(n=1===Ie?2:1,1===e){console.log(Ie,"typenjdskajdkjab");var t=1===n?"开始为自己记工吧":"开始为工人记工吧";2==n&&Bn(),(0,m.default)(t),console.log(n,"neverPromptneverPrompt"),De(n),s.default.setStorageSync(l.Type,n)}else 2===e&&(s.default.setStorageSync(l.NeverPrompt,!0),En(!0));Vn("/pages/recorder/index?type="+n),Oe(!1)},Hn=function handleGoback(){s.default.navigateToMiniProgram({"appId":"wx456feacb0e86162f","path":"/pages/index/index","extraData":{"foo":"bar"},"envVersion":"trial","success":function success(e){}})},Qn=function hanleImage(e){var n=void 0;if(e!==g[g.length-1].url)for(var t=0;t<g.length;t++)e===g[t].url&&(n=g[t+1].url);else xn(!0),Yn();sn(n)},Xn=function handleClose(e){z(e)},et=function handleCallback(){xn(!1),z(!1)},nt=function handleChangeRole(e){De(e),Le(!1),s.default.setStorageSync(l.Type,e),Yn()},tt=function handleCreateProjectClose(){gn(!1)},ot=function handleInput(e,n){var t=JSON.parse(JSON.stringify(E));t[e]=n.detail.value,L(t)},at=function handleAddProject(){var e={"group_name":E.groupName,"team_name":E.teamName};(0,i.bkAddProjectTeamAction)(e).then((function(e){200===e.code?Fn(!1):(0,m.default)(e.msg)}))},ut=function handleBack(){Fn(!1),gn(!0)},rt=function handleJump(e,n){if(s.default.getStorageSync(l.MidData)){if(n){if(0!==parseInt(jn)&&Ie!=parseInt(jn)&&!Un)return console.log(Ie,"type"),console.log(jn,"lasted_business_identity"),void Oe(!0);qn(Ie,!0)}Vn(e)}else z(!0)};console.log(tn,"item"),this.anonymousFunc0=function(){Qn(rn)},this.anonymousFunc1=function(e){return zn(e)},this.anonymousFunc2=function(){qn(2)},this.anonymousFunc3=function(){qn(1)},this.anonymousFunc4=Wn,this.anonymousFunc5=function(){return rt("/pages/flowingWater/index")},this.anonymousFunc6=function(){return rt("/pages/flowingWater/index")},this.anonymousFunc7=function(){return rt("/pages/attendanceSheet/index")},this.anonymousFunc8=function(){return rt("/pages/recorder/index?type="+Ie+"&stateType=1",!0)},this.anonymousFunc9=function(){return rt("/pages/recorder/index?type="+Ie+"&stateType=1",!0)},this.anonymousFunc10=function(){return rt("/pages/recorder/index?type="+Ie)},this.anonymousFunc11=function(){return rt("/pages/notepad/index")},this.anonymousFunc12=function(){Kn()},this.anonymousFunc14=function(){return Kn()},this.anonymousFunc16=function(){return Vn("/pages/feedback/index")},this.anonymousFunc17=Hn,this.anonymousFunc18=function(){return Zn(0)},this.anonymousFunc19=function(){return Zn(1)},this.anonymousFunc20=function(){return Zn(2)},this.anonymousFunc21=function(){return nt(1)},this.anonymousFunc22=function(){return nt(2)};var st=function anonymousState__temp5(){gn(!1),Fn(!0)},it=function anonymousState__temp6(){return Fn(!1)},ct=1===Ie&&Ye.length>0&&!Re?Ye.map((function(n,t){n={"$original":(0,r.internal_get_original)(n)};var o=1===Ie&&Ye.length>0&&!Re?t+t:null,a="bbizz"+t;return e.anonymousFunc13Map[a]=Kn,{"$loopState__temp2":o,"_$indexKey":a,"$original":n.$original}})):[],lt=2===Ie&&Ye.length>0&&!Re?Ye.map((function(n,t){n={"$original":(0,r.internal_get_original)(n)};var o=2===Ie&&Ye.length>0&&!Re?t+t:null,a="bbjzz"+t;return e.anonymousFunc15Map[a]=Kn,{"$loopState__temp4":o,"_$indexKey2":a,"$original":n.$original}})):[];return tn&&!Mn&&r.propsManager.set({"value":Ke,"maxValue":99,"className":"AtBadge"},u,a),r.propsManager.set({"isOpened":Ae,"closeOnClickOverlay":!1},F,v),r.propsManager.set({"isOpened":Ee,"closeOnClickOverlay":!1},x,k),r.propsManager.set({"display":Y,"handleClose":Xn,"callback":et},w,M),r.propsManager.set({"display":pn,"handleClose":tt,"val":E&&E.groupName,"handleSubmit":st,"handleInput":ot},P,$),r.propsManager.set({"display":vn,"handleSubmit":at,"handleInput":ot,"teamName":E&&E.teamName,"handleBack":ut,"handleClose":it},N,j),Object.assign(this.__state,{"anonymousState__temp5":st,"anonymousState__temp6":it,"loopArray54":ct,"loopArray55":lt,"$compid__57":u,"$compid__58":F,"$compid__59":x,"$compid__60":w,"$compid__61":P,"$compid__62":N,"image":rn,"closeImage":kn,"IMGCDNURL":f.IMGCDNURL,"start":ce,"end":ye,"vals":K,"newMonth":ne,"type":Ie,"prompt":$n,"item":tn,"show":Mn,"busy":Re,"list":Ye,"month":ue,"newTime":Qe,"week":he}),this.__state}},{"key":"anonymousFunc0","value":function anonymousFunc0(e){}},{"key":"anonymousFunc1","value":function anonymousFunc1(e){}},{"key":"anonymousFunc2","value":function anonymousFunc2(e){}},{"key":"anonymousFunc3","value":function anonymousFunc3(e){}},{"key":"anonymousFunc4","value":function anonymousFunc4(e){}},{"key":"anonymousFunc5","value":function anonymousFunc5(e){}},{"key":"anonymousFunc6","value":function anonymousFunc6(e){}},{"key":"anonymousFunc7","value":function anonymousFunc7(e){}},{"key":"anonymousFunc8","value":function anonymousFunc8(e){}},{"key":"anonymousFunc9","value":function anonymousFunc9(e){}},{"key":"anonymousFunc10","value":function anonymousFunc10(e){}},{"key":"anonymousFunc11","value":function anonymousFunc11(e){}},{"key":"anonymousFunc12","value":function anonymousFunc12(e){}},{"key":"anonymousFunc13","value":function anonymousFunc13(e){for(var n,t=arguments.length,o=Array(t>1?t-1:0),a=1;a<t;a++)o[a-1]=arguments[a];return this.anonymousFunc13Map[e]&&(n=this.anonymousFunc13Map)[e].apply(n,o)}},{"key":"anonymousFunc14","value":function anonymousFunc14(e){}},{"key":"anonymousFunc15","value":function anonymousFunc15(e){for(var n,t=arguments.length,o=Array(t>1?t-1:0),a=1;a<t;a++)o[a-1]=arguments[a];return this.anonymousFunc15Map[e]&&(n=this.anonymousFunc15Map)[e].apply(n,o)}},{"key":"anonymousFunc16","value":function anonymousFunc16(e){}},{"key":"anonymousFunc17","value":function anonymousFunc17(e){}},{"key":"anonymousFunc18","value":function anonymousFunc18(e){}},{"key":"anonymousFunc19","value":function anonymousFunc19(e){}},{"key":"anonymousFunc20","value":function anonymousFunc20(e){}},{"key":"anonymousFunc21","value":function anonymousFunc21(e){}},{"key":"anonymousFunc22","value":function anonymousFunc22(e){}}]),Index}(s.default.Component),o.$$events=["anonymousFunc0","anonymousFunc1","anonymousFunc2","anonymousFunc3","anonymousFunc4","anonymousFunc5","anonymousFunc6","anonymousFunc7","anonymousFunc8","anonymousFunc9","anonymousFunc10","anonymousFunc11","anonymousFunc12","anonymousFunc13","anonymousFunc14","anonymousFunc15","anonymousFunc16","anonymousFunc17","anonymousFunc18","anonymousFunc19","anonymousFunc20","anonymousFunc21","anonymousFunc22"],o.$$componentPath="pages/index/index",a);n.default=h,Component(t(0).default.createComponent(h,!0))},"185":function(e,n,t){"use strict";t.r(n);t(186);var o=t(63);for(var a in o)"default"!==a&&function(e){t.d(n,e,(function(){return o[e]}))}(a)},"186":function(e,n,t){"use strict";t(117)},"188":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{"value":!0}),n.setTypes=function setTypes(e){return{"type":o.SETTYPE,"data":e}},n.getType=function getType(){return{"type":o.GETTYPE}};var o=t(114)},"189":function(e,n,t){},"63":function(e,n,t){"use strict";t.r(n);var o=t(17),a=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n.default=a.a}},[[185,0,1,2,3]]]);