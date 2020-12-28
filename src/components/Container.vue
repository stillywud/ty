<template>
  <el-container class="fm2-container">
    <el-main class="fm2-main">
      <el-container>
        <el-aside style="wdith: 250px;">

          <div class="components-list">
            <div class="widget-cate">基础字段</div>
            <draggable tag="ul" :list="basicComponents"
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @end="handleMoveEnd"
              @start="handleMoveStart"
              :move="handleMove"
            >
              <!-- update-begin--Author:sunjianlei Date:20190530 for：新增class配置选项 -->
              <template v-for="(item, index) in basicComponents">
                <li :key="index" class="form-edit-widget-label" :class="item.class" :data-type="item.type">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </template>
              <!-- update-end--Author:sunjianlei Date:20190530 for：新增class配置选项 -->
            </draggable>

            <div class="widget-cate">高级字段</div>
            <draggable tag="ul" :list="advanceComponents"
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @end="handleMoveEnd"
              @start="handleMoveStart"
              :move="handleMove"
            >

              <!-- update-begin--Author:sunjianlei Date:20190530 for：新增class配置选项 -->
              <template v-for="(item, index) in advanceComponents">
                <li :key="index" class="form-edit-widget-label" :class="item.class" :data-type="item.type">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </template>
              <!-- update-end--Author:sunjianlei Date:20190530 for：新增class配置选项 -->
            </draggable>

            <div class="widget-cate">布局字段</div>
            <draggable tag="ul" :list="layoutComponents"
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @end="handleMoveEnd"
              @start="handleMoveStart"
              :move="handleMove"
            >

              <li class="form-edit-widget-label data-grid" v-for="(item, index) in layoutComponents" :key="index" :data-type="item.type">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>

            <!-- update-begin--Author:sunjianlei Date:20190606 for：新增JEECG组件 -->
            <div class="widget-cate">JEECG 字段</div>
            <draggable tag="ul" :list="jeecgComponents"
                       v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                       @end="handleMoveEnd"
                       @start="handleMoveStart"
                       :move="handleMove"
            >

              <li class="form-edit-widget-label" v-for="(item, index) in jeecgComponents" :key="index" :data-type="item.type">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>
            <!-- update-end--Author:sunjianlei Date:20190606 for：新增JEECG组件 -->

            <!-- update-begin--Author:mx Date:20210101 for：扩展组件 -->
            <div class="widget-cate">扩展</div>
            <draggable tag="ul" :list="tyComponents"
              v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              @end="handleMoveEnd"
              @start="handleMoveStart"
              :move="handleMove"
            >

              <li class="form-edit-widget-label data-grid" v-for="(item, index) in tyComponents" :key="index" :data-type="item.type">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>
            <!-- update-start--Author:mx Date:20210101 for：扩展组件 -->

          </div>

        </el-aside>
        <el-container class="center-container" direction="vertical">
          <el-header class="btn-bar" style="height: 45px;">
            <slot name="action">
            </slot>
            <el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">导入JSON</el-button>
            <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
            <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">生成JSON</el-button>
            <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">生成代码</el-button>
          </el-header>
          <el-main class="widget-main" :class="{'widget-empty': widgetForm.list.length == 0}">

            <widget-form v-if="!resetJson"  ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
          </el-main>
        </el-container>

        <el-aside class="widget-config-container">
          <el-container>
            <el-header height="45px">
              <div class="config-tab" :class="{active: configTab=='widget','tab-two':!debug}" @click="handleConfigSelect('widget')">字段属性</div>
              <div class="config-tab" :class="{active: configTab=='form','tab-two':!debug}" @click="handleConfigSelect('form')">表单属性</div>
              <div v-if="debug" class="config-tab" :class="{active: configTab=='debug'}" @click="handleConfigSelect('debug')">调试配置</div>
            </el-header>
            <el-main class="config-content">
              <!-- update-begin--Author:sunjianlei Date:20190524 for：新增Online对接参数 -->
              <widget-config v-show="configTab=='widget'" :data="widgetFormSelect" :cgform="currentCgform" :list="widgetForm.list"/>
              <form-config v-show="configTab=='form'" :data="widgetForm.config" @cgformChange="handleCgformChange"/>
              <debug-config v-show="configTab=='debug'" :data="widgetForm.config"/>
              <!-- update-end--Author:sunjianlei Date:20190524 for：新增Online对接参数 -->
            </el-main>
          </el-container>

        </el-aside>

        <!-- update-begin--Author:sunjianlei Date:20190716 for：新增用户自定义弹窗边距 -->
        <cus-dialog
          :title="previewTitle"
          :visible="previewVisible"
          @on-close="previewVisible = false"
          ref="widgetPreview"
          @on-submit="handleTest"
          width="1000px"
          form
          :center="false"
          :dialogOptions="(generateWidgetForm.config||{}).dialogOptions"
          switchFullscreen
        >{{generateWidgetForm}}=={{widgetModels}}=={{generateUserInfo}}
          <generate-form insite="true" v-if="previewVisible" :data="generateWidgetForm" :userInfo="generateUserInfo" :value="widgetModels" :remote="remoteFuncs" ref="generateForm" :readOnly="readOnly" action="preview">

            <template v-slot:blank="scope">
              宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
              高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
            </template>
          </generate-form>
        </cus-dialog>
        <!-- update-end--Author:sunjianlei Date:20190716 for：新增用户自定义弹窗边距 -->

        <cus-dialog
          :visible="uploadVisible"
          @on-close="uploadVisible = false"
          @on-submit="handleUploadJson"
          ref="uploadJson"
          width="800px"
          form
        >
          <el-alert type="info" title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"></el-alert>
          <div id="uploadeditor" style="height: 400px;width: 100%;">{{jsonEg}}</div>
        </cus-dialog>

        <cus-dialog
          :visible="jsonVisible"
          @on-close="jsonVisible = false"
          ref="jsonPreview"
          width="800px"
          form
        >

          <div id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</div>

          <template slot="action">
            <el-button id="copybtn" data-clipboard-target=".ace_text-input">双击复制</el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          :visible="codeVisible"
          @on-close="codeVisible = false"
          ref="codePreview"
          width="800px"
          form
          :action="false"
        >
          <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
        </cus-dialog>
      </el-container>
    </el-main>
    <el-footer height="30px">Powered by <a target="_blank" href="http://www.jeecg.org">JEECG BOOT</a></el-footer>
  </el-container>

</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
import Clipboard from 'clipboard'

// update-begin--Author:sunjianlei Date:20190722 for：新增import ------------
import { recursiveAllWidget, defaultDialogOptions, updateOldVersionJSON, cloneObject } from '@/util/utils'
// update-end--Author:sunjianlei Date:20190722 for：新增import ------------


// update-begin--Author:sunjianlei Date:20190606-20210101 for：新增JEECG组件 ------------
import {basicComponents, layoutComponents, advanceComponents, jeecgComponents, tyComponents} from './componentsConfig.js'
// update-end--Author:sunjianlei Date:20190606 for：新增JEECG组件 --------------
import {loadJs, loadCss} from '../util/index.js'
import request from '../util/request.js'
import generateCode from './generateCode.js'

// update-begin--Author:sunjianlei Date:20190528 for：将请求写在源码内部，token通过参数传入 --------------------
import _api from '../api'
import * as _authAPI from '../api/auth'
import {ACCESS_TOKEN, BASE_URL} from '@/api/request'
import { changeTheme } from '@/util/theme'
import DebugConfig from '@/components/DebugConfig'
// update-end--Author:sunjianlei Date:20190528 for：将请求写在源码内部，token通过参数传入 --------------------

export default {
  name: 'jm-design-form',
  components: {
    DebugConfig,
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm
  },
  props: {
    preview: {
      type: Boolean,
      default: false
    },
    generateCode: {
      type: Boolean,
      default: false
    },
    generateJson: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: false
    },
    // update-begin--Author:sunjianlei Date:20190524 for：新增Online对接、数据字典参数 --------------------
    // Online表单字段
    onlineFields: {
      type: Array,
      default: () => []
    },
    // update-end--Author:sunjianlei Date:20190524 for：新增Online对接、数据字典参数 --------------------

    // update-begin--Author:sunjianlei Date:20190528 for：将请求写在源码内部，token通过参数传入 --------------------
    baseUrl: {
      type: String,
      default: null
    },
    accessToken: {
      type: String,
      default: null
    },
    // update-end--Author:sunjianlei Date:20190528 for：将请求写在源码内部，token通过参数传入 --------------------

    // update-begin--Author:sunjianlei Date:20190628 for：新增更多自定义参数 --------------------
    // 只读模式
    readOnly: {
      type: Boolean,
      default: false
    },
    // 是否启用调试模式
    debug: { type: Boolean, default: true }
    // update-end--Author:sunjianlei Date:20190628 for：新增更多自定义参数 --------------------

  },
  data () {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      // update-begin--Author:sunjianlei Date:20190606 for：新增JEECG组件 ------------
      jeecgComponents,
      tyComponents,
      // update-end--Author:sunjianlei Date:20190606 for：新增JEECG组件 ------------

      resetJson: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'top',
          size: 'small',
          // update-begin--Author:sunjianlei Date:20190712 for：表单自定义属性
          dialogOptions: defaultDialogOptions(),
          expand: {
            js: "",
            css: "",
            url: {
              js: '',
              css: '',
            },
          },
          // 自定义请求地址（用于接收表单数据）
          customRequestURL: [{ url: '' }],
          // 是否允许打印
          allowPrint: false,
          // 是否允许打开外部链接
          allowExternalLink: false,
          // 是否禁用自适应
          disabledAutoGrid: false,
          // 设计移动视图
          designMobileView: false,
          // 自定义URL是否启用事务
          transactional: true,
          // update-end--Author:sunjianlei Date:20190712 for：表单自定义属性
        },
      },
      // update-begin--Author:sunjianlei Date:20190708 for：防止修改了属性后导致设计器也被修改、表单生成器其他属性 --------------
      generateWidgetForm: {},
      generateUserInfo: {},
      previewTitle: null,
      // update-end--Author:sunjianlei Date:20190708 for：防止修改了属性后导致设计器也被修改、表单生成器其他属性 --------------
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
      remoteFuncs: {
        func_test (resolve) {
          setTimeout(() => {
            const options = [
              {id: '1', name: '1111'},
              {id: '2', name: '2222'},
              {id: '3', name: '3333'}
            ]

            resolve(options)
          }, 2000)
        },
        funcGetToken (resolve) {
          // update-begin--Author:sunjianlei Date:20190711 for：修改获取token的方式 -----------
          _api.getQiniuUploadToken().then(res => {
            resolve(res.message)
          })
          // update-end--Author:sunjianlei Date:20190711 for：修改获取token的方式 -----------
        },
        func_cascader (resolve) {
            const options = [{
              value: 'zhinan',
              label: '指南',
              children: [{
                value: 'shejiyuanze',
                label: '设计原则',
                children: [{
                  value: 'yizhi',
                  label: '一致'
                }, {
                  value: 'fankui',
                  label: '反馈'
                }, {
                  value: 'xiaolv',
                  label: '效率'
                }, {
                  value: 'kekong',
                  label: '可控'
                }]
              }, {
                value: 'daohang',
                label: '导航',
                children: [{
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                }, {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }]
              }]
            }, {
              value: 'zujian',
              label: '组件',
              children: [{
                value: 'basic',
                label: 'Basic',
                children: [{
                  value: 'layout',
                  label: 'Layout 布局'
                }, {
                  value: 'color',
                  label: 'Color 色彩'
                }, {
                  value: 'typography',
                  label: 'Typography 字体'
                }, {
                  value: 'icon',
                  label: 'Icon 图标'
                }, {
                  value: 'button',
                  label: 'Button 按钮'
                }]
              }, {
                value: 'form',
                label: 'Form',
                children: [{
                  value: 'radio',
                  label: 'Radio 单选框'
                }, {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                }, {
                  value: 'input',
                  label: 'Input 输入框'
                }, {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                }, {
                  value: 'select',
                  label: 'Select 选择器'
                }, {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                }, {
                  value: 'switch',
                  label: 'Switch 开关'
                }, {
                  value: 'slider',
                  label: 'Slider 滑块'
                }, {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                }, {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                }, {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                }, {
                  value: 'upload',
                  label: 'Upload 上传'
                }, {
                  value: 'rate',
                  label: 'Rate 评分'
                }, {
                  value: 'form',
                  label: 'Form 表单'
                }]
              }, {
                value: 'data',
                label: 'Data',
                children: [{
                  value: 'table',
                  label: 'Table 表格'
                }, {
                  value: 'tag',
                  label: 'Tag 标签'
                }, {
                  value: 'progress',
                  label: 'Progress 进度条'
                }, {
                  value: 'tree',
                  label: 'Tree 树形控件'
                }, {
                  value: 'pagination',
                  label: 'Pagination 分页'
                }, {
                  value: 'badge',
                  label: 'Badge 标记'
                }]
              }, {
                value: 'notice',
                label: 'Notice',
                children: [{
                  value: 'alert',
                  label: 'Alert 警告'
                }, {
                  value: 'loading',
                  label: 'Loading 加载'
                }, {
                  value: 'message',
                  label: 'Message 消息提示'
                }, {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                }, {
                  value: 'notification',
                  label: 'Notification 通知'
                }]
              }, {
                value: 'navigation',
                label: 'Navigation',
                children: [{
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                }, {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                }, {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                }, {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                }, {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }]
              }, {
                value: 'others',
                label: 'Others',
                children: [{
                  value: 'dialog',
                  label: 'Dialog 对话框'
                }, {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                }, {
                  value: 'popover',
                  label: 'Popover 弹出框'
                }, {
                  value: 'card',
                  label: 'Card 卡片'
                }, {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                }, {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }]
              }]
            }, {
              value: 'ziyuan',
              label: '资源',
              children: [{
                value: 'axure',
                label: 'Axure Components'
              }, {
                value: 'sketch',
                label: 'Sketch Templates'
              }, {
                value: 'jiaohu',
                label: '组件交互文档'
              }]
            }]

            resolve(options)
        },
        upload_callback (response, file, fileList) {
          console.log('callback', response, file, fileList)
        }
      },
      widgetModels: {
      },
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
      uploadEditor: null,
      jsonEg: `{
  "list": [
    {
      "type": "input",
      "name": "单行文本",
      "icon": "icon-input",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "remoteFunc": ""
      },
      "key": "1540908864000_94322",
      "model": "input_1540908864000_94322",
      "rules": [
        {
          "type": "string",
          "message": "单行文本格式不正确"
        }
      ]
    },
    {
      "type": "textarea",
      "name": "多行文本",
      "icon": "icon-textarea",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "pattern": "",
        "placeholder": "",
        "remoteFunc": ""
      },
      "key": "1540908876000_19435",
      "model": "textarea_1540908876000_19435",
      "rules": []
    }
  ],
  "config": {
    "labelWidth": 100,
    "labelPosition": "top",
    "size": "small"
  }
}`,

      // update-begin--Author:sunjianlei Date:20190528 for：新增内部查询方法 --------------------
      currentCgform: {id: null}
      // update-end--Author:sunjianlei Date:20190528 for：新增内部查询方法 --------------------

    }
  },
  // update-begin--Author:sunjianlei Date:20191205 for：动态换肤 --------------------
  beforeCreate(){
    changeTheme(window['THEME_COLOR'])
  },
  // update-end--Author:sunjianlei Date:20191205 for：动态换肤 --------------------
  created() {
    // update-begin--Author:sunjianlei Date:20190709 for：查询出当前登录的用户信息 --------------------
    _api.queryUserInfoByToken().then(res => {
      if (res.success) {
        this.generateUserInfo = res.result
      } else {
        console.error('queryUserInfoByToken error:', res)
      }
    })

    if (!window.desformCode) {
      window.desformId = '82cb98aa29ecd2c19749a8404485608d'
      window.desformCode = 'test_auth'
    }

    // update-end--Author:sunjianlei Date:20190709 for：查询出当前登录的用户信息 --------------------
  },
  mounted () {
    if (window.desformName) this.previewTitle = window.desformName
  },
  methods: {
    handleGoGithub () {
      window.location.href = 'https://github.com/GavinZhuLei/vue-form-making'
    },
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleMoveEnd (evt) {
      // console.log('end', evt)
    },
    handleMoveStart ({oldIndex}) {
      // console.log('start', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true
    },
    handlePreview () {
      // update-begin--Author:sunjianlei Date:20190708 for：防止修改了属性后导致设计器也被修改
      this.generateWidgetForm = this.getJSON()
      this.previewVisible = true
    },
    handleTest () {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e=>{})
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    handleGenerateJson () {
      this.jsonVisible = true
      this.jsonTemplate = this.getJSON()
      console.log(JSON.stringify(this.jsonTemplate))
      this.$nextTick(() => {

        const editor = ace.edit('jsoneditor')
        editor.session.setMode("ace/mode/json")

        const btnCopy = new Clipboard('#copybtn')
      })
    },
    handleGenerateCode () {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.getJSON()))
      this.$nextTick(() => {
        const editor = ace.edit('codeeditor')
        editor.session.setMode("ace/mode/html")
      })
    },
    handleUpload () {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.uploadEditor = ace.edit('uploadeditor')
        this.uploadEditor.session.setMode("ace/mode/json")
      })
    },
    handleUploadJson () {
      try {
        this.setJSON(JSON.parse(this.uploadEditor.getValue()))
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    getJSON() {
      // update-begin--Author:sunjianlei Date:20190722 for：去除不对外开放的字段
      let json = cloneObject(this.widgetForm)

      console.info('GetJSON Native: ', cloneObject(json))

      // 去除不对外的字段
      delete json.updated
      let blackList = ['dictOptions', 'jeecg_auth']
      // 保存权限
      let auths = []
      recursiveAllWidget(json.list, (item, parent) => {
        if (item.jeecg_auth && item.jeecg_auth.enabled) {
          let foo = {
            desformCode: window.desformCode,
            authComKey: item.key,
            authTitle: item.jeecg_auth.title,
            authField: item.jeecg_auth.field,
            subTable: item.isSubItem
          }
          if (item.isSubItem) {
            foo['subKey'] = parent.key
            foo['subTitle'] = parent.name
          }
          auths.push(foo)
        }

        blackList.forEach(b => {
          eval(`delete item.${b}`)
        })
      })

      // 将权限设置保存至数据库
      if (auths.length > 0) _authAPI.updateBatch(auths).then()

      return json
      // update-end--Author:sunjianlei Date:20190722 for：去除不对外开放的字段
    },
    getHtml () {
      return generateCode(JSON.stringify(this.getJSON()))
    },
    setJSON (json) {

      // update-begin--Author:sunjianlei Date:20190628 for：旧版本兼容 --------------------
      updateOldVersionJSON(json)
      // update-end--Author:sunjianlei Date:20190628 for：旧版本兼容 --------------------

      // update-begin--Author:sunjianlei Date:20190628 for：查询权限控制 --------------------
      _authAPI.queryByDesformCode().then(res => {
        if (res && res.success) {
          let map = {}
          res.result.forEach(item => {
            let temp = map[item.authComKey]
            if (temp instanceof Array) {
              temp.push(item)
            } else {
              map[item.authComKey] = [item]
            }
          })
          return Promise.resolve(map)
        }
        return Promise.resolve(null)
      }).catch(e => {
        console.error(e)
        return Promise.resolve(null)
      }).then(authsMap => {
        window['__authsMap'] = authsMap
        recursiveAllWidget(json.list, (item) => {
          if (authsMap && authsMap[item.key]) {
            let { authTitle, authField } = authsMap[item.key][0]
            item.jeecg_auth = { enabled: true, title: authTitle, field: authField }
          } else {
            item.jeecg_auth = { enabled: false, title: null, field: null }
          }
        })
      })
      // update-end--Author:sunjianlei Date:20190628 for：查询权限控制 --------------------

      this.widgetForm = json

      if (json.list.length> 0) {
        this.widgetFormSelect = json.list[0]
      }
    },
    handleInput (val) {
      console.log(val)
      this.blank = val
    },
    // update-begin--Author:sunjianlei Date:20190524 for：新增Online对接参数 --------------------
    handleCgformChange(cgform) {
      this.currentCgform = cgform
    }
    // update-end--Author:sunjianlei Date:20190524 for：新增Online对接参数 --------------------
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
        // console.log(this.$refs.widgetForm)
      }
    },
    // update-begin--Author:sunjianlei Date:20190625 for：提示选择Online表单 -------
    'widgetFormSelect.options.subTableName': {
      handler: function (val) {
        if (val === '__reselect-cgform__') {
          this.configTab = 'form'
          this.widgetFormSelect.options.subTableName = ''
        }
      }
    },
    // update-end--Author:sunjianlei Date:20190625 for：提示选择Online表单 -------
  }
}
</script>

<style lang="scss">

  .widget-empty {
    background: white url('../assets/form_empty.png') 50% 50% no-repeat;
  }

</style>
