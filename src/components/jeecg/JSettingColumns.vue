<template>

  <div :slot="slot">
    <a-card>
      <a-checkbox-group @change="onColSettingsChange"  :defaultValue="defaultValue">
        <a-row>
          <template v-for="(item,index) in defColumns">
            <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">
              <a-col :span="12"><a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox></a-col>
            </template>
          </template>
        </a-row>
      </a-checkbox-group>
    </a-card>
  </div>




</template>

<script>
  //option {label:,value:}
  export default {
    name: 'JSelectMultiple',
    props: {
        slot:String,
        defaultValue:[],


    },
    data(){
      return {
        arrayValue:!this.value?[]:this.value.split(",")
      }
    },
    watch:{
      value (val) {
        if(!val){
          this.arrayValue = []
        }else{
          this.arrayValue = this.value.split(",")
        }
      }
    },
    methods:{
      onChange (selectedValue) {
        if(this.triggerChange){
          this.$emit('change', selectedValue.join(","));
        }else{
          this.$emit('input', selectedValue.join(","));
        }
      },
    },

  }
</script>
