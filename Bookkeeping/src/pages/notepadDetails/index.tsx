import Taro, { Config, useContext, useDidShow, useState, useRouter } from '@tarojs/taro'
import { bkGetNotePadAction, bkDeleteNotePadAction } from '../../utils/request/index';
import Msg,{formatDate} from '../../utils/msg'
import { View, Image } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import { context  } from '../notepad';
import { UserInfo } from '../../config/store';
import './index.scss'

export default function NotepadDetails() {
  const useSelectorItem = useSelector<any, any>(state => state)
  // 路由参数
  const router: Taro.RouterInfo = useRouter()
  let { id } = router.params;
  // 父级的值
  const { dataArr } = useContext(context);
  // 系统繁忙
  const [busy, setBusy] =useState<boolean>(false)
  // 内容
  const [data, setData] = useState<any>({
    view_images:[]
  })
  useDidShow(()=>{
    getnoteData(id);
  })
  const getnoteData = (id) => {
    let userInfo = Taro.getStorageSync(UserInfo);
    // const params = {
    //   mid: userInfo.userId,
    //   token: userInfo.token,
    //   time: userInfo.tokenTime,
    //   uuid: userInfo.uuid,
    //   id
    // }
    bkGetNotePadAction({id}).then(res => {
      if (res.code === 200) {
        setBusy(false)
        if(res.data.length>0){
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
      console.log(dataArr)
      for(let i =0;i<dataArr.length;i++){
        if (dataArr[i].list && dataArr[i].list.length>0){
          for (let j = 0; j < dataArr[i].list.length;j++){
            if (dataArr[i].list[j].id === id) {
              setData(dataArr[i].list[j]);
              const date = new Date(dataArr[i].list[j].created_time * 1000).getDay();
              const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
              const week = weeks[date];
              const timeItem = new Date(dataArr[i].list[j].created_time*1000);
              const newTime = timeItem.getFullYear() + '/' + addZero(timeItem.getMonth() + 1) + '/' + addZero(timeItem.getDate()) + ' ' + addZero(timeItem.getHours()) + ':'+addZero(timeItem.getMinutes());
              dataArr[i].list[j].created_time_string = dataArr[i].list[j].created_time_string.replace('-', '/')
              const time = dataArr[i].list[j].created_time_string.substring(0, 4) + '年'+ dataArr[i].list[j].created_time_string.substring(5, 7) + '月' + dataArr[i].list[j].created_time_string.substring(8, 11) + '日';
              dataArr[i].list[j].newTime = newTime;
              Taro.setNavigationBarTitle({
                title: time + '   ' + week,
              })
            }
          }
        }
        
      }
    }
  }
  const addZero = (num) => {
    if (parseInt(num) < 10) {
      num = '0' + num;
    }
    return num;
  }
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
    Taro.showModal({
      // title: "提示",
      content: '删除后,当前信息将无法恢复,确定删除？',
      showCancel: true,
      confirmText:'删除',
      confirmColor:'#0099FF',
      cancelColor:'#797979',
      success: (res) => {
        if (res.confirm == true) {
          bkDeleteNotePadAction(params).then(res => {
            if (res.code === 200) {
              Msg('删除成功')
              if(useSelectorItem.notepad.data.length>0){
                useSelectorItem.notepad.data.forEach((element,dex) => {
                  element.list.forEach((item,index) => {
                    if(item.id == params.id){
                      if(element.list.length == 1){
                        useSelectorItem.notepad.data.splice(dex,1)
                      }else{
                        element.list.splice(index,1);
                      }
                    }
                  });
                });
              }
              Taro.navigateBack();
            } else {
              Msg(res.msg)
            }
          })
        }
      }
    })
  }
  const handleImage = (e)=>{
    Taro.previewImage({
      current: e.httpurl,
      urls: [e.httpurl]
    })
  }
  return (
    <View>
      {busy && <View className='busyBox'>
        <View>系统繁忙，刷新试试</View>
        <View className='refresh' onClick={()=>getnoteData(id)}>刷新</View>
        </View>}
      {!busy && <View className='notepadDetails'>
        <View className='time'>{data.created_time && formatDate(Number(data.created_time*1000),'yyyy/MM/dd hh:mm')}</View>
        <View className='content'>
          {data.note}
        </View>
        <View className='imageList'>
          {data.view_images && data.view_images.length>0&&data.view_images.map(v=>(
            <View className='image'>
              <Image className='image-image' src={v.httpurl} onClick={()=>{handleImage(v)}}/>
            </View>
          ))}
        </View>
        <View className='footer'>
          <View className='footer-box'>
          <View className='footer-del' onClick={handleDel}>删除</View>
            <View className='footer-btn' onClick={() => userRouteJump(`/pages/addNotepad/index?id=${data.id}`)}>修改</View>
          </View>
        </View>
      </View>}
    </View>
  )
}
// NotepadDetails.config = {
//   navigationBarTitleText: '详情',
// } as Config