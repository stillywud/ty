<template>
  <div>
    <a-modal
      v-model="isShow"
      title="选择单据"
      class-name="vertical-center-modal"
      :width="1080"
      :maskClosable="false"
      @ok="ok"
      @cancel="cancel"
    >
        <a-row :gutter="24">
            <a-col :xs="24" :md="8" :sm="24">
                <a-card title="单据类型" :bordered=true  style="overflow-y: auto;min-height:600px;max-height: 745px;">
                <div class="receipts-type">
                    <a-form-item>
                        <a-input-search placeholder="请输入类型" @search="searchTypes" allowClear v-model="keyWords"/>
                      </a-form-item>
                    <!--选择类型-->
                    <a-list item-layout="horizontal" class="list">
                        <a-list-item v-for="(item,index) in dataTypes" :class="activeIndex==index?'active':''" @click="getList(item,index)"> 
                          <a>{{item.desformName}}</a>
                        </a-list-item>
                    </a-list>
                </div>
                </a-card>
            </a-col>
            <a-col :xs="24" :md="16" :sm="24">
            <a-card title="单据列表" :bordered=true  style="overflow-y: auto;min-height:600px;">
            <!-- 查询区域 -->
            <div class="table-page-search-wrapper">
                <a-form layout="inline" @keyup.enter.native="searchQuery">
                  <a-row :gutter="24">
                    <a-col :xl="24" :md="8" :sm="24">
                    </a-col>
                    <a-col :xl={span:8,offset:16} :md={span:8,offset:8} :sm="24">
                      <a-form-item>
                        <a-input-search placeholder="请输入单号" @search="searchQuery" v-model="searchForm.id"/>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
              </div>
              <div class="receipts-table">
                  <a-table
                    :columns="columns"
                    :data-source="data"
                    :pagination="ipagination"
                    rowKey="id"
                    :bordered=true 
                    :rowSelection={type:type,onChange:onChange,onSelect:onSelect,onSelectAll:onSelectAll,selectedRowKeys:selectedRowKeys}
                    @change="handleTableChange"
                  >
                  <span slot="id" slot-scope="record">
                      <a :href="apiBaseUrl+itemType.desformCode+'/'+record+'?token='+token" target="_blank">{{record}}</a>
                  </span>
                  
                  </a-table>
              </div>
              </a-card>
          </a-col>
        </a-row>
    </a-modal>
  </div>
</template>
<script>
  let apiBaseUrl = window._CONFIG['domianURL'] + "/desform/detail/";
  import {auditRegisterList,queryByCode,queryType} from "@/api/approval.js"
  const columns = [
  {
      title: '单号',
      dataIndex: 'id',
      key: 'id',
      width:"200px",
      scopedSlots: { customRender: 'id' },
    },
    {
      title: '单据名称',
      dataIndex: 'desformName',
      key: 'desformName',
      width:"180px"
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width:"220px"
    }
  ]
  const columnTypes = [
    {
      title: '单据类型',
      dataIndex: 'typeName',
      key: 'typeName',
      width:"100px"
    }
  ]
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  export default {
    name: 'receipts',
    data() {
      return {
        apiBaseUrl,
        data:[],
        dataTypes:[],
        realData:[],
        columns,
        columnTypes,
        startValue: null,
        endValue: null,
        keyWords:"",
        searchForm: {
          id: '',
          type:''
        },
        selectedRows: [],
        selectedRowKeys:[],
        isShow: false,
        activeIndex:-1,
        ipagination:{
            current: 1,
            pageSize: 10,
            total: 0
         },
         itemType:{},
         dataSource:[],
         token:''
      }
    },
    props: {
      type: {
        type: String,
        default: 'checkbox'
      },
      //已选择单据
      selectedReceipts:{
        type:Array
      },
      isRelation:{
        type:Number,
        default:1
      }
    },
    watch:{
      selectedReceipts:{
        handler:function(val){
           if(val&&val.length){
            this.dataSource = val;
            this.selectedRowKeys = [];
            val.forEach((item,index)=>{
               this.selectedRowKeys.push(item.billNo);
             })
           }else{
             this.dataSource = [];
             this.selectedRowKeys = [];
           }
        },
        immediate:true
      }
    },
    mounted() {
      this.token = Vue.ls.get(ACCESS_TOKEN);
    },
    methods: {
      handleTableChange(ipagination){
          this.ipagination = ipagination;
          this.searchQuery();
        },
      showReceipts() {
        this.isShow = true;
        this.activeIndex = 0;
        this.getTypes();
      },
      getTypes(){
        queryType().then(res=>{
          if(res.success==true){
             this.dataTypes = res.result;
             this.realData = res.result;
             this.getList(this.dataTypes[this.activeIndex],this.activeIndex)
          }
        });
      },
      getList(item,index){
          this.activeIndex = index;
          this.searchForm.type = item.id;
          this.itemType = item;
          this.searchQuery();
      },
      //根据关键词搜索类型
      searchTypes(){
     
          if(this.keyWords&&this.realData.length>0){
            this.dataTypes =  this.realData.filter((record)=>{
                return record.desformName
                .toString()
                .toLowerCase()
                .includes(this.keyWords.toLowerCase());
            });
          }else{
            this.dataTypes = this.realData;
          }
          this.activeIndex = 0;
          this.getList(this.dataTypes[this.activeIndex],this.activeIndex)
      },
      searchQuery() {
        this.searchForm.pageNo = this.ipagination.current;
        this.searchForm.pageSize = this.ipagination.pageSize;
        this.searchForm.is_relation = this.isRelation;
        queryByCode(this.searchForm).then(res=>{
            if(res.success==true){
                this.ipagination.total = res.result.total
                this.data = res.result.records;
            }
        });
      },
      //勾选变化
      onSelect (record,selected) {
        if(selected==true){
          if(this.type=="radio"){
            this.dataSource = []
          }
          let obj = new Object();
          obj.billNo = record.id;
          obj.billName = record.desformName;
          obj.typeCode = this.itemType.desformCode;
          obj.typeName = this.itemType.desformName;
          obj.typeId = this.itemType.id
          this.dataSource.push(obj);
        }else{
          for(let i=0;i<this.dataSource.length;i++){
            if(record.id == this.dataSource[i].billNo){
              this.dataSource.splice(i,1);
            }
          }
        }
      },
      //全选
      onSelectAll(selected,selectedRows,changeRows){
        if(selected==true){
            for(let i=0;i<changeRows.length;i++){
              let obj = new Object();
              obj.billNo = changeRows[i].id;
              obj.billName = changeRows[i].desformName;
              obj.typeCode = this.itemType.desformCode;
              obj.typeName = this.itemType.desformName;
              obj.typeId = this.itemType.id
              this.dataSource.push(obj)
            }
        }else{
          for(let i=0;i<changeRows.length;i++){
            for(let j=0;j<this.dataSource.length;j++){
              if(changeRows[i].id == this.dataSource[j].billNo){
                this.dataSource.splice(j,1);
              }
            }
          }
        }
      },
      onChange(selectedRowKeys, selectedRows) {
        this.selectedRows = selectedRows;
        this.selectedRowKeys = selectedRowKeys;
      },
      ok() {
        this.$emit('selectOk', this.dataSource)
        this.isShow = false
      },
      cancel() {
        this.selectedRows = [];
        this.selectedRowKeys = [];
        this.data = [];
        this.searchForm =  {
          id: '',
        }
      }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
.active{
  background: #40a9ff;
}
.list .ant-list-item a{
  color:rgba(0, 0, 0, 0.85);
}
.list .active a{
  color:#fff;
}

.list .ant-list-item{
  text-indent: 1.5em;
}
</style>
<style>
  .receipts-table  .ant-table-content{
    overflow-y:auto;
  }
  .receipts-type{
    font-size:13px;
  }
  
</style>
          