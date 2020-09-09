import Taro, { useState, useEffect} from '@tarojs/taro'
import { View, Image, Text, Input } from '@tarojs/components'
import { AtDrawer } from 'taro-ui'
import { isIos } from '../../utils/v'
import './index.scss'

interface PROPS {
  display: boolean //是否跳转到页面授权
  handleSubmit: () => void,
  handleClose: () => void,
  data: any,
  handleEditProjectData: (type: string, e: any) => void,
}
export default function EditProject({ display, handleClose, data, handleEditProjectData, handleSubmit }: PROPS) {
  const [focus,setFocus]= useState<Boolean>(false)
  const [nameFocus, setNameFocus] = useState<Boolean>(false);
  const [ios, setIos] = useState<boolean>(false)
  useEffect(() => {
    // 判断是安卓还是苹果
    setIos(isIos())
  })
  const handleOnFocus = ()=>{
    if (!ios){
      setNameFocus(true)
    }
  }
  const handleOnBlur = ()=>{
    if (!ios) {
      setNameFocus(false)
    }
  }
  console.log(focus,'focus')
  return (
    <AtDrawer show={display} mask right width={'100%'}>
      <View className='back' onClick={handleClose}></View>
    <View>
      {/* {display && */}
        {/* <View className={!nameFocus||!focus?'createProject-complaintModal':'createProject-complaintModal-isFocus'}> */}
          {/* <View className='createProject-complaintModal-content'> */}
            {/* <View className='createProject-complaintModal-content-title'>
              <View>修改项目/班组名称</View>
              <View className='createProject-complaintModal-content-colse' onClick={handleClose}>x</View>
            </View> */}
            <View className='title'>修改项目/班组名称</View>
            <View className='publish-recruit-card'>
              <View className='publish-list-item border-item'>
                <Text className='pulish-list-title'>项目名称</Text>
                <Input
                  className='publish-list-input new-input'
                  placeholder='请输入项目名称'
                  value={data.group_name}
                  maxLength={10}
                  cursorSpacing={nameFocus ? 0 : 200}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  onInput={(e) => handleEditProjectData('group_name', e)}
                />
              </View>
            </View>
            <View className='publish-recruit-card'>
              <View className='publish-list-item border-item'>
            <Text className='pulish-list-title'>班组名称</Text>
                <Input
                  className='publish-list-input new-input'
                  placeholder='请输入班组名称'
                  value={data.team_name}
                  maxLength={20}
                  onFocus={() => { setFocus(true) }}
                  onBlur={() => { setFocus(false) }}
                  cursorSpacing={100}
                  onInput={(e) => handleEditProjectData('team_name', e)}
                />
              </View>
            </View>
            <View className='btnBox'>
              <View className='btn' onClick={handleSubmit}>确定修改</View>
              <View className='closeBtn' onClick={handleClose}>取消</View>
            </View>
            {/* <View className='createProject-complaintModal-content-tips'>项目名称:</View> */}
            {/* <View className='createProject-complaintModal-content-textareaBox'>
              <Input
                className='createProject-complaintModal-content-textarea'
                placeholder='请输入项目名称'
                value={data.group_name}
                maxLength={10}
                cursorSpacing={nameFocus?0:200}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                // onFocus={() => {setFocus(true)}}
                // onBlur={() => { setFocus(false)}}
                // cursorSpacing={200}
                onInput={(e) => handleEditProjectData('group_name', e)}
              />
            </View> */}
            {/* <View className='createProject-complaintModal-content-tips'>班组名称:</View> */}
            {/* <View className='createProject-complaintModal-content-textareaBox'>
              <Input
                className='createProject-complaintModal-content-textarea'
                placeholder='请输入班组名称'
                value={data.team_name}
                maxLength={20}
                onFocus={() => { setFocus(true) }}
                onBlur={() => { setFocus(false) }}
                cursorSpacing={100}
                onInput={(e) => handleEditProjectData('team_name', e)}
              />
            </View> */}
            {/* <View className='createProject-complaintModal-footer'>
              <View className='createProject-complaintModal-footer-btn' onClick={handleSubmit}>确定修改</View>
            </View> */}
          </View>
        {/* </View> */}
      {/* } */}
    {/* </ViewView> */}
    </AtDrawer>
  )
}
EditProject.options = {
  addGlobalClass: true
}