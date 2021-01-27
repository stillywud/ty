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
const TEST_BASE_URL = ''//"http://localhost:8080/jeecg-boot"
const TEST_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzAzMzE5NzQsInVzZXJuYW1lIjoiYWRtaW4ifQ.bLW1ST5F4VdIWjOqWmHr-dcO48BFZhb8DtN3cIC1oZw"

export {
  service as request,
  BASE_URL, TEST_BASE_URL,
  ACCESS_TOKEN, TEST_TOKEN
}