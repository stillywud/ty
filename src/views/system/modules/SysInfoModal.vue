<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="系统id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['id', validatorRules.id]" placeholder="请输入系统id" :readOnly="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="系统名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['name', validatorRules.name]" placeholder="请输入系统名称"></a-input>
        </a-form-item>
        <a-form-item label="微信APPID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['wxAppid']" placeholder="请输入微信APPID"></a-input>
        </a-form-item>
        <a-form-item label="微信Secret" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['wxSecret']" placeholder="请输入微信Secret"></a-input>
        </a-form-item>
        <a-form-item label="钉钉APPID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dingAppid']" placeholder="请输入钉钉APPID"></a-input>
        </a-form-item>
        <a-form-item label="钉钉Secret" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dingSecret']" placeholder="请输入钉钉Secret"></a-input>
        </a-form-item>
        <a-form-item label="数据库ip" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dbIp', validatorRules.dbIp]" placeholder="请输入数据库ip" :readOnly="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="数据库端口" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dbPort', validatorRules.dbPort]" placeholder="请输入数据库端口" :readOnly="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="数据库名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dbName', validatorRules.dbName]" placeholder="请输入数据库名，格式为：ty_busi_租户简称_系统简称"
                   :readOnly="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="数据库用户名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dbUsername', validatorRules.dbUsername]" placeholder="请输入数据库用户名" :readOnly="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="数据库密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dbPwd', validatorRules.dbPwd]" placeholder="请输入数据库密码" :readOnly="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['remark']" rows="4" placeholder="请输入备注"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'



  export default {
    name: "SysInfoModal",
    components: {
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
        visible: false,
        disableSubmit: false,
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
        validatorRules: {
          id: {
            rules: [
              { required: true, message: '请输入系统id!'}
            ]
          },
          name: {
            rules: [
              { required: true, message: '请输入系统名称!'},
              { validator: (rule, value, callback) => validateDuplicateValue('sys_info', 'name', value, this.model.id, callback)},
            ]
          },
          dbIp: {
            rules: []
          },
          dbPort: {
            rules: []
          },
          dbName: {
            rules: [
              { validator: (rule, value, callback) => validateDuplicateValue('sys_info', 'db_name', value, this.model.id, callback)},
            ]
          },
          dbUsername: {
            rules: []
          },
          dbPwd: {
            rules: []
          },
        },
        url: {
          add: "/system/sysInfo/add",
          edit: "/system/sysInfo/edit",
        }
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({flag:'add'});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'id','name','wxAppid','wxSecret','dingAppid','dingSecret','dbIp',
            'dbPort','dbName','dbUsername','dbPwd','remark'))
        })
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
            let httpurl = '';
            let method = '';
            if(this.model.flag==='add'){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据",formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
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
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'id','name','wxAppid','wxSecret','dingAppid','dingSecret','dbIp','dbPort',
          'dbName','dbUsername','dbPwd','remark'))
      },

    }
  }
</script>