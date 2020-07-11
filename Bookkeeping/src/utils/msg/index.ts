import Taro from '@tarojs/taro'


interface ShowBackModel {
  title?: string,
  msg: string,
  confirmText?: string,
  success?: () => void
}
export function errMsg(msg: string = '') {
  Taro.atMessage({
    'message': msg,
    'type': 'error',
  })
}

export default function Msg(msg: string, duration: number = 3000) {
  Taro.showToast({
    title: msg,
    icon: 'none',
    duration: duration
  })
}

export function ShowActionModal(data: string | ShowBackModel) {
  let { title = '温馨提示', confirmText = '确定', msg, success } = data as ShowBackModel
  Taro.showModal({
    title: title,
    content: (typeof data === 'string') ? data : msg,
    showCancel: false,
    confirmText: confirmText,
    success: () => {
      success && success()
    }
  })
}
// 月年
export function getdate(time) {
  const now = new Date(time);
  var times = (now.getMonth() + 1) + "月" + now.getDate()+'日';
  return times;
}


// 年月日
export function getTime(time) {
  const now = new Date(time);
  var times = now.getFullYear() + (now.getMonth() + 1) + now.getDate();
  console.log(times,'11111')
  return times;
}

// 
export function timestampToTime(timestamp) {
  var date = new Date(parseInt(timestamp));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  console.log(date,'31312321')
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + ':';
  var m = (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) + ':';
  var s = (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds());
  return Y + M + D + h + m + s;
}