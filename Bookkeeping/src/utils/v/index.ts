import Taro from '@tarojs/taro'
import { TotalData } from '../../config/store';
import { postErrorCountAction } from '../../utils/request/index'

// 是否是电话号码
export function isPhone(tel: string): boolean {
  let reg = /^1[0-9]{10}$/
  return reg.test(tel)
}

// 是否是数字
export function isNumber(num: any): boolean {
  let reg = /^[0-9]+$/
  return reg.test(num)
}

// 检测数字是否在某个区间内
interface IsVaildNumber {
  num: any,
  min: number,
  max: number
}
export function isVaildNumber({ num, min = 0, max = 10 }: IsVaildNumber): boolean {
  if (!isNumber(num)) return false
  return num >= min && num <= max
}

// 生成区间整数
export function randIntNumber(min: number = 0, max: number = 20): number {
  return Math.floor(Math.random() * (max - min)) + min
}

// 生成随机数
export function getRandNumber(min: number = 0, max: number = 20): number {
  return min + (Math.random() * (max - min));
}

// 检测是否是网址
export function isUrl(url: string): boolean {
  let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
  return reg.test(url)
}

// 检测必填
export function isRequire(val: string): boolean {
  let str = val.replace(/\s+/g, '');
  return (str != '' && str != null && str != undefined && str != 'null' && str != undefined)
}

// 内容必须有汉字 且不少于 min 字
export function isVaildVal(val: string, min: number = 15, max: number = 0): boolean {
  let reg = new RegExp("[\\u4E00-\\u9FFF]+");
  return max ? reg.test(val) && val.length >= min && val.length <= max : reg.test(val) && val.length >= min
}

// 检测是否是身份证
export function isIdcard(val: string): boolean {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(val)
}

// 检测数据类型
export function isType(data: any, type: string): boolean {
  let reg = Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
  if (!type) return reg
  if (reg == type) return true
  return false
}

// 检测是否是ios客户端
export function isIos(): boolean {
  let system = Taro.getSystemInfoSync()
  return system.platform === 'ios'
}


// 报错率统计
export function statistics(name:string){
  let Total = Taro.getStorageSync(TotalData);
  let TotalItem = JSON.parse(JSON.stringify(Total))
  console.log(TotalItem)
  if (TotalItem && TotalItem.length > 0) {
    const list = TotalItem.find(item => item.name == name);
    if (list) {
      list.num += 1;
    } else {
      let obj = {
        name,
        num: 1
      }
      TotalItem.push(obj);
    }
  } else {
    TotalItem = [
      {
        name,
        num: 1
      }
    ]
  }
  Taro.setStorageSync(TotalData, TotalItem) 
}

export function queyElementYPosition(selector: string, component?: any): Promise<any> {
  let query:any;
  if (process.env.TARO_ENV == 'h5') {
    query = Taro.createSelectorQuery().in(component)
  } else {
    query = Taro.createSelectorQuery().in(component.$scope)
  }
  return new Promise((resolve, reject) => {
    const tmp = query.select(selector)
      .fields({ size: true, rect: true, scrollOffset: true, dataset: true }, (rect: any) => {
        !!rect ? resolve(rect) : reject(rect);
      });
    tmp && tmp.exec();
  })
}

// 报错统计公用方法
export function postErrorCountFn(){
  let Total = Taro.getStorageSync(TotalData);
  let num = 0;
  if (Total.length > 0) {
    num = Total.reduce((accumulator, currentValue) => accumulator + currentValue.num, 0);
  }
  console.log(num,'111111')
  if (num >= 5){
    let stringArr: string[] = [];
    for (let i = 0; i < Total.length; i++) {
      if (Total[i].num) {
        for (let k = 0; k < Total[i].num; k++) {
          stringArr.push(Total[i].name)
        }
      }
    }
    console.log(stringArr.toString(), 'stringArrstringArrstringArr')
    let numParams = {
      type: stringArr.toString(),
    }
    postErrorCountAction(numParams).then(res => {
      console.log(res,'q1111')
      if (res.code === 200) {
        Taro.setStorageSync(TotalData, []);
      }
    })
  }
}