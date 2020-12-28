<!--
  JFromItem 组件
  用于自动识别布局或显示表单模式，减少代码量
 -->
<template>
  <el-row type="flex">
    <el-col :span="24">
      <!-- 布局模式 -->
      <div v-if="mode === 'design'" style="border: 1px dashed #999;">
        <draggable
            class="widget-form-list"
            style="padding-bottom: 50px;"
            v-model="data.list"
            filter="widget-grid-container"
            v-bind="{group:'people', ghostClass: 'ghost'}"
            @add="handleWidgetColAdd($event)"
        >
          <widget-form-item
              v-for="(el, i) in data.list"
              :key="el.key"
              v-if="el.key"
              :element="el"
              :select.sync="selectWidget"
              :index="i"
              :data="data"
          ></widget-form-item>
        </draggable>
      </div>
      <!-- 显示模式 -->
      <template v-else>
        <template v-for="(item) in data.list">
          <generate-form-item
              ref="formItem"
              :key="item.key"
              :config="config"
              :models.sync="dataModel"
              :rules="rules"
              :widget="item"
              :remote="remote"
              :readOnly="readOnly"
              @dialogChange="handleDialogChange"
              @popupCgreportOk="handlePopupCgreportOk"
          ></generate-form-item>
        </template>
      </template>
    </el-col>
  </el-row>
</template>

<script>
  import Draggable from 'vuedraggable'
  import WidgetFormItem from '../../../WidgetFormItem'
  import GenerateFormItem from '../../../GenerateFormItem'
  import * as _utils from '../../../../util/utils'
  import { ElementAction, WidgetDraggable } from '../../../../mixins/CommonMixins'


  export default {
    name: 'JFormItem',
    mixins: [ElementAction, WidgetDraggable],
    components: {
      Draggable,
      WidgetFormItem,
      GenerateFormItem
    },
    props: ['mode', 'config', 'data', 'element', 'select', 'models', 'rules', 'remote', 'readOnly'],
    data() {
      return {
        selectWidget: this.select,
        dataModel: this.models
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
      },
      models: {
        deep: true,
        handler(val) {
          this.dataModel = val
        }
      },
      dataModel: {
        deep: true,
        handler(val) {
          this.$emit('update:models', val)
        }
      },
    },
    methods: {
      handleWidgetColAdd($event) {
        this.handleDraggableAdd(this.data.list, $event)
      }
    }
  }
</script>

<style lang="scss"></style>