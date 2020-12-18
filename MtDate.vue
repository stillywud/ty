<template>
    <van-cell-group>
        <van-field
            class="mt-tpl-input"
            readonly
            clickable
            name="datetimePicker"
            label="时间选择"
            :value="elementData.options.defaultValue"
            :disabled="elementData.options.disabled"
            :placeholder="`${elementData.options.placeholder || '点击选择时间' }`"
            @click="showPickerDate = true"
        />
        <van-popup v-model="showPickerDate" position="bottom" get-container="body">
            <van-datetime-picker
                :value="new Date(this.elementData.options.defaultValue)"
                :type="elementData.options.showTime ? 'datetime' : 'date'"
                title="选择年月日"
                :min-date="minDate"
                :max-date="maxDate"
                @change="datatimeChange"
                @confirm="datatimeConfirm"
                @cancel="showPickerDate = false"
                />
        </van-popup>
    </van-cell-group>
</template>
<script>
export default {
    name:'mt-input',
    inject:['elementData'],
    data(){
        return{
            minDate: new Date(new Date().setMonth(6,1)),
            maxDate: new Date(new Date().setMonth(20,0)),
            showPickerDate:false,
            pickerDate:'',
        }
    },
    mounted(){
        console.log(this.elementData)
    },
    methods:{
        datatimeChange(v){
            console.log(v,'datatimeChange')
        },
        datatimeConfirm(v){
            this.showPickerDate = false;
            this.value = v;
            console.log(v,'datatimeConfirm')
            console.log(v.getFullYear());  // 获取完整的年份(4位,1970)
            console.log(v.getMonth());  // 获取月份(0-11,0代表1月,用的时候记得加上1)
            console.log(v.getDate());  // 获取日(1-31)
            console.log(v.getTime());  // 获取时间(从1970.1.1开始的毫秒数)
            console.log(v.getHours());  // 获取小时数(0-23)
            console.log(v.getMinutes());  // 获取分钟数(0-59)
            console.log(v.getSeconds());  // 获取秒数(0-59)
            if(this.elementData.options.showTime){
                this.elementData.options.defaultValue = `${v.getFullYear()}-${this.zeroDate(v.getMonth())}-${this.zeroDate(v.getDate())} ${v.getHours()}:${v.getMinutes()}:${v.getSeconds()}`
            }else{
                this.elementData.options.defaultValue = `${v.getFullYear()}-${this.zeroDate(v.getMonth())}-${this.zeroDate(v.getDate())}`
            }
        },
        zeroDate(n){
            if(n < 10){
                return '0'+n
            }else{
                return n
            }
        },
        datatimeCancel(v){
            this.showPickerDate = false
            console.log(v,'datatimeCancel')
        },
        sdf(){
            this.showPickerDate = true
        }
    }
}
</script>
<style lang="scss">
    .mt-tpl-input{
        flex-direction: column;
        padding: 12px 16px 5px;
        .van-field__body{
            margin-top: 5px;
        }
    }
</style>