import Taro, { useState, useEffect,useShareAppMessage } from '@tarojs/taro'
import { View, Button,Image } from '@tarojs/components'
import { IMGCDNURL } from '../../config';
import './index.scss'

interface PROPS {
  display: boolean //是否跳转到页面授权
  handleClose: () => void,
}

export default function CalendarModal({ display, handleClose }: PROPS) {
  // 跳转
  const userRouteJump = (url: string) => {
    Taro.navigateTo({
      url: url
    })
  }
  // const handelShare = ()=>{
  //   useShareAppMessage()
  // }
  useShareAppMessage(()=>{
    return {
      title: '微信小程序联盟',
      desc: '最具人气的小程序开发联盟!',
      path: '/pages/share/index'
    }
  })
  return(
    <View>
      {display && <View className='calendarModal'>
        <View className='calendarModal-content'>
          <View className='footer-box'>
            <View>
              <View className='weChat'><Image className='weChat-img' src={`${IMGCDNURL}weChat.png`}/></View>
              <Button className='btn' open-type="share">分享给微信好友</Button>
            </View>
            <View>
              <View className='download' onClick={() => userRouteJump('/pages/download/index')}>
                <Image className='download-img' src={`${IMGCDNURL}downLoad.png`}/>
              </View>
              <Button className='btn'>下载到本地</Button>
            </View>
          </View>
          <View className='close' onClick={handleClose}>取消</View>
        </View>
      </View>}
    </View>
  )
}