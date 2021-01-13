<template>
    <div>
        <el-form-item
            :required="element.options.required"
            :prop="element.model"
            class="ty-date-range-box"
            >
            <div class="el-el-form-item">
                <label class="el-el-form-item__label">{{element.options.startName}}</label>
                <div class="el-el-form-item__content">
                    <el-date-picker
                        v-model="startModel"
                        style="width:100%"
                        @change="inputA"
                        :disabled="element.options.disabled"
                        :type="`${element.options.formatType === 1 ? 'date' : 'datetime'}`"
                        :placeholder="element.options.startPlaceholder"/>
                </div>
            </div>
            <div class="el-el-form-item">
                <label class="el-el-form-item__label">{{element.options.endName}}</label>
                <div class="el-el-form-item__content">
                    <el-date-picker
                        style="width:100%"
                        v-model="endModel"
                        @change="inputB"
                        :disabled="element.options.disabled"
                        :type="`${element.options.formatType === 1 ? 'date' : 'datetime'}`"
                        :placeholder="element.options.endPlaceholder" />
                </div>
            </div>
            <div class="el-el-form-item">
                <label class="el-el-form-item__label">{{`${element.options.durationName}(${element.options.formatType === 1 ? '天' : '小时'})`}}</label>
                <div class="el-el-form-item__content">
                    <el-input 
                        v-model="durationModel"
                        @input="inputC"
                        :placeholder="`请输入${element.options.required ? '(必填)':''}`" />
                </div>
            </div>
        </el-form-item>
    </div>
</template>
<script>
import { DeviceMixins } from '@/mixins/vuexMixins'
import {omit} from 'lodash-es'
export default {
    name:"TyDateRange",
    mixins: [DeviceMixins],
    data(){
        return {
            startModel: this.models ? this.models[this.element.model][0] : '',
            endModel: this.models ? this.models[this.element.model][1] : '',
            durationModel: this.models ? this.models[this.element.model][2] : '',
        }
    },
    props:['mode', 'config', 'data', 'index', 'element', 'select', 'remote', 'models', 'rules'],
    mounted(){
        console.log(this.rules,this.models,'this.modelsmodels')
        if(this.models){
            console.log(this.rules,this.rules[this.element.model],'this.rules')
            if(this.element.options.required && this.rules[this.element.model].length === 1){
                this.rules[this.element.model].push({validator: this.validateDateRange, trigger: ['change','blur']})
            }
        }
    },
    methods:{
        validateDateRange(rule, value, callback){
            let val = [].concat(value);
            if(!val[0] || !val[1]){
                callback(`请选择${this.element.options.startName}或${this.element.options.endName}`)
            }else if(new Date(val[0]).getTime() - new Date(val[1]).getTime() > 0){
                callback(`${this.element.options.startName}不能大于${this.element.options.endName}`)
            }else if(!val[2] && val[2] !==0){
                callback(`${this.element.options.durationName}不能为空`)
            }else{
                callback()
            } 
        },
        autoThree(){
            if(this.startModel && this.endModel){
                let formatType = this.element.options.formatType;
                let num = new Date(this.endModel).getTime() - new Date(this.startModel).getTime();
                if(num > 0){
                    if(formatType === 1){
                        num = Math.floor(num / 1000/60);
                        num = Math.floor(num / 60 / 24)+1;
                        this.durationModel = num;
                    }else{
                        num = Math.floor(num / 1000/60);
                        num = parseFloat((num / 60).toFixed(1), 10)
                        this.durationModel = num
                        if(num > 168){
                            setTimeout(()=>{
                                this.$alert('所选时间已超过168小时(7天)', {
                                    confirmButtonText: '确定',
                                });
                            },20)
                        }
                    }
                }else if(num <=0){
                    this.durationModel = 0
                }
                this.models[this.element.model][2] = this.durationModel
            }
        },
        inputA(e){
            this.models[this.element.model][0] = e ? e:'';
            this.autoThree();
        },
        inputB(e){
            this.models[this.element.model][1] = e ? e:'';
            this.autoThree();
        },
        inputC(e){
            this.models[this.element.model][2] = e ? e:''
        }
    },
    watch:{
    }
}
</script>
<style lang="scss">
.ty-date-range-box{
    &.is-required{
        .el-el-form-item__label{
            &::before{
                content: "*";
                color: #f56c6c;
                margin-right: 4px;
            }
        }
        .el-el-form-item__content{
            .el-input__inner,
            .el-input__inner:focus,
            .el-textarea__inner,
            .el-textarea__inner:focus,
            input.invalid,
            input.invalid:focus{
                border-color: #dcdfe6!important;
            }
        }
    }
}
.durationRequest{
    .el-form-item__label{
        &::before{
            opacity: 0;
        }
    }
}
</style>