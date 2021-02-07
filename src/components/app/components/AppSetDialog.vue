<template>
  <el-dialog :visible.sync="show" :title="changeType==1?'设置筛选项': '设置样式'" append-to-body width="30%">
    <el-form ref="dialogForm" label-width="80" v-if="changeType==1">
      <!-- <el-form-item label="字段名称">
        <el-input v-model="formData.dbFieldName"  readonly></el-input>
      </el-form-item>
      <el-form-item label="字段备注">
        <el-input v-model="formData.dbFieldTxt"  readonly></el-input>
      </el-form-item> -->
      <el-form-item label="控件类型">
        <el-select v-model="formData.appQueryShowType" style="width:100%">
          <el-option v-for="item in pageQueryOptions" :key="item.value" :value="item.value"
                     :label="item.title"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字典Table">
        <el-input v-model="formData.queryDictTable"></el-input>
      </el-form-item>
      <el-form-item label="字典Code">
        <el-input v-model="formData.queryDictField"></el-input>
      </el-form-item>
      <el-form-item label="字典Text">
        <el-input v-model="formData.queryDictText"></el-input>
      </el-form-item>
      <el-form-item label="默认值">
        <el-input v-model="formData.queryDefVal"></el-input>
      </el-form-item>

    </el-form>
    <el-form v-else>
      <el-form-item label="字体大小">
        <el-input-number v-model="formData.styleFontSize" :min="12"></el-input-number>
      </el-form-item>
      <el-form-item label="是否加粗">
        <el-switch v-model="formData.styleFontWeight" :active-value='1' :inactive-value="0"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="confirmDialog">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'AppSetDialog',
    props: {
      visible: {
        type: Boolean,
        default: () => {
          return false
        }
      }
    },
    data() {
      return {
        show: false,
        pageQueryOptions: [
          {title: '文本框', value: 'text'},
          {title: '日期(yyyy-MM-dd)', value: 'date'},
          {title: '日期（yyyy-MM-dd HH:mm:ss）', value: 'datetime'},
          {title: '下拉框', value: 'list'}
        ],
        formData: {},
        changeType: null

      }
    },
    watch: {
      visible(val) {
        this.show = val
      },
      show(val) {
        if (!val) {
          this.$emit('closeDialog')
        }
      }
    },
    methods: {
      init(data, type) {
        this.formData = data
        this.changeType = type
      },
      closeDialog() {
        this.$emit('closeDialog')
      },
      confirmDialog() {
        console.log(this.formData)
        this.$emit('confirmDialog', this.formData)
      },
    }
  }
</script>

<style>

</style>
