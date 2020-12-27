import * as _utils from '../util/utils'
import { ctypes } from '../components/componentsConfig'
import * as _authAPI from '../api/auth'

export const ElementAction = {
  methods: {
    /** 处理PopupCgreport组件事件 */
    handlePopupCgreportOk(values) {
      this.$emit('popupCgreportOk', values)
    },
    /** 处理弹窗变化事件 */
    handleDialogChange(val) {
      this.$emit('dialogChange', val)
    },
  }
}

/** 生成表单用到的嵌套布局公共方法 */
export const GenerateNesting = {
  props: ['element', 'models', 'remote', 'rules', 'readOnly', 'className'],
  data() {
    return {
      dataModel: this.models
    }
  },
  watch: {
    models(val) {
      this.dataModel = val
    },
    dataModel: {
      deep: true,
      handler(val) {
        this.$emit('update:models', val)
      }
    },
  },
  computed: {
    commonProps() {
      return {
        remote: this.remote,
        rules: this.rules,
        readOnly: this.readOnly,
      }
    }
  },
  methods: {
    /** 获取类名 */
    getClassName(element) {
      let { className } = element
      if (typeof className === 'string') {
        return className.split(' ')
      }
      return []
    },
  }
}

/** 布局表单用到的嵌套布局公共方法 */
export const WidgetDraggable = {
  data() {
    return {
      selectWidget: this.select
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  },
  methods: {

    handleDraggableAdd(list, $event) {
      const { newIndex } = $event

      //为拖拽到容器的元素添加唯一 key
      const key = _utils.randomKey()

      let newObject = _utils.cloneObject(list[newIndex])

      if (!newObject.key) {
        Object.assign(newObject, {
          options: {
            ...newObject.options
          },
          key: key,
          model: newObject.type + '_' + key,
          rules: [],
          jeecg_auth: { enabled: false, title: null, field: null }
        })
      }
      newObject.isSubItem = false

      // Tabs 随机 TabName
      if (newObject.type === ctypes.tabs) {
        newObject.panes.forEach(pane => (pane.name = `Tab_${_utils.randomNumber(6)}`))
        newObject.options.activeName = newObject.panes[0].name
      }

      this.$set(list, newIndex, newObject)
      this.selectWidget = list[newIndex]
    },

    handleWidgetDelete(index) {
// TODO: 改成公共util
      const fn = ()=>{
        if (this.data.list.length - 1 === index) {
          if (index === 0) {
            this.selectWidget = {}
          } else {
            this.selectWidget = this.data.list[index - 1]
          }
        } else {
          this.selectWidget = this.data.list[index + 1]
        }

        this.$nextTick(() => {
          this.data.list.splice(index, 1)
        })
      }

      let element = this.data.list[index]
      if (element.jeecg_auth && element.jeecg_auth.enabled) {
        this.$confirm('删除字段将会同时删除已配置的权限，您确定吗？', '删除字段', {
          type: 'warning'
        }).then(() => {
          fn()
          // 从数据库中删除
          _authAPI.deleteByComKey(element.key).then()
        }, () => null)

      } else {
        fn()
      }

    },
    handleSelectWidget(index) {
      if (this.mode === 'form') return
      this.selectWidget = this.data.list[index]
    },
    handleWidgetClone(index) {
      _utils.cloneWidget(this, index)
    },
  }

}