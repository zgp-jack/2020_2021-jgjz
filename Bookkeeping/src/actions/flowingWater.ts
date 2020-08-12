import { GETDATAWATER, SETDATAWATER } from '../constants/flowingWater';

export function setFlowingWater(data: any) {
  return {
    type: SETDATAWATER,
    data: data
  }
}

export function getFlowingWater() {
  return {
    type: GETDATAWATER
  }
}