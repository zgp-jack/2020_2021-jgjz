import Taro, { useState, useEffect, useShareAppMessage  } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import { getUserSessionKeyAction, GetUserInfoAction, bkMemberAuthAction  } from '../../utils/request/index'
import Msg from '../../utils/msg'
import { UserInfo, MidData, CreationTime } from '../../config/store';
import { IMGCDNURL } from '../../config'
import './index.scss'

interface PROPS {
  display:boolean,
  handleClose:(e)=>void
  // page?: boolean //是否跳转到页面授权
  callback?: () => void,
  // userCancelAuth?: () => void
}
export interface AuthData {
  session_key: string,
  encryptedData: string,
  iv: string,
  refId: number,
  source: string,
  tel?:string,
  code?:string,
  type?:string,
}

export interface User {
  userId: number,
  tokenTime: number,
  token: string,
  uuid: string,
  login: boolean,
  type?:string,
}
export default function Auth({ display, handleClose, callback}: PROPS) {
    const [data,setData] = useState()
    // 状态
  const [warrant,setWarrant] = useState<boolean>(false)
  const userAuthAction = (e)=>{
    console.log(e,'e');
    if (e.detail.userInfo) {
      Taro.login({
        success: (res) => {
          if (res.code) {
            console.log(res.code,'code')
            getUserSessionKeyAction(res.code).then(res => {
              const sessionKey: string = res.session_key
              console.log(sessionKey,'sessionKeysessionKeysessionKey')
              decodeSessionKey(sessionKey)
              // callback && callback()
            })
          } else {
            Msg(`授权失败`)
          }
        }
      })
    } else {
      Msg('您取消了授权')
    }
  }
  // 解密sessionkey
  const decodeSessionKey = (key: string) => {
    Taro.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          Taro.getUserInfo({
            success: () => {
              doAuthRequest(key)
            },
            fail: () => {
              Taro.openSetting()
            }
          })
        } else {
          doAuthRequest(key)
        }
      }
    })
  }
  // 发起授权请求
  const doAuthRequest = (key: string) => {
    Taro.getUserInfo({
      success: res => {
        let encryptedData = res.encryptedData
        let iv = res.iv
        const data: AuthData = {
          session_key: key,
          encryptedData: encryptedData,
          iv: iv,
          refId: 0,
          source: '', //疑似小程序source 忘记干嘛的了,
          type:'phone'
        }
        console.log(key,'keykeykeykey')
        setData(data)
        GetUserInfoAction(data).then(res => {
          if(res.code === 40003){
            // Taro.showModal({
            //   title: '微信账号还没有绑定手机号',
            //   content: '微信账号绑定手机号后，才可使用手机号后快速填写工能',
            //   showCancel: true,
            //   success:(res)=>{
            //     if(res.confirm){
                  // 没有绑定手机好就选择微信登陆还是手机登陆
                  setWarrant(true);
                  // userRouteJump(`/pages/login/index?session_key=${key}&encryptedData=${encryptedData}&iv=${iv}`)
            //     }
            //   }
            // })
            // setWarrant(true)
          }else if(res.errcode === 'ok'){
            const user: User = {
              userId: res.data.id,
              token: res.data.sign.token,
              tokenTime: res.data.sign.time,
              uuid: res.data.uuid,
              login: true,
            }
            console.log(res,'resMid')
            // let midDatas = Taro.getStorageSync(MidData);
            // const midData = JSON.parse(JSON.stringify(midDatas))
            // console.log(midData,'midDatamidDatamidDatamidData')
            // midData.yupao_id = res.data.id;
            res.data.yupao_id = res.data.id;
            Taro.setStorageSync(UserInfo, user);
            Taro.setStorageSync(MidData, res.data)
            let midParams = {
              mid: res.data.id
            }
            // let worker_id;
            bkMemberAuthAction(midParams).then(resItem=>{
              if (resItem.code !== 200) {
                // Msg(resItem.msg)
                Taro.showModal({
                  content: resItem.msg
                })
              }else{
                // worker_id = resItem.data.worker_id;
                // res.data.worker_id = resItem.data.worker_id;
                let midData = Taro.getStorageSync(MidData);
                midData.worker_id = res.data.worker_id;
                Taro.setStorageSync(MidData, midData)
                // Taro.setStorageSync(MidData, res.data)
                Taro.setStorageSync(CreationTime, resItem.data.created_time)
              }
            })
            Taro.setStorageSync(UserInfo, user)
            setWarrant(true);
            
            // dispatch(setUserInfo(user))
            callback && callback()
            // if (page) pageBack()
            
          } else {
            Taro.showModal({
              content: res.msg || res.errmsg
            })
            // Msg(res.msg||res.errmsg)
          }
        })
      }
    })
  }
  // 返回上一页
  const pageBack = () => {
    Taro.navigateBack()
  }
  // 跳转
  const userRouteJump = (url: string) => {
    Taro.navigateTo({
      url: url
    })
  }
  // 微信登陆
  const handleLogin = ()=>{
    // 需要判断有没有手机号
    userRouteJump(`/pages/login/index`)
  }
  const getPhoneNumber =(e)=>{
    const item = JSON.parse(JSON.stringify(data));
    console.log(e);
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      // Taro.navigateBack();
      let params={
        session_key: item.session_key,
        wechat_encryptedData: e.detail.encryptedData,
        wechat_iv: e.detail.iv,
        encryptedData: item.encryptedData,
        iv: item.iv,
        refId: 0,
        type: 'wechat',
        source: '',
      }
      GetUserInfoAction(params).then(res=>{
        if (res.code === 40003) {
          // Taro.showModal({
          //   title: '微信账号还没有绑定手机号',
          //   content: '微信账号绑定手机号后，才可使用手机号后快速填写工能',
          //   showCancel: true,
          //   success: (res) => {
          //     if (res.confirm) {
                userRouteJump(`/pages/login/index?session_key=${item.session_key}&encryptedData=${item.encryptedData}&iv=${item.iv}`)
          //     }
          //   }
          // })
        } else if (res.errcode === 'ok') {
          const user: User = {
            userId: res.data.id,
            token: res.data.sign.token,
            tokenTime: res.data.sign.time,
            uuid: res.data.uuid,
            login: true,
          }
          res.data.yupao_id = res.data.id;
          Taro.setStorageSync(UserInfo, user);
          Taro.setStorageSync(MidData, res.data)
          let midParams = {
            mid: res.data.id
          }
          bkMemberAuthAction(midParams).then(resItem => {
            if (resItem.code !== 200) {
              Msg(resItem.msg)
            } else {
              // worker_id = resItem.data.worker_id;
              res.data.worker_id = resItem.data.worker_id;
              Taro.setStorageSync(MidData, res.data)
              Taro.setStorageSync(CreationTime, resItem.data.created_time)
            }
          })
          Taro.setStorageSync(UserInfo, user)
          // Taro.navigateBack();
          callback && callback()
        }else{
          Taro.showModal({
            content: res.msg || res.errmsg
          })
          // Msg(res.msg || res.errmsg)
        }
      })
    }else{
      userRouteJump(`/pages/login/index?session_key=${item.session_key}&encryptedData=${item.encryptedData}&iv=${item.iv}`)
    }
  }
  return(
    <View>
      { display && 
      <View className='content'>
        <View className='imgBox'>
          <View className='img'>
            <Image src={`${IMGCDNURL}userauth-icon.png`} className='img-img'/>
          </View>
          <View className='name'>记工记账</View>
          <View className='text'>
            手机记工，一目了然，记工数据，清清楚楚、明明白白
          </View>
          <View className='btn'>
            {/* <View className='sign' onClick={handleAuthorize}>授权登录</View> */}
            {!warrant &&<Button className='sign' openType='getUserInfo' onGetUserInfo={(e) => userAuthAction(e)}>微信授权登录</Button>}
            {warrant && <Button className='sign' open-type='getPhoneNumber' onGetPhoneNumber={getPhoneNumber}>微信快捷登陆</Button>}
            {!warrant && <View className='close' onClick={() => handleClose(false)}>取消</View>}
            {warrant && <View className='close' onClick={() => { userRouteJump(`/pages/login/index?session_key=${data.session_key}&encryptedData=${data.encryptedData}&iv=${data.iv}`)}}>手机号登陆</View>}
          </View>
        </View>
      </View>
      }
    </View>
  )
}