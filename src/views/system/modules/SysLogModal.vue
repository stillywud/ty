<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{style:{display:'none'}}"
    switchFullscreen
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="日志类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['logType']" :trigger-change="true" dictCode="log_type" :disabled="disableSubmit"/>
        </a-form-item>
        <a-form-item label="菜单等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['menuLevel']"  :readOnly="disableSubmit"/>
        </a-form-item>
        <a-form-item label="日志标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['title']"  :readOnly="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="日志内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['logContent']" rows="4" :readOnly="disableSubmit"/>
        </a-form-item>
        <a-form-item label="操作用户账号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['userid']"  :readOnly="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="操作用户名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['username']"  :readOnly="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="IP" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['ip']"  :readOnly="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="请求类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['requestType']"  :readOnly="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="请求路径" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['requestUrl']"  :readOnly="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="请求参数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['requestParam']" rows="4"  :readOnly="disableSubmit"/>
        </a-form-item>
        <a-form-item label="请求java方法" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['method']"  :readOnly="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="耗时" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['costTime']"  :disabled="disableSubmit" style="width: 100%"/>
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
    name: "SysLogModal",
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
          add: "/logdetail/sysLog/add",
          edit: "/logdetail/sysLog/edit",
        },
        disableSubmit:true
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
        // select字典转换只接受字符串
        this.model.logType = this.model.logType+"";
        this.model.operateType = this.model.operateType+"";
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'logType','logContent','operateType','userid','username','ip','method','requestUrl','requestParam','requestType','costTime','grantType','sysId','title','menuLevel'))
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
        this.form.setFieldsValue(pick(row,'logType','logContent','operateType','userid','username','ip','method','requestUrl','requestParam','requestType','costTime','grantType','sysId','title','menuLevel'))
      },

      
    }
  }
</script>