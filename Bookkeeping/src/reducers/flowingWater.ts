import { GETDATAWATER, SETDATAWATER } from '../constants/flowingWater'

const DEFAULT_STATE: any = {
  data: []
}
export interface ACTIONTYPE {
  type: string,
  data: any
}

export default function flowingWater(state: any = DEFAULT_STATE, action: ACTIONTYPE) {
  switch (action.type) {
    case GETDATAWATER:
      return state
    case SETDATAWATER:
      return [ ...action.data ]
    default:
      return state
  }
}