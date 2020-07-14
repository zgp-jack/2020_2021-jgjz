import Taro, { Config, useEffect, useState, useRouter, useContext } from '@tarojs/taro'
import { View, Textarea,Image } from '@tarojs/components'
import ImageView from '../../components/imageview';
import UploadImgAction from '../../utils/upload'
import userCode, { ModalType} from '../../hooks/addNotepad';
import Msg from '../../utils/msg'
import { IMGCDNURL } from '../../config'
import './index.scss'

interface InitRecruitView{
  id:string
}

export default function AddNotepad() {
  // 传递过来的值
  const router: Taro.RouterInfo = useRouter();
  const { id } = router.params;
  const InitParams: InitRecruitView = { id}
  const { model, setModel, handleSubmit, image, setImage } = userCode(InitParams);
  // 多选框
  const handleContent = (e)=>{
    let modelInfo: ModalType = JSON.parse(JSON.stringify(model))
    console.log(modelInfo,'modelInfo')
    modelInfo.note = e.detail.value;
    setModel(modelInfo)
  }
  // 图片
  const userUploadImg = (i: number = -1) => {
    UploadImgAction().then(res => {
      let imageItem = {
        url: res.url,
        httpurl: res.httpurl
      }
      if (i === -1) {
        setImage({ ...image, item: [...image.item, imageItem] })
      } else {
        image.item[i] = imageItem
        setImage({ ...image })
      }
    })
  }
  // 用户删除图片
  const userDelImg = (i: number) => {
    if (!image.item) return
    let bakModel = JSON.parse(JSON.stringify(image.item))
    bakModel.splice(i, 1)
    setImage({ item: bakModel })
  }
  const handelAdd = ()=>{
    if (image.item.length<4){
      userUploadImg && userUploadImg(-1)
    }else{
      Msg('最多上传四张照片');
      return;
    }
  }
  return (
    <View className='addnotepad'>
      <View className='time'>{model && model.time}</View>
      <View className='notepad-textarea'>
        <Textarea 
          id='textarea'
          focus
          autoFocus
          auto-focus
          cursor={0}
          onInput={(e) => handleContent(e)}
          className={id ? 'editTextarea' : 'textarea'} 
          value={model && model.note } 
          placeholder='在这里记事' 
          placeholder-style='color:#BEBEBE'/>
      </View>
      <View>
        <View className='image'><ImageView images={image.item} max={4} notepad userUploadImg={userUploadImg} userDelImg={userDelImg} /></View>
      </View>
      <View className='footer'>
        <View className='footer-box'>
          <View className='footer-box-left' onClick={handelAdd}><View className='footer-box-left-img'><Image className='footer-box-left-img-img' src={`${IMGCDNURL}image.png`}/></View>添加图片</View>
          <View className='footer-box-right' onClick={handleSubmit}>保存</View>
        </View>
      </View>
    </View>
  )
}
AddNotepad.config = {
  navigationBarTitleText: '记事本',
} as Config