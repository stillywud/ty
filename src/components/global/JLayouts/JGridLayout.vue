<template>
  <div v-if="element && element.key" class="widget-grid-container data-grid" :key="element.key" style="position: relative;">
    <el-row class="widget-grid"
            :class="{active: selectWidget.key == element.key}"
            :gutter="element.options.gutter ? element.options.gutter : 0"
            :justify="element.options.justify"
            :align="element.options.align"
            @click.native.stop="handleSelectWidget(index)">
      <el-col v-for="(col, colIndex) in element.columns" :key="colIndex" v-bind="getColProps(col)">
        <div style="border: 1px dashed #999;">
          <draggable
              class="widget-form-list"
              style="padding-bottom: 50px;"
              v-model="col.list"
              filter="widget-grid-container"
              v-bind="{group:'people', ghostClass: 'ghost'}"
              @add="handleWidgetColAdd($event, element, colIndex)"
          >

            <template v-for="(el, i) in col.list">

              <widget-form-item
                  v-if="el.key"
                  :key="el.key"
                  :data="col"
                  :index="i"
                  :element="el"
                  :select.sync="selectWidget"
              ></widget-form-item>

            </template>

          </draggable>
        </div>
      </el-col>

    </el-row>
    <template v-if="selectWidget.key == element.key">
      <el-button
          title="删除"
          type="danger" circle plain
          style="bottom: -20px;"
          class="widget-action-delete"
          @click.stop="handleWidgetDelete(index)"
      >
        <i class="iconfont icon-trash"></i>
      </el-button>
      <el-button
          title="复制"
          type="primary" circle plain
          style="bottom: -20px;"
          class="widget-action-clone"
          @click.stop="handleWidgetClone(index)"
      >
        <i class="iconfont icon-clone"></i>
      </el-button>
    </template>

  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import WidgetFormItem from '../../WidgetFormItem'
  import { WidgetDraggable } from '../../../mixins/CommonMixins'
  import JGridMixins from './mixins/JGridMixins'

  export default {
    name: 'JGridLayout',
    mixins: [JGridMixins, WidgetDraggable],
    components: { Draggable, WidgetFormItem },
    props: ['data', 'config', 'element', 'select', 'index'],
    methods: {
      handleWidgetColAdd($event, row, colIndex) {
        let { list } = row.columns[colIndex]
        this.handleDraggableAdd(list, $event)
      }
    }
  }
</script>

<style scoped></style>