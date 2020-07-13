import Taro, { Config, useEffect, useState, createContext,useDidShow } from '@tarojs/taro'
import { View, Text, Checkbox, Image } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { UserInfo } from '../../config/store';
import { bkGetNotePadAction, bkDeleteNotePadAction } from '../../utils/request/index';
import Msg, { getdate, timestampToTime } from '../../utils/msg'
import { bkGetNotePadTypeData } from '../../utils/request/index.d'
import { useDispatch } from '@tarojs/redux'
import { IMGCDNURL  } from '../../config';
import { setNotepad  } from '../../actions/notepad'
import './index.scss'
export interface Injected {
  dataArr: bkGetNotePadTypeData[],
}
export const context = createContext<Injected>({} as Injected)
export default function Notepad() {
  const dispatch = useDispatch()
  // 输入框
  const [val,setVal]= useState<string>('');
  // 内容
  const [data,setData] = useState<any>([])
  // 删除
  const [del,setDel] =useState<boolean>(false);
  // 系统繁忙
  const [busy, setBusy] =useState<boolean>(false)
  // 全选按钮
  const [selectAll, setSelectAll] = useState<boolean>(false)
  // 点击全选
  const handleDel = ()=>{
    setDel(true);
  }
  // 取消
  const handleClose = ()=>{
    setDel(false)
  }
  // 选择ID
  const [ids,setIds] = useState<string[]>([]);
  // 获取数据
  useDidShow(()=>{
    getList();
  })
  const getList = (key = '')=>{
    let userInfo = Taro.getStorageSync(UserInfo);
    const params = {
      mid: userInfo.userId,
      token: userInfo.token,
      time: userInfo.tokenTime,
      uuid: userInfo.uuid,
      key,
    }
    bkGetNotePadAction(params).then(res => {
      if (res.code === 400 || res.code === 200) {
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            let times;
            if (res.data[i].created_time) {
              times = getdate((res.data[i].created_time) * 1000)
            }
            const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            const date = new Date(res.data[i].created_time * 1000).getDay();
            const creatTime = timestampToTime(res.data[i].created_time * 1000);
            const week = weeks[date];
            res.data[i].time = times;
            res.data[i].week = week;
            res.data[i].creatTime = creatTime;
            res.data[i].click = false
          }
        }
        // 给子页面存值
        dispatch(setNotepad(res))
        setData(res.data)
      }
    })
  }
  // 跳转
  const userRouteJump = (url: string) => {
    Taro.navigateTo({
      url: url
    })
  }
  // 传递的值
  const value: Injected ={
    dataArr: data,
  }
  //handleCheckbox
  const handleCheckbox = (e)=>{
    const item = JSON.parse(JSON.stringify(ids));
    if(item.length === 0 ){
      item.push(e.id);
      for (let i = 0; i < data.length ;i++){
          if(e.id === data[i].id){
            data[i].click = true;
          }
      }
    }else{
      if (item.indexOf(e.id) === -1){
        item.push(e.id)
        for (let i = 0; i < data.length; i++) {
          if (e.id === data[i].id) {
            data[i].click = true;
          }
        }
      }else{
        item.splice(item.indexOf(e.id),1)
        for (let i = 0; i < data.length; i++) {
          if (e.id === data[i].id) {
            data[i].click = false;
          }
        }
      }
    }
    setIds(item);
  }
  // 删除
  const bkDeleteNotePad = ()=>{
    let params = {
      id: ids
    }
    bkDeleteNotePadAction(params).then(res=>{
      if(res.code === 200 ){
        getList();
      }else{
        Msg(res.msg);
      }
    })
  }
  // 全选
  const handleAllCheckbox = ()=>{
    let idsArr,arr;
    if(!selectAll){
      idsArr = data.map(v=>v.id);
      arr = data.map(v=>{
        v.click = true;
        return v 
      })
      setSelectAll(true)
    }else{
      idsArr =[];
      arr = data.map(v => {
        v.click = false;
        return v
      })
      setSelectAll(false)
    }
    setIds(idsArr);
    setData(arr)
  }
  // 搜索
  const handleSeach = ()=>{
    getList(val)
  }
  return(
    <context.Provider value={value}>
    <View className='notepad'>
      {/* 搜索 */}
      <View className='searchBar'>
        <AtSearchBar
          showActionButton
          value={val}
          onChange={(e)=>setVal(e)}
          onActionClick={handleSeach}
        />
      </View>
      {/* 内容 */}
      {data.length === 0 && 
      <View className='content'>
        <View className='noData'>
          <View>您今天还没有填写过记事本哦~</View>
          <View>点击下方<Text className='blued'>记事</Text>按钮，添加您的记事信息</View>
        </View>
      </View>}
        {busy && 
        <View className='busyBox'>
        <View>系统繁忙，刷新试试</View>
        <View className='refresh'>刷新</View>
        </View>}
        {data.length > 0 && !busy  && <View className='dataMT'>
        {data.map((v)=>(
          <View className='dataContent' key={v.id} onClick={() => userRouteJump(`/pages/notepadDetails/index?id=${v.id}`)}>
          <View className='timeTop'>
              <View className='timeTop-time'>{v.time}</View>
            <View className='timeTop-week'>{v.week}</View>
          </View>
          <View className='dataContent-details'>
              <Text className='dataContent-details-title'>{v.note}</Text>
              {v.view_images.length>0 && 
              <View className='flex'>
              {v.view_images.map((item) => (
                <View className='dataContent-imageList'>
                  <View className='dataContent-imageList-image'>
                    <Image src={item.httpurl} className='image'/>
                  </View>
                </View>
              ))}
              </View>
              }
            <View className='dataContent-imageList-footer'>
              <View className='dataContent-imageList-time'>{v.creatTime}</View>
                <View>{del && <Checkbox checked={v.click} value={v.click} onClick={(e) => { e.stopPropagation(); handleCheckbox(v)}} className='checkboxButton-checkbox' color='#0099FF' />}</View>
            </View>
          </View>
        </View>
        ))}
        </View>}
      {/* footer */}
      {/* 记事 */}
      {!del && <View className='footer'><View className='footer-btn' onClick={() => userRouteJump('/pages/addNotepad/index')}>记事</View></View>}
      {/* 全选 */}
        {!del && data.length > 0 && <View className='checkbox-notepad' onClick={handleDel}><View className='checkbox-box'><View className='checkbox-image'><Image className='checkbox-image-image' src={`${IMGCDNURL}checkout.png`}/></View>全选</View></View>}
      {/* 多选按钮 */}
      {del && <View className='checkboxButton'>
        <View className='checkboxButton-box'>
            <View><Checkbox value='' checked={selectAll} onClick={handleAllCheckbox} className='checkboxButton-checkbox' color='#0099FF'/>多选</View>
          <View className='checkboxButton-right'>
              <View className='checkboxButton-del' onClick={bkDeleteNotePad}>批量删除</View>
            <View className='checkboxButton-close' onClick={handleClose}>取消</View>
          </View>
        </View>
      </View>
      }
    </View>
    </context.Provider>
  )
}
Notepad.config = {
  navigationBarTitleText: '记事本',
} as Config