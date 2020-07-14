import Taro, { Config, useEffect, useState, createContext, useDidShow ,useRouter} from '@tarojs/taro'
import { View, Text, Checkbox, Image, Input } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import { bkGetCodeAction, GetUserInfoAction, bkMemberAuthAction } from '../../utils/request/index';
import { isPhone } from '../../utils/v'
import { UserInfo, MidData } from '../../config/store';
import Msg from '../../utils/msg';
import './index.scss'

interface ModalType {
  phone:string,
  code:string,
}
export interface User {
  userId: number,
  tokenTime: number,
  token: string,
  uuid: string,
  login: boolean
}
// 用户获取验证码
export const SendTypeHave: string = 'have'
export const SendTypeNo: string = 'no'
export default function Login() {
  const router: Taro.RouterInfo = useRouter();
  const { session_key, encryptedData, iv} = router.params;
  const [time,setTime] = useState<number>(60)
  const [liked,setLike] = useState<boolean>(true)
  const [model, setModel] = useState<ModalType>({
    phone:'',
    code:'',
  })
  const countDown = (settiems)=>{
    let times;
    if (settiems){
      times = settiems;
    }else{
      times = JSON.parse(JSON.stringify(time));
    }
    if (times === 1) {
      setTime(60);
      setLike(true)
    }else{
      if (times === 60){
        console.log(1);
        // 获取验证码
        getVcode();
      }
      setLike(false)
      setTime(times-1)
      setTimeout(() => { countDown(times - 1)}, 1000);
    }
  }
  console.log(time,'xxx')
  const handleBtn = ()=>{
    if (!liked) {
      return
    }
    countDown(60);
  }
  // 验证码请求
  const getVcode = ()=>{
    console.log(32131231)
    console.log(model.phone,'model.phone')
    if (!isPhone(model.phone)) {
      Msg('请先输入正确的手机号码')
      return
    }
    let params = {
      tel: model.phone,
      sendType: SendTypeNo,
    }
    // 验证码
    bkGetCodeAction(params).then(res=>{
      Msg(res.errmsg, 2500)
    })
  }
  // 获取验证码
  const handleInput = (type:string,e:any)=>{
    console.log(e);
    let data = JSON.parse(JSON.stringify(model));
    data[type] = e;
    setModel(data);
  }
  const handleLogin =()=>{
    if (!isPhone(model.phone)) {
      Msg('请先输入正确的手机号码')
      return
    }
    if (!model.code) {
      Msg('请先输入手机验证码')
      return;
    }
    let params = {
      session_key: session_key,
      encryptedData,
      iv,
      refId: 0,
      source: '',
      tel: model.phone,
      code:model.code,
    }
    GetUserInfoAction(params).then(res=>{
      if(res.code === 200){
        const user: User = {
          userId: res.data.id,
          token: res.data.sign.token,
          tokenTime: res.data.sign.time,
          uuid: res.data.uuid,
          login: true
        }
        Taro.setStorageSync(UserInfo, user);
        let midParams = {
          mid: res.data.id
        }
        bkMemberAuthAction(midParams).then(res=>{
          if (res.code !== 200) {
            Msg(res.msg)
          } else {
            Taro.setStorageSync(MidData, res.data)
            Taro.navigateBack();
          }
        })
      }else{
        Msg(res.msg)
      }
    })
  }
  return (
    <View className='content'>
      <View className='title'>您好</View>
      <View className='welCome'>欢迎来到记工记账</View>
      <View className='from'>
      <View>
        <AtInput
          name='number'
          clear
          type='text'
          maxLength={11}
          placeholder='输入手机号'
          value={model.phone}
          onChange={(e) => handleInput('phone',e)}
        />
      </View>
      <View>
        <AtInput
          className='codeInput'
          name='number'
          clear
          border={false}
          type='text' 
          placeholder='请输入验证码'
          value={model.code}
          onChange={(e) => handleInput('code', e)}
          >
            <View onClick={handleBtn} className='code'>{liked ? '获取验证码' : `${time}秒后重发`}</View>
          </AtInput>
      </View>
      </View>
      <View className='footer' onClick={handleLogin}><View className='footerBtn'>注册/登录</View></View>
    </View>
  )
}