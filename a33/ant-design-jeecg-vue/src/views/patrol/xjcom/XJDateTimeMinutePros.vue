<template>
  <div>
    <label>标题</label>
    <a-input style="margin:10px 0;" v-model="xjpro.name"/>
    <br>
    <a-checkbox :checked="xjpro.required === 1" @change="requiredChange">
      必填
    </a-checkbox>
  </div>
</template>

<script>
    export default {
        name: "XJDateTimeMinutePros",
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