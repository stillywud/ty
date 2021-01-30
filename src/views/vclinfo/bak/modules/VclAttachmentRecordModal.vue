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

        <a-form-item label="设备机号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['vclNo', validatorRules.vclNo]" :trigger-change="true" dictCode="" placeholder="请选择设备机号"/>
        </a-form-item>
        <a-form-item label="属具设备机号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['attachedVclNo', validatorRules.attachedVclNo]" :trigger-change="true" dictCode="" placeholder="请选择属具设备机号"/>
        </a-form-item>
        <a-form-item label="来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['accessSys', validatorRules.accessSys]" :trigger-change="true" dictCode="" placeholder="请选择来源"/>
        </a-form-item>
        <a-form-item label="记录状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['relRecordStatus', validatorRules.relRecordStatus]" :trigger-change="true" dictCode="" placeholder="请选择记录状态"/>
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
    name: "VclAttachmentRecordModal",
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
          vclNo: {
            rules: [
              { required: true, message: '请输入设备机号!'},
            ]
          },
          attachedVclNo: {
            rules: [
              { required: true, message: '请输入属具设备机号!'},
            ]
          },
          accessSys: {
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
          add: "/vcl/vclAttachmentRecord/add",
          edit: "/vcl/vclAttachmentRecord/edit",
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
          this.form.setFieldsValue(pick(this.model,'vclNo','attachedVclNo','accessSys','relRecordStatus'))
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
        this.form.setFieldsValue(pick(row,'vclNo','attachedVclNo','accessSys','relRecordStatus'))
      },

      
    }
  }
</script>