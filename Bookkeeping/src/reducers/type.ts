import { GETTYPE, SETTYPE } from '../constants/typs'

const DEFAULT_STATE: any = {
  data: 0
}
export interface ACTIONTYPE {
  type: string,
  data: any
}

export default function type(state: any = DEFAULT_STATE, action: ACTIONTYPE) {
  switch (action.type) {
    case GETTYPE:
      return state
    case SETTYPE:
      return { ...state, ...action.data }
    default:
      return state
  }
}