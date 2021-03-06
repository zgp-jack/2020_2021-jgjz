import Taro, { useState, useEffect, useDidShow, getStorageInfoSync, useDidHide, useRouter } from '@tarojs/taro'
import { bkAddProjectTeamAction, bkAddWorkerActiion, bkDeleteRroupWorkerAction, addNewBusinessAction, bkGetProjectTeamAction, bkGetWorkerAction, bkWageStandGetWageAction, bkAddWageAction, bkGetWorkerWageAction, bkUpdateWorkerAction, bkDeleteprojectTeamAction, bkUpdateProjectTeamAction, bkSetWorkerMoneyByWageAction, bkupdateWageAction, bkSetGroupLeaderAction, bkSetWorkerIdentityWageAction, bkgetLastGroupInfoAction, getWorkerHasBusinessByDateAction,getBookkeepingDataAction } from '../../utils/request/index'
import { MidData, Type, Calendar, RecordTime, User, Tomorrow, NoRequest } from '../../config/store'
import { bkGetProjectTeamData } from '../../utils/request/index.d'
import { useDispatch, useSelector } from '@tarojs/redux'
import { setWorker } from '../../actions/workerList'
import { setmailList } from '../../actions/mailList'
import { setUserList } from '../../actions/userList';
import { setClickTIme } from '../../actions/clickTIme'
import { setPhoneList } from '../../actions/phoneList';
import { setColor } from '../../actions/colorSet';
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
  modalDuration:string,
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
interface CalendarType{
  first: any[],
  second: any[],
  third: any[],
  fourth: any[]
}
// 切换类型
let changeId = 1;
// 日历
let isChange = false;
// 防止多点
let isHandleAdd = true;
let useAdd = true;
let noData = false;
let testItem = false;
// 今天
let toDate = '';
// 日历是否滑动
let calendarState = true;
export default function userForeman() {
  // const router: Taro.RouterInfo = useRouter();
  // const { stateType } = router.params;
  // 获取存入的公用内容
  const useSelectorItem = useSelector<any, any>(state => state)
  const dispatch = useDispatch()
  // 测试
  const [test,setText] = useState<string>('')
  // 是工人还是班组
  const [identity, setIdentity] = useState<number>(1)

  //判断是否是删除状态
  const [isDel, setDel] = useState<boolean>(false)

  // 上班时长
  const [timeArr, setTimeArr] = useState<DataType[]>([
    { id: 1, name: '1个工', click: false, num: 1, whole: true },
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
    modalDuration:'',
    amount: '',
    price: '',
    wages: '',
    borrowing: '',
    univalent: '',
    userName: '',
    phone: '',
    workersWages: '0.00',
  })
  const [wageStandard, setWageStandard] = useState<any>({
    data: [
      { id: 1, name: '按小时算', click: true },
      { id: 2, name: '按工天算', click: false },
    ],
    // 上班模板
    work: 0,
    // 上班金额
    money: 0.00,
    // 加班钱（小时）
    addWork: 0.00,
    // 小时/天
    type: 1,
    // 加班多少小时算一台呢
    day: 0,
    // 自动换算加班多少每小时多少钱
    dayAddWork: 0.00,
    state: '',
    group_info: '',
    id: '',
    worker_id: '',
  })
  const [cacheWage, setCacheWage]= useState<any>({
    data: [
      { id: 1, name: '按小时算', click: true },
      { id: 2, name: '按天算', click: false },
    ],
    // 上班模板
    work: 0,
    // 上班金额
    money: 0.00,
    // 加班钱（小时）
    addWork: 0.00,
    // 小时/天
    type: 1,
    // 加班多少小时算一台呢
    day: 0,
    // 自动换算加班多少每小时多少钱
    dayAddWork: 0.00,
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
    item: [{ id: 0, name: '按天记工', click: true }, { id: 1, name: '按量记工', click: false }]
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
  // 保存今天
  const [toDay,setToday] = useState<any>();
  // 日历是否选择31天
  const [noCalendarDay, setnoCalendarDay] = useState<boolean>(false)
  // 判断日历左边是否需要icon
  const [leftTime, setleftTime] = useState<boolean>(true)
  // 判断日历右边是否需要icon
  const [rightTime, setrightTime] = useState<boolean>(false)
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
  // 工人是否有未设置工资标准的
  const [noSet, setNoset] = useState<boolean>(false)
  // 触摸时间设置
  const [endTime, setEndTime] = useState<number>();
  const [startTime, setStartTime] = useState<number>()
  // 日历状态
  // const [ calendarState ,setCalendarState] = useState<boolean>(true)
  // 日历
  const [calendarModalDisplay, setCalendarModalDisplay] = useState<boolean>(false)
  // 获取当月天数
  const [calendarDays, setCalendarDays] = useState<any[]>([]);
  // 设置点击了的日历
  const [clickData, setClickData] = useState<any[]>([])
  const [arr, setArr] = useState<any[]>([]);
  // 设置打开日时点击的值
  const [openClickTime, setOpenClickTime] = useState<any[]>([])
  // 点击上班时长
  const [clickDay, setClickDay] = useState<any>();
  // 点击加班时长
  const [clickTime, setClickTime] = useState<any>()
  // 获取后台传的今天的日期
  const [toDayString, setToDayString] = useState<string>('');
  // 备注是否disable
  const [isdisable,setIsdisable] = useState<boolean>(false)
  // 跳转考勤表
  const [jumpMonth, setJumpMonth] = useState<string>('')
  // 防止创建项目多点
  // const [isHandleAdd, setIsHandleAdd] = useState<Boolean>(false)
  //切换的类型
  // const [changeId,setChangeID] = useState<number>(1)
  // const [noData, setNoData] = useState<boolean>(false)
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
  const [timeDate, setTimeDate] = useState<TimeType>({
    year: '',
    monent: '',
  })
  // 设置存redux的日期
  const [reduxTime, setReduxTime] = useState<any[]>([])
  // 工资标准全选
  const [checkAll, setCheckAll] = useState<boolean>(false)
  // 缓存日历
  const [cacheDays, setcacheDays] = useState<string[]>([]);
  // 缓存工人
  const [cacheWorker, setcacheWorker] = useState<string[]>([])
  // 点击项目id
  const [projectId, setProjectId] = useState<string>('')
  // 设置工人已经设置缓存
  const [cache, setCache] = useState<any>()
  // 班组长id
  const [leader_id, setLeader_id] = useState<string>('')
  // 日历数据
  const [calendar, setCalendar] = useState <CalendarType>({
    first: [],
    second: [],
    third: [],
    fourth: []
  })
  const [swiperMap, setSwiperMap] = useState<string[]>(['first', 'second', 'third', 'fourth']);
  // 日历索引
  const [swiperIndex, setSwiperIndex] = useState<number>(3);
  // 设置年月日小于0前面加0
  useEffect(()=>{
    setDel(false)
    let type = Taro.getStorageSync(Type);
    if (type == 1) {
      Taro.setNavigationBarTitle({
        title: '我是班组长，开始记工'
      })
    } else {
      Taro.setNavigationBarTitle({
        title: '我是工人，开始记工'
      })
    }
    let mid = Taro.getStorageSync(MidData);
    console.log(mid,'MidDataMidDataMidData');
    console.log(type ,'tyndsandjasndlk')
    console.log(useSelectorItem.workerList,'第三大街上你的')
    // 设置身份
    setIdentity(type);
    if (useSelectorItem.workerList.length > 0){
      if (type === 2) {
        setForeman(useSelectorItem.workerList);
        if (useSelectorItem.workerList[0].leader_name) {
          setForemanTitle(useSelectorItem.workerList[0].leader_name);
          setLeader_id(useSelectorItem.workerList[0].group_leader);
        }
        return;
      }
      let objs = JSON.parse(JSON.stringify(obj));
      const data = JSON.parse(JSON.stringify(moneyList));
      const arrList = JSON.parse(JSON.stringify(useSelectorItem.workerList));
      for (let i = 0; i < arrList.length; i++) {
        if (arrList[i].id === objs.id) {
          objs = arrList[i];
          arrList.splice(i, 1)
        }
      }
      const item = [objs, ...arrList];
      if (data.length > 0) {
        // setNoset(false)
        for (let j = 0; j < data.length; j++) {
          for (let i = 0; i < item.length; i++) {
            item[i].click = false;
            // setNoset(false)
            if (data[j].worker_id === item[i].id) {
              item[i].set = true
              // setNoset(true)
            }
            //  else {
            // }
          }
        }
      } else {
        for (let i = 0; i < item.length; i++) {
          item[i].click = false;
        }
      }
      if (cache&& cache.length>0){
        for (let i = 0, len = item.length; i < len; i++) {
          for (let j = 0, setLen = cache.length; j < setLen; j++) {
            if (cache[j] == item[i].id) {
              item[i].discipline = true;
            }
          }
        }
      }
      let noset: boolean = true;
      for (let j = 0; j < item.length; j++) {
        item[j].del = false;
        if (!item[j].set) {
          noset = false
        }
      }
      setNoset(noset)
      console.log(item,'item')
      setClickNum(0);
      setAllClick(false)
      setWorkerItem(item)
      Taro.setStorageSync(NoRequest, false);
    }else{
      console.log(231321321312);
      console.log(noData,'noData')
      const Request = Taro.getStorageSync(NoRequest);
      if (Request) return;
      getList();
    }
  }, [useSelectorItem.workerList])
  // 获取三个月日历
  const generateThreeMonths = (e, val?: any, ids?: any, typeId?: string, cacheDaysArrList?: string[], change?: boolean)=>{
    // 只需要设置这个月之前的，因为不能选择今天之后的
    // 这个月就是最后一个
    const calendarData = JSON.parse(JSON.stringify(calendar));
    const thisKey = swiperMap[swiperIndex];
    const lastKey = swiperMap[swiperIndex - 1 === -1 ? 3 : swiperIndex - 1];
    const nextKey = swiperMap[swiperIndex + 1 === 4 ? 0 : swiperIndex + 1];
    const time = countMonth(e.getFullYear() + '-' + (e.getMonth () + 1) + '-' + e.getDate());
    // let year = e.getFullYear() //年
    // let month = e.getMonth() + 1 //月
    // let date = e.getDate() // 日
    console.log(time,'打印')
    console.log(JSON.parse(time.lastMonth.year))
    console.log(Number(time.lastMonth.month))
    let lastMonth = new Date(JSON.parse(time.lastMonth.year)+'-'+ (time.lastMonth.month)+'-'+ 1);
    let nextMonth = new Date(JSON.parse(time.nextMonth.year)+'-'+(time.nextMonth.month)+'-'+ 1);
    // console.log(lastMonth,'lastMonth');
    // console.log(nextMonth,'nextMonth')
    // delete calendarData[lastKey]
    // calendarData[lastKey] = getMonthDaysCurrent(lastMonth, val)
    // delete calendarData[thisKey]
    // calendarData[thisKey] = getMonthDaysCurrent(new Date(e), val, ids, typeId, cacheDaysArrList, change, thisKey);
    // // 不设置下一页
    // delete calendarData[nextKey]
    // calendarData[nextKey] = getMonthDaysCurrent(nextMonth, val);
    // console.log(calendarData,'calendar');
    // 最后一个
    delete calendarData['fourth']
    calendarData['fourth'] = getMonthDaysCurrent(new Date(e), val, ids, typeId, cacheDaysArrList, change, thisKey);
    // 上一个
    delete calendarData['third']
    calendarData['third'] = getMonthDaysCurrent(lastMonth, val);
    // setCalendarState(false)
    calendarState = false;
    setCalendar(calendarData)
  }
  // 设置日历时间
  const countMonth = (today)=>{
    console.log(today,'today')
    const time = {
      date: today.split('-')[2],
      month: addZero(today.split('-')[1]),
      year: addZero(today.split('-')[0]),
    }
    let lastMonth = {
      month: formatMonth(parseInt(time.month) - 1),
      year:'',
      num:31
    };
    let thisMonth = {
      year:time.year,
      month: time.month,
      num: new Date(time.year, time.month, 0).getDate()
    }
    let nextMonth = {
      month: formatMonth(parseInt(time.month) + 1),
      year: '',
      num: 31
    } 
    lastMonth.year = parseInt(time.month) === 1 && parseInt(lastMonth.month) === 12
      ? `${parseInt(time.year) - 1}`
      : time.year + '';
    lastMonth.num = new Date(Number(lastMonth.year), Number(lastMonth.month), 0).getDate();
    nextMonth.year = parseInt(time.month) === 12 && parseInt(nextMonth.month) === 1
      ? `${parseInt(time.year) + 1}`
      : time.year + ''
    nextMonth.num = new Date(Number(nextMonth.year), Number(nextMonth.month), 0).getDate();
    return {
      lastMonth,
      thisMonth,
      nextMonth
    }
  }
  // 月份处理
  const formatMonth = (month)=>{
    let monthStr = ''
    if (month > 12 || month < 1) {
      monthStr = Math.abs(month - 12) + ''
    } else {
      monthStr = month + ''
    }
    monthStr = `${monthStr.length > 1 ? '' : '0'}${monthStr}`
    return monthStr
  }
  // 设置默认数据
  const getList = (businessType?:number)=>{
    isHandleAdd = true;
    console.log('默认请求')
    // 缓存数据
    let midData = Taro.getStorageSync(MidData)
    // 获取通讯里信息
    const workerItemData = JSON.parse(JSON.stringify(workerItem));
    // 数据
    const modelData = JSON.parse(JSON.stringify(model));
    let identity = Taro.getStorageSync(Type);
    let paramsId;
    if(businessType){
      paramsId = businessType; 
    }else{
      recorderTypeArr.item.map((v)=>{
        if(v.click){
          paramsId = v.id;
        }
      })
    }
    let params = {
      identity,
      business_type: paramsId,
    }
    console.log(params,'params')
    console.log(midData,'midDatamidDatamidData')
    // getMonthDaysCurrent(new Date());
    // 首先定义自己
    const objs = JSON.parse(JSON.stringify(obj))
    objs.name = midData.worker_name || '未命名';
    objs.id = midData.worker_id;
    
    setObj(objs);
    let title:string='',id, time,sum:string='0';
    getBookkeepingDataAction(params).then(res=>{
      Taro.setStorageSync(NoRequest, false);
      console.log(res,'ressssssssss')
      console.log(res.time,'res.time');
      let today;
      if(res.time){
        today = res.time;
      }else{
        today = new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDay();
      }
      toDate = today;
      // 设置日历
      let dayObj = {
        date: today.split('-')[2],
        month: today.split('-')[1],
        year: today.split('-')[0],
        click: true
      }
      time = today + `（今天）`;
      setOpenClickTime([dayObj])
      setClickData([dayObj])
      setTimeData([dayObj]);
      setToday([dayObj])
      setToDayString(today)
      // 设置加班时长默认值
      const timeTitle = '上班1个工，无加班';
      // 一个工
      for(let i =0;i<timeArr.length;i++){
        timeArr[i].click = false;
        timeArr[0].click = true;
        timeArr[3] = { id: 4, name: '0.0小时', click: false, num: 0 };
        setClickDay(timeArr[0])
      }
      // 无加班
      for (let i = 0; i < addWorkArr.length;i++){
        addWorkArr[i].click = false;
        addWorkArr[0].click = true;
        addWorkArr[1] = { id: 2, name: '0.0小时', click: false, num: 0 };
        setClickTime(addWorkArr[0])
      }
      setTimeArr(timeArr);
      setAddWorkArr(addWorkArr)
      // 日历默认今天
      generateThreeMonths(new Date(today), [dayObj])
      // getMonthDaysCurrent(new Date(), [dayObj]);
      // 设置单位
      for(let i =0;i<company.length;i++){
        company[i].click = false
        company[0].click = true
      }
      setCompany(company);
      // 默认平方米
      setUnit('平方米')
      // 借支状态
      for (let i = 0; i < borrowing.item.length;i++){
        borrowing.item[i].click = false
      }
      setBorrowing(borrowing);
      // 把项目设置存起来
      setProjectArr(res.data.group_info);
      if (res.data.latest_group_info) {
        console.log(111123131232)
        if (res.data.latest_group_info.id) {
          setLeader_id(res.data.latest_group_info.leader_id)
          title = res.data.latest_group_info.name[0] + '-' + res.data.latest_group_info.name[1];
          id = res.data.latest_group_info.id;
          setForemanTitle(res.data.latest_group_info.leader_name||'')
          // 区分是工人还是班组长
          console.log(identity,'identity')
          if (identity == 1) {
            console.log('班组长')
            // 班组长的时候需要做处理，数据里没有自己
            // 工人 
            // 判断有工人有工资标准
            // 把自己加进去
            let List: any[] = [];
            if (res.data.latest_group_workers.length > 0) {
              List = res.data.latest_group_workers;
            }
            const workArr = [objs, ...List];
            console.log(workArr,'workArr');
            console.log(res.data.latest_group_workers_has_wage,'res.data.latest_group_workers_has_wage')
            // 设置是够设置工资标准
            let type = Taro.getStorageSync(Type);
            if (res.data.latest_group_workers_has_wage.length > 0) {
              if(type == 1){
                for (let i = 0; i < workArr.length; i++) {
                  workArr[i].set = false;
                  for (let j = 0; j < res.data.latest_group_workers_has_wage.length; j++) {
                    if (workArr[i].id == res.data.latest_group_workers_has_wage[j].worker_id) {
                      workArr[i].set = true;
                    }
                  }
                }
                let noset: boolean = true;
                for (let i = 0; i < workArr.length;i++){
                  if(!workArr[i].set){
                    noset = false
                  }
                }
                setNoset(noset) 
              }else{
                const data = res.data.latest_group_workers_has_wage[0];
                const wageStandardData = JSON.parse(JSON.stringify(wageStandard));
                for(let i =0;i<wageStandardData.data.length;i++){
                  if (wageStandardData.data[i].id == data.overtime_type){
                    wageStandardData.data[i].click = true
                  }else{
                    wageStandardData.data[i].click = false
                  }
                }
                wageStandardData.work = parseFloat(data.worktime_define);
                wageStandardData.money = data.money;
                wageStandardData.addWork = data.overtime_money;
                wageStandardData.day = data.overtime;
                wageStandardData.worker_id = data.worker_id;
                wageStandardData.group_info = data.group_info;
                // wageStandardData.type = data.overtime_type;
                if (parseFloat(data.money) && parseFloat(data.overtime)) {
                  wageStandardData.dayAddWork = toFixedFn((parseFloat(data.money) / parseFloat(data.overtime) || 0));
                } else {
                  wageStandardData.dayAddWork = 0.00
                }
                // if(parseFloat(data.overtime_type) == 2){
                //   wageStandardData.addWork = data.overtime;
                //   wageStandardData.day = data.overtime_money;
                // }else{
                  wageStandardData.addWork = data.overtime_money;
                  wageStandardData.day = data.overtime;
                // }
                wageStandardData.type = parseFloat(data.overtime_type);
                for (let i = 0; i < wageStandardData.data.length;i++){
                  if (parseFloat(data.overtime_type) == wageStandardData.data[i].id){
                    wageStandardData.data[i].click = true
                  }else{
                    wageStandardData.data[i].click = false
                  }
                }
                sum = data.money;
                // if (data.worker_name){
                //   setForemanTitle(data.worker_name)
                // }else{
                //   setForemanTitle('')
                // }
                setWageStandard(wageStandardData)
                setCacheWage(wageStandardData)
              }
            }else{
              // console.log(11111)
              for (let i = 0; i < workArr.length; i++) {
                workArr[i].set = false;
              }
              setNoset(false)
            }
            // 设置是否记过工
            if (res.data.latest_group_info.constructor === Array) {
              for (let i = 0, len = workArr.length; i < len; i++) {
                workArr[i].discipline = false;
              }
            } else {
              if (res.data.latest_group_worker_has_business) {
                // console.log(1111)
                // 工人
                if (res.data.latest_group_worker_has_business.worker.length > 0) {
                  // 设置缓存
                  setCache(res.data.latest_group_worker_has_business.worker)
                  dispatch(setColor(res.data.latest_group_worker_has_business.worker||[]));
                  workArr.forEach((v,i)=>{
                    v.discipline = false;
                    res.data.latest_group_worker_has_business.worker.forEach((val,index)=>{
                      // console.log(v,'vvvv');
                      // console.log(val,'val')
                      if(val == v.id){
                        // console.log(v,'111111')
                        v.discipline = true;
                      }
                    })
                  })
                  console.log(arr,'arr')
                  console.log(workArr,'workArr')
                }
                // 日历
                let dateItem:any[] =[];
                if (res.data.latest_group_worker_has_business.days.length > 0) {
                  for(let z =0;z<res.data.latest_group_worker_has_business.days.length;z++){
                    let dayObj = {
                      date: res.data.latest_group_worker_has_business.days[z].split('-')[2],
                      month: res.data.latest_group_worker_has_business.days[z].split('-')[1],
                      year: res.data.latest_group_worker_has_business.days[z].split('-')[0],
                    }
                    dateItem.push(dayObj);
                  }
                }
                setcacheDays(dateItem);
                // getMonthDaysCurrent(new Date(), [dayObj], '', '', dateItem);
                generateThreeMonths(new Date(), [dayObj], '', '', dateItem);
              }else{
                setcacheDays([]);
                generateThreeMonths(new Date(), [dayObj], '', '', []);
              }
            }
            console.log(workArr,'workArrworkArr')
            dispatch(setPhoneList(workArr));
            setWorkerItem(workArr);
            setMoneyList(res.data.latest_group_workers_has_wage)
            setProjectId(res.data.latest_group_info.id)
            setGroupInfo(id)
            setModel({ ...model, name: title, duration: timeTitle, modalDuration: timeTitle, time, details: '', workersWages: sum, amount: '', price: '', wages: '', borrowing: '', univalent:'' })
          }else{
            console.log(res.data.latest_group_workers_has_wage,'res.data.latest_group_workers_has_wage')
            if (res.data.latest_group_workers_has_wage.length > 0) {
              const data = res.data.latest_group_workers_has_wage[0];
              const wageStandardData = JSON.parse(JSON.stringify(wageStandard));
              for (let i = 0; i < wageStandardData.data.length; i++) {
                if (wageStandardData.data[i].id == data.overtime_type) {
                  wageStandardData.data[i].click = true
                } else {
                  wageStandardData.data[i].click = false
                }
              }
              console.log((data.worktime_define),)
              wageStandardData.work = parseFloat(data.worktime_define);
              wageStandardData.money = data.money;
              // wageStandardData.addWork = data.overtime_money;
              // wageStandardData.day = data.overtime;
              wageStandardData.worker_id = data.worker_id;
              wageStandardData.group_info = data.group_info;
              // if (parseFloat(data.overtime_type) == 2) {
              //   wageStandardData.addWork = data.overtime;
              //   wageStandardData.day = data.overtime_money;
              // } else {
                wageStandardData.addWork = data.overtime_money;
                wageStandardData.day = data.overtime;
              // }
              if (parseFloat(data.money) && parseFloat(data.overtime)) {
                wageStandardData.dayAddWork = toFixedFn(parseFloat(data.money) / parseFloat(data.overtime) || 0);
              } else {
                wageStandardData.dayAddWork = 0.00
              }
              for (let i = 0; i < wageStandardData.data.length; i++) {
                if (parseFloat(data.overtime_type) == wageStandardData.data[i].id) {
                  wageStandardData.data[i].click = true
                } else {
                  wageStandardData.data[i].click = false
                }
              }
              wageStandardData.type = parseFloat(data.overtime_type);
              sum = data.money;
              // if (data.worker_name) {
              //   setForemanTitle(data.worker_name)
              // } else {
              //   setForemanTitle('')
              // }
              setWageStandard(wageStandardData)
              setCacheWage(wageStandardData)
            }else{
              const wageStandardData = JSON.parse(JSON.stringify(wageStandard));
              wageStandardData.work = 0;
              wageStandardData.addWork = 0.00;
              wageStandardData.money = 0.00;
              wageStandardData.day = 0;
              wageStandardData.type = 1;
              wageStandardData.dayAddWork = 0.00;
              wageStandardData.data = [
                { id: 1, name: '按小时算', click: true },
                { id: 2, name: '按工天算', click: false },
              ],
              setWageStandard(wageStandardData)
              setCacheWage(wageStandardData)
            }
            if (res.data.latest_group_worker_has_business) {
              // 日历
              let dateItem: any[] = [];
              if (res.data.latest_group_worker_has_business.days.length > 0) {
                for (let z = 0; z < res.data.latest_group_worker_has_business.days.length; z++) {
                  let dayObj = {
                    date: res.data.latest_group_worker_has_business.days[z].split('-')[2],
                    month: res.data.latest_group_worker_has_business.days[z].split('-')[1],
                    year: res.data.latest_group_worker_has_business.days[z].split('-')[0],
                  }
                  dateItem.push(dayObj);
                }
              }
              setcacheDays(dateItem);
              generateThreeMonths(new Date(), [dayObj], '', '', dateItem);
            }
            setProjectId(res.data.latest_group_info.id)
            setGroupInfo(res.data.latest_group_info.id)
            setModel({ ...model, name: title, duration: timeTitle, modalDuration: timeTitle, time, details: '', workersWages: sum, amount: '', price: '', wages: '', borrowing: '', univalent: '' })
          }
          return;
        } else {
          console.log(111111)
          title = '';
          id = '';
          objs.discipline = false;
          objs.set = false;
          objs.click = false;
          setNoset(false)
          const workArr = [objs];
          dispatch(setPhoneList(workArr));
          setWorkerItem(workArr);
          setForemanTitle('')
          setLeader_id('')
          setcacheDays([]);
          generateThreeMonths(new Date(),'','','',[],true);
          let type = Taro.getStorageSync(Type);
          // latest_group_workers  上次记工班组中的工人
          // latest_group_workers_has_wage  上次记工班组  中有工资的工人
          // worker_has_business  上次记工班组中   有记工的人和日期
          // default_group_workers  默认班组中     的工人
          // default_group_workers_has_wage 默认班组中  有工资标准的人
          // default_group_worker_has_business  默认班组中     有记工的人和日期
          // if(type == 1){
            if(res.data.group_info && res.data.group_info.length>0){
              title = res.data.group_info[0].group_name + '-' + res.data.group_info[0].name;
              setForemanTitle(res.data.group_info[0].leader_name)

              setProjectId(res.data.group_info[0].group_id +','+ res.data.group_info[0].id)
              setGroupInfo(res.data.group_info[0].group_id +','+ res.data.group_info[0].id)
              res.data.group_info[0].click = true;
              setProjectArr(res.data.group_info)
              setLeader_id(res.data.group_info[0].group_leader)
              let arr:any[]=[];
              if (res.data.default_group_workers.length>0){
                arr = res.data.default_group_workers;
                // for (let i = 0; i < res.data.default_group_workers.length;i++){
                //   if (res.data.default_group_workers[i].list && res.data.default_group_workers[i].list.length>0){
                //     for (let j = 0; j < res.data.default_group_workers[i].list.length;j++){
                //       arr.push(res.data.default_group_workers[i].list[j]);
                //     }
                //   }
                // }
              }
              // 默认加上自己
              let noObjs = false;
              if(arr.length>0){
                for(let i = 0;i<arr.length;i++){
                  if (arr[i].worker_id == objs.id){
                    arr[i] = objs;
                  }else{
                    noObjs = true;
                  }
                }
              }else{
                noObjs = true;
              }
              const workList = !noObjs ? [...arr] : [objs,...arr];
              console.log(workList,'workListworkList')
              // 工人设置工钱
              const wageStandardData = JSON.parse(JSON.stringify(wageStandard));
              if(type == 2){
                setMoneyList(res.data.default_group_workers_has_wage)
                if(res.data.default_group_workers_has_wage.length>0){
                  
                  const data = res.data.default_group_workers_has_wage[0];
                  wageStandardData.work = parseFloat(data.worktime_define);
                  wageStandardData.money = data.money;
                  // wageStandardData.addWork = data.overtime_money;
                  // wageStandardData.day = data.overtime;
                  wageStandardData.worker_id = data.worker_id;
                  wageStandardData.group_info = data.group_info;
                  // if (parseFloat(data.overtime_type) == 2) {
                  //   wageStandardData.addWork = data.overtime;
                  //   wageStandardData.day = data.overtime_money;
                  // } else {
                    wageStandardData.addWork = data.overtime_money;
                    wageStandardData.day = data.overtime;
                  // }
                  for (let i = 0; i < wageStandardData.data.length; i++) {
                    if (wageStandardData.data[i].id == data.overtime_type) {
                      wageStandardData.data[i].click = true
                    } else {
                      wageStandardData.data[i].click = false
                    }
                  }
                  if (parseFloat(data.money) && parseFloat(data.overtime)) {
                    wageStandardData.dayAddWork = toFixedFn(parseFloat(data.money) / parseFloat(data.overtime) || 0);
                  } else {
                    wageStandardData.dayAddWork = 0.00
                  }
                  sum = data.money;
                  wageStandardData.type = parseFloat(data.overtime_type);
                  setWageStandard(wageStandardData);
                  setCacheWage(wageStandardData)
                }else{
                  const obj = {
                    data: [
                      { id: 1, name: '按小时算', click: true },
                      { id: 2, name: '按天算', click: false },
                    ],
                    // 上班模板
                    work: 0,
                    // 上班金额
                    money: 0.00,
                    // 加班钱（小时）
                    addWork: 0.00,
                    // 小时/天
                    type: 1,
                    // 加班多少小时算一台呢
                    day: 0,
                    // 自动换算加班多少每小时多少钱
                    dayAddWork: 0.00,
                    state: '',
                    group_info: '',
                    id: '',
                    worker_id: '',
                  }
                  const wageStandardData = JSON.parse(JSON.stringify(wageStandard));
                  wageStandardData.work = 0;
                  wageStandardData.addWork = 0.00;
                  wageStandardData.money = 0.00;
                  wageStandardData.day = 0;
                  wageStandardData.type = 1;
                  wageStandardData.dayAddWork = 0.00;
                  wageStandardData.data=[
                    { id: 1, name: '按小时算', click: true },
                    { id: 2, name: '按工天算', click: false },
                  ],
                  setWageStandard(wageStandardData)
                  setCacheWage(wageStandardData)
                  setWageStandard(obj);
                  setCacheWage(obj)
                }
                
              }
              // 设置工资标准
              // let 
              setMoneyList(res.data.default_group_workers_has_wage);
              if (res.data.default_group_workers_has_wage.length>0){
                for (let i = 0; i < workList.length; i++) {
                  for (let j = 0; j < res.data.default_group_workers_has_wage.length; j++) {
                    if (workList[i].id == res.data.default_group_workers_has_wage[j].worker_id) {
                      workList[i].set = true;
                      // setNoset(true)
                    }
                    // else{
                    //   // setNoset(false)
                    // }
                  }
                }
              }
              let noset: boolean = true;
              for (let j = 0; j < workList.length; j++) {
                if (!workList[j].set) {
                  noset = false
                }
              }
              setNoset(noset)
              // 已记工
              if (res.data.default_group_worker_has_business) {
                // 工人
                if (res.data.default_group_worker_has_business.worker.length > 0) {
                  // 设置缓存
                  setCache(res.data.default_group_worker_has_business.worker)
                  dispatch(setColor(res.data.latest_group_worker_has_business.worker||[]));
                  for (let i = 0, len = workList.length; i < len; i++) {
                    for (let j = 0, setLen = res.data.default_group_worker_has_business.worker.length; j < setLen; j++) {
                      if (res.data.default_group_worker_has_business.worker[j] == workList[i].id) {
                        workList[i].discipline = true;
                      }
                    }
                  }
                }
                // 日历
                let dateItem: any[] = [];
                if (res.data.default_group_worker_has_business.days.length > 0) {
                  for (let z = 0; z < res.data.default_group_worker_has_business.days.length; z++) {
                    let dayObj = {
                      date: res.data.default_group_worker_has_business.days[z].split('-')[2],
                      month: res.data.default_group_worker_has_business.days[z].split('-')[1],
                      year: res.data.default_group_worker_has_business.days[z].split('-')[0],
                    }
                    dateItem.push(dayObj);
                  }
                }
                console.log('这么')
                console.log(dateItem,'dateItemdateItem')
                setcacheDays(dateItem);
                generateThreeMonths(new Date(), [dayObj], '', '', dateItem,true);
              }
              console.log('啊啊啊啊啊')
              dispatch(setPhoneList(workList));
              setWorkerItem(workList);
              setModel({ ...model, name: title, duration: timeTitle, modalDuration: timeTitle, time, details: '', workersWages: sum, amount: '', price: '', wages: '', borrowing: '', univalent: '' })
            }else{
              const wageStandardData = JSON.parse(JSON.stringify(wageStandard));
              wageStandardData.data = [
                { id: 1, name: '按小时算', click: true },
                { id: 2, name: '按工天算', click: false },
              ];
              wageStandardData.work = 0;
              wageStandardData.addWork = 0.00;
              wageStandardData.money = 0.00;
              wageStandardData.day = 0;
              wageStandardData.type = 1;
              wageStandardData.dayAddWork = 0.00;
              setWageStandard(wageStandardData)
              setLeader_id('')
              setCacheWage(wageStandardData)
            setModel({ ...model, name: title, duration: timeTitle, modalDuration: timeTitle, time, details: '', workersWages: sum, amount: '', price: '', wages: '', borrowing: '', univalent: '' })
          }
        }
      }
    })
  }
  const addZero = (num) => {
    if (parseFloat(num) < 10) {
      num = '0' + parseFloat(num);
    }
    return num;
  }
  // 日历点击
  const handleClickCalendar = (v: any) => {
    const calendarData = JSON.parse(JSON.stringify(calendar));
    console.log(v,'v');
    const date = v.year + '/' + v.month + '/' + v.date;
    const dates = new Date(date).getTime();
    const newDate = (new Date(toDayString)).valueOf();
    let isChange = false;
    if (newDate < dates) {
      // Msg('请设置今天之前的日期');
      // setnoCalendarDay(false)
      // isChange = true;
      return;
    }
    console.log(calendarData,'calendarData')
    let dataItem,key;
    for (let i = 0; i < calendarData.first.length;i++){
      if (calendarData.first[i].year == v.year && calendarData.first[i].month == v.month && !calendarData.first[i].up && !calendarData.first[i].next){
        dataItem = calendarData.first;
        key = 'first';
      }
    }
    for (let i = 0; i < calendarData.fourth.length;i++){
      if (calendarData.fourth[i].year == v.year && calendarData.fourth[i].month == v.month && !calendarData.fourth[i].up && !calendarData.fourth[i].next){
        dataItem = calendarData.fourth;
        key = 'fourth';
      }
    }
    for (let i = 0; i < calendarData.second.length;i++){
      if (calendarData.second[i].year == v.year && calendarData.second[i].month == v.month && !calendarData.second[i].up && !calendarData.second[i].next){
        dataItem = calendarData.second;
        key = 'second';
      }
    }
    for (let i = 0; i < calendarData.third.length; i++) {
      if (calendarData.third[i].year == v.year && calendarData.third[i].month == v.month && !calendarData.third[i].up && !calendarData.third[i].next) {
        dataItem = calendarData.third;
        key = 'third';
      }
    }
    // setnoCalendarDay(true)
    const clickDataItem = JSON.parse(JSON.stringify(clickData));
    const calendarDaysArr = JSON.parse(JSON.stringify(calendarDays));
    console.log(calendarDaysArr,'calendarDaysArr');
    console.log(clickDataItem,'clickDataItem')
    // const dataItem = calendarData.second;
    console.log(dataItem,'dataItem')
    // 遍历本月的值
    for (let i = 0; i < dataItem.length; i++) {
      // 判断是同一天就设置点击
      if (v.date == dataItem[i].date && v.month == dataItem[i].month && v.year == dataItem[i].year && !v.up && !v.next) {
        // if (isChange){
        //   console.log(111)
        //   dataItem[i].click = false;
        //   console.log(clickDataItem,'clickDataItem')
        //   setClickData(clickDataItem);
        // }else{
          if (clickDataItem.length > 30) {
            if (dataItem[i].click) {
              dataItem[i].click = !dataItem[i].click;
              // 点击的时候用的
              let data: any[] = [];
              // 判断是true时候删除
              if (dataItem[i].click) {
                data = [...clickDataItem, dataItem[i]];
                // 增加
              } else {
                // dataItem.sp
                for (let j = 0; j < clickDataItem.length; j++) {
                  if (clickDataItem[j].date == dataItem[i].date && clickDataItem[j].month == dataItem[i].month && clickDataItem[j].year == dataItem[i].year) {
                    clickDataItem.splice(j, 1)
                  }
                }
                data = [...clickDataItem];
              }
              setClickData(data)
            } else {
              Msg('最多选择31天')
              dataItem[i].click = false;
              console.log(dataItem,'calendarDaysArr')
              // calendarData.second = calendarDaysArr;
              calendarData[key] = dataItem;
              setCalendar(calendarData)
              setCalendarDays(calendarDaysArr);
              setClickData(clickDataItem)
              return;
            }
          } else {
            console.log(231321321)
            dataItem[i].click = !dataItem[i].click;
            // 点击的时候用的
            let data: any[] = [];
            // 判断是true时候删除
            if (dataItem[i].click) {
              data = [...clickDataItem, dataItem[i]];
              // 增加
            } else {
              // dataItem.sp
              for (let j = 0; j < clickDataItem.length; j++) {
                if (clickDataItem[j].date == dataItem[i].date && clickDataItem[j].month == dataItem[i].month && clickDataItem[j].year == dataItem[i].year) {
                  clickDataItem.splice(j, 1)
                }
              }
              data = [...clickDataItem];
            }
            
            setClickData(data)
          // }
        }
        console.log(11111)
        // calendarData.second = dataItem;
        calendarData[key] = dataItem;
        setCalendar(calendarData)
        setCalendarDays(dataItem);
        return;
        // }
        //就刷新更改
      }
      //  else {
      //   // 判断向上还是向下
      //   // 向上
      //   if (v.up) {
      //     let date = new Date(calendarDaysArr[i].year, calendarDaysArr[i].month - 1, calendarDaysArr[i].date);
      //     getMonthDaysCurrent(date);
      //     return;
      //     // 向下
      //   } else if (v.next) {
      //     let date = new Date(calendarDaysArr[i].year, calendarDaysArr[i].month + 1, calendarDaysArr[i].date)
      //     getMonthDaysCurrent(date);
      //     return;
      //   }
      // }
    }
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
    s = s.substring(0, s.indexOf(".") + 3);
    return s.toString();
  }
  const toFixedFnNum = (num: any) => {
    let s = num + '';
    s = s.substring(0, s.indexOf(".") + 3);
    return s+'';
  }
  // 对应月份日期
  const getMonthDaysCurrent = (e, val?: any, ids?: any, typeId?: string, cacheDaysArrList?: string[], change?: boolean, thisKey?:string) => {
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
    console.log(e,'eeeeee');
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
    console.log(year,'year');
    console.log(month,'month')
    // 设置时间
    if(thisKey){
      setTimeDate({ year, monent: month })
      setTime({ year, monent: month })
    }
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
      // 当月
      const toTears = new Date(toDate).getFullYear();
      const toMonths = new Date(toDate).getMonth() + 1;
      const toDates = new Date(toDate).getDate();
      calendarDaysArr.push({
        'year': year,
        'month': addZero(month),
        'date': i,
        'day': new Date(year, month - 1, i).getDay(),
        'current': true,
        'lunarCalendarItem': lunarCalendarItem.lunarDay,
        'selected': i == date, // 判断当前日期
        'stop': years <= year && ((months == month && dates < i) || months < month),
        'isMonth': year == toTears && toMonths == Number(month)
      })
    }
    // 下个月显示的天数及日期
    for (let i = 1; i < 7 - lastDay; i++) {
      let date = new Date(year, month, i)
      const lunarCalendarItem = sloarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
      calendarDaysArr.push({
        'year': date.getFullYear(),
        'month': addZero(date.getMonth() + 1),
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
    // const calendarItem = Taro.getStorageSync(Calendar);
    const cacheDaysArr = JSON.parse(JSON.stringify(cacheDays));
    let List:any[]= [];
    if (changeId != 3){
      if(change){
        List =[];
      }else{
        if (cacheDaysArrList) {
          if (cacheDaysArrList.length>0){
            List = cacheDaysArrList;
          }else{
            // List = [];
            List = cacheDaysArr;
          }
        } else {
          List = cacheDaysArr;
        }
      }
    }
    if (List.length > 0) {
      List.map(v => {
        calendarDaysArr.map(val => {
          if (val.date ==v.date && val.month ==v.month && val.year ==v.year) {
            val.record = true;
          }
          return val;
        })
        return v;
      })
    }
    console.log(calendarDaysArr,'calendarDaysArrcalendarDaysArr')
    setCalendarDays(calendarDaysArr);
    isChange = false;
    return calendarDaysArr;
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
      lm = `闰${lunarMonth[parseFloat(lm) - 1]}`
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
  const bkGetProjectTeam = (groupName?: string, isAgain?: boolean,del?:boolean,edit?:string,id?:string) => {
    bkGetProjectTeamAction({}).then(res => {
      console.log(res,'readsdnasjndsajndjkasn')
      if (res.code === 200) {
        // 如果是工人的话默认选中第一条有数据
        // 多条选中最近一条
        // 工人
        const modalObj = JSON.parse(JSON.stringify(model));
        const identity = Taro.getStorageSync(Type)
        // 工人
        if (identity === 2) {
          console.log('工人创建后')
          if (edit) {
            model.name = edit;
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].click = false;
              if (res.data[i].group_info == id) {
                res.data[i].click = true
              }
            }
            setProjectArr(res.data);
            setModel(model);
            return;
          }
          // 没有数据的时候
          if (res.data.length === 0) {
            // 设置一个工无加班
            // let duration = modalObj.duration;
            const duration = '上班1个工，无加班';
            // 一个工所以为0直接设置
            const data = JSON.parse(JSON.stringify(timeArr));
            data[0].click = true;
            setProjectId(data[0].group_id+','+data[0].id)
            setTimeArr(data);
            // 设置今天
            const years = new Date().getFullYear();
            const months = new Date().getMonth() + 1;
            const dates = new Date().getDate();
            const time = years + '-' + addZero(months) + '-' + addZero(dates);
            const clickDataArr = [{
              year: years,
              month: months,
              date: dates,
              click: true
            }];
            setOpenClickTime(clickDataArr)
            setClickData(clickDataArr);
            setProjectArr(res.data);
            setProjectId('');
            setGroupInfo('')
            generateThreeMonths(new Date(), clickDataArr, '')
            // bkGetWorkerWage()
            const wageStandardData = JSON.parse(JSON.stringify(wageStandard));
            wageStandardData.work = 0;
            wageStandardData.addWork = 0.00;
            wageStandardData.money = 0.00;
            wageStandardData.day = 0;
            wageStandardData.type = 1;
            wageStandardData.dayAddWork = 0.00;
            wageStandardData.data = [
              { id: 1, name: '按小时算', click: true },
              { id: 2, name: '按工天算', click: false },
            ];
            setWageStandard(wageStandardData)
            setCacheWage(wageStandardData)
            //设置工人工资为0
            setModel({ ...modalObj, duration, time, name: '', workersWages: '0.00', details: '' })
            // setModel({ ...model, workersWages: '0' })
            return;
          }
          // 不是创建项目的时候
          if (!model.groupName || del) {
            // 获取类型
            let dataType;
            recorderTypeArr.item.map((v) => {
              if (v.click) {
                dataType = v.id;
              }
            })
            let type = Taro.getStorageSync(Type);
            bkgetLastGroupInfoAction({ identity: type, business_type: dataType }).then(resData => {
              let name;
              // 判断有上一个项目
              if (resData.code === 200 && resData.data.length>0) {
                let item:any[]=[];
                for (let i = 0; i < res.data.length; i++) {
                  // 判断遍历出项目
                  // 判断与上一个项目相同，否则取第一个
                  res.data[i].click = false;
                  if (res.data[i].group_id + ',' + res.data[i].id == resData.data.id){
                    item = [res.data[i]];
                  }
                  console.log(item,'itme')
                  if (item.length > 0) {
                    // for(let j=0;j<item.length;j++){
                    //   item[j].click = false;
                    // }
                    // 设置默认点击
                    item[0].click = true;
                    // 设置groupInfo
                    const groupInfos = item[0].group_id + ',' + item[0].id;
                    setGroupInfo(item[0].group_id + ',' + item[0].id)
                    setProjectId(item[0].group_id + ',' + item[0].id)
                    // 设置名字
                    name = item[0].group_name + '-' + item[0].name;
                    // 设置班组长
                    dispatch(setWorker([item[0]]))
                    setForemanTitle(item[0].leader_name || '');
                    for(let z=0;z<res.data.length;z++){
                      if (res.data[z].group_id + ',' + res.data[z].id == item[0].group_id + ',' + item[0].id){
                        res.data[z] = item[0]
                      }
                    }
                  }
                  const duration = '1个工，无加班';
                  // 一个工所以为0直接设置
                  const data = JSON.parse(JSON.stringify(timeArr));
                  data[0].click = true;
                  setTimeArr(data);
                  // 设置今天
                  const years = new Date().getFullYear();
                  const months = new Date().getMonth() + 1;
                  const dates = new Date().getDate();
                  const time = years + '-' + addZero(months) + '-' + addZero(dates);
                  const clickDataArr = [{
                    year: years,
                    month: months,
                    date: dates,
                    click: true
                  }];
                  setOpenClickTime(clickDataArr)
                  setClickData(clickDataArr);
                  setModel({ ...modalObj, name, duration, time, details: '', workersWages: '0.00' })
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
                      workersWages: '0.00',
                    }
                    modales = obj;
                  } else {
                    modales = { ...modalObj, name, duration, time, details: '', workersWages: '0.00' };
                  }
                  // 设置班组长group_info
                  dispatch(setWorker([res.data[0]]))
                  // 设置工资标准
                  bkGetWorkerWage(res.data[0].group_id + ',' + res.data[0].id, '', modales)
                  // getMonthDaysCurrent(new Date());
                  const id = res.data[0].group_id + ',' + res.data[0].id;
                  generateThreeMonths(new Date(), clickDataArr, id)
                }
                return;
              } else if (resData.code === 200 && resData.data.length  == 0){
                console.log(321321312);
                console.log(edit)
                if (edit){
                  model.name= edit;
                  for(let i =0;i<res.data.length;i++){
                    res.data[i].click = false;
                    if (res.data[i].group_info == id){
                      res.data[i].click = true
                    }
                  }
                  setProjectArr(res.data);
                  setModel(model);
                  return;
                }
                // const m
              } else {
                // 设置默认点击
                res.data[0].click = true;
                // 设置groupInfo
                const groupInfos = res.data[0].group_id + ',' + res.data[0].id;
                setGroupInfo(res.data[0].group_id + ',' + res.data[0].id);
                setProjectId(res.data[0].group_id + ',' + res.data[0].id)
                // 设置名字
                const name = res.data[0].group_name + '-' + res.data[0].name;
                // 设置班组长
                dispatch(setWorker([res.data[0]]))
                setForemanTitle(res.data[0].leader_name || '');
                // 设置一个工无加班
                // let duration = modalObj.duration;
                const duration = '1个工，无加班';
                // 一个工所以为0直接设置
                const data = JSON.parse(JSON.stringify(timeArr));
                data[0].click = true;
                // setProjectId(data[0].group_id + ',' + data[0].id)
                setTimeArr(data);
                // 设置今天
                const years = new Date().getFullYear();
                const months = new Date().getMonth() + 1;
                const dates = new Date().getDate();
                const time = years + '-' + addZero(months) + '-' + addZero(dates);
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
                generateThreeMonths(new Date(), clickDataArr, groupInfos)
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
                    workersWages: '0.00',
                  }
                  modales = obj;
                } else {
                  modales = { ...modalObj, name, duration, time, details: '', workersWages:'0.00' };
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
            console.log(res,'有项目的时候并且回去项目')
            // 设置加班时长默认值
            const timeTitle = '上班1个工，无加班';
            for (let i = 0; i < timeArr.length; i++) {
              timeArr[i].click = false;
              timeArr[0].click = true;
              timeArr[3] = { id: 4, name: '0.0小时', click: false, num: 0 };
            }
            // 无加班
            for (let i = 0; i < addWorkArr.length; i++) {
              addWorkArr[i].click = false;
              addWorkArr[0].click = true;
              addWorkArr[1] = { id: 2, name: '0.0小时', click: false, num: 0 };
            }
            setTimeArr(timeArr);
            setAddWorkArr(addWorkArr);
            console.log(res.data,'获取数据长度')
            if (res.data && res.data.length > 0) {
              const wageStandardData = JSON.parse(JSON.stringify(wageStandard));
              wageStandardData.work = 0;
              wageStandardData.addWork = 0.00;
              wageStandardData.money = 0.00;
              wageStandardData.day = 0;
              wageStandardData.type = 1;
              wageStandardData.dayAddWork = 0.00;
              wageStandardData.data = [
                { id: 1, name: '按小时算', click: true },
                { id: 2, name: '按工天算', click: false },
              ];
              setWageStandard(wageStandardData)
              setCacheWage(wageStandardData)
              for (let i = 0; i < res.data.length; i++) {
                console.log(res.data);
                console.log(groupName,'groupName')
                console.log(res.data[i].group_name,'23123')
                console.log(res.data[i].group_name, '2222')
                if (groupName == res.data[i].group_info) {
                  res.data[i].click = true;
                  // 清空
                  setModel({ ...modalObj, name: res.data[i].group_name + '-' + res.data[i].name, workersWages: '0.00', duration: timeTitle, modalDuration: timeTitle })
                  setForemanTitle('');
                  setProjectArr(res.data);
                  const groupInfos = res.data[i].group_id + ',' + res.data[i].id;
                  generateThreeMonths(new Date(), '', groupInfos);
                  return;
                }
              }
            } else {
              const wageStandardData = JSON.parse(JSON.stringify(wageStandard));
              wageStandardData.work = 0;
              wageStandardData.addWork = 0.00;
              wageStandardData.money = 0.00;
              wageStandardData.day = 0;
              wageStandardData.type = 1;
              wageStandardData.dayAddWork = 0.00;
              wageStandardData.data = [
                { id: 1, name: '按小时算', click: true },
                { id: 2, name: '按工天算', click: false },
              ];
              setWageStandard(wageStandardData)
              setCacheWage(wageStandardData)
              //  清空名字班组长
              setModel({ ...modalObj, name: '', groupName: '', teamName: '', workersWages: '0.00', duration: timeTitle, modalDuration: timeTitle })
              generateThreeMonths(new Date());
              setForemanTitle('')
            }
            setProjectArr(res.data);
          }
        } else {
          // 班组长
          // 判断是修改
          if (edit) {
            model.name = edit;
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].click = false;
              if (res.data[i].group_info == id) {
                res.data[i].click = true
              }
            }
            setProjectArr(res.data);
            setModel(model);
            return;
          }
          // 新增项目的额时候
          if (groupName) {
            console.log('新增')
            console.log(res.data,'获取新增聂荣');
            console.log(groupName,'groupName')
            let id,time;
            for (let i = 0; i < res.data.length; i++) {
              if (groupName == res.data[i].group_info) {
                res.data[i].click = true;
                if (toDay) {
                  setOpenClickTime(toDay)
                  setClickData(toDay)
                  setTimeData(toDay);
                  time = toDay[0].year + '-' + addZero(toDay[0].month) + '-' + addZero(toDay[0].date)+ ` (今天) `;
                }
                // 设置加班时长默认值
                const timeTitle = '上班1个工，无加班';
                for (let i = 0; i < timeArr.length; i++) {
                  timeArr[i].click = false;
                  timeArr[0].click = true;
                  timeArr[3] = { id: 4, name: '0.0小时', click: false, num: 0 };
                }
                // 无加班
                for (let i = 0; i < addWorkArr.length; i++) {
                  addWorkArr[i].click = false;
                  addWorkArr[0].click = true;
                  addWorkArr[1] = { id: 2, name: '0.0小时', click: false, num: 0 };
                }
                setTimeArr(timeArr);
                setAddWorkArr(addWorkArr)
                setModel({ ...modalObj, name: res.data[i].group_name + '-' + res.data[i].name, duration: timeTitle, modalDuration: timeTitle, time });
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
          // 获取类型
          let dataType;
          recorderTypeArr.item.map((v) => {
            if (v.click) {
              dataType = v.id;
            }
          })
          // 获取上一次记录清空
          bkgetLastGroupInfoAction({ identity: type, business_type: dataType }).then(resData => {
            // 判断有上一次的值
            if (resData.code === 200) {
              // 有上一次
              if (resData.data) {
                let name, id;
                // 获取项目下的工人
                let changeData;
                for (let i = 0; i < res.data.length; i++) {
                  // 判断遍历出项目
                  // 判断与上一次相同的时候
                  if (res.data[i].group_id + ',' + res.data[i].id === resData.data) {
                    changeData = res.data[i];
                    // 设置名字
                    // 不相同的时候选择第一个
                  } else {
                    changeData = res.data[0];
                  }
                }
                if (changeData) {
                  const data = JSON.parse(JSON.stringify(model));
                  bkGetWorker(changeData.group_id + ',' + changeData.id, true);
                  // 获取以前设置的内容
                  let dataType;
                  recorderTypeArr.item.map((v) => {
                    if (v.click) {
                      dataType = v.id;
                    }
                  })
                  name = changeData.group_name + '-' + changeData.name;
                  setModel({ ...data, name });
                  changeData.click = true;
                  // 设置groupInfo
                  id = res.data[0].group_id + ',' + res.data[0].id;
                  setGroupInfo(res.data[0].group_id + ',' + res.data[0].id);
                  setProjectId(res.data[0].group_id + ',' + res.data[0].id)
                }
                // 删除后工人设置为空
                // bkGetWorker('',true)
                let midData = Taro.getStorageSync(MidData)
                const objs = JSON.parse(JSON.stringify(obj))
                objs.name = midData.worker_name || '未命名';
                objs.id = midData.worker_id;
                setWorkerItem([objs])
                const data = JSON.parse(JSON.stringify(timeArr));
                const duration = '1个工，无加班'
                data[0].click = true;
                // if(res.data){
                //   setProjectId(res.data[0].group_id + ',' + res.data[0].id)
                // }
                setGroupInfo('');
                setProjectId('');
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
                generateThreeMonths(new Date(), clickDataArr, id)
                return;
              } else {
                const data = JSON.parse(JSON.stringify(timeArr));
                const duration = '1个工，无加班'
                data[0].click = true;
                setProjectId(res.data[0].group_id + ',' + res.data[0].id)
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
                objs.name = midData.worker_name || '未命名';
                objs.id = midData.worker_id;
                setWorkerItem([objs])
                setGroupInfo('')
                setOpenClickTime(clickDataArr)
                setClickData(clickDataArr);
                generateThreeMonths(new Date(), clickDataArr)
                setModel({ ...modalObj, duration, time, name, details: '' })
                // const data = JSON.parse(JSON.stringify(model));
                // setModel({ ...data, name });
                // bkGetWorker(res.data[0].group_id + ',' + res.data[0].id, true);
                // res.data[0].click = true;
                // 设置groupInfo
                // const groupInfos = res.data[0].group_id + ',' + res.data[0].id;
                // setGroupInfo(res.data[0].group_id + ',' + res.data[0].id)
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
  const bkGetWorkerWage = (id?: string, Item?: any, models?: any,name?:string) => {
    console.log(models,'modelsmodelsmodels')
    // 获取类型
    let dataType;
    recorderTypeArr.item.map((v) => {
      if (v.click) {
        dataType = v.id;
      }
    })
    let prams;
    if (id) {
      prams = {
        group_info: id,
        business_type: dataType,
      }
    } else {
      prams = {
        group_info: groupInfo,
        business_type: dataType,
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
            console.log(111111)
            console.log(Item,'itme');
            console.log(res.data,'res.data');
            if(res.data.length>0){
              // setNoset(false)
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
                    // setNoset(false)
                  }else {
                    // setNoset(true)
                  }
                }
              }
              console.log(Item,'ITEM')
            let noSet:boolean= true;
              for(let i =0;i<Item.length;i++){
                if (!Item[i].set) {
                  noSet = false
                } 
                // else {
                //   setNoset(true)
                // }
              }
              setNoset(noSet);
            }else{
              setNoset(false)
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
          // 获取缓存日历
          const years = new Date().getFullYear();
          const months = new Date().getMonth() + 1;
          const dates = new Date().getDate();
          const clickDataArr = [{
            year: years,
            month: months,
            date: dates,
            click: true
          }];
          const showTime = years + '-' + addZero(months) + '-' + addZero(dates) + ` (今天) `;
          setOpenClickTime(clickDataArr)
          setClickData(clickDataArr);
          setTimeData([clickDataArr]);
          setToday([clickDataArr])
          // 设置加班时长默认值
          const timeTitle = '上班1个工，无加班';
          // 一个工
          for (let i = 0; i < timeArr.length; i++) {
            timeArr[i].click = false;
            timeArr[0].click = true;
            timeArr[3] = { id: 4, name: '0.0小时', click: false, num: 0 };
          }
          // 无加班
          for (let i = 0; i < addWorkArr.length; i++) {
            addWorkArr[i].click = false;
            addWorkArr[0].click = true;
            addWorkArr[1] = { id: 2, name: '0.0小时', click: false, num: 0 };
          }
          setTimeArr(timeArr);
          setAddWorkArr(addWorkArr)
          // 设置单位
          for (let i = 0; i < company.length; i++) {
            company[i].click = false
            company[0].click = true
          }
          setCompany(company);
          // 默认平方米
          setUnit('平方米')
          // 借支状态
          for (let i = 0; i < borrowing.item.length; i++) {
            borrowing.item[i].click = false
          }
          setBorrowing(borrowing);
          const time = years + '-' + addZero(months) + '-' + dates;
          setToDayString(time)
          let timeParams = {
            group_info: prams.group_info,
            business_type: prams.business_type,
            date: time,
          }
          console.log(groupInfo,'groupInfo')
          console.log('冲冲次')
          // setModel({ ...model, duration: timeTitle, modalDuration: timeTitle, time: showTime, details: '', amount: '', price: '', wages: '', borrowing: '', univalent: '' })
          let cacheDaysArr: any[] = [];
          getWorkerHasBusinessByDateAction(timeParams).then(resItem=>{
            console.log(resItem.data,'resItem')
            if (resItem.code === 200){
              if (resItem.data){
                if (resItem.data.days && resItem.data.days.length > 0) {
                  let dateItem: any[] = [];
                  for (let z = 0; z < resItem.data.days.length; z++) {
                    let dayObj = {
                      date: resItem.data.days[z].split('-')[2],
                      month: resItem.data.days[z].split('-')[1],
                      year: resItem.data.days[z].split('-')[0],
                    }
                    dateItem.push(dayObj);
                  }
                  setcacheDays(dateItem);
                  cacheDaysArr = dateItem;
                } else {
                  setcacheDays([]);
                  cacheDaysArr = [];
                }
              }
            }
          })
          console.log(1111)
          console.log(name,'title')
          generateThreeMonths(new Date(), clickDataArr, groupInfo, id, cacheDaysArr);
          const wageStandardData = JSON.parse(JSON.stringify(wageStandard));
          if (res.data.length > 0) {
            const data = res.data[0];
            wageStandardData.work = data.worktime_define;
            wageStandardData.addWork = data.overtime_money;
            wageStandardData.money = data.money;
            wageStandardData.day = data.overtime;
            wageStandardData.worker_id = data.worker_id;
            wageStandardData.group_info = data.group_info;
            for (let i = 0; i < wageStandardData.data.length; i++) {
              if (wageStandardData.data[i].id == data.overtime_type) {
                wageStandardData.data[i].click = true
              } else {
                wageStandardData.data[i].click = false
              }
            }
            if (parseFloat(data.money) && parseFloat(data.overtime)) {
              wageStandardData.dayAddWork = toFixedFn(parseFloat(data.money) / parseFloat(data.overtime) || 0);
            } else {
              wageStandardData.dayAddWork = 0.00
            }
            wageStandardData.type = parseFloat(data.overtime_type);
            // 工钱
            // 一个工无加班
            const sum = data.money;
            const obj = JSON.parse(JSON.stringify(model));
            // model.workersWages = sum;
            if (models) {
              // models.workersWages = toFixedFn(sum);
              // setModel(models)
              const sums = sum;
              let title;
              if (name){
                title = name;
              }
              setModel({ ...model, name: title, duration: timeTitle, workersWages: sums, modalDuration: timeTitle, time: showTime, details: '', amount: '', price: '', wages: '', borrowing: '', univalent: '' })
            }
            // setModel(obj)
            setWageStandard(wageStandardData)
            setCacheWage(wageStandardData)
          } else {
            const dataList= [
              { id: 1, name: '按小时算', click: true },
              { id: 2, name: '按工天算', click: false },
            ];
            wageStandardData.data =dataList;
            wageStandardData.work = 0;
            wageStandardData.addWork = 0.00;
            wageStandardData.money = 0.00;
            wageStandardData.day = 0;
            wageStandardData.type = 1;
            wageStandardData.dayAddWork = 0.00;
            setWageStandard(wageStandardData)
            setCacheWage(wageStandardData)
            //设置工人工资为0
            if (models) {
              let title;
              if (name) {
                title = name;
              }
              // setModel({ ...models, workersWages: '0.00' })
              setModel({ ...models,name:title, duration: timeTitle, workersWages: '0.00', modalDuration: timeTitle, time: showTime, details: '', amount: '', price: '', wages: '', borrowing: '', univalent: '' })
            } else {
              let title;
              if (name) {
                title = name;
              }
              // const item = JSON.parse(JSON.stringify(model));
              // item.workersWages = '0.00';
              // setModel(item)
              setModel({ ...model,name:title, duration: timeTitle, workersWages: '0.00', modalDuration: timeTitle, time: showTime, details: '', amount: '', price: '', wages: '', borrowing: '', univalent: '' })
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
  const bkGetWorker = (groupInfos?: any, val?: any, dataItem?: any, id?: string, TabberType?: number) => {
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
          if(groupInfos){
            arr = res.data;
            // for (let j = 0; j < res.data[i].length; j++) {
            //   // 判断有worktime_define和money就是设置了工资标准
            //   // if (res.data[i].list[j].worktime_define && res.data[i].list[j].money){
            //   //   res.data[i].list[j].set = true;
            //   // }
            //   arr.push(res.data[i]);
            // }
          }else{
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
            console.log('气死了')
            // const objs = JSON.parse(JSON.stringify(obj));
            let midData = Taro.getStorageSync(MidData)
            let objs: any = {};
            objs.name = midData.worker_name || '未命名';
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
            if (TabberType) {
              dataType = TabberType;
            } else if (id) {
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
            // 设置今天
            const years = new Date().getFullYear();
            const months = new Date().getMonth() + 1;
            const dates = new Date().getDate();
            const time = years + '-' + addZero(months) + '-' + addZero(dates);
            // 设置蓝色底色
            let ArrList = [objs, ...arr];
            let cacheDaysArr:any[] = [];
            // let change = false;
            if (type === 1) {
              let dateParams = {
                group_info: groupInfos,
                business_type: dataType,
                date: time,
              }
              console.log('走这里了')
              getWorkerHasBusinessByDateAction(dateParams).then(dateRes => {
                if (dateRes.code == 200) {
                  setCache(dateRes.data.worker||[])
                  dispatch(setColor(dateRes.data.worker || []));
                  if (dateRes.data) {
                    // 判断记录过
                    // 时间
                    console.log(dateRes.data,'dataaaa');
                    if (dateRes.data.days && dateRes.data.days.length > 0) {
                      console.log(3213123123213)
                      let dateItem:any[]=[];
                      for (let z = 0; z < dateRes.data.days.length; z++) {
                        let dayObj = {
                          date: dateRes.data.days[z].split('-')[2],
                          month: dateRes.data.days[z].split('-')[1],
                          year: dateRes.data.days[z].split('-')[0],
                        }
                        dateItem.push(dayObj);
                      }
                      setcacheDays(dateItem);
                      cacheDaysArr = dateItem;
                      const clickDataArr = [{
                        year: years,
                        month: months,
                        date: dates,
                        click: true
                      }];
                      setOpenClickTime(clickDataArr)
                      setClickData(clickDataArr);
                      generateThreeMonths(new Date(), clickDataArr, groupInfos, id, cacheDaysArr );
                    }else{
                      // console.log('没有数据啊啊啊啊 ')
                      setcacheDays([]);
                      // cacheDaysArr = [];
                      // isChange = true;
                      // console.log(isChange,'changechangechange')
                      // console.log(cacheDaysArr,'cacheDaysArrcacheDaysArr')
                      const clickDataArr = [{
                        year: years,
                        month: months,
                        date: dates,
                        click: true
                      }];
                      setOpenClickTime(clickDataArr)
                      setClickData(clickDataArr);
                      generateThreeMonths(new Date(), clickDataArr, groupInfos, id, [], true);
                    }
                    // 工人
                    if (dateRes.data.worker && dateRes.data.worker.length > 0) {
                      // setcacheWorker(dateRes.data.worker);
                      ArrList.map(v => {
                        dateRes.data.worker.map(val => {
                          if (val == v.id) {
                            v.discipline = true;
                          }
                          return val;
                        })
                        return v;
                      })
                    }
                  }
                } else {
                  Msg(dateRes.msg);
                  return;
                }
              })
            }
            setGroupInfo(groupInfos)
            dispatch(setPhoneList(ArrList));
            dispatch(setWorker(ArrList))
            bkGetWorkerWage(groupInfos, ArrList);
            console.log('aaaa')
            if(dataItem){
              model.name = dataItem;
              // 设置工资标准和日期
              // 设置加班时长默认值
              const timeTitle = '上班1个工，无加班';
              // 一个工
              for (let i = 0; i < timeArr.length; i++) {
                timeArr[i].click = false;
                timeArr[0].click = true;
                timeArr[3] = { id: 4, name: '0.0小时', click: false, num: 0 };
                setClickDay(timeArr[0])
              }
              // 无加班
              for (let i = 0; i < addWorkArr.length; i++) {
                addWorkArr[i].click = false;
                addWorkArr[0].click = true;
                addWorkArr[1] = { id: 2, name: '0.0小时', click: false, num: 0 };
                setClickTime(addWorkArr[0])
              }
              setTimeArr(timeArr);
              setAddWorkArr(addWorkArr);
              // 设置单位
              for (let i = 0; i < company.length; i++) {
                company[i].click = false
                company[0].click = true
              }
              setCompany(company);
              // 默认平方米
              setUnit('平方米')
              // 借支状态
              for (let i = 0; i < borrowing.item.length; i++) {
                borrowing.item[i].click = false
              }
              setBorrowing(borrowing);
              model.duration= timeTitle; 
              model.modalDuration= timeTitle;
              let today;
              if (toDayString) {
                today = toDayString;
              } else {
                today = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDay();
              }
              // 设置日历
              let dayObj = {
                date: today.split('-')[2],
                month: today.split('-')[1],
                year: today.split('-')[0],
                click: true
              }
              model.time = today + `（今天）`;
              setOpenClickTime([dayObj])
              setClickData([dayObj])
              setTimeData([dayObj]);
              setToday([dayObj])
              setToDayString(today)
              setModel(model)
            }
            // const clickDataArr = [{
            //   year: years,
            //   month: months,
            //   date: dates,
            //   click: true
            // }];
            // setOpenClickTime(clickDataArr)
            // setClickData(clickDataArr);
            // console.log(isChange,'change')
            // getMonthDaysCurrent(new Date(), clickDataArr, groupInfos, id, cacheDaysArr, isChange);
            return;
          }
        }
        console.log(res.data,'全部工人')
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
  const dealInputVal =(value,num?:number,type?:string)=> {
    value = value.replace(/^0*(0\.|[1-9])/, "$1");
    value = value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    value = value.replace(/^\./g, ""); //验证第一个字符是数字而不是字符
    value = value.replace(/\.{1,}/g, "."); //只保留第一个.清除多余的
    if(num){
      if (value.split(".")[1] && value.split(".")[1].length>2){
        Msg('超出最大输入范围')
      }
      if (value.split(".")[0] && value.split(".")[0].length>num){
        Msg('超出最大输入范围')
      }
    }
    value = value
      .replace(".", "$#$")
      .replace(/\./g, "")
      .replace("$#$", ".");
    value = value.replace(/^(\-)*(\d*)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
    value =
      value.indexOf(".") > 0
        ? value.split(".")[0].substring(0, num) + "." + value.split(".")[1]
        : value.substring(0, num);
    let data = JSON.parse(JSON.stringify(model));
    let item = JSON.parse(JSON.stringify(wageStandard));
    if(type){
      if (type === 'day' || type === 'work' || type === 'money' || type === 'addWork' ){
        if (!value) {
          value = 0;
        }
        if (type === 'money' || type ==='addWork'){
          if (value > 9999.99) {
            Msg('超出最大输入范围');
            value = 9999.99;
          }
          if (type === 'money'){
            let dayAddWork;
            if (item.day == 0) {
              dayAddWork = 0.00
            }else{
              dayAddWork = value / item.day || 0.00;
            }
            item.dayAddWork = toFixedFn(dayAddWork);
          }
        }else{
          if(value>24){
            Msg('超出最大输入范围');
            value = 24;
          }
          if(type == 'day'){
            let num: number | string = 0.00;
            if (item.money > 0 && value > 0) {
              num = item.money / value
            }
            item.dayAddWork = (toFixedFn(num));
          }
        }
        // if (type == 'money' || type == 'addWork'){
        //   // item[type] = toFixedFn(value);
        //   setWageStandard(item);
        //   return;
        // }
        item[type] = value;
        setWageStandard(item);
      }else{
        data[type] = value;
        setModel(data);
      }
    }
    return value;
  }
  // 输入框
  const handleInput = (type: string, e) => {
    // if (/^[\u4e00-\u9fa5_a-zA-Z0-9\s\·\~\！\@\#\￥\%\……\&\*\（\）\——\-\+\=\【\】\{\}\、\|\；\‘\’\：\“\”\《\》\？\，\。\、\`\~\!\#\$\%\^\&\*\(\)\_\[\]{\}\\\|\;\'\'\:\"\"\,\.\/\<\>\?]+$/.test(e.detail.value)){
    let data = JSON.parse(JSON.stringify(model));
    if (type === 'details') {
      setNum(e.detail.value.length);
    }
    if(type =='amount'|| type =='price'){
      return dealInputVal(e.detail.value, 7, type);
    }
    if (type == 'wages' || type == 'borrowing'){
      return dealInputVal(e.detail.value, 14,type);
    }
    console.log(e,'eeeeee')
    if (type == 'groupName' || type == 'teamName' || type == 'userName' || type == 'team_name' || type == 'group_name'){
      const regExp = /^[\u4e00-\u9fa5_a-zA-Z0-9\s\·\~\！\@\#\￥\%\……\&\*\（\）\——\-\+\=\【\】\{\}\、\|\；\‘\’\：\“\”\《\》\？\，\。\、\`\~\!\#\$\%\^\&\*\(\)\_\[\]{\}\\\|\;\'\'\:\"\"\,\.\/\<\>\?]+$/;
      if (regExp.test(e.detail.value)){
        data[type] = e.detail.value
        setModel({ ...data });
        return
      }else{
        data[type] = '';
        setModel({ ...data });
        return ''
      }
    }
    data[type] = e.detail.value
    setModel({...data});
    // }
    // else{
    //   Msg('请输入正确内容')
    //   return
    // }
  }
  // 多选框
  const blurhandleContent = (type: string,e) => {
    let data = JSON.parse(JSON.stringify(model));
    data.note = e.detail.value;
    setNum(e.detail.value.length);
    data[type] = e.detail.value
    setModel({...data});
  }
  // 创建项目
  const handleAddProject = () => {
    // console.log(isHandleAdd)
    if(!isHandleAdd) return
    if (!model.teamName) {
      Msg('您还没有填写班组名称');
      return;
    }
    setDel(false)
    setDeldelType(false)
    let type = Taro.getStorageSync(Type);
    const group = model.groupName.replace(/^\s*|\s*$/g, "");
    const team = model.teamName.replace(/^\s*|\s*$/g, "");
    let params = {
      group_name: group,
      team_name: team,
    }
    isHandleAdd = false
    bkAddProjectTeamAction(params).then(res => {
      if (res.code === 200) {
        console.log(res.data,'reasadasdasd')
        if(toDay){
          setOpenClickTime(toDay)
          setClickData(toDay)
          setTimeData(toDay);
        }
        // 设置加班时长默认值
        const timeTitle = '上班1个工，无加班';
        // 修改工资标准
        if (type === 2) {
          bkGetWorkerWage(res.data)
        }
        setIds(res.data);
        setLeader_id('');
        const name = (model.groupName).replace(/^\s*|\s*$/g, "") + '-' + (model.teamName).replace(/^\s*|\s*$/g, "");
        bkGetProjectTeam(res.data);
        setGroupInfo(res.data)
        setProjectId(res.data)
        setTimeout(()=>{
          isHandleAdd = true;
        },500)
      } else {
        isHandleAdd = true;
        Msg(res.msg);
        setTimeout(() => {
          isHandleAdd = true;
        }, 500)
        return;
      }
      setTimeout(() => {
        isHandleAdd = true;
      }, 500)
      setTimeout(() => {
        setIsdisable(false)
      });
      setProject(false);
      // let data = JSON.parse(JSON.stringify(model));
      // data.name = model.groupName;
      // setGroupInfo(res.data)
      // setModel({...data, groupName: '', teamName: ''})
    })
  }
  // 选择加班时长
  // const handleworkOvertime = (type: number, val: any) => {
  //   const data = JSON.parse(JSON.stringify(model));
  //   setTimeType(type)
  //   if (type === 1) {
  //     let arr;
  //     if (val.id === 4) {
  //       arr = timeArr.map(v => {
  //         if (v.id === val.id) {
  //           v.click = !v.click;
  //         } else {
  //           v.click = false
  //         }
  //         return v;
  //       })
  //       setTimeArr(arr)
  //       setWorkOvertimeDisplay(false)
  //       setWorkingHoursDisplay(true);
  //       // return;
  //     } else {
  //       arr = timeArr.map(v => {
  //         if (v.id === val.id) {
  //           v.click = !v.click;
  //         } else {
  //           if (v.id === 4) {
  //             v.name = '0.0小时';
  //           }
  //           v.click = false
  //         }
  //         return v;
  //       })
  //       setTimeArr(arr)
  //     }
  //     let addTime;
  //     for (let i = 0; i < addWorkArr.length; i++) {
  //       if (addWorkArr[i].click) {
  //         if (addWorkArr[i].id !== 1) {
  //           addTime = '加班' + addWorkArr[i].name
  //         } else {
  //           addTime = '无加班'
  //         }
  //       } else {
  //         addTime = '无加班'
  //       }
  //     }
  //     let duration;
  //     if (val.id == 3) {
  //       duration = val.name + addTime;
  //     } else {
  //       duration = '上班' + val.name + addTime;
  //     }
  //     if (val.id != 4) {
  //       setModel({ ...data, duration })
  //     }
  //   } else {
  //     //加班时长
  //     let arr;
  //     if (val.id != 2) {
  //       arr = addWorkArr.map(v => {
  //         if (v.id === val.id) {
  //           v.click = !v.click
  //         } else {
  //           if (v.id === 2) {
  //             v.name = '0.0小时';
  //           }
  //           v.click = false
  //         }
  //         return v;
  //       })
  //       setAddWorkArr(arr);
  //     } else {
  //       arr = addWorkArr.map(v => {
  //         if (v.id === val.id) {
  //           v.click = !v.click;
  //         } else {
  //           v.click = false
  //         }
  //         return v;
  //       })
  //       setAddWorkArr(arr)
  //       setWorkOvertimeDisplay(false)
  //       setWorkingHoursDisplay(true);
  //       return;
  //     }
  //     let Time;
  //     for (let i = 0; i < timeArr.length; i++) {
  //       if (timeArr[i].click) {
  //         if (timeArr[i].id == 3) {
  //           Time = '休息'
  //         } else {
  //           Time = '上班' + timeArr[i].name
  //         }
  //         break;
  //       } else {
  //         Time = '休息'
  //       }
  //     }
  //     let duration;
  //     if (val.id == 1) {
  //       duration = Time + '无加班';
  //     } else {
  //       duration = '上班' + Time + val.name;
  //     }
  //     if (val.id != 2) {
  //       setModel({ ...data, duration })
  //     }
  //   }
  // }
  const handleworkOvertime = (type: number, e: any) => {
    setTimeType(type)
    if (type === 1) {
      if (e.id === 4) {
        setIsdisable(true)
        setWorkOvertimeDisplay(false)
        setWorkingHoursDisplay(true);
        return;
      } else {
        let titlework = '';
        const arr = timeArr.map(v => {
          if (v.id === e.id) {
            v.click = !v.click;
            if (!v.click) {
              for (let i = 0; i < addWorkArr.length; i++) {
                if (addWorkArr[i].click) {
                  if (addWorkArr[i].id !== 1) {
                    titlework = '加班' + addWorkArr[i].name
                  } else {
                    titlework = '无加班'
                  }
                }
              }
            }
          } else {
            if (v.id === 4) {
              v.name = '0.0小时';
            }
            v.click = false
          }
          return v;
        })
        setTimeArr(arr);
        if (titlework) {
          setModel({ ...model, modalDuration: titlework })
          return;
        }
      }
      let addTime = '';
      for (let i = 0; i < addWorkArr.length; i++) {
        if (addWorkArr[i].click) {
          if (addWorkArr[i].id !== 1) {
            addTime = '，加班' + addWorkArr[i].name
          } else {
            addTime = '，无加班'
          }
        }
      }
      let duration;
      if (e.click) {
        if (e.id == 3) {
          duration = e.name + addTime;
        } else {
          duration = '上班' + e.name + addTime;
        }
      }
      if (e.id != 4) {
        setModel({ ...model, modalDuration: duration })
      }
    } else {
      if (e.id != 2) {
        let addworkTitle = '';
        const arr = addWorkArr.map(v => {
          if (v.id === e.id) {
            v.click = !v.click;
            if (!v.click) {
              for (let i = 0; i < timeArr.length; i++) {
                if (timeArr[i].click) {
                  if (timeArr[i].id == 3) {
                    addworkTitle = '休息'
                  } else {
                    addworkTitle = '上班' + timeArr[i].name
                  }
                  break;
                }
              }
            }
          } else {
            if (v.id === 2) {
              v.name = '0.0小时';
            }
            v.click = false
          }
          return v;
        })
        setAddWorkArr(arr);
        if (addworkTitle) {
          setModel({ ...model, modalDuration: addworkTitle })
          return;
        }
      } else {
        setIsdisable(true)
        setWorkOvertimeDisplay(false)
        setWorkingHoursDisplay(true);
        return;
      }
      let Time = '';
      for (let i = 0; i < timeArr.length; i++) {
        if (timeArr[i].click) {
          if (timeArr[i].id == 3) {
            Time = '休息，'
          } else {
            Time = '上班' + timeArr[i].name + '，'
          }
          break;
        }
      }
      let duration = '';
      if (e.click) {
        duration = Time + e.name;
      }
      // if (e.id == 1) {
      //   duration = Time + '，无加班';
      // } else {

      // }
      if (e.id != 2) {
        setModel({ ...model, modalDuration: duration })
      }
    }
  }
  // 加班时长弹框选择
  const handleWorkingHours = (type: number, e: any) => {
    if (type === 1) {
      const data = timeArr.map((v) => {
        if (v.id === 4) {
          v.name = e.name;
          v.click = true;
          v.num = e.num
        } else {
          v.click = false;
        }
        return v;
      })
      setTimeArr(data);
      let addTime;
      for (let i = 0; i < addWorkArr.length; i++) {
        if (addWorkArr[i].click) {
          if (addWorkArr[i].id !== 1) {
            addTime = '，加班' + addWorkArr[i].name
          } else {
            addTime = '，无加班'
          }
        } else {
          addTime = '，无加班'
        }
      }
      let duration;
      duration = '上班' + e.name + addTime;
      setModel({ ...model, modalDuration: duration })
    } else {
      const data = addWorkArr.map((v) => {
        if (v.id === 2) {
          v.name = e.name;
          v.click = true;
          v.num = e.num
        } else {
          v.click = false;
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
      duration = Time + '，加班' + e.name;
      setModel({ ...model, modalDuration: duration })
    }
    setWorkingHoursDisplay(false);
    setWorkOvertimeDisplay(true);
    setIsdisable(true)
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
          title = data[0].name + '，' + dataList[0].name
        } else {
          if (data[0].name == '休息') {
            title = data[0].name + '，加班' + dataList[0].name
          } else if (dataList[0].name == '无加班') {
            title = '上班' + data[0].name + '，' + dataList[0].name;
          } else {
            title = '上班' + data[0].name + '，加班' + dataList[0].name
          }
        }
      }
    }
      const dataArrList = JSON.parse(JSON.stringify(wageStandard));
      // 获取上班时长
      const timeArrs = JSON.parse(JSON.stringify(timeArr));
      // 获取加班时长
      const addWorkArrs = JSON.parse(JSON.stringify(addWorkArr));
      //模板金额 
      const moneyNum = dataArrList.money;
      // 模板时间
      const workNum = dataArrList.work;
      //加班金钱
      const addWorkNum = dataArrList.addWork;
      // 加班时间
      const dayNum = dataArrList.day;
      // 上班时间
      let time = 0;
      for (let i = 0; i < timeArrs.length; i++) {
        if (timeArrs[i].click) {
          setClickDay(timeArrs[i])
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
          setClickTime(addWorkArrs[i])
          addTime = addWorkArrs[i].num
        }
      }
    if (identity === 2) {
      let total:any='0.00';
      if (dataArrList.type === 1) {
        // 按小时算 加班小时* 模板加班金额
        if (moneyNum){
          total = toFixedFn((moneyNum / workNum) * (time * workNum) + addWorkNum * addTime);
        }
        // total = (moneyNum / workNum) * time + addWorkNum * addTime;
      } else {
        // 按天算 每个工多少钱/模板定义的多少小时算一个工 * 加班时长
        // total = moneyNum / workNum * time + (moneyNum / dayNum * addTime);
        if (moneyNum){
          total = toFixedFn(moneyNum / workNum * (time * workNum) + (moneyNum / dayNum * addTime));
        }
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
      let num = isNaN(total) ? '0.00' : total.toString();
      setModel({ ...model, workersWages: num, duration: title });
      setWorkOvertimeDisplay(false);
      setTimeout(() => {
        setIsdisable(false)
      });
      return;
    }
    
    setModel({ ...model, duration: title })
    setWorkOvertimeDisplay(false);
    setTimeout(() => {
      setIsdisable(false)
    });
  }
  // 选择单位
  const handleQuantities = (val) => {
    const arr = company.map((v) => {
      if (v.id === val.id) {
        v.click = !v.click
        if (v.click) {
          setUnit(v.name)
          setQuantitiesDisplay(false)
          setTimeout(() => {
            setIsdisable(false)
          });
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
    if (!isHandleAdd) return;
    isHandleAdd = false
    const data = JSON.parse(JSON.stringify(model))
    if (!model.userName) {
      let type = Taro.getStorageSync(Type);
      if (type == 1) {
        Msg('您还没有填写工人名称')
      } else {
        Msg('您还没有填写班组长名称')
      }
      isHandleAdd = true
      return
    }
    if (model.phone) {
      if (!isPhone(model.phone)) {
        Msg('请输入正确的手机号')
        isHandleAdd = true
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
        setTimeout(()=>{
        isHandleAdd = true;
        },500)
      } else {
        Msg(res.msg)
        setTimeout(() => {
          isHandleAdd = true;
        }, 500)
      }
      setTimeout(() => {
        isHandleAdd = true;
      }, 500)
    })
  }
  // 点击删除
  const handleDel = (type: number) => {
    const data = JSON.parse(JSON.stringify(workerItem));
    if (type === 0) {
      setDel(true);
      const arr = data.map(v => {
        if (v.id != 1) {
          v.del = true;
        }
        return v;
      })
      setWorkerItem(arr);
      setDeldelType(true)
    } else {
      setDel(false);
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
      // title: '温馨提示',
      content: '删除工人后，工人将不在此项目中，但他之前的记工数据不会受影响。确定要删除吗？',
      showCancel: true,
      confirmColor: '#0099FF',
      cancelColor: '#797979',
      success: ((res) => {
        if (res.confirm == true) {
          let params = {
            ids: v.id,
            group_info: groupInfo
          }
          bkDeleteRroupWorkerAction(params).then(res => {
            if (res.code === 200) {
              const data = JSON.parse(JSON.stringify(workerItem));
              const moneyListArr = JSON.parse(JSON.stringify(moneyList));
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
              for (let i = 0; i < moneyListArr.length;i++){
                if (moneyListArr[i].worker_id == v.id){
                  moneyListArr.splice(i,1)
                }
              }
              let noSet: boolean = true;
              for(let i = 0;i<data.length;i++){
                if (!data[i].set) {
                  noSet = false
                } 
              }
              setNoset(noSet);
              setMoneyList(moneyListArr)
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
    const obj ={
      data: [
        { id: 1, name: '按小时算', click: true },
        { id: 2, name: '按工天算', click: false },
      ],
      // 上班模板
      work: 0,
      // 上班金额
      money: 0.00,
      // 加班钱（小时）
      addWork: 0.00,
      // 小时/天
      type: 1,
      // 加班多少小时算一台呢
      day: 0,
      // 自动换算加班多少每小时多少钱
      dayAddWork: 0.00,
      state: '',
      group_info: '',
      id: '',
      worker_id: '',
    }
    setWageStandard(obj)
    setWagesModalDisplay(false);
    setWageStandardDisplay(true);
  }
  // 打开工资标准
  const handleOpenWagesModal = (v?: any) => {
    if (delType) return;
    setCheckAll(false)
    // 借支和按量长按没用
    if (recorderType === 3 || (recorderType == 2 && contractor == 1)) return;
    const item = JSON.parse(JSON.stringify(model));
    if (!item.name) {
      Msg('请先选择项目')
      return
    }
    bkWageStandGetWageAction({}).then(res=>{
      if(res.code === 200){
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
    setIsdisable(true);
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
    // const cacheItem = JSON.parse(JSON.stringify(cacheWage));
    if (type == 'day' || type === 'work') {
      if (e.detail.value>24){
        Msg('超出最大输入范围')
      }
      return dealInputVal(e.detail.value, 2, type);
    }
    if (type === 'money' || type === 'addWork') {
      if (e.detail.value > 9999.99){
        Msg('超出最大输入范围')
      }
      return dealInputVal(e.detail.value, 4, type);
    }
    const data = JSON.parse(JSON.stringify(wageStandard));
    data[type] = toFixedFn(e);
    setWageStandard(data);
  }
  // 保存
  const handlePreservation = (type: number) => {
    if (!isHandleAdd) return;
    // 获取工资标准
    const item = JSON.parse(JSON.stringify(model));
    const workerItemArr = JSON.parse(JSON.stringify(workerItem));
    const types = Taro.getStorageSync(Type);
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
    // 按量
    let itemType;
    for (let i = 0; i < contractorArr.item.length; i++) {
      if (contractorArr.item[i].click) {
        itemType = contractorArr.item[i].id;
      }
    }
    // 时间
    let times: number = 0, work_time_hour = 0, work_time_type;
    const data = JSON.parse(JSON.stringify(wageStandard));
    timeArr.map(v => {
      if (v.click) {
        if (v.num || v.num == 0) {
          if (v.id !== 4) {
            times = v.num;
              work_time_hour = data.work * v.num;
              work_time_type = 'working_hour';
            } else {
              work_time_hour = 1 / data.work * v.num;
              times = v.num;
              work_time_type = 'hour'
            }
          }
        }else{
          work_time_type = 'working_hour';
        }
      })
      if (types === 2 && (tabData.id != 3 && (tabData.id == 2 && itemType == 0))) {
        if (data.work == 0) {
          Msg('您还没有设置工资标准')
          return;
        }
      }
    // 获取ID
    let workers: number[] = [];
    if (identity == 1) {
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
    if (identity == 2) {
      // workers = 
      const midData = Taro.getStorageSync(MidData);
      workers = midData.worker_id;
    }
    // 图片
    let img_url: string[] = image.item.map(item => item.url);
    // 记工
    let params: any = {};
    if (tabData.id == 1) {
      if (identity == 2) {
        const data = JSON.parse(JSON.stringify(wageStandard));
        if (!data.work || data.work == 0) {
          // Msg('您还没有设置工资标准');
          // return;
        }
      }
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
        work_time_type,
      }
    } else if (tabData.id == 2) {
      // 按量
      if (itemType === 1) {
        console.log(item,'1111');
        console.log(item.wages,item.unit_price,item.amount,'aaaaaa')
        // if (!item.wages || !item.price || !item.amount){
        //   Msg('您还没有填写工程量、单价或工钱');
        //   return;
        // }
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
          work_time_type,
        }
      } else {
        if (identity == 2){
          const data = JSON.parse(JSON.stringify(wageStandard));
          if (!data.work || data.work == 0) {
            // Msg('您还没有设置工资标准');
            // return;
          }
        }
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
          work_time_type,
        }
      }
    } else if (tabData.id === 3) {
      // 借支没钱不能保存
      // if (!item.borrowing) {
      //   Msg('您还没有填写借支')
      //   return;
      // }
      console.log(item.borrowing,'item.borrowingitem.borrowing')
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
        work_time_hour,
        work_time_type,
      }
    }
    console.log(params,'params')
    // 工人的时候要先设置工资标准
    const foremanTitles = JSON.parse(JSON.stringify(foremanTitle))
    // 记工(包工按量)
    // 工人记工的时候，没有选择项目名称，为他默认一个
    if (projectArr.length === 0){
      params.group_info = '';
    }
    isHandleAdd = false
    if (identity == 2) {
        // 没有项目&&记工和包工点工的时候需要传
      console.log(projectArr.length,'projectArr.length');
      console.log(tabData.id,'tabData.id')
      console.log(wageStandard,'wageStandard')
      console.log(itemType,'itemType')
      if (projectArr.length === 0 && (tabData.id == 1 || (tabData.id == 2 && itemType == 0))) {
        console.log(3213213)
          const wageStandardData = JSON.parse(JSON.stringify(wageStandard));
          params.wage_worktime_define = wageStandardData.work;
          params.wage_overtime_type = wageStandardData.type;
          params.wage_overtime = wageStandardData.day;
          params.overtime_money = wageStandardData.addWork;
          params.wage_money = wageStandardData.money;
          params.group_info = '';
        }
        // 班组长id
        // const item = useSelectorItem.workerList;
        // 判断选择班组长有数据给后台传班组长
        console.log(foreman,'item')
      // if (foreman.length > 0) {
      //     const group_leader = foreman[0].group_leader;
      //     params.group_leader = group_leader;
      //   }else{
          if(leader_id){
            params.group_leader = leader_id;
          }else{
            params.group_leader =''
          }
        // }
      console.log(params,'params')
        addNewBusinessAction(params).then(resData => {
          if (resData.code === 200) {
            // 再记一笔
            if (type == 1) {
              // 再记录一笔的话需要清除内容
              // 清空备注和图片
              Msg('保存成功')
              setTimeout(() => {
                // dispatch(setWorker([]))
                // setImage({ item: [] });
                // bkGetProjectTeam('', true);
                setImage({ item: [] });
                // bkGetProjectTeam('', true);
                setProjectId('');
                setGroupInfo('');
                // 清空通讯录的reducer
                dispatch(setPhoneList([]));
                dispatch(setWorker([]));
                // 全选为0
                setClickNum(0);
                setAllClick(false)
                // 重新请求
                getList()
                // handleRecordTime(timeItem, workers, groupInfo,tabData.id);
              }, 800)
              setTimeout(() => {
                isHandleAdd = true;
              }, 800)
              //直接保存
            } else {
              JumpFn(timeItem);
              dispatch(setWorker([]))
              // handleRecordTime(timeItem, workers, groupInfo, tabData.id);
              setIsdisable(true);
              setDisplay(true)
              setTimeout(() => {
                isHandleAdd = true;
              }, 800)
            }
          } else {
            Msg(resData.msg)
            setTimeout(() => {
              isHandleAdd = true;
            }, 800)
          }
          setTimeout(() => {
            isHandleAdd = true;
          }, 800)
        })
      // }
      return
    } else {
      addNewBusinessAction(params).then(res => {
        if (res.code === 200) {
          if (type === 1) {
            Msg('保存成功')
            setTimeout(() => {
              setImage({ item: [] });
              // bkGetProjectTeam('', true);
              setProjectId('');
              setGroupInfo('');
              // 清空通讯录的reducer
              // dispatch(setPhoneList([]));
              // dispatch(setWorker([]));
              // 全选为0
              setClickNum(0);
              setAllClick(false)
              // 重新请求
              getList()
            }, 800)
            setTimeout(() => {
              isHandleAdd = true;
            }, 800)
          } else {
            JumpFn(timeItem);
            setIsdisable(true);
            setDisplay(true)
            setTimeout(() => {
              isHandleAdd = true;
            }, 800)
          }
        } else {
          Msg(res.msg);
          setTimeout(() => {
            isHandleAdd = true;
          }, 800)
        }
        setTimeout(() => {
          isHandleAdd = true;
        }, 800)
      })
    }
  }
  const JumpFn = (timeItem)=>{
    let timedata = new Date(toDayString).getTime();
    timeItem.forEach((el,index) => {
      let eltime = el.year+'-'+el.month+'-'+el.date;
      let eldate = new Date(Date.parse(eltime.replace(/-/g,  "/")))
      let elstamp = new Date(eldate).getTime()
      arr[index] = timedata - elstamp;
    });
    let min = Math.min.apply(null,arr); 
    const time = addZero(new Date(timedata-min).getFullYear())+'-'+addZero(new Date(timedata-min).getMonth()+1)+'-'+addZero(new Date(timedata-min).getDate());
    setJumpMonth(time);
  }
  const handleCalendar = (v) => {
  }
  // 点击项目
  const handleProject = (v) => {
    let data = JSON.parse(JSON.stringify(model));
    const arr = JSON.parse(JSON.stringify(projectArr))
    // setLeader_id('');
    data.name = v.group_name + '-' + v.name;
    const name = v.group_name + '-' + v.name;
    let groupInfos = v.group_id + ',' + v.id;
    setLeader_id('');
    setDel(false)
    setGroupInfo(groupInfos)
    setProjectId(v.group_id + ',' + v.id)
    const time = toDayString + `（今天）`;
    data.time = time;
    // 切换项目需要更换日历和上班时长
    //工人
    if (identity == 2) {
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
        console.log(arr[i],'xxxx');
        setLeader_id(arr[i].group_leader);
      } else {
        arr[i].click = false;
      }
    }
    // 设置i项目
    setProjectArr(arr)
    setShow(false)
    setModel(data)
    setDeldelType(false)
    // 设置GroupInfo;
    setGroupInfo(v.group_id + ',' + v.id)
    // 工人的话
    const type = Taro.getStorageSync(Type);
    if (type == 2) {
      if(toDayString){
        generateThreeMonths(new Date(toDayString));
      }else{
        generateThreeMonths(new Date());
      }
      // 把数据存到reducer
      dispatch(setWorker([v]));
      // 修改工资标准
      bkGetWorkerWage(v.group_id + ',' + v.id, '', data, name);
      // getList();
      return;
    }
    setAllClick(false);
    setClickNum(0);
    setCheckAll(false);
    setClickModalNum(0)
    // 选择项目的时候先获取设置工资标准员工
    bkGetWorker(v.group_id + ',' + v.id, true, name)
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
    const groupInfos = JSON.parse(JSON.stringify(groupInfo||''));
    //模板金额 
    const moneyNum = data.money;
    // 模板时间
    const workNum = data.work;
    //加班金钱
    const addWorkNum = data.addWork;
    // 加班时间
    const dayNum = data.day;
    setIsdisable(true)
    // 上班标准提示
    if (workNum == 0) {
      Msg('上班标准必须大于0')
      return;
    }
    // 每个工多少钱提示
    if (moneyNum == 0 || moneyNum ==0.00) {
      Msg('每个工工钱必须大于0')
      return;
    }
    //按天数 一个工
    if (data.type == 2) {
      if (data.day == 0) {
        Msg('1个工必须大于0小时')
        return;
      }
    }
    if (data.type == 1) {
      if (data.addWork == 0 || data.addWork == 0.00 ) {
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
      let total = 0.00;
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
      let num: any = 0.00;
      // if (num && !Object.is(num, NaN)){
      num = toFixedFn(total);
      // }
      // 给工人自己设置工资标准
      // 传0会报错所以判断是按天还是按小时
      let tabData;
      recorderTypeArr.item.map((v) => {
        if (v.click) {
          tabData = v;
        }
      })
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
          group_info: groupInfos,
          business_type: tabData.id,
        }
        // 按天
      } else {
        params = {
          identity: identity,
          worktime_define: data.work,
          overtime_type: data.type,
          overtime_money: data.addWork,
          money: data.money,
          overtime: data.day,
          group_info: groupInfos,
          business_type: tabData.id,
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
      setCacheWage(wageStandard);
      setWageStandard(wageStandard);
      setModel({ ...model, workersWages: num });
      setWageStandardDisplay(false);
      setTimeout(() => {
        setIsdisable(false)
      });
      return;
    }
    if (addStandard === 1) {
      let params;
      if(data.type == 1){
        params = {
          name: '',
          worktime_define: data.work,
          overtime_type: data.type,
          overtime_money: data.addWork,
          money: data.money,
          overtime: data.day,
        }
      }else{
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
      let dataType;
      recorderTypeArr.item.map((v) => {
        if (v.click) {
          dataType = v.id;
        }
      })
      let params = {
        id: data.worker_id,
        group_info: groupInfos,
        worktime_define: data.work,
        overtime_type: data.type,
        overtime: data.day,
        overtime_money: data.addWork,
        money: data.money,
        business_type: dataType,
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
    setIsdisable(true);
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
      if (parseFloat(v.overtime_type) == data.data[i].id) {
        data.data[i].click = true
      } else {
        data.data[i].click = false
      }
    }
    if (v.overtime_type == 2) {
      data.dayAddWork = toFixedFn((parseFloat(v.money) / parseFloat(v.overtime)));
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
        setTimeout(() => {
          setIsdisable(false)
        });
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
    if (!isHandleAdd) return;
    isHandleAdd = false
    setDel(false)
    const ids = v.id;
    let params = {
      ids,
    }
    const name = JSON.parse(JSON.stringify(foremanTitle));
    const data = JSON.parse(JSON.stringify(model));
    Taro.showModal({
      title: '',
      content: '删除项目后,所有数据不能找回,确定要删除吗？',
      showCancel: true,
      confirmColor: '#0099FF',
      cancelColor: '#797979',
      success: (res) => {
        if (res.confirm == true) {
          bkDeleteprojectTeamAction(params).then(res => {
            if (res.code === 200) {
              Msg('删除成功');
              setTimeout(() => {
                // bkGetProjectTeam('',false,true);
                getList();
                setForemanTitle('');
                setDeldelType(false)
                setModel({ ...model, name: '',groupName:'' });
              }, 800)
              setTimeout(() => {
                isHandleAdd = true;
              }, 800)
            } else {
              Msg(res.msg)
              setTimeout(() => {
                isHandleAdd = true;
              }, 500)
            }
            setTimeout(() => {
              isHandleAdd = true;
            }, 500)
          })
        }
      }
    })
  }
  // 确认修改项目
  const handleEditProject = () => {
    if (!isHandleAdd) return
    isHandleAdd = false
    const data = JSON.parse(JSON.stringify(editProjectData));
    const group = data.group_name.replace(/^\s*|\s*$/g, "");
    const team = data.team_name.replace(/^\s*|\s*$/g, "");
    let params = {
      group_info: data.group_info,
      team_name: team,
      group_name: group,
    }
    bkUpdateProjectTeamAction(params).then(res => {
      if (res.code === 200) {
        setTimeout(() => {
          isHandleAdd = true;
        }, 500)
        setEditProjectDisplay(false);
        // console.log(res.data,'reramdskaldmlkasdmnlka')
        // setProjectArr()
        bkGetProjectTeam('', false, false, group + '-' + team, data.group_info);
      } else if (res.code === 400) {
        Msg(res.msg)
        setTimeout(() => {
          isHandleAdd = true;
        }, 500)
        return;
      }else{
        setTimeout(() => {
          isHandleAdd = true;
        }, 500)
      }
      setTimeout(() => {
        isHandleAdd = true;
      }, 500)
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
    if (type == 'team_name' || type == 'group_name') {
      const regExp = /^[\u4e00-\u9fa5_a-zA-Z0-9\s\·\~\！\@\#\￥\%\……\&\*\（\）\——\-\+\=\【\】\{\}\、\|\；\‘\’\：\“\”\《\》\？\，\。\、\`\~\!\#\$\%\^\&\*\(\)\_\[\]{\}\\\|\;\'\'\:\"\"\,\.\/\<\>\?]+$/;
      if (regExp.test(e.detail.value)) {
        data[type] = e.detail.value;
        setEditProjectData(data);
      } else {
        data[type] = '';
        setEditProjectData(data);
        return ''
      }
    }
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
    let dataType;
    recorderTypeArr.item.map((v) => {
      if (v.click) {
        dataType = v.id;
      }
    })
    const params = {
      worker_ids: worker_ids.toString(),
      wage_id: templateId,
      group_info: id,
      business_type: dataType,
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
              // setNoset(true)
            } else {
              // setNoset(false)
            }
          }
        }
        console.log(data,'dataaaa')
        let noset:boolean = true;
        for (let j = 0; j < data.length; j++) {
          if (!data[j].set) {
            // setNoset(false)
            noset = false
          }
          //  else {
          //   setNoset(true)
          // }
        }
        setNoset(noset)
        setTimeout(() => {
          setIsdisable(false)
        });
        setWorkerItem(data)
        bkGetWorkerWage();
        setWageStandardDisplay(false)
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
    let allClick = true;
    for (let i = 0; i < data.length; i++) {
      if (!data[i].click) {
        allClick = false;
      }
    }
    // checkAll
    setCheckAll(allClick)
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
      let allClick = true;
      for (let i = 0; i < data.length; i++) {
        if (!data[i].click) {
          allClick = false;
        }
      }
      setAllClick(allClick)
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
      // 判断全部都点击了全选就变成
      let allClick = true;
      for (let i = 0; i < data.length; i++) {
        if (!data[i].click) {
          allClick = false;
        }
      }
      setAllClick(allClick)
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
        if (allClick) {
          dataItemArr[i].click = false;
          Itme = [];
          setAllClick(false)
        } else {
          dataItemArr[i].click = true;
          if (dataItemArr[i].click) {
            Itme.push(dataItemArr[i]);
          }
          setAllClick(true)
        }
      }
      setWorkerItem(dataItemArr);
      setClickNum(Itme.length);
      return;
    } else {
      console.log('全选')
      // 必须全部都为set才你的那个变为取消全选
      console.log(dataItemArr,'dataItemArr')
      if (!allClick) {
        let AllClick = true
        dataItemArr.map((v) => {
          if (v.set) {
            v.click = true;
            Itme.push(v);
          }
          if (!v.set) {
            Msg('还有人未设置工资标准')
            AllClick = false;
          }
          return v;
        })
        console.log(AllClick,'AllClick')
        setAllClick(AllClick)
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
    setIsdisable(true)
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
    setDeldelType(false)
    setDel(false)
    const data = JSON.parse(JSON.stringify(contractorArr.item));
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === v.id) {
        data[i].click = true;
        setContractor(v.id)
      } else {
        data[i].click = false;
      }
    }
    let noset: boolean = true;
    for (let i = 0; i < workerItem.length;i++){
      // setNoset(true)
      workerItem[i].del = false;
      workerItem[i].click = false;
      if (!workerItem[i].set){
        // setNoset(false)
        noset = false
      }
    }
    setClickNum(0);
    setAllClick(false)
    setNoset(noset)
    setWorkerItem(workerItem)
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
    Taro.setStorageSync(NoRequest, true);
    // noData = true;
    bkGetWorker();
    userRouteJump(`/pages/addTeamMember/index?groupInfo=${groupInfo}`);
    // return;
    // return;
    // setRefresh(true)
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
    const calendarData = JSON.parse(JSON.stringify(calendar));
    // const dataItem = calendarData.second;
    // 遍历本月日历，然后遍历上次点击的日历，判断相同就设置为true
    // for(let j=0;j<data.length;j++){
    //   for (let i = 0; i < calendarDaysArr.length;i++){
    //         calendarDaysArr[i].click = false;
    //       if (data[j].date == calendarDaysArr[i].date && data[j].month == calendarDaysArr[i].month && data[j].year == calendarDaysArr[i].year) {
    //         calendarDaysArr[i].click = true;
    //       }
    //     }
    //   }
    for (let i = 0, len = calendarData.first.length; i < len; i++) {
      calendarData.first[i].click = false;
      if (data.length > 0) {
        for (let j = 0, length = data.length; j < length; j++) {
          if (data[j].date == calendarData.first[i].date && data[j].month == calendarData.first[i].month && data[j].year == calendarData.first[i].year) {
            calendarData.first[i].click = true;
          }
        }
      }
    }
    for (let i = 0, len = calendarData.fourth.length; i < len; i++) {
      calendarData.fourth[i].click = false;
      if (data.length > 0) {
        for (let j = 0, length = data.length; j < length; j++) {
          if (data[j].date == calendarData.fourth[i].date && data[j].month == calendarData.fourth[i].month && data[j].year == calendarData.fourth[i].year) {
            calendarData.fourth[i].click = true;
          }
        }
      }
    }
    for (let i = 0, len = calendarData.second.length; i < len; i++) {
      calendarData.second[i].click = false;
      if (data.length > 0) {
        for (let j = 0, length = data.length; j < length; j++) {
          if (data[j].date == calendarData.second[i].date && data[j].month == calendarData.second[i].month && data[j].year == calendarData.second[i].year) {
            calendarData.second[i].click = true;
          }
        }
      }
    }
    for (let i = 0, len = calendarData.third.length; i < len; i++) {
      calendarData.third[i].click = false;
      if (data.length > 0) {
        for (let j = 0, length = data.length; j < length; j++) {
          if (data[j].date == calendarData.third[i].date && data[j].month == calendarData.third[i].month && data[j].year == calendarData.third[i].year) {
            calendarData.third[i].click = true;
          }
        }
      }
    }
    setClickData(data);
    // calendarData.second = dataItem;
    setCalendar(calendarData)
    setCalendarDays(calendarDaysArr)
    let time;
    if (data.length == 1) {
      // const time = data[0].year+
      const years = new Date().getFullYear();
      const months = new Date().getMonth() + 1;
      const dates = new Date().getDate();
      if (data[0].year == years && data[0].month == months && data[0].date == dates) {
        time = years + '-' + addZero(months) + '-' + addZero(dates)+`（今天）`
      } else {
        time = data[0].year + '-' + addZero(data[0].month) + '-' + addZero(data[0].date)
      }
    } else {
      time = '共选择' + data.length + '天';
    }
    setModel({ ...model, time: time });
    setCalendarModalDisplay(false);
    setTimeout(() => {
      setIsdisable(false)
    },100);
  }
  // 日历切换时间
  const handleChangeTime = (type: number) => {
    const nowYear = Number(toDayString.split('-')[0]);
    const nowMon = Number(toDayString.split('-')[1])
    // setCalendarState(true)
    calendarState = true;
    console.log(time,'timessssssssssss')
    if (type === 0) {
      if(Number(time.year)==(nowYear-1)&&Number(time.monent)==1){
        setleftTime(false);
        return;
      }
      if(Number(time.year)==(nowYear-1)&&Number(time.monent)<=2){
        setleftTime(false);
      }
      setrightTime(true);
      let date = new Date(Number(time.year), Number(time.monent) - 2, 1)
      generateThreeMonths(date);
    } else {
      if(Number(time.year)==nowYear&&Number(time.monent)==nowMon){
        setrightTime(false);
        return
      }
      if(nowMon == 1){
        if((Number(time.year)+1)==nowYear&&Number(time.monent)==12){
          setrightTime(false);
        }
      }else{
        if(Number(time.year)==nowYear&&(Number(time.monent)+1)>=nowMon){
          setrightTime(false);
        }
      }
      setleftTime(true)
      let date = new Date(Number(time.year), Number(time.monent), 1)
      generateThreeMonths(date);
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
        time = years + '-' + addZero(months) + '-' + addZero(dates) + `（今天) `
      } else {
        time = data[0].year + '-' + addZero(data[0].month) + '-' + addZero(data[0].date)
      }
    } else {
      time = '共选择' + data.length + '天';
    }
    // 显示
    setModel({ ...model, time: time });
    // 覆盖点击的值
    setOpenClickTime(data)
    // 点击的值
    setTimeData(data);
    // 关闭
    setCalendarModalDisplay(false);
    setTimeout(() => {
      setIsdisable(false)
    },100);
    // }
  }
  // 左
  const onScrollToUpper = () => {
    let date = new Date(JSON.parse(time.year), JSON.parse(time.monent), 1)
    generateThreeMonths(date);
  }
  // 右
  const onScrollToLower = () => {
    let date = new Date(JSON.parse(time.year), JSON.parse(time.monent) - 2, 1)
    generateThreeMonths(date);
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
    setIsdisable(true)
  }
  // 切换类型
  const handleClckTabber = (v) => {
    setProjectId('');
    setDeldelType(false)
    // 全选
    setClickNum(0);
    setDel(false);
    setNum(0);
    setAllClick(false)
    setCheckAll(false);
    setClickModalNum(0)
    workerItem.forEach((item) => {
      delete item.discipline
    })
    const recorderTypeArrList = JSON.parse(JSON.stringify(recorderTypeArr.item));
    const data = recorderTypeArrList.map(val => {
      if (val.id === v.id) {
        val.click = true;
        setRecorderType(val.id);
        // 清空头像
        setCache([])
        dispatch(setColor([]));
        getList(val.id);
        console.log(val.id,'idddd')
        // setChangeID(val.id)
        changeId = val.id;
      }else{
        val.click = false;
      }
      return val;
    })
    setRecorderTypeArr({ item: data })
  }
  // 获取缓存
  const getWorkerHasBusinessByDate = () => {
    let dataType;
    recorderTypeArr.item.map((v) => {
      if (v.click) {
        dataType = v.id;
      }
    })
    const timeItem = JSON.parse(JSON.stringify(openClickTime));
    let time: string[] = timeItem.map(item => (item.year + '-' + item.month + '-' + item.date));
    let dateParams = {
      group_info: groupInfo,
      business_type: dataType,
      date: time,
    }
    getWorkerHasBusinessByDateAction(dateParams).then(dateRes => {
      if (dateRes.code == 200) {
        if (dateRes.data) {
          if (dateRes.data.days && dateRes.data.days.length > 0) {
            let dateItem: any[] = [];
            for (let z = 0; z < dateRes.data.days.length; z++) {
              let dayObj = {
                date: dateRes.data.days[z].split('-')[2],
                month: dateRes.data.days[z].split('-')[1],
                year: dateRes.data.days[z].split('-')[0],
              }
              dateItem.push(dayObj);
            }
            setcacheDays(dateItem);
            // cacheDaysArr = dateItem;
          }
          if (dateRes.data.worker && dateRes.data.worker.length > 0) {
            setcacheWorker(dateRes.data.worker);
            // ArrList.map(v => {
            //   dateRes.data.worker.map(val => {
            //     if (val == v.id) {
            //       v.discipline = true;
            //     }
            //     return val;
            //   })
            //   return v;
            // })
          }

        }
      }
    })
  }
  // 加
  const handleInputAdd = (type: string, e: string) => {
    const data = JSON.parse(JSON.stringify(wageStandard));
    if (type === 'work' || type === 'day') {
      if (Number(e) == 24) {
        Msg('超出最大输入范围')
      }
      if (data[type] < 24) {
        let num = Number(data[type]) + 0.5;
        if (num > 24) {
          num = 24;
          Msg('超出最大输入范围')
        }
        if (type === 'day') {
          let price: number | string = 0.00;
          if (data.money > 0 && Number(num) > 0) {
            price = data.money / Number(num)
          }
          data.dayAddWork = (toFixedFn(price));
          data[type] = toFixedFn(num);
          setWageStandard(data);
          return;
        }
        data[type] = num;
        setWageStandard(data);
      }
    } else if (type === 'money' || type === 'addWork') {
      if (Number(e) == 9999.99) {
        Msg('超出最大输入范围')
      }
      if (data[type] < 9999.99) {
        let num = Number(data[type]) + 1;
        if (num > 9999.99) {
          num = 9999.99;
          Msg('超出最大输入范围')
        }
        if (type === 'money') {
          let dayAddWork;
          if (data.day == 0) {
            dayAddWork = 0.00
          } else {
            dayAddWork = Number(num) / data.day || 0.00;
          }
          data.dayAddWork = toFixedFn(dayAddWork);
        }
        data[type] = toFixedFn(num);
        setWageStandard(data);
      }
    }
  }
  // 减少
  const handleDelInput = (type: string, e: string) => {
    const data = JSON.parse(JSON.stringify(wageStandard));
    console.log(data[type],'data[type]')
    console.log(type,'111')
    if (type === 'work' || type === 'day') {
      if (Number(data[type]) > 0) {
        let num = Number(data[type]) - 0.5;
        if (num == 0 ||num<0) {
          num = 0;
        }
        if (type === 'day') {
          let price: number | string = 0.00;
          if (data.money > 0 && Number(num) > 0) {
            price = data.money / Number(num);
          }
          data.dayAddWork = toFixedFn(price);
          data[type] = toFixedFn(num);
          setWageStandard(data);
          return
        }
        data[type] = num;
        setWageStandard(data);
      }
    } else if (type === 'money' || type === 'addWork') {
      if (data[type] > 0) {
        let num = Number(data[type]) - 1;
        if (num == 0 || num<0) {
          num = 0;
        }
        if (type === 'money') {
          let dayAddWork;
          if (data.day == 0) {
            dayAddWork = 0.00
          } else {
            dayAddWork = Number(num) / data.day || 0.00;
          }
          data.dayAddWork = toFixedFn(dayAddWork);
        }
        console.log(num,'num2n1j3n21ln3l21');
        data[type] = toFixedFn(num);
        setWageStandard(data);
      }
    }
  }
  // 日历滑动
  const handleSuiper = (e)=>{
    // setCalendarState(true)
    // if(testItem)return;
    const calendarData = JSON.parse(JSON.stringify(calendar));
    const first = calendarData.first;
    const second = calendarData.second;
    const third = calendarData.third;
    const fourth = calendarData.fourth;
    let suiperState = true;
    console.log(calendarData,'thirdthirdthird')
    console.log(e,'eeee')
    // for (let i = 0; i < fourth.length;i++){
    //   if (fourth[i].year == timeDate.year && fourth[i].month == timeDate.monent && !fourth[i].next && !fourth[i].up && e.detail.current == 3 && fourth[i].isMonth) {
    //     suiperState = false;
    //   }
    // }
    for (let i = 0; i < first.length;i++){
      if (first[i].isMonth && !first[i].next && !first[i].up && e.detail.current == 0 ) {
        suiperState = false;
      }
    }
    for (let i = 0; i < second.length;i++){
      if (second[i].isMonth && !second[i].next && !second[i].up && e.detail.current == 1 ) {
        suiperState = false;
      }
    }
    for (let i = 0; i < third.length;i++){
      if (third[i].isMonth && !third[i].next && !third[i].up && e.detail.current == 2 ) {
        suiperState = false;
      }
    }
    for (let i = 0; i < fourth.length; i++) {
      if (fourth[i].isMonth && !fourth[i].next && !fourth[i].up && e.detail.current == 3) {
        suiperState = false;
      }
    }
    // setCalendarState(suiperState)
    calendarState = suiperState;
    if (!suiperState){
      generateThreeMonths(new Date(toDate))
      // return;
    }
    console.log(suiperState,'suiperState')
    // if(!suiperState){
    //   delete calendarData['fourth']
    //   calendarData['fourth'] = getMonthDaysCurrent(new Date(e), val, ids, typeId, cacheDaysArrList, change, thisKey);
    //   // 上一个
    //   delete calendarData['third']
    //   calendarData['third'] = getMonthDaysCurrent(lastMonth, val);
    // }
    // 判断现在时间是这个月设置数据为最后一个，日历circular设置为false
    const lastIndex = JSON.parse(JSON.stringify(swiperIndex));
    const currentIndex = e.detail.current;
    let flag = false;
    let change = swiperMap[(lastIndex + 2) % 4];
    let day = JSON.parse(time.year)+'-'+ addZero(time.monent)+'-'+ '01';
    // return;
    let times = countMonth(day);
    let key = 'lastMonth';
    if (lastIndex > currentIndex) {
      lastIndex === 3 && currentIndex === 0
        ? flag = true
        : null
    } else {
      lastIndex === 0 && currentIndex === 3
        ? null
        : flag = true
    }
    if (flag) {
      key = 'nextMonth'
    }
    const year = times[key].year
    const month = addZero(times[key].month)
    const date = `${year}-${month}`
    day = '';
    console.log(month,'month')
    setTime({
      year,
      monent: month,
    })
    if (toDayString.indexOf(date) !== -1) {
      day = toDayString.slice(-2)
    }
    const timeItem = countMonth((year + '-' + month+'-'+'01'));
    calendarData[change] = null
    calendarData[change] = getMonthDaysCurrent(new Date(timeItem[key].year + '-' + addZero(timeItem[key].month)+'-'+'01'));
    setCalendar(calendarData)
    setSwiperIndex(currentIndex)
    // if (!suiperState) {
    //   generateThreeMonths(new Date(toDate))
    // }
  }
  console.log(calendarState,'setCalendarStatesetCalendarState')
  console.log(swiperIndex,'swiperIndex')
  return {
    model,
    project,
    setModel,
    setProject,
    blurhandleContent,
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
    noSet,
    setProjectArr,
    clickDay, 
    setClickDay,
    clickTime, 
    setClickTime,
    setTimeArr,
    setAddWorkArr,
    projectId, 
    setProjectId,
    cacheWage, 
    setCacheWage,
    setWageStandard,
    setTab,
    isdisable,
    setIsdisable,
    jumpMonth,
    handleInputAdd,
    handleDelInput,
    noCalendarDay,
    leftTime,
    setleftTime,
    rightTime,
    setrightTime,
    toDayString,
    isDel,
    changeId,
    calendar,
    handleSuiper,
    swiperIndex,
    calendarState,
  }
}