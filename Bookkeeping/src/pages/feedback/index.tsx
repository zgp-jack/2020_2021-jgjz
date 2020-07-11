import Taro, { Config, useState } from '@tarojs/taro'
import { View, Text, Radio, Textarea, RadioGroup } from '@tarojs/components'
import ImageView  from '../../components/imageview';
import  UploadImgAction  from '../../utils/upload'
import { bkAddFeedbackAction } from '../../utils/request';
import Msg, { ShowActionModal} from '../../utils/msg'
import { PHONE } from '../../config'
import './index.scss'

interface ImageDataType {
  item: ImageItem[],
}
export interface ImageItem {
  url: string,
  httpurl: string
}
export default function Feedback() {
  // 评价
  const evaluate = [
    {id:1,title:'差评'},
    { id: 2, title: '不太好' },
    { id: 3, title: '一般' },
    { id: 4, title: '挺好的' },
    { id: 4, title: '好评' },
  ]
  // 图片
  const [image, setImage] = useState<ImageDataType>({
    item:[],
  })
  // 评价
  const [radio, setRadio] = useState<number>(0)
  const [note, setNote]= useState<string>('');
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
    setImage({item:bakModel})
  }
  //提交
  const handlebkAddFeedbackAction = ()=>{
    if (radio === 0 ){
      Msg('请选择评价')
      return
    }
    let images: string[] = image.item.map(item => item.url);
    const params ={
      type: radio,
      note,
      img: images,
    }
    bkAddFeedbackAction(params).then(res=>{
      console.log(res);
      if(res.code === 200){
        Msg('保存成功');
        Taro.navigateBack({
          delta: 1
        })
      }else{
        Msg('保存失败')
      }
    })
  }
  // 复制
  const handleCopy = ()=>{
    Taro.setClipboardData({
      data: PHONE,
      success: () => {
        Taro.hideToast()
        ShowActionModal({
          title: '恭喜您',
          msg: '已复制到粘贴板，赶快去添加吧！'
        })
      }
    })
  }
  return(
    <View className='feedback'>
      <View className='heard'>
        <View>
        <View className='heard-title'>为了提高沟通效率，建议您添加</View>
          <View>平台微信:<Text className='blued'>{PHONE}</Text></View>
        </View>
        <View className='copy' onClick={handleCopy}>点击复制</View>
      </View>
      {/* 评价 */}
      <View className='evaluate'>
        <View>您觉得记工记账用起来怎么样？给个评价吧~</View>
        <View className='evaluateRadio'>
          <RadioGroup className='RadioGroup'>
          {evaluate.map(v=>(
            <Radio key={v.id} className='evaluateRadioList' onClick={() => setRadio(v.id)} color='#0099FF'>{ v.title }</Radio>
          ))}
          </RadioGroup>
        </View>
      </View>
      {/* 建议 */}
      <View className='opinion'>
        <Textarea className='opinionTextarea' onInput={(e) => setNote(e.detail.value)} placeholder='请留下您的意见或建议' placeholder-style='color:rgba(167, 167, 167, 1)'/>
        <View className='image'><ImageView images={image.item} max={4} userUploadImg={userUploadImg} userDelImg={userDelImg} /></View>
        <View className='clear'></View>
        {image.item.length === 0 && <View className='addImage'>添加图片</View>}
        <View className='tips'>注：如果反馈意见被采纳，平台将赠送您2~10个鱼泡网积分</View>
      </View>
      <View className='submitBtnBox'>
        <View className='submitBtn' onClick={handlebkAddFeedbackAction}>提交</View>
      </View>
    </View>
  )
}
Feedback.config = {
  navigationBarTitleText: '意见反馈',
} as Config