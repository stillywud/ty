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
        <a-form-item label="应用名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['appName']" placeholder="请输入应用名称"></a-input>
        </a-form-item>
        <a-form-item label="app_id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['appId']" placeholder="请输入app_id"></a-input>
        </a-form-item>
        <a-form-item label="app_key" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['appKey', validatorRules.appKey]" placeholder="请输入app_key"></a-input>
        </a-form-item>
        <a-form-item label="app_secret" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['appSecret', validatorRules.appSecret]" placeholder="请输入app_secret"></a-input>
        </a-form-item>
        <a-form-item label="app_secret" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['masterSecret', validatorRules.masterSecret]" placeholder="请输入master_secret"></a-input>
        </a-form-item>
        <a-form-item label="是否是默认推送" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['isDefault', validatorRules.isDefault]" :trigger-change="true" dictCode="flag_yorn" placeholder="请选择是否是默认推送"/>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['remark']" rows="4" placeholder="请输入备注"/>
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
    name: "SysApppushConfigModal",
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
          appKey: {
            rules: [
              { required: true, message: '请输入app_key!'},
            ]
          },
          appSecret: {
            rules: [
              { required: true, message: '请输入app_secret!'},
            ]
          },
          masterSecret: {
            rules: [
              { required: true, message: '请输入master_secret!'},
            ]
          },
          isDefault: {
            rules: [
              { required: true, message: '请输入是否是默认推送!'},
            ]
          },
        },
        url: {
          add: "/message/sysApppushConfig/add",
          edit: "/message/sysApppushConfig/edit",
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
          this.form.setFieldsValue(pick(this.model,'appId','appKey','appSecret','masterSecret','appName','isDefault','remark'))
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
        this.form.setFieldsValue(pick(row,'appId','appKey','appSecret','masterSecret','appName','isDefault','remark'))
      },

      
    }
  }
</script>