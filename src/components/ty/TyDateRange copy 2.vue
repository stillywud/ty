<template>
    <div>{{element}}-0-{{rules}}--1--{{models}}
        <el-form-item
            :label="element.options.startName"
            :required="element.options.required"
            :prop="element.startModel"
            >
            <el-date-picker
            v-model="models[element.startModel]"
            @input="inputA"
            :type="`${element.options.formatType === 1 ? 'date' : 'datetime'}`"
            :placeholder="element.options.startPlaceholder"/>
        </el-form-item>
        <el-form-item
            :label="element.options.endName"
            :required="element.options.required"
            :prop="element.endModel"
            >
            <el-date-picker
            v-model="dataModel[1]"
            @input="inputB"
            :type="`${element.options.formatType === 1 ? 'date' : 'datetime'}`"
            :placeholder="element.options.endPlaceholder" />
        </el-form-item>
        <el-form-item
            class="durationRequest"
            v-if="element.options.durationType"
            :label="`${element.options.durationName}(${element.options.formatType === 1 ? '天' : '小时'})`"
            >
            <el-input 
            v-model="value3"
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
            value1:'',
            value2:'',
            selectWidget: this.select || {},
            dataModel: []
        }
    },
    props:['value','mode', 'config', 'data', 'index', 'element', 'select', 'remote', 'models', 'rules'],
    
    mounted(){
        console.log(this.mode, this.config, this.data, this.index, this.element, this.select, 
        this.remote, this.models, this.rules)
        // this.value1 = this.element.options.defaultValue[0];
        // this.value2 = this.element.options.defaultValue[1];
        // if(this.element.options.required){
        //     console.log(this.rules,this.index)
        //     this.rules[`value1`] = [{required:true,message:'请选择结束时间'}]
        //     this.rules[`value2`] = [{required:true,message:'请选择结束时间'}]
        //     // this.rules = [{required:true,message:'请选择开始时间'},{required:true,message:'请选择结束时间'}]
        // }
    },
    computed:{
        value3(){
            // get(){
                console.log(this.dataModel)
                if(this.dataModel[0] && this.dataModel[1]){
                    let formatType = this.element.options.formatType;
                    let num = new Date(this.dataModel[1]).getTime() - new Date(this.dataModel[0]).getTime();
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
                
            // },
            // set(){
            //     this.value1 = this.dataModel[0]
            //     this.value2 = this.dataModel[0]
            // }
            
        }
    },
    methods:{
        inputA(e){
            console.log(e,1)
            this.dataModel[0] = e;
        },
        inputB(e){
            console.log(e,2)
            this.dataModel[1] = e;
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
        value: {
            deep: true,
            immediate: true,
            handler(val) {
                console.log(val,'---998')
                // if (!val) {
                //     this.$emit('input', '')
                // } else if (Array.isArray(val)) {
                //     this.dataModel = val[0]
                // } else if (typeof val === 'string') {
                //     this.dataModel = val
                // } else {
                //     this.dataModel = val.toString()
                // }
            }
        },
    // },
    // watch:{
        // value1(a,b){
        //     this.$set(this.element.options.defaultValue, 0, a)
        // },
        // value2(a,b){
        //     this.$set(this.element.options.defaultValue, 1, a)
        // },
        value3(a,b){
            console.log(a,b,'value3')
            this.dataModel[2] = a;
            this.$emit('onValTransfer',this.dataModel)
            // this.$set(this.element.options.defaultValue, 2, a)
            // if(this.element.options.formatType === 2){
            //     if(a > 168){
            //         this.$nextTick(()=>{
            //             this.$alert('所选时间已超过168小时', {
            //                 confirmButtonText: '确定',
            //             });
            //         })
                    
            //     }
            // }
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