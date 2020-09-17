import Taro, { useEffect, useState, useDidShow } from '@tarojs/taro'
import { View, Image, Text, Input } from '@tarojs/components'
import { IMGCDNURL } from '../../config'
import './index.scss'


interface PROPS {
  display: boolean //是否跳转到页面授权
  handleWorkingHoursClose: (boolean) => void;
  type: number //类型区分
  handleWorkingHours: (type: number, v: any) => void;
  maskHandleClose?:()=>void;
  // textarea:string,
  // handleTextarea:(e:any)=>void,
  // setComplaintModal:(e:boolean)=>void,
}
export default function WorkingHours({ display, maskHandleClose = () => { }, handleWorkingHoursClose, handleWorkingHours, type }: PROPS) {
  const [data, setData] = useState<any>([
    { id: 1, name: '0.5小时', click: false, num: 0.5 },
    { id: 2, name: '1小时', click: false, num: 1 },
    { id: 3, name: '1.5小时', click: false, num: 1.5 },
    { id: 4, name: '2小时', click: false, num: 2 },
    { id: 5, name: '2.5小时', click: false, num: 2.5 },
    { id: 6, name: '3小时', click: false, num: 3 },
    { id: 7, name: '3.5小时', click: false, num: 3.5 },
    { id: 8, name: '4小时', click: false, num: 4 },
    { id: 9, name: '4.5小时', click: false, num: 4.5 },
    { id: 10, name: '5小时', click: false, num: 5 },
    { id: 11, name: '5.5小时', click: false, num: 5.5 },
    { id: 12, name: '6小时', click: false, num: 6 },
    { id: 13, name: '6.5小时', click: false, num: 6.5 },
    { id: 14, name: '7小时', click: false, num: 7 },
    { id: 15, name: '7.5小时', click: false, num: 7.5 },
    { id: 16, name: '8小时', click: false, num: 8 },
    { id: 17, name: '8.5小时', click: false, num: 8.5 },
    { id: 18, name: '9小时', click: false, num: 9 },
    { id: 19, name: '9.5小时', click: false, num: 9.5 },
    { id: 20, name: '10小时', click: false, num: 10 },
    { id: 21, name: '10.5小时', click: false, num: 10.5 },
    { id: 22, name: '11小时', click: false, num: 11 },
    { id: 23, name: '11.5小时', click: false, num: 11.5 },
    { id: 24, name: '12小时', click: false, num: 12 },
    { id: 25, name: '12.5小时', click: false, num: 12.5 },
    { id: 26, name: '13小时', click: false, num: 13 },
    { id: 27, name: '13.5小时', click: false, num: 13.5 },
    { id: 28, name: '14小时', click: false, num: 14 },
    { id: 29, name: '14.5小时', click: false, num: 14.5 },
    { id: 30, name: '15小时', click: false, num: 15 },
    { id: 31, name: '15.5小时', click: false, num: 15.5 },
    { id: 32, name: '16小时', click: false, num: 16 },
    { id: 33, name: '16.5小时', click: false, num: 16.5 },
    { id: 34, name: '17小时', click: false, num: 17 },
    { id: 35, name: '17.5小时', click: false, num: 17.5 },
    { id: 36, name: '18小时', click: false, num: 18 },
    { id: 37, name: '18.5小时', click: false, num: 18.5 },
    { id: 38, name: '19小时', click: false, num: 19 },
    { id: 39, name: '19.5小时', click: false, num: 19.5 },
    { id: 40, name: '20小时', click: false, num: 20 },
    { id: 41, name: '20.5小时', click: false, num: 20.5 },
    { id: 42, name: '21小时', click: false, num: 21 },
    { id: 43, name: '21.5小时', click: false, num: 21.5 },
    { id: 44, name: '22小时', click: false, num: 22 },
    { id: 45, name: '22.5小时', click: false, num: 22.5 },
    { id: 46, name: '23小时', click: false, num: 23 },
    { id: 47, name: '23.5小时', click: false, num: 23.5 },
    { id: 48, name: '24小时', click: false, num: 24 },
  ])
  return (
    <View>
      {display &&
        <View className='workingHours-complaintModal' onClick={maskHandleClose}>
        <View className='workingHours-complaintModal-content' onClick={(e) => e.stopPropagation()}>
            <View className='workingHours-complaintModal-content-title'>选择上班时间<View onClick={handleWorkingHoursClose} className='workingHours-complaintModal-content-close'>
              <Image src={`${IMGCDNURL}closeIcons.png`} className='closeIcons' />
            </View></View>
            <View className='workingHours-complaintModal-content-timeBox'>
              <View className='workingHours-complaintModal-content-box'>
                {data.map(v => (
                  <View
                    className={v.click ? 'workingHours-complaintModal-content-box-list-click' : 'workingHours-complaintModal-content-box-list'}
                    key={v.id}
                    onClick={() => handleWorkingHours(type, v)}
                  >{v.name}</View>
                ))}
              </View>
            </View>
          </View>
        </View>
      }
    </View>
  )
}
WorkingHours.options = {
  addGlobalClass: true
}