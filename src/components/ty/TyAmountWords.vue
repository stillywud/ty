<template>
    <div>
        <el-input 
        :value="value"
        :disabled="disabled"
        @input="inputchange"
        :placeholder="placeholder" />
        <span style="font-size:12px" v-if="capitaled">大写：{{DaXieWords}}</span>
    </div>
</template>
<script>
import numberCapital from './number-capital'
import Until from './until.js'
export default {
    name:'TAmountWords',
    props:['placeholder','element','rules','disabled','capitaled'],
    data(){
        return {
            DaXieWords:'',
            value:''
        }
    },
    methods:{
        inputchange(val){
            let sNum = val.toString(); //先转换成字符串类型
            if (sNum.indexOf('.') == 0) {//第一位就是 .
                sNum = '0' + sNum
            }
            sNum = sNum.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
            sNum = sNum.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
            sNum = sNum.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            sNum = sNum.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3');//只能输入两个小数
            //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if(sNum.indexOf(".")< 0 && sNum !=""){
                sNum = parseFloat(sNum);
            }
            sNum = sNum+'';
            if(this.capitaled){
                this.DaXieWords = numberCapital(sNum);
            }
            this.value = sNum;
            this.$emit('onValTransfer',sNum)
        },
    }
}
</script>
<style lang="scss">

</style>