import { GETTYPE, SETTYPE } from '../constants/typs';

export function setTypes(data: any) {
  return {
    type: SETTYPE,
    data: data
  }
}

export function getType() {
  return {
    type: GETTYPE
  }
}