<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="标题">
              <a-input placeholder="请输入标题" v-model="queryParam.title"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="状态">
              <j-dict-select-tag v-model="queryParam.status" placeholder="请选择状态" dictCode="eoa_plan_status"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="类型">
              <j-dict-select-tag v-model="queryParam.type" placeholder="请选择类型" dictCode="eoa_plan_type"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="提醒类型">
                <j-dict-select-tag v-model="queryParam.remindType" placeholder="请选择提醒类型" dictCode="msgType"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('日程计划')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <template slot="businessLink" slot-scope="businessLink, record">
          <a href="javascript:(0);" @click="handleBusinessLink(record)">跳转到业务表单</a>
        </template>

        <span slot="titleSlot" slot-scope="text">
          <j-ellipsis :value="text" :length="15"/>
        </span>
        <!-- 字符串超长截取省略号显示-->
        <span slot="remark" slot-scope="text">
          <j-ellipsis :value="text" :length="30"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <a v-if="record.status === '2'" @click="handleView(record)">查看</a>
          <a v-else @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <eoaPlan-modal ref="modalForm" :isurl="isurl" @ok="modalFormOk"></eoaPlan-modal>
  </a-card>
</template>

<script>
  import Vue from 'vue'
  import EoaPlanModal from '@/components/eoa/EoaPlanModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import {ACCESS_TOKEN} from "@/store/mutation-types"


  export default {
    name: 'EoaPlanList',
    mixins: [JeecgListMixin],
    components: {
      EoaPlanModal, JEllipsis
    },
    data() {
      return {
        description: '日程计划管理页面',
        businessLink: '跳转到业务表单',
        isurl:true,
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function (t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '标题',
            align: 'center',
            dataIndex: 'title',
            scopedSlots: {customRender: 'titleSlot'}
          },
          {
            title: '开始时间',
            align: 'center',
            dataIndex: 'startTime'
          },
          {
            title: '结束时间',
            align: 'center',
            dataIndex: 'endTime'
          },
          {
            title: '跳到业务表单',
            align: 'center',
            dataIndex: 'businessLink',
            scopedSlots: {customRender: 'businessLink'},
          },
          {
            title: '类型',
            align: 'center',
            dataIndex: 'type_dictText',
          },
          {
            title: '是否全天',
            align: 'center',
            dataIndex: 'allDay_dictText',
          },
          {
            title: '紧急程度',
            align: 'center',
            dataIndex: 'urgentLevel_dictText',
          },
          {
            title: '提醒类型',
            align: 'center',
            dataIndex: 'remindType_dictText',
          },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'status_dictText',
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: '/eoa/plan/list',
          delete: '/eoa/plan/delete',
          deleteBatch: '/eoa/plan/deleteBatch',
          exportXlsUrl: '/eoa/plan/exportXls',
          importExcelUrl: '/eoa/plan/importExcel',
        },
      }
    },
    mounted() {

    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      modalFormOk(){
        this.loadData();
      },
      handleBusinessLink(record) {
        window.open(record.businessLink + "?businessId=" + record.id + "&token=" + Vue.ls.get(ACCESS_TOKEN))
      },
      handleView(record) {
        this.$refs.modalForm.view(record)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>
