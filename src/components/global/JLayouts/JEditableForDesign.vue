<template>
    <el-form-item
        :label="element.hideTitle ? '' : element.name"
        class="widget-view j-editable-view data-j-editable-design"
        :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
        @click.native.stop="handleSelectWidget(index)">

    <div class="widget-grid-container data-j-editable-design" style="position: relative;">
              <el-row class="widget-grid "
                      type="flex"
                      :class="{active: selectWidget.key == element.key}"
                      :gutter="element.options.gutter ? element.options.gutter : 0"
                      :justify="element.options.justify"
                      :align="element.options.align"
                      @click.native="handleSelectWidget(index)">
                <el-col v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0">
                  <div style="border: 1px dashed #999;">
                    <draggable
                        class="widget-form-list"
                        style="padding-bottom: 50px;"
                        v-model="col.list"
                        filter="widget-grid-container"
                        v-bind="{group:'people', ghostClass: 'ghost'}"
                        @end="handleMoveEnd"
                        @add="handleWidgetColAdd($event, element, colIndex)"
                    >
                      <widget-form-item
                          v-for="(el, i) in col.list"
                          :key="el.key"
                          v-if="el.key"
                          :element="el"
                          :select.sync="selectWidget"
                          :index="i"
                          :data="col"></widget-form-item>
                    </draggable>
                  </div>
                </el-col>

              </el-row>
              <el-button title="删除" style="bottom: -20px;" @click.stop="handleWidgetDelete(index)"
                         class="widget-action-delete" v-if="selectWidget.key == element.key" circle plain type="danger">
                <i class="iconfont icon-trash"></i>
              </el-button>
              <el-button title="复制" style="bottom: -20px;" @click.stop="handleWidgetClone(index)" class="widget-action-clone" v-if="selectWidget.key == element.key" circle plain type="primary">
                <i class="iconfont icon-clone"></i>
              </el-button>
            </div>
  </el-form-item>
</template>

<script>
  import * as _util from '../../../util/utils'
  import Draggable from 'vuedraggable'
  import WidgetFormItem from '../../WidgetFormItem'
  import * as _authAPI from '../../../api/auth'

  export default {
    name: "JEditableForDesign",
    components: {
      Draggable,
      WidgetFormItem
    },
    props: ['data', 'index', 'element', 'select'],
    data() {
      return {
        msg: "hello JEditable for design",
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
      handleMoveEnd({newIndex, oldIndex}) {
        console.log('JEditableDesign-index', newIndex, oldIndex)
      },
      handleSelectWidget(index) {
        console.log(index, 'JEditableDesign-#####')

        this.selectWidget = this.data.list[index]

      },


      handleWidgetColAdd($event, row, colIndex) {
        const {item, newIndex, oldIndex} = $event

        // 检查拖入的组件是否已被支持
        if (!_util.subTableCheckType(item.dataset.type)) {
          // 如果是列表中拖拽的元素需要还原到原来位置
          item.tagName === 'DIV' && this.data.list.splice(oldIndex, 0, row.columns[colIndex].list[newIndex])
          row.columns[colIndex].list.splice(newIndex, 1)

          this.$message({message: '子表内暂不支持使用该组件', type: 'warning'})
          return false
        }


        const key = _util.randomKey()

        let newObject = _util.cloneObject(row.columns[colIndex].list[newIndex])
        // 如果没有 key 则代表是新拖进来的组件，进行初始化操作
        if (!newObject.key) {
          newObject.key = key
          newObject.rules = []
          newObject.model = newObject.type + '_' + key
          newObject.jeecg_auth = { enabled: false, title: null, field: null }
        }
        if (newObject.subOptions == null) {
          _util.updateGetSubOptions(newObject)
        }
        newObject.isSubItem = true

        this.$set(row.columns[colIndex].list, newIndex, newObject)

        // if (row.columns[colIndex].list[newIndex].type === 'radio' || row.columns[colIndex].list[newIndex].type === 'checkbox' || (this.data.list[newIndex] || {}).type === 'select') {
        //   this.$set(row.columns[colIndex].list, newIndex, {
        //     ...row.columns[colIndex].list[newIndex],
        //     options: {
        //       ...row.columns[colIndex].list[newIndex].options,
        //       options: row.columns[colIndex].list[newIndex].options.options.map(item => ({
        //         ...item
        //       }))
        //     }
        //   })
        // }

        this.selectWidget = row.columns[colIndex].list[newIndex]
      },
      handleWidgetDelete(index) {

        const fn = ()=>{
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
        }

        let element = this.data.list[index]
        // 开启了权限控制的组件列表，用于批量删除
        let enabledKeys = []
        // 判断子表是否开启了权限控制
        if (element.jeecg_auth && element.jeecg_auth.enabled) {
          enabledKeys.push(element.key)
        }
        // 判断子表内的组件是否开始了权限控制
        for (let column of element.columns) {
          for (let item of column.list) {
            if (item.jeecg_auth && item.jeecg_auth.enabled) {
              enabledKeys.push(item.key)
            }
          }
        }
        if (enabledKeys.length > 0) {
          this.$confirm('删除字段将会同时删除已配置的权限（包括子表内的组件），您确定吗？', '删除字段', {
            type: 'warning'
          }).then(() => {
            fn()
            // 从数据库中批量删除
            _authAPI.deleteByComKeyBatch(enabledKeys.join(','))
          }, () => null)

        } else {
          fn()
        }

      },
      handleWidgetClone(index) {
        _util.cloneWidget(this, index)
      },

    }
  }
</script>

<style lang="scss">
  .j-editable-view {
    &:after {
      display: none !important;
    }
    .widget-grid-container {
      .widget-grid {
        background-color: transparent !important;
        &.active {
          border: none !important;
        }
      }
    }
  }
</style>