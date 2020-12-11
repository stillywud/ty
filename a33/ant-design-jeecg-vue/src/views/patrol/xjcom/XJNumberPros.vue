<template>
  <div>
    <label>标题</label>
    <a-input style="margin:10px 0;" v-model="xjpro.name"/>
    <label>提示</label>
    <a-input style="margin:10px 0;" v-model="xjpro.title"/>
    <label>最小值</label>
    <br>
    <a-input-number style="margin:10px 0;width:100%;" v-model="xjpro.min"/>
    <br>
    <label>最大值</label>
    <br>
    <a-input-number style="margin:10px 0;width:100%;" v-model="xjpro.max"/>
    <br>
    <a-checkbox :checked="xjpro.required === 1" @change="requiredChange">
      必填
    </a-checkbox>
  </div>
</template>

<script>
    export default {
        name: "XJNumberPros",
        props: {
          'xjpro': Object
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