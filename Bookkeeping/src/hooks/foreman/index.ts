import Taro, { useState, useEffect, useDidShow, getStorageInfoSync } from '@tarojs/taro'
import { bkAddProjectTeamAction, bkAddWorkerActiion, bkDeleteRroupWorkerAction, bkAddBusinessAction, bkGetProjectTeamAction, bkGetWorkerAction, bkWageStandGetWageAction, bkAddWageAction, bkGetWorkerWageAction, bkUpdateWorkerAction, bkDeleteprojectTeamAction, bkUpdateProjectTeamAction, bkSetWorkerMoneyByWageAction, bkupdateWageAction, bkSetGroupLeaderAction, bkSetWorkerIdentityWageAction  } from '../../utils/request/index'
import { MidData, Type } from '../../config/store'
import { bkGetProjectTeamData } from '../../utils/request/index.d'
import { useDispatch, useSelector } from '@tarojs/redux'
import { setWorker } from '../../actions/workerList'
import { setmailList } from '../../actions/mailList'
import { setUserList } from '../../actions/userList';
import Msg from '../../utils/msg';
export interface BorrowingType {
  item: DataType[]
}
interface ModelType{
  groupName:string,
  teamName:string,
  name:string,
  time:string,
  details:string,
  duration:string,
  amount:string,
  price:string,
  wages:string,
  borrowing:string,
  univalent:string,
  userName:string,
  phone:string,
  workersWages:string,
}
interface DataType {
  id: number,
  name: string,
  click: boolean,
  num?:number,
  whole?:boolean
}
interface WorkerItemType{
  name:string,
  id:number,
  del?:false,
  click?:false,
  set?:false,
}
interface ImageDataType {
  item: ImageItem[],
}
export interface ImageItem {
  url: string,
  httpurl: string
}
export interface ContractorArrType {
  item: itemType[]
}
export interface itemType {
  id: number,
  name: string,
  click: boolean,
}
export default function userForeman() {
  // 获取存入的公用内容
  const useSelectorItem = useSelector<any, any>(state => state)
  const dispatch = useDispatch()
  // 是工人还是班组
  const [identity, setIdentity] = useState<number>(1)
  // 上班时长
  const [timeArr, setTimeArr] = useState<DataType[]>([
    { id: 1, name: '一个工', click: false, num: 1, whole:true },
    { id: 2, name: '半个工', click: false, num: 0.5, whole: true  },
    { id: 3, name: '休息', click: false,num:0 },
    { id: 4, name: '0.0小时', click: false,num:0 },
  ])
  //加班时长
  const [addWorkArr, setAddWorkArr] = useState <DataType[]>(
    [
      { id: 1, name: '无加班', click: false,num:0 },
      { id: 2, name: '0.0小时', click: false,num:0 },
    ]
  )
  // 选择大单位
  const [company, setCompany] = useState <DataType[]>([
    { id: 1, name: '平方米', click: true },
    { id: 2, name: '立方米', click: false },
    { id: 3, name: '吨', click: false },
    { id: 4, name: '米', click: false },
    { id: 5, name: '个', click: false },
    { id: 6, name: '次', click: false },
    { id: 7, name: '天', click: false },
    { id: 8, name: '块', click: false },
    { id: 9, name: '组', click: false },
    { id: 10, name: '台', click: false },
    { id: 11, name: '捆', click: false },
    { id: 12, name: '宗', click: false },
    { id: 13, name: '项', click: false },
    { id: 14, name: '株', click: false },
  ])
  // 借支
  const [borrowing, setBorrowing] = useState<BorrowingType>({
    item: [
      { id: 3, name: '工资', click: false },
      { id: 4, name: '生活费', click: false },
      { id: 5, name: '补贴', click: false },
      { id: 6, name: '奖励', click: false },
      { id: 7, name: '其他', click: false },
    ]
  })
  const [model, setModel] = useState<ModelType>({
    groupName:'',
    teamName:'',
    name:'',
    time:'',
    details:'',
    duration:'',
    amount:'',
    price:'',
    wages:'',
    borrowing:'',
    univalent:'',
    userName:'',
    phone:'',
    workersWages:'0',
  })
  const [wageStandard, setWageStandard ] = useState<any>({
    data: [
      { id: 1, name: '按小时计算', click: true },
      { id: 2, name: '按天算', click: false },
    ],
    // 上班模板
    work:8,
    // 上班金额
    money:325,
    // 加班钱（小时）
    addWork:50,
    // 小时/天
    type:1,
    // 加班多少小时算一台呢
    day:6,
    // 自动换算加班多少每小时多少钱
    dayAddWork: 54.17,
    state:'',
    group_info:'',
    id:'',
  })
  const [num, setNum] = useState<number>(0)
  // 班组长信息
  const [foreman, setForeman] = useState<any>([])
  // 班组长名字
  const [foremanTitle, setForemanTitle] = useState<string>('')
  // 工人
  const [workerItem, setWorkerItem] = useState<WorkerItemType[]>([])
  // 选择加班时长弹窗
  const [workOvertimeDisplay, setWorkOvertimeDisplay] = useState<boolean>(false)
  // 上班时长选择
  const [workingHoursDisplay, setWorkingHoursDisplay] = useState<boolean>(false)
  // 上班时长选择类型
  const [timeType,setTimeType]= useState<number>(0)
  // 填写班组
  const [project, setProject] = useState<boolean>(false)
  // 单位
  const [unit, setUnit] = useState<string>('平方米')
  // 工程量
  const [quantitiesDisplay, setQuantitiesDisplay] = useState<boolean>(false)
  // 添加成员
  const [addMemberDisplay, setAddMemberDisplay] = useState<boolean>(false)
  // 用户数据
  const [obj, setObj] = useState<DataType>({
    name:'',
    id:0,
    click:false,
  })
  const [contractor, setContractor] = useState<number>(0)
  // 图片
  const [image, setImage] = useState<ImageDataType>({
    item: [],
  })
  // 按天还是按量计算
  const [contractorArr, setContractorArr] = useState<ContractorArrType>({
    item: [{ id: 0, name: '按天记工', click: true }, { id: 1, name: '按量计算', click: false }]
  })
  // 修改项目
  const [show, setShow] = useState<boolean>(false)
  // 记工类型
  const [recorderTypeArr, setRecorderTypeArr] = useState<BorrowingType>({
    item: [{ id: 1, name: '点工', click: true }, { id: 2, name: '包工 ', click: false }, { id: 3, name: '借支', click: false }]
  })
  // 修改项目
  const [editProjectDisplay, setEditProjectDisplay] = useState<boolean>(false)
  // 删除
  const [delType, setDeldelType] = useState<boolean>(false)
  // 工资
  const [wagesModalDisplay, setWagesModalDisplay] = useState<boolean>(false)
  // 工资标准
  const [wageStandardDisplay, setWageStandardDisplay] = useState<boolean>(false)
  // 项目列表
  const [projectArr, setProjectArr] = useState<bkGetProjectTeamData[]>([])
  // 项目id
  const [ids,setIds] = useState<string>('');
  // 判断工资标准修改类型
  const [state,setState]= useState<number>(0)
  // 选择班主成员
  const [memberList, setMemberList] = useState<any>([])
  // 工人列表
  const [workerList, setWorkerList] = useState<any>()
  //储存工人
  const [storagelist, setStoragelist] = useState<any>([])
  // 工资标准
  const [standard, setStandard] =useState<any>([])
  // 已设置工资标准
  const [moneyList, setMoneyList] = useState<any>([])
  // 工资tab类型
  const [tab, setTab] = useState<number>(0)
  // 选择人数
  const [clickNum, setClickNum] =useState<number>(0);
  // 修改项目组数据
  const [editProjectData, setEditProjectData] = useState<any>({
    group_info: '',
    team_name: '',
    group_name: '',
  })
  // 模板id
  const [templateId, setTemplateId] = useState<string>('')
  // 设置工资标准里的工人
  const [setWorkList, setSetWorkList] = useState<any[]>([])
  // group_info
  const [groupInfo, setGroupInfo]= useState<string>('')
  // 添加标准
  const [addStandard, setAddStandard] = useState<number>(0)
  // 日历（不等于借支）
  const [timeData,setTimeData] =useState<any[]>([]);
  // modal选择工人
  const [clickModalNum, setClickModalNum] = useState<number>(0)
  // 刷新
  const [refresh,setRefresh] = useState<boolean>(false)
  useDidShow(() => {
    console.log(refresh,'refresh')
    if (refresh){
      setRefresh(false)
      return;
    } 
    const type = Taro.getStorageSync(Type);
    setIdentity(type)
    // 判断选择回来 
    if (useSelectorItem.workerList.length > 0) {
      if (identity === 2){
        setForeman(useSelectorItem.workerList);
        setForemanTitle(useSelectorItem.workerList[0].name);
        return;
      }
      //  ======= 需要修改，等获取到本人信息后
      let objs = JSON.parse(JSON.stringify(obj));
      const data = JSON.parse(JSON.stringify(moneyList));
      const arrList = JSON.parse(JSON.stringify(useSelectorItem.workerList));
      console.log(data,'data')
      if(data.length>0){
        for(let j = 0;j<data.length;j++){
          for (let i = 0; i <arrList.length;i++){
            arrList[i].click = false;
            if (data[j].worker_id === arrList[i].id){
              arrList[i].set = true
            }
          }
        }
      }else{
        for (let i = 0; i < arrList.length; i++) {
          arrList[i].click = false;
        }
      }
      for(let i =0;i<arrList.length;i++){
        if(arrList[i].id === objs.id){
          objs = arrList[i];
          arrList.splice(i,1)
        }
      }
      setWorkerItem([objs, ...arrList])
    }
  })
  useEffect(()=>{
    // 获取角色
    let type = Taro.getStorageSync(Type);
    setIdentity(type);
    // 获取用户信息
    let midData = Taro.getStorageSync(MidData)
    const objs = JSON.parse(JSON.stringify(obj))
    objs.name = midData.nickname||'未命名';
    objs.id = midData.worker_id;
    setObj(objs);
    // 获取通讯里信息
    const workerItemData = JSON.parse(JSON.stringify(workerItem));
    // 获取设置员工信息
    // console.log(useSelectorItem,'useSelectorItem')
    // if (useSelectorItem.userList.length) {
    //   useSelectorItem.userList.push(objs);
    //   setWorkerItem(useSelectorItem.userList)
    // }else{
      workerItemData.push(objs);
      setWorkerItem(workerItemData)
    // }
    // 获取项目名称
    bkGetProjectTeam();
    // 获取工人列表
    // bkGetWorker(groupInfo);
    // 工资标准
    bkWageStandGetWage();
  },[])
  // 获取项目名称
  const bkGetProjectTeam = (groupName?:string)=>{
    bkGetProjectTeamAction({}).then(res => {
      if(res.code === 200){
          // 如果是工人的话默认选中第一条有数据
          // 多条选中最近一条
          // 工人
          const modalObj = JSON.parse(JSON.stringify(model));
        const identity = Taro.getStorageSync(Type)
          if(identity === 2){
            if (!model.groupName){
              let groupInfo
              if (res.data && res.data.length>0){
                for(let i =0;i<res.data.length;i++){
                  res.data[0].click = true;
                  groupInfo = res.data[0].child[0].pid + ',' + res.data[0].child[0].id;
                  if(res.data[0].child[0].leader_name){
                    setForemanTitle(res.data[0].child[0].leader_name)
                  }
                }
              }
              setGroupInfo(groupInfo)
              setModel({ ...modalObj, name: res.data[0].name})
              setProjectArr(res.data);
            }else{
              if (res.data && res.data.length > 0) {
                for (let i = 0; i < res.data.length; i++) {
                  // res.data[0].click = true;
                  if (groupName=== res.data[i].name){
                    res.data[i].click = true;
                  }
                }
                setProjectArr(res.data);
              }
            }
          }else{
            setProjectArr(res.data);
          }
      }
    })
  }
  // 已设置工资标准标准
  const bkGetWorkerWage = (id?:string)=>{
    let prams;
    if(id){
      prams = {
        group_info:id
      }
    }else{
      prams = {
        group_info: groupInfo
      }
    }
    bkGetWorkerWageAction(prams).then(res=>{
      if(res.code === 200){
        setMoneyList(res.data);
        // 判断页面上的是否设置工资标准
        if(identity ===1 ){
          const data = JSON.parse(JSON.stringify(workerItem))
          for(let i =0;i<data.length;i++){
            for(let j=0;j<res.data.length;j++){
              if (res.data[j].worker_id === data[i].id){
                data[i].set = true;
              }
            }
          }
          setWorkerItem(data)
        }
      }else{
        Msg(res.msg)
      }
    })
  }
  // 工资标准
  const bkWageStandGetWage = ()=>{
    bkWageStandGetWageAction({}).then(res=>{
      if(res.code === 200){
        for(let i =0;i<res.data.length;i++){
          if(i === 0 ){
            res.data[i].click = true;
            setTemplateId(res.data[i].id)
          }else{
            res.data[i].click = false;
          }
        }
        setStandard(res.data);
      }
    })
  }
  // 工人列表
  const bkGetWorker = (groupInfos?:any, data?:any)=>{
    // 不传group_info获取通讯录里的所有人
    let params;
    if (groupInfos){
      params = {
        group_info:groupInfos
      }
    }else{
      params = {}
    }
    bkGetWorkerAction(params).then(res=>{
      if(res.code === 200){
        const data = JSON.parse(JSON.stringify(workerItem));
        // return;
        let arr:any[] = [];
        for(let i =0;i<res.data.length;i++){
          if(res.data[i].list){
            for(let j = 0;j<res.data[i].list.length;j++){
              // 判断有worktime_define和money就是设置了工资标准
              if (res.data[i].list[j].worktime_define && res.data[i].list[j].money){
                res.data[i].list[j].set = true;
              }
              arr.push(res.data[i].list[j]);
            }
          }
        }
        console.log(arr,'arr')
        for(let i = 0;i<arr.length;i++){
          if(arr[i].id == obj.id){
            arr.splice(i,1);
          }
        }
        if(data){
          // 根据姓名判断在那个位置push进去
          for(let i= 0;i<res.data.length;i++){
            if (data.name_py === res.data[i].name_py){
              res.data[i].list.push(data);
            }
          }
        }
        // 判断有就不存了存通讯录redux
        // 么有groupInfos就不修改
        if (!groupInfos){
          dispatch(setmailList(res.data))
          // setWorkerItem([obj, ...arr])
        }
        // 存员工redux
        dispatch(setUserList(res.data))
        setWorkerList(res.data);
      }else{
        Msg(res.msg);
        return;
      }
    })
  }
  // 输入框
  const handleInput = (type:string,e)=>{
    let data = JSON.parse(JSON.stringify(model));
    if (type === 'details'){
      setNum(e.detail.value.length);
    }
    data[type] = e.detail.value;
    setModel(data);
  }
  // 创建项目
  const handleAddProject = ()=>{
    let params={
      group_name: model.groupName,
      team_name: model.teamName,
    }
    bkAddProjectTeamAction(params).then(res=>{
      if(res.code === 200){
        setIds(res.data);
        bkGetProjectTeam(model.groupName);
      }else{
        Msg(res.msg);
        return;
      }
      setProject(false);
      let data = JSON.parse(JSON.stringify(model));
      data.name = model.groupName;
      setGroupInfo(res.data)
      setModel(data)
    })
  }
  // 选择加班时长
  const handleworkOvertime = (type:number,val:any)=>{
    setTimeType(type)
    if(type === 1){
      if(val.id === 4){
        const arr = timeArr.map(v => {
          if (v.id === val.id) {
            v.click = !v.click;
          } else {
            v.click = false
          }
          return v;
        })
        setTimeArr(arr)
        setWorkOvertimeDisplay(false)
        setWorkingHoursDisplay(true);
        return;
      }else{
        const arr = timeArr.map(v=>{
          if(v.id === val.id){
            v.click = !v.click;
          }else{
            if(v.id === 4){
              v.name = '0.0小时';
            }
            v.click = false
          }
          return v;
        })
        setTimeArr(arr)
      }
    }else{
      if(val.id != 2){
        const arr = addWorkArr.map(v => {
          if (v.id === val.id) {
            v.click = !v.click
          } else {
            if (v.id === 2) {
              v.name = '0.0小时';
            }
            v.click = false
          }
          return v;
        })
        setAddWorkArr(arr);
      }else{
        const arr = addWorkArr.map(v => {
          if (v.id === val.id) {
            v.click = !v.click;
          } else {
            v.click = false
          }
          return v;
        })
        setAddWorkArr(arr)
        setWorkOvertimeDisplay(false)
        setWorkingHoursDisplay(true);
        return;
      }
    }
  }
  // 加班时长弹框选择
  const handleWorkingHours = (type:number,e:any)=>{
    if(type === 1){
      const data = timeArr.map((v)=>{
        if(v.id === 4){
          v.name = e.name;
          v.click = true;
          v.num = e.num
        }
        return v;
      })
      setTimeArr(data);
    }else{
      const data = addWorkArr.map((v) => {
        if (v.id === 2) {
          v.name = e.name;
          v.click = true;
          v.num = e.num
        }
        return v;
      })
      setAddWorkArr(data);
    }
    setWorkingHoursDisplay(false);
    setWorkOvertimeDisplay(true);
  }
  // 确认时间选择
  const handleWorkOvertimeOk = ()=>{
    const data:any = timeArr.filter(v=>v.click);
    const dataList:any = addWorkArr.filter(v=>v.click);
    let title;
    if (data || dataList){
      if (data.length > 0){
        if (data[0].name == '休息') {
          title =  data[0].name 
        } else {
          title = '上班' + data[0].name 
        }
      }
      if (dataList.length > 0){
        if (dataList[0].name !== '无加班'){
          title = '加班' + dataList[0].name
        }else{
          title = dataList[0].name
        }
      }
      if (data.length > 0 && dataList.length > 0) {
        if (data[0].name == '休息' && dataList[0].name == '无加班') {
          title = data[0].name + dataList[0].name
        } else {

          if (data[0].name == '休息'){
            title = '加班' + dataList[0].name
          }
          if (dataList[0].name == '无加班'){
            title = '上班' + data[0].name + dataList[0].name
          }
          title = '上班' + data[0].name + '加班' + dataList[0].name
        }
      }
    }
    if(identity === 2){
      const data = JSON.parse(JSON.stringify(wageStandard));
      // 获取上班时长
      const timeArrs = JSON.parse(JSON.stringify(timeArr));
      // 获取加班时长
      const addWorkArrs = JSON.parse(JSON.stringify(addWorkArr));
      //模板金额 
      const moneyNum = data.money;
      // 模板时间
      const workNum = data.work;
      //加班金钱
      const addWorkNum = data.addWork;
      // 加班时间
      const dayNum = data.day;
      // 上班时间
      let time = 0;
      for (let i = 0; i < timeArrs.length; i++) {
        if (timeArrs[i].click) {
          // 选择工
          if (timeArrs[i].id != 1 && timeArrs[i].id != 2 && timeArrs[i].id != 3 ){
            time = 1 / workNum * timeArrs[i].num
          // 选择时间
          }else{
            if (timeArrs[i].id == 1){
              // 等于模板时间
              time = workNum;
            } else if (timeArrs[i].id == 2){
              // 等于模板时间的一半
              time = workNum/2;
            } else if (timeArrs[i].id == 3){
              // 等于0 
              time = 0;
            }
          }
          // time = timeArrs[i].num;
        }
      }
      // 加班时间
      let addTime = 0;
      for (let i = 0; i < addWorkArrs.length; i++) {
        if (addWorkArrs[i].click) {
          addTime = addWorkArrs[i].num
        }
      }
      let total;
      if (data.type === 1) {
        // 按小时算 加班小时* 模板加班金额
        total = (moneyNum / workNum) * time + addWorkNum * addTime;
      } else {
        // 按天算 每个工多少钱/模板定义的多少小时算一个工 * 加班时长
        total = moneyNum / workNum * time + (moneyNum / dayNum * addTime);
      }
      const num = total.toFixed(2);
      //给工人自己设置工资标准
      const wageStandards = JSON.parse(JSON.stringify(wageStandard));
      let params = {
          identity:identity,
          worktime_define: wageStandards.work,
          overtime_type: wageStandards.type,
          overtime_money: wageStandards.dayAddWork,
          money: wageStandards.money,
          overtime: wageStandards.day,
          group_info:groupInfo
        }
      bkSetWorkerIdentityWageAction(params).then(res=>{
        if(res.code !== 200){
          Msg(res.msg)
        }
      })
      setModel({ ...model, workersWages: num, duration: title });
      setWorkOvertimeDisplay(false);
      return;
    }
    setModel({ ...model, duration: title})
    setWorkOvertimeDisplay(false);
  }
  // 选择单位
  const handleQuantities = (val)=>{
    const arr = company.map((v)=>{
      if(v.id === val.id){
        v.click=!v.click
        if(v.click){
          setUnit(v.name)
          setQuantitiesDisplay(false)
        }
      }else{
        v.click = false
      }
      return v;
    })
    setCompany(arr)
  }
  // 支借Radio
  const handleRadioBorrowing = (v)=>{
    const data = JSON.parse(JSON.stringify(borrowing.item));
    for(let i =0;i<data.length;i++){
      if(data[i].id === v.id){
        data[i].click = true;
      }
    }
    setBorrowing({item:data})
  }
  // 添加成员
  const handleEstablish = (id)=>{
    const data = JSON.parse(JSON.stringify(model))
    let params:any = {
      name: data.userName,
      tel:data.phone,
      // group_info: id,
    }
    // bkGetWorker(id, true);
    dispatch(setmailList([]));
    setAddMemberDisplay(false)
    // return;
    bkAddWorkerActiion(params).then(res=>{
      if(res.code === 200){
        // 叫后台返回id 姓名 电话
        const data = res.data;
        // 添加成功后重新获取设置数据
        bkGetWorker(id, data);
        // ======= 测试无法测试
        // const data = JSON.parse(JSON.stringify(workerItem));
        // params.id = Math.random();
        // data.push(params)
        // setWorkerItem(data)
        // 重新获取数据
        // bkGetWorkerAction
        setAddMemberDisplay(false)
      }else{
        Msg(res.msg)
      }
    })
  }
  // 点击删除
  const handleDel =(type:number)=>{
    const data = JSON.parse(JSON.stringify(workerItem));
    if(type === 0){
      const arr = data.map(v=>{
        if(v.id != 1){
          v.del = true;
        }
        return v;
      })
      setWorkerItem(arr);
      setDeldelType(true)
    }else{
      const arr = data.map(v => {
        if (v.id != 1) {
          v.del = false;
        }
        return v;
      })
      setWorkerItem(arr);
      setDeldelType(false)
    }
  }
  // 删除某一个
  const handleDelList = (v:any)=>{
    Taro.showModal({
      title: '温馨提示',
      content: '删除工人后，工人将不在此项目中，但他之前的记工数据不会受影响。确定要删除吗？',
      showCancel: true,
      success:((res)=>{
        if(res.confirm){
          let params = {
            ids:v.id,
            group_info:groupInfo
          }
          bkDeleteRroupWorkerAction(params).then(res=>{
            if(res.code === 200){
              const data = JSON.parse(JSON.stringify(workerItem));
              data.splice(data.indexOf(v.id), 1);
              setWorkerItem(data)
              // 获取工人列表
              const workerListArr = JSON.parse(JSON.stringify(workerList));
              console.log(data,'删除后内容')
              for(let i = 0;i<workerListArr.length;i++){
                for (let z = 0; z < workerListArr[i].list.length;z++){
                  console.log(workerListArr[i].list[z])
                  console.log(v.id,'id')
                  if (workerListArr[i].list[z].id == v.id){
                    // ==============
                    console.log(312)
                    console.log(workerListArr[i].list)
                    console.log(workerListArr[i].list[z])
                    workerListArr[i].list.splice(z,1)
                  }
                }
              }
              //存数据
              dispatch(setUserList(workerListArr))
              // setWorkerItem
              // console.log(workerListArr,'workerListArr')
              // setWorkerItem(workerListArr)
              
              console.log(workerListArr, 'workerListArr');
            }else{
              Msg(res.msg);
            }
          })
        }
      })
    })
  }
  //添加标准
  const handleAddStandard = ()=>{
    setAddStandard(1);
    setWagesModalDisplay(false);
    setWageStandardDisplay(true);
  }
  // 打开工资标准
  const handleOpenWagesModal = ()=>{
    setWagesModalDisplay(true);
    //把工资标准的内容设置为新的s
    const data = JSON.parse(JSON.stringify(workerItem));
    let setData:any=[],NoSetData:any=[];
    for(let i =0;i<data.length;i++){
      data[i].click = false;
      if(data[i].set){
        setData.push(data[i]);
      }else{
        NoSetData.push(data[i]);   
      }
    }
    // 设置人员
    setSetWorkList([...NoSetData, ...setData])
     // 一设置工资标准标准
    bkGetWorkerWage();
  }
  // 添加工资标准
  const handleWageStandard = (type:string,e:any)=>{
    if (type == 'day') {
      const item = JSON.parse(JSON.stringify(wageStandard));
      const dayAddWork = item.money / e;
      item[type] = e;
      item.dayAddWork = dayAddWork.toFixed(2);
      setWageStandard(item);
      return;
    }
    if (type === 'money') {
      const item = JSON.parse(JSON.stringify(wageStandard));
      const dayAddWork = e / item.day;
      item[type] = e;
      item.dayAddWork = dayAddWork.toFixed(2);
      setWageStandard(item);
      return;
    }
    const data = JSON.parse(JSON.stringify(wageStandard));
    data[type] = e;
    setWageStandard(data);
  }
  // 保存
  const handlePreservation = (type:number)=>{
    // 获取工资标准
    const data = JSON.parse(JSON.stringify(wageStandard));
    const item = JSON.parse(JSON.stringify(model));
    // 时间
    let work_time:number=0;
    timeArr.map(v=>{
      if(v.click){
        if (v.num){
          work_time = v.num;
        }
      }
    })
    const times = 1/data.work * work_time;
    // 加班时间
    let overtime:number=0;
    addWorkArr.map(v => {
      if (v.click) {
        if (v.num){
          overtime = v.num;
        }
      }
    })
    // 借支radio类型
    let radioType;
    borrowing.item.map(v=>{
      if(v.click){
        radioType = v.id;
      }
    })
    //单位
    let unit;
    company.map(v=>{
      if(v.click){
        unit = v.name;
      }
    })
    const timeItem = JSON.parse(JSON.stringify(timeData));
    let time: string[] = timeItem.map(item => (item.year +'-'+ item.month +'-'+ item.date));
    // type 1 再来一笔 0 保存
    let tabData;
    recorderTypeArr.item.map((v)=>{
      if(v.click){
        tabData = v;
      }
    })
    // 获取ID
    let workers:number[] = [];
    if(identity === 1){
      for(let i =0;i<workerItem.length;i++){
        if (workerItem[i].click){
          workers.push(workerItem[i].id)
        }
      }
    }else {
      if (foreman.length>0){
        for (let i = 0; i < foreman.length;i++){
          workers.push(foreman[i].id);
        }
      }
    }
    // 工人ID传自己
    if(identity === 2){
      // workers = 
      const midData = Taro.getStorageSync(MidData);
      workers = midData.worker_id;
    }
    // 图片
    let img_url: string[] = image.item.map(item => item.url);
    // 工人记工的时候，没有选择项目名称，为他默认一个
    if(projectArr.length === 0 ){
      let item = {
        group_name: '其他项目',
        team_name: '其他班组'
      }
      bkAddProjectTeamAction(item).then(res=>{
        if(res.code === 200){
          bkGetProjectTeam();
        }
      })
    }
    // 记工
    let params={};
    if (tabData.id == 1){
      params = {
        // 记工类型
        business_type: tabData.id,
        // 班组信息
        group_info: groupInfo,
        // 工时
        work_time: times,
        // 身份
        identity,
        // 图片
        img_url,
        // 备注
        note: item.details,
        // note: item.note,
        // 记录日期
        time,
        // 工人id
        workers,
        overtime,
        money: item.workersWages,
      }
    } else if (tabData.id == 2){
      // 按量
      let itemType;
      for (let i = 0; i < contractorArr.item.length;i++){
        if (contractorArr.item[i].click){
          itemType = contractorArr.item[i].id;
        }
      }
      // 按量
      if (itemType === 1 ){
        params = {
          // 记工类型
          business_type: tabData.id,
          // 班组信息
          group_info: groupInfo,
          // 工时
          work_time: times,
          // 身份
          identity,
          // 图片
          img_url,
          // 备注
          note: item.details,
          // note: item.note,
          // 记录日期
          time,
          // 工人id
          workers,
          type: 2,
          unit,
          unit_num: item.amount,
          unit_price: item.price,
          money: item.wages,
        }
      }else{
        // 按天
        params = {
          // 记工类型
          business_type: tabData.id,
          // 班组信息
          group_info: groupInfo,
          // 工时
          // work_time: 1,
          // 身份
          identity,
          // 图片
          img_url,
          // 备注
          note: item.details,
          // note: item.note,
          // 记录日期
          time,
          // 工人id
          workers,
          type: 1,
          money: '',
          work_time: times,
          overtime,
        }
      }
    }else if(tabData.id === 3){
      params = {
        // 记工类型
        business_type: tabData.id,
        // 班组信息
        group_info: groupInfo,
        // 工时
        work_time: times,
        // 身份
        identity,
        // 图片
        img_url,
        // 备注
        note: item.details,
        // note: item.note,
        // 记录日期
        time:item.time,
        // 工人id
        workers,
        type: radioType,
        money: item.borrowing,
      }
    }
    // 工人的时候要先设置工资标准
    const foremanTitles = JSON.parse(JSON.stringify(foremanTitle))
    if(identity === 2){
      if (!item.name){
        Msg('请选择项目')
        return
      }
      if (!foremanTitles){
        Msg('请选择班组长')
        return
      }
      if (!time){
        Msg('请选择日期')
        return
      }
    }
    // 记工(包工按量)
    bkAddBusinessAction(params).then(res=>{
      // 清除reducer
      if(res.code === 200){
        if(type === 1){
          const data = {
            groupName: '',
            teamName: '',
            name: '',
            time: '',
            details: '',
            duration: '',
            amount: '',
            price: '',
            wages: '',
            borrowing: '',
            univalent: '',
            userName: '',
            phone: '',
            workersWages: '0',
          }
          setForemanTitle('');
          setModel(data);
        }
        Taro.navigateBack();
        dispatch(setWorker([]))
      }else{
        Msg(res.msg);
      }
    })
  }
  const handleCalendar = (v)=>{
  }
  // 点击项目
  const handleProject = (v)=>{
    let data = JSON.parse(JSON.stringify(model));
    const arr = JSON.parse(JSON.stringify(projectArr))
    data.name = v.name;
    let groupInfo = v.child[0].pid + ',' + v.child[0].id;
    if(identity === 2){
      if(v.child.length>0){
        if (v.child[0].leader_name){
          setForemanTitle(v.child[0].leader_name)
        }else{
          setForemanTitle('')
        }
      }
    }
    // 设置选择框
    for(let i =0;i<arr.length;i++){
      if(v.id === arr[i].id){
        arr[i].click = true;
      }else{
        arr[i].click = false;
      }
    }
    setProjectArr(arr)
    // 获取工人列表
    bkGetWorker(groupInfo)
    // 选择项目的时候先获取设置工资标准员工
    bkGetWorkerWage(groupInfo);
    setGroupInfo(groupInfo)
    setShow(false)
    setModel(data)
  }
  // 添加班组成员选择
  const handleCheckbox = (e)=>{

    const data = JSON.parse(JSON.stringify(memberList));
    const worker = JSON.parse(JSON.stringify(workerItem))
    if(data.length === 0 ){
      data.push(e);
    }else{
      if (data.indexOf(e.id) === -1) {
        data.push(e.id)
      }else{
        data.splice(data.indexOf(e.id), 1)
      }
    }
    setMemberList(data);
    worker.push(...data);
    setWorkerItem(worker)
  }
  // 开始记工
  const handleStart = ()=>{
    const workerItemList = JSON.parse(JSON.stringify(workerItem));
    const storagelistItem = JSON.parse(JSON.stringify(storagelist))
    let arrList:any[]=[];
    if (workerItemList && storagelistItem){
      for (let i = 0; i < workerItemList.length;i++){
        for(let j= 0 ;j<storagelistItem.length ;j++){
          if (workerItemList[i].name != storagelistItem[j].name){
            arrList.push(storagelistItem[j]);
          }
        }
      }
    }
    setWorkerItem([...workerItemList, ...arrList]);
    dispatch(setWorker([...workerItemList, ...arrList]))
    Taro.navigateBack({delta: 1})
  }
  // 确认添加标准
  const handleAddWage = ()=>{
    // 获取工资标准
    const data = JSON.parse(JSON.stringify(wageStandard));
    // 获取上班时长
    const timeArrs = JSON.parse(JSON.stringify(timeArr));
    // 获取加班时长
    const addWorkArrs = JSON.parse(JSON.stringify(addWorkArr));
    //模板金额 
    const moneyNum = data.money;
    // 模板时间
    const workNum = data.work;
    //加班金钱
    const addWorkNum = data.addWork;
    // 加班时间
    const dayNum = data.day;
    // 上班时间
    let time = 0;
    for(let i =0;i<timeArrs.length;i++){
      if (timeArrs[i].click) {
        // 选择工
        if (timeArrs[i].id != 1 && timeArrs[i].id != 2 && timeArrs[i].id != 3) {
          time = 1 / workNum * timeArrs[i].num
          // 选择时间
        } else {
          if (timeArrs[i].id == 1) {
            // 等于模板时间
            time = workNum;
          } else if (timeArrs[i].id == 2) {
            // 等于模板时间的一半
            time = workNum / 2;
          } else if (timeArrs[i].id == 3) {
            // 等于0 
            time = 0;
          }
        }
      }
    }
    // 加班时间
    let addTime = 0;
    for (let i = 0; i < addWorkArrs.length; i++) {
      if (addWorkArrs[i].click) {
        addTime = addWorkArrs[i].num
      }
    }
    // 获取
    if(identity == 2){
      //工资标准 每个工多少钱/上班标准 * 上班时长  判断加班是按小时算还是i按天算
      let total;
      if(data.type === 1){
        // 按小时算 加班小时* 模板加班金额
        total = (moneyNum / workNum) * time + addWorkNum * addTime;
      }else{
        // 按天算 每个工多少钱/模板定义的多少小时算一个工 * 加班时长
        total = moneyNum / workNum * time + (moneyNum / dayNum * addTime);    
      }
      const num = total.toFixed(2);
      // 给工人自己设置工资标准
      let params ={
        identity: identity,
        worktime_define: data.work,
        overtime_type: data.type,
        overtime_money: data.dayAddWork,
        money: data.money,
        overtime: data.day,
        group_info: groupInfo
      }
      bkSetWorkerIdentityWageAction(params).then(res=>{
        if(res.code !== 200){
          Msg(res.msg)
        }
      })
      setModel({ ...model, workersWages:num});
      setWageStandardDisplay(false);
      
      return;
    }
    if (addStandard === 1){
      let params = {
        name:'',
        worktime_define: data.work,
        overtime_type: data.type,
        overtime_money: data.dayAddWork,
        money: data.money,
        overtime: data.day,
      }
      bkAddWageAction(params).then(res=>{
        if(res.code === 200){
          bkWageStandGetWage();
          setWagesModalDisplay(true)
        }else{
          Msg(res.msg);
          return
        }
      })
      return;
    }
    // 修改已设置的
    if(state === 1){
      let params = {
        id: data.id,
        group_info: groupInfo,
        worktime_define: data.work,
        overtime_type: data.type,
        overtime: data.day,
        overtime_money: data.dayAddWork,
        money: data.money,
        type: 'wage'//后端说修改type传这个
      };
      bkUpdateWorkerAction(params).then(res => {
        if (res.code === 200) {
          bkGetWorkerWage();
          setWagesModalDisplay(true);
          setWageStandardDisplay(false);
        } else {
          Msg(res.msg);
        }
      })
    }else{
      let params = {
        // name:'',
        worktime_define: data.work,
        overtime_type:data.type,
        overtime_money: data.dayAddWork,
        money: data.money,
        overtime:data.day,
        id:data.id
        // type: 'wage'//后端说修改type传这个
      }
      bkupdateWageAction(params).then(res=>{
        if(res.code === 200 ){
          bkWageStandGetWage();
        }else{
          Msg(res.msg);
          return
        }
        setWageStandardDisplay(false);
      })
    }
  }
  // 切换时间还是天
  const handleWageStandardRadio = (e)=>{
    const data = JSON.parse(JSON.stringify(wageStandard));
    data.type = e.id;
    const arr = data.data.map(v=>{
      if(e.id === v.id){
        v.click = true
      }else{
        v.click = false
      }
      return v;
    })
    data.data = arr;
    setWageStandard(data)
  }
  // 修改
  const handleEditWages = (v:any,type:number)=>{
    // 判断是修改标准还是修改已有人的工资标准
    setState(type)
    //判断不是新增
    setAddStandard(0)
    setWageStandardDisplay(true);
    setWagesModalDisplay(false);
    const data = JSON.parse(JSON.stringify(wageStandard));
    data.work = v.worktime_define;
    data.money = v.money;
    data.addWork = v.overtime_money;
    data.state = 1;
    data.id = v.id;
    data.group_info = v.groupInfo;
    data.type = v.overtime_type;
    data.day = v.overtime;
    for(let i =0;i<data.data.length;i++){
      if (parseInt(v.overtime_type) == data.data[i].id ){
        data.data[i].click = true
      }else{
        data.data[i].click = false
      }
    }
    setWageStandard(data)
  }
  // 修改已定义工资标准
  const handleEditWageStandard = ()=>{
    const item = JSON.parse(JSON.stringify(wageStandard));
    let params = {
      id:item.id,
      group_info: groupInfo,
      worktime_define: item.work,
      overtime_type:item.type,
      overtime: item.day,
      overtime_money: item.dayAddWork,
      money:item.money,
      type: 'wage'//后端说修改type传这个
    };
    bkUpdateWorkerAction(params).then(res=>{
      if(res.code === 200){
        bkGetWorkerWage();
        setWagesModalDisplay(true);
        setWageStandardDisplay(false);
      }else{
        Msg(res.msg);
      }
    })
  }
  // 修改工资tab
  const handleAtSwitch = (e: number) => {
    if (e === 0) {
      setTab(1)
    } else {
      setTab(0)
    }
  }
  // 删除项目
  const handleDelProject = (id)=>{
    let params = {
      ids:id
    }
    Taro.showModal({
      title:'提示',
      content:'确认删除',
      showCancel:true,
      success:(res)=>{
        if (res.confirm == true){
          bkDeleteprojectTeamAction(params).then(res => {
            if (res.code === 200) {
              bkGetProjectTeam();
            } else {
              Msg(res.msg)
            }
          })
        }
      }
    })
  }
  // 确认修改项目
  const handleEditProject = ()=>{
    const data = JSON.parse(JSON.stringify(editProjectData));
    let params = {
      group_info: data.group_info,
      team_name: data.team_name,
      group_name: data.group_name,
    }
    bkUpdateProjectTeamAction(params).then(res=>{
      if(res.code === 200){
        setEditProjectDisplay(false);
        bkGetProjectTeam();
      }else if(res.code === 400){
        Msg(res.msg)
        return;
      }
    })
  }
  // 修改项目弹框
  const handleEditProjectModal = (v)=>{
    setEditProjectDisplay(true);
    const data = JSON.parse(JSON.stringify(editProjectData))
    data.group_info = v.child[0].pid+','+v.child[0].id;
    data.team_name = v.child[0].name;
    data.group_name = v.name;
    setEditProjectData(data);
  }
  // 修改项目组输入框
  const handleEditProjectData =(type,e)=>{
    let data = JSON.parse(JSON.stringify(editProjectData));
    data[type] = e.detail.value;
    setEditProjectData(data);
  }
  // 给工人设置标准
  const handleSetWagesModal = ()=>{
    if (!templateId){
      Msg('请选择模板');
      return;
    }
    let worker_ids:string[] =[];
    for (let i = 0; i < setWorkList.length;i++){
      if (setWorkList[i].click){
        worker_ids.push(setWorkList[i].id);
      }
    }
    const params={
      worker_ids: worker_ids.toString(),
      wage_id: templateId,
      group_info:groupInfo
    };
    bkSetWorkerMoneyByWageAction(params).then(res=>{
      if(res.code === 200){
        // // 给设置模板的设置为已经设置模板
        const data = JSON.parse(JSON.stringify(workerItem));
        for(let i =0;i<data.length;i++){
          for (let j = 0; j < worker_ids.length;j++){
            if (data[i].id == worker_ids[j]){
              data[i].set = true;
              data[i].del = false;
            }
          }
        }
        setWorkerItem(data)
        bkGetWorkerWage();
        setWagesModalDisplay(false);
      }else{
        Msg(res.msg);
        return;
      }
    })
  }
  // 选择工人
  const handleWagesList = (v)=>{
    const data = JSON.parse(JSON.stringify(setWorkList));
    for (let i = 0; i < data.length;i++){
      if(v.id === data[i].id){
        data[i].click = !data[i].click;
      }
    }
    let clickData:any[]=[] ;
    for(let i=0;i<data.length;i++){
      if(data[i].click){
        clickData.push(data[i]);
      }
    }
    setClickModalNum(clickData.length)
    setSetWorkList(data);
  }
  // 选模板
  const handleCheckboxStandard = (v)=>{
    const data = JSON.parse(JSON.stringify(standard));
    for(let i=0;i<data.length;i++){
      if(v.id === data[i].id){
        data[i].click = true;
        setTemplateId(v.id);
      }else{
        data[i].click = false
      }
    }
    setStandard(data);
  }
  // 选择工人
  const handleWorkerItem = (v)=>{
    const modelData = JSON.parse(JSON.stringify(model));
    if (!modelData.name){
      Msg('请先选择项目')
      return
    }
    const data = JSON.parse(JSON.stringify(workerItem));
    for(let i=0;i<data.length;i++){
      if(v.id === data[i].id){
        if(v.set){
          data[i].click = !data[i].click
        }else{
          handleOpenWagesModal();
        }
      }
    }
    let numData:any[]=[];
    for(let i =0;i<data.length;i++){
      if(data[i].click){
        numData.push(data[i])
      }
    }
    setClickNum(numData.length);
    setWorkerItem(data);
  }
  // 成员全选
  const handleAllChange = ()=>{
    const data = JSON.parse(JSON.stringify(workerItem));
    let Itme:any[] =[];
    for(let i =0;i<data.length;i++){
      if(data[i].set){
        Itme.push(data[i]);
        data[i].click = true;
      }else{
        Msg('还有人未设置工资标准')
      }
    }
    
    setWorkerItem(data);
    setClickNum(Itme.length);
  }
  // 长按
  const handleLongClick = ()=>{
    setWageStandardDisplay(true)
  }
  // 全选
  const handleAllClick = ()=>{
    const data = JSON.parse(JSON.stringify(setWorkList));
    for(let i =0;i<data.length;i++){
      data[i].click = true
    };
    setSetWorkList(data);
    setClickModalNum(data.length);
  }
  // 切换包工类型
  const handleRadio = (v) => {
    const data = JSON.parse(JSON.stringify(contractorArr.item));
    for(let i =0;i<data.length;i++){
      if(data[i].id === v.id ){
        data[i].click = true
        setContractor(v.id)
      }else{
        data[i].click = false;
      }
    }
    setContractorArr({ item: data });
  }
  // 跳转
  const userRouteJump = (url: string) => {
    Taro.navigateTo({
      url: url
    })
  }
  // 选择工人添加，没有选择项目无法选择
  const handleAdd = ()=>{
    if (!model.name) {
      Msg('请选择项目')
      return
    }
    bkGetWorker();
    // setRefresh(true)
    userRouteJump(`/pages/addTeamMember/index?groupInfo=${groupInfo}`) 
  }
  return {
    model,
    project, 
    setModel,
    setProject,
    handleInput,
    handleAddProject,
    workOvertimeDisplay,
    handleworkOvertime,
    setWorkOvertimeDisplay,
    workingHoursDisplay, 
    setWorkingHoursDisplay,
    timeType,
    handleWorkingHours,
    addWorkArr,
    timeArr,
    handleWorkOvertimeOk,
    company,
    handleQuantities,
    unit,
    quantitiesDisplay, 
    setQuantitiesDisplay,
    borrowing, 
    setBorrowing,
    handleRadioBorrowing,
    workerItem, 
    setWorkerItem,
    handleEstablish,
    addMemberDisplay, 
    setAddMemberDisplay,
    handleDel,
    handleDelList,
    delType,
    setDeldelType,
    handleAddStandard,
    wagesModalDisplay, 
    setWagesModalDisplay,
    wageStandardDisplay, 
    setWageStandardDisplay,
    wageStandard,
    handleWageStandard,
    handlePreservation,
    recorderTypeArr, 
    setRecorderTypeArr,
    handleCalendar,
    projectArr,
    handleProject,
    show, 
    setShow, 
    workerList, 
    setWorkerList,
    handleCheckbox,
    memberList,
    setMemberList,
    storagelist, 
    setStoragelist,
    handleStart,
    standard,
    handleAddWage,
    handleWageStandardRadio,
    handleOpenWagesModal,
    moneyList,
    handleEditWages,
    handleEditWageStandard,
    tab,
    handleAtSwitch,
    handleDelProject,
    editProjectDisplay, 
    setEditProjectDisplay,
    handleEditProject,
    handleEditProjectModal,
    editProjectData,
    handleEditProjectData,
    handleSetWagesModal,
    handleWagesList,
    setWorkList, 
    setSetWorkList,
    handleCheckboxStandard,
    groupInfo,
    image, 
    setImage,
    bkGetWorker,
    contractorArr, 
    setContractorArr,
    num,
    handleWorkerItem,
    timeData, 
    setTimeData,
    handleAllChange,
    clickNum,
    clickModalNum,
    refresh,
    setRefresh,
    handleLongClick,
    identity, 
    setIdentity,
    foreman,
    foremanTitle,
    handleAllClick,
    setContractor,
    handleRadio,
    contractor,
    handleAdd
  }
}