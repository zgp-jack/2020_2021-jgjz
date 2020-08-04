import Taro from '@tarojs/taro'
import { View, Image, Text, Input } from '@tarojs/components'
import { IMGCDNURL } from '../../config'
import './index.scss'

interface PROPS {
  display: boolean //是否跳转到页面授权
  handleSubmit: () => void,
  handleClose:() =>void,
  val:string,
  handleInput:(type:string,e:any)=>void,
}
export default function CreateProject({ display, handleClose, val, handleInput,handleSubmit }: PROPS) {
  return (
    <View>
      {display &&
        <View className='createProject-complaintModal'>
          <View className='createProject-complaintModal-content'>
            <View className='createProject-complaintModal-content-title'>
              <View>创建项目</View>
            <View className='createProject-complaintModal-content-colse' onClick={handleClose}>
              <Image src={`${IMGCDNURL}closeIcons.png`} className='closeIcons' />
            </View>
            </View>
            <View className='createProject-complaintModal-content-tips'>项目名称:</View>
            <View className='createProject-complaintModal-content-textareaBox'>
              <Input
                className='createProject-complaintModal-content-textarea'
                placeholder='请输入项目名称'
                value={val}
                maxLength={10}
                onInput={(e) => handleInput('groupName',e)}
              />
            </View>
          <View className='createProject-complaintModal-content-blued'>注：填写您要记工的工程项目名称</View>
            <View className='createProject-complaintModal-footer'>
            <View className='createProject-complaintModal-footer-btn' onClick={handleSubmit}>下一步</View>
            </View>
          </View>
        </View>
      }
    </View>
  )
}
CreateProject.options = {
  addGlobalClass: true
}