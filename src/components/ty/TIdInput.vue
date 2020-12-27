<template>
<!--

    自动检测功能
    1.必填：写与不写都校验
    2.非必填：用户不填写不校验，用户填写了就校验
-->
    <el-input 
        :value="value" 
        :disabled="disabled"
        :maxlength="18"
        @input="inputchange"
        :placeholder="placeholder" />
</template>
<script>
export default {
    name:'TIdInput',
    props:{
        value:{
            type:String,
            default:''
        },
        placeholder:{
            type:String,
            default:''
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
        }
    },
    methods:{
        inputchange(e){
            console.log(e)
            this.$emit("inputchange", e)
        },
        validateSecIdCard(value) {
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
            if (!/^\d{17}(\d|x)$/i.test(sId)) {
                return false;
            }
            sId = sId.replace(/x$/i, "a");
            //非法地区
            if (aCity[parseInt(sId.substr(0, 2))] == null) {
                return false;
            }
            let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) +
                "-" + Number(sId.substr(12, 2));
            let d = new Date(sBirthday.replace(/-/g, "/"));
            //非法生日
            if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
                    .getDate())) {
                return false;
            }
            for (let i = 17; i >= 0; i--) {
                iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
            }
            if (iSum % 11 != 1) {
                return false;
            }
            return true;
        }

    }
}
</script>
<style lang="scss">

</style>