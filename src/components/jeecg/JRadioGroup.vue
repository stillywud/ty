<template>
  <el-radio-group
      v-model="dataModel"
      :style="{width: width}"
      :disabled="readOnly || element.options.disabled"
      :class="className"
      :id="`${element.model}`"
      @change="change1"
      @clear="clear1"
  >
    <el-radio
        v-for="(item, index) in options"
        :key="index"
        :label="item.value"
        :style="{display: isMobile ? 'block' : element.options.inline ? 'inline-block' : 'block'}"
    >
      <template v-if="element.options.remote">{{item.label}}</template>
      <template v-else>{{element.options.showLabel ? item.label : item.value}}</template>
    </el-radio>
  </el-radio-group>
</template>

<script>

  import { DeviceMixins } from '@/mixins/vuexMixins'

  export default {
    name: 'JRadioGroup',
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
        dataModel: [],
      }
    },
    computed: {
      innerOptions() {
        let { options } = this
        if (options && Array.isArray(options) && options.length > 0) {
          return options.map(opt => {
            return {
              value: (opt.value || '').toString(),
              label: (opt.label || opt.value)
            }
          })
        }
        return []
      }
    },
    watch: {
      value: {
        deep: true,
        immediate: true,
        handler(val) {
          if (!val) {
            this.$emit('input', '')
            this.dataModel = ''
          } else if (Array.isArray(val)) {
            this.dataModel = val[0]
          } else if (typeof val === 'string') {
            this.dataModel = val
          } else {
            this.dataModel = val.toString()
          }
        }
      },
    },
    methods: {
      change1(val){
        this.$emit('input', val)
        let remote = this.element.options.remote
        let twolevelLinkage = this.element.twolevelLinkage
        if(val && (remote === true || remote === 'dict_obj') && Array.isArray(twolevelLinkage) && twolevelLinkage.length > 0){
          this.$emit("inpAssa",{val,twolevelLinkage:this.element.twolevelLinkage,model:this.element.model,element:this.element})
          twolevelLinkage.forEach(item=>{
            this.$set(this.models,item,'')
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
              })
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped></style>