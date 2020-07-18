// 区分正式还是测试
import { REQUESTURL } from '../../config'

// 测试
export const jobRecommendListUrl: string = REQUESTURL + '/job/job-recommend-list/'

// 获取用户session_key
export const GetUserSessionKey: string = REQUESTURL + 'user/user-info/'
// 获取登陆账户
export const GetUserInfo: string = REQUESTURL + 'bk-member/member-auth/'
// 首页
export const bkIndexUrl: string = REQUESTURL +'bk-index/index/'
//流水列表
//授权时token验证并创建用户
export const bkMemberAuthUrl: string = REQUESTURL + '/bk-member/auth/'
// 添加意见反馈
export const bkAddFeedbackUrl: string = REQUESTURL + 'bk-feedback/add-feedback/'
// 新增记事本
export const bkAddNotepadUrl: string = REQUESTURL + '/bk-notepad/add-notepad/'
// 获取记事本记录
export const bkGetNotePadUrl: string = REQUESTURL + 'bk-notepad/get-note-pad/'
// 删除记事本
export const bkDeleteNotePadUrl: string = REQUESTURL + 'bk-notepad/delete-note-pad/'
// 修改
export const bkUpdateNotePadUrl: string = REQUESTURL + '/bk-notepad/update-note-pad/'
// 流水
export const bkBusinessUrl: string = REQUESTURL + '/bk-bookkeeping/get-bk-business/'
// 项目列表
export const bkGetProjectTeamUrl: string = REQUESTURL +'bk-project-team/get-project-team/'
// 添加项目班组
export const bkAddProjectTeamUrl: string = REQUESTURL + '/bk-project-team/add-project-team/'
// 添加工人
export const bkAddWorkerUrl: string = REQUESTURL + '/bk-worker/add-worker/'
// 获取工人
export const bkGetWorkerUrl: string = REQUESTURL + 'bk-worker/get-workers/'
// 删除工人
export const bkDeleteRroupWorkerUrl: string = REQUESTURL + '/bk-worker/delete-group-worker/'
// excel数据
export const bkgetExcelDataUrl: string = REQUESTURL + '/bk-bookkeeping/get-excel-data/'
// 导出excel数据
export const bkShareExcelurl: string = REQUESTURL + '/bk-bookkeeping/share-excel/'
// 记工点工
export const bkAddBusinessUrl: string = REQUESTURL + 'bk-bookkeeping/add-business/'
// 工资标准列表
export const bkWageStandGetWageUrl: string = REQUESTURL + 'bk-wage-stand/get-wage/'
// 添加工资标准
export const bkAddWageUrl: string = REQUESTURL + 'bk-wage-stand/add-wage/'
// 获取已经设置工资标准
export const bkGetWorkerWageUrl: string = REQUESTURL  + 'bk-worker/get-worker-wage/';
// 流水删除
export const bkDeleteBusinessUrl: string = REQUESTURL + 'bk-bookkeeping/delete-business/'
//修改工资标准
export const bkUpdateWorkerUrl: string = REQUESTURL +  'bk-worker/update-worker/'
// 删除项目组
export const bkDeleteprojectTeamUrl: string = REQUESTURL + 'bk-project-team/delete-project-team/'
// 修改项目组
export const bkUpdateProjectTeamUrl: string = REQUESTURL + 'bk-project-team/update-project-team/'
// 给工人增加标准
export const bkSetWorkerMoneyByWageUrl = REQUESTURL + '/bk-worker/set-worker-money-by-wage/'
// 修改工资标准
export const bkupdateWageUrl = REQUESTURL + 'bk-wage-stand/update-wage/'
// 获取单个流水
export const bkBusinessOneUrl = REQUESTURL + 'bk-bookkeeping/get-bk-business-one/'
// 修改记工
export const updateBusinessUrl = REQUESTURL + '/bk-bookkeeping/update-business/'
// 给组里天加工人
export const bkAddWorkerInGroupUrl = REQUESTURL + '/bk-worker/add-worker-in-group/'
// 分享获取考勤表
export const bkGetShareExcelDataUrl = REQUESTURL + '/bk-bookkeeping/get-share-excel-data';
// 验证码
export const bkGetCodeUrl = REQUESTURL + 'bk-index/get-code/'
// 设置班组长
export const bkSetGroupLeaderUrl = REQUESTURL +'/bk-project-team/set-group-leader/'
// 云彩
export const bkUpdateBusinessNewUrl = REQUESTURL +'/bk-bookkeeping/update-business-new/'
// 工人身份设置自己的工资标准
export const bkSetWorkerIdentityWageUrl = REQUESTURL +'bk-worker/set-worker-identity-wage/'