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
      @focus="focusa"
      :id="`${element.model}`"
      @change="change1"
  >
    <el-option
        v-for="item in optionsA"
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
      options:{
        deep: true,
        immediate: true,
        handler(val) {
          console.log(val,'333')
          this.optionsA = val
        }
      },
      value: {
        deep: true,
        immediate: true,
        handler(val) {
          // let vald = null;
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
      // dataModel(val) {
      //   this.$emit('input', val)
      //   console.log(val)
      //   let remote = this.element.options.remote
      //   let twolevelLinkage = this.element.twolevelLinkage

        
      //   console.log(val , (remote === true || remote === 'dict_obj') , Array.isArray(twolevelLinkage) , twolevelLinkage.length > 0)
      //   if(val && (remote === true || remote === 'dict_obj') && Array.isArray(twolevelLinkage) && twolevelLinkage.length > 0){
      //     this.$emit("inpAssa",{val,twolevelLinkage:this.element.twolevelLinkage,model:this.element.model})
      //     twolevelLinkage.forEach(item=>{
      //       document.getElementById([item]).value = ''
      //       this.$set(this.models,item,'')
      //     })
      //  }else if(val && this.element.behaviorLinkage.length > 0){
      //     console.log({val,element:this.element})
      //     this.$emit('inpAsso', {val,behaviorLinkage:this.element.behaviorLinkage,model:this.element.model})
      //     this.$nextTick(()=>{
            
      //     })
      //   }
      // }
    },
    computed: {},
    methods:{
      focusa(){
        if(this.element.remoteOptionstw){
          // this.$emit('update:options', this.element.remoteOptionstw);
          this.optionsA = this.element.remoteOptionstw
        }
      },
      change1(val){
        this.$emit('input', val)
        console.log(val)
        let remote = this.element.options.remote
        let twolevelLinkage = this.element.twolevelLinkage
        console.log(val , (remote === true || remote === 'dict_obj') , Array.isArray(twolevelLinkage), twolevelLinkage.length > 0)
        if(val && (remote === true || remote === 'dict_obj') && Array.isArray(twolevelLinkage) && twolevelLinkage.length > 0){
          this.$emit("inpAssa",{val,twolevelLinkage:this.element.twolevelLinkage,model:this.element.model,element:this.element})
          twolevelLinkage.forEach(item=>{
            //document.getElementById([item]).value = ''
            this.$set(this.models,item,'')
            this.$store.commit('SET_SELECT_VAL',{...this.$store.getters.selectVal,[item]:''})
          })
          console.log(this.models)
       }else if(val && this.element.behaviorLinkage.length > 0){
          console.log({val,element:this.element})
          this.$emit('inpAsso', {val,behaviorLinkage:this.element.behaviorLinkage,model:this.element.model})
          this.$nextTick(()=>{
            
          })
        }
      }
    },
  }
</script>

<style lang="scss" scoped></style>