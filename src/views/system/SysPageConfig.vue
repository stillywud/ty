<template>
  <a-card :bordered="false">
    <a-spin :spinning="loading">
      <a-form :form="form" class="time-picker-bigger">

        <a-form-item label="系统显示名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['systemName']" placeholder="请输入系统显示名称"></a-input>
        </a-form-item>
        <a-form-item label="登录页背景图" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-image-upload isMultiple v-decorator="['backgroundPicture']"></j-image-upload>
        </a-form-item>
        <a-form-item label="登录页标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['title']" placeholder="请输入登录页标题"></a-input>
        </a-form-item>
        <a-form-item label="登录模块位置" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['loginPosition']" :trigger-change="true" dictCode="grid_position" placeholder="请选择登录模块位置"/>
        </a-form-item>
        <a-form-item label="ICP版权信息" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-editor v-decorator="['icp',{trigger:'input'}]"/>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['remark']" rows="4" placeholder="请输入备注"/>
        </a-form-item>

        <div class="bottom-btn">
          <a-button type="primary" @click="handleClickSubmit">保存</a-button>
        </div>

      </a-form>
    </a-spin>
  </a-card>
</template>

<script>
  import { getAction, postAction } from '@api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JImageUpload from '@/components/jeecg/JImageUpload'
  import JDictSelectTag from "@/components/dict/JDictSelectTag"
  import JEditor from '@/components/jeecg/JEditor'
  import Vue from "vue";

  export default {
    name: "SysPageConfig",
    components: {
      JImageUpload,
      JDictSelectTag,
      JEditor,
    },
    data () {
      return {
        form: this.$form.createForm(this),
        loading: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        url: {
          query: '/sysPageConfig/query',
          saveOrUpdate: '/sysPageConfig/saveOrUpdate'
        },
      }
    },
    created() {
      this.query()
    },
    methods: {
      query() {
        this.loading = true
        getAction(this.url.query).then(res => {
          let { result } = res
          if (result == null) {
            this.model = {}
          } else {
            this.model = result
          }
          Vue.ls.set('SYS_NAME', result.systemName, 12 * 60 * 60 * 1000)
          this.$emit("getPageConfig", result);
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model,
              'systemName',
              'backgroundPicture',
              'title',
              'loginPosition',
              'icp',
              'remark'
            ))
          })
        }).finally(() => {
          this.loading = false
        })
      },

      handleClickSubmit() {
        this.form.validateFields((err, values) => {
          if (!err) {
            // this.transFileListToString(values)
            let formData = Object.assign({}, this.model, values)
            this.loading = true
            postAction(this.url.saveOrUpdate, formData).then(res => {
              if (res.success) {
                this.$message.success('保存成功')
              } else throw res.message
            }).catch(e => {
              this.$warning({ title: '保存失败', content: (e || {}).message || e })
            }).finally(() => {
              this.loading = false
            })
          }
        })
      },

    }
  }
</script>

<style lang="less" scoped>
  .tip {
    color: #a0a0a0;
    margin-left: 10px;
  }
  .bottom-btn {
    width: 100%;
    border-top: 1px solid #e9e9e9;
    padding: 10px 16px;
    background: #fff;
    text-align: center;
  }
</style>