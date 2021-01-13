import Vue from 'vue'
import store from '@/store/'
import { putAction } from '@/api/manage'
import { ctypes } from '../components/componentsConfig'
import { TOGGLE_DEBUG_DEVICE, DEVICE_TYPE } from '@/store/mutation-types'
import {uniq} from 'lodash-es'
export function randomKey() {
  return (Date.now() + '_' + randomNumber(6))
}

/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */

export function randomNumber() {
  // 生成 最小值 到 最大值 区间的随机数
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  if (arguments.length === 1) {
    let [length] = arguments
    // 生成指定长度的随机数字，首位一定不是 0
    let nums = [...Array(length).keys()].map((i) => (i > 0 ? random(0, 9) : random(1, 9)))
    return parseInt(nums.join(''))
  } else if (arguments.length >= 2) {
    let [min, max] = arguments
    return random(min, max)
  } else {
    return Number.NaN
  }
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString(length, chats) {
  if (!length) length = 1
  if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  let str = ''
  for (let i = 0; i < length; i++) {
    let num = randomNumber(0, chats.length - 1)
    str += chats[num]
  }
  return str
}

/**
 * 通用封装options
 * 用于将一组数据封装成组件可识别的options
 */
export function packageOptions(source = [], labelName, valueName) {
  let labels = labelName.split(',')
  return source.map(item => {
    return {
      label: (() => {
        return labels.length === 1 ? item[labels[0]] : `${item[labels[0]]}(${item[labels[1]]})`
      })(),
      value: item[valueName]
    }
  })
}

/**
 * 子表支持的类型
 * @type {string[]}
 */
export const subTableSupportTypes = ['input', 'number', 'select', 'time', 'date', 'radio', 'checkbox', 'textarea', 'select-user', 'select-depart']
// 2020年4月27日更新新增支持组件
subTableSupportTypes.push('area-linkage', 'imgupload', 'file-upload', 'switch', 'slider', 'rate', 'color')

/**
 * 检查是否是子表支持的类型
 * @returns {boolean}
 */
export function subTableCheckType(checkType) {
  // 检查拖入的组件是否已被支持
  for (let type of subTableSupportTypes) {
    if (`${checkType}`.toLowerCase() === type.toLowerCase()) {
      return true
    }
  }
  return false
}

/**
 * 获取指定的 $refs 对象
 * 有时候可能会遇到组件未挂载到页面中的情况，导致无法获取 $refs 中的某个对象
 * 这个方法可以等待挂载完成之后再返回 $refs 的对象，避免报错
 * @author sunjianlei
 **/
export function getRefPromise(_this, name, ms = 10) {
  return new Promise((resolve) => {
    (function next() {
      let ref = _this.$refs[name]
      if (ref) {
        resolve(ref)
      } else {
        setTimeout(() => {
          next()
        }, ms)
      }
    })()
  })
}

/**
 * 深度克隆对象、数组
 * 注意：无法克隆带有方法的对象或数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/** 格式化日期 */
export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  // 判断传入的date是否是Date对象
  if (!(date instanceof Date)) {
    // 不是日期对象，尝试将string格式化成Date
    let temp = formatToDate(date, false)
    if (temp == null) {
      // 格式化失败，返回null
      console.error(`传入的 ${date} 不能被识别成日期类型`)
      return null
    }
    date = temp
  }

  const o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds() //毫秒
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/** String 格式化 成 日期对象 */
export function formatToDate(str, log = true) {
  if (typeof str === 'string') {
    let temp = new Date(str)
    if (temp == 'Invalid Date') {
      let iosTime = this.replace(/-/g, '/')
      temp = new Date(iosTime)
      if (temp == 'Invalid Date') {
        if (log) console.error(`传入的 ${str} 不能被识别成日期类型`)
        return null
      }
    }
    return temp
  }
  if (log) console.error(`传入的 ${str} 不能被识别成日期类型`)
  return null
}


/**
 * 递归调用处理所有的组件（包括栅格或其他容器组件内的组件）
 * 注：这是一个同步方法
 */
export function recursiveAllWidget(dataList, handler) {
  let flagBreak = false
  const breakFn = () => flagBreak = true
  // 递归方法
  const recursive = (array, parent) => {
    for (let item of array) {
      if (flagBreak) break
      // 判断是否是栅格或其他容器组件
      if (item.isContainer === true) {
        if (item.columns) {
          for (let column of item.columns) {
            if (flagBreak) break
            recursive(column.list, item, breakFn)
            if (flagBreak) break
          }
        } else if (item.type === ctypes.card) {// 卡片和tab需要特殊处理
          recursive(item.list, item, breakFn)
        } else if (item.type === ctypes.tabs) {
          for (let pane of item.panes) {
            if (flagBreak) break
            recursive(pane.list, item, breakFn)
            if (flagBreak) break
          }
        }
      }
      // 执行处理回调
      try {
        if (typeof handler === 'function') handler(item, parent, breakFn)
      } catch (e) {
        console.error(e)
      }
      if (flagBreak) break
    }
  }
  recursive(dataList, null)
}

/** 寻找某个组件的父级，如果有父级就返回，没有就返回 null */
export function findElementParent(list, element) {
  let flag = null
  recursiveAllWidget(list, (item, parent) => {
    if (item === element && flag === null) {
      flag = parent
    }
  })
  return flag
}

export function cssExpand(css, id) {
  let style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = `@charset "UTF-8";\n\n ${css}`
  // 清除旧样式
  if (id) {
    let $style = document.getElementById(id)
    if ($style != null) $style.outerHTML = ''
    style.id = id
  }
  // 应用新样式
  document.head.appendChild(style)
}

/**
 * 克隆组件，包括栅格等布局组件
 */
export function cloneElement(element) {
  // 克隆主组件
  let cloneMain = cloneObject(element)

  // 重新生成 key ，避免 key 重复报错，包括布局组件内的子组件
  recursiveAllWidget([cloneMain], (item) => {
    const key = randomKey()
    item.key = key
    item.model = item.type + '_' + key
    // 初始化权限控制字段
    item.jeecg_auth = { enabled: false, title: null, field: null }
  })

  return cloneMain
}

export function cloneWidget(vm, index) {
  let list = vm.data.list

  let element = cloneElement(list[index])
  list.splice(index + 1, 0, element)

  vm.$nextTick(() => (vm.selectWidget = list[++index]))
}

export function defaultDialogOptions() {
  return { top: 60, width: 1000, padding: { top: 25, right: 25, bottom: 30, left: 25 } }
}

export function valueOfBoolean(value, defaultValue = false) {
  return typeof value === 'boolean' ? value : defaultValue
}

export function updateGetSubOptions(widget) {
  widget.subOptions = {
    width: '200px'
  }
  return widget.subOptions
}

/** 升级旧版本JSON */
export function updateOldVersionJSON(json) {
  if (json.updated !== true) {
    json.config.expand = (json.config.expand || { js: '', css: '' })
    json.config.expand.url = (json.config.expand.url || { js: '', css: '' })
    json.config.dialogOptions = (json.config.dialogOptions || defaultDialogOptions())
    json.config.allowPrint = valueOfBoolean(json.config.allowPrint, false)
    json.config.allowExternalLink = (json.config.allowExternalLink || false)
    json.config.customRequestURL = (json.config.customRequestURL || [{ url: '' }])
    json.config.designMobileView = valueOfBoolean(json.config.designMobileView, false)
    if (json.config.designMobileView) {
      store.commit(TOGGLE_DEBUG_DEVICE, DEVICE_TYPE.mobile)
    }
    json.config.transactional = valueOfBoolean(json.config.transactional, true)

    recursiveAllWidget(json.list, (item) => {
      let { type, options } = item

      item.jeecg_auth = { enabled: false, title: null, field: null }
      if (item.hideTitle == null) item.hideTitle = false

      if (type === 'select-user' || type === 'select-depart') {
        let customReturnFields = { 'select-user': 'id', 'select-depart': 'id' }
        if (options.customReturnField == null) {
          options.customReturnField = customReturnFields[type]
        }
        // 默认当前登录项旧版本兼容
        if (typeof options.defaultLogin !== 'boolean') {
          options.defaultValue = (options.defaultValue || '')
          // 旧版本判断方式是判断---defaultValue的结尾的
          // 新版本是判断defaultLogin属性
          options.defaultLogin = /---defaultValue$/.test(options.defaultValue)
          if (options.defaultLogin) {
            options.defaultValue = options.defaultValue.split('---defaultValue')[0]
          }
        }
      }

      // 支持远程API取值的组件
      const remoteAPITypes = [
        'input', 'textarea', 'number',
        'time', 'date', 'select',
        'editor', 'select-user', 'select-depart',
        'table-dict', 'radio', 'checkbox',
        'cascader', 'text'
      ]
      if (remoteAPITypes.includes(type)) {
        if (item.remoteAPI) {
          item.remoteAPI.executed = false
        } else {
          item.remoteAPI = { url: '', executed: false }
        }
      }

      // switch 组件新增属性
      if (type === 'switch') {
        options.activeValue = options.activeValue || ''
        options.inactiveValue = options.inactiveValue || ''
      }

      // 新增隐藏属性
      options.hidden = valueOfBoolean(options.hidden, false)

      // 兼容子表属性
      if (item.isSubItem && item.subOptions == null) {
        updateGetSubOptions(item)
      }

    })

    json.updated = true
  }
}

/** 批量执行填值规则 */
export function executeRuleByCodeBatch(formData) {
  let fillRuleCodesMap = window['fillRuleCodesMap']
  let fillRuleCodes = Object.keys(fillRuleCodesMap).map(i => ({ ruleCode: i }))
  if (fillRuleCodes.length === 0) {
    return
  }
  return putAction('/sys/fillRule/executeRuleByCodeBatch', {
    commonFormData: formData,
    rules: fillRuleCodes
  }).then(res => {
    if (res.success) {
      let values = {}
      res.result.forEach((item, idx) => {
        let modelKeys = fillRuleCodesMap[item.ruleCode]
        if (modelKeys instanceof Array) {
          modelKeys.forEach(key => {
            Vue.set(formData, key, item.result)
          })
        }
      })
    } else {
      this.$message.warn('填值规则查询失败：' + res.message)
    }
  })
}

/**
 * 可用于判断是否成功
 * @type {symbol}
 */
export const succeedSymbol = Symbol()
/**
 * 可用于判断是否失败
 * @type {symbol}
 */
export const failedSymbol = Symbol()

/**
 * 使 promise 无论如何都会 resolve，除非传入的参数不是一个Promise对象或返回Promise对象的方法
 * 一般用在 Promise.all 中
 *
 * @param promise 可传Promise对象或返回Promise对象的方法
 * @returns {Promise<any>}
 */
export function alwaysResolve(promise) {
  return new Promise((resolve, reject) => {
    let p = promise
    if (typeof promise === 'function') {
      p = promise()
    }
    if (p instanceof Promise) {
      p.then(data => {
        resolve({ type: succeedSymbol, data })
      }).catch(error => {
        resolve({ type: failedSymbol, error })
      })
    } else {
      reject('alwaysResolve: 传入的参数不是一个Promise对象或返回Promise对象的方法')
    }
  })
}
/**
 * 初始化关联选项
*/
export function initAssoOptions(json){
  let arr = [];
  json.list.forEach(item=>{
    if(item.type === 'radio'){
      let behaviorLinkage = item.behaviorLinkage;
      if(Array.isArray(behaviorLinkage) && behaviorLinkage.length >0){
        behaviorLinkage.forEach(it => {
          let targets = it.targets;
          if(Array.isArray(targets) && targets.length > 0){
            targets.forEach(li => {
              arr.push(li);
            })
          }
        })
      }
    }
  });
  let uniqArr = uniq(arr);
  // this.list
  json.list = json.list.map(item=>{
    let obj = {...item};
    if(uniqArr.includes(obj.model)){
      console.log(obj)
      obj.assoStatus = 1
    }
    return obj;
  })
}