import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text, Input, Checkbox, Picker, ScrollView } from '@tarojs/components'
import { AtDrawer } from 'taro-ui'
import { IMGCDNURL } from '../../config'
import './index.scss'

interface PROPS {
  display: boolean
  projectData:any,
  maskHandleClose:()=>void,
  handleClickProject:(v)=>void,
  // handleEstablish: (groupInfo: string) => void,
  // classification: any,
}
export default function ChangeProjectModal({ display, projectData, maskHandleClose, handleClickProject}: PROPS) {
  return(
    <View>
      {display && <View className='ChangeProjectModal' onClick={()=>maskHandleClose()}>
        <View className='ChangeProjectModal-content' onClick={(e) => { e.stopPropagation() }}>
          <View className='ChangeProjectModal-heard'>选择项目</View>
          {/* <View className=''></View> */}
          <View>{
            projectData.map((v)=>(
              <View onClick={()=>handleClickProject(v)} className={v.click ? 'ChangeProjectModal-list-box-click' :'ChangeProjectModal-list-box'}>
                <View className='ChangeProjectModal-list' key={v.id}>{v.group_name}{v.name ? '-' + v.name:''}</View>
              </View>
            ))
          }</View>
        </View>
      </View>}
    </View>
  )
}