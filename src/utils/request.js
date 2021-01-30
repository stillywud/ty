import Vue from 'vue'
import router from '@/router'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import { Modal, notification } from 'ant-design-vue'
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_NAME, USER_INFO } from '@/store/mutation-types'

/**
 * 【指定 axios的 baseURL】
 * 如果手工指定 baseURL: '/jeecg-boot'
 * 则映射后端域名，通过 vue.config.js
 * @type {*|string}
 */
let apiBaseUrl = window._CONFIG['domianURL'] || '/jeecg-boot'
let modelNums = 0;

// 创建 axios 实例
const service = axios.create({
  baseURL: apiBaseUrl, // api base_url
  timeout: 20000 // 请求超时时间
})

const err = error => {
  if (error.response) {
    let data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    const refreshToken = Vue.ls.get(REFRESH_TOKEN)
    const username = Vue.ls.get(USER_NAME)

    console.log('------异常响应------', token)
    console.log('------异常响应------', error.response.status)
    switch (error.response.status) {
      case 403:
        notification.error({ message: '系统提示', description: '拒绝访问', duration: 4 })
        break
      case 500:
        if (token && data.message == 'Token失效，请重新登录') {
          Modal.error({
            title: '登录已过期',
            content: '很抱歉，登录已过期，请重新登录',
            okText: '重新登录',
            mask: false,
            onOk: () => {
              store.dispatch('Logout').then(() => {
                Vue.ls.remove(ACCESS_TOKEN)
                window.location.reload()
              })
            }
          })
        }
        break
      case 404:
        notification.error({ message: '系统提示', description: '很抱歉，资源未找到!', duration: 4 })
        break
      case 504:
        notification.error({ message: '系统提示', description: '网络超时' })
        break
      case 401:
        // notification.error({ message: '系统提示', description: '未授权，请重新登录', duration: 4 })
        if (modelNums == 0) {
          modelNums++
          if (refreshToken) {
            let param = { username: username, refreshToken: refreshToken }
            store
              .dispatch('TokenRefresh', param)
              .catch(() => {
                // 刷新token失败-》登陆页
                Vue.ls.clear()
                router.push('/user/login')
              })
              .finally(() => {
                setTimeout(() => {
                  modelNums--
                }, 4000)
              })
          } else {
            Modal.error({
              title: '登录已过期',
              content: '很抱歉，登录已过期，请重新登录',
              okText: '重新登录',
              mask: false,
              onOk: () => {
                store
                  .dispatch('Logout')
                  .finally(() => {
                    // 登出无论失败还是成功-》登陆页
                    Vue.ls.clear()
                    router.push('/user/login')
                    modelNums--
                  })
              }
            })
          }
        }
        // if (token && refreshToken) {
          // .then((res) => {
          // }).catch((e) => {
          //   Modal.error({
          //     title: '登录已过期',
          //     content: '很抱歉，登录已过期，请重新登录',
          //     okText: '重新登录',
          //     mask: false,
          //     onOk: () => {
          //       store.dispatch('Logout').then(() => {
          //         Vue.ls.remove(ACCESS_TOKEN)
          //         window.location.reload()
          //       })
          //     }
          //   })
          // })
        // }else{
        //   Modal.error({
        //     title: '登录已过期',
        //     content: '很抱歉，登录已过期，请重新登录',
        //     okText: '重新登录',
        //     mask: false,
        //     onOk: () => {
        //       store.dispatch('Logout').then(() => {
        //         Vue.ls.remove(ACCESS_TOKEN)
        //         window.location.reload()
        //       })
        //     }
        //   })
        // }
        break
      default:
        notification.error({
          message: '系统提示',
          description: data.message,
          duration: 4
        })
        break
    }
  }
  return Promise.reject(error)
}
// request interceptor
service.interceptors.request.use(
  config => {
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (token) {
      config.headers['X-Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    if (config.method == 'get') {
      if (config.url.indexOf('sys/dict/getDictItems') < 0) {
        config.params = {
          _t: Date.parse(new Date()) / 1000,
          ...config.params
        }
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(response => {
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export { installer as VueAxios, service as axios }
