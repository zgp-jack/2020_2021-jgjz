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
  dataArr: any[],
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
  // 是否是搜索
  const [isSheach, setIsSheach] = useState<boolean>(false)
  // 选择ID
  const [ids, setIds] = useState<string[]>([]);
  // 获取数据
  useDidShow(() => {
    setIds([])
    setSelectAll(false)
    getList(val);
  })
  // 点击全选
  const handleDel = ()=>{
    setDel(true);
  }
  // 取消
  const handleClose = ()=>{
    const arr = JSON.parse(JSON.stringify(data))
    arr.map(v => {
      if (v.list.length > 0) {
        v.list.map(val => {
          val.click = false;
          return val;
        })
      }
      return v;
    });
    setDel(false)
    setIds([])
    setSelectAll(false)
    setData(arr)
  }
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
      if (res.code === 200) {
        // if (res.data.length > 0) {
        //   for (let i = 0; i < res.data.length; i++) {
        //     let times;
        //     if (res.data[i].created_time) {
        //       times = getdate((res.data[i].created_time) * 1000)
        //     }
        //     const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        //     const date = new Date(res.data[i].created_time * 1000).getDay();
        //     const creatTime = timestampToTime(res.data[i].created_time * 1000);
        //     const week = weeks[date];
        //     res.data[i].time = times;
        //     res.data[i].week = week;
        //     res.data[i].creatTime = creatTime;
        //     res.data[i].click = false
        //   }
        // }
        if(res.data.length>0){
          for(let i = 0;i<res.data.length;i++){
            const date = new Date(res.data[i].day).getDay();
            const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            const week = weeks[date];
            res.data[i].week = week;
            const time = res.data[i].day.substring(5, 7) + '月' + res.data[i].day.substring(8,11)+'日';
            res.data[i].time = time;
            for (let j = 0; j < res.data[i].list.length;j++){
              res.data[i].list[j].created_time_string = (res.data[i].list[j].created_time_string).replace('-', '/');
              const timeItem = new Date(res.data[i].list[j].created_time*1000);
              console.log(timeItem,'timeItem')
              console.log(res.data[i].list[j].created_time,'res.data[i].list[j].created_time')
              const newTime = timeItem.getFullYear() + '/' + addZero(timeItem.getMonth() + 1) + '/' + addZero(timeItem.getDate()) + ' ' + addZero(timeItem.getHours()) + ':'+addZero(timeItem.getMinutes());
              res.data[i].list[j].newTime = newTime;
              const newDate = new Date().getDate();
              // const newDateYears = newDate.getFullYear();
              // console.log(newDateYears,'newDateYears')
            }
            // 去年的都显示年月日
            // const newDate = new Date()''
            // for(let j =0;j<res.data.list.length;j++){
            //   res.data[i].list[j].click = false;
            // }
          }
        }else{
          setDel(false);
          setSelectAll(false)
        }
        // 给子页面存值
        dispatch(setNotepad(res))
        setData(res.data)
      }
    })
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
  // 传递的值
  const value: Injected ={
    dataArr: data,
  }
  //handleCheckbox
  const handleCheckbox = (e)=>{
    const item = JSON.parse(JSON.stringify(ids));
    const dataItem = JSON.parse(JSON.stringify(data));
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
    dataItem.map((v)=>{
      v.list.map(val=>{
        if(val.id == e.id){
          val.click = !val.click
        } 
        return val;
      })
      return v;
    })
    setData(dataItem)
    console.log(item,'item')
    setIds(item);
  }
  // 删除
  const bkDeleteNotePad = ()=>{
    if (ids.length === 0) {
      Msg('请选择至少一条信息')
      return
    }
    Taro.showModal({
      title:'提示',
      content:'删除后，当前信息将无法恢复，确定删除？',
      showCancel: true,
      success: (res) => {
        if (res.confirm == true) {
          // if(ids.length === 0){
          //   Msg('请选择至少一条信息')
          //   return
          // }
          let params = {
            id: ids
          }
          bkDeleteNotePadAction(params).then(res=>{
            if(res.code === 200 ){
              Msg('删除成功')
              setTimeout(()=>{
                getList(val);
              },500)
            }else{
              Msg(res.msg);
            }
          })
        }
      }
    })
  }
  // 全选
  const handleAllCheckbox = ()=>{
    const arr = JSON.parse(JSON.stringify(data))
    let clickId:string[]=[];
    if (!selectAll){
      arr.map(v =>{
          if(v.list.length>0){
            v.list.map(val=>{
              val.click = true;
              clickId.push(val.id);
              return val;
            })
          }
        return v;
      });
      setSelectAll(true)
    }else{
      clickId = [];
      arr.map(v => {
        if (v.list.length > 0) {
          v.list.map(val => {
            val.click = false;
            return val;
          })
        }
        return v;
      });
      setSelectAll(false)
    }
    setIds(clickId)
    setData(arr)
  }
  // 搜索
  const handleSeach = ()=>{
    getList(val)
    // 搜索清空，并且全选变false
    setSelectAll(false)
    setIds([]);
    setIsSheach(true)
  }
  // 取消搜索
  const handleOnClear = ()=>{
    // getList();
    // setData([]);
    setIsSheach(true)
    setVal('');
    // setIds([]);
    // getList(val)
    // setIsSheach(false)
  }
  const handleJump = (v:any)=>{
    if (del){
      handleCheckbox(v)
      return;
    }else{
      userRouteJump(`/pages/notepadDetails/index?id=${v.id}`)
    }
  }
  console.log(value,'value')
  return(
    <context.Provider value={value}>
    <View className='notepad'>
      {/* 搜索 */}
      <View className='searchBar'>
        <AtSearchBar
          showActionButton
          value={val}
          maxLength={10}
          placeholder='快速搜索关键词'
          onClear={handleOnClear}
          onChange={(e)=>setVal(e)}
          onActionClick={handleSeach}
        />
      </View>
      {/* 内容 */}
        {data.length === 0 && !isSheach && 
      <View className='content'>
        <View className='noData'>
          <View>您今天还没有填写过记事本哦~</View>
          <View>点击下方<Text className='blued'>【记事】</Text>按钮，添加您的记事信息</View>
        </View>
      </View>}
        {data.length === 0 && isSheach &&
        <View className='content'>
          <View className='noData'>
            <View>暂无数据</View>
          </View>
        </View>}
        {busy && 
        <View className='busyBox'>
        <View>系统繁忙，刷新试试</View>
        <View className='refresh'>刷新</View>
        </View>}
        {data.length > 0 && !busy  && <View className='dataMT'>
        {/* {data.map((v)=>(
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
        ))} */}
        {data.map((v,i)=>(
          <View key={i+i} className='list'>
            <View className='title'>
              <View className='day'>{v.time}</View>
              <View className='week'>{v.week}</View>
            </View>
            {v.list.map((values,index)=>(
              <View className='box' key={index + index} onClick={() => handleJump(values)}>
                <View className='box-note'>{values.note}</View>
                <View>
                  {values.view_images&&values.view_images.length>0 && <View className='flex'>
                    {values.view_images.map(item=>(
                      <Image className='image' src={item.httpurl}/>
                    ))}
                  </View>}
                </View>
                <View className='title'>
                  <View className='footerTime'>{values.newTime}</View>
                  <View>{del && <Checkbox checked={values.click} value={values.click} onClick={(e) => { e.stopPropagation(); handleCheckbox(values) }} className='checkboxButton-checkbox' color='#0099FF' />}</View>
                </View>
              </View>
            ))}
          </View>
        ))}
        </View>}
      {/* footer */}
      {/* 记事 */}
      {!del && <View className='footer'><View className='footer-btn' onClick={() => userRouteJump('/pages/addNotepad/index')}>记事</View></View>}
      {/* 全选 */}
        {!del && data.length > 0 && <View className='checkbox-notepad' onClick={handleDel}><View className='checkbox-box'><View className='checkbox-image'><Image className='checkbox-image-image' src={`${IMGCDNURL}checkout.png`}/></View>多选</View></View>}
      {/* 多选按钮 */}
      {del && <View className='checkboxButton'>
        <View className='checkboxButton-box'>
            <View><Checkbox value='' checked={selectAll} onClick={handleAllCheckbox} className='checkboxButton-checkbox' color='#0099FF'/>全选</View>
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