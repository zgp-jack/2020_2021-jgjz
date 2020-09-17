import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text, Input, Checkbox, Picker, ScrollView } from '@tarojs/components'
import { AtDrawer } from 'taro-ui'
import { IMGCDNURL } from '../../config'
import './index.scss'
import classnames from 'classnames'
import { JumpAppid } from 'src/config/store';

interface PROPS {
  display: boolean
  handleClose: () => void,
  handleEstablish: (groupInfo: string) => void,
  classification:any,
  handleWorker:()=>void,
  handleProject:()=>void,
  val:any,
  handleClassification:(v)=>void,
  // handleInput: (type: string, e: any) => void,
  // groupInfo: string,
  // list: any
}

export default function ScreenModal({ display, handleClose, handleEstablish, classification, handleWorker, handleProject, val, handleClassification}: PROPS) {
  return (
    <AtDrawer show={display} mask right width={'90%'}>
    <View className='screenModal'>
      <View className='title'>筛选条件</View>
        <View className='publish-recruit-card' onClick={()=>handleProject()}>
        <View className='publish-list-item'>
          <Text className='pulish-list-title'>选择项目</Text>
          <Input
            className='publish-list-input'
            type='text'
            disabled
            placeholder='请选择项目'
            value={val.project}
          />
          <View className='rightIconsBox'>
            <Image src={`${IMGCDNURL}iconsRIght.png`} className='rightIcons' />
          </View>
        </View>
      </View>
        <View className='publish-recruit-card' onClick={()=>handleWorker()}>
        <View className='publish-list-item'>
          <Text className='pulish-list-title'>选择工人</Text>
          <Input
            className='publish-list-input'
            type='text'
            disabled
            placeholder='请选择工人'
          />
          <View className='rightIconsBox'>
            <Image src={`${IMGCDNURL}iconsRIght.png`} className='rightIcons' />
          </View>
        </View>
      </View>
      <View className='classification'>
        <View className='publish-recruit-card'>
          <View className='publish-list-item'>
            <View className='classification-title'>记工分类</View>
          </View>
        </View>
          <View className='classification-box'>
            {/* <View className='classification-box-list'>点工</View>
            <View className=''>借支</View>
            <View>结算</View> */}
            {classification&&classification.map((v)=>(
              <View onClick={() => handleClassification(v)} className={classnames({
                'classification-box-list-max':(v.id ==3 || v.id ==1) && !v.click,
                'classification-box-list': (v.id != 3 || v.id != 1) && !v.click,
                'classification-box-list-max-click': (v.id == 3 || v.id == 1) && v.click,
                'classification-box-list-click': (v.id != 3 || v.id != 1) && v.click,
              })}
            // {v.id == 3 || v.id == 1? 'classification-box-list-max' :'classification-box-list'}
            key={v.id}>{v.name}</View>
            ))}
        </View>
      </View>
        <View className='publish-recruit-card'>
          <View className='publish-list-item-details'>
            <Text className=''>有无备注</Text>
            <View className='details'>有备注</View>
          </View>
        </View>
    </View>
    </AtDrawer>
  )
}
