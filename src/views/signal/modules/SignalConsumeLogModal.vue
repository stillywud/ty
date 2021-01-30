<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    switchFullscreen
    :ok-button-props="{ props: { disabled: true } }"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <j-form-container disabled>
        <a-form :form="form">

          <a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-date placeholder="请选择创建时间" v-decorator="['createTime']" :trigger-change="true"
                    :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
          </a-form-item>
          <a-form-item label="队列名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['queueName', validatorRules.queueName]" placeholder="请输入队列名称"></a-input>
          </a-form-item>
          <a-form-item label="路由键" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['themeName', validatorRules.themeName]" placeholder="请输入路由键"></a-input>
          </a-form-item>
          <a-form-item label="信令内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea v-decorator="['message']" rows="4" placeholder="请输入信令内容"/>
          </a-form-item>
          <a-form-item label="消息id" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number v-decorator="['messageId']" placeholder="请输入消息id" style="width: 100%"/>
          </a-form-item>

        </a-form>
      </j-form-container>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'  



  export default {
    name: "SignalConsumeLogModal",
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

        },
        url: {
          add: "/signal/signalConsumeLog/add",
          edit: "/signal/signalConsumeLog/edit",
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
          this.form.setFieldsValue(pick(this.model,'createTime','queueName','themeName','message','messageId'))
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleCancel () {
        this.close()
      },
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'createTime','queueName','themeName','message','messageId'))
      },

      
    }
  }
</script>