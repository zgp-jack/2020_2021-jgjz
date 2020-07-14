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
    }else{
      // 获取当前时间
      // let lastM = JSON.stringify(new Date(new Date().setMonth(new Date().getMonth() + 1))).slice(1, 11)
      // console.log(lastM,'xxx')
      const date = new Date();
      const seperator1 = "-";

      const year = date.getFullYear();
      let month:any = date.getMonth() + 1;
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      let strDate:any = date.getDate();

      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      const currentdate = year + seperator1 + month + seperator1 + strDate + "  " + hour + ":" + minutes + ":" + seconds;
      const data = JSON.parse(JSON.stringify(model))
      setModel({ ...data, time: currentdate})
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