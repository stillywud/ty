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
            <a-form-item label="组织架构名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['name', validatorRules.name]" placeholder="请输入组织架构名称"></a-input>
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
        <a-tab-pane tab="组织架构-应用系统" :key="refKeys[0]" :forceRender="true">
          <j-editable-table
            :ref="refKeys[0]"
            :loading="sysOrganizationSysinfoTable.loading"
            :columns="sysOrganizationSysinfoTable.columns"
            :dataSource="sysOrganizationSysinfoTable.dataSource"
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

  export default {
    name: 'SysOrganizationModal',
    mixins: [JEditableTableMixin],
    components: {
    },
    data() {
      return {
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
        addDefaultRowNum: 0,
        validatorRules: {
          name: {
            rules: [
              { required: true, message: '请输入组织架构名称!'},
              { validator: (rule, value, callback) => validateDuplicateValue('sys_organization', 'name', value, this.model.id, callback)},
            ]
          },
        },
        refKeys: ['sysOrganizationSysinfo', ],
        tableKeys:['sysOrganizationSysinfo', ],
        activeKey: 'sysOrganizationSysinfo',
        // 组织架构-应用系统
        sysOrganizationSysinfoTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '系统',
              key: 'sysId',
              type: FormTypes.sel_search,
              dictCode:"sys_info,name,id,deleted=0",
              width:"300px",
              placeholder: '请输入${title}',
              defaultValue: '',
              validateRules: [{ required: true, message: '${title}不能为空' }],
            },
            // {
            //   title: '生效日期',
            //   key: 'sysEff',
            //   type: FormTypes.date,
            //   width:"200px",
            //   placeholder: '请输入${title}',
            //   defaultValue: new Date(),
            // },
            // {
            //   title: '失效日期',
            //   key: 'sysExp',
            //   type: FormTypes.date,
            //   width:"200px",
            //   placeholder: '请输入${title}',
            //   defaultValue: '2099-12-31',
            // },
          ]
        },
        url: {
          add: "/system/sysOrganization/add",
          edit: "/system/sysOrganization/edit",
          sysOrganizationSysinfo: {
            list: '/system/sysOrganization/querySysOrganizationSysinfoByMainId'
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
        let fieldval = pick(this.model,'name','remark')
        this.$nextTick(() => {
          this.form.setFieldsValue(fieldval)
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.sysOrganizationSysinfo.list, params, this.sysOrganizationSysinfoTable)
        }
      },
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        return {
          ...main, // 展开
          sysOrganizationSysinfoList: allValues.tablesValue[0].values,
        }
      },
      validateError(msg){
        this.$message.error(msg)
      },
     popupCallback(row){
       this.form.setFieldsValue(pick(row,'name','remark'))
     },

    }
  }
</script>

<style scoped>
</style>