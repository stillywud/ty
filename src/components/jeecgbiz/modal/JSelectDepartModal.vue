<template>
  <el-dialog
      v-loading="loading"
      title="选择部门"
      :width="modalWidth"
      :visible="visible"
      :append-to-body="true"
      :fullscreen="realDevice===$DEVICE_TYPE.mobile"
      @close="()=>hide()">

    <div slot="footer" class="dialog-footer">
      <el-button @click="()=>hide()">取消</el-button>
      <el-button type="primary" @click="handleOk">确定</el-button>
    </div>

    <el-input placeholder="请输入部门名称进行搜索" v-model="filterText" suffix-icon="el-icon-search"/>

    <el-tree
        ref="tree"
        node-key="id"
        empty-text="没有找到任何部门"
        :show-checkbox="true"
        :data="dataSource"
        :props="tree.props"
        :expand-on-click-node="false"
        :default-expand-all="defaultExpandAll"
        :check-on-click-node="true"
        :check-strictly="true"
        :multiple="multiple"
        :highlight-current="true"
        :filter-node-method="filterNode"
        style="margin-top: 8px"
        @check="handleTreeCheck">
    </el-tree>

  </el-dialog>
</template>

<script>
  import * as _utils from '@/util/utils'
  import { DeviceMixins } from '@/mixins/vuexMixins'

  export default {
    name: 'JSelectDepartModal',
    mixins: [DeviceMixins],
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      value: {
        type: Object,
        default: null
      },
      width: {
        type: [Number, String],
        default: 800
      },
      checkedKeys: {
        type: String,
        default: ''
      },
      // 是否支持多选
      multiple: {
        type: Boolean,
        default: false
      },
      // 是否默认展开全部节点
      defaultExpandAll: {
        type: Boolean,
        default: true
      },
      // 数据源
      dataSource: {
        type: Array,
        default: () => []
      },

    },
    data() {
      return {
        loading: true,
        filterText: '',
        tree: {
          props: {label: 'title'},
        }
      }
    },
    computed: {
      modalWidth() {
        if (this.realDevice === this.$DEVICE_TYPE.desktop && this.isMobile) {
          return this.mobileWidth
        } else if (this.isDesktop) {
          return this.width + 'px'
        } else {
          return '100%'
        }
      }
    },
    watch: {
      checkedKeys: {
        immediate: true,
        handler(val) {
          if (!val) return
          try {
            _utils.getRefPromise(this, 'tree', 100).then((tree) => {
                let arr = val.split(',')
                tree.setCheckedKeys(arr)
            })
          } catch (e) {
            console.error(e)
          }
        }
      },
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {

      /** 隐藏 */
      hide() {
        this.$emit('update:visible', false)

        setTimeout(() => {
          this.filterText = ''
          // this.$refs.tree.setCheckedNodes([])
        }, 100)
        this.$emit('closed')
      },

      /** 树列表选中时触发 */
      handleTreeCheck(checked, info) {
        let {checkedNodes} = info
        // 判断是否可以多选
        if (!this.multiple && checkedNodes.length > 1) {
          checkedNodes = [checked]
        }
        this.$refs.tree.setCheckedNodes(checkedNodes)
      },

      /** 筛选节点 */
      filterNode(value, data) {
        if (!value) return true
        return data['departName'].indexOf(value) !== -1
      },

      /** 点击确定按钮，触发ok事件 */
      handleOk() {
        let checkedNodes = this.$refs.tree.getCheckedNodes()
        if (!checkedNodes || checkedNodes.length === 0) {
          this.$emit('ok', [], '')
        } else {
          this.$emit("ok", checkedNodes, checkedNodes.map(item => item.id).join(','))
        }
        this.hide()
      },

    }
  }

</script>

<style scoped></style>