<template>
  <!--文本组件-->
  <div>
    <label style="width:80px;display: inline-block;vertical-align: middle;">
      <label v-if="xjdata.required === 1" style="color: red">*</label>{{ xjdata.name }}
    </label>
    <a-input :disabled="xjdata.readonly === 1" :placeholder="xjdata.title" style="width:calc(100% - 80px);vertical-align: middle;"/>
  </div>
</template>

<script>
    export default {
        name: "xjText",
        props: {
            'xjdata': Object
        }
    }
</script>

<style scoped>

</style>