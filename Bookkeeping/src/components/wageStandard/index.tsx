import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text, Input, Checkbox, Picker, ScrollView, RadioGroup, Radio } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import './index.scss'

interface PROPS {
  display: boolean,
  maskHandleClose: () => void,//一般情况下等于handleClose
  handleClose: () => void,
  wageStandard:any,
  handleWageStandard:(type:string,val:any)=>void,
  handleAddWage:()=>void,
  handleWageStandardRadio:(e)=>void,
  handleAdd:(e:string,val:string)=>void,
  handleDel: (e: string, val: string) => void,
}
const styles =
{
  content: { fontSize: '13px' }
}
export default function WageStandard({ display, maskHandleClose=()=>{}, handleClose, wageStandard, handleWageStandard, handleAddWage, handleWageStandardRadio, handleAdd, handleDel }: PROPS) {
  const toFixedFnNum = (num: any) => {
    let s = num + '';
    s = s.substring(0, s.indexOf(".") + 3);
    return Number(s);
  }
  const toFixedFn = (num: any) => {
    let f = parseFloat(num);
    if (isNaN(f)) {
      return false;
    }
    f = Math.round(num * 1000) / 1000;
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    s = s.substring(0, s.indexOf(".") + 3);
    return s.toString();
  }
  return(
    <View>
      {display && <View className='wageStandard' onClick={maskHandleClose}>
        <View className='wageStandard-content' onClick={(e)=> e.stopPropagation()}>
          <View className='wageStandard-content-heard'>
            <View className='wageStandard-content-heard-close' onClick={handleClose}>取消</View>
            <View>设置工资标准</View>
            {/* {wageStandard.state === 1 ?  */}
              <View className='wageStandard-content-heard-ok' onClick={handleAddWage}>确定</View> 
          </View>
          <View className='wageStandard-box'>
            <View className='wageStandard-content-listBox'> 
              <View className='wageStandard-content-listBox-list'>
                <View className='wageStandard-content-listBox-list-left'><Text className='wageStandard-content-listBox-list-title'>上班标准:</Text> {toFixedFnNum(wageStandard.work)}小时算一个工</View>
                <View className='atInputNumber'>
                  <View className='icon icon_left' onClick={() => handleDel('work', wageStandard.work)}>-</View><View>
                    <Input 
                      type='digit'
                      className='inputBox' 
                      // maxLength={7}
                      value={toFixedFnNum(wageStandard.work).toString()} 
                      onInput={(e) =>handleWageStandard('work', e)}/>
                  </View><View className='icon icon_right' onClick={() => handleAdd('work', wageStandard.work)}>+</View>
                </View> 
              </View>
              <View className='wageStandard-content-listBox-list'>
                <View className='wageStandard-content-listBox-list-left'><Text className='wageStandard-content-listBox-list-title'>每个工多少钱:</Text> <Text>{toFixedFn(wageStandard.money)}</Text>元/个工</View>
                <View>
                  <View className='atInputNumber'>
                    <View className='icon icon_left' onClick={() => handleDel('money', wageStandard.money)}>-</View><View>
                      <Input
                        type='digit'
                        className='inputBox'
                        // maxLength={7}
                        value={wageStandard.money}
                        onInput={(e) => handleWageStandard('money', e)} />
                    </View><View className='icon icon_right' onClick={() => handleAdd('money', wageStandard.money)}>+</View>
                  </View> 
                  {/* <AtInputNumber
                    type='digit'
                    min={0}
                    max={9999.99}
                    step={1}
                    value={wageStandard.money}
                    onChange={(e) => { handleWageStandard('money', e) }}
                  /> */}

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
              <View className='workList-title'>加班<Text>{toFixedFn(wageStandard.addWork)}</Text>元/小时</View>
                <View className='workList-add'>
                <View className='atInputNumber'>
                  <View className='icon icon_left' onClick={() => handleDel('addWork', wageStandard.addWork)}>-</View><View>
                    <Input
                      type='digit'
                      className='inputBox-day'
                      // maxLength={7}
                      value={wageStandard.addWork}
                      onInput={(e) => handleWageStandard('addWork', e)} />
                  </View><View className='icon icon_right' onClick={() => handleAdd('addWork', wageStandard.addWork)}>+</View>
                </View> 
                    {/* <AtInputNumber
                      type='digit'
                      min={0}
                      max={9999.99}
                      step={1}
                      value={wageStandard.addWork}
                      onChange={(e) => { handleWageStandard('addWork', e) }}
                    /> */}
                </View>
            </View>
            }
            {wageStandard.type == 2 &&
              <View>
                <View className='workList'>
                  {/* <View className='workList-title'>加班6小时算一个工</View> */}
                  <View className='workList-title'>加班{parseFloat(wageStandard.day)}小时算1个工</View>
                  {/* <View className='workList-add'> */}
                  <View className='atInputNumber-mr'>
                  <View className='icon icon_left' onClick={() => handleDel('day', wageStandard.day)}>-</View><View>
                      <Input
                        type='digit'
                        className='inputBox-day'
                        // maxLength={7}
                        value={toFixedFnNum(wageStandard.day).toString()}
                        onInput={(e) => handleWageStandard('day', e)} />
                  </View><View className='icon icon_right' onClick={() => handleAdd('day', wageStandard.day)}>+</View>
                  </View> 
                  {/* </View> */}
                </View>
                <View className='workList'>
                <View className='workList-title'>加班<Text>{wageStandard.dayAddWork}</Text>元/小时</View>
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
