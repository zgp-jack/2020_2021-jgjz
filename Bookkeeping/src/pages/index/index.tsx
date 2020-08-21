import Taro, { useEffect, useState, useDidShow, onAppShow } from '@tarojs/taro'
import { View, Text, Picker, ScrollView, Image } from '@tarojs/components'
import { bkIndexAction, bkMemberAuthAction, bkUpdateBusinessNewAction, bkGetProjectTeamAction, bkAddProjectTeamAction, appletJumpAction } from '../../utils/request/index';
import { useDispatch, useSelector } from '@tarojs/redux'
import { setContent } from '../../actions/content'
import CreateProject from '../../components/createProject';
import ProjectModal from '../../components/projectModal'
import { UserInfo, MidData, Type, CreationTime, NeverPrompt, IsLoginType, Tips, Res,IsShare } from '../../config/store'
import { setTypes } from '../../actions/type'
import { IMGCDNURL } from '../../config'
import { setFlowingWater } from '../../actions/flowingWater';
import { setNotepad  } from '../../actions/notepad'
import { setWorker } from '../../actions/workerList'
import { bkIndexTypeData } from '../../utils/request/index.d'
import Auth from '../../components/auth';
import { AtModal, AtBadge, AtNavBar } from "taro-ui"
import Msg from '../../utils/msg'
// import useNavInfo from '../../components/nav';
// import _ from 'lodash';
import { setClickTIme } from '../../actions/clickTIme'
import './index.scss'

let loginType = false;
let isJump = false;
let authType = true;
let jumType = false;
let ContentItem: bkIndexTypeData = {
  amount: {
    type: 0,
    unit_num: '0',
    count: 0,
    unit: '',
  },
  borrow: '',
  business_list: {
    code: 0,
    msg: '',
    data: [],
  },
  money: '',
  overtime: 0,
  work_time: 0,
  count_is_new: '',
  earliest_month: '',
  setLasted_business_identity: 0,
  lasted_business_identity: '',
} ;
// 设置新手指引图片
const Images = [
  {
    url: `${IMGCDNURL}noviceGuidance1.png`,
    id: 1
  },
  {
    url: `${IMGCDNURL}noviceGuidance2.png`,
    id: 2
  },
  {
    url: `${IMGCDNURL}noviceGuidance3.png`,
    id: 3
  },
  {
    url: `${IMGCDNURL}noviceGuidance4.png`,
    id: 4
  },
  {
    url: `${IMGCDNURL}noviceGuidance5.png`,
    id: 5
  },
  {
    url: `${IMGCDNURL}noviceGuidance6.png`,
    id: 6
  }
]
// export interface Item {

// }
export default function Index() {
  let identityType = '';
  const dispatch = useDispatch()
  const useSelectorItem = useSelector<any, any>(state => state)
  // 弹框内容
  const [model, setModel] = useState<any>({
    groupName: '',
    teamName: '',
  })
  // 授权
  // =====
  const [display, setDisplay] = useState<boolean>(false)
  const [vals, setVal] = useState<string>('')
  //获取当前时间
  const [time, setTime] = useState<string>('')
  // 当前月份
  const [newMonth, setNewMonth] = useState<string>('')
  //现在月份
  const [nowMonth, setNowMonth] = useState<string>('')
  //显示月份
  const [month, setMonth] = useState<string>('')
  // 记工时间
  const [start, setStart] = useState<string>('')
  // 结束时间
  const [end, setEnd] = useState<string>('')
  // 获取当前时间与当前是星期几
  const [week, setWeek] = useState<string>('')
  // 时间索引
  const [time_id, setTime_id] = useState<number[]>([0, 0])
  // 时间选择
  const [timeList, setTimeList] = useState<any[]>([])
  // 工人还是班长
  const [type, setType] = useState<number>(0)
  // 按量记
  const [measureType, setMeasureType] = useState<number>(0)
  // 数据列表
  const [data, setData] = useState<any[]>([{}, {}, {}])
  // 弹窗
  const [tips, setTips] = useState<boolean>(false);
  // 系统繁忙
  const [busy, setBusy] = useState<boolean>(false)
  // 身份弹框
  const [identity, setIdentity] = useState<boolean>(false)
  const [list, setList] = useState<any[]>([])
  // 云朵
  const [num, setNum] = useState<string>('0');
  const [newTime, setNewTime] = useState<string>('')
  // 数据
  const [item, setItem] = useState<bkIndexTypeData>({
    amount: {
      type: 0,
      unit_num: '0',
      count: 0,
      unit: '',
    },
    borrow: '',
    business_list: {
      code: 0,
      msg: '',
      data: [],
    },
    money: '',
    overtime: 0,
    work_time: 0,
    count_is_new: '',
    earliest_month: '',
    setLasted_business_identity: 0,
    lasted_business_identity: '',
  })
  const [image, setImage] = useState<any>(Images[0].url)
  // 设置不是第一次获取数据
  const [repeat, setRepeat] = useState<boolean>(false)
  // 班组长创建项目
  const [createProjectDisplay, setCreateProjectDisplay] = useState<boolean>(false)
  // 项目班组
  const [project, setProject] = useState<boolean>(false)
  // 关闭图片
  const [closeImage, setCloseImage] = useState<boolean>(true);
  // 是否显示云朵
  const [show, setShow] = useState<boolean>(false);
  // 工人转换提示
  const [prompt, setPrompt] = useState<boolean>(false)
  // 工人上次身份
  const [lasted_business_identity, setLasted_business_identity] = useState<string>('')
  // 身份弹框不再提醒
  const [neverPrompt, setNeverPrompt] = useState<boolean>(false)
  // 设置滑动状态
  const [slide, setSlide] = useState<boolean>(false);
  // 设置滑动值
  const [isScrollTop,setisScrollTop] = useState<number>(10);
  // 鱼泡网过来然后需要登录手机号
  const [loginPhone, setLoginPhone] = useState<boolean>(false)
  // 判断左边是否需要icon
  const [leftTime, setleftTime] = useState<boolean>(false)
  // 判断右边是否需要icon
  const [rightTime, setrightTime] = useState<boolean>(false)
  const [this_year_business_month, setBusiness_month] = useState<string>()
  // 今天
  const [toDay, setToDay] = useState<string>('')
  const [hidden, setHidden] = useState<boolean>(false)
  // 不请求
  const [noRequest, setNoRequest] = useState<boolean>(false)
  // 防止记工button多次点击
  const [ishandleJump,setishandleJump] = useState<boolean>(true)
  // 点击记工跳转到注册手机号
  // const [login,setLoginStatus] = useState<boolean>(false)
  const getDates = () => {
    const date = new Date().getDay();
    const time = new Date();
    const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    const week = weeks[date];
    const newTime = time.getFullYear() + '-' + addZero(time.getMonth() + 1) + '-' + addZero(time.getDate());
    const newMonth = time.getFullYear() + '-' + addZero(time.getMonth() + 1);
    // setTime(newTime);
    setNewTime(newTime)
    // 当前月份
    setNewMonth(newMonth)
    // 现在月份
    setNowMonth(newMonth)
    setToDay(newTime)
    setMonth(addZero(time.getMonth() + 1))
    // 先写死
    setStart(newTime)
    setEnd(newMonth)
    setWeek(week);
    return newMonth;
  }
  const addZero = (num) => {
    if (parseInt(num) < 10) {
      num = '0' + num;
    }
    return num;
  }
  const getAppShowData = ()=>{
    const data = Taro.getStorageSync(Res);
    if (data) {
      if (isJump)return;
      const e = data;
      console.log(e,'传过来的值')
      if (e.scene === 1037) {
        if (e.referrerInfo.extraData.userId && e.referrerInfo.extraData.token && e.referrerInfo.extraData.tokenTime && e.referrerInfo.extraData.userUuid) {
          // 验证有没有手机号
          let params = {
            userId: e.referrerInfo.extraData.userId,
            token: e.referrerInfo.extraData.token,
            tokenTime: e.referrerInfo.extraData.tokenTime
          }
          appletJumpAction(params).then(res => {
            console.log(res,'跳转获取的值')
            // 直接返回记工记账用户信息
            if (res.code == 200) {
              if (res.data) {
                let obj: any = {
                  sign: {},
                };
                obj = res.data;
                obj.userId = e.referrerInfo.extraData.userId;
                obj.token = e.referrerInfo.extraData.token;
                obj.tokenTime = e.referrerInfo.extraData.tokenTime;
                obj.uuid = e.referrerInfo.extraData.userUuid;
                obj.sign = {
                  token: e.referrerInfo.extraData.token,
                  time: e.referrerInfo.extraData.tokenTime
                }
                Taro.setStorageSync(MidData, obj);
                console.log(MidData,'设置MidData')
                // ==== 默认先写死
                Taro.setStorageSync(Type, res.data.lasted_business_identity);
                identityType = res.data.lasted_business_identity;
                isJump = true;
                jumType = true
                getData();
              }
              // 没有鱼泡账号
            } else if (res.code == 40001) {
              //  有鱼泡账号
            } else if (res.code == 40000) {
              let obj: any = {
                sign: {}
              }
              obj.userId = e.referrerInfo.extraData.userId;
              obj.token = e.referrerInfo.extraData.token;
              obj.tokenTime = e.referrerInfo.extraData.tokenTime;
              obj.uuid = e.referrerInfo.extraData.userUuid;
              obj.sign = {
                token: e.referrerInfo.extraData.token,
                time: e.referrerInfo.extraData.tokenTime
              }
              // 要存UserInfo
              Taro.setStorageSync(UserInfo, obj);
              let params = {
                mid: e.referrerInfo.extraData.userId,
              }
              bkMemberAuthAction(params).then(res => {
                if (res.code !== 200) {
                  Msg(res.msg);
                } else {
                  let midData = Taro.getStorageSync(UserInfo);
                  midData.worker_id = res.data.worker_id;
                  midData.yupao_id = res.data.yupao_id;
                  Taro.setStorageSync(MidData, midData);
                  getData();
                }
              })
            } else if (res.code == 40003) {

              let obj: any = {};
              obj.userId = e.referrerInfo.extraData.userId;
              obj.token = e.referrerInfo.extraData.token;
              obj.uuid = e.referrerInfo.extraData.userUuid;
              obj.sign = {
                token: e.referrerInfo.extraData.token,
                time: e.referrerInfo.extraData.tokenTime
              }
              obj.tokenTime = e.referrerInfo.extraData.tokenTime;
              Taro.setStorageSync(UserInfo, obj);
              // 设置点击直接跳转到注册手机号页面
              // setLoginStatus(true);
              // loginType = true;
              //   setDisplay(true)
              // // setLoginPhone(true)
              // console.log(3123213213)
              return;
              //console.log(login,'setlogin')
            }
          })
        }
      }
      return;
    }
  }
  useDidShow(() => {
    Taro.setStorageSync(IsShare,false)
    // setHidden(true)
    // setCloseImage(false)
    setShow(true);
    getAppShowData();
    const newTime = new Date().getTime() / 1000;
    let creationTime = Taro.getStorageSync(CreationTime);
    // const time = 
    // 七天显示内容
    const state = Taro.getStorageSync(Tips);
    let midData = Taro.getStorageSync(MidData);
    if (!state && midData) {
      if (creationTime && (creationTime + 86400 * 7) > newTime) {
        Taro.setStorageSync(Tips, true);
      }
      setPrompt(true)
    }
    let data = Taro.getStorageSync(IsLoginType);
    // return
    // setCloseImage(false);
    getDates();
    // const { appHeaderHeight } = UseNavInfo()
    // console.log(appHeadesrHeight,'appHeaderHeight')
    setSlide(false)
    setisScrollTop(0);
    let neverPromptType = Taro.getStorageSync(NeverPrompt);
    if (neverPromptType) {
      setNeverPrompt(true);
    }
    // 判断有midDat就取消授权
    if (midData) {
      setDisplay(false)
      loginType = false;
    }
    // 设置首页时间选择器时间
    // if (creationTime){
    //   // 开始时间
    //   let myDate = new Date(creationTime*1000);
    //   const nowY = myDate.getFullYear()-1;
    //   const nowM = myDate.getMonth();
    //   const time = nowY + '-' + nowM;
    //   setStart(time)
    //   console.log(nowY,'nowT')
    //   // 结束时间
    //   const date = new Date();
    //   const newMonth = date.getFullYear() + '-' + addZero(date.getMonth() + 1);
    //   setTime(newMonth);
    // }else{
    //   const date = new Date();
    //   const newMonth = date.getFullYear() + '-' + addZero(date.getMonth() + 1);
    //   const nowY = date.getFullYear() - 1;
    //   const nowM = date.getMonth();
    //   const time = nowY + '-' + nowM;
    //   setStart(time)
    //   setTime(newMonth);
    // }
    // 结束时间
    // const time = 
    // 清楚日历缓存
    dispatch(setClickTIme([]))
    //清楚
    dispatch(setNotepad({code:200,data:[],msg:'ok'}))
    dispatch(setWorker([]))
    dispatch(setFlowingWater([]))
    // 判断有没有用户信息没有就显示
    // 获取缓存信息
    let type = Taro.getStorageSync(Type);
    // 有就设置
    if (type) {
      setType(type)
    }
    let userInfo = Taro.getStorageSync(UserInfo);
    // =======
    // if (!userInfo) {
    //   setDisplay(false);
    //   return
    // } else {
    //   setDisplay(false)
    // }
    dispatch(setTypes(type))
    // getData();
    getData();
    let montime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(5, 7));
    const date = new Date();
    setVal(date.getFullYear() + "-" + addZero(date.getMonth() + 1));
    if (Number(this_year_business_month) == montime) {
      setleftTime(false);
    } else if(Number(this_year_business_month)<montime){
      setleftTime(true);
    }
    // let midParams = {
    //   mid: userInfo.userId,
    // }
    // 登陆了就获取信息
    // let midData = Taro.getStorageSync(MidData);
    // if (midData) {
    //   bkMemberAuthAction(midParams).then(res => {
    //     if (res.code !== 200) {
    //       Msg(res.msg)
    //     } else {
    //       console.log(res, 'ressssssssssss')
    //       let userInfo = Taro.getStorageSync(UserInfo)
    //       res.data.sign = {}
    //       res.data.sign.token = userInfo.token;
    //       res.data.sign.time = res.data.created_time;
    //       res.data.uuid = userInfo.uuid;
    //       // res.data.worker_id = res.data.worker_id;
    //       Taro.setStorageSync(MidData, res.data)
    //     }
    //   })
    // }
  })
  // 获取项目名称
  const bkGetProjectTeam = (dignity, state?: number) => {
    bkGetProjectTeamAction({}).then(res => {
      // 判断为0就出现新增弹框
      if (res.data.length === 0) {
        setishandleJump(true)
        setCreateProjectDisplay(true)
      } else {
        if (state) {
          Msg('开始为工人记工吧')
        }
        setishandleJump(true)
        userRouteJump(`/pages/recorder/index?type=${dignity}`)
      }
    })
  }
  // 获取首页数据
  const getData = (e?: string, type?: number) => {
    let isLoginType = Taro.getStorageSync(IsLoginType);
    // 判断如果有工人身份就隐藏新手指引
    console.log(isLoginType,'isLoginTypeisLoginType')
    console.log(identityType,'identityType')
    if (isLoginType == 1) {
      setHidden(true)
      setCloseImage(false)
    }
    if (identityType) {
      if (identityType == '0' ){
        setCloseImage(true)
      }
      Taro.setStorageSync(Type, identityType);
    }
    // 没有用户信息就默认设置为工人
    let midData = Taro.getStorageSync(MidData);
    console.log(midData,'midDatamidDatamidData')
    if(!midData){
      setleftTime(false);
      setrightTime(false)
    }
    let identity;
    if (type) {
      identity = type;
    } else {
      identity = Taro.getStorageSync(Type);
    }
    if (midData) {
      let type = Taro.getStorageSync(Type);
      if (!type || type === 0) {
        setIdentity(true)
        return
      } else {
        setType(type);
      }
    }
    // 判断选没有选择时间
    let changeTime;
    if (!e) {
      changeTime = getDates();
    } else {
      // console.log(2);
      // console.log(time,'time')
      changeTime = e;
      setNewTime(e);
      // 设置时间
      // const date = new Date(vals);
      // const newMonth = date.getFullYear() + '-' + addZero(date.getMonth() + 1);
      // console.log(newMonth,'newMonthnewMonthnewMonthnewMonth')
      // setStart(newMonth)
      // setEnd(newMonth)
    }
    let params = {
      time: changeTime,
      identity
    }
    console.log(midData,'内容midData')
    if (midData) {
      bkIndexAction(params).then(res => {
        console.log('请求')
        if (res.code === 200) {
          setNoRequest(true)
          setBusy(false)
          // if (isJump){
          //   dispatch(setContent(res.data))
          // }
          // ContentItem = res.data;
          console.log(res.data, 'res.datata')
          setItem(res.data);
          setNum(res.data.count_is_new);
          if (parseInt(res.data.count_is_new) == 0) {
            setShow(true)
          } else {
            setShow(false)
          }
          // 设置搜索开始结束时间
          // 设置最早时间
          const date = new Date();
          const newMonth = date.getFullYear() + '-' + addZero(date.getMonth() + 1);
          let montime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(5, 7));
          let yeartime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(0, 4));
          if (res.data.earliest_month) {
            setStart(yeartime+'-'+res.data.this_year_business_month);
            if(!e){
              if(Number(res.data.this_year_business_month)==montime){
                setleftTime(false);
                setrightTime(false);
              }else{
                setleftTime(true);
                setrightTime(false);
              }
            }
          } else {
            setleftTime(false);
            setrightTime(false);
            setStart(yeartime + '-' + montime)
          }
          // 最晚时间
          setEnd(newMonth)
          if (Array.isArray(res.data.business_list.data)) {
            if (res.data.business_list.data) {
              setList(res.data.business_list.data)
            } else {
              setList([])
            }
          } else if (res.data.business_list.data.constructor === Object) {
            if (res.data.business_list.data.data[0].arr) {
              setList(res.data.business_list.data.data[0].arr)
            } else {
              setList([])
            }
          }
          // 存在缓存里用来判断是否新增时间
          setLasted_business_identity(res.data.lasted_business_identity);
          // 获取信息
          // 判断是班组长的时候出现弹框
          // let type = Taro.getStorageSync(Type);
          // if (type === 1) {
          //   bkGetProjectTeam()
          // }
        } else {
          Msg(res.msg);
        }
      })
      .catch((e)=>{
        if(e){
          setBusy(true)
          setleftTime(false);
          setrightTime(false);
          setNum('')
        }
        console.log(e)
      })
    }
  }
  // 选择时间
  const handleChangeTime = (e) => {
    if (busy) return;
    let midData = Taro.getStorageSync(MidData);
    if (!midData) {
      setDisplay(true)
      return;
    }
    setVal(e.detail.value)
    setTime(e.detail.value);
    setRepeat(true);
    getData(e.detail.value);
    setMonth(e.detail.value.substring(e.detail.value.length - 2))
    changeIcon(e.detail.value);
  }
  // Icon图片显示
  const changeIcon = (e) => {
    let startmon = parseInt(start.split('-')[1]);
    let montime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(5, 7));
    if (startmon == montime) {
      setleftTime(false);
      setrightTime(false);
    } else {
      if (Number(e.split('-')[1]) == startmon) {
        setleftTime(false);
        setrightTime(true);
      } else if (Number(e.split('-')[1]) == montime) {
        setleftTime(true);
        setrightTime(false);
      } else {
        setleftTime(true);
        setrightTime(true);
      }
    }
  }
  // 点击提示
  const handelTps = () => {
    let midData = Taro.getStorageSync(MidData);
    if (!midData) {
      Msg('放心使用，免费记工，数据永远不会丢失哟~');
      return;
    }
    let params = {
      identity: type
    }
    bkUpdateBusinessNewAction(params).then(res => {
      if (res.code === 200) {
        Msg(`您完成了[ ${res.data} ]条记工信息的备份，数据安全不丢失~`);
        setShow(true)
      } else {
        Msg('放心使用，免费记工，数据永远不会丢失哟~')
      }
    })
  }
  // 切换角色
  const handelChange = (e, type?: boolean) => {
    let midData = Taro.getStorageSync(MidData);
    if (!midData) {
      setleftTime(false);
      setrightTime(false);
      setDisplay(true)
      return;
    }
    // // 判断
    // if (neverPrompt) {
    //   return;
    // }
    // 判断点击了永不提示
    // console.log(neverPrompt,'neverPrompt')
    // if (lasted_business_identity !== 0 && type != lasted_business_identity && !neverPrompt){
    //   console.log(type,'type');
    //   console.log(lasted_business_identity,'lasted_business_identity')
    //     setTips(true)
    //     return;
    // }else{
    let msg = e === 2 ? '开始为自己记工吧' : '开始为工人记工吧'
    setType(e);
    setrightTime(false);
    const date = new Date();
    setVal(date.getFullYear() + "-" + addZero(date.getMonth() + 1));
    Taro.setStorageSync(Type, e);
    if (!type) {
      Msg(msg)
      setTimeout(() => {
        getData();
      }, 1000)
    }
    // return;
    // }
  }
  const getNextPageData = () => {
    // console.log(31231)
    if (!slide) {
      setSlide(true);
      setisScrollTop(10);
      userRouteJump(`/pages/flowingWater/index`)
    }
  }
  // 跳转
  const userRouteJump = (url: string) => {
    Taro.navigateTo({
      url: url
    })
  }
  // 弹窗选择
  const handleType = (state: number) => {
    let dignity;
    if (type === 1) {
      dignity = 2
      // 不切换
    } else {
      dignity = 1
    }
    // dignity ===2 为班组长
    // 切换
    if (state === 1) {
      // 班组长
      if (dignity == 1) {
        setTips(false)
        setType(dignity);
        Taro.setStorageSync(Type, dignity);
        // Msg('开始为工人记工吧')
        setTimeout(() => {
          bkGetProjectTeam(1, 1)
        }, 1000)
        return;
      }
      let msg = dignity === 1 ? '开始为自己记工吧' : '开始为工人记工吧';
      Msg(msg)
      // return;
      setType(dignity);
      Taro.setStorageSync(Type, dignity);
      // userRouteJump(`/pages/recorder/index?type=${dignity}`)
      // setTimeout(() => {
      //   getData();
      // }, 500)
      // 切换的时候如果是班组要判断有没有项目
    } else if (state === 2) {
      Taro.setStorageSync(NeverPrompt, true);
      setNeverPrompt(true)
      // 切换的时候如果是班组要判断有没有项目
    } else {
      // 班组长
      if (dignity === 2) {
        bkGetProjectTeam(dignity);
      } else {
        userRouteJump(`/pages/recorder/index?type=${dignity}`)
      }
      setTips(false)
      return;
    }
    // 切换后跳转页面
    userRouteJump(`/pages/recorder/index?type=${dignity}`)
    setTips(false)
  }
  // 返回鱼泡网
  const handleGoback = () => {
    // Taro.navigateBackMiniProgram({
    //   extraData: {
    //     foo: 'bar'
    //   },
    //   success: function (res) {
    //     // 返回成功
    //   }
    // })
    if (busy) {
      Msg('网络错误，请求失败')
      return
    }
    //**重点**要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版
    // ========发布正式要修改
    Taro.navigateToMiniProgram({
      appId: 'wx456feacb0e86162f',
      path: '/pages/index/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'trial',
      success(res) {
        // 打开成功
      }
    })
  }
  // 点击图片
  const hanleImage = (v: any) => {
    let url;
    if (v !== Images[Images.length - 1].url) {
      for (let i = 0; i < Images.length; i++) {
        if (v === Images[i].url) {
          url = Images[i + 1].url
        }
      }
    } else {
      Taro.setStorageSync(IsLoginType, 2);
      // 关闭
      setCloseImage(true);
      setHidden(false)
      // 并开启选择身份
      getData();
    }
    setImage(url)
  }
  // 关闭授权
  const handleClose = (e) => {
    setDisplay(e);
  }
  const handleCallback = () => {
    // userRouteJump(`/pages/login/index`)
    // return;
    // 打开新手指引
    setHidden(true)
    setCloseImage(false);
    setDisplay(false)
  }
  //身份
  const handleChangeRole = (e: any) => {
    setType(e);
    setIdentity(false)
    Taro.setStorageSync(Type, e);
    getData();
  }
  // 关闭创建项目
  const handleCreateProjectClose = () => {
    setishandleJump(true)
    setCreateProjectDisplay(false)
    setModel({ groupName: '', teamName: '' })
  }
  // 弹框输入
  const handleInput = (type: string, e) => {
    let data = JSON.parse(JSON.stringify(model));
    data[type] = e.detail.value;
    setModel(data);
  }
  // 确认弹框
  const handleAddProject = () => {
    if (!model.teamName){
      Msg('您还没有填写班组名称');
      return
    }
    let params = {
      group_name: model.groupName,
      team_name: model.teamName,
    }
    bkAddProjectTeamAction(params).then(res => {
      if (res.code === 200) {
        setProject(false);
        setishandleJump(true);
        setModel({ groupName: '', teamName: '' })
        // 班组长是1
        userRouteJump(`/pages/recorder/index?type=${1}`)
        // bkGetProjectTeam()
      } else {
        Msg(res.msg);
        return;
      }
    })
  }
  // 填写项目返回上一步
  const handleBack = () => {
    setProject(false)
    setCreateProjectDisplay(true)
  }
  // 判断是授权进行下一步
  const nextStep = () => {
    let midData = Taro.getStorageSync(MidData);
    if (!midData) return;
  }
  // 跳流水
  const handleJump = (url: string, state?: boolean | number) => {
    if (loginType) {
      userRouteJump('/pages/login/index?type=1');
      return;
    }
    let midData = Taro.getStorageSync(MidData);
    console.log(midData,'midData点击')
    if (!midData) {
      // 游客点中间没反应
      if (state == 2) { return }
      setDisplay(true)
      return;
    }
    // 点击记工
    if (state && state != 2) {
      if (busy) {
        Msg('网络错误，请求失败')
        return;
      }
      // 判断不是0 然后与当前身份不同就是提示
      // 判断后台传过来的状态，然后和这一次的不一样就是有新项目需要出现弹框
      if (parseInt(lasted_business_identity) !== 0 && type != parseInt(lasted_business_identity) && !neverPrompt) {
        setTips(true)
        return;
      } else {
        if (type === 1) {
          if(ishandleJump){
            setishandleJump(false)
            bkGetProjectTeam(2)
          }
          return;
        } else {
          handelChange(type, true)
        }
      }
    }
    // 如果是班组长需要判断有没有项目

    userRouteJump(url);
    // userRouteJump('/pages/flowingWater/index')
  }
  // 选择项目
  const handleLeft = (type: number) => {
    let midData = Taro.getStorageSync(MidData);
    // 没有个人信息的时候出现授权
    if (!midData) {
      setDisplay(true)
      return;
    }
    // 判断时间大于项目创建时间就不可以点击
    // 现在的时间
    const date = new Date(newTime || '');
    // 第一次记工时间
    const startTime = new Date(start).getTime();
    // 现在的时间
    const newTimes = new Date(newTime.substring(0, 7)).getTime();
    let montime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(5, 7));
    //减少/增加一个月
    if (type === 0) {
      if (startTime >= newTimes) {
        return;
      }
      date.setMonth(date.getMonth() - 1);
    } else {
      if (addZero(date.getMonth() + 1) >= montime) {
        return;
      }
      date.setMonth(date.getMonth() + 1);
    }
    let month = date.getMonth();
    month = ((month == 0) ? (12) : (month));
    const befD = date.getFullYear() + "-" + addZero(date.getMonth() + 1);
    console.log(date.getFullYear() + "-" + addZero(date.getMonth() + 1),'======')
    console.log(befD,'befD')
    getData(befD,type);
    setTime(befD);
    // 月份
    setMonth(befD.substring(5, 7))
    setVal(date.getFullYear() + "-" + addZero(date.getMonth() + 1))
    changeIcon(date.getFullYear() + "-" + addZero(date.getMonth() + 1))
  }
  // 关闭身份显示
  const handlewhiteClose = () => {
    setPrompt(false);
    Taro.setStorageSync(Tips, true)
  }
  // 创建项目
  const handleOk = ()=>{
    if (!model.groupName){
      Msg('您还没有填写项目名称');
      return;
    }
    setCreateProjectDisplay(false);
    setProject(true)
  }
  return (
    <View className='index-content'>
      {/* <UseNavInfo/> */}
      {/* <AtNavBar/> */}
      {<View style={{ visibility: hidden ? 'visible' : 'hidden' }} >
        {Images.map((v) => (
          <Image src={v.url} key={v.id} className='noImages' />
        ))}
        <View className='noImgBox'>
          <Image src={image} className={closeImage ? 'noImages' : 'images'} onClick={() => { hanleImage(image) }} />
        </View>
      </View>
      }
      {/* 头部 */}
      <View className='top'>
        <Image src={`${IMGCDNURL}background.png`} className='top_img' />

        <View className='inner'>

          <View className='heard'>
            <View className='flex-month'>
              {
                leftTime && <Image onClick={() => handleLeft(0)} src={`${IMGCDNURL}left.png`} className='leftIcon' style={{ visibility: leftTime ? 'visible' : 'hidden' }} />
              }
              
              {/* <View className='heard-left' style={newMonth > start ? '' : { marginLeft: '50rpx' }}> */}
              <Picker
                start={start}
                end={end}
                mode='date'
                fields='month'
                onChange={(e) => handleChangeTime(e)}
                value={vals}
              // range={timeList}
              // onColumnChange={(e) => handlebindcolumnchange(e)}
              >
                {month}月
              </Picker>
              {/* </View> */}
              {
                rightTime && <Image onClick={() => handleLeft(1)} className='righticon' src={`${IMGCDNURL}right.png`} style={{ visibility: rightTime ? 'visible' : 'hidden' }} />
              }
            </View>
            {/* <Image src={`${IMGCDNURL}user.png`}/> */}
            {type === 1 ?
              <View className='heard-middle' onClick={() => { handelChange(2) }}>我是班组长<Text className='switch'><Text className='test' />切换 </Text>
                {prompt && <View className='tipes' onClick={(e) => { e.stopPropagation(), handlewhiteClose() }}>工人记工点这里哦
                  <Image src={`${IMGCDNURL}whiteClose.png`} className='closeIcons' />
                </View>}
              </View> :
              <View className='heard-middle' onClick={() => { handelChange(1) }}>
                <View>我是工人<Text className='switch'><Text className='test' />切换</Text></View>
                {prompt && <View onClick={(e) => { e.stopPropagation(), handlewhiteClose() }} className='tipes'>班组长记工点这里哦
                  <Image src={`${IMGCDNURL}whiteClose.png`} className='closeIcons' />
                </View>}
              </View>}
            <View onClick={handelTps} className='cloud'>
              {item && !show && <AtBadge value={num} maxValue={99} className='AtBadge' />}
              <Image src={`${IMGCDNURL}cloud.png`} className='heard-right'>
              </Image>
            </View>
          </View>
          <View className='money_box' onClick={() => handleJump(`/pages/flowingWater/index?timeMon=${vals}`, 2)}>
            <View className='moneyList'>
              <View>
                <Image className='moneyIcon' src={`${IMGCDNURL}money.png`} />工钱
                <View className='money'>
                    {/* {item.money} -- { item.overtime } -- {item.borrow} */}
                    {busy ? '-' : (item && (parseFloat(item.money) > 9999999.99 ? '1千万+' : item.money) || '0.00')}
                </View>
              </View>

              <View>
                <Image className='moneyIconPay' src={`${IMGCDNURL}money1.png`} />借支
                <View className='money'>
                  {busy ? '-' : (item && (parseFloat(item.borrow) > 9999999.99 ? '1千万+' : item.borrow) || '0.00')}
                </View>
              </View>

            </View>
            <View className='typeList'>
              <View className='textCenter clearfix'>
                <View className='fl'>
                  <Text>上班</Text>
                  <View className='num'>
                      {busy ? '-' : ((item && item.work_time > 998.99 ? '999+' : item && item.work_time) || 0)}
                      {/* {(item && item.work_time > 998.99 ? '999+' : item.work_time)||0} */}
                      个工
                  </View>
                </View>
              </View>
              <View className='textCenter'>
                {/* <View> */}
                <View>
                  加班
                  <View className='num'>
                    {/* {item && item.overtime || 0}小时 */}
                    {busy ? '-' : ((item && item.overtime > 998.99 ? '999+' : item && item.overtime) || 0)}
                    {/* {(item && item.overtime > 998.99 ? '999+' : item.overtime) || 0} */}
                    小时
                  </View>
                </View>
              </View>
              <View className='textCenter clearfix'>
                <View className='fr'>
                  <View>按量记
                    <View>
                      {busy && <View className='num'>-平方米</View>}
                      {!busy && !item && <View className='num'>0平方米</View>}
                      {!busy && item && item.amount.type === 0 && <View className='num'>0平方米</View>}
                      {!busy && item && item.amount.type === 1 && <View className='num'>{parseFloat(item.amount.unit_num) > 999999.99 ? '1百万+' : parseFloat(item.amount.unit_num)}{item.amount.unit}</View>}
                      {!busy && item &&item.amount.type === 2 && <View className='num'>{item.amount.count > 999999.99 ? '1百万+' : item.amount.count}笔</View>}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className='yun'><Image className='yun-img' src={`${IMGCDNURL}backgroundCloud.png`} /></View>
        <View className='recordBox'>
          <View className='eventList'>
            <View className='eventList-left' onClick={() => handleJump(`/pages/flowingWater/index?timeMon=${vals}`)}>
              <View className='eventList-icon'><Image className='eventList-icon-image' src={`${IMGCDNURL}recorder.png`} /></View>
              <View>记工流水</View>
            </View>
            <View className='' onClick={() => handleJump(`/pages/attendanceSheet/index?timeMon=${vals}`)}>
              <View className='eventList-icon-attendance'><Image className='eventList-icon-attendance-image' src={`${IMGCDNURL}attendance.png`} /></View>
              <View className='' >考勤表</View>
            </View>
          </View>
          <View className='btnBox'>
            <View className='btn' onClick={() => handleJump(`/pages/recorder/index?type=${type}&stateType=1`,true)}>
              {!item || (item && item.business_list.data.length === 0) ? <Text className='fontSize'> 记工<Text className='btn-title'>(点工 包工 借支)</Text></Text> : <Text  className='fontSize'> 再记一笔<Text className='btn-title' onClick={() => handleJump(`/pages/recorder/index?type=${type}`)}>(点工 包工 借支)</Text></Text>}
            </View>
            <View className='notepad'>
              <View className='notepad-Icon'><Image className='notepad-Icon-iamge' src={`${IMGCDNURL}notepad.png`} /></View>
              <View className='record' onClick={() => handleJump(`/pages/notepad/index`)}>记事本</View>
            </View>
          </View>
        </View>
        
        {/* <View className='backgroundCloud'></View> */}
      </View>
      <View className='content'>
        <View className='backgroundCloud'></View>
        <View className='content-title'>今日 <Text className='content-time'>{toDay} {week}</Text></View>
        {busy &&
          <View className='busyBox'>
            <View>系统繁忙，刷新试试</View>
            <View className='refresh' onClick={() => getData()}>刷新</View>
          </View>
        }
        {/* 班组长 */}
        {type === 1 && list.length > 0 && !busy &&
          <View className='scrollViewBox'>
            <ScrollView
              className='content-list-box'
              scrollY
              scrollTop={isScrollTop}
              // refresherEnabled
              lowerThreshold={200}
              // onScroll={getNextPageData}
              onScrollToLower={() => getNextPageData()}
            >
              {list.map((v, i) => (
                <View key={i + i} className='content-list' onClick={getNextPageData}>
                  {/* {v.arr.map(val=>( */}
                  <View>
                    <View className='content-list-flex'>
                      <View>{v.workername}{(v.note || v.view_images.length>0)&& <Text className='icon leader-icon'>备</Text>}</View>
                      <View className='orgion'><Text className='orgion-type-chars'>¥</Text>{v.money}</View>
                    </View>
                    <View className='details'>我在{v.group_info}项目组对{v.workername}记了-笔{v.business_type == '1' ? '记工' : (v.business_type == '2' ? '包工' : '借支')}</View>
                  </View>
                  {/* // ))} */}
                </View>
              ))}
            </ScrollView>
            {list.length >= 3 && <View onClick={getNextPageData} className='last'>
              <Image className='downIcon-Icon-iamge' src={`${IMGCDNURL}downIcon.png`} />
            </View>}
          </View>
        }
        {/* 工人 */}
        {type === 2 && list.length > 0 && !busy &&
          <View className='scrollViewBox'>
            <ScrollView
              className='content-list-box scrollWorker'
              scrollY
              scrollTop={isScrollTop}
              lowerThreshold={200}
              onScrollToLower={getNextPageData}
            >
              {list.map((v, i) => (
                <View key={i + i} className='content-list-type' onClick={getNextPageData}>
                  <View className='content-list-flex'>
                    <View className='details'>我在{v.group_info}项目组对Ta记了-笔{v.business_type == '1' ? '记工' : (v.business_type == '2' ? '包工' : '借支')}</View>
                    {/* <View></View> */}
                    <View className='orgion-type'><Text className='orgion-type-chars'>¥</Text>{v.money}</View>
                  </View>
                </View>
              ))}
            </ScrollView>
            {list.length >= 4 && <View onClick={getNextPageData} className='last'>
              <Image className='downIcon-Icon-iamge' src={`${IMGCDNURL}downIcon.png`} />
            </View>}
          </View>
        }
        {((item && list.length === 0) || !item) && !busy &&
          <View className='content-noList'>
            <View>您今天还没有记工~</View>
            <View>点击上方[记工]按钮，开始记工</View>
          </View>
        }
      </View>
      <View className='jumpBox'>
        <View className='jumpItem' onClick={() => userRouteJump('/pages/feedback/index')}>
          {/* <View className='jumpItem' onClick={() => userRouteJump('/pages/login/index')}> */}
          <View className='ptBox'>
            <View className='jumpItem-icon'><Image className='jumpItem-icon-image' src={`${IMGCDNURL}work.png`} /></View>
            <View className='jumpItem-title'>意见</View>
          </View>
        </View>
        <View className='jumpItem'>
          <View className='ptBox'>
            <View className='jumpItem-icon-goback'><Image className='jumpItem-icon-goback-image' src={`${IMGCDNURL}goBack.png`} /></View>
            <View className='jumpItem-title' onClick={handleGoback}>鱼泡网</View>
          </View>
        </View>
      </View>
      {/* 弹框 */}
      <AtModal isOpened={tips} closeOnClickOverlay={false}>
        <View className='AtModal'>
          <View className='AtModal-top'>当前是<Text className='atModal-name'>【{type == 1 ? '班组长' : '工人'}】</Text>身份</View>
          <View className='mtList'>与上一次记工身份不一致，是否<Text className='atModal-change'>切换?</Text></View>
          <View className='atModal-list' onClick={() => handleType(0)}>不切换</View>
          <View className='atModal-list' onClick={() => handleType(1)}>切换成【{type == 1 ? '工人' : '班组长'}】</View>
          <View className='atModal-list' onClick={() => handleType(2)}><Text className='blued'>不再提醒</Text></View>
        </View>
      </AtModal>
      {/* 选择身份弹窗 */}
      <AtModal isOpened={identity} closeOnClickOverlay={false} >
        <View className='useAtModal'>
          <View className='useAtModal-title'>请根据需要选择您的身份</View>
          <View className='useAtModal-tips'>温馨提示：选对身份，才能使用想要的功能哦</View>
          <View className='useAtModal-box'>
            <View onClick={() => handleChangeRole(1)}>
              <View className='useAtModal-monitor'><Image className='useAtModal-monitor-img' src={`${IMGCDNURL}gongren.png`} /></View>
              <View className='useAtModal-blued'>我是班组长</View>
              <View>对工人记工</View>
              <View className='useAtModal-look'>查看工人的考勤表</View>
            </View>
            <View onClick={() => handleChangeRole(2)}>
              <View className='useAtModal-worker'><Image className='useAtModal-worker-img' src={`${IMGCDNURL}banzhu.png`} /></View>
              <View className='useAtModal-blued'>我是工人</View>
              <View>对自己记工</View>
              <View className='useAtModal-look'>查看自己的考勤表</View>
            </View>
          </View>
        </View>
      </AtModal>
      {/* 授权 */}
      <Auth display={display} handleClose={handleClose} callback={handleCallback} />
      {/* 创建项目 */}
      <CreateProject display={createProjectDisplay} handleClose={handleCreateProjectClose} val={model && model.groupName} handleSubmit={handleOk} handleInput={handleInput} />
      {/* 填写班组 */}
      <ProjectModal display={project} handleSubmit={handleAddProject} handleInput={handleInput} teamName={model && model.teamName} handleBack={handleBack} handleClose={() => { setishandleJump(true);setProject(false), setModel({ groupName: '', teamName: '' }) }} />
    </View>
  )
}
// Index.config = {
//   navigationBarTitleText: '首页',
// } as Config