<template>

    <el-button
        :type="element.options.type"
        :icon="element.options.icon"
        :size="element.options.btnSize"
        :plain="element.options.plain"
        :round="element.options.round"
        :circle="element.options.circle"
        :disabled="readOnly || element.options.disabled"
        @click="handleButtonClick"
    >
      <template v-if="!!text">{{ text }}</template>
    </el-button>

</template>

<script>
  import JsExpandMixins from '../../mixins/JsExpandMixins'

  export default {
    name: "JButtons",
    mixins: [JsExpandMixins],
    props: ['data', 'element', 'models', 'readOnly'],
    data() {
      return {}
    },
    computed: {
      text() {
        let {name, options: {text}} = this.element
        // 兼容使用 element.name 的旧版本
        return name === '按钮' ? text : name
      },
    },
    methods: {
      // 按钮点击事件
      // errorMessage
      handleButtonClick(event) {
        this.runJsCode({
          vm: this,
          event: event,
          models: this.models,
          getModels: () => this.models,
          jsCode: this.element.event.click,
          errorMessage: '按钮点击事件运行出错'
        })
      },
    }
  }
</script>

<style lang="scss" scoped></style>