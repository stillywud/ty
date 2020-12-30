<template>
    <div class="widget-view">
        <el-form-item
            :label="element.options.startName"
            >
            <el-date-picker
            v-model="value1"
            @change="change1"
            :type="`${element.options.formatType === 1 ? 'date' : 'datetime'}`"
            :placeholder="element.options.startPlaceholder"/>
        </el-form-item>
        <el-form-item
            :label="element.options.endName"
            >
            <el-date-picker
            v-model="value2"
            @change="change2"
            :type="`${element.options.formatType === 1 ? 'date' : 'datetime'}`"
            :placeholder="element.options.endPlaceholder" />
        </el-form-item>
        <el-form-item
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
export default {
    data:"TyDateRange",
    data(){
        return {
            value1:'',
            value2:''
        }
    },
    computed:{
        value3(){
            // Ut()((o / 60).toFixed(1), 10)) > 168
            let formatType = this.element.options.formatType;
            let num = new Date(this.value2).getTime() - new Date(this.value1).getTime();
            if(num > 0){
                if(formatType === 1){
                    num = Math.floor(num / 1000/60);
                    num = Math.floor(num / 60 / 24)+1
                    console.log(num,'天')
                    return num;
                }else{
                    num = Math.floor(num / 1000/60);
                    num = Math.floor(num / 60 )
                    console.log(num,'时')
                    return num
                }
            }else if(num <=0){
                return 0
            }else{
                return ''
            }
            
            
            // if(formatType === 1){
            //     // 天
            // }else{
            //     // 小时  秒  1小时 = 60分   1分 = 60秒
            //     return num > 0 ?  : 0
            // }
            
            
        }
    },
    props:['element'],
    methods:{
        change1(v){
            console.log(v,1)
        },
        change2(v){
            console.log(v,2)
        },
        change3(v){
            console.log(v,3)
        },
    }
}
</script>
<style lang="scss">

</style>