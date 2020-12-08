<template>
  <div>
    <!--新增审批-->
    <add-approval ref="addApproval"/>
    <a-card>
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="24">
            <a-col :xl="6" :md="8" :sm="24">
              <a-form-item label="审批状态">
                <a-select v-model="searchForm.auditState" allowClear @change="searchQuery">
                  <a-select-option value="2">
                    审批中
                  </a-select-option>
                  <a-select-option value="3">
                    审批通过
                  </a-select-option>
                  <a-select-option value="4">
                    审批拒绝
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
                       <a-col :xl="6" :md="8" :sm="24">
            <!--              <a-form-item>-->
            <!--                <a-button type="primary" @click="addApproval">-->
            <!--                  发起审批-->
            <!--                </a-button>-->
            <!--              </a-form-item>-->
                       </a-col>
            <a-col :xl={span:6,offset:3} :md={span:8} :sm="24">
              <a-form-item>
                <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
                  <a-date-picker style="width: 100%"
                                 v-model="startValue"
                                 :disabled-date="disabledStartDate"
                                 @change="changeStartDate"
                  />
                </a-form-item>
                <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
                                -
                              </span>
                <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
                  <a-date-picker style="width: 100%"
                                 v-model="endValue"
                                 :disabled-date="disabledEndDate"
                                 @change="changeEndDate"
                  />
                </a-form-item>
              </a-form-item>
            </a-col>
            <a-col :xl="3" :md="4" :sm="12">
              <a-form-item>
                <a-input-search placeholder="请输入关键字" @search="searchQuery" v-model="searchForm.keywords"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="ipagination"
        v-bind:style="{'min-height': tableHeight + 'px'}"
        rowKey="id"
        @change="handleTableChange">
        <span slot="applyContent" slot-scope="applyContent" :title="applyContent">
            {{cutString(applyContent,12)}}
          </span>
        <span slot="status" slot-scope="status">
          <a-tag color="#FFA500" v-if="status=='审核中'">&nbsp;&nbsp;审批中&nbsp;&nbsp;</a-tag>
          <a-tag color="#3CB371" v-if="status=='审核通过'">审批通过</a-tag>
          <a-tag color="#ff5500" v-if="status=='审核拒绝'">审批拒绝</a-tag>
        </span>
        <span slot="action" slot-scope="record">
          <div>
            <a @click="handleView(record)">查看</a>
          </div>
        </span>
      </a-table>
    </a-card>
    <!-- 审批start-->
    <approval ref="approval"></approval>
    <!-- 审批end-->
    <!-- 转办start-->
    <transfer ref="transfer" @onOk="searchQuery"></transfer>
    <!-- 转办end-->
    <!--查看start-->
    <approval-detail ref="approvalDetail"></approval-detail>
    <!--查看end-->
  </div>
</template>
<script>
  import moment from 'moment'
  import approval from './dialog/approval.vue'
  import transfer from './dialog/transfer.vue'
  import AddApproval from './dialog/AddApproval'
  import { queryAt } from '@/api/approval.js'
  import { mapGetters } from 'vuex'
  import ApprovalDetail from './dialog/ApprovalDetail'
  import {cutString} from '@/utils/str.js'

  const columns =  [
    {
      title: '审批状态',
      dataIndex: 'auditStatus',
      key: 'auditStatus',
      scopedSlots: { customRender: 'status' },
      width:"100px"
    },
    {
      title: '单据编号',
      dataIndex: 'auditNo',
      key: 'auditNo',
      width:'200px'
    },
    {
      title: '申请内容',
      dataIndex: 'applyTitle',
      key: 'applyTitle',
    },
    {
      title: '审批详情',
      dataIndex: 'applyContent',
      key: 'applyContent'
    },
    {
      title: '提交时间',
      key: 'createTime',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      width:'100px'
    }
  ]
  export default {
    components: {
      AddApproval,
      approval,
      transfer,
      ApprovalDetail
    },
    data() {
      return {
        data: [],
        columns,
        startValue: null,
        endValue: null,
        searchForm: {
          auditState: '',
          keywords: '',
          startTime: null,
          endTime: null
        },
        ipagination: {
          current: 1,
          pageSize: 10,
          total: 0
        },
        tableHeight: window.innerHeight-242,
        info: {}
      }
    },
    mounted() {
      this.info = this.userInfo()
      this.searchQuery()
    },
    methods: {
      ...mapGetters(['userInfo']),
      cutString(str,len){
        return cutString(str,len);
      },
      searchQuery() {
        this.searchForm.oprtId = this.info.id
        this.searchForm.pageNo = this.ipagination.current
        this.searchForm.pageSize = this.ipagination.pageSize
        queryAt(this.searchForm).then((res) => {
          if (res.success == true) {
            this.ipagination.total = res.result.total
            let data = res.result.records
            this.data = data
          }
        })
      },
      //查看
      handleView(record) {
        this.$refs.approvalDetail.showApproval(record)
      },
      handleTableChange(ipagination) {
        this.ipagination = ipagination
        this.searchQuery()
      },
      //日期变化
      changeStartDate(val) {
        this.searchForm.startTime = val ? val.format('YYYY-MM-DD') : ''
      },
      //日期变化
      changeEndDate(val) {
        this.searchForm.endTime = val ? val.format('YYYY-MM-DD') : ''
      },
      disabledStartDate(startValue) {
        const endValue = this.endValue
        if (!startValue || !endValue) {
          return false
        }
        return startValue.valueOf() > endValue.valueOf()
      },
      disabledEndDate(endValue) {
        const startValue = this.startValue
        if (!endValue || !startValue) {
          return false
        }
        return startValue.valueOf() >= endValue.valueOf()
      },
      //审批
      handleApproval(id) {
        this.$refs.approval.handleApproval(id)
      },
      //转办
      handleTransfer(id) {
        this.$refs.transfer.handleTransfer(id)
      },
      // 添加审批申请
      addApproval() {
        this.$refs.addApproval.showAdd()
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>
        