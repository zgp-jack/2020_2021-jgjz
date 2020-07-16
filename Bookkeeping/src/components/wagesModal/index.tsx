import Taro, { useState } from '@tarojs/taro'
import { View, Text, Checkbox,Switch, Button } from '@tarojs/components'
import './index.scss'
import classnames from 'classnames'

// interface DataType{
//   name:string,
//   id:string,
// }
interface PROPS {
  display: boolean,
  handleClose: () => void,
  data:any,
  handleAddStandard:()=> void,
  standard:any,
  moneyList:any
  handleEditWages:(v,type)=> void,
  handleAtSwitch:(e)=>void,
  tab:number,
  handleSetWagesModal:()=>void,
  handleWagesList:(v)=>void,
  handleCheckboxStandard:(v)=>void,
  clickModalNum:number,
  handleAllClick:()=>void,
}
export default function WagesModal({ display, handleClose, data, handleAddStandard, standard, moneyList, handleEditWages, tab, handleAtSwitch, handleSetWagesModal, handleWagesList, handleCheckboxStandard, clickModalNum, handleAllClick }: PROPS) {
  return(
    <View>
      {display && 
        <View className='wagesModal'>
          <View className='wagesModal-content'>
            <View className='wagesModal-content-heard'>
              <View>
                <View className='tab'>
                  {tab=== 0 && 
                  <View className='lookWages' onClick={()=>{handleAtSwitch(0)}}>查看工资标准
                      <View className='setWages' onClick={(e) => { e.stopPropagation(); handleAtSwitch(1)}}>设置工资标准
                    </View>
                  </View>
                  }
                  {tab === 1 && 
                  <View className='setWagesClick' onClick={(e) => { e.stopPropagation(); handleAtSwitch(1) }}>查看工资标准
                        <View className='lookWagesClick' onClick={() => { handleAtSwitch(0) }}>设置工资标准
                    </View>
                  </View>
                  }
                </View>
                <View onClick={handleClose} className='wagesModal-content-close'>X</View>
              </View>
            </View>
            <View className='content'>
            { tab === 0 && <View>
            <View className='worker'>
              <View className='worker-title'>
                <View>选择工人(已选择[{clickModalNum}]人)</View>
                <View>
                  <View className='allChange' onClick={handleAllClick}>全选</View>
                  <View className='change'>(已选{clickModalNum}人)</View>
                </View>
              </View>
                {/* {data && data.length<=12 &&  */}
                  { data && data.length > 0 && 
                  <View className='wagesModal-personnel'>
                    {data.map((v)=>(
                      <View className='wagesModal-personnel-box' key={v.id} onClick={()=>handleWagesList(v)}>
                        <View className='background'>
                        <View className={classnames({
                          'wagesModal-personnel-box-list':v,
                          'wagesModal-personnel-box-list-click': v.click,
                          // 'wagesModal-personnel-box-list-set':v.set
                        })}>{v.name.slice(0,2)}</View>
                        <View className='names'>{v.name}</View>
                        </View>
                        <View className={v.set?'':'list-icon'}></View>
                      </View>
                    ))}
                  </View>
                }
                {/* {data && data.length > 12 &&
                  <View>
                    <View className='wagesModal-personnel'>
                      {data.map((v) => (
                        <View className='wagesModal-personnel-box' key={v.id}>
                          <View className='wagesModal-personnel-box-list'>{v.name.slice(0,2)}</View>
                          <View>{v.name}</View>
                        </View>
                      ))}
                    </View>
                    <View className='tips'>共14条 <Text className='wagesModal-personnel-box-list-open'>展开 >></Text></View>
                  </View>
                } */}
            </View>
            <View className='wagesModal-standard'>
              <View className='wagesModal-standard-flex'>
                <View>工资标准</View>
                  <View className='wagesModal-standard-flex-add' onClick={handleAddStandard}>+添加其他标准</View>
              </View>
              <View className='wagesModal-standard-box'>
                {standard.map((v,i)=>(
                  <View className='wagesModal-standard-box-list'>
                    <View className='wagesModal-standard-box-list-title'>{i==0?'默认工资模板1':'默认工资模板2'}</View>
                    <View className='wagesModal-standard-box-list-flex'>
                      <View><Checkbox className='checkbox' checked={v.click} value={v.click} onClick={()=>handleCheckboxStandard(v)}/></View>
                      <View className='wagesModal-standard-box-list-flex-middle'>
                        <View>上班标准：{v.worktime_define}小时算1个工<Text>{v.money}</Text>/个工</View>
                        <View>加班标准：{v.overtime_type === '1' ? '按小时算' : '按天算'} {v.overtime_type == '1' ? `加班${v.overtime_money}/小时` : `加班 ${v.overtime}小时算1个工` } </View>
                      </View>
                      <View>
                        <View className='wagesModal-standard-box-list-edit' onClick={() => handleEditWages(v,0)}>修改</View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              <View className='wagesModal-footer'>
                  <View className='wagesModal-footer-btn' onClick={handleSetWagesModal}>确定设置({clickModalNum}人)</View>
              </View>
            </View>
            </View>
            }
            {
              tab === 1 && 
              <View className='wagesModal-standard-box-look'>
                {moneyList.length === 0 && <View className='noData'><View className='noData-no'>暂未设置工资标准</View></View>}
                {moneyList.map((v)=>(
                <View className='wagesModal-standard-box-list' key={v.id}>
                  <View className='wagesModal-standard-box-list-look-title'>{v.worker_name}</View>
                  <View className='wagesModal-standard-box-list-flex'>
                    <View className='wagesModal-standard-box-list-flex-look-left'>
                        <View className='wagesModal-standard-box-list-flex-look-left-list'>上班 <Text className='wagesModal-standard-box-list-flex-look-left-list-color'>{v.worktime_define}小时算1个工<Text className='red'>{v.money}</Text>元/个工</Text></View>
                        <View>加班 <Text>{v.overtime_type === '1' ? '按小时算' : '按天算'}  {v.overtime_type == '1' ? `加班${v.overtime_money}/小时` : `加班 ${v.overtime}小时算1个工`} </Text></View>
                    </View>
                    <View className='wagesModal-standard-box-list-look-edit-box'>
                      <View className='wagesModal-standard-box-list-edit' onClick={()=>handleEditWages(v,1)}>修改</View>
                    </View>
                  </View>
                </View>
                ))}
              </View>
            }
          </View>
          </View>
        </View> 
      }
    </View>
  )
}