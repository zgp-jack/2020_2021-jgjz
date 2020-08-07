import { GETCONTENT, SETCONTENT } from '../constants/content'

const DEFAULT_STATE: any = {
  data: []
}
export interface ACTIONTYPE {
  type: string,
  data: any
}
export default function content(state: any = DEFAULT_STATE, action: ACTIONTYPE) {
  switch (action.type) {
    case GETCONTENT:
      return state
    case SETCONTENT:
      return [...action.data]
    default:
      return state
  }
}