<template>
  <a-modal
    title="重新设定密码"
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

        <a-form-item label="登陆密码" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback >
          <a-input type="password" placeholder="请输入登陆密码" v-decorator="[ 'password', validatorRules.password]"
                   @change="passChanged($event)"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :colon="false"
          style="margin-bottom: 10px!important;"
          label=" ">
          <div style="display: flex; align-items: center;">
            <div style="flex: 1; height: 5px; margin-right: 5px;"
                 v-bind:style="{background: safeValue >= 0 ? 'red' : 'lightgray'}"></div>
            <div style="flex: 1; height: 5px; margin-right: 5px"
                 v-bind:style="{background: safeValue >= 1 ? 'orange' : 'lightgray'}"></div>
            <div style="flex: 1; height: 5px;"
                 v-bind:style="{background: safeValue >= 2 ? 'green' : 'lightgray'}"></div>
            <div style="margin-left: 10px; width: 80px; text-align: center; color: darkgray">{{safeValueStr}}</div>
          </div>
        </a-form-item>

        <a-form-item label="确认密码" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback >
          <a-input type="password" @blur="handleConfirmBlur" placeholder="请重新输入登陆密码" v-decorator="[ 'confirmpassword', validatorRules.confirmpassword]"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {changePassword} from '@/api/api'
  import { checkPwdStrength } from '@/api/user'

  export default {
    name: "PasswordModal",
    data () {
      return {
        visible: false,
        confirmLoading: false,
        confirmDirty: false,
        safeValue: -1,
        validatorRules:{
          password: {
            rules: [{
              required: true, message: '请输入登陆密码!'
            }, {
              validator: this.validateToNextPassword
            }]
          },
          confirmpassword:{
            rules: [{
              required: true, message: '请重新输入登陆密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
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
    computed: {
      safeValueStr() {
        if (this.safeValue < 0) {
          return '密码为空'
        } else if (this.safeValue == 0) {
          return '弱'
        } else if (this.safeValue == 1) {
          return '中'
        } else if (this.safeValue == 2) {
          return '强'
        }
      }
    },
    methods: {
      show (username) {
        this.form.resetFields();
        this.visible = true;
        this.model.username = username;
        this.$nextTick(() => {
          this.form.setFieldsValue({username:username});
        });
        this.safeValue = -1;
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
            let formData = Object.assign(this.model, values);
            changePassword(formData).then((res)=>{
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
      },
      validateToNextPassword  (rule, value, callback) {
        const form = this.form;
        const confirmpassword=form.getFieldValue('confirmpassword');
        console.log("confirmpassword==>",confirmpassword);
        if (value && confirmpassword && value !== confirmpassword) {
          callback('两次输入的密码不一样！');
        }
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true })
        }
        callback();
      },
      compareToFirstPassword  (rule, value, callback) {
        const form = this.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一样！');
        } else {
          callback()
        }
      },
      handleConfirmBlur  (e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },
      passChanged(e) {
        this.$nextTick(() => {
          let pass = this.form.getFieldValue('password')
          if (pass.length > 0) {
            checkPwdStrength(pass).then((res) => {
              if (res.success) {
                this.safeValue = res.message
              } else {
                console.log(res.message)
              }
            })
          } else {
            this.safeValue = -1
          }
        })
      }
    }
  }
</script>