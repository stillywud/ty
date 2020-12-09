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

        <a-form-item label="系统" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-search-select-tag v-decorator="['sysId', validatorRules.sysId]" dict="sys_info,name,id,deleted=0" />
        </a-form-item>
        <a-form-item label="级别" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['level', validatorRules.level]" :trigger-change="true" dictCode="signal_level" placeholder="请选择级别"/>
        </a-form-item>
        <a-form-item label="业务名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['businessName', validatorRules.businessName]" placeholder="请输入业务名（数据对象/事务方法名）"></a-input>
        </a-form-item>
        <a-form-item label="队列名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['queueName', validatorRules.queueName]" placeholder="请输入队列名称"></a-input>
        </a-form-item>
        <a-form-item label="路由键" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['themeName', validatorRules.themeName]" placeholder="请输入路由键（格式：xx.xx.xx.xx，至少包含三个.）"></a-input>
        </a-form-item>
        <a-form-item label="触发行为CUD" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['triggerBehavior']" placeholder="请输入触发行为CUD"></a-input>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['remark']" placeholder="请输入备注"></a-input>
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
  import JSearchSelectTag from '@/components/dict/JSearchSelectTag'



  export default {
    name: "SignalRouterModal",
    components: { 
      JDictSelectTag,
      JSearchSelectTag,
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
          sysId: {
            rules: [
              { required: true, message: '请输入系统!'},
            ]
          },
          level: {
            rules: [
              { required: true, message: '请输入级别!'},
            ]
          },
          businessName: {
            rules: [
              { required: true, message: '请输入业务名!'},
            ]
          },
          queueName: {
            rules: [
              { required: true, message: '请输入队列名称!'},
            ]
          },
          themeName: {
            rules: [
              { required: true, message: '请输入路由键!'},
            ]
          },
        },
        url: {
          add: "/signal/signalRouter/add",
          edit: "/signal/signalRouter/edit",
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
          this.form.setFieldsValue(pick(this.model,'sysId','level','businessName', 'queueName', 'themeName','triggerBehavior','remark'))
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
        this.form.setFieldsValue(pick(row,'sysId','level','businessName','queueName', 'themeName','triggerBehavior','remark'))
      },

      
    }
  }
</script>