import { GETCLICKTIME, SETCLICKTIME } from '../constants/clickTIme';

export function setClickTIme(data: any) {
  return {
    type: SETCLICKTIME,
    data: data
  }
}

export function getClickTIme() {
  return {
    type: GETCLICKTIME
  }
}