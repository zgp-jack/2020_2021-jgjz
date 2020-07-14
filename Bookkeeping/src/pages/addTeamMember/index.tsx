import Taro, { Config, useContext,useEffect, useState, useRouter,useDidShow } from '@tarojs/taro'
import { View, Text, Picker, ScrollView, Checkbox,Image } from '@tarojs/components'
import { AtIndexes, AtSearchBar } from 'taro-ui'
import userForeman from '../../hooks/foreman';
import AddMember from '../../components/addMember';
import { useDispatch, useSelector } from '@tarojs/redux';
import { setWorker } from '../../actions/workerList';
import { bkSetGroupLeaderAction } from '../../utils/request/index'
import { Type } from '../../config/store';
import './index.scss'


export default function AddTeamMember() {
  const dispatch = useDispatch()
  // 获取存入的公用内容
  const useSelectorItem = useSelector<any, any>(state => state)
  const router: Taro.RouterInfo = useRouter();
  const { groupInfo,type } = router.params;
  const { handleInput, handleEstablish, addMemberDisplay, setAddMemberDisplay, workerList, setWorkerList, storagelist, setStoragelist} = userForeman()
  // 列表数据
  const [data, setData] = useState<any[]>([]);
  // 默认值
  const [defaultData , setDefaultData] =useState<any[]>([]);
  // 点击数据
  const [clickData, setClickData] = useState<any[]>([]);
  // 输入框
  const [valData,setValData]= useState<string>('');
  // 关闭添加成员
  const handleAddMemberClose = () => {
    setAddMemberDisplay(false)
  }
  const handleCheckbox = (e)=>{
    console.log('checkout')
    const arr = JSON.parse(JSON.stringify(clickData));
    let dataArr = JSON.parse(JSON.stringify(data));
    console.log(e);
    // let arr = JSON.parse(JSON.stringify(storagelist));
    // let dataArr = JSON.parse(JSON.stringify(workerList));
    if (arr.length === 0 ){
      arr.push(e);
    }else{
      if (arr.indexOf(e.id) === -1) {
        arr.push(e)
      } else {
        arr.splice(arr.indexOf(e.id), 1)
      }
    }
    const list= dataArr.map(v=>{
      if(v.id === e.id){
        v.click = !v.click;
      }
      return v;
    })
    setClickData(arr);
    setData(list)
  }
  useEffect(()=>{
    console.log(useSelectorItem.mailList,'useSelectorItem.mailList')
    if (useSelectorItem.mailList) {
      const item = JSON.parse(JSON.stringify(useSelectorItem.mailList))
      console.log(item,'itemsdadsdsadsadas')
      for(let i =0;i<item.length;i++){
        if(item[i].list.length>0){
          for(let j = 0;j<item[i].list.length;j++){
            item[i].list[j].click = true;
          }
        }
      }
      console.log(item,'timesdd sakd kasbdjkasb')
      setDefaultData(item);
      setData(item)
    }
  }, [useSelectorItem.mailList])

  // 字母表
  const letter = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
    { id: 4, name: 'D' },
    { id: 5, name: 'E' },
    { id: 6, name: 'F' },
    { id: 8, name: 'G' },
    { id: 9, name: 'H' },
    { id: 10, name: 'I' },
    { id: 11, name: 'J' },
    { id: 12, name: 'K' },
    { id: 13, name: 'L' },
    { id: 14, name: 'M' },
    { id: 15, name: 'N' },
    { id: 16, name: 'O' },
    { id: 17, name: 'P' },
    { id: 18, name: 'Q' },
    { id: 19, name: 'R' },
    { id: 20, name: 'S' },
    { id: 21, name: 'T' },
    { id: 22, name: 'U' },
    { id: 23, name: 'V' },
    { id: 24, name: 'W' },
    { id: 25, name: 'X' },
    { id: 26, name: 'Y' },
    { id: 27, name: 'Z' },
  ]

  const handleClick=()=>{

  }
  const onActionClick =()=>{
    const value = JSON.parse(JSON.stringify(valData));
    console.log(value);
    const dataArr = JSON.parse(JSON.stringify(data));
    const defaultDataArr = JSON.parse(JSON.stringify(defaultData));
    let arr:any[] = [];
    if(valData == ''){
      arr = defaultDataArr;
    }else{
      for(let i =0;i<dataArr.length;i++){
        if(dataArr[i].list.length>0){
          for(let j=0;j<dataArr[i].list.length;j++){
            if(dataArr[i].list[j].name == value){
              arr.push(dataArr[i]);
            }
          }
        }
      }
    }
    console.log(arr,'arrrr');
    setData(arr);
  }
  const handleChange = ()=>{

  }
  const handleLetter = (v)=>{
    console.log(v,'v')
    console.log(`#${v.name}`);
    const query = Taro.createSelectorQuery()                // 创建节点查询器 query
    query.select(`#${v.name}`).boundingClientRect()    // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset()                 // 这段代码的意思是获取页面滑动位置的查询请求
    query.exec((res) => {
      var winWidth = Taro.getSystemInfoSync().windowWidth;
      const data =  750 / winWidth;
      console.log(data,'ata')
      console.log(res,'res111')
      Taro.pageScrollTo({
        scrollTop: (res[0].top) * data,
        duration: 300
      })
    })
  }
  // 跳转
  const userRouteJump = (url: string) => {
    Taro.navigateTo({
      url: url
    })
  }
  // 班组长
  const handleForeman = (name,e)=>{
    if(type !== '2'){
      const arr = JSON.parse(JSON.stringify(clickData));
      let dataArr = JSON.parse(JSON.stringify(data));
      if (arr.length === 0) {
        arr.push(e);
      } else {
        if (arr.indexOf(e.id) === -1) {
          arr.push(e)
        } else {
          arr.splice(arr.indexOf(e.id), 1)
        }
      }
      for(let i =0;i<dataArr.length;i++){
        if (dataArr[i].name_py === name){
          for(let j = 0;j<dataArr[i].list.length;j++){
            if(e.id === dataArr[i].list[j].id){
              dataArr[i].list[j].click = !dataArr[i].list[j].click
            }
          }
        }
      }
      setClickData(arr);
      setData(dataArr)
    }else {
      let params = {
        group_info: groupInfo,
        group_leader:e.id
      }
      bkSetGroupLeaderAction(params).then(res => {
        console.log(res,'xxx')
      });
      dispatch(setWorker([e]))
      Taro.navigateBack({ delta: 1 })
    }
  }
  const handleStart = ()=>{
      const dataArr = JSON.parse(JSON.stringify(data));
      let clickArr:any[]= [];
      for(let i=0;i<dataArr.length;i++){
        for(let j=0;j<dataArr[i].list.length;j++){
          if(dataArr[i].list[j].click){
            clickArr.push(dataArr[i].list[j])
          }
        }
      }
      console.log(clickArr);
      dispatch(setWorker(clickArr))
      Taro.navigateBack({ delta: 1 })
  }
  return(
    <View className='content'>
      <View>
        <AtSearchBar
          showActionButton
          value={valData}
          onChange={(e) => setValData(e)}
          onActionClick={() => onActionClick()}
        />
      </View>
      <View id='box'>
        {data && data.map((val,i)=>(
          <View key={i+i}>
            <View className='list-title'>{val.name_py}</View>
            {val.list.map((v=>(
              <View className='list-flex-test' onClick={() => handleForeman(val.name_py,v)}>
                {type !== '2' &&
                  <View><Checkbox checked={v.click} value={v.click} className='Checkbox' onClick={() => handleForeman(val.name_py, v)} /></View>
                }
                <View>
                  <View className='image'></View>
                </View>
                <View>
                  <View className='name'>{v.name}</View>
                  <View className='phone'>{v.phone}</View>
                </View>
              </View>
            )))}
          </View>
        ))}
      </View>
      <View className='add' onClick={() => setAddMemberDisplay(true)}>添加</View>
      <View className='letter'>
        {letter.map((v=>(
          <View className='letter-list' id={`${v.name}`} onClick={()=>handleLetter(v)} key={v.id}>{v.name}</View>
        )))}
      </View>
      {/* footer */}
      {type !== '2' && <View className='footer'><View className='footer-btn' onClick={handleStart}>开始记工</View></View>}
      {/* 添加成员 */}
      <AddMember display={addMemberDisplay} handleClose={handleAddMemberClose} handleEstablish={handleEstablish} handleInput={handleInput} groupInfo={groupInfo}/>
    </View>
  )
}
AddTeamMember.config = {
  navigationBarTitleText: '添加班组成员',
} as Config
