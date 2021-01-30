<template>
  <a-row :gutter="24">
    <component
      v-for="(formitem,index) in properties"
      :key="index"
      :is="createWidgets(formitem)"
      :formitem="formitem">
    </component>
  </a-row>
</template>

<script>
  import widgetRegistry from './model/WidgetRegistry';
  import {WIDGET_PRE} from './model/Constants'

  export default {
    name: 'OnlineTabFormItem',
    props:{
      properties:{
        type: Array,
        default:()=>{return []},
        required: false
      },
    },
    methods:{
      createWidgets(formitem){
        let key;
        if (formitem.type == 'list' || formitem.type == 'date' || formitem.type == 'datetime') {
          key = WIDGET_PRE+'tab_'+formitem.type
        } else {
          key = WIDGET_PRE+formitem.type
        }
        return widgetRegistry.getType(key)
      }
    }
  }
</script>

<style scoped>

</style>