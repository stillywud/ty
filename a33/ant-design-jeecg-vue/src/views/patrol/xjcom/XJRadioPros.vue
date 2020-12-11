<template>
  <div>
<!--    <label>标题</label>-->
<!--    <a-input style="margin:10px 0;" v-model="xjpro.name"/>-->
<!--    <br>-->
    <label>选项</label><br>
    <a-radio-group v-model="xjpro.value">
      <div v-for="(opt,index) in xjpro.options">
        <a-radio :style="radioStyle" :value="index" :key="index">
          <a-input v-model="xjpro.options[index].name" style="width: 260px;"/>
        </a-radio>
        <a-icon v-if="xjpro.options.length > 1" @click.stop="delItem(index)" type="minus" style="color: #1890FF;"/>
      </div>
    </a-radio-group>
    <div style="text-align: center;margin: 20px 0;color: #1890FF">
      <label @click="addItem" style="cursor: pointer;">添加选项</label>
      <label style="margin: 0 20px;">|</label>
      <label @click="clearDefaultValue" style="cursor: pointer;">清空默认值</label>
    </div>
    <a-checkbox :checked="xjpro.required === 1" @change="requiredChange">
      必填
    </a-checkbox>
  </div>
</template>

<script>
    import {randomUUID} from "../../../utils/util";

    export default {
        name: "XJRadioPros",
        props: {
          'xjpro': Object
        },
        data() {
          return {
            radioStyle: {
              display: 'inline-block',
              height: '30px',
              marginTop: '10px',
              lineHeight: '30px',
            },
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
          clearDefaultValue() {
            this.xjpro.value = null;
          },
          addItem() {
            let itemJSON = { id: randomUUID(),name:"选项"};
            this.xjpro.options.push(itemJSON);
          },
          delItem(index) {
            this.xjpro.options.splice(index,1);
            if( this.xjpro.value != null) {
              if(index === this.xjpro.value){
                this.xjpro.value = null;
              }
              else if(index < this.xjpro.value){
                this.xjpro.value = this.xjpro.value - 1;
              }
            }
          }
        }
    }
</script>

<style scoped>

</style>