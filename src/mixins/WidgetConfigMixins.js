import * as _authAPI from '../api/auth'

export default {
  data() {
    return {
      customReturnFieldOptions: {
        'select-user': [
          { value: 'id', label: '用户ID' },
          { value: 'username', label: '用户名' },
          { value: 'realname', label: '真实姓名' },
          { value: 'birthday', label: '生日' },
          { value: 'sex', label: '性别（字典值）' },
          { value: 'sex_dictText', label: '性别（字典文本）' },
          { value: 'email', label: '邮箱地址' },
          { value: 'phone', label: '电话号码' },
          { value: 'orgCode', label: '机构编码' },
          { value: 'avatar', label: '头像地址' }
        ],
        'select-depart': [
          { value: 'id', label: '部门ID' },
          { value: 'departName', label: '机构/部门名称' },
          { value: 'departNameAbbr', label: '缩写' },
          { value: 'departNameEn', label: '英文名' },
          { value: 'description', label: '描述' },
          { value: 'fax', label: '传真' },
          { value: 'memo', label: '备注' },
          { value: 'mobile', label: '手机号' },
          { value: 'address', label: '地址' },
          { value: 'orgCode', label: '机构编码' },
          { value: 'orgType', label: '机构类型' }
        ]
      }
    }
  },
  computed: {
    optionsKeys() {
      return Object.keys(this.data.options)
    },
    activeValueEqInactiveValue() {
      let { activeValue, inactiveValue } = this.data.options
      return (!!activeValue || !!inactiveValue) && activeValue === inactiveValue
    }
  },
  methods: {

    handleAuthChange(checked, element) {
      let { jeecg_auth } = element
      if (checked) {
        if (jeecg_auth.title == null) {
          jeecg_auth.title = element.name
        }
        if (jeecg_auth.field == null) {
          jeecg_auth.field = element.model
        }

        // 保存至数据库
        _authAPI.addAuth({
          authComKey: element.key,
          authTitle: jeecg_auth.title,
          authField: jeecg_auth.field,
          subTable: element.isSubItem
        }).then()
      } else {
        // 用户选择是否删除该条数据
        this.$nextTick(() => {
          jeecg_auth.enabled = true
          this.$confirm('取消将会完全删除权限控制数据且不可逆，您确定吗？', '取消权限控制', {
            type: 'warning'
          }).then(() => {
            jeecg_auth.enabled = false
            jeecg_auth.title = null
            jeecg_auth.field = null

            // 从数据库中删除
            _authAPI.deleteByComKey(element.key).then()
          }, () => null)


        })
      }
    },

    handleModelChange(code, list) {
      let item = list.filter(i => i.value === code)[0]
      if (item) {
        this.$set(this.data.jeecg_auth, 'title', item.label)
        this.$set(this.data.jeecg_auth, 'field', item.value)
      }
    },

    handleSwitchActiveChange(isActive, value) {
      let valueKey = isActive ? 'activeValue' : 'inactiveValue'
      // 判断默认值是否和更改前的一致，一致则同步修改默认值
      let oldValue = this.data.options[valueKey]
      let defaultValue = this.data.options.defaultValue
      if (defaultValue === oldValue || (isActive && defaultValue === true) || (!isActive && defaultValue === false)) {
        this.data.options.defaultValue = value
      }
      this.$set(this.data.options, valueKey, value)
    },

    // 清空默认值
    handleRemoveDefaultValue() {
      let { type, options } = this.data
      if(type){
        if (type === 'checkbox' || options.multiple === true) {
          options.defaultValue = []
        } else {
          options.defaultValue = ''
        }
      }
      
    },

  },
}