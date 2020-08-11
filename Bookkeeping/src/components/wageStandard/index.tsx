import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text, Input, Checkbox, Picker, ScrollView, RadioGroup, Radio } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import './index.scss'

interface PROPS {
  display: boolean 
  handleClose: () => void,
  wageStandard:any,
  handleWageStandard:(type:string,val:any)=>void,
  handleAddWage:()=>void,
  handleWageStandardRadio:(e)=>void,
}
const styles =
{
  content: { fontSize: '13px' }
}
export default function WageStandard({ display, handleClose, wageStandard, handleWageStandard, handleAddWage, handleWageStandardRadio }: PROPS) {
  console.log(wageStandard,'wageStandard')
  return(
    <View>
      {display && <View className='wageStandard'>
        <View className='wageStandard-content'>
          <View className='wageStandard-content-heard'>
            <View className='wageStandard-content-heard-close' onClick={handleClose}>取消</View>
            <View>设置工资标准</View>
            {/* {wageStandard.state === 1 ?  */}
              <View className='wageStandard-content-heard-ok' onClick={handleAddWage}>确定</View> 
          </View>
          <View className='wageStandard-box'>
            <View className='wageStandard-content-listBox'> 
              <View className='wageStandard-content-listBox-list'>
                <View className='wageStandard-content-listBox-list-left'><Text className='wageStandard-content-listBox-list-title'>上班标准:</Text> {parseFloat(wageStandard.work)}小时算一个工</View>
                <View className='atInputNumber'>
                  <AtInputNumber
                    className='atInputNumberInput'
                    type='digit'
                    min={0}
                    max={10000}
                    step={0.5}
                    value={wageStandard.work}
                    onChange={(e) => { handleWageStandard('work',e)}}
                    />
                </View>
              </View>
              <View className='wageStandard-content-listBox-list'>
                <View className='wageStandard-content-listBox-list-left'><Text className='wageStandard-content-listBox-list-title'>每个工多少钱:</Text> {wageStandard.money}元/个工</View>
                <View>
                  <AtInputNumber
                    type='digit'
                    min={0}
                    max={10000}
                    step={1}
                    value={wageStandard.money}
                    onChange={(e) => { handleWageStandard('money', e) }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className='formula'>
            <View className='formula-heard'>
              <View>加班工资计算方式：</View>
              <RadioGroup>
                {wageStandard.data.map(v=>(
                  <Radio className='radio' checked={v.click} color='#0099FF' key={v.id} onClick={()=>handleWageStandardRadio(v)}>{v.name}</Radio>
                ))}
              </RadioGroup>
            </View>
            {wageStandard.type == 1 &&
              <View className='workList'>
                <View className='workList-title'>加班{wageStandard.addWork}元/小时</View>
                <View className='workList-add'>
                    <AtInputNumber
                      type='digit'
                      min={0}
                      max={100000}
                      step={1}
                      value={wageStandard.addWork}
                      onChange={(e) => { handleWageStandard('addWork', e) }}
                    />
                </View>
            </View>
            }
            {wageStandard.type == 2 &&
              <View>
                <View className='workList'>
                  {/* <View className='workList-title'>加班6小时算一个工</View> */}
                  <View className='workList-title'>加班{parseFloat(wageStandard.day)}小时算一个工</View>
                  <View className='workList-add'>
                    <AtInputNumber
                      type='digit'
                      min={0}
                      max={100000}
                      step={0.5}
                      value={wageStandard.day}
                      onChange={(e) => { handleWageStandard('day', e) }}
                    />
                  </View>
                </View>
                <View className='workList'>
                <View className='workList-title'>加班{wageStandard.dayAddWork||0}元/小时</View>
                </View>
              </View>
            }
            <View>
            </View>
          </View>
        </View>
      </View>}
    </View>
  )
}
