<template>
<div>
  <el-select
      v-model="$store.getters.selectVal[element.model]"
      :disabled="readOnly || element.options.disabled"
      :multiple="element.options.multiple"
      :clearable="element.options.clearable"
      :placeholder="element.options.placeholder"
      :style="{width: width}"
      :filterable="element.options.filterable"
      :class="className"
      :loading="loading"
      :id="`${element.model}`"
      @change="change1"
      @clear="clear1"
  >
    <el-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :label="element.options.showLabel || element.options.remote ? item.label : item.value"
    ></el-option>
  </el-select>
  </div>
  
</template>

<script>
  import { DeviceMixins } from '@/mixins/vuexMixins'

  export default {
    name: 'JSelect',
    mixins: [DeviceMixins],
    props: {
      models:{},
      value: {
        type: [Array, String, Number],
        default: () => []
      },
      width: String,
      element: {
        type: Object,
        default: () => ({})
      },
      options: {
        type: Array,
        default: () => ([])
      },
      readOnly: {
        type: Boolean,
        default: false
      },
      className: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        log: console,
        dataModel: this.$store.getters.selectVal[this.element.model],//[],
        loading:false,
        optionsA:[]
      }
    },
    watch: {
      value: {
        deep: true,
        immediate: true,
        handler(val) {
          if (this.element.options.multiple) {
            
            if (!val) {
              this.$emit('input', [])
            } else if (Array.isArray(val)) {
              this.$store.commit('SET_SELECT_VAL',{...this.$store.getters.selectVal,[this.element.model]:val})
            } else if (typeof val === 'string') {
              this.$store.commit('SET_SELECT_VAL',{...this.$store.getters.selectVal,[this.element.model]:[val]})
            } else {
              this.$store.commit('SET_SELECT_VAL',{...this.$store.getters.selectVal,[this.element.model]:[val.toString()]})
            }
          } else {
            if (!val) {
              this.$emit('input', '')
            } else if (Array.isArray(val)) {
              this.$store.commit('SET_SELECT_VAL',{...this.$store.getters.selectVal,[this.element.model]:val[0]})
            } else if (typeof val === 'string') {
              this.$store.commit('SET_SELECT_VAL',{...this.$store.getters.selectVal,[this.element.model]:val})
            } else {
              this.$store.commit('SET_SELECT_VAL',{...this.$store.getters.selectVal,[this.element.model]:val.toString()})
            }
          }
          
        }
      },
    },
    computed: {},
    methods:{
      change1(val){
        this.$emit('input', val)
        let remote = this.element.options.remote
        let twolevelLinkage = this.element.twolevelLinkage
        if(val && (remote === true || remote === 'dict_obj') && Array.isArray(twolevelLinkage) && twolevelLinkage.length > 0){
          this.$emit("inpAssa",{val,twolevelLinkage:this.element.twolevelLinkage,model:this.element.model,element:this.element})
          twolevelLinkage.forEach(item=>{
            this.$set(this.models,item,'')
            this.$store.commit('SET_SELECT_VAL',{...this.$store.getters.selectVal,[item]:''})
          })
       }else if(val && this.element.behaviorLinkage.length > 0){
          this.$emit('inpAsso', {val,behaviorLinkage:this.element.behaviorLinkage,model:this.element.model})
          this.$nextTick(()=>{
            
          })
        }
      },
      clear1(){
        let remote = this.element.options.remote
        if(remote === 'dict_obj'){
            let twolevelLinkage = this.element.twolevelLinkage
            if(Array.isArray(twolevelLinkage) && twolevelLinkage.length > 0){
              this.$emit("clearp",this.element)
              twolevelLinkage.forEach(item=>{
                this.$set(this.models,item,'')
                
                this.$store.commit('SET_SELECT_VAL',{...this.$store.getters.selectVal,[item]:''})
              })
          }
        }
        
      }
    },
  }
</script>

<style lang="scss" scoped></style>