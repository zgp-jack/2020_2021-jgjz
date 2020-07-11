import { GET, SET } from '../constants/notepad'

const DEFAULT_STATE: any = {
  data: []
}
export interface ACTIONTYPE {
  type: string,
  data: any
}

export default function flowingWater(state: any = DEFAULT_STATE, action: ACTIONTYPE) {
  switch (action.type) {
    case GET:
      return state
    case SET:
      return { ...state, ...action.data }
    default:
      return state
  }
}