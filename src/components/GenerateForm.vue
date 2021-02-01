<template>
  <div>
    <div v-if="data.config.allowPrint" style="text-align: right;">
      <el-button
          v-print="'#printContent'"
          class="j-btn-print"
          title="打印"
          icon="el-icon-printer"
          type="text"
          size="medium"
          :circle="true"
      />
    </div>
    <el-form
        ref="generateForm"
        id="printContent"
        :size="data.config.size"
        :model="models" :rules="rules" :label-position="isMobile ? 'top' : data.config.labelPosition" :label-width="data.config.labelWidth + 'px'"
        @data-begin="()=>'此处为临时解决一进入表单就触发校验的问题'"
        @validate="handleFormValidate"
        @data-end="()=>'此处为临时解决一进入表单就触发校验的问题'"
    >
      <template v-for="item in data.list">

        <template v-if="item.type == 'blank'">
          <el-form-item :label="item.name" :prop="item.model" :key="item.key">
            <slot :name="item.model" :model="models"></slot>
          </el-form-item>
        </template>

        <template v-else>
          <generate-form-item
              ref="formItem"
              :key="item.key"
              :data="data"
              :config="data.config"
              :models.sync="models"
              :rules="rules"
              :widget="item"
              :remote="remote"
              :readOnly="readOnly"
              :className="getClassName(item)"
              @popupCgreportOk="handlePopupCgreportOk"
              @dialogChange="handleDialogChange"
              @inpAsso="inpAsso"
              @inpAssa="inpAssa"
              @clearp="clearp"
          ></generate-form-item>
        </template>

      </template>
    </el-form>
  </div>
</template>

<script>
import GenerateFormItem from './GenerateFormItem'
// update-begin--Author:sunjianlei Date:20190808 for：新增自定义 import
import { cssExpand, updateOldVersionJSON } from '@/util/utils'
import JsExpandMixins from '../mixins/JsExpandMixins'
import {ctypes} from './componentsConfig'
import GenerateFormMixins from '../mixins/GenerateFormMixins'
import * as _utils from '../util/utils'
import { changeTheme } from '@/util/theme'
import { executeRuleByCodeBatch } from '@/util/utils'
import { execRemoteAPI } from '@/api/execRemoteAPI'
import {getAction} from '@/api/manage'
// update-end--Author:sunjianlei Date:20190808 for：新增自定义 import
import {pullAll, uniq} from 'lodash-es'
export default {
  name: 'jm-generate-form',
  mixins: [GenerateFormMixins, JsExpandMixins],
  components: { GenerateFormItem },
  props: ['data', 'remote', 'value', 'insite', 'readOnly', 'action'],
  data() {
    return {
      models: {},
      rules: {},
      ctypes
    }
  },
  // update-begin--Author:sunjianlei Date:20191205 for：动态换肤 --------------------
  beforeCreate(){
    changeTheme(window['THEME_COLOR'])
  },
  // update-end--Author:sunjianlei Date:20191205 for：动态换肤 --------------------
  created() {
    // this.generateModel(this.data.list)
  },
  mounted() {
    // update-begin--Author:sunjianlei Date:20190620 for：新增全局的JS、CSS增强代码 ------------
    let { js: userJs, url: { js: userJsUrl } } = this.getExpand()
    let jsExpandOptions = { vm: this, models: this.models, getModels: () => this.models }
    // 增强用户输入的 js
    if (userJs) {
      this.runJsCode({
        ...jsExpandOptions,
        jsCode: userJs,
        event: { type: 'global_js_expand', action: this.action },
        errorMessage: '用户自定义全局JS增强代码运行时出错',
      })
    }
    // 增强远程 JS
    if (userJsUrl) {
      execRemoteAPI.get(userJsUrl).then(res => {
        if (res.status === 200) {
          this.runJsCode({
            ...jsExpandOptions,
            jsCode: res.data,
            event: { type: 'remote_js_expand', action: this.action },
            errorMessage: '自定义远程全局JS增强代码运行时出错',
          })
        }
      })
    }
    // update-end--Author:sunjianlei Date:20190620 for：新增全局的JS、CSS增强代码 ------------

    // update-start--Author:mx Date:20190724 for：选项关联 --
    this.data.list.forEach(item=>{
      if((item.type === 'select' && !item.options.multiple || item.type === 'radio') && item.options.remote === 'dict_obj'){
        let twolevelLinkage = item.twolevelLinkage;
        this.inpAssa({val:this.models[item.model],twolevelLinkage,element:item})
      }else if(item.createLinkage === true || item.type === 'select' && !item.options.multiple){
        let behaviorLinkage = item.behaviorLinkage;
        this.inpAsso({val:this.models[item.model] || item.options.defaultValue,behaviorLinkage})
      }
    })
    // update-end--Author:mx Date:20190724 for：选项关联 --
  
  },
  methods: {
    generateModel(genList) {

      // update-begin--Author:sunjianlei Date:20190815 for：递归创建model，为了适应嵌套布局 ------------
      let fillRuleCodesMap = {}
      let remoteAPIList = []
      this.rules = {}
      _utils.recursiveAllWidget(genList, (item, parent) => {
        if(item.assoStatus !==1){
          // 如果组件应用了填值规则，就记录出来批量执行
          if (item.options.fillRuleCode) {
            let map = fillRuleCodesMap[item.options.fillRuleCode] || []
            map.push(item.model)
            fillRuleCodesMap[item.options.fillRuleCode] = map
          }
          // 如果组件应用了远程取值接口，就记录下来批量执行
          if (item.remoteAPI && item.remoteAPI.url && item.remoteAPI.executed === false) {
            remoteAPIList.push(item)
          }

          if (this.models[item.model] == null) {
            let modelValue = this.models[item.model]
            if (this.value && Object.keys(this.value).indexOf(item.model) >= 0) {
              modelValue = this.value[item.model]
            } else {
              if (item.type === 'blank') {
                modelValue = item.options.defaultType === 'String' ? '' : (item.options.defaultType === 'Object' ? {} : [])
              } else {
                modelValue = item.options.defaultValue
              }
            }
            this.$set(this.models, item.model, modelValue)
          }

          let rulesMaps = item.rules.map(item => {
            if (item.pattern) {
              return { ...item, pattern: new RegExp(item.pattern) }
            } else if (item.type === 'number' || item.type === 'float') {
              return null
            } else if (item.type === 'phone') {
              return { ...item, type: null, pattern: /^1[3456789]\d{9}$/ }
            } else if (item.type === 'identity') {
              return { ...item, type: null, pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ }
            } else {
              return { ...item }
            }
          }).filter(item => item != null)
          if (this.rules[item.model]) {
            this.rules[item.model] = [...this.rules[item.model], ...rulesMaps]
          } else {
            this.rules[item.model] = [...rulesMaps]
          }
        }
      })
      // 批量执行填值规则
      window['fillRuleCodesMap'] = fillRuleCodesMap
      // 编辑和查看状态下不执行填值规则和远程取值接口
      if (this.action !== 'edit' && this.action !== 'detail') {
        executeRuleByCodeBatch(this.models)
        // 批量请求远程取值API
        remoteAPIList.forEach(item => {
          execRemoteAPI.get(item.remoteAPI.url).then(res => {
            let data = (res.data || '').toString()
            // 文本组件特殊处理
            if (item.type === ctypes.text) {
              this.$set(item.options, 'text', data)
            } else {
              this.$set(this.models, item.model, data)
            }
            item.remoteAPI.executed = true
          }).catch(error => {
            console.group('远程请求数据失败：' + item.remoteAPI.url)
            console.error(error)
            console.groupEnd()
          })
        })
      }
      // update-end--Author:sunjianlei Date:20190815 for：递归创建model，为了适应嵌套布局 ------------
    },
    getData() {
      // update-begin--Author:sunjianlei Date:20190628 for：新增子表校验 -----------
      let {generateForm} = this.$refs

      const scrollAndReject = (failElement, reject, message) => {
        if (failElement != null) {
          // if (typeof failElement.getBoundingClientRect === 'function') // 此方法需要传递到父级
          if (typeof failElement.scrollIntoView === 'function') {
            failElement.scrollIntoView()
          } else {
            const con = console
            con.warn('当前浏览器不支持自动滚动到指定控件……')
            this.$message({ message: '表单验证未通过', type: 'warning' })
          }
        }
        reject(message)
      }

      return new Promise((resolve, reject) => {
        // 验证主表
        generateForm.validate((valid, invalidFields) => {
          if (valid) {
            resolve()
          } else {
            let failName = Object.keys(invalidFields)[0]
            let field = null
            _utils.recursiveAllWidget(this.data.list, (item, parent, breakFn) => {
              let flag = false
              if (parent != null) {
                if (parent.type.indexOf('sub-table') === -1 && field == null) {
                  flag = true
                }
              } else if (field == null) {
                flag = true
              }
              if (flag && item.model === failName) {
                field = item
                breakFn()
              }
            })
            let element = document.getElementById(field.key)
            scrollAndReject(element, reject, new Error('表单数据校验失败').message)
          }
        })
      }).then(() => {
        // 验证子表
        return new Promise((resolve, reject) => {
          let error = 0
          let promiseAll = [Promise.resolve()]

          // 递归校验所有子表
          const recursiveAllSubTable = (refs) => {
            // 可能是 GenerateFormItem 或 JFormItem
            if (refs.formItem) {
              for (let fitem of refs.formItem) {
                recursiveAllSubTable(fitem.$refs)
              }
            } else if (refs.jGrid) {
              recursiveAllSubTable(refs.jGrid.$refs)
            } else if (refs.jCard) {
              recursiveAllSubTable(refs.jCard.$refs.jFormItem.$refs)
            } else if (refs.jTabs) {
              for (let jfitem of refs.jTabs.$refs.jFormItem) {
                recursiveAllSubTable(jfitem.$refs)
              }
            } else if (refs.jeditable) {
              // 校验子表
              let checkResult = refs.jeditable.checkValues()
              if (checkResult instanceof Promise) {
                promiseAll.push(checkResult)
              } else if (!checkResult) {
                // 表单验证未通过，error + 1
                error++
              }
            }
          }
          try {
            recursiveAllSubTable(this.$refs)
            this.$nextTick(() => {
                Promise.all(promiseAll).then(() => {
                  (error === 0) ? resolve(this.models) : scrollAndReject(null, reject, '子表单数据校验失败')
                }, () => {
                  error++
                  scrollAndReject(null, reject, '子表单数据校验失败')
                })
            })
          } catch (e) {
            scrollAndReject(null, reject, '子表单数据校验失败:' + e.errorMessage)
            console.error(e)
          }
        })
      })

      // update-end--Author:sunjianlei Date:20190628 for：新增子表校验 -----------
    },
    refresh() {

    },

    // update-begin--Author:sunjianlei Date:20190704 for：新增自定义方法 -----------
    handlePopupCgreportOk(values) {
      values.forEach((item) => {
        let { text, value } = item
        this.$set(this.models, text, value)
      })
    },

    handleDialogChange(val) {
      this.$emit('dialog-change', val)
    },

    /** 获取类名 */
    getClassName(element) {
      let {className} = element
      if (typeof className === 'string') {
        return className.split(' ')
      }
      return []
    },
    // update-end--Author:sunjianlei Date:20190704 for：新增自定义方法 -----------
    
    // update-start--Author:mx Date:20190724 for：选项关联 --
    recurLinkage(arr){
      // 递归需要隐藏的可以创建管线选项的组件
      let valArr = []
      let that = this;
      function asd(arr){
        that.data.list.forEach(it=>{
          arr.forEach(item=>{
            if(it.model === item){
              let fils = it.createLinkage === true || it.type === 'select' && !it.options.multiple // && !it.options.showLabel
              if(fils){
                let valarr1 = []
                it.behaviorLinkage.forEach(its=>{
                  valArr = valArr.concat(...its.targets)
                  valarr1 = valarr1.concat(...its.targets)
                })
                asd(valarr1);
              }
            }
          })
        })
        return valArr
      }
      asd(arr);
      return valArr
    },
    targetsResult(arr){
      let val = []
      this.data.list.forEach(it=>{
        arr.forEach(item=>{
          if(it.model === item){
            let fils = it.createLinkage === true || it.type === 'select' && !it.options.multiple // && !it.options.showLabel
            if(fils && it.options.remote === false){
              it.behaviorLinkage.forEach(ip=>{
                if(ip.value === it.options.defaultValue){
                  val.push(...ip.targets)
                }
              })
            }
          }
        })
      })
      val = val.concat(...arr)
      return uniq(val)
    },
    inpAsso(val){
      this.$nextTick(()=>{
        // 多个关联同一个组建有问题\
        let val1 = val.val;
        let val2 = val.behaviorLinkage;
        let model = val.model;
        let targets = [];
        let targets1 = [];

        val2.forEach(item=>{
          if(item.value === val1){
            targets = item.targets // 我要展示组件
          }else if(item.targets){
            targets1 = targets1.concat(...item.targets) // 我要屏蔽组件
          }
        });
        //  控制展示


        // pullAll 返回不相同的值
        // 对比去重剩余这些组件需要隐藏
        targets1 = targets1.length > 0 ? uniq(targets1) : [];
        targets1 = targets1.concat(this.recurLinkage(targets1))
        let b1PullAll = pullAll(targets1,targets);
        b1PullAll = uniq(b1PullAll)
        let a1 = []

        // 获取当前list所有展示组件
        this.data.list.forEach(item=>{
          // assostatus
          if(item.createLinkage === true || item.type === 'select' && !item.options.multiple){
            if(item.model !== model){
              item.behaviorLinkage.forEach(it=>{
                // 不拿被隐藏的select
                //console.log(it.value === item.options.defaultValue , item,!b1PullAll.includes(item.model),it,item.options.defaultValue)
                if(it.value === (item.options.defaultValue || this.models[item.model]) && !b1PullAll.includes(item.model)){
                  a1.push(...it.targets)
                }
              })
            }
          }
        })
        // 当前操作需要隐藏的组件与全部list需要展示的组件在做一边去重，用老判断当前需要隐藏的组件是否在其他组件中被展示了，如果被展示了还是让他展示，如果没有就取出来
        let b2PullAll = pullAll(b1PullAll,a1); // 
        b2PullAll.forEach(item=>{
          this.$delete(this.models,item)
        })

        
        // 
        targets = this.targetsResult(targets)
        this.data.list.map(item =>{
          // let obj = {...item}
          // 如果当前组件包含在隐藏中的则位1 让他隐藏
          if(b2PullAll.includes(item.model)){
            item.assoStatus = 1;
          }
          if(targets.includes(item.model)){
            item.assoStatus = 2;
          }else
          return item;
        })
        // let s = cloneDeep(this.models)
        // this.models = s;
        // 这里可能有问题，后续再解决， 清除重复展示的校验
        setTimeout(()=>{
          this.$refs.generateForm.clearValidate(targets)
        },0)
        /**/
      })
      
    },
    inpAssa(val){
      // this.$emit("inpAssa",val)
      let val1 = val.val;
      let val2 = val.twolevelLinkage;
      let model = val.model;
      let element = val.element
      if(!val1){
        return
      }
      

      let objtw = []//{}
      let ajaxArr = []
      let objw = {}
      this.data.list.forEach(item => {
        val.twolevelLinkage.forEach((it,index) => {
          if(it === item.model){
            // objtw[it] = item;
            objtw.push(item)
            let paramser = {}
            if(item.options.remote === 'dict_obj'){
              //对象字典
              paramser = {
                tableName:item.options.dictObjCode,
                valueField:item.options.props.objValue,
                labelField:item.options.props.objLabel,
                foreignKey:item.options.props.primaryKey,
                mainTableName:element.options.dictObjCode,
                mainValueField:element.options.props.objValue,
                mainValue:val1
              }
            }
            ajaxArr.push(getAction('/sys/dict/getSubTableDictItems',paramser))
          }
        })
      })
      Promise.all(ajaxArr).then(res=>{
        res.forEach((response,index)=>{
          let remoteOptions = null
            // 返回值可能存在的情况：
            // 1、直接返回了个数组
            // 2、result是个数组
            // 3、result.records是个数组（后台包裹了分页对象）
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
                    value: item.value,
                    label: item.label,
                    text: item.text,
                  }
                })
              }
            }
            objw[objtw[index].model] = remoteOptions
        })
        this.data.list = this.data.list.map(it => {
          Object.keys(objw).forEach(ip => {
            if(ip === it.model){
              it.remoteOptionstw = objw[ip]
            }
          })
          return it;
        })
      })
    },
    clearp(val){
      this.data.list = this.data.list.map(it => {
          val.twolevelLinkage.forEach(item=>{
            if(item === it.model){
              it.remoteOptionstw = []
            }
          })
        return it;
      })
    }
    // update-end--Author:mx Date:20190724 for：选项关联 --
  },
  watch: {
    // update-begin--Author:sunjianlei Date:20200207 for：设备变化处理 -----------
    device: {
      immediate: true,
      handler() {
        const cssExpandId = '__view-css-expand'
        let { css: userCss, url: { css: userCssUrl } } = this.getExpand()

        // 手机模式下禁用css增强
        if (this.isMobile) {
          // 在移动端页面上禁用css增强
          cssExpand('', cssExpandId)
        } else {
          cssExpand(userCss, cssExpandId)
          // 加载远程的 CSS
          userCssUrl = (userCssUrl || '').trim()
          if (userCssUrl) {
            execRemoteAPI.get(userCssUrl).then(res => {
              if (res.status === 200) {
                cssExpand(userCss + '\n\n/* --- remote css --- */\n\n' + res.data, cssExpandId)
              }
            })
          }

        }
      },
    },
    // update-end--Author:sunjianlei Date:20200207 for：设备变化处理 -----------

    data: {
      deep: true,
      immediate: true,
      handler(val) {
        // update-begin--Author:sunjianlei Date:20191031 for：旧版本兼容 -----------
        updateOldVersionJSON(val)
        // update-end--Author:sunjianlei Date:20191031 for：旧版本兼容 -----------

        // update-begin--Author:sunjianlei Date:20200302 for： 重新渲染 {{ }} 变量 -----------
        this.handlerWatchData()
        // update-end--Author:sunjianlei Date:20200302 for： 重新渲染 {{ }} 变量 -----------

        this.generateModel(val.list)
      }
    },
    value: {
      deep: true,
      handler(val) {
        this.models = {...this.models, ...val}
      }
    }
  }
}
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>
<style lang="scss" scoped>
  .j-btn-print {
    color: #aaaaaa;
    font-size: 20px;
    padding: 0 0 4px 0;

    &:hover {
      color: #409EFF;
    }
  }
</style>
