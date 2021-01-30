<template>
  <a-card :bordered="false" style="height: 100%">

    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24" v-if="queryInfo && queryInfo.length>0">
          <template v-for="(item,index) in queryInfo">
            <template v-if=" item.hidden==='1' ">
              <a-col v-if="item.view.indexOf('Date')>=0 || item.view.indexOf('date')>=0" :span="item.mode=='single'?6:10" :key=" 'query'+index " v-show="toggleSearchStatus" :style="{width: item.searchWidth+'%'}">
                <onl-cgreport-query-form-item :queryParam="queryParam" :item="item" :dictOptions="dictOptions"></onl-cgreport-query-form-item>
              </a-col>
              <a-col v-else :span="item.mode=='single'?6:8" :key=" 'query'+index " v-show="toggleSearchStatus" :style="{width: item.searchWidth+'%'}">
                <onl-cgreport-query-form-item :queryParam="queryParam" :item="item" :dictOptions="dictOptions"></onl-cgreport-query-form-item>
              </a-col>
            </template>
            <template v-else>
              <a-col v-if="item.view.indexOf('Date')>=0 || item.view.indexOf('date')>=0" :span="item.mode=='single'?6:10" :key=" 'query'+index " :style="{width: item.searchWidth+'%'}">
                <onl-cgreport-query-form-item :queryParam="queryParam" :item="item" :dictOptions="dictOptions"></onl-cgreport-query-form-item>
              </a-col>
              <a-col v-else :span="item.mode=='single'?6:8" :key=" 'query'+index " :style="{width: item.searchWidth+'%'}">
                <onl-cgreport-query-form-item :queryParam="queryParam" :item="item" :dictOptions="dictOptions"></onl-cgreport-query-form-item>
              </a-col>
            </template>
          </template>

          <a-col :span="6">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchByQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a-button type="primary" icon="plus" @click="exportExcel"  style="margin-left: 8px">导出</a-button>
              <a v-if="queryInfo.length > 3" @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>


    <div class="table-operator" style="margin-bottom: 10px" v-if="queryInfo.length===0">
      <a-button type="primary" icon="plus" @click="exportExcel">导出</a-button>
    </div>


    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="id"
      :columns="table.columns"
      :dataSource="table.dataSource"
      :pagination="table.pagination"
      :loading="table.loading"
      :rowSelection="rowSelectionConfig"
      @change="handleChangeInTable"
      style="min-height: 300px"
      class="j-table-force-nowrap"
    >

      <!-- 支持链接href跳转 -->
      <template
        v-for="field of fieldHrefSlots"
        :slot="field.slotName"
        slot-scope="text, record"
      >
        <a @click="handleClickFieldHref(field,record)">{{ text }}</a>
      </template>
      <!-- 字符串超长截取省略号显示-->
      <template
        v-for="column of this.table.columns"
        :slot="'ellipsis_'+column.dataIndex"
        slot-scope="text"
      >
        <j-ellipsis :length="column.fieldWidth == null ? 25 : Number.parseInt(column.fieldWidth)" :value="text ? text + '' : ''"/>
      </template>
    </a-table>
    <div v-if="statisticalInfo.length > 0">
        <b>合计：</b>
      <div style="margin-left: 10px" v-for="fieldMap of statisticalInfo">{{fieldMap.fieldTxt}}: {{fieldMap.sum}}</div>
    </div>
    <!-- 跳转Href的动态组件方式 -->
    <a-modal v-bind="hrefComponent.model" v-on="hrefComponent.on">
      <component :is="hrefComponent.is" v-bind="hrefComponent.params"/>
    </a-modal>

  </a-card>
</template>

<script>
  import { HrefJump } from '@/mixins/OnlAutoListMixin'
  import { getAction,downFile } from '@/api/manage'
  import OnlCgreportQueryFormItem from './OnlCgreportQueryFormItem.vue';
  import { filterMultiDictText } from '@/components/dict/JDictSelectUtil'
  import {filterObj} from '@/utils/util';
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import Vue from "vue";
  import moment from "moment"
  import { USER_INFO } from '@/store/mutation-types'

  export default {
    name: 'OnlCgreportAutoList',
    mixins: [HrefJump],
    components: {
      OnlCgreportQueryFormItem,
      JEllipsis
    },
    data() {
      return {
        // 查询参数
        queryInfo: [],
        // 查询参数，多个页面的查询参数用 code 作为键来区分
        queryParamsMap: {},
        selfParam:{
        },
        sorter: {
          column: '',
          order: 'desc',
        },
        dictOptions: {},
        toggleSearchStatus: false, // 高级搜索 展开/关闭
        reportCode: '',
        description: '在线报表功能测试页面',
        url: {
          getColumnsAndData: '/online/cgreport/api/getColumnsAndData/',
          getQueryInfo: '/online/cgreport/api/getQueryInfo/',
          getParamsInfo:'/online/cgreport/api/getParamsInfo/',
          getStatisticalInfo:'/online/cgreport/api/getStatisticalInfo/'
        },
        table: {
          loading: true,
          // 表头
          columns: [],
          //数据集
          dataSource: [],
          // 选择器
          selectedRowKeys: [],
          selectionRows: [],
          // scroll: { x: false },
          // 分页参数
          pagination: {
            current: 1,
            pageSize: 10,
            pageSizeOptions: ['10', '20', '30'],
            showTotal: (total, range) => {
              return range[0] + '-' + range[1] + ' 共' + total + '条'
            },
            showQuickJumper: true,
            showSizeChanger: true,
            total: 0
          }
        },
        cgreportHeadName:"",
        //报表数值类型字段合计信息
        statisticalInfo: [],
        checkboxFlag:false,
      }
    },
    mounted() {
      this.initParamsInfo()
      this.initQueryInfo();
    },
    watch: {
      '$route'() {
        // 刷新参数放到这里去触发，就可以刷新相同界面了
        this.initParamsInfo()
        this.initQueryInfo();
      }
    },
    computed: {
      rowSelectionConfig:function() {
        if(!this.checkboxFlag){
          return null
        }
        return {
          selectedRowKeys: this.table.selectedRowKeys,
          onChange: this.handleChangeInTableSelect
        }
      },
      queryParam: {
        get() {
          return this.queryParamsMap[this.reportCode]
        },
        set(newVal) {
          this.$set(this.queryParamsMap, this.reportCode, newVal)
        }
      }
    },
    methods: {
      initParamsInfo(){
        if(!this.$route.params.code){
          return false
        }
        //获取报表ID
        this.reportCode = this.$route.params.code;
        if (!this.queryParam) {
          this.queryParam = {}
        }

        this.selfParam={}
        getAction(`${this.url.getParamsInfo}${this.reportCode}`).then((res) => {
          if (res.success) {
            if(res.result && res.result.length>0){
              for(let i of res.result){
                this.selfParam['self_'+i.paramName]=(!this.$route.query[i.paramName])?"":this.$route.query[i.paramName]
              }
            }
          } else {
            this.$message.warning(res.message)
          }
          this.loadData()
        })
      },
      initQueryInfo() {
        if(!this.reportCode){
          return false
        }
        getAction(`${this.url.getQueryInfo}${this.reportCode}`).then((res) => {
          console.log("获取查询条件", res);
          if (res.success) {
            //系统变量替换
            this.replaceSysParam(res.result);
            this.queryInfo = res.result
            //查询条件form 默认值设置
            for(let item of res.result){
              if(item.defValue && item.defValue.length>0 && item.mode === 'single'){
                this.$set(this.queryParam,item.field,item.defValue);
              }
            }
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      replaceSysParam(resResult){
        // 组装系统变量
        let userinfo = Vue.ls.get(USER_INFO);
        let sysParam = {
          sys_user_code: userinfo.username,
          sys_user_name: userinfo.realname,
          sys_org_code: userinfo.orgCode,
          sys_date: moment(new Date()).format('YYYY-MM-DD'),
          sys_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')+'',
        }
        let sysParamPattern = /\#{([^}]+)?}/
        for(let item of resResult){
          if (item.defValue && sysParamPattern.test(item.defValue)){
            item.defValue = item.defValue.trim().replace(/\#{([^}]+)?}/g, (s1, s2) => sysParam[s2])
          }
        }
      },
      loadData(arg) {
        // 清空复选框
        this.table.selectedRowKeys = [];
        if(!this.reportCode){
          return false
        }
        if (arg == 1) {
          this.table.pagination.current = 1
        }
        let params = this.getQueryParams();//查询条件
        console.log(params)

        //获取报表ID
        console.log(' 动态报表 reportCode ： ' + this.reportCode);
        this.table.loading = true

        getAction(`${this.url.getColumnsAndData}${this.reportCode}`, params).then(res => {
          if (res.success) {
            //列表复选框配置
            if(res.result.isCheckbox == 'Y'){
              this.checkboxFlag = true
            }else{
              this.checkboxFlag = false
            }
            let { data, columns, cgreportHeadName, dictOptions, fieldHrefSlots } = res.result
            // href 跳转
            const fieldHrefSlotKeysMap = {}
            fieldHrefSlots.forEach(item => fieldHrefSlotKeysMap[item.slotName] = item)
            // let columnWidth = 230
            this.dictOptions = dictOptions
            columns.forEach(column => {
              // column.width = columnWidth
              // 处理列中的 href 跳转和 dict 字典，使两者可以兼容存在
              this.handleColumnHrefAndDictAndEllipsis(column, fieldHrefSlotKeysMap)
              // 设置列宽(字符长度)，使用的插槽名称前缀为’ellipsis_‘
              column.scopedSlots = { customRender: 'ellipsis_'+column.dataIndex}
            })
            // this.table.scroll.x = columns.length * columnWidth
            this.table.columns = [...columns]
            this.cgreportHeadName = cgreportHeadName
            this.fieldHrefSlots = fieldHrefSlots
            if (data) {
              this.table.pagination.total = Number(data.total)
              this.table.dataSource = data.records
            } else {
              this.table.pagination.total = 0
              this.table.dataSource = []
            }
            this.initStatisticalInfo();
          }else{
            this.$message.warn('查询失败：'+res.message)
          }

        }).catch((e) => {
          console.error(e)
          this.$message.error('查询失败')
        }).finally(() => {
          this.table.loading = false
        })
      },
      getQueryParams() {
        let param = Object.assign({}, this.queryParam, this.sorter,this.selfParam);
        param.pageNo = this.table.pagination.current;
        param.pageSize = this.table.pagination.pageSize;
        this.fuzzyQuery(param);
        return filterObj(param);
      },
      searchByQuery() {
        this.loadData(1);
      },
      searchReset() {
        this.queryParam = {}
        this.loadData(1);
      },
      handleToggleSearch() {
        this.toggleSearchStatus = !this.toggleSearchStatus;
      },
      exportExcel() {
        let fileName = this.cgreportHeadName
        // 导出参数
        let params = this.getQueryParams();
        // 如果有复选框选择项，执行选择导出，参数中添加ids参数
        if (this.table.selectedRowKeys.length > 0) {
          this.table.selectedRowKeys.sort(function(a, b){return a - b});
          let selections = '';
          for (let a = 0; a < this.table.selectedRowKeys.length; a++) {
            selections += this.table.selectedRowKeys[a] + ',';
          }
          params.selections = selections;
        } else {
          // 全量导出时，pageNo为1，且pageSize为总的条件查询结果记录数（不是每页条数）
          params.pageNo = 1;
          params.pageSize = this.table.pagination.total;
        }
        downFile(`/online/cgreport/api/exportXls/${this.reportCode}`, params).then((data) => {
          if (!data) {
            this.$message.warning('文件下载失败')
            return
          }
          if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(new Blob([data]), fileName+'.xls')
          }else{
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', fileName+'.xls')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link); //下载完成移除元素
            window.URL.revokeObjectURL(url); //释放掉blob对象
          }
        })
      },
      handleChangeInTableSelect(selectedRowKeys, selectionRows) {
        this.table.selectedRowKeys = selectedRowKeys
        this.table.selectionRows = selectionRows
      },
      handleChangeInTable(pagination, filters, sorter) {
        //分页、排序、筛选变化时触发
        if (Object.keys(sorter).length > 0) {
          this.sorter.column = sorter.field
          this.sorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
        } else {
          this.sorter.column = null
          this.sorter.order = null
        }
        this.table.pagination = pagination
        this.loadData()
      },
      // 查询数值类型的字段的合计信息
      initStatisticalInfo() {
        if(!this.reportCode){
          return false
        }
        let params = this.getQueryParams();
        params.pageNo = 1;
        params.pageSize = this.table.pagination.total;
        getAction(`${this.url.getStatisticalInfo}${this.reportCode}`, params).then((res) => {
          if (res.success) {
            this.statisticalInfo = res.result
          } else {
            this.statisticalInfo = [];
            this.$message.warning(res.message)
          }
        })
      },
      fuzzyQuery(param) {
        // 查询项预处理，文本框都支持模糊查询
        let stringParams = [];
        if (this.queryInfo && this.queryInfo.length > 0) {
          this.queryInfo.forEach(function (item) {
            if (item.view == 'string' && item.fuzzyQueryFlag == 1) {
              stringParams.push(item.field);
            }
          })
          stringParams.forEach(function (str) {
            if (str in param) {
              param[str] = '*' + param[str].replace(/\*/g, '') + '*';
            }
          })
        }
      }
    }
  }
</script>
<style scoped>
  .div {
    display: flex;
    align-items: center;
    height: 500px
  }
</style>
<style lang="less">
  @import '~@/assets/less/TableExpand.less';
</style>