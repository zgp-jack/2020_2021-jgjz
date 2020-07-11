import { GETDATA, SETDATA } from '../constants/flowingWater';

export function setFlowingWater(data: any) {
  return {
    type: SETDATA,
    data: data
  }
}

export function getFlowingWater() {
  return {
    type: GETDATA
  }
}