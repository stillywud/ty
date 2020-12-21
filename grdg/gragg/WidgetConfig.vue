<template>
    <div v-if="show">
        <a-form-model>
            <a-form-model-item label="标题" v-if="!['grid','tabs'].includes(data.type)">
                <a-input v-model="data.name"></a-input>
            </a-form-model-item>
            <a-form-model-item label="占位内容"  v-if="Object.keys(data.options).indexOf('placeholder')>=0 && (data.type!='datetime' || data.type!='date')">
                <a-input v-model="data.options.placeholder"></a-input>
            </a-form-model-item>
            <a-form-model-item label="文本长度" v-if="Object.keys(data.options).indexOf('maxLength')>=0">
                <a-input v-model="data.options.maxLength"></a-input>
            </a-form-model-item>
            <!-- <a-form-model-item label="是否显示标签" v-if="Object.keys(data.options).indexOf('showLabel')>=0">
                <a-switch
                    v-model="data.options.showLabel"
                >
                </a-switch>
            </a-form-model-item> -->
            <a-form-model-item label="选项" v-if="Object.keys(data.options).indexOf('options')>=0">
                <template>
                    <template v-if="data.type=='radio' || (data.type=='select'&&!data.options.multiple)">
                        <a-radio-group v-model="data.options.defaultValue">
                            <draggable tag="ul" :list="data.options.options" 
                                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                                handle=".drag-item"
                            >
                                <li v-for="(item, index) in data.options.options" :key="index" style="margin-bottom:5px" >
                                    <a-radio
                                        :value="item.value" 
                                        style="margin-right: 5px;"
                                    >
                                        <a-input :style="{'width': data.options.showLabel? '90px': '180px' }" v-model="item.label"></a-input>
                                        <a-input style="width:90px;" v-if="data.options.showLabel" v-model="item.value"></a-input>
                                    </a-radio>
                                    <a-icon type="unordered-list" class="drag-item" style="font-size:20px;cursor: move;margin-right:3px"/>
                                    <a-icon type="minus-circle" @click="handleOptionsRemove(index)" class="ant-btn-icon-danger" style="font-size:20px"/>
                                </li>
                            </draggable>
                        </a-radio-group>
                    </template>

                    <template v-if="data.type=='checkbox' || (data.type=='select' && data.options.multiple)" >
                        <a-checkbox-group v-model="data.options.defaultValue">
                            <draggable tag="ul" :list="data.options.options" 
                                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                                handle=".drag-item"
                            >
                                <li v-for="(item, index) in data.options.options" :key="index" style="margin-bottom:5px">
                                    <a-checkbox
                                        :value="item.value"
                                        style="margin-right: 5px;"
                                    >
                                        <a-input :style="{'width': data.options.showLabel? '90px': '180px' }" v-model="item.label"></a-input>
                                        <a-input style="width:90px;" v-if="data.options.showLabel" v-model="item.value"></a-input>
                                    </a-checkbox>
                                    <a-icon type="unordered-list" class="drag-item" style="font-size:20px;cursor: move;margin-right:3px"/>
                                    <a-icon type="minus-circle" @click="handleOptionsRemove(index)" class="ant-btn-icon-danger" style="font-size:20px"/>
                                </li>
                            </draggable>
                        </a-checkbox-group>
                    </template>
                    <div style="margin-left: 22px;">
                        <a-space>
                            <a-button type="text" @click="handleAddOption">添加选项</a-button>
                            <a-button type="text" @click="handleRemoveDefaultValue">清空默认值</a-button>
                        </a-space>
                    </div>
                </template>
                
            </a-form-model-item>
            <template v-if="data.type=='upload'">
                <a-form-model-item label="最大个数">
                    <a-input-number :min="1" :step="1" v-model="data.options.length"></a-input-number>
                </a-form-model-item>
                <a-form-model-item label="单个大小限制（MB）">
                    <a-input-number :min="0" :step="0.1" v-model="data.options.size"></a-input-number>
                </a-form-model-item>
                <a-form-model-item label="选择上传文件类型">
                    <a-select
                        v-model="data.options.type"
                        placeholder="选择种类"
                        :options="[
                            {value:1,label:'图片'},
                            {value:2,label:'视频'},
                            {value:3,label:'音频'},
                            {value:5,label:'不限格式'},
                            {value:4,label:'office,压缩文件(zip|rar)'}
                        ]"
                    />
                </a-form-model-item>
            </template>
            <a-form-item label="允许多选" v-if="data.type=='upload'">
                <a-switch v-model="data.options.multiple" @change="handleSelectMuliple"></a-switch>
            </a-form-item>
            <a-form-model-item label="子Tab属性" v-if="data.type==='tabs'">
                <template v-for="(it, index) in data.tabs" >
                    <a-input :key="index" v-if="it.key === data.options.activeName" v-model="it.title"></a-input>
                </template>
            </a-form-model-item>
            <a-form-model-item label="tab转radio" v-if="data.type==='tabs'">
                <a-switch
                    v-model="data.options.linkRadio"
                />
            </a-form-model-item>

            <a-form-model-item label="表单名称" v-if="data.type==='ref_form'">
                <div>
                    <div v-for="(it, index) in data.value" :key="index">
                        <a-space>
                            <span>{{ref_form_JSON(it).desformName}}</span>
                            <a-icon type="minus-circle" @click="ref_form_del(index)" class="ant-btn-icon-danger" style="font-size:20px"/>
                        </a-space>
                    </div>
                </div>
                <a-button @click="ref_form_start(data.value)">点击关联</a-button>
            </a-form-model-item>

            <!-- <a-form-model-item label="卡片标题" v-if="data.type==='card'">
                <a-input  v-model="data.name"></a-input>
            </a-form-model-item> -->

            <a-form-model-item label="校验" v-if="Object.keys(data.options).indexOf('required')>=0 && data.type!='grid'">
                <a-checkbox v-model="data.options.required">必填</a-checkbox>
            </a-form-model-item>
            <a-form-model-item label="正则" v-if="Object.keys(data.options).indexOf('pattern')>=0 && data.type =='input'">
                <a-input v-model.lazy="data.options.pattern" placeholder="请输入正则表达式"></a-input>
            </a-form-model-item>
            <a-form-model-item label="最小值" v-if="Object.keys(data.options).indexOf('min')>=0">
                <a-input-number v-model="data.options.min" :min="0" :step="1"></a-input-number>
            </a-form-model-item>
            <a-form-model-item label="最大值" v-if="Object.keys(data.options).indexOf('max')>=0">
                <a-input-number v-model="data.options.max" :min="0"  :step="1"></a-input-number>
            </a-form-model-item>
        </a-form-model>
        <!---关联表单-->
        <ref-form-start ref="RefFormStart" @ref_form_list="ref_form_list"/>
    </div>
</template>
<script>
import Draggable from 'vuedraggable'
import RefFormStart from './RefFormStart.vue'
export default {
    name:'widegt-config',
    components: {
        Draggable,
        RefFormStart
    },
    props: ['data'],
    data () {
        return {
        validator: {
            type: null,
            required: null,
            pattern: null,
            range: null,
            length: null
        }
        }
    },
    computed: {
        show () {
        if (this.data && Object.keys(this.data).length > 0) {
            return true
        }
        return false
        }
    },
    methods: {
        ref_form_JSON(str){
            try{
                if(str){
                    if(typeof str === 'string'){
                        let strJSON = JSON.parse(str);
                        return strJSON
                    }else{
                        return str
                    }
                    
                }
            }catch(e){
                console.log(e)
                return {
                    desformName:'数据结构错误'
                }
            }
            
        },
        ref_form_start(o){
            let arr = [];
            o.forEach(item => {
                arr.push(`${item.desformCode}@@${item.formType}`)
            })
            this.$refs.RefFormStart.show(arr)
        },
        ref_form_del(nindex){
            this.data.value = this.data.value.filter((item, index) => {
                return index !== nindex
            });
        },
        ref_form_list(o){
            this.data.value = o
        },
        handleOptionsRemove (index) {
        if (this.data.type === 'grid') {
            this.data.columns.splice(index, 1)
        } else {
            this.data.options.options.splice(index, 1)
        }
        
        },
        handleAddOption () {
            if (this.data.options.showLabel) {
                this.data.options.options.push({
                    value: "新选项",
                    label: "新选项"
                })
            } else {
                this.data.options.options.push({
                    value: "新选项"
                })
            }
        },
        handleRemoveDefaultValue: function() {
            var e = this.data
                , t = e.type
                , n = e.options;
            "checkbox" === t || !0 === n.multiple ? n.defaultValue = [] : n.defaultValue = undefined
        },
        handleSelectMuliple (value) {
            if (value) {
                if (this.data.options.defaultValue) {
                this.data.options.defaultValue = [this.data.options.defaultValue]
                } else {
                this.data.options.defaultValue = []
                }
                
            } else {
                if (this.data.options.defaultValue.length>0){
                this.data.options.defaultValue = this.data.options.defaultValue[0]
                } else {
                this.data.options.defaultValue = []
                }
                
            }
        },
    }
}
</script>
<style lang="less">

</style>