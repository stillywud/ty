<template>
  <div
      class="widget-view j-container-view data-j-card-layout"
      :class="{active: selectWidget.key == element.key}"
      @click.stop="handleSelectWidget((data||{}).list,index)"
  >

    <el-card
        :style="{width: element.options.width || '100%', position: 'relative'}"
        @click.native.stop="handleSelectWidget((data||{}).list,index)"
    >
      <!-- Header -->
      <div v-if="element.name" slot="header" class="clearfix">
        <span>{{ element.name }}</span>
      </div>

      <!-- Content -->
      <j-form-item
          ref="jFormItem"
          :mode="mode"
          :config="config"
          :data="element"
          :rules="rules"
          :remote="remote"
          :element="element"
          :readOnly="readOnly"
          :models.sync="dataModel"
          :select.sync="selectWidget"
          @dialogChange="handleDialogChange"
          @popupCgreportOk="handlePopupCgreportOk"
      ></j-form-item>

    </el-card>
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
  import * as _util from '../../../util/utils'
  import { ElementAction } from '../../../mixins/CommonMixins'
  import * as _authAPI from '../../../api/auth'


  export default {
    name: 'JCard',
    mixins: [ElementAction],
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

    methods: {
      log: console.log,

      handleSelectWidget(list, index) {
        if (this.mode === 'form') return
        this.selectWidget = list[index]
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
        if (element.jeecg_auth && element.jeecg_auth.enabled) {
          this.$confirm('删除字段将会同时删除已配置的权限，您确定吗？', '删除字段', {
            type: 'warning'
          }).then(() => {
            fn()
            // 从数据库中删除
            _authAPI.deleteByComKey(element.key).then()
          }, () => null)

        } else {
          fn()
        }

      },
      handleWidgetClone(index) {
        _util.cloneWidget(this, index)
      },
      handleRowDelete(index) {
        let { options, rows } = this.element
        if (rows.length === 1) {
          this.$message({ message: '最后一行不能删除', type: 'warning' })
          return
        }
        options.rowNum--
        rows.splice(index, 1)
        this.$nextTick(() => {
          this.selectWidget = rows[index < rows.length ? index : index - 1]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .data-j-card-layout {
    margin-bottom: 20px;
  }
</style>
<style lang="scss">
  .j-container-view {
    &:after {
      display: none !important;
    }
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>