import Vue from 'vue'
import axios from 'axios'
// 创建 axios 实例
const service = axios.create({
  timeout: 6000 // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(config => {
  let {params, method, headers} = config

  // 动态baseURL
  let baseUrl = Vue.ls.get(BASE_URL)
  config.url = baseUrl + config.url

  // 获取并设置token
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

// response 拦截器
service.interceptors.response.use(response => {
    console.log('--------response: ', response)
    return response.data
  }, error => {
    console.log('---------response error', error)
    return Promise.reject(new Error(error).message)
  }
)

const BASE_URL = "BASE_URL"
const ACCESS_TOKEN = "ACCESS_TOKEN"
// 仅供测试使用
const TEST_BASE_URL = "http://192.168.30.146:8102/jeecg-boot"
const TEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiQXV0aG9yaXphdGlvblNlcnZlciJdLCJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFwaSJdLCJncm91cGlkIjoidHlfb2F1dGhfaGJ4cyIsImV4cCI6MTYxMTA1NTE4MywianRpIjoiNDhhN2FmZmUtY2FmNy00ODBjLWI5NGUtNzlhYjQwODliN2RhIiwiY2xpZW50X2lkIjoiY2xpZW50X3Bhc3NfMSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.xeJ61wRKVNLVXG-ErfXr2a4wH2H6WcVwud5ulJKyL-8"

export {
  service as request,
  BASE_URL, TEST_BASE_URL,
  ACCESS_TOKEN, TEST_TOKEN
}