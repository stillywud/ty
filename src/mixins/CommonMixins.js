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
          this.data.list.splice(index, 1);
        })
      }

      let element = this.data.list[index]
      this.data.list.map(item=>{
        if(element.options.remote === 'dict_obj'){
          if(Array.isArray(item.twolevelLinkage) && item.twolevelLinkage.length > 0){
            item.twolevelLinkage = item.twolevelLinkage.filter(ip => {
              return ip !== element.model
            })
          }
            
        }else{
          let lk = item.type=='select' && !item.options.multiple || item.createLinkage
          let arr = []
          if(lk){
            item.behaviorLinkage.map(it=>{
              if(it.targets.includes(element.model)){
                it.targets = it.targets.filter(ip => {
                  return ip !== element.model
                })
              }
              arr = arr.concat(...it.targets)
              return it;
            })
            if(arr.length === 0){
              item._dvValueBo = false
            }
          }
        }
        return item;
      })
      
      if(element.type=='select' && !element.options.multiple || element.createLinkage){
        // 选中的组件（删除）一个class类
        let arr = [];
        this.data.list.forEach(item=>{
          if(item.model !== element.model){
            if(Array.isArray(item.behaviorLinkage)){
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
          }
        })
        this.data.list.map(item=>{
          // let items = {...item}
          if(item.model !== element.model){
            if(arr.includes(item.model)){
              item.cellLinkage = true
            }else{
              item.cellLinkage = false
            }
          }
          return item
        })
        console.log(this.data.list)
      }
      

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