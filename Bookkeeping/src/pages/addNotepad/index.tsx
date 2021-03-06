import Taro, { Config, useEffect, useState, useRouter, useContext,useDidShow } from '@tarojs/taro'
import { View, Textarea,Image } from '@tarojs/components'
import ImageView from '../../components/imageview';
import UploadImgAction from '../../utils/upload'
import userCode, { ModalType} from '../../hooks/addNotepad';
import Msg, { formatDate } from '../../utils/msg'
import { bkNewNotePadAction } from '../../utils/request/index';
import { UserInfo } from '../../config/store';

import { IMGCDNURL } from '../../config'
import './index.scss'

interface InitRecruitView{
  id:string
}

export default function AddNotepad() {

  // 系统繁忙
  const [busy, setBusy] =useState<boolean>(false)

  // 传递过来的值
  const router: Taro.RouterInfo = useRouter();
  const { id } = router.params;
  const InitParams: InitRecruitView = { id}
  const { model, setModel, handleSubmit, image, setImage } = userCode(InitParams);
  useEffect(()=>{
    if(id){
        getnoteData(id);
    }
  },[])
  const getnoteData = (id) => {
    // setModel({
    //   note: '',
    //   image: [],
    //   time: '',
    //   id: '',
    //   week:'',
    // })
    // let userInfo = Taro.getStorageSync(UserInfo);
    // const params = {
    //   mid: userInfo.userId,
    //   token: userInfo.token,
    //   time: userInfo.tokenTime,
    //   uuid: userInfo.uuid,
    //   id
    // }
    bkNewNotePadAction({id}).then(res => {
      if (res.code === 200) {
        setBusy(false)
        if(res.data){
          datachange(res.data)
        }
      }
    })
    .catch((e)=>{
      setBusy(true)
    })
  }

  const datachange = (dataArr) => {
    if(dataArr){
      model.time = formatDate(dataArr.created_time * 1000,'yyyy/MM/dd hh:mm');
      model.note = dataArr.note;
      model.id = id;
      setModel({
        ...model
      })
      dataArr.view_images && dataArr.view_images.length && setImage({ ...image, item: [...dataArr.view_images] })
      let title;
      if (dataArr.created_time){
        title = formatDate(dataArr.created_time * 1000, 'yyyy年MM月dd日 星期w');
      }
      Taro.setNavigationBarTitle({
        title: title
      })
    }
  }

  // 多选框
  const handleContent = (e)=>{
    let modelInfo: ModalType = JSON.parse(JSON.stringify(model))
    modelInfo.note = e.detail.value;
    setModel(modelInfo)
  }
  const blurhandleContent = (e) => {
    let modelInfo: ModalType = JSON.parse(JSON.stringify(model))
    modelInfo.note = e.detail.value;
    setModel({...modelInfo})
  }
  // 图片
  const userUploadImg = (i: number = -1) => {
    let num = 4 - image.item.length;
    UploadImgAction(num).then(res => {
      if (Array.isArray(res)) {
        let imageItem: any[] = [];
        for (let i = 0; i < res.length; i++) {
          let obj = {
            url: res[i].url,
            httpurl: res[i].httpurl
          }
          imageItem.push(obj);
        }
        if (image.item.length == 0) {
          setImage({ item: [...image.item, ...imageItem] })
        } else {
          setImage({ item: [...image.item, ...imageItem] })
        }
      } else {
        let imageItem = {
          url: res.url,
          httpurl: res.httpurl
        }
        setImage({ item: [...image.item, imageItem] })
      }
    })
    // UploadImgAction().then(res => {
    //   let imageItem = {
    //     url: res.url,
    //     httpurl: res.httpurl
    //   }
    //   if (i === -1) {
    //     setImage({ ...image, item: [...image.item, imageItem] })
    //   } else {
    //     image.item[i] = imageItem
    //     setImage({ ...image })
    //   }
    // })
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
    <View>

      {busy?
        <View className='busyBox'>
        <View>系统繁忙，刷新试试</View>
        <View className='refresh' onClick={()=>getnoteData(id)}>刷新</View>
      </View>
      :
      <View className='addnotepad'>
        <View className='time'>{model && model.time}</View>
        <View className='notepad-textarea'>
          <Textarea 
            id='textarea'
            focus
            autoFocus
            auto-focus
            cursor={model.note.length||0}
            maxlength={400}
            onInput={(e) => handleContent(e)}
            onBlur={(e) => blurhandleContent(e)}
            className={id ? 'editTextarea' : 'textarea'} 
            value={model && model.note } 
            placeholder='在这里记事' 
            placeholder-style='color:#BEBEBE'/>
        </View>
        <View>
          <View className='image'><ImageView images={image.item} max={4} userUploadImg={userUploadImg} userDelImg={userDelImg} /></View>
        </View>
        <View className='footerbtn'><View className='footerbtn-btn' onClick={handleSubmit}>保存</View></View>
        {/* <View className='footer'>
          <View className='footer-box'>
            <View className='footer-box-left' onClick={handelAdd}><View className='footer-box-left-img'><Image className='footer-box-left-img-img' src={`${IMGCDNURL}image.png`}/></View>添加图片</View>
            <View className='footer-box-right' onClick={handleSubmit}>保存</View>
          </View>
        </View> */}
      </View>
        }
    </View>
  )
}
AddNotepad.config = {
  navigationBarTitleText: '记事本',
} as Config