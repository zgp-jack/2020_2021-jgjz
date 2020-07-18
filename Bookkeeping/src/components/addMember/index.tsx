import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text, Input, Checkbox, Picker, ScrollView } from '@tarojs/components'
import './index.scss'

interface PROPS {
  display: boolean //是否跳转到页面授权
  handleClose: () => void,
  handleEstablish: (groupInfo:string)=>void,
  handleInput:(type:string,e:any)=>void,
  groupInfo:string,
}

export default function AddMember({ display, handleClose, handleEstablish, handleInput, groupInfo }: PROPS) {
  return(
    <View>
      {display && 
        <View className='addMember'>
          <View className='addMember-content'>
          <View className='addMember-content-heard'>添加成员<Text className='addMember-content-heard-close' onClick={handleClose}>x</Text></View>
            <View className='addMember-content-listBox'>
              <View className='addMember-content-listBox-list'>
                <View>姓名(必填)</View>
              <Input className='addMember-content-listBox-list-input' placeholder='请输入姓名' onInput={(e) => handleInput('userName',e)}/>
              </View>
              <View className='addMember-content-listBox-list'>
                <View>电话号码(可不填)</View>
              <Input maxLength={11} placeholder='请输入对方电话号码' type='number' className='addMember-content-listBox-list-input' onInput={(e) => handleInput('phone', e)} />
              </View>
            </View>
          <View className='addMember-content-footer' onClick={()=>handleEstablish(groupInfo)}>确定创建</View>
          </View>
        </View>
      }
    </View>
  )
}
