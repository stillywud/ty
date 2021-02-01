<template>
  <div
      class="widget-view j-container-view data-j-tabs-layout"
      :class="{active: selectWidget.key == element.key}"
      @click="handleSelectWidget((data||{}).list,index)"
  >

    <el-tabs
        v-model="element.options.activeName"
        v-bind="tabsProps"
        @edit="handleTabEdit"
        @click.native.stop="handleSelectWidget((data||{}).list,index)"
    >
      <el-tab-pane v-for="pane of element.panes" :key="pane.name" :label="pane.label" :name="pane.name">

        <j-form-item
            ref="jFormItem"
            :mode="mode"
            :config="config"
            :data="pane"
            :rules="rules"
            :remote="remote"
            :element="element"
            :readOnly="readOnly"
            :models.sync="dataModel"
            :select.sync="selectWidget"
            @dialogChange="handleDialogChange"
            @popupCgreportOk="handlePopupCgreportOk"
        ></j-form-item>

      </el-tab-pane>
    </el-tabs>
    <!-- 操作按钮 -->
    <template v-if="mode === 'design' && selectWidget.key == element.key">
      <el-button
          title="删除"
          style="bottom: -20px;"
          class="widget-action-delete"
          type="danger" circle plain
          @click.stop="handleWidgetDelete(index)"
      >
        <i class="iconfont icon-trash"></i>
      </el-button>
      <el-button
          title="复制"
          style="bottom: -20px;"
          class="widget-action-clone"
          type="primary" circle plain
          @click.stop="handleWidgetClone(index)"
      >
        <i class="iconfont icon-clone"></i>
      </el-button>
    </template>
  </div>
</template>

<script>
  import { ElementAction, WidgetDraggable } from '../../../mixins/CommonMixins'

  export default {
    name: 'JTabs',
    mixins: [ElementAction, WidgetDraggable],
    props: ['mode', 'config', 'data', 'index', 'element', 'select', 'remote', 'models', 'rules', 'readOnly'],
    data() {
      return {
        dataModel: this.models,
        selectWidget: this.select || {}
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
      dataModel: {
        deep: true,
        handler(val) {
          this.$emit('update:models', val)
        }
      },
      models: {
        deep: true,
        handler(val) {
          this.dataModel = val
        }
      }
    },
    computed: {
      tabsProps() {
        let { options } = this.element
        let props = {
          // 风格类型
          'type': options.type,
          // 选项卡所在位置
          'tab-position': options.position,
          'style': {
            'width': options.width || '100%',
            'position': 'relative',
            'background-color': 'white'
          },
          'class': {
            'is-top-or-bottom': (options.position === 'top' || options.position === 'bottom')
          }
        }
        if (this.mode === 'design') {
          // 可编辑（新增和删除选项卡）
          props['editable'] = true
        }
        // tab-remove	点击 tab 移除按钮后触发
        // tab-add	点击 tabs 的新增按钮后触发
        // edit
        return props
      }
    },
    methods: {
      log: console.log,

      /** 点击 tabs 的新增按钮或 tab 被关闭后触发*/
      handleTabEdit(targetName, action) {
        let { panes } = this.element

        if (action === 'add') {
          let newName = 'Tab_' + Math.ceil(Math.random() * 99999)
          panes.push({
            label: 'NewTab',
            name: newName,
            rowNum: 1,
            list: []
          })
          this.element.options.activeName = newName
        } else if (action === 'remove') {

          if (panes.length === 1) {
            this.$message({ message: '最后一项不能删除', type: 'warning' })
            return
          }

          this.$msgbox({
            title: '生成表单',
            message: '删除后不能撤销，确定要删除吗？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                try {
                  this.$set(this.element, 'panes', panes.filter(tab => tab.name !== targetName))
                  // nextTab
                  panes.forEach((tab, index) => {
                    if (tab.name === targetName) {
                      let nextTab = panes[index + 1] || panes[index - 1]
                      if (nextTab) {
                        this.element.options.activeName = nextTab.name
                      }
                    }
                  })
                } catch (e) {
                  console.error(e)
                }
                done()
              } else {
                done()
              }
            }
          }).catch(() => {
          })

        }
      },

      handleSelectWidget(list, index) {
        if (this.mode === 'form') return
        this.selectWidget = list[index]
      },

    }
  }
</script>

<style lang="scss" scoped></style>
<style lang="scss">
  .j-container-view {
    &:after {
      display: none !important;
    }
  }

  .data-j-tabs-layout {
    margin-bottom: 20px;

    .el-tabs__new-tab {
      color: black;
      border-color: black;
      position: relative;
      top: -4px;
      right: 6px;
    }

    .is-top-or-bottom .el-tabs__new-tab {
      right: 10px;
    }
  }


</style>