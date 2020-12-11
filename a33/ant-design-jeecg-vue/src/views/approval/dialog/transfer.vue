<template>
   <div>
    <!-- 选择部门   -->
        <select-user ref="selectUser" @selectFinished="selectUserOK" type="radio" :selectedUsers="selectedUsers">
        </select-user>
        <a-modal
        v-model="isApproval"
        :title="dialogTitle"
        :maskClosable=false
        @ok="handleOk"
        @cancel="handleCancel"
        >
        <div v-if="val.length>0" style="margin-bottom: 20px;">
          <a-input addon-before="转办给:" placeholder="" :value="val[0].realname" disabled/>
        </div>
        <div>
          <a-textarea :rows="4" v-model="comment" placeholder="请输入转办原因"/>
        </div>
      </a-modal>
    </div>
</template>
<script>
import {transAuditInfo} from "@/api/approval.js";
import SelectUser from "@/views/components/SelectUser.vue";
import { mapGetters } from 'vuex'
export default{
    components:{
        SelectUser
    },
    data(){
      return {
        isApproval:false,
        selectedUsers:[],
        dialogTitle:'转办原因',
        info:null,
        auditNo:'',
        comment:'',
        val:[]
      }
    },
    mounted(){
        this.info = this.userInfo()
    },
    methods:{
        ...mapGetters(['userInfo']),
        handleTransfer(id){
            this.auditNo = id;
            this.selectedUsers = []
            this.$refs.selectUser.select();
        },
        handleOk(){
            if(!this.comment){
                this.$message.error('请输入转办原因！');
                return false;
            }
            let FormData = {
                oprtId: this.info.id,
                oprtName: this.info.realname,
                transOprtId:this.val[0].id,
                transOprtName:this.val[0].realname,
                comment: this.comment,
                auditNo: this.auditNo,
                deptId:this.val[0].departIds,
                deptName:this.val[0].orgCode
            }
            transAuditInfo(FormData).then((res)=>{
                if (res.success) {
                    this.$message.success('转办成功');
                    this.$emit('onOk');
                }else{
                    this.$message.warn('转办失败');
                }
                this.isApproval = false;
            });
        },
        handleCancel(){
            this.isApproval = false;
            this.$emit('onCancel',this.val);
        },
        //选择用户
        selectUserOK(val){
            this.isApproval = true;
            this.val = val;
        }
    }
}
</script>
<style scoped>
</style>