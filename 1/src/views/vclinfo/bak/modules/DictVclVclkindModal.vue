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

        <a-form-item label="机种" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dictvkVclkind', validatorRules.dictvkVclkind]" placeholder="请输入机种"></a-input>
        </a-form-item>
        <a-form-item label="机种类别（1：非道路；2：道路）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['dictvkType', validatorRules.dictvkType]" placeholder="请输入机种类别（1：非道路；2：道路）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dictvkRemark']" placeholder="请输入备注"></a-input>
        </a-form-item>

      </a-form>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'



  export default {
    name: "DictVclVclkindModal",
    components: { 
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
          dictvkVclkind: {
            rules: [
              { required: true, message: '请输入机种!'},
            ]
          },
          dictvkType: {
            rules: [
              { required: true, message: '请输入机种类别（1：非道路；2：道路）!'},
            ]
          },
        },
        url: {
          add: "/vcl/dictVclVclkind/add",
          edit: "/vcl/dictVclVclkind/edit",
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
          this.form.setFieldsValue(pick(this.model,'dictvkVclkind','dictvkType','dictvkRemark'))
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
        this.form.setFieldsValue(pick(row,'dictvkVclkind','dictvkType','dictvkRemark'))
      },

      
    }
  }
</script>