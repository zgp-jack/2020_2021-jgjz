import { GETWORKERTYPE, SETWORKERTYPE } from '../constants/workerList';

export function setWorker(data: any) {
  return {
    type: SETWORKERTYPE,
    data: data
  }
}

export function getWorker() {
  return {
    type: GETWORKERTYPE
  }
}