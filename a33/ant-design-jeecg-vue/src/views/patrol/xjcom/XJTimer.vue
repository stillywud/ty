<template>
  <!--计时器-->
  <div>
    <label style="width:80px;display: inline-block;vertical-align: middle;">
      <label v-if="xjdata.required === 1" style="color: red">*</label>{{ xjdata.name }}
    </label>
    <label style="margin-left: 20px;">0</label>
    <a-button type="primary" size="small" style="float: right;font-size: 12px;">开始计时</a-button>
  </div>
</template>

<script>
  export default {
    name: "XJTimer",
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