import { SETAPPSHOWDATA, GETAPPSHOWDATA } from '../constants/appShowData'

const DEFAULT_STATE: any = {
  data: {}
}
export interface ACTIONTYPE {
  type: string,
  data: any
}
export default function appShowData(state: any = DEFAULT_STATE, action: ACTIONTYPE) {
  switch (action.type) {
    case GETAPPSHOWDATA:
      return state
    case SETAPPSHOWDATA:
      return [...action.data]
    default:
      return state
  }
}