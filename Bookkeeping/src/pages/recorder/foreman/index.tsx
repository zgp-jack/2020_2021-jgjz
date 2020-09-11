import Taro, { Config, useEffect, useState, createContext, useDidShow, useShareAppMessage } from '@tarojs/taro'
import { View, Text, Image, RadioGroup, Radio, Input, Textarea, Checkbox, CoverView, CoverImage, ScrollView } from '@tarojs/components'
import ProjectModal from '../../../components/projectModal'
import WordsTotal from '../../../components/wordstotal'
import { bkGetProjectTeamAction } from '../../../utils/request/index'
import ImageView from '../../../components/imageview';
import UploadImgAction from '../../../utils/upload'
import RecorderPopup from '../../../components/recorderPopup'
import Quantities from '../../../components/quantities';
import WorkOvertime from '../../../components/workOvertime'
import WorkingHours from '../../../components/workingHours'
import CreateProject from '../../../components/createProject';
import CalendarModal from '../../../components/calendar';
import WageStandard from '../../../components/wageStandard';
import AddMember from '../../../components/addMember';
import WagesModal from '../../../components/wagesModal';
import userForeman from '../../../hooks/foreman';
import { AtDrawer, AtFloatLayout } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import EditProject from '../../../components/editProject';
import { setDataList } from '../../../actions/list'
import { setClickTIme } from '../../../actions/clickTIme'
import { IMGCDNURL } from '../../../config'
import classnames from 'classnames'
import { Type } from '../../../config/store'
import { statistics, queyElementYPosition, postErrorCountFn } from '../../../utils/v'
// import RecorderPopup from '../../../components/recorderPopup';
import Msg from '../../../utils/msg';
import './index.scss'

export interface Injected {
  dataArr: any,
  handleCheckbox:(e:any)=>void,
  memberList:any,
  setMemberList:(e:any)=>void,
}
export const context = createContext<Injected>({} as Injected)
export default function Foreman() {
  const dispatch = useDispatch()
  // 获取存入的公用内容
  const useSelectorItem = useSelector<any, any>(state => state)
  const { model, setModel, handleInput,blurhandleContent, handleAddProject, project, setProject, handleworkOvertime, setWorkOvertimeDisplay, workOvertimeDisplay,
    workingHoursDisplay, setWorkingHoursDisplay, timeType, handleWorkingHours, timeArr, addWorkArr, handleWorkOvertimeOk, company, handleQuantities,
    quantitiesDisplay, setQuantitiesDisplay, unit, borrowing, setBorrowing, handleRadioBorrowing, workerItem, setWorkerItem, handleEstablish,
    addMemberDisplay, setAddMemberDisplay, handleDel, handleDelList, delType, setDeldelType, handleAddStandard, wagesModalDisplay, setWagesModalDisplay, wageStandardDisplay, setWageStandardDisplay, wageStandard, handleWageStandard, handlePreservation, recorderTypeArr,
    setRecorderTypeArr, handleCalendar, setProjectArr,projectArr, handleProject, show, setShow, workerList, setWorkerList, handleCheckbox, memberList, setMemberList, standard, handleAddWage, handleWageStandardRadio, handleOpenWagesModal, moneyList, handleEditWages, handleEditWageStandard,
    tab, handleAtSwitch, handleDelProject, editProjectDisplay, setEditProjectDisplay, handleEditProject, handleEditProjectModal, editProjectData,
    handleEditProjectData, handleSetWagesModal, handleWagesList, setWorkList, handleCheckboxStandard, groupInfo, image, setImage, bkGetWorker,
    contractorArr, setContractorArr, num, handleWorkerItem, timeData, setTimeData, handleAllChange, clickNum, clickModalNum, refresh,
    setRefresh, handleLongClick, identity, foremanTitle, handleAllClick, setContractor, handleRadio, contractor, handleAdd, recorderType, setRecorderType, calendarDays, setCalendarDays, clickData, setClickData, handleClickCalendar, time, getMonthDaysCurrent, arr, handleCalendarClose,
    handleChangeTime, calendarModalDisplay, handleCalendarSub, setCalendarModalDisplay, onScrollToUpper, onScrollToLower, onTouchEnd, onTouchStart, 
    onLongPress, setClickModalNum, display, setDisplay, allClick, checkAll, handleClckTabber, noSet, clickDay, setClickDay, clickTime, setClickTime, setAddWorkArr, setTimeArr, projectId, setProjectId, cacheWage, setCacheWage, setWageStandard, isdisable, setIsdisable, setTab, jumpMonth, handleInputAdd, handleDelInput, noCalendarDay, leftTime, rightTime, setleftTime, setrightTime, toDayString, isDel, changeId, calendar, handleSuiper, swiperIndex, calendarState, proList, setProList, generateThreeMonths, getThreeMonths, setDel, boxValue, setBoxValue
  } = userForeman();
  
  // const [contractor, setContractor] = useState<number>(0)
  
  // 创建项目引导
  const [createProjectDisplay, setCreateProjectDisplay] = useState<Boolean>(false)
  // 项目列表取消，删除/修改
  const [edit,setEdit] = useState<boolean>(false)
  // 项目名称
  const [projectList, setProjectList]= useState<any>([{},{}])
  // 创建项目弹窗与备注显示
  const [iscreatproject, setIscreatproject] = useState<boolean>(false)
  // useDidShow(()=>{
  //   if (useSelectorItem.workerList.length>0){
  //     setWorkerItem(useSelectorItem.workerList)
  //   }
  // })
  const [editProject, setEditProject] = useState<any>({
    group_info:'',
    team_name:'',
    group_name:'',
  })
  const [autoFocus, setAutoFocus] = useState<boolean>(false)
  // 距离顶部
  const [top,setTop] = useState<number>(0);
 
  // 获取数据
  // useEffect(()=>{
  //   // 获取项目列表
  //   // bkGetProjectTeam();
  // },[])
  // useEffect(()=>{
  //   // var query = Taro.createSelectorQuery()
  //   // query.select('#box').boundingClientRect(function (res) {
  //   //   console.log(res[0],'boxxxxx');
  //   // }).exec();
  //   const query = Taro.createSelectorQuery()                // 创建节点查询器 query
  //   query.select(`#box`).boundingClientRect()
  //   query.selectViewport().scrollOffset()
  //   query.exec(function (res) {
  //     //res就是 所有标签为mjltest的元素的信息 的数组
  //     console.log(res,'撒打算的阿克苏基督教卡');
  //     //取高度
  //     console.log(res[1].scrollTop,'312313');
  //     setTop(top);
  //   })
  // }, [top])
  useShareAppMessage(() => {
    return {
      title: '记工记账怕丢失？用鱼泡网记工，方便安全！数据永不丢失~',
      imageUrl: `${IMGCDNURL}shareIconImg.png`,
      path: `/pages/index/index`
    }
  })
  // 获取项目列表
  const bkGetProjectTeam = ()=>{
    let params={}
    bkGetProjectTeamAction(params).then(res=>{
      if(res.code === 200){
        if(res.data.length>0){
          for(let i =0;i<res.data.length;i++){
            if ((res.data[i].group_id +','+ res.data[i].id) == projectId){
              res.data[i].click = true;
            }else{
              res.data[i].click = false;
            }
          }
          setProList(false)
        }else{
          setProList(true)
        }
        setProjectArr(res.data);
      }
    })
  }
  // 切换tabber
  // const handleClckTabber = (v) => {
  //   console.log(v)
  //   const recorderTypeArrList = JSON.parse(JSON.stringify(recorderTypeArr.item));
  //   const data = recorderTypeArrList.map(val => {
  //     if (val.id === v.id) {
  //       val.click = true
  //       setRecorderType(val.id)
  //       // if(v.id===3){
  //         // 设置日历rudux为空
  //         // dispatch(setClickTIme([]))
  //       // }
  //     } else {
  //       val.click = false
  //     }
  //     return val;
  //   });
  //   setRecorderTypeArr({ item: data })
  // }
  // 上传图片
  const userUploadImg = (i: number = -1) => {
    setDeldelType(false);
    handleDel(1);
    setRefresh(true);
    let num = 4 - image.item.length;
    UploadImgAction(num).then(res => {
      if (Array.isArray(res)){
        let imageItem:any[]=[];
        for (let i =0;i<res.length;i++){
          let obj = {
            url: res[i].url,
            httpurl: res[i].httpurl
          }
          imageItem.push(obj);
        }
        if (image.item.length == 0) {
          setImage({item: [...image.item, ...imageItem] })
        } else {
          setImage({ item: [...image.item, ...imageItem] })
        }
      }else{
          let imageItem = {
            url: res.url,
            httpurl: res.httpurl
          }
          setImage({ item: [...image.item, imageItem] })
      }
    })
  }
  // 用户删除图片
  const userDelImg = (i: number) => {
    if (!image.item) return
    let bakModel = JSON.parse(JSON.stringify(image.item))
    bakModel.splice(i, 1)
    setImage({ item: bakModel })
  }
  // 点击保存成功弹窗
  const handleRecorderPopup = (type:number)=>{
    const foldTime = JSON.parse(JSON.stringify(jumpMonth));
    const time = foldTime.split('-')[0] + '-' + foldTime.split('-')[1];
    // 跳转
    if(type === 1){
      Taro.redirectTo({
        url: `/pages/attendanceSheet/index?timeMon=${time}`
        })
    }else{
      // Taro.navigateBack({
      //   delta: 1
      // })
      Taro.redirectTo({
        url: `/pages/flowingWater/index?timeMon=${time}&foldMon=${foldTime}`
      })
    }
    setTimeout(() => {
      setIsdisable(false)
    });
    setDisplay(false)
  }
  // 关闭选择单位
  const handleClose = ()=>{
    setQuantitiesDisplay(false)
    setTimeout(() => {
      setIsdisable(false)
    });
  }
  //关闭加班时长
  const handleWorkOvertimeClose = ()=>{
    const data = JSON.parse(JSON.stringify(model));
    const title = data.duration;
    setModel({ ...data, modalDuration: title });
    setWorkOvertimeDisplay(false)
    setTimeout(() => {
      setIsdisable(false)
    });
    // 上班时长
    const timeArrs = JSON.parse(JSON.stringify(timeArr));
    // 获取加班时长
    const addWorkArrs = JSON.parse(JSON.stringify(addWorkArr));
    const clickDayItem = JSON.parse(JSON.stringify(clickDay));
    const clickTimeItem = JSON.parse(JSON.stringify(clickTime));
    console.log(addWorkArrs,'addWorkArrs');
    console.log(clickTimeItem,'clickTimeItem');
    console.log(timeArrs,'timeArrs')
    console.log(clickDayItem,'clickDayItemclickDayItem')
    // 上班时长
    if (clickDayItem){
      for (let i = 0; i < timeArrs.length; i++) {
        timeArrs[i].click = false
        if (timeArrs[i].id == clickDayItem.id){
          if (clickDayItem.id !==4 ){
            timeArrs[i].click = true
          }else{
            timeArrs[i] = { id: 4, name: clickDayItem.name, click: true, num: clickDayItem.num };
          }
        }
      }
    }
    console.log(timeArrs,'timeArrs');
    // 加班时长
    if (clickTimeItem) {
      for (let i = 0; i < addWorkArrs.length; i++) {
        addWorkArrs[i].click = false
        if (addWorkArrs[i].id == clickTimeItem.id) {
          if (clickTimeItem.id !== 2) {
            addWorkArrs[i].click = true
          } else {
            addWorkArrs[i] = { id: 2, name: clickTimeItem.name, click: true, num: clickTimeItem.num };
          }
        }
      }
    }
    console.log(timeArrs,'timeArrs')
    console.log(addWorkArrs,'addWorkArrs')
    setTimeArr(timeArrs);
    setAddWorkArr(addWorkArrs)
  }
  // 关闭上班时长
  const handleWorkingHoursClose = ()=>{
    setWorkingHoursDisplay(false);
    setWorkOvertimeDisplay(true)
    // setIsdisable(false)
  }
  // 引导创建项目
  const handleCreateProjectClose = ()=>{
    setCreateProjectDisplay(false)
    setTimeout(() => {
      setIsdisable(false)
    });
    setIscreatproject(false);
    const data = JSON.parse(JSON.stringify(model));
    setModel({ ...data, groupName: '', teamName: ''})
  }
  // 关闭日历
  const handleCalendarModalDisplayClose = ()=>{
    // setCalendarModalDisplay(false);
    // 并清空
    setTimeData([])
  }
  // 关闭工资标准
  const handleWageStandardClose = ()=>{
    let type = Taro.getStorageSync(Type);
    let data ={
      data: [
        { id: 1, name: '按小时算', click: true },
        { id: 2, name: '按天算', click: false },
      ],
      // 上班模板
      work: 0,
      // 上班金额
      money: 0,
      // 加班钱（小时）
      addWork: 0,
      // 小时/天
      type: 1,
      // 加班多少小时算一台呢
      day: 0,
      // 自动换算加班多少每小时多少钱
      dayAddWork: 0,
      state: '',
      group_info: '',
      id: '',
      worker_id: '',
    }
    let cacheWageItem;
    if (cacheWage){
      cacheWageItem = JSON.parse(JSON.stringify(cacheWage));
    }else{
      cacheWageItem = data;
    }
    const wageStandardItem = JSON.parse(JSON.stringify(wageStandard));
    console.log(wageStandardItem,'wageStandardItem')
    if(type === 1){
      setWagesModalDisplay(true)
    }else{
      setWageStandard(cacheWageItem);
      setCacheWage(cacheWageItem);
    }
    setWageStandardDisplay(false)
    if(identity == 2){
      setTimeout(() => {
        setIsdisable(false)
      });
    }
  }
  // 关闭添加成员
  const handleAddMemberClose = ()=>{
    setAddMemberDisplay(false);
    // console.log(321312312312)
    // const item = JSON.parse(JSON.stringify(model));
    // setModel({ ...item, phone: '', userName:''})
  }
  // 关闭工资
  const handleWagesModalClose = ()=>{
    setWagesModalDisplay(false);
    setTab(0)
    setTimeout(() => {
      setIsdisable(false)
    });
    //清空选择人数
    setClickModalNum(0)
  }
  // 修改删除
  const handleEdit = (type:number)=>{
    if(type === 0 ){
      setEdit(true)
    }else{
      setEdit(false)
    }
  }
  // 上一步
  const handleBack = () => {
    setProject(false)
    setCreateProjectDisplay(true)
    setIsdisable(true)
  }
   // 跳转
  const userRouteJump = (url: string) => {
    Taro.navigateTo({
      url: url
    })
  }
  const value: Injected = {
    dataArr: workerList,
    handleCheckbox: (e)=>handleCheckbox(e),
    memberList: memberList,
    setMemberList: (e) => setMemberList(e),
  }
  // // 选择工人添加，没有选择项目无法选择
  // const handleAdd = ()=>{
  //   if (!model.name){
  //     Msg('请选择项目')
  //     return
  //   }
  //   bkGetWorker(groupInfo);
  //   userRouteJump(`/pages/addTeamMember/index?groupInfo=${groupInfo}`) 
  // }
  // 创建项目下一步
  const handleNext = ()=>{
    console.log(model.groupName,'model.groupName')
    if (model.groupName){
      setCreateProjectDisplay(false), setProject(true) 
      setIsdisable(true)
      setIscreatproject(false);
    }else{
      statistics('createProject') 
      postErrorCountFn();
      Msg('您还没有填写项目名称')
    }
  }
  // 填写班组关闭
  const handleProjectClose = ()=>{
    setProject(false)
    setTimeout(() => {
      setIsdisable(false)
    });
    const data = JSON.parse(JSON.stringify(model));
    setModel({ ...data, groupName: '', teamName:'' })
  }
  // 添加项目
  const handleAddProjectList = ()=>{
    // 判断大于十就能再添加项目饿了
    if (projectArr.length>9){
      // Msg('记工记账支持最多同时管理10个项目,请删除已结束项目,再添加新项目')
      Taro.showModal({
        // title:'系统提示',
        title:'',
        content:'记工记账支持最多同时管理10个项目，请删除已结束项目，再添加新项目。',
        showCancel:false,
        confirmColor:'#0099FF'
      })
      return
    }
    const data = JSON.parse(JSON.stringify(model));
    setModel({ ...data, groupName: '', teamName: '' })
    setCreateProjectDisplay(true), setShow(false);
    setIscreatproject(true);
  }
  const addZero = (num) => {
    if (parseFloat(num) < 10) {
      num = '0' + parseFloat(num);
    }
    return num;
  }
  const handleCurrent = ()=>{
    setDeldelType(false)
    handleDel(1)
    // setDel(false)
    // 打开日历如果上次点击默认打开最后一个日期的那个月份
    const data = JSON.parse(JSON.stringify(timeData));
    const nowYear = Number(toDayString.split('-')[0]);
    const nowMon = Number(toDayString.split('-')[1]);
    setIsdisable(true);
    setCalendarModalDisplay(true);
    console.log(data,'datataa')
    // if(data&&data.length>0){
    //   const end = data.pop();
    //   let time;
    //   if (end.constructor === Array){
    //     time = end[0].year + '-' + addZero(end[0].month) + '-' + addZero(end[0].date);
    //   }else{
    //     time = end.year + '-' + addZero(end.month) + '-' + addZero(end.date);
    //   }
    //   if(Number(time.split('-')[0])==(nowYear-1)&&Number(time.split('-')[1])==1){
    //     setleftTime(false);
    //   }else{
    //     setleftTime(true);
    //   }
    //   if(Number(time.split('-')[0])==nowYear&&Number(time.split('-')[1])==nowMon){
    //     setrightTime(false)
    //   }else{
    //     setrightTime(true)
    //   }
    //   console.log(time,'time')
    //   let dayObj = {
    //     date: time.split('-')[2],
    //     month: time.split('-')[1],
    //     year: time.split('-')[0],
    //   }
    //   const toDayObj = {
    //     date: time.split('-')[2],
    //     month: time.split('-')[1],
    //     year: time.split('-')[0],
    //   }
    //   // 判断打开的是本月还是其他月份做不同
    //   if (toDayObj.year == dayObj.year && toDayObj.month == dayObj.month ){
    //     generateThreeMonths(new Date(time))
    //   }else{
    //     getThreeMonths(new Date(time))
    //   }
    // }else{
      setleftTime(true);
      setrightTime(false);
      generateThreeMonths(new Date())
    // }
  }
// }
  const handleOpenProject = () => {
    setDeldelType(false);
    handleDel(1);
    setIsdisable(true);
    bkGetProjectTeam();
    setShow(true);
  }
  const handleOpenUnit = ()=>{
    setDeldelType(false);
    handleDel(1);
    setIsdisable(true);
    setQuantitiesDisplay(true)
  }
  const handleOnFocus = (type?:string)=>{
    console.log(1111,'111')
    setDeldelType(false)
    setDel(false)
    const arr = JSON.parse(JSON.stringify(workerItem));
    for(let i =0;i<arr.length;i++){
      arr[i].del = false;
    }
    setWorkerItem(arr);
    const value = JSON.parse(JSON.stringify(model));
    const item = JSON.parse(JSON.stringify(boxValue));
    if (type){
      if (value[type]){
        item[type] = value[type];
      }
      setBoxValue(item);
      // value[type] = '';
      // setModel(value);
    }
    // console.log(item,'itemitemitem');
  }
  const handleBlur = (type:string)=>{
    // const data = JSON.parse(JSON.stringify(model));
    // const item = JSON.parse(JSON.stringify(boxValue));
    // data[type] = item[type];
    // setModel(model);
    // item[type] = '';
    // setBoxValue(item);
  }
  return (
    <context.Provider value={value}>
      <View className={project || display || quantitiesDisplay || workOvertimeDisplay || workingHoursDisplay || createProjectDisplay || calendarModalDisplay || wageStandardDisplay || addMemberDisplay || wagesModalDisplay || editProjectDisplay || show ? 'foreman-content' :'foreman'}>
      {/* tabber */}
      <View>
        {/* <View className='tabfixed'> */}
        {/* {project || display || quantitiesDisplay || workOvertimeDisplay || workingHoursDisplay || createProjectDisplay || calendarModalDisplay || wageStandardDisplay || addMemberDisplay || wagesModalDisplay || editProjectDisplay || show ?  */}
          <View className='tabfixed'>
            <View className='tabber'>
              {recorderTypeArr.item.map(v => (
                <View className={v.click ? 'tabber-list-click' :'tabber-list'} key={v.id} onClick={() => handleClckTabber(v)}>
                  <View className='tabber-list-box'>
                    {v.click && 
                      <Image src={`${IMGCDNURL}groupIcon.png`} className='groupIcon' />
                    }
                    <View className={classnames({
                      'tabber-list-image-dian': v.id === 1,
                      'tabber-list-image-bao': v.id === 2,
                      'tabber-list-image-jie': v.id === 3,
                    })}>
                    {v.id === 1 && <Image src={`${IMGCDNURL}dian.png`} className='tabber-list-image-dian-img' />}
                    {v.id === 2 && <Image src={`${IMGCDNURL}bao.png`} className='tabber-list-image-bao-img' />}
                    {v.id === 3 && <Image src={`${IMGCDNURL}jie.png`} className='tabber-list-image-jie-img' />}
                    </View>
                    <View>{v.name}</View>
                  </View>
                </View>
              ))}
            </View>
          </View>
          {/* :<CoverView className='tabfixed'>
          <CoverView className='tabber'>
              {recorderTypeArr.item.map(v => (
                <CoverView className={v.click ? 'tabber-list-click' :'tabber-list'} key={v.id} onClick={() => handleClckTabber(v)}>
                  <CoverView className='tabber-list-box'>
                    <CoverView className={classnames({
                      'tabber-list-image-dian': v.id === 1,
                      'tabber-list-image-bao': v.id === 2,
                      'tabber-list-image-jie': v.id === 3,
                    })}>
                    {v.id === 1 && <CoverImage src={`${IMGCDNURL}dian.png`} className='tabber-list-image-dian-img' />}
                    {v.id === 2 && <CoverImage src={`${IMGCDNURL}bao.png`} className='tabber-list-image-bao-img' />}
                    {v.id === 3 && <CoverImage src={`${IMGCDNURL}jie.png`} className='tabber-list-image-jie-img' />}
                    </CoverView>
                    <CoverView>{v.name}</CoverView>
                  </CoverView>
                  {v.click && 
                    <CoverImage src={`${IMGCDNURL}groupIcon.png`} className='covergroupIcon' />
                  }
                </CoverView>
              ))}
          </CoverView></CoverView>} */}
        {/* </View> */}
        {/* 选择为包工的时候 */}
        {recorderType == 2 &&
          <View className='contractor'>
            <View className='check_title'>包工类型</View>
            <View className='radioList'>
              <RadioGroup className='radioList-box'>
                {contractorArr.item.map(v => (
                  <View onClick={() => handleRadio(v)}>
                  <Radio color='#0099FF' className='borrowing-Radio-list' checked={v.click} key={v.id}>{v.name}</Radio>
                  </View>
                ))}
              </RadioGroup>
            </View>
          </View>
        }
      </View>
      <View className='projectName'>
        <View className='publish-recruit-card'>
            <View className='publish-list-item border-item' onClick={handleOpenProject}>
            <Text className='pulish-list-title'>项目名称</Text>
            <Input
              className='publish-list-input'
              type='text'
              disabled
              placeholder='请选择项目名称'
              value={model && model.name}
            />
            {/* IconRight */}
              <View className='rightIconsBox'>
              <Image src={`${IMGCDNURL}iconsRIght.png`} className='rightIcons'/>
            </View>
            {/* <View className='rightIcon'/> */}
          </View>
        </View>
        {/* ===== */}
        {identity == 2 && 
        <View className='publish-recruit-card'>
            <View className='publish-list-item' onClick={() => { bkGetWorker(), userRouteJump(`/pages/addTeamMember/index?groupInfo=${groupInfo}&type=2`)}}>
            <Text className='pulish-list-title'>班组长</Text>
            <Input
              className='publish-list-input'
              type='text'
              disabled
              placeholder='请选择班组长'
              value={foremanTitle}
            />
              <View className='rightIconsBox'>
                <Image src={`${IMGCDNURL}iconsRIght.png`} className='rightIcons' />
              </View>
          </View>
        </View>
        }
        {identity == 1 && 
            <View className='workerBox'>
              <View className='workerBox-list' style={{paddingBottom:isDel?'20rpx':0}}>
                <View className='workerBox-list-title'>
                  <View>选择工人</View>
                  {/* <View className='workerBox-list-title-origin'>长按名字可修改/查看工资标准</View> */}
                  <View className='workerBox-list-title-origin-box'>
                  {(recorderType !== 3 && !(recorderType == 2 && contractor == 1) && !isDel) ?
                    <View className='workerBox-list-title-origin'>{!noSet ? '长按名字可修改/查看工资标准' : '工资如有变动，请长按头像修改'}</View> : <View> 
                      
                      {/* <View className='workerBox-list-title-origin-tips-list' style={{ marginTop: (recorderType !== 3 && !(recorderType == 2 && contractor == 1)) ? '' : '6rpx' }}><Text className='workerBox-list-title-origin-color'></Text>
                      {recorderType === 3 ? '表示当天已记过借支' : '表示当天已记过工'}
                    </View> */}
                    </View>
                  }
                  </View>
                </View>
              {
                !isDel?
                <View><View className='whole' onClick={(e) => { e.stopPropagation(), e.preventDefault(), handleAllChange() }}>{!allClick ?'全选':'取消全选'}</View></View>
                :
                ''
              }
              </View>
              {
                !isDel?
                <View className='workerBox-change'>
                <View>
                {/* {(recorderType !== 3 && !(recorderType == 2 && contractor == 1)) ? */}
                  <View className='workerBox-list-title-origin-tips' 
                  // style={{ marginTop: (recorderType !== 3 && !(recorderType == 2 && contractor == 1)) ? '' : '6rpx' }}
                  ><Text className='workerBox-list-title-origin-color'></Text>
                  {recorderType === 3 ? '表示当天已记过借支' : '表示当天已记过工'}
                </View>
                {/* :''} */}
                </View>
                <View>(已选{clickNum}人)</View>
              </View>
              :
              ''
              }
              <View className='workerItem'>
                {workerItem.map(v => (
                  <View 
                  // className='listPosition' 
                  // onClick={()=>{}}
                    // onTouchEnd={onTouchEnd}
                    // onTouchStart={onTouchStart}
                    className={v.discipline ? 'discipline' : 'listPosition'}
                    onLongPress={()=>handleOpenWagesModal(v)}
                    // onClick={()=>handleWorkerItem(v)}
                    onClick={v.del?()=>handleDelList(v):()=>handleWorkerItem(v)}
                    // onTouchStart={() => handleWorkerItem(v)} onLongPress={handleLongClick}
                  >
                    {v.id === 1 &&
                      <View >
                        <View 
                        className={v.click ? 'workerItem-list-first-click' : 'workerItem-list-first'} 
                        >
                        {v.name && v.name.toString().substring(v.name.length - 2)}
                        </View>
                        <View className='workerItem-list-title'>{v.name}</View>
                      </View>
                    }
                    {/* {v.id !== 1 && */}
                      <View className='userClick-box' >
                        <View 
                        className={classnames({
                          // 'workerItem-list-click': v.click,
                          'workerItem-list': v.id % 2 == 1 && v.id>100,
                          'workerItem-list-red': v.id % 2 == 0 && v.id>100,
                          'workerItem-list-origion': v.id % 2 == 1 && v.id < 100,
                          'workerItem-list-violet':  v.id % 2 == 0 && v.id < 100,
                        })}
                        >
                        {v.name && v.name.toString().substring(v.name.length - 2)}
                          <View className={v.click?'userClick':''}></View>
                        </View>
                        {/* 判断不是按量和借支的时候才能设置工资 */}
                      {(recorderType !== 3 && !(recorderType == 2 && contractor ==1) )&&!v.del && !v.set && 
                        <View 
                          className='workerItem-list-icon' onClick={(e) => { e.stopPropagation(), handleOpenWagesModal(v) }}
                        >
                          <Image className='workerItem-list-icon-img' src={`${IMGCDNURL}mark.png`}/>
                        </View>
                      }
                        {v.del && 
                          <View className='workerItem-list-icon-del' onClick={(e) => { e.stopPropagation(), handleDelList(v) }}>
                            <Image src={`${IMGCDNURL}reduce.png`} className='workerItem-list-icon-del-img'/>
                          </View>
                        }
                        <View className='workerItem-list-title'>{v.name}</View>
                      </View>
                  </View>
                ))}
                {delType && <View>
                <View className='discipline-del' onClick={() => handleDel(1)}>
                    <View className='workerItem-ok' >
                    <Image src={`${IMGCDNURL}ok.png`} className='workerItem-ok-img'/>
                    </View>
                    <View className='workerItem-list-title'>完成</View>
                  </View>
                </View>}
                {!delType &&
                  <View className='flex'>
                    <View className='listPosition' onClick={handleAdd} >
                      <View className='workerItem-add' >+</View>
                      <View className='workerItem-list-title'>添加</View>
                    </View>
                  <View className='listPosition' onClick={() => handleDel(0)}>
                      <View className='workerItem-del'>-</View>
                      <View className='workerItem-list-title'>删除</View>
                    </View>
                  </View>
                }
              </View>
            </View>
        }
        
        {/* <View className='publish-recruit-card'>
          <View className='publish-list-item'>
            <Text className='pulish-list-title'>班组长</Text>
            :<Input
              className='publish-list-input'
              type='text'
              disabled
              placeholder='请选择班组长'
            // value={formData && formData.time}
            />
          </View>
        </View> */}
      </View>
      {/* ===== */}
      {(recorderType === 1 || (recorderType === 2 && contractor === 0 ))&&
      <View className='publish-recruit-card'>
          <View className='publish-list-item' onClick={() => {
            setIsdisable(true); setWorkOvertimeDisplay(true), setDeldelType(false)
            handleDel(1)}}>
          <Text className='pulish-list-title'>上班时长</Text>
          <Input
            className='publish-list-input'
            type='text'
            disabled
            placeholder='请选择上班时长'
            value={model && model.duration}
              // value={'上班24小时，加班5小时'}
          />
            <View className='rightIconsBox'>
              <Image src={`${IMGCDNURL}iconsRIght.png`} className='rightIcons' />
            </View>
        </View>
      </View>
      }
      {/* 班组长记工 */}
        {identity == 2 && (recorderType === 1 || (recorderType === 1 || (recorderType === 2 && contractor === 0)) )&&
      <View>
          <View className='publish-recruit-card-money' onClick={() => {setIsdisable(true);setWageStandardDisplay(true) }}>
          <View className='publish-list-item-money'>
            <View className='pulish-list-title-money'>
              <View>我的工钱(点击设置自己的工资标准)
              <View className='mt10'>(自动计算)</View>
              </View>
            </View>
            <Input
              className='publish-list-input-money'
              type='text'
              disabled
              maxLength={16}
              placeholder='请选择工钱'
              value={model && model.workersWages}
            />
              <View className='money-rightIconsBox'>
                <Image src={`${IMGCDNURL}iconsRIght.png`} className='rightIcons' />
            </View>
          </View>
        </View>
      </View>}
      {/* ====== */}
      {/* 按量记工 */}
      {recorderType === 2 && contractor === 1 && 
        <View className='measure'>
          <View className='publish-recruit-card'>
            <View className='publish-list-item border-item'>
              <Text className='pulish-list-title justify-quantities'>工程量</Text>
              <Input
                className='publish-list-input-amount'
                type='digit'
                maxLength={10}
                placeholder='请填写工程量'
                onFocus={() => handleOnFocus('amount')}
                onInput={(e) => handleInput('amount', e)}
                value={model && model.amount}
              />
              <View className='amountType' onClick={handleOpenUnit}>{unit}
            </View>
                <Image src={`${IMGCDNURL}downIcons-new.png`} className='downIcons' />
              {/* <View className='rightIconsBox'>
                <Image src={`${IMGCDNURL}iconsRIght.png`} className='rightIcons' />
              </View> */}
            </View>
          </View>
          <View className='publish-recruit-card'>
            <View className='publish-list-item border-item'>
              <Text className='pulish-list-title'>单价</Text>
              <Input
                className='publish-list-input new-input'
                type='digit'
                maxLength={10}
                placeholder='请填写单价'
                onFocus={() => handleOnFocus('price')}
                onInput={(e) => handleInput('price', e)}
                value={model && model.price}
              />
              {/* <View className='rightIconsBox'>
                <Image src={`${IMGCDNURL}iconsRIght.png`} className='rightIcons' />
              </View> */}
            </View>
          </View>
          <View className='publish-recruit-card'>
            <View className='publish-list-item'>
              <Text className='pulish-list-title'>工钱</Text>
              <Input
                className='publish-list-input new-input'
                type='digit'
                onFocus={() => handleOnFocus('wages')}
                maxLength={17}
                onInput={(e) => handleInput('wages', e)}
                placeholder='工程量和单价未知时，可直接填写工钱'
                value={model && model.wages}
              />
              {/* <View className='rightIconsBox'>
                <Image src={`${IMGCDNURL}iconsRIght.png`} className='rightIcons' />
              </View> */}
            </View>
          </View>
        </View>
      }
      {/* 借支 */}
      {recorderType === 3 &&
        <View className='borrowing'>
          <View className='publish-recruit-card'>
            <View className='publish-list-item border-item'>
              <Text className='pulish-list-title'>本次借支</Text>
              <Input
                className='publish-list-input new-input'
                type='digit'
                // disabled
                maxLength={17}
                onFocus={()=>handleOnFocus('borrowing')}
                onInput={(e) => handleInput('borrowing', e)}
                onBlur={() => handleBlur('borrowing')}
                placeholder='请输入本次借支金额'
                value={model && model.borrowing}
              />
              {/* <View className='rightIconsBox'>
                <Image src={`${IMGCDNURL}iconsRIght.png`} className='rightIcons' />
              </View> */}
            </View>
          </View>
          <View className='publish-recruit-card'>
            <View className='borrowing-publish-list-item'>
              <Text className='borrowing-pulish-list-title'>本次借支属于(可不选)</Text>
              {/* <Input
                className='borrowing-publish-list-input'
                type='text'
                // disabled
                placeholder='请填写单价'
                value={model && model.univalent}
              /> */}
            </View>
            <View >
              <RadioGroup className='borrowing-Radio'>
                {borrowing.item.map(v => (
                  < Radio onClick={() => {handleOnFocus();handleRadioBorrowing(v)}} className='borrowing-Radio-list' color='#0099FF' checked={v.click} key={v.id}>{v.name}</Radio>
                ))}
              </RadioGroup>
            </View>
          </View>
        </View>
      }
      {/* ===== */}
      <View className='newTime'>
        <View className='publish-recruit-card' onClick={handleCurrent}>
          {/* <Picker
            mode='date'
            onChange={(e) => handleInput('time', e)}
            value={''}
          > */}
            <View className='publish-list-item'>
              <Text className='pulish-list-title'>日期</Text>
              <Input
                className='publish-list-input'
                type='text'
                disabled
                onClick={(e)=>handleInput('time',e)}
                placeholder='请选择日期'
                value={model && model.time}
              />
              <View className='rightIconsBox'>
                <Image src={`${IMGCDNURL}iconsRIght.png`} className='rightIcons' />
              </View>
            </View>
          {/* </Picker> */}
        </View>
      </View>
      <View className='textareaList'>
        <View className='publish-recruit-card'>
          <View className='publish-list-ditals'>
            <View className='textareanote'>备注</View>
              {/* <CoverView onClick={() => handleTextare()} className={workOvertimeDisplay || wageStandardDisplay || display || workingHoursDisplay || quantitiesDisplay || calendarModalDisplay || wagesModalDisplay? 'coverView' : ''}> */}
            {/* {isdisable && !iscreatproject && <View className='textarea'>{model && model.details}</View>} */}
            <View className='istextarea'>
            <View className={workOvertimeDisplay || wageStandardDisplay || display || workingHoursDisplay || quantitiesDisplay || calendarModalDisplay || wagesModalDisplay || project || createProjectDisplay || show ? 'foreman-foot' : 'foreman-footer'}>
            <Textarea
              // focus={autoFocus}
              // autoFocus={autoFocus}
              // auto-focus={autoFocus}
              hidden={isdisable || iscreatproject}
              cursor={model.details.length || 0}
              onFocus={()=>handleOnFocus()}
              className='textarea'
              placeholder='请填写备注...'
              cursorSpacing={100}
              value={model && model.details}
              onInput={(e) => handleInput('details',e)}
              onBlur={(e) => blurhandleContent('details',e)}
              maxlength={400}
            />
            </View>
            </View>
            {/* </CoverView> */}
          </View>
          <View className='image'><ImageView images={image.item} max={4} userUploadImg={userUploadImg} userDelImg={userDelImg} />
          <View className='clear'></View>
            <WordsTotal num={num} />
          <View>
          </View>
        </View>
        </View>
      </View>
      <CoverView className={workOvertimeDisplay || wageStandardDisplay || display || workingHoursDisplay || quantitiesDisplay || calendarModalDisplay || wagesModalDisplay || project || createProjectDisplay || show ? 'foreman-foot' : 'foreman-footer foreman-footer-box'}>
      {!isdisable && !iscreatproject && <CoverView>
          <CoverView className='foreman-footer-btn'>
            <CoverView className='footer-left' onClick={() => handlePreservation(1)}>保存并再记一笔</CoverView>
            <CoverView className='footer-right' onClick={()=>handlePreservation(0)}>保存</CoverView>
          </CoverView>
      </CoverView>}
      </CoverView>
      {/* 填写班组 */}
        <ProjectModal display={project} handleSubmit={handleAddProject} handleInput={handleInput} teamName={model && model.teamName} handleBack={handleBack} handleClose={handleProjectClose}/>
      {/* 成功弹窗 */}
      <RecorderPopup display={display} handleRecorderPopup={handleRecorderPopup}/>
      {/* 工程量选择单位 */}
      <Quantities display={quantitiesDisplay} maskHandleClose={handleClose} handleClose={handleClose} data={company} handleQuantities={handleQuantities}/>
      {/* 选择加班时长 */}
        <WorkOvertime display={workOvertimeDisplay} maskHandleClose={handleWorkOvertimeClose} handleWorkOvertimeClose={handleWorkOvertimeClose} handleworkOvertime={handleworkOvertime} data={timeArr} dataArr={addWorkArr} handleWorkOvertimeOk={handleWorkOvertimeOk} model={model}/>
      {/* 选择上班时间 */}
      <WorkingHours display={workingHoursDisplay} maskHandleClose={handleWorkingHoursClose} handleWorkingHoursClose={handleWorkingHoursClose} type={timeType} handleWorkingHours={handleWorkingHours}/>
      {/* 创建项目引导 */}
      <CreateProject display={createProjectDisplay} handleClose={handleCreateProjectClose} val={model && model.groupName} handleSubmit={handleNext} handleInput={handleInput}/>
      {/* 日历 */}
        <CalendarModal maskHandleClose={handleCalendarClose} display={calendarModalDisplay} handleCalendar={handleCalendar} model={model} setModel={setModel} setTimeData={setTimeData} recorderType={recorderType} handleClickCalendar={handleClickCalendar} time={time}
          getMonthDaysCurrent={getMonthDaysCurrent} arr={arr} clickData={clickData} handleCalendarClose={handleCalendarClose} handleChangeTime={handleChangeTime} handleCalendarSub={handleCalendarSub} onScrollToLower={onScrollToLower} onScrollToUpper={onScrollToUpper} calendarDays={calendarDays} noCalendarDay={noCalendarDay} swiperIndex={swiperIndex} calendarState={calendarState}
          leftTime={leftTime} rightTime={rightTime} changeId={changeId} calendar={calendar} handleSuiper={handleSuiper}
        />
      {/* 设置工资标准 */}
        <WageStandard display={wageStandardDisplay} maskHandleClose={() => { handleWageStandardClose(); handleWagesModalClose() }} handleClose={handleWageStandardClose} wageStandard={wageStandard} handleWageStandard={handleWageStandard} handleAddWage={handleAddWage} handleWageStandardRadio={handleWageStandardRadio} handleAdd={handleInputAdd} handleDel={handleDelInput} model={model} boxValue={boxValue} setBoxValue={setBoxValue} />
      {/* 添加成员 */}
        <AddMember display={addMemberDisplay} handleClose={handleAddMemberClose} handleEstablish={handleEstablish} handleInput={handleInput} groupInfo={groupInfo}/>
      {/* 工资 */}
        <WagesModal maskHandleClose={handleWagesModalClose} display={wagesModalDisplay} handleClose={handleWagesModalClose} data={setWorkList} handleAddStandard={handleAddStandard} standard={standard} moneyList={moneyList} handleEditWages={handleEditWages} handleAtSwitch={handleAtSwitch} tab={tab} handleSetWagesModal={handleSetWagesModal} handleWagesList={handleWagesList} handleCheckboxStandard={handleCheckboxStandard} clickModalNum={clickModalNum} handleAllClick={handleAllClick} checkAll={checkAll} recorderType={recorderType} />
        {/* 修改项目 */}
        <EditProject display={editProjectDisplay} handleEditProjectData={handleEditProjectData} data={editProjectData} handleClose={() =>{ setEditProjectDisplay(false),setShow(true)}} handleSubmit={handleEditProject}/>
      <AtDrawer
        show={show}
        right
        mask
        className='atDrawer'
        onClose={() => { setTimeout(() => {setIsdisable(false)});setShow(false), setEdit(false)}}
        >
        <View className='atDrawer-box'>
          <View className='atDrawer-heard'>
          <View style={{ marginTop: '3rpx' }} onClick={() => { setShow(false)}}>
          <Image src={`${IMGCDNURL}leftIcons.png`} className='addIcon'/>
          </View>
            <View>项目列表</View>
              {proList ? <View></View> : <View className='atDrawer-heard-edit'>{!edit ? <View className='atDrawer-heard-edit' onClick={() => handleEdit(0)}>修改/删除</View> : <View className='atDrawer-heard-edit' onClick={() => handleEdit(1)}>取消</View>}</View>}
            {/* {!edit &&}
            {edit && } */}
          </View>
          <View className='atDrawer-heard-content'>
            {projectArr.length>0&&projectArr.map(v=>(
              <View className='atDrawer-list' onClick={!edit?()=>handleProject(v):()=>{}}>
                <View className='atDrawer-list-title'>{
                  // v.child.map(val=>(
                  <Text className={v.click?'blued':''}>{v.group_name}-{v.name}</Text>
                  // ))
                }</View>
                <View className='atDrawer-list-flex'>
                  <View className='atDrawer-list-flex-title'>{identity == 1 && <View>{v.leader_name ? `${v.leader_name}的项目`:'-'}</View>}</View>
                  <View>
                    {!edit && <View>{v.click &&
                    <View>
                      <Image src={`${IMGCDNURL}ok.png`} className='project-icon' />
                    </View>}
                     {/* <Checkbox checked={v.click} className='checkbox' color='#0099FF' value={''} onClick={(e)=>e.stopPropagation()}/>} */}
                    </View>}
                    {edit && <View className='atDrawer-list-flex'>
                      <View className='atDrawer-list-flex-btn' onClick={(e)=>{e.stopPropagation(),handleEditProjectModal(v)}}>修改</View>
                      <View className='atDrawer-list-flex-btn' onClick={(e)=>{e.stopPropagation(),handleDelProject(v)}}>删除</View>
                    </View>}
                  </View>
                </View>
              </View>
            ))}
              {projectArr.length === 0 && <View className='noText'>暂无数据</View>}
          </View>
        </View>
        {
          !edit || proList?
          <View className='atDrawer-footer'>
            <View className='atDrawer-footer-btn' onClick={handleAddProjectList}>
              <Image src={`${IMGCDNURL}whiteLeftAdd.png`} className='addIcon'/> 
                创建项目</View>
          </View> 
          :
          ''
        }
          
        </AtDrawer>
    </View>
    </context.Provider >
  )
}