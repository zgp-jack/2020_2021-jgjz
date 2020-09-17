import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text, Input, Checkbox, Picker, ScrollView } from '@tarojs/components'
import { IMGCDNURL } from '../../config'
import { AtDrawer } from 'taro-ui'
import './index.scss'

interface PROPS {
  display: boolean //是否跳转到页面授权
  handleClose: () => void,
  handleEstablish: (groupInfo:string)=>void,
  handleInput:(type:string,e:any)=>void,
  groupInfo:string,
  model:any,
}

export default function AddMember({ display, handleClose, handleEstablish, handleInput, groupInfo, model }: PROPS) {
  return(
    <AtDrawer show={display} mask right width={'100%'}>
      <View className='back' onClick={handleClose}></View>
    {/* <View>
      {display &&  */}
        {/* <View className='addMember'> */}
          {/* <View className='addMember-content'> */}
          {/* <View className='addMember-content-heard'>添加成员
          <View onClick={handleClose} className='addMember-content-heard-box'>
            <Image src={`${IMGCDNURL}closeIcons.png`} className='addMember-content-heard-close'/>
          </View> */}
          {/* <Text className='addMember-content-heard-close' onClick={handleClose}></Text> */}
          {/* </View> */}
            <View className='title'>添加成员</View>
            <View className='publish-recruit-card'>
              <View className='publish-list-item border-item'>
              <Text className='pulish-list-title'>姓名(必填)</Text>
                <Input
                  cursorSpacing={200} 
                  maxLength={4} 
                  className='publish-list-input-name new-input' 
                  placeholder='请输入对方的姓名' 
                  value={model.userName}
                  onInput={(e) => handleInput('userName', e)}
                />
              </View>
            </View>
            <View className='publish-recruit-card'>
              <View className='publish-list-item border-item'>
                <Text className='pulish-list-title'>电话号码(可不填)</Text>
                <Input
                  cursorSpacing={200} 
                  maxLength={11} 
                  placeholder='请输入对方的电话号码' 
                  type='number' 
                  value={model.phone}
                  className='publish-list-input new-input' 
                  onInput={(e) => handleInput('phone', e)} 
                />
              </View>
            </View>
            <View className='btnBox'>
            <View className='btn' onClick={() => handleEstablish(groupInfo)}>确定创建</View>
              <View className='closeBtn' onClick={handleClose}>取消</View>
            </View>
            {/* <View className='addMember-content-listBox'>
              <View className='addMember-content-listBox-list'>
                <View>姓名(必填)</View>
              <Input cursorSpacing={200} maxLength={4} className='addMember-content-listBox-list-input' placeholder='请输入对方的姓名' onInput={(e) => handleInput  ('userName',e)}/>
              </View>
              <View className='addMember-content-listBox-list'>
                <View>电话号码(可不填)</View>
              <Input cursorSpacing={200} maxLength={11} placeholder='请输入对方的电话号码' type='number' className='addMember-content-listBox-list-input' onInput={(e) => handleInput('phone', e)} />
              </View>
            </View> */}
          {/* <View className='addMember-content-footer' onClick={()=>handleEstablish(groupInfo)}>确定创建</View> */}
          {/* </View> */}
        {/* </View> */}
      {/* }
    </View> */}
    </AtDrawer>
  )
}
