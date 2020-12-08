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

        <a-form-item label="客户名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['customerName', validatorRules.customerName]" placeholder="请输入客户名称"></a-input>
        </a-form-item>
        <a-form-item label="客户证件类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerIdTypeId', validatorRules.customerIdTypeId]" :trigger-change="true" dictCode="customer_certificates_type" placeholder="请选择客户证件类型"/>
        </a-form-item>
        <a-form-item label="客户证件编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['customerIdNo', validatorRules.customerIdNo]" placeholder="请输入客户证件编号"></a-input>
        </a-form-item>
        <a-form-item label="客户性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerNatureId', validatorRules.customerNatureId]" :trigger-change="true" dictCode="dict_customer_nature" placeholder="请选择客户性质"/>
        </a-form-item>
        <a-form-item label="客户性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['customerNature']" placeholder="请输入客户性质"></a-input>
        </a-form-item>
        <a-form-item label="客户类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerTypeId', validatorRules.customerTypeId]" :trigger-change="true" dictCode="dict_customer_type" placeholder="请选择客户类型"/>
        </a-form-item>
        <a-form-item label="客户类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['customerType']" placeholder="请输入客户类型"></a-input>
        </a-form-item>
        <a-form-item label="客户行业" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerIndustryId', validatorRules.customerIndustryId]" :trigger-change="true" dictCode="dict_customer_industry" placeholder="请选择客户行业"/>
        </a-form-item>
        <a-form-item label="客户行业" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['customerIndustry']" placeholder="请输入客户行业"></a-input>
        </a-form-item>
        <a-form-item label="客户主要工程类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerProjectTypeId', validatorRules.customerProjectTypeId]" :trigger-change="true" dictCode="dict_project_type" placeholder="请选择客户主要工程类型"/>
        </a-form-item>
        <a-form-item label="客户主要工程类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['customerProjectType']" placeholder="请输入客户主要工程类型"></a-input>
        </a-form-item>
        <a-form-item label="客户自身状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerStatusId', validatorRules.customerStatusId]" :trigger-change="true" dictCode="dict_customer_status" placeholder="请选择客户自身状态"/>
        </a-form-item>
        <a-form-item label="客户来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['accessSysId', validatorRules.accessSysId]" :trigger-change="true" dictCode="dict_customer_source" placeholder="请选择客户来源"/>
        </a-form-item>
        <a-form-item label="客户来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['accessSysName']" placeholder="请输入客户来源"></a-input>
        </a-form-item>
        <a-form-item label="客户信息真实性" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerVerified', validatorRules.customerVerified]" :trigger-change="true" dictCode="dict_customer_authenticity" placeholder="请选择客户信息真实性"/>
        </a-form-item>
        <a-form-item label="客户信息状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerInfoStatus', validatorRules.customerInfoStatus]" :trigger-change="true" dictCode="dict_customer_info_status" placeholder="请选择客户信息状态"/>
        </a-form-item>
        <a-form-item label="企业法人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['corporate', validatorRules.corporate]" placeholder="请输入企业法人"></a-input>
        </a-form-item>
        <a-form-item label="注册时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择注册时间" v-decorator="['regTime', validatorRules.regTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="注册地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['regAddress', validatorRules.regAddress]" placeholder="请输入注册地址"></a-input>
        </a-form-item>
        <a-form-item label="注册资金" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['regCapital', validatorRules.regCapital]" placeholder="请输入注册资金"></a-input>
        </a-form-item>
        <a-form-item label="经营范围" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['businessScope', validatorRules.businessScope]" rows="4" placeholder="请输入经营范围"/>
        </a-form-item>
        <a-form-item label="邮政编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['postalCode', validatorRules.postalCode]" placeholder="请输入邮政编码"></a-input>
        </a-form-item>
        <a-form-item label="电话号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['telNumber', validatorRules.telNumber]" placeholder="请输入电话号码"></a-input>
        </a-form-item>
        <a-form-item label="传真" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['fax']" placeholder="请输入传真"></a-input>
        </a-form-item>
        <a-form-item label="企业类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['enterpriseTypeId', validatorRules.enterpriseTypeId]" :trigger-change="true" dictCode="dict_company_type" placeholder="请选择企业类型"/>
        </a-form-item>
        <a-form-item label="营业期限" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['operationPeriod', validatorRules.operationPeriod]" placeholder="请输入营业期限"></a-input>
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
    name: "CustBasicModal",
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
          customerName: {
            rules: [
              { required: true, message: '请输入客户名称!'},
            ]
          },
          customerIdTypeId: {
            rules: [
              { required: true, message: '请输入客户证件类型!'},
            ]
          },
          customerIdNo: {
            rules: [
              { required: true, message: '请输入客户证件编号!'},
            ]
          },
          customerNatureId: {
            rules: [
              { required: true, message: '请输入客户性质!'},
            ]
          },
          customerTypeId: {
            rules: [
              { required: true, message: '请输入客户类型!'},
            ]
          },
          customerIndustryId: {
            rules: [
              { required: true, message: '请输入客户行业!'},
            ]
          },
          customerProjectTypeId: {
            rules: [
              { required: true, message: '请输入客户主要工程类型!'},
            ]
          },
          customerStatusId: {
            rules: [
              { required: true, message: '请输入客户自身状态!'},
            ]
          },
          accessSysId: {
            rules: [
              { required: true, message: '请输入客户来源!'},
            ]
          },
          customerVerified: {
            rules: [
              { required: true, message: '请输入客户信息真实性!'},
            ]
          },
          customerInfoStatus: {
            rules: [
              { required: true, message: '请输入客户信息状态!'},
            ]
          },
          corporate: {
            rules: [
              { required: true, message: '请输入企业法人!'},
            ]
          },
          regTime: {
            rules: [
              { required: true, message: '请输入注册时间!'},
            ]
          },
          regAddress: {
            rules: [
              { required: true, message: '请输入注册地址!'},
            ]
          },
          regCapital: {
            rules: [
              { required: true, message: '请输入注册资金!'},
            ]
          },
          businessScope: {
            rules: [
              { required: true, message: '请输入经营范围!'},
            ]
          },
          postalCode: {
            rules: [
              { required: true, message: '请输入邮政编码!'},
            ]
          },
          telNumber: {
            rules: [
              { required: true, message: '请输入电话号码!'},
            ]
          },
          enterpriseTypeId: {
            rules: [
              { required: true, message: '请输入企业类型!'},
            ]
          },
          operationPeriod: {
            rules: [
              { required: true, message: '请输入营业期限!'},
            ]
          },
        },
        url: {
          add: "/cust/custBasic/add",
          edit: "/cust/custBasic/edit",
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
          this.form.setFieldsValue(pick(this.model,'customerName','customerIdTypeId','customerIdNo','customerNatureId','customerNature','customerTypeId','customerType','customerIndustryId','customerIndustry','customerProjectTypeId','customerProjectType','customerStatusId','accessSysId','accessSysName','customerVerified','customerInfoStatus','corporate','regTime','regAddress','regCapital','businessScope','postalCode','telNumber','fax','enterpriseTypeId','operationPeriod'))
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
        this.form.setFieldsValue(pick(row,'customerName','customerIdTypeId','customerIdNo','customerNatureId','customerNature','customerTypeId','customerType','customerIndustryId','customerIndustry','customerProjectTypeId','customerProjectType','customerStatusId','accessSysId','accessSysName','customerVerified','customerInfoStatus','corporate','regTime','regAddress','regCapital','businessScope','postalCode','telNumber','fax','enterpriseTypeId','operationPeriod'))
      },

      
    }
  }
</script>