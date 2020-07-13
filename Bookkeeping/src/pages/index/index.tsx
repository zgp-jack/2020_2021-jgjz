import Taro, { useEffect,useState } from '@tarojs/taro'
import { View, Text, Picker, ScrollView,Image } from '@tarojs/components'
import { bkIndexAction, bkMemberAuthAction, bkUpdateBusinessNewAction } from '../../utils/request/index';
import { bkIndexTypeData  } from '../../utils/request/index.d'
import { useDispatch } from '@tarojs/redux'
import { UserInfo, MidData, Type } from '../../config/store'
import { setTypes } from '../../actions/type'
import { IMGCDNURL } from '../../config'
import Auth from '../../components/auth';
import { AtModal, AtBadge } from "taro-ui"
import Msg from '../../utils/msg'
import './index.scss'

  // 设置新手指引图片
const Images = [
  {
    url: `${IMGCDNURL}noviceGuidance1.png`,
    id:1
  },
  {
    url: `${IMGCDNURL}noviceGuidance2.png`,
    id: 2
  },
  {
    url: `${IMGCDNURL}noviceGuidance3.png`,
    id: 3
  },
  {
    url: `${IMGCDNURL}noviceGuidance4.png`,
    id: 4
  },
  {
    url: `${IMGCDNURL}noviceGuidance5.png`,
    id: 5
  }
]
export default function Index() {
  const dispatch = useDispatch()
  // 授权
  const [display,setDisplay] = useState<boolean>(true)
  const[vals,setVal] = useState<string>('')
  //获取当前时间
  const [time,setTime]= useState<string>('')
  //显示月份
  const [month, setMonth] = useState<string>('')
  // 记工时间
  const [start, setStart]  = useState<string>('')
  // 获取当前时间与当前是星期几
  const [week, setWeek] = useState<string>('')
  // 时间索引
  const [time_id,setTime_id] = useState<number[]>([0,0])
  // 时间选择
  const [timeList,setTimeList]= useState<any[]>([])
  // 工人还是班长
  const [type,setType] = useState<number>(0)
  // 按量记
  const [measureType, setMeasureType ] = useState<number>(0)
  // 数据列表
  const [data,setData] = useState<any[]>([{},{},{}])
  // 弹窗
  const [tips, setTips] = useState<boolean>(false);
  // 系统繁忙
  const [busy, setBusy] = useState<boolean>(false)
  // 身份弹框
  const [identity, setIdentity] = useState<boolean>(false)
  const [list,setList] = useState<any[]>([])
  // 云朵
  const [num,setNum] = useState<string>('0');  
  // 数据
  const [item,setItme] = useState<any>()
  const [image, setImage] = useState<any>(Images[0].url)
  // 设置不是第一次获取数据
  const [repeat, setRepeat] = useState<boolean>(false)
  // 关闭图片
  const [closeImage, setCloseImage] = useState<boolean>(true);
  const getDate = ()=>{
    const date = new Date().getDay();
    const time = new Date();
    const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    const week = weeks[date];
    const newTime = time.getFullYear() + '-' + addZero(time.getMonth() + 1) 
    // + '-' + addZero(time.getDate())
    console.log(newTime,'time')
    setTime(newTime);
    setMonth(addZero(time.getMonth() + 1))
    // 先写死
    setStart(newTime)
    setWeek(week);
    return newTime;
  }
  const addZero = (num) => {
    if (parseInt(num) < 10) {
      num = '0' + num;
    }
    return num;
  }
  useEffect(()=>{
    // 判断有没有用户信息没有就显示
    // 获取缓存信息
    let type = Taro.getStorageSync(Type);
    console.log(type,'type ')
    // Taro.setStorageSync(Type, e);
    setType(type)
    let userInfo = Taro.getStorageSync(UserInfo);
    if(!userInfo){
      setDisplay(true);
      return
    }else{
      setDisplay(false)
    }
    dispatch(setTypes(type))
    // Taro.setStorageSync(Type, type)
    // 每个请求都要传type直接存缓存
    // const user = {
    //   userId: '20000261',
    //   token: '0d4bbd7cd1f5b4e3b69f60dc8d1b0158',
    //   tokenTime: 1592394794,
    //   uuid: '1592304868741974',
    //   login:1,
    //   type,
    // }
    // Taro.setStorageSync(UserInfo, user)
    // bkMemberAuthAction
    let midParams={
      mid: userInfo.userId,
    }
    bkMemberAuthAction(midParams).then(res=>{
      if(res.code !== 200){
        Msg(res.msg)
      }else{
        Taro.setStorageSync(MidData, res.data)
      }
    })
    getData();
  },[])
  // 获取首页数据
  const getData = ()=>{
    // const
    let type = Taro.getStorageSync(Type);
    console.log(type,'sss')
    if(!type){
      setIdentity(true)
      return
    }
    setType(type);
    // 没有选择角色
    if (type ===0){
      setIdentity(true)
    }
    let changeTime;
    if (!repeat){
      changeTime = getDate();
    }else{
      changeTime = time;
    }
    let params = {
      time: changeTime,
      identity: type,
    }
    bkIndexAction(params).then(res => {
      if (res.code === 200) {
        console.log(res.data);
        setItme(res.data);
        setNum(res.data.count_is_new);
        if (Array.isArray(res.data.business_list.data)){
          if (res.data.business_list.data){
            setList(res.data.business_list.data)
          }else{
            setList([])
          }
        } else if (res.data.business_list.data.constructor === Object){
          if (res.data.business_list.data.data[0].arr) {
            setList(res.data.business_list.data.data[0].arr)
          }else{
            setList([])
          }
        }
      } else {
        Msg(res.msg);
      }
    })
  }
  // 选择时间
  const handleChangeTime = (e)=>{
    console.log(e);
    setVal(e.detail.value)
    setTime(time);
    setRepeat(true);
  }
  // 点击提示
  const handelTps = ()=>{
    bkUpdateBusinessNewAction('').then(res=>{
      console.log(res,'res')
      if(res.code === 200){
        
      }
    })
    Msg(`您完成了[ ${num} ]条记工信息的备份，数据安全不丢失~`);
  }
  // 切换角色
  const handelChange = (e)=>{
    let msg = e === 1 ? '开始为自己记工吧' :'开始为工人记工吧'
    Taro.setStorageSync(Type, e);
    Msg(msg)
    setType(e);
    getData();
  }
  const getNextPageData = ()=>{
    console.log(31231)
  }
  // 跳转
  const userRouteJump = (url:string)=>{
    Taro.navigateTo({
      url:url
    })
  }
  // 弹窗选择
  const handleType = (state:number)=>{
    if (state === 1){
      setType(1)
    }else if(state === 2){
      
    }
    setTips(false)
  }
  console.log(item)
  const handleGoback = ()=>{
    Taro.navigateBackMiniProgram({
      // appId:'',
      // path: '/pages/index/index',
      // envVersion: 'trial',
    })
  }
  // 点击图片
  const hanleImage = (v:any)=>{
    console.log(v);
    let url;
    if (v !== Images[Images.length-1].url){
      for(let i =0;i<Images.length;i++){
        if(v === Images[i].url){
          url = Images[i+1].url
        }
      }
    }else{
      // 关闭
      setCloseImage(true);
      // 并开启选择身份
      getData();
    }
    console.log(url,'url')
    setImage(url)
  }
  // 关闭授权
  const handleClose = (e)=>{
    setDisplay(e);
  }
  const handleCallback = ()=>{
    // 打开新手指引
    setCloseImage(false);
    setDisplay(false)
  }
  //身份
  const handleChangeRole = (e:any)=>{
    console.log(e,'aaasdasdsadas');
    setType(e);
    setIdentity(false)
    Taro.setStorageSync(Type,e);
    getData();
  }
  console.log(list,'lsit')
  console.log(!busy,'busy')
  return (
    <View className='index-content'>
      <Image src={image} className={closeImage ?'noImages':'images'} onClick={()=>{hanleImage(image)}}/>
      {/* 头部 */}
      <View className='top'>
        <Image src={`${IMGCDNURL}background.png`} className='top_img'/>
        <View className='heard'>
          <View className='heard-left'>
            <Picker
              start={start}
              end={time}
              mode='date'
              fields='month'
              onChange={(e) => handleChangeTime(e)}
              value={vals}
              // range={timeList}
              // onColumnChange={(e) => handlebindcolumnchange(e)}
            >
              <Image src={`${IMGCDNURL}left.png`} className='leftIcon' />{month}月<Image className='righticon' src={`${IMGCDNURL}right.png`}/>
            </Picker>
          </View>
          {/* <Image src={`${IMGCDNURL}user.png`}/> */}
          {type === 1 ? 
            <View className='heard-middle'>我是班组长<Text className='switch' onClick={() => { handelChange(2) }}><Text className='test'/>切换 </Text></View> : 
            <View className='heard-middle'>我是工人<Text className='switch' onClick={() => { handelChange(1) }}><Text className='test'/>切换</Text></View>}
          <View onClick={handelTps} className='cloud'>
            <Image src={`${IMGCDNURL}cloud.png`} className='heard-right'>
              <AtBadge value={num} maxValue={99} className='AtBadge'/>
            </Image>
          </View>
        </View>
        <View className='moneyList'>
          <View><Image className='moneyIcon' src={`${IMGCDNURL}money.png`}/>工钱</View>
          <View><Image className='moneyIconPay' src={`${IMGCDNURL}money1.png`}/>借支</View>
        </View>
        <View className='money'>
          <View>{item && item.money || 0}</View>
          <View>{item && item.borrow || 0}</View>
        </View>
        <View className='typeList'>
          <View>上班<Text className='num'>{item && item.work_time || 0}</Text></View>
          <View>加班<Text className='num'>{item && item.overtime || 0}个工</Text></View>
          <View>按量记
            {measureType === 0 ? <Text className='num'>3笔</Text> : <Text className='num'>1000平方米</Text>}
          </View>
        </View>
        <View className='yun'><Image className='yun-img' src={`${IMGCDNURL}backgroundCloud.png`}/></View>
        <View className='recordBox'>
          <View className='eventList'>
            <View className='eventList-left' onClick={() => userRouteJump('/pages/flowingWater/index')}>
              <View className='eventList-icon'><Image className='eventList-icon-image' src={`${IMGCDNURL}recorder.png`}/></View>
                <View>记工流水</View>
              </View>
              <View className='' onClick={() => userRouteJump('/pages/attendanceSheet/index')}>
              <View className='eventList-icon-attendance'><Image className='eventList-icon-attendance-image' src={`${IMGCDNURL}attendance.png`}/></View>
                <View className='' >考勤表</View>
              </View>
          </View>
          <View className='btnBox'>
            <View className='btn'>
              {item && item.business_list.data.length === 0 ? <Text onClick={() => userRouteJump(`/pages/recorder/index?type=${type}`)}> 记工<Text className='btn-title'>(点工 包工 借支)</Text></Text> : <Text onClick={() => userRouteJump(`/pages/recorder/index?type=${type}`)}> 再记一笔<Text className='btn-title' onClick={() => userRouteJump(`/pages/recorder/index?type=${type}`)}>(点工 包工 借支)</Text></Text>}
            </View>
            <View className='notepad'>
              <View className='notepad-Icon'><Image className='notepad-Icon-iamge' src={`${IMGCDNURL}notepad.png`}/></View>
              <View onClick={() => userRouteJump(`/pages/notepad/index`)}>记事本</View>
            </View>
          </View>
        </View>
        {/* <View className='backgroundCloud'></View> */}
      </View>
      <View className='content'>
        <View className='backgroundCloud'></View>
        <View className='content-title'>今日 <Text className='content-time'>{time} {week}</Text></View>
        {busy && 
          <View className='busyBox'>
            <View>系统繁忙，刷新试试</View>
            <View className='refresh'>刷新</View>
          </View>
        }
        {type === 1 && list.length>0  && !busy && 
          <View>
            <ScrollView
              className='content-list-box'
              scrollY
              refresherEnabled
              lowerThreshold={200}
              onScrollToLower={() => getNextPageData()}
            >
            {list.map((v,i)=>(
                <View key={i+i} className='content-list'>
                  {/* {v.arr.map(val=>( */}
                    <View>
                    <View className='content-list-flex'>
                      <View>{v.workername}</View>
                      <View className='orgion'>¥{v.money}</View>
                    </View>
                      <View className='details'>我在[{v.group_info}]项目组对{v.workername}记了-笔包工</View>
                    </View>
                  {/* // ))} */}
                </View>
              ))}
            </ScrollView>
          </View>
        }
        {type === 2 && list.length>0 && !busy && 
          <View>
            <ScrollView
              className='recruit-lists-containerbox'
              scrollY
              refresherEnabled
              lowerThreshold={200}
              onScrollToLower={() => getNextPageData()}
            >
            {list.map((v, i) => (
                <View key={i + i} className='content-list'>
                  <View className='content-list-flex'>
                    <View>{v.workername}</View>
                    <View className='orgion'>¥{v.money}</View>
                  </View>
                  <View className='details'>我在[x ]项目组对Ta记了-笔包工</View>
                </View>
              ))}
            </ScrollView>
          </View>
        }
        {item && list.length === 0 && !busy &&  
          <View className='content-noList'>
            <View>您今天还没有记工~</View>
            <View>点击上方[记工]按钮，开始记工</View>
          </View>
        }
      </View>
      <View className='jumpBox'>
        <View className='jumpItem' onClick={() => userRouteJump('/pages/feedback/index')}>
          <View className='ptBox'>
            <View className='jumpItem-icon'><Image className='jumpItem-icon-image' src={`${IMGCDNURL}work.png`}/></View>
            <View className='jumpItem-title'>意见</View>
          </View>
        </View>
        <View className='jumpItem'>
          <View className='ptBox'>
            <View className='jumpItem-icon-goback'><Image className='jumpItem-icon-goback-image' src={`${IMGCDNURL}goBack.png`}/></View>
          <View className='jumpItem-title' onClick={handleGoback}>鱼泡网</View>
          </View>
        </View>
      </View>
      {/* 弹框 */}
      <AtModal isOpened={tips} >
        <View className='AtModal'>
          <View className='AtModal-top'>当前是<Text className='atModal-name'>【班组长】</Text>身份</View>
          <View className='mtList'>与上一次记工身份不一致，是否<Text className='atModal-change'>切换?</Text></View>
          <View className='atModal-list' onClick={()=>handleType(0)}>不切换</View>
          <View className='atModal-list' onClick={() => handleType(1)}>切换成【工人】</View>
          <View className='atModal-list' onClick={() => handleType(2)}>不再提醒</View>
        </View>
      </AtModal>
      {/* 选择身份弹窗 */}
      <AtModal isOpened={identity} >
        <View className='useAtModal'>
          <View className='useAtModal-title'>请根据需要选择您的身份</View>
          <View className='useAtModal-tips'>温馨提示：选对身份，才能使用想要的功能哦</View>
          <View className='useAtModal-box'>
            <View onClick={()=>handleChangeRole(1)}>
              <View className='useAtModal-monitor'><Image className='useAtModal-monitor-img' src={`${IMGCDNURL}banzhu.png`}/></View>
              <View className='useAtModal-blued'>我是班组长</View>
              <View>对工人记工</View>
              <View className='useAtModal-look'>查看工人的考勤表</View>
            </View>
            <View onClick={() => handleChangeRole(2)}>
              <View className='useAtModal-worker'><Image className='useAtModal-worker-img' src={`${IMGCDNURL}gongren.png`}/></View>
              <View className='useAtModal-blued'>我是工人</View>
              <View>对自己记工</View>
              <View className='useAtModal-look'>查看自己的考勤表</View>
            </View>
          </View>
        </View>
      </AtModal>
      {/* 授权 */}
      <Auth display={display} handleClose={handleClose} callback={handleCallback}/>
    </View>
  )
}
// Index.config = {
//   navigationBarTitleText: '首页',
// } as Config