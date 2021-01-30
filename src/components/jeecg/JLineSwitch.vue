<template>
  <el-row type="flex" style="justify-content: space-between;">
    <el-col :span="20">{{label}}</el-col>
    <el-col :span="4">
      <el-switch v-model="innerValue" v-bind="$attrs" v-on="$listeners"/>
    </el-col>
  </el-row>
</template>

<script>
  /** 占整行空间的开关 */
  export default {
    name: 'JLineSwitch',
    props: ['value', 'label'],
    data() {
      return {
        innerValue: this.value
      }
    },
    watch: {
      value() {
        this.innerValue = this.value
      },
      innerValue() {
        this.$emit('update:value', this.innerValue)
      }
    }
  }
</script>

<style scoped>

</style>