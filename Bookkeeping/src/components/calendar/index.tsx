import Taro, { useState, useEffect,useDidHide } from '@tarojs/taro'
import { View, Image, Text, Input, Checkbox, Picker, ScrollView, Swiper, SwiperItem } from '@tarojs/components'
import classnames from 'classnames'
import { useDispatch, useSelector } from '@tarojs/redux'
import { setClickTIme } from '../../actions/clickTIme'
import { isIos } from '../../utils/v'
import {IMGCDNURL} from '../../config'
import './index.scss'
import Msg from '../../utils/msg';

interface PROPS {
  display: boolean //是否跳转到页面授权
  // handleClose: () => void,
  handleCalendar:(v)=>void,
  setModel:(v)=>void,
  model:any,
  // setCalendarModalDisplay:(v)=>void
  setTimeData:(v)=>void,
  recorderType:number, //判断是不是借支
  calendarDays:any,
  time:any,
  arr:any
  // setCalendarDays:()=>void,
  clickData:any,
  // setClickData:()=>void,
  handleClickCalendar:(v:any)=>void,
  getMonthDaysCurrent:(e:any)=>void,
  maskHandleClose?:()=>void,
  handleCalendarClose:()=>void,
  handleChangeTime:(e:number)=>void,
  handleCalendarSub:()=>void,
  onScrollToUpper: () => void,
  onScrollToLower: () => void,
  noCalendarDay:boolean,
  leftTime: boolean,
  rightTime: boolean,
  changeId:number,
  calendar:any,
  handleSuiper:(e)=>void,
  swiperIndex:number,
  calendarState:boolean,
}
// interface TimeType{
//   year:string,
//   monent:string,
// }

export default function CalendarModal({ 
  // setRecorderType, calendarDays, setCalendarDays, clickData, setClickData,
  display, handleClickCalendar, calendarDays, getMonthDaysCurrent, time, handleCalendar, setModel, model, setTimeData, recorderType, arr, clickData, maskHandleClose = () => { }, handleCalendarClose, handleChangeTime, handleCalendarSub, onScrollToUpper, onScrollToLower, noCalendarDay, leftTime, rightTime, changeId, calendar, handleSuiper, swiperIndex, calendarState}: PROPS) {
  console.log(calendar,'calendar')
  // 星期
  const weeks =[
    { id: 1,name: '日' },
    { id: 2, name: '一' },
    { id: 3, name: '二' },
    { id: 4, name: '三' },
    { id: 5, name: '四' },
    { id: 6, name: '五' },
    { id: 7, name: '六' },
  ]
  // 判断是否是ios
  const [ios, setIos] = useState<boolean>(false)
  useEffect(()=>{
    // 判断是安卓还是苹果
    setIos(isIos())
  })
  const addZero = (num) => {
    if (parseFloat(num) < 10) {
      num = '0' + parseFloat(num);
    }
    return num;
  }
  // const handleSuiper = (e)=>{
  //   console.log(e)
  // }
  return(
    <View className='calendarModal-content'>
    {display &&
    <View className='calendarModal-complaintModal' onClick={maskHandleClose}>
      <View className='calendarModal-complaintModal-content' onClick={e=> e.stopPropagation()}>
          {/* <View className='icon-left'><Image src={`${IMGCDNURL}rili.png`} className='icon-left-image'/></View>
          <View className='icon-right'><Image src={`${IMGCDNURL}rili.png`} className='icon-right-image'/></View> */}
        <View className='calendarModal-complaintModal-content-top'>
            <View className='content-top-close' onClick={handleCalendarClose}>取消</View>
            <View className='content-top-title'>选择日期(可选多天)</View>
            <View className='content-top-change' onClick={handleCalendarSub}>确定</View>
        </View>
        <View className='content-tips'>
          <View className='content-tips-time'> 
              {time.year}年 
              <View className='month'>
              <View className='iconLeft' onClick={() => handleChangeTime(0)} style={{ visibility: leftTime ? 'visible' : 'hidden' }}>
              <Image src={`${IMGCDNURL}timeLefts.png`} className='leftIcon'/>
              </View>
              {/* <View className='leftIcon' onClick={() => handleChangeTime(0)} /> */}
                {addZero(time.monent)}月
              {/* <View className='righticon' onClick={() => handleChangeTime(1)}/> */}
              <View className='iconRight' onClick={() => handleChangeTime(1)} style={{ visibility: rightTime ? 'visible' : 'hidden' }}>
                <Image src={`${IMGCDNURL}timeRights.png`} className='righticon'/>
              </View>
              </View>
          </View>
          <View className='title'>
              {changeId !== 3 && <View className='title'><View className='content-tips-box'></View>
              <View>表示当天已有记工</View></View>}
          </View>
        </View>
          <View className='content-times'>
            <View className='scrollView-content'>
            <View className='content-weekes'>
              {weeks.map((v) => (
                <View key={v.id} className={ios ? 'content-weekes-week-ios' :'content-weekes-week'}>{v.name}</View>
              ))}
            </View>
              {/* <Swiper
                className='SwiperBox'
                vertical
                circular
                onChange={handleSuiper}
                >
                <SwiperItem>
              <View className={ios ?'content-days-ios ':'content-days'}>
                {calendarDays.map((v,i)=>(
                  <View key={i + i} 
                    onClick={() => { handleClickCalendar(v)}}
                    style={v.record ? { background: 'rgba(240,189,48,0.3)' } : ''}
                    // className={v.current ? 'content-days-day' :'content-days-day-no'}
                    className={classnames({
                      'content-days-day': v.current,
                      'content-days-day-no': !v.current,
                      'content-days-day-choice': v.choice,
                      'content-days-day-click': v.click && !v.up && !v.next,
                      'content-days-day-click-all': v.click && !v.up && !v.next && v.choice,
                    })}
                    >
                    <View style={v.record ? (v.click ? { color:'rgba(253, 120, 13, 1)'} : { color: '#3C3B3B' }) : ''}>{v.date}</View>
                    <View className='lunarCalendarItem' style={v.record ? (v.click ? { color: 'rgba(253, 120, 13, 1)' } : { color: '#BABABAFF' }) : ''}>{v.lunarCalendarItem}</View>
                    <View>
                      {!v.next && !v.up && !v.stop && !v.click  ? <View className='checkBox'></View> :'' }
                      {!v.next && !v.up && !v.stop && v.click ? <View className='clickCheckBox'></View> : ''}
                    </View>
                  </View>
                ))}
              </View>
              </SwiperItem>
            </Swiper> */}
              <Swiper
                className='SwiperBox'
                circular={calendarState}
                current={swiperIndex}
                onChange={handleSuiper}
                duration={500}
                >
                <SwiperItem>
                  <View className='demo-text-1'>
                    <View className={ios ? 'content-days-ios ' : 'content-days'}>
                      {calendar.first.map((v, i) => (
                        <View key={i + i}
                          onClick={() => { handleClickCalendar(v) }}
                          style={v.record ? { background: 'rgba(240,189,48,0.3)' } : ''}
                          // className={v.current ? 'content-days-day' :'content-days-day-no'}
                          className={classnames({
                            'content-days-day': v.current,
                            'content-days-day-no': !v.current,
                            'content-days-day-choice': v.choice,
                            'content-days-day-click': v.click && !v.up && !v.next,
                            'content-days-day-click-all': v.click && !v.up && !v.next && v.choice,
                          })}
                        >
                          <View style={v.record ? (v.click ? { color: 'rgba(253, 120, 13, 1)' } : { color: '#3C3B3B' }) : ''}>
                            <Text className='fontWeight'>{v.date}</Text></View>
                          <View className='lunarCalendarItem' style={v.record ? (v.click ? { color: 'rgba(253, 120, 13, 1)' } : { color: '#BABABAFF' }) : ''}>{v.lunarCalendarItem}</View>
                          <View>
                            {!v.next && !v.up && !v.stop && !v.click ? <View className='checkBox'></View> : ''}
                            {!v.next && !v.up && !v.stop && v.click ? <View className='clickCheckBox'></View> : ''}
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </SwiperItem>
                <SwiperItem>
                  <View className='demo-text-2'>
                    <View className={ios ? 'content-days-ios ' : 'content-days'}>
                      {calendar.second.map((v, i) => (
                        <View key={i + i}
                          onClick={() => { handleClickCalendar(v) }}
                          style={v.record ? { background: 'rgba(240,189,48,0.3)' } : ''}
                          // className={v.current ? 'content-days-day' :'content-days-day-no'}
                          className={classnames({
                            'content-days-day': v.current,
                            'content-days-day-no': !v.current,
                            'content-days-day-choice': v.choice,
                            'content-days-day-click': v.click && !v.up && !v.next,
                            'content-days-day-click-all': v.click && !v.up && !v.next && v.choice,
                          })}
                        >
                          <View style={v.record ? (v.click ? { color: 'rgba(253, 120, 13, 1)' } : { color: '#3C3B3B' }) : ''}>
                            <Text className='fontWeight'>{v.date}</Text>
                          </View>
                          <View className='lunarCalendarItem' style={v.record ? (v.click ? { color: 'rgba(253, 120, 13, 1)' } : { color: '#BABABAFF' }) : ''}>{v.lunarCalendarItem}</View>
                          <View>
                            {!v.next && !v.up && !v.stop && !v.click ? <View className='checkBox'></View> : ''}
                            {!v.next && !v.up && !v.stop && v.click ? <View className='clickCheckBox'></View> : ''}
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </SwiperItem>
                <SwiperItem>
                  <View className='demo-text-3'>
                    <View className={ios ? 'content-days-ios ' : 'content-days'}>
                      {calendar.third.map((v, i) => (
                        <View key={i + i}
                          onClick={() => { handleClickCalendar(v) }}
                          style={v.record ? { background: 'rgba(240,189,48,0.3)' } : ''}
                          // className={v.current ? 'content-days-day' :'content-days-day-no'}
                          className={classnames({
                            'content-days-day': v.current,
                            'content-days-day-no': !v.current,
                            'content-days-day-choice': v.choice,
                            'content-days-day-click': v.click && !v.up && !v.next,
                            'content-days-day-click-all': v.click && !v.up && !v.next && v.choice,
                          })}
                        >
                          <View style={v.record ? (v.click ? { color: 'rgba(253, 120, 13, 1)' } : { color: '#3C3B3B' }) : ''}>
                            <Text className='fontWeight'>{v.date}</Text>
                          </View>
                          <View className='lunarCalendarItem' style={v.record ? (v.click ? { color: 'rgba(253, 120, 13, 1)' } : { color: '#BABABAFF' }) : ''}>{v.lunarCalendarItem}</View>
                          <View>
                            {!v.next && !v.up && !v.stop && !v.click ? <View className='checkBox'></View> : ''}
                            {!v.next && !v.up && !v.stop && v.click ? <View className='clickCheckBox'></View> : ''}
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </SwiperItem>
                <SwiperItem>
                      <View className='demo-text-3'>
                        <View className={ios ? 'content-days-ios ' : 'content-days'}>
                          {calendar.fourth.map((v, i) => (
                            <View key={i + i}
                              onClick={() => { handleClickCalendar(v) }}
                              style={v.record ? { background: 'rgba(240,189,48,0.3)' } : ''}
                              // className={v.current ? 'content-days-day' :'content-days-day-no'}
                              className={classnames({
                                'content-days-day': v.current,
                                'content-days-day-no': !v.current,
                                'content-days-day-choice': v.choice,
                                'content-days-day-click': v.click && !v.up && !v.next,
                                'content-days-day-click-all': v.click && !v.up && !v.next && v.choice,
                              })}
                            >
                              <View style={v.record ? (v.click ? { color: 'rgba(253, 120, 13, 1)' } : { color: '#3C3B3B' }) : ''}>
                                <Text className='fontWeight'>{v.date}</Text>
                              </View>
                              <View className='lunarCalendarItem' style={v.record ? (v.click ? { color: 'rgba(253, 120, 13, 1)' } : { color: '#BABABAFF' }) : ''}>{v.lunarCalendarItem}</View>
                              <View>
                                {!v.next && !v.up && !v.stop && !v.click ? <View className='checkBox'></View> : ''}
                                {!v.next && !v.up && !v.stop && v.click ? <View className='clickCheckBox'></View> : ''}
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    </SwiperItem>
              </Swiper>
          </View>
        </View>
      </View>
    </View>
      }
    </View>
  )
}