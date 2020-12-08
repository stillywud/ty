<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="设备机号">
              <a-input placeholder="请输入设备机号" v-model="queryParam.vclNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发动机型号">
              <j-dict-select-tag placeholder="请选择发动机型号" v-model="queryParam.vclEnginemodel" dictCode="dict_vcl_enginemodel"/>
            </a-form-item>
          </a-col>
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
      <a-button type="primary" icon="download" @click="handleExportXls('设备基础信息表')">导出</a-button>
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

    <vclInfo-modal ref="modalForm" @ok="modalFormOk"></vclInfo-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import VclInfoModal from './modules/VclInfoModal'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import {filterMultiDictText} from '@/components/dict/JDictSelectUtil'

  export default {
    name: "VclInfoList",
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      JDictSelectTag,
      VclInfoModal
    },
    data () {
      return {
        description: '设备基础信息表管理页面',
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
            title:'设备机号',
            align:"center",
            dataIndex: 'vclNo'
          },
          {
            title:'资产号',
            align:"center",
            dataIndex: 'vclAssetnumber'
          },
          {
            title:'品牌',
            align:"center",
            dataIndex: 'dictvbId_dictText'
          },
          {
            title:'机种',
            align:"center",
            dataIndex: 'dictvkId_dictText'
          },
          {
            title:'吨级',
            align:"center",
            dataIndex: 'dictvtonId_dictText'
          },
          {
            title:'机型',
            align:"center",
            dataIndex: 'dictvtId_dictText'
          },
          {
            title:'规格',
            align:"center",
            dataIndex: 'dictvsId_dictText'
          },
          {
            title:'发动机型号',
            align:"center",
            dataIndex: 'vclEnginemodel_dictText'
          },
          {
            title:'发动机序列号',
            align:"center",
            dataIndex: 'vclEgnno'
          },
          {
            title:'制造年份',
            align:"center",
            dataIndex: 'productionDate',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'交机日期',
            align:"center",
            dataIndex: 'deliveryDate',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'作业内容',
            align:"center",
            dataIndex: 'vclJobcontent'
          },
          {
            title:'作业对象',
            align:"center",
            dataIndex: 'vclWorktarget_dictText'
          },
          {
            title:'所属行业',
            align:"center",
            dataIndex: 'industryId_dictText'
          },
          {
            title:'设备别名',
            align:"center",
            dataIndex: 'vclMachinealias'
          },
          {
            title:'是否超级质保',
            align:"center",
            dataIndex: 'superWarranty_dictText'
          },
          {
            title:'质保协议类型',
            align:"center",
            dataIndex: 'warrantyAgreement_dictText'
          },
          {
            title:'质保时长',
            align:"center",
            dataIndex: 'warrantyDuration'
          },
          {
            title:'质保截止日期',
            align:"center",
            dataIndex: 'vclWarrantyperiod'
          },
          {
            title:'当前质保状态',
            align:"center",
            dataIndex: 'vclSafeguardstate_dictText'
          },
          {
            title:'销售经销商名称',
            align:"center",
            dataIndex: 'dealerName'
          },
          {
            title:'最新工作小时数',
            align:"center",
            dataIndex: 'smr'
          },
          {
            title:'最新设备位置',
            align:"center",
            dataIndex: 'lastLocation'
          },
          {
            title:'最新纬度',
            align:"center",
            dataIndex: 'lat'
          },
          {
            title:'最新经度',
            align:"center",
            dataIndex: 'lon'
          },
          {
            title:'是否安装附属装置',
            align:"center",
            dataIndex: 'accessory_dictText'
          },
          {
            title:'来源',
            align:"center",
            dataIndex: 'accessSysId_dictText'
          },
          {
            title:'设备状态',
            align:"center",
            dataIndex: 'vclStatus_dictText'
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
          list: "/vcl/vclInfo/list",
          delete: "/vcl/vclInfo/delete",
          deleteBatch: "/vcl/vclInfo/deleteBatch",
          exportXlsUrl: "/vcl/vclInfo/exportXls",
          importExcelUrl: "vcl/vclInfo/importExcel",
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