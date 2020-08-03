import Taro, { useState, useEffect, useDidShow, getStorageInfoSync, useDidHide, useRouter } from '@tarojs/taro'
import { bkAddProjectTeamAction, bkAddWorkerActiion, bkDeleteRroupWorkerAction, bkAddBusinessAction, bkGetProjectTeamAction, bkGetWorkerAction, bkWageStandGetWageAction, bkAddWageAction, bkGetWorkerWageAction, bkUpdateWorkerAction, bkDeleteprojectTeamAction, bkUpdateProjectTeamAction, bkSetWorkerMoneyByWageAction, bkupdateWageAction, bkSetGroupLeaderAction, bkSetWorkerIdentityWageAction, bkgetLastGroupInfoAction } from '../../utils/request/index'
import { MidData, Type, Calendar, RecordTime, User, Tomorrow } from '../../config/store'
import { bkGetProjectTeamData } from '../../utils/request/index.d'
import { useDispatch, useSelector } from '@tarojs/redux'
import { setWorker } from '../../actions/workerList'
import { setmailList } from '../../actions/mailList'
import { setUserList } from '../../actions/userList';
import { setClickTIme } from '../../actions/clickTIme'
import { setPhoneList } from '../../actions/phoneList';
import Msg from '../../utils/msg';
import { isPhone } from '../../utils/v'
export interface BorrowingType {
  item: DataType[]
}
interface ModelType {
  groupName: string,
  teamName: string,
  name: string,
  time: string,
  details: string,
  duration: string,
  amount: string,
  price: string,
  wages: string,
  borrowing: string,
  univalent: string,
  userName: string,
  phone: string,
  workersWages: string,
}
interface DataType {
  id: number,
  name: string,
  click: boolean,
  num?: number,
  whole?: boolean
}
interface WorkerItemType {
  name: string,
  id: number,
  del?: boolean,
  click?: boolean,
  set?: boolean,
  discipline?: boolean,
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
interface TimeType {
  year: string,
  monent: string,
}
export default function userForeman() {
  // const router: Taro.RouterInfo = useRouter();
  // const { stateType } = router.params;
  // 获取存入的公用内容
  const useSelectorItem = useSelector<any, any>(state => state)
  const dispatch = useDispatch()

  // 是工人还是班组
  const [identity, setIdentity] = useState<number>(1)
  // 上班时长
  const [timeArr, setTimeArr] = useState<DataType[]>([
    { id: 1, name: '一个工', click: false, num: 1, whole: true },
    { id: 2, name: '半个工', click: false, num: 0.5, whole: true },
    { id: 3, name: '休息', click: false, num: 0 },
    { id: 4, name: '0.0小时', click: false, num: 0 },
  ])
  //加班时长
  const [addWorkArr, setAddWorkArr] = useState<DataType[]>(
    [
      { id: 1, name: '无加班', click: false, num: 0 },
      { id: 2, name: '0.0小时', click: false, num: 0 },
    ]
  )
  // 选择大单位
  const [company, setCompany] = useState<DataType[]>([
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
  })
  const [wageStandard, setWageStandard] = useState<any>({
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
  })
  // 工人切换ID
  const [userId, setUserId] = useState<string>('');
  // 成功弹窗
  const [display, setDisplay] = useState<boolean>(false)
  // 选择记工类型012
  const [recorderType, setRecorderType] = useState<number>(1)
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
  const [timeType, setTimeType] = useState<number>(0)
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
    name: '',
    id: 0,
    click: false,
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
  const [ids, setIds] = useState<string>('');
  // 判断工资标准修改类型
  const [state, setState] = useState<number>(0)
  // 选择班主成员
  const [memberList, setMemberList] = useState<any>([])
  // 工人列表
  const [workerList, setWorkerList] = useState<any>()
  //储存工人
  const [storagelist, setStoragelist] = useState<any>([])
  // 工资标准
  const [standard, setStandard] = useState<any>([])
  // 已设置工资标准
  const [moneyList, setMoneyList] = useState<any>([])
  // 工资tab类型
  const [tab, setTab] = useState<number>(0)
  // 是否全选
  const [allClick, setAllClick] = useState<boolean>(false)
  // 选择人数
  const [clickNum, setClickNum] = useState<number>(0);
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
  const [groupInfo, setGroupInfo] = useState<string>('')
  // 添加标准
  const [addStandard, setAddStandard] = useState<number>(0)
  // 日历（不等于借支）
  const [timeData, setTimeData] = useState<any[]>([]);
  // modal选择工人
  const [clickModalNum, setClickModalNum] = useState<number>(0)
  // 刷新
  const [refresh, setRefresh] = useState<boolean>(false)
  // 触摸时间设置
  const [endTime, setEndTime] = useState<number>();
  const [startTime, setStartTime] = useState<number>()
  // 日历
  // 日历
  const [calendarModalDisplay, setCalendarModalDisplay] = useState<boolean>(false)
  // 获取当月天数
  const [calendarDays, setCalendarDays] = useState<any[]>([]);
  // 设置点击了的日历
  const [clickData, setClickData] = useState<any[]>([])
  const [arr, setArr] = useState<any[]>([]);
  // 设置打开日时点击的值
  const [openClickTime, setOpenClickTime] = useState<any[]>([])
  // 刷新
  //农历1949-2100年查询表
  let lunarYearArr = [
    0x0b557, //1949
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
    0x0d520 //2100
  ];
  let lunarMonth = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
  let lunarDay = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '初', '廿'];
  let tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  let diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  // 左边时间
  const [time, setTime] = useState<TimeType>({
    year: '',
    monent: '',
  })
  // 设置存redux的日期
  const [reduxTime, setReduxTime] = useState<any[]>([])
  // 工资标准全选
  const [checkAll, setCheckAll] = useState<boolean>(false)
  useEffect(() => {
    bkGetProjectTeam();
  }, [])

  const test = () => {
    console.log(123)
  }
  // useEffect(()=>{
  //   // 获取角色
  //   let type = Taro.getStorageSync(Type);
  //   setIdentity(type);
  //   handleUser();
  //   // 获取用户信息
  //   let midData = Taro.getStorageSync(MidData)
  //   // }
  //   const objs = JSON.parse(JSON.stringify(obj))
  //   objs.name = midData.nickname||'未命名';
  //   objs.id = midData.worker_id;
  //   setObj(objs);
  //   if (!useSelectorItem.workerList.length && !refresh){
  //     // 获取通讯里信息
  //     const workerItemData = JSON.parse(JSON.stringify(workerItem));
  //     // 获取设置员工信息
  //     // if (useSelectorItem.userList.length) {
  //     //   useSelectorItem.userList.push(objs);
  //     //   setWorkerItem(useSelectorItem.userList)
  //     // }else{
  //       workerItemData.push(objs);
  //       setWorkerItem(workerItemData)
  //     // 获取项目名称
  //     bkGetProjectTeam();
  //     // 获取工人列表
  //     // bkGetWorker(groupInfo);
  //     // 工资标准
  //     bkWageStandGetWage();
  //     // 日历点击的值
  //     if (useSelectorItem.clickTIme.length > 0) {
  //       setReduxTime(useSelectorItem.clickTIme);
  //     };
  //     // 获取上次记录项目
  //     // if (stateType){
  //       // const Data = JSON.parse(JSON.stringify(model));
  //       // let params={
  //       //   identity : type,
  //       // }
  //       // bkgetLastGroupInfoAction(params).then(res=>{
  //       //   if(res.code === 200){
  //       //     // 判断有值的话找到对应的赋值
  //       //     if(res.data){
  //       //       bkGetProjectTeamAction({}).then(resItem => {
  //       //         if(resItem.code === 200){
  //       //           if(resItem.data.length){
  //       //             for(let i =0;i<resItem.data.length;i++){
  //       //               if (res.data == (resItem.data[i].group_id+','+resItem.data[i].id)){
  //       //                 setGroupInfo(resItem[i].group_id);
  //       //                 // 设置项目名称
  //       //                 const name = resItem[i].group_name + '-' +  resItem[i].name
  //       //                 setModel({...Data,name});
  //       //                 // 获取
  //       //               }
  //       //             }
  //       //           }
  //       //         }
  //       //       })
  //       //     }
  //       //   }
  //       // })
  //     }
  //     // 日历
  //     getMonthDaysCurrent(new Date());
  //   // }
  //   // 判断选择回来 
  //   if (useSelectorItem.workerList.length > 0) {
  //     if (identity === 2) {
  //       setForeman(useSelectorItem.workerList);
  //       if (useSelectorItem.workerList[0].leader_name){
  //         setForemanTitle(useSelectorItem.workerList[0].leader_name);
  //       }
  //       // else{
  //       //   setForemanTitle(useSelectorItem.workerList[0].name);
  //       // }
  //       return;
  //     }
  //     //  ======= 需要修改，等获取到本人信息后
  //     let objs = JSON.parse(JSON.stringify(obj));
  //     const data = JSON.parse(JSON.stringify(moneyList));
  //     const arrList = JSON.parse(JSON.stringify(useSelectorItem.workerList));
  //     if (data.length > 0) {
  //       for (let j = 0; j < data.length; j++) {
  //         for (let i = 0; i < arrList.length; i++) {
  //           arrList[i].click = false;
  //           if (data[j].worker_id === arrList[i].id) {
  //             arrList[i].set = true
  //           }
  //         }
  //       }
  //     } else {
  //       for (let i = 0; i < arrList.length; i++) {
  //         arrList[i].click = false;
  //       }
  //     }
  //     for (let i = 0; i < arrList.length; i++) {
  //       if (arrList[i].id === objs.id) {
  //         objs = arrList[i];
  //         arrList.splice(i, 1)
  //       }
  //     }
  //     setWorkerItem([objs, ...arrList])
  //   }
  // }, [useSelectorItem.workerList])
  // 关闭清空时间
  // useDidHide(()=>{
  //   // setTimeData([]);
  //   const calendar = JSON.parse(JSON.stringify(calendarDays));
  //   for (let i = 0; i < calendar.length; i++) {
  //     calendar[i].click = false
  //   }
  //   setCalendarDays(calendar);
  //   setClickData([]);
  //   // 设置日历rudux为空
  //   dispatch(setClickTIme([]))
  // })
  // 日历
  // 设置年月日小于0前面加0
  const addZero = (num) => {
    if (parseInt(num) < 10) {
      num = '0' + num;
    }
    return num;
  }
  // 日历点击
  const handleClickCalendar = (v: any) => {
    const date = v.year + '-' + addZero(v.month) + '-' + addZero(v.date);
    const dates = (new Date(date)).valueOf();
    const newDate = (new Date()).valueOf();
    if (newDate < dates) {
      Msg('请设置今天之前的日期');
      return;
    }
    const clickDataItem = JSON.parse(JSON.stringify(clickData));
    const calendarDaysArr = JSON.parse(JSON.stringify(calendarDays));
    // 遍历本月的值
    for (let i = 0; i < calendarDaysArr.length; i++) {
      // 判断是同一天就设置点击
      if (v.date == calendarDaysArr[i].date && v.month == calendarDaysArr[i].month && v.year == calendarDaysArr[i].year && !v.up && !v.next) {
        if (clickDataItem.length > 30) {
          if (calendarDaysArr[i].click) {
            calendarDaysArr[i].click = !calendarDaysArr[i].click;
            // 点击的时候用的
            let data: any[] = [];
            // 判断是true时候删除
            if (calendarDaysArr[i].click) {
              data = [...clickDataItem, calendarDaysArr[i]];
              // 增加
            } else {
              // calendarDaysArr.sp
              for (let j = 0; j < clickDataItem.length; j++) {
                if (clickDataItem[j].date == calendarDaysArr[i].date && clickDataItem[j].month == calendarDaysArr[i].month && clickDataItem[j].year == calendarDaysArr[i].year) {
                  clickDataItem.splice(j, 1)
                }
              }
              data = [...clickDataItem];
            }
            setClickData(data)
          } else {
            Msg('最多选择31天')
            return;
          }
        } else {
          calendarDaysArr[i].click = !calendarDaysArr[i].click;
          // 点击的时候用的
          let data: any[] = [];
          // 判断是true时候删除
          if (calendarDaysArr[i].click) {
            data = [...clickDataItem, calendarDaysArr[i]];
            // 增加
          } else {
            // calendarDaysArr.sp
            for (let j = 0; j < clickDataItem.length; j++) {
              if (clickDataItem[j].date == calendarDaysArr[i].date && clickDataItem[j].month == calendarDaysArr[i].month && clickDataItem[j].year == calendarDaysArr[i].year) {
                clickDataItem.splice(j, 1)
              }
            }
            data = [...clickDataItem];
          }
          setClickData(data)
        }
        setCalendarDays(calendarDaysArr);
        return;
        // }
        //就刷新更改
      } else {
        // 判断向上还是向下
        // 向上
        if (v.up) {
          let date = new Date(calendarDaysArr[i].year, calendarDaysArr[i].month - 1, calendarDaysArr[i].date);
          getMonthDaysCurrent(date);
          return;
          // 向下
        } else if (v.next) {
          let date = new Date(calendarDaysArr[i].year, calendarDaysArr[i].month + 1, calendarDaysArr[i].date)
          getMonthDaysCurrent(date);
          return;
        }
      }
    }
  }
  // 对应月份日期
  const getMonthDaysCurrent = (e, val?: any, ids?: any, typeId?: string, ) => {
    const groupInfos = JSON.parse(JSON.stringify(groupInfo));
    let id;
    if (ids) {
      id = ids;
    } else {
      id = groupInfos;
    }
    let dataType;
    if (typeId) {
      dataType = typeId;
    } else {
      recorderTypeArr.item.map((v) => {
        if (v.click) {
          dataType = v.id;
        }
      })
    }
    // 获取点击了的数据
    let clickDataArr;
    if (val) {
      clickDataArr = val;
    } else {
      clickDataArr = JSON.parse(JSON.stringify(clickData));
    }
    // const clickDataArr = JSON.parse(JSON.stringify(clickData));
    let data;
    if (useSelectorItem.clickTIme.length > 0) {
      data = useSelectorItem.clickTIme;
    }
    // const data = JSON.parse(JSON.stringify(reduxTime));
    let year = e.getFullYear() //年
    let month = e.getMonth() + 1 //月
    let date = e.getDate() // 日
    let day = e.getDay() // 周几
    let days = new Date(year, month, 0).getDate() //当月天数(即下个月0号=当月最后一天)
    let firstDayDate = new Date(year, month - 1, 1) // 当月1号
    let firstDay = firstDayDate.getDay() //当月1号对应的星期
    let lastDate = new Date(year, month - 1, days) //当月最后一天日期
    let lastDay = lastDate.getDay() //当月最后一天对应的星期
    // 设置时间
    setTime({ year, monent: month })
    // 上个月显示的天数及日期
    const calendarDaysArr: any = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      let date = new Date(year, month - 1, -i)
      const lunarCalendarItem = sloarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
      calendarDaysArr.push({
        'year': date.getFullYear(),
        'month': date.getMonth() + 1,
        'date': date.getDate(),
        'day': date.getDay(),
        'lunarCalendarItem': lunarCalendarItem.lunarDay,
        'current': false,
        'selected': false,
        'up': true,
      })
    }
    // 当月的数据显示点击
    // 当月显示的日期
    for (let i = 1; i <= days; i++) {
      const lunarCalendarItem = sloarToLunar(year, month, i);
      // 获取现在的时间的年月日
      const years = new Date().getFullYear();
      const months = new Date().getMonth() + 1;
      const dates = new Date().getDate();
      calendarDaysArr.push({
        'year': year,
        'month': month,
        'date': i,
        'day': new Date(year, month - 1, i).getDay(),
        'current': true,
        'lunarCalendarItem': lunarCalendarItem.lunarDay,
        'selected': i == date, // 判断当前日期
        'stop': years <= year && ((months == month && dates < i) || months < month),
      })
    }
    // 下个月显示的天数及日期
    for (let i = 1; i < 7 - lastDay; i++) {
      let date = new Date(year, month, i)
      const lunarCalendarItem = sloarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
      calendarDaysArr.push({
        'year': date.getFullYear(),
        'month': date.getMonth() + 1,
        'date': date.getDate(),
        'day': date.getDay(),
        'lunarCalendarItem': lunarCalendarItem.lunarDay,
        'current': false,
        'selected': false,
        'next': true,
        // 'stop':true
      })
    }
    // 设置内容
    if (data) {
      if (data.length > 0) {
        for (let i = 0; i < calendarDaysArr.length; i++) {
          for (let j = 0; j < data[0].length; j++) {
            if (calendarDaysArr[i].year == data[0][j].year && calendarDaysArr[i].month == data[0][j].month && calendarDaysArr[i].day == data[0][j].day && calendarDaysArr[i].lunarCalendarItem == data[0][j].lunarCalendarItem) {
              calendarDaysArr[i].click = true
            }
          }
        }
      }
    }
    // 设置点击
    // 遍历点击
    if (clickDataArr.length > 0) {
      for (let i = 0, len = clickDataArr.length; i < len; i++) {
        if (clickDataArr[i].click) {
          // 遍历i日期
          for (let j = 0, length = calendarDaysArr.length; j < length; j++) {
            if (clickDataArr[i].date == calendarDaysArr[j].date && clickDataArr[i].month == calendarDaysArr[j].month && clickDataArr[i].year == calendarDaysArr[j].year) {
              calendarDaysArr[j].click = true;
            }
          }
        }
      }
    }
    // 获取记录过的日历
    const calendarItem = Taro.getStorageSync(Calendar);
    // 获取项目类型
    if (calendarItem.length > 0) {
      for (let i = 0, len = calendarItem.length; i < len; i++) {
        // 判断日历ID与项目ID相同
        if (calendarItem[i].id == id && calendarItem[i].dataType == dataType) {
          if (calendarItem[i].data.length > 0) {
            calendarItem[i].data.map(v => {
              calendarDaysArr.map(val => {
                if (v.date == val.date && v.month == val.month && v.year == val.year) {
                  val.record = true;
                }
                return val;
              })
              return v;
            })
          }
        }
      }
    }
    setCalendarDays(calendarDaysArr)
  }
  // 公历转农历函数
  const sloarToLunar = (sy, sm, sd) => {
    // 输入的月份减1处理
    sm -= 1;

    // 计算与公历基准的相差天数
    // Date.UTC()返回的是距离公历1970年1月1日的毫秒数,传入的月份需要减1
    let daySpan = (Date.UTC(sy, sm, sd) - Date.UTC(1949, 0, 29)) / (24 * 60 * 60 * 1000) + 1;
    let ly, lm, ld;
    // 确定输出的农历年份
    for (let j = 0; j < lunarYearArr.length; j++) {
      daySpan -= lunarYearDays(lunarYearArr[j]);
      if (daySpan <= 0) {
        ly = 1949 + j;
        // 获取农历年份确定后的剩余天数
        daySpan += lunarYearDays(lunarYearArr[j]);
        break
      }
    }

    // 确定输出的农历月份
    for (let k = 0; k < lunarYearMonths(lunarYearArr[ly - 1949]).length; k++) {
      daySpan -= lunarYearMonths(lunarYearArr[ly - 1949])[k];
      if (daySpan <= 0) {
        // 有闰月时，月份的数组长度会变成13，因此，当闰月月份小于等于k时，lm不需要加1
        if (hasLeapMonth(lunarYearArr[ly - 1949]) && hasLeapMonth(lunarYearArr[ly - 1949]) <= k) {
          if (hasLeapMonth(lunarYearArr[ly - 1949]) < k) {
            lm = k;
          } else if (hasLeapMonth(lunarYearArr[ly - 1949]) === k) {
            lm = '闰' + k;
          } else {
            lm = k + 1;
          }
        } else {
          lm = k + 1;
        }
        // 获取农历月份确定后的剩余天数
        daySpan += lunarYearMonths(lunarYearArr[ly - 1949])[k];
        break
      }
    }

    // 确定输出农历哪一天
    ld = daySpan;

    // 将计算出来的农历月份转换成汉字月份，闰月需要在前面加上闰字
    if (hasLeapMonth(lunarYearArr[ly - 1949]) && (typeof (lm) === 'string' && lm.indexOf('闰') > -1)) {
      lm = `闰${lunarMonth[parseInt(lm) - 1]}`
    } else {
      lm = lunarMonth[lm - 1];
    }

    // 将计算出来的农历年份转换为天干地支年
    ly = getTianGan(ly) + getDiZhi(ly);

    // 将计算出来的农历天数转换成汉字
    if (ld < 11) {
      ld = `${lunarDay[10]}${lunarDay[ld - 1]}`
    } else if (ld > 10 && ld < 20) {
      ld = `${lunarDay[9]}${lunarDay[ld - 11]}`
    } else if (ld === 20) {
      ld = `${lunarDay[1]}${lunarDay[9]}`
    } else if (ld > 20 && ld < 30) {
      ld = `${lunarDay[11]}${lunarDay[ld - 21]}`
    } else if (ld === 30) {
      ld = `${lunarDay[2]}${lunarDay[9]}`
    }
    return {
      lunarYear: ly,
      lunarMonth: lm,
      lunarDay: ld,
    }
  }
  // 计算农历一年的总天数，参数为存储农历年的16进制
  // 农历年份信息用16进制存储，其中16进制的第2-4位（0x除外）可以用于表示正常月是大月还是小月
  function lunarYearDays(ly) {
    let totalDays = 0;

    // 获取正常月的天数，并累加
    // 获取16进制的第2-4位，需要用到>>移位运算符
    for (let i = 0x8000; i > 0x8; i >>= 1) {
      let monthDays = (ly & i) ? 30 : 29;
      totalDays += monthDays;
    }
    // 如果有闰月，需要把闰月的天数加上
    if (hasLeapMonth(ly)) {
      totalDays += leapMonthDays(ly);
    }

    return totalDays
  }
  // 获取农历每个月的天数
  // 参数需传入16进制数值
  function lunarYearMonths(ly) {
    let monthArr: any = [];

    // 获取正常月的天数，并添加到monthArr数组中
    // 获取16进制的第2-4位，需要用到>>移位运算符
    for (let i = 0x8000; i > 0x8; i >>= 1) {
      monthArr.push((ly & i) ? 30 : 29);
    }
    // 如果有闰月，需要把闰月的天数加上
    if (hasLeapMonth(ly)) {
      monthArr.splice(hasLeapMonth(ly), 0, leapMonthDays(ly));
    }

    return monthArr
  }
  // 计算农历年是否有闰月，参数为存储农历年的16进制
  // 农历年份信息用16进制存储，其中16进制的最后1位可以用于判断是否有闰月
  function hasLeapMonth(ly) {
    // 获取16进制的最后1位，需要用到&与运算符
    if (ly & 0xf) {
      return ly & 0xf
    } else {
      return false
    }
  }
  // 将农历年转换为天干，参数为农历年
  const getTianGan = (ly) => {
    let tianGanKey = (ly - 3) % 10;
    if (tianGanKey === 0) tianGanKey = 10;
    return tianGan[tianGanKey - 1]
  }

  // 将农历年转换为地支，参数为农历年
  function getDiZhi(ly) {
    let diZhiKey = (ly - 3) % 12;
    if (diZhiKey === 0) diZhiKey = 12;
    return diZhi[diZhiKey - 1]
  }
  // 如果有闰月，计算农历闰月天数，参数为存储农历年的16进制
  // 农历年份信息用16进制存储，其中16进制的第1位（0x除外）可以用于表示闰月是大月还是小月
  const leapMonthDays = (ly) => {
    if (hasLeapMonth(ly)) {
      // 获取16进制的第1位（0x除外）
      return (ly & 0xf0000) ? 30 : 29
    } else {
      return 0
    }
  }
  // 获取项目名称
  const bkGetProjectTeam = (groupName?: string, isAgain?: boolean) => {
    bkGetProjectTeamAction({}).then(res => {
      if (res.code === 200) {
        // 如果是工人的话默认选中第一条有数据
        // 多条选中最近一条
        // 工人
        const modalObj = JSON.parse(JSON.stringify(model));
        const identity = Taro.getStorageSync(Type)
        // 工人
        if (identity === 2) {
          // 没有数据的时候
          if (res.data.length === 0) {
            // 设置一个工无加班
            // let duration = modalObj.duration;
            const duration = '一个工,无加班';
            // 一个工所以为0直接设置
            const data = JSON.parse(JSON.stringify(timeArr));
            data[0].click = true;
            setTimeArr(data);
            // 设置今天
            const years = new Date().getFullYear();
            const months = new Date().getMonth() + 1;
            const dates = new Date().getDate();
            const time = years + '-' + months + '-' + dates;
            const clickDataArr = [{
              year: years,
              month: months,
              date: dates,
              click: true
            }];
            setOpenClickTime(clickDataArr)
            setClickData(clickDataArr);
            setProjectArr(res.data);
            getMonthDaysCurrent(new Date(), clickDataArr, '')
            // bkGetWorkerWage()
            const wageStandardData = JSON.parse(JSON.stringify(wageStandard));
            wageStandardData.work = 0;
            wageStandardData.addWork = 0;
            wageStandardData.money = 0;
            wageStandardData.day = 0;
            wageStandardData.type = 1;
            wageStandardData.dayAddWork = 0;
            setWageStandard(wageStandardData)
            //设置工人工资为0
            setModel({ ...modalObj, duration, time, name: '', workersWages: '0', details: '' })
            // setModel({ ...model, workersWages: '0' })
            return;
          }
          // 不是创建项目的时候
          if (!model.groupName) {
            let type = Taro.getStorageSync(Type);
            bkgetLastGroupInfoAction({ identity: type }).then(resData => {
              // 判断有上一个项目
              if (resData.code === 200 && resData.data.length > 0) {
                for (let i = 0; i < res.data.length; i++) {
                  // 判断遍历出项目
                  // 判断与上一个项目相同，否则取第一个
                  if (res.data[i].group_id + ',' + res.data[i].id === resData.data || res.data.length > 0) {
                    // const data = JSON.parse(JSON.stringify(model));
                    // 设置默认点击
                    res.data[0].click = true;
                    // 设置groupInfo
                    const groupInfos = res.data[0].group_id + ',' + res.data[0].id;
                    setGroupInfo(res.data[0].group_id + ',' + res.data[0].id)
                    // 设置名字
                    const name = res.data[i].group_name + '-' + res.data[i].name;
                    // 设置班组长
                    dispatch(setWorker([res.data[0]]))
                    setForemanTitle(res.data[i].leader_name || '');
                    // 设置一个工无加班
                    // let duration = modalObj.duration;
                    const duration = '一个工,无加班';
                    // 一个工所以为0直接设置
                    const data = JSON.parse(JSON.stringify(timeArr));
                    data[0].click = true;
                    setTimeArr(data);
                    // 设置今天
                    const years = new Date().getFullYear();
                    const months = new Date().getMonth() + 1;
                    const dates = new Date().getDate();
                    const time = years + '-' + months + '-' + dates;
                    const clickDataArr = [{
                      year: years,
                      month: months,
                      date: dates,
                      click: true
                    }];
                    setOpenClickTime(clickDataArr)
                    setClickData(clickDataArr);
                    setModel({ ...modalObj, name, duration, time, details: '' })
                    setProjectArr(res.data);
                    // getMonthDaysCurrent(new Date(), clickDataArr)
                    let modales;
                    // const modales = { ...modalObj, name, duration, time };
                    if (isAgain) {
                      const obj = {
                        groupName: '',
                        teamName: '',
                        name,
                        time,
                        details: '',
                        duration,
                        amount: '',
                        price: '',
                        wages: '',
                        borrowing: '',
                        univalent: '',
                        userName: '',
                        phone: '',
                        workersWages: '0',
                      }
                      modales = obj;
                    } else {
                      modales = { ...modalObj, name, duration, time, details: '' };
                    }
                    // 设置班组长
                    dispatch(setWorker([res.data[0]]))
                    // 设置工资标准
                    bkGetWorkerWage(res.data[0].group_id + ',' + res.data[0].id, '', modales)
                    // getMonthDaysCurrent(new Date());
                    const id = res.data[0].group_id + ',' + res.data[0].id;
                    getMonthDaysCurrent(new Date(), clickDataArr, id)
                    return;
                    // setModel({ ...data, name: res.data[i].group_name})
                  }
                }
                return;
              } else {
                // 设置默认点击
                res.data[0].click = true;
                // 设置groupInfo
                const groupInfos = res.data[0].group_id + ',' + res.data[0].id;
                setGroupInfo(res.data[0].group_id + ',' + res.data[0].id)
                // 设置名字
                const name = res.data[0].group_name + '-' + res.data[0].name;
                // 设置班组长
                dispatch(setWorker([res.data[0]]))
                setForemanTitle(res.data[0].leader_name || '');
                // 设置一个工无加班
                // let duration = modalObj.duration;
                const duration = '一个工,无加班';
                // 一个工所以为0直接设置
                const data = JSON.parse(JSON.stringify(timeArr));
                data[0].click = true;
                setTimeArr(data);
                // 设置今天
                const years = new Date().getFullYear();
                const months = new Date().getMonth() + 1;
                const dates = new Date().getDate();
                const time = years + '-' + months + '-' + dates;
                const clickDataArr = [{
                  year: years,
                  month: months,
                  date: dates,
                  click: true
                }];
                setOpenClickTime(clickDataArr)
                setClickData(clickDataArr);
                setModel({ ...modalObj, name, duration, time, details: '' })
                setProjectArr(res.data);
                getMonthDaysCurrent(new Date(), clickDataArr, groupInfos)
                let modales;
                // const modales = { ...modalObj, name, duration, time };
                if (isAgain) {
                  const obj = {
                    groupName: '',
                    teamName: '',
                    name,
                    time,
                    details: '',
                    duration,
                    amount: '',
                    price: '',
                    wages: '',
                    borrowing: '',
                    univalent: '',
                    userName: '',
                    phone: '',
                    workersWages: '0',
                  }
                  modales = obj;
                } else {
                  modales = { ...modalObj, name, duration, time, details: '' };
                }
                // 设置班组长
                dispatch(setWorker([res.data[0]]))
                // 设置工资标准
                bkGetWorkerWage(res.data[0].group_id + ',' + res.data[0].id, '', modales)
                return;
              }
            })
            // 创建项目的时候
          } else {
            if (res.data && res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                if (groupName == res.data[i].group_name + '-' + res.data[i].name) {
                  res.data[i].click = true;
                  // 清空
                  setModel({ ...modalObj, name: res.data[i].group_name + '-' + res.data[i].name })
                  setForemanTitle('');
                  setProjectArr(res.data);
                  const groupInfos = res.data[i].group_id + ',' + res.data[i].id;
                  getMonthDaysCurrent(new Date(), '', groupInfos);
                  return;
                }
              }
            } else {
              //  清空名字班组长
              setModel({ ...modalObj, name: '', groupName: '', teamName: '' })
              getMonthDaysCurrent(new Date());
              setForemanTitle('')
            }
            setProjectArr(res.data);
          }
        } else {
          // 班组长
          // 新增项目的额时候
          if (groupName) {
            let id;
            for (let i = 0; i < res.data.length; i++) {
              if (groupName === res.data[i].group_name + '-' + res.data[i].name) {
                res.data[i].click = true;
                setModel({ ...modalObj, name: groupName });
                // 然后获取工人列表
                id = res.data[i].group_id + ',' + res.data[i].id;
                bkGetWorker(res.data[i].group_id + ',' + res.data[i].id, true);
              }
            }
            setProjectArr(res.data);
            // const years = new Date().getFullYear();
            // const months = new Date().getMonth() + 1;
            // const dates = new Date().getDate();
            // const time = years + '-' + months + '-' + dates;
            // const clickDataArr = [{
            //   year: years,
            //   month: months,
            //   date: dates,
            //   click: true
            // }];
            // setOpenClickTime(clickDataArr)
            // setClickData(clickDataArr);
            // getMonthDaysCurrent(new Date(), clickDataArr, id);
            return;
          }
          // 角色
          let type = Taro.getStorageSync(Type);
          // 获取上一次记录清空
          bkgetLastGroupInfoAction({ identity: type }).then(resData => {
            // 判断有上一次的值
            if (resData.code === 200) {
              // 有上一次
              if (resData.data) {
                let name, id;
                // 获取项目下的工人
                for (let i = 0; i < res.data.length; i++) {
                  // 判断遍历出项目
                  // 判断与上一次相同的时候
                  if (res.data[i].group_id + ',' + res.data[i].id === resData.data) {
                    const data = JSON.parse(JSON.stringify(model));
                    bkGetWorker(res.data[i].group_id + ',' + res.data[i].id, true);
                    name = res.data[i].group_name + '-' + res.data[i].name;
                    setModel({ ...data, name });
                    res.data[i].click = true;
                    // 设置groupInfo
                    id = res.data[0].group_id + ',' + res.data[0].id;
                    setGroupInfo(res.data[0].group_id + ',' + res.data[0].id)
                    // 设置名字
                    // 不相同的时候选择第一个
                  } else {
                    const data = JSON.parse(JSON.stringify(model));
                    // 判断只有一个数据的时候设置第一个项目为true
                    if (res.data.length === 1) {
                      res.data[0].click = true;
                    }
                    bkGetWorker(res.data[0].group_id + ',' + res.data[0].id, true);
                    name = res.data[0].group_name + '-' + res.data[0].name;
                    setModel({ ...data, name });
                    // 设置groupInfo
                    id = res.data[0].group_id + ',' + res.data[0].id;
                    setGroupInfo(res.data[0].group_id + ',' + res.data[0].id)
                  }
                }
                // 删除后工人设置为空
                // bkGetWorker('',true)
                let midData = Taro.getStorageSync(MidData)
                const objs = JSON.parse(JSON.stringify(obj))
                objs.name = midData.nickname || '未命名';
                objs.id = midData.worker_id;
                setWorkerItem([objs])
                const data = JSON.parse(JSON.stringify(timeArr));
                const duration = '一个工,无加班'
                data[0].click = true;
                setTimeArr(data);
                const years = new Date().getFullYear();
                const months = new Date().getMonth() + 1;
                const dates = new Date().getDate();
                const time = years + '-' + months + '-' + dates;
                const clickDataArr = [{
                  year: years,
                  month: months,
                  date: dates,
                  click: true
                }];
                setOpenClickTime(clickDataArr)
                setClickData(clickDataArr);
                setModel({ ...modalObj, duration, time, name, details: '' })
                setProjectArr(res.data);
                getMonthDaysCurrent(new Date(), clickDataArr, id)
                return;
              } else {
                const data = JSON.parse(JSON.stringify(timeArr));
                const duration = '一个工,无加班'
                data[0].click = true;
                setTimeArr(data);
                const years = new Date().getFullYear();
                const months = new Date().getMonth() + 1;
                const dates = new Date().getDate();
                const time = years + '-' + months + '-' + dates;
                const clickDataArr = [{
                  year: years,
                  month: months,
                  date: dates,
                  click: true
                }];
                let name;
                if (res.data.length > 0) {
                  name = res.data[0].group_name + '-' + res.data[0].name;
                  res.data[0].click = true;
                  bkGetWorker(res.data[0].group_id + ',' + res.data[0].id, true);
                  setGroupInfo(res.data[0].group_id + ',' + res.data[0].id)
                  bkGetWorkerWage(res.data[0].group_id + ',' + res.data[0].id)
                  res.data[0].click = true;
                }
                // 删除项目后设置工人
                let midData = Taro.getStorageSync(MidData)
                const objs = JSON.parse(JSON.stringify(obj))
                objs.name = midData.nickname || '未命名';
                objs.id = midData.worker_id;
                setWorkerItem([objs])
                setGroupInfo('')
                setOpenClickTime(clickDataArr)
                setClickData(clickDataArr);
                getMonthDaysCurrent(new Date(), clickDataArr)
                setModel({ ...modalObj, duration, time, name, details: '' })
                // const data = JSON.parse(JSON.stringify(model));
                // setModel({ ...data, name });
                // bkGetWorker(res.data[0].group_id + ',' + res.data[0].id, true);
                // res.data[0].click = true;
                // 设置groupInfo
                // const groupInfos = res.data[0].group_id + ',' + res.data[0].id;
                // console.log(groupInfos,'groupInfo')
                // setGroupInfo(res.data[0].group_id + ',' + res.data[0].id)
                // console.log(res.data[0].group_id + ',' + res.data[0].id,'cccc5')
                // bkGetWorkerWage(res.data[0].group_id + ',' + res.data[0].id)
                setProjectArr(res.data);
              }
            }
          })
          return;
        }
      }
    })
  }
  // 已设置工资标准标准
  const bkGetWorkerWage = (id?: string, Item?: any, models?: any) => {
    console.log(321312, id)
    let prams;
    if (id) {
      prams = {
        group_info: id
      }
    } else {
      prams = {
        group_info: groupInfo
      }
    }
    // return;
    bkGetWorkerWageAction(prams).then(res => {
      if (res.code === 200) {
        setMoneyList(res.data);
        let type = Taro.getStorageSync(Type);
        // 判断页面上的是否设置工资标准
        if (type === 1) {
          const data = JSON.parse(JSON.stringify(workerItem))
          // 获取工人传过来数据，判断是否设置工资标准
          const userData = Taro.getStorageSync(User);
          let dataType;
          recorderTypeArr.item.map((v) => {
            if (v.click) {
              dataType = v.id;
            }
          })
          let itemType;
          // if (dataType == 2) {
          for (let i = 0; i < contractorArr.item.length; i++) {
            if (contractorArr.item[i].click) {
              itemType = contractorArr.item[i].id;
            }
          }
          // }
          //获取工人的时候传过来的工人数据
          if (Item) {
            for (let i = 0; i < Item.length; i++) {
              for (let j = 0; j < res.data.length; j++) {
                if (res.data[j].worker_id == Item[i].id) {
                  Item[i].set = true;
                  if (userData && userData.length > 0) {
                    userData.map(v => {
                      if (v.id == id && v.dataType == dataType && v.itemType == itemType) {
                        for (let b = 0; b < v.data.length; b++) {
                          if (b == v.id) {
                            v.discipline = true;
                          }
                        }
                      }
                    })
                  }
                }
              }
            }
            setWorkerItem(Item)
            return;
          }
          // for(let i =0;i<data.length;i++){
          //   for(let j=0;j<res.data.length;j++){
          //     if (res.data[j].worker_id === data[i].id){
          //       data[i].set = true;
          //     }
          //   }
          // }
          // setWorkerItem(data)
        } else {
          // 工人的时候
          const wageStandardData = JSON.parse(JSON.stringify(wageStandard));
          if (res.data.length > 0) {
            const data = res.data[0];
            wageStandardData.work = data.worktime_define;
            wageStandardData.addWork = data.overtime_money;
            wageStandardData.money = data.money;
            wageStandardData.day = data.overtime;
            wageStandardData.worker_id = data.worker_id;
            wageStandardData.group_info = data.group_info;
            if (parseInt(data.money) && parseInt(data.overtime)) {
              wageStandardData.dayAddWork = parseInt(data.money) / parseInt(data.overtime) || 0;
            } else {
              wageStandardData.dayAddWork = 0
            }
            wageStandardData.type = parseInt(data.overtime_type);
            // 工钱
            // 一个工无加班
            const sum = data.money;
            const obj = JSON.parse(JSON.stringify(model));
            // model.workersWages = sum;
            if (models) {
              models.workersWages = sum;
              setModel(models)
            }
            // setModel(obj)
            setWageStandard(wageStandardData)
          } else {
            wageStandardData.work = 0;
            wageStandardData.addWork = 0;
            wageStandardData.money = 0;
            wageStandardData.day = 0;
            wageStandardData.type = 1;
            wageStandardData.dayAddWork = 0;
            setWageStandard(wageStandardData)
            console.log('workersWages321312')
            //设置工人工资为0
            if (models) {
              console.log('11111')
              setModel({ ...models, workersWages: '0' })
            } else {
              console.log('000000')
              const item = JSON.parse(JSON.stringify(model));
              item.workersWages = '0';
              setModel(item)
              return;
            }
          }
        }
      } else {
        Msg(res.msg)
      }
    })
  }
  // 工资标准
  const bkWageStandGetWage = () => {
    bkWageStandGetWageAction({}).then(res => {
      if (res.code === 200) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].overtime_type == 2) {
            res.data[i].addWork = res.data[i].money / (res.data[i].overtime || 0);
          }
          if (i === 0) {
            res.data[i].click = true;
            setTemplateId(res.data[i].id)
          } else {
            res.data[i].click = false;
          }
        }
        setStandard(res.data);
      }
    })
  }
  // 工人列表
  const bkGetWorker = (groupInfos?: any, val?: any, dataItem?: any, id?: string) => {
    console.log(groupInfos, 'groupInfosgroupInfos')
    // 不传group_info获取通讯录里的所有人
    const type = Taro.getStorageSync(Type);
    let params;
    if (groupInfos) {
      params = {
        group_info: groupInfos
      }
    } else {
      params = {}
    }
    bkGetWorkerAction(params).then(res => {
      if (res.code === 200) {
        const data = JSON.parse(JSON.stringify(workerItem));
        let arr: any[] = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].list) {
            for (let j = 0; j < res.data[i].list.length; j++) {
              // 判断有worktime_define和money就是设置了工资标准
              // if (res.data[i].list[j].worktime_define && res.data[i].list[j].money){
              //   res.data[i].list[j].set = true;
              // }
              arr.push(res.data[i].list[j]);
            }
          }
        }
        // 有自己
        if (val) {
          // 添加成功
          if (val === 1) {
            if (dataItem) {
              // 根据姓名判断在那个位置push进去
              for (let i = 0; i < res.data.length; i++) {
                if (data.name_py === res.data[i].name_py) {
                  res.data[i].list.push(data);
                }
              }
            }
            dispatch(setmailList(res.data))
          } else {
            // const objs = JSON.parse(JSON.stringify(obj));
            let midData = Taro.getStorageSync(MidData)
            let objs: any = {};
            objs.name = midData.nickname || '未命名';
            objs.id = midData.worker_id;
            setObj(objs);
            // 选择另一个项目的情况
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].id == objs.id) {
                arr.splice(i, 1);
              }
            }
            const listArr = [objs, ...arr];
            const userData = Taro.getStorageSync(User);
            // 获取当前点击的项目类型状态
            let dataType;
            if (id) {
              dataType = id;
            } else {
              recorderTypeArr.item.map((v) => {
                if (v.click) {
                  dataType = v.id;
                }
              })
            }
            let itemType;
            // if (dataType == 2) {
            for (let i = 0; i < contractorArr.item.length; i++) {
              if (contractorArr.item[i].click) {
                itemType = contractorArr.item[i].id;
              }
            }
            // }
            // 设置蓝色底色
            if (type === 1) {
              if (userData) {
                userData.map(v => {
                  listArr.map(val => {
                    if (val.group_info == v.id && dataType == v.dataType && v.itemType == itemType) {
                      for (let d = 0; d < v.data.length; d++) {
                        if (v.data[d] == val.id) {
                          val.discipline = true;
                        }
                        if (v.data[d] == objs.id) {
                          objs.discipline = true;
                        }
                      }
                    }
                    return val;
                  })
                  return v;
                })
              }
            }
            setGroupInfo(groupInfos)
            console.log(arr, '获取到的数据11')
            console.log([objs, ...arr], '内容111')
            dispatch(setPhoneList([objs, ...arr]));
            bkGetWorkerWage(groupInfos, [objs, ...arr]);
            // 设置今天
            const years = new Date().getFullYear();
            const months = new Date().getMonth() + 1;
            const dates = new Date().getDate();
            const time = years + '-' + months + '-' + dates;
            const clickDataArr = [{
              year: years,
              month: months,
              date: dates,
              click: true
            }];
            setOpenClickTime(clickDataArr)
            setClickData(clickDataArr);
            getMonthDaysCurrent(new Date(), clickDataArr, groupInfos, id);
            return;
          }
        }
        dispatch(setUserList(res.data))
        setWorkerList(res.data);
        // 判断有就不存了存通讯录redux
        // 么有groupInfos就不修改
        if (!groupInfos) {
          dispatch(setmailList(res.data))
        }
        // // else{
        //   setWorkerItem([obj, ...arr])
        // }
        // 存员工redux
        // 设置员工
        let arrDate: any[] = [];
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data[i].list.length; j++) {
            arrDate.push(res.data[i].list[j]);
          }
        }
        // setWorkerItem(arr);
        // 设置默认值
        const userData = Taro.getStorageSync(User);
        let dataType;
        recorderTypeArr.item.map((v) => {
          if (v.click) {
            dataType = v.id;
          }
        })
        let itemType;
        // if (dataType == 2) {
        for (let i = 0; i < contractorArr.item.length; i++) {
          if (contractorArr.item[i].click) {
            itemType = contractorArr.item[i].id;
          }
        }
        if (type === 1) {
          if (userData) {
            userData.map(v => {
              res.data.map(val => {
                if (val.list) {
                  val.list.map(value => {
                    if (value.id == v) {
                      value.discipline = true;
                    }
                    return value;
                  })
                }
                return val;
              })
              return v;
            })
          }
        }
        dispatch(setUserList(res.data))
        setWorkerList(res.data);
      } else {
        Msg(res.msg);
        return;
      }
    })
  }
  // 输入框
  const handleInput = (type: string, e) => {
    let data = JSON.parse(JSON.stringify(model));
    if (type === 'details') {
      setNum(e.detail.value.length);
    }
    if (type == 'wages') {
      // 整数
      if ((/(^[1-9]\d*$)/.test(e.detail.value))) {
        if (e.detail.value.length > 7) {
          Msg('最多输入七位数');
          e.detail.value = e.detail.value.slice(0, 7);
          data[type] = e.detail.value;
          setModel(data);
          return;
        }
      }
      // 判断小数为两位
      if (e.detail.value.toString().split(".").length > 1 && e.detail.value.toString().split(".")[1].length > 2) {
        Msg('最多输入两位小数');
        // 切割
        // data = e.detail.value.split('.');
        // if(data[0].length>6){
        //   Msg('最多输入七位数');
        //   return
        // }
        data[type] = e.detail.value;
        setModel(data);
        return;
      }
      // var rePNum = /^\d+(.\d+)?$/;
      // if (!rePNum.test(e.detail.value)) {
      //   // alert('不是正数');
      //   return false;
      // }
      // var num = /^([+]?)\d*\.?\d+$/; //验证数字
      // var re2 = /^\d+(?:\.\d{1,2})?$/ //验证两位小数，小数可有可无，如果有最多两位
      // if (!re2.test(e.detail.value)){
      //   Msg('最多输入两位小数');
      //   const data = e.detail.value.split('.');
      // }else{
      //   return;
      // }
      // return;
      // let regex = new RegExp("^([0-9])$|^([1-9]*)$|^(([1-9]+|0)\.([1-9]{1}|[1-9]{1,2}|0{1}[1-9]{1}))$");
      // regex.test(e.detail.value)
      // if (!regex.test(e.detail.value)){
      //   Msg('请输入两位小数或整数')
      // }
      // data[type] = e.detail.value;
    }
    // 工钱12位保留两个小数
    if (type == 'amount' || type == 'price' || type == 'borrowing') {
      if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) { //正则验证，提现金额小数点后不能大于两位数字
        data[type] = e.detail.value;
      } else {
        Msg('请输入两位小数或整数')
        data[type] = e.detail.value;
      }
      setModel(data);
      return;
    }
    data[type] = e.detail.value;
    setModel(data);
  }
  // 创建项目
  const handleAddProject = () => {
    if (!model.teamName) {
      Msg('您还没有填写班组名称');
      return;
    }
    let type = Taro.getStorageSync(Type);
    let params = {
      group_name: model.groupName,
      team_name: model.teamName,
    }
    bkAddProjectTeamAction(params).then(res => {
      if (res.code === 200) {
        // 修改工资标准
        if (type === 2) {
          bkGetWorkerWage(res.data)
        }
        setIds(res.data);
        const name = model.groupName + '-' + model.teamName;
        bkGetProjectTeam(name);
        setGroupInfo(res.data)
      } else {
        Msg(res.msg);
        return;
      }
      setProject(false);
      // let data = JSON.parse(JSON.stringify(model));
      // data.name = model.groupName;
      // setGroupInfo(res.data)
      // setModel({...data, groupName: '', teamName: ''})
    })
  }
  // 选择加班时长
  const handleworkOvertime = (type: number, val: any) => {
    const data = JSON.parse(JSON.stringify(model));
    setTimeType(type)
    if (type === 1) {
      let arr;
      if (val.id === 4) {
        arr = timeArr.map(v => {
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
        // return;
      } else {
        arr = timeArr.map(v => {
          if (v.id === val.id) {
            v.click = !v.click;
          } else {
            if (v.id === 4) {
              v.name = '0.0小时';
            }
            v.click = false
          }
          return v;
        })
        setTimeArr(arr)
      }
      let addTime;
      for (let i = 0; i < addWorkArr.length; i++) {
        if (addWorkArr[i].click) {
          if (addWorkArr[i].id !== 1) {
            addTime = '加班' + addWorkArr[i].name
          } else {
            addTime = '无加班'
          }
        } else {
          addTime = '无加班'
        }
      }
      let duration;
      if (val.id == 3) {
        duration = val.name + addTime;
      } else {
        duration = '上班' + val.name + addTime;
      }
      if (val.id != 4) {
        setModel({ ...data, duration })
      }
    } else {
      //加班时长
      let arr;
      if (val.id != 2) {
        arr = addWorkArr.map(v => {
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
      } else {
        arr = addWorkArr.map(v => {
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
      let Time;
      for (let i = 0; i < timeArr.length; i++) {
        if (timeArr[i].click) {
          if (timeArr[i].id == 3) {
            Time = '休息'
          } else {
            Time = '上班' + timeArr[i].name
          }
          break;
        } else {
          Time = '休息'
        }
      }
      let duration;
      if (val.id == 1) {
        duration = Time + '无加班';
      } else {
        duration = '上班' + Time + val.name;
      }
      if (val.id != 2) {
        setModel({ ...data, duration })
      }
    }
  }
  // 加班时长弹框选择
  const handleWorkingHours = (type: number, e: any) => {
    const Item = JSON.parse(JSON.stringify(model));
    if (type === 1) {
      const data = timeArr.map((v) => {
        if (v.id === 4) {
          v.name = e.name;
          v.click = true;
          v.num = e.num
        }
        return v;
      })
      setTimeArr(data);
      let addTime;
      for (let i = 0; i < addWorkArr.length; i++) {
        if (addWorkArr[i].click) {
          if (addWorkArr[i].id !== 1) {
            addTime = '加班' + addWorkArr[i].name
          } else {
            addTime = '无加班'
          }
        } else {
          addTime = '无加班'
        }
      }
      let duration;
      duration = '上班' + e.name + addTime;
      setModel({ ...Item, duration })
    } else {
      const data = addWorkArr.map((v) => {
        if (v.id === 2) {
          v.name = e.name;
          v.click = true;
          v.num = e.num
        }
        return v;
      })
      setAddWorkArr(data);
      let Time;
      for (let i = 0; i < timeArr.length; i++) {
        if (timeArr[i].click) {
          if (timeArr[i].id == 3) {
            Time = '休息'
          } else {
            Time = '上班' + timeArr[i].name
          }
          break;
        } else {
          Time = '休息'
        }
      }
      let duration;
      duration = Time + '加班' + e.name;
      setModel({ ...Item, duration })
    }
    setWorkingHoursDisplay(false);
    setWorkOvertimeDisplay(true);
  }
  // 确认时间选择
  const handleWorkOvertimeOk = () => {
    const data: any = timeArr.filter(v => v.click);
    const dataList: any = addWorkArr.filter(v => v.click);
    let title;
    if (data || dataList) {
      if (data.length > 0) {
        if (data[0].name == '休息') {
          title = data[0].name
        } else {
          title = '上班' + data[0].name
        }
      }
      if (dataList.length > 0) {
        if (dataList[0].name !== '无加班') {
          title = '加班' + dataList[0].name
        } else {
          title = dataList[0].name
        }
      }
      if (data.length > 0 && dataList.length > 0) {
        if (data[0].name == '休息' && dataList[0].name == '无加班') {
          title = data[0].name + dataList[0].name
        } else {

          if (data[0].name == '休息') {
            title = '加班' + dataList[0].name
          }
          if (dataList[0].name == '无加班') {
            title = '上班' + data[0].name + dataList[0].name
          }
          title = '上班' + data[0].name + '加班' + dataList[0].name
        }
      }
    }
    if (identity === 2) {
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
      // 上班标准提示
      // if (workNum == 0) {
      //   Msg('上班标准必须必须大于0')
      //   return;
      // }
      // // 每个工多少钱提示
      // if (moneyNum == 0) {
      //   Msg('每个工工钱必须大于0')
      //   return;
      // }
      // //按天数 一个工
      // if (data.type == 2) {
      //   if (data.day == 0) {
      //     Msg('一个工必须大于0小时')
      //     return;
      //   }
      // }
      // if (data.type == 1) {
      //   if (data.addWork == 0) {
      //     Msg('每小时加班金额必须大于0')
      //     return;
      //   }
      // }
      // 上班时间
      let time = 0;
      for (let i = 0; i < timeArrs.length; i++) {
        if (timeArrs[i].click) {
          // 选择工
          if (timeArrs[i].id != 1 && timeArrs[i].id != 2 && timeArrs[i].id != 3) {
            time = 1 / workNum * timeArrs[i].num
            // 选择时间
          } else {
            if (timeArrs[i].id == 1) {
              // 等于模板时间
              time = 1 / workNum * workNum;
            } else if (timeArrs[i].id == 2) {
              // 等于模板时间的一半
              time = 1 / workNum * workNum / 2;
            } else if (timeArrs[i].id == 3) {
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
        total = (moneyNum / workNum) * (time * workNum) + addWorkNum * addTime;
        // total = (moneyNum / workNum) * time + addWorkNum * addTime;
      } else {
        // 按天算 每个工多少钱/模板定义的多少小时算一个工 * 加班时长
        // total = moneyNum / workNum * time + (moneyNum / dayNum * addTime);
        total = moneyNum / workNum * (time * workNum) + (moneyNum / dayNum * addTime);
      }
      // const num = total.toFixed(2);
      // let num: any = 0;
      // if (num && !Object.is(num, NaN)) {
      //   num = total.toFixed(2);
      // }
      // //给工人自己设置工资标准
      // const wageStandards = JSON.parse(JSON.stringify(wageStandard));
      // let params = {
      //     identity:identity,
      //     worktime_define: wageStandards.work,
      //     overtime_type: wageStandards.type,
      //     overtime_money: wageStandards.dayAddWork,
      //     money: wageStandards.money,
      //     overtime: wageStandards.day,
      //     group_info:groupInfo
      //   }
      // bkSetWorkerIdentityWageAction(params).then(res=>{
      //   if(res.code !== 200){
      //     Msg(res.msg)
      //   }
      // })
      setModel({ ...model, workersWages: total, duration: title });
      setWorkOvertimeDisplay(false);
      return;
    }
    setModel({ ...model, duration: title })
    setWorkOvertimeDisplay(false);
  }
  // 选择单位
  const handleQuantities = (val) => {
    const arr = company.map((v) => {
      if (v.id === val.id) {
        v.click = !v.click
        if (v.click) {
          setUnit(v.name)
          setQuantitiesDisplay(false)
        }
      } else {
        v.click = false
      }
      return v;
    })
    setCompany(arr)
  }
  // 支借Radio
  const handleRadioBorrowing = (v) => {
    const data = JSON.parse(JSON.stringify(borrowing.item));
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === v.id) {
        data[i].click = true;
      }
    }
    setBorrowing({ item: data })
  }
  // 添加成员
  const handleEstablish = (id) => {
    const data = JSON.parse(JSON.stringify(model))
    if (!model.userName) {
      let type = Taro.getStorageSync(Type);
      if (type == 1) {
        Msg('您还没有填写工人名称')
      } else {
        Msg('您还没有填写班组长名称')
      }
      return
    }
    if (model.phone) {
      if (!isPhone(model.phone)) {
        Msg('请输入正确的手机号')
        return
      }
    }
    let params: any = {
      name: data.userName,
      tel: data.phone,
      // group_info: id,
    }
    // bkGetWorker(id, true);
    // dispatch(setmailList([]));
    // setAddMemberDisplay(false)
    // return;
    bkAddWorkerActiion(params).then(res => {
      if (res.code === 200) {
        // 叫后台返回id 姓名 电话
        const data = res.data;
        // 添加成功后重新获取设置数据
        bkGetWorker('', 1, data);
        // 设置成功清空手机和电话
        const modales = JSON.parse(JSON.stringify(model));
        setModel({ ...modales, userName: '', phone: '' })
        // ======= 测试无法测试
        // const data = JSON.parse(JSON.stringify(workerItem));
        // params.id = Math.random();
        // data.push(params)
        // setWorkerItem(data)
        // 重新获取数据
        // bkGetWorkerAction
        setAddMemberDisplay(false)
      } else {
        Msg(res.msg)
      }
    })
  }
  // 点击删除
  const handleDel = (type: number) => {
    const data = JSON.parse(JSON.stringify(workerItem));
    if (type === 0) {
      const arr = data.map(v => {
        if (v.id != 1) {
          v.del = true;
        }
        return v;
      })
      setWorkerItem(arr);
      setDeldelType(true)
    } else {
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
  const handleDelList = (v: any) => {
    // 判断不能删除自己
    let midData = Taro.getStorageSync(MidData)
    if (midData.worker_id === v.id) {
      Msg('不能删除自己')
      return
    }
    Taro.showModal({
      title: '温馨提示',
      content: '删除工人后，工人将不在此项目中，但他之前的记工数据不会受影响。确定要删除吗？',
      showCancel: true,
      success: ((res) => {
        if (res.confirm == true) {
          let params = {
            ids: v.id,
            group_info: groupInfo
          }
          bkDeleteRroupWorkerAction(params).then(res => {
            if (res.code === 200) {
              const data = JSON.parse(JSON.stringify(workerItem));
              // data.splice(data.indexOf(v.id), 1);
              let dataType;
              recorderTypeArr.item.map((v) => {
                if (v.click) {
                  dataType = v.id;
                }
              })
              data.map((val, i) => {
                if (val.id === v.id) {
                  data.splice(i, 1);
                  // 删除已经今日记账的人员
                  const userData = Taro.getStorageSync(User);
                  if (userData.length > 0) {
                    for (let i = 0; i < userData.length; i++) {
                      if (userData[i].id == groupInfo && userData[i].dataType == dataType) {
                        for (let j = 0; j < userData[i].data; j++) {
                          if (userData[i].data[j].id == v.id) {
                            userData[i].data.splice(j, 1);
                          }
                        }
                      }
                    }
                  }
                  Taro.setStorageSync(User, userData);
                }
                return val;
              })
              setWorkerItem(data);
              dispatch(setPhoneList(data));
              // 获取工人列表
              // 设置是否点击了
              // const workerListArr = JSON.parse(JSON.stringify(workerList));
              // for (let i = 0; i < workerListArr.length;i++){
              //   for (let j = 0; j < workerListArr[i].list;j++){
              //     if (v.id === workerListArr[i].list[j].id){
              //       workerListArr[i].list[j].click = true;
              //     }
              //   }
              // }
              // for(let i = 0;i<workerListArr.length;i++){
              //   for (let z = 0; z < workerListArr[i].list.length;z++){
              //     if (workerListArr[i].list[z].id == v.id){
              //       workerListArr[i].list.splice(z,1)
              //     }
              //   }
              // }
              // setWorkerItem(workerListArr)
              // setWorkerList()
              //存数据
              // dispatch(setUserList(workerListArr))
              // setWorkerItem
              // setWorkerItem(workerListArr)

            } else {
              Msg(res.msg);
            }
          })
        }
      })
    })
  }
  //添加标准
  const handleAddStandard = () => {
    setAddStandard(1);
    setWagesModalDisplay(false);
    setWageStandardDisplay(true);
  }
  // 打开工资标准
  const handleOpenWagesModal = (v?: any) => {
    if (delType) return;
    const item = JSON.parse(JSON.stringify(model));
    if (!item.name) {
      Msg('请先选择项目')
      return
    }
    // 借支和按量长按没用
    if (recorderType === 3 || (recorderType == 2 && contractor == 1)) {
      return;
    }
    setWagesModalDisplay(true);
    //把工资标准的内容设置为新的s
    const data = JSON.parse(JSON.stringify(workerItem));
    let setData: any = [], NoSetData: any = [];
    for (let i = 0; i < data.length; i++) {
      data[i].click = false;
      if (v) {
        if (data[i].id == v.id) {
          data[i].click = true;
        }
      }
      if (data[i].set) {
        setData.push(data[i]);
      } else {
        NoSetData.push(data[i]);
      }
    }
    // 长按默认1
    if (v) {
      setClickModalNum(1)
    }
    // 设置人员
    setSetWorkList([...NoSetData, ...setData])
    // 一设置工资标准标准
    bkGetWorkerWage();
  }
  // 添加工资标准
  const handleWageStandard = (type: string, e: any) => {
    if (type == 'day') {
      const item = JSON.parse(JSON.stringify(wageStandard));
      item[type] = e;
      let num: number | string = 0;
      if (item.money > 0 && e > 0) {
        num = (item.money / e).toFixed(2)
      }
      item.dayAddWork = num;
      setWageStandard(item);
      return;
    }
    if (type === 'money') {
      const item = JSON.parse(JSON.stringify(wageStandard));
      // const dayAddWork = e / item.day||0;
      let dayAddWork;
      if (item.day == 0) {
        dayAddWork = 0
      } else {
        dayAddWork = e / item.day || 0;
      }
      item[type] = e;
      item.dayAddWork = dayAddWork.toFixed(2) || 0;
      setWageStandard(item);
      return;
    }
    const data = JSON.parse(JSON.stringify(wageStandard));
    data[type] = e;
    setWageStandard(data);
  }
  // 保存
  const handlePreservation = (type: number) => {
    // 获取工资标准
    const data = JSON.parse(JSON.stringify(wageStandard));
    const item = JSON.parse(JSON.stringify(model));
    const workerItemArr = JSON.parse(JSON.stringify(workerItem));
    const types = Taro.getStorageSync(Type);
    if (types === 2) {
      if (data.work == 0) {
        Msg('上班标准必须必须大于0')
        return;
      }
    }
    // 时间
    let times: number = 0, work_time_hour = 0;
    timeArr.map(v => {
      if (v.click) {
        if (v.num) {
          if (v.id !== 4) {
            times = v.num;
            work_time_hour = data.work * v.num;
          } else {
            console.log(data.work, 'xxx');
            console.log(v.num, 'xxxx1')
            times = 1 / data.work * v.num;
            work_time_hour = v.num;
          }
        }
      }
    })
    console.log()
    console.log(times, 'times');
    // return;
    // const times = 1/data.work * work_time;
    // 加班时间
    let overtime: number = 0;
    addWorkArr.map(v => {
      if (v.click) {
        if (v.num) {
          overtime = v.num;
        }
      }
    })
    // 借支radio类型
    let radioType: string | number = '';
    borrowing.item.map(v => {
      if (v.click) {
        radioType = v.id;
      }
    })
    //单位
    let unit;
    company.map(v => {
      if (v.click) {
        unit = v.name;
      }
    })
    const timeItem = JSON.parse(JSON.stringify(openClickTime));
    let time: string[] = timeItem.map(item => (item.year + '-' + item.month + '-' + item.date));
    // type 1 再来一笔 0 保存
    let tabData;
    recorderTypeArr.item.map((v) => {
      if (v.click) {
        tabData = v;
      }
    })
    // 获取ID
    let workers: number[] = [];
    if (identity === 1) {
      for (let i = 0; i < workerItem.length; i++) {
        if (workerItem[i].click) {
          workers.push(workerItem[i].id)
        }
      }
    } else {
      if (foreman.length > 0) {
        for (let i = 0; i < foreman.length; i++) {
          workers.push(foreman[i].id);
        }
      }
    }
    // 工人ID传自己
    if (identity === 2) {
      // workers = 
      const midData = Taro.getStorageSync(MidData);
      workers = midData.worker_id;
    }
    // 图片
    let img_url: string[] = image.item.map(item => item.url);
    // 记工
    let params: any = {};
    if (tabData.id == 1) {
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
        work_time_hour,
      }
    } else if (tabData.id == 2) {
      // 按量
      let itemType;
      for (let i = 0; i < contractorArr.item.length; i++) {
        if (contractorArr.item[i].click) {
          itemType = contractorArr.item[i].id;
        }
      }
      // 按量
      if (itemType === 1) {
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
          work_time_hour,
        }
      } else {
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
          work_time_hour,
        }
      }
    } else if (tabData.id === 3) {
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
        type: radioType,
        money: item.borrowing,
        work_time_hour
      }
    }
    // 工人的时候要先设置工资标准
    const foremanTitles = JSON.parse(JSON.stringify(foremanTitle))
    // if(identity === 2){
    //   // if (!item.name){
    //   //   Msg('请选择项目')
    //   //   return
    //   // }
    //   if (!foremanTitles){
    //     Msg('请选择班组长')
    //     return
    //   }
    //   if (!time){
    //     Msg('请选择日期')
    //     return
    //   }
    // }
    // 记工(包工按量)
    // 工人记工的时候，没有选择项目名称，为他默认一个
    if (identity === 2) {
      if (projectArr.length === 0) {
        let items = {
          group_name: '其他项目',
          team_name: '其他班组'
        }
        bkAddProjectTeamAction(items).then(res => {
          // 给自己设置工资标准
          if (res.code === 200) {
            let paramsData;
            //   identity: identity,
            //   worktime_define: data.work,
            //   overtime_type: data.type,
            //   overtime_money: data.dayAddWork,
            //   money: data.money,
            //   overtime: data.day,
            //   group_info: res.data,
            // }
            // 按小时
            if (data.type === 1) {
              paramsData = {
                identity: identity,
                worktime_define: data.work,
                overtime_type: data.type,
                overtime_money: data.addWork,
                money: data.money,
                overtime: data.day,
                group_info: res.data,
              }
              // 按天
            } else {
              paramsData = {
                identity: identity,
                worktime_define: data.work,
                overtime_type: data.type,
                overtime_money: data.dayAddWork,
                money: data.money,
                overtime: data.day,
                group_info: res.data,
              }
            }
            bkSetWorkerIdentityWageAction(paramsData).then(resItem => {
              if (resItem.code === 200) {
                params.group_info = res.data;
                // 班组长id
                const item = useSelectorItem.workerList;
                // 判断选择班组长有数据给后台传班组长
                if (item.length > 0) {
                  const group_leader = item[0].group_leader;
                  params.group_leader = group_leader;
                }
                bkAddBusinessAction(params).then(resData => {
                  if (resData.code === 200) {
                    // 再记一笔
                    if (type == 1) {
                      // 再记录一笔的话需要清除内容
                      // 清空备注和图片
                      dispatch(setWorker([]))
                      setImage({ item: [] });
                      bkGetProjectTeam('', true);
                      handleRecordTime(timeItem, workers, groupInfo, tabData.id);
                      // 首选获取项目名称
                      // bkGetProjectTeam();
                      //直接保存
                    } else {
                      dispatch(setWorker([]))
                      handleRecordTime(timeItem, workers, groupInfo, tabData.id);
                      setDisplay(true)
                    }
                  } else {
                    Msg(res.msg);
                  }
                })
              } else {
                Msg(resItem.msg)
              }
            })
          } else {
            Msg(res.msg)
          }
        })
      } else {
        // 班组长id
        const item = useSelectorItem.workerList;
        // 判断选择班组长有数据给后台传班组长
        if (item.length > 0) {
          const group_leader = item[0].group_leader;
          params.group_leader = group_leader;
        }
        bkAddBusinessAction(params).then(resData => {
          if (resData.code === 200) {
            // 再记一笔
            if (type == 1) {
              // 再记录一笔的话需要清除内容
              // 清空备注和图片
              dispatch(setWorker([]))
              setImage({ item: [] });
              bkGetProjectTeam('', true);
              handleRecordTime(timeItem, workers, groupInfo, tabData.id);
              //直接保存
            } else {
              dispatch(setWorker([]))
              handleRecordTime(timeItem, workers, groupInfo, tabData.id);
              setDisplay(true)
            }
          } else {
            Msg(resData.msg)
          }
        })
      }
      return
      //   if (projectArr.length === 0) {
      //     let items = {
      //       group_name: '其他项目',
      //       team_name: '其他班组'
      //     }
      //     bkAddProjectTeamAction(items).then(res => {
      //       if (res.code === 200) {
      //         // 成功之后还要给自己设置工资标准
      //         let paramsData ={
      //           identity: identity,
      //           worktime_define: data.work,
      //           overtime_type: data.type,
      //           overtime_money: data.dayAddWork,
      //           money: data.money,
      //           overtime: data.day,
      //           group_info: res.data,
      //         }
      //         bkSetWorkerIdentityWageAction(paramsData).then(resItem=>{
      //           if(resItem.code === 200 ){
      //             params.group_info = res.data;
      //             // 班组长id
      //             const item = useSelectorItem.workerList;
      //             const group_leader = item[0].group_leader;
      //             params.group_leader = group_leader;
      //             bkAddBusinessAction(params).then(resData => {
      //               // 清除reducer
      //               if (resData.code === 200) {
      //                 if (type === 1) {
      //                   Msg('保存成功')
      //                   const data = {
      //                     groupName: '',
      //                     teamName: '',
      //                     name: item.name,
      //                     time: '',
      //                     details: '',
      //                     duration: '',
      //                     amount: '',
      //                     price: '',
      //                     wages: '',
      //                     borrowing: '',
      //                     univalent: '',
      //                     userName: '',
      //                     phone: '',
      //                     workersWages: '0',
      //                   }
      //                   // 上班时长
      //                   const itemArr = [
      //                     { id: 1, name: '一个工', click: false, num: 1, whole: true },
      //                     { id: 2, name: '半个工', click: false, num: 0.5, whole: true },
      //                     { id: 3, name: '休息', click: false, num: 0 },
      //                     { id: 4, name: '0.0小时', click: false, num: 0 }
      //                   ]
      //                   // 加班时长
      //                   const addItmeArr = [
      //                     { id: 1, name: '无加班', click: false, num: 0 },
      //                     { id: 2, name: '0.0小时', click: false, num: 0 },
      //                   ]
      //                   // 日历
      //                   const calendar = JSON.parse(JSON.stringify(calendarDays));
      //                   for (let i = 0; i < calendar.length; i++) {
      //                     calendar[i].click = false
      //                   }
      //                   for (let i = 0; i < workerItemArr.length; i++) {
      //                     workerItemArr[i].click = false;
      //                   }
      //                   setWorkerItem(workerItemArr)
      //                   setAddWorkArr(addItmeArr)
      //                   setTimeData([]);
      //                   setCalendarDays(calendar);
      //                   // setClickData([]);
      //                   setTimeArr(itemArr)
      //                   setForemanTitle('');
      //                   setImage({ item: [] })
      //                   setModel(data);
      //                   setRefresh(true)
      //                 } else {
      //                   setDisplay(true)
      //                 }
      //                 // 保存成功记忆日历
      //                 Taro.setStorageSync(Calendar, timeItem);
      //                 // 保存记工的时间和记工工人
      //                 handleRecordTime(workers);
      //                 // const RecordTime = '';
      //                 // const User = workerItem;
      //                 // Taro.setStorageSync(RecordTime, timeItem);
      //                 // Taro.setStorageSync(Calendar, timeItem);
      //                 setRefresh(true)
      //                 dispatch(setWorker([]))
      //               } else {
      //                 Msg(res.msg);
      //               }
      //             })
      //           }
      //         })
      //       }else{
      //         Msg(res.msg)
      //       }
      //     })
      //   }else{
      //     // 成功之后还要给自己设置工资标准
      //     // 上班标准提示
      //     // 按量和借支没有工钱判断
      //     if (recorderType !== 3 && !(recorderType == 2 && contractor == 1)){
      //       if (data.work === 0) {
      //         Msg('上班标准必须必须大于0')
      //         return;
      //       }
      //       // 每个工多少钱提示
      //       if (data.money === 0) {
      //         Msg('每个工工钱必须大于0')
      //         return;
      //       }
      //       //按天数 一个工
      //       if (data.type === 2) {
      //         if (data.day === 0) {
      //           Msg('一个工必须大于0小时')
      //           return;
      //         }
      //       }
      //       if (data.type === 1) {
      //         if (data.addWork === 0) {
      //           Msg('每小时加班金额必须大于0')
      //           return;
      //         }
      //       }
      //     }
      //     if (recorderType == 3 || (recorderType == 2 && contractor == 1)){
      //       // 班组长id
      //       const item = useSelectorItem.workerList;
      //       const group_leader = item[0].group_leader;
      //       params.group_leader = group_leader;
      //       bkAddBusinessAction(params).then(resData => {
      //         // 清除reducer
      //         if (resData.code === 200) {
      //           if (type === 1) {
      //             Msg('保存成功')
      //             const data = {
      //               groupName: '',
      //               teamName: '',
      //               name: item.name,
      //               time: '',
      //               details: '',
      //               duration: '',
      //               amount: '',
      //               price: '',
      //               wages: '',
      //               borrowing: '',
      //               univalent: '',
      //               userName: '',
      //               phone: '',
      //               workersWages: '0',
      //             }
      //             // 上班时长
      //             const itemArr = [
      //               { id: 1, name: '一个工', click: false, num: 1, whole: true },
      //               { id: 2, name: '半个工', click: false, num: 0.5, whole: true },
      //               { id: 3, name: '休息', click: false, num: 0 },
      //               { id: 4, name: '0.0小时', click: false, num: 0 }
      //             ]
      //             // 加班时长
      //             const addItmeArr = [
      //               { id: 1, name: '无加班', click: false, num: 0 },
      //               { id: 2, name: '0.0小时', click: false, num: 0 },
      //             ]
      //             // 日历
      //             const calendar = JSON.parse(JSON.stringify(calendarDays));
      //             for (let i = 0; i < calendar.length; i++) {
      //               calendar[i].click = false
      //             }
      //             for (let i = 0; i < workerItemArr.length; i++) {
      //               workerItemArr[i].click = false;
      //             }
      //             setWorkerItem(workerItemArr)
      //             setAddWorkArr(addItmeArr)
      //             setTimeData([]);
      //             setCalendarDays(calendar);
      //             // setClickData([]);
      //             setTimeArr(itemArr)
      //             setForemanTitle('');
      //             setImage({ item: [] })
      //             setModel(data);
      //             setRefresh(true)
      //           } else {
      //             setDisplay(true)
      //           }
      //           // 保存成功记忆日历
      //           Taro.setStorageSync(Calendar, timeItem);
      //           // 保存记工的时间和记工工人
      //           handleRecordTime(workers);
      //           setRefresh(true)
      //           dispatch(setWorker([]))
      //         } else {
      //           Msg(resData.msg);
      //         }
      //       })
      //       return
      //     }
      //     let paramsData = {
      //       identity: identity,
      //       worktime_define: data.work,
      //       overtime_type: data.type,
      //       overtime_money: data.dayAddWork,
      //       money: data.money,
      //       overtime: data.day,
      //       group_info: groupInfo
      //     }
      //     bkSetWorkerIdentityWageAction(paramsData).then(resItem => {
      //       if (resItem.code === 200) {
      //         // 班组长id
      //         const item = useSelectorItem.workerList;
      //         const group_leader = item[0].group_leader;
      //         params.group_leader = group_leader;
      //         bkAddBusinessAction(params).then(resData => {
      //           // 清除reducer
      //           if (resData.code === 200) {
      //             if (type === 1) {
      //               Msg('保存成功')
      //               const data = {
      //                 groupName: '',
      //                 teamName: '',
      //                 name: item.name,
      //                 time: '',
      //                 details: '',
      //                 duration: '一个工无加班',
      //                 amount: '',
      //                 price: '',
      //                 wages: '',
      //                 borrowing: '',
      //                 univalent: '',
      //                 userName: '',
      //                 phone: '',
      //                 workersWages: '0',
      //               }
      //               // 上班时长
      //               const itemArr = [
      //                 { id: 1, name: '一个工', click: true, num: 1, whole: true },
      //                 { id: 2, name: '半个工', click: false, num: 0.5, whole: true },
      //                 { id: 3, name: '休息', click: false, num: 0 },
      //                 { id: 4, name: '0.0小时', click: false, num: 0 }
      //               ]
      //               // 加班时长
      //               const addItmeArr = [
      //                 { id: 1, name: '无加班', click: false, num: 0 },
      //                 { id: 2, name: '0.0小时', click: false, num: 0 },
      //               ]
      //               // 日历
      //               const calendar = JSON.parse(JSON.stringify(calendarDays));
      //               for (let i = 0; i < calendar.length; i++) {
      //                 calendar[i].click = false
      //               }
      //               for (let i = 0; i < workerItemArr.length; i++) {
      //                 workerItemArr[i].click = false;
      //               }
      //               setWorkerItem(workerItemArr)
      //               setAddWorkArr(addItmeArr)
      //               setTimeData([]);
      //               setCalendarDays(calendar);
      //               // setClickData([]);
      //               setTimeArr(itemArr)
      //               setForemanTitle('');
      //               setImage({ item: [] })
      //               setModel(data);
      //               // 设置不刷新
      //               setRefresh(true)
      //             } else {
      //               setDisplay(true)
      //             }
      //             // 保存成功记忆日历
      //             Taro.setStorageSync(Calendar, timeItem);
      //             // 保存记工的时间和记工工人
      //             handleRecordTime(workers);
      //             dispatch(setWorker([]))
      //             // 设置不刷新
      //             setRefresh(true)
      //           } else {
      //             Msg(resData.msg);
      //           }
      //         })
      //       }else{
      //         Msg(resItem.msg)
      //       }
      //     })
      //   // }
      // }else{
      // 工人的时候有可能会没有给项目设置工人
      const item = useSelectorItem.workerList;
      const group_leader = item[0].group_leader;
      params.group_leader = group_leader;
      let paramsData = {
        group_info: groupInfo,
        group_leader,
      }
      bkSetGroupLeaderAction(paramsData).then(res => {
        bkAddBusinessAction(params).then(res => {
          // 清除reducer
          if (res.code === 200) {
            if (type === 1) {
              Msg('保存成功')
              const data = {
                groupName: '',
                teamName: '',
                name: item.name,
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
              // 上班时长
              const itemArr = [
                { id: 1, name: '一个工', click: false, num: 1, whole: true },
                { id: 2, name: '半个工', click: false, num: 0.5, whole: true },
                { id: 3, name: '休息', click: false, num: 0 },
                { id: 4, name: '0.0小时', click: false, num: 0 }
              ]
              // 加班时长
              const addItmeArr = [
                { id: 1, name: '无加班', click: false, num: 0 },
                { id: 2, name: '0.0小时', click: false, num: 0 },
              ]
              // 日历
              const calendar = JSON.parse(JSON.stringify(calendarDays));
              for (let i = 0; i < calendar.length; i++) {
                calendar[i].click = false
              }
              for (let i = 0; i < workerItemArr.length; i++) {
                workerItemArr[i].click = false;
              }
              setWorkerItem(workerItemArr)
              setAddWorkArr(addItmeArr)
              setTimeData([]);
              setCalendarDays(calendar);
              // setClickData([]);
              setTimeArr(itemArr)
              setForemanTitle('');
              setImage({ item: [] })
              setModel(data);
              // 设置不刷新
              setRefresh(true)
            } else {
              setDisplay(true)
            }
            // 设置不刷新
            // 保存成功记忆日历
            Taro.setStorageSync(Calendar, timeItem);
            // 保存记工的时间和记工工人
            handleRecordTime(timeItem, workers, groupInfo, tabData.id);
            setRefresh(true)
            dispatch(setWorker([]))
          } else {
            Msg(res.msg);
          }
        })
      });
    } else {
      bkAddBusinessAction(params).then(res => {
        if (res.code === 200) {
          if (type === 1) {
            dispatch(setWorker([]))
            setImage({ item: [] });
            bkGetProjectTeam('', true);
            // handleRecordTime(timeItem, workers);
            // 设置不刷新
            setRefresh(true)
            handleRecordTime(timeItem, workers, groupInfo, tabData.id);
          } else {
            setDisplay(true)
            handleRecordTime(timeItem, workers, groupInfo, tabData.id);
          }
        } else {
          Msg(res.msg)
        }
      })
    }
  }
  const handleCalendar = (v) => {
  }
  // 进入页面判断时间
  const handleUser = () => {
    // 获取现在的时间再加一天
    // const time = new Date();
    // const times = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
    // const date = (new Date(times)).valueOf() + 86400000;
    const oldTime = Taro.getStorageSync(RecordTime);
    const date = Taro.getStorageSync(Tomorrow);
    const userData = Taro.getStorageSync(User);
    // 设置了时间并大于今天
    if (oldTime && oldTime > date) {
      Taro.setStorageSync(User, []);
      // 设置点击过的
      Taro.setStorageSync(Calendar, []);
    }
  }
  // 保存时间
  const handleRecordTime = (timeItem, workers: any[], id: any, dataType: any) => {
    let type = Taro.getStorageSync(Type);
    // 现在的时间
    const time = new Date();
    const times = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
    const date = (new Date(times)).valueOf();
    // 明天
    const oldDate = (new Date(times)).valueOf() + 86400000;
    Taro.setStorageSync(Tomorrow, oldDate);
    // 时间
    Taro.setStorageSync(RecordTime, date);
    // 日历
    const timeArr = Taro.getStorageSync(Calendar);
    // 日历和工人都要分项目完成
    let itemType;
    if (dataType == 2) {
      for (let i = 0; i < contractorArr.item.length; i++) {
        if (contractorArr.item[i].click) {
          itemType = contractorArr.item[i].id;
        }
      }
    }
    let arr: any;
    if (timeArr && timeArr.length > 0) {
      for (let i = 0; i < timeArr.length; i++) {
        if (timeArr[i].id == id && timeArr[i].dataType == dataType && itemType == itemType) {
          const list = timeArr[i].data.concat(timeItem);
          timeArr[i].data = list;
          arr = [timeArr[i]]
          Taro.setStorageSync(Calendar, timeArr);
          // 判断为id和记工类型不相同的时候
        } else {
          let obj: any = {
            id: id,
            dataType,
            itemType: itemType,
            data: timeItem
          };
          let arrList = [...timeArr];
          arrList.push(obj);
          Taro.setStorageSync(Calendar, arrList);
        }
      }
    } else {
      // 第一次设置日历值
      let list: any[] = [];
      let obj: any = {
        id: id,
        dataType,
        itemType,
        data: timeItem
      };
      list.push(obj);
      arr = list;
      Taro.setStorageSync(Calendar, list);
    }
    // Taro.setStorageSync(Calendar, arr);
    const userArr = Taro.getStorageSync(User);
    // 班组长的时候设置
    if (type === 1) {
      if (userArr && userArr.length > 0) {
        for (let i = 0; i < userArr.length; i++) {
          if (userArr[i].id === id && userArr[i].dataType == dataType && itemType == itemType) {
            const arr = [...userArr[i].data, ...workers]
            userArr[i].data = [...new Set(arr)]
            Taro.setStorageSync(User, userArr);
          } else {
            let obj: any = {
              id: id,
              dataType,
              itemType,
              data: workers
            };
            let arrList = [...userArr];
            arrList.push(obj);
            Taro.setStorageSync(User, arrList);
          }
        }
      } else {
        // 第一次工人
        let list: any[] = [];
        let obj: any = {
          id: id,
          dataType,
          itemType,
          data: workers
        };
        list.push(obj);
        Taro.setStorageSync(User, list);
      }
    }
  }
  // 点击项目
  const handleProject = (v) => {
    let data = JSON.parse(JSON.stringify(model));
    const arr = JSON.parse(JSON.stringify(projectArr))
    data.name = v.group_name + '-' + v.name;
    let groupInfos = v.group_id + ',' + v.id;
    setGroupInfo(v.group_id + ',' + v.id)
    getMonthDaysCurrent(new Date());
    //工人
    if (identity === 2) {
      if (v.leader_name) {
        setForemanTitle(v.leader_name)
      } else {
        setForemanTitle('')
      }
    }
    // 设置选择框
    for (let i = 0; i < arr.length; i++) {
      if (v.id === arr[i].id) {
        arr[i].click = true;
      } else {
        arr[i].click = false;
      }
    }
    // 设置i项目
    setProjectArr(arr)
    setShow(false)
    setModel(data)
    // 设置GroupInfo;
    setGroupInfo(v.group_id + ',' + v.id)
    // 工人的话
    const type = Taro.getStorageSync(Type);
    if (type == 2) {
      // 把数据存到reducer
      dispatch(setWorker([v]));
      // 修改工资标准
      bkGetWorkerWage(v.group_id + ',' + v.id, '', data)
      return;
    }
    // 选择项目的时候先获取设置工资标准员工
    bkGetWorker(v.group_id + ',' + v.id, true)
    // bkGetWorkerWage(groupInfo,true);
    // 获取工人列表
    // return;
  }
  // 添加班组成员选择
  const handleCheckbox = (e) => {
    const data = JSON.parse(JSON.stringify(memberList));
    const worker = JSON.parse(JSON.stringify(workerItem))
    if (data.length === 0) {
      data.push(e);
    } else {
      if (data.indexOf(e.id) === -1) {
        data.push(e.id)
      } else {
        data.splice(data.indexOf(e.id), 1)
      }
    }
    setMemberList(data);
    worker.push(...data);
    setWorkerItem(worker)
  }
  // 开始记工
  const handleStart = () => {
    // 工人
    const workerItemList = JSON.parse(JSON.stringify(workerItem));
    // 储存工人
    const storagelistItem = JSON.parse(JSON.stringify(storagelist))
    let arrList: any[] = [];
    if (workerItemList && storagelistItem) {
      for (let i = 0; i < workerItemList.length; i++) {
        for (let j = 0; j < storagelistItem.length; j++) {
          if (workerItemList[i].name != storagelistItem[j].name) {
            arrList.push(storagelistItem[j]);
          }
        }
      }
    }
    setWorkerItem([...workerItemList, ...arrList]);
    dispatch(setWorker([...workerItemList, ...arrList]))
    Taro.navigateBack({ delta: 1 })
  }
  // 确认添加标准
  const handleAddWage = () => {
    // 获取工资标准
    const data = JSON.parse(JSON.stringify(wageStandard));
    // 获取上班时长
    const timeArrs = JSON.parse(JSON.stringify(timeArr));
    // 获取加班时长
    const addWorkArrs = JSON.parse(JSON.stringify(addWorkArr));
    const groupInfos = JSON.parse(JSON.stringify(groupInfo));
    //模板金额 
    const moneyNum = data.money;
    // 模板时间
    const workNum = data.work;
    //加班金钱
    const addWorkNum = data.addWork;
    // 加班时间
    const dayNum = data.day;
    // 上班标准提示
    if (workNum == 0) {
      Msg('上班标准必须必须大于0')
      return;
    }
    // 每个工多少钱提示
    if (moneyNum == 0) {
      Msg('每个工工钱必须大于0')
      return;
    }
    //按天数 一个工
    if (data.type == 2) {
      if (data.day == 0) {
        Msg('一个工必须大于0小时')
        return;
      }
    }
    if (data.type == 1) {
      if (data.addWork == 0) {
        Msg('每小时加班金额必须大于0')
        return;
      }
    }
    // wageStandard
    // return;
    // 上班时间
    let time = 0;
    for (let i = 0; i < timeArrs.length; i++) {
      if (timeArrs[i].click) {
        // 选择工
        if (timeArrs[i].id != 1 && timeArrs[i].id != 2 && timeArrs[i].id != 3) {
          time = 1 / workNum * timeArrs[i].num
          // 选择时间
        } else {
          if (timeArrs[i].id == 1) {
            // 等于模板时间
            time = 1 / workNum * workNum;
          } else if (timeArrs[i].id == 2) {
            // 等于模板时间的一半
            time = 1 / workNum * workNum / 2;
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
    // 工人
    let groupInfoId = groupInfos;
    if (identity == 2) {
      //工资标准 每个工多少钱/上班标准 * 上班时长  判断加班是按小时算还是i按天算
      let total = 0;
      if (data.type === 1) {
        // 按小时算 加班小时* 模板加班金额
        total = (moneyNum / workNum) * (time * workNum) + addWorkNum * addTime;
        // total = (moneyNum / workNum) * time + addWorkNum * addTime;
      } else {
        // 按天算 每个工多少钱/模板定义的多少小时算一个工 * 加班时长
        // total = moneyNum / workNum * time + (moneyNum / dayNum * addTime);
        total = moneyNum / workNum * (time * workNum) + (moneyNum / dayNum * addTime);
      }
      // const num = total.toFixed(2);
      let num: any = 0;
      // if (num && !Object.is(num, NaN)){
      num = total.toFixed(2);
      // }
      // 给工人自己设置工资标准
      // 传0会报错所以判断是按天还是按小时
      let params;
      // 按小时
      if (data.type === 1) {
        params = {
          identity: identity,
          worktime_define: data.work,
          overtime_type: data.type,
          overtime_money: data.addWork,
          money: data.money,
          overtime: data.day,
          group_info: groupInfos
        }
        // 按天
      } else {
        params = {
          identity: identity,
          worktime_define: data.work,
          overtime_type: data.type,
          overtime_money: data.dayAddWork,
          money: data.money,
          overtime: data.day,
          group_info: groupInfos
        }
      }
      // 工人项目大于0的时候修改工资标准
      if (projectArr.length > 0) {
        bkSetWorkerIdentityWageAction(params).then(res => {
          if (res.code !== 200) {
            Msg(res.msg)
          }
        })
      }
      // 如果没有的没有项目就设置一个其他项目- 其他班组，但是不显示在页面上
      // if (projectArr.length === 0) {
      //   let items = {
      //     group_name: '其他项目',
      //     team_name: '其他班组'
      //   }
      //   bkAddProjectTeamAction(items).then(res => {
      //     if (res.code !== 200) {
      //       Msg(res.msg);
      //     } else {
      //       // groupInfoId = res.data;
      //       params.group_info = res.data;
      //       bkSetWorkerIdentityWageAction(params).then(res => {
      //         if (res.code !== 200) {
      //           Msg(res.msg)
      //         }
      //       })
      //       setGroupInfo(res.data)
      //       setModel({ ...model, workersWages: num });
      //       setWageStandardDisplay(false);
      //     }
      //   })
      //   return;
      // }
      // bkSetWorkerIdentityWageAction(params).then(res=>{
      //   if(res.code !== 200){
      //     Msg(res.msg)
      //   }
      // })
      setModel({ ...model, workersWages: num });
      setWageStandardDisplay(false);
      return;
    }
    if (addStandard === 1) {
      let params = {
        name: '',
        worktime_define: data.work,
        overtime_type: data.type,
        overtime_money: data.dayAddWork,
        money: data.money,
        overtime: data.day,
      }
      bkAddWageAction(params).then(res => {
        if (res.code === 200) {
          bkWageStandGetWage();
          setWagesModalDisplay(true)
        } else {
          Msg(res.msg);
          return
        }
      })
      return;
    }
    // 修改已设置的
    if (state === 1) {
      let params = {
        id: data.worker_id,
        group_info: groupInfos,
        worktime_define: data.work,
        overtime_type: data.type,
        overtime: data.day,
        overtime_money: data.addWork,
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
    } else {
      let params;
      if (data.type == 1) {
        params = {
          name: '',
          worktime_define: data.work,
          overtime_type: data.type,
          overtime_money: data.addWork,
          money: data.money,
          overtime: data.day,
          id: data.id
        }
        // 按天
      } else {
        params = {
          name: '',
          worktime_define: data.work,
          overtime_type: data.type,
          overtime_money: data.addWork,
          money: data.money,
          overtime: data.day,
          id: data.id
        }
      }
      bkupdateWageAction(params).then(res => {
        if (res.code === 200) {
          bkWageStandGetWage();
        } else {
          Msg(res.msg);
          return
        }
        setWagesModalDisplay(true);
        setWageStandardDisplay(false);
      })
    }
  }
  // 切换时间还是天
  const handleWageStandardRadio = (e) => {
    const data = JSON.parse(JSON.stringify(wageStandard));
    data.type = e.id;
    const arr = data.data.map(v => {
      if (e.id === v.id) {
        v.click = true
      } else {
        v.click = false
      }
      return v;
    })
    data.data = arr;
    setWageStandard(data)
  }
  // 修改
  const handleEditWages = (v: any, type: number) => {
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
    data.worker_id = v.worker_id;
    for (let i = 0; i < data.data.length; i++) {
      if (parseInt(v.overtime_type) == data.data[i].id) {
        data.data[i].click = true
      } else {
        data.data[i].click = false
      }
    }
    if (v.overtime_type == 2) {
      data.dayAddWork = (parseFloat(v.money) / parseFloat(v.overtime)).toFixed(2);
    }
    setWageStandard(data)
  }
  // 修改已定义工资标准
  const handleEditWageStandard = () => {
    const item = JSON.parse(JSON.stringify(wageStandard));
    let params = {
      id: item.id,
      group_info: groupInfo,
      worktime_define: item.work,
      overtime_type: item.type,
      overtime: item.day,
      overtime_money: item.dayAddWork,
      money: item.money,
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
  const handleDelProject = (v) => {
    const ids = v.id;
    let params = {
      ids,
    }
    const name = JSON.parse(JSON.stringify(foremanTitle));
    const data = JSON.parse(JSON.stringify(model));
    Taro.showModal({
      title: '',
      content: '确认删除',
      showCancel: true,
      success: (res) => {
        if (res.confirm == true) {
          bkDeleteprojectTeamAction(params).then(res => {
            if (res.code === 200) {
              Msg('删除成功');
              setTimeout(() => {
                bkGetProjectTeam();
                setForemanTitle('');
                setModel({ ...model, name: '' });
              }, 800)
            } else {
              Msg(res.msg)
            }
          })
        }
      }
    })
  }
  // 确认修改项目
  const handleEditProject = () => {
    const data = JSON.parse(JSON.stringify(editProjectData));
    let params = {
      group_info: data.group_info,
      team_name: data.team_name,
      group_name: data.group_name,
    }
    bkUpdateProjectTeamAction(params).then(res => {
      if (res.code === 200) {
        setEditProjectDisplay(false);
        bkGetProjectTeam();
      } else if (res.code === 400) {
        Msg(res.msg)
        return;
      }
    })
  }
  // 修改项目弹框
  const handleEditProjectModal = (v) => {
    setEditProjectDisplay(true);
    const data = JSON.parse(JSON.stringify(editProjectData))
    data.group_info = v.group_id + ',' + v.id;
    data.team_name = v.name;
    data.group_name = v.group_name;
    setEditProjectData(data);
  }
  // 修改项目组输入框
  const handleEditProjectData = (type, e) => {
    let data = JSON.parse(JSON.stringify(editProjectData));
    data[type] = e.detail.value;
    setEditProjectData(data);
  }
  // 给工人设置标准
  const handleSetWagesModal = () => {
    const Item = JSON.parse(JSON.stringify(groupInfo));
    let id;
    if (Item.constructor === Object) {
      id = Item.group_id + ',' + Item.id;
    } else {
      id = Item;
    }
    if (!templateId) {
      Msg('请选择模板');
      return;
    }
    let worker_ids: string[] = [];
    for (let i = 0; i < setWorkList.length; i++) {
      if (setWorkList[i].click) {
        worker_ids.push(setWorkList[i].id);
      }
    }
    const params = {
      worker_ids: worker_ids.toString(),
      wage_id: templateId,
      group_info: id
    };
    bkSetWorkerMoneyByWageAction(params).then(res => {
      if (res.code === 200) {
        // // 给设置模板的设置为已经设置模板
        const data = JSON.parse(JSON.stringify(workerItem));
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < worker_ids.length; j++) {
            if (data[i].id == worker_ids[j]) {
              data[i].set = true;
              data[i].del = false;
            }
          }
        }
        setWorkerItem(data)
        bkGetWorkerWage();
        setWagesModalDisplay(false);
      } else {
        Msg(res.msg);
        return;
      }
    })
  }
  // 选择工人
  const handleWagesList = (v) => {
    const data = JSON.parse(JSON.stringify(setWorkList));
    for (let i = 0; i < data.length; i++) {
      if (v.id === data[i].id) {
        data[i].click = !data[i].click;
      }
    }
    let clickData: any[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].click) {
        clickData.push(data[i]);
      }
    }
    setClickModalNum(clickData.length)
    setSetWorkList(data);
  }
  // 选模板
  const handleCheckboxStandard = (v) => {
    const data = JSON.parse(JSON.stringify(standard));
    for (let i = 0; i < data.length; i++) {
      if (v.id === data[i].id) {
        data[i].click = true;
        setTemplateId(v.id);
      } else {
        data[i].click = false
      }
    }
    setStandard(data);
  }
  // 选择工人
  const handleWorkerItem = (v) => {
    if (delType) return;
    const modelData = JSON.parse(JSON.stringify(model));
    if (!modelData.name) {
      Msg('请先选择项目')
      return
    }
    const data = JSON.parse(JSON.stringify(workerItem));
    // 借支对时候全部都可以点
    const id = JSON.parse(JSON.stringify(contractor));
    if (recorderType === 3 || (recorderType === 2 && id === 1)) {
      for (let i = 0; i < data.length; i++) {
        if (v.id === data[i].id) {
          data[i].click = !data[i].click
        }
      }
      let numData: any[] = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].click) {
          numData.push(data[i])
        }
      }
      setClickNum(numData.length);
      setWorkerItem(data);
      // return;
    } else {
      for (let i = 0; i < data.length; i++) {
        if (v.id === data[i].id) {
          if (v.set) {
            data[i].click = !data[i].click
          } else {
            handleOpenWagesModal(v);
          }
        }
      }
      let numData: any[] = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].click) {
          numData.push(data[i])
        }
      }
      setClickNum(numData.length);
      setWorkerItem(data);
    }
  }
  // 成员全选
  const handleAllChange = () => {
    const dataItemArr = JSON.parse(JSON.stringify(workerItem));
    const recorderTypes = JSON.parse(JSON.stringify(recorderType))
    let Itme: any[] = [];
    // 借支和按量记
    if (recorderTypes === 3 || (recorderTypes === 2 && contractor == 1)) {
      for (let i = 0; i < dataItemArr.length; i++) {
        dataItemArr[i].click = !dataItemArr[i].click;
        if (dataItemArr[i].click) {
          Itme.push(dataItemArr[i]);
        }
      }
      setWorkerItem(dataItemArr);
      setClickNum(Itme.length);
      return;
    } else {
      // 必须全部都为set才你的那个变为取消全选
      if (!allClick) {
        dataItemArr.map((v) => {
          if (v.set) {
            v.click = true;
            Itme.push(v);
          }
          setAllClick(true)
          if (!v.set) {
            Msg('还有人未设置工资标准')
            setAllClick(false)
          }
          return v;
        })
        // 判断没有一个值没有set设置为取消全选
        // if (Itme.length>0){
        //   setAllClick(true)
        // }
      } else {
        dataItemArr.map((v) => {
          if (v.set) {
            v.click = false;
            setWorkerItem(dataItemArr);
            setClickNum(0);
          }
          setAllClick(false)
          return v;
        })
      }
      setWorkerItem(dataItemArr);
      setClickNum(Itme.length);
      // for (let i = 0; i < dataItemArr.length; i++) {
      //   // if (!dataItemArr[i].set){
      //   //   Msg('还有人未设置工资标准')
      //   // }
      //   if (dataItemArr[i].set) {
      //     // Itme.push(dataItemArr[i]);
      //     // dataItemArr[i].click = true;
      //     if(dataItemArr[i].click){
      //       dataItemArr[i].click = false;
      //       setWorkerItem(dataItemArr);
      //       setClickNum(0);
      //       return;
      //     }else{
      //       dataItemArr[i].click = true;
      //       Itme.push(dataItemArr[i]);
      //       setWorkerItem(dataItemArr);
      //       setClickNum(Itme.length);
      //       return;
      //     }
      //   }
      // }
    }
  }
  // 长按
  const handleLongClick = () => {
    setWageStandardDisplay(true)
  }
  // 全选
  const handleAllClick = () => {
    const dataItemArr = JSON.parse(JSON.stringify(setWorkList));
    let Itme: any[] = [];
    if (!checkAll) {
      dataItemArr.map((v) => {
        v.click = true;
        Itme.push(v);
        setCheckAll(true)
        return v;
      })
    } else {
      dataItemArr.map((v) => {
        v.click = false;
        setSetWorkList(dataItemArr);
        setClickModalNum(0);
        setCheckAll(false)
        return v;
      })
    }
    setSetWorkList(dataItemArr);
    setClickModalNum(Itme.length);
    // if(!checkAll){
    //   let Itme:any[] =[];
    //   for(let i =0;i<data.length;i++){
    //     if (data[i].click) {
    //       Itme.push(data[i]);
    //     }
    //     data[i].click = !data[i].click
    //   };
    //   setCheckAll(true)
    //   setClickModalNum(Itme.length);
    // }else{
    //   for (let i = 0; i < data.length; i++) {
    //     data[i].click = false
    //   };
    //   setCheckAll(false)
    //   setClickModalNum(0)
    // }
    // setSetWorkList(data);
  }
  // 切换包工类型
  const handleRadio = (v) => {
    const data = JSON.parse(JSON.stringify(contractorArr.item));
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === v.id) {
        data[i].click = true
        setContractor(v.id)
      } else {
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
  const handleAdd = () => {
    if (!model.name) {
      Msg('请先选择项目')
      return
    }
    console.log(groupInfo, '')
    // return;
    bkGetWorker();
    // setRefresh(true)
    userRouteJump(`/pages/addTeamMember/index?groupInfo=${groupInfo}`);
    return;
  }
  // 日历关闭
  const handleCalendarClose = () => {
    // 取消的时候清空点击的值，但是保留显示的值
    // 取消的时候获取点击的值，然后获取点击上次确认的值,然后遍历出来
    const clickDataArr = JSON.parse(JSON.stringify(clickData));
    // setClickData([]);
    // 确认日历的值
    const data = JSON.parse(JSON.stringify(openClickTime));
    const calendarDaysArr = JSON.parse(JSON.stringify(calendarDays));
    // 遍历本月日历，然后遍历上次点击的日历，判断相同就设置为true
    // for(let j=0;j<data.length;j++){
    //   for (let i = 0; i < calendarDaysArr.length;i++){
    //         calendarDaysArr[i].click = false;
    //       if (data[j].date == calendarDaysArr[i].date && data[j].month == calendarDaysArr[i].month && data[j].year == calendarDaysArr[i].year) {
    //         calendarDaysArr[i].click = true;
    //       }
    //     }
    //   }
    for (let i = 0, len = calendarDaysArr.length; i < len; i++) {
      calendarDaysArr[i].click = false;
      if (data.length > 0) {
        for (let j = 0, length = data.length; j < length; j++) {
          if (data[j].date == calendarDaysArr[i].date && data[j].month == calendarDaysArr[i].month && data[j].year == calendarDaysArr[i].year) {
            calendarDaysArr[i].click = true;
          }
        }
      }
    }
    setClickData(data)
    setCalendarDays(calendarDaysArr)
    let time;
    if (data.length == 1) {
      // const time = data[0].year+
      const years = new Date().getFullYear();
      const months = new Date().getMonth() + 1;
      const dates = new Date().getDate();
      if (data[0].year == years && data[0].month == months && data[0].date == dates) {
        time = years + '-' + months + '-' + dates
      } else {
        time = data[0].year + '-' + data[0].month + '-' + data[0].date
      }
    } else {
      time = data.length + '天';
    }
    setModel({ ...model, time: time });
    // clickDataItem.map((v,i)=>{
    //   if (data.length==0){
    //     v.click = false;
    //   }else{
    //     data.map(val=>{
    //       if (v.date ==val.date && v.month ==val.month && v.year ==val.year) {
    //         // 判断相同就不清楚
    //         v.click = true;
    //       }
    //       return val;
    //     })
    //   }
    //   return v;
    // })
    // setClickData(clickDataItem)
    // 并清空
    // setTimeData([]);
    // const calendar = JSON.parse(JSON.stringify(calendarDays));
    // for(let i=0;i<calendar.length;i++){
    //   calendar[i].click = false
    // }
    // setCalendarDays(calendar);
    // setClickData([]);
    setCalendarModalDisplay(false);
  }
  // 日历切换时间
  const handleChangeTime = (type: number) => {
    if (type === 0) {
      let date = new Date(JSON.parse(time.year), JSON.parse(time.monent) - 2, 1)
      getMonthDaysCurrent(date);
      return;
    } else {
      let date = new Date(JSON.parse(time.year), JSON.parse(time.monent), 1)
      getMonthDaysCurrent(date);
      return;
    }
  }
  // 日历确定
  const handleCalendarSub = () => {
    // if (recorderType === 3){
    //   const data = JSON.parse(JSON.stringify(arr));
    //   let time ;
    //   if(data.length>0){
    //     time = data[0].year + '-' + addZero(data[0].month) + '-' + addZero(data[0].date);
    //   }
    //   setModel({ ...model, time: time });
    //   setCalendarModalDisplay(false);
    // }else{
    const data = JSON.parse(JSON.stringify(clickData));
    let time;
    if (data.length == 1) {
      // const time = data[0].year+
      const years = new Date().getFullYear();
      const months = new Date().getMonth() + 1;
      const dates = new Date().getDate();
      if (data[0].year == years && data[0].month == months && data[0].date == dates) {
        time = years + '-' + months + '-' + dates
      } else {
        time = data[0].year + '-' + data[0].month + '-' + data[0].date
      }
    } else {
      time = data.length + '天';
    }
    // 显示
    setModel({ ...model, time: time });
    // 覆盖点击的值
    setOpenClickTime(data)
    // 点击的值
    setTimeData(data);
    // 关闭
    setCalendarModalDisplay(false);
    // }
  }
  // 左
  const onScrollToUpper = () => {
    let date = new Date(JSON.parse(time.year), JSON.parse(time.monent), 1)
    getMonthDaysCurrent(date);
  }
  // 右
  const onScrollToLower = () => {
    let date = new Date(JSON.parse(time.year), JSON.parse(time.monent) - 2, 1)
    getMonthDaysCurrent(date);
  }
  // 触摸结束
  const onTouchEnd = (e) => {
    const endTime = e.timeStamp;
    setEndTime(endTime)
  }
  // 触摸开始
  const onTouchStart = (e) => {
    const startTime = e.timeStamp;
    setStartTime(startTime)
  }
  // 工人长按
  const onLongPress = () => {
    setWageStandardDisplay(true)
  }
  // 切换类型
  const handleClckTabber = (v) => {
    const recorderTypeArrList = JSON.parse(JSON.stringify(recorderTypeArr.item));
    const data = recorderTypeArrList.map(val => {
      if (val.id === v.id) {
        val.click = true
        setRecorderType(val.id)
        // if(v.id===3){
        // 设置日历rudux为空
        // dispatch(setClickTIme([]))
        // }
        // 设置日历今日已设置过的默认值
        // 工人
        if (groupInfo) {
          bkGetWorker(groupInfo, true, '', val.id)
        }
        // setUserId(val.id)
        const type = Taro.getStorageSync(Type);
        if (type === 1) {
          getMonthDaysCurrent(new Date(), '', '', val.id);
        }
      } else {
        val.click = false
      }
      return val;
    });
    setRecorderTypeArr({ item: data })
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
    setClickModalNum,
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
    handleAdd,
    recorderType,
    setRecorderType,
    calendarDays,
    setCalendarDays,
    clickData,
    setClickData,
    handleClickCalendar,
    time,
    getMonthDaysCurrent,
    arr,
    handleCalendarClose,
    handleChangeTime,
    handleCalendarSub,
    calendarModalDisplay,
    setCalendarModalDisplay,
    onScrollToUpper,
    onScrollToLower,
    onTouchEnd,
    onTouchStart,
    onLongPress,
    display,
    setDisplay,
    allClick,
    checkAll,
    handleClckTabber,
  }
}