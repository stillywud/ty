import { getAction, postAction, putAction, httpAction } from './manage'

/** 获取用户列表 */
export const queryUserInfoByToken = (params) => getAction('/sys/user/getUserSectionInfoByToken', params)

/** 获取用户列表 */
export const getUserList = (params) => getAction('/sys/user/list', params)

/** 查询部门列表 */
export const queryDepartTreeList = (params) => getAction('/sys/sysDepart/queryTreeList', params)

/** 查询字典 */
export const getDictList = (params) => getAction('/sys/dict/list', params)

/** 查询Online表单List */
export const getOnlineFormList = (params) => getAction('/online/cgform/head/list', params)

/** 通过Code查询Online表单字段List */
export const getOnlineFormListByTableNames = (params) => getAction('/online/cgform/head/queryByTableNames', params)

/** 通过ID查询Online表单字段List */
export const getOnlineFormFieldList = (params) => getAction('/online/cgform/field/listByHeadId', params)

/** 通过Code查询Online表单字段List */
export const getOnlineFormFieldListByCode = (params) => getAction('/online/cgform/field/listByHeadCode', params)

/** 通过Code查询Online表单字段List */
export const getQiniuUploadToken = (params) => getAction('/desform/getQiniuUploadToken', params)

const dictCacheMap = {}

/** 通过code获取字典数组 */
export const getDictItems = (params) => {
    // 判断缓存中是否有当前 code 的字典
    if (dictCacheMap[params.code]) {
        console.debug('------- 已从缓存中获取到了字典: ', params.code, dictCacheMap[params.code])
        return Promise.resolve(dictCacheMap[params.code])
    }
    return getAction(`/sys/dict/getDictItems/${params.code}`, params).then(res => {
        if (res.success) {
            dictCacheMap[params.code] = res.result.map(item => ({ value: item.value, label: item.text }))
            return Promise.resolve(dictCacheMap[params.code])
        } else {
            console.error('getDictItems error: : ', res)
            return Promise.resolve([])
        }
    }).catch((res) => {
        console.error('getDictItems error: ', res)
        return Promise.resolve([])
    })
}

const getTransitURL = url => `/sys/common/transitRESTful?url=${encodeURIComponent(url)}`

/* mlist 列表呀*/
const getMlistCardURL = (url,params) => getAction(url, params)
/* mlist 筛选*/
const getMlistFilterURL = (url,params) => getAction(url, params)


export default {
  queryUserInfoByToken,
  getUserList,
  queryDepartTreeList,
  getDictList,
  getOnlineFormList,
  getOnlineFormFieldList,
  getOnlineFormFieldListByCode,
  getQiniuUploadToken,
  getDictItems,
  getOnlineFormListByTableNames,
  /** 后台中转HTTP请求 */
  transitRESTful: {
    get: (url, parameter) => getAction(getTransitURL(url), parameter),
    post: (url, parameter) => postAction(getTransitURL(url), parameter),
    put: (url, parameter) => putAction(getTransitURL(url), parameter),
    http: (url, parameter) => httpAction(getTransitURL(url), parameter),
  },
  getMlistCardURL,
  getMlistFilterURL
}