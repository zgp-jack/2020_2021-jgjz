import { GET, SET } from '../constants/notepad';

export function setNotepad(data: any) {
  return {
    type: SET,
    data: data
  }
}

export function getNotepad() {
  return {
    type: GET
  }
}