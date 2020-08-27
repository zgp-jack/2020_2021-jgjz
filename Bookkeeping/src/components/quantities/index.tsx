import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { IMGCDNURL } from '../../config'
import './index.scss'

interface DataType {
  id: number,
  name: string,
  click: boolean
}
interface PROPS {
  display: boolean //是否跳转到页面授权
  maskHandleClose?:()=>void,
  handleClose:(boolean)=>void;
  data: DataType[],
  handleQuantities:(v:any)=>void
  // textarea:string,
  // handleTextarea:(e:any)=>void,
  // setComplaintModal:(e:boolean)=>void,
}
export default function Quantities({ display, maskHandleClose, handleClose, data, handleQuantities }: PROPS) {
  return (
    <View>
      {display &&
        <View className='quantities-complaintModal' onClick={maskHandleClose}>
          <View className='quantities-complaintModal-content' onClick={e=> e.stopPropagation()}>
            <View className='quantities-complaintModal-content-title'>选择单位
            {/* <Text onClick={handleClose} className='quantities-complaintModal-content-close'> */}
            <View className='closeBox' onClick={handleClose}>
            <Image  src={`${IMGCDNURL}closeIcons.png`} className='closeIcons' />
            </View>
              {/* </Text> */}
            </View>
            <View className='quantities-complaintModal-content-box'>
              {data.map(v=>(
                <View 
                  className={v.click ? 'quantities-complaintModal-content-box-list-click' :'quantities-complaintModal-content-box-list'} 
                  key={v.id}
                  onClick={()=>handleQuantities(v)}
                  >{v.name}</View>
              ))}
            </View>
          </View>
        </View>
      }
    </View>
  )
}
Quantities.options = {
  addGlobalClass: true
}