import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text, Input, Checkbox, Picker, ScrollView } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { IMGCDNURL } from '../../config'
import classnames from 'classnames'
import './index.scss'

interface PROPS {
  display: boolean
  handleClose: () => void,
  workerData:any,
  handleWorkerList:(v)=>void,
  allCheckout:boolean,
  handleWorkerOk:()=>void,
  handleAllCheckout:()=>void,
  onActionClick:()=>void,
  valData:string,
  handleOnClear:()=>void,
  handleChange:(e)=>void,
  // handleEstablish: (groupInfo: string) => void,
  // classification: any,
}
export default function MailListModal({ display, handleClose, workerData, handleWorkerList, allCheckout, handleWorkerOk, handleAllCheckout, onActionClick, valData, handleOnClear, handleChange }: PROPS) {
  return (
    <View>
      {display && <View className='MailListModal' onClick={()=>handleClose()}>
        <View className='MailListModal-content' onClick={(e) => { e.stopPropagation() }}>
          <View className='MailListModal-heard'>选择工人</View>
          <View className='searchName'>
            <AtSearchBar
              placeholder='请输入名字或手机号码查询'
              showActionButton
              value={valData}
              // onFocus={() => setmasklayer(true)}
              onClear={handleOnClear}
              onChange={handleChange}
              onActionClick={() => onActionClick()}
              onConfirm={onActionClick}
              // onBlur={() => setmasklayer(false)}
            />
          </View>
          <View className='MailListModal-scroll-box'>
          <View className='MailListModal-scroll'>
            {workerData.map((val,i)=>(
              <View key={i+i}>
                <View className='list-title'>{(val.name_py && val.name_py.toUpperCase())||''}</View>
                {val.list.map((v)=>(
                  <View className='list-flex-test' onClick={()=>handleWorkerList(v)}>
                    {v.click ?
                      <Image src={`${IMGCDNURL}clickCheckout.png`} className='checkbox-click' />
                      : <View className='checkbox-no'></View>
                    }
                    <View>
                      <View className={classnames({
                        'image': v.id % 2 == 1 && v.id > 100,
                        'image-red': v.id % 2 == 0 && v.id > 100,
                        'image-origion': v.id % 2 == 1 && v.id < 100,
                        'image-violet': v.id % 2 == 0 && v.id < 100,
                      })}>{v.name.substring(v.name.length - 2)}</View>
                    </View>
                    <View>
                      <View className='name'>{v.name}</View>
                      <View className='phone'>{v.tel||''}</View>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
          </View>
          <View className='allCheckout'>
            <View className='allCheckout-box'>
              <View className='all' onClick={handleAllCheckout}>
                <View className='flex'>
                  {allCheckout?
                    <Image src={`${IMGCDNURL}clickCheckout.png`} className='checkbox-click-all' />
                    :
                    <View className='checkbox-no-all'></View>
                    }
                </View>
                <View>全选</View></View>
              <View className='allCheckout-btn' onClick={handleWorkerOk}>确定</View>
            </View>
          </View>
        </View>
      </View>}
    </View>
  )
}