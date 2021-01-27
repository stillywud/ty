import _api from '../api'
import { mapState } from 'vuex'
import { DeviceMixins } from '@/mixins/vuexMixins'
import { execRemoteAPI } from '@/api/execRemoteAPI'
import { checkElementAuth, getAuthObject } from '@/util/authUtils'
import { getAction } from '@/api/manage'

export default {
  mixins: [DeviceMixins],
  props: {},
  data() {
    return {
      authObject: {
        // 用户信息（包含的部门、角色）
        authUserInfo: {},
        // 权限的详情（数据库的数据）
        authsMap: {}
      },
      authObjectSubTable: { authUserInfo: {}, authsMap: {} },
      // 远程获取到的选项（包括字典、远程值）
      remoteOptions: [],
      cacheRemote:{}
    }
  },
  computed: {
    ...mapState({
      isExternal: state => state.app.isExternal,
    }),
    _authIsHidden() {
      return checkElementAuth(this.widget, this.authObject)
    },
    _width() {
      return this.isMobile ? '100%' : this.widget.options.width
    },

    _isHidden() {
      // 首先判断是否权限控制隐藏，再判断是否是外部链接，并使用的是需要Token的组件
      return this.widget.options.hidden || this._authIsHidden || this.isExternalHidden(this.widget.type)
    },

    // 下拉或单选多选的选项，根据是否远程加载
    _options() {
      let { options } = this.widget
      console.log(this.cacheRemote,'this.cacheRemote')
      return (options.remote ? this.remoteOptions : options.options)
    },
    // _options:{
    //   get(){
    //     let { options, remoteOptionstw } = this.widget
    //     return (options.remote ? remoteOptionstw? remoteOptionstw: this.remoteOptions : options.options)
      
    //   },
    //   set(){
    //     let { options, remoteOptionstw } = this.widget
    //     return (options.remote ? remoteOptionstw? remoteOptionstw: this.remoteOptions : options.options)
    //   }
    // }

  },
  watch: {
    
  },
  created() {
    // 加载远端数据或字典
    this.loadRemoteDict()

    // 获取权限
    getAuthObject(false).then(obj => this.authObject = obj)
    getAuthObject(true).then(obj => this.authObjectSubTable = obj)
  },
  methods: {
    checkSubTableAuth(element) {
      return !(checkElementAuth(element, this.authObjectSubTable) || this.isExternalHidden(element.type))
    },
    // 在外部链接里需要隐藏的组件
    isExternalHidden(type) {
      // 新规则：用户组件和部门组件显示为输入框，所以目前没有需要隐藏的组件
      return false
      // let types = ['select-user', 'select-depart']
      // return (this.isExternal && types.includes(type))
    },
    inpAssa(val){
      console.log(val,'ssssssss',this.widget)
      // this.$emit("inpAssa",val)
      let val1 = val.val;
      let val2 = val.twolevelLinkage;
      let model = val.model;

      let objtw = []//{}
      let ajaxArr = []
      let objw = {}
      this.data.list.forEach(item => {
        val.twolevelLinkage.forEach((it,index) => {
          if(it === item.model){
            // objtw[it] = item;
            objtw.push(item)
            ajaxArr.push(getAction('https://www.fastmock.site/mock/43590fe9e1a9a3af3dc043ffe4661782/dx/api/commodity',{
              a:index,
              val:val1,
              code:item.options.dictObjCode,
              value:item.options.props.objValue,
              label:item.options.props.objValue,
            }))
          }
        })
      })
      Promise.all(ajaxArr).then(res=>{
        console.log(res)
        res.forEach((response,index)=>{
          let remoteOptions = null
            // 返回值可能存在的情况：
            // 1、直接返回了个数组
            // 2、result是个数组
            // 3、result.records是个数组（后台包裹了分页对象）
            console.log(response)
            if (Array.isArray(response)) {
              remoteOptions = response
            } else if (response.success) {
              if (Array.isArray(response.result)) {
                remoteOptions = response.result
              } else if (response.result && Array.isArray(response.result.records)) {
                remoteOptions = response.result.records
              }
            }
            if(remoteOptions === null){
              remoteOptions = null
            }else{
              if(objtw[index].options.remote === 'dict_obj'){
                remoteOptions = remoteOptions.map(item => {
                  return {
                    value: item[objtw[index].options.props.objValue],
                    label: item[objtw[index].options.props.objLabel],
                    text: item[objtw[index].options.props.objLabel],
                  }
                })
              }else{
                remoteOptions = remoteOptions.map(item => {
                  return {
                    value: item[objtw[index].options.props.value],
                    label: item[objtw[index].options.props.label],
                    text: item[objtw[index].options.props.label],
                  }
                })
              }
            }
            objw[objtw[index].model] = remoteOptions
        })
        console.log(objw)
        this.data.list.map(it => {
          Object.keys(objw).forEach(ip => {
            if(ip === it.model){
              it.remoteOptionstw = objw[ip]
              // this.models[it.model] = ''
              this.$set(this.models,it.model,'')
            }
          })
          return it;
        })
        this.cacheRemote = objw
        console.log(this.data.list, this.models,'this.data.list')
      })
    },
    // 加载远程数据和字典
    async loadRemoteDict() {
      let { options } = this.widget
      console.log(this.widget,options,this.data,this.list,'this.widget')
      if (options.remote === 'dict' && options.dictCode) {
        // 如果是数据字典，就通过 dictCode 查询字典 item
        this.remoteOptions = await _api.getDictItems({ code: options.dictCode })
      } else if (options.remote === true&& options.remoteFunc || options.remote === 'dict_obj' ) {
        // 通过远程 URL 取值
        let { remoteFunc, props } = options
        remoteFunc = remoteFunc.trim()
        let parameter = {}
        if(options.remote === 'dict_obj'){
          // 需要修改，因为多个时候还要循环找到主键
          if(options.dictObjCode){
            let a1 = false
            this.data.list.forEach(item=>{
              if(item.type === 'select' && !item.options.multiple && (item.options.remote === true || item.options.remote === 'dict_obj')){
                if(Array.isArray(item.twolevelLinkage) && item.twolevelLinkage.length > 0){
                  if(item.twolevelLinkage.includes(this.widget.model)){
                    // 如果存在 就不能往下走
                    a1 = true
                  }
                }
              }
            })
            if(a1){
              return
            }
            remoteFunc = 'https://www.fastmock.site/mock/43590fe9e1a9a3af3dc043ffe4661782/dx/api/uploadImage'
            parameter = {
              code:options.dictObjCode,
              value:props.objValue,
              label:props.objValue,
            }
          }else{
            return 
          }
          
        }
        // 内部请求直接请求，外部请求需要中转
        let response
        console.log(remoteFunc,options,'remoteFunc')
        if (/^https?/.test(remoteFunc)) {
          response = await _api.transitRESTful.get(remoteFunc,parameter)
        } else {
          response = await getAction(remoteFunc)
        }
        let remoteOptions = null
        // 返回值可能存在的情况：
        // 1、直接返回了个数组
        // 2、result是个数组
        // 3、result.records是个数组（后台包裹了分页对象）
        console.log(response)
        if (Array.isArray(response)) {
          remoteOptions = response
        } else if (response.success) {
          if (Array.isArray(response.result)) {
            remoteOptions = response.result
          } else if (response.result && Array.isArray(response.result.records)) {
            remoteOptions = response.result.records
          }
        }
        if (remoteOptions == null) {
          console.error('远端数据请求失败：', response)
          return Promise.reject(response)
        }
        if(options.remote === 'dict_obj'){
          this.remoteOptions = remoteOptions.map(item => {
            return {
              value: item[props.objValue],
              label: item[props.objLabel],
              text: item[props.objLabel],
              // children: item[options.props.children]
            }
          })
        }else{
          this.remoteOptions = remoteOptions.map(item => {
            return {
              value: item[props.value],
              label: item[props.label],
              text: item[props.label],
              // children: item[options.props.children]
            }
          })
        }
        
        console.log(this.remoteOptions,'this.remoteOptions')
        return Promise.resolve(remoteOptions)
      }

    },

  }
}