import { GETDATALIST, SETDATALIST } from '../constants/list';

export function setDataList(data: any) {
  return {
    type: SETDATALIST,
    data: data
  }
}

export function getDataList() {
  return {
    type: GETDATALIST
  }
}