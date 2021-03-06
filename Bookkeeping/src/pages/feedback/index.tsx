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
// 防止多点
let isHandleAdd = true;
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
    // 最多四张照片
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
  }
  // 多选框
  const handleContent = (e)=>{
    setNote(e.detail.value)
  }
  const blurhandleContent = (e) => {
    setNote(e.detail.value)
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
    // console.log(isHandleAdd,'isHandleAdd')
    if (!isHandleAdd) return;
    if (radio ==0 ){
      Msg('请选择评价')
      return
    }
    if (!note ){
      Msg('您还没有写下意见')
      return
    }
    isHandleAdd = false
    let images: string[] = image.item.map(item => item.url);
    const params ={
      type: radio,
      note,
      img: images,
    }
    bkAddFeedbackAction(params).then(res=>{
      console.log(res);
      if(res.code === 200){
        Taro.showModal({
          content: '提交成功，记工记账将因您的意见而变得更好！',
          showCancel: false,
          success: (res) => {
            if (res.confirm == true) {
              Taro.navigateBack({
                delta: 1
              })
              isHandleAdd = true;
            }
          }
        })
      }else{
        setTimeout(() => {
          isHandleAdd = true;
        }, 500)
        Msg('保存失败')
      }
      setTimeout(() => {
        isHandleAdd = true;
      }, 500)
    })
  }
  // 复制
  const handleCopy = ()=>{
    Taro.setClipboardData({
      data: PHONE,
      success: () => {
        Taro.hideToast()
        // Msg('微信号复制成功')
        Taro.showModal({
          title: '恭喜您',
          showCancel: false,
          content: `微信号：${PHONE}已复制到粘贴板，去微信-添加朋友-搜索框粘贴`
        })
        // ShowActionModal({
        //   // title: '恭喜您',
        //   msg: '微信号复制成功'
        // })
      }
    })
  }
  return(
    <View className='feedback'>
      <View className='heard'>
        <View>
        <View className='heard-title'>为了提高沟通效率，建议您添加</View>
          <View>平台微信:<Text className='blued' onClick={handleCopy}>{PHONE}</Text></View>
        </View>
        <View className='copy' onClick={handleCopy}>点击复制</View>
      </View>
      {/* 评价 */}
      <View className='evaluate'>
        <View>您觉得记工记账用起来怎么样？给个评价吧~</View>
      </View>
        <View className='evaluateRadio'>
          <RadioGroup className='RadioGroup'>
          {evaluate.map(v=>(
            <Radio key={v.id} className='evaluateRadioList' onClick={() => setRadio(v.id)} color='#0099FF'>{ v.title }</Radio>
          ))}
          </RadioGroup>
        </View>
      {/* 建议 */}
      <View className='opinion'>
        <Textarea className='opinionTextarea' maxlength={400} onInput={(e) => handleContent(e)} onBlur={(e) => blurhandleContent(e)} placeholder='请留下您的意见或建议' placeholder-style='color:rgba(167, 167, 167, 1)'/>
      </View>
      <View className='white'>
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