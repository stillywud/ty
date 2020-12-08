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

        <a-form-item label="上级联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['contactsUpUid', validatorRules.contactsUpUid]" :trigger-change="true" dictCode="cust_contacts,contacts_name,id" placeholder="请选择上级联系人"/>
        </a-form-item>
        <a-form-item label="下级联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['contactsDownUid', validatorRules.contactsDownUid]" :trigger-change="true" dictCode="cust_contacts,contacts_name,id" placeholder="请选择下级联系人"/>
        </a-form-item>
        <a-form-item label="联系人关系类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['contactsRelTypeId']" :trigger-change="true" dictCode="dict_contacts_rel_type" placeholder="请选择联系人关系类型"/>
        </a-form-item>
        <a-form-item label="上级联系人电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['contactsUpPhone']" placeholder="请输入上级联系人电话"></a-input>
        </a-form-item>
        <a-form-item label="当前联系人所属客户" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerUid']" :trigger-change="true" dictCode="cust_basic,customer_name,id" placeholder="请选择当前联系人所属客户"/>
        </a-form-item>
        <a-form-item label="来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['accessSysId']" :trigger-change="true" dictCode="dict_info_source" placeholder="请选择来源"/>
        </a-form-item>
        <a-form-item label="来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['accessSysName']" placeholder="请输入来源"></a-input>
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
    name: "CustContactsRelModal",
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
          contactsUpUid: {
            rules: [
              { required: true, message: '请输入上级联系人!'},
            ]
          },
          contactsDownUid: {
            rules: [
              { required: true, message: '请输入下级联系人!'},
            ]
          },
        },
        url: {
          add: "/cust/custContactsRel/add",
          edit: "/cust/custContactsRel/edit",
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
          this.form.setFieldsValue(pick(this.model,'contactsUpUid','contactsDownUid','contactsRelTypeId','contactsUpPhone','customerUid','accessSysId','accessSysName'))
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
        this.form.setFieldsValue(pick(row,'contactsUpUid','contactsDownUid','contactsRelTypeId','contactsUpPhone','customerUid','accessSysId','accessSysName'))
      },

      
    }
  }
</script>