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
        <a-form-item label="联系人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['contactsName', validatorRules.contactsName]" placeholder="请输入联系人姓名"></a-input>
        </a-form-item>
        <a-form-item label="联系人电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['contactsPhone', validatorRules.contactsPhone]" placeholder="请输入联系人电话"></a-input>
        </a-form-item>
        <a-form-item label="联系人电话2" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['contactsPhone2', validatorRules.contactsPhone2]" placeholder="请输入联系人电话2"></a-input>
        </a-form-item>
        <a-form-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['contactsGender', validatorRules.contactsGender]" :trigger-change="true" dictCode="sex" placeholder="请选择性别"/>
        </a-form-item>
        <a-form-item label="爱好" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['contactsHobby']" placeholder="请输入爱好"></a-input>
        </a-form-item>
        <a-form-item label="民族" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['contactsNation']" placeholder="请输入民族"></a-input>
        </a-form-item>
        <a-form-item label="出生日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择出生日期" v-decorator="['contactsBronData']" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="个人证件类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['contactsIdTypeId']" :trigger-change="true" dictCode="dict_personal_certificate_type" placeholder="请选择个人证件类型"/>
        </a-form-item>
        <a-form-item label="个人证件编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['contactsNo']" placeholder="请输入个人证件编号"></a-input>
        </a-form-item>
        <a-form-item label="照片地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-image-upload isMultiple v-decorator="['contactsPhotoUrl']"></j-image-upload>
        </a-form-item>
        <a-form-item label="来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['accessSysId']" :trigger-change="true" dictCode="dict_info_source" placeholder="请选择来源"/>
        </a-form-item>
        <a-form-item label="联系人信息真实性" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['contactsVerified', validatorRules.contactsVerified]" :trigger-change="true" dictCode="dict_customer_authenticity" placeholder="请选择联系人信息真实性"/>
        </a-form-item>
        <a-form-item label="联系人信息状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['contactsInfoStatus', validatorRules.contactsInfoStatus]" :trigger-change="true" dictCode="dict_customer_info_status" placeholder="请选择联系人信息状态"/>
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
  import JImageUpload from '@/components/jeecg/JImageUpload'
  import JDictSelectTag from "@/components/dict/JDictSelectTag"



  export default {
    name: "CustContactsModal",
    components: { 
      JDate,
      JImageUpload,
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
          contactsName: {
            rules: [
              { required: true, message: '请输入联系人姓名!'},
            ]
          },
          contactsPhone: {
            rules: [
              { required: true, message: '请输入联系人电话!'},
            ]
          },
          contactsPhone2: {
            rules: [
              { required: true, message: '请输入联系人电话2!'},
            ]
          },
          contactsGender: {
            rules: [
              { required: true, message: '请输入性别!'},
            ]
          },
          contactsVerified: {
            rules: [
              { required: true, message: '请输入联系人信息真实性!'},
            ]
          },
          contactsInfoStatus: {
            rules: [
              { required: true, message: '请输入联系人信息状态!'},
            ]
          },
        },
        url: {
          add: "/cust/custContacts/add",
          edit: "/cust/custContacts/edit",
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
          this.form.setFieldsValue(pick(this.model,'customerUid','contactsName','contactsPhone','contactsPhone2','contactsGender','contactsHobby','contactsNation','contactsBronData','contactsIdTypeId','contactsNo','contactsPhotoUrl','accessSysId','contactsVerified','contactsInfoStatus'))
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
        this.form.setFieldsValue(pick(row,'customerUid','contactsName','contactsPhone','contactsPhone2','contactsGender','contactsHobby','contactsNation','contactsBronData','contactsIdTypeId','contactsNo','contactsPhotoUrl','accessSysId','contactsVerified','contactsInfoStatus'))
      },

      
    }
  }
</script>