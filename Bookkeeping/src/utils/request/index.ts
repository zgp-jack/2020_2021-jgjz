import Taro from '@tarojs/taro'
import Msg from '../msg'
import { UserInfo, Type, MidData } from '../../config/store'
import { User } from '../../reducers/user'
import * as api from '../api'
import * as Inter from './index.d'
import { AuthData } from '../../components/auth';
import { useSelector } from '@tarojs/redux'

// 头部可传参数
interface RequestHeader {
  'content-type'?: string
  mid?: number,
  token?: string,
  time?: number,
  uuid?: string,
  version?: string,
  type?:number,
  identity?:any,
}
// 默认请求参数
interface RequestBase {
  url: string,
  method: 'GET' | 'POST',
  header: RequestHeader,
  data: any,
  failToast: boolean,
  loading: boolean,
  title: string,
}
// 请求失败提示信息
function requestShowToast(show: boolean): void {
  if (show) {
    setTimeout(() => {
      Msg('网络错误，请求失败')
    }, 200)
  }
}

type Request = {
  [K in keyof RequestBase]?: RequestBase[K]
}


// 获取header请求头信息
function getRequestHeaderInfo(): RequestHeader {
  // 获取用户信息
  let userInfo: User = Taro.getStorageSync(UserInfo);
  const requestHeader: RequestHeader = 
  // userInfo.login ? 
  {
    'content-type': 'application/x-www-form-urlencoded',
    mid: userInfo.userId,
    token: userInfo.token,
    time: userInfo.tokenTime,
    uuid: userInfo.uuid,
  } 
  // : {
  //     'content-type': 'application/x-www-form-urlencoded',
  //   }
  return requestHeader
}

// 配置默认请求参数
const defaultRequestData: RequestBase = {
  url: '',
  method: 'GET',
  header: getRequestHeaderInfo(),
  data: {},
  loading: true,
  title: '数据加载中...',
  failToast: true
}

// 全局通用请求方法
export function doRequestAction(reqData: Request): Promise<any> {
  let req: RequestBase = { ...defaultRequestData, ...reqData }
  if (req.loading) {
    Taro.showLoading({
      title: req.title
    })
  }
  let data = { ...req.data, wechat_token: 'jigong' }
  // 获取用户信息
  let userInfo: User = Taro.getStorageSync(UserInfo);
  console.log(userInfo,'userInfouserInfo')
  // 获取存入的公用内容
  let type: User = Taro.getStorageSync(Type)
  // const useSelectorItem = useSelector<any, any>(state => state)
  if (userInfo) {
  if (req.method === 'POST' && userInfo.login) {
    data.userId = userInfo.userId
    data.token = userInfo.token
    data.tokenTime = userInfo.tokenTime
    data.identity = type
  }else{
    data.userId = userInfo.userId
    data.token = userInfo.token
    data.tokenTime = userInfo.tokenTime
    data.identity = type
  }
  }
  return new Promise((resolve, reject) => {
    Taro.request({
      url: /^http(s?):\/\//.test(req.url) ? req.url : req.url,
      method: req.method,
      header: req.header,
      data: data,
      success: (res) => {
        //console.log(res)
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          requestShowToast(req.failToast)
          reject(res)
        }
      },
      fail: (e) => {
        // todo requestShowToast(req.failToast)
        requestShowToast(req.failToast)
        reject(e)
      },
      complete: function () {
        if (req.loading) {
          Taro.hideLoading()
        }
      }
    })
  })
}


// 测试
export function resumesComplainAction(data): Promise<Inter.Result> {
  return doRequestAction({
    url: api.jobRecommendListUrl,
    data: data
  })
}

// 用户授权-获取session_key
export function getUserSessionKeyAction(code: string): Promise<Inter.SessionKey> {
  return doRequestAction({
    url: api.GetUserSessionKey + '?code=' + code +'&wechat_token=jigong',
    method: 'POST',
    data: {
      code: code
    }
  })
}
// 获取登陆账户
export function GetUserInfoAction(data: any): Promise<Inter.InitUserInfo> {
  return doRequestAction({
    url: api.GetUserInfo,
    data: data
  })
}


// 首页
export function bkIndexAction(data): Promise<Inter.bkIndexType> {
  // let userInfo: User = Taro.getStorageSync(UserInfo)
  let type = Taro.getStorageSync(Type)
  data.identity = type;
  let midData = Taro.getStorageSync(MidData);
  return doRequestAction({
    url: api.bkIndexUrl,
    header: {
      'content-type': 'application/json',
      // mid: userInfo.userId,
      // token: userInfo.token,
      // time: userInfo.tokenTime,
      // uuid: userInfo.uuid
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data,
  })
}

// 授权时token验证并创建用户
export function bkMemberAuthAction(data): Promise<Inter.bkMemberAuth> {
  let userInfo = Taro.getStorageSync(UserInfo);
  console.log(userInfo,'midData')
  return doRequestAction({
    url: api.bkMemberAuthUrl,
    method: 'POST',
    header:{
      'content-type': 'application/x-www-form-urlencoded',
      mid: userInfo.userId,
      token: userInfo.token,
      time: userInfo.tokenTime,
      uuid: userInfo.uuid
    },
    data: data
  })
}

//添加意见反馈
export function bkAddFeedbackAction(data): Promise<Inter.Result> {
  let type = Taro.getStorageSync(Type)
  let midData = Taro.getStorageSync(MidData);
  let header;
  if (midData){
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token || '',
      time: midData.sign.time || '',
      uuid: midData.uuid
    }
  }else{
    header = {
      'content-type': 'application/x-www-form-urlencoded',
    }
  }
  // data.identity = type
  return doRequestAction({
    url: api.bkAddFeedbackUrl,
    method: 'POST',
    header: header,
    data: data
  })
}


// 新增记事本
export function bkAddNotepadAction(data): Promise<Inter.Result> {
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
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
  })
}

// 获取记事本记录
export function bkGetNotePadAction(data): Promise<Inter.bkGetWorker> {
  let type = Taro.getStorageSync(Type)
  let midData = Taro.getStorageSync(MidData);
  data.identity = type
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
  })
}

// 删除记事本
export function bkDeleteNotePadAction(data): Promise<Inter.bkGetNotePadType> {
  const { id } = data;
  // const ids = JSON.stringify(id)
  // 获取用户信息
  let userInfo: User = Taro.getStorageSync(UserInfo)
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
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
  })
}


// 修改记事本
export function bkUpdateNotePadAction(data): Promise<Inter.bkGetNotePadType> {
  const { id } = data;
  // 获取用户信息
  let type = Taro.getStorageSync(Type)
  let midData = Taro.getStorageSync(MidData);
  data.identity = type
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
  })
}

// 流水
export function bkBusinessAction(data): Promise<Inter.bkBusinessType> {
  let userInfo: User = Taro.getStorageSync(UserInfo)
  let type = Taro.getStorageSync(Type)
  let midData = Taro.getStorageSync(MidData);
  data.identity = type
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
  })
}

// 记工项目列表
export function bkGetProjectTeamAction(data): Promise<Inter.bkGetProjectTeam> {
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
  // let userInfo = Taro.getStorageSync(UserInfo);
  // let token;
  // if (midData && midData.sign.token) {
  //   token = midData.sign.token;
  // } else {
  //   token = userInfo.token;
  // }
  return doRequestAction({
    url: api.bkGetProjectTeamUrl,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
      // mid: userInfo.userId,
      // token: token,
      // time: userInfo.tokenTime,
      // uuid: userInfo.uuid,
    },
    data: data
  })
}

// 添加项目班组
export function bkAddProjectTeamAction(data): Promise<Inter.bkAddProjectTeam> {
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
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
  })
}

// 添加工人
export function bkAddWorkerActiion(data): Promise<Inter.bkBusinessType> {
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
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
  })
}
// 工人列表
export function bkGetWorkerAction(data): Promise<Inter.bkGetWorker> {
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
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
  })
}

// 删除
export function bkDeleteRroupWorkerAction(data): Promise<Inter.bkBusinessType> {
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
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
  })
}

// excel数据
export function bkgetExcelDataAction(data): Promise<Inter.bkgetExcelData> {
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
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
  })
}

// 导出excel数据
export function bkShareExcelAction(data): Promise<Inter.bkBusinessType> {
  let type = Taro.getStorageSync(Type)
  let midData = Taro.getStorageSync(MidData);
  data.identity = type
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
  })
}

// 记工记点
export function bkAddBusinessAction(data): Promise<Inter.bkBusinessType> {
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
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
  })
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
export function bkWageStandGetWageAction(data): Promise<Inter.bkWageStandGetWage> {
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
  // let userInfo = Taro.getStorageSync(UserInfo);
  // let token;
  // if (midData.sign.token){
  //   token = midData.sign.token;
  // }else{
  //   token = userInfo.token;
  // }
  return doRequestAction({
    url: api.bkWageStandGetWageUrl,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      // mid: midData.yupao_id,
      // token,
      // time: midData.sign.time,
      // uuid: midData.uuid
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
  })
}

// 添加工资标准
export function bkAddWageAction(data): Promise<Inter.bkBusinessType> {
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
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
  })
}

// 已设置工资
export function bkGetWorkerWageAction(data): Promise<Inter.bkMemberAuth> {
  let type = Taro.getStorageSync(Type)
  let midData = Taro.getStorageSync(MidData);
  data.identity = type
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
  })
}

// 流水删除
export function bkDeleteBusinessAction(data): Promise<Inter.bkBusinessType> {
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
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
  })
}

// 修改工资工资标准
export function bkUpdateWorkerAction(data): Promise<Inter.bkBusinessType> {
  const { id } =data;
  let midData = Taro.getStorageSync(MidData);
  let type = Taro.getStorageSync(Type)
  data.identity = type
  return doRequestAction({
    url: api.bkUpdateWorkerUrl +'?id='+id,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  })
}


// 删除项目组
export function bkDeleteprojectTeamAction(data): Promise < Inter.bkBusinessType > {
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
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
  })
}


// 修改项目
export function bkUpdateProjectTeamAction(data): Promise<Inter.bkBusinessType> {
  let type = Taro.getStorageSync(Type)
  let midData = Taro.getStorageSync(MidData);
  data.identity = type
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
  })
}


// 给工人设置工资标准
export function bkSetWorkerMoneyByWageAction(data): Promise<Inter.bkBusinessType> {
  let type = Taro.getStorageSync(Type)
  let midData = Taro.getStorageSync(MidData);
  data.identity = type
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
  })
}

// 修改工资标准
export function bkupdateWageAction(data): Promise < Inter.bkBusinessType > {
  const { id } = data;
  let type = Taro.getStorageSync(Type)
  let midData = Taro.getStorageSync(MidData);
  data.identity = type
  return doRequestAction({
    url: api.bkupdateWageUrl +'?id='+id,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  })
}


// 获取单个流水
export function bkBusinessOneAction(data): Promise<Inter.bkBusinessOneType> {
  const { id } = data;
  let type = Taro.getStorageSync(Type)
  data.identity = type
  let midData = Taro.getStorageSync(MidData);
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
  })
}


// 修改记工
export function updateBusinessAction(data): Promise<Inter.bkBusinessType> {
  const { id } = data;
  let midData = Taro.getStorageSync(MidData);
  let type = Taro.getStorageSync(Type)
  data.identity = type
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
  })
}

// 给组里添加工人
export function bkAddWorkerInGroupAction(data): Promise<Inter.bkBusinessType> {
  let type = Taro.getStorageSync(Type)
  let midData = Taro.getStorageSync(MidData);
  data.identity = type
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
  })
}


// 分享获取考勤表
export function bkGetShareExcelDataAction(data): Promise<Inter.bkWageStandGetWage> {
  // let type = Taro.getStorageSync(Type)
  // let midData = Taro.getStorageSync(MidData);
  // data.identity = type
  const { session } = data;
  return doRequestAction({
    url: api.bkGetShareExcelDataUrl + '?session=' + session,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      // mid: midData.yupao_id,
      // token: midData.sign.token,
      // time: midData.sign.time,
      // uuid: midData.uuid
    },
    data: data
  })
}

// 验证码
export function bkGetCodeAction(data): Promise<Inter.bkGetCode> {
  let midData = Taro.getStorageSync(MidData);
  console.log(midData,'midDatamidData')
  return doRequestAction({
    url: api.bkGetCodeUrl,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      // mid: midData.yupao_id,
      // token: midData.sign.token,
      // time: midData.sign.time,
      // uuid: midData.uuid
    },
    data: data
  })
}

// 设置班组长
export function bkSetGroupLeaderAction(data): Promise<Inter.bkGetCode> {
  let midData = Taro.getStorageSync(MidData);
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
  })
}

//  云彩
export function bkUpdateBusinessNewAction(data): Promise<Inter.bkAddProjectTeam> {
  let midData = Taro.getStorageSync(MidData);
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
  })
}


// 工人身份设置自己的工资标准
export function bkSetWorkerIdentityWageAction(data): Promise<Inter.bkGetCode> {
  let midData = Taro.getStorageSync(MidData);
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
  })
}


export function bkgetLastGroupInfoAction(data): Promise<Inter.bkGetWorker> {
  let midData = Taro.getStorageSync(MidData);
  return doRequestAction({
    url: api.bkgetLastGroupInfoUrl,
    header: {
      // 'content-type': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      mid: midData.yupao_id,
      token: midData.sign.token,
      time: midData.sign.time,
      uuid: midData.uuid
    },
    data: data
  })
}


// // 下载
// export function shareExcelAction(data): Promise<Inter.bkGetWorker> {
//   let midData = Taro.getStorageSync(MidData);
//   let type: User = Taro.getStorageSync(Type);
//   return doRequestAction({
//     url: api.shareExcelUrl + '/identity=' + type,
//     header: {
//       'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=GBK',
//       mid: midData.yupao_id,
//       token: midData.sign.token,
//       time: midData.sign.time,
//       uuid: midData.uuid,
//       identity: type
//     },
//     data: data
//   })
// }

// 鱼泡网跳过来
export function appletJumpAction(data): Promise<Inter.bkGetWorker> {
  return doRequestAction({
    url: api.appletJumpUrl,
    header: {
      // 'content-type': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      mid: data.userId,
      token:data.token,
      time:data.tokenTime,
      // token: midData.sign.token,
      // time: midData.sign.time,
      // uuid: midData.uuid
      // mid:
    },
    data: data,
  })
}

// jumpBindTelUrl 小程序跳转后 添加绑定手机号
export function jumpBindTelAction(data): Promise<Inter.bkGetWorker> {
  let userInfo = Taro.getStorageSync(UserInfo);
  console.log(userInfo,'21321321')
  return doRequestAction({
    url: api.jumpBindTelUrl,
    method: 'POST',
    header: {
      // 'content-type': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      mid: userInfo.userId,
      token: userInfo.token,
      time: userInfo.tokenTime,
    },
    data: data,
  })
}


// 获取记工电话和日历
// getWorkerHasBusinessByDateUrl
export function getWorkerHasBusinessByDateAction(data): Promise<Inter.bkGetWorker> {
  let userInfo = Taro.getStorageSync(UserInfo);
  return doRequestAction({
    url: api.getWorkerHasBusinessByDateUrl,
    // method: 'POST',
    header: {
      // 'content-type': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      mid: userInfo.userId,
      token: userInfo.token,
      time: userInfo.tokenTime,
    },
    data: data,
  })
}

// 初始化记工界面数据 
export function getBookkeepingDataAction(data): Promise<Inter.getBookkeepingData > {
  let userInfo = Taro.getStorageSync(UserInfo);
  return doRequestAction({
    url: api.getBookkeepingDataUrl,
    // method: 'POST',
    header: {
      // 'content-type': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      mid: userInfo.userId,
      token: userInfo.token,
      time: userInfo.tokenTime,
    },
    data: data,
  })
}

// 新的记工提交接口 
export function addNewBusinessAction(data): Promise<Inter.bkGetWorker> {
  let userInfo = Taro.getStorageSync(UserInfo);
  return doRequestAction({
    url: api.addNewBusinessUrl,
    method: 'POST',
    header: {
      // 'content-type': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      mid: userInfo.userId,
      token: userInfo.token,
      time: userInfo.tokenTime,
    },
    data: data,
  })
}

// 考勤表获取
export function shareExcelDataAction(data): Promise<Inter.bkGetWorker> {
  let userInfo = Taro.getStorageSync(UserInfo);
  return doRequestAction({
    url: api.shareExcelDataUrl,
    // method: 'POST',
    header: {
      // 'content-type': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      mid: userInfo.userId,
      token: userInfo.token,
      time: userInfo.tokenTime,
    },
    data: data,
  })
}