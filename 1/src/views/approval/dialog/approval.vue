<template>
  <a-modal
    v-model="isApproval"
    :title="dialogTitle"
    :maskClosable=false
    >
    <a-textarea :rows="4" v-model="opinion" placeholder="请输入审批意见"/>
    <footer slot="footer" style="text-align: center;">
      <a-button type="primary" @click="save">确定</a-button>
    </footer>
  </a-modal>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { auditAuditInfo } from '@/api/approval.js'

  export default {
    data() {
      return {
        dialogTitle: '',
        orderNo: '',
        isApproval: false,
        opinion: '',
        info: null,
        type:''
      }
    },
    mounted() {
      this.info = this.userInfo()
    },
    watch: {
      isApproval(val) {
        if (!val) {
          this.opinion = ''
          this.orderNo = ''
        }
      }
    },
    methods: {
      ...mapGetters(['userInfo']),
      //审批
      save() {
        if(this.type){
          this.postResult()
        }
      },
      postResult() {
        let postData = {
          oprtId: this.info.id,
          oprtName: this.info.realname,
          comment: this.opinion,
          auditNo: this.orderNo,
          auditStatus: this.type
        }
        auditAuditInfo(postData).then((res) => {
          this.isApproval = false
          if (res.success) {
            this.$message.success('提交成功')
            this.$emit('save')
            this.handleCancel()
          } else {
            this.$message.warn('提交失败：' + res.message)
            console.error('提交失败:', res)
          }
        }).finally(() => {
          this.confirmLoading = false
        })
      },
      //审批
      handleApproval(no,type) {
        if(type==3){
          this.dialogTitle = "同意";
        }
        if(type==4){
          this.dialogTitle = "拒绝"
        }
        this.type = type;
        this.isApproval = true
        this.orderNo = no
        this.opinion = ''
      }
    }
  }

</script>
<style scoped>

</style>