<template>
  <div>
    <label>标题</label>
    <a-input style="margin:10px 0;" v-model="xjpro.name"/>
    <label>提示</label>
    <a-input style="margin:10px 0;" v-model="xjpro.title"/>
    <label>文本长度</label>
    <br>
    <a-input-number :precision="0" :min="1" style="margin:10px 0;width:100%;" v-model="xjpro.max_length"/>
    <br>
    <label>业务Key</label>
    <a-input placeholder="请输入关联的业务字段标识" style="margin:10px 0;" v-model="xjpro.business_key"/>
    <a-checkbox :checked="xjpro.readonly === 1" @change="readOnlyChange">
      只读
    </a-checkbox>
    <br>
    <a-checkbox :checked="xjpro.required === 1" @change="requiredChange">
      必填
    </a-checkbox>
  </div>
</template>

<script>
    export default {
        name: "XJTextPros",
        props: {
          'xjpro': Object
        },
        methods: {
          readOnlyChange() {
            if(this.xjpro.readonly === 0){
              this.xjpro.readonly = 1;
            }
            else{
              this.xjpro.readonly = 0;
            }
          },
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