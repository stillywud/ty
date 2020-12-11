<template>
  <!--多选组件-->
  <div>
<!--    <label style="width:80px;display: inline-block;vertical-align: middle;">-->
<!--      <label v-if="xjdata.required === 1" style="color: red">*</label>{{ xjdata.name }}-->
<!--    </label>-->
<!--    <br>-->
    <a-checkbox-group disabled @change="onChange">
      <div v-for="(opt,index) in xjdata.options">
        <a-checkbox :value="index">
          {{ opt.name }}
        </a-checkbox>
      </div>
    </a-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: "XJCheckBox",
    props: {
        'xjdata': Object
    },
    data() {
      return {

      }
    },
    methods: {
      onChange(checkedValues) {
        console.log('checked = ', checkedValues);
      },
    }
  }
</script>

<style scoped>

</style>