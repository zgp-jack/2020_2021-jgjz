import Taro, { Config, useEffect, useState, useRouter, useContext } from '@tarojs/taro'
import { View, Text, Picker, Checkbox, Image } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import { context } from '../flowingWater';
import { bkDeleteBusinessAction } from '../../utils/request/index'
import Msg from '../../utils/msg';
import './index.scss'


export default function FlowingWaterDetails() {
  const router: Taro.RouterInfo = useRouter();
  const { time, id, week } = router.params;
  // 父级的值
  const { dataArr } = useContext(context);
  const [obj,setObj]=useState<any>({
    view_images:[]
  })
  // 获取存入的公用内容
  useEffect(()=>{
    let data;
    if (dataArr.item){
      dataArr.item.map(v=>{
        if(v.time === time){
          v.arr.map(val=>{
            if(val.id === id){
              data = val;
            }
          })
        }
      })
    }
    console.log(data,'datadata')
    let title;
    if (data.business_type == '1'){
      title ='点工'
    } else if (data.business_type == '2'){
      if(data.type === '1'){
        title = '包工按天'
      } else if (data.type == '2') {
        title = '包工按量'
      }
    }else if (data.business_type == '3') {
      title = '借支'
    }
    Taro.setNavigationBarTitle({
      title,
    })
    let typeDes;
    if(data.type === '3'){
      typeDes = '工资'
    } else if (data.type === '4') {
      typeDes = '生活费'
    } else if (data.type === '5') {
      typeDes = '补贴'
    } else if (data.type === '6') {
      typeDes = '奖励'
    } else if (data.type === '7') {
      typeDes = '其他'
    }
    data.typeDes = typeDes;
    // 加班时长
    let addTime = 0;
    if (parseInt(data.worker_overtime) && parseInt(data.worker_overtime)>0){
      if (parseInt(data.overtime) && parseInt(data.overtime)>0){
        addTime = (parseInt(data.overtime) / parseInt(data.worker_overtime))
      }
    }
    data.addTime = addTime.toFixed(2);
    console.log(data);
    setObj(data)
    // if (useSelectorItem.flowingWater.data){
    //   let obj;
    //   useSelectorItem.notepad.data.map(v => {
    //     if (v.id === id) {
    //       obj = v;
    //     }
    //   });
    //   setData(obj)
    // }
  })
  // 0 点工 1 包工按天 2 包工按量 3借支
  // 删除
  const handleDel = () => {
    let params = {
      ids: [obj.id]
    }
    Taro.showModal({
      title: "提示",
      content:'数据一经删除将无法恢复。请谨慎操作哦！',
      showCancel: true,
      success: (res) => {
        if(res.confirm == true){
          bkDeleteBusinessAction(params).then(res => {
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
  return(
    <View className='flowingWaterDetails'>
      <View className='top'>
        {obj.business_type &&obj.business_type == '1' && <View className='top-name'>点工工钱</View>}
        {obj.business_type && obj.business_type == '2' && obj.type === '1'&& <View className='top-name'>包工(按天记)工钱</View>}
        {obj.business_type && obj.business_type == '2' && obj.type === '2' && <View className='top-name'>包工(按量记)工钱</View>}
        {obj.business_type &&obj.business_type == '3' && <View className='top-name'>本次借支</View>}
        <View className='top-money'>¥{obj.money}</View>
        <View className='top-time'>{time}<Text>{week}</Text></View>
      </View>
      <View className='list-content'>
        <AtList className='list'>
          <View className='list-itme'><Text className='list-itme-title'>{obj.identity == 1 ? '工人' : '班组长'}</Text>:<Text className='list-itme-content'> {obj.identity == 1 ? obj.workername : obj.leader_name||''}</Text></View>
          <View className='list-itme'><Text className='list-itme-title'>项目名称</Text>:<Text className='list-itme-content'>{obj.group_info||'-'}</Text></View>
          {obj.business_type === '3' && <View className='list-itme'><Text className='list-itme-title'>借支属于</Text>:<Text className='list-itme-content'>{obj.typeDes}</Text></View>}
          {/* 按天\点工 */}
          {((obj.business_type == '2' && obj.type ==='1') || obj.business_type == '1') && 
          <View>
            <View className='list-itme'><Text className='list-itme-title'>上班时长</Text>:<Text className='list-itme-content'>{obj.work_time}个工（{obj.work_time_hour}小时）</Text></View>
            <View className='list-itme'><Text className='list-itme-title'>加班时长</Text>:<Text className='list-itme-content'>{obj.overtime}小时</Text></View>
            <View className='wages'>
              <View className='wages-title'>工资标准</View>
              <View className='wages-list'>上班：{obj.wage_worktime_define}小时算1个工<Text className='wages-list-blued'>{obj.wage_money}</Text>元/个工</View>
              <View className='wages-list'>
                加班：
                {/* 加班：{obj.overtime_type === '1' ? '按小时算' : '按天算'}{obj.worker_overtime}小时算1个工 */}
                {/* <Text className='wages-list-blued'>{obj.overtime_money}</Text>元/小时 */}
                {obj.overtime_type == '1' ? <Text>按小时天算 <Text className='wages-list-blued'>{obj.wage_overtime_money}</Text>元/小时</Text> : <Text>按工天算 <Text className='wages-list-blued'>{obj.wage_overtime}</Text>小时算一个工</Text>}
              </View>
            </View>
          </View>
          }
          {/* 按量 */}
          {obj.business_type === '2' && obj.type === '2'  && 
          <View>
            <View className='list-itme'><Text className='list-itme-title'>工程量</Text>:<Text className='list-itme-content'>{obj.unit_num}{obj.unit}</Text></View>
            <View className='list-itme'><Text className='list-itme-title'>单价</Text>:<Text className='list-itme-content'>{obj.unit_price}</Text></View>
          </View>
          }
          {/*  */}
          <View className='remarks'>
            <View>备注</View>
            <View className='remarks-details'>{obj.note}</View>
            <View className='list-img-box'>
              {obj.view_images&&obj.view_images.length>0&&obj.view_images.map(v=>(
                <View className='list-img'>
                  <Image src={v.httpurl} className='list-img-img' onClick={()=>handleImage(v)}/>
                </View>
              ))}
            </View>
          </View>
        </AtList>
      </View>
      <View className='footer-box'>
        <View className='footer-box-del' onClick={handleDel}>删除</View>
        <View className='footer-box-edit' onClick={() => { Taro.navigateTo({ url: `/pages/editDetails/index?id=${obj.id}` })}}>修改</View>
      </View>
    </View>
  )
}
FlowingWaterDetails.config = {
  navigationBarTitleText: '包工',
} as Config