import { GETUSERLSIT, SETUSERLIST } from '../constants/userList';

export function setUserList(data: any) {
  return {
    type: SETUSERLIST,
    data: data
  }
}

export function getUserList() {
  return {
    type: GETUSERLSIT
  }
}