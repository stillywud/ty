<template>
  <j-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-row>

          <a-col :xs="24" :sm="12">
            <a-form-item label="租户名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dictsysVclbrand', validatorRules.dictsysVclbrand]" placeholder="请输入租户名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="租户简称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dictsysShortname']" placeholder="请输入租户简称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="租户首页标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dictsysSysname', validatorRules.dictsysSysname]" placeholder="请输入租户首页标题"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="用户名前缀" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['userPrefix', validatorRules.userPrefix]" placeholder="请输入用户名前缀"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="数据库名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dictsysDb', validatorRules.dictsysDb]" placeholder="请输入数据库名称" :readOnly="disableSubmit"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="数据库服务器IP" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dictsysDburl', validatorRules.dictsysDburl]" placeholder="请输入数据库服务器IP" :readOnly="disableSubmit"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="数据库端口号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dictsysDbport', validatorRules.dictsysDbport]" placeholder="请输入数据库端口号" :readOnly="disableSubmit"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="数据库访问账号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dictsysDbuser', validatorRules.dictsysDbuser]" placeholder="请输入数据库访问账号" :readOnly="disableSubmit"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="数据库访问密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dictsysDbpwd', validatorRules.dictsysDbpwd]" placeholder="请输入数据库访问密码" :readOnly="disableSubmit"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="短信账号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['verifycodeAcnt', validatorRules.verifycodeAcnt]" placeholder="请输入短信账号"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="短信密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['verifycodePwd', validatorRules.verifycodePwd]" placeholder="请输入短信密码"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="短信发送者" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['verifycodeMsg', validatorRules.verifycodeMsg]" placeholder="请输入短信发送者"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="登录验证码时长" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['verifycodeTimeforlogin', validatorRules.verifycodeTimeforlogin]" placeholder="请输入登录验证码时长(分)" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="重置密码验证码时长" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['verifycodeTimeforresetpwd', validatorRules.verifycodeTimeforresetpwd]" placeholder="请输入重置密码验证码时长(分)" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="修改密码验证码时长" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['verifycodeTimeforupdatepwd', validatorRules.verifycodeTimeforupdatepwd]" placeholder="请输入修改密码验证码时长(分)" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="消息队列服务器" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['queueServer', validatorRules.queueServer]" placeholder="请输入消息队列服务器"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="消息队列端口" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['queuePort', validatorRules.queuePort]" placeholder="请输入消息队列端口"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="消息队列登录ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['queueId', validatorRules.queueId]" placeholder="请输入消息队列登录ID"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="消息队列登录密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['queuePwd', validatorRules.queuePwd]" placeholder="请输入消息队列登录密码"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="Exchange" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['queueExchange', validatorRules.queueExchange]" placeholder="请输入Exchange"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="队列名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['queueName', validatorRules.queueName]" placeholder="请输入队列名称"></a-input>
            </a-form-item>
          </a-col>
<!--          <a-col :xs="24" :sm="12">-->
<!--            <a-form-item label="手机号可重复" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <j-dict-select-tag type="list" v-decorator="['mobileDuplicate', validatorRules.mobileDuplicate]" :trigger-change="true" dictCode="flag_yorn" placeholder="请选择手机号可重复"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :xs="24" :sm="12">
            <a-form-item label="是否限制一端登录" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['kickout', validatorRules.kickout]" :trigger-change="true" dictCode="flag_yorn" placeholder="请选择是否限制一端登录"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="账号到期提醒" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['acntEffectiveReminddays', validatorRules.acntEffectiveReminddays]" placeholder="请输入账号到期前几天提醒" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="账号默认有效天数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['acntEffectiveUsedays', validatorRules.acntEffectiveUsedays]" placeholder="请输入账号默认有效天数" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="密码默认有效天数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['passEffectiveUsedays', validatorRules.passEffectiveUsedays]" placeholder="请输入密码默认有效天数" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="加密方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['encryptionType', validatorRules.encryptionType]" :trigger-change="true" dictCode="encryption_type" placeholder="请选择加密方式"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item label="限制密码强度" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['passwordLevelIsuse', validatorRules.passwordLevelIsuse]" :trigger-change="true" dictCode="flag_yorn" placeholder="请选择限制密码强度"/>
            </a-form-item>
          </a-col>
<!--          <a-col :xs="24" :sm="12">-->
<!--            <a-form-item label="密码最短长度" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <a-input-number v-decorator="['passwordLevelMinlength', validatorRules.passwordLevelMinlength]" placeholder="请输入密码最短长度" style="width: 100%"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :xs="24" :sm="12">-->
<!--            <a-form-item label="密码最大长度" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <a-input-number v-decorator="['passwordLevelMaxlength', validatorRules.passwordLevelMaxlength]" placeholder="请输入密码最大长度" style="width: 100%"/>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :span="24">
            <a-form-item label="密码强度正则-强" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <a-textarea v-decorator="['passwordLevelHigh', validatorRules.passwordLevelHigh]" rows="4" placeholder="请输入密码强度正则-强"/>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="密码强度正则-中" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <a-textarea v-decorator="['passwordLevelMiddle', validatorRules.passwordLevelMiddle]" rows="4" placeholder="请输入密码强度正则-中"/>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="密码强度正则-弱" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <a-textarea v-decorator="['passwordLevelLow', validatorRules.passwordLevelLow]" rows="4" placeholder="请输入密码强度正则-弱"/>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="备注" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <a-textarea v-decorator="['remark']" rows="4" placeholder="请输入备注"/>
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>

      <!-- 子表单区域 -->
      <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane tab="租户-服务域名表" :key="refKeys[0]" :forceRender="true">
          <j-editable-table
            :ref="refKeys[0]"
            :loading="dictSystemDomainTable.loading"
            :columns="dictSystemDomainTable.columns"
            :dataSource="dictSystemDomainTable.dataSource"
            :maxHeight="300"
            :rowNumber="true"
            :rowSelection="true"
            :actionButton="true"/>
        </a-tab-pane>

      </a-tabs>

    </a-spin>
  </j-modal>
</template>

<script>

  import pick from 'lodash.pick'
  import { FormTypes,getRefPromise } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import { validateDuplicateValue } from '@/utils/util'
  import JDictSelectTag from "@/components/dict/JDictSelectTag"

  export default {
    name: 'DictSystemModal',
    mixins: [JEditableTableMixin],
    components: {
      JDictSelectTag,
    },
    data() {
      return {
        disableSubmit: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        labelCol2: {
          xs: { span: 24 },
          sm: { span: 3 },
        },
        wrapperCol2: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
          dictsysSysname: {
            rules: [
              { required: true, message: '请输入租户首页标题!'},
              { validator: (rule, value, callback) => validateDuplicateValue('dict_system', 'dictsys_sysname', value, this.model.id, callback)},
            ]
          },
          dictsysVclbrand: {
            rules: [
              { required: true, message: '请输入租户名称!'},
              { validator: (rule, value, callback) => validateDuplicateValue('dict_system', 'dictsys_vclbrand', value, this.model.id, callback)},
            ]
          },
          dictsysDb: {
            rules: [
              { required: true, message: '请输入数据库名称!'},
              { validator: (rule, value, callback) => validateDuplicateValue('dict_system', 'dictsys_db', value, this.model.id, callback)},
            ]
          },
          dictsysDbport: {
            rules: [
              { required: true, message: '请输入数据库端口号!'},
            ]
          },
          dictsysDbuser: {
            rules: [
              { required: true, message: '请输入数据库账号!'},
            ]
          },
          dictsysDbpwd: {
            rules: [
              { required: true, message: '请输入数据库密码!'},
            ]
          },
          dictsysDburl: {
            rules: [
              { required: true, message: '请输入数据库服务器IP!'},
            ]
          },
          userPrefix: {
            rules: [
              { required: true, message: '请输入用户名前缀!'},
            ]
          },
          verifycodeAcnt: {
            rules: [
              { required: true, message: '请输入短信账号!'},
            ]
          },
          verifycodePwd: {
            rules: [
              { required: true, message: '请输入短信密码!'},
            ]
          },
          verifycodeMsg: {
            rules: [
              { required: true, message: '请输入短信发送者!'},
            ]
          },
          verifycodeTimeforlogin: {
            rules: [
              { required: true, message: '请输入登录验证码时长!'},
              { pattern: /^-?\d+$/, message: '请输入整数!'},
            ]
          },
          verifycodeTimeforresetpwd: {
            rules: [
              { required: true, message: '请输入重置密码验证码时长!'},
              { pattern: /^-?\d+$/, message: '请输入整数!'},
            ]
          },
          verifycodeTimeforupdatepwd: {
            rules: [
              { required: true, message: '请输入修改密码验证码时长!'},
              { pattern: /^-?\d+$/, message: '请输入整数!'},
            ]
          },
          // mobileDuplicate: {
          //   rules: [
          //     { required: true, message: '请输入手机号可重复!'},
          //   ]
          // },
          queueServer: {
            rules: [
              { required: true, message: '请输入消息队列服务器!'},
            ]
          },
          queuePort: {
            rules: [
              { required: true, message: '请输入消息队列端口!'},
              { pattern: /^-?\d+$/, message: '请输入整数!'},
            ]
          },
          queueId: {
            rules: [
              { required: true, message: '请输入消息队列登录ID!'},
            ]
          },
          queuePwd: {
            rules: [
              { required: true, message: '请输入消息队列登录密码!'},
            ]
          },
          queueExchange: {
            rules: [
              { required: true, message: '请输入Exchange!'},
            ]
          },
          queueName: {
            rules: [
              { required: true, message: '请输入队列名称!'},
            ]
          },
          acntEffectiveReminddays: {
            rules: [
              { required: true, message: '请输入账号到期提醒!'},
              { pattern: /^-?\d+$/, message: '请输入整数!'},
            ]
          },
          acntEffectiveUsedays: {
            rules: [
              { required: true, message: '请输入账号默认有效天数!'},
              { pattern: /^-?\d+$/, message: '请输入整数!'},
            ]
          },
          passEffectiveUsedays: {
            rules: [
              { required: true, message: '请输入密码默认有效天数!'},
              { pattern: /^-?\d+$/, message: '请输入整数!'},
            ]
          },
          passwordLevelIsuse: {
            rules: [
              { required: true, message: '请输入限制密码强度!'},
            ]
          },
          // passwordLevelMinlength: {
          //   rules: [
          //     { required: true, message: '请输入密码最短长度!'},
          //   ]
          // },
          // passwordLevelMaxlength: {
          //   rules: [
          //     { required: true, message: '请输入密码最大长度!'},
          //   ]
          // },
          passwordLevelHigh: {
            rules: [
              { required: true, message: '请输入密码强度正则-强!'},
            ]
          },
          passwordLevelMiddle: {
            rules: [
              { required: true, message: '请输入密码强度正则-中!'},
            ]
          },
          passwordLevelLow: {
            rules: [
              { required: true, message: '请输入密码强度正则-弱!'},
            ]
          },
          kickout: {
            rules: [
              { required: true, message: '请输入是否限制一端登录!'},
            ]
          },
          encryptionType: {
            rules: [
              { required: true, message: '请输入加密方式!'},
            ]
          },
        },
        refKeys: ['dictSystemDomain', ],
        tableKeys:['dictSystemDomain', ],
        activeKey: 'dictSystemDomain',
        // 租户-服务域名表
        dictSystemDomainTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '域名',
              key: 'domain',
              type: FormTypes.input,
              width:"400px",
              placeholder: '请输入${title}',
              defaultValue: ''
            },
            {
              title: 'web服务器ip',
              key: 'webIp',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue: ''
            }
          ]
        },
        url: {
          add: "/tenant/dictSystem/add",
          edit: "/tenant/dictSystem/edit",
          dictSystemDomain: {
            list: '/tenant/dictSystem/queryDictSystemDomainByMainId'
          },
        }
      }
    },
    methods: {
      getAllTable() {
        let values = this.tableKeys.map(key => getRefPromise(this, key))
        return Promise.all(values)
      },
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        let fieldval = pick(this.model,'dictsysSysname','dictsysShortname','dictsysVclbrand','dictsysDb','dictsysDburl','dictsysDbport','dictsysDbuser','dictsysDbpwd','userPrefix','verifycodeAcnt','verifycodePwd','verifycodeMsg','verifycodeTimeforlogin','verifycodeTimeforresetpwd','verifycodeTimeforupdatepwd','queueServer','queuePort','queueId','queuePwd','queueExchange','queueName','acntEffectiveReminddays','acntEffectiveUsedays','passEffectiveUsedays','passwordLevelIsuse','passwordLevelMinlength','passwordLevelMaxlength','passwordLevelHigh','passwordLevelMiddle','passwordLevelLow','encryptionType','kickout','remark')
        this.$nextTick(() => {
          this.form.setFieldsValue(fieldval)
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.dictSystemDomain.list, params, this.dictSystemDomainTable)
        }
      },
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        return {
          ...main, // 展开
          dictSystemDomainList: allValues.tablesValue[0].values,
        }
      },
      validateError(msg){
        this.$message.error(msg)
      },
     popupCallback(row){
       this.form.setFieldsValue(pick(row,'dictsysSysname','dictsysShortname','dictsysVclbrand','dictsysDb','dictsysDburl','dictsysDbport','dictsysDbuser','dictsysDbpwd','userPrefix','verifycodeAcnt','verifycodePwd','verifycodeMsg','verifycodeTimeforlogin','verifycodeTimeforresetpwd','verifycodeTimeforupdatepwd','queueServer','queuePort','queueId','queuePwd','queueExchange','queueName','acntEffectiveReminddays','acntEffectiveUsedays','passEffectiveUsedays','passwordLevelIsuse','passwordLevelMinlength','passwordLevelMaxlength','passwordLevelHigh','passwordLevelMiddle','passwordLevelLow','encryptionType','kickout','remark'))
     },

    }
  }
</script>

<style scoped>
</style>