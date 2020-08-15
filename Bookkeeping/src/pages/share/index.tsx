import Taro, { Config, useEffect, useState, useRouter } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import CalendarModal from '../../components/attendanceModal';
import { IsShare  } from '../../config/store';
import { bkGetShareExcelDataAction, shareExcelDataAction } from '../../utils/request/index';
import Msg from '../../utils/msg';
import './index.scss'



export default function Share() {
  const router: Taro.RouterInfo = useRouter();
  const { time, identity, session } = router.params;
  console.log(router.params,'router.params')
  console.log(time,'time');
  console.log(identity, 'identity');
  console.log(session, 'session');
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
    Taro.setStorageSync(IsShare,true);
    // // 进来获取本月数据
    // const time = new Date();
    // const newTime = time.getFullYear() + '-' + addZero(time.getMonth() + 1);
    // const years = time.getFullYear();
    // const months = addZero(time.getMonth() + 1);
    // setYear(years)
    // setMonth(months)
    // setDate(newTime);
    getList(time);
  }, [])
  // 获取数据
  const getList = (newTime: string) => {
    let params = {
      date: newTime,
      identity,
      session
    };
    // 获取本月天数
    // const time = newTime.setDate(0);
    // const day = time.getDate();
    // console.log(day);
    const curDate = new Date(newTime);
    /* 获取当前月份 */
    const curMonth = curDate.getMonth();
    /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    curDate.setMonth(curMonth + 1);
    /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
    curDate.setDate(0);
    const day = curDate.getDate();
    // 设置第一列的天数
    const dayArr: any[] = [];
    for (var k = 1; k <= day; k++) {
      let obj: any = {
        id: k,
        name: k,
        default: true
      }
      dayArr.push(obj);
    }
    //本月统计push 到数组第一个
    const obj = { id: '00', name: '本月统计', default: true };
    const arr = [obj, ...dayArr];
    let arrObj = {
      list: arr,
    }
    const tebArrList = JSON.parse(JSON.stringify(tebArr));
    tebArrList.push(arrObj);
    const fixedTabList = JSON.parse(JSON.stringify(fixedTab));
    const defaultArr = [
      { id: 1, name: '工人', default: true },
      { id: 2, name: '记工类型', default: true },
    ]
    const fixedTabObj = {
      list: defaultArr
    }
    fixedTabList.push(fixedTabObj);
    bkGetShareExcelDataAction(params).then(res => {
      console.log(res.data,'res.data')
      const data = res.data;
      let leftData: any = [];
      let rightData: any = [];
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let leftObj: any = {};
          // 右边第一个总计
          let rightObj: any = {};
          rightObj.name = 0;
          rightObj.type = {};
          rightObj.type.amount = '';
          rightObj.type.hour = {
            work_time: '',
            over_time: '',
          };
          rightObj.type.work = {
            work_time: '',
            over_time: '',
          };
          rightObj.type.borrow = '';
          // 设置左边的参数
          const leftListData: any[] = [];
          // 左边数据直接设置死
          // 姓名
          const leftName = { name: data[i].name };
          //点工类型
          const leftType: any = {};
          let hour;
          if (data[i].hour.length) {
            hour = true;
          }
          // 包工(天)
          let work;
          if (data[i].work.length) {
            work = true;
          }
          // 包工(量)
          let amount;
          if (data[i].amount.length) {
            amount = true
          }
          // 借支
          let borrow;
          if (data[i].borrow.length) {
            borrow = true;
          }
          const Type = {
            hour,
            work,
            amount,
            borrow,
          }
          leftType.type = Type;
          leftListData.push(leftName, leftType);
          leftObj.list = leftListData;
          leftData.push(leftObj);
          // 设置右边参数
          const rightListData: any[] = [];
          // 数组长度超过1就是显示几笔，为1的时候就显示内容
          // 记工
          const dayArrs = JSON.parse(JSON.stringify(dayArr));
          // 遍历每一天
          for (let j = 0; j < dayArrs.length; j++) {
            dayArrs[j].type = {}
            // 判断有记工
            if (data[i].hour.length > 0) {
              let num: any[] = [];
              for (let k = 0; k < data[i].hour.length; k++) {
                num.push(data[i].hour[k].total);
                // 判断是哪天给哪天设置值
                if (data[i].hour[k].date_num == dayArrs[j].name) {
                  if (data[i].hour[k].list) {
                    if (data[i].hour[k].list.length > 0) {
                      if (data[i].hour[k].list.length == 1) {
                        let hourData = {
                          work_time: data[i].hour[k].list[0].work_time,
                          overtime: data[i].hour[k].list[0].overtime
                        }
                        dayArrs[j].type.hour = hourData;
                      } else if (data[i].hour[k].list.length > 1) {
                        let hourData = {
                          num: data[i].hour[k].list.length + '笔'
                        }
                        dayArrs[j].type.hour = hourData;
                      }
                    }
                  }
                }
              }
              let work_time = 0;
              let over_time = 0;
              if (num.length > 0) {
                for (let z = 0; z < num.length; z++) {
                  if (num[z].work_time) {
                    work_time = work_time + (+num[z].work_time);
                  }
                  if (num[z].over_time) {
                    over_time = over_time + (+num[z].over_time);
                  }
                }
              }
              rightObj.type.hour.work_time = work_time;
              rightObj.type.hour.over_time = over_time;
            }
            // 判断有按天work
            if (data[i].work.length > 0) {
              let num: any[] = [];
              for (let k = 0; k < data[i].work.length; k++) {
                num.push(data[i].work[k].total);
                // 判断是哪天给哪天设置值
                if (data[i].work[k].date_num == dayArrs[j].name) {
                  if (data[i].work[k].list) {
                    if (data[i].work[k].list.length > 0) {
                      if (data[i].work[k].list.length == 1) {
                        let hourData = {
                          work_time: data[i].work[k].list[0].work_time,
                          overtime: data[i].work[k].list[0].overtime
                        }
                        dayArrs[j].type.work = hourData;
                      } else if (data[i].work[k].list.length > 1) {
                        let hourData = {
                          num: data[i].work[k].list.length
                        }
                        dayArrs[j].type.work = hourData;
                      }
                    }
                  }
                }
              }
              let work_time = 0;
              let over_time = 0;
              if (num.length > 0) {
                for (let z = 0; z < num.length; z++) {
                  if (num[z].work_time) {
                    work_time = work_time + (+num[z].work_time);
                  }
                  if (num[z].over_time) {
                    over_time = over_time + (+num[z].over_time);
                  }
                }
              }
              rightObj.type.work.work_time = work_time;
              rightObj.type.work.over_time = over_time;
            }
            // 判断按量 amount
            if (data[i].amount.length > 0) {
              let num: any[] = [];
              for (let k = 0; k < data[i].amount.length; k++) {
                // 判断是哪天给哪天设置值
                if (data[i].amount[k].date_num == dayArrs[j].name) {
                  // 按量返回的是数组
                  if (data[i].amount[k].total.length > 0) {
                    for (let b = 0; b < data[i].amount[k].total.length; b++) {
                      num.push(data[i].amount[k].total[b]);
                    }
                  }
                  if (data[i].amount[k].list) {
                    if (data[i].amount[k].list.length > 0) {
                      if (data[i].amount[k].list.length == 1) {
                        let hourData = {
                          unit_num: data[i].work[k].list[0].unit_num,
                          unit: data[i].work[k].list[0].unit
                        }
                        dayArrs[j].type.amount = hourData;
                      } else if (data[i].amount[k].list.length > 1) {
                        let hourData = {
                          num: data[i].amount[k].list.length + '笔'
                        }
                        dayArrs[j].type.amount = hourData;
                      }
                    }
                  }
                }
              }
              if (num.length > 0) {
                const unitMap = {}
                num.forEach((item) => {
                  if (unitMap[item.unit_name]) {
                    unitMap[item.unit_name] += +item.sum
                  } else {
                    unitMap[item.unit_name] = +item.sum
                  }
                })
                rightObj.type.amount = [unitMap];
              }
            }
            // 借支
            if (data[i].borrow.length > 0) {
              let num: any[] = [];
              for (let k = 0; k < data[i].borrow.length; k++) {
                num.push(data[i].borrow[k].total);
                // 判断是哪天给哪天设置值
                if (data[i].borrow[k].date_num == dayArrs[j].name) {
                  if (data[i].borrow[k].list) {
                    if (data[i].borrow[k].list.length > 0) {
                      if (data[i].borrow[k].list.length == 1) {
                        let hourData = {
                          money: data[i].borrow[k].list[0].money
                        }
                        dayArrs[j].type.borrow = hourData;
                      } else if (data[i].borrow[k].list.length > 1) {
                        let hourData = {
                          num: data[i].borrow[k].list.length + '笔'
                        }
                        dayArrs[j].type.borrow = hourData;
                      }
                    }
                  }
                }
              }
              let money = 0;
              if (num.length > 0) {
                for (let z = 0; z < num.length; z++) {
                  if (num[z].money) {
                    money = money + (+num[z].money);
                  }
                }
              }
              rightObj.type.borrow = money;
            }
          }
          const list = [rightObj, ...dayArrs];
          rightListData.push(list)
          let rightDataObj = {
            list: rightListData[0],
          }
          rightData.push(rightDataObj)
        }
      }
      setFixedTab([...fixedTabList, ...leftData]);
      setTabArr([...tebArrList, ...rightData]);
      // console.log(rightData,'rightData')
    })
  }
  // 设置时间
  const handleTime = (e) => {
    const time = e.detail.value;
    setYear(e.detail.value.slice(0, 4));
    setMonth(e.detail.value.slice(5, 8));
    getList(time);
  }
  return (
    <View className='content'>
      {/* <View className='top'>
        <View className='top-time'>
          <Picker
            mode='date'
            fields='month'
            onChange={(e) => handleTime(e)}
            value={''}
          >
            <Text>{year}年<Text>{month}</Text></Text>
          </Picker>
        </View>
        <View>以下是你的记工，点击可查看详情</View>
      </View> */}
      <View className='box'>
        {/* 左边固定 */}
        <View>
          {fixedTab.map(v => (
            <View className='box-left'>
              {v.list.map(val => (
                <View className='box-border'>
                  {!val.type && <View className={val.default ? 'box-list-default' : 'box-list'}>
                    <View className='name'>{val.name}</View>
                    {!val.default &&
                      <View className='blued'>
                        微信对工 >
                    </View>
                    }
                  </View>}
                  {val.type &&
                    <View className='box-list-type'>
                      {val.type.hour && <View className='box-list'>点工</View>}
                      {val.type.work && <View className='box-list-bao'>包工<View>（按天记）</View></View>}
                      {val.type.amount && <View className='box-list-bao'>包工<View>（按量记）</View></View>}
                      {val.type.borrow && <View className='box-list'>借支</View>}
                    </View>
                  }
                </View>
              ))}
            </View>
          ))}
        </View>
        {/* 右边 */}
        <View className='box-scroll'>
          {tebArr.map(v => (
            <View>
              <View className='box-right'>
                {v.list.map(val => (
                  <View className='box-border'>
                    {!val.type && <View className={val.default ? 'box-list-default' : 'box-list'}>{val.name}</View>}
                    {val.type &&
                      <View className='box-list-bao'>
                        {val.name == 0 && <View>
                          {val.type.hour.work_time && <View className='box-list-bao'>
                            {val.type.hour.work_time && <View>{val.type.hour.work_time}个工</View>}
                            {val.type.hour.over_time && <View>{val.type.hour.over_time}小时</View>}
                          </View>
                          }
                          {val.type.work.work_time && <View className='box-list-bao'>
                            {val.type.work.work_time !== '' && <View>{val.type.work.work_time}个工</View>}
                            {val.type.work.over_time !== '' && <View>{val.type.work.over_time}小时</View>}
                          </View>
                          }
                          {val.type.amount && val.type.amount.length > 0 && <View>
                            {val.type.amount.map(value => (
                              <View className='box-list-bao'>
                                {value && <View>111</View>}
                                {value && <View>222</View>}
                              </View>
                            ))}
                          </View>
                          }
                          {/* {val.type.borrow!='' && 
                        <View className='box-list-bao'>
                          {val.type.borrow && <View>{val.type.borrow}1111</View>}
                        </View>
                        } */}
                          {val.type.borrow && <View className='box-list-bao'>{val.type.borrow}</View>}
                        </View>}
                        {val.name != 0 && <View>
                          <View className='box-list-type'>
                            {val.type.hour && <View>
                              {val.type.hour.num && <View>{val.type.hour.num}</View>}
                              {val.type.hour.work_time || val.type.hour.overtime &&
                                <View>
                                  <View className='box-list-bao'>{val.type.hour.work_time}个工</View>
                                  <View className='box-list-bao'>{val.type.hour.overtime}小时</View>
                                </View>
                              }
                            </View>}
                            {val.type.work && <View>
                              {val.type.work.num && <View>{val.type.work.num}</View>}
                              {val.type.work.work_time || val.type.work.overtime &&
                                <View>
                                  <View className='box-list-bao'>{val.type.work.work_time}个工</View>
                                  <View className='box-list-bao'>{val.type.work.overtime}小时</View>
                                </View>
                              }
                            </View>}
                            {val.type.amount && <View>
                              {val.type.amount.num && <View>{val.amount.work.num}</View>}
                              {val.type.amount.work_time || val.type.amount.overtime &&
                                <View>
                                  <View className='box-list-bao'>{val.type.amount.unit_num}</View>
                                  <View className='box-list-bao'>{val.type.amount.unit}</View>
                                </View>
                              }
                            </View>}
                            {val.type.borrow && <View className='box-list-bao'>{val.type.borrow.money}</View>}
                          </View>
                        </View>}
                      </View>
                    }
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
      {/* <View className='footer-btn'>
        <View className='footer-btn-box'>
          <View className='footer-btn-box-left' onClick={handleShare}>
            <View>一键对工</View>
            <View className='footer-btn-box-left-title'>发送到工人微信群快速对工</View>
          </View>
          <View className='footer-btn-box-right'>
            <View>记工</View>
            <View className='footer-btn-box-right-title'>(点工 包工 借支)</View>
          </View>
        </View>
      </View>
      <CalendarModal display={display} handleClose={handleClose} /> */}
    </View>
  )
}

Share.config = {
  navigationBarTitleText: '考勤表',
} as Config
