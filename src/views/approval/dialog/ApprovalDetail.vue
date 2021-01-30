<template>
  <div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="imgCancel">
      <img alt="example" style="width: 100%" :src="previewImage"/>
    </a-modal>
    <!-- 关联单据   -->
    <receipts :type="'checkbox'" ref="selectReceipts" @selectOk="selectOrderOk" :isRelation="isRelation" :selectedReceipts="selectedReceipts"/>
    <!-- 选择AT人员   -->
    <select-user ref="selectUser" @selectFinished="selectUserOK" type="checkbox"
                 :selectedUsers="selectedUsers"/>
    <a-modal
      title="审批详情"
      :width="860"
      :visible="visible"
      :maskClosable="false"
      @ok="handleOk"
      @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" label="申请内容">
          <div style="display: flex">
            <a-input style="flex:1;"
                     v-decorator="['applyTitle',{ rules: [{ required: true, message: '请输入申请内容', whitespace: true }]}]"
                     disabled/>
            <a-button style="width: 180px; margin-left: 10px" v-if="billNo != null && billNo!=''"
                      @click="clickOrder(typeCode,billNo)">
              {{billNo}}
            </a-button>
          </div>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="审批详情">
          <a-textarea :auto-size="{ minRows: 3, maxRows: 5 }"
                      v-decorator="['applyContent',{ rules: [{ required: false}]}]" disabled/>
        </a-form-item>
        <a-row>
          <a-col :span="4">
            <div style="text-align: right; margin-right: 10px">
              <span style="color: red;">*</span>&nbsp;审批进度
            </div>
          </a-col>
          <a-col :span="20" style="padding-left: 25px">
            <a-timeline>
              <a-timeline-item v-for="(item,index) in listInfo" :key="index" color="gray">
                <div class="user-item" slot="dot" v-if="item.operationType==1">{{item.oprtName}}
                  <a-icon type="ellipsis" class="icon-status" style="background: #FF8C00;"/>
                </div>
                <div class="user-item" slot="dot" v-if="item.operationType==2">{{item.oprtName}}
                  <a-icon type="check" class="icon-status" style="background: #57c52d;"/>
                </div>
                <div class="user-item" slot="dot" v-if="item.operationType==3">{{item.oprtName}}
                  <a-icon type="close" class="icon-status" style="background: #ff5b5b;"/>
                </div>
                <div class="user-item" slot="dot" v-if="item.operationType==5">{{item.oprtName}}
                  <a-icon type="ellipsis" class="icon-status" style="background: #FF8C00;"/>
                </div>
                <div class="item-title">
                  <template v-if="item.operationType==4">
                    <div v-if="item.atAuditorsList.length > 0">
                      {{item.oprtName}}
                      <span><a v-for="user in item.atAuditorsList" style="margin-left: 5px"
                               @click="atUserOnClick(user)">{{'@' + user.atOprtName}}</a></span>
                    </div>
                    <div v-else>{{item.oprtName + ' 发表了' + item.operation}}</div>
                  </template>
                  <template v-else-if="item.operationType==5">
                    <div>转办给&nbsp;<a>{{item.transOprtName}}</a></div>
                  </template>
                  <template v-else>
                    <div>{{item.operation}}</div>
                  </template>
                  <div class="item-time">{{item.oprtTime}}</div>
                  <div class="file-list" v-if="item.attachmentsList.length>0">
                    <dl>
                      <dd v-for="(item1,index1) in item.receipts">
                        <div v-if="item1.attachType==2">
                          <a-tag color="blue" @click="clickAttachOrder(item1.attachPath)">
                            {{item1.displayName}}
                          </a-tag>
                        </div>
                      </dd>
                    </dl>
                    <dl>
                      <dd v-for="(item1,index1) in item.files">
                        <div v-if="item1.attachType==1" class="img-div">
                          <!-- 图片显示 -->
                          <a :href="getFullUrl(item1.attachPath)" target="_blank"
                             v-if="item1.type=='image'">
                            <img :src="getFullUrl(item1.attachPath)"
                                 style="max-width:65px; max-height:65px;">
                          </a>
                          <!-- 文件显示 -->
                          <a :href="getFullUrl(item1.attachPath)" target="_blank"
                             v-if="item1.type=='file'">
                            <a-icon type="file-text" class="file-icon" style="color: #999; margin-top: 15px"/>
                          </a>
                        </div>
                      </dd>
                    </dl>
                  </div>
                  <div class="description" v-if="item.comment">{{item.comment}}</div>
                </div>
              </a-timeline-item>
              <template v-if="showSelf">
                <a-timeline-item color="gray" v-if="auditingList && auditingList.length > 0">
                  <div class="user-item" slot="dot" style="background:#fa8c16">
                    <a-icon type="hourglass" class="dot-icon"/>
                  </div>
                  <div class="item-title">
                    <div>待审核{{auditingList.length}}人</div>
                    <div class="item-time">&nbsp;</div>
                    <div style="display: flex;flex-wrap: wrap">
                      <dl class="item-users" v-for="(item2,index2) in auditingList">
                        <dt>
                          <a-icon type="user"/>
                        </dt>
                        <dd>{{item2.oprtName}}</dd>
                      </dl>
                    </div>
                  </div>
                </a-timeline-item>
                <a-timeline-item color="gray">
                  <div class="user-item" slot="dot">
                    <a-icon type="mail" class="dot-icon"/>
                  </div>
                  <div class="item-title">
                    <div>已抄送{{copyList.length}}人</div>
                    <div class="item-time">&nbsp;</div>
                    <div style="display: flex;flex-wrap: wrap">
                      <dl class="item-users" v-for="(item2,index2) in copyList">
                        <dt>
                          <a-icon type="user"/>
                        </dt>
                        <dd>{{item2.oprtName}}</dd>
                      </dl>
                    </div>
                  </div>
                </a-timeline-item>
              </template>
            </a-timeline>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button key="comment" type="primary" @click="commentOnClick">
          评论
        </a-button>
        <a-button v-if="isApproval" key="agree" class="button-color-green" @click="approvalOnClick(3)">
          同意
        </a-button>
        <a-button v-if="isApproval" key="disagree" class="button-color-red" @click="approvalOnClick(4)">
          拒绝
        </a-button>
        <a-button v-if="isApproval" class="button-color-sunset" key="transfer"
                  @click="transferOnClick">
          转办
        </a-button>
        <a-button key="submit" @click="handleCancel">
          关闭
        </a-button>
      </template>
    </a-modal>
    <a-modal
      title="评论"
      :width="640"
      :visible="commentVisible"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      @ok="handleOk"
      @cancel="commentCancel">
      <a-form :form="formComment">
        <a-form-item v-bind="formItemLayout" label="附件">
          <a-upload
            :action="uploadUrl"
            :headers="headers"
            :data="{biz: folder}"
            list-type="picture-card"
            :file-list="fileList"
            :remove="handleRemove"
            @preview="handlePreview"
            @change="handleChange"
            :accept="accepts"
          >
            <div v-if="fileList.length < 5">
              <a-icon type="plus"/>
              <div class="ant-upload-text">
                选择文件
              </div>
            </div>
          </a-upload>
          <div v-if="orderList.length > 0">
            <a-tag color="blue" closable v-for="(item,index) in orderList" @close="removeOrder($event,index)">
              {{item.billNo}}
            </a-tag>
          </div>
          <a-button type="primary" @click="selectOrder()">选择单据</a-button>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="评论">
          <a-textarea placeholder="请输入评论内容" :auto-size="{ minRows: 3, maxRows: 5 }"
                      v-decorator="['comment',{ rules: [{ required: false}]}]"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="@">
          <div class="node-icon" slot="dot">
            <a-icon type="mail" style="font-size: 12px;"/>
          </div>
          <div class="select-user-div">
            <div>
              <div>AT</div>
              <div style="font-size: 12px; color: #999; margin-top: 5px">请选择@人</div>
            </div>
            <!--选中的人员列表-->
            <div style="flex:1"></div>
            <div style="overflow-x: auto; overflow-y: hidden; text-align: right; display: flex; margin: 0px 10px;">
              <div v-for="(user, index) in ATUserList" style="display: flex; align-items: center">
                <div class="user-item">{{user.realname}}</div>
                <div style="margin: 0px 5px; color: white" v-if="index !== ATUserList.length - 1">
                  +
                </div>
              </div>
            </div>
            <!--选择人员按钮-->
            <div class="add-user-btn" @click="selectATUser()">
              <a-icon type="plus"/>
            </div>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 审批start-->
    <approval ref="approval" @save="searchQuery"></approval>
    <!-- 审批end-->
    <!-- 转办start-->
    <transfer ref="transfer" @onOk="searchQuery"></transfer>
    <!-- 转办end-->

  </div>
</template>

<script>
  import approval from './approval.vue'
  import transfer from './transfer.vue'
  import { queryAuditInfoDetail, comAuditInfo } from '@/api/approval'
  import TempletCombinationStyle from '../../modules/online/graphreport/auto/template/TempletCombinationStyle'
  import { mapGetters } from 'vuex'
  import Receipts from './receipts'
  import SelectUser from '../../components/SelectUser'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import Vue from 'vue'
  import { formatDate } from '@/utils/util'

  export default {
    name: 'ApprovalDetail',
    components: { SelectUser, Receipts, TempletCombinationStyle, approval, transfer },
    data() {
      return {
        uploadUrl: window._CONFIG['uploadURL'] + '/sys/common/upload',
        isApproval: false,
        visible: false,
        commentVisible: false,
        confirmLoading: false,
        folder: '',
        formItemLayout: {
          labelCol: {
            xs: { span: 8 },
            sm: { span: 4 }
          },
          wrapperCol: {
            xs: { span: 16 },
            sm: { span: 20 }
          }
        },
        previewVisible: false,
        previewImage: '',
        record: null,
        fileList: [],
        listInfo: [],
        auditingList: [],
        copyList: [],
        info: null,
        orderList: [],
        headers: {},
        selectedUsers: [],
        ATUserList: [],
        selectedReceipts: [],
        form: this.$form.createForm(this, { name: 'approvalDetail' }),
        formComment: this.$form.createForm(this, { name: 'approvalComment' }),
        billNo: '',
        typeCode: '',
        accepts: '.png,.jpeg,.jpg,.gif,.doc,.docx,.pdf,.csv,.xls,.xlsx,.ppt,.pptx,.zip',
        isRelation:0,
      }
    },
    mounted() {
      this.info = this.userInfo()
      this.folder = formatDate(new Date().getTime(), 'yyyy-MM-dd')
      const token = Vue.ls.get(ACCESS_TOKEN)
      if (token) {
        // 让每个请求携带自定义 token 请根据实际情况自行修改
        this.headers['X-Access-Token'] = token
      }
    },
    computed: {
      showSelf() {
        if (this.listInfo.length > 0) {
          let item = this.listInfo[0]
          if (item.oprtId === this.info.id) {
            return true
          }
        }
        return false
      },
      getFullUrl() {
        return (url) => {
          return window._CONFIG['domianURL'] + url
        }
      }
    },
    methods: {
      ...mapGetters(['userInfo']),
      imgCancel() {
        this.previewVisible = false
      },
      clickAttachOrder(path) {
        let token = Vue.ls.get(ACCESS_TOKEN)
        window.open(window._CONFIG['domianURL'] + '/desform/detail' + path + '?token=' + token, '_blank')
      },
      clickOrder(typeCode, billNo) {
        let token = Vue.ls.get(ACCESS_TOKEN)
        window.open(window._CONFIG['domianURL'] + '/desform/detail/' + typeCode + '/' + billNo + '?token=' + token, '_blank')
      },
      beforeUpload(file) {
        const isFile = this.checkFile(file.name)
        if (!isFile) {
          this.$message.error('不能上传该格式文件!')
          return false
        }
        const isLt10M = file.size / 1024 / 1024 < 10
        if (!isLt10M) {
          this.$message.error('文件大小不能超过 10MB!')
          return false
        }
        return isFile && isLt10M
      },
      checkFile(filename) {
        let index = filename.lastIndexOf('.')
        let suffix = filename.substr(index + 1)
        if (this.accepts.indexOf(suffix) != -1) {
          return true
        }
        return false
      },
      showApproval(record, isApproval) {
        this.record = record
        this.isApproval = isApproval
        this.visible = true
        this.$nextTick(() => {
          if (record.applyTitle) {
            this.form.setFieldsValue({ applyTitle: record.applyTitle })
          }
          if (record.applyContent) {
            this.form.setFieldsValue({ applyContent: record.applyContent })
          }
        })
        queryAuditInfoDetail({ 'auditNo': record.auditNo }).then((res) => {
          if (res.success == true) {
            this.listInfo = res.result.listInfo
            this.auditingList = res.result.auditingList
            this.copyList = res.result.copyList
            this.formatAttach()
            // this.form.setFieldsValue({applyTitle:res.result.applyTitle})
            // this.form.setFieldsValue({applyContent:res.result.applyContent})
            this.billNo = res.result.billNo
            this.typeCode = res.result.billType
          }
        })
      },
      //处理附件
      formatAttach() {
        for (let i = 0; i < this.listInfo.length; i++) {
          let lists = this.listInfo[i].attachmentsList
          this.listInfo[i].receipts = []
          this.listInfo[i].files = []
          for (let j = 0; j < lists.length; j++) {
            if (lists[j].attachType == 2) {
              this.listInfo[i].receipts.push(lists[j])
            } else {
              let isImage = this.checkImage(lists[j].attachPath)
              lists[j].type = isImage ? 'image' : 'file'
              this.listInfo[i].files.push(lists[j])
            }
          }
        }
      },
      checkImage(filename) {
        let arr = ['png', 'jpeg', 'gif', 'PNG', 'JPEG', 'GIF', 'jpg', 'JPG']
        let index = filename.lastIndexOf('.')
        let suffix = filename.substr(index + 1)
        if (arr.indexOf(suffix) != -1) {
          return true
        }
        return false
      },
      getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = error => reject(error)
        })
      },
      async handlePreview(file) {
        if (!file.url && !file.preview) {
          file.preview = await this.getBase64(file.originFileObj)
        }
        this.previewImage = file.url || file.preview
        this.previewVisible = true
      },
      handleChange({ file, fileList }) {
        let isFile = this.beforeUpload(file)
        if (isFile) {
          this.fileList = fileList
        }
      },
      handleRemove(file) {
        console.log('file', file)
      },
      selectOrder() {
        this.isRelation = 0;
        this.selectedReceipts = this.orderList
        this.$refs.selectReceipts.showReceipts()
      },
      selectOrderOk(val) {
        if (!val || val.length === 0) {
          return
        }
        console.log('val', val)
        this.orderList = val
      },
      removeOrder(e, index) {
        e.preventDefault()
        this.orderList.splice(index, 1)
      },
      selectATUser() {
        this.selectedUsers = this.ATUserList
        this.$refs.selectUser.select()
      },
      selectUserOK(val) {
        this.ATUserList = val
      },
      handleCancel() {
        this.form.resetFields()
        this.visible = false
        this.record = null
        this.fileList = []
        this.copyList = []
        this.listInfo = []
        this.auditingList = []
      },
      commentCancel() {
        this.formComment.resetFields()
        this.commentVisible = false
        this.fileList = []
        this.orderList = []
        this.selectedUsers = []
        this.ATUserList = []
        this.selectedReceipts = []
      },
      commentOnClick() {
        this.commentVisible = true
      },
      approvalOnClick(type) {
        this.$refs.approval.handleApproval(this.record.auditNo, type)
      },
      transferOnClick() {
        this.$refs.transfer.handleTransfer(this.record.auditNo)
      },
      atUserOnClick(item) {
        for (let i in this.ATUserList) {
          let user = this.ATUserList[i]
          if (item.atOprtId === user.id) {
            return
          }
        }
        let user = {
          id: item.atOprtId,
          realname: item.atOprtName
        }
        this.ATUserList.push(user)
      },
      searchQuery() {
        this.handleCancel()
        this.$emit('save')
      },
      handleOk() {
        let comment = this.formComment.getFieldValue('comment')
        if ((!comment || comment == '') && this.orderList.length === 0 && this.fileList.length === 0 && this.ATUserList.length === 0) {
          this.$message.warn('请完善信息后提交')
          return
        }
        let postData = {
          oprtId: this.info.id,
          oprtName: this.info.realname,
          comment: comment,
          auditNo: this.record.auditNo,
          oprtList: [],
          attachmentsList: []
        }
        for (let i in this.ATUserList) {
          let user = this.ATUserList[i]
          let oprt = {
            atOprtId: user.id,
            atOprtName: user.realname
          }
          postData.oprtList.push(oprt)
        }
        for (let i in this.orderList) {
          let order = this.orderList[i]
          let attachment = {
            attachType: 2,
            displayName: order.billNo,
            attachPath: '/' + order.typeCode + '/' + order.billNo
          }
          postData.attachmentsList.push(attachment)
        }
        for (let i in this.fileList) {
          let file = this.fileList[i]
          let attachment = {
            attachType: 1,
            attachPath: file.response.message
          }
          postData.attachmentsList.push(attachment)
        }
        this.confirmLoading = true
        comAuditInfo(postData).then((res) => {
          if (res.success) {
            this.commentCancel()
            this.showApproval(this.record, this.isApproval)
          } else {
            this.$message.warn('提交失败：' + res.message)
            console.error('提交失败:', res)
          }
        }).finally(() => {
          this.confirmLoading = false
        })
      }
    }
  }
</script>

<style scoped>

  .select-user-div {
    display: flex;
    padding-bottom: 5px;
    padding-left: 5px;
    line-height: 20px;
  }

  .add-user-btn {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px dashed #1890ff;
    border-radius: 40px;
    color: grey;
    cursor: pointer;
  }

  .user-item {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #1890ff;
    border-radius: 40px;
    font-size: 12px;
    color: white;
    position: relative;
  }

  .dot-icon {
    font-size: 20px;
    margin-top: 10px;
  }

  .icon-status {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 12px;
    padding: 2px;
    color: white;
    border-radius: 15px;
  }

  .item-time {
    font-size: 12px;
    color: #999;
    margin-top: 5px
  }

  .description {
    background: #e6f7ff;
    line-height: 30px;
    padding: 0 10px;
    margin-top: 10px;
    font-size: 12px;
    border-radius: 5px;
  }

  .item-title {
    margin-left: 20px;
  }

  .file-list dl {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .file-list dl dd {
    /*margin: 10px;*/
  }

  .file-list dl dd a {
    color: rgba(0, 0, 0, 0.65);
  }

  .file-list .file-icon {
    font-size: 40px;
  }

  .item-users {
    width: 70px;
    text-align: center;
  }

  .item-users dt i {
    font-size: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 40px;
    background: #1890ff;
    color: white;
  }

  .img-div {
    width: 70px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    border-radius: 5px;
    border: 1px dashed #eeeeee;
    margin-right: 5px;
  }
</style>
<style>
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>