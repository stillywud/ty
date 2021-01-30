<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="消息类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-checkbox v-decorator="['notifyType', validatorRules.notifyType]" :trigger-change="true"
                      :options="busiTypes" :disabled="disableSubmit"></j-checkbox>
        </a-form-item>
        <a-form-item label="选择用户" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-multi-user v-decorator="['userId', validatorRules.userId]" :disabled="disableSubmit"></j-select-multi-user>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['remark']" rows="4" placeholder="请输入备注" :disabled="disableSubmit"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </j-modal>
</template>

<script>

  import {httpAction} from '@/api/manage'
  import pick from 'lodash.pick'
  import {validateDuplicateValue} from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'
  import JCheckbox from '@/components/jeecg/JCheckbox'
  import JSelectMultiUser from '@/components/jeecgbiz/JSelectMultiUser'

  export default {
    name: "SysMsgSubscribeModal",
    components: {
      JDate,
      JCheckbox,
      JSelectMultiUser,
    },
    data() {
      return {
        form: this.$form.createForm(this),
        title: "操作",
        width: 800,
        visible: false,
        disableSubmit: false,
        model: {},
        busiTypes: [],
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        confirmLoading: false,
        validatorRules: {
          notifyType: {
            rules: [
              {required: true, message: '请输入消息类别!'},
            ]
          },
          userId: {
            rules: [
              {required: true, message: '请选择用户!'},
            ]
          },
          subscribeTime: {
            rules: [
              {required: true, message: '请输入订阅时间!'},
            ]
          },
        },
        url: {
          add: "/message/sysMsgSubscribe/add",
          edit: "/message/sysMsgSubscribe/edit",
          msg_category: "/message/sysMsgConfig/querySubscibe",
        }
      }
    },
    created() {
    },
    mounted(){
      this.msg_category()
    },
    methods: {
      add() {
        this.edit({});
      },
      edit(record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        // record.userId = this.$store.getters.userInfo.username
        record.userId = record.userId
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'notifyType', 'userId', 'remark'))
        })
      },
      close() {
        this.$emit('close');
        this.visible = false;
      },
      handleOk() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (!this.model.id) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据", formData)
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }

        })
      },
      handleCancel() {
        this.close()
      },
      popupCallback(row) {
        this.form.setFieldsValue(pick(row, 'notifyType', 'userId', 'remark'))
      },
      msg_category(){
        let httpurl = this.url.msg_category;
        let method = 'get';
        httpAction(httpurl,{}, method).then((res) => {
          if (res.success) {
            this.busiTypes=res.result
          } else {
            this.$message.warning(res.message);
          }
        }).finally(() => {
          this.confirmLoading = false;
          this.close();
        })
      },

    }
  }
</script>
