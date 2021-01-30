<template>
  <cus-dialog ref="cusDialog" v-bind="dialogProps" @on-submit="handleSubmit" @on-close="handleClose">
    <generate-form v-loading="loading" ref="generateForm" v-bind="generateProps"/>
  </cus-dialog>
</template>

<script>
  import CusDialog from './CusDialog'
  import GenerateForm from './GenerateForm'

  export default {
    name: 'jm-generate-dialog',
    components: { CusDialog, GenerateForm },
    props: {
      visible: { type: Boolean, default: false },
      title: { type: String, default: null },
      /*-- begin: generate props --*/
      formJson: { type: Object, default: () => ({}) },
      formData: { type: Object, default: () => ({}) },
      remote: { type: Object, default: () => ({}) },
      userInfo: { type: Object, default: () => ({}) },
      readOnly: { type: Boolean, default: false },
      loading: { type: Boolean, default: false },
      action: { type: String, default: 'preview' }
      /*-- end: generate props --*/
    },
    data() {
      return {}
    },
    computed: {
      dialogProps() {
        return {
          title: this.title,
          visible: this.visible,
          form: true,
          center: false,
          modal: false,
          action: !this.readOnly,
          dialogOptions: (this.formJson.config || {}).dialogOptions,
          switchFullscreen: true,
        }
      },
      generateProps() {
        return {
          data: this.formJson,
          value: this.formData,
          remote: this.remote,
          userInfo: this.userInfo,
          readOnly: this.readOnly,
          action: this.action
        }
      }
    },
    watch: {
      loading() {
        this.$refs.cusDialog.loading = this.loading
      }
    },
    mounted() {
      if (window['desformName']) {
        this.dialogTitle = window['desformName']
      }
    },
    methods: {
      handleSubmit() {
        let { cusDialog, generateForm } = this.$refs
        cusDialog.loading = this.loading
        this.$emit('submit', {
          getData: generateForm.getData
        })
      },
      handleClose() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>

</style>