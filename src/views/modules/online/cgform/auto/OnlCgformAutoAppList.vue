<template>
  <div style="height: 100%;width:100%;padding: 0px;background-color: #f8f8f8; position: relative;">
    <div class="table-page-search-wrapper" style="background-color: #fff">
      <van-search v-model='keyword' placeholder=" 请输入" show-action @search='loadDataByKeyword'>
        <template #action>
          <van-icon name='filter-o' size='20' color='#1890FF' v-if="queryInfo && queryInfo.length>0"
                    @click="handleToggleSearch"></van-icon>
        </template>
      </van-search>
    </div>
    <a-drawer :visible='toggleSearchStatus' :width="'80%'" :body-style="{paddingBottom: '80px'}"
              @close='toggleSearchStatus = !toggleSearchStatus'>
      <van-form layout="inline" @keyup.enter.native="searchByquery">
        <div v-if="queryInfo && queryInfo.length>0">
          <div v-for="(item,index) in queryInfo" :key=" 'query'+index ">
            <online-query-app-form-item :queryParam="queryParam" :item="item"
                                        :dictOptions="dictOptions"></online-query-app-form-item>
          </div>
        </div>
      </van-form>
      <div
        style="position:absolute;bottom: 0;left: 0; width: 100%;display: flex;justify-content: space-around;padding: 10px;">
        <a-button type="primary" @click="searchByquery" icon="search" style="flex:1">查询</a-button>
        <a-button type="primary" @click="searchReset" icon="reload" style="flex:1;margin-left:10px">重置</a-button>
      </div>
    </a-drawer>
    <div class="pageCont" :style="{'height':pageHeight,'overflow': 'auto','padding': '0 15px'}">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          style="margin: 0px 0px"
          :offset='20'
          @load="onLoad"
          :immediate-check='false'>
          <van-cell v-for="item in table.dataSource" :key="item.id" @click="handleDetail(item)" :border='false'
                    style="margin-top:10px">
            <div v-for="el in defColumns" :key="el.title">
              <div :class="el.appClassName">{{el.title}}:
                <template v-if="dictOptions.hasOwnProperty(el.dataIndex)">
                  <template v-for="vie in dictOptions[el.dataIndex]">
                    <template v-if="vie.value == item[el.dataIndex]">{{vie.text}}</template>
                  </template>
                </template>
                <template v-else>
                  {{item[el.dataIndex]}}
                </template>
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
    <onl-cgform-auto-modal-app @success="handleFormSuccess" ref="modal" :code="code" :isApp='true'
                               @schema="handleGetSchema" class="pageCont"/>


    <van-popup v-model="showOnlTabApp" round closeable class="pageCont"
               :style="{'height':'90%','width':'90%','overflow':'auto','padding': '30px 12px'}">
      <onl-cgform-auto-app-tab ref="OnlCgformAutoAppTab"></onl-cgform-auto-app-tab>
    </van-popup>
    <!-- @ok="handleSubmit"
   @cancel="handleCancel" -->
    <div
      style="width: 40px; height: 40px; border-radius: 20px; font-size: 13px; background: #0D9BF2; color: white; text-align: center; line-height: 40px; position: absolute; bottom: 10px; right: 10px"
      @click="onCreateClick">
      创建
    </div>
  </div>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { HrefJump } from '@/mixins/OnlAutoListMixin'
  import { httpAction, postAction, getAction, deleteAction, downFile, getFileAccessHttpUrl } from '@/api/manage'
  import { cloneObject, filterObj } from '@/utils/util'
  import JImportModal from '@/components/jeecg/JImportModal'
  import OnlineQueryFormItem from '@/components/online/autoform/OnlineQueryFormItem.vue'
  import ProcessInstPicModal from '@/components/bpm/ProcessInstPicModal'
  import JSuperQuery from '@comp/jeecg/JSuperQuery'
  import ButtonExpHandler from '@/components/online/autoform/model/ButtonExpHandler'
  import { onlUtil } from '@/mixins/OnlineCommonUtil'
  import lodash_object from 'lodash'
  import Vue from 'vue'
  import JEditableTable from '@/components/jeecg/JEditableTable'
  import { FormTypes, Types } from '@/utils/JEditableTableUtil'
  import EoaPlanModal from '@/components/eoa/EoaPlanModal'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import { USER_INFO } from '@/store/mutation-types'
  import moment from 'moment'
  import { mapActions } from 'vuex'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import OnlineQueryAppFormItem from '@/components/online/autoform/OnlineQueryAppFormItem.vue'
  import OnlCgformAutoAppTab from './OnlCgformAutoAppTab.vue'
  import { List, PullRefresh, Cell, Form, Popup, Search, Icon } from 'vant'
  import OnlCgformAutoModalApp from './OnlCgformAutoModalApp.vue'

  Vue.use(List).use(PullRefresh).use(Cell).use(Form).use(Popup).use(Search).use(Icon)
  export default {
    name: 'OnlCgformAutoAppList',
    mixins: [HrefJump, mixinDevice, onlUtil],
    components: {
      JSuperQuery,
      OnlineQueryFormItem,
      JImportModal,
      ProcessInstPicModal,
      JEditableTable,
      EoaPlanModal,
      JEllipsis,
      OnlineQueryAppFormItem,
      OnlCgformAutoAppTab,
      OnlCgformAutoModalApp
    },
    data() {
      return {
        isurl: true,
        code: '',
        lodash: lodash_object,
        description: '在线报表功能测试页面',
        currentTableName: '',
        url: {
          getDataByKeyword: '/online/cgform/api/getDataByKeyword/',
          getQueryInfo: '/online/cgform/api/getAppQueryInfo/',
          getColumns: '/online/cgform/api/getAppColumns/',
          getData: '/online/cgform/api/getData/',
          optPre: '/online/cgform/api/form/',
          exportXls: '/online/cgform/api/exportXls/',
          buttonAction: '/online/cgform/api/doButton',
          startProcess: '/process/extActProcess/startMutilProcess'
        },
        flowCodePre: 'onl_',
        isorter: {
          column: 'createTime',
          order: 'desc'
        },
        //dictOptions:{fieldName:[]}
        dictOptions: {},
        cgButtonLinkList: [],
        cgButtonList: [],
        queryInfo: [],
        // 查询参数，多个页面的查询参数用 code 作为键来区分
        queryParamsMap: {},
        toggleSearchStatus: false,
        table: {
          loading: true,
          scroll: { x: false },
          // 表头
          columns: [],
          //数据集
          dataSource: [],
          // 选择器
          selectedRowKeys: [],
          selectionRows: [],
          // 分页参数
          pagination: {}
        },
        metaPagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        actionColumn: {},
        formTemplate: '99',
        EnhanceJS: '',
        hideColumns: [],
        buttonSwitch: {
          add: true,
          update: true,
          delete: true,
          batch_delete: true,
          import: true,
          export: true,
          detail: true,
          table_edit: true,
          addtodo: true
        },
        hasBpmStatus: false,
        checkboxFlag: false,
        // 高级查询
        superQuery: {
          // 字段列表
          fieldList: [],
          // 查询参数
          params: '',
          // 查询条件拼接方式 'and' or 'or'
          matchType: 'and'
        },
        scrollFlag: 0,
        settingColumns: [],
        defColumns: [],
        editColumns: [],
        fullColumns: [],
        isCell: false,
        formData: [],//编辑表单数组
        chooIds: [],//已经选择
        businessKeys: [],//导入设置的业务主键
        isCover: '',//导入时是否按业务主键覆盖
        formOpenType: '0',
        //
        keyword: '',
        loading: false,
        finished: false,
        refreshing: false,
        pageHeight: 0,
        showOnlTabApp: false,
        submitLoading: false,
        IsByKeyword: false
      }
    },
    created() {
      const token = this.$route.query.token
      if (token) {

        Vue.ls.set(ACCESS_TOKEN, token, 12 * 60 * 60 * 1000)
        this.$store.commit('SET_TOKEN', token)

        this.GetPermissionList(token).then((res) => {
          // console.log(res)
          if (res.success) {
            this.initAutoList()
          }
        }).catch((err) => {
          this.requestFailed(err)
        })
      } else {
        this.requestFailed('登录错误，请稍后再试')
      }
      this.pageHeight = (window.innerHeight - 54) + 'px'
    },
    mounted() {
      this.cgButtonJsHandler('mounted')
      window.addEventListener('resize', this.windowResize, false)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.windowResize, false)
    },
    watch: {
      '$route'() {
        // 刷新参数放到这里去触发，就可以刷新相同界面了
        console.log('kaishil')
        this.initAutoList()
      },
      settingColumns(val) {
        if (val.length > 0) {
          let tmpColumns = this.fullColumns
          let arr = []
          for (let i = 0; i < tmpColumns.length; i++) {
            if (val.indexOf(tmpColumns[i].key) != -1) {
              arr.push(tmpColumns[i])
            }
          }
          console.log(arr, val, 333)
          this.editColumns = arr
        }
      }
    },
    computed: {
      rowSelectionConfig: function() {
        if (!this.checkboxFlag) {
          return null
        }
        return {
          // fixed:true,
          selectedRowKeys: this.table.selectedRowKeys,
          onChange: this.handleChangeInTableSelect
        }
      },
      queryParam: {
        get() {
          return this.queryParamsMap[this.code]
        },
        set(newVal) {
          this.$set(this.queryParamsMap, this.code, newVal)
        }
      },
      enableScrollBar() {
        return this.scrollFlag === 1 || this.isMobile()
      },
      tableScroll() {
        // 移动端模式下无论如何都开启横向滚动条
        if (this.enableScrollBar) {
          return undefined
        } else {
          return this.table.scroll
        }
      },
      tableColumn() {
        if (!this.settingColumns || this.settingColumns.length <= 0) {
          return this.defColumns
        } else {
          const cols = this.defColumns.filter(item => {
            if (item.key == 'rowIndex' || item.dataIndex == 'action') {
              return true
            }
            if (this.settingColumns.includes(item.dataIndex)) {
              return true
            }
            return false
          })
          return cols
        }
      },
      localCode() {
        return 'onl_' + this.currentTableName
      }
    },
    methods: {
      ...mapActions(['GetPermissionList']),
      windowResize() {
        this.pageHeight = (document.body.clientHeight - 54) + 'px'
      },
      requestFailed(err) {
        this.$notification['error']({
          message: '登录失败',
          description: ((err.response || {}).data || {}).message || err.message || '请求出现错误，请稍后再试',
          duration: 4
        })
        this.loginBtn = false
      },
      addNeedDetail(row) {
        this.$refs.baseModal.edit(row.id)
      },
      handleModalOk() {
        this.finished = false
        this.loadData(1, false)
      },
      editCell(value) {
        this.isCell = value
      },
      //保存数据
      saveCell() {
        for (let i = 0; i < this.formData.length; i++) {
          this.handleApplyRequest(this.formData[i], i, this.formData.length)
        }
        console.log('hhh', this.formData)
      },
      //表格数据变化回调
      valueChange(res) {
        if (this.chooIds.indexOf(res.row.id) == -1) {
          this.chooIds.push(res.row.id)
          this.formData.push(res.row)
        } else {
          this.formData = this.formData.map(item => item.id === res.row.id ? res.row : item)
        }
      },
      handleSelectRowChange(selectIds) {
        console.log('ids:', selectIds)
      },
      //保存数据
      handleApplyRequest(formData, key, length) {
        Object.keys(formData).map(key => {
          if (Array.isArray(formData[key])) {
            if (formData[key].length == 0) {
              formData[key] = ''
            }
          }
        })
        httpAction(this.url.optPre + this.code, formData, 'put').then((res) => {
          if (res.success) {
            if (key == length - 1) {
              this.$message.success(res.message)
              this.loadData()
              this.isCell = false
            }
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      hasBpmStatusFilter() {
        var columnObjs = this.defColumns
        let columns = []
        for (var item of columnObjs) {
          columns.push(item.dataIndex)
        }
        if (columns.includes('bpm_status') || columns.includes('BPM_STATUS')) {
          this.hasBpmStatus = true
        } else {
          this.hasBpmStatus = false
        }
      },
      startProcess: function(record) {
        var that = this
        this.$confirm({
          title: '提示',
          content: '确认提交流程吗?',
          onOk: function() {
            var param = {
              flowCode: that.flowCodePre + that.currentTableName,
              id: record.id,
              formUrl: 'modules/bpm/task/form/OnlineFormDetail',
              formUrlMobile: 'online/OnlineDetailForm'
            }
            postAction(that.url.startProcess, param).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadData()
                that.onClearSelected()
              } else {
                that.$message.warning(res.message)
              }
            })
          }
        })
      },
      handlePreviewPic: function(record) {
        var flowCode = this.flowCodePre + this.currentTableName
        var dataId = record.id
        this.$refs.processInstPicModal.preview(flowCode, dataId)
        this.$refs.processInstPicModal.title = '流程图'
      },
      initQueryInfo() {
        getAction(`${this.url.getQueryInfo}${this.code}`).then((res) => {
          console.log('--onlineList-获取查询条件配置', res)
          if (res.success) {
            //系统变量替换
            this.replaceSysParam(res.result)
            this.queryInfo = res.result
            //查询条件form 默认值设置
            for (let item of res.result) {
              if (item.config === '1') {
                if (item.defValue && item.defValue.length > 0 && item.mode === 'single') {
                  this.$set(this.queryParam, item.field, item.defValue)
                }
              }

            }
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      replaceSysParam(resResult) {
        // 组装系统变量
        let userinfo = Vue.ls.get(USER_INFO)
        let sysParam = {
          sys_user_code: userinfo.username,
          sys_user_name: userinfo.realname,
          sys_org_code: userinfo.orgCode,
          sys_date: moment(new Date()).format('YYYY-MM-DD'),
          sys_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ''
        }
        let sysParamPattern = /\#{([^}]+)?}/
        for (let item of resResult) {
          if (item.defValue && sysParamPattern.test(item.defValue)) {
            item.defValue = item.defValue.trim().replace(/\#{([^}]+)?}/g, (s1, s2) => sysParam[s2])
          }
        }
      },
      initAutoList() {
        if (!this.$route.params.code) {
          return false
        }
        // 清空高级查询条件
        this.superQuery.params = ''
        if (this.$refs.superQuery) {
          this.$refs.superQuery.handleReset()
        }

        this.table.loading = true
        this.code = this.$route.params.code
        if (!this.queryParam) {
          this.queryParam = {}
        }
        getAction(`${this.url.getColumns}${this.code}`).then((res) => {


          console.log('--onlineList-加载动态列>>', res)
          if (res.success) {
            this.formOpenType = res.result.formOpenType ? res.result.formOpenType : '0'
            if (res.result.checkboxFlag == 'Y') {
              this.checkboxFlag = true
            } else {
              this.checkboxFlag = false
            }

            if (res.result.paginationFlag == 'Y') {
              this.table.pagination = { ...this.metaPagination }
            } else {
              this.table.pagination = false
            }
            // href 跳转
            const fieldHrefSlotKeysMap = {}
            res.result.fieldHrefSlots.forEach(item => fieldHrefSlotKeysMap[item.slotName] = item)
            this.dictOptions = res.result.dictOptions
            this.formTemplate = res.result.formTemplate
            this.description = res.result.description
            this.currentTableName = res.result.currentTableName
            this.initCgButtonList(res.result.cgButtonList)
            this.initCgEnhanceJs(res.result.enhanceJs)
            this.initButtonSwitch(res.result.hideColumns)
            res.result.columns.forEach(column => {
              Object.keys(column).map(key => {
                // 删掉空值的字段（不删除 空字符串('') 或 数字 0 ）
                if (column[key] == null) {
                  delete column[key]
                }
              })
              // 处理列中的 href 跳转和 dict 字典，使两者可以兼容存在
              this.handleColumnHrefAndDictAndEllipsis(column, fieldHrefSlotKeysMap)
              // 超长字符串缩略显示
              if (!column.scopedSlots) {
                // 使用的插槽名称前缀为’ellipsis_‘
                column.scopedSlots = { customRender: 'ellipsis_' + column.dataIndex }
              }
              // 控件宽度
              if (column.fieldLength) {
                column.width = column.fieldLength
              }
            })
            this.defColumns = res.result.columns.concat()
            this.settingColumnsHandler(res.result.columns)
            this.scrollFlag = res.result.scrollFlag
            this.hasBpmStatusFilter()
            
            this.loadData(1, false)
            this.initQueryInfo()
            //加载新路由，清空checkbox选中
            this.table.selectedRowKeys = []
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      loadData(arg,IsByKeyword) {
        if (this.table.pagination) {
          if (arg == 1) {
            this.table.pagination.current = 1
          }
          let params
          if(IsByKeyword) {
             let fuzzyQueryFields = this.defColumns.filter(e => e.appKeywordFlag == 1).map(e => {
              return e.dataIndex
            })
            params = {
              pageNo: this.table.pagination.current,
              pageSize: 10,
              keyword: this.keyword,
              fuzzyQueryFields: fuzzyQueryFields.join(',')
            }
          }else {
            params = this.getQueryParams()//查询条件
            this.fuzzyQuery(params)
          }
         
          console.log('--onlineList-查询条件-->', params)
          getAction(`${this.url.getDataByKeyword}${this.code}`, params).then((res) => {
            console.log('--onlineList-列表数据', res)
            if (res.success) {
              let result = res.result
              if (Number(result.total) > 0) {
                this.table.pagination.total = Number(result.total)
                console.log(this.table.dataSource, 88888)
                console.log(this.table.pagination)
                if (arg != 1) {
                  this.table.dataSource = this.table.dataSource.concat(result.records)
                } else {
                  this.table.dataSource = result.records
                }
                this.table.pagination.current = this.table.pagination.current + 1
                this.$set(this.table.pagination, 'pages', Number(result.total) >= this.metaPagination.pageSize ? Math.ceil(Number(result.total) / this.metaPagination.pageSize) : 1)
                this.loading = false
                if ((this.table.pagination.pages && this.table.pagination.current > this.table.pagination.pages) || !this.table.pagination.pages) {
                  this.finished = true
                }
              } else {
                this.table.pagination.total = 0
                this.table.dataSource = []
                this.loading = false
                this.finished = true
                //this.$message.warning("查无数据")
              }
            } else {
              this.$message.warning(res.message)
            }
          }).finally(() => {
            this.table.loading = false
          })
        } else {
          this.loadDataNoPage()
        }
      },
      loadDataNoPage() {
        this.table.loading = true
        let param = this.getQueryParams()//查询条件
        param['pageSize'] = -521
        getAction(`${this.url.getDataByKeyword}${this.code}`, filterObj(param)).then((res) => {
          console.log('--onlineList-列表数据', res)
          if (res.success) {
            let result = res.result
            if (Number(result.total) > 0) {
              this.table.dataSource = result.records
            } else {
              this.table.dataSource = []
            }
          } else {
            this.$message.warning(res.message)
          }
        }).finally(() => {
          this.table.loading = false
        })
      },
      loadDataByKeyword() {
        this.refreshing = true
        this.loading = true
        this.IsByKeyword = true
        this.queryParam = {}
        this.table.dataSource = []
        this.finished = false
        // this.loadData(1, true)
        this.onLoad()
        // let params = this.getQueryParams();//查询条件
        // this.fuzzyQuery(params)
        // let fuzzyQueryFields = this.defColumns.filter(e => e.appKeywordFlag == 1).map(e => {
        //   return e.dataIndex
        // })
        // let params = {
        //   pageNo: 1,
        //   pageSize: 10,
        //   keyword: this.keyword,
        //   fuzzyQueryFields: fuzzyQueryFields.join(',')
        // }
        // console.log('--onlineList--bykeyword-查询条件-->', params)
        // getAction(`${this.url.getDataByKeyword}${this.code}`, params).then((res) => {
        //   console.log('--onlineList-列表数据', res)
        //   if (res.success) {
        //     let result = res.result
        //     if (Number(result.total) > 0) {
        //       this.table.pagination.total = Number(result.total)
        //       console.log(this.table.dataSource, 66)
        //       this.table.dataSource = result.records
        //       this.table.pagination.current = this.table.pagination.current + 1
        //       this.$set(this.table.pagination, 'pages', Number(result.total) > this.metaPagination.pageSize ? Number(result.total) % this.metaPagination.pageSize : 1)
        //       this.loading = false
        //       if ((this.table.pagination.pages && this.table.pagination.current > this.table.pagination.pages) || !this.table.pagination.pages) {
        //         this.finished = true
        //       }
        //     } else {
        //       this.table.pagination.total = 0
        //       this.table.dataSource = []
        //       this.loading = false
        //       this.finished = true
        //       //this.$message.warning("查无数据")
        //     }
        //   } else {
        //     this.$message.warning(res.message)
        //   }
        // }).finally(() => {
        //   this.table.loading = false
        // })
      },
      getQueryParams() {
        let param = Object.assign({}, this.queryParam, this.isorter)
        param.pageNo = this.table.pagination.current
        param.pageSize = this.table.pagination.pageSize
        param.superQueryMatchType = this.superQuery.matchType
        param.superQueryParams = encodeURIComponent(this.superQuery.params)
        return filterObj(param)
      },
      handleChangeInTableSelect(selectedRowKeys, selectionRows) {
        this.table.selectedRowKeys = selectedRowKeys
        this.table.selectionRows = selectionRows
        this.selectedRowKeys = selectedRowKeys
      },
      handleTableChange(pagination, filters, sorter) {
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field
          this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
        }
        if (this.table.pagination) {
          this.table.pagination = pagination
        }
        this.finished = false
        this.loadData(1,false)
      },
      handleAdd() {
        this.cgButtonJsHandler('beforeAdd')
        if (this.formOpenType == '1') {
          this.$router.push({ path: '/online/cgformEdit/' + this.code + '/null/add' })
        } else {
          this.$refs.modal.add(this.formTemplate)
        }
      },
      handleImportXls() {
        this.$refs.importModal.show()
      },
      importOk() {
        this.finished = false
        this.loadData(1,false)
      },
      handleExportXls2() {
        let param = this.queryParam
        if (this.table.selectedRowKeys && this.table.selectedRowKeys.length > 0) {
          param['selections'] = this.table.selectedRowKeys.join(',')
        }
        let paramsStr = encodeURI(JSON.stringify(param))
        console.log('paramsStr: ' + paramsStr)
        let url = window._CONFIG['domianURL'] + this.url.exportXls + this.code + '?paramsStr=' + paramsStr
        window.location.href = url
      },
      handleExportXls() {
        let param = this.getQueryParams()//查询条件

        this.fuzzyQuery(param)
        if (this.table.selectedRowKeys && this.table.selectedRowKeys.length > 0) {
          param['selections'] = this.table.selectedRowKeys.join(',')
        } else {
          delete param['selections']
        }
        let paramsStr = JSON.stringify(filterObj(param))
        // 要导出的字段
        let settingColumns = ''
        this.settingColumns.forEach(item => {
          settingColumns += item + ','
        })
        downFile(this.url.exportXls + this.code, {
          paramsStr: paramsStr,
          settingColumns: settingColumns
        }).then((data) => {
          if (!data || data.size === 0) {
            this.$message.warning('文件下载失败')
            return
          }
          if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(new Blob([data]), this.description + '.xls')
          } else {
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', this.description + '.xls')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link) //下载完成移除元素
            window.URL.revokeObjectURL(url) //释放掉blob对象
          }
        })
      },
      handleEdit(record) {
        if (this.formOpenType == '1') {
          this.$router.push({ path: '/online/cgformEdit/' + this.code + '/' + record.id + '/edit' })
        } else {
          this.$refs.modal.edit(this.formTemplate, record.id)
        }
      },
      showLinkButton(item, record) {
        let btn = new ButtonExpHandler(item.exp, record)
        return btn.show
      },
      onCreateClick() {
        this.$router.push({ path: '/out/online/cgformlistAppContent?type=add&table=' + this.currentTableName + '&code=' + this.code + '&token=' + this.$route.query.token })
      },
      handleDetail(record) {
        console.log(this.formOpenType, this.$refs.OnlCgformAutoAppTab)
        this.$router.push({ path: '/out/online/cgformlistAppContent?type=detail&table=' + this.currentTableName + '&code=' + this.code + '&id=' + record.id + '&token=' + this.$route.query.token })
        return
        if (this.formOpenType == '1') {
          this.showOnlTabApp = true
          this.$nextTick(() => {
            console.log(this.formOpenType, this.$refs.OnlCgformAutoAppTab, '0000')
            this.$refs.OnlCgformAutoAppTab.initAutoList(this.code, record.id, 'detail')

          })
          // this.$router.push({ path: '/online/cgformEdit/'+this.code+'/'+record.id+'/detail'})
        } else {
          this.$refs.modal.detail(this.formTemplate, record.id)
        }


      },
      handleDeleteOne(record) {
        this.cgButtonLinkHandler(record, 'beforeDelete', 'js')
        this.handleDelete(record.id)
      },
      handleDelete(id) {
        deleteAction(this.url.optPre + this.code + '/' + id).then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            this.finished = false
            this.loadData(1,false)
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      handleFormSuccess() {
        this.finished = false
        this.loadData(1,false)
      },
      // 查询完 schema 后，生成高级查询的字段列表
      handleGetSchema(schema) {
        console.log(schema, '111')
        if (schema && schema.properties) {
          let setField = (array, field) => {
            let type = field.view || (field.type || 'string')
            type = (type === 'inputNumber' ? 'number' : type)
            let params = {
              type: type,
              value: field.key,
              text: field.title,
              // 额外字典参数
              dictCode: field.dictCode,
              dictTable: field.dictTable,
              dictText: field.dictText,
              options: field.enum || field.options,
              order: field.order,
              querySuperHidden: field.querySuperHidden
            }

            // 处理popup
            if (type === 'popup') {
              params['popup'] = {
                code: field.popupCode || field.code,
                field: field.orgFields.split(',')[0],
                orgFields: field.orgFields.split(',')[0],
                destFields: field.destFields.split(',')[0],
                dictFilter: field.dictFilter,
                querySuperHidden: field.querySuperHidden
              }
            }
            array.push(params)
          }
          let fieldList = []
          let columns = []
          for (let key in schema.properties) {
            if (!schema.properties.hasOwnProperty(key)) {
              continue
            }
            let field = schema.properties[key]
            // tab = 子表 一对多
            if (field.view === 'tab' && field.relationType == 0) {
              let subTable = {
                type: 'sub-table',
                value: field.key,
                text: field.describe,
                children: []
              }
              if (field.columns) {
                for (let column of field.columns) {
                  setField(subTable.children, column)
                }
              }
              fieldList.push(subTable)
              // tab = 子表 一对一
            } else if (field.view === 'tab' && field.relationType == 1) {
              let subTable = {
                type: 'sub-table',
                value: field.key,
                text: field.describe,
                children: []
              }
              Object.keys(field.properties).map(k => {
                field.properties[k]['key'] = k
                setField(subTable.children, field.properties[k])
              })
              fieldList.push(subTable)
            } else {
              field.key = key
              setField(fieldList, field)
            }
          }
          // 冒泡排序
          for (let i = 0; i < fieldList.length; i++) {
            for (let j = i + 1; j < fieldList.length; j++) {
              let temp1 = fieldList[i]
              let temp2 = fieldList[j]
              if (temp1.order > temp2.order) {
                fieldList[i] = temp2
                fieldList[j] = temp1
              }
            }
          }
          //遍历表单数据集start
          let arr = []
          for (let i = 0; i < fieldList.length; i++) {
            let prop = schema.properties[fieldList[i]['value']]//属性
            let rules = []
            if (schema.required && schema.required.length > 0 && schema.required.indexOf(prop.key) != -1) {
              rules.push({
                required: true,
                message: '请输入' + prop.title
              })
            }
            if (prop.pattern) {
              (prop.pattern == 'only') && (prop.errorInfo = '该值不可用，系统中已存在！')
              rules.push({
                pattern: prop.pattern,
                message: prop.errorInfo
              })
            }

            let tmpObj = {
              title: prop.title,
              key: prop.key,
              type: Types[prop.view],
              validateRules: rules
            }
            //下拉类型
            if (prop.enum) {
              tmpObj.options = prop.enum
            }
            //popup类型
            if (prop.view == 'popup') {
              tmpObj.popupCode = prop.code
              tmpObj.orgFields = prop.orgFields
              tmpObj.destFields = prop.destFields
              tmpObj.dictFilter = prop.dictFilter
            }
            //cat_tree
            if (prop.view == 'cat_tree') {
              tmpObj.pidValue = prop.pidValue
              tmpObj.pidComponent = prop.pidComponent
            }
            //sel_tree
            if (prop.view == 'sel_tree') {
              tmpObj.dict = prop.dict
              tmpObj.pidField = prop.pidField
              tmpObj.pidValue = prop.pidValue
              tmpObj.hasChildField = prop.hasChildField
              tmpObj.pidComponent = prop.pidComponent
            }
            arr.push(tmpObj)
          }
          this.fullColumns = arr
          this.editColumns = arr
          //过滤掉高询询询隐藏的字段
          let tempArr = []
          fieldList.map(item => {
            if (item.querySuperHidden === '1') {
              return
            } else {
              tempArr.push(item)
            }
          })
          //遍历表单数据集end
          this.superQuery.fieldList = tempArr
        }
      },
      onClearSelected() {
        this.table.selectedRowKeys = []
        this.table.selectionRows = []
      },
      getImgView(text) {
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return getFileAccessHttpUrl(text)
      },
      downloadRowFile(text) {
        if (!text) {
          this.$message.warning('未知的文件')
          return
        }
        if (text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        let url = getFileAccessHttpUrl(text)
        window.open(url)//TODO 下载的方法
      },
      handleDelBatch() {
        if (this.table.selectedRowKeys.length <= 0) {
          this.$message.warning('请选择一条记录！')
          return false
        } else {
          let ids = ''
          let that = this
          that.table.selectedRowKeys.forEach(function(val) {
            ids += val + ','
          })
          that.$confirm({
            title: '确认删除',
            content: '是否删除选中数据?',
            onOk: function() {
              that.handleDelete(ids)
              that.onClearSelected()
            }
          })
        }
      },

      searchByquery() {
        this.table.dataSource = []
        this.IsByKeyword = false
        this.toggleSearchStatus = false

        this.refreshing = true
        this.loading = true
        // this.queryParam = {}
        this.finished = false
        this.onLoad()
      },
      searchReset() {
        this.queryParam = {}
        this.loadData(1,false)
      },
      handleToggleSearch() {
        this.toggleSearchStatus = !this.toggleSearchStatus
        this.keyword = ''
        console.log('dianji', this.toggleSearchStatus)
      },
      getFormatDate(text) {
        if (!text) {
          return ''
        }
        let a = text
        if (a.length > 10) {
          a = a.substring(0, 10)
        }
        return a
      },
      getImportUrl() {
        return '/online/cgform/api/importXls/' + this.code
      },
      initCgEnhanceJs(enhanceJs) {
        //console.log("--onlineList-js增强",enhanceJs)
        if (enhanceJs) {
          let Obj = eval('(' + enhanceJs + ')')
          this.EnhanceJS = new Obj(getAction, postAction, deleteAction)
          this.cgButtonJsHandler('created')
        } else {
          this.EnhanceJS = ''
        }
      },
      initCgButtonList(btnList) {
        let linkArr = []
        let buttonArr = []
        if (btnList && btnList.length > 0) {
          for (let i = 0; i < btnList.length; i++) {
            let temp = btnList[i]
            if (temp.buttonStyle == 'button') {
              buttonArr.push(temp)
            } else if (temp.buttonStyle == 'link') {
              linkArr.push(temp)
            }
          }
        }
        this.cgButtonLinkList = [...linkArr]
        this.cgButtonList = [...buttonArr]
      },
      cgButtonJsHandler(buttonCode) {
        if (this.EnhanceJS[buttonCode]) {
          this.EnhanceJS[buttonCode](this)
        }
      },
      cgButtonActionHandler(buttonCode) {
        //处理自定义button的 需要配置该button自定义sql
        if (!this.table.selectedRowKeys || this.table.selectedRowKeys.length == 0) {
          this.$message.warning('请先选中一条记录')
          return false
        }
        if (this.table.selectedRowKeys.length > 1) {
          this.$message.warning('请只选中一条记录')
          return false
        }
        let params = {
          formId: this.code,
          buttonCode: buttonCode,
          dataId: this.table.selectedRowKeys[0]
        }
        console.log('自定义按钮请求后台参数：', params)
        postAction(this.url.buttonAction, params).then(res => {
          if (res.success) {
            this.loadData()
            this.$message.success('处理完成!')
          } else {
            this.$message.warning('处理失败!')
          }
        })

      },
      cgButtonLinkHandler(record, buttonCode, optType) {
        if (optType == 'js') {
          if (this.EnhanceJS[buttonCode]) {
            this.EnhanceJS[buttonCode](this, record)
          }
        } else if (optType == 'action') {
          let params = {
            formId: this.code,
            buttonCode: buttonCode,
            dataId: record.id
          }
          console.log('自定义按钮link请求后台参数：', params)
          postAction(this.url.buttonAction, params).then(res => {
            if (res.success) {
              this.loadData()
              this.$message.success('处理完成!')
            } else {
              this.$message.warning('处理失败!')
            }
          })
        }
      },
      initButtonSwitch(hideColumns) {
        Object.keys(this.buttonSwitch).forEach(key => {
          this.buttonSwitch[key] = true
        })
        if (hideColumns && hideColumns.length > 0) {
          Object.keys(this.buttonSwitch).forEach(key => {
            if (hideColumns.indexOf(key) >= 0) {
              this.buttonSwitch[key] = false
            }
          })
        }
      },

      // 高级查询
      handleSuperQuery(params, matchType) {
        if (!params || params.length === 0) {
          this.superQuery.params = ''
        } else {
          this.superQuery.params = JSON.stringify(params)
        }
        this.superQuery.matchType = matchType
        this.finished = false
        this.loadData(1, false)
      },

      settingColumnsHandler(columns) {
        let str = Vue.ls.get(this.localCode)
        if (!str || str.length == 0) {
          this.settingColumns = []
          columns.forEach(column => {
            if (this.settingColumns.indexOf(column['dataIndex']) < 0) {
              this.settingColumns.push(column['dataIndex'])
            }
          })
        } else {
          this.settingColumns = str.split(',')
        }
      },
      popVisibleChange(visible) {
        if (this.settingColumns && this.settingColumns.length > 0) {
          Vue.ls.set(this.localCode, this.settingColumns.join(','))
        }
      },
      fuzzyQuery(param) {
        // 查询项预处理，配置模糊查询
        let stringParams = []
        if (this.queryInfo && this.queryInfo.length > 0) {
          this.queryInfo.forEach(function(item) {
            if (item.view == 'text' && item.fuzzyQueryFlag == 1) {
              stringParams.push(item.field)
            }
          })
          stringParams.forEach(function(str) {
            if (str in param) {
              param[str] = '*' + param[str].replace(/\*/g, '') + '*'
            }
          })
        }
      },

      onLoad() {
        setTimeout(() => {
          if (this.refreshing) {
            this.table.dataSource = []
            this.loadData(1, this.IsByKeyword)
            this.refreshing = false
          } else {
            this.loadData(this.table.pagination.current,this.IsByKeyword)
          }
        }, 1000)
      },
      onRefresh() {
        // 清空列表数据
        this.finished = false
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true
        this.queryParam = {}
        this.table.dataSource = []
        this.onLoad()
      },
      handleCancel() {
        this.showOnlTabApp = false
      },
      handleSubmit() {
        this.submitLoading = true
        setTimeout(() => {
          this.submitLoading = false
          this.showOnlTabApp = false
        }, 3500)
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';

  .pageCont::-webkit-scrollbar {
    display: none;
  }

  .pageCont::-moz-scrollbar {
    display: none;
  }

</style>
<style>
  .ant-card-body .table-operator {
    margin-bottom: 18px;
  }

  .ant-table-tbody .ant-table-row td {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .anty-row-operator button {
    margin: 0 5px
  }

  .ant-btn-danger {
    background-color: #ffffff
  }

  .anty-img-wrap {
    height: 25px;
    position: relative;
  }

  .anty-img-wrap > img {
    max-height: 100%;
  }

  .ant-modal-cust-warp {
    height: 100%
  }

  .ant-modal-cust-warp .ant-modal-body {
    height: calc(100% - 110px) !important;
    overflow-y: auto
  }

  .ant-modal-cust-warp .ant-modal-content {
    height: 90% !important;
    overflow-y: hidden
  }
</style>
