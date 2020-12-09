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

        <a-form-item label="原始记录ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['originalId', validatorRules.originalId]" placeholder="请输入原始记录ID"></a-input>
        </a-form-item>
        <a-form-item label="客户唯一标识" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerUid']" :trigger-change="true" dictCode="cust_basic,customer_name,id" placeholder="请选择客户唯一标识"/>
        </a-form-item>
        <a-form-item label="设备机号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['vclNo', validatorRules.vclNo]" :trigger-change="true" dictCode="vcl_info,vcl_no,vcl_no" placeholder="请选择设备机号"/>
        </a-form-item>
        <a-form-item label="租赁状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['vclRentStatus', validatorRules.vclRentStatus]" :trigger-change="true" dictCode="dict_vcl_rent_status" placeholder="请选择租赁状态"/>
        </a-form-item>
        <a-form-item label="维修状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['vclRepairStatus', validatorRules.vclRepairStatus]" :trigger-change="true" dictCode="dict_vcl_repair_status" placeholder="请选择维修状态"/>
        </a-form-item>
        <a-form-item label="动力形式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['vclPowerFrom', validatorRules.vclPowerFrom]" :trigger-change="true" dictCode="dict_vcl_power_from" placeholder="请选择动力形式"/>
        </a-form-item>
        <a-form-item label="牌照号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['vclLicenseNo']" placeholder="请输入牌照号"></a-input>
        </a-form-item>
        <a-form-item label="管理方" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['vclManager']" :trigger-change="true" dictCode="dict_vcl_manager" placeholder="请选择管理方"/>
        </a-form-item>
        <a-form-item label="存储地点" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['vclStorage']" placeholder="请输入存储地点"></a-input>
        </a-form-item>
        <a-form-item label="购买价格" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['vclBuyprice']" placeholder="请输入购买价格" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="购买日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择购买日期" v-decorator="['vclBuydate']" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="合同" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['vclConId']" placeholder="请输入合同"></a-input>
        </a-form-item>
        <a-form-item label="来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['accessSysId', validatorRules.accessSysId]" :trigger-change="true" dictCode="dict_info_source" placeholder="请选择来源"/>
        </a-form-item>
        <a-form-item label="记录状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['relRecordStatus', validatorRules.relRecordStatus]" :trigger-change="true" dictCode="dict_info_status" placeholder="请选择记录状态"/>
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
    name: "VclRendRecordModal",
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
          originalId: {
            rules: [
              { required: true, message: '请输入原始记录ID!'},
            ]
          },
          vclNo: {
            rules: [
              { required: true, message: '请输入设备机号!'},
            ]
          },
          vclRentStatus: {
            rules: [
              { required: true, message: '请输入租赁状态!'},
            ]
          },
          vclRepairStatus: {
            rules: [
              { required: true, message: '请输入维修状态!'},
            ]
          },
          vclPowerFrom: {
            rules: [
              { required: true, message: '请输入动力形式!'},
            ]
          },
          accessSysId: {
            rules: [
              { required: true, message: '请输入来源!'},
            ]
          },
          relRecordStatus: {
            rules: [
              { required: true, message: '请输入记录状态!'},
            ]
          },
        },
        url: {
          add: "/vcl/vclRendRecord/add",
          edit: "/vcl/vclRendRecord/edit",
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
          this.form.setFieldsValue(pick(this.model,'originalId','customerUid','vclNo','vclRentStatus','vclRepairStatus','vclPowerFrom','vclLicenseNo','vclManager','vclStorage','vclBuyprice','vclBuydate','vclConId','accessSysId','relRecordStatus'))
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
        this.form.setFieldsValue(pick(row,'originalId','customerUid','vclNo','vclRentStatus','vclRepairStatus','vclPowerFrom','vclLicenseNo','vclManager','vclStorage','vclBuyprice','vclBuydate','vclConId','accessSysId','relRecordStatus'))
      },

      
    }
  }
</script>