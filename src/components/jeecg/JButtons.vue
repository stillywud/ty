<template>
  <el-form-item
      class="widget-view widget-j-buttons-view"
      :class="{active: (selectWidget || {}).key == element.key, 'is_req': element.options.required}"
      @click.native.stop="handleSelectWidget(index)">

  <div class="widget-grid-container data-j-editable-design" style="position: relative;">

    <el-button
        :type="element.options.type"
        :icon="element.options.icon"
        :size="element.options.btnSize"
        :plain="element.options.plain"
        :round="element.options.round"
        :circle="element.options.circle"
        :disabled="element.options.disabled"

    >
      <template v-if="!!element.options.text" >{{ element.options.text }}</template>
    </el-button>

    <el-button
        v-if="(selectWidget || {}).key == element.key"
        title="删除"
        type="danger"
        style="bottom: -20px;"
        class="widget-action-delete"
        plain circle
        @click.stop="handleWidgetDelete(index)"
    >
      <i class="iconfont icon-trash"></i>
    </el-button>
  </div>

  </el-form-item>
</template>

<script>
  export default {
    name: "JButtons",
    props: ['data', 'index', 'element', 'select'],
    data() {
      return {
        selectWidget: this.select
      }
    },
    watch: {
      select(val) {
        this.selectWidget = val
      },
      selectWidget: {
        deep: true,
        handler(val) {
          this.$emit('update:select', val)
        }
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      log: console.log,
      handleSelectWidget(index) {
        this.selectWidget = this.data.list[index]
      },
      handleWidgetDelete(index) {
        if (this.data.list.length - 1 === index) {
          if (index === 0) {
            this.selectWidget = {}
          } else {
            this.selectWidget = this.data.list[index - 1]
          }
        } else {
          this.selectWidget = this.data.list[index + 1]
        }

        this.$nextTick(() => {
          this.data.list.splice(index, 1)
        })
      },
    }
  }
</script>
<style lang="scss">
   .widget-j-buttons-view {
     padding-top: 10px !important;
     padding-bottom: 10px !important;
   }
</style>
<style lang="scss" scoped>
</style>