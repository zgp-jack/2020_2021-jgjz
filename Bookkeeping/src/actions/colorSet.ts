import { GETCOLOR, SETCOLOR } from '../constants/colorSet';

export function setColor(data: any) {
  return {
    type: SETCOLOR,
    data: data
  }
}

export function getColor() {
  return {
    type: GETCOLOR
  }
}