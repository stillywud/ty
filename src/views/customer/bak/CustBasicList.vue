<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.customerName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户证件类型">
              <j-dict-select-tag placeholder="请选择客户证件类型" v-model="queryParam.customerIdTypeId" dictCode="customer_certificates_type"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户性质">
                <j-dict-select-tag placeholder="请选择客户性质" v-model="queryParam.customerNatureId" dictCode="dict_customer_nature"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户类型">
                <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.customerTypeId" dictCode="dict_customer_type"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户行业">
                <j-dict-select-tag placeholder="请选择客户行业" v-model="queryParam.customerIndustryId" dictCode="dict_customer_industry"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户主要工程类型">
                <j-dict-select-tag placeholder="请选择客户主要工程类型" v-model="queryParam.customerProjectTypeId" dictCode="dict_project_type"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户信息真实性">
                <j-dict-select-tag placeholder="请选择客户信息真实性" v-model="queryParam.customerVerified" dictCode="dict_customer_authenticity"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户信息状态">
                <j-dict-select-tag placeholder="请选择客户信息状态" v-model="queryParam.customerInfoStatus" dictCode="dict_customer_info_status"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="注册时间">
                <j-date placeholder="请选择注册时间" v-model="queryParam.regTime"></j-date>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="企业类型">
                <j-dict-select-tag placeholder="请选择企业类型" v-model="queryParam.enterpriseTypeId" dictCode="dict_company_type"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
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
    <!-- 查询区域-END -->
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('客户基础信息表')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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
        class="j-table-force-nowrap"
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="uploadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
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

    <custBasic-modal ref="modalForm" @ok="modalFormOk"></custBasic-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import CustBasicModal from './modules/CustBasicModal'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import JDate from '@/components/jeecg/JDate.vue'
  import {filterMultiDictText} from '@/components/dict/JDictSelectUtil'

  export default {
    name: "CustBasicList",
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      JDictSelectTag,
      JDate,
      CustBasicModal
    },
    data () {
      return {
        description: '客户基础信息表管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title:'客户名称',
            align:"center",
            dataIndex: 'customerName'
          },
          {
            title:'客户证件类型',
            align:"center",
            dataIndex: 'customerIdTypeId_dictText'
          },
          {
            title:'客户证件编号',
            align:"center",
            dataIndex: 'customerIdNo'
          },
          {
            title:'客户性质',
            align:"center",
            dataIndex: 'customerNatureId_dictText'
          },
          {
            title:'客户性质',
            align:"center",
            dataIndex: 'customerNature'
          },
          {
            title:'客户类型',
            align:"center",
            dataIndex: 'customerTypeId_dictText'
          },
          {
            title:'客户类型',
            align:"center",
            dataIndex: 'customerType'
          },
          {
            title:'客户行业',
            align:"center",
            dataIndex: 'customerIndustryId_dictText'
          },
          {
            title:'客户行业',
            align:"center",
            dataIndex: 'customerIndustry'
          },
          {
            title:'客户主要工程类型',
            align:"center",
            dataIndex: 'customerProjectTypeId_dictText'
          },
          {
            title:'客户主要工程类型',
            align:"center",
            dataIndex: 'customerProjectType'
          },
          {
            title:'客户自身状态',
            align:"center",
            dataIndex: 'customerStatusId_dictText'
          },
          {
            title:'客户来源',
            align:"center",
            dataIndex: 'accessSysId_dictText'
          },
          {
            title:'客户来源',
            align:"center",
            dataIndex: 'accessSysName'
          },
          {
            title:'客户信息真实性',
            align:"center",
            dataIndex: 'customerVerified_dictText'
          },
          {
            title:'客户信息状态',
            align:"center",
            dataIndex: 'customerInfoStatus_dictText'
          },
          {
            title:'企业法人',
            align:"center",
            dataIndex: 'corporate'
          },
          {
            title:'注册时间',
            align:"center",
            dataIndex: 'regTime',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'注册地址',
            align:"center",
            dataIndex: 'regAddress'
          },
          {
            title:'注册资金',
            align:"center",
            dataIndex: 'regCapital'
          },
          {
            title:'经营范围',
            align:"center",
            dataIndex: 'businessScope'
          },
          {
            title:'邮政编码',
            align:"center",
            dataIndex: 'postalCode'
          },
          {
            title:'电话号码',
            align:"center",
            dataIndex: 'telNumber'
          },
          {
            title:'传真',
            align:"center",
            dataIndex: 'fax'
          },
          {
            title:'企业类型',
            align:"center",
            dataIndex: 'enterpriseTypeId_dictText'
          },
          {
            title:'营业期限',
            align:"center",
            dataIndex: 'operationPeriod'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            // fixed:"right",
            width:147,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/cust/custBasic/list",
          delete: "/cust/custBasic/delete",
          deleteBatch: "/cust/custBasic/deleteBatch",
          exportXlsUrl: "/cust/custBasic/exportXls",
          importExcelUrl: "cust/custBasic/importExcel",
        },
        dictOptions:{},
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
    },
    methods: {
      initDictConfig(){
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>