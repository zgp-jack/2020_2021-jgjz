import { GETMAIILIST, SETMAIILIST } from '../constants/mailList'

const DEFAULT_STATE: any = {
  data: []
}
export interface ACTIONTYPE {
  type: string,
  data: any
}
export default function mailList(state: any = DEFAULT_STATE, action: ACTIONTYPE) {
  switch (action.type) {
    case GETMAIILIST:
      return state
    case SETMAIILIST:
      return [...action.data]
    default:
      return state
  }
}