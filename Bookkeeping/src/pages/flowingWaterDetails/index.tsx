import Taro, { Config, useState, useRouter, useContext, useDidShow } from '@tarojs/taro'
import { View, Text, Picker, Checkbox, Image } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import { context } from '../flowingWater';
import { useSelector } from '@tarojs/redux'
import { bkDeleteBusinessAction, bkBusinessOneAction } from '../../utils/request/index'
import Msg from '../../utils/msg';
import './index.scss'


export default function FlowingWaterDetails() {
  const useSelectorItem = useSelector<any, any>(state => state)
  const router: Taro.RouterInfo = useRouter();
  const { time, id, week } = router.params;
  // 父级的值
  const { dataArr } = useContext(context);
  const [obj,setObj]=useState<any>({
    view_images:[]
  })
  // 获取存入的公用内容
  useDidShow(()=>{
    bkBusinessOneAction({ id }).then(res => {
      if (res.code === 200) {
        const data = res.data;
        let title;
        if (data.business_type == '1') {
          title = '点工'
        } else if (data.business_type == '2') {
          if (data.type === '1') {
            title = '包工'
          } else if (data.type == '2') {
            title = '包工'
          }
        } else if (data.business_type == '3') {
          title = '借支'
        }
        Taro.setNavigationBarTitle({
          title,
        })
        let typeDes;
        if (data.type === '3') {
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
        if (parseInt(data.worker_overtime) && parseInt(data.worker_overtime) > 0) {
          if (parseInt(data.overtime) && parseInt(data.overtime) > 0) {
            addTime = (parseInt(data.overtime) / parseInt(data.worker_overtime))
          }
        }
        data.addTime = toFixedFn(addTime);
        setObj(data)
      }else{
        Msg(res.msg);
      }
    })
  })
  const toFixedFn = (num:any)=>{
    let nums = num + '';
    if(nums.indexOf('.')+1>0){
      nums = nums.substring(0,nums.indexOf(".")+3);
    }
    return  Number(nums);
  }
  // 0 点工 1 包工按天 2 包工按量 3借支
  // 删除
  const handleDel = () => {
    let params = {
      ids: [obj.id]
    }
    Taro.showModal({
      content:'数据一经删除将无法恢复。请谨慎操作哦！',
      showCancel: true,
      confirmText: '确认删除',
      confirmColor:'#0099FF',
      cancelColor:'#797979',
      success: (res) => {
        if(res.confirm == true){
          bkDeleteBusinessAction(params).then(res => {
            if (res.code === 200) {
              if(useSelectorItem.flowingWater.length>0){
                useSelectorItem.flowingWater.forEach((element,dex) => {
                  element.arr.forEach((item,index) => {
                    if(item.id == obj.id){
                      if(element.arr.length == 1){
                        useSelectorItem.flowingWater.splice(dex,1)
                      }else{
                        if(item.business_type == 3){
                          element.total_borrow -= item.money;
                        }else{
                          element.total_money -= item.money;
                        }
                        element.arr.splice(index,1);
                      }
                    }
                  });
                });
              }
              Msg('删除成功')
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
  const moneyfilter = (num,overnum,decimal)=>{
    if(Number(overnum)==0 || Number(num)==0){
      return 0;
    }else{
      num = num/overnum
      num = num.toString()
      let index = num.indexOf('.')
      if (index !== -1) {
          num = num.substring(0, decimal + index + 1)
      } else {
          num = num.substring(0)
      }
      return parseFloat(num).toFixed(decimal)
    }
  }
  return(
    <View className='flowingWaterDetails'>
      <View className='top'>
        {obj.business_type &&obj.business_type == '1' && <View className='top-name'>点工工钱</View>}
        {obj.business_type && obj.business_type == '2' && obj.type === '1'&& <View className='top-name'>包工（按天记）工钱</View>}
        {obj.business_type && obj.business_type == '2' && obj.type === '2' && <View className='top-name'>包工（按量记）工钱</View>}
        {obj.business_type &&obj.business_type == '3' && <View className='top-name'>本次借支</View>}
        <View className='top-money' style={{fontSize:obj.money>9999999.99?'73rpx':'115rpx'}}>¥{obj.money}</View>
        <View className='top-time'>{time}<Text> {week}</Text></View>
      </View>
      <View className='list-content'>
        <AtList className='list'>
          {obj.identity == 1 ?
          <View>
            <View className='list-itme'>
              <Text className='list-itme-title'>工人</Text>:<Text className='list-itme-content'>{obj.workername||''}</Text>
            </View>
            <View className='list-itme'>
              <Text className='list-itme-title'>项目名称</Text>:<Text className='list-itme-content'>{obj.group_info_name ? obj.group_info_name.replace(',','-'):'-'}</Text>
            </View>
          </View>
          :<view>
            <View className='list-itme'>
              <Text className='list-itme-title'>项目名称</Text>:<Text className='list-itme-content'>{obj.group_info_name ? obj.group_info_name.replace(',','-'):'-'}</Text>
            </View>
            <View className='list-itme'>
              <Text className='list-itme-title'>班组长</Text>:<Text className='list-itme-content'>{obj.leader_name||''}</Text>
            </View>
          </view>}
          {obj.business_type === '3' && <View className='list-itme'><Text className='list-itme-title'>借支属于</Text>:<Text className='list-itme-content'>{obj.typeDes}</Text></View>}
          {/* 按天\点工 */}
          {((obj.business_type == '2' && obj.type ==='1') || obj.business_type == '1') && 
          <View>
            <View className='list-itme'><Text className='list-itme-title'>上班时长</Text>:<Text className='list-itme-content'>{parseFloat(obj.work_time)}个工（{parseFloat(obj.work_time_hour)}小时）</Text></View>
            <View className='list-itme'><Text className='list-itme-title'>加班时长</Text>:<Text className='list-itme-content'>{parseFloat(obj.overtime)}小时</Text></View>
            <View className='wages'>
              <View className='wages-note'>
                <View className='wages-title'>工资标准</View>:
              </View>
              <View className='wages-list'>上班： {parseFloat(obj.wage_worktime_define)}小时算1个工<Text className='wages-list-blued'>{obj.wage_money}</Text>元/个工</View>
              <View className='wages-list'>
                加班： {obj.wage_overtime_type == '1' ? <Text>按小时算<Text className='wages-list-blued'>{obj.wage_overtime_money}</Text>元/小时</Text> : <Text>按工天算<Text>{parseFloat(obj.wage_overtime)}</Text>小时算1个工<Text className='wages-list-blued'>{moneyfilter(obj.wage_money,obj.wage_overtime,2)}</Text>元/小时</Text>}
              </View>
            </View>
          </View>
          }
          {/* 按量 */}
          {obj.business_type === '2' && obj.type === '2'  && 
          <View>
            <View className='list-itme'><Text className='list-itme-title'>工程量</Text>:<Text className='list-itme-content'>{parseFloat(obj.unit_num)}{obj.unit}</Text></View>
            <View className='list-itme'><Text className='list-itme-title'>单价</Text>:<Text className='list-itme-content'>{obj.unit_price}</Text></View>
          </View>
          }
          {/*  */}
          <View className='remarks'>
            <View className='remarks-note'>
              <View className='remarks-title'>备注</View>:
            </View>
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
        <View className='footer-box-edit' onClick={() => { Taro.navigateTo({ url: `/pages/editDetails/index?id=${obj.id}&typeItem=1` })}}>修改</View>
      </View>
    </View>
  )
}
FlowingWaterDetails.config = {
  navigationBarTitleText: '包工',
} as Config