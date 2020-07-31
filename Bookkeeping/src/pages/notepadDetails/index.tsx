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
        if (dataArr[i].list && dataArr[i].list.length>0){
          for (let j = 0; j < dataArr[i].list.length;j++){
            if (dataArr[i].list[j].id === id) {
              setData(dataArr[i].list[j]);
              const date = new Date(dataArr[i].list[j].created_time * 1000).getDay();
              const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
              const week = weeks[date];
              dataArr[i].list[j].created_time_string = dataArr[i].list[j].created_time_string.replace('-', '/')
              const time = dataArr[i].list[j].created_time_string.substring(0, 4) + '年'+ dataArr[i].list[j].created_time_string.substring(5, 7) + '月' + dataArr[i].list[j].created_time_string.substring(8, 11) + '日';
              Taro.setNavigationBarTitle({
                title: time + '   ' + week,
              })
            }
          }
        }
        // if(dataArr[i].id === id){
        //   setData(dataArr[i])
        //   console.log(dataArr,'xx')
        //   console.log(dataArr[i].created_time,'xxxx')
        //   const date = new Date(dataArr[i].created_time*1000).getDay();
        //   // const time = new Date(dataArr[i].created_time);
        //   // const newTime = time.getFullYear() + '-' + addZero(time.getMonth() + 1) + '-' + addZero(time.getDate()) + '    ' + addZero(time.getHours()) + ':' + addZero(time.getMinutes());
        //   const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        //   const week = weeks[date];
        //   console.log(date,'datedatedate')
        //   console.log(week,'xxx')
        //   Taro.setNavigationBarTitle({
        //     title: dataArr[i].created_time_string + '   ' + week,
        //   })
        // }
      }
    }
  })
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
      confirmText:'确认删除',
      confirmColor:'#0099FF',
      success: (res) => {
        if (res.confirm == true) {
          bkDeleteNotePadAction(params).then(res => {
            if (res.code === 200) {
              Msg('删除成功')
              setTimeout(()=>{
                Taro.navigateBack();
              },800)
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
    <View className='notepadDetails'>
      <View className='time'>{data.newTime}</View>
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
    </View>
  )
}
// NotepadDetails.config = {
//   navigationBarTitleText: '详情',
// } as Config