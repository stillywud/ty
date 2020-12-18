<template>
    <div class="mtt-form-making-model" style="height:100%">
        <div class="mtt-form-making-con">
            <a-layout class="mtt-form-making-wrapper">
                <a-layout>
                    <a-layout-sider :width="250" style="background:#fff">
                        <div class="components-list">
                            <template v-if="basicFields.length">
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
                        </div>
                    </a-layout-sider>
                    <a-layout-content>
                        <a-layout style="height:100%">
                            <a-layout-content class="widget-con">
                                <widget-form 
                                    v-if="!resetJson" 
                                    ref="widgetForm" 
                                    :data="widgetForm" 
                                    :select.sync="widgetFormSelect" />
                            </a-layout-content>
                        </a-layout>
                    </a-layout-content>
                    <a-layout-sider :width="300" style="background:#fff" class="widget-config-container">
                        <a-layout-header height="45px" style="background:#fff">
                            <div class="config-tab">字段属性</div>
                        </a-layout-header>
                        <a-layout-content class="config-content">
                            <widget-config v-show="configTab=='widget'" :data="widgetFormSelect"></widget-config>
                        </a-layout-content>
                    </a-layout-sider>
                </a-layout>
            </a-layout>
        </div>
    </div> 
</template>
<script>
import draggable from 'vuedraggable'
import WidgetForm from './WidgetForm.vue'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import {basicComponents} from './config.js'
export default {
    name:"df-index",
    data(){
        return{
            basicComponents,
            visible:true,
            basicFields:['input','ref_form','textarea','number','checkbox','radio','select','datetime','date','upload','timer','tabs','card'],
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
            widgetModels: {},
            blank: '',
            jsonTemplate: '',
            uploadEditor: null,
            jsonCopyValue: '',
            jsonClipboard: null,
        }
    },
    components:{
        draggable,
        WidgetForm,
        WidgetConfig,
        FormConfig,
    },
    mounted(){
        if (this.widgetForm.list.length> 0) {
            this.widgetFormSelect = this.widgetForm.list[0]
        }
    },
    methods:{
        edit(o){
            if(typeof o === 'object'){
                this.widgetForm = o;
                 this.widgetFormSelect = this.widgetForm.list[0]
            }
            console.log(this.widgetForm)
        },
        handleMoveEnd: function() {},
        handleMoveStart: function(e) {
            e.oldIndex
        },
        handleMove: function() {
            return !0
        },
    }
}
</script>
<style lang="less">
.mtt-form-making-model{
    li, ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }
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
        .ant-modal-content{
            height: 100vh;
        }
        .ant-modal-body{
            // height: calc(100vh - 47px);
            padding: 0;
        }
    }
    .mtt-form-making-con{
        height: 100%;
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
            .ant-btn-icon-danger{
                color: #f56c6c;
                border-radius: 100%;
            }
            .ant-layout-sider-children{
                    display: flex;
                flex-direction: column;
            }
            .config-content{
                flex:1;
                overflow: auto;
                padding: 10px;
            }
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