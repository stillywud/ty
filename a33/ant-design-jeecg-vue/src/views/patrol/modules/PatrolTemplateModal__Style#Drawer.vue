<template>
  <a-drawer
    :title="title"
    :width="width"
    placement="right"
    :closable="false"
    @close="close"
    :visible="visible">
  
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="类别编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['categoryCode', validatorRules.categoryCode]" placeholder="请输入类别编码"></a-input>
        </a-form-item>
        <a-form-item label="版本号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['templateVersion', validatorRules.templateVersion]" placeholder="请输入版本号" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="本地存储路径" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['localPath', validatorRules.localPath]" placeholder="请输入本地存储路径"></a-input>
        </a-form-item>
        <a-form-item label="创建人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['createBy', validatorRules.createBy]" placeholder="请输入创建人"></a-input>
        </a-form-item>
        <a-form-item label="创建日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择创建日期" v-decorator="['createTime', validatorRules.createTime]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="是否为最新版本（1最新，0非最新）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['isNew', validatorRules.isNew]" placeholder="请输入是否为最新版本（1最新，0非最新）" style="width: 100%"/>
        </a-form-item>
        
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'  
  
  export default {
    name: "PatrolTemplateModal",
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
              { required: true, message: '请输入类别编码!'},
            ]
          },
          templateVersion: {
            rules: [
              { required: true, message: '请输入版本号!'},
            ]
          },
          localPath: {
            rules: [
              { required: true, message: '请输入本地存储路径!'},
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
          isNew: {
            rules: [
              { required: true, message: '请输入是否为最新版本（1最新，0非最新）!'},
            ]
          },
        },
        url: {
          add: "/patrol/patrolTemplate/add",
          edit: "/patrol/patrolTemplate/edit",
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
          this.form.setFieldsValue(pick(this.model,'categoryCode','templateVersion','localPath','createBy','createTime','isNew'))
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
        this.form.setFieldsValue(pick(row,'categoryCode','templateVersion','localPath','createBy','createTime','isNew'))
      }
      
    }
  }
</script>

<style lang="less" scoped>
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>