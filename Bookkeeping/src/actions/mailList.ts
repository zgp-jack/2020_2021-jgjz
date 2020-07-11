import { GETMAIILIST, SETMAIILIST } from '../constants/mailList';

export function setmailList(data: any) {
  return {
    type: SETMAIILIST,
    data: data
  }
}

export function getmailList() {
  return {
    type: GETMAIILIST
  }
}