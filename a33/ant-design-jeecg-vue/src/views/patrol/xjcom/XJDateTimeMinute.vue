<template>
  <!--日期时间组件-精确到分钟-->
  <div>
    <label style="width:80px;display: inline-block;vertical-align: middle;">
      <label v-if="xjdata.required === 1" style="color: red">*</label>{{ xjdata.name }}
    </label>
    <a-date-picker format="YYYY-MM-DD HH:mm" style="width: calc(100% - 80px);" placeholder="请选择时间"/>
  </div>
</template>

<script>
  export default {
    name: "XJDateTimeMinute",
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