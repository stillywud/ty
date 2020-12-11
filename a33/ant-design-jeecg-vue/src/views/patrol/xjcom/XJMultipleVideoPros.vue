<template>
  <div>
    <label>单个大小限制（MB）</label>
    <br>
    <a-input-number :precision="0" :min="1" style="margin:10px 0;width:100%;" v-model="xjpro.max_size"/>
    <br>
    <label>最大个数</label>
    <br>
    <a-input-number :precision="0" :min="1" :max="3" style="margin:10px 0;width:100%;" v-model="xjpro.max_count" placeholder="最多不能超过3个"/>
    <br>
    <a-checkbox :checked="xjpro.required === 1" @change="requiredChange">
      必填
    </a-checkbox>
  </div>
</template>

<script>
    export default {
        name: "XJMultipleVideoPros",
        props: {
          'xjpro': Object
        },
        data() {
          return {
          }
        },
        methods: {
          requiredChange() {
            if(this.xjpro.required === 0){
              this.xjpro.required = 1;
            }
            else{
              this.xjpro.required = 0;
            }
          }
        }
    }
</script>

<style scoped>

</style>