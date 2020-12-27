<template>
  <div class="__table-dict" :class="{disabled: isDisabled}" >

    <template v-if="element.options.style === 'select'">
      <el-select
          v-model="value"
          :placeholder="element.options.placeholder"
          :disabled="isDisabled"
          :style="{width: element.options.width || '100%'}"
          @change="handleSelectChange"
      >

        <i v-if="element.options.showIcon && element.options.iconName" slot="prefix" class="input-icon iconfont icon-select"/>

        <template v-for="option of selectOptions">
          <el-option :key="option.value"
                     :value="option.value"
                     :label="option.label || option.value"
                     :disabled="!!option.disabled"
          />
        </template>
      </el-select>
    </template>
    <div v-else class="j-select-depart" :style="{width: element.options.width || '100%'}">
      <div @click="openModal" :disabled="isDisabled">

        <el-input
            type="text"
            :value="value"
            :placeholder="element.options.placeholder"
            :readonly="true"
            :disabled="isDisabled"
        >

          <i v-if="element.options.showIcon && element.options.iconName" slot="prefix" class="input-icon iconfont" :class="[element.options.iconName]"/>
        </el-input>
      </div>
    </div>

    <el-dialog
        :title="element.name"
        :visible.sync="dialogVisible"
        :fullscreen="isDesktop || realDevice===$DEVICE_TYPE.mobile"
        :width="modalWidth"
        :append-to-body="true"
        :before-close="handleClose"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>

      <!-- 查询条件区域 -->
      <el-form inline :label-position="isMobile?'top':'right'" label-width="100px" style="margin-bottom: 8px;" size="small">
        <el-row :type="isMobile?'':'flex'" :gutter="8" v-if="queryInfos && queryInfos.length>0">
          <template v-for="(item,index) in queryInfos">
              <el-col :key="'query'+index" v-bind="queryParamSpan" v-show="item.hidden!=='1' || toggleSearchStatus">
                <onl-cgreport-query-form-item :is-mobile="isMobile" :queryParam="queryParam" :item="item" :dictOptions="dictOptions"/>
              </el-col>
          </template>

          <el-col v-bind="queryParamSpan">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <el-button type="primary" @click="searchByQuery" icon="search">查询</el-button>
              <el-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</el-button>
              <el-link v-if="queryInfos.length>2" @click="toggleSearchStatus=!toggleSearchStatus" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <el-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </el-link>
            </span>
          </el-col>
        </el-row>
      </el-form>

      <div>
        <el-button @click="handleClearSelected">清空选择</el-button>
      </div>

      <!-- 表格区域 -->
      <el-table
          row-key="id"
          ref="multipleTable"
          :data="dataSource"
          :height="600"
          :stripe="true"
          :class="{'j-table-mobile':isMobile}"
          style="min-height: 300px; max-height: 600px"
          @row-click="handleTableRowClick"
          @selection-change="handleSelectionChange"
      >

        <!--<el-table-column type="selection" width="40" align="center" fixed/>-->
        <!--<el-table-column type="index" width="60" align="center" fixed/>-->
        <el-table-column type="selection" width="50" align="center"/>
        <el-table-column type="index" width="50" align="center"/>

        <template v-for="col of columns">
          <el-table-column
              v-if="isDesktop || col.dataIndex === element.options.dictCode"
              :key="col.dataIndex || col.key"
              :label="col.title"
              :prop="col.dataIndex"
              :width="col.width"
          >
          </el-table-column>
        </template>

        <el-table-column v-if="isMobile" type="expand" width="50">
          <template slot-scope="props">
            <el-form label-position="left" class="j-table-expand" size="small">
              <el-form-item v-for="col of columns" :label="col.title" :key="col.dataIndex || col.key">
                <span>{{props.row[col.dataIndex]}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

      </el-table>

    </el-dialog>

  </div>
</template>

<script>
import {getAction} from '@/api/manage'
import { packageOptions, alwaysResolve, succeedSymbol, failedSymbol } from '@/util/utils'
import { DeviceMixins } from '@/mixins/vuexMixins'
import OnlCgreportQueryFormItem from './auto/OnlCgreportQueryFormItem'

export default {
  name: "JTableDict",
  mixins: [DeviceMixins],
  components: { OnlCgreportQueryFormItem },
  props: ['value', 'element', 'disabled'],
  data() {
    return {
      dialogVisible: false,
      loading: true,
      // 表头
      columns: [],
      //数据集
      dataSource: [],
      dictOptions: [],
      selection: [],
      // select 的项目
      selectOptions: [],
      queryInfos: [],
      queryParam: {},
      toggleSearchStatus: false,
      url: {
        getColumns: '/online/cgreport/api/getRpColumns/',
        getData: '/online/cgreport/api/getData/',
        getQueryInfo: '/online/cgreport/api/getQueryInfo/'
      },
    }
  },
  watch: {
    dialogVisible(val) {
      this.$emit('dialogChange', val)
    }
  },
  computed: {
    isDisabled() {
      return (this.disabled || this.element.options.disabled)
    },
    modalWidth() {
      if (this.realDevice === this.$DEVICE_TYPE.desktop && this.isMobile) {
        return this.mobileWidth
      } else {
        return '100%'
      }
    },
    queryParamSpan() {
      if (this.isMobile) {
        return { span: 24 }
      } else {
        return { style: { width: 'auto' } }
      }
    },
  },
  mounted() {
    if (this.element.options.style === 'select') {
      this.loadSelectData()
    }
  },
  methods: {

    searchByQuery(){
      this.openModal()
    },
    searchReset(){
      this.queryParam = {}
      this.openModal()
    },

    loadSelectData() {
      let {dictTable, dictCode, dictText} = this.element.options
      let options = []
      if (dictTable && dictCode && dictText) {

        this.loadColumnsInfo().then((res) => {
          const id = res.result.cgRpConfigId
          return Promise.all([
            // 查询数据
            alwaysResolve(this.loadData(id)),
            // 查询查询条件
            alwaysResolve(getAction(`${this.url.getQueryInfo}${id}`))
          ])
        }).then((results) => {

          let [dataResult, queryResult] = results

          if (dataResult.type === succeedSymbol) {
            let codes = dictCode.split(',')[0]
            let texts = dictText.split(',')[0]
            options = packageOptions(dataResult.data.result.records, codes, codes)
            this.selectOptions = options
          } else {
            this.$message({message: '数据查询失败', type: 'warning'})
            console.log('数据查询失败: ', dataResult.data.message)
          }

          // 查询条件
          if (queryResult.type === succeedSymbol) {
            this.queryInfos = queryResult.data.result
          } else {
            this.$message({message: '查询条件查询失败', type: 'warning'})
            console.log('查询条件查询失败: ', queryResult.data.message)
          }

        })

      } else {
        options.push({value: '配置不完整，无法选择表字典', disabled: true})
        this.selectOptions = options
      }
    },

    loadColumnsInfo() {
      return getAction(`${this.url.getColumns}${this.element.options.dictTable}`).then(res => {
        if (res.success) {
          this.dictOptions = res.result.dictOptions

          return Promise.resolve(res)
        } else {
          this.$message({message: '列数据查询失败', type: 'warning'})
          console.log('列数据查询失败: ', res.message)
          return Promise.reject(res)
        }
      })
    },
    loadData(code, arg) {
      // if (arg == 1) {
      //   this.pagination.current = 1
      // }
      let params = { pageSize: 999999, pageNum: 1, ...this.queryParam } // 查询条件
      // this.loading = true
      return getAction(`${this.url.getData}${code}`, params)
    },

    handleOk() {
      if (this.selection.length > 1) {
        this.$message({message: '暂不支持选择多条记录', type: 'warning'})
        return
      }
      let {dictCode, dictText} = this.element.options

      let codes = dictCode.split(',')
      let texts = dictText.split(',')


      let results = []
      codes.forEach((code, i) => {
        let value = this.selection[0][code]
        if (texts[i] === this.element.model) {
          this.$emit('input', value)
          this.$emit('change', value)
        } else {
          results.push({text: texts[i], value})
        }
      })

      this.$emit('ok', results)

      this.handleClearSelected()
      this.dialogVisible = false
    },

    handleSelectChange(value) {
      let texts = this.element.options.dictText.split(',')
      this.$emit('ok', [{text: texts[0], value}])
    },

    /** 选择固定复选框时触发的事件 */
    handleSelectionChange(val) {
      this.selection = val
    },

    /** 清空选择 */
    handleClearSelected() {
      this.$refs.multipleTable.clearSelection()
    },

    handleClose(done) {
      done()
    },

    handleCancel() {
      this.dialogVisible = false
    },

    openModal() {
      if (this.disabled === true) return

      let {dictTable, dictCode, dictText} = this.element.options
      if (dictTable && dictCode && dictText) {
        this.dialogVisible = true
        this.$emit('opened')
        this.loadColumnsInfo().then(res => {
          // this.cgRpConfigId = res.result.cgRpConfigId
          // this.title = res.result.cgRpConfigName
          let currColumns = res.result.columns
          // for(let a=0;a<currColumns.length;a++){
          // if(currColumns[a].customRender){
          //   let dictCode = currColumns[a].customRender;
          //   currColumns[a].customRender=(text)=>{
          //     return filterMultiDictText(this.dictOptions[dictCode], text+"");
          //   }
          // }
          // }
          this.columns = [...currColumns]
          const id = res.result.cgRpConfigId
          return Promise.all([
            // 查询数据
            alwaysResolve(this.loadData(id)),
            // 查询查询条件
            alwaysResolve(getAction(`${this.url.getQueryInfo}${id}`))
          ])
        }).then(results => {
          let [dataResult, queryResult] = results

          if (dataResult.type === succeedSymbol) {
            let data = dataResult.data.result
            if (data) {
              // this.pagination.total = Number(data.total)
              this.dataSource = data.records
            } else {
              // this.pagination.total = 0
              this.dataSource = []
            }
          } else {
            this.$message({message: '数据查询失败', type: 'warning'})
            console.log('数据查询失败: ', dataResult.data.message)
          }

          // 查询条件
          if (queryResult.type === succeedSymbol) {
            this.queryInfos = queryResult.data.result
          } else {
            this.$message({message: '查询条件查询失败', type: 'warning'})
            console.log('查询条件查询失败: ', queryResult.data.message)
          }
        })
      } else {
        this.$message({message: '配置不完整，无法选择表字典', type: 'warning'})
      }
    },

    handleTableRowClick(row) {
      let { ignoreCount, multiple, $refs: { multipleTable } } = this
      multipleTable.toggleRowExpansion(row)
    }

  }
}
</script>


<style lang="scss" scoped>
.__table-dict {
  .input-icon {
    font-size: 16px;
    position: relative;
    left: 4px;
    cursor: pointer;
    color: #999999;
  }

  [disabled=true], [disabled=disabled] {
    pointer-events: none;
  }

  &.disabled {
    cursor: not-allowed;
  }

}

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
      overflow: hidden;
      -ms-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
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