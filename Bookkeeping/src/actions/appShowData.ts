import { GETAPPSHOWDATA, SETAPPSHOWDATA } from '../constants/AppShowData';

export function setAppShowData(data: any) {
  return {
    type: SETAPPSHOWDATA,
    data: data
  }
}

export function getAppShowData() {
  return {
    type: GETAPPSHOWDATA
  }
}