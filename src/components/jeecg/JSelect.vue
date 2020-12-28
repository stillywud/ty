<template>
  <el-select
      v-model="dataModel"
      :disabled="readOnly || element.options.disabled"
      :multiple="element.options.multiple"
      :clearable="element.options.clearable"
      :placeholder="element.options.placeholder"
      :style="{width: width}"
      :filterable="element.options.filterable"
      :class="className"
  >
    <el-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :label="element.options.showLabel || element.options.remote ? item.label : item.value"
    ></el-option>
  </el-select>
</template>

<script>
  import { DeviceMixins } from '@/mixins/vuexMixins'

  export default {
    name: 'JSelect',
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
    watch: {
      value: {
        deep: true,
        immediate: true,
        handler(val) {
          if (this.element.options.multiple) {
            if (!val) {
              this.$emit('input', [])
            } else if (Array.isArray(val)) {
              this.dataModel = val
            } else if (typeof val === 'string') {
              this.dataModel = [val]
            } else {
              this.dataModel = [val.toString()]
            }
          } else {
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
        }
      },
      dataModel(val) {
        this.$emit('input', val)
      }
    },
    computed: {},
    methods: {}
  }
</script>

<style lang="scss" scoped></style>