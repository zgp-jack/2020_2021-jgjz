import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text, Input, Checkbox, Picker, ScrollView, RadioGroup, Radio } from '@tarojs/components'
import { AtDrawer } from 'taro-ui'
import './index.scss'

interface PROPS {
  display: boolean,
  maskHandleClose?: () => void,//一般情况下等于handleClose
  handleClose: () => void,
  wageStandard: any,
  handleWageStandard: (type: string, val: any) => void,
  handleAddWage: () => void,
  handleWageStandardRadio: (e) => void,
  handleAdd: (e: string, val: string) => void,
  handleDel: (e: string, val: string) => void,
  model:any,
  boxValue:any,
  setBoxValue:any,
  isFocus:boolean,
  stateData:any,
  setStateData:any,
}
// let stateData={
//   work: true,
//   money: false,
//   addWork: false,
//   day: false,
// }
export default function WageStandard({ display, maskHandleClose, handleClose, wageStandard, handleWageStandard, handleAddWage, handleWageStandardRadio, handleAdd, handleDel, model, boxValue, setBoxValue, isFocus, stateData, setStateData }: PROPS) {
  // const [stateData,setStateData]= useState<any>({
  //   work:false,
  //   money:false,
  //   addWork:false,
  //   day:false,
  // })
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
  const handleState = (type:string)=>{
    const stateItem = JSON.parse(JSON.stringify(stateData));
    for (let i in stateItem) {
      stateItem[i] = false;
    }
    // if(stateItem[type]){
    stateItem[type] = true;
    // stateData = stateItem;
    console.log(stateData,'stateData')
    // }
    // console.log(stateItem,'staItem')
    setStateData(stateItem);
    if (type) {
      const value = JSON.parse(JSON.stringify(wageStandard));
      const item = JSON.parse(JSON.stringify(boxValue));
      if (value[type]) {
        item[type] = value[type];
      }else{
        item[type] = 0;
      }
      // console.log(value[type,'1111'])
      console.log(item,'itemitemitemitem')
      setBoxValue(item);
      // value[type] = '';
      // setModel(value);
    }
  }
  const handleOnBlur=()=>{
    const stateItem = JSON.parse(JSON.stringify(stateData));
    for (let i in stateItem) {
      stateItem[i] = false;
    }
    // stateData = stateItem;
    setStateData(stateItem);
  }
  console.log(isFocus,'isFocusisFocusisFocus')
  return (
    // <View className={display?'wageStandard':''}>
    // <View className='mt'>
    // <View className='mt'>
      <AtDrawer show={display} mask right width={'100%'}>
      <View className='backgroundImg' onClick={handleClose}></View>
      {/* <View className='wageStandard-content-heard'>
        <View className='wageStandard-content-heard-close' onClick={handleClose}>取消</View>
        <View>设置工资标准</View>
        <View className='wageStandard-content-heard-ok' onClick={handleAddWage}>确定</View>
      </View> */}
      <View className='title'>上班工资标准</View>
      <View className='wageStandard-box'>
        <View className='wageStandard-content-listBox'>
          <View className='wageStandard-content-listBox-list'>
            <View className='wageStandard-content-listBox-list-left'><Text className='wageStandard-content-listBox-list-title'>上班标准:</Text> {toFixedFnNum(wageStandard.work)}小时算一个工</View>
            <View className='atInputNumber'>
              <View className='icon icon_left' onClick={() => handleDel('work', wageStandard.work)}>-</View><View>
                <Input
                  type='digit'
                  className={stateData.work ? 'inputBox-Focus' :'inputBox'}
                  cursorSpacing={200}
                  cursor={toFixedFnNum(wageStandard.work).toString().length || 0}
                  selectionEnd={toFixedFnNum(wageStandard.work).toString().length || 0}
                  selectionStart={toFixedFnNum(wageStandard.work).toString().length || 0}
                  // maxLength={7}
                  onBlur={handleOnBlur}
                  onFocus={()=>handleState('work')}
                  focus={isFocus?true:false}
                  autoFocus={isFocus ? true : false}
                  auto-focus={isFocus ? true : false}
                  value={toFixedFnNum(wageStandard.work).toString()}
                  // onBlur={(e) => { e.stopPropagation(); e.preventDefault() }}
                  onInput={(e) => handleWageStandard('work', e)} />
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
                    className={stateData.money ? 'inputBox-Focus' : 'inputBox'}
                    // maxLength={7}
                    cursorSpacing={200}
                    // autoFocus=
                    cursor={wageStandard.money.length||0} 
                    selectionEnd={wageStandard.money.length || 0}
                    selectionStart={wageStandard.money.length || 0}
                    onBlur={handleOnBlur}
                    onFocus={() => handleState('money')}
                    value={wageStandard.money}
                    // onBlur={(e) => { e.stopPropagation(); e.preventDefault() }}
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
      <View className='addTitle'>加班工资标准</View>
      <View className='formula'>
        <View className='formula-heard'>
          <View>加班工资计算方式：</View>
          <RadioGroup>
            {wageStandard.data.map(v => (
              <Radio className='radio' checked={v.click} color='#0099FF' key={v.id} onClick={() => handleWageStandardRadio(v)}>{v.name}</Radio>
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
                    className={stateData.addWork ? 'inputBox-day-Focus' : 'inputBox-day'}
                    // maxLength={7}
                    cursor={wageStandard.addWork.length || 0} 
                    cursorSpacing={200}
                    onBlur={handleOnBlur}
                    onFocus={() => handleState('addWork')}
                    value={wageStandard.addWork}
                    selectionEnd={wageStandard.addWork.length || 0}
                    selectionStart={wageStandard.addWork.length || 0}
                    // onBlur={(e) => {e.stopPropagation();e.preventDefault()}}
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
                    className={stateData.day ? 'inputBox-day-Focus' : 'inputBox-day'}
                    cursorSpacing={200}
                    cursor={wageStandard.day.length || 0} 
                    selectionEnd={wageStandard.day.length || 0}
                    selectionStart={wageStandard.day.length || 0}
                    // maxLength={7}
                    onBlur={handleOnBlur}
                    onFocus={() => handleState('day')}
                    value={toFixedFnNum(wageStandard.day).toString()}
                    // onBlur={(e) => { e.stopPropagation(); e.preventDefault() }}
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
      <View className='btnBox'>
        <View className='btn' onClick={handleAddWage}>使用此工资标准</View>
        <View className='closeBtn' onClick={handleClose}>取消</View>
      </View>
    </AtDrawer>
    // </View>
    // </View>
  )
}
WageStandard.options={
  addGlobalClass: true
}