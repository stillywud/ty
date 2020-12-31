<template>
    <div class="ty-sec-id-card">
        <el-input 
            :placeholder="placeholder" 
            :value="inputVal" 
            :maxlength="maxlength"
            @input="inputCardCl"
            class="input-with-select" />
    </div>
</template>
<script>
import Until from './until.js'
export default {
    name:"TyTels",
    data(){
        return {
            inputVal:'',
        }
    },
    props:['placeholder','element','rules','maxlength'],
    methods:{
        inputCardCl(value){
            let val = value.trim();
            if(val){
                if(this.element.options.required && this.rules[this.element.model].length === 1 || !this.element.options.required && this.rules[this.element.model].length === 0){
                    this.rules[this.element.model].push({validator: this.validateCard2, trigger: ['change','blur'],status:1})
                }
            }else{
                if(!this.element.options.required && this.rules[this.element.model].length === 1){
                    this.rules[this.element.model].pop();
                    Until.parantRefCl(this.$parent).generateForm.clearValidate(this.element.model)
                }
            }
            this.inputVal = val;
            this.$emit('onValTransfer',val)
        },
        // ---身份证校验
        validateCard2(rule, value, callback) {
            let iSum = 0;
            let sId = value;
            let aCity = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙",
                21: "辽宁",
                22: "吉林",
                23: "黑龙",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                83: "台湾",
                91: "国外"
            };
            // if (value.length == 15){sId = this.idCardUpdate(value);}else{ sId = value;}
            if (!/^\d{17}(\d|x)$/i.test(sId)) {
                // return false;
                callback('身份证格式不正确')
            }
            sId = sId.replace(/x$/i, "a");
            //非法地区
            if (aCity[parseInt(sId.substr(0, 2))] == null) {
                // return false;
                callback('身份证格式不正确-非法地区')
            }
            let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) +
                "-" + Number(sId.substr(12, 2));
            let d = new Date(sBirthday.replace(/-/g, "/"));
            //非法生日
            if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
                    .getDate())) {
                // return false;
                callback('身份证格式不正确-非法生日')
            }
            for (let i = 17; i >= 0; i--) {
                iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
            }
            if (iSum % 11 != 1) {
                // return false;
                callback('身份证格式不正确')
            }
            // return true;
            callback()
        },
    }
}
</script>
<style lang="scss">
.ty-tels-area{
    .input-with-select{
        .el-input-group__prepend {
            background-color: #fff;
        }
    }
    .el-select{
        .el-input{
            width: 90px;
        }
    } 
}
</style>