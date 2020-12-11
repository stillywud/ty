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

        <a-form-item label="机型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dictvtVcltype']" placeholder="请输入机型"></a-input>
        </a-form-item>
        <a-form-item label="品牌id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['dictvtDictvbId']" :trigger-change="true" dictCode="dict_vcl_vclbrand,dictvb_vclbrand,id" placeholder="请选择品牌id"/>
        </a-form-item>
        <a-form-item label="机种id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['dictvtDictvkId']" :trigger-change="true" dictCode="dict_vcl_vclkind,dictvk_vclkind,id" placeholder="请选择机种id"/>
        </a-form-item>
        <a-form-item label="吨级id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['dictvtDictvtonId']" :trigger-change="true" dictCode="dict_vcl_vclton,dictvton_ton,id" placeholder="请选择吨级id"/>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['dictvtRemark']" rows="4" placeholder="请输入备注"/>
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
    name: "DictVclVcltypeModal",
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
          add: "/vcl/dictVclVcltype/add",
          edit: "/vcl/dictVclVcltype/edit",
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
          this.form.setFieldsValue(pick(this.model,'dictvtVcltype','dictvtDictvbId','dictvtDictvkId','dictvtDictvtonId','dictvtRemark'))
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
        this.form.setFieldsValue(pick(row,'dictvtVcltype','dictvtDictvbId','dictvtDictvkId','dictvtDictvtonId','dictvtRemark'))
      },

      
    }
  }
</script>