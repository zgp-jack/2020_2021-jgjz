import Taro from '@tarojs/taro'
import { View, Image, Text,Input } from '@tarojs/components'
import './index.scss'

interface PROPS {
  display: boolean //是否跳转到页面授权
  teamName:string,
  // handleTextarea:(e:any)=>void,
  // setComplaintModal:(e:boolean)=>void,
  handleSubmit:()=>void,
  handleInput: (type: string, e: any) => void,
}
export default function ProjectModal({ display, teamName, handleSubmit, handleInput}:PROPS) {
  return(
    <View>
      {display &&
        <View className='tabber-complaintModal'>
          <View className='tabber-complaintModal-content'>
            <View className='tabber-complaintModal-content-title'>填写班组</View>
            <View className='tabber-complaintModal-content-tips'>班组名称:</View>
            <View className='tabber-complaintModal-content-textareaBox'>
            <Input
                className='tabber-complaintModal-content-textarea'
                placeholder='请输入班组名称'
                value={teamName}
                // maxlength={100}
                onInput={(e) => handleInput('teamName',e)}
              />
            </View>
            <View className='tabber-complaintModal-content-blued'>注：填写您当前项目下需要记工的班组名称</View>
            <View className='tabber-complaintModal-footer'>
            <View className='tabber-complaintModal-footer-btn' onClick={handleSubmit}>确定创建</View>
            </View>
          </View>
        </View>
      }
    </View>
  )
}
ProjectModal.options = {
  addGlobalClass: true
}