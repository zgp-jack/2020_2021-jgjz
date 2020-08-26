import Taro, { Config, useEffect, useState, useRouter, createContext,useDidShow } from '@tarojs/taro'
import { View, Text, Picker, Checkbox,Image } from '@tarojs/components'
import { bkBusinessAction, bkDeleteBusinessAction, bkGetProjectTeamAction, bkAddProjectTeamAction } from '../../utils/request/index';
import Msg from '../../utils/msg'
import { AtSwipeAction } from "taro-ui"
import { useDispatch, useSelector } from '@tarojs/redux'
import { IMGCDNURL } from '../../config';
import { Type } from '../../config/store'
import { setFlowingWater } from '../../actions/flowingWater';
import CreateProject from '../../components/createProject';
import ProjectModal from '../../components/projectModal'
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
  const useSelectorItem = useSelector<any, any>(state => state)
  const router: Taro.RouterInfo = useRouter();
  const { timeMon,foldMon } = router.params;
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
  // 班组长创建项目
  const [createProjectDisplay, setCreateProjectDisplay] = useState<boolean>(false)
  // 项目班组
  const [project, setProject] = useState<boolean>(false)
  //判断是否追加
  const [additional, setAdditional] = useState<number>(0)
  // 弹框内容
  const [model, setModel] = useState<any>({
    groupName: '',
    teamName: '',
  })
  const [identity, setIdentity]= useState<number>(1)
  // Picker 的value
  const [vals,setVals] = useState<string>('');
  // 判断Picker是否禁用
  const [isPicker,setisPicker] = useState<boolean>(false);
  // 日期需要的开始时间
  const [datestart,setDatestart] = useState<string>()
  // 日期需要的结束时间
  const [dateEnd,setdateEnd] = useState<string>()
  // 判断左边是否需要icon
  const [leftTime, setleftTime] = useState<boolean>()
  // 判断右边是否需要icon
  const [rightTime, setrightTime] = useState<boolean>(false)
  // 判断是否禁用Swipe
  const [isSwipe,setisSwipe] = useState<boolean>(false)
  // 判断折叠情况
  const [foldTime,setfoldTime] = useState<string>(foldMon);
  // 防止记工button多次点击
  const [ishandleJump,setishandleJump] = useState<boolean>(true)
  // 数据异常
  const [busy, setBusy] = useState<boolean>(false)
  // 获取数据
  useDidShow(()=>{
    const date = JSON.stringify(new Date()).slice(1, 11)
    const times = timeMon || date.slice(0, 4) + '-' + date.slice(5, 7);
    let lastM:string;
    setTime(times);
    setVals(times);
    if(Number(times.split('-')[1])==12){
      lastM = (Number(times.split('-')[0])+1) + '-' + '01';
    }else{
      lastM = times.split('-')[0]+'-'+(Number(times.split('-')[1])+1)
    }
    setLastTime(lastM);
    if(useSelectorItem.flowingWater.length>0){
      setData({item:useSelectorItem.flowingWater});
    }else {
      setYear(times.split('-')[0] + '年');
      setmon(times.split('-')[1] + '月');
      getList(times, lastM);
    }
  })
  const type = Taro.getStorageSync(Type);
  setIdentity(type)
  const getList = (times?:string, lastM?:string)=>{
    console.log(useSelectorItem.flowingWater, '111');
    let start_date, end_date;
    if (times && lastM){
      start_date = times;
      end_date = lastM;
    }else{
      start_date = time;
      end_date = lastTime;
    }
    let params = {
      identity: type,
      start_date,
      end_date,
    }
    bkBusinessAction(params).then(res=>{
      if(res.code === 200){
        setBusy(false)
        let yeartime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(0,4));
        let montime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(5, 7));
        setdateEnd(yeartime+'-'+montime);
        if(!res.data.first_business_month){
          setDatestart(yeartime+'-'+montime);
          changeIcon(times,res.data.first_business_month)
        }else{
          setDatestart(res.data.first_business_month);
          changeIcon(times,res.data.first_business_month)
        }
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
          // 设置折叠
          if(foldTime){
            for (let i = 0; i < res.data.data.length;i++){
              if ((Number(res.data.data[i].time.split('-')[0]) == Number(foldTime.split('-')[0]))&&(Number(res.data.data[i].time.split('-')[1]) == Number(foldTime.split('-')[1])) && (Number(res.data.data[i].time.split('-')[2]) == Number(foldTime.split('-')[2]))){
                res.data.data[i].click = true;
                setfoldTime('');
                break
              }
            }
          }else{
            res.data.data[0].click = true;
          }
          dispatch(setFlowingWater(res.data.data))
          setData({item:res.data.data})
        }else{
          setAllcheck(false);
          setIsCheckOut(false)
          setData({ item: [] })
        }
      }else{
        Msg(res.msg)
      }
    })
    .catch((e)=>{
      setBusy(true)
      setleftTime(false)
      setrightTime(false)
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
    console.log(dataClick,'1')
    dispatch(setFlowingWater(dataClick))
    setData({ item: dataClick})
  }
  // 点击详情
  const handleJump = (e,v,val)=>{
    // const arr = JSON.parse(JSON.stringify(data.item));
    // console.log(arr, 'xxx')
    // let ids: any[] = [];
    // let dataItem: any[] = [];
    // for (let i = 0; i < arr.length; i++) {
    //   for (let j = 0; j < arr[i].arr.length; j++) {
    //     if (arr[i].arr[j]) {
    //       dataItem.push(arr[i].arr[j]);
    //     }
    //     if (arr[i].arr[j].checkClick) {
    //       ids.push(arr[i].arr[j].id);
    //     }
    //   }
    // }
    if (isCheckOut){
      handleCheckbox(val);
      return;
    }else{
      Taro.navigateTo({
        url: `/pages/flowingWaterDetails/index?time=${v.time}&id=${val.id}&week=${v.week}`
      })
    }
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
    dispatch(setFlowingWater(item))
    setData({item})
  }
  const handleCheckboxBtn = (type:number)=>{
    // 0ture 1false
    if(type === 0){
      setisSwipe(true);
      setIsCheckOut(true)
      setisPicker(true);
    }else{
      setisSwipe(false);
      setisPicker(false);
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
    if(e.text == '删除'){
      Taro.showModal({
        content:'数据一经删除将无法恢复。请谨慎操作哦！',
        showCancel: true,
        confirmColor:'#0099FF',
        cancelColor:'#797979',
        success:(res)=>{
          if (res.confirm == true) {
            bkDeleteBusinessAction(params).then(res => {
              if (res.code === 200) {
                if(useSelectorItem.flowingWater.length>0){
                  useSelectorItem.flowingWater.forEach((element,dex) => {
                    element.arr.forEach((item,index) => {
                      if(item.id == v.id){
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
                setData({item:useSelectorItem.flowingWater});
                Msg('删除成功')
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
    if(busy) return;
    console.log(e);
    setTime(e.detail.value);
    let lastM = JSON.stringify(new Date(new Date(e.detail.value).setMonth(new Date(e.detail.value).getMonth() + 1))).slice(1, 11);
    setLastTime(lastM);
    setYear(e.detail.value.split('-')[0]+'年');
    setmon(e.detail.value.split('-')[1]+'月')
    getList(e.detail.value, lastM)
  }
  const changeIcon = (e,first_business_month) => {
    let earliest_month = first_business_month;
    let yeartime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(0,4));
    let montime = parseInt(JSON.stringify(new Date()).slice(1, 11).slice(5, 7));
    if(!earliest_month){
      setleftTime(false);
      setrightTime(false);
    }else{
      if(yeartime == Number(earliest_month.split('-')[0])){
        if(Number(earliest_month.split('-')[1])==montime){
          setleftTime(false);
          setrightTime(false);
        }else{
          if(Number(e.split('-')[1])==Number(earliest_month.split('-')[1])){
            setrightTime(true);
            setleftTime(false);
          }else if(Number(e.split('-')[1])==montime){
            setrightTime(false);
            setleftTime(true);
          }else{
            setrightTime(true);
            setleftTime(true);
          }
        }
      }else{
        if(Number(earliest_month.split('-')[0])==Number(e.split('-')[0])){
          setrightTime(true);
          Number(e.split('-')[1])>Number(earliest_month.split('-')[1])?setleftTime(true):setleftTime(false);
        }else if(Number(e.split('-')[0])==yeartime){
          setleftTime(true);
          Number(e.split('-')[1])<montime?setrightTime(true):setrightTime(false);
        }else{
          setleftTime(true);
          setrightTime(true);
        }
      }
    }
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
      dispatch(setFlowingWater(list))
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
      dispatch(setFlowingWater(list))
      setData({ item: list })
      setAllcheck(false);
    }
  }
  // 批量删除
  const handleAllDel = ()=>{
    const arr = JSON.parse(JSON.stringify(data.item));
    console.log(arr,'xxx')
    let ids:any[]=[];
    let dataItem:any[] = [];
    for(let i =0;i<arr.length;i++){
      for (let j=0;j<arr[i].arr.length;j++){
        if(arr[i].arr[j]){
          dataItem.push(arr[i].arr[j]);
        }
        if(arr[i].arr[j].checkClick){
          ids.push(arr[i].arr[j].id);
        }
      }
    }
    let params = {
      ids,
    }
    const num = dataItem.length;
    const delNum = ids.length;
    if (!delNum){
      Msg('请至少选择一条信息')
      return
    }
    // 总共多少笔
    Taro.showModal({
      content: `本页共${num}笔记工，即将删除选中的${delNum}笔。数据一经删除将无法恢复。请谨慎操作哦！`,
      showCancel: true,
      confirmColor:'#0099FF',
      cancelColor:'#797979',
      success: (res) => {
        if (res.confirm == true) {
          bkDeleteBusinessAction(params).then(res => {
            if (res.code === 200) {
              params.ids.forEach((id)=>{
                useSelectorItem.flowingWater.forEach((element,dex) => {
                  element.arr.forEach((item,index) => {
                      if(id==item.id){
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
              });
              Msg('删除成功');
              setData({item:useSelectorItem.flowingWater});
              setAllcheck(false);
              setIsCheckOut(false)
              setisPicker(false)
              setisSwipe(false);
            } else {
              Msg(res.msg)
            }
          })
        }
      }
    })
    // bkDeleteBusinessAction(params).then(res=>{
    //   if(res.code === 200 ){
    //     getList(time, lastTime)
    //   }else{
    //     Msg(res.msg)
    //   }
    // })
  }
  console.log(data,'data')
  // 记工
  const handleAddJump = ()=>{
    if(ishandleJump){
      setishandleJump(false);
      let type = Taro.getStorageSync(Type);
      if(identity==1){
        bkGetProjectTeamAction({}).then(res => {
          if (res.data.length === 0) {
            setishandleJump(true)
            setCreateProjectDisplay(true)
          } else {
            setishandleJump(true)
            dispatch(setFlowingWater([]))
            Taro.redirectTo({url:`/pages/recorder/index?type=${type}`});
            // userRouteJump(`/pages/recorder/index?type=${type}`)
          }
        })
      }else{
        setishandleJump(true)
        dispatch(setFlowingWater([]))
        Taro.redirectTo({url:`/pages/recorder/index?type=${type}`});
      }
    }
  }
  // 关闭创建项目
  const handleCreateProjectClose = () => {
    setCreateProjectDisplay(false)
    setModel({ groupName: '', teamName: '' })
  }
  // 弹框输入
  const handleInput = (type: string, e) => {
    let data = JSON.parse(JSON.stringify(model));
    data[type] = e.detail.value;
    setModel(data);
  }
  // 确认弹框
  const handleAddProject = () => {
    let params = {
      group_name: model.groupName,
      team_name: model.teamName,
    }
    bkAddProjectTeamAction(params).then(res => {
      if (res.code === 200) {
        setProject(false);
        setModel({ groupName: '', teamName: '' })
        let type = Taro.getStorageSync(Type);
        dispatch(setFlowingWater([]))
        userRouteJump(`/pages/recorder/index?type=${type}`)
      } else {
        Msg(res.msg);
        return;
      }
    })
  }
  // 填写项目返回上一步
  const handleBack = () => {
    setProject(false)
    setCreateProjectDisplay(true)
  }
  const toFixedFn = (num: any) => {
    let f = parseFloat(num);
    if (isNaN(f)) {
      return false;
    }
    f = Math.round(num * 1000) / 1000;
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    // console.log(f,'ffff')
    s = s.substring(0, s.indexOf(".") + 3);
    return s;
  }
  return(
    <context.Provider value={value}>
    <View className='flowingWater'>
      <View className='time'>
        <Picker
          disabled={isPicker}
          mode='date'
          fields='month'
          start={datestart}
          end={dateEnd}
          onChange={(e) =>handelChangeTime(e)}
          value={vals}
        // range={timeList}
        // onColumnChange={(e) => handlebindcolumnchange(e)}
        >
            {/* <Text className='time-color'>{year}<View><Image className='leftIcon' src={`${IMGCDNURL}left.png`} /></View>{mon}<View><Image className='rightIcon' src={`${IMGCDNURL}right.png`}/></View></Text> */}
        <View className='time-color'>
          <Text className='title_year'>{year}</Text>{leftTime && <Image src={`${IMGCDNURL}greyLeft.png`} className='leftIcon' style={{visibility: leftTime?'visible':'hidden'}} />}
          {mon}{rightTime && <Image className='righticon' src={`${IMGCDNURL}greyRight.png`} style={{visibility: rightTime?'visible':'hidden'}} />}
        </View>
        </Picker>
      </View>
      <View className='content'>
        <View>
          {busy && 
          <View className='busyBox'>
            <View>系统繁忙，刷新试试</View>
              <View className='refresh' onClick={() =>getList()}>刷新</View>
          </View>}
            {!busy && data.item && data.item.length>0 && data.item.map((v,i)=>(
            <View key={i+i} onClick={()=>handleClick(v)} className='list_item'>
              <View className='content-list'>
                <View className='content-list-left content-td'>
                  {v.click && <View className='content-list-icon-lowerIcon'><Image className='content-list-icon-lowerIcon-image' src={`${IMGCDNURL}lowerIcon.png`}/></View>}
                  {!v.click && <View className='content-list-icon-rightIcon'><Image className='content-list-icon-rightIcon-image' src={`${IMGCDNURL}rightIcon.png`}/></View>}
                  <View>
                    <View className='content-list-left-week'><Text>{v.day}</Text> {v.week}</View>
                    <View className='content-list-left-time'>{v.month}</View>
                  </View>
                </View>
                <View className='content-td'>
                  <View className='content-list-right-title'>借支</View>
                  <View className='content-list-right-money'>¥{v.total_borrow && (parseFloat(v.total_borrow)>9999999.99)?String(v.total_borrow).slice(0,7)+'...':toFixedFn(v.total_borrow)||'0.00'}</View>
                </View>
                <View className="content-td">
                  <View className='content-list-right-title'>工钱</View>
                  <View className='content-list-right-money'>¥{v.total_money && (parseFloat(v.total_money)>9999999.99)?String(v.total_money).slice(0,7)+'...':toFixedFn(v.total_money)||'0.00'}</View>
                </View>
              </View>
              {v.click && 
                <View>
                  {v.arr.map((val=>(
                    <View onClick={(e)=>{e.preventDefault(),e.stopPropagation()}} className='list_item_item'>
                    <AtSwipeAction
                      autoClose={false}
                      disabled={isSwipe}
                      onOpened={(e) => { e.preventDefault(),e.stopPropagation()}}
                      onClick={(e) => handleSwipeAction(e,val)}
                      options={[
                        { 
                          text: '修改',
                          style: {
                            backgroundColor: '#C8C7CF',
                            paddingLeft: '46rpx',
                            paddingRight: '46rpx'
                          },
                        },
                        {
                          text: '删除',
                          style: {
                            backgroundColor: '#FF4949',
                            paddingLeft: '46rpx',
                            paddingRight: '46rpx'
                          }
                        }
                      ]}
                    >
                    <View key={val.id} className='content-list-subclass' onClick={(e)=>handleJump(e,v,val)}>
                      <View className='content-list-subclass-left'>
                            {isCheckOut && <View className='checkboxitem'><Checkbox checked={val.checkClick} className='checkbox' color='#0099FF' onClick={(e) => { e.stopPropagation(); handleCheckbox(val) }} value={v.checkClick} /></View>}
                        {identity == 1?
                        <View className=''>
                          <View>{val.workername || '-'} {(val.note || val.view_images.length>0)&&<Text className='icon leader-icon'>备</Text>}</View>
                          <View className='content-list-subclass-left-title'>我在{val.group_info}对Ta记了一笔
                          {val.business_type == '1' ? '点工' : (val.business_type == '2'?'包工':'借支') }
                          </View>
                        </View>
                        :<View className="worker">
                          <View className='content-list-subclass-left-list'>我在{val.group_info}记了一笔
                          {val.business_type == '1' ? '点工' : (val.business_type == '2' ? '包工' : '借支')}
                          </View>
                          <View className='workericon'>
                            {(val.note || val.view_images.length>0)&&<Text className='icon'>备</Text>}
                          </View>
                        </View>}
                      </View>
                      <View className={val.business_type == '3'?'content-list-subclass-borrow':'content-list-subclass-money'}>
                        <Text>¥{val.money && (parseFloat(val.money) > 9999999.99) ? String(val.money).slice(0, 7) + '...' : toFixedFn(val.money) || '0.00'}</Text>
                        <View className="moneyicon"></View>
                      </View>
                    </View>
                    </AtSwipeAction>
                    </View>
                  )))}
                </View>
              }
            </View>
          ))}
        </View>
        {! busy && data.item.length === 0 &&
        <View className='noData-box'>
          <View className='noData'>
            <View>本月您还没有记工哦~</View>
            <View>点击【去记工】按钮，添加您的记工信息</View>
            <View className='goRecordWorkBox'><View className='goRecordWork' onClick={handleAddJump}>去记工</View></View>
          </View>
        </View>
        }
      </View>
      {/* 多选 */}
      {!busy && !isCheckOut && data.item.length > 0 &&
        <View className='icon-box' onClick={()=>handleCheckboxBtn(0)}>
          <View className='icon-box-icon' ><Image className='icon-box-icon-image' src={`${IMGCDNURL}checkout.png`}/></View>
        <View>多选</View>
      </View>
      }
      {!busy &&isCheckOut && 
      <View className='footer-box'>
          <View className='footer-box-left' onClick={handleAllCheck}><Checkbox className='checkbox' checked={allcheck} value='' color='#0099FF'/>全选</View>
        <View className='footer-box-flex'>
          <View className='allDel' onClick={handleAllDel}>批量删除</View>
          <View className='close' onClick={()=>handleCheckboxBtn(1)}>取消</View>
        </View>
      </View>
      }
    </View>
      {/* 创建项目 */}
      <CreateProject display={createProjectDisplay} handleClose={handleCreateProjectClose} val={model && model.groupName} handleSubmit={() => { setCreateProjectDisplay(false), setProject(true) }} handleInput={handleInput} />
      {/* 填写班组 */}
      <ProjectModal display={project} handleSubmit={handleAddProject} handleInput={handleInput} teamName={model && model.teamName} handleBack={handleBack} handleClose={() => { setProject(false), setModel({ groupName: '', teamName: '' }) }} />
    </context.Provider>
  )
}
FlowingWater.config = {
  navigationBarTitleText: '记工流水',
} as Config