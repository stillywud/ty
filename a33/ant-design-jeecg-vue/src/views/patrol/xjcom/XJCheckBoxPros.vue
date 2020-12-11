<template>
  <div>
<!--    <label>标题</label>-->
<!--    <a-input style="margin:10px 0;" v-model="xjpro.name"/>-->
<!--    <br>-->
    <label>选项</label><br>

    <div v-for="(opt,index) in xjpro.options" style="margin-top: 10px;">
      <a-input v-model="xjpro.options[index].name" style="width: 290px;"/>
      <a-icon v-if="xjpro.options.length > 1" @click.stop="delItem(index)" type="minus" style="color: #1890FF;margin-left: 10px;"/>
    </div>

    <div style="text-align: center;margin: 20px 0;color: #1890FF">
      <label @click="addItem" style="cursor: pointer;">添加选项</label>
    </div>
    <a-checkbox :checked="xjpro.required === 1" @change="requiredChange">
      必填
    </a-checkbox>
  </div>
</template>

<script>
    import {randomUUID} from "../../../utils/util";

    export default {
        name: "XJCheckBoxPros",
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
          },
          addItem() {
            let itemJSON = { id: randomUUID(),name:"选项"};
            this.xjpro.options.push(itemJSON);
          },
          delItem(index) {
            this.xjpro.options.splice(index,1);
          },
        }
    }
</script>

<style scoped>

</style>