import Taro, { useState, useEffect, useRouter  } from '@tarojs/taro'
import { bkAddNotepadAction, bkUpdateNotePadAction } from '../../utils/request';
import { useSelector } from '@tarojs/redux'
import Msg from '../../utils/msg'

export interface ModalType{
  note:string,
  image:[],
  time?:string,
  id?:string,
}
interface ImageDataType {
  item: ImageItem[],
}
export interface ImageItem {
  url: string,
  httpurl: string
}

export default function userCode(InitParams) {
  const router: Taro.RouterInfo = useRouter();
  const { id } = router.params;
  // 获取存入的公用内容
  const useSelectorItem = useSelector<any, any>(state => state)
  // 内容
  const [model, setModel] = useState<ModalType>({
    note: '',
    image: [],
    time: '',
    id: '',
  })
  // 图片
  const [image, setImage] = useState<ImageDataType>({
    item: [],
  })
  useEffect(() => {
    if (InitParams.id){
      if (useSelectorItem.notepad.data){
        let obj;
        useSelectorItem.notepad.data.map(v => {
          if (v.id === InitParams.id){
            obj = v;
          }
        });
        let params ={
          note: obj.note,
          time: obj.creatTime,
          image: obj.view_images,
          id: InitParams.id
        }
        setImage({item:obj.view_images})
        setModel(params);
      }
    }
  },[])
  // 提交
  const handleSubmit = ()=>{
    const item = JSON.parse(JSON.stringify(model));
    console.log(item)
    let images: string[] = image.item.map(item => item.url)
    let params = {
      note:item.note,
      img: images,
      id: item.id
    }
    console.log(params,'params');
    if (InitParams.id){
      bkUpdateNotePadAction(params).then(res=>{
        console.log(res);
        Taro.navigateTo({ url:'/pages/notepad/index'})
      })
    }else{
      bkAddNotepadAction(params).then(res=>{
        if(res.code === 200 ){
          Msg(res.msg);
          Taro.navigateBack({
            delta: 3
          })
        }else{
          Msg(res.msg);
        }
      })
    }
  }
  return {
    model,
    setModel,
    handleSubmit,
    image, 
    setImage
  }
}