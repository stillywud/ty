<template>
  <el-dialog
      v-loading="loading"
      title="选择用户"
      :width="modalWidth"
      :visible="visible"
      :append-to-body="true"
      :fullscreen="realDevice===$DEVICE_TYPE.mobile"
      @close="()=>hide()">

    <div slot="footer" class="dialog-footer">
      <el-button @click="()=>hide()">取消</el-button>
      <el-button type="primary" @click="handleOk">确定</el-button>
    </div>

    <el-input placeholder="请输入用户名称进行筛选" v-model="filterText" suffix-icon="el-icon-search"/>

    <el-table
        ref="table"
        rowKey="id"
        :data="filterDataSource || dataSource"
        tooltip-effect="dark"
        :class="{'j-table-mobile':isMobile}"
        style="width: 100%;margin-top: 8px;"
        @row-click="handleRowClick"
        @select-all="handleSelectAll"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <template v-if="isDesktop">
        <el-table-column label="用户账号" prop="username"/>
        <el-table-column label="真实姓名" prop="realname"/>
        <el-table-column label="角色名称" prop="roleName"/>
        <el-table-column label="性别" prop="sex_dictText" width="80"/>
        <el-table-column label="手机号码" prop="phone"/>
        <el-table-column label="邮箱" prop="email"/>
      </template>
      <template v-else>
        <el-table-column label="用户账号">
          <template v-slot:default="props">
            <j-line-nowrap :text="props.row.username"/>
          </template>
        </el-table-column>
        <el-table-column label="真实姓名">
          <template v-slot:default="props">
            <j-line-nowrap :text="props.row.realname"/>
          </template>
        </el-table-column>
        <el-table-column type="expand" width="50">
          <template slot-scope="props">
            <el-form label-position="left" class="j-table-expand" size="small">
              <el-form-item label="用户账号">{{props.row.username}}</el-form-item>
              <el-form-item label="真实姓名">{{props.row.realname}}</el-form-item>
              <el-form-item label="性别">{{props.row.sex_dictText}}</el-form-item>
              <el-form-item label="手机号码">{{props.row.phone}}</el-form-item>
              <el-form-item label="邮箱">{{props.row.email}}</el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </template>
    </el-table>

  </el-dialog>
</template>

<script>
  import { getRefPromise, randomString } from '@/util/utils'
  import { DeviceMixins } from '@/mixins/vuexMixins'
  import JLineNowrap from '@/components/jeecg/JLineNowrap'

  export default {
    name: 'JSelectUserModal',
    mixins: [DeviceMixins],
    components: { JLineNowrap },
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
      // 选中的项
      selected: {
        type: Array,
        default: () => []
      },
      // 是否支持多选
      multiple: {
        type: Boolean,
        default: false
      },
      // 数据源
      dataSource: {
        type: Array,
        default: () => []
      },

    },
    data() {
      return {
        loading: false,
        // 筛选关键字
        filterText: '',
        // 筛选时使用的数据源
        filterDataSource: null,
        selectedRows: [],
        ignoreCount: 0,
        getRefId: {
          'watch.value.table': null,
        },
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          if (val) {
            let refId = randomString(6)
            this.$set(this.getRefId, 'watch.value.table', refId)
            getRefPromise(this, 'table', 100).then(table => {
              // 当弹窗未打开时，可能会有多个 ref 事件，这样可以防止冲突
              if (this.getRefId['watch.value.table'] !== refId) {
                return
              }
              this.ignoreCount += 1
              table.clearSelection()
              table.toggleRowSelection(this.value, true)
              this.selectedRows = [this.value]
            })
          }
        }
      },
      selected(val) {
        let {table} = this.$refs
        // 设置忽略由 clearSelection 和 toggleRowSelection 触发的事件，防止死循环
        this.ignoreCount = 1 + val.length
        table.clearSelection()
        val.forEach(row => {
          table.toggleRowSelection(row, true)
        })
        this.selectedRows = val
      },
      filterText(val) {
        this.filter(val)
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
    methods: {

      /** 隐藏 */
      hide() {
        this.$emit('update:visible', false)

        setTimeout(() => {
          this.filterText = ''
        }, 100)
        this.$emit('closed')
      },

      handleSelectAll() {
        let {multiple, selectedRows: rows, $refs: {table}} = this

        // 判断是否可以多选
        if (!multiple) {
          this.ignoreCount += rows.length + 1
          table.clearSelection()
          rows.forEach(row => {
            table.toggleRowSelection(row, true)
          })
        }

      },

      /** 表格被选中触发 */
      handleSelectionChange(rows) {
        this.$nextTick(() => {
          let {ignoreCount, multiple, $refs: {table}} = this

          if (ignoreCount > 0) {
            this.ignoreCount--
            return
          }

          // 判断是否可以多选
          if (!multiple && rows.length > 1) {
            rows = [rows[rows.length - 1]]
          }

          // 设置忽略由 clearSelection 和 toggleRowSelection 触发的事件，防止死循环
          this.ignoreCount = 1 + rows.length
          table.clearSelection()
          rows.forEach(row => {
            table.toggleRowSelection(row, true)
          })
          this.selectedRows = rows
        })
      },

      /** 筛选数据 */
      filter(keyword) {
        if (!keyword) {
          this.filterDataSource = null
          return
        }
        let filterDataSource = []
        this.dataSource.forEach(item => {
          let flag1 = item['username'].indexOf(keyword) != -1
          let flag2 = item['realname'].indexOf(keyword) != -1
          if (flag1 || flag2) {
            filterDataSource.push(item)
          }
        })
        this.filterDataSource = filterDataSource
      },

      /** 点击确定按钮，触发ok事件 */
      handleOk() {
        let {selectedRows: rows} = this
        if (!rows || rows.length === 0) {
          this.$emit('ok', '', '', [])
        } else {
          let username = rows.map(row => row['username']).join(',')
          let realname = rows.map(row => row['realname']).join(',')
          this.$emit('ok', username, realname, rows)
        }
        this.hide()
      },

      handleRowClick(row) {
        let { ignoreCount, multiple, $refs: { table } } = this
        if (this.isMobile) {
          table.toggleRowExpansion(row)
        } else {
          table.toggleRowSelection(row)
        }
      }

    }
  }
</script>


<style lang="scss" scoped>
  .j-table-mobile {
    /deep/ {
      .el-table__expanded-cell {
        padding: 10px;
      }
    }
  }

  .j-table-expand {
    width: 100%;
    font-size: 0;

    /deep/ {
      label {
        width: 90px;
        color: #99a9bf;
        text-align: right;
      }

      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;

        & .el-form-item__content {
          overflow: hidden;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

    }
  }

</style>