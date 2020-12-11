<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
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

        <span slot="action" slot-scope="text, record">
<!--          <a @click="downloadTemplate(record)">下载</a>-->
          <a @click="openPreview(record)">预览</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
        </span>

      </a-table>
    </a-spin>
    <patrol-template-modal-add ref="modalForm" @ok="modalFormOk"></patrol-template-modal-add>
    <patrol-template-preview ref="previewModal"></patrol-template-preview>
  </j-modal>
</template>

<script>

  import { downFile } from '@/api/manage'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDate from '@/components/jeecg/JDate'
  import PatrolTemplateModalAdd from './PatrolTemplateModalAdd'
  import PatrolTemplatePreview from "./PatrolTemplatePreview";

  export default {
    name: "PatrolTemplateModalHistory",
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      JDate,
      PatrolTemplateModalAdd,
      PatrolTemplatePreview
    },
    data () {
      return {
        categoryCode:undefined,
        title:"历史版本",
        width:800,
        visible: false,
        confirmLoading: false,
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
            title:'创建日期',
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
        ]
      }
    },
    computed: {
      url: function() {
        return {
          list: "/patrol/patrolTemplate/list?categoryCode="+this.categoryCode,
          // downloadTemplate: "/patrol/patrolTemplate/downloadPatrolTemplate"
        }
      }
    },
    created () {
    },
    methods: {
      openHistory (record) {
        this.categoryCode = record.categoryCode;
        console.log(record.categoryCode)
        this.visible = true;
        this.searchReset()
      },
      close () {
        this.$emit('ok');
        this.confirmLoading = false;
        this.visible = false;
      },
      handleOk () {
        this.close()
      },
      handleCancel () {
        this.close()
      },
      openPreview(record){
        this.$refs.previewModal.openPreview(record,"query")
      },
      // downloadTemplate(record) {
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