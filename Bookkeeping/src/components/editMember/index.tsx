import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text, Input, Checkbox, Picker, ScrollView } from '@tarojs/components'
import { AtDrawer } from 'taro-ui'
import { IMGCDNURL } from '../../config'
import './index.scss'

interface PROPS {
  display: boolean 
  handleClose: () => void,
  handleEstablish: (groupInfo: string) => void,
  handleInput: (type: string, e: any) => void,
  groupInfo: string,
  list:any
}

export default function EditMember({ display, handleClose, handleEstablish, handleInput, groupInfo,list }: PROPS) {
  console.log(list,'list')
  return (
    // <View>
    //   {display &&
    //     <View className='addMember'>
    //       <View className='addMember-content'>
    //         <View className='addMember-content-heard'>编辑人员信息
    //       <View onClick={handleClose} className='addMember-content-heard-box'>
    //             <Image src={`${IMGCDNURL}closeIcons.png`} className='addMember-content-heard-close' />
    //           </View>
    //           {/* <Text className='addMember-content-heard-close' onClick={handleClose}></Text> */}
    //         </View>
    //         <View className='addMember-content-listBox'>
    //           <View className='addMember-content-listBox-list'>
    //             <View>姓名</View>
    //             <Input cursorSpacing={200} value={list.name} maxLength={4} className='addMember-content-listBox-list-input' placeholder='请输入对方的姓名' onInput={(e) => handleInput('name', e)} />
    //           </View>
    //           <View className='addMember-content-listBox-list'>
    //             <View>电话号码</View>
    //           <Input cursorSpacing={200} value={list.phone} maxLength={11} placeholder='请输入对方的电话号码' type='number' className='addMember-content-listBox-list-input' onInput={(e) => handleInput('tel', e)} />
    //           </View>
    //         </View>
    //         <View className='addMember-content-footer'>
    //         <View className='close' onClick={handleClose}>取消</View>
    //         <View className='determine' onClick={() => { handleEstablish(groupInfo)}}>确定</View>
    //         </View>
    //         {/* <View className='addMember-content-footer' onClick={() => handleEstablish(groupInfo)}>确定创建</View> */}
    //       </View>
    //     </View>
    //   }
    // </View>
    <AtDrawer show={display} mask right width={'100%'}>
      <View className='back' onClick={handleClose}></View>
      <View className='title'>编辑人员信息</View>
      <View className='publish-recruit-card'>
        <View className='publish-list-item border-item'>
          <Text className='pulish-list-title'>姓名</Text>
          <Input
            cursorSpacing={200}
            maxLength={4}
            value={list.name} 
            className='publish-list-input-name new-input'
            placeholder='请输入对方的姓名'
            onInput={(e) => handleInput('name', e)}
          />
        </View>
      </View>
      <View className='publish-recruit-card'>
        <View className='publish-list-item border-item'>
          <Text className='pulish-list-title'>电话号码</Text>
          <Input
            cursorSpacing={200}
            maxLength={11}
            placeholder='请输入对方的电话号码'
            type='number'
            value={list.phone}
            className='publish-list-input new-input'
            onInput={(e) => handleInput('tel', e)}
          />
        </View>
      </View>
      <View className='btnBox'>
        <View className='btn' onClick={() => handleEstablish(groupInfo)}>确定创建</View>
        <View className='closeBtn' onClick={handleClose}>取消</View>
      </View>
    </AtDrawer>
  )
}
