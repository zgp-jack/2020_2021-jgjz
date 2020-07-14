(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/flowingWater/index.tsx?taro&type=script&parse=PAGE&":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/flowingWater/index.tsx?taro&type=script&parse=PAGE& ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.context = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _index = __webpack_require__(/*! ../../utils/request/index */ "./src/utils/request/index.ts");

var _index2 = __webpack_require__(/*! ../../utils/msg/index */ "./src/utils/msg/index.ts");

var _index3 = _interopRequireDefault(_index2);

var _redux = __webpack_require__(/*! @tarojs/redux */ "./node_modules/@tarojs/redux/index.js");

var _index4 = __webpack_require__(/*! ../../config/index */ "./src/config/index.ts");

var _store = __webpack_require__(/*! ../../config/store */ "./src/config/store.ts");

var _flowingWater = __webpack_require__(/*! ../../actions/flowingWater */ "./src/actions/flowingWater.ts");

__webpack_require__(/*! ./index.scss */ "./src/pages/flowingWater/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var context = exports.context = (0, _taroWeapp.createContext)({});

var FlowingWater = (_temp2 = _class = function (_Taro$Component) {
  _inherits(FlowingWater, _Taro$Component);

  function FlowingWater() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FlowingWater);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FlowingWater.__proto__ || Object.getPrototypeOf(FlowingWater)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '记工流水'
    }, _this.$usedState = ["data", "loopArray51", "IMGCDNURL", "isCheckOut", "allcheck", "year", "mon"], _this.anonymousFunc1Map = {}, _this.anonymousFunc2Map = {}, _this.anonymousFunc3Map = {}, _this.anonymousFunc4Map = {}, _this.anonymousFunc5Map = {}, _this.anonymousFunc6Map = {}, _this.customComponents = ["AtSwipeAction"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FlowingWater, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(FlowingWater.prototype.__proto__ || Object.getPrototypeOf(FlowingWater.prototype), "_constructor", this).call(this, props);

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

      var dispatch = (0, _redux.useDispatch)();

      var _useState = (0, _taroWeapp.useState)({
        item: []
      }),
          _useState2 = _slicedToArray(_useState, 2),
          data = _useState2[0],
          setData = _useState2[1];

      var _useState3 = (0, _taroWeapp.useState)(),
          _useState4 = _slicedToArray(_useState3, 2),
          time = _useState4[0],
          setTime = _useState4[1];

      var _useState5 = (0, _taroWeapp.useState)(),
          _useState6 = _slicedToArray(_useState5, 2),
          lastTime = _useState6[0],
          setLastTime = _useState6[1];

      var _useState7 = (0, _taroWeapp.useState)(),
          _useState8 = _slicedToArray(_useState7, 2),
          year = _useState8[0],
          setYear = _useState8[1];

      var _useState9 = (0, _taroWeapp.useState)(),
          _useState10 = _slicedToArray(_useState9, 2),
          mon = _useState10[0],
          setmon = _useState10[1];
      // 多选


      var _useState11 = (0, _taroWeapp.useState)(false),
          _useState12 = _slicedToArray(_useState11, 2),
          isCheckOut = _useState12[0],
          setIsCheckOut = _useState12[1];
      // 全选内容


      var _useState13 = (0, _taroWeapp.useState)(false),
          _useState14 = _slicedToArray(_useState13, 2),
          allcheck = _useState14[0],
          setAllcheck = _useState14[1];
      // 获取数据


      (0, _taroWeapp.useDidShow)(function () {
        var date = JSON.stringify(new Date()).slice(1, 11);
        setYear(date.slice(0, 4) + '年');
        setmon(date.slice(5, 7) + '月');
        var times = date.slice(0, 4) + '-' + date.slice(5, 7);
        setTime(times);
        var lastM = JSON.stringify(new Date(new Date().setMonth(new Date().getMonth() + 1))).slice(1, 11);
        setLastTime(lastM);
        getList(times, lastM);
      });
      var type = _taroWeapp2.default.getStorageSync(_store.Type);
      var getList = function getList(times, lastM) {
        var params = {
          identity: type,
          start_date: times,
          end_date: lastM
        };
        (0, _index.bkBusinessAction)(params).then(function (res) {
          if (res.code === 200) {
            if (res.data.data && res.data.data.length > 0) {
              for (var i = 0; i < res.data.data.length; i++) {
                var month = res.data.data[i].time.slice(0, 4) + '年' + res.data.data[i].time.slice(5, 7) + '月';
                var day = res.data.data[i].time.slice(8, 10) + '日';
                var weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
                var date = new Date(res.data.data[i].time).getDay();
                var week = weeks[date];
                res.data.data[i].week = week;
                res.data.data[i].month = month;
                res.data.data[i].day = day;
              }
              // 设置今天的自动打开
              var newData = new Date();
              var newTime = newData.getFullYear() + '-' + addZero(newData.getMonth() + 1) + '-' + addZero(newData.getDate());
              for (var _i = 0; _i < res.data.data.length; _i++) {
                if (res.data.data[_i].time == newTime) {
                  res.data.data[_i].click = true;
                }
              }
              setData({ item: res.data.data });
              dispatch((0, _flowingWater.setFlowingWater)(res.data));
            }
          } else {
            (0, _index3.default)(res.msg);
          }
        });
      };
      // 时间小于10增加0
      var addZero = function addZero(num) {
        if (parseInt(num) < 10) {
          num = '0' + num;
        }
        return num;
      };
      // 关闭打开
      var handleClick = function handleClick(e) {
        var dataItem = JSON.parse(JSON.stringify(data.item));
        var dataClick = dataItem.map(function (v) {
          if (v.time === e.time) {
            v.click = !v.click;
          }
          return v;
        });
        setData({ item: dataClick });
      };
      // 点击详情
      var handleJump = function handleJump(e, v, id) {
        e.stopPropagation();
        _taroWeapp2.default.navigateTo({
          url: "/pages/flowingWaterDetails/index?time=" + v.time + "&id=" + id + "&week=" + v.week
        });
      };
      // 点击选择框
      var handleCheckbox = function handleCheckbox(val) {
        console.log(val, 'val');
        var item = JSON.parse(JSON.stringify(data.item));
        for (var i = 0; i < item.length; i++) {
          for (var j = 0; j < item[i].arr.length; j++) {
            if (item[i].arr[j].id === val.id) {
              item[i].arr[j].checkClick = !item[i].arr[j].checkClick;
            }
          }
        }
        setData({ item: item });
      };
      var handleCheckboxBtn = function handleCheckboxBtn(type) {
        // 0ture 1false
        if (type === 0) {
          setIsCheckOut(true);
        } else {
          setIsCheckOut(false);
        }
      };
      // 点击滑动
      var handleAtSwipeAction = function handleAtSwipeAction(e, v) {
        if (e.text === '修改') {
          _taroWeapp2.default.navigateTo({
            url: '/pages/flowingWaterDetails/index'
          });
        } else {
          _taroWeapp2.default.showModal({
            content: '231312312'
          });
          return;
        }
      };
      // 跳转
      var userRouteJump = function userRouteJump(url) {
        _taroWeapp2.default.navigateTo({
          url: url
        });
      };
      // 传递的值
      var value = {
        dataArr: data
      };
      // 滑动点击
      var handleSwipeAction = function handleSwipeAction(e, v) {
        var params = {
          ids: [v.id]
        };
        console.log(v, 'vvvvv');
        if (e.text == '删除') {
          _taroWeapp2.default.showModal({
            title: '提示',
            content: '确认删除',
            showCancel: true,
            success: function success(res) {
              if (res.confirm == true) {
                (0, _index.bkDeleteBusinessAction)(params).then(function (res) {
                  if (res.code === 200) {
                    getList(time, lastTime);
                  } else {
                    (0, _index3.default)(res.msg);
                  }
                });
              }
            }
          });
        } else {
          _taroWeapp2.default.navigateTo({ url: "/pages/editDetails/index?id=" + v.id });
        }
      };
      var handelChangeTime = function handelChangeTime(e) {
        console.log(e);
        setTime(e.detail.value);
        var lastM = JSON.stringify(new Date(new Date(e.detail.value).setMonth(new Date(e.detail.value).getMonth() + 1))).slice(1, 11);
        setLastTime(lastM);
        setYear(e.detail.value.slice(0, 4) + '年');
        setmon(e.detail.value.slice(6, 8) + '月');
        getList(e.detail.value, lastM);
      };
      // 全选
      var handleAllCheck = function handleAllCheck() {
        console.log(allcheck, '全选');
        if (!allcheck) {
          var dataItem = JSON.parse(JSON.stringify(data.item));
          var list = dataItem.map(function (v) {
            v.arr.map(function (val) {
              val.checkClick = true;
              return val;
            });
            v.click = true;
            return v;
          });
          console.log(list, 'list');
          setData({ item: list });
          setAllcheck(true);
        } else {
          var arr = JSON.parse(JSON.stringify(data.item));
          var _list = arr.map(function (v) {
            v.arr.map(function (val) {
              val.checkClick = false;
              return val;
            });
            return v;
          });
          setData({ item: _list });
          setAllcheck(false);
        }
      };
      // 批量删除
      var handleAllDel = function handleAllDel() {
        var arr = JSON.parse(JSON.stringify(data.item));
        console.log(arr, 'xxx');
        var ids = [];
        for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < arr[i].arr.length; j++) {
            console.log(arr[i].arr[j]);
            if (arr[i].arr[j].checkClick) {
              console.log(arr[i].arr[j].checkClick);
              ids.push(arr[i].arr[j].id);
            }
          }
        }
        var params = {
          ids: ids
        };
        console.log(ids);
        (0, _index.bkDeleteBusinessAction)(params).then(function (res) {
          if (res.code === 200) {
            getList(time, lastTime);
          } else {
            (0, _index3.default)(res.msg);
          }
        });
      };
      console.log(data, 'data');
      context.Provider(value);

      this.anonymousFunc0 = function (e) {
        return handelChangeTime(e);
      };

      this.anonymousFunc7 = function () {
        return userRouteJump('/pages/recorder/index');
      };

      this.anonymousFunc8 = function () {
        return handleCheckboxBtn(0);
      };

      this.anonymousFunc9 = handleAllCheck;
      this.anonymousFunc10 = handleAllDel;

      this.anonymousFunc11 = function () {
        return handleCheckboxBtn(1);
      };

      var loopArray51 = data.item && data.item.length > 0 ? data.item.map(function (v, i) {
        v = {
          $original: (0, _taroWeapp.internal_get_original)(v)
        };
        var $loopState__temp2 = data.item && data.item.length > 0 ? i + i : null;

        var _$indexKey = "jhzzz" + i;

        _this2.anonymousFunc1Map[_$indexKey] = function () {
          return handleClick(v.$original);
        };

        var $loopState__temp4 = data.item && data.item.length > 0 ? v.$original.total_borrow && v.$original.total_borrow.toFixed(2) : null;
        var $loopState__temp6 = data.item && data.item.length > 0 ? v.$original.total_money && v.$original.total_money.toFixed(2) : null;
        var $anonymousCallee__10 = v.$original.click ? v.$original.arr.map(function (val, __index2) {
          val = {
            $original: (0, _taroWeapp.internal_get_original)(val)
          };
          var _$indexKey2 = "jizzz" + i + "-" + __index2;

          _this2.anonymousFunc2Map[_$indexKey2] = function (e) {
            e.preventDefault(), e.stopPropagation();
          };

          var _$indexKey3 = "jjzzz" + i + "-" + __index2;

          _this2.anonymousFunc3Map[_$indexKey3] = function (e) {
            e.preventDefault(), e.stopPropagation();
          };

          var _$indexKey4 = "baazz" + i + "-" + __index2;

          _this2.anonymousFunc4Map[_$indexKey4] = function (e) {
            return handleSwipeAction(e, val.$original);
          };

          var $loopState__temp8 = v.$original.click ? [{
            text: '修改',
            style: {
              backgroundColor: '#FFC82C'
            }
          }, {
            text: '删除',
            style: {
              backgroundColor: '#FF4949'
            }
          }] : null;
          var _$indexKey5 = "babzz" + i + "-" + __index2;

          _this2.anonymousFunc5Map[_$indexKey5] = function (e) {
            return handleJump(e, v.$original, val.$original.id);
          };

          var _$indexKey6 = "baczz" + i + "-" + __index2;

          _this2.anonymousFunc6Map[_$indexKey6] = function (e) {
            e.stopPropagation();handleCheckbox(val.$original);
          };

          var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "badzzzzzzz" + i + "-" + __index2, true),
              _genCompid2 = _slicedToArray(_genCompid, 2),
              $prevCompid__56 = _genCompid2[0],
              $compid__56 = _genCompid2[1];

          v.$original.click && _taroWeapp.propsManager.set({
            "autoClose": false,
            "onOpened": _this2.anonymousFunc3.bind(_this2, _$indexKey3),
            "onClick": _this2.anonymousFunc4.bind(_this2, _$indexKey4),
            "options": $loopState__temp8
          }, $compid__56, $prevCompid__56);
          return {
            _$indexKey2: _$indexKey2,
            _$indexKey3: _$indexKey3,
            _$indexKey4: _$indexKey4,
            $loopState__temp8: $loopState__temp8,
            _$indexKey5: _$indexKey5,
            _$indexKey6: _$indexKey6,
            $compid__56: $compid__56,
            $original: val.$original
          };
        }) : [];
        return {
          $loopState__temp2: $loopState__temp2,
          _$indexKey: _$indexKey,
          $loopState__temp4: $loopState__temp4,
          $loopState__temp6: $loopState__temp6,
          $anonymousCallee__10: $anonymousCallee__10,
          $original: v.$original
        };
      }) : [];
      Object.assign(this.__state, {
        data: data,
        loopArray51: loopArray51,
        IMGCDNURL: _index4.IMGCDNURL,
        isCheckOut: isCheckOut,
        allcheck: allcheck,
        year: year,
        mon: mon
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
    value: function anonymousFunc1(_$indexKey) {
      var _anonymousFunc1Map;

      ;

      for (var _len2 = arguments.length, e = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        e[_key2 - 1] = arguments[_key2];
      }

      return this.anonymousFunc1Map[_$indexKey] && (_anonymousFunc1Map = this.anonymousFunc1Map)[_$indexKey].apply(_anonymousFunc1Map, e);
    }
  }, {
    key: "anonymousFunc2",
    value: function anonymousFunc2(_$indexKey2) {
      var _anonymousFunc2Map;

      for (var _len3 = arguments.length, e = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        e[_key3 - 1] = arguments[_key3];
      }

      (typeof e === "undefined" ? "undefined" : _typeof(e)) === 'object' && e.stopPropagation && e.stopPropagation();
      return this.anonymousFunc2Map[_$indexKey2] && (_anonymousFunc2Map = this.anonymousFunc2Map)[_$indexKey2].apply(_anonymousFunc2Map, e);
    }
  }, {
    key: "anonymousFunc3",
    value: function anonymousFunc3(_$indexKey3) {
      var _anonymousFunc3Map;

      for (var _len4 = arguments.length, e = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        e[_key4 - 1] = arguments[_key4];
      }

      (typeof e === "undefined" ? "undefined" : _typeof(e)) === 'object' && e.stopPropagation && e.stopPropagation();
      return this.anonymousFunc3Map[_$indexKey3] && (_anonymousFunc3Map = this.anonymousFunc3Map)[_$indexKey3].apply(_anonymousFunc3Map, e);
    }
  }, {
    key: "anonymousFunc4",
    value: function anonymousFunc4(_$indexKey4) {
      var _anonymousFunc4Map;

      ;

      for (var _len5 = arguments.length, e = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        e[_key5 - 1] = arguments[_key5];
      }

      return this.anonymousFunc4Map[_$indexKey4] && (_anonymousFunc4Map = this.anonymousFunc4Map)[_$indexKey4].apply(_anonymousFunc4Map, e);
    }
  }, {
    key: "anonymousFunc5",
    value: function anonymousFunc5(_$indexKey5) {
      var _anonymousFunc5Map;

      ;

      for (var _len6 = arguments.length, e = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        e[_key6 - 1] = arguments[_key6];
      }

      return this.anonymousFunc5Map[_$indexKey5] && (_anonymousFunc5Map = this.anonymousFunc5Map)[_$indexKey5].apply(_anonymousFunc5Map, e);
    }
  }, {
    key: "anonymousFunc6",
    value: function anonymousFunc6(_$indexKey6) {
      var _anonymousFunc6Map;

      for (var _len7 = arguments.length, e = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        e[_key7 - 1] = arguments[_key7];
      }

      (typeof e === "undefined" ? "undefined" : _typeof(e)) === 'object' && e.stopPropagation && e.stopPropagation();
      return this.anonymousFunc6Map[_$indexKey6] && (_anonymousFunc6Map = this.anonymousFunc6Map)[_$indexKey6].apply(_anonymousFunc6Map, e);
    }
  }, {
    key: "anonymousFunc7",
    value: function anonymousFunc7(e) {
      ;
    }
  }, {
    key: "anonymousFunc8",
    value: function anonymousFunc8(e) {
      ;
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
  }]);

  return FlowingWater;
}(_taroWeapp2.default.Component), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc5", "anonymousFunc6", "anonymousFunc7", "anonymousFunc8", "anonymousFunc9", "anonymousFunc10", "anonymousFunc11"], _class.$$componentPath = "pages/flowingWater/index", _temp2);


FlowingWater.config = { navigationBarTitleText: '记工流水' };
exports.default = FlowingWater;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(FlowingWater, true));

/***/ }),

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/notepad/index.tsx?taro&type=script&parse=PAGE&":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/notepad/index.tsx?taro&type=script&parse=PAGE& ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.context = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _store = __webpack_require__(/*! ../../config/store */ "./src/config/store.ts");

var _index = __webpack_require__(/*! ../../utils/request/index */ "./src/utils/request/index.ts");

var _index2 = __webpack_require__(/*! ../../utils/msg/index */ "./src/utils/msg/index.ts");

var _index3 = _interopRequireDefault(_index2);

var _redux = __webpack_require__(/*! @tarojs/redux */ "./node_modules/@tarojs/redux/index.js");

var _index4 = __webpack_require__(/*! ../../config/index */ "./src/config/index.ts");

var _notepad = __webpack_require__(/*! ../../actions/notepad */ "./src/actions/notepad.ts");

__webpack_require__(/*! ./index.scss */ "./src/pages/notepad/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var context = exports.context = (0, _taroWeapp.createContext)({});

var Notepad = (_temp2 = _class = function (_Taro$Component) {
  _inherits(Notepad, _Taro$Component);

  function Notepad() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Notepad);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Notepad.__proto__ || Object.getPrototypeOf(Notepad)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '记事本'
    }, _this.$usedState = ["loopArray34", "$compid__42", "data", "busy", "del", "IMGCDNURL", "selectAll"], _this.anonymousFunc2Map = {}, _this.anonymousFunc3Map = {}, _this.customComponents = ["AtSearchBar"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Notepad, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(Notepad.prototype.__proto__ || Object.getPrototypeOf(Notepad.prototype), '_constructor', this).call(this, props);

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

      var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__42"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__42 = _genCompid2[0],
          $compid__42 = _genCompid2[1];

      var dispatch = (0, _redux.useDispatch)();
      // 输入框

      var _useState = (0, _taroWeapp.useState)(''),
          _useState2 = _slicedToArray(_useState, 2),
          val = _useState2[0],
          setVal = _useState2[1];
      // 内容


      var _useState3 = (0, _taroWeapp.useState)([]),
          _useState4 = _slicedToArray(_useState3, 2),
          data = _useState4[0],
          setData = _useState4[1];
      // 删除


      var _useState5 = (0, _taroWeapp.useState)(false),
          _useState6 = _slicedToArray(_useState5, 2),
          del = _useState6[0],
          setDel = _useState6[1];
      // 系统繁忙


      var _useState7 = (0, _taroWeapp.useState)(false),
          _useState8 = _slicedToArray(_useState7, 2),
          busy = _useState8[0],
          setBusy = _useState8[1];
      // 全选按钮


      var _useState9 = (0, _taroWeapp.useState)(false),
          _useState10 = _slicedToArray(_useState9, 2),
          selectAll = _useState10[0],
          setSelectAll = _useState10[1];
      // 点击全选


      var handleDel = function handleDel() {
        setDel(true);
      };
      // 取消
      var handleClose = function handleClose() {
        setDel(false);
      };
      // 选择ID

      var _useState11 = (0, _taroWeapp.useState)([]),
          _useState12 = _slicedToArray(_useState11, 2),
          ids = _useState12[0],
          setIds = _useState12[1];
      // 获取数据


      (0, _taroWeapp.useDidShow)(function () {
        getList();
      });
      var getList = function getList() {
        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var userInfo = _taroWeapp2.default.getStorageSync(_store.UserInfo);
        var params = {
          mid: userInfo.userId,
          token: userInfo.token,
          time: userInfo.tokenTime,
          uuid: userInfo.uuid,
          key: key
        };
        (0, _index.bkGetNotePadAction)(params).then(function (res) {
          if (res.code === 400 || res.code === 200) {
            if (res.data.length > 0) {
              for (var i = 0; i < res.data.length; i++) {
                var times = undefined;
                if (res.data[i].created_time) {
                  times = (0, _index2.getdate)(res.data[i].created_time * 1000);
                }
                var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
                var date = new Date(res.data[i].created_time * 1000).getDay();
                var creatTime = (0, _index2.timestampToTime)(res.data[i].created_time * 1000);
                var week = weeks[date];
                res.data[i].time = times;
                res.data[i].week = week;
                res.data[i].creatTime = creatTime;
                res.data[i].click = false;
              }
            }
            // 给子页面存值
            dispatch((0, _notepad.setNotepad)(res));
            setData(res.data);
          }
        });
      };
      // 跳转
      var userRouteJump = function userRouteJump(url) {
        _taroWeapp2.default.navigateTo({
          url: url
        });
      };
      // 传递的值
      var value = {
        dataArr: data
      };
      //handleCheckbox
      var handleCheckbox = function handleCheckbox(e) {
        var item = JSON.parse(JSON.stringify(ids));
        if (item.length === 0) {
          item.push(e.id);
          for (var i = 0; i < data.length; i++) {
            if (e.id === data[i].id) {
              data[i].click = true;
            }
          }
        } else {
          if (item.indexOf(e.id) === -1) {
            item.push(e.id);
            for (var _i = 0; _i < data.length; _i++) {
              if (e.id === data[_i].id) {
                data[_i].click = true;
              }
            }
          } else {
            item.splice(item.indexOf(e.id), 1);
            for (var _i2 = 0; _i2 < data.length; _i2++) {
              if (e.id === data[_i2].id) {
                data[_i2].click = false;
              }
            }
          }
        }
        setIds(item);
      };
      // 删除
      var bkDeleteNotePad = function bkDeleteNotePad() {
        var params = {
          id: ids
        };
        (0, _index.bkDeleteNotePadAction)(params).then(function (res) {
          if (res.code === 200) {
            getList();
          } else {
            (0, _index3.default)(res.msg);
          }
        });
      };
      // 全选
      var handleAllCheckbox = function handleAllCheckbox() {
        var idsArr = void 0,
            arr = void 0;
        if (!selectAll) {
          idsArr = data.map(function (v) {
            return v.id;
          });
          arr = data.map(function (v) {
            v.click = true;
            return v;
          });
          setSelectAll(true);
        } else {
          idsArr = [];
          arr = data.map(function (v) {
            v.click = false;
            return v;
          });
          setSelectAll(false);
        }
        setIds(idsArr);
        setData(arr);
      };
      // 搜索
      var handleSeach = function handleSeach() {
        getList(val);
      };
      context.Provider(value);

      this.anonymousFunc0 = function (e) {
        return setVal(e);
      };

      this.anonymousFunc1 = handleSeach;

      this.anonymousFunc4 = function () {
        return userRouteJump('/pages/addNotepad/index');
      };

      this.anonymousFunc5 = handleDel;
      this.anonymousFunc6 = handleAllCheckbox;
      this.anonymousFunc7 = bkDeleteNotePad;
      this.anonymousFunc8 = handleClose;
      var loopArray34 = data.length > 0 && !busy ? data.map(function (v, __index2) {
        v = {
          $original: (0, _taroWeapp.internal_get_original)(v)
        };

        var _$indexKey = "gazzz" + __index2;

        _this2.anonymousFunc2Map[_$indexKey] = function () {
          return userRouteJump("/pages/notepadDetails/index?id=" + v.$original.id);
        };

        var _$indexKey2 = "gbzzz" + __index2;

        _this2.anonymousFunc3Map[_$indexKey2] = function (e) {
          e.stopPropagation();handleCheckbox(v.$original);
        };

        return {
          _$indexKey: _$indexKey,
          _$indexKey2: _$indexKey2,
          $original: v.$original
        };
      }) : [];
      _taroWeapp.propsManager.set({
        "showActionButton": true,
        "value": val,
        "onChange": this.anonymousFunc0,
        "onActionClick": this.anonymousFunc1
      }, $compid__42, $prevCompid__42);
      Object.assign(this.__state, {
        loopArray34: loopArray34,
        $compid__42: $compid__42,
        data: data,
        busy: busy,
        del: del,
        IMGCDNURL: _index4.IMGCDNURL,
        selectAll: selectAll
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
    value: function anonymousFunc2(_$indexKey) {
      var _anonymousFunc2Map;

      ;

      for (var _len2 = arguments.length, e = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        e[_key2 - 1] = arguments[_key2];
      }

      return this.anonymousFunc2Map[_$indexKey] && (_anonymousFunc2Map = this.anonymousFunc2Map)[_$indexKey].apply(_anonymousFunc2Map, e);
    }
  }, {
    key: 'anonymousFunc3',
    value: function anonymousFunc3(_$indexKey2) {
      var _anonymousFunc3Map;

      for (var _len3 = arguments.length, e = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        e[_key3 - 1] = arguments[_key3];
      }

      (typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && e.stopPropagation && e.stopPropagation();
      return this.anonymousFunc3Map[_$indexKey2] && (_anonymousFunc3Map = this.anonymousFunc3Map)[_$indexKey2].apply(_anonymousFunc3Map, e);
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
  }]);

  return Notepad;
}(_taroWeapp2.default.Component), _class.$$events = ["anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "anonymousFunc6", "anonymousFunc7", "anonymousFunc8"], _class.$$componentPath = "pages/notepad/index", _temp2);


Notepad.config = { navigationBarTitleText: '记事本' };
exports.default = Notepad;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Notepad, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/flowingWater/index.tsx?taro&type=template&parse=PAGE&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/flowingWater/index.tsx?taro&type=template&parse=PAGE& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/flowingWater/index.wxml";

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/notepad/index.tsx?taro&type=template&parse=PAGE&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/pages/notepad/index.tsx?taro&type=template&parse=PAGE& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/notepad/index.wxml";

/***/ }),

/***/ "./src/actions/flowingWater.ts":
/*!*************************************!*\
  !*** ./src/actions/flowingWater.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFlowingWater = setFlowingWater;
exports.getFlowingWater = getFlowingWater;

var _flowingWater = __webpack_require__(/*! ../constants/flowingWater */ "./src/constants/flowingWater.ts");

function setFlowingWater(data) {
  return {
    type: _flowingWater.SETDATA,
    data: data
  };
}
function getFlowingWater() {
  return {
    type: _flowingWater.GETDATA
  };
}

/***/ }),

/***/ "./src/actions/mailList.ts":
/*!*********************************!*\
  !*** ./src/actions/mailList.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setmailList = setmailList;
exports.getmailList = getmailList;

var _mailList = __webpack_require__(/*! ../constants/mailList */ "./src/constants/mailList.ts");

function setmailList(data) {
  return {
    type: _mailList.SETMAIILIST,
    data: data
  };
}
function getmailList() {
  return {
    type: _mailList.GETMAIILIST
  };
}

/***/ }),

/***/ "./src/actions/notepad.ts":
/*!********************************!*\
  !*** ./src/actions/notepad.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNotepad = setNotepad;
exports.getNotepad = getNotepad;

var _notepad = __webpack_require__(/*! ../constants/notepad */ "./src/constants/notepad.ts");

function setNotepad(data) {
  return {
    type: _notepad.SET,
    data: data
  };
}
function getNotepad() {
  return {
    type: _notepad.GET
  };
}

/***/ }),

/***/ "./src/actions/userList.ts":
/*!*********************************!*\
  !*** ./src/actions/userList.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUserList = setUserList;
exports.getUserList = getUserList;

var _userList = __webpack_require__(/*! ../constants/userList */ "./src/constants/userList.ts");

function setUserList(data) {
  return {
    type: _userList.SETUSERLIST,
    data: data
  };
}
function getUserList() {
  return {
    type: _userList.GETUSERLSIT
  };
}

/***/ }),

/***/ "./src/actions/workerList.ts":
/*!***********************************!*\
  !*** ./src/actions/workerList.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setWorker = setWorker;
exports.getWorker = getWorker;

var _workerList = __webpack_require__(/*! ../constants/workerList */ "./src/constants/workerList.ts");

function setWorker(data) {
  return {
    type: _workerList.SETWORKERTYPE,
    data: data
  };
}
function getWorker() {
  return {
    type: _workerList.GETWORKERTYPE
  };
}

/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// 全局配置
// * 全局请求接口域名
// * 测试站
var DEVREQUESTURL = exports.DEVREQUESTURL = 'http://miniapitest.zhaogong.vrtbbs.com/';
// * 正式站
var PROREQUESTURL = exports.PROREQUESTURL = 'https://newyupaomini.54xiaoshuo.com/';
// * 当前测试
var REQUESTURL = exports.REQUESTURL = DEVREQUESTURL;
// * 默认上传图片
var UPLOADIMGURL = exports.UPLOADIMGURL = "https://newyupaomini.54xiaoshuo.com/index/upload/";
// * 阿里云CDN域名
var ALIYUNCDN = exports.ALIYUNCDN = 'http://jgjz.oss-cn-beijing.aliyuncs.com';
// * 阿里云CDN图片域名
var IMGCDNURL = exports.IMGCDNURL = "http://jgjz.oss-cn-beijing.aliyuncs.com/mini/images/";
// * 公司默认客服电话
var SERVERPHONE = exports.SERVERPHONE = '400-838-1888';
// 意见反馈复制电话
var PHONE = exports.PHONE = '18586508374';
// * 小程序当前版本号
var VERSION = exports.VERSION = '3.0.0';
// * 高德地区key
var MAPKEY = exports.MAPKEY = '20f12aae660c04de86f993d3eff590a0';
// 图片
var IMAGE = exports.IMAGE = 'userauth-icon.png';

/***/ }),

/***/ "./src/config/store.ts":
/*!*****************************!*\
  !*** ./src/config/store.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// * 本文件为小程序内部缓存声明文件
// 用户信息
var UserInfo = exports.UserInfo = 'userInfo';
// 授权时token验证返回数据
var MidData = exports.MidData = 'midData';
// 工人班组长
var Type = exports.Type = 'type';

/***/ }),

/***/ "./src/constants/clickTIme.ts":
/*!************************************!*\
  !*** ./src/constants/clickTIme.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SETCLICKTIME = exports.SETCLICKTIME = 'SETCLICKTIME';
var GETCLICKTIME = exports.GETCLICKTIME = 'GETCLICKTIME';

/***/ }),

/***/ "./src/constants/flowingWater.ts":
/*!***************************************!*\
  !*** ./src/constants/flowingWater.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GETDATA = exports.GETDATA = 'getData';
var SETDATA = exports.SETDATA = 'setData';

/***/ }),

/***/ "./src/constants/mailList.ts":
/*!***********************************!*\
  !*** ./src/constants/mailList.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GETMAIILIST = exports.GETMAIILIST = 'getmailList';
var SETMAIILIST = exports.SETMAIILIST = 'setmailList';

/***/ }),

/***/ "./src/constants/notepad.ts":
/*!**********************************!*\
  !*** ./src/constants/notepad.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GET = exports.GET = 'get';
var SET = exports.SET = 'set';

/***/ }),

/***/ "./src/constants/typs.ts":
/*!*******************************!*\
  !*** ./src/constants/typs.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GETTYPE = exports.GETTYPE = 'getType';
var SETTYPE = exports.SETTYPE = 'setType';

/***/ }),

/***/ "./src/constants/userList.ts":
/*!***********************************!*\
  !*** ./src/constants/userList.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GETUSERLSIT = exports.GETUSERLSIT = 'getuserlist';
var SETUSERLIST = exports.SETUSERLIST = 'setuserlist';

/***/ }),

/***/ "./src/constants/workerList.ts":
/*!*************************************!*\
  !*** ./src/constants/workerList.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GETWORKERTYPE = exports.GETWORKERTYPE = 'getWorker';
var SETWORKERTYPE = exports.SETWORKERTYPE = 'setWorker';

/***/ }),

/***/ "./src/hooks/foreman/index.ts":
/*!************************************!*\
  !*** ./src/hooks/foreman/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = userForeman;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _index = __webpack_require__(/*! ../../utils/request/index */ "./src/utils/request/index.ts");

var _store = __webpack_require__(/*! ../../config/store */ "./src/config/store.ts");

var _redux = __webpack_require__(/*! @tarojs/redux */ "./node_modules/@tarojs/redux/index.js");

var _workerList = __webpack_require__(/*! ../../actions/workerList */ "./src/actions/workerList.ts");

var _mailList = __webpack_require__(/*! ../../actions/mailList */ "./src/actions/mailList.ts");

var _userList = __webpack_require__(/*! ../../actions/userList */ "./src/actions/userList.ts");

var _index2 = __webpack_require__(/*! ../../utils/msg/index */ "./src/utils/msg/index.ts");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function userForeman() {
  // 获取存入的公用内容
  var useSelectorItem = (0, _redux.useSelector)(function (state) {
    return state;
  });
  var dispatch = (0, _redux.useDispatch)();
  // 是工人还是班组

  var _useState = (0, _taroWeapp.useState)(1),
      _useState2 = _slicedToArray(_useState, 2),
      identity = _useState2[0],
      setIdentity = _useState2[1];
  // 上班时长


  var _useState3 = (0, _taroWeapp.useState)([{ id: 1, name: '一个工', click: false, num: 1, whole: true }, { id: 2, name: '半个工', click: false, num: 0.5, whole: true }, { id: 3, name: '休息', click: false, num: 0 }, { id: 4, name: '0.0小时', click: false, num: 0 }]),
      _useState4 = _slicedToArray(_useState3, 2),
      timeArr = _useState4[0],
      setTimeArr = _useState4[1];
  //加班时长


  var _useState5 = (0, _taroWeapp.useState)([{ id: 1, name: '无加班', click: false, num: 0 }, { id: 2, name: '0.0小时', click: false, num: 0 }]),
      _useState6 = _slicedToArray(_useState5, 2),
      addWorkArr = _useState6[0],
      setAddWorkArr = _useState6[1];
  // 选择大单位


  var _useState7 = (0, _taroWeapp.useState)([{ id: 1, name: '平方米', click: true }, { id: 2, name: '立方米', click: false }, { id: 3, name: '吨', click: false }, { id: 4, name: '米', click: false }, { id: 5, name: '个', click: false }, { id: 6, name: '次', click: false }, { id: 7, name: '天', click: false }, { id: 8, name: '块', click: false }, { id: 9, name: '组', click: false }, { id: 10, name: '台', click: false }, { id: 11, name: '捆', click: false }, { id: 12, name: '宗', click: false }, { id: 13, name: '项', click: false }, { id: 14, name: '株', click: false }]),
      _useState8 = _slicedToArray(_useState7, 2),
      company = _useState8[0],
      setCompany = _useState8[1];
  // 借支


  var _useState9 = (0, _taroWeapp.useState)({
    item: [{ id: 3, name: '工资', click: false }, { id: 4, name: '生活费', click: false }, { id: 5, name: '补贴', click: false }, { id: 6, name: '奖励', click: false }, { id: 7, name: '其他', click: false }]
  }),
      _useState10 = _slicedToArray(_useState9, 2),
      borrowing = _useState10[0],
      setBorrowing = _useState10[1];

  var _useState11 = (0, _taroWeapp.useState)({
    groupName: '',
    teamName: '',
    name: '',
    time: '',
    details: '',
    duration: '',
    amount: '',
    price: '',
    wages: '',
    borrowing: '',
    univalent: '',
    userName: '',
    phone: '',
    workersWages: '0'
  }),
      _useState12 = _slicedToArray(_useState11, 2),
      model = _useState12[0],
      setModel = _useState12[1];

  var _useState13 = (0, _taroWeapp.useState)({
    data: [{ id: 1, name: '按小时计算', click: true }, { id: 2, name: '按天算', click: false }],
    // 上班模板
    work: 8,
    // 上班金额
    money: 325,
    // 加班钱（小时）
    addWork: 50,
    // 小时/天
    type: 1,
    // 加班多少小时算一台呢
    day: 6,
    // 自动换算加班多少每小时多少钱
    dayAddWork: 54.17,
    state: '',
    group_info: '',
    id: ''
  }),
      _useState14 = _slicedToArray(_useState13, 2),
      wageStandard = _useState14[0],
      setWageStandard = _useState14[1];

  var _useState15 = (0, _taroWeapp.useState)(0),
      _useState16 = _slicedToArray(_useState15, 2),
      num = _useState16[0],
      setNum = _useState16[1];
  // 班组长信息


  var _useState17 = (0, _taroWeapp.useState)([]),
      _useState18 = _slicedToArray(_useState17, 2),
      foreman = _useState18[0],
      setForeman = _useState18[1];
  // 班组长名字


  var _useState19 = (0, _taroWeapp.useState)(''),
      _useState20 = _slicedToArray(_useState19, 2),
      foremanTitle = _useState20[0],
      setForemanTitle = _useState20[1];
  // 工人


  var _useState21 = (0, _taroWeapp.useState)([]),
      _useState22 = _slicedToArray(_useState21, 2),
      workerItem = _useState22[0],
      setWorkerItem = _useState22[1];
  // 选择加班时长弹窗


  var _useState23 = (0, _taroWeapp.useState)(false),
      _useState24 = _slicedToArray(_useState23, 2),
      workOvertimeDisplay = _useState24[0],
      setWorkOvertimeDisplay = _useState24[1];
  // 上班时长选择


  var _useState25 = (0, _taroWeapp.useState)(false),
      _useState26 = _slicedToArray(_useState25, 2),
      workingHoursDisplay = _useState26[0],
      setWorkingHoursDisplay = _useState26[1];
  // 上班时长选择类型


  var _useState27 = (0, _taroWeapp.useState)(0),
      _useState28 = _slicedToArray(_useState27, 2),
      timeType = _useState28[0],
      setTimeType = _useState28[1];
  // 填写班组


  var _useState29 = (0, _taroWeapp.useState)(false),
      _useState30 = _slicedToArray(_useState29, 2),
      project = _useState30[0],
      setProject = _useState30[1];
  // 单位


  var _useState31 = (0, _taroWeapp.useState)('平方米'),
      _useState32 = _slicedToArray(_useState31, 2),
      unit = _useState32[0],
      setUnit = _useState32[1];
  // 工程量


  var _useState33 = (0, _taroWeapp.useState)(false),
      _useState34 = _slicedToArray(_useState33, 2),
      quantitiesDisplay = _useState34[0],
      setQuantitiesDisplay = _useState34[1];
  // 添加成员


  var _useState35 = (0, _taroWeapp.useState)(false),
      _useState36 = _slicedToArray(_useState35, 2),
      addMemberDisplay = _useState36[0],
      setAddMemberDisplay = _useState36[1];
  // 用户数据


  var _useState37 = (0, _taroWeapp.useState)({
    name: '',
    id: 0,
    click: false
  }),
      _useState38 = _slicedToArray(_useState37, 2),
      obj = _useState38[0],
      setObj = _useState38[1];

  var _useState39 = (0, _taroWeapp.useState)(0),
      _useState40 = _slicedToArray(_useState39, 2),
      contractor = _useState40[0],
      setContractor = _useState40[1];
  // 图片


  var _useState41 = (0, _taroWeapp.useState)({
    item: []
  }),
      _useState42 = _slicedToArray(_useState41, 2),
      image = _useState42[0],
      setImage = _useState42[1];
  // 按天还是按量计算


  var _useState43 = (0, _taroWeapp.useState)({
    item: [{ id: 0, name: '按天记工', click: true }, { id: 1, name: '按量计算', click: false }]
  }),
      _useState44 = _slicedToArray(_useState43, 2),
      contractorArr = _useState44[0],
      setContractorArr = _useState44[1];
  // 修改项目


  var _useState45 = (0, _taroWeapp.useState)(false),
      _useState46 = _slicedToArray(_useState45, 2),
      show = _useState46[0],
      setShow = _useState46[1];
  // 记工类型


  var _useState47 = (0, _taroWeapp.useState)({
    item: [{ id: 1, name: '点工', click: true }, { id: 2, name: '包工 ', click: false }, { id: 3, name: '借支', click: false }]
  }),
      _useState48 = _slicedToArray(_useState47, 2),
      recorderTypeArr = _useState48[0],
      setRecorderTypeArr = _useState48[1];
  // 修改项目


  var _useState49 = (0, _taroWeapp.useState)(false),
      _useState50 = _slicedToArray(_useState49, 2),
      editProjectDisplay = _useState50[0],
      setEditProjectDisplay = _useState50[1];
  // 删除


  var _useState51 = (0, _taroWeapp.useState)(false),
      _useState52 = _slicedToArray(_useState51, 2),
      delType = _useState52[0],
      setDeldelType = _useState52[1];
  // 工资


  var _useState53 = (0, _taroWeapp.useState)(false),
      _useState54 = _slicedToArray(_useState53, 2),
      wagesModalDisplay = _useState54[0],
      setWagesModalDisplay = _useState54[1];
  // 工资标准


  var _useState55 = (0, _taroWeapp.useState)(false),
      _useState56 = _slicedToArray(_useState55, 2),
      wageStandardDisplay = _useState56[0],
      setWageStandardDisplay = _useState56[1];
  // 项目列表


  var _useState57 = (0, _taroWeapp.useState)([]),
      _useState58 = _slicedToArray(_useState57, 2),
      projectArr = _useState58[0],
      setProjectArr = _useState58[1];
  // 项目id


  var _useState59 = (0, _taroWeapp.useState)(''),
      _useState60 = _slicedToArray(_useState59, 2),
      ids = _useState60[0],
      setIds = _useState60[1];
  // 判断工资标准修改类型


  var _useState61 = (0, _taroWeapp.useState)(0),
      _useState62 = _slicedToArray(_useState61, 2),
      state = _useState62[0],
      setState = _useState62[1];
  // 选择班主成员


  var _useState63 = (0, _taroWeapp.useState)([]),
      _useState64 = _slicedToArray(_useState63, 2),
      memberList = _useState64[0],
      setMemberList = _useState64[1];
  // 工人列表


  var _useState65 = (0, _taroWeapp.useState)(),
      _useState66 = _slicedToArray(_useState65, 2),
      workerList = _useState66[0],
      setWorkerList = _useState66[1];
  //储存工人


  var _useState67 = (0, _taroWeapp.useState)([]),
      _useState68 = _slicedToArray(_useState67, 2),
      storagelist = _useState68[0],
      setStoragelist = _useState68[1];
  // 工资标准


  var _useState69 = (0, _taroWeapp.useState)([]),
      _useState70 = _slicedToArray(_useState69, 2),
      standard = _useState70[0],
      setStandard = _useState70[1];
  // 已设置工资标准


  var _useState71 = (0, _taroWeapp.useState)([]),
      _useState72 = _slicedToArray(_useState71, 2),
      moneyList = _useState72[0],
      setMoneyList = _useState72[1];
  // 工资tab类型


  var _useState73 = (0, _taroWeapp.useState)(0),
      _useState74 = _slicedToArray(_useState73, 2),
      tab = _useState74[0],
      setTab = _useState74[1];
  // 选择人数


  var _useState75 = (0, _taroWeapp.useState)(0),
      _useState76 = _slicedToArray(_useState75, 2),
      clickNum = _useState76[0],
      setClickNum = _useState76[1];
  // 修改项目组数据


  var _useState77 = (0, _taroWeapp.useState)({
    group_info: '',
    team_name: '',
    group_name: ''
  }),
      _useState78 = _slicedToArray(_useState77, 2),
      editProjectData = _useState78[0],
      setEditProjectData = _useState78[1];
  // 模板id


  var _useState79 = (0, _taroWeapp.useState)(''),
      _useState80 = _slicedToArray(_useState79, 2),
      templateId = _useState80[0],
      setTemplateId = _useState80[1];
  // 设置工资标准里的工人


  var _useState81 = (0, _taroWeapp.useState)([]),
      _useState82 = _slicedToArray(_useState81, 2),
      setWorkList = _useState82[0],
      setSetWorkList = _useState82[1];
  // group_info


  var _useState83 = (0, _taroWeapp.useState)(''),
      _useState84 = _slicedToArray(_useState83, 2),
      groupInfo = _useState84[0],
      setGroupInfo = _useState84[1];
  // 添加标准


  var _useState85 = (0, _taroWeapp.useState)(0),
      _useState86 = _slicedToArray(_useState85, 2),
      addStandard = _useState86[0],
      setAddStandard = _useState86[1];
  // 日历（不等于借支）


  var _useState87 = (0, _taroWeapp.useState)([]),
      _useState88 = _slicedToArray(_useState87, 2),
      timeData = _useState88[0],
      setTimeData = _useState88[1];
  // modal选择工人


  var _useState89 = (0, _taroWeapp.useState)(0),
      _useState90 = _slicedToArray(_useState89, 2),
      clickModalNum = _useState90[0],
      setClickModalNum = _useState90[1];
  // 刷新


  var _useState91 = (0, _taroWeapp.useState)(false),
      _useState92 = _slicedToArray(_useState91, 2),
      refresh = _useState92[0],
      setRefresh = _useState92[1];

  (0, _taroWeapp.useDidShow)(function () {
    console.log(refresh, 'refresh');
    if (refresh) {
      setRefresh(false);
      return;
    }
    var type = _taroWeapp2.default.getStorageSync(_store.Type);
    setIdentity(type);
    // 判断选择回来 
    if (useSelectorItem.workerList.length > 0) {
      if (identity === 2) {
        setForeman(useSelectorItem.workerList);
        setForemanTitle(useSelectorItem.workerList[0].name);
        return;
      }
      //  ======= 需要修改，等获取到本人信息后
      var objs = JSON.parse(JSON.stringify(obj));
      var data = JSON.parse(JSON.stringify(moneyList));
      var arrList = JSON.parse(JSON.stringify(useSelectorItem.workerList));
      console.log(data, 'data');
      if (data.length > 0) {
        for (var j = 0; j < data.length; j++) {
          for (var i = 0; i < arrList.length; i++) {
            arrList[i].click = false;
            if (data[j].worker_id === arrList[i].id) {
              arrList[i].set = true;
            }
          }
        }
      } else {
        for (var _i = 0; _i < arrList.length; _i++) {
          arrList[_i].click = false;
        }
      }
      for (var _i2 = 0; _i2 < arrList.length; _i2++) {
        if (arrList[_i2].id === objs.id) {
          objs = arrList[_i2];
          arrList.splice(_i2, 1);
        }
      }
      setWorkerItem([objs].concat(_toConsumableArray(arrList)));
    }
  });
  (0, _taroWeapp.useEffect)(function () {
    // 获取角色
    var type = _taroWeapp2.default.getStorageSync(_store.Type);
    setIdentity(type);
    // 获取用户信息
    var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
    var objs = JSON.parse(JSON.stringify(obj));
    objs.name = midData.nickname || '未命名';
    objs.id = midData.worker_id;
    setObj(objs);
    // 获取通讯里信息
    var workerItemData = JSON.parse(JSON.stringify(workerItem));
    // 获取设置员工信息
    // console.log(useSelectorItem,'useSelectorItem')
    // if (useSelectorItem.userList.length) {
    //   useSelectorItem.userList.push(objs);
    //   setWorkerItem(useSelectorItem.userList)
    // }else{
    workerItemData.push(objs);
    setWorkerItem(workerItemData);
    // }
    // 获取项目名称
    bkGetProjectTeam();
    // 获取工人列表
    // bkGetWorker(groupInfo);
    // 工资标准
    bkWageStandGetWage();
  }, []);
  // 获取项目名称
  var bkGetProjectTeam = function bkGetProjectTeam(groupName) {
    (0, _index.bkGetProjectTeamAction)({}).then(function (res) {
      if (res.code === 200) {
        // 如果是工人的话默认选中第一条有数据
        // 多条选中最近一条
        // 工人
        var modalObj = JSON.parse(JSON.stringify(model));
        var _identity = _taroWeapp2.default.getStorageSync(_store.Type);
        if (_identity === 2) {
          if (!model.groupName) {
            var _groupInfo = void 0;
            if (res.data && res.data.length > 0) {
              for (var i = 0; i < res.data.length; i++) {
                res.data[0].click = true;
                _groupInfo = res.data[0].child[0].pid + ',' + res.data[0].child[0].id;
                if (res.data[0].child[0].leader_name) {
                  setForemanTitle(res.data[0].child[0].leader_name);
                }
              }
            }
            setGroupInfo(_groupInfo);
            setModel(_extends({}, modalObj, { name: res.data[0].name }));
            setProjectArr(res.data);
          } else {
            if (res.data && res.data.length > 0) {
              for (var _i3 = 0; _i3 < res.data.length; _i3++) {
                // res.data[0].click = true;
                if (groupName === res.data[_i3].name) {
                  res.data[_i3].click = true;
                }
              }
              setProjectArr(res.data);
            }
          }
        } else {
          setProjectArr(res.data);
        }
      }
    });
  };
  // 已设置工资标准标准
  var bkGetWorkerWage = function bkGetWorkerWage(id) {
    var prams = void 0;
    if (id) {
      prams = {
        group_info: id
      };
    } else {
      prams = {
        group_info: groupInfo
      };
    }
    (0, _index.bkGetWorkerWageAction)(prams).then(function (res) {
      if (res.code === 200) {
        setMoneyList(res.data);
        // 判断页面上的是否设置工资标准
        if (identity === 1) {
          var data = JSON.parse(JSON.stringify(workerItem));
          for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < res.data.length; j++) {
              if (res.data[j].worker_id === data[i].id) {
                data[i].set = true;
              }
            }
          }
          setWorkerItem(data);
        }
      } else {
        (0, _index3.default)(res.msg);
      }
    });
  };
  // 工资标准
  var bkWageStandGetWage = function bkWageStandGetWage() {
    (0, _index.bkWageStandGetWageAction)({}).then(function (res) {
      if (res.code === 200) {
        for (var i = 0; i < res.data.length; i++) {
          if (i === 0) {
            res.data[i].click = true;
            setTemplateId(res.data[i].id);
          } else {
            res.data[i].click = false;
          }
        }
        setStandard(res.data);
      }
    });
  };
  // 工人列表
  var bkGetWorker = function bkGetWorker(groupInfos, data) {
    // 不传group_info获取通讯录里的所有人
    var params = void 0;
    if (groupInfos) {
      params = {
        group_info: groupInfos
      };
    } else {
      params = {};
    }
    (0, _index.bkGetWorkerAction)(params).then(function (res) {
      if (res.code === 200) {
        var _data = JSON.parse(JSON.stringify(workerItem));
        // return;
        var arr = [];
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].list) {
            for (var j = 0; j < res.data[i].list.length; j++) {
              // 判断有worktime_define和money就是设置了工资标准
              if (res.data[i].list[j].worktime_define && res.data[i].list[j].money) {
                res.data[i].list[j].set = true;
              }
              arr.push(res.data[i].list[j]);
            }
          }
        }
        console.log(arr, 'arr');
        for (var _i4 = 0; _i4 < arr.length; _i4++) {
          if (arr[_i4].id == obj.id) {
            arr.splice(_i4, 1);
          }
        }
        if (_data) {
          // 根据姓名判断在那个位置push进去
          for (var _i5 = 0; _i5 < res.data.length; _i5++) {
            if (_data.name_py === res.data[_i5].name_py) {
              res.data[_i5].list.push(_data);
            }
          }
        }
        // 判断有就不存了存通讯录redux
        // 么有groupInfos就不修改
        if (!groupInfos) {
          dispatch((0, _mailList.setmailList)(res.data));
          // setWorkerItem([obj, ...arr])
        }
        // 存员工redux
        dispatch((0, _userList.setUserList)(res.data));
        setWorkerList(res.data);
      } else {
        (0, _index3.default)(res.msg);
        return;
      }
    });
  };
  // 输入框
  var handleInput = function handleInput(type, e) {
    var data = JSON.parse(JSON.stringify(model));
    if (type === 'details') {
      setNum(e.detail.value.length);
    }
    data[type] = e.detail.value;
    setModel(data);
  };
  // 创建项目
  var handleAddProject = function handleAddProject() {
    var params = {
      group_name: model.groupName,
      team_name: model.teamName
    };
    (0, _index.bkAddProjectTeamAction)(params).then(function (res) {
      if (res.code === 200) {
        setIds(res.data);
        bkGetProjectTeam(model.groupName);
      } else {
        (0, _index3.default)(res.msg);
        return;
      }
      setProject(false);
      var data = JSON.parse(JSON.stringify(model));
      data.name = model.groupName;
      setGroupInfo(res.data);
      setModel(data);
    });
  };
  // 选择加班时长
  var handleworkOvertime = function handleworkOvertime(type, val) {
    setTimeType(type);
    if (type === 1) {
      if (val.id === 4) {
        var arr = timeArr.map(function (v) {
          if (v.id === val.id) {
            v.click = !v.click;
          } else {
            v.click = false;
          }
          return v;
        });
        setTimeArr(arr);
        setWorkOvertimeDisplay(false);
        setWorkingHoursDisplay(true);
        return;
      } else {
        var _arr = timeArr.map(function (v) {
          if (v.id === val.id) {
            v.click = !v.click;
          } else {
            if (v.id === 4) {
              v.name = '0.0小时';
            }
            v.click = false;
          }
          return v;
        });
        setTimeArr(_arr);
      }
    } else {
      if (val.id != 2) {
        var _arr2 = addWorkArr.map(function (v) {
          if (v.id === val.id) {
            v.click = !v.click;
          } else {
            if (v.id === 2) {
              v.name = '0.0小时';
            }
            v.click = false;
          }
          return v;
        });
        setAddWorkArr(_arr2);
      } else {
        var _arr3 = addWorkArr.map(function (v) {
          if (v.id === val.id) {
            v.click = !v.click;
          } else {
            v.click = false;
          }
          return v;
        });
        setAddWorkArr(_arr3);
        setWorkOvertimeDisplay(false);
        setWorkingHoursDisplay(true);
        return;
      }
    }
  };
  // 加班时长弹框选择
  var handleWorkingHours = function handleWorkingHours(type, e) {
    if (type === 1) {
      var data = timeArr.map(function (v) {
        if (v.id === 4) {
          v.name = e.name;
          v.click = true;
          v.num = e.num;
        }
        return v;
      });
      setTimeArr(data);
    } else {
      var _data2 = addWorkArr.map(function (v) {
        if (v.id === 2) {
          v.name = e.name;
          v.click = true;
          v.num = e.num;
        }
        return v;
      });
      setAddWorkArr(_data2);
    }
    setWorkingHoursDisplay(false);
    setWorkOvertimeDisplay(true);
  };
  // 确认时间选择
  var handleWorkOvertimeOk = function handleWorkOvertimeOk() {
    var data = timeArr.filter(function (v) {
      return v.click;
    });
    var dataList = addWorkArr.filter(function (v) {
      return v.click;
    });
    var title = void 0;
    if (data || dataList) {
      if (data.length > 0) {
        if (data[0].name == '休息') {
          title = data[0].name;
        } else {
          title = '上班' + data[0].name;
        }
      }
      if (dataList.length > 0) {
        if (dataList[0].name !== '无加班') {
          title = '加班' + dataList[0].name;
        } else {
          title = dataList[0].name;
        }
      }
      if (data.length > 0 && dataList.length > 0) {
        if (data[0].name == '休息' && dataList[0].name == '无加班') {
          title = data[0].name + dataList[0].name;
        } else {
          if (data[0].name == '休息') {
            title = '加班' + dataList[0].name;
          }
          if (dataList[0].name == '无加班') {
            title = '上班' + data[0].name + dataList[0].name;
          }
          title = '上班' + data[0].name + '加班' + dataList[0].name;
        }
      }
    }
    if (identity === 2) {
      var _data3 = JSON.parse(JSON.stringify(wageStandard));
      // 获取上班时长
      var timeArrs = JSON.parse(JSON.stringify(timeArr));
      // 获取加班时长
      var addWorkArrs = JSON.parse(JSON.stringify(addWorkArr));
      //模板金额 
      var moneyNum = _data3.money;
      // 模板时间
      var workNum = _data3.work;
      //加班金钱
      var addWorkNum = _data3.addWork;
      // 加班时间
      var dayNum = _data3.day;
      // 上班时间
      var time = 0;
      for (var i = 0; i < timeArrs.length; i++) {
        if (timeArrs[i].click) {
          // 选择工
          if (timeArrs[i].id != 1 && timeArrs[i].id != 2 && timeArrs[i].id != 3) {
            time = 1 / workNum * timeArrs[i].num;
            // 选择时间
          } else {
            if (timeArrs[i].id == 1) {
              // 等于模板时间
              time = workNum;
            } else if (timeArrs[i].id == 2) {
              // 等于模板时间的一半
              time = workNum / 2;
            } else if (timeArrs[i].id == 3) {
              // 等于0 
              time = 0;
            }
          }
          // time = timeArrs[i].num;
        }
      }
      // 加班时间
      var addTime = 0;
      for (var _i6 = 0; _i6 < addWorkArrs.length; _i6++) {
        if (addWorkArrs[_i6].click) {
          addTime = addWorkArrs[_i6].num;
        }
      }
      var total = void 0;
      if (_data3.type === 1) {
        // 按小时算 加班小时* 模板加班金额
        total = moneyNum / workNum * time + addWorkNum * addTime;
      } else {
        // 按天算 每个工多少钱/模板定义的多少小时算一个工 * 加班时长
        total = moneyNum / workNum * time + moneyNum / dayNum * addTime;
      }
      var _num = total.toFixed(2);
      //给工人自己设置工资标准
      var wageStandards = JSON.parse(JSON.stringify(wageStandard));
      var params = {
        identity: identity,
        worktime_define: wageStandards.work,
        overtime_type: wageStandards.type,
        overtime_money: wageStandards.dayAddWork,
        money: wageStandards.money,
        overtime: wageStandards.day,
        group_info: groupInfo
      };
      (0, _index.bkSetWorkerIdentityWageAction)(params).then(function (res) {
        if (res.code !== 200) {
          (0, _index3.default)(res.msg);
        }
      });
      setModel(_extends({}, model, { workersWages: _num, duration: title }));
      setWorkOvertimeDisplay(false);
      return;
    }
    setModel(_extends({}, model, { duration: title }));
    setWorkOvertimeDisplay(false);
  };
  // 选择单位
  var handleQuantities = function handleQuantities(val) {
    var arr = company.map(function (v) {
      if (v.id === val.id) {
        v.click = !v.click;
        if (v.click) {
          setUnit(v.name);
          setQuantitiesDisplay(false);
        }
      } else {
        v.click = false;
      }
      return v;
    });
    setCompany(arr);
  };
  // 支借Radio
  var handleRadioBorrowing = function handleRadioBorrowing(v) {
    var data = JSON.parse(JSON.stringify(borrowing.item));
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === v.id) {
        data[i].click = true;
      }
    }
    setBorrowing({ item: data });
  };
  // 添加成员
  var handleEstablish = function handleEstablish(id) {
    var data = JSON.parse(JSON.stringify(model));
    var params = {
      name: data.userName,
      tel: data.phone
    };
    // bkGetWorker(id, true);
    dispatch((0, _mailList.setmailList)([]));
    setAddMemberDisplay(false);
    // return;
    (0, _index.bkAddWorkerActiion)(params).then(function (res) {
      if (res.code === 200) {
        // 叫后台返回id 姓名 电话
        var _data4 = res.data;
        // 添加成功后重新获取设置数据
        bkGetWorker(id, _data4);
        // ======= 测试无法测试
        // const data = JSON.parse(JSON.stringify(workerItem));
        // params.id = Math.random();
        // data.push(params)
        // setWorkerItem(data)
        // 重新获取数据
        // bkGetWorkerAction
        setAddMemberDisplay(false);
      } else {
        (0, _index3.default)(res.msg);
      }
    });
  };
  // 点击删除
  var handleDel = function handleDel(type) {
    var data = JSON.parse(JSON.stringify(workerItem));
    if (type === 0) {
      var arr = data.map(function (v) {
        if (v.id != 1) {
          v.del = true;
        }
        return v;
      });
      setWorkerItem(arr);
      setDeldelType(true);
    } else {
      var _arr4 = data.map(function (v) {
        if (v.id != 1) {
          v.del = false;
        }
        return v;
      });
      setWorkerItem(_arr4);
      setDeldelType(false);
    }
  };
  // 删除某一个
  var handleDelList = function handleDelList(v) {
    _taroWeapp2.default.showModal({
      title: '温馨提示',
      content: '删除工人后，工人将不在此项目中，但他之前的记工数据不会受影响。确定要删除吗？',
      showCancel: true,
      success: function success(res) {
        if (res.confirm) {
          var params = {
            ids: v.id,
            group_info: groupInfo
          };
          (0, _index.bkDeleteRroupWorkerAction)(params).then(function (res) {
            if (res.code === 200) {
              var data = JSON.parse(JSON.stringify(workerItem));
              data.splice(data.indexOf(v.id), 1);
              setWorkerItem(data);
              // 获取工人列表
              var workerListArr = JSON.parse(JSON.stringify(workerList));
              console.log(data, '删除后内容');
              for (var i = 0; i < workerListArr.length; i++) {
                for (var z = 0; z < workerListArr[i].list.length; z++) {
                  console.log(workerListArr[i].list[z]);
                  console.log(v.id, 'id');
                  if (workerListArr[i].list[z].id == v.id) {
                    // ==============
                    console.log(312);
                    console.log(workerListArr[i].list);
                    console.log(workerListArr[i].list[z]);
                    workerListArr[i].list.splice(z, 1);
                  }
                }
              }
              //存数据
              dispatch((0, _userList.setUserList)(workerListArr));
              // setWorkerItem
              // console.log(workerListArr,'workerListArr')
              // setWorkerItem(workerListArr)
              console.log(workerListArr, 'workerListArr');
            } else {
              (0, _index3.default)(res.msg);
            }
          });
        }
      }
    });
  };
  //添加标准
  var handleAddStandard = function handleAddStandard() {
    setAddStandard(1);
    setWagesModalDisplay(false);
    setWageStandardDisplay(true);
  };
  // 打开工资标准
  var handleOpenWagesModal = function handleOpenWagesModal() {
    setWagesModalDisplay(true);
    //把工资标准的内容设置为新的s
    var data = JSON.parse(JSON.stringify(workerItem));
    var setData = [],
        NoSetData = [];
    for (var i = 0; i < data.length; i++) {
      data[i].click = false;
      if (data[i].set) {
        setData.push(data[i]);
      } else {
        NoSetData.push(data[i]);
      }
    }
    // 设置人员
    setSetWorkList([].concat(NoSetData, setData));
    // 一设置工资标准标准
    bkGetWorkerWage();
  };
  // 添加工资标准
  var handleWageStandard = function handleWageStandard(type, e) {
    if (type == 'day') {
      var item = JSON.parse(JSON.stringify(wageStandard));
      var dayAddWork = item.money / e;
      item[type] = e;
      item.dayAddWork = dayAddWork.toFixed(2);
      setWageStandard(item);
      return;
    }
    if (type === 'money') {
      var _item = JSON.parse(JSON.stringify(wageStandard));
      var _dayAddWork = e / _item.day;
      _item[type] = e;
      _item.dayAddWork = _dayAddWork.toFixed(2);
      setWageStandard(_item);
      return;
    }
    var data = JSON.parse(JSON.stringify(wageStandard));
    data[type] = e;
    setWageStandard(data);
  };
  // 保存
  var handlePreservation = function handlePreservation(type) {
    // 获取工资标准
    var data = JSON.parse(JSON.stringify(wageStandard));
    var item = JSON.parse(JSON.stringify(model));
    // 时间
    var work_time = 0;
    timeArr.map(function (v) {
      if (v.click) {
        if (v.num) {
          work_time = v.num;
        }
      }
    });
    var times = 1 / data.work * work_time;
    // 加班时间
    var overtime = 0;
    addWorkArr.map(function (v) {
      if (v.click) {
        if (v.num) {
          overtime = v.num;
        }
      }
    });
    // 借支radio类型
    var radioType = void 0;
    borrowing.item.map(function (v) {
      if (v.click) {
        radioType = v.id;
      }
    });
    //单位
    var unit = void 0;
    company.map(function (v) {
      if (v.click) {
        unit = v.name;
      }
    });
    var timeItem = JSON.parse(JSON.stringify(timeData));
    var time = timeItem.map(function (item) {
      return item.year + '-' + item.month + '-' + item.date;
    });
    // type 1 再来一笔 0 保存
    var tabData = void 0;
    recorderTypeArr.item.map(function (v) {
      if (v.click) {
        tabData = v;
      }
    });
    // 获取ID
    var workers = [];
    if (identity === 1) {
      for (var i = 0; i < workerItem.length; i++) {
        if (workerItem[i].click) {
          workers.push(workerItem[i].id);
        }
      }
    } else {
      if (foreman.length > 0) {
        for (var _i7 = 0; _i7 < foreman.length; _i7++) {
          workers.push(foreman[_i7].id);
        }
      }
    }
    // 工人ID传自己
    if (identity === 2) {
      // workers = 
      var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
      workers = midData.worker_id;
    }
    // 图片
    var img_url = image.item.map(function (item) {
      return item.url;
    });
    // 工人记工的时候，没有选择项目名称，为他默认一个
    if (projectArr.length === 0) {
      var _item2 = {
        group_name: '其他项目',
        team_name: '其他班组'
      };
      (0, _index.bkAddProjectTeamAction)(_item2).then(function (res) {
        if (res.code === 200) {
          bkGetProjectTeam();
        }
      });
    }
    // 记工
    var params = {};
    if (tabData.id == 1) {
      params = {
        // 记工类型
        business_type: tabData.id,
        // 班组信息
        group_info: groupInfo,
        // 工时
        work_time: times,
        // 身份
        identity: identity,
        // 图片
        img_url: img_url,
        // 备注
        note: item.details,
        // note: item.note,
        // 记录日期
        time: time,
        // 工人id
        workers: workers,
        overtime: overtime,
        money: item.workersWages
      };
    } else if (tabData.id == 2) {
      // 按量
      var itemType = void 0;
      for (var _i8 = 0; _i8 < contractorArr.item.length; _i8++) {
        if (contractorArr.item[_i8].click) {
          itemType = contractorArr.item[_i8].id;
        }
      }
      // 按量
      if (itemType === 1) {
        params = {
          // 记工类型
          business_type: tabData.id,
          // 班组信息
          group_info: groupInfo,
          // 工时
          work_time: times,
          // 身份
          identity: identity,
          // 图片
          img_url: img_url,
          // 备注
          note: item.details,
          // note: item.note,
          // 记录日期
          time: time,
          // 工人id
          workers: workers,
          type: 2,
          unit: unit,
          unit_num: item.amount,
          unit_price: item.price,
          money: item.wages
        };
      } else {
        // 按天
        params = {
          // 记工类型
          business_type: tabData.id,
          // 班组信息
          group_info: groupInfo,
          // 工时
          // work_time: 1,
          // 身份
          identity: identity,
          // 图片
          img_url: img_url,
          // 备注
          note: item.details,
          // note: item.note,
          // 记录日期
          time: time,
          // 工人id
          workers: workers,
          type: 1,
          money: '',
          work_time: times,
          overtime: overtime
        };
      }
    } else if (tabData.id === 3) {
      params = {
        // 记工类型
        business_type: tabData.id,
        // 班组信息
        group_info: groupInfo,
        // 工时
        work_time: times,
        // 身份
        identity: identity,
        // 图片
        img_url: img_url,
        // 备注
        note: item.details,
        // note: item.note,
        // 记录日期
        time: item.time,
        // 工人id
        workers: workers,
        type: radioType,
        money: item.borrowing
      };
    }
    // 工人的时候要先设置工资标准
    var foremanTitles = JSON.parse(JSON.stringify(foremanTitle));
    if (identity === 2) {
      if (!item.name) {
        (0, _index3.default)('请选择项目');
        return;
      }
      if (!foremanTitles) {
        (0, _index3.default)('请选择班组长');
        return;
      }
      if (!time) {
        (0, _index3.default)('请选择日期');
        return;
      }
    }
    // 记工(包工按量)
    (0, _index.bkAddBusinessAction)(params).then(function (res) {
      // 清除reducer
      if (res.code === 200) {
        if (type === 1) {
          var _data5 = {
            groupName: '',
            teamName: '',
            name: '',
            time: '',
            details: '',
            duration: '',
            amount: '',
            price: '',
            wages: '',
            borrowing: '',
            univalent: '',
            userName: '',
            phone: '',
            workersWages: '0'
          };
          setForemanTitle('');
          setModel(_data5);
        }
        _taroWeapp2.default.navigateBack();
        dispatch((0, _workerList.setWorker)([]));
      } else {
        (0, _index3.default)(res.msg);
      }
    });
  };
  var handleCalendar = function handleCalendar(v) {};
  // 点击项目
  var handleProject = function handleProject(v) {
    var data = JSON.parse(JSON.stringify(model));
    var arr = JSON.parse(JSON.stringify(projectArr));
    data.name = v.name;
    var groupInfo = v.child[0].pid + ',' + v.child[0].id;
    if (identity === 2) {
      if (v.child.length > 0) {
        if (v.child[0].leader_name) {
          setForemanTitle(v.child[0].leader_name);
        } else {
          setForemanTitle('');
        }
      }
    }
    // 设置选择框
    for (var i = 0; i < arr.length; i++) {
      if (v.id === arr[i].id) {
        arr[i].click = true;
      } else {
        arr[i].click = false;
      }
    }
    setProjectArr(arr);
    // 获取工人列表
    bkGetWorker(groupInfo);
    // 选择项目的时候先获取设置工资标准员工
    bkGetWorkerWage(groupInfo);
    setGroupInfo(groupInfo);
    setShow(false);
    setModel(data);
  };
  // 添加班组成员选择
  var handleCheckbox = function handleCheckbox(e) {
    var data = JSON.parse(JSON.stringify(memberList));
    var worker = JSON.parse(JSON.stringify(workerItem));
    if (data.length === 0) {
      data.push(e);
    } else {
      if (data.indexOf(e.id) === -1) {
        data.push(e.id);
      } else {
        data.splice(data.indexOf(e.id), 1);
      }
    }
    setMemberList(data);
    worker.push.apply(worker, _toConsumableArray(data));
    setWorkerItem(worker);
  };
  // 开始记工
  var handleStart = function handleStart() {
    var workerItemList = JSON.parse(JSON.stringify(workerItem));
    var storagelistItem = JSON.parse(JSON.stringify(storagelist));
    var arrList = [];
    if (workerItemList && storagelistItem) {
      for (var i = 0; i < workerItemList.length; i++) {
        for (var j = 0; j < storagelistItem.length; j++) {
          if (workerItemList[i].name != storagelistItem[j].name) {
            arrList.push(storagelistItem[j]);
          }
        }
      }
    }
    setWorkerItem([].concat(_toConsumableArray(workerItemList), arrList));
    dispatch((0, _workerList.setWorker)([].concat(_toConsumableArray(workerItemList), arrList)));
    _taroWeapp2.default.navigateBack({ delta: 1 });
  };
  // 确认添加标准
  var handleAddWage = function handleAddWage() {
    // 获取工资标准
    var data = JSON.parse(JSON.stringify(wageStandard));
    // 获取上班时长
    var timeArrs = JSON.parse(JSON.stringify(timeArr));
    // 获取加班时长
    var addWorkArrs = JSON.parse(JSON.stringify(addWorkArr));
    //模板金额 
    var moneyNum = data.money;
    // 模板时间
    var workNum = data.work;
    //加班金钱
    var addWorkNum = data.addWork;
    // 加班时间
    var dayNum = data.day;
    // 上班时间
    var time = 0;
    for (var i = 0; i < timeArrs.length; i++) {
      if (timeArrs[i].click) {
        // 选择工
        if (timeArrs[i].id != 1 && timeArrs[i].id != 2 && timeArrs[i].id != 3) {
          time = 1 / workNum * timeArrs[i].num;
          // 选择时间
        } else {
          if (timeArrs[i].id == 1) {
            // 等于模板时间
            time = workNum;
          } else if (timeArrs[i].id == 2) {
            // 等于模板时间的一半
            time = workNum / 2;
          } else if (timeArrs[i].id == 3) {
            // 等于0 
            time = 0;
          }
        }
      }
    }
    // 加班时间
    var addTime = 0;
    for (var _i9 = 0; _i9 < addWorkArrs.length; _i9++) {
      if (addWorkArrs[_i9].click) {
        addTime = addWorkArrs[_i9].num;
      }
    }
    // 获取
    if (identity == 2) {
      //工资标准 每个工多少钱/上班标准 * 上班时长  判断加班是按小时算还是i按天算
      var total = void 0;
      if (data.type === 1) {
        // 按小时算 加班小时* 模板加班金额
        total = moneyNum / workNum * time + addWorkNum * addTime;
      } else {
        // 按天算 每个工多少钱/模板定义的多少小时算一个工 * 加班时长
        total = moneyNum / workNum * time + moneyNum / dayNum * addTime;
      }
      var _num2 = total.toFixed(2);
      // 给工人自己设置工资标准
      var params = {
        identity: identity,
        worktime_define: data.work,
        overtime_type: data.type,
        overtime_money: data.dayAddWork,
        money: data.money,
        overtime: data.day,
        group_info: groupInfo
      };
      (0, _index.bkSetWorkerIdentityWageAction)(params).then(function (res) {
        if (res.code !== 200) {
          (0, _index3.default)(res.msg);
        }
      });
      setModel(_extends({}, model, { workersWages: _num2 }));
      setWageStandardDisplay(false);
      return;
    }
    if (addStandard === 1) {
      var _params = {
        name: '',
        worktime_define: data.work,
        overtime_type: data.type,
        overtime_money: data.dayAddWork,
        money: data.money,
        overtime: data.day
      };
      (0, _index.bkAddWageAction)(_params).then(function (res) {
        if (res.code === 200) {
          bkWageStandGetWage();
          setWagesModalDisplay(true);
        } else {
          (0, _index3.default)(res.msg);
          return;
        }
      });
      return;
    }
    // 修改已设置的
    if (state === 1) {
      var _params2 = {
        id: data.id,
        group_info: groupInfo,
        worktime_define: data.work,
        overtime_type: data.type,
        overtime: data.day,
        overtime_money: data.dayAddWork,
        money: data.money,
        type: 'wage' //后端说修改type传这个
      };
      (0, _index.bkUpdateWorkerAction)(_params2).then(function (res) {
        if (res.code === 200) {
          bkGetWorkerWage();
          setWagesModalDisplay(true);
          setWageStandardDisplay(false);
        } else {
          (0, _index3.default)(res.msg);
        }
      });
    } else {
      var _params3 = {
        // name:'',
        worktime_define: data.work,
        overtime_type: data.type,
        overtime_money: data.dayAddWork,
        money: data.money,
        overtime: data.day,
        id: data.id
        // type: 'wage'//后端说修改type传这个
      };
      (0, _index.bkupdateWageAction)(_params3).then(function (res) {
        if (res.code === 200) {
          bkWageStandGetWage();
        } else {
          (0, _index3.default)(res.msg);
          return;
        }
        setWageStandardDisplay(false);
      });
    }
  };
  // 切换时间还是天
  var handleWageStandardRadio = function handleWageStandardRadio(e) {
    var data = JSON.parse(JSON.stringify(wageStandard));
    data.type = e.id;
    var arr = data.data.map(function (v) {
      if (e.id === v.id) {
        v.click = true;
      } else {
        v.click = false;
      }
      return v;
    });
    data.data = arr;
    setWageStandard(data);
  };
  // 修改
  var handleEditWages = function handleEditWages(v, type) {
    // 判断是修改标准还是修改已有人的工资标准
    setState(type);
    //判断不是新增
    setAddStandard(0);
    setWageStandardDisplay(true);
    setWagesModalDisplay(false);
    var data = JSON.parse(JSON.stringify(wageStandard));
    data.work = v.worktime_define;
    data.money = v.money;
    data.addWork = v.overtime_money;
    data.state = 1;
    data.id = v.id;
    data.group_info = v.groupInfo;
    data.type = v.overtime_type;
    data.day = v.overtime;
    for (var i = 0; i < data.data.length; i++) {
      if (parseInt(v.overtime_type) == data.data[i].id) {
        data.data[i].click = true;
      } else {
        data.data[i].click = false;
      }
    }
    setWageStandard(data);
  };
  // 修改已定义工资标准
  var handleEditWageStandard = function handleEditWageStandard() {
    var item = JSON.parse(JSON.stringify(wageStandard));
    var params = {
      id: item.id,
      group_info: groupInfo,
      worktime_define: item.work,
      overtime_type: item.type,
      overtime: item.day,
      overtime_money: item.dayAddWork,
      money: item.money,
      type: 'wage' //后端说修改type传这个
    };
    (0, _index.bkUpdateWorkerAction)(params).then(function (res) {
      if (res.code === 200) {
        bkGetWorkerWage();
        setWagesModalDisplay(true);
        setWageStandardDisplay(false);
      } else {
        (0, _index3.default)(res.msg);
      }
    });
  };
  // 修改工资tab
  var handleAtSwitch = function handleAtSwitch(e) {
    if (e === 0) {
      setTab(1);
    } else {
      setTab(0);
    }
  };
  // 删除项目
  var handleDelProject = function handleDelProject(id) {
    var params = {
      ids: id
    };
    _taroWeapp2.default.showModal({
      title: '提示',
      content: '确认删除',
      showCancel: true,
      success: function success(res) {
        if (res.confirm == true) {
          (0, _index.bkDeleteprojectTeamAction)(params).then(function (res) {
            if (res.code === 200) {
              bkGetProjectTeam();
            } else {
              (0, _index3.default)(res.msg);
            }
          });
        }
      }
    });
  };
  // 确认修改项目
  var handleEditProject = function handleEditProject() {
    var data = JSON.parse(JSON.stringify(editProjectData));
    var params = {
      group_info: data.group_info,
      team_name: data.team_name,
      group_name: data.group_name
    };
    (0, _index.bkUpdateProjectTeamAction)(params).then(function (res) {
      if (res.code === 200) {
        setEditProjectDisplay(false);
        bkGetProjectTeam();
      } else if (res.code === 400) {
        (0, _index3.default)(res.msg);
        return;
      }
    });
  };
  // 修改项目弹框
  var handleEditProjectModal = function handleEditProjectModal(v) {
    setEditProjectDisplay(true);
    var data = JSON.parse(JSON.stringify(editProjectData));
    data.group_info = v.child[0].pid + ',' + v.child[0].id;
    data.team_name = v.child[0].name;
    data.group_name = v.name;
    setEditProjectData(data);
  };
  // 修改项目组输入框
  var handleEditProjectData = function handleEditProjectData(type, e) {
    var data = JSON.parse(JSON.stringify(editProjectData));
    data[type] = e.detail.value;
    setEditProjectData(data);
  };
  // 给工人设置标准
  var handleSetWagesModal = function handleSetWagesModal() {
    if (!templateId) {
      (0, _index3.default)('请选择模板');
      return;
    }
    var worker_ids = [];
    for (var i = 0; i < setWorkList.length; i++) {
      if (setWorkList[i].click) {
        worker_ids.push(setWorkList[i].id);
      }
    }
    var params = {
      worker_ids: worker_ids.toString(),
      wage_id: templateId,
      group_info: groupInfo
    };
    (0, _index.bkSetWorkerMoneyByWageAction)(params).then(function (res) {
      if (res.code === 200) {
        // // 给设置模板的设置为已经设置模板
        var data = JSON.parse(JSON.stringify(workerItem));
        for (var _i10 = 0; _i10 < data.length; _i10++) {
          for (var j = 0; j < worker_ids.length; j++) {
            if (data[_i10].id == worker_ids[j]) {
              data[_i10].set = true;
              data[_i10].del = false;
            }
          }
        }
        setWorkerItem(data);
        bkGetWorkerWage();
        setWagesModalDisplay(false);
      } else {
        (0, _index3.default)(res.msg);
        return;
      }
    });
  };
  // 选择工人
  var handleWagesList = function handleWagesList(v) {
    var data = JSON.parse(JSON.stringify(setWorkList));
    for (var i = 0; i < data.length; i++) {
      if (v.id === data[i].id) {
        data[i].click = !data[i].click;
      }
    }
    var clickData = [];
    for (var _i11 = 0; _i11 < data.length; _i11++) {
      if (data[_i11].click) {
        clickData.push(data[_i11]);
      }
    }
    setClickModalNum(clickData.length);
    setSetWorkList(data);
  };
  // 选模板
  var handleCheckboxStandard = function handleCheckboxStandard(v) {
    var data = JSON.parse(JSON.stringify(standard));
    for (var i = 0; i < data.length; i++) {
      if (v.id === data[i].id) {
        data[i].click = true;
        setTemplateId(v.id);
      } else {
        data[i].click = false;
      }
    }
    setStandard(data);
  };
  // 选择工人
  var handleWorkerItem = function handleWorkerItem(v) {
    var modelData = JSON.parse(JSON.stringify(model));
    if (!modelData.name) {
      (0, _index3.default)('请先选择项目');
      return;
    }
    var data = JSON.parse(JSON.stringify(workerItem));
    for (var i = 0; i < data.length; i++) {
      if (v.id === data[i].id) {
        if (v.set) {
          data[i].click = !data[i].click;
        } else {
          handleOpenWagesModal();
        }
      }
    }
    var numData = [];
    for (var _i12 = 0; _i12 < data.length; _i12++) {
      if (data[_i12].click) {
        numData.push(data[_i12]);
      }
    }
    setClickNum(numData.length);
    setWorkerItem(data);
  };
  // 成员全选
  var handleAllChange = function handleAllChange() {
    var data = JSON.parse(JSON.stringify(workerItem));
    var Itme = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].set) {
        Itme.push(data[i]);
        data[i].click = true;
      } else {
        (0, _index3.default)('还有人未设置工资标准');
      }
    }
    setWorkerItem(data);
    setClickNum(Itme.length);
  };
  // 长按
  var handleLongClick = function handleLongClick() {
    setWageStandardDisplay(true);
  };
  // 全选
  var handleAllClick = function handleAllClick() {
    var data = JSON.parse(JSON.stringify(setWorkList));
    for (var i = 0; i < data.length; i++) {
      data[i].click = true;
    }
    ;
    setSetWorkList(data);
    setClickModalNum(data.length);
  };
  // 切换包工类型
  var handleRadio = function handleRadio(v) {
    var data = JSON.parse(JSON.stringify(contractorArr.item));
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === v.id) {
        data[i].click = true;
        setContractor(v.id);
      } else {
        data[i].click = false;
      }
    }
    setContractorArr({ item: data });
  };
  // 跳转
  var userRouteJump = function userRouteJump(url) {
    _taroWeapp2.default.navigateTo({
      url: url
    });
  };
  // 选择工人添加，没有选择项目无法选择
  var handleAdd = function handleAdd() {
    if (!model.name) {
      (0, _index3.default)('请选择项目');
      return;
    }
    bkGetWorker();
    // setRefresh(true)
    userRouteJump('/pages/addTeamMember/index?groupInfo=' + groupInfo);
  };
  return {
    model: model,
    project: project,
    setModel: setModel,
    setProject: setProject,
    handleInput: handleInput,
    handleAddProject: handleAddProject,
    workOvertimeDisplay: workOvertimeDisplay,
    handleworkOvertime: handleworkOvertime,
    setWorkOvertimeDisplay: setWorkOvertimeDisplay,
    workingHoursDisplay: workingHoursDisplay,
    setWorkingHoursDisplay: setWorkingHoursDisplay,
    timeType: timeType,
    handleWorkingHours: handleWorkingHours,
    addWorkArr: addWorkArr,
    timeArr: timeArr,
    handleWorkOvertimeOk: handleWorkOvertimeOk,
    company: company,
    handleQuantities: handleQuantities,
    unit: unit,
    quantitiesDisplay: quantitiesDisplay,
    setQuantitiesDisplay: setQuantitiesDisplay,
    borrowing: borrowing,
    setBorrowing: setBorrowing,
    handleRadioBorrowing: handleRadioBorrowing,
    workerItem: workerItem,
    setWorkerItem: setWorkerItem,
    handleEstablish: handleEstablish,
    addMemberDisplay: addMemberDisplay,
    setAddMemberDisplay: setAddMemberDisplay,
    handleDel: handleDel,
    handleDelList: handleDelList,
    delType: delType,
    setDeldelType: setDeldelType,
    handleAddStandard: handleAddStandard,
    wagesModalDisplay: wagesModalDisplay,
    setWagesModalDisplay: setWagesModalDisplay,
    wageStandardDisplay: wageStandardDisplay,
    setWageStandardDisplay: setWageStandardDisplay,
    wageStandard: wageStandard,
    handleWageStandard: handleWageStandard,
    handlePreservation: handlePreservation,
    recorderTypeArr: recorderTypeArr,
    setRecorderTypeArr: setRecorderTypeArr,
    handleCalendar: handleCalendar,
    projectArr: projectArr,
    handleProject: handleProject,
    show: show,
    setShow: setShow,
    workerList: workerList,
    setWorkerList: setWorkerList,
    handleCheckbox: handleCheckbox,
    memberList: memberList,
    setMemberList: setMemberList,
    storagelist: storagelist,
    setStoragelist: setStoragelist,
    handleStart: handleStart,
    standard: standard,
    handleAddWage: handleAddWage,
    handleWageStandardRadio: handleWageStandardRadio,
    handleOpenWagesModal: handleOpenWagesModal,
    moneyList: moneyList,
    handleEditWages: handleEditWages,
    handleEditWageStandard: handleEditWageStandard,
    tab: tab,
    handleAtSwitch: handleAtSwitch,
    handleDelProject: handleDelProject,
    editProjectDisplay: editProjectDisplay,
    setEditProjectDisplay: setEditProjectDisplay,
    handleEditProject: handleEditProject,
    handleEditProjectModal: handleEditProjectModal,
    editProjectData: editProjectData,
    handleEditProjectData: handleEditProjectData,
    handleSetWagesModal: handleSetWagesModal,
    handleWagesList: handleWagesList,
    setWorkList: setWorkList,
    setSetWorkList: setSetWorkList,
    handleCheckboxStandard: handleCheckboxStandard,
    groupInfo: groupInfo,
    image: image,
    setImage: setImage,
    bkGetWorker: bkGetWorker,
    contractorArr: contractorArr,
    setContractorArr: setContractorArr,
    num: num,
    handleWorkerItem: handleWorkerItem,
    timeData: timeData,
    setTimeData: setTimeData,
    handleAllChange: handleAllChange,
    clickNum: clickNum,
    clickModalNum: clickModalNum,
    refresh: refresh,
    setRefresh: setRefresh,
    handleLongClick: handleLongClick,
    identity: identity,
    setIdentity: setIdentity,
    foreman: foreman,
    foremanTitle: foremanTitle,
    handleAllClick: handleAllClick,
    setContractor: setContractor,
    handleRadio: handleRadio,
    contractor: contractor,
    handleAdd: handleAdd
  };
}

/***/ }),

/***/ "./src/pages/flowingWater/index.scss":
/*!*******************************************!*\
  !*** ./src/pages/flowingWater/index.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/flowingWater/index.tsx":
/*!******************************************!*\
  !*** ./src/pages/flowingWater/index.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=PAGE& */ "./src/pages/flowingWater/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=PAGE& */ "./src/pages/flowingWater/index.tsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/flowingWater/index.tsx?taro&type=script&parse=PAGE&":
/*!***********************************************************************!*\
  !*** ./src/pages/flowingWater/index.tsx?taro&type=script&parse=PAGE& ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/flowingWater/index.tsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/flowingWater/index.tsx?taro&type=template&parse=PAGE&":
/*!*************************************************************************!*\
  !*** ./src/pages/flowingWater/index.tsx?taro&type=template&parse=PAGE& ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/flowingWater/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/pages/notepad/index.scss":
/*!**************************************!*\
  !*** ./src/pages/notepad/index.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/notepad/index.tsx":
/*!*************************************!*\
  !*** ./src/pages/notepad/index.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=PAGE& */ "./src/pages/notepad/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=PAGE& */ "./src/pages/notepad/index.tsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/notepad/index.tsx?taro&type=script&parse=PAGE&":
/*!******************************************************************!*\
  !*** ./src/pages/notepad/index.tsx?taro&type=script&parse=PAGE& ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/notepad/index.tsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/notepad/index.tsx?taro&type=template&parse=PAGE&":
/*!********************************************************************!*\
  !*** ./src/pages/notepad/index.tsx?taro&type=template&parse=PAGE& ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./index.tsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=/Users/zhangyibo/jgjz/jigongjizhang/Bookkeeping/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/notepad/index.tsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_file_loader_dist_cjs_js_name_path_name_wxml_context_Users_zhangyibo_jgjz_jigongjizhang_Bookkeeping_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_index_tsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/utils/api/index.ts":
/*!********************************!*\
  !*** ./src/utils/api/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bkSetWorkerIdentityWageUrl = exports.bkUpdateBusinessNewUrl = exports.bkSetGroupLeaderUrl = exports.bkGetCodeUrl = exports.bkGetShareExcelDataUrl = exports.bkAddWorkerInGroupUrl = exports.updateBusinessUrl = exports.bkBusinessOneUrl = exports.bkupdateWageUrl = exports.bkSetWorkerMoneyByWageUrl = exports.bkUpdateProjectTeamUrl = exports.bkDeleteprojectTeamUrl = exports.bkUpdateWorkerUrl = exports.bkDeleteBusinessUrl = exports.bkGetWorkerWageUrl = exports.bkAddWageUrl = exports.bkWageStandGetWageUrl = exports.bkAddBusinessUrl = exports.bkShareExcelurl = exports.bkgetExcelDataUrl = exports.bkDeleteRroupWorkerUrl = exports.bkGetWorkerUrl = exports.bkAddWorkerUrl = exports.bkAddProjectTeamUrl = exports.bkGetProjectTeamUrl = exports.bkBusinessUrl = exports.bkUpdateNotePadUrl = exports.bkDeleteNotePadUrl = exports.bkGetNotePadUrl = exports.bkAddNotepadUrl = exports.bkAddFeedbackUrl = exports.bkMemberAuthUrl = exports.bkIndexUrl = exports.GetUserInfo = exports.GetUserSessionKey = exports.jobRecommendListUrl = undefined;

var _index = __webpack_require__(/*! ../../config/index */ "./src/config/index.ts");

// 测试
var jobRecommendListUrl = exports.jobRecommendListUrl = _index.REQUESTURL + '/job/job-recommend-list/';
// 获取用户session_key
// 区分正式还是测试
var GetUserSessionKey = exports.GetUserSessionKey = _index.REQUESTURL + 'user/user-info/';
// 获取登陆账户
var GetUserInfo = exports.GetUserInfo = _index.REQUESTURL + 'bk-member/member-auth/';
// 首页
var bkIndexUrl = exports.bkIndexUrl = _index.REQUESTURL + 'bk-index/index/';
//流水列表
//授权时token验证并创建用户
var bkMemberAuthUrl = exports.bkMemberAuthUrl = _index.REQUESTURL + '/bk-member/auth/';
// 添加意见反馈
var bkAddFeedbackUrl = exports.bkAddFeedbackUrl = _index.REQUESTURL + 'bk-feedback/add-feedback/';
// 新增记事本
var bkAddNotepadUrl = exports.bkAddNotepadUrl = _index.REQUESTURL + '/bk-notepad/add-notepad/';
// 获取记事本记录
var bkGetNotePadUrl = exports.bkGetNotePadUrl = _index.REQUESTURL + 'bk-notepad/get-note-pad/';
// 删除记事本
var bkDeleteNotePadUrl = exports.bkDeleteNotePadUrl = _index.REQUESTURL + 'bk-notepad/delete-note-pad/';
// 修改
var bkUpdateNotePadUrl = exports.bkUpdateNotePadUrl = _index.REQUESTURL + '/bk-notepad/update-note-pad/';
// 流水
var bkBusinessUrl = exports.bkBusinessUrl = _index.REQUESTURL + '/bk-bookkeeping/get-bk-business/';
// 项目列表
var bkGetProjectTeamUrl = exports.bkGetProjectTeamUrl = _index.REQUESTURL + 'bk-project-team/get-project-team/';
// 添加项目班组
var bkAddProjectTeamUrl = exports.bkAddProjectTeamUrl = _index.REQUESTURL + '/bk-project-team/add-project-team/';
// 添加工人
var bkAddWorkerUrl = exports.bkAddWorkerUrl = _index.REQUESTURL + '/bk-worker/add-worker/';
// 获取工人
var bkGetWorkerUrl = exports.bkGetWorkerUrl = _index.REQUESTURL + 'bk-worker/get-workers/';
// 删除工人
var bkDeleteRroupWorkerUrl = exports.bkDeleteRroupWorkerUrl = _index.REQUESTURL + '/bk-worker/delete-group-worker/';
// excel数据
var bkgetExcelDataUrl = exports.bkgetExcelDataUrl = _index.REQUESTURL + '/bk-bookkeeping/get-excel-data/';
// 导出excel数据
var bkShareExcelurl = exports.bkShareExcelurl = _index.REQUESTURL + '/bk-bookkeeping/share-excel/';
// 记工点工
var bkAddBusinessUrl = exports.bkAddBusinessUrl = _index.REQUESTURL + 'bk-bookkeeping/add-business/';
// 工资标准列表
var bkWageStandGetWageUrl = exports.bkWageStandGetWageUrl = _index.REQUESTURL + 'bk-wage-stand/get-wage/';
// 添加工资标准
var bkAddWageUrl = exports.bkAddWageUrl = _index.REQUESTURL + 'bk-wage-stand/add-wage/';
// 获取已经设置工资标准
var bkGetWorkerWageUrl = exports.bkGetWorkerWageUrl = _index.REQUESTURL + 'bk-worker/get-worker-wage/';
// 流水删除
var bkDeleteBusinessUrl = exports.bkDeleteBusinessUrl = _index.REQUESTURL + 'bk-bookkeeping/delete-business/';
//修改工资标准
var bkUpdateWorkerUrl = exports.bkUpdateWorkerUrl = _index.REQUESTURL + 'bk-worker/update-worker/';
// 删除项目组
var bkDeleteprojectTeamUrl = exports.bkDeleteprojectTeamUrl = _index.REQUESTURL + 'bk-project-team/delete-project-team/';
// 修改项目组
var bkUpdateProjectTeamUrl = exports.bkUpdateProjectTeamUrl = _index.REQUESTURL + 'bk-project-team/update-project-team/';
// 给工人增加标准
var bkSetWorkerMoneyByWageUrl = exports.bkSetWorkerMoneyByWageUrl = _index.REQUESTURL + '/bk-worker/set-worker-money-by-wage/';
// 修改工资标准
var bkupdateWageUrl = exports.bkupdateWageUrl = _index.REQUESTURL + 'bk-wage-stand/update-wage/';
// 获取单个流水
var bkBusinessOneUrl = exports.bkBusinessOneUrl = _index.REQUESTURL + 'bk-bookkeeping/get-bk-business-one/';
// 修改记工
var updateBusinessUrl = exports.updateBusinessUrl = _index.REQUESTURL + '/bk-bookkeeping/update-business/';
// 给组里天加工人
var bkAddWorkerInGroupUrl = exports.bkAddWorkerInGroupUrl = _index.REQUESTURL + '/bk-worker/add-worker-in-group/';
// 分享获取考勤表
var bkGetShareExcelDataUrl = exports.bkGetShareExcelDataUrl = _index.REQUESTURL + '/bk-bookkeeping/get-share-excel-data';
// 验证码
var bkGetCodeUrl = exports.bkGetCodeUrl = _index.REQUESTURL + 'index/get-code/';
// 设置班组长
var bkSetGroupLeaderUrl = exports.bkSetGroupLeaderUrl = _index.REQUESTURL + '/bk-project-team/set-group-leader/';
// 云彩
var bkUpdateBusinessNewUrl = exports.bkUpdateBusinessNewUrl = _index.REQUESTURL + '/bk-bookkeeping/update-business-new/';
// 工人身份设置自己的工资标准
var bkSetWorkerIdentityWageUrl = exports.bkSetWorkerIdentityWageUrl = _index.REQUESTURL + 'bk-worker/set-worker-identity-wage/';

/***/ }),

/***/ "./src/utils/msg/index.ts":
/*!********************************!*\
  !*** ./src/utils/msg/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errMsg = errMsg;
exports.default = Msg;
exports.ShowActionModal = ShowActionModal;
exports.getdate = getdate;
exports.getTime = getTime;
exports.timestampToTime = timestampToTime;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function errMsg() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  _taroWeapp2.default.atMessage({
    'message': msg,
    'type': 'error'
  });
}
function Msg(msg) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

  _taroWeapp2.default.showToast({
    title: msg,
    icon: 'none',
    duration: duration
  });
}
function ShowActionModal(data) {
  var _data$title = data.title,
      title = _data$title === undefined ? '温馨提示' : _data$title,
      _data$confirmText = data.confirmText,
      confirmText = _data$confirmText === undefined ? '确定' : _data$confirmText,
      msg = data.msg,
      _success = data.success;

  _taroWeapp2.default.showModal({
    title: title,
    content: typeof data === 'string' ? data : msg,
    showCancel: false,
    confirmText: confirmText,
    success: function success() {
      _success && _success();
    }
  });
}
// 月年
function getdate(time) {
  var now = new Date(time);
  var times = now.getMonth() + 1 + "月" + now.getDate() + '日';
  return times;
}
// 年月日
function getTime(time) {
  var now = new Date(time);
  var times = now.getFullYear() + (now.getMonth() + 1) + now.getDate();
  console.log(times, '11111');
  return times;
}
// 
function timestampToTime(timestamp) {
  var date = new Date(parseInt(timestamp)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  console.log(date, '31312321');
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + ':';
  var m = (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) + ':';
  var s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
  return Y + M + D + h + m + s;
}

/***/ }),

/***/ "./src/utils/request/index.ts":
/*!************************************!*\
  !*** ./src/utils/request/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.doRequestAction = doRequestAction;
exports.resumesComplainAction = resumesComplainAction;
exports.getUserSessionKeyAction = getUserSessionKeyAction;
exports.GetUserInfoAction = GetUserInfoAction;
exports.bkIndexAction = bkIndexAction;
exports.bkMemberAuthAction = bkMemberAuthAction;
exports.bkAddFeedbackAction = bkAddFeedbackAction;
exports.bkAddNotepadAction = bkAddNotepadAction;
exports.bkGetNotePadAction = bkGetNotePadAction;
exports.bkDeleteNotePadAction = bkDeleteNotePadAction;
exports.bkUpdateNotePadAction = bkUpdateNotePadAction;
exports.bkBusinessAction = bkBusinessAction;
exports.bkGetProjectTeamAction = bkGetProjectTeamAction;
exports.bkAddProjectTeamAction = bkAddProjectTeamAction;
exports.bkAddWorkerActiion = bkAddWorkerActiion;
exports.bkGetWorkerAction = bkGetWorkerAction;
exports.bkDeleteRroupWorkerAction = bkDeleteRroupWorkerAction;
exports.bkgetExcelDataAction = bkgetExcelDataAction;
exports.bkShareExcelAction = bkShareExcelAction;
exports.bkAddBusinessAction = bkAddBusinessAction;
exports.bkWageStandGetWageAction = bkWageStandGetWageAction;
exports.bkAddWageAction = bkAddWageAction;
exports.bkGetWorkerWageAction = bkGetWorkerWageAction;
exports.bkDeleteBusinessAction = bkDeleteBusinessAction;
exports.bkUpdateWorkerAction = bkUpdateWorkerAction;
exports.bkDeleteprojectTeamAction = bkDeleteprojectTeamAction;
exports.bkUpdateProjectTeamAction = bkUpdateProjectTeamAction;
exports.bkSetWorkerMoneyByWageAction = bkSetWorkerMoneyByWageAction;
exports.bkupdateWageAction = bkupdateWageAction;
exports.bkBusinessOneAction = bkBusinessOneAction;
exports.updateBusinessAction = updateBusinessAction;
exports.bkAddWorkerInGroupAction = bkAddWorkerInGroupAction;
exports.bkGetShareExcelDataAction = bkGetShareExcelDataAction;
exports.bkGetCodeAction = bkGetCodeAction;
exports.bkSetGroupLeaderAction = bkSetGroupLeaderAction;
exports.bkUpdateBusinessNewAction = bkUpdateBusinessNewAction;
exports.bkSetWorkerIdentityWageAction = bkSetWorkerIdentityWageAction;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _index = __webpack_require__(/*! ../msg/index */ "./src/utils/msg/index.ts");

var _index2 = _interopRequireDefault(_index);

var _store = __webpack_require__(/*! ../../config/store */ "./src/config/store.ts");

var _index3 = __webpack_require__(/*! ../api/index */ "./src/utils/api/index.ts");

var api = _interopRequireWildcard(_index3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 请求失败提示信息
function requestShowToast(show) {
  if (show) {
    setTimeout(function () {
      (0, _index2.default)('网络错误，请求失败');
    }, 200);
  }
}
// 获取header请求头信息
function getRequestHeaderInfo() {
  // 获取用户信息
  var userInfo = _taroWeapp2.default.getStorageSync(_store.UserInfo);
  var requestHeader =
  // userInfo.login ? 
  {
    'content-type': 'application/x-www-form-urlencoded',
    mid: userInfo.userId,
    token: userInfo.token,
    time: userInfo.tokenTime,
    uuid: userInfo.uuid
  };
  // : {
  //     'content-type': 'application/x-www-form-urlencoded',
  //   }
  return requestHeader;
}
// 配置默认请求参数
var defaultRequestData = {
  url: '',
  method: 'GET',
  header: getRequestHeaderInfo(),
  data: {},
  loading: true,
  title: '数据加载中...',
  failToast: true
};
// 全局通用请求方法
function doRequestAction(reqData) {
  var req = _extends({}, defaultRequestData, reqData);
  if (req.loading) {
    _taroWeapp2.default.showLoading({
      title: req.title
    });
  }
  var data = _extends({}, req.data, { wechat_token: 'jigong' });
  // 获取用户信息
  var userInfo = _taroWeapp2.default.getStorageSync(_store.UserInfo);
  // 获取存入的公用内容
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  // const useSelectorItem = useSelector<any, any>(state => state)
  if (userInfo) {
    if (req.method === 'POST' && userInfo.login) {
      data.userId = userInfo.userId;
      data.token = userInfo.token;
      data.tokenTime = userInfo.tokenTime;
      data.identity = type;
    } else {
      data.userId = userInfo.userId;
      data.token = userInfo.token;
      data.tokenTime = userInfo.tokenTime;
      data.identity = type;
    }
  }
  return new Promise(function (resolve, reject) {
    _taroWeapp2.default.request({
      url: /^http(s?):\/\//.test(req.url) ? req.url : req.url,
      method: req.method,
      header: req.header,
      data: data,
      success: function success(res) {
        //console.log(res)
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          requestShowToast(req.failToast);
          reject(res);
        }
      },
      fail: function fail(e) {
        // todo requestShowToast(req.failToast)
        requestShowToast(req.failToast);
        reject(e);
      },
      complete: function complete() {
        if (req.loading) {
          _taroWeapp2.default.hideLoading();
        }
      }
    });
  });
}
// 测试
function resumesComplainAction(data) {
  return doRequestAction({
    url: api.jobRecommendListUrl,
    data: data
  });
}
// 用户授权-获取session_key
function getUserSessionKeyAction(code) {
  return doRequestAction({
    url: api.GetUserSessionKey + '?code=' + code + '&wechat_token=jigong',
    method: 'POST',
    data: {
      code: code
    }
  });
}
// 获取登陆账户
function GetUserInfoAction(data) {
  return doRequestAction({
    url: api.GetUserInfo,
    data: data
  });
}
// 首页
function bkIndexAction(data) {
  var userInfo = _taroWeapp2.default.getStorageSync(_store.UserInfo);
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  return doRequestAction({
    url: api.bkIndexUrl,
    header: {
      'content-type': 'application/json',
      mid: userInfo.userId,
      token: userInfo.token,
      time: userInfo.tokenTime,
      uuid: userInfo.uuid
    },
    data: data
  });
}
// 授权时token验证并创建用户
function bkMemberAuthAction(data) {
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkMemberAuthUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
//添加意见反馈
function bkAddFeedbackAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  data.identity = type;
  return doRequestAction({
    url: api.bkAddFeedbackUrl,
    method: 'POST',
    header: {
      // 'content-type': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 新增记事本
function bkAddNotepadAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkAddNotepadUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 获取记事本记录
function bkGetNotePadAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  data.identity = type;
  return doRequestAction({
    url: api.bkGetNotePadUrl,
    // header:{
    //   mid: midData.yupao_id,
    //   token: midData.sign.token,
    //   time: midData.sign.time,
    //   uuid: midData.uuid,
    // },
    header: {
      // 'content-type': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 删除记事本
function bkDeleteNotePadAction(data) {
  var id = data.id;
  // const ids = JSON.stringify(id)
  // 获取用户信息

  var userInfo = _taroWeapp2.default.getStorageSync(_store.UserInfo);
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkDeleteNotePadUrl + '?' + 'ids' + '=' + id,
    method: 'POST',
    // header:{
    //   'content-type':'application/json',
    //   mid: userInfo.userId,
    //   token: userInfo.token,
    //   time: userInfo.tokenTime,
    //   uuid: userInfo.uuid
    // },
    header: {
      'content-type': 'application/json',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 修改记事本
function bkUpdateNotePadAction(data) {
  var id = data.id;
  // 获取用户信息

  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  data.identity = type;
  return doRequestAction({
    url: api.bkUpdateNotePadUrl + '?id' + '=' + id,
    method: 'POST',
    header: {
      // 'content-type': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 流水
function bkBusinessAction(data) {
  var userInfo = _taroWeapp2.default.getStorageSync(_store.UserInfo);
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  data.identity = type;
  return doRequestAction({
    url: api.bkBusinessUrl,
    // header: {
    //   'content-type': 'application/json',
    //   mid: userInfo.userId,
    //   token: userInfo.token,
    //   time: userInfo.tokenTime,
    //   uuid: userInfo.uuid
    // },
    header: {
      'content-type': 'application/json',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 记工项目列表
function bkGetProjectTeamAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkGetProjectTeamUrl,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 添加项目班组
function bkAddProjectTeamAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkAddProjectTeamUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 添加工人
function bkAddWorkerActiion(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkAddWorkerUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 工人列表
function bkGetWorkerAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkGetWorkerUrl,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 删除
function bkDeleteRroupWorkerAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkDeleteRroupWorkerUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// excel数据
function bkgetExcelDataAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkgetExcelDataUrl,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 导出excel数据
function bkShareExcelAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  data.identity = type;
  return doRequestAction({
    url: api.bkShareExcelurl,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 记工记点
function bkAddBusinessAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkAddBusinessUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 记工按量包工
// export function bkDeleteGroupWorkerAction(data): Promise<Inter.bkBusinessType> {
//   let userInfo: User = Taro.getStorageSync(UserInfo)
//   data.identity = userInfo.type;
//   return doRequestAction({
//     url: api.bkDeleteGroupWorkerUrl,
//     data: data
//   })
// }
// 工资标准
function bkWageStandGetWageAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkWageStandGetWageUrl,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    }
  });
}
// 添加工资标准
function bkAddWageAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkAddWageUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 已设置工资
function bkGetWorkerWageAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  data.identity = type;
  return doRequestAction({
    url: api.bkGetWorkerWageUrl,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 流水删除
function bkDeleteBusinessAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkDeleteBusinessUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 修改工资工资标准
function bkUpdateWorkerAction(data) {
  var id = data.id;

  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  return doRequestAction({
    url: api.bkUpdateWorkerUrl + '?id=' + id,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 删除项目组
function bkDeleteprojectTeamAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkDeleteprojectTeamUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 修改项目
function bkUpdateProjectTeamAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  data.identity = type;
  return doRequestAction({
    url: api.bkUpdateProjectTeamUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 给工人设置工资标准
function bkSetWorkerMoneyByWageAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  data.identity = type;
  return doRequestAction({
    url: api.bkSetWorkerMoneyByWageUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 修改工资标准
function bkupdateWageAction(data) {
  var id = data.id;

  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  data.identity = type;
  return doRequestAction({
    url: api.bkupdateWageUrl + '?id=' + id,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 获取单个流水
function bkBusinessOneAction(data) {
  var id = data.id;

  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkBusinessOneUrl + '?id=' + id,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 修改记工
function updateBusinessAction(data) {
  var id = data.id;

  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  data.identity = type;
  return doRequestAction({
    url: api.updateBusinessUrl + '?id=' + id,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 给组里添加工人
function bkAddWorkerInGroupAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  data.identity = type;
  return doRequestAction({
    url: api.bkAddWorkerInGroupUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 分享获取考勤表
function bkGetShareExcelDataAction(data) {
  var type = _taroWeapp2.default.getStorageSync(_store.Type);
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  data.identity = type;
  var id = data.id;

  return doRequestAction({
    url: api.bkGetShareExcelDataUrl + '/id=' + id,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 验证码
function bkGetCodeAction(data) {
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkGetCodeUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 设置班组长
function bkSetGroupLeaderAction(data) {
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkSetGroupLeaderUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
//  云彩
function bkUpdateBusinessNewAction(data) {
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkUpdateBusinessNewUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}
// 工人身份设置自己的工资标准
function bkSetWorkerIdentityWageAction(data) {
  var midData = _taroWeapp2.default.getStorageSync(_store.MidData);
  return doRequestAction({
    url: api.bkSetWorkerIdentityWageUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  });
}

/***/ }),

/***/ "./src/utils/upload/index.tsx":
/*!************************************!*\
  !*** ./src/utils/upload/index.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UploadImgAction;
exports.CameraAndAlbum = CameraAndAlbum;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _store = __webpack_require__(/*! ../../config/store */ "./src/config/store.ts");

var _index = __webpack_require__(/*! ../../config/index */ "./src/config/index.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UploadImgAction() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _index.UPLOADIMGURL;

  var uploadUrl = url || _index.UPLOADIMGURL;
  return new Promise(function (resolve) {
    _taroWeapp2.default.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function success(res) {
        AppUploadImg(resolve, res, uploadUrl);
      }
    });
  });
}
function CameraAndAlbum() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _index.UPLOADIMGURL;

  return new Promise(function (resolve) {
    _taroWeapp2.default.showActionSheet({
      itemList: ['拍照', '从相册中选择']
    }).then(function (res) {
      var index = res.tapIndex;
      _taroWeapp2.default.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: index === 0 ? ['camera'] : ['album'],
        success: function success(res) {
          AppUploadImg(resolve, res, url);
        }
      });
    });
  });
}
function AppUploadImg(resolve, res) {
  var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _index.UPLOADIMGURL;

  var userInfo = _taroWeapp2.default.getStorageSync(_store.UserInfo);
  _taroWeapp2.default.showLoading({ title: '图片上传中' });
  _taroWeapp2.default.uploadFile({
    url: url,
    filePath: res.tempFilePaths[0],
    header: {
      userid: userInfo ? userInfo.userId : ''
    },
    name: 'file',
    success: function success(response) {
      var mydata = JSON.parse(response.data);
      // let resData = { local: response, remote: mydata}
      _taroWeapp2.default.showToast({
        title: mydata.errmsg,
        icon: "none",
        duration: 2000
      });
      if (mydata.errcode == "ok") {
        resolve(mydata);
      }
    },

    fail: function fail() {
      _taroWeapp2.default.showToast({
        title: "网络错误，上传失败！",
        icon: "none",
        duration: 2000
      });
    },
    complete: function complete() {
      _taroWeapp2.default.hideLoading();
    }
  });
}

/***/ })

}]);