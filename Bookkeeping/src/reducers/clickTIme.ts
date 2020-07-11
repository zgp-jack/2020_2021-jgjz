import { GETCLICKTIME, SETCLICKTIME } from '../constants/clickTIme'

const DEFAULT_STATE: any = {
  data: []
}
export interface ACTIONTYPE {
  type: string,
  data: any
}
export default function clickTIme(state: any = DEFAULT_STATE, action: ACTIONTYPE) {
  switch (action.type) {
    case GETCLICKTIME:
      return state
    case SETCLICKTIME:
      return [...action.data]
    default:
      return state
  }
}