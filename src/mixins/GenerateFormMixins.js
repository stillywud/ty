import { mapGetters } from 'vuex'
import { formatDate, recursiveAllWidget } from '../util/utils'
import * as _authAPI from '../api/auth'
import { ACCESS_TOKEN } from '../api/request'
import { DesignDataMixins, DeviceMixins } from '@/mixins/vuexMixins'

const isLoadingSymbol = Symbol()

export default {
  mixins: [DeviceMixins, DesignDataMixins],
  props: {
    // 用于替换变量的userInfo
    userInfo: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      replaceData: {
        // 当前系统日期
        sysDate: () => formatDate(new Date(), 'yyyy-MM-dd'),
        // 当前系统时间
        sysTime: () => formatDate(new Date(), 'hh:mm:ss'),
        // 当前登录用户登录账号
        sysUserCode: isLoadingSymbol,
        // 当前登录用户真实名称
        sysUserName: isLoadingSymbol,
        // 当前登录用户部门编号
        sysOrgCode: isLoadingSymbol,
        // 当前登录用户公司编号
        sysCompanyCode: null,
      },
      authObject: {},
      intervalTimer: null,
      // begin ※※※ 临时解决一进入表单就触发校验的问题
      rulesConfig: {
        disabled: true,
      },
      // end ※※※ 临时解决一进入表单就触发校验的问题
    }
  },
  computed:{
    ...mapGetters(['isPreviewAction', 'isAddAction']),
  },
  watch: {
    userInfo: {
      deep: true,
      immediate: true,
      handler(val) {
        this.replaceData = Object.assign(this.replaceData, val)
        // 重新渲染 {{ }} 变量
        this.handlerWatchData()
      }
    },
    designData: {
      deep: true,
      handler() {
        if (this.designData) {
          this.$set(this.data, 'list', this.designList)
          this.$set(this.data, 'config', this.designConfig)
        }
      }
    },
    action: {
      deep: true,
      immediate: true,
      handler(action) {
        this.$store.commit('SET_ACTION', action)
      }
    },
  },
  created() {
    this.$SET_DESIGN_DATA(this.data)
    this.generateAuthObject()
    // 判断是否有以下class，如果有就删掉
    // --- is-success 会导致输入框变绿
    let disableClassName = ['is-success']
    this.intervalTimer = setInterval(() => {
      disableClassName.forEach(className => {
        let elements = document.getElementsByClassName(className)
        if (elements && elements.length > 0) {
          for (let element of elements) {
            element.classList.remove(className)
          }
        }
      })
    }, 100)
    // begin ※※※ 临时解决一进入表单就触发校验的问题
    // 1s 以后启用校验
    setTimeout(() => {
      this.rulesConfig.disabled = false
    }, 1000)
    // end ※※※ 临时解决一进入表单就触发校验的问题
  },
  methods: {

    getExpand() {
      const obj = { css: '', js: '' }
      let expand = (this.data.config.expand || { ...obj })
      expand.url = expand.url || { ...obj }
      return expand
    },

    /* 处理组件中的 {{ }} 变量表达式 */
    handlerWatchData() {
      // 递归调用（为了处理栅格或其他容器组件）
      recursiveAllWidget(this.data.list, (item) => {
        let { type, options } = item
        // 是否存在 options 属性
        if (!options) {
          return
        }
        // 默认为当前登录项（用户、部门），只有新增时才替换，编辑和查看不替换。
        let currentLoginValue = null
        if (options.defaultLogin === true && (this.isPreviewAction || this.isAddAction)) {
          let defaultValues = { 'select-user': '{{sysUserCode}}', 'select-depart': '{{sysOrgCode}}' }
          currentLoginValue = defaultValues[type]
        }
        // 替换 text
        if (options.text) {
          options.text = this.replaceAllText(options.text)
        }
        // 替换 默认值
        if (currentLoginValue !== null) {
          options.defaultValue = this.replaceAllText(currentLoginValue)
        } else if (options.defaultValue) {
          options.defaultValue = this.replaceAllText(options.defaultValue)
        }
      })
    },

    /* 替换文本中的变量 */
    replaceAllText(text) {
      let data = this.replaceData
      if (typeof text !== 'string') {
        return text
      }
      return text.replace(/{{([^}]+)?}}/g, (s1, s2) => {
        try {
          let temp = eval(`data.${s2}`)
          if (temp === isLoadingSymbol) {
            return s1
          }
          return (typeof temp === 'function') ? temp() : temp
        } catch (e) {
          console.error(e)
          return null
        }
      })
    },

    /** 根据配置创建权限对象 */
    generateAuthObject() {
      new Promise((resolve, reject) => {
        let obj = window['__authUserInfo']
        if (obj) {
          resolve(obj)
        } else {
          _authAPI.queryUserByToken(this.$ls.get(ACCESS_TOKEN)).then(res => {
            if (res && res.success) {
              resolve(res.result)
            } else {
              reject(res.message)
            }
          })
        }
      }).then(authUserInfo => {
        window['__authUserInfo'] = authUserInfo

        this.$set(this.authObject, 'authUserInfo', authUserInfo)
      })
    },

    // begin ※※※ 临时解决一进入表单就触发校验的问题
    /** Form校验完成之后触发 */
    handleFormValidate() {
      // 判断是否禁用校验
      if (this.rulesConfig.disabled) {
        this.$refs.generateForm.clearValidate()
      }
    },
    // end ※※※ 临时解决一进入表单就触发校验的问题

  },
  beforeDestroy() {
    clearInterval(this.intervalTimer)
  }
}