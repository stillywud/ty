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
          <a-input v-decorator="['vclNo', validatorRules.vclNo]" placeholder="请输入设备机号"></a-input>
        </a-form-item>
        <a-form-item label="资产号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['vclAssetnumber']" placeholder="请输入资产号"></a-input>
        </a-form-item>
        <a-form-item label="品牌" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['dictvbId', validatorRules.dictvbId]" :trigger-change="true" dictCode="dict_vcl_vclbrand,dictvb_vclbrand,id" placeholder="请选择品牌"/>
        </a-form-item>
        <a-form-item label="机种" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['dictvkId', validatorRules.dictvkId]" :trigger-change="true" dictCode="dict_vcl_vclkind,dictvk_vclkind,id" placeholder="请选择机种"/>
        </a-form-item>
        <a-form-item label="吨级" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['dictvtonId', validatorRules.dictvtonId]" :trigger-change="true" dictCode="dict_vcl_vclton,dictvton_ton,id" placeholder="请选择吨级"/>
        </a-form-item>
        <a-form-item label="机型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['dictvtId', validatorRules.dictvtId]" :trigger-change="true" dictCode="dict_vcl_vcltype,dictvt_vcltype,id" placeholder="请选择机型"/>
        </a-form-item>
        <a-form-item label="规格" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['dictvsId', validatorRules.dictvsId]" :trigger-change="true" dictCode="dict_vcl_vclstandard,dictvs_name,id" placeholder="请选择规格"/>
        </a-form-item>
        <a-form-item label="发动机型号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['vclEnginemodel']" :trigger-change="true" dictCode="dict_vcl_enginemodel" placeholder="请选择发动机型号"/>
        </a-form-item>
        <a-form-item label="发动机序列号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['vclEgnno']" placeholder="请输入发动机序列号"></a-input>
        </a-form-item>
        <a-form-item label="制造年份" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择制造年份" v-decorator="['productionDate']" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="交机日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择交机日期" v-decorator="['deliveryDate']" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="作业内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['vclJobcontent']" placeholder="请输入作业内容"></a-input>
        </a-form-item>
        <a-form-item label="作业对象" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['vclWorktarget']" :trigger-change="true" dictCode="dict_vcl_worktarget" placeholder="请选择作业对象"/>
        </a-form-item>
        <a-form-item label="所属行业" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['industryId']" :trigger-change="true" dictCode="dict_customer_industry" placeholder="请选择所属行业"/>
        </a-form-item>
        <a-form-item label="设备别名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['vclMachinealias']" placeholder="请输入设备别名"></a-input>
        </a-form-item>
        <a-form-item label="是否超级质保" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['superWarranty']" :trigger-change="true" dictCode="dict_whether" placeholder="请选择是否超级质保"/>
        </a-form-item>
        <a-form-item label="质保协议类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['warrantyAgreement']" :trigger-change="true" dictCode="dict_warranty_agreement" placeholder="请选择质保协议类型"/>
        </a-form-item>
        <a-form-item label="质保时长" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['warrantyDuration']" placeholder="请输入质保时长"></a-input>
        </a-form-item>
        <a-form-item label="质保截止日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['vclWarrantyperiod']" placeholder="请输入质保截止日期"></a-input>
        </a-form-item>
        <a-form-item label="当前质保状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['vclSafeguardstate']" :trigger-change="true" dictCode="dict_vcl_safeguardstate" placeholder="请选择当前质保状态"/>
        </a-form-item>
        <a-form-item label="销售经销商名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dealerName']" placeholder="请输入销售经销商名称"></a-input>
        </a-form-item>
        <a-form-item label="最新工作小时数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['smr']" placeholder="请输入最新工作小时数" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="最新设备位置" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['lastLocation']" placeholder="请输入最新设备位置"></a-input>
        </a-form-item>
        <a-form-item label="最新纬度" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['lat']" placeholder="请输入最新纬度" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="最新经度" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['lon']" placeholder="请输入最新经度" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="是否安装附属装置" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['accessory']" :trigger-change="true" dictCode="dict_accessories" placeholder="请选择是否安装附属装置"/>
        </a-form-item>
        <a-form-item label="整机照片地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['vclImg']" placeholder="请输入整机照片地址"></a-input>
        </a-form-item>
        <a-form-item label="铭牌图片地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['vclCardImg']" placeholder="请输入铭牌图片地址"></a-input>
        </a-form-item>
        <a-form-item label="来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['accessSysId']" :trigger-change="true" dictCode="dict_info_source" placeholder="请选择来源"/>
        </a-form-item>
        <a-form-item label="设备状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['vclStatus']" :trigger-change="true" dictCode="dict_vcl_status" placeholder="请选择设备状态"/>
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
  import JDictSelectTag from "@/components/dict/JDictSelectTag"



  export default {
    name: "VclInfoModal",
    components: { 
      JDate,
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
          dictvbId: {
            rules: [
              { required: true, message: '请输入品牌!'},
            ]
          },
          dictvkId: {
            rules: [
              { required: true, message: '请输入机种!'},
            ]
          },
          dictvtonId: {
            rules: [
              { required: true, message: '请输入吨级!'},
            ]
          },
          dictvtId: {
            rules: [
              { required: true, message: '请输入机型!'},
            ]
          },
          dictvsId: {
            rules: [
              { required: true, message: '请输入规格!'},
            ]
          },
        },
        url: {
          add: "/vcl/vclInfo/add",
          edit: "/vcl/vclInfo/edit",
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
          this.form.setFieldsValue(pick(this.model,'vclNo','vclAssetnumber','dictvbId','dictvkId','dictvtonId','dictvtId','dictvsId','vclEnginemodel','vclEgnno','productionDate','deliveryDate','vclJobcontent','vclWorktarget','industryId','vclMachinealias','superWarranty','warrantyAgreement','warrantyDuration','vclWarrantyperiod','vclSafeguardstate','dealerName','smr','lastLocation','lat','lon','accessory','vclImg','vclCardImg','accessSysId','vclStatus'))
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
        this.form.setFieldsValue(pick(row,'vclNo','vclAssetnumber','dictvbId','dictvkId','dictvtonId','dictvtId','dictvsId','vclEnginemodel','vclEgnno','productionDate','deliveryDate','vclJobcontent','vclWorktarget','industryId','vclMachinealias','superWarranty','warrantyAgreement','warrantyDuration','vclWarrantyperiod','vclSafeguardstate','dealerName','smr','lastLocation','lat','lon','accessory','vclImg','vclCardImg','accessSysId','vclStatus'))
      },

      
    }
  }
</script>