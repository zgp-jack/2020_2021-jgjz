import Taro from '@tarojs/taro'
import { View, Image, Text, Input } from '@tarojs/components'
import './index.scss'

interface PROPS {
  display: boolean //是否跳转到页面授权
  handleSubmit: () => void,
  handleClose: () => void,
  data: any,
  handleEditProjectData: (type: string, e: any) => void,
}
export default function EditProject({ display, handleClose, data, handleEditProjectData, handleSubmit }: PROPS) {
  return (
    <View>
      {display &&
        <View className='createProject-complaintModal'>
          <View className='createProject-complaintModal-content'>
            <View className='createProject-complaintModal-content-title'>
              <View>修改项目/班组名称</View>
              <View className='createProject-complaintModal-content-colse' onClick={handleClose}>x</View>
            </View>
            <View className='createProject-complaintModal-content-tips'>项目名称:</View>
            <View className='createProject-complaintModal-content-textareaBox'>
              <Input
                className='createProject-complaintModal-content-textarea'
                placeholder='请输入项目名称'
                value={data.group_name}
                onInput={(e) => handleEditProjectData('group_name', e)}
              />
            </View>
            <View className='createProject-complaintModal-content-tips'>班组名称:</View>
            <View className='createProject-complaintModal-content-textareaBox'>
              <Input
                className='createProject-complaintModal-content-textarea'
                placeholder='请输入班组名称'
                value={data.team_name}
                onInput={(e) => handleEditProjectData('team_name', e)}
              />
            </View>
            <View className='createProject-complaintModal-footer'>
              <View className='createProject-complaintModal-footer-btn' onClick={handleSubmit}>确定修改</View>
            </View>
          </View>
        </View>
      }
    </View>
  )
}
EditProject.options = {
  addGlobalClass: true
}