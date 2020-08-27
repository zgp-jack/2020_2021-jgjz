import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { IMGCDNURL } from '../../config'
import classnames from 'classnames'
import './index.scss'

interface dataType{
  id:number,
  name:string,
  click:boolean
}
interface PROPS {
  display: boolean //是否跳转到页面授权
  maskHandleClose?: () => void,//一般情况下等于handleWorkOvertimeClose
  handleWorkOvertimeClose: (boolean) => void;
  handleworkOvertime:(type:number,v:any)=>void;
  data:dataType[],
  dataArr: dataType[],
  handleWorkOvertimeOk:()=>void;
  model:any,
}
export default function WorkOvertime({ display, maskHandleClose=()=>{}, handleWorkOvertimeClose, handleworkOvertime, data, dataArr, handleWorkOvertimeOk, model }: PROPS) {
  return (
    <View>
      {display &&
        <View className='workOvertime-complaintModal' onClick={maskHandleClose}>
          <View className='workOvertime-complaintModal-content' onClick={(e)=> e.stopPropagation()}>
          <View className='workOvertime-complaintModal-content-title'><Text className='close' onClick={handleWorkOvertimeClose}>取消</Text><Text className='title'>选择上班时长</Text><Text onClick={handleWorkOvertimeOk} className='workOvertime-complaintModal-content-close'>确定</Text></View>
          <View className='workOvertime-complaintModal-content-timeBox'>
            <View className='workOvertime-complaintModal-content-tips'>{model.modalDuration}</View>
            <View>上班时长</View>
            <View className='workOvertime-complaintModal-content-box'>
                {data.map(v => (
                  <View 
                    className={classnames({
                      'workOvertime-complaintModal-content-box-list-margin':v.id == 1 && v.click,
                      'workOvertime-complaintModal-content-box-list-click': v.id != 1 && v.click,
                      'workOvertime-complaintModal-content-box-list':!v.click,
                    })}
                    // className={v.click ? 'workOvertime-complaintModal-content-box-list-click' : 'workOvertime-complaintModal-content-box-list'}   
                    key={v.id}
                    onClick={() => { handleworkOvertime(1,v)}}
                    >{v.name}
                    {(v.id != 1 && v.id != 2 && v.id != 3) &&
                      <Image src={`${IMGCDNURL}downIcons.png`} className='downIcons' />
                    }
                    </View>
                ))}
              </View>
            <View className='workOvertime-complaintModal-content-box-title'>加班时长</View>
            <View className='workOvertime-complaintModal-content-box-add'>
              {dataArr.map(v => (
                <View
                  className={classnames({
                    'workOvertime-complaintModal-content-box-list-margin': v.id == 1 && v.click,
                    'workOvertime-complaintModal-content-box-list-click': v.id != 1 && v.click,
                    'workOvertime-complaintModal-content-box-list': !v.click,
                  })}
                  // className={v.click ? 'workOvertime-complaintModal-content-box-list-click' : 'workOvertime-complaintModal-content-box-list'}
                  key={v.id}
                  onClick={() => { handleworkOvertime(0, v) }}
                >{v.name}
                  {v.id!=1 && 
                    <Image src={`${IMGCDNURL}downIcons.png`} className='downIcons'/>
                  }
                </View>
              ))}
            </View>
            {/* <View className='workOvertime-complaintModal-content-box-flex'><View className='workOvertime-complaintModal-content-box-list-click'>无加班</View><View className='workOvertime-complaintModal-content-box-list' onClick={()=>handleworkOvertime(0)}>0.0小时</View></View> */}
            </View>
          {/* <View className='workOvertime-complaintModal-footer'>
            <View className='workOvertime-complaintModal-footer-left'>取消</View>
            <View className='workOvertime-complaintModal-footer-right'>确认</View>
          </View> */}
          </View>
        </View>
      }
    </View>
  )
}
WorkOvertime.options = {
  addGlobalClass: true
}