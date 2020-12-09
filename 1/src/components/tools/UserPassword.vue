<template>
  <a-modal
    :title="title"
    :width="modalWidth"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="旧密码">
          <a-input type="password" placeholder="请输入旧密码" v-decorator="[ 'oldpassword', validatorRules.oldpassword]"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          style="margin-bottom: 10px!important;"
          label="新密码">
          <a-input type="password" placeholder="请输入新密码" v-decorator="[ 'password', validatorRules.password]"
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
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="确认新密码">
          <a-input type="password" @blur="handleConfirmBlur" placeholder="请确认新密码"
                   v-decorator="[ 'confirmpassword', validatorRules.confirmpassword]"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { putAction } from '@/api/manage'
  import { checkPwdStrength } from '@/api/user'

  export default {
    name: 'UserPassword',
    data() {
      return {
        title: '修改密码',
        modalWidth: 800,
        visible: false,
        confirmLoading: false,
        safeValue: -1,
        validatorRules: {
          oldpassword: {
            rules: [{
              required: true, message: '请输入旧密码!'
            }]
          },
          password: {
            rules: [{
              required: true, message: '请输入新密码!'
            }, {
              validator: this.validateToNextPassword
            }]
          },
          confirmpassword: {
            rules: [{
              required: true, message: '请确认新密码!'
            }, {
              validator: this.compareToFirstPassword
            }]
          }
        },
        confirmDirty: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },

        form: this.$form.createForm(this),
        url: 'sys/user/updatePassword',
        username: ''
      }
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
      show(uname) {
        if (!uname) {
          this.$message.warning('当前系统无登陆用户!')
          return
        } else {
          this.username = uname
          this.form.resetFields()
          this.visible = true
          this.safeValue = -1
        }
      },
      handleCancel() {
        this.close()
      },
      close() {
        this.$emit('close')
        this.visible = false
        this.disableSubmit = false
        this.selectedRole = []
      },
      handleOk() {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            let params = Object.assign({ username: this.username }, values)
            console.log('修改密码提交数据', params)
            putAction(this.url, params).then((res) => {
              if (res.success) {
                console.log(res)
                that.$message.success(res.message)
                that.close()
              } else {
                that.$message.warning(res.message)
              }
            }).finally(() => {
              that.confirmLoading = false
            })
          }
        })
      },
      validateToNextPassword(rule, value, callback) {
        const form = this.form
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true })
        }
        callback()
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一样！')
        } else {
          callback()
        }
      },
      handleConfirmBlur(e) {
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

<style scoped>

</style>

