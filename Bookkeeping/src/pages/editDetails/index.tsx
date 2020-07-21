import Taro, { useState,useRouter,useEffect} from '@tarojs/taro'
import ImageView from '../../components/imageview';
import UploadImgAction from '../../utils/upload'
import { bkBusinessOneAction, updateBusinessAction, bkSetWorkerIdentityWageAction } from '../../utils/request/index';
import { View, Text, Input, Textarea, RadioGroup, Radio } from '@tarojs/components';
import WageStandard  from '../../components/wageStandard'
import Msg from '../../utils/msg'
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
  const { id } = router.params;
  // 班组长还是工人
  const [identity, setIdentity] = useState<number>(1)
  // 图片
  const [image, setImage] = useState<ImageDataType>({
    item: [],
  })
  // 类型
  const [businessType, setBusinessType] = useState<number>(1);
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
  // 上班时长
  const [timeArr, setTimeArr] = useState<DataType[]>([
    { id: 1, name: '一个工', click: false, num: 1 },
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
      { id: 1, name: '按小时计算', click: false },
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
  useEffect(()=>{
    console.log(id,'xxxx')
    if(id){
      bkBusinessOneAction({ id }).then(res => {
        if(res.code === 200){
          const data = JSON.parse(JSON.stringify(wageStandard));
          const obj = JSON.parse(JSON.stringify(val));
          const standardObj = JSON.parse(JSON.stringify(standard));
          // setType((parseInt(res.data.type)));
          setBusinessType(parseInt(res.data.business_type));
          setIdentity(parseInt(res.data.identity));
          setImage({ item: res.data.view_images })
          obj.name = res.data.group_info_name;
          obj.note = res.data.note;
          obj.workername = res.data.workername;
          obj.leaderName = res.data.workername;
          // 这里是工要获取到多少工资标里的设置的时间再算
          const duration = res.data.work_time + '个工' + res.data.overtime+'小时'
          obj.duration = duration;
          obj.money = res.data.money;
          const newData = new Date();
          const newTime = newData.getFullYear() + '-' + addZero(newData.getMonth() + 1) + '-' + addZero(newData.getDate())+'（今天）';
          obj.time = newTime;
          data.work = res.data.worktime_define;
          data.addWork = res.data.overtime_money;
          data.money = res.data.worker_money;
          data.day = res.data.overtime;
          if (parseInt(res.data.money) && parseInt(res.data.overtime)){
            data.dayAddWork = parseInt(res.data.money) / parseInt(res.data.overtime)||0;
          }else{
            data.dayAddWork =0
          }
          data.type = parseInt(res.data.overtime_type);
          console.log(data.type,'xxxx111')
          for (let i = 0; i < data.data.length;i++){
          if (data.data[i].id == res.data.overtime_type){
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
          obj.wages = wages;
          obj.unitNum = res.data.unit_num;
          obj.unitPrice = res.data.unit_price;
          obj.unit = res.data.unit;
          setVal(obj);
          console.log(data,'3213213')
          setWageStandard(data)
          // 设置数据上班时长数据
          const timeArrData = JSON.parse(JSON.stringify(timeArr));
          // 判读返回的值
          for(let i =0;i<timeArrData.length;i++){
            // if ((+res.data.work_time) === timeArrData[i].num ){
            //   timeArrData[i].click = true
            // }else{
              // 返回的是工为单位的 小时为单位的数据
            const setTime = ((+res.data.worktime_define) / (1 / (+res.data.work_time))).toFixed(1)
              console.log(setTime,'setTime')
              const obj = { id: 4, name: `${setTime}小时`, click: true, num: setTime };
              const index = [timeArrData.length-1];
              if(i === index[0]){
                timeArrData[i] = obj;
              }
            // }
          }
          console.log(timeArrData,'timeArrData')
          setTimeArr(timeArrData)
          // 修改加班时长数据
          const addWorkArrData = JSON.parse(JSON.stringify(addWorkArr));
          for(let i =0;i<addWorkArrData.length;i++){
            if (res.data.overtime === '0.00'){
              addWorkArrData[0].click = true;
            }else{
              const obj = { id: 2, name: `${res.data.overtime}小时`, click: true, num: res.data.overtime };
              console.log(obj);
              console.log(res.data.overtime,'overtime')
              const index = [addWorkArrData.length - 1];
              if (i === index[0]) {
                addWorkArrData[i] = obj;
              }
            }
            // if(res.data.overtime === addWorkArrData[i].num){
            //   addWorkArrData[i].click = true;
            // }
          }
          console.log(addWorkArrData,'toFixed')
          setAddWorkArr(addWorkArrData);
          // data.dayAddWork = res.data.
          if(res.data.business_type === '1'){
            // setTypeName('点工')
            Taro.setNavigationBarTitle({
              title:'点工'
            })
          } else if (res.data.business_type === '2'){
            // setTypeName('包工')
            if(res.data.type === '1'){
              setTypeName('按天记')
              Taro.setNavigationBarTitle({
                title: '包工按天计'
              })
            }else{
              setTypeName('按量记')
              Taro.setNavigationBarTitle({
                title: '包工按量计'
              })
            }
          } else if (res.data.business_type === '3'){
            Taro.setNavigationBarTitle({
              title: '借支'
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
    console.log(v)
    const data = JSON.parse(JSON.stringify(borrowing.item));
    for(let i =0;i<data.length;i++){
      if(v.id = data[i].id){
        data[i].click = true;
      }
    }
    setBorrowing(data);
  }
  // 关闭
  const handleClose = ()=>{
    setDisplay(false);
  }
  // 输入框
  const handleWageStandard = (type,e)=>{
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
        Msg('一个工必须大于0小时')
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
    let addTime:number = 0;
    for (let i = 0; i < addWorkArrs.length; i++) {
      if (addWorkArrs[i].click) {
        addTime = addWorkArrs[i].num
      }
    }
    //工资标准 每个工多少钱/上班标准 * 上班时长  判断加班是按小时算还是i按天算
    let total = 0;
    console.log(moneyNum,'moneyNum')
    console.log(workNum, 'workNum')
    console.log(time, 'time')
    console.log(addWorkNum,'addWorkNum')
    console.log(addTime, 'moneyNum')
    console.log(dayNum, 'dayNum')
    if (data.type === 1) {
      // 按小时算 加班小时* 模板加班金额
      total = (parseInt(moneyNum)||0 / parseInt(workNum))||0 * time + parseInt(addWorkNum)||0 * addTime;
      console.log(total,'total')
    } else {
      // 按天算 每个工多少钱/模板定义的多少小时算一个工 * 加班时长
      total = parseInt(moneyNum)||0 / parseInt(workNum)||0 * time  + (parseInt(moneyNum)||0 / parseInt(dayNum)||0 * addTime);
      console.log(total,'total1')
    }
    // const num = total.toFixed(2);
    let num: any = 0;
    // if (num && !Object.is(num, NaN)){
    num = total.toFixed(2);
    console.log(num)
    setVal({ ...valData, wages:num})
    setWageStandardDisplay(false);
    let params = {
      identity: identity,
      worktime_define: data.work,
      overtime_type: data.type,
      overtime_money: data.dayAddWork,
      money: data.money,
      overtime: data.day,
      group_info: data.group_info,
    }
    bkSetWorkerIdentityWageAction(params).then(res => {
      if (res.code !== 200) {
        Msg(res.msg)
      }
    })
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
  console.log(identity,'identity')
  const handleworkOvertime = (type: number, val: any) => {
    setTimeType(type)
    if (type === 1) {
      if (val.id === 4) {
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
      } else {
        const arr = timeArr.map(v => {
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
    } else {
      if (val.id != 2) {
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
      } else {
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
  // 确认时间选择
  const handleWorkOvertimeOk = ()=>{
    const data: any = timeArr.filter(v => v.click);
    const dataList: any = addWorkArr.filter(v => v.click);
    const item = JSON.parse(JSON.stringify(wageStandard));
    console.log(item);
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
    const standardObj = JSON.parse(JSON.stringify(standard));
    // console.log(standardObj,'xxx')
    let wages;
    // 计算
    // console.log(standardObj.money);
    // console.log(standardObj.worktime_define);
    // console.log(standardObj.work_time);
    // console.log()
    if (item.type  == '1'){
      wages = (parseInt(standardObj.money)||0 / parseInt(standardObj.worktime_define)||0 * parseInt(standardObj.work_time))||0 + parseInt(standardObj.worker_overtime)||0 * parseInt(standardObj.overtime_money)||0
    }else{
      wages = (parseInt(standardObj.money)||0 / parseInt(standardObj.worktime_define)||0 * parseInt(standardObj.work_time))||0 + ((parseInt(standardObj.money)||0 / parseInt(standardObj.worker_overtime))||0 * parseInt(standardObj.overtime))||0
    }
    setVal({ ...val, duration: title,wages: wages })
    setDisplay(false);
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
        }
        return v;
      })
      setTimeArr(data);
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
    }
    setWorkingHoursDisplay(false);
    setWorkOvertimeDisplay(true);
  }
  // 保存
  const handlesub = ()=>{
    const data = JSON.parse(JSON.stringify(val));
    const businessTypes = JSON.parse(JSON.stringify(businessType));
    const borrowingArr = JSON.parse(JSON.stringify(borrowing.item))
    let img_url: string[] = image.item.map(item => item.url);
    // 借支的时候radio
    // 
    console.log(businessTypes,'businessTypes')
    console.log(borrowingArr,'borrowingArr');
    let type;
    if (businessTypes == 3){
      console.log(32132131)
      for (let i = 0; i < borrowingArr.length;i++){
        console.log(borrowingArr[i],'111')
        if(borrowingArr[i].click){
          console.log(borrowingArr[i].id,'x')
          type = borrowingArr[i].id
        }
      }
    }else{
      type = businessTypes;
    }
    console.log(type,'type')
    // 工资标准
    // const Item = JSON.parse(JSON.stringify(wageStandard));
    // 时间
    console.log(val,'val')
    console.log(timeArr,'timaeArr')
    console.log(addWorkArr,'addWorkArr')
    let times: number = 0, work_time_hour = 0;
    timeArr.map(v => {
      if (v.click) {
        if (v.num) {
          if (v.id !== 4) {
            times = v.num;
            work_time_hour = data.work * v.num;
          } else {
            console.log(data.work);
            console.log(v.num);
            times = 1 / data.work * v.num;
            work_time_hour = v.num;
          }
        }
      }
    })
    // 加班时间
    let overtime: number = 0;
    addWorkArr.map(v => {
      if (v.click) {
        if (v.num) {
          overtime = v.num;
        }
      }
    })
    console.log(times, work_time_hour, overtime);
    // return;
    // 图片
    let params = {
      money: data.money,
      time:data.time,
      type,
      img_url,
      id,
      overtime: overtime||0,
      work_time: times||0,
      work_time_hour: work_time_hour||0,
      note: val.note,
    }
    updateBusinessAction(params).then(res=>{
      console.log(res);
      if(res.code === 200){
        Msg(res.msg);
        setTimeout(()=>{
          Taro.navigateBack({delta:2});
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
  }
  return (
    <View className='content'>
      {businessType == 2 &&type === 1 && 
        <View className='publish-recruit-card'>
          <View className='publish-list-item' onClick={() => { }}>
            <Text className='pulish-list-title'>包工类型</Text>
            <Input
              className='publish-list-input-disabled'
              type='text'
              disabled
              placeholder='请选择包工类型'
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
            placeholder='请选择项目名称'
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
              placeholder='请选择班组长'
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
            placeholder='请选择工人'
            value={val.workername}
          />
        </View>
      </View>
      } 
      {businessType === 2 && type === 2&& 
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
            <View className='amountType' onClick={() =>{}}>{unit}</View>
          </View>
        </View>
        <View className='publish-recruit-card'>
          <View className='publish-list-item'>
            <Text className='pulish-list-title'>单价</Text>
            :<Input
              className='publish-list-input'
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
              className='publish-list-input'
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
              :<Input
                className='publish-list-input'
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
        <View className='publish-recruit-card'>
          <View className='publish-list-item'>
            <Text className='pulish-list-title'>日期</Text>
            <Input
              className='publish-list-input-disabled'
              type='text'
              disabled
              placeholder='请选择日期'
              value={val.time}
            />
          </View>
        </View>
        <View className='publish-recruit-card' onClick={() => {setDisplay(true)}}>
          <View className='publish-list-item'>
            <Text className='pulish-list-title'>上班时长</Text>
            <Input
              className='publish-list-input'
              type='text'
              disabled
              placeholder='请选择上班时长'
              value={val.duration}
            />
          </View>
        </View>
        <View className='publish-recruit-card' onClick={() => { setWageStandardDisplay(true)}}>
          <View className='publish-list-item-money'>
            <View className='pulish-list-title-money'>
              <View>工人工钱
                <View className='mt10'>(自动计算)</View> 
              </View>
            </View>
            <Input
              className='publish-list-input'
              type='text'
              disabled
              placeholder='请选择工钱'
              value={val.wages}
            />
          </View>
        </View>
      </View>
      }
      <View className='publish-recruit-card'>
        <View className='publish-list-textTarea-item' onClick={() => { }}>
          <Text className='pulish-list-textTarea-title'>备注</Text>
          <Textarea 
            value={val.note}
            placeholder='请填写备注...'
            onInput={(e) => handleInput('note', e)}
            maxlength={400}
            />
          <ImageView images={image.item} max={4} userUploadImg={userUploadImg} userDelImg={userDelImg}/>
        </View>
      </View>
      <View className='footer'><View className='footerBtn' onClick={handlesub}>保存</View></View>
      <WageStandard display={wageStandardDisplay} handleClose={handleWageStandardDisplay} wageStandard={wageStandard} handleWageStandard={handleWageStandard} handleAddWage={handleAddWage} handleWageStandardRadio={handleWageStandardRadio}/>
      <WorkOvertime display={display} handleWorkOvertimeClose={handleClose} handleworkOvertime={handleworkOvertime} data={timeArr} dataArr={addWorkArr} handleWorkOvertimeOk={handleWorkOvertimeOk} model={val}/>
      <WorkingHours display={workingHoursDisplay} handleWorkingHoursClose={handleWorkingHoursClose} type={timeType} handleWorkingHours={handleWorkingHours}/>
    </View>
  )
}