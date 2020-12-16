<template>
    <van-cell-group>
        <van-field 
            class="mt-tpl-input"
            v-model="elementData.options.defaultValue"
            :placeholder="elementData.placeholder || '请输入'"
            :type="elementData.typeType"
            :maxlength="elementData.options.maxlength"
            :required="elementData.required"
            :rules="[
                { required: elementData.required ? true : false, message: `请填写${elementData.name}` },
                { pattern:elementData.required ? new RegExp(elementData.pattern) : null,message: `格式错误` }
            ]"
            :name="`${elementData.name}：`"
            :label="`${elementData.name}：`"/>
    </van-cell-group>
</template>
<script>
export default {
    name:'mt-input',
    inject:['elementData'],
    mounted(){
        console.log(this.elementData)
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