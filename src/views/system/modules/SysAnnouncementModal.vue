<template>
  <a-modal
    :title="title"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :okButtonProps="{ props: {disabled: disabled} }"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row style="width: 100%;">
          <a-col :span="24/2">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="标题">
              <a-input placeholder="请输入标题" v-decorator="['titile', validatorRules.title]"  :disabled="disableSubmit"/>
            </a-form-item>
          </a-col>
          <a-col :span="24/2">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="提醒类型">
              <j-dict-select-tag v-decorator="['remindType']" placeholder="请选择提醒类型" :isSelected="true"
                                 :trigger-change="true" dictCode="msgType"  :disabled="disableSubmit"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%;">
          <a-col :span="24/2">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="重复间隔">
              <a-input placeholder="请输入重复间隔" v-decorator="['repeatIntern']"  :disabled="disableSubmit"/>
            </a-form-item>
          </a-col>
          <a-col :span="24/2">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="重复提醒单位">
              <j-dict-select-tag v-decorator="['repeatUnit']" placeholder="请选择重复提醒单位"
                                 :trigger-change="true" dictCode="repeat_unit"  :disabled="disableSubmit"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%;">
          <a-col :span="24/2">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="优先级">
              <a-select
                v-decorator="[ 'priority', {}]"
                placeholder="请选择优先级"
                :disabled="disableSubmit"
                :getPopupContainer = "(target) => target.parentNode">
                <a-select-option value="L">低</a-select-option>
                <a-select-option value="M">中</a-select-option>
                <a-select-option value="H">高</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24/2">
            <a-form-item label="消息类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['msgCategory', validatorRules.msgCategory]"
                                 dictCode="sys_msg_config,name,id,deleted=0"
                                 :disabled="disableSubmit"
                                 :trigger-change="true"  placeholder="请选择消息类别" @change="handleChange"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%;">
          <a-col :span="24/2">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="通告类型"
              v-if="isMsgType"
            >
              <a-select
                v-decorator="[ 'msgType', validatorRules.msgType]"
                placeholder="请选择通告类型"
                :disabled="disableSubmit"
                @change="chooseMsgType"
                :getPopupContainer = "(target) => target.parentNode">
                <a-select-option value="USER">指定用户</a-select-option>
                <a-select-option value="ALL">全体用户</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24/2">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指定用户"
              v-if="userType">
              <a-select
                :disabled="disableSubmit"
                v-decorator="[ 'selectedUser', validatorRules.selectedUser]"
                mode="multiple"
                placeholder="请选择指定用户"
                @dropdownVisibleChange="selectUserIds"
              >
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%;">
          <a-col :span="24">
            <a-form-item
              :labelCol="labelColX1"
              :wrapperCol="wrapperColX1"
              label="消息摘要">
              <a-textarea placeholder="请输入消息摘要"  :disabled="disableSubmit" v-decorator="['msgAbstract',validatorRules.msgAbstract]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%;">
          <a-col :span="24">
            <a-form-item
              :labelCol="labelColX1"
              :wrapperCol="wrapperColX1"
              label="内容"
              class="j-field-content">
              <j-editor v-decorator="[ 'msgContent', {} ]" triggerChange  :disabled="disableSubmit"></j-editor>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <select-user-list-modal ref="UserListModal" @choseUser="choseUser"></select-user-list-modal>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { getAction } from '@/api/manage'
  import JDate from '@/components/jeecg/JDate'
  import JEditor from '@/components/jeecg/JEditor'
  import SelectUserListModal from "./SelectUserListModal";
  import moment from 'moment'

  export default {
    components: { JEditor, JDate, SelectUserListModal},
    name: "SysAnnouncementModal",
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit:false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
        labelColX1: {
          xs: { span: 24 },
          sm: { span: 3 },
        },
        wrapperColX1: {
          xs: { span: 24 },
          sm: { span: 21 },
        },
        isMsgType:true,
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          title:{rules: [{ required: true, message: '请输入标题!' }]},
          msgCategory:{rules: [{ required: true, message: '请选择消息类别!' }]},
          msgType:{rules: [{ required: true, message: '请选择通告对象类型!' }]},
          selectedUser:{rules: [{ required: true, message: '请选择指定用户!' }]},
          msgAbstract:{rules: [{ required: true, message: '请输入消息摘要!' }]},
        },
        url: {
          queryByIds: "/sys/user/queryByIds",
          add: "/sys/annountCement/add",
          edit: "/sys/annountCement/edit",
          queryById: "/message/sysMsgConfig/queryById",
        },
        userType:false,
        userIds:[],
        selectedUser:[],
        disabled:false,
        msgContent:"",
      }
    },
    created () {
    },
    methods: {
      handleChange(val){
        this.queryById(val);
      },

      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = {}
        this.disable = false;
        this.visible = true;
        this.getUser(record);

      },
      getUser(record){
        this.model = Object.assign({}, record);
        // 指定用户 为订阅
        if(record&&(!record.msgType)){
          this.isMsgType=false
          this.userType=false
        }
        if(record&&record.msgType === "USER"){
          this.isMsgType=true;
          this.userType =  true;
          this.userIds = record.userIds;
          getAction(this.url.queryByIds,{userIds:this.userIds}).then((res)=>{
            if(res.success){
              for(var i=0;i<res.result.length;i++){
                this.selectedUser.push(res.result[i].realname);
              }
              this.form.setFieldsValue(
                {
                  selectedUser:this.selectedUser
                }
                )
              this.$refs.UserListModal.edit(res.result,this.userIds);
            }
          });
        }
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'endTime','startTime','titile','msgContent','sender','priority','msgCategory'
            ,'msgType','sendStatus','delFlag','msgAbstract','remindType','repeatIntern','repeatUnit'))
        });
      },
      close () {
        this.$emit('close');
        this.selectedUser = [];
        this.visible = false;
      },
      handleOk () {
        if(this.disableSubmit){
          return  false
        }
        const that = this;
        //当设置指定用户类型，但用户为空时，后台报错
        if(this.userType &&!(this.userIds!=null && this.userIds.length >0)){
            this.$message.warning('指定用户不能为空！')
            return;
          }
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
            if(this.userType){
              formData.userIds =  this.userIds;
            }
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
                that.resetUser();
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
        this.visible = false;
        this.$emit('close');
        this.resetUser();
      },
      resetUser (){
        this.userType =  false;
        this.userIds = [];
        this.selectedUser = [];
        this.disabled = false;
        this.$refs.UserListModal.edit(null,null);
      },
      queryById(id){
        let httpurl=this.url.queryById+'?id='+id;
        let method='get';
        httpAction(httpurl,{},method).then(res=>{
          if(res.code==200){
            this.model.msgType='';
            this.model.userIds='';
            this.model.selectedUser='';
            this.form.setFieldsValue({
              msgType:'',
              userIds:[],
              selectedUser:[],
            })
            if(res.result.msgType==1){
              this.isMsgType=false
              this.userType=false
            }else{
              this.isMsgType=true
              this.userType=false
            }

          }

        }).finally(()=>{

        })
      },
      selectUserIds() {
        this.$refs.UserListModal.add(this.selectedUser,this.userIds);
      },
      chooseMsgType(value) {
        this.selectedUser = [];
        this.userIds = [];
        if("USER" == value) {
          this.userType = true;

        } else {
          this.userType = false;

        }
      },
      // 子modal回调
      choseUser:function(userList){
        this.selectedUser = [];
        this.userIds = [];
        for(var i=0;i<userList.length;i++){
          this.selectedUser.push(userList[i].realname);
          this.userIds += userList[i].id+","
        }
       this.form.setFieldsValue({
         selectedUser: this.selectedUser
       })
      },
      startTimeValidate(rule,value,callback){
        let endTime = this.form.getFieldValue("endTime")
        if(!value || !endTime){
          callback()
        }else if(moment(value).isBefore(endTime)){
          callback()
        }else{
          callback("开始时间需小于结束时间")
        }
      },
      endTimeValidate(rule,value,callback){
        let startTime = this.form.getFieldValue("startTime")
        if(!value || !startTime){
          callback()
        }else if(moment(startTime).isBefore(value)){
          callback()
        }else{
          callback("结束时间需大于开始时间")
        }
      }

    }
  }
</script>

<style scoped>

</style>