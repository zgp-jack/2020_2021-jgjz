import Taro, { Config, useEffect, useState, useRouter, useDidShow, useShareAppMessage } from '@tarojs/taro'
import { View, Text, Picker, ScrollView } from '@tarojs/components'
import { UserInfo, Type, NoRequest } from '../../config/store'
import Foreman from './foreman';
import { IMGCDNURL } from '../../config'
// import Worker from './worker'
import './index.scss'

export default function Recorder() {
  // const router: Taro.RouterInfo = useRouter()
  // let { type } = router.params;
  // const [useType,setUseType] =useState<number>(0)
  useDidShow(()=>{
    // let userInfo = Taro.getStorageSync(UserInfo)
    const type = Taro.getStorageSync(Type)
    Taro.setStorageSync(NoRequest, false);
    // console.log(userInfo,'userInfouserInfo')
    // console.log(typeof userInfo.type,'xxxx')
    
    // 有type就是班长 1 
    if (type == 1){
      Taro.setNavigationBarTitle({
        title: '我是班组长，开始记工'
      })
    }else{
      Taro.setNavigationBarTitle({
        title: '我是工人，开始记工'
      })
    }
    // setUseType(userInfo.type)
  })
  useShareAppMessage(() => {
    return {
      title: '记工记账怕丢失？用鱼泡网记工，方便安全！数据永不丢失~',
      imageUrl: `${IMGCDNURL}shareIconImg.png`,
      path: `/pages/index/index`
    }
  })
  return(
    <View>
      <Foreman/>
    </View>
  )
}
