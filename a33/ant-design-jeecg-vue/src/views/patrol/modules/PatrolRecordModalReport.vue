<template>
  <j-modal
    style="top: 5vh;"
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel"
    :footer="null"
    cancelText="关闭">
    <iframe v-if="visible" :src="h5reportDomainUrl" frameborder="0" width="100%" height="100%" scrolling="auto" style="background-color: #fff;min-height: 75vh;"></iframe>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import Vue from "vue"
  import { ACCESS_TOKEN } from "@/store/mutation-types"

  export default {
    name: "PatrolRecordModalReport",
    components: {
    },
    data () {
      return {
        title:"巡检报告",
        width:"80vw",
        visible: false,
        confirmLoading: false,
        url: {
        },
        id:""
      }
    },
    computed: {
      h5reportDomainUrl:function () {
        return window._CONFIG['h5report']+"/#/preview?id="+ this.id +"&showTitleBar=0&token="+Vue.ls.get(ACCESS_TOKEN)
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.visible = true;
        this.id = record.id
        console.log("报告id:" + this.id)
        this.$nextTick(() => {
          this.title = "巡检报告"
          // this.passArgumentsToH5Report()
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.close()
      },
      handleCancel () {
        this.close()
      },
      popupCallback(row){

      },
      passArgumentsToH5Report(){
        // 发送参数给H5页面,已取消改成了URL传参数
        // let msg = { "id": this.id, "token": Vue.ls.get(ACCESS_TOKEN), "showTitleBar": 0}
        // window.postMessage(JSON.stringify(msg),this.h5reportDomain)
      }
    }
  }
</script>