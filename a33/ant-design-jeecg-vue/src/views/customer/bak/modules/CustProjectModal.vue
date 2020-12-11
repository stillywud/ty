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

        <a-form-item label="所属客户" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerUid']" :trigger-change="true" dictCode="cust_basic,customer_name,id" placeholder="请选择所属客户"/>
        </a-form-item>
        <a-form-item label="工程名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['projectName', validatorRules.projectName]" placeholder="请输入工程名称"></a-input>
        </a-form-item>
        <a-form-item label="工程地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['projectAddress', validatorRules.projectAddress]" placeholder="请输入工程地址"></a-input>
        </a-form-item>
        <a-form-item label="工程类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['projectTypeId', validatorRules.projectTypeId]" :trigger-change="true" dictCode="dict_project_type" placeholder="请选择工程类型"/>
        </a-form-item>
        <a-form-item label="工程类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['projectType']" placeholder="请输入工程类型"></a-input>
        </a-form-item>
        <a-form-item label="工程阶段" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['projectStageId']" :trigger-change="true" dictCode="dict_project_stage" placeholder="请选择工程阶段"/>
        </a-form-item>
        <a-form-item label="工程阶段" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['projectStage']" placeholder="请输入工程阶段"></a-input>
        </a-form-item>
        <a-form-item label="工程内容描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['projectInfo']" rows="4" placeholder="请输入工程内容描述"/>
        </a-form-item>
        <a-form-item label="工程有效期开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择工程有效期开始时间" v-decorator="['projectStartdate']" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="工程有效期结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择工程有效期结束时间" v-decorator="['projectEnddate']" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="纬度" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['lat']" placeholder="请输入纬度" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="经度" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['lon']" placeholder="请输入经度" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['accessSysId']" :trigger-change="true" dictCode="dict_info_source" placeholder="请选择来源"/>
        </a-form-item>
        <a-form-item label="来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['accessSysName']" placeholder="请输入来源"></a-input>
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
  import JDate from '@/components/jeecg/JDate'  
  import JDictSelectTag from "@/components/dict/JDictSelectTag"



  export default {
    name: "CustProjectModal",
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
          projectName: {
            rules: [
              { required: true, message: '请输入工程名称!'},
            ]
          },
          projectAddress: {
            rules: [
              { required: true, message: '请输入工程地址!'},
            ]
          },
          projectTypeId: {
            rules: [
              { required: true, message: '请输入工程类型!'},
            ]
          },
        },
        url: {
          add: "/cust/custProject/add",
          edit: "/cust/custProject/edit",
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
          this.form.setFieldsValue(pick(this.model,'customerUid','projectName','projectAddress','projectTypeId','projectType','projectStageId','projectStage','projectInfo','projectStartdate','projectEnddate','lat','lon','accessSysId','accessSysName','payBankAccountAddress','payBankAccountTel'))
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
        this.form.setFieldsValue(pick(row,'customerUid','projectName','projectAddress','projectTypeId','projectType','projectStageId','projectStage','projectInfo','projectStartdate','projectEnddate','lat','lon','accessSysId','accessSysName','payBankAccountAddress','payBankAccountTel'))
      },

      
    }
  }
</script>