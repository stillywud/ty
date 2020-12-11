<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="模板编码">
              <a-input placeholder="请输入模板编码" v-model="queryParam.categoryCode"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
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
          <a @click="openPreview(record)">预览</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="showHistory(record)">历史版本</a>
<!--          <a-divider type="vertical" />-->
<!--          <a @click="downloadTemplate(record)">下载</a>-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
        </span>

      </a-table>
    </div>

    <patrol-template-modal-add ref="modalForm" @ok="modalFormOk"></patrol-template-modal-add>
    <patrol-template-modal-history ref="historyModal" @ok="modalFormOk"></patrol-template-modal-history>
    <patrol-template-preview ref="previewModal"></patrol-template-preview>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  // import PatrolTemplateModal from './modules/PatrolTemplateModal'
  import PatrolTemplateModalAdd from './modules/PatrolTemplateModalAdd'
  import JDate from '@/components/jeecg/JDate.vue'
  import PatrolTemplateModalHistory from './modules/PatrolTemplateModalHistory'
  import PatrolTemplatePreview from "./modules/PatrolTemplatePreview";
  import { downFile } from '@/api/manage'

  export default {
    name: "PatrolTemplateList",
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      PatrolTemplateModalAdd,
      JDate,
      PatrolTemplateModalHistory,
      PatrolTemplatePreview
    },
    data () {
      return {
        description: '巡检模板管理页面',
        // 表头
        columns: [
          {
            title:'模板编码',
            align:"center",
            dataIndex: 'categoryCode'
          },
          {
            title:'版本号',
            align:"center",
            dataIndex: 'templateVersion'
          },
          // {
          //   title:'模板文件名称',
          //   align:"center",
          //   dataIndex: 'localPath',
          //   customRender: function (t, r, index) {
          //     if(t != undefined && t != null) {
          //       let fengeIndex = t.lastIndexOf('/') || t.lastIndexOf('\\')
          //       return t.substring(fengeIndex+1);
          //     }
          //     else {
          //       return t;
          //     }
          //   }
          // },
          {
            title:'创建人',
            align:"center",
            dataIndex: 'createBy'
          },
          {
            title:'创建时间',
            align:"center",
            dataIndex: 'createTime'
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
          list: "/patrol/patrolTemplate/getLatestTemplateList?isNew=1",
          delete: "/patrol/patrolTemplate/delete",
          deleteBatch: "/patrol/patrolTemplate/deleteBatch",
          exportXlsUrl: "/patrol/patrolTemplate/exportXls",
          importExcelUrl: "patrol/patrolTemplate/importExcel",
          // downloadTemplate: "/patrol/patrolTemplate/downloadPatrolTemplate"
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
      showHistory(record){
        this.$refs.historyModal.openHistory(record)
      },
      openPreview(record){
        this.$refs.previewModal.openPreview(record,"query")
      },
      // downloadTemplate(record){
      //   let that = this
      //   downFile(that.url.downloadTemplate,{ id: record.id }).then((res)=>{
      //     console.log("返回结果");
      //     console.log(res.data);
      //     console.log(res);
      //     const { data, headers } = res
      //     // const fileName = headers['Content-Disposition'].replace(/\w+;filename=(.*)/, '$1')
      //     // 此处当返回json文件时需要先对data进行JSON.stringify处理，其他类型文件不用做处理
      //     // const blob = new Blob([JSON.stringify(data)])
      //     // const blob = new Blob([data], {type: headers['content-type']})
      //     const blob = new Blob([data])
      //     let dom = document.createElement('a')
      //     let url = window.URL.createObjectURL(blob)
      //     dom.href = url
      //     dom.download = decodeURI(record.categoryCode+".json")
      //     dom.style.display = 'none'
      //     document.body.appendChild(dom)
      //     dom.click()
      //     dom.parentNode.removeChild(dom)
      //     window.URL.revokeObjectURL(url)
      //   }).finally(() => {
      //     console.log(111);
      //   })
      // }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>