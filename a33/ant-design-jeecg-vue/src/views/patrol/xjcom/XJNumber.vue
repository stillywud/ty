<template>
  <!--数字输入框组件-->
  <div>
    <label style="width:80px;display: inline-block;vertical-align: middle;">
      <label v-if="xjdata.required === 1" style="color: red">*</label>{{ xjdata.name }}
    </label>
    <a-input-number style="width:calc(100% - 80px);vertical-align: middle;" :placeholder="xjdata.title"/>
  </div>
</template>

<script>
    export default {
        name: "XJNumber",
        props: {
            'xjdata': Object
        }
    }
</script>

<style scoped>

</style>