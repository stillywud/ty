<template>
  <a-card :loading="cardLoading" :bordered="false" style="height: 100%;" v-if="row">
    <a-spin :spinning="loading">
      <a-input-search v-model="keyword" @search="handleSearch" style="width:100%;margin-top: 10px; margin-bottom: 10px"
                      placeholder="输入关键字过滤实体类..."/>
      <span>类与属性列表</span>
      <div style="overflow:auto; margin-top: 5px" v-bind:style="{'max-height': maxHeight}">
        <a-table
          ref="tableEntity"
          bordered
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="true"
          :expandedRowKeys="expandedRowKeys"
          @expand="handleExpand">
          <a-table
            slot="expandedRowRender"
            slot-scope="text"
            :columns="innerColumns"
            :dataSource="innerData"
            size="middle"
            bordered
            rowKey="id"
            :pagination="true"
            :loading="loading">
            <template slot="action" slot-scope="text, record, index">
              <div class='editable-row-operations'>
                <span v-if="!record.ruleId">
                  <a @click="() => create(record)">创建</a>
                </span>
                <span v-else>
                  <a @click="() => edit(record)">修改</a>
                  <a-divider type="vertical"/>
                  <a-popconfirm title='确定要清空吗' @confirm="() => clear(record)">
                    <a>清除</a>
                  </a-popconfirm>
                </span>
              </div>
            </template>
          </a-table>
        </a-table>
      </div>
    </a-spin>

    <attribute-modal ref="attributemodal" @ok="saveOk"></attribute-modal>
  </a-card>
</template>

<script>
  import { queryEntities, queryAttrs, queryAttrsByRoId, deleteAttrRule } from '@/api/api'
  import AttributeModal from './AttributeModal'

  export default {
    name: 'AttributeListRight',
    components: { AttributeModal },
    props: ['row'],
    data() {
      return {
        cardLoading: true,
        loading: false,
        maxHeight: '0px',
        keyword: null,
        selectedRowKeys: [],
        selectRow: null,
        // 列表表头
        columns: [
          {
            title: '英文名',
            align: 'center',
            width: 150,
            dataIndex: 'tableName'
          },
          {
            title: '显示名',
            align: 'center',
            width: 150,
            dataIndex: 'tableTxt'
          },
          {
            title: '',
            align: 'center'
          }
        ],
        dataSource: [],
        entitiesList: [],
        attrsList: [],
        originalArray: [],
        // 子表表头
        innerColumns: [
          {
            title: '字段名称',
            align: 'center',
            width: 150,
            dataIndex: 'dbFieldName'
          },
          {
            title: '显示名称',
            width: 150,
            align: 'center',
            dataIndex: 'dbFieldTxt'
          },
          {
            title: '条件',
            align: 'center',
            dataIndex: 'condition'
          },
          {
            title: '规则',
            width: 200,
            align: 'center',
            dataIndex: 'rule'
          },
          {
            title: '操作',
            width: 120,
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        innerData: [],
        expandedRowKeys: []
      }
    },
    mounted() {
      // 监听浏览器窗体大小
      this.maxHeight = window.innerHeight - 240 + 'px'
      // 添加屏幕大小监听
      window.addEventListener('resize', this.windowResize, false)
    },
    watch: {
      row: {
        handler(val) {
          this.queryRuleByRoid(val.id)
        },
        deep: true
      }
    },
    created() {
      this.queryData()
    },
    methods: {
      windowResize() {
        setTimeout(() => {
          this.maxHeight = window.innerHeight - 240 + 'px'
        }, 300)
      },

      queryData() {

        this.loading = true
        this.cardLoading = true
        // 1.读取entity列表 赋值给entitiesList
        queryEntities().then((resE) => {
          if (resE.success) {
            this.entitiesList = resE.result
            // 2.读取attr列表 赋值给attrsList
            queryAttrs().then((resA) => {
              if (resA.success) {
                this.attrsList = resA.result
                this.createTableData()
              } else {
                this.$message.warn('实体查询失败：' + resA.message)
                console.error('实体查询失败:', resA)
              }
            }).finally(() => {
              this.loading = false
              this.cardLoading = false
            })
          } else {
            this.$message.warn('属性查询失败：' + resE.message)
            console.error('属性查询失败:', resE)
          }
        }).finally(() => {
          this.loading = false
          this.cardLoading = false
        })
      },

      createTableData() {
        for (let i in this.entitiesList) {
          let entity = this.entitiesList[i]
          for (let j in this.attrsList) {
            let attr = this.attrsList[j]
            if (attr.cgformHeadId === entity.id) {
              if (!entity['attrs']) {
                entity['attrs'] = []
              }
              attr['entityName'] = entity.tableTxt
              entity['attrs'].push(attr)
            }
          }
          this.originalArray.push(entity)
        }
        this.dataSource = this.originalArray
      },

      handleSearch(value) {
        this.expandedRowKeys = []
        if (value) {
          let val = value.trim()
          let newArray = JSON.parse(JSON.stringify(this.originalArray))
          for (let i = newArray.length - 1; i >= 0; i--) {
            let entity = newArray[i]
            if (entity.tableTxt.indexOf(val) === -1 && entity.tableName.indexOf(val) === -1) {
              newArray.splice(i, 1)
            }
          }
          this.dataSource = newArray
        } else {
          this.dataSource = this.originalArray
        }
      },
      resetDataSource(){
        for (let i in this.originalArray) {
          let object = this.originalArray[i]
          for (let j in object.attrs) {
            let attr = object.attrs[j]
            delete attr['condition']
            delete attr['rule']
            delete attr['ruleId']
          }
        }
      },
      queryRuleByRoid() {
        this.keyword = null
        queryAttrsByRoId({ roid: this.row.id }).then((res) => {
          if (res.success) {
            let conditionList = res.result
            this.resetDataSource()
            for (let i in conditionList) {
              let condition = conditionList[i]
              for (let j in this.originalArray) {
                let object = this.originalArray[j]
                if (condition.className === object.tableName) {
                  for (let k in object.attrs) {
                    let attr = object.attrs[k]
                    if (attr.dbFieldName === condition.attrName) {
                      attr['condition'] = condition.attrCondition
                      attr['rule'] = condition.ruleName
                      attr['ruleId'] = condition.id
                      break
                    }
                  }
                  break
                }
              }
            }
            this.dataSource = JSON.parse(JSON.stringify(this.originalArray))
            this.expandedRowKeys = []
          }
        })
      },

      handleExpand(expanded, record) {
        this.expandedRowKeys = []
        if (expanded === true) {
          this.expandedRowKeys.push(record.id)
          this.innerData = record.attrs
        }
      },

      create(record) {
        let entity
        for (let i in this.originalArray) {
          let item = this.originalArray[i]
          if (record.cgformHeadId === item.id) {
            entity = item
            break
          }
        }
        this.$refs.attributemodal.show(this.row, entity, record)
      },

      edit(record) {
        let entity
        for (let i in this.originalArray) {
          let item = this.originalArray[i]
          if (record.cgformHeadId === item.id) {
            entity = item
            break
          }
        }
        this.$refs.attributemodal.show(this.row, entity, record)
      },

      clear(record) {
        deleteAttrRule({ id: record.ruleId }).then((res) => {
          if (res.success) {
            record.condition = ''
            record.rule = ''
            record.ruleId = null
            this.$message.success('删除成功!')
          } else {
            this.$message.warn('删除失败!')
          }
        })
      },

      saveOk() {
        this.queryRuleByRoid()
      }
    },
    destroyed() {
      // 取消屏幕大小监听
      window.removeEventListener('resize', this.windowResize)
    }
  }
</script>

<style scoped>

</style>