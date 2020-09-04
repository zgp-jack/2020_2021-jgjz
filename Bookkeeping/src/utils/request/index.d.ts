export interface Result {
  code: number,
  msg: string
}

export interface ResultData<T> extends Result {
  data: T
}
// 获取code
export interface SessionKey {
  openid: string,
  session_key: string,
  unionid: string
}
// 获取用户信息
export interface InitUserInfo extends Result{
  data: InitUserInfoData,
  errcode:string,
  errmsg:string,
  show_type?:string
}

export interface InitUserInfoData {
  id: number,
  headimgurl: string,
  nickname: string,
  username: string,
  uuid: string,
  sign: InitUserInfoSign
  yupao_id?:any
  worker_id?:any
  worker_name?:any
}

interface InitUserInfoSign {
  token: string,
  time: number
}

// 首页
export interface bkIndexType extends Result {
  data: bkIndexTypeData,
}
export interface bkIndexTypeData {
  amount: { 
    type: number, 
    unit_num:string,
    count:number,
    unit:string,
  }
  borrow: string,
  business_list: bkIndexTypeDataList,
  money: string
  overtime: number
  work_time: number,
  count_is_new:string,
  earliest_month:string,
  this_year_business_month?:string,
  setLasted_business_identity:number,
  lasted_business_identity:string,
}

export interface bkIndexTypeDataList {
  code: number,
  msg: string,
  data: any
}

// 记事本列表
export interface bkGetNotePadType extends Result{
  data: bkGetNotePadTypeData[]
}
export interface bkGetNotePadTypeData{
  id: string
  note: string,
  created_by: string,
  created_time: number,
  updated_time: string,
  img: string,
  time?:any,
  week?:string,
  creatTime?:string,
  click?:boolean,
  created_time_string:string,
}

// 流水列表
export interface bkBusinessType extends Result {
  data: bkBusinessTypeDataItem
}
export interface bkBusinessTypeDataItem {
  data: bkBusinessTypeData[],
  first_business_month: string
}
export interface bkBusinessTypeData {
  click:boolean,
  arr: bkBusinessTypeDataList[],
  time:string,
  week:string,
  month: string,
  day: string,
  total_borrow:number,
  total_money:number,
}
export interface bkBusinessTypeDataList {
  id: string,
  business_type: string
  created_by: string
  created_time: string
  group_info: string
  group_leader: string
  identity: string
  img_url: string
  is_deleted: string
  money: string
  note: string
  overtime: string
  str_created_time: string
  time: string
  type: string
  work_time: string
  worker_id: string
}

// 授权时token验证返沪数据
export interface bkMemberAuth extends Result {
  data: any
}


// 项目列表
export interface bkGetProjectTeam extends Result {
  data: bkGetProjectTeamData[]
}
export interface bkGetProjectTeamData {
  // child: bkGetProjectTeamDataChild[],
  // created_by: string
  // created_time: string
  // group_leader: string
  // id: string
  // is_deleted: string
  // name: string
  // pid: string,
  // click:boolean
  id: string,
  name: string,
  pid: string,
  group_leader: string,
  created_by: string,
  created_time: string,
  updated_time: string,
  identity: string,
  is_deleted: string,
  leader_name: string,
  group_name: string,
  group_id: string,
  click:boolean,
  group_info:string,
}
export interface bkGetProjectTeamDataChild{
  created_by: string
  created_time: string
  group_leader: string
  id: string
  is_deleted:  string
  name: string
  pid: string
  leader_name:string,
}

// 新增项目
export interface bkAddProjectTeam extends Result {
  data:{
    group_info:string,
    group_name:string,
    team_name:string,
    all_group:{
      data:any[];
    }
  }
}

// 考勤表
export interface bkgetExcelDataType extends Result {
  data:any[]
}

// 流水详情
export interface bkBusinessOneType extends Result{
  data:{
    business_type:string
    created_by: string
    created_time: string
    group_info: string
    group_leader: string
    id: string
    identity: string
    img_url: string
    is_deleted: string
    money: string
    note: string
    overtime: string
    time: string
    type: string
    unit: string
    unit_num: string
    unit_price: string
    updated_time: string
    wage_standard_id: string
    work_time: string
    worker_id: string,
    view_images:any[],
    group_info_name:string,
    worktime_define: string,
    overtime_type: string,
    overtime_money: string,
    worker_money: string,
    workername: string,
    leaderName: string,
    leader_name:string,
    worker_overtime:string,
    wage_money: string,
    wage_overtime: string,
    wage_overtime_money: string,
    wage_overtime_type: string,
    wage_worktime_define: string,
    work_time_hour:string,
    typeDes?:string,
    addTime?:any
  }
}

//工资标准模板
export interface bkWageStandGetWage extends Result{
  data:any[]
}

// 人员
export interface bkGetWorker extends Result{
  show_type?:string,
  data:any;
}

// 考勤表
export interface bkgetExcelData extends Result{
  data: bkgetExcelDataList[],
  month: string
}
interface bkgetExcelDataList {
  amount: bkgetExcelDataListArr[],
  borrow: bkgetExcelDataListArr[],
  hour: bkgetExcelDataListArr[],
  id:number,
  name:string,
  work: bkgetExcelDataListArr[]
}
interface bkgetExcelDataListArr {
  date:string,
  total:any,
  date_num:string,
  list:any[]
}
// 验证码
export interface bkGetCode extends Result {
  errcode: string,
  errmsg: string,
  refresh: number
}

// 记工
export interface getBookkeepingData extends Result{
  data: any,
  time:string,
}
// 选择班组
export interface GetChooseGroupInfo extends Result{
  data:{
    group_worker_has_business:{
      days:any[],
      worker:any[]
    },
    group_workers:any[],
    group_workers_has_wage:any[],
  }
}