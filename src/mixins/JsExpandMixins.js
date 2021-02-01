/* JS 全局增强 需要用到的 mixins */
import moment from 'moment'
import * as _utils from '../util/utils'
import { getAction, httpAction, postAction, putAction } from '../api/manage'
import { DesignDataMixins } from '@/mixins/vuexMixins'

export default {
  mixins: [DesignDataMixins],
  methods: {
    /** 用于js增强事件，运行JS代码，可以传参 */
    // options 所需参数：
    //    参数名         类型            说明
    //    vm             VueComponent    vue实例
    //    event          Object          event对象
    //    models         Object          保存表单数据的models，用于用户获取数据
    //    jsCode         String          待执行的js代码
    //    errorMessage   String          执行出错后的提示（控制台）
    runJsCode(options = {}) {
      const _this = this

      // 绑定到window上的keyName
      let windowKeyName = 'J_CLICK_EVENT_OPTIONS'
      if (typeof window[windowKeyName] != 'object') {
        window[windowKeyName] = {}
      }

      // 随机生成按钮点击事件id，防止冲突
      let id = _utils.randomString(16, 'qwertyuioplkjhgfdsazxcvbnm'.toUpperCase())
      // 封装按钮点击事件
      let clickCode = `
          (function (o_${id}) {
            try {
              (function (event, api, moment, vm) {
                ${options.jsCode}
              })(o_${id}.event, o_${id}.api, o_${id}.moment, o_${id}.vm)
            } catch (e) {
              o_${id}.error(e)
            }
            o_${id}.done()
          })(window['${windowKeyName}']['EVENT_${id}'])
`
      // 创建script标签
      const script = document.createElement('script')
      // 将需要传递的参数挂载到window对象上
      window[windowKeyName]['EVENT_' + id] = {
        vm: options.vm,
        event: options.event,
        // moment 对象
        moment: moment,
        // 页面上可调用的api方法
        api: {
          // 获取form表单的值
          getFormData(key) {
            let models = options.getModels()
            return key ? models[key] : models
          },
          // 设置form表单的值
          setFormData(key, value) {
            if (key) {
              let models = options.getModels()
              options.vm.$set(models, key, value)
            }
          },
          // 设置 组件 的options
          setFormOptions(model, optionsKey, optionsValue) {
            let models
            if (model instanceof Array) {
              models = model
            } else {
              models = (model || '').trim().split(',')
            }
            _utils.recursiveAllWidget(_this.designList, (item) => {
              let { model: itemModel, options } = item
              // 是否存在 options 属性
              if (!options) return
              for (let m of models) {
                if (m === itemModel) {
                  options[optionsKey] = optionsValue
                  break
                }
              }

            })
          },
          show(model) {
            this.setFormOptions(model, 'hidden', false)
          },
          hide(model) {
            this.setFormOptions(model, 'hidden', true)
          },
          // 设置监听 models 值的变化
          watch(watchItems) {
            for (let key in watchItems) {
              if (watchItems.hasOwnProperty(key)) {
                options.vm.$watch(`models.${key}`, watchItems[key])
              }
            }
          },
          get: getAction,
          post: postAction,
          put: putAction,
          request: httpAction,
          executeAllFillRule() {
            let models = options.getModels()
            _utils.executeRuleByCodeBatch(models)
          },
        },
        // 当执行完成时，无论如何都会调用的回调事件
        done() {
          script.outerHTML = '' // 删除这个标签
          delete window[windowKeyName]['EVENT_' + id]
        },
        // 当js运行出错的时候调用的事件
        error(e) {
          console.group(`${options.errorMessage || '用户自定义JS增强代码运行出错'}（${new Date()}）`)
          console.error(e)
          console.groupEnd()
        }
      }
      // 将事件挂载到document中
      script.innerHTML = clickCode
      document.body.appendChild(script)
    },
  }
}
