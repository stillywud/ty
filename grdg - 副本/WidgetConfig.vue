<template>
    <div v-if="show">
        <a-form-model>
            <a-form-model-item label="标题" v-if="data.type!='grid'">
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
                        v-model="data.options.defaultValue"
                        placeholder="选择种类"
                        :options="[
                            {value:1,label:'图片'},
                            {value:2,label:'视频'},
                            {value:3,label:'音频'},
                            {value:5,label:'office'},
                            {value:6,label:'压缩文件(zip|rar)'},
                            {value:4,label:'文本'}
                        ]"
                    />
                </a-form-model-item>
            </template>

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
            <!-- <template v-if="data.type != 'grid'">
                
                <a-form-model-item label="校验">
                    <div v-if="Object.keys(data.options).indexOf('required')>=0">
                        <a-checkbox v-model="data.options.required">必填</a-checkbox>
                    </div>
                    <div v-if="Object.keys(data.options).indexOf('pattern')>=0">
                        <a-input v-model.lazy="data.options.pattern" placeholder="请输入正则表达式"></a-input>
                    </div>
                </a-form-model-item> -->
            <!-- </template> -->
        </a-form-model>
    </div>
</template>
<script>
import Draggable from 'vuedraggable'

export default {
    name:'widegt-config',
    components: {
        Draggable
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
        handleAddColumn () {
        this.data.columns.push({
            span: '',
            list: []
        })
        },
        generateRule () {
        this.data.rules = []
        Object.keys(this.validator).forEach(key => {
            if (this.validator[key]) {
            this.data.rules.push(this.validator[key])
            }
        })
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
            this.data.options.defaultValue = ''
            }
            
        }
        },

        validateRequired (val) {
        if (val) {
            this.validator.required = {required: true, message: `${this.data.name}必须填写`}
        } else {
            this.validator.required = null
        }

        this.$nextTick(() => {
            this.generateRule()
        })
        },

        validateDataType (val) {
        if (!this.show) {
            return false
        }
        
        if (val) {
            this.validator.type = {type: val, message: `${this.data.name}格式不正确`}
        } else {
            this.validator.type = null
        }

        this.generateRule()
        },
        valiatePattern (val) {
        if (!this.show) {
            return false
        }

        if (val) {
            this.validator.pattern = {pattern: val, message: `${this.data.name}格式不匹配`}
        } else {
            this.validator.pattern = null
        }

        this.generateRule()
        }
    },
    watch: {
        'data.options.isRange': function(val) {
        if (typeof val !== 'undefined') {
            if (val) {
            this.data.options.defaultValue = null
            } else {
            if (Object.keys(this.data.options).indexOf('defaultValue')>=0) 
                this.data.options.defaultValue = ''
            }
        }
        },
        'data.options.required': function(val) {
        this.validateRequired(val)
        },
        'data.options.dataType': function (val) {
        this.validateDataType(val)
        },
        'data.options.pattern': function (val) {
        this.valiatePattern(val)
        },
        'data.name': function (val) {
        if (this.data.options) {
            this.validateRequired(this.data.options.required)
            this.validateDataType(this.data.options.dataType)
            this.valiatePattern(this.data.options.pattern)
        }
        }
    }
}
</script>
<style lang="less">

</style>