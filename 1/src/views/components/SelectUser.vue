<template>
  <div>
    <j-modal
      centered
      :title="title"
      :visible="visible"
      width="90%"
      class="selectUser"
      @ok="handleOk"
      @cancel="handleCancel"
      cancelText="关闭">
      <a-row :gutter="{xs:24,sm:24}">
        <a-col :xs="24" :sm="6">

          <a-card title="组织机构" :bordered=true :style="{height:clientHeight+'px'}" style="overflow-y: auto;">
            <div>
                <slot name="type"></slot>
            </div>
            <a-alert type="info" :showIcon="true">
              <div slot="message">
                当前选择：
                <a v-if="this.currOrgSelected.title">{{ getCurrOrgSelectedTitle() }}</a>
                <a v-if="this.currOrgSelected.title" style="margin-left: 10px" @click="onClearSelected">取消选择</a>
              </div>
            </a-alert>
            <!--组织机构-->
            <a-directory-tree
              :selectedKeys="orgSelectedKeys"
              :checkStrictly="true"
              @select="this.onOrgSelect"
              :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
              :treeData="departTree"
            >
            </a-directory-tree>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-card title="选择人员" :bordered=true  style="overflow-y: auto;">
            <!-- 查询区域 -->
            <div class="table-page-search-wrapper">
              <a-form layout="inline" @keyup.enter.native="searchQuery">
                <a-row :gutter="24">

                  <a-col :lg="8" :sm="24">
                    <a-form-item label="用户姓名">
                      <a-input placeholder="请输入姓名" v-model="queryParam.realname"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :lg="8" :sm="24">
                    <a-form-item label="用户账号">
                      <a-input placeholder="请输入账号" v-model="queryParam.username"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :lg="8" :sm="24">
                    <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                      <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                    </span>
                  </a-col>

                </a-row>
              </a-form>
            </div>
            <!-- table区域-begin -->
            <div :style="{height:(clientHeight-160)+'px'}" class="select-user-table">
              <a-table
                size="middle"
                bordered
                rowKey="id"
                :columns="columns1"
                :dataSource="dataSource1"
                :pagination="ipagination"
                :loading="loading"
                :rowSelection="{selectedRowKeys: selectedRowKeys,onSelect:onSelect,onSelectAll:onSelectAll,onChange: onSelectChange,type: type,columnWidth:30}"
                @change="handleTableChange">

                <span slot="username" slot-scope="text, record">
                  <j-ellipsis :value="text" :length="20"/>
                </span>
                <span slot="realname" slot-scope="text, record">
                  <j-ellipsis :value="text" :length="10"/>
                </span>
              </a-table>
            </div>
            <!-- table区域-end -->
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="6">
          <a-card title="已选中用户" :bordered=true :style="{height:clientHeight+'px'}" style="overflow-y: auto;">
            <!-- table区域-begin -->
            <div>
              <a-table
                size="middle"
                bordered
                rowKey="id"
                :columns="columns2"
                :dataSource="dataSource2"
                :loading="loading"
                :pagination="false"
                >
                <span slot="action" slot-scope="text, record,index">
                  <a-button type="primary" size="small" @click="handleDelete(record,index)" icon="delete">删除</a-button>
                </span>
              </a-table>
            </div>
            <!-- table区域-end -->
          </a-card>
        </a-col>
      </a-row>
    </j-modal>
  </div>
</template>

<script>
 import { filterObj } from '@/utils/util'
 import { getAction } from '@/api/manage'
 import {  queryUserByDepId,queryDepartTreeList } from '@/api/api'
 import JEllipsis from '@/components/jeecg/JEllipsis'

  export default {
    name: "SelectUser",
    components: {JEllipsis},
    data () {
      return {
        title: "用户列表",
        orgId:'1260768440273731586',
        names: [],
        visible: false,
        placement: 'right',
        description: '人员管理页面',
        // 查询条件
        queryParam: {},
        // 表头
        columns1: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width: "50px",
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '用户账号',
            align: "center",
            dataIndex: 'username',
            width: "150px",
            scopedSlots: { customRender: 'username' },
          },
          {
            title: '用户姓名',
            align: "center",
            width: "150px",
            dataIndex: 'realname',
            scopedSlots: { customRender: 'realname' },
          },
          {
            title: '所属部门',
            align: "center",
            width: "200px",
            dataIndex: 'orgCode',
            scopedSlots: { customRender: 'orgCode' },
          }
        ],
        columns2: [
          {
            title: '用户姓名',
            align:"center",
            width: "200",
            dataIndex: 'realname'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            width: "200",
            scopedSlots: { customRender: 'action' },
          }
        ],
        //数据集
        dataSource1:[],
        dataSource2:[],
        // 分页参数
        ipagination:{
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        isorter:{
          column: 'createTime',
          order: 'desc',
        },
        loading:false,
        selectedRowKeys: [],
        selectedRows: [],
        orgSelectedKeys:[],
        currOrgSelected: {},
        departTree: [],
        url: {
          list: "/sys/user/list",
        },
        clientHeight:''
      }
    },
    props:{
      type:{
        type:String,
        default:'checkbox'
      },
      selectedUsers:{
        type:Array
      } 
    },
    watch:{
      selectedUsers:{
        handler:function(val){
           if(val&&val.length){
            this.dataSource2 =val;
            this.selectedRowKeys = [];
             val.forEach((item,index)=>{
               this.selectedRowKeys.push(item.id);
             })
           }else{
             this.dataSource2 = [];
             this.selectedRowKeys = [];
           }
        },
        immediate:true
      }
    },
    created() {
      this.loadData();
      this.queryDepartTree();
    },
    mounted(){
      //浏览器高度
      this.clientHeight = 700;
    },
    methods: {
      searchQuery(){
        this.loadData(1);
      },
      searchReset(){
        this.queryParam={};
        this.loadData(1);
      },
      handleCancel() {
        this.visible = false;
      },
      handleOk() {
          if(this.dataSource2.length<=0){
          this.$message.warning("请选用户信息");
          return;
        }
          this.$emit("selectFinished",this.dataSource2);
          this.visible = false;
      },
      select() {
        this.visible = true;
        this.loadData();
      },
      loadData (arg){
        this.currOrgSelected = {};
        this.orgSelectedKeys = [];
        //加载数据 若传入参数1则加载第一页的内容
        if(arg===1){
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        getAction(this.url.list,params).then((res)=>{
          if(res.success){
            this.dataSource1 = res.result.records;
            this.ipagination.total = res.result.total;
          }
        })
      },
      getQueryParams(){
        var param = Object.assign({}, this.queryParam,this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },
      getQueryField(){
        //TODO 字段权限控制
      },
      //勾选变化
      onSelect (record,selected) {
        if(selected==true){
          if(this.type=="radio"){
            this.dataSource2 = []
          }
          this.dataSource2.push(record);
        }else{
          for(let i=0;i<this.dataSource2.length;i++){
            if(record.id == this.dataSource2[i].id){
              this.dataSource2.splice(i,1);
            }
          }
        }
      },
      onSelectAll(selected,selectedRows,changeRows){
        if(selected==true){
            this.dataSource2.push(...changeRows);
        }else{
          for(let i=0;i<changeRows.length;i++){
            for(let j=0;j<this.dataSource2.length;j++){
              if(changeRows[i].id == this.dataSource2[j].id){
                this.dataSource2.splice(j,1);
              }
            }
          }
        }
      },
      //选中变化
      onSelectChange (selectedRowKeys,selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
      },
      //删除选中用户
      handleDelete: function(record,index){
        // this.dataSource2 = [];
        this.dataSource2.splice(index,1);
        this.selectedRowKeys.splice(index,1);
      },
      handleTableChange(pagination, filters, sorter){
        //分页、排序、筛选变化时触发
        console.log(sorter);
        //TODO 筛选
        if (Object.keys(sorter).length>0){
          this.isorter.column = sorter.field;
          this.isorter.order = "ascend"==sorter.order?"asc":"desc"
        }
        this.ipagination = pagination;
        this.loadData();
      },
      // 点击树节点,筛选出对应的用户
      onOrgSelect(selectedKeys,e) {
        if (selectedKeys[0] != null) {
          this.queryUserByDepId(selectedKeys); // 调用方法根据选选择的id查询用户信息
          if (this.orgSelectedKeys[0] !== selectedKeys[0]) {
            this.orgSelectedKeys = [selectedKeys[0]];
            let record = e.node.dataRef
            //console.log('onSelect-record', record)
            this.currOrgSelected = Object.assign({}, record)
          }
        }
      },
      // 根据选择的id来查询用户信息
      queryUserByDepId(selectedKeys) {
        queryUserByDepId({ id: selectedKeys.toString() }).then((res) => {
          if (res.success) {
            this.dataSource1 = res.result;
            this.ipagination.total = res.result.length;
          }
        })
      },
      queryDepartTree() {
        queryDepartTreeList({'orgId':this.orgId}).then((res) => {
          if (res.success) {
            this.departTree = res.result;
          }
        })
      },
      getCurrOrgSelectedTitle() {
        return !this.currOrgSelected.title ? '' : this.currOrgSelected.title
      },
      onClearSelected() {
        this.selectedRowKeys = [];
        this.dataSource2 = [];

        this.loadData();
      },
    }
  }
</script>
<style lang="less" scoped>
  .ant-card-body .table-operator{
    margin-bottom: 18px;
  }
  .ant-table-tbody .ant-table-row td{
    padding-top:15px;
    padding-bottom:15px;
  }
  .anty-row-operator button{margin: 0 5px}
  .ant-btn-danger{background-color: #ffffff}

  .ant-modal-cust-warp{height: 100%}
  .ant-modal-cust-warp .ant-modal-body{height:calc(100% - 110px) !important;overflow-y: auto}
  .ant-modal-cust-warp .ant-modal-content{height:90% !important;overflow-y: hidden}
</style>
<style>
  .select-user-table  .ant-table-content{
    overflow-y:auto;
  }
  .select-user-table .ant-table-body{
    min-width: 600px;
  }
</style>