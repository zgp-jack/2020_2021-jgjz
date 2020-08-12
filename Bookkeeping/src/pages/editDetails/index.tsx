import Taro, { useState,useRouter,useEffect} from '@tarojs/taro'
import ImageView from '../../components/imageview';
import UploadImgAction from '../../utils/upload'
import { bkBusinessOneAction, updateBusinessAction, bkSetWorkerIdentityWageAction, bkUpdateWorkerAction } from '../../utils/request/index';
import { View, Text, Input, Textarea, RadioGroup, Radio, Image, CoverView } from '@tarojs/components';
import WageStandard  from '../../components/wageStandard'
import Quantities from '../../components/quantities';
import Msg from '../../utils/msg'
import { IMGCDNURL } from '../../config'
import WorkingHours from '../../components/workingHours';
import WorkOvertime from '../../components/workOvertime';
import './index.scss'

interface ImageDataType {
  item: ImageItem[],
}
export interface ImageItem {
  url: string,
  httpurl: string
}
export interface BorrowingType {
  item: DataType[]
}
interface DataType {
  id: number,
  name: string,
  click: boolean,
  num?: number
}
export default function EditDetails() {
  const router: Taro.RouterInfo = useRouter();
  const { id,typeItem } = router.params;
  // 班组长还是工人
  const [identity, setIdentity] = useState<number>(1)
  // 图片
  const [image, setImage] = useState<ImageDataType>({
    item: [],
  })
  // 类型
  const [businessType, setBusinessType] = useState<number>(1);
  // 禁用textarea
  const [isdisable,setIsdisable] = useState<boolean>(false)
  // 包工类型名称
  const [typeName,setTypeName] = useState<string>('')
  const [type,setType] = useState<number>(1);
  // 选择加班时长弹窗
  const [workOvertimeDisplay, setWorkOvertimeDisplay] = useState<boolean>(false)
  // 上班时长选择
  const [workingHoursDisplay, setWorkingHoursDisplay] = useState<boolean>(false)
  // 单位
  const [unit, setUnit] = useState<string>('平方米')
  // 上班时长选择类型
  const [timeType, setTimeType] = useState<number>(0)
  // 单位弹框
  const [quantitiesDisplay, setQuantitiesDisplay] = useState<boolean>(false)
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
  // 上班时长
  const [timeArr, setTimeArr] = useState<DataType[]>([
    { id: 1, name: '1个工', click: false, num: 1 },
    { id: 2, name: '半个工', click: false, num: 0.5 },
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
  // 工资标准
  const [display, setDisplay] = useState<boolean>(false)
  // 内容
  const [wageStandard, setWageStandard] =useState<any>({
    data: [
      { id: 1, name: '按小时算', click: false },
      { id: 2, name: '按天算', click: false },
    ],
    work: 0,
    money: 0,
    addWork: 0,
    type: 1,
    day: 0,
    dayAddWork: 0,
    state: '',
    group_info: '',
    id: '',
    worker_id:'',
  })
  const [val,setVal] = useState({
    note:'',
    name:'',
    workername:'',
    leaderName:'',
    time:'',
    workingHours:'',
    working:'',
    duration:'',
    modalDuration:'',
    wages:'',
    unitNum:'',
    unit:'',
    unitPrice:'',
    money:'',
  })
  // 工资标准内容
  const [standard, setStandard] = useState({
    worktime_define:'',
    money:'',
    overtime_type:'',
    worker_overtime:'',
    overtime:'',
    overtime_money:'',
    work_time:'',
  })
  // 工资标准
  const [wageStandardDisplay, setWageStandardDisplay] = useState<boolean>(false)
  // 日期显示
  const [date,setDate] = useState<string>('')
  // 点击上班时长
  const [clickDay, setClickDay] = useState<any>();
  // 点击加班时长
  const [clickTime, setClickTime] = useState<any>()
  // 设置光标
  const [autoFocus, setAutoFocus] = useState<boolean>(false)
  useEffect(()=>{
    if(id){
      bkBusinessOneAction({ id }).then(res => {
        if(res.code === 200){
          const data = JSON.parse(JSON.stringify(wageStandard));
          const obj = JSON.parse(JSON.stringify(val));
          const standardObj = JSON.parse(JSON.stringify(standard));
          setType((parseInt(res.data.type)));
          setBusinessType(parseInt(res.data.business_type));
          setIdentity(parseInt(res.data.identity));
          setImage({ item: res.data.view_images })
          obj.name = (res.data.group_info_name).replace(',','-');
          obj.note = res.data.note;
          obj.workername = res.data.workername;
          obj.leaderName = res.data.leader_name;
          // 判断弹框显示
          let title;
          if (res.data.work_time == '1.00'){
            title= '1个工'
          }else if(res.data.work_time =='0.50'){
            title = '半个工'
          }else if(res.data.wage_money == '0.00'){
            title = '修改'
          }else{
            title = res.data.work_time_hour + '小时'
          }
          let addTitle;
          if (res.data.overtime == '0.00'){
            addTitle = '，无加班'
          }else{
            addTitle = '，加班' + res.data.overtime + '小时'
          }
          // 这里是工要获取到多少工资标里的设置的时间再算
          // const duration = res.data.work_time + '个工' + res.data.overtime+'小时'
          const duration = title + addTitle
          obj.duration = duration;
          obj.modalDuration = duration;
          obj.money = res.data.money;
          console.log(res.data.time)
          console.log(res.data.money,'sdadasdas')
          const toDay = new Date();
          const newData = new Date(parseInt(res.data.time)*1000);
          // 判断如果与今天相同就加今天
          let toDate;
          const newTime = newData.getFullYear() + '-' + addZero(newData.getMonth() + 1) + '-' + addZero(newData.getDate());
          const toDayDate = toDay.getFullYear() + '-' + addZero(toDay.getMonth() + 1) + '-' + addZero(toDay.getDate());
          console.log(new Date(newTime).getTime(),'new Date(newData).getTime()')
          console.log(new Date(toDayDate).getTime(),'new Date(toDayDate).getTime()')
          // 后台返回的数据时时8点需要自己修改
          
          if (new Date(toDayDate).getTime() == new Date(newTime).getTime()){
            toDate = newTime+`(今天)`;
          }else{
            toDate = newTime  
          }
          setDate(toDate)
          obj.time = newTime;
          data.work = res.data.wage_worktime_define;
          data.addWork = res.data.wage_overtime_money;
          data.money = res.data.wage_money;
          data.day = res.data.wage_overtime;
          data.worker_id = res.data.worker_id;
          data.group_info = res.data.group_info;
          if (parseFloat(res.data.wage_money) && parseFloat(res.data.wage_overtime)){
            data.dayAddWork = moneyfilter((parseFloat(res.data.wage_money) / parseFloat(res.data.wage_overtime)),2)
          }else{
            data.dayAddWork =0
          }
          data.group_info = res.data.group_info;
          data.type = parseInt(res.data.wage_overtime_type);
          for (let i = 0; i < data.data.length;i++){
            if (data.data[i].id == res.data.wage_overtime_type){
              data.data[i].click = true;
            }
          }
          // 设置工资标准内容
          // data.overtime=res.data.overtime_money;
          standardObj.worktime_define = res.data.worktime_define
          standardObj.money = res.data.worker_money
          standardObj.overtime_type = res.data.overtime_type
          standardObj.worker_overtime = res.data.worker_overtime
          standardObj.overtime = res.data.overtime
          standardObj.overtime_money = res.data.overtime_money
          standardObj.work_time = res.data.work_time;
          setStandard(standardObj);
          // 工钱
          let wages;
          if (parseInt(res.data.overtime_type) === 1){
            // 每个工多少钱/上班时间*选择的上班时长 + 加班多选小时*加班一小时多少钱
            // 每个工的钱*百分比 + 时间 *加班工钱
            wages = (+res.data.worker_money * +res.data.work_time) + (+res.data.overtime) * (+res.data.overtime_money)
          }else{
            // 每个工多少钱/上班时间*选择的上班时长 + 每个工多少钱/多少钱算一个工*加班时长
            wages = ((+res.data.worker_money)* (+res.data.work_time)) + (((+res.data.worker_money) / (+res.data.worker_overtime)) * (+res.data.overtime))
          }
          obj.wages = wages.toFixed(2);
          obj.unitNum = parseInt(res.data.unit_num);
          obj.unitPrice = res.data.unit_price;
          obj.unit = res.data.unit;
          setVal(obj);
          setWageStandard(data)
          // 设置数据上班时长数据
          const timeArrData = JSON.parse(JSON.stringify(timeArr));
          // 判读返回的值
          for(let i =0;i<timeArrData.length;i++){
            // if ((+res.data.work_time) === timeArrData[i].num ){
            //   timeArrData[i].click = true
            // }else{
              // 返回的是工为单位的 小时为单位的数据
            // const setTime = ((+res.data.worktime_define) / (1 / (+res.data.work_time))).toFixed(1);
            if (res.data.work_time == '1.00' || res.data.work_time == '0.50' || res.data.wage_money == '0.00'){
              if (res.data.work_time == '1.00'){
                timeArrData[0].click = true;
              } else if (res.data.work_time == '0.50'){
                timeArrData[1].click = true;
              } else if (res.data.work_time == '0.00'){
                timeArrData[3].click = true;
              }
            }else{
              const setTime = (+res.data.work_time_hour).toFixed(2);
              const obj = { id: 4, name: `${setTime}小时`, click: true, num: setTime };
              const index = [timeArrData.length - 1];
              if (i === index[0]) {
                timeArrData[i] = obj;
              }
            }
            // const setTime = (+res.data.work_time_hour).toFixed(2);
              // const obj = { id: 4, name: `${setTime}小时`, click: true, num: setTime };
              // const index = [timeArrData.length-1];
              // if(i === index[0]){
              //   timeArrData[i] = obj;
              // }
            // }
          }
          setTimeArr(timeArrData)
          // 修改加班时长数据
          const addWorkArrData = JSON.parse(JSON.stringify(addWorkArr));
          for(let i =0;i<addWorkArrData.length;i++){
            if (res.data.overtime === '0.00'){
              addWorkArrData[0].click = true;
            }else{
              const obj = { id: 2, name: `${res.data.overtime}小时`, click: true, num: res.data.overtime };
              const index = [addWorkArrData.length - 1];
              if (i === index[0]) {
                addWorkArrData[i] = obj;
              }
            }
            // if(res.data.overtime === addWorkArrData[i].num){
            //   addWorkArrData[i].click = true;
            // }
          }
          setAddWorkArr(addWorkArrData);
          // data.dayAddWork = res.data.
          if(res.data.business_type === '1'){
            // setTypeName('点工')
            Taro.setNavigationBarTitle({
              title:'修改点工'
            })
          } else if (res.data.business_type === '2'){
            if(res.data.type === '1'){
              setTypeName('按天记工')
            }else{
              setTypeName('按量记工')
            }
            Taro.setNavigationBarTitle({
                title: '修改包工'
              })
          } else if (res.data.business_type === '3'){
            Taro.setNavigationBarTitle({
              title: '修改借支'
            })
            const borrowingArr = JSON.parse(JSON.stringify(borrowing.item));
            for (let i = 0; i < borrowingArr.length ;i++){
              if(parseInt(res.data.type) == borrowingArr[i].id){
                borrowingArr[i].click = true;
              }
            }
            setBorrowing({item:borrowingArr});
          }
        }else{
          Msg(res.msg)
        }
      })
    }
  },[])
  const addZero = (num) => {
    if (parseInt(num) < 10) {
      num = '0' + num;
    }
    return num;
  }
  // 图片
  const userUploadImg = (i: number = -1) => {
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
  const handelAdd = () => {
    if (image.item.length < 4) {
      userUploadImg && userUploadImg(-1)
    } else {
      Msg('最多上传四张照片');
      return;
    }
  }
  // 支借Radio
  const handleRadioBorrowing = (v) => {
    const data = JSON.parse(JSON.stringify(borrowing.item));
    for(let i =0;i<data.length;i++){
      if(v.id == data[i].id){
        data[i].click = true;
      }else{
        data[i].click = false;
      }
    }
    setBorrowing({item:data});
  }
  const moneyfilter = (num, decimal) => {
    num = num.toString()
    let index = num.indexOf('.')
    if (index !== -1) {
      num = num.substring(0, decimal + index + 1)
    } else {
      num = num.substring(0)
    }
    return parseFloat(num).toFixed(decimal)
  }
  // 关闭
  const handleClose = ()=>{
    setDisplay(false);
    setIsdisable(false);
    const data = JSON.parse(JSON.stringify(val));
    const title = data.duration;
    setVal({ ...data, modalDuration: title});
    const clickDayItem = JSON.parse(JSON.stringify(clickDay));
    const clickTimeItem = JSON.parse(JSON.stringify(clickTime));
    console.log(clickDayItem,'clickDayItem');
    console.log(clickTimeItem,'clickTimeItem');
    // 上班时长
    const timeArrs = JSON.parse(JSON.stringify(timeArr));
    // 获取加班时长
    const addWorkArrs = JSON.parse(JSON.stringify(addWorkArr));
    // 上班时长
    if (clickDayItem){
      for (let i = 0; i < timeArrs.length; i++) {
        timeArrs[i].click = false
        if (timeArrs[i].id == clickDayItem.id){
          if (clickDayItem.id !==4 ){
            timeArrs[i].click = true
          }else{
            timeArrs[i] = { id: 4, name: clickDayItem.name, click: true, num: clickDayItem };
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
            addWorkArrs[i] = { id: 2, name: clickTimeItem.name, click: true, num: clickTimeItem };
          }
        }
      }
    }
    console.log(addWorkArrs,'addWorkArrs')
    setTimeArr(timeArrs);
    setAddWorkArr(addWorkArrs)
  }
  // 输入框
  const handleWageStandard = (type,e)=>{
    if (type == 'day') {
      const item = JSON.parse(JSON.stringify(wageStandard));
      let dayAddWork = 0;
      if(e !== 0){
        dayAddWork = item.money / e;
      }
      item[type] = e||0;
      item.dayAddWork = dayAddWork.toFixed(2)||0;
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
  // 确定
  const handleAddWage = ()=>{
    // 获取数据
    const valData = JSON.parse(JSON.stringify(val));
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
    if (workNum === 0) {
      Msg('上班标准必须必须大于0')
      return;
    }
    // 每个工多少钱提示
    if (moneyNum === 0) {
      Msg('每个工工钱必须大于0')
      return;
    }
    console.log(data.type,'xxx')
    //按天数 一个工
    if (data.type === 2) {
      if (data.day == 0) {
        Msg('1个工必须大于0小时')
        return;
      }
    }
    if (data.type === 1) {
      if (data.addWork == 0) {
        Msg('每小时加班金额必须大于0')
        return;
      }
    }
    let time:number = 0;
    console.log(timeArrs,'timeArrstimeArrs')
    for (let i = 0; i < timeArrs.length; i++) {
      if (timeArrs[i].click) {
        console.log(timeArr[i])
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
    // return;
    // 加班时间
    let addTime:number = 0;
    for (let i = 0; i < addWorkArrs.length; i++) {
      if (addWorkArrs[i].click) {
        addTime = addWorkArrs[i].num
      }
    }
    //工资标准 每个工多少钱/上班标准 * 上班时长  判断加班是按小时算还是i按天算
    // let total = 0;
    // console.log(moneyNum,'moneyNum')
    // console.log(workNum, 'workNum')
    // console.log(time, 'time')
    // console.log(addWorkNum,'addWorkNum')
    // console.log(typeof addWorkNum)
    // console.log(addTime, 'addTime')
    // console.log(dayNum, 'dayNum')
    // 按小时
    let sum:any=0;
    if(data.type ===1){
      console.log(time,'time')
      sum = (moneyNum / workNum) * (time * workNum) + addWorkNum * addTime;
    }else{
      // 按天
      // 1除以模板时间*上班时间*模板金额  + 上班时长/多少小时算一个工*模板金额
      sum = moneyNum / workNum * (time * workNum) + (moneyNum / dayNum * addTime);    
    }
    console.log(sum,'sum');
    // return;
    // if (data.type === 1) {
    //   // 按小时算 加班小时* 模板加班金额
    //   total = ((parseInt(moneyNum)||0 / parseInt(workNum))||0 * (time) )+ (parseInt(addWorkNum)||0 * (addTime));
    //   console.log(total,'total')
    // } else {
    //   console.log('else')
    //   // 按天算 每个工多少钱/模板定义的多少小时算一个工 * 加班时长
    //   console.log(parseFloat(moneyNum) || 0 / parseFloat(workNum) || 0 * time ,'121');
    //   console.log((parseFloat(moneyNum) || 0 / parseFloat(dayNum) || 0 * addTime),'212')
    //   total = (parseFloat(moneyNum) || 0 / parseFloat(workNum) || 0 * (time)) + (parseFloat(moneyNum) || 0 / parseFloat(dayNum)||0 * (addTime));
    //   console.log(total,'total1')
    // }
    // const num = total.toFixed(2);
    let num: any = 0;
    // if (num && !Object.is(num, NaN)){
    num = sum.toFixed(2);
    setVal({ ...valData, wages:num})
    setWageStandardDisplay(false);
    setIsdisable(false);
    let params;
    if (data.type === 1) {
        params = {
          identity: identity,
          worktime_define: data.work,
          overtime_type: data.type,
          overtime_money: data.addWork,
          money: data.money,
          overtime: data.day,
          group_info: data.group_info,
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
        group_info: data.group_info,
      }
    }
    console.log(data,'1111');
    let paramsData:any = {};
    if (data.type === 1){
      paramsData = {
        id: data.worker_id,
        worktime_define: data.work,
        overtime_type: data.type,
        overtime_money: data.addWork,
        money: data.money,
        overtime: data.day,
        group_info: data.group_info,
        type: 'wage'
      }
    }else{
      paramsData = {
        id: data.worker_id,
        worktime_define: data.work,
        overtime_type: data.type,
        overtime_money: data.dayAddWork,
        money: data.money,
        overtime: data.day,
        group_info: data.group_info,
        type: 'wage'
      }
    }
    // return;
    // let paramsData = {
    //   id: data.worker_id,
    //   group_info: data.group_info,
    //   worktime_define: data.work,
    //   overtime_type: data.type,
    //   overtime: data.day,
    //   overtime_money: data.dayAddWork,
    //   money: data.money,
    //   type: 'wage'//后端说修改type传这个
    // };
    // 工人
    // if(identity === 2){
    //   bkSetWorkerIdentityWageAction(params).then(res => {
    //     if (res.code !== 200) {
    //       Msg(res.msg)
    //     }
    //   })
    //   //  班组长
    // }else{
    //   bkUpdateWorkerAction(paramsData).then(res=>{
    //     if(res.code !== 200){
    //       Msg(res.msg)
    //     }
    //   })
    // }
      // }
    // // 上班时间
    // let time = 0;
    // for (let i = 0; i < timeArrs.length; i++) {
    //   if (timeArrs[i].click) {
    //     time = timeArrs[i].num;
    //   }
    // }
    // console.log(time, 'time')
    // // 加班时间
    // let addTime = 0;
    // for (let i = 0; i < addWorkArrs.length; i++) {
    //   if (addWorkArrs[i].click) {
    //     addTime = addWorkArrs[i].num
    //   }
    // }

    //工资标准 每个工多少钱/上班标准 * 上班时长  判断加班是按小时算还是i按天算
    // let total;
    // if (data.type === 1) {
    //   // 按小时算 加班小时* 模板加班金额
    //   console.log(moneyNum,'moneyNum');
    //   console.log(workNum,'workNum');
    //   console.log(time,'time')
    //   console.log((moneyNum / workNum) * time,'xxxx')
    //   console.log(addWorkNum * addTime, 'addWorkNum * addTime')
    //   total = (moneyNum / workNum) * time + addWorkNum * addTime;
    // } else {
    //   // 按天算 每个工多少钱/模板定义的多少小时算一个工 * 加班时长
    //   total = moneyNum / workNum * time + (moneyNum / dayNum * addTime);
    // }
    // console.log(total, 'xxx')
    // const num = total.toFixed(2);
    // console.log(num,'num')
    // return;
    // // setModel({ ...model, workersWages: num });
    // setVal({ ...valData, wages:num})
    // setWageStandardDisplay(false);
    // const data = JSON.parse(JSON.stringify(wageStandard));
    // const valData = JSON.parse(JSON.stringify(val));
    // // valData.
    // console.log(31321);
    // 获取上班时长
  }
  // Radio
  const handleWageStandardRadio = (e)=>{
    console.log(e);
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
  // 选择加班时长
  const handleworkOvertime = (type: number, e: any) => {
    console.log(3213,'1111');
    console.log(val,'xxx')
    setTimeType(type)
    if (type === 1) {
      if (e.id === 4) {
        // const arr = timeArr.map(v => {
        //   if (v.id === e.id) {
        //     v.click = !v.click;
        //   } else {
        //     v.click = false
        //   }
        //   return v;
        // })
        // setTimeArr(arr)
        setWorkOvertimeDisplay(false)
        setWorkingHoursDisplay(true);
        return;
      } else {
        const arr = timeArr.map(v => {
          if (v.id === e.id) {
            v.click = !v.click;
          } else {
            if (v.id === 4) {
              v.name = '0.0小时';
            }
            v.click = false
          }
          return v;
        })
        setTimeArr(arr);
      }
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
      if (e.id == 3) {
        duration = e.name +addTime;
      } else {
        duration = '上班' + e.name +addTime;
      }
      console.log(duration,'durationduration')
      if (e.id != 4) {
        setVal({ ...val, modalDuration: duration })
      }
    } else {
      if (e.id != 2) {
        const arr = addWorkArr.map(v => {
          if (v.id === e.id) {
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
        // const arr = addWorkArr.map(v => {
        //   if (v.id === e.id) {
        //     v.click = !v.click;
        //   } else {
        //     v.click = false
        //   }
        //   return v;
        // })
        // setAddWorkArr(arr)
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
      if (e.id == 1) {
        duration = Time + ',无加班';
      } else {
        duration = Time + e.name;
      }
      console.log(duration,'duration1')
      if (e.id != 2) {
        setVal({ ...val, modalDuration:duration })
      }
    }
  }
  // 确认时间选择
  const handleWorkOvertimeOk = ()=>{
    const data: any = timeArr.filter(v => v.click);
    const dataList: any = addWorkArr.filter(v => v.click);
    const item = JSON.parse(JSON.stringify(wageStandard));
    // return;
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
        } else if(data.length==0){
          title = dataList[0].name
        }else {
          title = '加班'+dataList[0].name
        }
      }
      if (data.length > 0 && dataList.length > 0) {
        if (data[0].name == '休息' && dataList[0].name == '无加班') {
          title = data[0].name +'，'+ dataList[0].name
        } else {
          if (data[0].name == '休息') {
            title = data[0].name+ '，加班' + dataList[0].name
          }else if (dataList[0].name == '无加班') {
            title = '上班' + data[0].name +'，'+ dataList[0].name;
          }else{
            title = '上班' + data[0].name + '，加班' + dataList[0].name
          }
        }
      }
    }
    const standardObj = JSON.parse(JSON.stringify(standard));
    // 上班时长
    const timeArrs = JSON.parse(JSON.stringify(timeArr));
    // 获取加班时长
    const addWorkArrs = JSON.parse(JSON.stringify(addWorkArr));
    // console.log(standardObj,'xxx')
    let wages;
    // 计算
    // console.log(standardObj.money);
    // console.log(standardObj.worktime_define);
    // console.log(standardObj.work_time);
    // console.log()
    //模板金额 
    const moneyNum = item.money;
    // 模板时间
    const workNum = item.work;
    //加班金钱
    const addWorkNum = item.addWork;
    // 加班时间
    const dayNum = item.day;
    let time: number = 0;
    // let clickDay:any = {};
    // let clickTime:any = {};
    for (let i = 0; i < timeArrs.length; i++) {
      if (timeArrs[i].click) {
        // clickDay = timeArrs[i];
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
            time = 1 / workNum * workNum/ 2;
          } else if (timeArrs[i].id == 3) {
            // 等于0 
            time = 0;
          }
        }
      }
    }
    let addTime: number = 0;
    for (let i = 0; i < addWorkArrs.length; i++) {
      if (addWorkArrs[i].click) {
        setClickTime(addWorkArrs[i])
        // clickTime = addWorkArrs[i];
        addTime = addWorkArrs[i].num
      }
    }
    // return;
    if (item.type  == '1'){
      wages = (moneyNum / workNum) * (time * workNum) + addWorkNum * addTime;
      // wages = (item.money/item.work)
      // wages = (parseInt(standardObj.money)||0 / parseInt(standardObj.worktime_define)||0 * parseInt(standardObj.work_time))||0 + parseInt(standardObj.worker_overtime)||0 * parseInt(standardObj.overtime_money)||0
    }else{
      wages = moneyNum / workNum * (time * workNum) + (moneyNum / dayNum * addTime);    
      // wages = (parseInt(standardObj.money)||0 / parseInt(standardObj.worktime_define)||0 * parseInt(standardObj.work_time))||0 + ((parseInt(standardObj.money)||0 / parseInt(standardObj.worker_overtime))||0 * parseInt(standardObj.overtime))||0
    }
    const num = wages.toFixed(2);
    setVal({ ...val, duration: title, wages: num })
    setDisplay(false);
    setIsdisable(false);
  }
  // 关闭上班时长
  const handleWorkingHoursClose = ()=>{
    setWorkingHoursDisplay(false)
  }
  // 加班时长弹框选择
  const handleWorkingHours = (type: number, e: any) => {
    if (type === 1) {
      const data = timeArr.map((v) => {
        if (v.id === 4) {
          v.name = e.name;
          v.click = true;
          v.num = e.num
        }else{
          v.click = false;
        }
        return v;
      })
      setTimeArr(data);
      let addTime;
      for (let i = 0; i < addWorkArr.length; i++) {
        if (addWorkArr[i].click) {
          if (addWorkArr[i].id !== 1) {
            addTime = ',加班' + addWorkArr[i].name
          } else {
            addTime = ',无加班'
          }
        } else {
          addTime = ',无加班'
        }
      }
      let duration;
      duration = '上班' + e.name + addTime;
      setVal({ ...val, modalDuration:duration })
    } else {
      const data = addWorkArr.map((v) => {
        if (v.id === 2) {
          v.name = e.name;
          v.click = true;
          v.num = e.num
        }else{
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
      setVal({ ...val, modalDuration:duration })
    }
    setWorkingHoursDisplay(false);
    setWorkOvertimeDisplay(true);
  }
  // 保存
  const handlesub = ()=>{
    const data = JSON.parse(JSON.stringify(val));
    const items = JSON.parse(JSON.stringify(wageStandard));
    const businessTypes = JSON.parse(JSON.stringify(businessType));
    const borrowingArr = JSON.parse(JSON.stringify(borrowing.item))
    let img_url: string[] = image.item.map(item => item.url);
    // 借支的时候radio
    let typeState=0;
    if (businessTypes == 3){
      for (let i = 0; i < borrowingArr.length;i++){
        console.log(borrowingArr[i],'111')
        if(borrowingArr[i].click){
          typeState = borrowingArr[i].id
        }
      }
    }else{
      typeState = businessTypes;
    }
    // 时间
    let times: number = 0, work_time_hour = 0, work_time_type;
    timeArr.map(v => {
      if (v.click) {
        if (v.num) {
          if (v.id !== 4) {
            // times = v.num;
            // work_time_hour = items.work * v.num;
            // times = items.work * v.num;
            // work_time_hour = items.work * v.num;
            times = v.num;
            work_time_type = 'working_hour'
          } else {
            // times = 1 / items.work * v.num;
            // work_time_hour = v.num;
            // work_time_hour = 1 / items.work * v.num;
            times = v.num;
            work_time_type = 'hour'
          }
        }
      }
    })
    console.log(times,'e2')
    console.log(work_time_type,'work_time_type')
    console.log(timeArr,'timeArr')
    // 加班时间
    let overtime: number = 0;
    addWorkArr.map(v => {
      if (v.click) {
        if (v.num) {
          overtime = v.num;
        }
      }
    })
    // return;
    // return;
    //单位
    let unit;
    company.map(v => {
      if (v.click) {
        unit = v.name;
      }
    })
    // 图片
    let money;
    if (businessType == 3 || (businessType == 2 && type == 2) ){
      money = val.money
    }else{
      money =val.wages
    }
    // 判断按量记录
    let params;
    console.log(businessType,'businessType');
    console.log(type,'213123')
    let types= JSON.parse(JSON.stringify(type));
    if (businessType == 2 && types == 2){
      // unit
      params = {
        money,
        time: data.time,
        type: typeState,
        img_url,
        id,
        // overtime: overtime || 0,
        // work_time: times || 0,
        // work_time_hour: work_time_hour||0,
        note: val.note,
        group_info: items.group_info,
        work_time_type,
        unit,
        unit_num: data.unitNum,
        unit_price: data.unitPrice,
        // wage_money: items.money,
        // wage_overtime: items.day,
        // wage_overtime_money: items.addWork,
        // wage_worktime_define: items.work,
        // wage_overtime_type: items.type,
        // work_time:
      }
    }else{
      params = {
        money,
        time: data.time,
        type: typeState,
        img_url,
        id,
        overtime: overtime || 0,
        work_time: times || 0,
        // work_time_hour: work_time_hour||0,
        note: val.note,
        group_info: items.group_info,
        work_time_type,
        wage_money: items.money,
        wage_overtime: items.day,
        wage_overtime_money: items.addWork,
        wage_worktime_define: items.work,
        wage_overtime_type: items.type,
        // work_time:
      }
    }
    console.log(params,'params');
    // return;
    updateBusinessAction(params).then(res=>{
      if(res.code === 200){
        Msg(res.msg);
        setTimeout(()=>{
          if (typeItem){
            Taro.navigateBack({delta:2});
          }else{
            Taro.navigateBack({ delta: 1 });
          }
          // Taro.redirectTo({
          //   url: '/pages/flowingWater/index'
          // })
        },1000)
      }else{
        Msg(res.msg)
      }
    })
  }
  // 输入框
  const handleInput = (type,e)=>{
    let data = JSON.parse(JSON.stringify(val));
    data[type] = e.detail.value;
    setVal(data);
  }
  // 关闭
  const handleWageStandardDisplay = ()=>{
    setWageStandardDisplay(false);
    setIsdisable(false);
  }
  // 选择单位
  const handleQuantities = (val) => {
    const arr = company.map((v) => {
      if (v.id === val.id) {
        v.click = !v.click
        if (v.click) {
          setUnit(v.name)
          setQuantitiesDisplay(false)
          setIsdisable(false);
        }
      } else {
        v.click = false
      }
      return v;
    })
    setCompany(arr)
  }
  console.log(val,'data')
  // 点击多行
  const handleTextare = () => {
    setAutoFocus(true)
  }
  return (
    <View className='content'>
      {businessType == 2 && 
        <View className='publish-recruit-card'>
          <View className='publish-list-item' onClick={() => { }}>
            <Text className='pulish-list-title'>包工类型</Text>
            <Input
              className='publish-list-input-disabled'
              type='text'
              disabled
              // placeholder='请选择包工类型'
              value={typeName}
            />
          </View>
        </View>
      }
      <View className='publish-recruit-card'>
        <View className='publish-list-item' onClick={() =>{}}>
          <Text className='pulish-list-title'>项目名称</Text>
          <Input
            className='publish-list-input-disabled'
            type='text'
            disabled
            // placeholder='请选择项目名称'
            value={val.name}
          />
        </View>
      </View>
      {identity === 2 && 
        <View className='publish-recruit-card'>
          <View className='publish-list-item' onClick={() => { }}>
            <Text className='pulish-list-title'>班组长</Text>
            <Input
              className='publish-list-input-disabled'
              type='text'
              disabled
              // placeholder='请选择班组长'
              value={val.leaderName}
            />
          </View>
        </View>
      }
      {identity === 1 && 
      <View className='publish-recruit-card'>
        <View className='publish-list-item' onClick={() => { }}>
          <Text className='pulish-list-title'>工人</Text>
          <Input
            className='publish-list-input-disabled'
            type='text'
            disabled
            // placeholder='请选择工人'
            value={val.workername}
          />
        </View>
      </View>
      } 
      <View className='publish-recruit-card'>
        <View className='publish-list-item'>
          <Text className='pulish-list-title'>日期</Text>
          <Input
            className='publish-list-input-disabled'
            type='text'
            disabled
            placeholder='请选择日期'
            value={date}
          />
        </View>
      </View>
      {businessType === 2 && type == 2&& 
      <View>
        <View className='publish-recruit-card'>
          <View className='publish-list-item'>
            <Text className='pulish-list-title'>工程量</Text>
            :<Input
              className='publish-list-input-amount'
              type='digit'
              placeholder='请填写工程量'
              onInput={(e) => { handleInput('unitNum',e)}}
              value={val.unitNum}
            />
            <View className='amountType' onClick={()=>{setIsdisable(true);setQuantitiesDisplay(true)}}>{unit}
              <Image src={`${IMGCDNURL}downIcons.png`} className='downIcons' />
            </View>
          </View>
        </View>
        <View className='publish-recruit-card'>
          <View className='publish-list-item'>
            <Text className='pulish-list-title'>单价</Text>
            :<Input
              className='publish-list-input-color'
              type='digit'
              placeholder='请填写单价'
              onInput={(e) => { handleInput('unitPrice', e) }}
              value={val.unitPrice}
            />
          </View>
        </View>
        <View className='publish-recruit-card'>
          <View className='publish-list-item'>
            <Text className='pulish-list-title'>工钱</Text>
            :<Input
              className='publish-list-input-color'
              type='digit'
              onInput={(e) => { handleInput('money', e) }}
              placeholder='工程量和单价未知时，可直接填写'
              value={val.money}
            />
          </View>
        </View>
      </View>
      }
      {businessType === 3 && 
        <View className='borrowing'>
          <View className='publish-recruit-card'>
            <View className='publish-list-item'>
              <Text className='pulish-list-title'>本次借支</Text>
              <Input
              className='publish-list-input-borrowing'
                type='digit'
                // disabled
                onInput={(e) => { handleInput('money', e) }}
                placeholder='请输入本次借支金额'
                value={val.money}
              />
            </View>
          </View>
          <View className='publish-recruit-card'>
            <View className='borrowing-publish-list-item'>
              <Text className='borrowing-pulish-list-title'>本次借支属于(可不选)</Text>
            </View>
            <View >
              <RadioGroup className='borrowing-Radio'>
                {borrowing.item.map(v => (
                  < Radio onClick={() => handleRadioBorrowing(v)} className='borrowing-Radio-list' color='#0099FF' checked={v.click} key={v.id}>{v.name}</Radio>
                ))}
              </RadioGroup>
            </View>
          </View>
        </View>
      }
      {(businessType === 1 || (businessType === 2 && type === 1)) && 
      <View>
        <View className='publish-recruit-card' onClick={() => {setIsdisable(true);setDisplay(true)}}>
          <View className='publish-list-item'>
            <Text className='pulish-list-title'>上班时长</Text>
            <Input
              className='publish-list-input'
              type='text'
              disabled
              placeholder='请选择上班时长'
              value={val.duration}
            />
            <View className='rightIconsBox'>
              <Image src={`${IMGCDNURL}iconsRIght.png`} className='rightIcons' />
            </View>
          </View>
        </View>
        <View className='publish-recruit-card' onClick={() => {setIsdisable(true);setWageStandardDisplay(true)}}>
          <View className='publish-list-item-money'>
            <View className='pulish-list-title-money'>
              <View>{identity == 1 ? '工人工钱' : '我的工钱'}(点击修改{identity == 1 ? '工人' : '自己'}的工资标准)
                <View className='mt10'>(自动计算)</View> 
              </View>
            </View>
            <Input
              className='publish-list-input-money'
              type='text'
              disabled
              placeholder='请选择工钱'
              value={val.wages}
              // value={'11111111111111'}
            />
            <View className='rightIconsBox'>
              <Image src={`${IMGCDNURL}iconsRIght.png`} className='money-rightIcons' />
            </View>
          </View>
        </View>
      </View>
      }
      <View className='publish-recruit-card'>
        <View className='publish-list-textTarea-item' >
          <Text className='pulish-list-textTarea-title'>备注</Text>
        </View>
        <Textarea
          focus
          autoFocus
          auto-focus
          hidden={isdisable}
          className='textarea'
          cursor={val.note.length||0}
          value={val && val.note}
          placeholder='请填写备注...'
          onInput={(e) => handleInput('note', e)}
          maxlength={400}
          />
      <View className='white'>
      <View className='imageBox'>
        <ImageView images={image.item} max={4} userUploadImg={userUploadImg} userDelImg={userDelImg}/>
        <View className='clear'></View>
      </View>
      </View>
      </View>
      <View className='footer'><View className='footerBtn' onClick={handlesub}>保存</View></View>
      <WageStandard display={wageStandardDisplay} handleClose={handleWageStandardDisplay} wageStandard={wageStandard} handleWageStandard={handleWageStandard} handleAddWage={handleAddWage} handleWageStandardRadio={handleWageStandardRadio}/>
      <WorkOvertime display={display} handleWorkOvertimeClose={handleClose} handleworkOvertime={handleworkOvertime} data={timeArr} dataArr={addWorkArr} handleWorkOvertimeOk={handleWorkOvertimeOk} model={val}/>
      <WorkingHours display={workingHoursDisplay} handleWorkingHoursClose={handleWorkingHoursClose} type={timeType} handleWorkingHours={handleWorkingHours}/>
      {/* 工程量选择单位 */}
      <Quantities display={quantitiesDisplay} handleClose={() => {setIsdisable(false);setQuantitiesDisplay(false)}} data={company} handleQuantities={handleQuantities} />
    </View>
  )
}