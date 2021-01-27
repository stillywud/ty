<template>

  <div v-bind="textProps">
    <span v-html="formatHtml"></span>
  </div>

</template>

<script>
export default {
  name: "JText",
  props: ['element'],
  data() {
    return {}
  },
  computed: {
    formatHtml() {
      return this.element.options.text.replace(/\n/g, '<br>')
    },
    textProps() {
      let {options} = this.element
      let props = {
        style: {
          'width': options.width,
          'color': options.fontColor,
          'text-align': options.align,
          'font-size': options.fontSize + 'px',
          'font-weight': options.fontBold ? 'bold' : 'normal',
          'font-style': options.fontItalic ? 'italic' : 'normal',
          'text-decoration': (() => {
            if (options.fontUnderline) {
              return 'underline'
            } else if (options.fontLineThrough) {
              return 'line-through'
            } else {
              return 'none'
            }
          })(),
        }
      }
      if (options.lineHeight) {
        props.style['line-height'] = options.lineHeight
      }
      return props
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>