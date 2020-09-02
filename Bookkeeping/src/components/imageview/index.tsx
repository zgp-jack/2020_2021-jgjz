import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'

export interface RecruitImageModel {
  url: string,
  httpurl: string
}
interface PROPS {
  images: RecruitImageModel[],
  max: number,
  userUploadImg?: (i: number) => void,
  userDelImg?: (i: number) => void,
  notepad?:boolean,
}
export default function ImageView({ images, userUploadImg, max, userDelImg, notepad }: PROPS) {
  let bool: boolean = userDelImg ? true : false
  return (
    <View className='uploads-imgs-lists clearfix'>
      {/* 图片列表展示 */}
      {images && images.map((item, index) => (
        <View className='uploads-img-item' key={index + 'a'} onClick={() => userUploadImg && userUploadImg(index)}>
          <View className='uploads-img-imgbox'>
            <Image className='uploads-item-img' src={item.httpurl} />
          </View>
            {bool &&
              <View
                className='uploads-img-del'
                onClick={(e) => { e.stopPropagation(); userDelImg && userDelImg(index) }}>
                {/* <Text className='at-icon-trash'></Text> */}
              </View>}
        </View>
      ))}
      {/* 图片新增按钮展示 */}
      {max > images.length
        && !notepad &&
        <View className='uploads-img-item'>
          <View
            className='uploads-img-imgbox uploads-img-imgbox-active'
            onClick={() => userUploadImg && userUploadImg(-1)}
          ></View>
        </View>
      }
    </View>
  )
}

ImageView.options = {
  addGlobalClass: true
}