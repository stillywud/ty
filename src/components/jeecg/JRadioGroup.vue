<template>
  <el-radio-group
      v-model="dataModel"
      :style="{width: width}"
      :disabled="readOnly || element.options.disabled"
      :class="className"
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
        dataModel: []
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
          } else if (Array.isArray(val)) {
            this.dataModel = val[0]
          } else if (typeof val === 'string') {
            this.dataModel = val
          } else {
            this.dataModel = val.toString()
          }
        }
      },
      dataModel(val) {
        this.$emit('input', val)
        if(val && this.element.behaviorLinkage.length > 0){
          // console.log({val,element:this.element})
          this.$emit('inpAsso', {val,behaviorLinkage:this.element.behaviorLinkage,model:this.element.model})
          this.$nextTick(()=>{
            
          })
        }
        
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped></style>