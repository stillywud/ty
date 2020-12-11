import {axios} from '@/utils/request'

const api = {
    queryAllsys: '/system/sysInfo/queryAll',
    queryUserRole: 'sys/user/queryUserRole',
    getUserBelongDepartsList: 'sys/user/getUserBelongDepartsList',
    querySysOrganization: '/system/sysOrganization/queryAll',
    querySysOrganizationAll: '/system/sysOrganization/queryAll1',
    listByParentId: '/sys/sysDepart/listByParentId',
    userDepartList: 'sys/user/userDepartList',
    checkPwdStrength: 'sys/user/checkPwdStrength'
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
