import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/manage'

const submitAuditInfo = (params) => postAction('/workflow/auditInfo/submitAuditInfo', params)
const querySend = (params) => postAction('/workflow/auditInfo/querySend', params)
const queryAt = (params) => postAction('/workflow/auditInfo/queryAt', params)
const queryAuditInfoDetail = (params) => postAction('/workflow/auditInfo/queryAuditInfoDetail', params)
const queryApplyList = (params) => postAction('/workflow/auditInfo/queryApplyList', params)
const auditAuditInfo = (params) => postAction('/workflow/auditInfo/auditAuditInfo', params)

//选择单据列表
const  auditRegisterList = (params) => getAction('/auditRegister/auditRegister/list', params)
//转办
const transAuditInfo = (params) => postAction('/workflow/auditInfo/transAuditInfo',params)

const comAuditInfo = (params) => postAction('/workflow/auditInfo/comAuditInfo', params)
//未处理
const queryAuditingList = (params) => postAction('/workflow/auditInfo/queryAuditingList', params)
//已处理
const queryAuditedList = (params) => postAction('/workflow/auditInfo/queryAuditedList', params)
//根据类型获取单据列表
const queryByCode = (params) => getAction('/workflow/auditInfo/queryByCode', params)
//获取类型列表
const queryType = (params) => getAction('/workflow/auditInfo/queryType', params)
export {
  submitAuditInfo,
  querySend,
  queryAt,
  queryAuditInfoDetail,
  queryApplyList,
  auditAuditInfo,
  auditRegisterList,
  transAuditInfo,
  comAuditInfo,
  queryAuditingList,
  queryAuditedList,
  queryByCode,
  queryType
}