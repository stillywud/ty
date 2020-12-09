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

        <a-form-item label="客户" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerUid', validatorRules.customerUid]" :trigger-change="true" dictCode="cust_basic,customer_name,id" placeholder="请选择客户"/>
        </a-form-item>
        <a-form-item label="开票名称（发票抬头）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['inoviceName', validatorRules.inoviceName]" placeholder="请输入开票名称（发票抬头）"></a-input>
        </a-form-item>
        <a-form-item label="开票类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['inoviceType', validatorRules.inoviceType]" :trigger-change="true" dictCode="dict_inovice_type" placeholder="请选择开票类型"/>
        </a-form-item>
        <a-form-item label="开票地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['inoviceAddress', validatorRules.inoviceAddress]" placeholder="请输入开票地址"></a-input>
        </a-form-item>
        <a-form-item label="开票电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['inoviceTel', validatorRules.inoviceTel]" placeholder="请输入开票电话"></a-input>
        </a-form-item>
        <a-form-item label="纳税人识别码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['taxpayerIdCode', validatorRules.taxpayerIdCode]" placeholder="请输入纳税人识别码"></a-input>
        </a-form-item>
        <a-form-item label="开票行名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['bankName', validatorRules.bankName]" placeholder="请输入开票行名称"></a-input>
        </a-form-item>
        <a-form-item label="开票行账号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['bankAccount', validatorRules.bankAccount]" placeholder="请输入开票行账号"></a-input>
        </a-form-item>
        <a-form-item label="电子发票邮件接收地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['emailAddress']" placeholder="请输入电子发票邮件接收地址"></a-input>
        </a-form-item>

      </a-form>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDictSelectTag from "@/components/dict/JDictSelectTag"



  export default {
    name: "CustInoviceModal",
    components: { 
      JDictSelectTag,
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
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
        validatorRules: {
          customerUid: {
            rules: [
              { required: true, message: '请输入客户!'},
            ]
          },
          inoviceName: {
            rules: [
              { required: true, message: '请输入开票名称（发票抬头）!'},
            ]
          },
          inoviceType: {
            rules: [
              { required: true, message: '请输入开票类型!'},
            ]
          },
          inoviceAddress: {
            rules: [
              { required: true, message: '请输入开票地址!'},
            ]
          },
          inoviceTel: {
            rules: [
              { required: true, message: '请输入开票电话!'},
            ]
          },
          taxpayerIdCode: {
            rules: [
              { required: true, message: '请输入纳税人识别码!'},
            ]
          },
          bankName: {
            rules: [
              { required: true, message: '请输入开票行名称!'},
            ]
          },
          bankAccount: {
            rules: [
              { required: true, message: '请输入开票行账号!'},
            ]
          },
        },
        url: {
          add: "/cust/custInovice/add",
          edit: "/cust/custInovice/edit",
        }
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'customerUid','inoviceName','inoviceType','inoviceAddress','inoviceTel','taxpayerIdCode','bankName','bankAccount','emailAddress'))
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
            if(!this.model.id){
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
        this.form.setFieldsValue(pick(row,'customerUid','inoviceName','inoviceType','inoviceAddress','inoviceTel','taxpayerIdCode','bankName','bankAccount','emailAddress'))
      },

      
    }
  }
</script>