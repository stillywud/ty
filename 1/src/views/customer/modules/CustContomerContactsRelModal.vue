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
        <a-form-item label="联系人对应该客户的职务" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['contactsRelTypeId']" :trigger-change="true" dictCode="dict_customer_post" placeholder="请选择联系人对应该客户的职务"/>
        </a-form-item>
        <a-form-item label="联系人对应该客户的采购角色" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['contactsUpPhone']" :trigger-change="true" dictCode="dict_customer_purchase_role" placeholder="请选择联系人对应该客户的采购角色"/>
        </a-form-item>
        <a-form-item label="联系人对应该客户的影响力" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['contactsPower']" placeholder="请输入联系人对应该客户的影响力"></a-input>
        </a-form-item>
        <a-form-item label="联系人是否为该客户本人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['isCustomer']" :trigger-change="true" dictCode="dict_whether" placeholder="请选择联系人是否为该客户本人"/>
        </a-form-item>
        <a-form-item label="来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['accessSysId']" :trigger-change="true" dictCode="dict_info_source" placeholder="请选择来源"/>
        </a-form-item>
        <a-form-item label="关联状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerContactsRelStatus']" :trigger-change="true" dictCode="dict_association status" placeholder="请选择关联状态"/>
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
    name: "CustContomerContactsRelModal",
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
        },
        url: {
          add: "/cust/custContomerContactsRel/add",
          edit: "/cust/custContomerContactsRel/edit",
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
          this.form.setFieldsValue(pick(this.model,'customerUid','contactsRelTypeId','contactsUpPhone','contactsPower','isCustomer','accessSysId','customerContactsRelStatus'))
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
        this.form.setFieldsValue(pick(row,'customerUid','contactsRelTypeId','contactsUpPhone','contactsPower','isCustomer','accessSysId','customerContactsRelStatus'))
      },

      
    }
  }
</script>