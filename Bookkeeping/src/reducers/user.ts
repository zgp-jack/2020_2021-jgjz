import Taro from '@tarojs/taro'
import { UserInfo } from '../config/store'
import { GET, SET } from '../constants/user'

export interface User {
  userId: number,
  tokenTime: number,
  token: string,
  uuid: string,
  login: boolean,
  type:number
}

interface ActionType {
  type: 'set' | 'get',
  data: User
}

const userInfo = Taro.getStorageSync(UserInfo)

const DEFAULT_STATE: User = userInfo ? userInfo : {
  userId: 0,
  uuid: '',
  tokenTime: 0,
  token: '',
  login: false,
  type:0
}

export default function User(state: User = DEFAULT_STATE, action: ActionType) {
  switch (action.type) {
    case SET:
      return { ...state, ...action.data }
    case GET:
      if (!state.login) {
        let userInfo = Taro.getStorageSync(UserInfo)
        if (userInfo) return userInfo
      }
      return state
    default:
      return state
  }
}