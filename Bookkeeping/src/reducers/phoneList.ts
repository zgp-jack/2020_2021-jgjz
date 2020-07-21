import { GETPHONELIST, SETPHINELIST } from '../constants/phoneList'

const DEFAULT_STATE: any = {
  data: []
}
export interface ACTIONTYPE {
  type: string,
  data: any
}
export default function phoneList(state: any = DEFAULT_STATE, action: ACTIONTYPE) {
  switch (action.type) {
    case GETPHONELIST:
      return state
    case SETPHINELIST:
      return [...action.data]
    default:
      return state
  }
}