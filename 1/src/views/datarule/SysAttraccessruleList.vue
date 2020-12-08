<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="规则名称">
              <a-input placeholder="请输入规则名称" v-model="queryParam.name" 
                                :allowClear="allowClear"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <!--<a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>-->
              <a-button @click="handleAdd" type="primary" icon="plus" style="margin-left: 8px">新增</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{fixed:true,selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        
        @change="handleTableChange">

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

    <sysAttraccessrule-modal ref="modalForm" @ok="modalFormOk"></sysAttraccessrule-modal>
  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import SysAttraccessruleModal from './modules/SysAttraccessruleModal'

  export default {
    name: "SysAttraccessruleList",
    mixins:[JeecgListMixin],
    components: {
      SysAttraccessruleModal
    },
    data () {
      return {
        allowClear:true,
        description: '属性权限规则表管理页面',
        // 表头
        columns: [
          {
            title:'规则名称',
            align:"center",
            width:260,
            dataIndex: 'name'
          },
          {
            title:'规则SQL（约定了“人号”与“物号”两列名称）',
            align:"center",
            width:500,
            dataIndex: 'content'
          },
          {
            title:'规则备注',
            align:"center",
            dataIndex: 'note'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            width:160,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/datarule/sysAttraccessrule/list",
          delete: "/datarule/sysAttraccessrule/delete",
          deleteBatch: "/datarule/sysAttraccessrule/deleteBatch",
          exportXlsUrl: "/datarule/sysAttraccessrule/exportXls",
          importExcelUrl: "datarule/sysAttraccessrule/importExcel",
        },
        dictOptions:{
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      initDictConfig(){
      }
       
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>