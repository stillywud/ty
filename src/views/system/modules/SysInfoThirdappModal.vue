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
        <a-form-item label="系统id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['sysId', validatorRules.sysId]" placeholder="请输入系统id" :disabled = 'true'></a-input>
        </a-form-item>
        <a-form-item label="第三方应用类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag v-decorator="[ 'thirdType', validatorRules.thirdType]" :triggerChange="true" title="第三方应用类型"
                             dictCode="third_type" placeholder="请输入第三方应用类型"/>
        </a-form-item>
        <a-form-item label="第三方应用名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['name', validatorRules.name]" placeholder="请输入第三方应用名称"></a-input>
        </a-form-item>
        <a-form-item label="appid" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['appid', validatorRules.appid]" placeholder="请输入appid"></a-input>
        </a-form-item>
        <a-form-item label="secrete" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['secrete', validatorRules.secrete]" placeholder="请输入secrete"></a-input>
        </a-form-item>
        <a-form-item label="corpId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['corpId', validatorRules.corpId]" placeholder="请输入corpId"></a-input>
        </a-form-item>
        <a-form-item label="agentId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['agentId', validatorRules.agentId]" placeholder="请输入agentId"></a-input>
        </a-form-item>
        <a-form-item label="第三方应用回调地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['callbackUrl']" placeholder="请输入第三方应用回调地址"></a-input>
        </a-form-item>

      </a-form>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import JDate from '@/components/jeecg/JDate'

  export default {
    name: "SysInfoThirdappModal",
    components: { 
      JDate,
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
          deleted: {
            rules: [
              { required: true, message: '请输入deleted!'},
            ]
          },
          sysId: {
            rules: [
              { required: true, message: '请输入系统id!'},
            ]
          },
          thirdType: {
            rules: [
              { required: true, message: '请输入第三方应用类型!'},
            ]
          },
          name: {
            rules: [
              { required: true, message: '请输入第三方应用名称!'},
            ]
          },
          appid: {
            rules: [
              { required: true, message: '请输入appid!'},
            ]
          },
          secrete: {
            rules: [
              { required: true, message: '请输入secrete!'},
            ]
          },
          corpId: {
            rules: [
            ]
          },
          agentId: {
            rules: [
            ]
          },
        },
        url: {
          add: "/system/sysInfoThirdapp/add",
          edit: "/system/sysInfoThirdapp/edit",
        }
      }
    },
    created () {
    },
    methods: {
      add (sysId) {
        this.edit({sysId});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'sysId','thirdType','name','appid','secrete','corpId','agentId','callbackUrl'))
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
        this.form.setFieldsValue(pick(row,'sysId','thirdType','name','appid','secrete','corpId','agentId','callbackUrl'))
      },

      
    }
  }
</script>