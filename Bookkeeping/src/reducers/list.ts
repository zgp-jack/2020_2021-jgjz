import { GETDATALIST, SETDATALIST } from '../constants/list'

const DEFAULT_STATE: any = {
  data: []
}
export interface ACTIONTYPE {
  type: string,
  data: any
}
export default function list(state: any = DEFAULT_STATE, action: ACTIONTYPE) {
  switch (action.type) {
    case GETDATALIST:
      return state
    case SETDATALIST:
      return [...action.data ]
    default:
      return state
  }
}