<template>
  <div :bordered="false" style="height: 100%" :class="'jeecg-online-modal'">
    <div v-if="(!disableSubmit) && hasOwnButton(1)">
      <a-button @click="openDoor" :class="single?'cust-button-switch-single':'cust-button-switch-many'">
        <a-icon type="fast-backward" />
      </a-button>
    </div>

    <div :class="btnBoxVisible?'show-drawer':'hide-drawer'" v-if="!disableSubmit && hasOwnButton(1)">
      <div class="jeecg-mask-cust" @click="closeDoor"></div>
      <div class="jeecg-drawer-content" :class="btnBoxVisible?'drawer-open':'drawer-close'">
        <div class="jeecg-drawer-header">自定义按钮</div>
        <div class="jeecg-drawer-body">
          <template v-for="btn in cgButtonList">
            <a-button
              v-if="btn.optPosition == '1'"
              :key="btn.id"
              type="primary"
              :icon="btn.buttonIcon"
              block
              @click="handleCgButtonClick(btn.optType,btn.buttonCode)">
              {{ btn.buttonName }}
            </a-button>
          </template>
        </div>
      </div>
    </div>

    <a-spin :spinning="confirmLoading">
      <online-tab-app
        ref="onlineForm"
        @onSuccess="handleSuccess"
        :formSchema="schema"
        :uiSchema="uiSchema"
        :single="single"
        :tree="treeForm"
        :enhanceStr="enhanceStr">
      </online-tab-app>
    </a-spin>

    <div style="text-align: center; margin: 10px">
      <template v-if="!disableSubmit && hasOwnButton(2)" v-for="btn in cgButtonList">
        <a-button
          v-if="btn.optPosition == '2'"
          :key="btn.id"
          type="primary"
          :icon="btn.buttonIcon"
          @click="handleCgButtonClick(btn.optType,btn.buttonCode)">
          {{ btn.buttonName }}
        </a-button>
      </template>

      <a-button v-if="!disableSubmit" key="submit" type="primary" @click="handleSubmit" :loading="submitLoading">确定</a-button>
    </div>
  </div>
</template>

<script>
  import OnlineTabApp from '@/components/online/autoform/OnlineTabApp.vue';
  import { getAction } from '@/api/manage'

  export default {
    name: "OnlCgformAutoFormTab",
    components: {
      OnlineTabApp
    },
    data () {
      return {
        visible: false,
        confirmLoading: false,
        disableSubmit:true,
        titleText:"操作",
        optMethod:"post",
        url:{
          loadFormItems:"/online/cgform/api/getFormItem/",
          loadEnhanceJs:"/online/cgform/api/getEnhanceJs/",
          optPre:"/online/cgform/api/form/",
          getColumns: '/online/cgform/api/getColumns/',
        },
        schema:{},
        uiSchema:{
          itemattrs: ""
        },
        single:true,
        treeForm:false,
        enhanceStr:'',
        modalStyle: { 'position': 'relative','overflow-x':'hidden' },
        cgButtonList:[],
        btnBoxVisible:false,
        btnBoxVisible2:false,

        submitLoading:false,
        formTemplate:"99",
        code:'',
        tbName:'',
        dataId:'',
        opeType:'add'
      }
    },
    created () {
      console.log(this.$route.params)
      this.code = this.$route.params.code
      // this.initAutoList(code, dataId, opeType)

    },
    methods: {
      initAutoList(code, dataId, opeType){
        this.code = code
        this.dataId = dataId
        this.opeType = opeType
        getAction(`${this.url.getColumns}${this.code}`).then((res)=>{
          if(res.success){
            this.formTemplate = res.result.formTemplate
            this.dbName = res.result.currentTableName
            this.loadFormItems()
          }else{
            this.$message.warning(res.message)
          }
        })
      },
      loadFormItems(){
        getAction(`${this.url.loadFormItems}${this.code}`).then((res)=>{
          if(res.success){
            this.single = res.result.head.tableType==1
            this.schema = res.result.schema
            this.schema.url = this.url.optPre+this.code;
            this.treeForm = res.result.head.isTree=='Y'
            this.cgButtonList = (!res.result.cgButtonList)?[]:res.result.cgButtonList
            if(res.result.enhanceJs){
              this.enhanceStr = res.result.enhanceJs
            }else{
              this.enhanceStr=''
            }
            this.$nextTick(() => {
              if(this.$refs.onlineForm){
                this.$refs.onlineForm.createRootProperties()
              }
            });
            // 根据操作类型加载业务数据
            switch (this.opeType) {
              case "add": this.add(); break;
              case "edit": this.edit(this.dataId); break;
              case "detail": this.detail(this.dataId); break;
            }
          }
        });
      },
      handleSubmit () {
        this.submitLoading = true
        this.$refs.onlineForm.handleSubmit();
        setTimeout(()=>{
          this.submitLoading = false
        },3500)
      },
      handleSuccess(formdata,arr){
        if(this.treeForm === true){
          this.$emit('success',formdata,arr);
        }else{
          this.$emit('success');
        }
      },
      add (param) {
        this.titleText = "新增"
        this.uiSchema.method = "post"
        this.uiSchema.formTemplate = this.formTemplate
        this.uiSchema.url = this.url.optPre+this.code
        this.uiSchema = { ...this.uiSchema }
        this.visible = true
        this.disableSubmit = false
        this.$nextTick(() => {
          this.$refs.onlineForm.add(param)
        });
      },
      edit (id) {
        this.titleText = "编辑"
        this.uiSchema.method = "put"
        this.uiSchema.formTemplate = this.formTemplate
        this.uiSchema.url = this.url.optPre+this.code
        this.uiSchema = { ...this.uiSchema }
        this.visible = true
        this.disableSubmit = false
        getAction(this.url.optPre+this.code+"/"+id).then((res)=>{
          if(res.success){
            let record = res.result
            this.$refs.onlineForm.edit(record)
          }else{
            this.$message.warning(res.message)
          }
        })
      },
      detail(id){
        this.titleText = "详情"
        this.visible = true
        this.uiSchema.formTemplate = this.formTemplate
        this.uiSchema = { ...this.uiSchema }
        this.disableSubmit = true
        getAction(this.url.optPre+this.code+"/"+id).then((res)=>{
          if(res.success){
            let record = res.result
            this.$refs.onlineForm.detail(record)
          }else{
            this.$message.warning(res.message)
          }
        })
      },
      handleCgButtonClick(optType,buttonCode){
        this.$refs.onlineForm.handleCgButtonClick(optType,buttonCode,this.code)
      },
      openDoor(){
        if(this.btnBoxVisible2){
          setTimeout(()=>{
            this.btnBoxVisible2 = !this.btnBoxVisible2
          },1000)
        }else{
          this.btnBoxVisible2 = !this.btnBoxVisible2
        }
        this.btnBoxVisible = !this.btnBoxVisible
      },
      closeDoor(){
        this.btnBoxVisible = false
      },
      hasOwnButton(flag){
        if(!this.cgButtonList || this.cgButtonList.length==0){
          return false
        }else{
          let a = this.cgButtonList.filter(item=>{
            return item.optPosition == flag
          })
          return a && a.length>0
        }
      },


    }
  }
</script>

<style scoped >
  .avatar-uploader > .ant-upload {
    width:104px;
    height:104px;
  }
  .ant-upload-select-picture-card i {
    font-size: 49px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .ant-table-tbody .ant-table-row td{
    padding-top:10px;
    padding-bottom:10px;
  }

  .has-error .ant-form-explain, .has-error .ant-form-split {
    color: #f5222d;
    position: absolute;
  }


  .jeecg-mask-cust{
    height:0%;
    width: 100%;
    opacity:0.3;
    position: absolute;
    left:0;
    top:0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 999;
  }


  .jeecg-drawer-content{
    height:100%;
    background: #fff;
    box-shadow: 2px 2px 2px #fff;
  }
  .drawer-open{
    position: absolute;
    right:0;
    width:160px;
    top:0;
    transition: transform 1s;
  }
  .drawer-close{
    transform: translateX(100%);
    transition: transform linear 1s;
    position: absolute;
    right:0;
    width:200px;
    top:0;
    z-index: 10000;
  }
  .show-drawer{
    width: 100%;
  }
  .hide-drawer{
    width: 0;
  }

  .show-drawer .jeecg-drawer-content{
    height:100%;
    z-index: 10000;
  }

  .jeecg-drawer-header {
    padding: 16px;
    border-radius: 4px 4px 0 0;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    color: rgba(0, 0, 0, 0.85);
  }

  .jeecg-drawer-body {
    padding:0px 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .jeecg-drawer-body .ant-btn{
    margin-top:20px;
  }

  .show-drawer .jeecg-mask-cust{
    height:100%;
  }
  .cust-button-switch-single{
    position: absolute;top:220px;right:-5px;z-index: 1000;cursor: pointer;padding: 0 5px;font-size: 20px;
  }
  .cust-button-switch-many{
    position: absolute;top:220px;right:0px;z-index: 1000;cursor: pointer;padding: 0 5px;font-size: 20px;
  }


</style>
