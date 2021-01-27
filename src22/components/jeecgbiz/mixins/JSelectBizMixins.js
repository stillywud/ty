import _api from '../../../api'
import { mapGetters } from 'vuex'

export default {
  props: {
    // v-model
    value: {
      type: String,
      default: ''
    },
    // 是否允许多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 弹窗的宽度
    modalWidth: {
      type: Number,
      default: 1000,
    },
    // key 映射
    keyMaps: {
      type: Array,
      default: () => []
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    element: {
      type: Object,
      required: true,
      default: null
    }
  },
  data() {
    return {
      translMap: {},
      // 需要被翻译的字段key，该字段一定是唯一的
      translKeys: [],
      dataSource: [],
      loading: false,
      saveKey: 'id',
      modalVisible: false,
      // 存储当前登录的值
      currentLoginValue: null,
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val, oldVal) {
        this.handleWatchValue(val, oldVal)
      }
    },
    keyMaps: {
      deep: true,
      immediate: true,
      handler(val) {

        if (this.element != null) {
          let { model } = this.element

          val.forEach(item => {
            if (item.to === model) {
              this.saveKey = item.from
              this.displayModel = item.from
            }
          })
        }

        // this.element


      }
    },

  },
  computed: {
    ...mapGetters(['isExternal', 'isPreviewAction', 'isAddAction']),
    inputValue() {
      if (this.selectedValue) {
        let record = this.translMap[this.selectedValue]
        if (record) {
          return record[this.displayModel]
        }
      }
      return this.selectedValue
    },
    returnKey: {
      get() {
        return this.element.options.customReturnField
      }
    },
    defaultLogin() {
      return this.element.options.defaultLogin === true && this.currentLoginValue == null && (this.isAddAction || this.isPreviewAction)
    },
  },
  created() {
    this.requestData()
  },
  methods: {
    handleWatchValue() {
    },
    /** 查询数据，具体查询的方法由引用页面定义 */
    requestData() {
      let { requestFunctionName: funName, requestSuccess: success, requestError: error } = this
      if (!funName) {
        throw '必须定义 requestFunctionName 才能查询数据'
      }
      this.loading = true
      _api[funName]({
        pageNo: 1,
        pageSize: 9999
      }).then(res => {
        if (res.success) {
          let { result } = res

          if (typeof success === 'function') success(result)

        } else {
          if (typeof error === 'function') error(res)
        }
      }).catch(e => {
        if (typeof error === 'function') error(e)
      }).finally(() => {
        this.loading = false
        this.$nextTick(() => {
          this.$forceUpdate()
        })
      })
    },
    setTranslMap(record) {
      // 判断自定义返回字段是否包含在翻译字段内
      if (this.translKeys.includes(this.returnKey)) {
        this.$set(this.translMap, record[this.returnKey], record)
      }
    },
    /** 提交 key 映射 */
    putKeyMaps(rows) {
      // Key 映射
      let maps = {}
      this.keyMaps.forEach(item => {
        let value = rows[0][item.from]
        maps[item.to] = (value || value === 0) ? value.toString() : value
      })
      this.$nextTick(() => {
        this.$emit('putKeyMaps', maps)
      })
    },
    /** 打开弹窗 */
    handleClickOpenDialog() {
      if (this.disabled === true) {
        return
      }
      this.modalVisible = true

      this.$emit('dialogChange', true)
    },
    /** 关闭弹窗 */
    handleClosed() {
      this.$emit('dialogChange', false)
    },
    handleInput(value) {
      this.$emit('input', value)
    },
  }
}