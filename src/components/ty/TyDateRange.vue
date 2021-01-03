<template>
    <div>{{element}}-0-{{rules}}--1--{{models}}
        <el-form-item
            :label="element.options.startName"
            :required="element.options.required"
            :prop="element.startModel"
            >
            <el-date-picker
            v-model="startModel"
            @input="inputA"
            :disabled="element.options.disabled"
            :type="`${element.options.formatType === 1 ? 'date' : 'datetime'}`"
            :placeholder="element.options.startPlaceholder"/>
        </el-form-item>
        <el-form-item
            :label="element.options.endName"
            :required="element.options.required"
            :prop="element.endModel"
            >
            <el-date-picker
            v-model="endModel"
            @input="inputB"
            :disabled="element.options.disabled"
            :type="`${element.options.formatType === 1 ? 'date' : 'datetime'}`"
            :placeholder="element.options.endPlaceholder" />
        </el-form-item>
        <el-form-item
            class="durationRequest"
            v-if="element.options.durationType"
            :label="`${element.options.durationName}(${element.options.formatType === 1 ? '天' : '小时'})`"
            >
            <el-input 
            v-model="durationModel"
            :readonly="true"
            :placeholder="`请输入${element.options.durationName}`" />
        </el-form-item>
    </div>
</template>
<script>
// import { ElementAction, WidgetDraggable } from '../../mixins/CommonMixins'
import { DeviceMixins } from '@/mixins/vuexMixins'
import {omit} from 'lodash-es'
export default {
    name:"TyDateRange",
    // mixins: [ElementAction, WidgetDraggable],
    mixins: [DeviceMixins],
    data(){
        return {
            startModel: this.models ? this.models[this.element.startModel] : '',
            endModel: this.models ? this.models[this.element.endModel] : '',
        }
    },
    props:['mode', 'config', 'data', 'index', 'element', 'select', 'remote', 'models', 'rules'],
    computed:{
        durationModel(){
            if(this.startModel && this.endModel){
                let formatType = this.element.options.formatType;
                let num = new Date(this.endModel).getTime() - new Date(this.startModel).getTime();
                if(num > 0){
                    if(formatType === 1){
                        num = Math.floor(num / 1000/60);
                        num = Math.floor(num / 60 / 24)+1;
                        return num;
                    }else{
                        num = Math.floor(num / 1000/60);
                        num = parseFloat((num / 60).toFixed(1), 10)
                        return num
                    }
                }else if(num <=0){
                    return 0
                }
            }
            return ''
        }
    },
    methods:{
        inputA(e){
            console.log(e,1)
            // this.models[this.element.startModel] = e;
            let obj = {}
            obj[this.element.startModel] = e
            this.$emit("update:dateRangeModel",obj)
        },
        inputB(e){
            console.log(e,2)
            let obj = {}
            obj[this.element.endModel] = e
            this.$emit("update:dateRangeModel",obj)
        }
    },
    watch:{
        'element.options.required':{
            // deep:true,
            immediate:true,
            handler(val){
                console.log(val,this.rules,'element.options.required')
                if(this.rules){
                    let copyRules = this.rules;
                    if(val){
                        copyRules[this.element.startModel] = [{required:true,message:"请选择开始时间"}]
                        copyRules[this.element.endModel] = [{required:true,message:"请选择结束时间"}]
                    }else{
                        copyRules = omit(copyRules,[`${this.element.startModel}`,`${this.element.endModel}`])
                    }
                    console.log(copyRules)
                    this.$emit("update:rules",copyRules)
                }
                
            }
        },
        durationModel(a,b){
            console.log(a,b,'value3')
            let obj = {}
            obj[this.element.durationModel] = a
            this.$emit('update:dateRangeModel',obj)
            // this.$set(this.element.options.defaultValue, 2, a)
            if(this.element.options.formatType === 2){
                if(a > 168){
                    this.$nextTick(()=>{
                        this.$alert('所选时间已超过168小时', {
                            confirmButtonText: '确定',
                        });
                    })
                    
                }
            }
        }
    }
}
</script>
<style lang="scss">
.durationRequest{
    .el-form-item__label{
        &::before{
            opacity: 0;
        }
    }
}
</style>