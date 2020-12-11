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
        <a-form-item v-if="!id" label="类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag v-model="categoryCode" placeholder="请选择"
                             dictCode="patrol_category,category_code,category_code"/>
<!--          v-model="categoryCode"-->
        </a-form-item>

        <a-form-item v-if="id" label="类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input disabled v-model="categoryCode"></a-input>
        </a-form-item>

        <a-form-item label="巡检模板" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--          v-decorator="['fileList',{ rules: [{ required: true, message: '' }] },]"-->
          <a-upload
            :file-list="fileList"
            :remove="handleRemove"
            :before-upload="beforeUpload">
            <a-button> <a-icon type="upload" /> 上传 </a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import JDate from '@/components/jeecg/JDate'



  export default {
    name: "PatrolTemplateModal",
    components: {
      JDate
    },
    data () {
      return {
        id:undefined,
        form: this.$form.createForm(this),
        fileList: [],
        title:"操作",
        width:800,
        visible: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        categoryCode: "请选择",
        url: {
          addOrEdit: "/patrol/patrolTemplate/addPatrolTemplate"
        }
      }
    },
    created () {
    },
    methods: {
      add () {
        this.fileList = [];
        this.categoryCode = "请选择"
        this.id = undefined;
        this.visible = true;
      },
      edit (record) {
        console.log(record)
        this.id = record.id;

        this.visible = true;
        // this.model = Object.assign({}, record);
        this.$nextTick(() => {
        //   this.form.setFieldsValue(pick(this.model,'categoryCode','templateVersion','localPath','createBy','createTime','isNew'))
          this.categoryCode = record.categoryCode
          this.fileList = []
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        if(this.categoryCode=="请选择"){
          this.$message.error("请选择类别")
          return false;
        }
        if(this.fileList.length == 0){
          this.$message.error("请上传模板文件")
          return false;
        }

        const that = this;
        that.confirmLoading = true;
        let method = 'post';
        let formData = new FormData();
        formData.set('uploadFile', that.fileList[0]);
        formData.set('categoryCode', that.categoryCode);
        console.log("表单提交数据",formData)
        httpAction(that.url.addOrEdit,formData,method).then((res)=>{
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
      },
      handleCancel () {
        this.close()
      },
      beforeUpload(file) {
        this.fileList = [file]
        return false;
      },
      handleRemove(file) {
        this.fileList = [];
      }
    }
  }
</script>