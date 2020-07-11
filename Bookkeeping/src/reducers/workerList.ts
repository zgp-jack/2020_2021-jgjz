import { GETWORKERTYPE, SETWORKERTYPE } from '../constants/workerList'

const DEFAULT_STATE: any = {
  data: []
}
export interface ACTIONTYPE {
  type: string,
  data: any
}
export default function workerList(state: any = DEFAULT_STATE, action: ACTIONTYPE) {
  switch (action.type) {
    case GETWORKERTYPE:
      return state
    case SETWORKERTYPE:
      return [...action.data]
    default:
      return state
  }
}