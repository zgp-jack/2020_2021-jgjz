import Taro, { useState } from '@tarojs/taro'
import { View, Text, Checkbox, Image, Button } from '@tarojs/components'
import { IMGCDNURL } from '../../config'
import './index.scss'
import classnames from 'classnames'

// interface DataType{
//   name:string,
//   id:string,
// }
interface PROPS {
  display: boolean,
  maskHandleClose?: () => void,//一般情况下等于handleClose
  handleClose: () => void,
  data: any,
  handleAddStandard: () => void,
  standard: any,
  moneyList: any
  handleEditWages: (v, type) => void,
  handleAtSwitch: (e) => void,
  tab: number,
  handleSetWagesModal: () => void,
  handleWagesList: (v) => void,
  handleCheckboxStandard: (v) => void,
  clickModalNum: number,
  handleAllClick: () => void,
  checkAll: boolean,
  recorderType: number;
}
export default function WagesModal({ display, maskHandleClose = () => { }, handleClose, data, handleAddStandard, standard, moneyList, handleEditWages, tab, handleAtSwitch, handleSetWagesModal, handleWagesList, handleCheckboxStandard, clickModalNum, handleAllClick, checkAll, recorderType }: PROPS) {
  return (
    <View>
      {display &&
        <View className='wagesModal' onClick={maskHandleClose}>
          <View className='wagesModal-content' onClick={(e) => { e.stopPropagation() }}>
            <View className='wagesModal-content-heard'>
              <View>
                {tab === 0 &&
                  <View className='tab'>
                    <View className='Wages_box_right'>
                      <View className='lookWages' onClick={() => { handleAtSwitch(0) }}>查看工资标准
                  <View className='setWages' onClick={(e) => { e.stopPropagation(); handleAtSwitch(1) }}>设置{recorderType == 1 ? '点工' : '包工'}标准
                      </View>
                      </View>
                    </View>
                  </View>
                }
                {tab === 1 &&
                  <View className='tabList'>
                    {/* <View className='setWagesClick' onClick={(e) => { e.stopPropagation(); handleAtSwitch(1) }}>查看工资标准
                  <View className='lookWagesClick' onClick={() => { handleAtSwitch(0) }}>设置工资标准
                    </View>
                  </View> */}
                    <View className='Wages_box_left'>
                      <View className='lookWagesClick' onClick={(e) => { e.stopPropagation(); handleAtSwitch(1) }}> 设置{recorderType == 1 ? '点工' : '包工'}标准
                      <View className='setWagesClick' onClick={() => { handleAtSwitch(0) }}>查看工资标准
                      </View>
                      </View>
                    </View>
                  </View>
                  // setWagesClick lookWagesClick
                }
                {/* </View> */}
                <View onClick={handleClose} className='wagesModal-content-close'>
                  <Image src={`${IMGCDNURL}closeIcons.png`} className='closeIcons' />
                </View>
              </View>
            </View>
            {tab === 0&&
            <View className='worker'>
              <View className='worker-title'>
                <View>选择工人(已选择[{clickModalNum}]人)</View>
                <View>
                  <View className='allChange' onClick={handleAllClick}>{!checkAll ? '全选' : '取消全选'}</View>
                  <View className='change'>(已选{clickModalNum}人)</View>
                </View>
              </View>
              {/* {data && data.length<=12 &&  */}
            </View>
            }
          <View className={tab === 0 ? 'content' : (moneyList.length === 0 ? 'noContent' :'contentTab')}>
              {tab === 0 && <View>
                <View className='content-middle'>
                  {data && data.length > 0 &&
                    <View className='wagesModal-personnel'>
                      {data.map((v) => (
                        <View className='wagesModal-personnel-box' key={v.id} onClick={() => handleWagesList(v)}>
                          <View className='background'>
                            <View className='userClick-box'>
                              <View className={classnames({
                                'wagesModal-personnel-box-list': v.id % 2 == 1 && v.id > 100,
                                'wagesModal-personnel-box-list-red': v.id % 2 == 0 && v.id > 100,
                                'wagesModal-personnel-box-list-origion': v.id % 2 == 1 && v.id < 100,
                                'wagesModal-personnel-box-list-violet': v.id % 2 == 0 && v.id < 100,
                                // 'wagesModal-personnel-box-list-click': v.click,
                                // 'wagesModal-personnel-box-list-set':v.set
                              })}>{v.name.substring(v.name.length - 2)}</View>
                              <View className='names'>{v.name}</View>
                            </View>
                            <View className={v.set ? '' : 'list-icon'}></View>
                          </View>
                          <View className={v.click ? 'userClick' : ''}></View>
                        </View>
                      ))}
                    </View>
                  }
                <View className='wagesModal-standard'>
                  <View className='wagesModal-standard-flex'>
                    <View>{recorderType == 1 ? '点工' : '包工'}标准</View>
                    {/* <View className='wagesModal-standard-flex-add' onClick={handleAddStandard}>
                    <Image src={`${IMGCDNURL}balckAdd.png`} className='balckAdd' />
                    添加其他标准</View> */}
                  </View>
                  <View className='wagesModal-standard-box'>
                    {standard.map((v, i) => (
                      <View className='wagesModal-standard-box-list'>
                        <View className='wagesModal-standard-box-list-border'>
                          <View className='wagesModal-standard-box-list-title'>{i == 0 ? '工资标准模板1' : '工资标准模板2'}</View>
                          <View className='wagesModal-standard-box-list-flex' onClick={() => handleCheckboxStandard(v)}>
                            <View className='checkbox'>
                              {/* <Checkbox className='checkbox' checked={v.click} value={v.click}/> */}
                              {v.click && <View className='checkbox-click'></View>}
                              {!v.click && <View className='checkbox-no'></View>}
                            </View>
                            <View className='wagesModal-standard-box-list-flex-middle'>
                              <View>上班标准：{parseFloat(v.worktime_define)}小时算1个工<Text className='red'>{v.money}</Text>元/个工</View>
                              <View>加班标准：{v.overtime_type === '1' ? '按小时算' : '按工天算'} {v.overtime_type == '1' ? <Text><Text className='red'>{v.overtime_money}</Text>元/小时</Text> : <Text>加班 {parseFloat(v.overtime)}小时算1个工</Text>} </View>
                            </View>
                          </View>
                        </View>
                        <View className='wagesModal-standard-box-list-look-edit-box' onClick={() => handleEditWages(v, 0)}>
                          <View className='wagesModal-standard-box-list-edit'>修改</View>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View className='wagesModal-footer'>
                    <View className='wagesModal-footer-btn' onClick={handleSetWagesModal}>确定设置({clickModalNum}人)</View>
                  </View>
                </View>
              </View>
              </View>
              }
              {
                tab === 1 &&
                <View className='wagesModal-standard-box-look'>
                  {moneyList.length === 0 && <View className='noData'><View className='noData-no'>暂未设置工资标准</View></View>}
                  {moneyList.map((v) => (
                    <View className='wagesModal-standard-box-list' key={v.id}>
                      <View className='wagesModal-standard-box-list-flex'>
                        <View className='wagesModal-standard-box-list-flex-left'>
                          <View className='wagesModal-standard-box-list-look-title'>{v.worker_name}</View>
                          <View className='wagesModal-standard-box-list-flex'>
                            <View className='wagesModal-standard-box-list-flex-look-left'>
                              <View className='wagesModal-standard-box-list-flex-look-left-list'>上班 <Text className='wagesModal-standard-box-list-flex-look-left-list-color'>{v.worktime_define}小时算1个工<Text className='red'>{v.money}</Text>元/个工</Text></View>
                              <View className='wagesModal-standard-box-list-flex-look-left-list'>加班 <Text className='wagesModal-standard-box-list-flex-look-left-list-color'>{v.overtime_type === '1' ? '按小时算' : '按工天算'}  {v.overtime_type == '1' ? <Text><Text className='red'>{v.overtime_money}</Text>元/小时</Text> : <Text>加班{parseFloat(v.overtime)}小时算1个工</Text>} </Text></View>
                            </View>
                          </View>
                        </View>
                        <View className='wagesModal-standard-box-list-look-edit-box'>
                          <View className='wagesModal-standard-box-list-edit-box' onClick={() => handleEditWages(v, 1)}>修改</View>
                        </View>
                      </View>
                      {/* <View className='worker-title grey'></View> */}
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