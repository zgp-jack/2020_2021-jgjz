import { GETPHONELIST, SETPHINELIST } from '../constants/phoneList';

export function setPhoneList(data: any) {
  return {
    type: SETPHINELIST,
    data: data
  }
}

export function getPhoneList() {
  return {
    type: getPhoneList
  }
}