import Taro, { Config, useEffect, useState, useRouter, useShareAppMessage } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import CalendarModal from '../../components/attendanceModal';
import { IsShare  } from '../../config/store';
import { bkGetShareExcelDataAction, shareExcelDataAction } from '../../utils/request/index';
import Msg from '../../utils/msg';
import { IMGCDNURL } from '../../config'
import classnames from 'classnames'
import './index.scss'

interface DateTyep {
  id: string | number,
  name: string | number,
  type?: {
    amount?: {
      num: string | number
    },
    borrow?: {
      borrow: string | number
    },
    hour?: {
      work_time: string,
      over_time: string,
    },
    work?: {
      work_time: string,
      over_time: string,
    }
  }
  amount: boolean,
  borrow: boolean,
  hour: boolean,
  work: boolean,
}

export default function Share() {
  const router: Taro.RouterInfo = useRouter();
  const { time, identity, session, id } = router.params;
  // 月份
  const [date, setDate] = useState('');
  // 年
  const [year, setYear] = useState();
  //月
  const [month, setMonth] = useState('');
  const [fixedTab, setFixedTab] = useState<any[]>([])
  const [tebArr, setTabArr] = useState<any[]>([])
  const [data, setData] = useState<any>([{}, {}, {}])
  const [display, setDisplay] = useState<boolean>(false)
  // 异常界面
  const [busy, setBusy] = useState<boolean>(false);
  // 一键对公
  const handleShare = () => {
    setDisplay(true)
  }
  // 取消
  const handleClose = () => {
    setDisplay(false)
  }
  const addZero = (num) => {
    if (parseInt(num) < 10) {
      num = '0' + num;
    }
    return num;
  }
  useEffect(() => {
    if (time){
      let date = {
        month: time.split('-')[1],
        year: time.split('-')[0],
      }
      const month = parseInt(date.month);
      const title = date.year + '年' + month +'月对工清单';
      console.log(data,'data');
      Taro.setNavigationBarTitle({
        title,
      })
    }
    Taro.setStorageSync(IsShare,true);
    getList(time);
  }, [])
  useShareAppMessage(() => {
    return {
      title: '记工记账怕丢失？用鱼泡网记工，方便安全！数据永不丢失~',
      imageUrl: `${IMGCDNURL}shareIconImg.png`,
      path: `/pages/share/index?time=${time}&identity=${identity}&session=${session}`
    }
  })
  const formatFloatItme = (f, digit) => {
    var m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
  }
  // 获取数据
  const getList = (newTime: string) => {
    let params = {
      date: newTime,
      identity,
      session,
      worker_id:id
    };
    bkGetShareExcelDataAction(params).then(res => {
      if(res.code === 200 ){
        setBusy(false)
        if (res.data.length > 0) {
          const date: any = newTime.split("-");
          let month;
          if (parseInt(date[1]) < 10) {
            month = date[1].slice(1, 2);
          } else {
            month = parseInt(date[1])
          }
          const timeDate = new Date(parseInt(date[0]), month, 0);
          const day = timeDate.getDate();
          const dayArr: DateTyep[] = [];
          for (var k = 1; k <= day; k++) {
            let obj: any = {
              id: k,
              name: k,
              // default: true
            }
            dayArr.push(obj);
          }
          // 设置列表左边
          const defaultArr = [
            { id: 1, name: '工人', },
            { id: 2, name: '记工类型' },
            { id: 3, name: '本月总计' },
          ]
          let arrObj = {
            list: dayArr,
          }
          let List: any[] = [];
          List.push(arrObj);
          const fixedTabObj = {
            list: defaultArr
          }
          // 左边第一行
          let leftArr: any[] = [];
          leftArr.push(fixedTabObj);
          // 右边第一行
          let rightArr: any[] = [];
          let firstArr: any = [];
          const item = JSON.parse(JSON.stringify(dayArr))
          for (let i = 0; i < item.length; i++) {
            item[i].default = true;
          }
          firstArr = item;
          let first = { list: firstArr };
          rightArr.push(first);
          // 日期
          // 工人
          let arr: any[] = [];
          let listArr: any[] = [];
          let numArr: any[] = [];
          let numDate: any[] = [];
          let jigongSum: any = [];
          let daySum: any = [];
          let workSum: any = [];
          let borrowNumSum: any = [];
          let hourNumList: any[] = [];
          let workNumList: any[] = [];
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              let arrObj: any = {};
              let dayObj: any = {};
              let list: any[] = [];
              let dayList: any[] = [];
              let obj: any = {};
              obj.id = res.data[i].id;
              obj.name = res.data[i].name;
              obj.default = true;
              let typeObj: any = {};
              typeObj.type = {};
              // 记工,包工(量),借支, 包工(天)
              let hourSumWork, hourSumTime, amountSum, borrowSum, workSumWork, workSumTime;
              // 右边内容
              const dayItem: DateTyep[] = JSON.parse(JSON.stringify(dayArr));
              // 遍历每一天
              // for (let j = 0; j < dayItem.length; j++) {
              // 记工
              if (res.data[i].hour.length > 0) {
                typeObj.type.hour = true;
                hourSumWork = toFixedFnNum(res.data[i].hour.reduce((accumulator, currentValue) => accumulator + Number(toFixedFnNum(currentValue.total.work_time)), 0))
                hourSumTime = toFixedFnNum(res.data[i].hour.reduce((accumulator, currentValue) => accumulator + Number(toFixedFnNum(currentValue.total.over_time)), 0))
              }
              //  包工(量)
              if (res.data[i].amount.length > 0) {
                typeObj.type.amount = true;
                amountSum = (res.data[i].amount.reduce((accumulator, currentValue) => accumulator + currentValue.list.length, 0));
              }
              //借支
              if (res.data[i].borrow.length > 0) {
                typeObj.type.borrow = true;
                borrowSum = (toFixedFn(res.data[i].borrow.reduce((accumulator, currentValue) => {
                  // let a = new Number(toFixedFn(currentValue.total.money));
                  // let b = parseFloat(toFixedFn(currentValue.total.money));
                  // console.log(a,'aaaa')
                  // console.log(b,'bbbbbb')
                  // const num: any = (toFixedFn(currentValue.total.money)).split('.');
                  // const left = num[0]*100;
                  // const right = num[1];
                  // console.log(left,'left');
                  // console.log(right,'right')
                  // const sum = (left + right) /100;
                  // console.log(sum,'numda dbskb ak')
                  const a: any = parseFloat(toFixedFn(currentValue.total.money) * 100 / 100);
                  console.log(a, 'asdsadsadas');
                  const sums = accumulator + a;
                  return sums
                }, 0)));
                console.log(borrowSum, 'borrowSum')
              }
              // 包工(天)
              if (res.data[i].work.length > 0) {
                typeObj.type.work = true
                console.log(res.data[i].work, '我饿大家扩散的空间啊是')
                workSumWork = toFixedFnNum(res.data[i].work.reduce((accumulator, currentValue) => accumulator + Number(toFixedFnNum(currentValue.total.work_time)), 0))
                workSumTime = toFixedFnNum(res.data[i].work.reduce((accumulator, currentValue) => accumulator + Number(toFixedFnNum(currentValue.total.over_time)), 0))
              }
              console.log(workSumTime, 'workSumTime')
              for (let j = 0; j < dayItem.length; j++) {
                if (res.data[i].hour.length > 0) {
                  for (let z = 0; z < res.data[i].hour.length; z++) {
                    if (res.data[i].hour[z].date_num == dayItem[j].name) {
                      let type: any = {
                        hour: {
                          work_time: '',
                          over_time: '',
                        }
                      };
                      if (dayItem[j].type) {
                        const data = JSON.parse(JSON.stringify(dayItem[j]));
                        if (data.type) {
                          data.type.hour.work_time = toFixedFnNum(((res.data[i].hour[z].total.work_time)));
                          data.type.hour.over_time = toFixedFnNum((res.data[i].hour[z].total.over_time));
                          dayItem[j] = data;
                        }
                      } else {
                        type.hour.work_time = toFixedFnNum((res.data[i].hour[z].total.work_time));
                        type.hour.over_time = toFixedFnNum((res.data[i].hour[z].total.over_time));
                        dayItem[j].type = type;
                      }
                    }
                  }
                }
                if (res.data[i].amount.length > 0) {
                  for (let z = 0; z < res.data[i].amount.length; z++) {
                    if (res.data[i].amount[z].date_num == dayItem[j].name) {
                      let type: any = {
                        amount: {
                          num: '',
                        }
                      };
                      if (dayItem[j].type) {
                        if (dayItem[j].type) {
                          const data = JSON.parse(JSON.stringify(dayItem[j]))
                          type.amount.num = res.data[i].amount[z].list.length;
                          data.type.amount = type.amount;
                          dayItem[j] = data;
                        }
                      } else {
                        type.amount.num = res.data[i].amount[z].list.length;
                        dayItem[j].type = type;
                      }
                    }
                  }
                }
                if (res.data[i].borrow.length > 0) {
                  for (let z = 0; z < res.data[i].borrow.length; z++) {
                    if (res.data[i].borrow[z].date_num == dayItem[j].name) {
                      let type: any = {
                        borrow: {
                          borrow: '',
                        }
                      };
                      if (dayItem[j].type) {
                        if (dayItem[j].type) {
                          const data = JSON.parse(JSON.stringify(dayItem[j]))
                          type.borrow.borrow = toFixedFn((res.data[i].borrow[z].total.money));
                          data.type.borrow = type.borrow;
                          dayItem[j] = data;
                        }
                      } else {
                        type.borrow.borrow = toFixedFn((res.data[i].borrow[z].total.money));
                        console.log(type.borrow.borrow, 'type.borrow.borrow')
                        dayItem[j].type = type;
                      }
                    }
                  }
                }
                if (res.data[i].work.length > 0) {
                  for (let z = 0; z < res.data[i].work.length; z++) {
                    if (res.data[i].work[z].date_num == dayItem[j].name) {
                      let type: any = {
                        work: {
                          work_time: '',
                          over_time: '',
                        }
                      };
                      if (dayItem[j].type) {
                        if (dayItem[j].type) {
                          const data = JSON.parse(JSON.stringify(dayItem[j]))
                          type.work.work_time = toFixedFnNum((res.data[i].work[z].total.work_time));
                          type.work.over_time = toFixedFnNum((res.data[i].work[z].total.over_time));
                          data.type.work = type.work;
                          dayItem[j] = data;
                        }
                      } else {
                        type.work.work_time = toFixedFnNum((res.data[i].work[z].total.work_time));
                        type.work.over_time = toFixedFnNum((res.data[i].work[z].total.over_time));
                        dayItem[j].type = type;
                      }
                    }
                  }
                }
              }
              const lastDay = JSON.parse(JSON.stringify(dayArr));
              let numHour, numWork, numBorrow, numAmount;
              for (let b = 0; b < lastDay.length; b++) {
                // 记工
                if (res.data[i].work.length > 0) {
                  for (let n = 0; n < res.data[i].work.length; n++) {
                    if (res.data[i].work[n].date_num == lastDay[b].name) {
                      numWork = true
                      if (res.data[i].work[n].list) {
                        let work: any = {
                          work_time: '',
                          over_time: '',
                        }
                        work.work_time = res.data[i].work[n].list.reduce((accumulator, currentValue) => accumulator + Number(toFixedFnNum(currentValue.work_time)), 0)
                        work.over_time = res.data[i].work[n].list.reduce((accumulator, currentValue) => accumulator + Number(toFixedFnNum(currentValue.over_time || 0)), 0)
                        let obj = {
                          name: lastDay[b].name,
                          work_time: res.data[i].work[n].list.reduce((accumulator, currentValue) => accumulator + Number(toFixedFnNum(currentValue.work_time)), 0),
                          over_time: res.data[i].work[n].list.reduce((accumulator, currentValue) => accumulator + Number(toFixedFnNum(currentValue.over_time || 0)), 0)
                        }
                        workNumList.push(obj)
                        if (lastDay[b].type) {
                          const data = JSON.parse(JSON.stringify(lastDay[b].type));
                          data.hour = work;
                          lastDay[b] = data;
                        } else {
                          let type = {
                            work: {
                              work_time: '',
                              over_time: '',
                            }
                          }
                          type.work.work_time = res.data[i].work[n].list.reduce((accumulator, currentValue) => accumulator + Number(toFixedFnNum(currentValue.work_time || 0)), 0);
                          type.work.over_time = res.data[i].work[n].list.reduce((accumulator, currentValue) => accumulator + Number(toFixedFnNum(currentValue.over_time || 0)), 0)
                          lastDay[b].type = type;
                        }
                      }
                    }
                  }
                }
                // 记天
                if (res.data[i].hour.length > 0) {
                  for (let n = 0; n < res.data[i].hour.length; n++) {
                    if (res.data[i].hour[n].date_num == lastDay[b].name) {
                      numHour = true;
                      if (res.data[i].hour[n].list) {
                        let hour: any = {
                          work_time: '',
                          over_time: '',
                        }
                        for (let j = 0; j < res.data[i].hour.length; j++) {
                        }
                        hour.work_time = res.data[i].hour[n].list.reduce((accumulator, currentValue) => accumulator + (toFixedFnNum(currentValue.work_time)), 0)
                        hour.over_time = res.data[i].hour[n].list.reduce((accumulator, currentValue) => accumulator + (toFixedFnNum(currentValue.over_time || 0)), 0);
                        let obj = {
                          name: lastDay[b].name,
                          work_time: res.data[i].hour[n].list.reduce((accumulator, currentValue) => accumulator + (toFixedFnNum(currentValue.work_time), 0)),
                          over_time: res.data[i].hour[n].list.reduce((accumulator, currentValue) => accumulator + (toFixedFnNum(currentValue.over_time || 0)), 0)
                        }
                        hourNumList.push(obj)
                        if (lastDay[b].type) {
                          const data = JSON.parse(JSON.stringify(lastDay[b].type));
                          data.hour = hour;
                          lastDay[b] = data;
                        } else {
                          let type = {
                            hour: {
                              work_time: '',
                              over_time: '',
                            }
                          }
                          type.hour.work_time = res.data[i].hour[n].list.reduce((accumulator, currentValue) => accumulator + Number(toFixedFnNum(currentValue.work_time || 0)), 0);
                          type.hour.over_time = res.data[i].hour[n].list.reduce((accumulator, currentValue) => accumulator + Number(toFixedFnNum(currentValue.over_time || 0)), 0)
                          lastDay[b].type = type;
                        }
                      }
                    }
                  }
                }
                // 按量
                if (res.data[i].amount.length > 0) {
                  for (let n = 0; n < res.data[i].amount.length; n++) {
                    if (res.data[i].amount[n].date_num == lastDay[b].name) {
                      numAmount = true
                      if (res.data[i].amount[n].list) {
                        let amount: any = {
                          num: '',
                        }
                        amount.num = res.data[i].amount.reduce((accumulator, currentValue) => accumulator + (currentValue.list.length || 0), 0)
                        if (lastDay[b].type) {
                          const data = JSON.parse(JSON.stringify(lastDay[b]));
                          data.type.amount = amount;
                          lastDay[b] = data;
                        } else {
                          let type: any = {
                            amount: {
                              num: '',
                            }
                          }
                          type.amount.num = res.data[i].amount.reduce((accumulator, currentValue) => accumulator + (currentValue.list.length || 0), 0)
                          lastDay[b].type = type;
                        }
                      }
                    }
                  }
                }
                // 借支
                if (res.data[i].borrow.length > 0) {
                  for (let n = 0; n < res.data[i].borrow.length; n++) {
                    if (res.data[i].borrow[n].date_num == lastDay[b].name) {
                      numBorrow = true;
                      if (res.data[i].borrow[n].list) {
                        let borrowList: any = {
                          borrow: '',
                        }
                        borrowList.borrow = res.data[i].borrow[n].list.reduce((accumulator, currentValue) => accumulator + (currentValue.money || 0), 0)
                        if (lastDay[b].type) {
                          const data = JSON.parse(JSON.stringify(lastDay[b].type));
                          data.borrow = borrowList;
                          lastDay[b] = data;
                        } else {
                          let type: any = {
                            borrow: {
                              borrow: '',
                            }
                          }
                          type.borrow.borrow = res.data[i].borrow[n].list.reduce((accumulator, currentValue) => accumulator + (currentValue.money.length || 0), 0)
                          lastDay[b].type = type;
                        }
                      }
                    }
                  }
                }
              }
              console.log(hourSumTime, 'numWork');
              console.log(workSumTime, 'numHour')
              let lastObj = [
                { id: 1, name: '总计', default: true },
                {
                  id: 2, type: {
                    hour: numHour,
                    work: numWork,
                    borrow: numBorrow,
                    num: numAmount,
                  }
                },
                {
                  hour: {
                    work_time: hourSumWork,
                    over_time: hourSumTime,
                  },
                  work: {
                    work_time: workSumWork,
                    over_time: workSumTime,
                  },
                  borrow: {
                    borrow: borrowSum
                  },
                  amount: {
                    num: amountSum
                  }
                }
              ]
              let sumObj = {
                hour: {
                  work_time: hourSumWork,
                  over_time: hourSumTime,
                },
                work: {
                  work_time: workSumWork,
                  over_time: workSumTime,
                },
                borrow: {
                  borrow: borrowSum
                },
                amount: {
                  num: amountSum
                }
              }
              console.log(obj, typeObj, sumObj, 'obj, typeObj, sumObj')
              list.push(obj, typeObj, sumObj);
              arrObj.list = list;
              arrObj.type = {
                hour: false,
                borrow: false,
                amount: false,
                work: false,
              }
              // dayList.push(dayItem);
              dayObj.list = dayItem;
              dayObj.type = {
                hour: false,
                borrow: false,
                amount: false,
                work: false,
              };
              for (let z = 0; z < dayItem.length; z++) {
                if (dayItem[z].type) {
                  if (dayItem[z].type.hour) {
                    arrObj.type.hour = true;
                    dayObj.type.hour = true;
                  }
                  if (dayItem[z].type.borrow) {
                    arrObj.type.borrow = true;
                    dayObj.type.borrow = true
                  }
                  if (dayItem[z].type.amount) {
                    arrObj.type.amount = true;
                    dayObj.type.amount = true
                  }
                  if (dayItem[z].type.work) {
                    arrObj.type.work = true;
                    dayObj.type.work = true
                  }
                }
              }
              // numArr =
              let numObj = {
                list: lastObj
              }
              let numDateObj = {
                list: lastDay,
                type: {
                  hour: numHour,
                  work: numWork,
                  borrow: numBorrow,
                  num: numAmount,
                }
              }
              numDate = [numDateObj]
              numArr = [numObj];
              arr.push(arrObj);
              listArr.push(dayObj);
            };
          }
          let sumHour, sumWork, sumBorrow, sumAmount;
          let hourData: any[] = [], workData: any[] = [], amountData: any[] = [], borrowData: any[] = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].hour && res.data[i].hour) {
              hourData.push(...res.data[i].hour)
            }
            if (res.data[i].work && res.data[i].work) {
              workData.push(...res.data[i].work)
            }
            if (res.data[i].borrow && res.data[i].borrow) {
              borrowData.push(...res.data[i].borrow)
            }
            if (res.data[i].amount && res.data[i].amount) {
              amountData.push(...res.data[i].amount)
            }
          }
          let hourDataSum, amountDataSum, borrowDataSum, workDataSum;
          if (hourData && hourData.length > 0) {
            let newArr: any[] = []
            hourData.forEach((el: any) => {
              const result = newArr.findIndex((ol: any) => { return el.date_num === ol.date_num })
              if (result !== -1) {
                // newArr[result].total.over_time = Number(toFixedFnNum(newArr[result].total.over_time)) + Number(toFixedFnNum(el.total.over_time))
                // newArr[result].total.work_time = Number(toFixedFnNum(newArr[result].total.work_time)) + Number(toFixedFnNum(el.total.work_time))
                newArr[result].total.over_time = formatFloatItme(((toFixedNum(newArr[result].total.over_time)) + (toFixedNum(el.total.over_time))), 2)
                newArr[result].total.work_time = formatFloatItme((toFixedNum(newArr[result].total.work_time)) + (toFixedNum(el.total.work_time)), 2)
              } else {
                newArr.push(el)
              }
            })
            hourDataSum = newArr;
          }
          if (amountData && amountData.length > 0) {
            let newArr: any[] = []
            amountData.forEach((el: any) => {
              const result = newArr.findIndex((ol: any) => { return el.date_num === ol.date_num })
              if (result !== -1) {
                newArr[result].list = [...newArr[result].list, ...el.list];
              } else {
                newArr.push(el)
              }
            })
            amountDataSum = newArr;
          }
          if (borrowData && borrowData.length > 0) {
            let newArr: any[] = []
            borrowData.forEach((el: any) => {
              const result = newArr.findIndex((ol: any) => { return el.date_num === ol.date_num })
              if (result !== -1) {
                newArr[result].total.money = formatFloatItme(((toFixedNum(newArr[result].total.money)) + (toFixedNum(el.total.money))), 2)
                // newArr[result].total.money = Number(toFixedFn(newArr[result].total.money)) + Number(toFixedFn(el.total.money))
              } else {
                newArr.push(el)
              }
            })
            borrowDataSum = newArr;
          }
          if (workData && workData.length > 0) {
            console.log(workData, 'workDataworkDataworkData')
            let newArr: any[] = []
            workData.forEach((el: any) => {
              const result = newArr.findIndex((ol: any) => { return el.date_num === ol.date_num })
              if (result !== -1) {
                console.log('1111111')
                newArr[result].total.over_time = formatFloatItme(((toFixedNum(newArr[result].total.over_time)) + (toFixedNum(el.total.over_time))), 2)
                newArr[result].total.work_time = formatFloatItme((toFixedNum(newArr[result].total.work_time)) + (toFixedNum(el.total.work_time)), 2)
                // console.log(toFixedNum(newArr[result].total.work_time),'toFixedNumtoFixedNum')
                // console.log(toFixedNum(el.total.work_time),'el.total.work_time')
                // console.log(newArr[result].total.work_time,' newArr[result].total.over_time')
                // return;
              } else {
                newArr.push(el)
              }
            })
            workDataSum = newArr;
          }
          const dayArrList = JSON.parse(JSON.stringify(dayArr));
          for (let i = 0; i < dayArrList.length; i++) {
            if (hourDataSum && hourDataSum.length > 0) {
              sumHour = true;
              for (let j = 0; j < hourDataSum.length; j++) {
                if (hourDataSum[j].date_num == dayArrList[i].name) {
                  let type = {
                    hour: {
                      work_time: toFixedFnNum(hourDataSum[j].total.work_time),
                      over_time: toFixedFnNum(hourDataSum[j].total.over_time)
                    }
                  }
                  if (dayArrList[i].type) {
                    const data = JSON.parse(JSON.stringify(dayArrList[i]));
                    data.type.hour = type.hour;
                    dayArrList[i] = data;
                  } else {
                    dayArrList[i].type = type;
                  }
                }
              }
            }
            // console.log(workDataSum,'workDataSum')
            if (workDataSum && workDataSum.length > 0) {
              sumWork = true;
              for (let j = 0; j < workDataSum.length; j++) {
                // return;
                if (workDataSum[j].date_num == dayArrList[i].name) {
                  let type = {
                    work: {
                      work_time: toFixedFnNum(workDataSum[j].total.work_time),
                      over_time: toFixedFnNum(workDataSum[j].total.over_time)
                    }
                  }
                  if (dayArrList[i].type) {
                    const data = JSON.parse(JSON.stringify(dayArrList[i]));
                    data.type.work = type.work;
                    dayArrList[i] = data;
                  } else {
                    dayArrList[i].type = type;
                  }
                }
              }
            }
            if (amountDataSum && amountDataSum.length > 0) {
              sumAmount = true
              for (let j = 0; j < amountDataSum.length; j++) {
                if (amountDataSum[j].date_num == dayArrList[i].name) {
                  let type = {
                    amount: {
                      num: amountDataSum[j].list.length,
                    }
                  }
                  if (dayArrList[i].type) {
                    const data = JSON.parse(JSON.stringify(dayArrList[i]));
                    data.type.amount = type.amount;
                    dayArrList[i] = data;
                  } else {
                    dayArrList[i].type = type;
                  }
                }
              }
            }
            if (borrowDataSum && borrowDataSum.length > 0) {
              sumBorrow = true;
              for (let j = 0; j < borrowDataSum.length; j++) {
                if (borrowDataSum[j].date_num == dayArrList[i].name) {
                  let type = {
                    borrow: {
                      borrow: toFixedFn(borrowDataSum[j].total.money)
                    }
                  }
                  if (dayArrList[i].type) {
                    const data = JSON.parse(JSON.stringify(dayArrList[i]));
                    data.type.borrow = type.borrow;
                    dayArrList[i] = data;
                  } else {
                    dayArrList[i].type = type;
                  }
                }
              }
            }
          }
          let sum = {
            list: dayArrList,
            type: {
              hour: sumHour,
              borrow: sumBorrow,
              amount: sumAmount,
              work: sumWork,
            }
          }
          let amountDataSumNum;
          let lengthArr: any[] = [];
          // 按量
          if (amountDataSum && amountDataSum.length > 0) {
            for (let o = 0; o < amountDataSum.length; o++) {
              for (let b = 0; b < amountDataSum[o].list.length; b++) {
                lengthArr.push(amountDataSum[o].list[b])
              }
            }
          }
          amountDataSumNum = lengthArr.length;
          // 按天
          let hourWorkNum = 0, hourOverNum = 0;
          if (hourDataSum && hourDataSum.length > 0) {
            for (let o = 0; o < hourDataSum.length; o++) {
              // hourWorkNum += Number(toFixedFnNum(hourDataSum[o].total.work_time));
              // hourOverNum += Number(toFixedFnNum(hourDataSum[o].total.over_time));
              hourWorkNum = formatFloatItme((hourWorkNum + (toFixedNum(hourDataSum[o].total.work_time))), 2)
              hourOverNum = formatFloatItme((hourOverNum + (toFixedNum(hourDataSum[o].total.over_time))), 2)
            }
          }
          // 记工
          let workWorkNum = 0, workOverNum = 0;
          if (workDataSum && workDataSum.length > 0) {
            console.log(workDataSum, 'workDataSum');
            for (let o = 0; o < workDataSum.length; o++) {
              workWorkNum = formatFloatItme((workWorkNum + (toFixedNum(workDataSum[o].total.work_time))), 2)
              workOverNum = formatFloatItme((workOverNum + (toFixedNum(workDataSum[o].total.over_time))), 2)
              // workWorkNum += Number(toFixedNum(workDataSum[o].total.work_time));
              // workOverNum += Number(toFixedNum(workDataSum[o].total.over_time));
            }
          }
          // 借支
          console.log(borrowDataSum, 'borrowDataSum')
          let borrowNum = 0;
          if (borrowDataSum && borrowDataSum.length > 0) {
            for (let o = 0; o < borrowDataSum.length; o++) {
              borrowNum = formatFloatItme((borrowNum + (toFixedNum(borrowDataSum[o].total.money))), 2)
              // borrowNum += Number(toFixedFn(borrowDataSum[o].total.money));
            }
          }
          // 等于0就相当于没有记
          let amount;
          if (amountDataSumNum == 0) {
            amount = {}
          } else {
            amount = {
              num: amountDataSumNum,
            }
          }
          let borrow;
          if (borrowNum == 0) {
            borrow = {}
          } else {
            borrow = {
              borrow: toFixedFn(borrowNum),
            }
          }
          let hour;
          if (hourWorkNum == 0 && hourOverNum == 0) {
            hour = {}
          } else {
            hour = { work_time: toFixedFnNum(hourWorkNum), over_time: toFixedFnNum(hourOverNum) }
          }
          let work;
          console.log(workWorkNum, 'workWorkNumworkWorkNum111')
          if (workWorkNum == 0 && workOverNum == 0) {
            work = {}
          } else {
            work = { work_time: toFixedFnNum(workWorkNum), over_time: workOverNum }
          }
          console.log(work, 'work')
          let sumLeft = [
            { id: 1, name: '总计', default: true, isSum: true },
            {
              id: 2, type: {
                hour: sumHour,
                borrow: sumBorrow,
                amount: sumAmount,
                work: sumWork,
              }
            },
            {
              amount,
              borrow,
              hour,
              work,
            }
          ]
          let obj = {
            list: sumLeft,
            type: {
              hour: sumHour,
              borrow: sumBorrow,
              amount: sumAmount,
              work: sumWork,
            },
          }
          console.log(work, 'sumAmount');
          console.log(hour, 'sumWork')
          // 本月统计
          // 获取身份
          // let type = Taro.getStorageSync(Type);
          console.log(sum, 'listArr')
          if (identity == '1'&& !id) {
            setFixedTab([...leftArr, ...arr, obj]);
            setTabArr([...rightArr, ...listArr, sum]);
          } else {
            setFixedTab([...leftArr, ...arr]);
            setTabArr([...rightArr, ...listArr]);
          }
          // 设置里面的内容
        }
      } else {
        Msg(res.msg);
      }
    })
    .catch((e) => {
      setBusy(true)
    })
  }
  const toFixedFnNum = (num: any) => {
    let s = num + '';
    s = s.substring(0, s.indexOf(".") + 3);
    return Number(s);
  }
  const toFixedFn = (num: any) => {
    // let f = parseFloat(num);
    // if (isNaN(f)) {
    //   return false;
    // }
    //  f = Math.round(num * 1000) / 1000
    let s = num + '';
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    s = s.substring(0, s.indexOf(".") + 3);
    return s;
  }
  const toFixedNum = (num: any) => {
    // let f = parseFloat(num);
    // if (isNaN(f)) {
    //   return false;
    // }
    //  f = Math.round(num * 1000) / 1000
    let s = num + '';
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    s = s.substring(0, s.indexOf(".") + 3);
    // console.log((s),'sssssss')
    return Number(s);
  }
  // 设置时间
  const handleTime = (e) => {
    const time = e.detail.value;
    setYear(e.detail.value.slice(0, 4));
    setMonth(e.detail.value.slice(5, 8));
    getList(time);
  }
  return (
    <View className='AttendanceSheetContent'>
      <View>
        {busy &&
          <View className='busyBox'>
            <View>系统繁忙，刷新试试</View>
            <View className='refresh' onClick={() => getList(year + '-' + month)}>刷新</View>
          </View>
        }
        {!busy &&
          <View className='box'>
            {/* 左边固定 */}
          <View className='borderBottom'>
            {fixedTab.map((v, o) => (
              <View className='box-left' key={'v' + o}>
                {v.list.map((val, c) => (
                  <View className='middle' key={'c' + c}>
                    {!val.type && (!val.hour || !val.work || !val.borrow || !val.amount) && <View className={val.default && ((!v.type.hour || !v.type.work || !v.type.borrow || !v.type.amount) || (v.type.hour || v.type.work || v.type.borrow || v.type.amount)) ? 'box-none' : 'box-list-default'}>
                      <View
                        className={classnames({
                          'mt10': (v.type && val.isSum && ((v.type.hour || !v.type.work || !v.type.borrow || !v.type.amount) || (!v.type.type.hour || v.type.hour || !v.type.borrow || !v.type.amount) || (!v.type.hour || v.type.work || !v.type.borrow || !v.type.amount) || (!v.type.hour || !v.type.work || v.type.borrow || !v.type.amount) || (!v.type.hour || !v.type.work || !v.type.borrow || v.type.amount))),
                          'mt100': v.type && v.type.hour && v.type.work && v.type.borrow && v.type.amount,
                          'mt50': v.type && ((v.type.hour && v.type.work && v.type.borrow) || (v.type.hour && v.type.borrow && v.type.amount) || (v.type.hour && v.type.amount && v.type.work) || (v.type.work && v.type.borrow && v.type.amount)),
                          'mt20': v.type && ((v.type.hour && v.type.work) || (v.type.hour && v.type.borrow) || (v.type.hour && v.type.amount) || (v.type.work && v.type.borrow) || (v.type.work && v.type.amount) || (v.type.borrow && v.type.amount)),
                          'mt0': v.type && ((v.type.hour || !v.type.work || !v.type.borrow || !v.type.amount) || (!v.type.type.hour || v.type.hour || !v.type.borrow || !v.type.amount) || (!v.type.hour || v.type.work || !v.type.borrow || !v.type.amount) || (!v.type.hour || !v.type.work || v.type.borrow || !v.type.amount) || (!v.type.hour || !v.type.work || !v.type.borrow || v.type.amount))
                        }
                        )}
                      >{val.name}</View>
                      {/* {val.default &&
                        <View open-type="share">
                          <Button className='blued' open-type="share">
                            微信对工>
                        </Button>
                        </View>
                      } */}
                    </View>}
                    {val.type && <View>
                      <View className='box-list-type'>
                        {val.type.hour && <View className='box-height'>点工</View>}
                        {val.type.work && <View className='box-list-bao'>包工<View>（按天记）</View></View>}
                        {val.type.amount && <View className='box-list-bao'>包工<View>（按量记）</View></View>}
                        {val.type.borrow && <View className='box-height'>借支</View>}
                      </View>
                    </View>}
                    {!val.type && (val.hour || val.work || val.borrow || val.amount) && <View>
                      {JSON.stringify(val.hour) !== '{}' && <View className='box-list'>
                        <View>{val.hour.work_time}{val.hour.work_time || '0' ? '个工' : ''}</View>
                        <View>{val.hour.over_time}{val.hour.over_time || '0' ? '小时' : ''}</View>
                      </View>}
                      {JSON.stringify(val.work) !== '{}' && <View className='box-list-bao'>
                        <View>{val.work.work_time}{val.work.work_time || '0' ? '个工' : ''}</View>
                        <View>{val.work.over_time}{val.work.over_time || '0' ? '小时' : ''}</View>
                      </View>}
                      {JSON.stringify(val.amount) !== '{}' && <View className='box-height'>
                        <View>{val.amount.num}{val.amount.num ? '笔' : ''}</View>
                      </View>}
                      {JSON.stringify(val.borrow) !== '{}' && <View className='box-height'>
                        <View className='buled'>{val.borrow.borrow}</View>
                      </View>}
                    </View>}
                  </View>
                ))}
              </View>
            ))}
          </View>
            {/* 右边 */}
            <View className='box-scroll'>
              {tebArr.map(v => (
                <View className='box-right'>
                  {v.list.map(val => (
                    <View className='border'>
                      {val.default && <View className='box-list-default'>{val.name}日</View>}
                      {/* {!val.default && !val.type && <View className='box-height'></View>} */}
                      {val.type && <View>
                        {val.type.hour && v.type.hour ?
                          <View className='box-list-bao'>
                            <View>{val.type.hour.work_time}{val.type.hour.work_time || '0' ? '个工' : ''}</View>
                            <View>{val.type.hour.over_time}{val.type.hour.over_time || '0' ? '小时' : ''}</View>
                          </View> :
                          <View>{v.type.hour && <View className='box-list-bao'></View>}</View>
                        }
                        {val.type.work && v.type.work ?
                          <View className='box-list-bao'>
                            <View>{val.type.work.work_time}{val.type.work.work_time || '0' ? '个工' : ''}</View>
                            <View>{val.type.work.over_time}{val.type.work.over_time || '0' ? '小时' : ''}</View>
                          </View> :
                          <View>{v.type.work && <View className='box-list-bao'></View>}</View>
                        }
                        {val.type.amount && v.type.amount ?
                          <View className='box-height'>
                            <View>{val.type.amount.num}{val.type.amount.num ? '笔' : ''}</View>
                          </View> :
                          <View>{v.type.amount && <View className='box-list-bao'></View>}</View>
                        }
                        {val.type.borrow && v.type.borrow ?
                          <View className='box-height'>
                            <View className='buled'>{val.type.borrow.borrow}</View>
                          </View> :
                          <View>{v.type.borrow && <View className='box-list-bao'></View>}</View>
                        }
                      </View>}
                      {!val.type && v.type.hour && <View className='box-list-bao'></View>}
                      {!val.type && v.type.work && <View className='box-list-bao'></View>}
                      {!val.type && v.type.amount && <View className='box-list-bao'></View>}
                      {!val.type && v.type.borrow && <View className='box-list-bao'></View>}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        }
      </View>
      {
        !busy && tebArr.length <= 1 && <View className='noData'>暂无数据哦～</View>
      }
    </View>
  )
}

Share.config = {
  navigationBarTitleText: '考勤表',
} as Config
