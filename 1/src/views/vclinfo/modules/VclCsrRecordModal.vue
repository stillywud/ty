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

        <a-form-item label="设备机号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['vclNo', validatorRules.vclNo]" :trigger-change="true" dictCode="vcl_info,vcl_no,vcl_no" placeholder="请选择设备机号"/>
        </a-form-item>
        <a-form-item label="客户" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerUid', validatorRules.customerUid]" :trigger-change="true" dictCode="cust_basic,customer_name,id" placeholder="请选择客户"/>
        </a-form-item>
        <a-form-item label="合同金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['budContractPrice', validatorRules.budContractPrice]" placeholder="请输入合同金额"></a-input>
        </a-form-item>
        <a-form-item label="设备价格" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['budVclPrice', validatorRules.budVclPrice]" placeholder="请输入设备价格"></a-input>
        </a-form-item>
        <a-form-item label="首付车款" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['budFirstpayment']" placeholder="请输入首付车款"></a-input>
        </a-form-item>
        <a-form-item label="首付比例" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['budFirstpaymentRatio']" placeholder="请输入首付比例" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="期数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['budLoanPeriods']" placeholder="请输入期数" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="是否投保" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['isInsure', validatorRules.isInsure]" :trigger-change="true" dictCode="dict_whether" placeholder="请选择是否投保"/>
        </a-form-item>
        <a-form-item label="保险类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['supInsureType']" :trigger-change="true" dictCode="dict_insurance_type" placeholder="请选择保险类型"/>
        </a-form-item>
        <a-form-item label="投保期限" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['supInsurePeriods']" placeholder="请输入投保期限" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="保险截止日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择保险截止日期" v-decorator="['insureDeadline']" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="签约完成时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择签约完成时间" v-decorator="['contractSignedTime']" :trigger-change="true" style="width: 100%"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'  
  import JDictSelectTag from "@/components/dict/JDictSelectTag"



  export default {
    name: "VclCsrRecordModal",
    components: { 
      JDate,
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
          vclNo: {
            rules: [
              { required: true, message: '请输入设备机号!'},
            ]
          },
          customerUid: {
            rules: [
              { required: true, message: '请输入客户!'},
            ]
          },
          budContractPrice: {
            rules: [
              { required: true, message: '请输入合同金额!'},
            ]
          },
          budVclPrice: {
            rules: [
              { required: true, message: '请输入设备价格!'},
            ]
          },
          isInsure: {
            rules: [
              { required: true, message: '请输入是否投保!'},
            ]
          },
        },
        url: {
          add: "/vcl/vclCsrRecord/add",
          edit: "/vcl/vclCsrRecord/edit",
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
          this.form.setFieldsValue(pick(this.model,'vclNo','customerUid','budContractPrice','budVclPrice','budFirstpayment','budFirstpaymentRatio','budLoanPeriods','isInsure','supInsureType','supInsurePeriods','insureDeadline','contractSignedTime'))
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
        this.form.setFieldsValue(pick(row,'vclNo','customerUid','budContractPrice','budVclPrice','budFirstpayment','budFirstpaymentRatio','budLoanPeriods','isInsure','supInsureType','supInsurePeriods','insureDeadline','contractSignedTime'))
      },

      
    }
  }
</script>