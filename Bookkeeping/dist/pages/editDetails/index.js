(wx.webpackJsonp=wx.webpackJsonp||[]).push([[37],{"133":function(e,n,t){e.exports=t.p+"pages/editDetails/index.wxml"},"226":function(e,n,t){"use strict";t.r(n);t(227);var o=t(75);for(var a in o)"default"!==a&&function(e){t.d(n,e,(function(){return o[e]}))}(a)},"227":function(e,n,t){"use strict";t(133)},"228":function(e,n,t){},"28":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{"value":!0});var o,a,i=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},_slicedToArray=function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function sliceIterator(e,n){var t=[],o=!0,a=!1,i=void 0;try{for(var r,u=e[Symbol.iterator]();!(o=(r=u.next()).done)&&(t.push(r.value),!n||t.length!==n);o=!0);}catch(e){a=!0,i=e}finally{try{!o&&u.return&&u.return()}finally{if(a)throw i}}return t}(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")},r=function(){function defineProperties(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,n,t){return n&&defineProperties(e.prototype,n),t&&defineProperties(e,t),e}}(),u=t(0),s=_interopRequireDefault(u),c=_interopRequireDefault(t(13)),l=t(2),m=_interopRequireDefault(t(3));function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _toConsumableArray(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}t(228);var d=(a=o=function(e){function EditDetails(){var e,n,t;_classCallCheck(this,EditDetails);for(var o=arguments.length,a=Array(o),i=0;i<o;i++)a[i]=arguments[i];return n=t=_possibleConstructorReturn(this,(e=EditDetails.__proto__||Object.getPrototypeOf(EditDetails)).call.apply(e,[this].concat(a))),t.$usedState=["borrowing","loopArray56","$compid__63","$compid__64","$compid__65","$compid__66","businessType","type","typeName","val","identity","unit"],t.anonymousFunc9Map={},t.customComponents=["ImageView","WageStandard","WorkOvertime","WorkingHours"],_possibleConstructorReturn(t,n)}return function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(EditDetails,e),r(EditDetails,[{"key":"_constructor","value":function _constructor(e){(function get(e,n,t){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var a=Object.getPrototypeOf(e);return null===a?void 0:get(a,n,t)}if("value"in o)return o.value;var i=o.get;return void 0!==i?i.call(t):void 0})(EditDetails.prototype.__proto__||Object.getPrototypeOf(EditDetails.prototype),"_constructor",this).call(this,e),this.$$refs=new s.default.RefsArray}},{"key":"_createData","value":function _createData(){var e=this;this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var n=this.$prefix,t=(0,u.genCompid)(n+"$compid__63"),o=_slicedToArray(t,2),a=o[0],r=o[1],d=(0,u.genCompid)(n+"$compid__64"),y=_slicedToArray(d,2),f=y[0],p=y[1],v=(0,u.genCompid)(n+"$compid__65"),g=_slicedToArray(v,2),k=g[0],_=g[1],h=(0,u.genCompid)(n+"$compid__66"),w=_slicedToArray(h,2),O=w[0],S=w[1],F=(0,u.useRouter)(),N=F.params.id,b=(0,u.useState)(1),J=_slicedToArray(b,2),x=J[0],A=J[1],I=(0,u.useState)({"item":[]}),W=_slicedToArray(I,2),$=W[0],D=W[1],C=(0,u.useState)(1),P=_slicedToArray(C,2),j=P[0],E=P[1],R=(0,u.useState)(""),T=_slicedToArray(R,2),M=T[0],B=T[1],q=(0,u.useState)(1),H=_slicedToArray(q,2),z=H[0],U=(H[1],(0,u.useState)(!1)),K=_slicedToArray(U,2),V=(K[0],K[1]),Y=(0,u.useState)(!1),Z=_slicedToArray(Y,2),G=Z[0],L=Z[1],Q=(0,u.useState)("平方米"),X=_slicedToArray(Q,2),ee=X[0],ne=(X[1],(0,u.useState)(0)),te=_slicedToArray(ne,2),oe=te[0],ae=te[1],ie=(0,u.useState)({"item":[{"id":3,"name":"工资","click":!1},{"id":4,"name":"生活费","click":!1},{"id":5,"name":"补贴","click":!1},{"id":6,"name":"奖励","click":!1},{"id":7,"name":"其他","click":!1}]}),re=_slicedToArray(ie,2),ue=re[0],se=re[1],ce=(0,u.useState)([{"id":1,"name":"一个工","click":!1,"num":1},{"id":2,"name":"半个工","click":!1,"num":.5},{"id":3,"name":"休息","click":!1,"num":0},{"id":4,"name":"0.0小时","click":!1,"num":0}]),le=_slicedToArray(ce,2),me=le[0],de=le[1],ye=(0,u.useState)([{"id":1,"name":"无加班","click":!1,"num":0},{"id":2,"name":"0.0小时","click":!1,"num":0}]),fe=_slicedToArray(ye,2),pe=fe[0],ve=fe[1],ge=(0,u.useState)(!1),ke=_slicedToArray(ge,2),_e=ke[0],he=ke[1],we=(0,u.useState)({"data":[{"id":1,"name":"按小时计算","click":!1},{"id":2,"name":"按天算","click":!1}],"work":0,"money":0,"addWork":0,"type":1,"day":0,"dayAddWork":0,"state":"","group_info":"","id":""}),Oe=_slicedToArray(we,2),Se=Oe[0],Fe=Oe[1],Ne=(0,u.useState)({"note":"","name":"","workername":"","leaderName":"","time":"","workingHours":"","working":"","duration":"","wages":"","unitNum":"","unit":"","unitPrice":"","money":""}),be=_slicedToArray(Ne,2),Je=be[0],xe=be[1],Ae=(0,u.useState)({"worktime_define":"","money":"","overtime_type":"","worker_overtime":"","overtime":"","overtime_money":"","work_time":""}),Ie=_slicedToArray(Ae,2),We=Ie[0],$e=Ie[1],De=(0,u.useState)(!1),Ce=_slicedToArray(De,2),Pe=Ce[0],je=Ce[1];(0,u.useEffect)((function(){console.log(N,"xxxx"),N&&(0,l.bkBusinessOneAction)({"id":N}).then((function(e){if(200===e.code){var n=JSON.parse(JSON.stringify(Se)),t=JSON.parse(JSON.stringify(Je)),o=JSON.parse(JSON.stringify(We));E(parseInt(e.data.business_type)),A(parseInt(e.data.identity)),D({"item":e.data.view_images}),t.name=e.data.group_info_name,t.note=e.data.note,t.workername=e.data.workername,t.leaderName=e.data.leader_name;var a=e.data.work_time+"个工"+e.data.overtime+"小时";t.duration=a,t.money=e.data.money;var i=new Date,r=i.getFullYear()+"-"+Ee(i.getMonth()+1)+"-"+Ee(i.getDate());t.time=r,n.work=e.data.worktime_define,n.addWork=e.data.overtime_money,n.money=e.data.worker_money,n.day=e.data.overtime,parseInt(e.data.money)&&parseInt(e.data.overtime)?n.dayAddWork=parseInt(e.data.money)/parseInt(e.data.overtime)||0:n.dayAddWork=0,n.group_info=e.data.group_info,n.type=parseInt(e.data.overtime_type),console.log(n.type,"xxxx111");for(var u=0;u<n.data.length;u++)n.data[u].id==e.data.overtime_type&&(n.data[u].click=!0);o.worktime_define=e.data.worktime_define,o.money=e.data.worker_money,o.overtime_type=e.data.overtime_type,o.worker_overtime=e.data.worker_overtime,o.overtime=e.data.overtime,o.overtime_money=e.data.overtime_money,o.work_time=e.data.work_time,$e(o);var c=void 0;c=1===parseInt(e.data.overtime_type)?+e.data.worker_money*+e.data.work_time+ +e.data.overtime*+e.data.overtime_money:+e.data.worker_money*+e.data.work_time+ +e.data.worker_money/+e.data.worker_overtime*+e.data.overtime,t.wages=c,t.unitNum=e.data.unit_num,t.unitPrice=e.data.unit_price,t.unit=e.data.unit,xe(t),console.log(n,"3213213"),Fe(n);for(var l=JSON.parse(JSON.stringify(me)),d=0;d<l.length;d++){var y=(+e.data.worktime_define/(1/+e.data.work_time)).toFixed(1);console.log(y,"setTime");var f={"id":4,"name":y+"小时","click":!0,"num":y};d===[l.length-1][0]&&(l[d]=f)}console.log(l,"timeArrData"),de(l);for(var p=JSON.parse(JSON.stringify(pe)),v=0;v<p.length;v++)if("0.00"===e.data.overtime)p[0].click=!0;else{var g={"id":2,"name":e.data.overtime+"小时","click":!0,"num":e.data.overtime};console.log(g),console.log(e.data.overtime,"overtime"),v===[p.length-1][0]&&(p[v]=g)}if(console.log(p,"toFixed"),ve(p),"1"===e.data.business_type)s.default.setNavigationBarTitle({"title":"点工"});else if("2"===e.data.business_type)"1"===e.data.type?(B("按天记"),s.default.setNavigationBarTitle({"title":"包工按天计"})):(B("按量记"),s.default.setNavigationBarTitle({"title":"包工按量计"}));else if("3"===e.data.business_type){s.default.setNavigationBarTitle({"title":"借支"});for(var k=JSON.parse(JSON.stringify(ue.item)),_=0;_<k.length;_++)parseInt(e.data.type)==k[_].id&&(k[_].click=!0);se({"item":k})}}else(0,m.default)(e.msg)}))}),[]);var Ee=function addZero(e){return parseInt(e)<10&&(e="0"+e),e},Re=function userUploadImg(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;(0,c.default)().then((function(n){var t={"url":n.url,"httpurl":n.httpurl};-1===e?D(i({},$,{"item":[].concat(_toConsumableArray($.item),[t])})):($.item[e]=t,D(i({},$)))}))},Te=function userDelImg(e){if($.item){var n=JSON.parse(JSON.stringify($.item));n.splice(e,1),D({"item":n})}},Me=function handleRadioBorrowing(e){console.log(e);for(var n=JSON.parse(JSON.stringify(ue.item)),t=0;t<n.length;t++)(e.id=n[t].id)&&(n[t].click=!0);se(n)},Be=function handleClose(){he(!1)},qe=function handleWageStandard(e,n){if("day"==e){var t=JSON.parse(JSON.stringify(Se)),o=t.money/n;return t[e]=n,t.dayAddWork=o.toFixed(2),void Fe(t)}if("money"===e){var a=JSON.parse(JSON.stringify(Se)),i=n/a.day;return a[e]=n,a.dayAddWork=i.toFixed(2),void Fe(a)}var r=JSON.parse(JSON.stringify(Se));r[e]=n,Fe(r)},He=function handleAddWage(){var e=JSON.parse(JSON.stringify(Je)),n=JSON.parse(JSON.stringify(Se)),t=JSON.parse(JSON.stringify(me)),o=JSON.parse(JSON.stringify(pe)),a=n.money,r=n.work,u=n.addWork,s=n.day;if(0!==r)if(0!==a)if(console.log(n.type,"xxx"),2!==n.type||0!=n.day)if(1!==n.type||0!=n.addWork){var c=0;console.log(t,"timeArrstimeArrs");for(var d=0;d<t.length;d++)t[d].click&&(console.log(me[d]),1!=t[d].id&&2!=t[d].id&&3!=t[d].id?c=1/r*t[d].num:1==t[d].id?c=r:2==t[d].id?c=r/2:3==t[d].id&&(c=0));console.log(c,"tiem");for(var y=0,f=0;f<o.length;f++)o[f].click&&(y=o[f].num);var p=0;1===n.type?(console.log(c,"time"),p=a/r*(c*r)+u*y):p=a/r*(c*r)+a/s*y,console.log(p,"sum");var v;v=p.toFixed(2),console.log(v),xe(i({},e,{"wages":v})),je(!1);var g={"identity":x,"worktime_define":n.work,"overtime_type":n.type,"overtime_money":n.dayAddWork,"money":n.money,"overtime":n.day,"group_info":n.group_info};(0,l.bkSetWorkerIdentityWageAction)(g).then((function(e){200!==e.code&&(0,m.default)(e.msg)}))}else(0,m.default)("每小时加班金额必须大于0");else(0,m.default)("一个工必须大于0小时");else(0,m.default)("每个工工钱必须大于0");else(0,m.default)("上班标准必须必须大于0")},ze=function handleWageStandardRadio(e){console.log(e);var n=JSON.parse(JSON.stringify(Se));n.type=e.id;var t=n.data.map((function(n){return e.id===n.id?n.click=!0:n.click=!1,n}));n.data=t,Fe(n)};console.log(x,"identity");var Ue=function handleworkOvertime(e,n){if(ae(e),1===e){if(4===n.id){var t=me.map((function(e){return e.id===n.id?e.click=!e.click:e.click=!1,e}));return de(t),V(!1),void L(!0)}var o=me.map((function(e){return e.id===n.id?e.click=!e.click:(4===e.id&&(e.name="0.0小时"),e.click=!1),e}));de(o)}else{if(2==n.id){var a=pe.map((function(e){return e.id===n.id?e.click=!e.click:e.click=!1,e}));return ve(a),V(!1),void L(!0)}var i=pe.map((function(e){return e.id===n.id?e.click=!e.click:(2===e.id&&(e.name="0.0小时"),e.click=!1),e}));ve(i)}},Ke=function handleWorkOvertimeOk(){var e=me.filter((function(e){return e.click})),n=pe.filter((function(e){return e.click})),t=JSON.parse(JSON.stringify(Se));console.log(t);var o=void 0;(e||n)&&(e.length>0&&(o="休息"==e[0].name?e[0].name:"上班"+e[0].name),n.length>0&&(o="无加班"!==n[0].name?"加班"+n[0].name:n[0].name),e.length>0&&n.length>0&&("休息"==e[0].name&&"无加班"==n[0].name?o=e[0].name+n[0].name:("休息"==e[0].name&&(o="加班"+n[0].name),"无加班"==n[0].name&&(o="上班"+e[0].name+n[0].name),o="上班"+e[0].name+"加班"+n[0].name)));var a=JSON.parse(JSON.stringify(We)),r=void 0;r="1"==t.type?parseInt(a.money)||0/parseInt(a.worktime_define)||0*parseInt(a.work_time)||0+parseInt(a.worker_overtime)||0*parseInt(a.overtime_money)||0:parseInt(a.money)||0/parseInt(a.worktime_define)||0*parseInt(a.work_time)||0+(parseInt(a.money)||0/parseInt(a.worker_overtime)||0*parseInt(a.overtime))||0,xe(i({},Je,{"duration":o,"wages":r})),he(!1)},Ve=function handleWorkingHoursClose(){L(!1)},Ye=function handleWorkingHours(e,n){if(1===e){var t=me.map((function(e){return 4===e.id&&(e.name=n.name,e.click=!0,e.num=n.num),e}));de(t)}else{var o=pe.map((function(e){return 2===e.id&&(e.name=n.name,e.click=!0,e.num=n.num),e}));ve(o)}L(!1),V(!0)},Ze=function handlesub(){var e=JSON.parse(JSON.stringify(Je)),n=JSON.parse(JSON.stringify(Se)),t=JSON.parse(JSON.stringify(j)),o=JSON.parse(JSON.stringify(ue.item)),a=$.item.map((function(e){return e.url}));console.log(t,"businessTypes"),console.log(o,"borrowingArr");var i=void 0;if(3==t){console.log(32132131);for(var r=0;r<o.length;r++)console.log(o[r],"111"),o[r].click&&(console.log(o[r].id,"x"),i=o[r].id)}else i=t;console.log(i,"type"),console.log(Je,"val"),console.log(me,"timaeArr"),console.log(pe,"addWorkArr"),console.log(n,"xxxeqweqw");var u=0,c=0;me.map((function(e){e.click&&e.num&&(4!==e.id?(console.log(e.num,"v.numv.numv.num"),console.log(n.work,"items.work"),u=e.num,c=n.work*e.num):(console.log(n.work,"1111"),console.log(e.num,"2222"),u=1/n.work*e.num,c=e.num))}));var d=0;pe.map((function(e){e.click&&e.num&&(d=e.num)})),console.log(u,c,d);var y={"money":e.money,"time":e.time,"type":i,"img_url":a,"id":N,"overtime":d||0,"work_time":u||0,"work_time_hour":c||0,"note":Je.note};(0,l.updateBusinessAction)(y).then((function(e){console.log(e),200===e.code?((0,m.default)(e.msg),setTimeout((function(){s.default.navigateBack({"delta":2})}),1e3)):(0,m.default)(e.msg)}))},Ge=function handleInput(e,n){var t=JSON.parse(JSON.stringify(Je));t[e]=n.detail.value,xe(t)},Le=function handleWageStandardDisplay(){je(!1)};this.anonymousFunc0=function(){},this.anonymousFunc1=function(){},this.anonymousFunc2=function(){},this.anonymousFunc3=function(){},this.anonymousFunc4=function(e){Ge("unitNum",e)},this.anonymousFunc5=function(){},this.anonymousFunc6=function(e){Ge("unitPrice",e)},this.anonymousFunc7=function(e){Ge("money",e)},this.anonymousFunc8=function(e){Ge("money",e)},this.anonymousFunc10=function(){he(!0)},this.anonymousFunc11=function(){je(!0)},this.anonymousFunc12=function(){},this.anonymousFunc13=function(e){return Ge("note",e)},this.anonymousFunc14=Ze;var Qe=3===j?ue.item.map((function(n,t){n={"$original":(0,u.internal_get_original)(n)};var o="bcazz"+t;return e.anonymousFunc9Map[o]=function(){return Me(n.$original)},{"_$indexKey":o,"$original":n.$original}})):[];return u.propsManager.set({"images":$.item,"max":4,"userUploadImg":Re,"userDelImg":Te},r,a),u.propsManager.set({"display":Pe,"handleClose":Le,"wageStandard":Se,"handleWageStandard":qe,"handleAddWage":He,"handleWageStandardRadio":ze},p,f),u.propsManager.set({"display":_e,"handleWorkOvertimeClose":Be,"handleworkOvertime":Ue,"data":me,"dataArr":pe,"handleWorkOvertimeOk":Ke,"model":Je},_,k),u.propsManager.set({"display":G,"handleWorkingHoursClose":Ve,"type":oe,"handleWorkingHours":Ye},S,O),Object.assign(this.__state,{"borrowing":ue,"loopArray56":Qe,"$compid__63":r,"$compid__64":p,"$compid__65":_,"$compid__66":S,"businessType":j,"type":z,"typeName":M,"val":Je,"identity":x,"unit":ee}),this.__state}},{"key":"anonymousFunc0","value":function anonymousFunc0(e){}},{"key":"anonymousFunc1","value":function anonymousFunc1(e){}},{"key":"anonymousFunc2","value":function anonymousFunc2(e){}},{"key":"anonymousFunc3","value":function anonymousFunc3(e){}},{"key":"anonymousFunc4","value":function anonymousFunc4(e){}},{"key":"anonymousFunc5","value":function anonymousFunc5(e){}},{"key":"anonymousFunc6","value":function anonymousFunc6(e){}},{"key":"anonymousFunc7","value":function anonymousFunc7(e){}},{"key":"anonymousFunc8","value":function anonymousFunc8(e){}},{"key":"anonymousFunc9","value":function anonymousFunc9(e){for(var n,t=arguments.length,o=Array(t>1?t-1:0),a=1;a<t;a++)o[a-1]=arguments[a];return this.anonymousFunc9Map[e]&&(n=this.anonymousFunc9Map)[e].apply(n,o)}},{"key":"anonymousFunc10","value":function anonymousFunc10(e){}},{"key":"anonymousFunc11","value":function anonymousFunc11(e){}},{"key":"anonymousFunc12","value":function anonymousFunc12(e){}},{"key":"anonymousFunc13","value":function anonymousFunc13(e){}},{"key":"anonymousFunc14","value":function anonymousFunc14(e){}}]),EditDetails}(s.default.Component),o.$$events=["anonymousFunc0","anonymousFunc1","anonymousFunc2","anonymousFunc3","anonymousFunc4","anonymousFunc5","anonymousFunc6","anonymousFunc7","anonymousFunc8","anonymousFunc9","anonymousFunc10","anonymousFunc11","anonymousFunc12","anonymousFunc13","anonymousFunc14"],o.$$componentPath="pages/editDetails/index",a);n.default=d,Component(t(0).default.createComponent(d,!0))},"75":function(e,n,t){"use strict";t.r(n);var o=t(28),a=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n.default=a.a}},[[226,0,1,2,3]]]);