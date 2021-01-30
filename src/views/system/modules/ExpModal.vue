<template>
  <a-modal
    title="账号延期"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    cancelText="关闭"
    style="top:20px;"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="用户账号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入用户账号" v-decorator="[ 'username', {}]" :readOnly="true"/>
        </a-form-item>

        <a-form-item label="账号过期时间" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback >
          <a-date-picker
            style="width: 100%"
            showTime="true"
            placeholder="请选择账号过期时间"
            v-decorator="[ 'exp', validatorRules.exp]"
            :getCalendarContainer="node => node.parentNode"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { putAction } from '@/api/manage'

  export default {
    name: "ExpModal",
    data () {
      return {
        visible: false,
        confirmLoading: false,
        confirmDirty: false,
        dateFormat: "YYYY-MM-DD HH:mm:ss",
        url: '/sys/user/changeExp',
        validatorRules:{
          exp: {
            rules: [{
              required: true, message: '请输入账号过期时间!'
            }]
          },
        },

        model: {},

        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form:this.$form.createForm(this)
      }
    },
    created () {
      console.log("created");
    },
    methods: {
      show (username) {
        this.form.resetFields();
        this.visible = true;
        this.model.username = username;
        this.$nextTick(() => {
          this.form.setFieldsValue({username:username});
        });
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.disableSubmit = false;
        this.selectedRole = [];
      },
      handleSubmit () {
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            this.confirmLoading = true;
            if (!values.exp) {
              values.exp = '';
            } else {
              values.exp = values.exp.format(this.dateFormat);
            }
            let formData = Object.assign(this.model, values);
            putAction(this.url, formData).then((res)=>{
              if(res.success){
                this.$message.success(res.message);
                this.$emit('ok');
              }else{
                this.$message.warning(res.message);
              }
            }).finally(() => {
              this.confirmLoading = false;
              this.close();
            });
          }
        })
      },
      handleCancel () {
        this.close()
      }
    }
  }
</script>