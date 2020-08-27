import { SETCOLOR, GETCOLOR } from '../constants/colorSet'

const DEFAULT_STATE: any = {
  data: []
}
export interface ACTIONTYPE {
  type: string,
  data: any
}
export default function colorSet(state: any = DEFAULT_STATE, action: ACTIONTYPE) {
  switch (action.type) {
    case GETCOLOR:
      return state
    case SETCOLOR:
      return [...action.data]
    default:
      return state
  }
}