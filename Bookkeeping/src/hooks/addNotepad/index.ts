import Taro, { useState, useEffect, useRouter  } from '@tarojs/taro'
import { bkAddNotepadAction, bkUpdateNotePadAction } from '../../utils/request';
import { useDispatch, useSelector } from '@tarojs/redux'
import Msg from '../../utils/msg'
import { setNotepad  } from '../../actions/notepad'

export interface ModalType{
  note:string,
  image:[],
  time?:string,
  id?:string,
  week?:string,
}
interface ImageDataType {
  item: ImageItem[],
}
export interface ImageItem {
  url: string,
  httpurl: string
}
// 防止多点
let isHandleAdd = true
export default function userCode(InitParams) {
  const router: Taro.RouterInfo = useRouter();
  const { id } = router.params;
  const dispatch = useDispatch()
  // 获取存入的公用内容
  const useSelectorItem = useSelector<any, any>(state => state)
  // 内容
  const [model, setModel] = useState<ModalType>({
    note: '',
    image: [],
    time: '',
    id: '',
    week:'',
  })
  // 图片
  const [image, setImage] = useState<ImageDataType>({
    item: [],
  })
  useEffect(() => {
    if (InitParams.id){
      // console.log(useSelectorItem,'useSelectorItem')
      // if (useSelectorItem.notepad.data){
      //   let obj;
      //   useSelectorItem.notepad.data.map(v => {
      //     console.log(v)
      //     if(v.list.length>0 && v.list){
      //       v.list.map(val=>{
      //         console.log(val,'val')
      //         if (val.id === InitParams.id){
      //           obj = val;
      //         }
      //       })
      //     }
      //     // if (v.id === InitParams.id){
      //     //   obj = v;
      //     // }
      //   });
      //   console.log(obj,'obj')
      //   const time = obj.created_time_string.substring(0, 4) + '年' + obj.created_time_string.substring(5, 7) + '月' + obj.created_time_string.substring(8, 11) + '日';
      //   const date = new Date(obj.created_time * 1000).getDay();
      //   const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
      //   const week = weeks[date];
      //   const timeItem = new Date(obj.created_time * 1000);
      //   const newTime = timeItem.getFullYear() + '/' + addZero(timeItem.getMonth() + 1) + '/' + addZero(timeItem.getDate()) + '    ' + addZero(timeItem.getHours()) + ':' + addZero(timeItem.getMinutes());
      //   console.log(timeItem,'timeItem')
      //   setImage({item:obj.view_images})
      //   let params = {
      //     note: obj.note,
      //     time: newTime,
      //     image: obj.view_images,
      //     id: InitParams.id
      //   }
      //   setModel(params);
      //   Taro.setNavigationBarTitle({
      //     title: time + ' ' + week
      //   })
      // }
    }else{
      // 获取当前时间
      // let lastM = JSON.stringify(new Date(new Date().setMonth(new Date().getMonth() + 1))).slice(1, 11)
      // console.log(lastM,'xxx')
      // const date = new Date();
      // const seperator1 = "-";
      // const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

      // const year = date.getFullYear();
      // let month:any = date.getMonth() + 1;
      // const hour = date.getHours();
      // const minutes = date.getMinutes();
      // const seconds = date.getSeconds();
      // let strDate:any = date.getDate();

      // if (month >= 1 && month <= 9) {
      //   month = "0" + month;
      // }
      // if (strDate >= 0 && strDate <= 9) {
      //   strDate = "0" + strDate;
      // }
      // const currentdate = year + seperator1 + month + seperator1 + strDate + "  " + hour + ":" + minutes + ":" + seconds;
      const date = new Date().getDay();
      const time = new Date();
      const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
      const week = weeks[date];
      const newTime = time.getFullYear() + '/' + addZero(time.getMonth() + 1) + '/' + addZero(time.getDate()) + '    ' + addZero(time.getHours()) + ':' + addZero(time.getMinutes());
      const data = JSON.parse(JSON.stringify(model))
      setModel({ ...data, time: newTime, week})
    }
  },[])
  const addZero = (num) => {
    if (parseInt(num) < 10) {
      num = '0' + num;
    }
    return num;
  }
  // 提交
  const handleSubmit = ()=>{
    if (!isHandleAdd) return;
    const item = JSON.parse(JSON.stringify(model));
    console.log(item)
    let images: string[] = image.item.map(item => item.url)
      if (!images && !item.note){
        Msg('请填写内容或添加图片');
        return;
      }
    let params = {
      note:item.note,
      img: images,
      id: item.id
    }
    console.log(params,'params');
    if (InitParams.id){
      if (!params.img.length && !params.note){
        Msg('请填写内容或添加图片');
        return;
      }
      isHandleAdd = false
      if(!params.img.length && !params.note.trim()){
        isHandleAdd = true
        Taro.navigateBack({delta: 2})
        return
      }
      bkUpdateNotePadAction(params).then(res=>{
        if(res.code === 200){
          Msg('修改成功')
          dispatch(setNotepad({code:200,data:[],msg:'ok'}))
          Taro.navigateBack({delta: 2})
          setTimeout(() => {
            isHandleAdd = true;
          }, 500)
        }else{
          setTimeout(() => {
            isHandleAdd = true;
          }, 500)
          Msg(res.msg);
        }
        setTimeout(() => {
          isHandleAdd = true;
        }, 500)
      })
    }else{
      isHandleAdd = false
      if(!params.note.trim() && !params.img.length){
        isHandleAdd = true
        Taro.navigateBack()
        return
      }
      bkAddNotepadAction(params).then(res=>{
        if(res.code === 200 ){
          setTimeout(() => {
            isHandleAdd = true;
          }, 500)
          // Msg(res.msg);
          Msg('保存成功')
          dispatch(setNotepad({code:200,data:[],msg:'ok'}))
          Taro.navigateBack()
        }else{
          Msg(res.msg);
          setTimeout(() => {
            isHandleAdd = true;
          }, 500)
        }
        setTimeout(() => {
          isHandleAdd = true;
        }, 500)
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