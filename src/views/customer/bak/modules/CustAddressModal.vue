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

        <a-form-item label="地址类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['addressTypeId']" :trigger-change="true" dictCode="dict_address_type" placeholder="请选择地址类型"/>
        </a-form-item>
        <a-form-item label="地址类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['addressType']" placeholder="请输入地址类型"></a-input>
        </a-form-item>
        <a-form-item label="所属客户" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['customerUid']" :trigger-change="true" dictCode="cust_basic,customer_name,id" placeholder="请选择所属客户"/>
        </a-form-item>
        <a-form-item label="所属联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['contactsUid', validatorRules.contactsUid]" :trigger-change="true" dictCode="cust_contacts,contacts_name,id" placeholder="请选择所属联系人"/>
        </a-form-item>
        <a-form-item label="地址信息" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['addressInfo']" placeholder="请输入地址信息"></a-input>
        </a-form-item>
        <a-form-item label="详细地址描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['addressDetailInfo', validatorRules.addressDetailInfo]" placeholder="请输入详细地址描述"></a-input>
        </a-form-item>
        <a-form-item label="纬度" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['lat', validatorRules.lat]" placeholder="请输入纬度" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="经度" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['lon', validatorRules.lon]" placeholder="请输入经度" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="所属省" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['province']" :trigger-change="true" dictCode="" placeholder="请选择所属省"/>
        </a-form-item>
        <a-form-item label="所属市" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['city']" :trigger-change="true" dictCode="" placeholder="请选择所属市"/>
        </a-form-item>
        <a-form-item label="所属区县" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['county']" :trigger-change="true" dictCode="" placeholder="请选择所属区县"/>
        </a-form-item>
        <a-form-item label="来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['accessSysId']" :trigger-change="true" dictCode="dict_info_source" placeholder="请选择来源"/>
        </a-form-item>
        <a-form-item label="来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['accessSysName']" placeholder="请输入来源"></a-input>
        </a-form-item>
        <a-form-item label="地址信息状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['addressStatus']" :trigger-change="true" dictCode="dict_customer_info_status" placeholder="请选择地址信息状态"/>
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
    name: "CustAddressModal",
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
          contactsUid: {
            rules: [
              { required: true, message: '请输入所属联系人!'},
            ]
          },
          addressDetailInfo: {
            rules: [
              { required: true, message: '请输入详细地址描述!'},
            ]
          },
          lat: {
            rules: [
              { required: true, message: '请输入纬度!'},
            ]
          },
          lon: {
            rules: [
              { required: true, message: '请输入经度!'},
            ]
          },
        },
        url: {
          add: "/cust/custAddress/add",
          edit: "/cust/custAddress/edit",
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
          this.form.setFieldsValue(pick(this.model,'addressTypeId','addressType','customerUid','contactsUid','addressInfo','addressDetailInfo','lat','lon','province','city','county','accessSysId','accessSysName','addressStatus'))
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
        this.form.setFieldsValue(pick(row,'addressTypeId','addressType','customerUid','contactsUid','addressInfo','addressDetailInfo','lat','lon','province','city','county','accessSysId','accessSysName','addressStatus'))
      },

      
    }
  }
</script>