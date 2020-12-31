<template>
    <div class="ty-tels-area">
        <el-input 
            :placeholder="placeholder" 
            :value="inputTel" 
            @input="inputTelCl"
            class="input-with-select">
            <template #prepend>
                <el-select v-model="areaSel" placeholder="请选择" @change="changeCl">
                    <el-option 
                        v-for="item in areaTel"
                        :key="item.label" 
                        :label="item.label" 
                        :value="item.label" ></el-option>
                </el-select>
            </template>
            <!-- <template #append>
                <a v-if="href" :href="href">拨打</a>
            </template> -->
        </el-input>
    </div>
</template>
<script>
import Until from './until.js'
export default {
    name:"TyTels",
    data(){
        return {
            href:'',
            inputTel:'',
            areaSel:'+86',
            areaTel:[
                {label:'+86',value:'+86',text:'中国'},
                {label:'+852',value:'+852',text:'中国香港'},
                {label:'+853',value:'+853',text:'中国澳门'},
                {label:'+886',value:'+886',text:'中国台湾'},
                {label:'+1',value:'+1',text:'美国，加拿大'},
                {label:'+55',value:'+55',text:'巴西'},
                {label:'+60',value:'+60',text:'马来西亚'},
                {label:'+61',value:'+61',text:'澳洲'},
                {label:'+81',value:'+81',text:'日本'},
                {label:'+82',value:'+82',text:'韩国'},
                {label:'+65',value:'+65',text:'新加坡'},
                {label:'+44',value:'+44',text:'英国'},
                {label:'+33',value:'+33',text:'法国'},
                {label:'+7',value:'+7',text:'俄罗斯'},
                {label:'+91',value:'+91',text:'印度'},
                {label:'+66',value:'+66',text:'泰国'},
                {label:'+49',value:'+49',text:'德国'},
                {label:'+39',value:'+39',text:'意大利'},
                {label:'+34',value:'+34',text:'西班牙'},
                {label:'+62',value:'+62',text:'印尼'},
                {label:'+855',value:'+855',text:'柬埔寨'},
                {label:'+95',value:'+95',text:'缅甸'},
                {label:'+673',value:'+673',text:'文莱'},
                {label:'+63',value:'+63',text:'菲律宾'},
                {label:'+84',value:'+84',text:'越南'},
                {label:'+856',value:'+856',text:'老挝'},
                {label:'+48',value:'+48',text:'波兰'},
            ]
        }
    },
    props:['placeholder','element','rules'],
    methods:{
        validateTel(rule, value, callback){
            let val = value.trim();
            let greg = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}#)/;
            if(this.element.options.telType === 2){
                // 仅手机
                if(this.isMobileSea(val)){
                    callback()
                }else{
                    callback('手机格式不正确')
                }
            }else if(this.element.options.telType === 3){
                if(greg.test(val)){
                    callback()
                }else{
                    callback('固话格式不正确')
                }
            }else{
                if(this.isMobileSea(val) || greg.test(val)){
                    callback()
                }else{
                    callback('手机/固话格式不正确')
                }
            }
        },
        changeCl(w){
            this.areaSel = w;
        },
        inputTelCl(e){
            let val = e.trim()
            if(val){
                if(this.element.options.required && this.rules[this.element.model].length === 1 || !this.element.options.required && this.rules[this.element.model].length === 0){
                    this.rules[this.element.model].push({validator: this.validateTel, trigger: ['change','blur'],status:1})
                }
            }else{
                if(!this.element.options.required && this.rules[this.element.model].length === 1){
                    this.rules[this.element.model].pop();
                    Until.parantRefCl(this.$parent).generateForm.clearValidate(this.element.model)
                }
            }
            this.inputTel = val;
            this.href = `${this.areaSel}${val.replace('-','')}`
            this.$emit('onValTransfer',val)
        },
        isMobileSea(e){
            switch (this.areaSel) {
                case "+86":
                    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(e)
                case "+852":
                    return /^[569]\d{7}$/.test(e)
                case "+853":
                    return /^6\d{7}$/.test(e)
                case "+886":
                    return /^9\d{8}$/.test(e)
                case "+1":
                    return /^\d{10}$/.test(e)
                case "+60":
                    return /^1\d{8,9}$/.test(e)
                case "+61":
                    return /^4\d{8}$/.test(e)
                case "+81":
                    return /^[789]0\d{8}$/.test(e)
                case "+82":
                    return /^1[016789]\d{8}$/.test(e)
                case "+65":
                    return /^[89]\d{7}$/.test(e)
                case "+44":
                    return /^(7[45789]\d{8})|7624\d{6}$/.test(e)
                case "+33":
                    return /^((6\d{8})|(7[345678]\d{7}))$/.test(e)
                case "+7":
                    return /^((90[12345689]\d{7})|(9[1236]\d{8})|(95[0123]\d{7}))$/.test(e)
                case "+91":
                    return /^[987]\d{9}$/.test(e)
                case "+66":
                    return /^0?[986]\d{8}$/.test(e)
                case "+49":
                    return /^(15[12579]\d{7}|16[023]\d{7}|160\d{8}|17[012345789]\d{7}|176\d{8}|7\d{8})$/.test(e)
                case "+55":
                    return /^(\d{2}[6789]\d{7,8})$/.test(e)
                case "+62":
                    return /^(8\d{8,10})$/.test(e)
                case "+855":
                    return /^([19]\d{7,9})$/.test(e)
                case "+95":
                    return /^((9\d{7,9})|((64|69|80)\d{6,8}))$/.test(e)
                case "+673":
                    return /^((85|86|87|88)\d{5,6})$/.test(e)
                case "+63":
                    return /^(9\d{9})$/.test(e)
                case "+84":
                    return /^(9\d{8,9})$/.test(e)
                case "+856":
                    return /^(20\d{7,8})$/.test(e)
                case "+39":
                    return /^(3\d{8,9})$/.test(e)
                case "+34":
                    return /^([67]\d{8})$/.test(e)
                case "+48":
                    return /^([45678]\d{8})$/.test(e)
                default:
                    return !0
            }
        }
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