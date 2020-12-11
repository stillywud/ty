<template>
  <div>
    <label>大小限制（MB）</label>
    <br>
    <a-input-number :precision="0" :min="1" style="margin:10px 0;width:100%;" v-model="xjpro.max_size"/>
    <br>
    <a-checkbox :checked="xjpro.required === 1" @change="requiredChange">
      必填
    </a-checkbox>
  </div>
</template>

<script>
    export default {
        name: "XJSingleVideoPros",
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