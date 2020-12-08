<template>
  <div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="imgCancel">
      <img alt="example" style="width: 100%" :src="previewImage"/>
    </a-modal>
    <!-- 关联单据   -->
    <receipts :type="isLinkOrder ? 'radio' : 'checkbox'" :isRelation="isRelation" ref="selectReceipts" @selectOk="selectOrderOk"
              :selectedReceipts="selectedReceipts"/>
    <!-- 选择部门   -->
    <select-user ref="selectUser" @selectFinished="selectUserOK" type="checkbox" :selectedUsers="selectedUsers">
      <template slot="type" v-if="isApprovalUsers">
        <div style="line-height: 30px;margin-bottom: 15px;">
          <a-radio-group name="radioGroup" v-model="approvalType" :default-value="1">
            <a-radio :value="1">
              审批
            </a-radio>
            <a-radio :value="2">
              会签
            </a-radio>
          </a-radio-group>
        </div>
      </template>
    </select-user>
    <a-modal
      title="提交审批"
      :width="860"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      @ok="handleOk"
      @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" label="申请内容">
          <div style="display: flex">
            <a-input style="flex:1;" placeholder="请输入申请内容"
                     v-decorator="['title',{ rules: [{ required: true, message: '请输入申请内容', whitespace: true }]}]"/>
            <a-button type="primary" style="width: 180px; margin-left: 10px" @click="selectOrder(true)">
              {{linkOrder ? linkOrder.billNo : '关联单据'}}
            </a-button>
          </div>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="审批详情">
          <a-textarea placeholder="请输入审批详情" :auto-size="{ minRows: 3, maxRows: 5 }"
                      v-decorator="['content',{ rules: [{ required: false}]}]"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="附件">
          <a-upload
            :accept="accepts"
            :action="uploadUrl"
            :headers="headers"
            :data="{biz: folder}"
            list-type="picture-card"
            :file-list="fileList"
            :remove="handleRemove"
            @preview="handlePreview"
            @change="handleChange"
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
          <a-button type="primary" @click="selectOrder(false)">选择单据</a-button>
        </a-form-item>
      </a-form>
      <a-row>
        <a-col :span="4">
          <div style="text-align: right; margin-right: 10px">
            <span style="color: red;">*</span>&nbsp;审批流程
          </div>
        </a-col>
        <a-col :span="20" style="padding-left: 10px">
          <a-timeline>
            <!--添加审批人-->
            <a-timeline-item v-for="(item,index) in approvalUserList">
              <div class="node-icon" slot="dot">
                <a-icon type="team" style="font-size: 13px;"/>
              </div>
              <div>
                <div class="select-user-div">
                  <div>
                    <div>审批人
                      <span class="tag-type-1" v-if="item.type == 1">审批</span>
                      <span class="tag-type-2" v-else-if="item.type == 2">会签</span>
                    </div>
                    <div style="font-size: 12px; color: #999; margin-top: 5px">选择审批人</div>
                  </div>
                  <!--选中的人员列表-->
                  <div style="flex:1"></div>
                  <div style="overflow-x: auto; text-align: right; display: flex; margin: 0px 10px;">
                    <div v-for="(user, userIndex) in item.userList" style="display: flex; align-items: center">
                      <div class="user-item">{{user.realname}}</div>
                      <div style="margin: 0px 5px" v-if="userIndex !== item.userList.length - 1">
                        {{item.type === 1 ? '>' : '+'}}
                      </div>
                    </div>
                  </div>
                  <!--选择人员按钮-->
                  <div class="add-user-btn" @click="selectApprovalUser(index)">
                    <a-icon type="plus"/>
                  </div>
                </div>
                <div v-if="item.userList && index === approvalUserList.length - 1">
                  <div class="add-node-div" @click="selectApprovalUser(index+1)">新增节点</div>
                </div>
              </div>
            </a-timeline-item>
            <!--添加抄送人-->
            <a-timeline-item>
              <div class="node-icon" slot="dot">
                <a-icon type="mail" style="font-size: 12px;"/>
              </div>
              <div class="select-user-div">
                <div>
                  <div>抄送人</div>
                  <div style="font-size: 12px; color: #999; margin-top: 5px">选择抄送人</div>
                </div>
                <!--选中的人员列表-->
                <div style="flex:1"></div>
                <div style="overflow-x: auto; text-align: right; display: flex; margin: 0px 10px;">
                  <div v-for="(user, index) in copyUserList" style="display: flex; align-items: center">
                    <div class="user-item">{{user.realname}}</div>
                    <div style="margin: 0px 5px; color: white" v-if="index !== copyUserList.length - 1">
                      +
                    </div>
                  </div>
                </div>
                <!--选择人员按钮-->
                <div class="add-user-btn" @click="selectCopyUser()">
                  <a-icon type="plus"/>
                </div>
              </div>
            </a-timeline-item>
          </a-timeline>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
  import SelectUser from '../../components/SelectUser'
  import { submitAuditInfo } from '@/api/approval'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import Receipts from './receipts'
  import { formatDate } from '@/utils/util'

  export default {
    name: 'AddApproval',
    components: { Receipts, SelectUser },
    data() {
      return {
        uploadUrl: window._CONFIG['uploadURL'] + '/sys/common/upload',
        visible: false,
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
        linkOrder: null,
        previewVisible: false,
        previewImage: '',
        approvalType: 1,
        currentIndex: 0,
        isLinkOrder: true,
        isApprovalUsers: true,
        fileList: [], // 文件列表
        approvalUserList: [{}], // 审批人列表
        selectedUsers: [], // 已选择人员列表（组件需要）
        copyUserList: [], // 抄送人列表
        orderList: [], // 附件单据列表
        headers: {},
        selectedReceipts: [],
        accepts: '.png,.jpeg,.jpg,.gif,.doc,.docx,.pdf,.csv,.xls,.xlsx,.ppt,.pptx,.zip',
        isRelation:0
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'addApproval' })
    },
    mounted() {
      this.folder = formatDate(new Date().getTime(), 'yyyy-MM-dd')
      const token = Vue.ls.get(ACCESS_TOKEN)
      if (token) {
        // 让每个请求携带自定义 token 请根据实际情况自行修改
        this.headers['X-Access-Token'] = token
      }
    },
    methods: {
      imgCancel() {
        this.previewVisible = false
      },
      showAdd() {
        this.visible = true
      },
      handleCancel() {
        this.form.resetFields()
        this.approvalUserList = [{}]
        this.fileList = []
        this.isApprovalUsers = true
        this.selectedUsers = []
        this.copyUserList = []
        this.orderList = []
        this.linkOrder = null
        this.visible = false
        this.selectedReceipts = []
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
      handleOk() {
        this.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              if (this.approvalUserList.length === 0 || !this.approvalUserList[0].userList) {
                this.$message.warn('请选择审批人')
                return
              }
              let userInfo = this.$store.getters.userInfo
              console.log('userInfo', userInfo)
              let postData = {
                applyTile: this.form.getFieldValue('title'),
                applyContent: this.form.getFieldValue('content'),
                applyPersonId: userInfo.id,
                applyPersonName: userInfo.realname,
                billNo: this.linkOrder ? this.linkOrder.billNo : '',
                billType: this.linkOrder ? this.linkOrder.typeCode : '',
                billTypeId: this.linkOrder ? this.linkOrder.typeId : '',
                sysId: '1',
                sysName: '小松融资',
                batchList: [],
                copyList: [],
                attachmentsList: []
              }
              for (let i in this.approvalUserList) {
                let item = this.approvalUserList[i]
                let batch = {
                  batchType: item.type,
                  oprtList: []
                }
                for (let j in item.userList) {
                  let user = item.userList[j]
                  let oprt = {
                    oprtId: user.id,
                    oprtName: user.realname,
                    deptId: user.departIds,
                    deptName: ''
                  }
                  batch.oprtList.push(oprt)
                }
                postData.batchList.push(batch)
              }
              for (let i in this.copyUserList) {
                let user = this.copyUserList[i]
                let oprt = {
                  oprtId: user.id,
                  oprtName: user.realname,
                  deptId: user.departIds,
                  deptName: ''
                }
                postData.copyList.push(oprt)
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
              submitAuditInfo(postData).then((res) => {
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
            }
          }
        )
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
      selectOrder(link) {
        this.isLinkOrder = link
        if (link) {
          this.isRelation = 1;
          this.selectedReceipts = []
          if (this.linkOrder) {
            this.selectedReceipts.push(this.linkOrder)
          }
        } else {
          this.isRelation = 0;
          this.selectedReceipts = this.orderList
        }
        this.$refs.selectReceipts.showReceipts()
      },
      selectOrderOk(val) {
        if (!val || val.length === 0) {
          return
        }
        if (this.isLinkOrder) {
          this.linkOrder = val[0]
        } else {
          this.orderList = val
        }
      },
      removeOrder(e, index) {
        e.preventDefault()
        this.orderList.splice(index, 1)
      },
      selectApprovalUser(index) {
        this.isApprovalUsers = true
        this.currentIndex = index
        this.selectedUsers = []
        if (this.approvalUserList[index]) {
          this.selectedUsers = this.approvalUserList[index].userList
        }
        this.$refs.selectUser.select()
      },
      selectCopyUser() {
        this.isApprovalUsers = false
        this.selectedUsers = this.copyUserList
        this.$refs.selectUser.select()
      },
      selectUserOK(val) {
        if (this.isApprovalUsers) {
          let item = {
            type: this.approvalType,
            userList: val
          }
          this.approvalUserList.splice(this.currentIndex, 1, item)
        } else {
          this.copyUserList = val
        }
      }
    }
  }
</script>

<style scoped>
  .tag-type-1 {
    font-size: 12px;
    color: white;
    border-radius: 4px;
    background: #1890ff;
    padding: 2px 5px 2px 5px;
  }

  .tag-type-2 {
    font-size: 12px;
    color: white;
    border-radius: 4px;
    background: #fa8c16;
    padding: 2px 5px 2px 5px;
  }

  .select-user-div {
    border-bottom: 1px dashed #eee;
    display: flex;
    padding-bottom: 5px;
    padding-left: 5px;
  }

  .node-icon {
    width: 22px;
    height: 22px;
    text-align: center;
    line-height: 20px;
    border: 1px solid #1890ff;
    border-radius: 24px;
    color: white;
    background: #1890ff;
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
    overflow: hidden;
    line-height: 40px;
    background: #1890ff;
    border-radius: 40px;
    font-size: 13px;
    color: white;
  }

  .add-node-div {
    color: #1890ff;
    border: 1px dashed #1890ff;
    border-radius: 4px;
    width: 120px;
    padding: 5px;
    margin: 10px auto;
    text-align: center;
    cursor: pointer;
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