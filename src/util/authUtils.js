function hasValue(authItem, valueArray) {
  if (authItem && valueArray.length >= 1) {
    let scopes = authItem.split(',')
    for (let scope of scopes) {
      for (let value of valueArray) {
        if (scope === value) {
          return true
        }
      }
    }
  }
  return null
}

function checkUserAuth(auth, authUserInfo, userHasAuth) {
  let temp = hasValue(auth['authScopeUsersVal'], [authUserInfo.userInfo.username])
  return temp === null ? userHasAuth : temp
}

function checkDepartAuth(auth, authUserInfo, userHasAuth) {
  let temp = hasValue(auth['authScopeDepartsVal'], authUserInfo.departs || [])
  return temp === null ? userHasAuth : temp
}

function checkRoleAuth(auth, authUserInfo, userHasAuth) {
  let temp = hasValue(auth['authScopeRolesVal'], authUserInfo.roles || [])
  return temp === null ? userHasAuth : temp
}

/**
 * 判断组件的权限，自动将禁用的组件禁用
 * @param element
 * @param authObject
 * @returns {boolean}
 */
export function checkElementAuth(element, authObject) {
  let { authUserInfo, authsMap } = authObject
  // 取出当前组件的权限配置信息
  let auths = authsMap[element.key]
  let isHidden = false
  if (auths && authUserInfo) {
    for (let auth of auths) {
      /* 判断该用户是否被存在被控范围 */
      let userHasAuth = false

      // 判断是否针对所有人授权
      if (auth['authScopeIsAll'] === 'Y') {
        userHasAuth = true
      }

      // 判断用户名是否匹配
      if (!userHasAuth) {
        userHasAuth = checkUserAuth(auth, authUserInfo, userHasAuth)
      }

      // 判断部门是否匹配
      if (!userHasAuth) {
        userHasAuth = checkDepartAuth(auth, authUserInfo, userHasAuth)
      }

      // 判断角色是否匹配
      if (!userHasAuth) {
        userHasAuth = checkRoleAuth(auth, authUserInfo, userHasAuth)
      }

      /* 判断该用户的权限 */

      let { authType } = auth
      if (authType === '1') { // 可见/可访问(授权后可见/可访问)
        isHidden = !userHasAuth
      } else if (authType === '2') { // 可编辑(未授权时禁用)
        element.options.disabled = !userHasAuth
      }
    }
  }
  return isHidden
}

/**
 * 获取 AuthObject
 * @param subTable 是否获取子表内的权限，默认false
 * @returns {Promise<any>}
 */
export function getAuthObject(subTable = false) {
  return new Promise((resolve, reject) => {
    const handler = () => {
      let authsMap = window['__authsMap']
      let authUserInfo = window['__authUserInfo']
      if (authsMap && authUserInfo) {
        let filterAuthsMap = {}
        for (let key in authsMap) {
          if (authsMap.hasOwnProperty(key)) {
            let item = authsMap[key]
            if (item[0].subTable === subTable) {
              filterAuthsMap[key] = item
            }
          }
        }
        resolve({ authsMap: filterAuthsMap, authUserInfo })
        clearInterval(timer)
      }
    }
    let timer = setInterval(handler, 100)
    handler()
  })
}