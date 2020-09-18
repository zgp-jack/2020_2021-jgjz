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
  handleDetails:()=>void,
  handleReset:()=>void,
  handleOk:()=>void,
  // handleInput: (type: string, e: any) => void,
  // groupInfo: string,
  // list: any
}

export default function ScreenModal({ display, handleClose, handleEstablish, classification, handleWorker, handleProject, val, handleClassification, handleDetails, handleReset, handleOk}: PROPS) {
  console.log(val,'classification')
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
            placeholderStyle='color:rgba(0, 153, 255, 1'
            // placeholderClass='rgba(0, 153, 255, 1'
            placeholder='全部项目'
            value={val.screeProject}
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
            placeholderStyle='color:rgba(0, 153, 255, 1'
            // placeholderClass='rgba(0, 153, 255, 1'
            placeholder='全部工人'
            value={val.screenWorker}
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
                'classification-box-list-max':v.long && !v.click,
                'classification-box-list': !v.long && !v.click,
                'classification-box-list-max-click': v.click && v.long,
                'classification-box-list-click': v.click && !v.long,
              })}
            // {v.id == 3 || v.id == 1? 'classification-box-list-max' :'classification-box-list'}
            key={v.id}>{v.name}</View>
            ))}
        </View>
      </View>
        <View className='publish-recruit-card'>
          <View className='publish-list-item-details'>
            <Text className=''>有无备注</Text>
            <View className={!val.screenDetails ? 'details' :'details-click'} onClick={handleDetails}>有备注</View>
          </View>
        </View>
      <View className='footer'>
          <View className='footer-left' onClick={handleClose}><Image className='flowingWaterLeft' src={`${IMGCDNURL}flowingWaterLeft.png`}/></View>
        <View className='footer-flex'><View className='footer-reset' onClick={handleReset}>重置</View><View className='footer-ok' onClick={handleOk}>确定</View></View>
      </View>
    </View>
    </AtDrawer>
  )
}
