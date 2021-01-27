<template>
  <el-slider
      v-model="innerValue"
      :min="widget.options.min"
      :max="widget.options.max"
      :disabled="disabled || widget.options.disabled"
      :step="widget.options.step"
      :show-input="widget.options.showInput"
      :range="widget.options.range"
      :style="{width:widget.options.width}"
  />
</template>

<script>
  export default {
    name: 'JSlider',
    props: {
      value: {
        type: [String, Number, Array],
        default: 0,
      },
      widget: {
        type: Object,
        required: true,
      },
      disabled: {
        type: Boolean,
        required: false,
      },
    },
    data() {
      return {
        innerValue: 0
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          if (val == null || val === '') {
            this.innerValue = 0
          } else if (typeof val === 'string') {
            this.innerValue = parseFloat(val)
          } else {
            this.innerValue = val
          }
          this.emitChange()
        },
      },
      innerValue() {
        this.emitChange()
      }
    },
    methods: {
      emitChange() {
        this.$emit('change', this.innerValue)
      },
    },
    model: {
      prop: 'value',
      event: 'change'
    }
  }
</script>

<style scoped>

</style>