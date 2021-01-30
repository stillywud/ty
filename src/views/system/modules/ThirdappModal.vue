<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    switchFullscreen
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-card :bordered="false">
        <!-- 查询区域 -->
        <div class="table-page-search-wrapper">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24">
            </a-row>
          </a-form>
        </div>
        <!-- 查询区域-END -->

        <!-- 操作按钮区域 -->
        <div class="table-operator">
          <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
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
        <sysInfoThirdapp-modal ref="modalForm" @ok="modalFormOk"></sysInfoThirdapp-modal>
      </a-card>
    </a-spin>

    <template slot="footer">
      <a-button type="primary" @click="handleCancel">关闭</a-button>
    </template>
  </j-modal>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import SysInfoThirdappModal from './SysInfoThirdappModal'

  export default {
    name: "SysInfoThirdappList",
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      SysInfoThirdappModal
    },
    data () {
      return {
        description: '第三方应用',
        title:"第三方应用",
        width:1500,
        visible: false,
        confirmLoading: false,
        // 表头
        columns: [
          {
            title:'系统id',
            align:"center",
            dataIndex: 'sysId'
          },
          {
            title:'第三方应用类型',
            align:"center",
            width:200,
            dataIndex: 'thirdType_dictText',
          },
          {
            title:'第三方应用名称',
            align:"center",
            width:200,
            dataIndex: 'name'
          },
          {
            title:'appid',
            align:"center",
            dataIndex: 'appid'
          },
          {
            title:'secrete',
            align:"center",
            dataIndex: 'secrete'
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
          list: "/system/sysInfoThirdapp/list",
          delete: "/system/sysInfoThirdapp/delete",
          deleteBatch: "/system/sysInfoThirdapp/deleteBatch",
          exportXlsUrl: "/system/sysInfoThirdapp/exportXls",
          importExcelUrl: "system/sysInfoThirdapp/importExcel",
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
      },
      thirdLoad(record){
        this.queryParam.sysId = record.id
        this.loadData();
        this.visible = true;
      },
      handleCancel () {
        this.close()
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleAdd: function () {
        this.$refs.modalForm.add(this.queryParam.sysId);
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>