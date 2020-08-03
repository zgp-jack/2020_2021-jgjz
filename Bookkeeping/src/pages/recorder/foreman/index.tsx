import Taro, { Config, useEffect, useState, createContext,useDidShow } from '@tarojs/taro'
import { View, Text, Image, RadioGroup, Radio, Input, Textarea, Checkbox,CoverView } from '@tarojs/components'
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
import { AtDrawer } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import EditProject from '../../../components/editProject';
import { setDataList } from '../../../actions/list'
import { setClickTIme } from '../../../actions/clickTIme'
import { IMGCDNURL } from '../../../config'
import classnames from 'classnames'
import { Type } from '../../../config/store'
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
  const { model, setModel, handleInput, handleAddProject, project, setProject, handleworkOvertime, setWorkOvertimeDisplay, workOvertimeDisplay,
    workingHoursDisplay, setWorkingHoursDisplay, timeType, handleWorkingHours, timeArr, addWorkArr, handleWorkOvertimeOk, company, handleQuantities,
    quantitiesDisplay, setQuantitiesDisplay, unit, borrowing, setBorrowing, handleRadioBorrowing, workerItem, setWorkerItem, handleEstablish,
    addMemberDisplay, setAddMemberDisplay, handleDel, handleDelList, delType, setDeldelType, handleAddStandard, wagesModalDisplay, setWagesModalDisplay, wageStandardDisplay, setWageStandardDisplay, wageStandard, handleWageStandard, handlePreservation, recorderTypeArr,
    setRecorderTypeArr, handleCalendar, projectArr, handleProject, show, setShow, workerList, setWorkerList, handleCheckbox, memberList, setMemberList, standard, handleAddWage, handleWageStandardRadio, handleOpenWagesModal, moneyList, handleEditWages, handleEditWageStandard,
    tab, handleAtSwitch, handleDelProject, editProjectDisplay, setEditProjectDisplay, handleEditProject, handleEditProjectModal, editProjectData,
    handleEditProjectData, handleSetWagesModal, handleWagesList, setWorkList, handleCheckboxStandard, groupInfo, image, setImage, bkGetWorker,
    contractorArr, setContractorArr, num, handleWorkerItem, timeData, setTimeData, handleAllChange, clickNum, clickModalNum, refresh,
    setRefresh, handleLongClick, identity, foremanTitle, handleAllClick, setContractor, handleRadio, contractor, handleAdd, recorderType, setRecorderType, calendarDays, setCalendarDays, clickData, setClickData, handleClickCalendar, time, getMonthDaysCurrent, arr, handleCalendarClose,
    handleChangeTime, calendarModalDisplay, handleCalendarSub, setCalendarModalDisplay, onScrollToUpper, onScrollToLower, onTouchEnd, onTouchStart, 
    onLongPress, setClickModalNum, display, setDisplay, allClick, checkAll, handleClckTabber, noSet
  } = userForeman();
  
  // const [contractor, setContractor] = useState<number>(0)
  
  // 创建项目引导
  const [createProjectDisplay, setCreateProjectDisplay] = useState<boolean>(false)
  // 项目列表取消，删除/修改
  const [edit,setEdit] = useState<boolean>(false)
  // 项目名称
  const [projectList, setProjectList]= useState<any>([{},{}])
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
  // 获取数据
  // useEffect(()=>{
  //   // 获取项目列表
  //   // bkGetProjectTeam();
  // },[])
  // 获取项目列表
  const bkGetProjectTeam = ()=>{
    let params={}
    bkGetProjectTeamAction(params).then(res=>{
      console.log(res);
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
    setRefresh(true);
    UploadImgAction().then(res => {
      let imageItem = {
        url: res.url,
        httpurl: res.httpurl
      }
      if (i === -1) {
        setImage({ ...image, item: [...image.item, imageItem] })
      } else {
        image.item[i] = imageItem
        setImage({ ...image })
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
    // 跳转
    if(type === 1){
      Taro.redirectTo({
          url: '/pages/attendanceSheet/index'
        })
    }else{
      // Taro.navigateBack({
      //   delta: 1
      // })
      Taro.redirectTo({
        url: '/pages/flowingWater/index'
      })
    }
    setDisplay(false)
  }
  // 关闭选择单位
  const handleClose = ()=>{
    setQuantitiesDisplay(false)
  }
  //关闭加班时长
  const handleWorkOvertimeClose = ()=>{
    setWorkOvertimeDisplay(false)
  }
  // 关闭上班时长
  const handleWorkingHoursClose = ()=>{
    setWorkingHoursDisplay(false)
  }
  // 引导创建项目
  const handleCreateProjectClose = ()=>{
    setCreateProjectDisplay(false)
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
    if(type === 1){
      setWagesModalDisplay(true)
    }
    setWageStandardDisplay(false)
  }
  // 关闭添加成员
  const handleAddMemberClose = ()=>{
    setAddMemberDisplay(false)
  }
  // 关闭工资
  const handleWagesModalClose = ()=>{
    setWagesModalDisplay(false);
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
    }else{
      Msg('您还没有填写项目名称')
    }
  }
  // 填写班组关闭
  const handleProjectClose = ()=>{
    setProject(false)
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
    setCreateProjectDisplay(true), setShow(false)
  }
  console.log(foremanTitle,'foremanTitle')
  return (
    <context.Provider value={value}>
    <View className='foreman'>
      {/* tabber */}
      <View>
        <View className='tabber'>
          {recorderTypeArr.item.map(v => (
            <View className='tabber-list' key={v.id} onClick={() => handleClckTabber(v)}>
              <View className={v.click ? 'tabber-list-box' : ''}>
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
        {/* 选择为包工的时候 */}
        {recorderType === 2 &&
          <View className='contractor'>
            <View>包工类型</View>
            <View className='radioList'>
              <RadioGroup>
                {contractorArr.item.map(v => (
                  < Radio color='#0099FF' className='borrowing-Radio-list' checked={v.click} key={v.id} onClick={() => handleRadio(v)}>{v.name}</Radio>
                ))}
              </RadioGroup>
            </View>
          </View>
        }
      </View>
      <View className='projectName'>
        <View className='publish-recruit-card'>
            <View className='publish-list-item' onClick={() => {bkGetProjectTeam(),setShow(true)}}>
            <Text className='pulish-list-title'>项目名称</Text>
            :<Input
              className='publish-list-input'
              type='text'
              disabled
              placeholder='请选择项目名称'
              value={model && model.name}
            />
          </View>
        </View>
        {/* ===== */}
        {identity === 2 && 
        <View className='publish-recruit-card'>
            <View className='publish-list-item' onClick={() => { bkGetWorker(), userRouteJump(`/pages/addTeamMember/index?groupInfo=${groupInfo}&type=2`)}}>
            <Text className='pulish-list-title'>班组长</Text>
            :<Input
              className='publish-list-input'
              type='text'
              disabled
              placeholder='请选择班组长'
              value={foremanTitle}
            />
          </View>
        </View>
        }
        {identity === 1 && 
            <View className='workerBox'>
              <View className='workerBox-list'>
                <View className='workerBox-list-title'>
                  <View>选择工人</View>
                  {/* <View className='workerBox-list-title-origin'>长按名字可修改/查看工资标准</View> */}
                  <View className='workerBox-list-title-origin-box'>
                  <View className='workerBox-list-title-origin'>{!noSet ? '长按名字可修改/查看工资标准' :'工资如有变动，请长按头像修改'}</View>
                    <View className='workerBox-list-title-origin-tips'><Text className='workerBox-list-title-origin-color'></Text>表示当天已记过工</View>
                  </View>
                </View>
              <View><View className='whole' onClick={(e) => { e.stopPropagation(), e.preventDefault(), handleAllChange() }}>{!allClick ?'全选':'取消全选'}</View></View>
              </View>
              <View className='workerBox-change'>
                <View></View>
                <View>(已选{clickNum}人)</View>
              </View>
              <View className='workerItem'>
                {workerItem.map(v => (
                  <View 
                  // className='listPosition' 
                  // onClick={()=>{}}
                    // onTouchEnd={onTouchEnd}
                    // onTouchStart={onTouchStart}
                    className={v.discipline ? 'discipline' : 'listPosition'}
                    onLongPress={()=>handleOpenWagesModal(v)}
                    onClick={()=>handleWorkerItem(v)}
                    // onTouchStart={() => handleWorkerItem(v)} onLongPress={handleLongClick}
                  >
                    {v.id === 1 &&
                      <View >
                        <View 
                        // className={classnames({
                        //   'workerItem-list-first-click': v.click,
                        //   'workerItem-list-first': v.id ==1,
                        //   'workerItem-list-first-red':v.id>1&&v.id<20,
                        // })}
                        className={v.click ? 'workerItem-list-first-click' : 'workerItem-list-first'} 
                        >
                          {/* {v.name.slice(0, 2)} */}
                        {/* {v.name.substring(v.name.length-2)} */}
                        {v.name.substring(v.name.length - 2)}
                        </View>
                        <View className='workerItem-list-title'>{v.name}</View>
                      </View>
                    }
                    {v.id !== 1 &&
                      <View>
                        <View 
                        className={classnames({
                          'workerItem-list-click': v.click,
                          'workerItem-list': !v.click && v.id % 2 == 1 && v.id>100,
                          'workerItem-list-red': !v.click && v.id % 2 == 0 && v.id>100,
                          'workerItem-list-origion': !v.click && v.id % 2 == 1 && v.id < 100,
                          'workerItem-list-violet': !v.click && v.id % 2 == 0 && v.id < 100,
                          // 'workerItem-list-pink': !v.click && v.id % 2 == 0 && v.id < 50,
                          // 'workerItem-list': !v.click && v.id>=100,
                          // 'workerItem-list-red': !v.click && v.id < 100 && v.id % 2 == 1,
                          // 'workerItem-list-bulued': !v.click && v.id < 100 && v.id % 2 == 0,
                          // 'workerItem-list-origion': !v.click && v.id >= 100 && v.id<200 && v.id % 2 !== 0,
                          // 'workerItem-list-': !v.click && v.id >= 100,
                          // 'workerItem-list-violet': !v.click && v.id >200,
                          // 'workerItem-list-pink': !v.click && v.id > 200 && v.id % 2 == 0,
                        })}
                          // className={v.click ? 'workerItem-list-click' : 'workerItem-list'}
                          >
                          {/* {v.name} */}
                        {v.name.substring(v.name.length - 2)}
                        </View>
                        {/* 判断不是按量和借支的时候才能设置工资 */}
                      {(recorderType !== 3 && !(recorderType == 2 && contractor ==1) )&&!v.del && !v.set && <View className='workerItem-list-icon' onClick={(e) => { e.stopPropagation(), handleOpenWagesModal(v) }}><Image className='workerItem-list-icon-img' src={`${IMGCDNURL}mark.png`}/></View>}
                        {v.del && <View className='workerItem-list-icon-del' onClick={(e) => { e.stopPropagation(), handleDelList(v) }}>
                        <Image src={`${IMGCDNURL}reduce.png`} className='workerItem-list-icon-del-img'/>
                        </View>}
                        <View className='workerItem-list-title'>{v.name}</View>
                      </View>
                    }
                  </View>
                ))}
                {delType && <View>
                  <View className='discipline' onClick={() => handleDel(1)}>
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
        <View className='publish-list-item' onClick={() => setWorkOvertimeDisplay(true)}>
          <Text className='pulish-list-title'>上班时长</Text>
          <Input
            className='publish-list-input'
            type='text'
            disabled
            placeholder='请选择上班时长'
            value={model && model.duration}
          />
        </View>
      </View>
      }
      {/* 班组长记工 */}
        {identity === 2 && (recorderType === 1 || (recorderType === 1 || (recorderType === 2 && contractor === 0)) )&&
      <View>
          <View className='publish-recruit-card-money' onClick={() => { setWageStandardDisplay(true) }}>
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
          </View>
        </View>
      </View>}
      {/* ====== */}
      {/* 按量记工 */}
      {recorderType === 2 && contractor === 1 && 
        <View className='measure'>
          <View className='publish-recruit-card'>
            <View className='publish-list-item'>
              <Text className='pulish-list-title'>工程量</Text>
              <Input
                className='publish-list-input-amount'
                type='digit'
                maxLength={9}
                placeholder='请填写工程量'
                onInput={(e) => handleInput('amount', e)}
                value={model && model.amount}
              />
            <View className='amountType' onClick={() => setQuantitiesDisplay(true)}>{unit}</View>
            </View>
          </View>
          <View className='publish-recruit-card'>
            <View className='publish-list-item'>
              <Text className='pulish-list-title'>单价</Text>
              <Input
                className='publish-list-input'
                type='digit'
                maxLength={9}
                placeholder='请填写单价'
                onInput={(e) => handleInput('price', e)}
                value={model && model.price}
              />
            </View>
          </View>
          <View className='publish-recruit-card'>
            <View className='publish-list-item'>
              <Text className='pulish-list-title'>工钱</Text>
              <Input
                className='publish-list-input'
                type='digit'
                maxLength={16}
                onInput={(e) => handleInput('wages', e)}
                placeholder='工程量和单价未知时，可直接填写'
                value={model && model.wages}
              />
            </View>
          </View>
        </View>
      }
      {/* 借支 */}
      {recorderType === 3 &&
        <View className='borrowing'>
          <View className='publish-recruit-card'>
            <View className='publish-list-item'>
              <Text className='pulish-list-title'>本次借支</Text>
              <Input
                className='publish-list-input'
                type='digit'
                // disabled
                maxLength={16}
                onInput={(e) => handleInput('borrowing', e)}
                placeholder='请输入本次借支金额'
                value={model && model.borrowing}
              />
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
                  < Radio onClick={()=>handleRadioBorrowing(v)} className='borrowing-Radio-list' color='#0099FF' checked={v.click} key={v.id}>{v.name}</Radio>
                ))}
              </RadioGroup>
            </View>
          </View>
        </View>
      }
      {/* ===== */}
      <View className='newTime'>
        <View className='publish-recruit-card' onClick={() => setCalendarModalDisplay(true)}>
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
            </View>
          {/* </Picker> */}
        </View>
      </View>
      <View className='textareaList'>
        <View className='publish-recruit-card'>
          <View className='publish-list-ditals'>
            <View>备注</View>
            {/* <CoverView> */}
            <Textarea
              className='textarea'
              placeholder='请填写备注...'
              value={model && model.details}
              onInput={(e) => handleInput('details',e)}
              maxlength={400}
            />
            {/* </CoverView> */}
          </View>
          <View>
            <WordsTotal num={num} />
          </View>
        </View>
        <View className='image'><ImageView images={image.item} max={4} userUploadImg={userUploadImg} userDelImg={userDelImg} /></View>
      </View>
      <View className='clear'></View>
      <View className='foreman-footer'>
          <View className='footer-left' onClick={() => handlePreservation(1)}>保存并再记一笔</View>
        <View className='footer-right' onClick={()=>handlePreservation(0)}>保存</View>
      </View>
      {/* 填写班组 */}
        <ProjectModal display={project} handleSubmit={handleAddProject} handleInput={handleInput} teamName={model && model.teamName} handleBack={handleBack} handleClose={handleProjectClose}/>
      {/* 成功弹窗 */}
      <RecorderPopup display={display} handleRecorderPopup={handleRecorderPopup}/>
      {/* 工程量选择单位 */}
      <Quantities display={quantitiesDisplay} handleClose={handleClose} data={company} handleQuantities={handleQuantities}/>
      {/* 选择加班时长 */}
        <WorkOvertime display={workOvertimeDisplay} handleWorkOvertimeClose={handleWorkOvertimeClose} handleworkOvertime={handleworkOvertime} data={timeArr} dataArr={addWorkArr} handleWorkOvertimeOk={handleWorkOvertimeOk} model={model}/>
      {/* 选择上班时间 */}
      <WorkingHours display={workingHoursDisplay} handleWorkingHoursClose={handleWorkingHoursClose} type={timeType} handleWorkingHours={handleWorkingHours}/>
      {/* 创建项目引导 */}
      <CreateProject display={createProjectDisplay} handleClose={handleCreateProjectClose} val={model && model.groupName} handleSubmit={handleNext} handleInput={handleInput}/>
      {/* 日历 */}
        <CalendarModal display={calendarModalDisplay} handleCalendar={handleCalendar} model={model} setModel={setModel} setTimeData={setTimeData} recorderType={recorderType} handleClickCalendar={handleClickCalendar} time={time}
          getMonthDaysCurrent={getMonthDaysCurrent} arr={arr} clickData={clickData} handleCalendarClose={handleCalendarClose} handleChangeTime={handleChangeTime} handleCalendarSub={handleCalendarSub} onScrollToLower={onScrollToLower} onScrollToUpper={onScrollToUpper} calendarDays={calendarDays}
        />
      {/* 设置工资标准 */}
        <WageStandard display={wageStandardDisplay} handleClose={handleWageStandardClose} wageStandard={wageStandard} handleWageStandard={handleWageStandard} handleAddWage={handleAddWage} handleWageStandardRadio={handleWageStandardRadio}/>
      {/* 添加成员 */}
        <AddMember display={addMemberDisplay} handleClose={handleAddMemberClose} handleEstablish={handleEstablish} handleInput={handleInput} groupInfo={groupInfo}/>
      {/* 工资 */}
        <WagesModal display={wagesModalDisplay} handleClose={handleWagesModalClose} data={setWorkList} handleAddStandard={handleAddStandard} standard={standard} moneyList={moneyList} handleEditWages={handleEditWages} handleAtSwitch={handleAtSwitch} tab={tab} handleSetWagesModal={handleSetWagesModal} handleWagesList={handleWagesList} handleCheckboxStandard={handleCheckboxStandard} clickModalNum={clickModalNum} handleAllClick={handleAllClick} checkAll={checkAll}/>
        {/* 修改项目 */}
        <EditProject display={editProjectDisplay} handleEditProjectData={handleEditProjectData} data={editProjectData} handleClose={() => setEditProjectDisplay(false)} handleSubmit={handleEditProject}/>
      <AtDrawer
        show={show}
        right
        mask
        className='atDrawer'
        onClose={() => { setShow(false), setEdit(false)}}
        >
        <View className='atDrawer-box'>
          <View className='atDrawer-heard'>
          <View onClick={() => { setShow(false)}}>
          <Image src={`${IMGCDNURL}leftIcons.png`} className='addIcon'/>
          </View>
            <View>项目列表</View>
            {!edit &&<View className='atDrawer-heard-edit' onClick={()=>handleEdit(0)}>修改/删除</View>}
            {edit && <View className='atDrawer-heard-edit' onClick={()=>handleEdit(1)}>取消</View>}
          </View>
          <View className='atDrawer-heard-content'>
            {projectArr.length>0&&projectArr.map(v=>(
              <View className='atDrawer-list' onClick={()=>handleProject(v)}>
                <View className='atDrawer-list-title'>{
                  // v.child.map(val=>(
                  <Text className={v.click?'blued':''}>{v.group_name}-{v.name}</Text>
                  // ))
                }</View>
                <View className='atDrawer-list-flex'>
                  <View>{identity === 1 && <View>{v.leader_name ? `${v.leader_name}的项目`:'-'}</View>}</View>
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
          <View className='atDrawer-footer'>
            <View className='atDrawer-footer-btn' onClick={handleAddProjectList}>
              <Image src={`${IMGCDNURL}whiteLeftAdd.png`} className='addIcon'/> 
                创建项目</View>
          </View> 
        </AtDrawer>
    </View>
    </context.Provider >
  )
}