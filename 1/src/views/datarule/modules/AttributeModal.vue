<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="角色" :labelCol="labelCol" :wrapperCol="wrapperCol" style="margin-bottom: 0px">
          <span>{{role.roleName + (role.realname? '('+role.realname+')' : '')}}</span>
        </a-form-item>

        <a-form-item label="对象" :labelCol="labelCol" :wrapperCol="wrapperCol" style="margin-bottom: 0px">
          <span>{{entity.tableTxt}}</span>
        </a-form-item>

        <a-form-item label="属性" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{attr.dbFieldTxt+'('+attr.dbFieldName+')'}}</span>
        </a-form-item>

        <a-form-item label="条件" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['condition']"
                      placeholder="请输入条件SQL片段，如 'o.state' in (1, 2)"
                      :autosize="{ minRows: 6, maxRows: 6 }"/>
        </a-form-item>
        <a-form-item :label="entity.tableTxt" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-tag v-for="(attr,index) in entity.attrs" @click="tagOnClick(attr.dbFieldName)" :key="index">
            {{attr.dbFieldTxt+'('+attr.dbFieldName+')'}}
          </a-tag>
        </a-form-item>
        <a-form-item label="规则" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select placeholder="请选择" @change="onChange"
                    v-decorator="['select']">
            <a-select-option v-for="(rule, index) in rulesArray" :value="rule.name" :key="index"> 
              {{rule.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { queryAllAttrRule, addAttrRule, editAttrRule } from '@/api/api'

  export default {
    name: 'AttributeModal',
    data() {
      return {
        role: {},
        visible: false,
        confirmLoading: false,
        confirmDirty: false,
        entity: {},
        attr: {},
        rulesArray: [],
        title: '新增对象授权规则',
        condition: '',
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        form: this.$form.createForm(this)
      }
    },
    created() {
      console.log('created')
      this.getAllRules()
    },

    methods: {
      show(role, entity, attr) {
        this.role = role
        this.form.resetFields()
        this.visible = true
        this.entity = entity
        this.attr = attr
        if (!attr.ruleId) {
          this.title = '新增对象授权规则'
        } else {
          this.title = '编辑对象授权规则'
          this.$nextTick(() => {
            this.form.setFieldsValue({ condition: attr.condition })
            this.form.setFieldsValue({ select: attr.rule })
          })
        }
      },
      getAllRules() {
        this.confirmLoading = true
        queryAllAttrRule().then((res) => {
          if (res.success) {
            this.rulesArray = res.result
          } else {
            this.$message.warn('规则查询失败：' + res.message)
            console.error('实体查询失败:', res)
          }
        }).finally(() => {
          this.confirmLoading = false
        })
      },
      close() {
        this.$emit('close')
        this.visible = false
        this.disableSubmit = false
      },
      handleSubmit() {
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            let condition = this.form.getFieldValue('condition')
            let select = this.form.getFieldValue('select')
            if ((!condition || condition.trim()=='') && !select) {
              this.$message.warn('条件和规则请至少填写一项')
              return
            }
            this.confirmLoading = true
            // let formData = Object.assign(this.model, values)
            let data = {
              /**业务类型名称*/
              className: this.entity.tableName,
              /**业务类型属性名称*/
              attrName: this.attr.dbFieldName,
              /**（属性权限过滤规则）过滤条件*/
              attrCondition: condition ? condition.trim() : null,
              /**人号角色oid*/
              roleOid: this.role.id,
              /**属性权限过滤规则的名称*/
              ruleName: select
            }
            if (this.attr.ruleId) {
              data['id'] = this.attr.ruleId
              editAttrRule(data).then((res) => {
                if (res.success) {
                  this.$emit('ok')
                  this.close()
                } else {
                  this.$message.warn('新增失败：' + res.message)
                  console.error('新增失败:', res)
                }
              }).finally(() => {
                this.confirmLoading = false
              })
            } else {
              addAttrRule(data).then((res) => {
                if (res.success) {
                  this.$emit('ok')
                  this.close()
                } else {
                  this.$message.warn('新增失败：' + res.message)
                  console.error('新增失败:', res)
                }
              }).finally(() => {
                this.confirmLoading = false
              })
            }

            console.log(data)
          }
        })
      },
      handleCancel() {
        this.close()
      },
      handleConfirmBlur(e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },
      onChange(value) {
        console.log('onChange', value)
      },

      tagOnClick(id) {
        console.log('tagOnClick', id)
        let condition = this.form.getFieldValue('condition')
        if (!condition || condition == undefined) {
          condition =  'o.' + id
        } else {
          condition += ' o.' + id
        }
        this.form.setFieldsValue({ condition: condition })
      }
    }
  }
</script>