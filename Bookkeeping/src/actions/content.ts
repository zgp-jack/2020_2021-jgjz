import { GETCONTENT, SETCONTENT } from '../constants/content';

export function setContent(data: any) {
  return {
    type: SETCONTENT,
    data: data
  }
}

export function getContent() {
  return {
    type: GETCONTENT
  }
}