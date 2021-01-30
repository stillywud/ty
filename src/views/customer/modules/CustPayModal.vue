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
          <j-dict-select-tag type="list" v-decorator="['customerUid']" :trigger-change="true" dictCode="cust_basic,customer_name,id" placeholder="请选择客户"/>
        </a-form-item>
        <a-form-item label="支付账号名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['payName', validatorRules.payName]" placeholder="请输入支付账号名称"></a-input>
        </a-form-item>
        <a-form-item label="支付账号税号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['payTaxpayerIdCode', validatorRules.payTaxpayerIdCode]" placeholder="请输入支付账号税号"></a-input>
        </a-form-item>
        <a-form-item label="支付账号（卡号）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['payBankAccount']" placeholder="请输入支付账号（卡号）"></a-input>
        </a-form-item>
        <a-form-item label="支付账号开户行" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['payBankName']" placeholder="请输入支付账号开户行"></a-input>
        </a-form-item>
        <a-form-item label="支付账号地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['payBankAccountAddress']" placeholder="请输入支付账号地址"></a-input>
        </a-form-item>
        <a-form-item label="支付账号电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['payBankAccountTel']" placeholder="请输入支付账号电话"></a-input>
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
    name: "CustPayModal",
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
          payName: {
            rules: [
              { required: true, message: '请输入支付账号名称!'},
            ]
          },
          payTaxpayerIdCode: {
            rules: [
              { required: true, message: '请输入支付账号税号!'},
            ]
          },
        },
        url: {
          add: "/cust/custPay/add",
          edit: "/cust/custPay/edit",
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
          this.form.setFieldsValue(pick(this.model,'customerUid','payName','payTaxpayerIdCode','payBankAccount','payBankName','payBankAccountAddress','payBankAccountTel'))
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
        this.form.setFieldsValue(pick(row,'customerUid','payName','payTaxpayerIdCode','payBankAccount','payBankName','payBankAccountAddress','payBankAccountTel'))
      },

      
    }
  }
</script>