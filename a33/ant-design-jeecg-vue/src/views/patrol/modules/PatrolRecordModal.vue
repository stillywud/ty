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

        <a-form-item label="巡检类别编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['categoryCode', validatorRules.categoryCode]" placeholder="请输入巡检类别编码"></a-input>
        </a-form-item>
        <a-form-item label="JSON模板版本号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['templateVersion', validatorRules.templateVersion]" placeholder="请输入JSON模板版本号" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择开始时间" v-decorator="['startTime', validatorRules.startTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择结束时间" v-decorator="['endTime', validatorRules.endTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="巡检json数据" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['recordJson', validatorRules.recordJson]" placeholder="请输入巡检json数据"></a-input>
        </a-form-item>
        <a-form-item label="创建人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['createBy', validatorRules.createBy]" placeholder="请输入创建人"></a-input>
        </a-form-item>
        <a-form-item label="创建日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择创建日期" v-decorator="['createTime', validatorRules.createTime]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'  



  export default {
    name: "PatrolRecordModal",
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
          categoryCode: {
            rules: [
              { required: true, message: '请输入巡检类别编码!'},
            ]
          },
          templateVersion: {
            rules: [
              { required: true, message: '请输入JSON模板版本号!'},
            ]
          },
          startTime: {
            rules: [
              { required: true, message: '请输入开始时间!'},
            ]
          },
          endTime: {
            rules: [
              { required: true, message: '请输入结束时间!'},
            ]
          },
          recordJson: {
            rules: [
              { required: true, message: '请输入巡检json数据!'},
            ]
          },
          createBy: {
            rules: [
              { required: true, message: '请输入创建人!'},
            ]
          },
          createTime: {
            rules: [
              { required: true, message: '请输入创建日期!'},
            ]
          },
        },
        url: {
          add: "/patrol/patrolRecord/add",
          edit: "/patrol/patrolRecord/edit",
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
          this.form.setFieldsValue(pick(this.model,'categoryCode','templateVersion','startTime','endTime','recordJson','createBy','createTime'))
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
        this.form.setFieldsValue(pick(row,'categoryCode','templateVersion','startTime','endTime','recordJson','createBy','createTime'))
      },

      
    }
  }
</script>