<template>
  <div class="widget-form-container" :class="{'mobile': isMobile}">{{data}}
    <el-form :size="data.config.size" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">

      <draggable class="widget-form-list"

        v-model="data.list"
        v-bind="{group:'people', ghostClass: 'ghost'}"
        @end="handleMoveEnd"
        @add="handleWidgetAdd"
      >

        <template v-for="(element, index) in data.list">
          <!-- update-begin--Author:sunjianlei Date:20190808 for：布局组件封装进 formItem 组件中 -->
          <widget-form-item
              v-if="element && element.key"
              :key="element.key"
              :data="data"
              :config="data.config"
              :index="index"
              :element="element"
              :select.sync="selectWidget"
          ></widget-form-item>
          <!-- update-end--Author:sunjianlei Date:20190808 for：布局组件封装进 formItem 组件中 -->
        </template>

      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetFormItem from './WidgetFormItem'

// update-begin--Author:sunjianlei Date:20190530 for：新增设计版子表组件区域 ------------
import {ctypes} from './componentsConfig'
import * as _util from '../util/utils'
// update-end--Author:sunjianlei Date:20190530 for：新增设计版子表组件区域 ------------

import { WidgetDraggable } from '../mixins/CommonMixins'
import WidgetFormMixins from '../mixins/WidgetFormMixins'

export default {
  name: 'WidgetForm',
  mixins: [WidgetDraggable, WidgetFormMixins],
  components: { Draggable, WidgetFormItem },
  props: ['data', 'select'],
  data () {
    return {
      ctypes,
      // selectWidget: this.select
    }
  },
  mounted () {
    document.body.ondrop = function (event) {
      let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
      if (isFirefox) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },
  methods: {
    handleMoveEnd ({newIndex, oldIndex}) {
      console.log('index', newIndex, oldIndex)
    },
    handleWidgetAdd($event) {
      console.log('widgetForm: handleWidgetAdd */*')
      this.handleDraggableAdd(this.data.list, $event)
    }
  },
  // watch: {
  //   select (val) {
  //     this.selectWidget = val
  //   },
  //   selectWidget: {
  //     handler (val) {
  //       this.$emit('update:select', val)
  //     },
  //     deep: true
  //   }
  // }
}
</script>
<style lang="scss" scoped>

  .widget-form-container {

    &.mobile {
      $width: 350px;
      $height: 580px;
      $topPadding: 90px;
      $rightPadding: 14px;
      $bottomPadding: 100px;

      $realWidth: calc(#{$width} + #{$rightPadding * 2});
      $realHeight: calc(#{$height} + #{$topPadding} + #{$bottomPadding});

      width: $realWidth;
      height: $realHeight;
      margin: 20px auto 0;
      padding: $topPadding $rightPadding $bottomPadding;
      background-image: url('../assets/ip5tb.png');
      background-repeat: no-repeat;
      background-size: $realWidth $realHeight;

      /deep/ .el-form {
        height: 100%;

        .widget-form-list {
          overflow: auto;
          background-color: #ffffff;
        }
      }

    }
  }

</style>