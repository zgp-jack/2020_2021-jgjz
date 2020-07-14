import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface DataType {
  id: number,
  name: string,
  click: boolean
}
interface PROPS {
  display: boolean //是否跳转到页面授权
  handleClose:(boolean)=>void;
  data: DataType[],
  handleQuantities:(v:any)=>void
  // textarea:string,
  // handleTextarea:(e:any)=>void,
  // setComplaintModal:(e:boolean)=>void,
}
export default function Quantities({ display, handleClose, data, handleQuantities }: PROPS) {
  return (
    <View>
      {display &&
        <View className='quantities-complaintModal'>
          <View className='quantities-complaintModal-content'>
            <View className='quantities-complaintModal-content-title'>选择单位<Text onClick={handleClose} className='quantities-complaintModal-content-close'>x</Text></View>
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