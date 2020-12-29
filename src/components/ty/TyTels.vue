<template>
    <div class="ty-tels-area">{{element}}-99999
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
            <template #append>
                <a v-if="href" :href="href">拨打</a>
            </template>
        </el-input>
    </div>
</template>
<script>
export default {
    name:"TyTels",
    data(){
        return {
            href:'',
            inputTel:'',
            areaSel:'0086',
            areaTel:[
                {label:'0086',value:'0086',text:'中国'},
                {label:'00852',value:'00852',text:'中国香港'},
                {label:'00853',value:'00853',text:'中国澳门'},
                {label:'00886',value:'00886',text:'中国台湾'},
                {label:'001',value:'001',text:'美国，加拿大'},
                {label:'0055',value:'0055',text:'巴西'},
                {label:'0060',value:'0060',text:'马来西亚'},
                {label:'0061',value:'0061',text:'澳洲'},
                {label:'0081',value:'0081',text:'日本'},
                {label:'0082',value:'0082',text:'韩国'},
                {label:'0065',value:'0065',text:'新加坡'},
                {label:'0044',value:'0044',text:'英国'},
                {label:'0033',value:'0033',text:'法国'},
                {label:'007',value:'007',text:'俄罗斯'},
                {label:'0091',value:'0091',text:'印度'},
                {label:'0066',value:'0066',text:'泰国'},
                {label:'0049',value:'0049',text:'德国'},
                {label:'0039',value:'0039',text:'意大利'},
                {label:'0034',value:'0034',text:'西班牙'},
                {label:'0062',value:'0062',text:'印尼'},
                {label:'00855',value:'00855',text:'柬埔寨'},
                {label:'0095',value:'0095',text:'缅甸'},
                {label:'00673',value:'00673',text:'文莱'},
                {label:'0063',value:'0063',text:'菲律宾'},
                {label:'0084',value:'0084',text:'越南'},
                {label:'00856',value:'00856',text:'老挝'},
                {label:'0048',value:'0048',text:'波兰'},
            ]
        }
    },
    props:['placeholder','element'],
    // watch:{
    //     areaSel:{
    //         immediate:true,
    //         handler(a,b){
    //             this.$nextTick(()=>{
    //                 console.log(a,b,this.element,'ab')
    //             if(this.element.options.required){
    //                 // this.element.rules[1] = 
    //                 if(this.element.options.telType === 1){
    //                     this.$set(this.element.rules,1,{pattern:this.isMobileSea(),message:"手机号格式不正确"})
    //                 }
                    
    //             }
    //             })
                
    //         }
    //     }
    // },
    methods:{
        changeCl(w){console.log(w,'w')},
        inputTelCl(e){
            console.log(e,this.element)
            // {pattern:this.isMobileSea(),message:"手机号格式不正确"} {pattern:this.isMobileSea(),message:"固话格式不正确"}
        },
        isMobileSea(){
            switch (this.areaSel) {
                case "0086":
                    return /^1[3|4|5|6|7|8|9][0-9]{9}$/
                case "00852":
                    return /^[569]\d{7}$/
                case "00853":
                    return /^6\d{7}$/
                case "00886":
                    return /^9\d{8}$/
                case "001":
                    return /^\d{10}$/
                case "0060":
                    return /^1\d{8,9}$/
                case "0061":
                    return /^4\d{8}$/
                case "0081":
                    return /^[789]0\d{8}$/
                case "0082":
                    return /^1[016789]\d{8}$/
                case "0065":
                    return /^[89]\d{7}$/
                case "0044":
                    return /^(7[45789]\d{8})|7624\d{6}$/
                case "0033":
                    return /^((6\d{8})|(7[345678]\d{7}))$/
                case "007":
                    return /^((90[12345689]\d{7})|(9[1236]\d{8})|(95[0123]\d{7}))$/
                case "0091":
                    return /^[987]\d{9}$/
                case "0066":
                    return /^0?[986]\d{8}$/
                case "0049":
                    return /^(15[12579]\d{7}|16[023]\d{7}|160\d{8}|17[012345789]\d{7}|176\d{8}|700\d{8})$/
                case "0055":
                    return /^(\d{2}[6789]\d{7,8})$/
                case "0062":
                    return /^(8\d{8,10})$/
                case "00855":
                    return /^([19]\d{7,9})$/
                case "0095":
                    return /^((9\d{7,9})|((64|69|80)\d{6,8}))$/
                case "00673":
                    return /^((85|86|87|88)\d{5,6})$/
                case "0063":
                    return /^(9\d{9})$/
                case "0084":
                    return /^(9\d{8,9})$/
                case "00856":
                    return /^(20\d{7,8})$/
                case "0039":
                    return /^(3\d{8,9})$/
                case "0034":
                    return /^([67]\d{8})$/
                case "0048":
                    return /^([45678]\d{8})$/
                default:
                    return !0
            }
        }
//     ;
//     return c /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}#)/
// });
    }
}
</script>
<style lang="scss">
.ty-tels-area{
    margin-top: 15px;
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