import * as axios from './manage'

const urlBefore = '/desform/auth'

function action(method, url, params = {}) {
  if (window.desformCode) {
    params['desformId'] = window.desformId
    params['desformCode'] = window.desformCode

    url = url.replace(/{id}/g, window.desformId)
    url = url.replace(/{code}/g, window.desformCode)

    return axios.httpAction(urlBefore + url, params, method)
  }
  return Promise.resolve(null)
}

/** 根据desformCode查询 */
export const queryByDesformCode = (params => action('GET', '/query/{code}', params))

/** 添加一个 */
export const addAuth = (params => action('POST', '/addAuth', params))

/** 批量修改 */
export const updateBatch = (auths => action('POST', '/updateBatch', auths))

/** 根据 comKey 删除 */
export const deleteByComKey = (authComKey => action('DELETE', '/deleteByComKey', { authComKey }))

/** 根据 comKey 批量删除 */
export const deleteByComKeyBatch = (authComKeys => action('DELETE', `/deleteBatchByAuthComKey?desformCode={code}&authComKeys=${authComKeys}`))

/** 根据 username 查询用户信息以及所拥有的部门 */
export const queryUser = (username => action('GET', `/queryUser/${username}`))

/** 根据 username 查询用户信息以及所拥有的部门 */
export const queryUserByToken = (token => action('GET', `/queryUserByToken?token=${token}`))
