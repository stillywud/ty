<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
    centered
    @cancel="handleCancel">
    <iframe v-if="visible" :src="h5PreviewUrl" @load="iframeLoaded" ref="previewIframe" frameborder="0" width="100%" height="100%" scrolling="auto" style="background-color: #fff;min-height: 60vh;"></iframe>
  </j-modal>
</template>

<script>

  import { mixinDevice } from '@/utils/mixin'
  import JDate from '@/components/jeecg/JDate'
  import Vue from "vue";
  import { ACCESS_TOKEN } from "@/store/mutation-types"
  import {randomUUID} from "../../../utils/util";


  export default {
    name: "PatrolTemplatePreview",
    mixins:[mixinDevice],
    components: {
      JDate
    },
    data () {
      return {
        title:"预览",
        width:425,
        visible: false,
        confirmLoading: false,
        templateJson: undefined,
        action: undefined,
        record: undefined
      }
    },
    computed: {
      h5PreviewUrl:function () {
          return window._CONFIG['h5report']+"/#/previewTemplate"
      }
    },
    created () {
    },
    mounted() {
    },
    methods: {
      openPreview (record, action) {
        console.log(action)
        console.log(record)
        Object.assign(this.$data, this.$options.data());
        this.action = action
        this.record = record
        this.visible = true
      },
      close () {
        this.confirmLoading = false;
        this.visible = false;
      },
      handleOk () {
        this.close()
      },
      handleCancel () {
        this.close()
      },
      iframeLoaded() {
        console.log("记录")
        console.log(this.record)
        if(this.action === "query"){
          // this.$refs.previewIframe.contentWindow.postMessage({
          //   cmd: 'queryTempJSON',
          //   params: { category_code: this.record.categoryCode, template_version: this.record.templateVersion, token: Vue.ls.get(ACCESS_TOKEN) }
          // }, '*')
          this.$refs.previewIframe.contentWindow.postMessage({
            cmd: 'previewTempJSON',
            params: { templateJson : JSON.parse(this.record.templateJson) }
          }, '*')
        }
        else if (this.action === "preview"){
          this.$refs.previewIframe.contentWindow.postMessage({
            cmd: 'previewTempJSON',
            params: { templateJson : this.record}
          }, '*')
        }
      }
    }
  }
</script>