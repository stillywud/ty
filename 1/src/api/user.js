import {axios} from '@/utils/request'

const api = {
    queryAllsys: '/system/sysInfo/queryAll',
    queryUserRole: 'sys/user/queryUserRole',
    getUserBelongDepartsList: 'sys/user/getUserBelongDepartsList',
    querySysOrganization: '/system/sysOrganization/queryAll',
    querySysOrganizationAll: '/system/sysOrganization/queryAll1',
    listByParentId: '/sys/sysDepart/listByParentId',
    userDepartList: 'sys/user/userDepartList',
    checkPwdStrength: 'sys/user/checkPwdStrength',
    onlinecgformList:'online/cgform/api/getData/54a264605fd44b1388b60dfe141a4754',
    queryByOrgCodeForAddressList:'/sys/user/queryByOrgCodeForAddressList',
    onlinecgformList1:'online/cgform/api/form/54a264605fd44b1388b60dfe141a4754/',
    onlinecgreportList:'online/cgreport/api/getColumnsAndData/1330059248264167426'
}

// // 部门分配反显list
export function queryAllsys() {
    return axios({
        url: api.queryAllsys,
        method: 'get'
    })
}

//角色反显
export function queryUserRole(userid) {
    return axios({
        url: api.queryUserRole + '?userid=' + userid,
        method: 'get'
    })
}

// 部门反显
export function userDepartList(userId) {
    return axios({
        url: api.userDepartList + '?userId=' + userId,
        method: 'get'
    })
}

//所属部门返显
export function getUserBelongDepartsList(userid) {
    return axios({
        url: api.getUserBelongDepartsList + '?userId=' + userid,
        method: 'get'
    })
}

// 部门分配
export function querySysOrganization() {
    return axios({
        url: api.querySysOrganization,
        method: 'get'
    })
}// 部门all
export function querySysOrganizationAll() {
    return axios({
        url: api.querySysOrganizationAll,
        method: 'get'
    })
}


// 部门选择加载
export function listByParentId(id) {
    return axios({
        url: api.listByParentId + '?id=' + id,
        method: 'get'
    })
}

// 判断密码简单程度
export function checkPwdStrength(pwd) {
    return axios({
        url: api.checkPwdStrength + '?pwd=' + pwd,
        method: 'get'
    })
}

// 获取技术类型
export function onlinecgformList() {
    return axios({
        url: api.onlinecgformList + '?column=createTime&order=desc&pageNo=1&pageSize=20&superQueryMatchType=end',
        method: 'get'
    })
}

// 根据部门获取部门人员
export function queryByOrgCodeForAddressList(parameter) {
    return axios({
        url: api.queryByOrgCodeForAddressList,
        method: 'get',
        params: parameter
    })
}

// 根据技术类型获取人员
export function onlinecgformList1(id) {
    return axios({
        url: `${api.onlinecgformList1}${id}`,
        method: 'get',
    })
}

// 根据技术类型获取人员2
export function onlinecgreportList(parameter) {
    return axios({
        url: api.onlinecgreportList,
        method: 'get',
        params: parameter
    })
}

