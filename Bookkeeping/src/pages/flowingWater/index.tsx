import Taro, { Config, useEffect, useState, useRouter, createContext,useDidShow } from '@tarojs/taro'
import { View, Text, Picker, Checkbox,Image } from '@tarojs/components'
import { bkBusinessAction, bkDeleteBusinessAction } from '../../utils/request/index';
import Msg from '../../utils/msg'
import { AtSwipeAction } from "taro-ui"
import { useDispatch } from '@tarojs/redux'
import { IMGCDNURL } from '../../config';
import { Type } from '../../config/store'
import { setFlowingWater } from '../../actions/flowingWater';
import { bkBusinessTypeDataItem } from '../../utils/request/index.d'
import './index.scss'
export interface Injected {
  dataArr: any,
}
export const context = createContext<Injected>({} as Injected)
interface DataType {
  item: any,
}

export default function FlowingWater() {
  const dispatch = useDispatch()
  const [data, setData] = useState<DataType>({
    item: []
  })
  const [time,setTime] = useState<string>()
  const [lastTime, setLastTime] = useState<string>()
  const [year,setYear] = useState<string>()
  const [mon,setmon] =useState<string>()
  // 多选
  const [isCheckOut, setIsCheckOut] = useState<boolean>(false)
  // 全选内容
  const [allcheck, setAllcheck] = useState<boolean>(false)
  // 获取数据
  useDidShow(()=>{
    const date = JSON.stringify(new Date()).slice(1, 11)
    setYear(date.slice(0, 4) + '年');
    setmon(date.slice(5, 7) + '月')
    const times = date.slice(0, 4) + '-' + date.slice(5, 7);
    setTime(times);
    let lastM = JSON.stringify(new Date(new Date().setMonth(new Date().getMonth() + 1))).slice(1, 11)
    setLastTime(lastM);
    getList(times, lastM);
  })
  const type = Taro.getStorageSync(Type);
  const getList = (times, lastM)=>{
    let params = {
      identity: type,
      start_date: times,
      end_date: lastM,
    }
    bkBusinessAction(params).then(res=>{
      if(res.code === 200){
        if (res.data.data && res.data.data.length>0){
          for(let i =0 ;i<res.data.data.length;i++){
            const month = res.data.data[i].time.slice(0, 4) + '年' + res.data.data[i].time.slice(5, 7)+'月';
            const day = res.data.data[i].time.slice(8,10) + '日';
            const weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
            const date = new Date(res.data.data[i].time).getDay();
            const week = weeks[date];
            res.data.data[i].week = week;
            res.data.data[i].month = month;
            res.data.data[i].day = day;
          }
          // 设置今天的自动打开
          const newData = new Date();
          const newTime = newData.getFullYear() + '-' + addZero(newData.getMonth() + 1) + '-' + addZero(newData.getDate());
          for (let i = 0; i < res.data.data.length;i++){
            if (res.data.data[i].time == newTime){
              res.data.data[i].click = true;
            }
          }
          setData({item:res.data.data})
          dispatch(setFlowingWater(res.data))
        }
      }else{
        Msg(res.msg)
      }
    })
  }
  // 时间小于10增加0
  const addZero = (num) => {
    if (parseInt(num) < 10) {
      num = '0' + num;
    }
    return num;
  }
  // 关闭打开
  const handleClick = (e)=>{
    const dataItem = JSON.parse(JSON.stringify(data.item));
    const dataClick = dataItem.map((v)=>{
      if(v.time === e.time){
        v.click = !v.click
      }
      return v;
    });
    setData({ item: dataClick})
  }
  // 点击详情
  const handleJump = (e,v,id)=>{
    e.stopPropagation();
    Taro.navigateTo({
      url: `/pages/flowingWaterDetails/index?time=${v.time}&id=${id}&week=${v.week}`
    })
  }
  // 点击选择框
  const handleCheckbox = (val)=>{
    console.log(val,'val');
    const item = JSON.parse(JSON.stringify(data.item));
    for(let i = 0;i<item.length;i++){
      for(let j = 0;j<item[i].arr.length;j++){
        if(item[i].arr[j].id === val.id){
          item[i].arr[j].checkClick = !item[i].arr[j].checkClick
        }
      }
    }
    setData({item})
  }
  const handleCheckboxBtn = (type:number)=>{
    // 0ture 1false
    if(type === 0){
      setIsCheckOut(true)
    }else{
      setIsCheckOut(false)
    }
  }
  // 点击滑动
  const handleAtSwipeAction = (e,v)=>{
    if(e.text === '修改'){
      Taro.navigateTo({
        url: '/pages/flowingWaterDetails/index'
      })
    }else{
      Taro.showModal({
        content:'231312312'
      })
      return;
    }
  }
  // 跳转
  const userRouteJump = (url: string) => {
    Taro.navigateTo({
      url: url
    })
  }
  // 传递的值
  const value: Injected = {
    dataArr: data,
  }
  // 滑动点击
  const handleSwipeAction = (e,v)=>{
    let params = {
      ids:[v.id]
    }
    console.log(v,'vvvvv');
    if(e.text == '删除'){
      Taro.showModal({
        title:'提示',
        content:'确认删除',
        showCancel: true,
        success:(res)=>{
          if (res.confirm == true) {
            bkDeleteBusinessAction(params).then(res => {
              if (res.code === 200) {
                getList(time, lastTime)
              } else {
                Msg(res.msg)
              }
            })
          }
        }
      })
    }else{
      Taro.navigateTo({ url: `/pages/editDetails/index?id=${v.id}`})
    }
  }
  const handelChangeTime = (e)=>{
    console.log(e);
    setTime(e.detail.value);
    let lastM = JSON.stringify(new Date(new Date(e.detail.value).setMonth(new Date(e.detail.value).getMonth() + 1))).slice(1, 11);
    setLastTime(lastM);
    setYear(e.detail.value.slice(0,4)+'年');
    setmon(e.detail.value.slice(6, 8)+'月')
    getList(e.detail.value, lastM)
  }
  // 全选
  const handleAllCheck = ()=>{
    console.log(allcheck,'全选')
    if(!allcheck){
      const dataItem = JSON.parse(JSON.stringify(data.item));
      const list = dataItem.map(v=>{
        v.arr.map(val=>{
          val.checkClick = true
          return val;
        })
        v.click = true;
        return v; 
      })
      console.log(list,'list')
      setData({ item: list})
      setAllcheck(true);
    }else{
      const arr = JSON.parse(JSON.stringify(data.item));
      const list = arr.map(v => {
        v.arr.map(val => {
          val.checkClick = false;
          return val;
        })
        return v;
      })
      setData({ item: list })
      setAllcheck(false);
    }
  }
  // 批量删除
  const handleAllDel = ()=>{
    const arr = JSON.parse(JSON.stringify(data.item));
    console.log(arr,'xxx')
    let ids:any[]=[];
    for(let i =0;i<arr.length;i++){
      for (let j=0;j<arr[i].arr.length;j++){
        console.log(arr[i].arr[j])
        if(arr[i].arr[j].checkClick){
          console.log(arr[i].arr[j].checkClick)
          ids.push(arr[i].arr[j].id);
        }
      }
    }
    let params = {
      ids,
    }
    console.log(ids);
    bkDeleteBusinessAction(params).then(res=>{
      if(res.code === 200 ){
        getList(time, lastTime)
      }else{
        Msg(res.msg)
      }
    })
  }
  console.log(data,'data')
  return(
    <context.Provider value={value}>
    <View className='flowingWater'>
      <View className='time'>
        <Picker
          mode='date'
          fields='month'
          onChange={(e) =>handelChangeTime(e)}
          value={''}
        // range={timeList}
        // onColumnChange={(e) => handlebindcolumnchange(e)}
        >
            {/* <Text className='time-color'>{year}<View><Image className='leftIcon' src={`${IMGCDNURL}left.png`} /></View>{mon}<View><Image className='rightIcon' src={`${IMGCDNURL}right.png`}/></View></Text> */}
            <View className='time-color'>{year}<Image src={`${IMGCDNURL}leftIcon.png`} className='leftIcon' />{mon}<Image className='righticon' src={`${IMGCDNURL}rightIcon.png`} /></View>
        </Picker>
      </View>
      <View className='content'>
        <View>
            {data.item && data.item.length>0 && data.item.map((v,i)=>(
            <View key={i+i} onClick={()=>handleClick(v)}>
              <View className='content-list'>
                <View className='content-list-left'>
                  {v.click && <View className='content-list-icon-lowerIcon'><Image className='content-list-icon-lowerIcon-image' src={`${IMGCDNURL}lowerIcon.png`}/></View>}
                  {!v.click && <View className='content-list-icon-rightIcon'><Image className='content-list-icon-rightIcon-image' src={`${IMGCDNURL}rightIcon.png`}/></View>}
                  <View>
                    <View className='content-list-left-week'><Text>{v.day}</Text>{v.week}</View>
                    <View className='content-list-left-time'>{v.month}</View>
                  </View>
                </View>
                <View className='content-list-right'>
                  <View className='content-list-right-list'>
                    <View className='content-list-right-title'>借支</View>
                    <View className='content-list-right-money'>¥{v.total_borrow && v.total_borrow.toFixed(2)}</View>
                  </View>
                  <View>
                    <View className='content-list-right-title'>工钱</View>
                    <View className='content-list-right-money'>¥{v.total_money && v.total_money.toFixed(2)}</View>
                  </View>
                </View>
              </View>
              {v.click && 
                <View>
                  {v.arr.map((val=>(
                    <View onClick={(e)=>{e.preventDefault(),e.stopPropagation()}}>
                    <AtSwipeAction
                      autoClose={false}
                      onOpened={(e) => { e.preventDefault(),e.stopPropagation()}}
                      onClick={(e) => handleSwipeAction(e,val)}
                      options={[
                        { 
                          text: '修改',
                          style: {
                            backgroundColor: '#FFC82C'
                          },
                        },
                        {
                          text: '删除',
                          style: {
                            backgroundColor: '#FF4949'
                          }
                        }
                      ]}
                    >
                    <View key={val.id} className='content-list-subclass' onClick={(e)=>handleJump(e,v,val.id)}>
                      <View className='content-list-subclass-left'>
                            {isCheckOut && <View><Checkbox checked={val.checkClick} className='checkbox' onClick={(e) => { e.stopPropagation(); handleCheckbox(val) }} value={v.checkClick} /></View>}
                        <View className=''>
                          <View>{val.workername||'-'}</View>
                              <View className='content-list-subclass-left-title'>我在{val.group_info}对{val.workername||'-'}记了1笔包工</View>
                        </View>
                      </View>
                      <View className='content-list-subclass-money'>¥{val.money}></View>
                    </View>
                    </AtSwipeAction>
                    </View>
                  )))}
                </View>
              }
            </View>
          ))}
        </View>
        {data.item.length === 0 &&
        <View className='noData-box'>
          <View className='noData'>
            <View>本月您还没有记工哦~</View>
            <View>点击【去记工】按钮，添加您的记工信息</View>
            <View className='goRecordWorkBox'><View className='goRecordWork' onClick={() => userRouteJump('/pages/recorder/index')}>去记工</View></View>
          </View>
        </View>
        }
      </View>
      {/* 多选 */}
      {!isCheckOut && data.item.length > 0 &&
        <View className='icon-box' onClick={()=>handleCheckboxBtn(0)}>
          <View className='icon-box-icon' ><Image className='icon-box-icon-image' src={`${IMGCDNURL}checkout.png`}/></View>
        <View>多选</View>
      </View>
      }
      {isCheckOut && 
      <View className='footer-box'>
          <View className='footer-box-left'><Checkbox className='checkbox' checked={allcheck} value='' onClick={handleAllCheck}/>全选</View>
        <View className='footer-box-flex'>
          <View className='allDel' onClick={handleAllDel}>批量删除</View>
          <View className='close' onClick={()=>handleCheckboxBtn(1)}>取消</View>
        </View>
      </View>
      }
    </View>
    </context.Provider>
  )
}
FlowingWater.config = {
  navigationBarTitleText: '记工流水',
} as Config