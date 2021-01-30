<template>

  <j-editable-table
    ref="editableTable"
    :loading="loading"
    :columns="columns"
    :dataSource="dataSource"
    :rowNumber="true"
    :maxHeight="340"
    @valueChange="handleChange"
    :disabledRows="{ dbFieldName:'id'}"/>


</template>

<script>

  import JEditableTable from '@/components/jeecg/JEditableTable'
  import { FormTypes } from '@/utils/JEditableTableUtil'

  import { syncAllTable } from '../util/TableUtils'

  const pageQueryOptions = [
    { title: '文本框', value: 'text' },
    { title: '日期(yyyy-MM-dd)', value: 'date' },
    { title: '日期（yyyy-MM-dd HH:mm:ss）', value: 'datetime' },
    { title: '下拉框', value: 'list' }
  ]


  export default {
    name: 'AppConfigTable',
    components: {
      JEditableTable
    },
    data() {
      return {
        loading: false,
        dataSource: [],
        columns: [
          {
            title: '字段名称', // 只读
            key: 'dbFieldName',
            // width: '12%',
            width: '130px',
            type: FormTypes.input,
            defaultValue: '',
            placeholder: '',
            props: { 'disabled': true }
          },
          {
            title: '字段备注', // 只读
            key: 'dbFieldTxt',
            // width: '12%',
            width: '130px',
            type: FormTypes.input,
            defaultValue: '',
            placeholder: '',
            props: { 'disabled': true }
          },
          {
            title: '展示到App',
            key: 'appShowFlag',
            // width: '7%',
            width: '80px',
            type: FormTypes.checkbox,
            customValue: ['1', '0'],
            defaultChecked: false
          },
          {
            title: '控件类型',
            key: 'appQueryShowType',
            // width: '16%',
            width: '170px',
            type: FormTypes.select,
            options: pageQueryOptions,
            defaultValue: 'text',
            placeholder: '请选择${title}'
          },
          {
            title: '字典Table',
            key: 'queryDictTable',
            // width: '12%',
            width: '130px',
            type: FormTypes.input_pop,
            defaultValue: ''
          },
          {
            title: '字典Code',
            key: 'queryDictField',
            // width: '12%',
            width: '130px',
            type: FormTypes.input,
            defaultValue: ''
          },
          {
            title: '字典Text',
            key: 'queryDictText',
            // width: '12%',
            width: '130px',
            type: FormTypes.input,
            defaultValue: ''
          },
          {
            title: '默认值',
            key: 'queryDefVal',
            // width: '12%',
            width: '130px',
            type: FormTypes.input,
            defaultValue: ''
          },
          {
            title: '样式类名',
            key: 'appClassName',
            // width: '12%',
            width: '130px',
            type: FormTypes.input,
            defaultValue: ''
          },
          {
            title: '启用筛选',
            key: 'appQueryConfigFlag',
            // width: '7%',
            width: '80px',
            type: FormTypes.checkbox,
            customValue: ['1', '0'],
            defaultChecked: false
          },
          {
            title: '参与模糊搜索',
            key: 'appKeywordFlag',
            // width: '7%',
            width: '90px',
            type: FormTypes.checkbox,
            customValue: ['1', '0'],
            defaultChecked: false
          }
        ]

      }
    },
    methods: {

      /** 同步列表 */
      async syncTable(table1) {
        await syncAllTable(this, table1)
      },
      handleChange({ row, column, value }) {
        this.$emit('syncQuery', row)
      },
      setQueryValue(row) {
        let table = this.$refs.editableTable
        table.setValues([{
          rowKey: row.id,
          values: {
            'queryShowType': row.queryShowType,
            'queryDictTable': row.queryDictTable,
            'queryDictField': row.queryDictField,
            'queryDictText': row.queryDictText,
            'queryDefVal': row.queryDefVal
          }
        }])
      }
    }
  }
</script>

<style scoped>

</style>