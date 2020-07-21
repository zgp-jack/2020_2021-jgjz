import Taro from '@tarojs/taro'
import { View, Image, Text, Input } from '@tarojs/components'
import './index.scss'

interface PROPS {
  display: boolean //是否跳转到页面授权
  // textarea:string,
  // handleTextarea:(e:any)=>void,
  // setComplaintModal:(e:boolean)=>void,
  handleRecorderPopup: (e: number) => void,
}
export default function RecorderPopup({ display, handleRecorderPopup }: PROPS) {
  return (
    <View>
      {display &&
        <View className='tabber-complaintModal'>
          <View className='tabber-complaintModal-content'>
            <View className='tabber-complaintModal-content-title '>保存成功!</View>
            <View className='tabber-complaintModal-content-box'>记工数据,仅自己可见随时查看，方便快捷</View>
            <View className='tabber-complaintModal-content-footer'>
              <View className='tabber-complaintModal-content-footer-left' onClick={() => handleRecorderPopup(0)}>取消</View>
              <View className='tabber-complaintModal-content-footer-right' onClick={() => handleRecorderPopup(1)}>查看考勤表</View>
            </View>
          </View>
        </View>
      }
    </View>
  )
}
RecorderPopup.options = {
  addGlobalClass: true
}