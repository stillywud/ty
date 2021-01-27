import Vue from 'vue'
import axios from 'axios'
import { ACCESS_TOKEN, BASE_URL } from '@/api/request'

// 可自动判断是否加上 baseURL 的请求
const execRemoteAPI = axios.create({
  timeout: 6000 // 请求超时时间
})

// request 拦截器
execRemoteAPI.interceptors.request.use(config => {
  let { params, method, headers } = config

  // 如果是以 '/' 开头的地址都加上 BaseURL
  let url = config.url.trim()
  if (url.indexOf('/') === 0) {
    url = Vue.ls.get(BASE_URL) + url
  }
  config.url = url

  // 所有的请求都加上 Token
  let token = Vue.ls.get(ACCESS_TOKEN)
  if (token) headers['X-Access-Token'] = token

  if (method == 'get') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...params
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})


export { execRemoteAPI }