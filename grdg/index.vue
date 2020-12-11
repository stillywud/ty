<template>
    <div>
        <a-modal 
        v-model="visible" 
        title="表单设计器" 
        width="100%" 
        :footer="null"
        class="mtt-form-making-model fullscreen">
            <div class="mtt-form-making-con">
                <a-layout class="mtt-form-making-wrapper">
                    <a-layout>
                        <a-layout-sider :width="250" style="background:#fff">
                            <div class="components-list">
                                <template v-if="basicFields.length">
                                    <div class="widget-cate">基础字段</div>
                                    <draggable tag="ul" :list="basicComponents" 
                                    v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                                    @end="handleMoveEnd"
                                    @start="handleMoveStart"
                                    :move="handleMove"
                                    >
                                    <template v-for="(item, index) in basicComponents">
                                        <li 
                                            v-if="basicFields.indexOf(item.type)>=0" 
                                            class="form-edit-widget-label" 
                                            :key="index">
                                            <a>
                                                <span>{{item.name}}</span>
                                            </a>
                                        </li>
                                    </template>
                                    </draggable>
                                </template>

                                <!-- <template v-if="layoutFields.length">
                                    <div class="widget-cate">{{$t('fm.components.layout.title')}}</div>
                                    <draggable tag="ul" :list="layoutComponents" 
                                    v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                                    @end="handleMoveEnd"
                                    @start="handleMoveStart"
                                    :move="handleMove"
                                    >
                                    
                                    <li v-if="layoutFields.indexOf(item.type) >=0" class="form-edit-widget-label no-put" v-for="(item, index) in layoutComponents" :key="index">
                                        <a>
                                        <i class="icon iconfont" :class="item.icon"></i>
                                        <span>{{item.name}}</span>
                                        </a>
                                    </li>
                                    </draggable>
                                </template> -->
                            </div>
                        </a-layout-sider>
                        <a-layout-content>
                            <a-layout style="height:100%">
                                <a-layout-header class="btn-bar">
                                    <a-space>
                                        <a-button  type="primary" @click="handlePreview">预览</a-button>
                                        <a-button type="primary" @click="handleSaveForm">保存</a-button>
                                        <a-button type="primary" @click="handleClose">关闭</a-button>
                                     </a-space>
                                </a-layout-header>
                                <a-layout-content class="widget-con">
                                    <widget-form 
                                        v-if="!resetJson" 
                                        ref="widgetForm" 
                                        :data="widgetForm" 
                                        :select.sync="widgetFormSelect"></widget-form>
                                </a-layout-content>
                            </a-layout>
                        </a-layout-content>
                        <a-layout-sider :width="300" style="background:#fff" class="widget-config-container">
                            <a-layout>
                                <a-layout-header height="45px" style="background:#fff">
                                    <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
                                    <!-- <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div> -->
                                </a-layout-header>
                                <a-layout-content class="config-content">
                                    <widget-config v-show="configTab=='widget'" :data="widgetFormSelect"></widget-config>
                                    <!-- <form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config> -->
                                </a-layout-content>
                            </a-layout>
                        </a-layout-sider>
                    </a-layout>
                    <a-layout-footer style="padding:0 10px">Footer</a-layout-footer>
                </a-layout>
            </div>
        </a-modal>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import WidgetForm from './Widgetform.vue'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import {basicComponents,layoutComponents} from './config.js'
export default {
    name:"df-index",
    data(){
        return{
            basicComponents,
            // layoutComponents,
            visible:true,
            basicFields:['input','textarea'],
            // layoutFields:['grid'],
            resetJson: false,
            widgetForm: {
                list: [],
                config: {
                    labelWidth: 100,
                    labelPosition: 'right',
                    size: 'small'
                },
            },
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
          request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
            resolve(res.uptoken)
          })
        },
        upload_callback (response, file, fileList) {
          console.log('callback', response, file, fileList)
        }
      },
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      vueTemplate: '',
      jsonTemplate: '',
      uploadEditor: null,
      jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `{
  "list": [],
  "config": {
    "labelWidth": 100,
    "labelPosition": "top",
    "size": "small"
  }
}`,
      codeActiveName: 'vue',
        }
    },
    components:{
        draggable,
        WidgetForm,
        WidgetConfig,
        FormConfig,
    },
    methods:{
  handleGoGithub: function() {
                        window.location.href = "https://github.com/GavinZhuLei/vue-form-making"
                    },
                    handleConfigSelect: function(e) {
                        this.configTab = e
                    },
                    handleMoveEnd: function() {},
                    handleMoveStart: function(e) {
                        e.oldIndex
                    },
                    handleMove: function() {
                        return !0
                    },
                    handlePreview: function() {
                        this.generateWidgetForm = this.getJSON(), this.$refs.previewDialog.show()
                    },
                    handleGenerateJson: function() {
                        this.jsonVisible = !0, this.jsonTemplate = this.getJSON(), this.$nextTick(function() {
                            ace.edit("jsoneditor").session.setMode("ace/mode/json");
                            new clipboard__WEBPACK_IMPORTED_MODULE_9___default.a("#copybtn")
                        })
                    },
                    handleGenerateCode: function() {
                        this.codeVisible = !0, this.htmlTemplate = Object(_generateCode_js__WEBPACK_IMPORTED_MODULE_14__.a)(JSON.stringify(this.getJSON())), this.$nextTick(function() {
                            ace.edit("codeeditor").session.setMode("ace/mode/html")
                        })
                    },
                    handleUpload: function() {
                        var e = this;
                        this.uploadVisible = !0, this.$nextTick(function() {
                            e.uploadEditor = ace.edit("uploadeditor"), e.uploadEditor.session.setMode("ace/mode/json")
                        })
                    },
                    handleUploadJson: function() {
                        try {
                            this.setJSON(JSON.parse(this.uploadEditor.getValue())), this.uploadVisible = !1
                        } catch (e) {
                            this.$message.error(e.message), this.$refs.uploadJson.end()
                        }
                    },
                    getJSON: function getJSON() {
                        var json = Object(_util_utils__WEBPACK_IMPORTED_MODULE_10__.b)(this.widgetForm);
                        delete json.updated;
                        var blackList = ["dictOptions", "jeecg_auth"],
                            auths = [];
                        return Object(_util_utils__WEBPACK_IMPORTED_MODULE_10__.q)(json.list, function(item, parent) {
                            if (item.jeecg_auth && item.jeecg_auth.enabled) {
                                var foo = {
                                    desformCode: window.desformCode,
                                    authComKey: item.key,
                                    authTitle: item.jeecg_auth.title,
                                    authField: item.jeecg_auth.field,
                                    subTable: item.isSubItem
                                };
                                item.isSubItem && (foo.subKey = parent.key, foo.subTitle = parent.name), auths.push(foo)
                            }
                            blackList.forEach(function(b) {
                                eval("delete item.".concat(b))
                            })
                        }), 0 < auths.length && _api_auth__WEBPACK_IMPORTED_MODULE_16__.f(auths).then(), json
                    },
                    getHtml: function() {
                        return Object(_generateCode_js__WEBPACK_IMPORTED_MODULE_14__.a)(JSON.stringify(this.getJSON()))
                    },
                    setJSON: function(e) {
                        Object(_util_utils__WEBPACK_IMPORTED_MODULE_10__.u)(e), _api_auth__WEBPACK_IMPORTED_MODULE_16__.d().then(function(e) {
                            if (e && e.success) {
                                var n = {};
                                return e.result.forEach(function(e) {
                                    var t = n[e.authComKey];
                                    t instanceof Array ? t.push(e) : n[e.authComKey] = [e]
                                }), Promise.resolve(n)
                            }
                            return Promise.resolve(null)
                        }).catch(function(e) {
                            return Promise.resolve(null)
                        }).then(function(i) {
                            window.__authsMap = i, Object(_util_utils__WEBPACK_IMPORTED_MODULE_10__.q)(e.list, function(e) {
                                if (i && i[e.key]) {
                                    var t = i[e.key][0],
                                        n = t.authTitle,
                                        r = t.authField;
                                    e.jeecg_auth = {
                                        enabled: !0,
                                        title: n,
                                        field: r
                                    }
                                } else e.jeecg_auth = {
                                    enabled: !1,
                                    title: null,
                                    field: null
                                }
                            })
                        }), 0 < (this.widgetForm = e).list.length && (this.widgetFormSelect = e.list[0])
                    },
                    handleInput: function(e) {
                        this.blank = e
                    },
                    handleCgformChange: function(e) {
                        this.currentCgform = e
                    },
        /** 点击保存按钮事件 */
			handleSaveForm: function () {
				var _this = this
				var source = _this.getjson()
				if (source.list.length === 0) {
					_this.postModal('alert-warning', '无法保存空表单', "提示")
					return
				}
				postEvent('request-save', JSON.stringify(source), messageId)
			},

			/** 点击关闭按钮事件 */
			handleClose: function () {
				postEvent('closing', this.getjson(), messageId)
			},

			/** 点击浏览按钮 */
			handlePreview: function () {
				this.$refs.jmform.handlePreview()
			},

			/** 获取设计器json数据 **/
			getjson: function () {
				return this.$refs.jmform.getJSON()
			},
			/** 设置设计器json数据 **/
			setJSON: function (json) {
				this.$refs.jmform.setJSON(json);
			},

			/** 向父级提出弹窗申请 */
			postModal: function (type, content, title, options) {
				postEvent('modal', {
					type: type,
					title: title,
					content: content,
					options: options
				}, messageId)
			},
    }
}
</script>
<style lang="scss">
.mtt-form-making-model{
    &.fullscreen{
        .ant-modal{
            top: 0;
            padding: 0;
            margin: 0;
            height: 100vh;
        }
        .ant-modal-body{
            padding: 12px;
        }
    }
    .mtt-form-making-con{
        height: calc(100vh - 79px);
    }
    .mtt-form-making-wrapper{
        height: 100%;
        .btn-bar{
            background: #fff;
            text-align: right;
        }
        .widget-con{
            padding: 0;
            position: relative;
            background: #fafafa;
        }
        .components-list {
            padding: 8px 0;
            width: 100%;
            height: 100%;
            .widget-cate {
                padding: 8px 12px;
                font-size: 13px;
            }
            ul {
                position: relative;
                overflow: hidden;
                padding: 0 10px 10px;
                margin: 0;
            }
            .form-edit-widget-label {
                font-size: 12px;
                display: block;
                width: 48%;
                line-height: 26px;
                position: relative;
                float: left;
                left: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 1%;
                color: #333 !important;
                border: 1px solid #f4f6fc;
                & >a {
                    display: block;
                    cursor: move;
                    color: #333 !important;
                    background: #f4f6fc;
                    border: 1px solid #f4f6fc;
                    text-align: center;
                }
            }
        }
        .widget-config-container{
            .ant-layout-header{
                padding: 0;
            }
            .config-tab {
                height: 45px;
                line-height: 45px;
                display: inline-block;
                width: 145px;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                position: relative;
                cursor: pointer;
                &.active {
                    border-bottom: 2px solid #409eff;
                }
            }
        }
    }
}
</style>