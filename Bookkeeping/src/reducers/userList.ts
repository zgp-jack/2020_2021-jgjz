import { GETUSERLSIT, SETUSERLIST } from '../constants/userList'

const DEFAULT_STATE: any = {
  data: []
}
export interface ACTIONTYPE {
  type: string,
  data: any
}
export default function userList(state: any = DEFAULT_STATE, action: ACTIONTYPE) {
  switch (action.type) {
    case GETUSERLSIT:
      return state
    case SETUSERLIST:
      return [...action.data]
    default:
      return state
  }
}