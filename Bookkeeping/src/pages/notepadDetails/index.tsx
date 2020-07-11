import Taro, { Config, useContext, useEffect, useState, useRouter } from '@tarojs/taro'
import { bkDeleteNotePadAction } from '../../utils/request/index'
import Msg from '../../utils/msg'
import { View, Image } from '@tarojs/components'
import { context  } from '../notepad';
import './index.scss'

export default function NotepadDetails() {
  // 路由参数
  const router: Taro.RouterInfo = useRouter()
  let { id } = router.params;
  // 父级的值
  const { dataArr } = useContext(context);
  // 内容
  const [data, setData] = useState<any>()
  useEffect(()=>{
    if(dataArr){
      console.log(dataArr)
      for(let i =0;i<dataArr.length;i++){
        if(dataArr[i].id === id){
          setData(dataArr[i])
        }
      }
    }
  })
  // 跳转
  const userRouteJump = (url: string) => {
    Taro.navigateTo({
      url: url
    })
  }
  // 删除
  const handleDel = ()=>{
    let params = {
      id,
    }
    bkDeleteNotePadAction(params).then(res=>{
      if(res.code === 200){
        Taro.navigateBack()
      }else{
        Msg(res.msg)
      }
    })
  }
  return (
    <View className='notepadDetails'>
      <View className='time'>{data.creatTime}</View>
      <View className='content'>
        {data.note}
      </View>
      <View className='imageList'>
        {data.view_images.map(v=>(
          <View className='image'>
            <Image className='image-image' src={v.httpurl}/>
          </View>
        ))}
      </View>
      <View className='footer'>
        <View className='footer-box'>
        <View className='footer-del' onClick={handleDel}>删除</View>
          <View className='footer-btn' onClick={() => userRouteJump(`/pages/addNotepad/index?id=${data.id}`)}>修改</View>
        </View>
      </View>
    </View>
  )
}
NotepadDetails.config = {
  navigationBarTitleText: '详情',
} as Config