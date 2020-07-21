import Taro, { Config, useEffect, useState, useRouter } from '@tarojs/taro'
import { View, Text, Picker, ScrollView } from '@tarojs/components'
import { UserInfo,Type } from '../../config/store'
import Foreman from './foreman';
// import Worker from './worker'
import './index.scss'

export default function Recorder() {
  // const router: Taro.RouterInfo = useRouter()
  // let { type } = router.params;
  // const [useType,setUseType] =useState<number>(0)
  useEffect(()=>{
    // let userInfo = Taro.getStorageSync(UserInfo)
    const type = Taro.getStorageSync(Type)
    // console.log(userInfo,'userInfouserInfo')
    // console.log(typeof userInfo.type,'xxxx')
    
    // 有type就是班长 1 
    if (type === 1){
      Taro.setNavigationBarTitle({
        title: '我是班组长，开始记工'
      })
    }else{
      Taro.setNavigationBarTitle({
        title: '我是工人，开始记工'
      })
    }
    // setUseType(userInfo.type)
  },[])
  return(
    <View>
      <Foreman/>
    </View>
  )
}
