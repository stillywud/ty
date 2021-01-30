<template>
    <formitem-wapper :formitem="formitem">
        <tyMap 
        :placeholder="placeholder"
        v-bind="widgetAttrs"
        @change="handleChange"
        v-decorator="[formitem.key,formitem.fieldDecoratorOptions]"></tyMap>
    </formitem-wapper>
  </template>
  
  <script>
    import FormitemWapper from './../FormitemWapper.vue'
    import {FormItemMixin} from './../FormItenMixin'
    import tyMap from '@/components/map/AtyMap.vue'
    export default {
      name: 'AmapWidget',
      mixins:[FormItemMixin],
      components:{
        FormitemWapper,
        tyMap
      },
      methods:{
        handleChange(val){
          // let res = new Object();s
          // res['pos_title']="hello";
          // this.$bus.$emit('popupCallbackMinitor', res);
        }
        
      }
  
    }
  </script>
  
  <style scoped>
  
  </style>