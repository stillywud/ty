<template>
  <!--单选组件-->
  <div>
<!--    <label style="width:80px;display: inline-block;vertical-align: middle;">-->
<!--      <label v-if="xjdata.required === 1" style="color: red">*</label>{{ xjdata.name }}-->
<!--    </label>-->
<!--    <br>-->
    <a-radio-group v-model="xjdata.value">
      <a-radio v-for="(opt,index) in xjdata.options" :style="radioStyle" :value="index" :key="index">
        {{ opt.name }}
      </a-radio>
    </a-radio-group>
  </div>
</template>

<script>
    export default {
        name: "XJRadio",
        props: {
            'xjdata': Object
        },
        data() {
          return {
            radioStyle: {
              display: 'block',
              height: '30px',
              lineHeight: '30px',
            },
          }
        }
    }
</script>

<style scoped>

</style>