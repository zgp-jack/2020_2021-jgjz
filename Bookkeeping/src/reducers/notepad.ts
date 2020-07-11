import { bkGetNotePadTypeData } from '../utils/request/index.d'
import { GET, SET } from '../constants/notepad'

const DEFAULT_STATE: any = {
  data: {}
} 
export interface ACTIONTYPE {
  type: string,
  data: bkGetNotePadTypeData
}

export default function msg(state:any = DEFAULT_STATE, action: ACTIONTYPE) {
  switch (action.type) {
    case GET:
      return state
    case SET:
      return { ...state, ...action.data }
    default:
      return state
  }
}