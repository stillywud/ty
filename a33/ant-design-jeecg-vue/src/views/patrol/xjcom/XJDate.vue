<template>
  <!--日期组件-->
  <div>
    <label style="width:80px;display: inline-block;vertical-align: middle;">
      <label v-if="xjdata.required === 1" style="color: red">*</label>{{ xjdata.name }}
    </label>
    <a-date-picker style="width: calc(100% - 80px);"/>
  </div>
</template>

<script>
  export default {
    name: "XJDate",
    props: {
        'xjdata': Object
    },
    data() {
      return {

      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>