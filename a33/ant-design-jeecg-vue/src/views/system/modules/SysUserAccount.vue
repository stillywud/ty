<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="用户账号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入用户账号" v-decorator.trim="[ 'username', validatorRules.username]"/>
        </a-form-item>

        <a-form-item label="登陆密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input type="password" placeholder="请输入登陆密码"
                   v-decorator="[ 'password', validatorRules.password]" @change="passChanged($event)"/>
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
        <a-form-item label="确认密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input type="password" @blur="handleConfirmBlur" placeholder="请重新输入登陆密码"
                   v-decorator="[ 'confirmpassword', validatorRules.confirmpassword]"/>
        </a-form-item>

        <a-form-item label="登录手机号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入登录手机号" v-decorator="[ 'phone', validatorRules.phone]"/>
        </a-form-item>
      </a-form>

    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import {createAccount} from '@/api/api'
  import { checkPwdStrength } from '@/api/user'
  import {duplicateCheck} from '@/api/api'

  export default {
    name: "SysUserAccountModal",
    components: {

    },
    data () {
      return {
        title:"开账号",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        confirmDirty: false,
        safeValue: -1,
        validatorRules: {
          username: {
            rules: [{
              required: true, message: '请输入用户账号!'
            },{
              validator: this.validateUsername,
            }]
          },
          password: {
            rules: [{
              required: true, message: '请输入密码!'
            }, {
              validator: this.validateToNextPassword
            }]
          },
          confirmpassword: {
            rules: [{
              validator: this.compareToFirstPassword,
            }],
          },
          phone: {rules: [{
              required: true, message: '请输入登录手机号!'
            },
            {validator: this.validatePhone}]},
        },
      }
    },
    computed:{
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
      editAccount(record){
        this.form.resetFields();
        this.safeValue = -1
        this.visible = true;
        this.model = Object.assign({}, record);
        let that = this
        this.$nextTick(() => {
          that.form.setFieldsValue(pick(that.model, 'realname'))
        });
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            if(values.password && !values.confirmpassword){
              that.$message.warning("请输入确认密码");
              that.confirmLoading = false;
              return
            }
            let formData = Object.assign(this.model, values);
            let obj = createAccount(formData);
            obj.then((res) => {
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
      handleCancel () {
        this.close()
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
      },
      handleConfirmBlur(e) {
        const value = e.target.value;
        this.confirmDirty = this.confirmDirty || !!value
      },
      validatePhone(rule, value, callback) {
        if (!value) {
          callback()
        } else {
          //update-begin--Author:kangxiaolin  Date:20190826 for：[05] 手机号不支持199号码段--------------------
          if (new RegExp(/^1[3|4|5|7|8|9][0-9]\d{8}$/).test(value)) {
            //update-end--Author:kangxiaolin  Date:20190826 for：[05] 手机号不支持199号码段--------------------

            var params = {
              tableName: 'sys_user',
              fieldName: 'phone',
              fieldVal: value,
              dataId: this.userId
            };
            duplicateCheck(params).then((res) => {
              if (res.success) {
                callback()
              } else {
                callback("手机号已存在!")
              }
            })
          } else {
            callback("请输入正确格式的手机号码!");
          }
        }
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一样！');
        } else {
          callback()
        }
      },
      validateUsername(rule, value, callback) {
        var params = {
          tableName: 'sys_user',
          fieldName: 'username',
          fieldVal: value,
          dataId: this.userId
        };
        duplicateCheck(params).then((res) => {
          if (res.success) {
            callback()
          } else {
            callback("用户名已存在!")
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>