<template>
  <a-card :bordered="false" style="height: 100%">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchByquery">
        <a-row :gutter="24" v-if="queryInfo && queryInfo.length>0">
          <template v-for="(item,index) in queryInfo">
            <template v-if=" item.hidden==='1' ">
              <a-col v-if="item.view=='datetime'" :md="12" :sm="16" :key=" 'query'+index " v-show="toggleSearchStatus">
                <online-query-form-item :queryParam="queryParam" :item="item" :dictOptions="dictOptions"></online-query-form-item>
              </a-col>
              <a-col v-else :md="6" :sm="8" :key=" 'query'+index " v-show="toggleSearchStatus">
                <online-query-form-item :queryParam="queryParam" :item="item" :dictOptions="dictOptions"></online-query-form-item>
              </a-col>
            </template>
            <template v-else>
              <a-col v-if="item.view=='datetime'" :md="12" :sm="16" :key=" 'query'+index ">
                <online-query-form-item :queryParam="queryParam" :item="item" :dictOptions="dictOptions"></online-query-form-item>
              </a-col>
              <a-col v-else :md="6" :sm="8" :key=" 'query'+index ">
                <online-query-form-item :queryParam="queryParam" :item="item" :dictOptions="dictOptions"></online-query-form-item>
              </a-col>
            </template>
          </template>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchByquery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a v-if="hasQueryHidden" @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>

            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button v-if="buttonSwitch.add" @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button v-if="buttonSwitch.import" @click="handleImportXls" type="primary" icon="upload">导入</a-button>
      <a-button v-if="buttonSwitch.export" @click="handleExportXls" type="primary" icon="download">导出</a-button>
      <template v-if="cgButtonList && cgButtonList.length>0" v-for="(item,index) in cgButtonList">
        <a-button
          v-if=" item.optType=='js' "
          :key=" 'cgbtn'+index "
          @click="cgButtonJsHandler(item.buttonCode)"
          type="primary"
          :icon="item.buttonIcon">
          {{ item.buttonName }}
        </a-button>
        <a-button
          v-else-if=" item.optType=='action' "
          :key=" 'cgbtn'+index "
          @click="cgButtonActionHandler(item.buttonCode)"
          type="primary"
          :icon="item.buttonIcon">
          {{ item.buttonName }}
        </a-button>
      </template>

      <!-- 高级查询 -->
      <j-super-query
        ref="superQuery"
        :fieldList="superQuery.fieldList"
        :saveCode="$route.fullPath"
        :loading="table.loading"
        @handleSuperQuery="handleSuperQuery"/>

      <a-button
        v-if="buttonSwitch.batch_delete"
        @click="handleDelBatch"
        v-show="table.selectedRowKeys.length > 0"
        ghost
        type="primary"
        icon="delete">批量删除</a-button>
        <!--表格控制按钮-->
        <a-button type="primary" @click="editCell(true)"   v-if="buttonSwitch.table_edit && !isCell">表格编辑</a-button>
        <a-button type="primary" @click="editCell(false)"  v-if="isCell">取消编辑</a-button>
        <a-button type="primary" @click="saveCell()"       v-if="isCell">保存表格</a-button>
    </div>

    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        已选择&nbsp;<a style="font-weight: 600">{{ table.selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        <span style="float:right;">
          <a-popover :overlayStyle="{maxWidth:'500px'}" title="自定义列" trigger="click" placement="leftBottom" @visibleChange="popVisibleChange">
            <a><a-icon type="setting"/></a>
            <template slot="content">
              <div>
                <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                全选
                </a-checkbox>
              </div>
              <a-checkbox-group v-model="settingColumns">
                <a-row>
                  <template v-for="(item,index) in defColumns">
                    <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">
                      <a-col :span="12" :key="index">
                        <a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox>
                      </a-col>
                    </template>
                  </template>
                </a-row>
              </a-checkbox-group>
            </template>
          </a-popover>
        </span>
      </div>

      <a-table
        ref="cgformAutoList"
        bordered
        size="middle"
        rowKey="id"
        :columns="tableColumn"
        :dataSource="table.dataSource"
        :pagination="table.pagination"
        :loading="table.loading"
        :rowSelection="rowSelectionConfig"
        @change="handleTableChange"
        :scroll="tableScroll"
        :class="{'j-table-force-nowrap': enableScrollBar}"
        style="min-height: 300px"
        v-if="!isCell"
        >

        <template slot="dateSlot" slot-scope="text">
          <span>{{ getFormatDate(text) }}</span>
        </template>

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>

        <template slot="pcaSlot" slot-scope="text">
          <div>{{ getPcaText(text) }}</div>
        </template>

        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="加载失败" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>

        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="downloadRowFile(text)">
            下载
          </a-button>
        </template>

        <!-- 字符串超长截取省略号显示-->
        <template
          v-for="column of this.defColumns"
          :slot="'ellipsis_'+column.dataIndex"
          slot-scope="text"
        >
          <j-ellipsis :length="column.fieldWidth == '' ? 25 : Number.parseInt(column.fieldWidth)" :value="text ? text + '' : ''"/>
        </template>

        <span slot="action" slot-scope="text, record">
          <template v-if="hasBpmStatus">
            <template v-if="record.bpm_status == '1'||record.bpm_status == ''|| record.bpm_status == null">
              <template v-if="buttonSwitch.update">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical"/>
            </template>
            </template>
          </template>
          <template v-else>
            <template v-if="buttonSwitch.update">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical"/>
            </template>
          </template>
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-if="buttonSwitch.detail">
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <!--在线开发添加待办 by weina -->
                       <a-menu-item v-if="buttonSwitch.addtodo&&(record.todoStatus==1)">
                        <a href="javascript:;" @click="addNeedDetail(record)">加入待办</a>
                      </a-menu-item>
              <template v-if="hasBpmStatus">
                <template v-if="record.bpm_status == '1'||record.bpm_status == ''|| record.bpm_status == null">
                    <a-menu-item>
                      <a href="javascript:;" @click="startProcess(record)">提交流程</a>
                    </a-menu-item>
                    <a-menu-item v-if="buttonSwitch.delete">
                      <a-popconfirm title="确定删除吗?" @confirm="() => handleDeleteOne(record)">
                        <a>删除</a>
                      </a-popconfirm>
                    </a-menu-item>
                </template>
                <template v-else>
                    <a-menu-item @click="handlePreviewPic(record)">审批进度</a-menu-item>
                </template>
              </template>
              <template v-else>
                <a-menu-item v-if="buttonSwitch.delete">
                  <a-popconfirm title="确定删除吗?" @confirm="() => handleDeleteOne(record)">
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>
               </template>
              <template v-if="cgButtonLinkList && cgButtonLinkList.length>0" v-for="(btnItem,btnIndex) in cgButtonLinkList">
                <a-menu-item :key=" 'cgbtnLink'+btnIndex " v-if="showLinkButton(btnItem,record)">
                  <a href="javascript:void(0);" @click="cgButtonLinkHandler(record,btnItem.buttonCode,btnItem.optType)">
                    <a-icon v-if="btnItem.buttonIcon" :type="btnItem.buttonIcon" />
                    {{ btnItem.buttonName }}
                  </a>
                </a-menu-item>
              </template>

            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
      <j-editable-table
      v-if="isCell"
      ref="editableTable"
      :loading="false"
      :columns="editColumns"
      :dataSource="table.dataSource"
      :maxHeight="1200"
      :rowNumber="true"
      :rowSelection="false"
      :actionButton="false"
      @selectRowChange="handleSelectRowChange"
      @valueChange="valueChange"
    >
    </j-editable-table>
      <onl-cgform-auto-modal @success="handleFormSuccess" ref="modal" :code="code" @schema="handleGetSchema" />

            <j-import-modal ref="importModal" :url="getImportUrl()" :businessKeys="this.businessKeys" :isCover="this.isCover"
                            @ok="importOk" :fileNum=1>
                <template slot="inputConfig">
                  <div style="margin-top: 10px">是否根据业务主键覆盖原数据：
                    <a-select style="width: 60px" v-model="isCover">
                      <a-select-option value='1'>是</a-select-option>
                      <a-select-option value='0'>否</a-select-option>
                    </a-select>
                  </div>
                    <div style="margin-top: 5px">业务主键：</div>
                    <a-checkbox-group v-model="businessKeys">
                      <a-row>
                        <template v-for="(item,index) in defColumns">
                          <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">
                            <a-col :span="12" :key="index">
                              <a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox>
                            </a-col>
                          </template>
                        </template>
                      </a-row>
                    </a-checkbox-group>
                </template>
            </j-import-modal>

      <process-inst-pic-modal ref="processInstPicModal"></process-inst-pic-modal>
      <eoa-plan-modal ref="baseModal" :isurl="isurl" @ok="handleModalOk"></eoa-plan-modal>
      <!-- 跳转Href的动态组件方式 -->
      <a-modal v-bind="hrefComponent.model" v-on="hrefComponent.on">
        <component :is="hrefComponent.is" v-bind="hrefComponent.params"/>
      </a-modal>

    </div>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { HrefJump } from '@/mixins/OnlAutoListMixin'
  import OnlCgformAutoModal from './OnlCgformAutoModal'
  import {httpAction,postAction,getAction,deleteAction,downFile,getFileAccessHttpUrl } from '@/api/manage'
  import { cloneObject, filterObj } from '@/utils/util'
  import JImportModal from '@/components/jeecg/JImportModal'
  import OnlineQueryFormItem from '@/components/online/autoform/OnlineQueryFormItem.vue';
  import ProcessInstPicModal from "@/components/bpm/ProcessInstPicModal";
  import JSuperQuery from '@comp/jeecg/JSuperQuery'
  import ButtonExpHandler from '@/components/online/autoform/model/ButtonExpHandler'
  import { onlUtil } from '@/mixins/OnlineCommonUtil'
  import lodash_object from 'lodash'
  import Vue from 'vue'
  import JEditableTable from '@/components/jeecg/JEditableTable'
  import { FormTypes,Types } from '@/utils/JEditableTableUtil'
  import EoaPlanModal from '@/components/eoa/EoaPlanModal'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import { USER_INFO } from '@/store/mutation-types'
  import moment from 'moment'

  export default {
    name: 'OnlCgFormAutoList',
    mixins: [HrefJump, mixinDevice, onlUtil],
    components: {
      JSuperQuery,
      OnlCgformAutoModal,
      OnlineQueryFormItem,
      JImportModal,
      ProcessInstPicModal,
      JEditableTable,
      EoaPlanModal,
      JEllipsis
    },
    data() {
      return {
        isurl:true,
        code: '',
        lodash: lodash_object,
        description: '在线报表功能测试页面',
        currentTableName:"",
        url: {
          getQueryInfo:'/online/cgform/api/getQueryInfo/',
          getColumns: '/online/cgform/api/getColumns/',
          getData: '/online/cgform/api/getData/',
          optPre:"/online/cgform/api/form/",
          exportXls:'/online/cgform/api/exportXls/',
          buttonAction:'/online/cgform/api/doButton',
          startProcess: "/process/extActProcess/startMutilProcess",
        },
        flowCodePre:"onl_",
        isorter:{
          column: 'createTime',
          order: 'desc',
        },
        //dictOptions:{fieldName:[]}
        dictOptions:{

        },
        cgButtonLinkList:[],
        cgButtonList:[],
        queryInfo:[],
        // 查询参数，多个页面的查询参数用 code 作为键来区分
        queryParamsMap: {},
        toggleSearchStatus:false,
        table: {
          loading: true,
          scroll:{x:false},
          // 表头
          columns: [],
          //数据集
          dataSource: [],
          // 选择器
          selectedRowKeys: [],
          selectionRows: [],
          // 分页参数
          pagination: {

          }
        },
        metaPagination:{
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        actionColumn:{
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          // fixed:"right",
          align:"center",
          width:150
        },
        formTemplate:"99",
        EnhanceJS:'',
        hideColumns:[],
        buttonSwitch:{
          add:true,
          update:true,
          delete:true,
          batch_delete:true,
          import:true,
          export:true,
          detail:true,
          table_edit:true,
          addtodo:true
        },
        hasBpmStatus:false,
        checkboxFlag:false,
        // 高级查询
        superQuery: {
          // 字段列表
          fieldList: [],
          // 查询参数
          params: '',
          // 查询条件拼接方式 'and' or 'or'
          matchType: 'and'
        },
        scrollFlag: 0,
        // 列表显示的字段，导出也是这些字段
        settingColumns:[],
        defColumns:[],
        editColumns:[],
        fullColumns:[],
        isCell: false,
        formData:[], // 编辑表单数组
        chooIds:[], // 已经选择
        businessKeys: [], // 导入设置的业务主键
        isCover: '', // 导入时是否按业务主键覆盖
        formOpenType: '0',
        hasQueryHidden: false,
        //自定义列全选配置
        indeterminate: true,
        checkAll: false,
        allSelectableCols: [],
      }
    },
    created() {
      this.initAutoList();
    },
    mounted(){
      this.cgButtonJsHandler('mounted')
    },
    watch: {
      '$route'() {
        // 刷新参数放到这里去触发，就可以刷新相同界面了
        this.initAutoList()
      },
      settingColumns(val){
         if(val.length>0){
           let tmpColumns = this.fullColumns;
           let arr = [];
           for(let i=0;i<tmpColumns.length;i++){
               if(val.indexOf(tmpColumns[i].key)!=-1){
                   arr.push(tmpColumns[i]);
               }
           }
           console.log(arr,val,333)
           this.editColumns = arr;
         }
         //自定义列全选变化
        this.indeterminate = !!val.length && val.length < this.allSelectableCols.length;
        this.checkAll = val.length === this.allSelectableCols.length;
      }
    },
    computed:{
      rowSelectionConfig:function() {
        if(!this.checkboxFlag){
          return null
        }
        return {
          // fixed:true,
          selectedRowKeys:this.table.selectedRowKeys,
          onChange: this.handleChangeInTableSelect
        }
      },
      queryParam: {
        get() {
          return this.queryParamsMap[this.code]
        },
        set(newVal) {
          this.$set(this.queryParamsMap, this.code, newVal)
        }
      },
      enableScrollBar() {
        return this.scrollFlag === 1 || this.isMobile()
      },
      tableScroll() {
        // 移动端模式下无论如何都开启横向滚动条
        if (this.enableScrollBar) {
          return undefined
        } else {
          return this.table.scroll
        }
      },
      tableColumn(){
        if(!this.settingColumns || this.settingColumns.length<=0){
          return this.defColumns;
        }else{
          const cols = this.defColumns.filter(item => {
            if(item.key =='rowIndex'|| item.dataIndex=='action'){
              return true
            }
            if (this.settingColumns.includes(item.dataIndex)) {
              return true
            }
            return false
          })
          return cols;
        }
      },
      localCode(){
        return 'onl_'+this.currentTableName
      }
    },
    methods: {
      addNeedDetail(row) {

        this.$refs.baseModal.edit(row.id)
      },
      handleModalOk() {
        this.loadData();
      },
      editCell(value){
         this.isCell = value;
      },
      //保存数据
      saveCell(){
        for(let i=0;i<this.formData.length;i++){
           this.handleApplyRequest(this.formData[i],i,this.formData.length);
        }
        console.log('hhh',this.formData)
      },
      //表格数据变化回调
      valueChange(res){
        if(this.chooIds.indexOf(res.row.id)==-1){
          this.chooIds.push(res.row.id);
          this.formData.push(res.row);
        }else{
          this.formData = this.formData.map(item => item.id === res.row.id ? res.row : item);
        }
      },
      handleSelectRowChange(selectIds){
        console.log('ids:', selectIds)
      },
      //保存数据
      handleApplyRequest(formData,key,length){
          Object.keys(formData).map(key=>{
            if(Array.isArray(formData[key])){
              if(formData[key].length==0){
                formData[key] = ''
              }
            }
          })
          httpAction(this.url.optPre+this.code,formData,"put").then((res)=>{
            if(res.success){
                if(key==length-1){
                  this.$message.success(res.message);
                  this.loadData();
                  this.isCell = false;
                }
            }else{
              this.$message.warning(res.message)
            }
          })
      },
      hasBpmStatusFilter(){
        var columnObjs = this.defColumns;
        let columns = [];
        for (var item of columnObjs) {
          columns.push(item.dataIndex);
        }
        if(columns.includes('bpm_status')||columns.includes('BPM_STATUS')){
          this.hasBpmStatus = true;
        }else{
          this.hasBpmStatus = false;
        }
      },
      startProcess: function(record){
        var that = this;
        this.$confirm({
          title:"提示",
          content:"确认提交流程吗?",
          onOk: function(){
            var param = {
              flowCode:that.flowCodePre+that.currentTableName,
              id:record.id,
              formUrl:"modules/bpm/task/form/OnlineFormDetail",
              formUrlMobile:"online/OnlineDetailForm"
            }
            postAction(that.url.startProcess,param).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.loadData();
                that.onClearSelected();
              }else{
                that.$message.warning(res.message);
              }
            });
          }
        });
      },
      handlePreviewPic: function(record){
        var flowCode = this.flowCodePre+this.currentTableName;
        var dataId = record.id;
        this.$refs.processInstPicModal.preview(flowCode,dataId);
        this.$refs.processInstPicModal.title="流程图";
      },
      initQueryInfo(){
        getAction(`${this.url.getQueryInfo}${this.code}`).then((res)=>{
          console.log("--onlineList-获取查询条件配置",res);
          if(res.success){
            //系统变量替换
            this.replaceSysParam(res.result);
            this.queryInfo = res.result
            //查询条件form 默认值设置
            for(let item of res.result){
              if(item.config === '1'){
                if(item.defValue && item.defValue.length>0 && item.mode === 'single'){
                  this.$set(this.queryParam,item.field,item.defValue);
                }
              }
              if (item.hidden === '1'){
                this.hasQueryHidden = true;
              }
            }
          }else{
            this.$message.warning(res.message)
          }
        })
      },
      replaceSysParam(resResult){
        // 组装系统变量
        let userinfo = Vue.ls.get(USER_INFO);
        let sysParam = {
          sys_user_code: userinfo.username,
          sys_user_name: userinfo.realname,
          sys_org_code: userinfo.orgCode,
          sys_date: moment(new Date()).format('YYYY-MM-DD'),
          sys_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')+'',
        }
        let sysParamPattern = /\#{([^}]+)?}/
        for(let item of resResult){
          if (item.defValue && sysParamPattern.test(item.defValue)){
            item.defValue = item.defValue.trim().replace(/\#{([^}]+)?}/g, (s1, s2) => sysParam[s2])
          }
        }
      },
      initAutoList(){
        if(!this.$route.params.code){
          return false
        }
        // 清空高级查询条件
        this.superQuery.params = ''
        if (this.$refs.superQuery) {
          this.$refs.superQuery.handleReset()
        }

        this.table.loading = true
        this.code = this.$route.params.code
        if (!this.queryParam) {
          this.queryParam = {}
        }
        getAction(`${this.url.getColumns}${this.code}`).then((res)=>{


          console.log("--onlineList-加载动态列>>",res);
          if(res.success){
            this.formOpenType = res.result.formOpenType ? res.result.formOpenType : '0';
            if(res.result.checkboxFlag == 'Y'){
              this.checkboxFlag = true
            }else{
              this.checkboxFlag = false
            }

            if(res.result.paginationFlag=='Y'){
              this.table.pagination = {...this.metaPagination}
            }else{
              this.table.pagination = false
            }
            // href 跳转
            const fieldHrefSlotKeysMap = {}
            res.result.fieldHrefSlots.forEach(item => fieldHrefSlotKeysMap[item.slotName] = item)
            this.dictOptions = res.result.dictOptions
            this.formTemplate = res.result.formTemplate
            this.description = res.result.description
            this.currentTableName = res.result.currentTableName
            this.initCgButtonList(res.result.cgButtonList)
            this.initCgEnhanceJs(res.result.enhanceJs)
            this.initButtonSwitch(res.result.hideColumns)
            res.result.columns.forEach(column => {
              Object.keys(column).map(key => {
                // 删掉空值的字段（不删除 空字符串('') 或 数字 0 ）
                if (column[key] == null) {
                  delete column[key]
                }
              })
              // 处理列中的 href 跳转和 dict 字典，使两者可以兼容存在
              this.handleColumnHrefAndDictAndEllipsis(column, fieldHrefSlotKeysMap)
              // 超长字符串缩略显示
              if (!column.scopedSlots){
                // 使用的插槽名称前缀为’ellipsis_‘
                column.scopedSlots = { customRender: 'ellipsis_'+column.dataIndex}
              }
              // 控件宽度
              if (column.fieldLength){
                column.width = column.fieldLength
              }
            })
            this.defColumns = res.result.columns.concat([this.actionColumn])
            this.settingColumnsHandler(res.result.columns);
            this.scrollFlag = res.result.scrollFlag
            this.hasBpmStatusFilter();
            this.loadData();
            this.initQueryInfo();
            //加载新路由，清空checkbox选中
            this.table.selectedRowKeys = [];
          }else{
            this.$message.warning(res.message)
          }
        })
      },
      loadData(arg){
        if(this.table.pagination){
          if(arg==1){
            this.table.pagination.current=1
          }
          this.table.loading = true
          let params = this.getQueryParams();//查询条件
          this.fuzzyQuery(params)
          console.log("--onlineList-查询条件-->",params)
          getAction(`${this.url.getData}${this.code}`,params).then((res)=>{
            console.log("--onlineList-列表数据",res)
            if(res.success){
              let result = res.result;
              if(Number(result.total)>0){
                this.table.pagination.total = Number(result.total)
                this.table.dataSource = result.records
                console.log( this.table.dataSource,88888)
              }else{
                this.table.pagination.total=0;
                this.table.dataSource=[]
                //this.$message.warning("查无数据")
              }
            }else{
              this.$message.warning(res.message)
            }
          }).finally(() => {
            this.table.loading = false
          })
        }else{
          this.loadDataNoPage()
        }
      },
      loadDataNoPage(){
        this.table.loading = true
        let param = this.getQueryParams()//查询条件
        param['pageSize'] = -521;
        getAction(`${this.url.getData}${this.code}`,filterObj(param)).then((res)=>{
          console.log("--onlineList-列表数据",res)
          if(res.success){
            let result = res.result;
            if(Number(result.total)>0){
              this.table.dataSource = result.records
            }else{
              this.table.dataSource=[]
            }
          }else{
            this.$message.warning(res.message)
          }
        }).finally(() => {
          this.table.loading = false
        })
      },
      getQueryParams() {
        let param = Object.assign({}, this.queryParam,this.isorter);
        param.pageNo = this.table.pagination.current;
        param.pageSize = this.table.pagination.pageSize;
        param.superQueryMatchType = this.superQuery.matchType
        param.superQueryParams = encodeURIComponent(this.superQuery.params)
        return filterObj(param);
      },
      handleChangeInTableSelect(selectedRowKeys, selectionRows) {
        this.table.selectedRowKeys = selectedRowKeys
        this.table.selectionRows = selectionRows
        this.selectedRowKeys = selectedRowKeys
      },
      handleTableChange(pagination, filters, sorter){
        //TODO 筛选
        if (Object.keys(sorter).length>0){
          this.isorter.column = sorter.field;
          this.isorter.order = "ascend"==sorter.order?"asc":"desc"
        }
        if(this.table.pagination){
          this.table.pagination = pagination;
        }
        this.loadData();
      },
      handleAdd(){
        this.cgButtonJsHandler('beforeAdd')
        if (this.formOpenType == '1') {
          this.$router.push({ path: '/online/cgformEdit/'+this.code+'/null/add'})
        } else {
          this.$refs.modal.add(this.formTemplate);
        }
      },
      handleImportXls(){
        this.$refs.importModal.show()
      },
      importOk(){
        this.loadData(1)
      },
      handleExportXls2(){
        let param = this.queryParam;
        if(this.table.selectedRowKeys && this.table.selectedRowKeys.length>0){
          param['selections'] = this.table.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(param));
        console.log('paramsStr: ' + paramsStr)
        let url = window._CONFIG['domianURL']+this.url.exportXls+this.code+"?paramsStr="+paramsStr
        window.location.href = url;
      },
      handleExportXls(){
        let param = this.getQueryParams();//查询条件

        this.fuzzyQuery(param)
        if(this.table.selectedRowKeys && this.table.selectedRowKeys.length>0){
          param['selections'] = this.table.selectedRowKeys.join(",")
        } else {
          delete param['selections'];
        }
        let paramsStr = JSON.stringify(filterObj(param));
        // 要导出的字段
        let settingColumns = "";
        this.settingColumns.forEach(item => {
          settingColumns += item + ','
        })
        downFile(this.url.exportXls+this.code,{paramsStr:paramsStr, settingColumns:settingColumns}).then((data)=>{
          if (!data || data.size===0) {
            this.$message.warning("文件下载失败")
            return
          }
          if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(new Blob([data]), this.description+'.xls')
          }else{
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', this.description+'.xls')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link); //下载完成移除元素
            window.URL.revokeObjectURL(url); //释放掉blob对象
          }
        })
      },
      handleEdit(record){
        if (this.formOpenType == '1') {
          this.$router.push({ path: '/online/cgformEdit/'+this.code+'/'+record.id+'/edit'})
        } else {
          this.$refs.modal.edit(this.formTemplate,record.id);
        }
      },
      showLinkButton(item,record){
        let btn = new ButtonExpHandler(item.exp,record);
        return btn.show;
      },
      handleDetail(record){
        if (this.formOpenType == '1') {
          this.$router.push({ path: '/online/cgformEdit/'+this.code+'/'+record.id+'/detail'})
        } else {
          this.$refs.modal.detail(this.formTemplate,record.id);
        }
      },
      handleDeleteOne(record){
        this.cgButtonLinkHandler(record,"beforeDelete","js")
        this.handleDelete(record.id)
      },
      handleDelete(id){
        deleteAction(this.url.optPre+this.code+"/"+id).then((res)=>{
          if(res.success){
            this.$message.success(res.message)
            this.loadData()
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      handleFormSuccess(){
        this.loadData()
      },
      // 查询完 schema 后，生成高级查询的字段列表
      handleGetSchema(schema) {
        console.log(schema,'111')
        if (schema && schema.properties) {
          let setField = (array, field) => {
            let type = field.view || (field.type || 'string')
            type = (type === 'inputNumber' ? 'number' : type)
            let params = {
              type: type,
              value: field.key,
              text: field.title,
              // 额外字典参数
              dictCode: field.dictCode,
              dictTable: field.dictTable,
              dictText: field.dictText,
              options: field.enum || field.options,
              order: field.order,
              querySuperHidden: field.querySuperHidden,
            }

            // 处理popup
            if (type === 'popup') {
              params['popup'] = {
                code: field.popupCode || field.code,
                field: field.orgFields.split(',')[0],
                orgFields: field.orgFields.split(',')[0],
                destFields: field.destFields.split(',')[0],
                dictFilter: field.dictFilter,
                querySuperHidden: field.querySuperHidden,
              }
            }
            array.push(params)
          }
          let fieldList = []
          let columns = []
          for (let key in schema.properties) {
            if (!schema.properties.hasOwnProperty(key)) {
              continue
            }
            let field = schema.properties[key]
            // tab = 子表 一对多
            if (field.view === 'tab' && field.relationType==0) {
              let subTable = {
                type: 'sub-table',
                value: field.key,
                text: field.describe,
                children: []
              }
              if(field.columns){
                for (let column of field.columns) {
                  setField(subTable.children, column)
                }
              }
              fieldList.push(subTable)
              // tab = 子表 一对一
            }  else if(field.view === 'tab' && field.relationType==1){
              let subTable = {
                type: 'sub-table',
                value: field.key,
                text: field.describe,
                children: []
              }
              Object.keys(field.properties).map(k=>{
                field.properties[k]['key'] = k;
                setField(subTable.children, field.properties[k]);
              })
              fieldList.push(subTable)
            } else {
              field.key = key
              setField(fieldList, field)
            }
          }
          // 冒泡排序
          for (let i = 0; i < fieldList.length; i++) {
            for (let j = i + 1; j < fieldList.length; j++) {
              let temp1 = fieldList[i]
              let temp2 = fieldList[j]
              if (temp1.order > temp2.order) {
                fieldList[i] = temp2
                fieldList[j] = temp1
              }
            }
          }
          //遍历表单数据集start
          let arr = []
          for (let i = 0; i < fieldList.length; i++) {
            let prop = schema.properties[fieldList[i]['value']];//属性
            let rules = [];
            if(schema.required&&schema.required.length>0&&schema.required.indexOf(prop.key)!=-1){
                rules.push({
                  required: true,
                  message: '请输入'+prop.title
                });
            }
            if(prop.pattern){
                (prop.pattern== "only")&&(prop.errorInfo="该值不可用，系统中已存在！")
                rules.push({
                  pattern: prop.pattern,
                  message: prop.errorInfo
                });
            }

            let tmpObj = {
              title: prop.title,
              key: prop.key,
              type: Types[prop.view],
              validateRules:rules
            }
            //下拉类型
            if(prop.enum){
              tmpObj.options = prop.enum;
            }
            //popup类型
            if(prop.view=="popup"){
              tmpObj.popupCode= prop.code;
              tmpObj.orgFields =prop.orgFields;
              tmpObj.destFields = prop.destFields;
              tmpObj.dictFilter = prop.dictFilter;
            }
            //cat_tree
            if(prop.view=="cat_tree"){
              tmpObj.pidValue = prop.pidValue;
              tmpObj.pidComponent = prop.pidComponent;
            }
            //sel_tree
            if(prop.view=="sel_tree"){
              tmpObj.dict = prop.dict;
              tmpObj.pidField = prop.pidField;
              tmpObj.pidValue = prop.pidValue;
              tmpObj.hasChildField = prop.hasChildField;
              tmpObj.pidComponent = prop.pidComponent;
            }
            arr.push(tmpObj);
          }
          this.fullColumns = arr;
          this.editColumns = arr;
          //过滤掉高询询询隐藏的字段
          let tempArr = [];
          fieldList.map(item => {
            if (item.querySuperHidden==='1'){
              return
            } else {
              tempArr.push(item)
            }
          })
          //遍历表单数据集end
          this.superQuery.fieldList = tempArr
        }
      },
      onClearSelected(){
        this.table.selectedRowKeys = []
        this.table.selectionRows = []
      },
      getImgView(text){
        if(text && text.indexOf(",")>0){
          text = text.substring(0,text.indexOf(","))
        }
        return getFileAccessHttpUrl(text)
      },
      downloadRowFile(text){
        if(!text){
          this.$message.warning("未知的文件")
          return;
        }
        if(text.indexOf(",")>0){
          text = text.substring(0,text.indexOf(","))
        }
        let url = getFileAccessHttpUrl(text);
        window.open(url);//TODO 下载的方法
      },
      handleDelBatch(){
        if(this.table.selectedRowKeys.length<=0){
          this.$message.warning('请选择一条记录！');
          return false;
        }else{
          let ids = "";
          let that = this;
          that.table.selectedRowKeys.forEach(function(val) {
            ids+=val+",";
          });
          that.$confirm({
            title:"确认删除",
            content:"是否删除选中数据?",
            onOk: function(){
              that.handleDelete(ids)
              that.onClearSelected();
            }
          });
        }
      },

      searchByquery(){
        this.loadData(1);
      },
      searchReset(){
        this.queryParam = {}
        this.loadData(1);
      },
      handleToggleSearch(){
        this.toggleSearchStatus = !this.toggleSearchStatus;
      },
      getFormatDate(text){
        if(!text){
          return ''
        }
        let a = text;
        if(a.length>10){
          a = a.substring(0,10);
        }
        return a;
      },
      getImportUrl(){
        return '/online/cgform/api/importXls/'+this.code
      },
      initCgEnhanceJs(enhanceJs){
        //console.log("--onlineList-js增强",enhanceJs)
        if(enhanceJs){
          let Obj = eval ("(" + enhanceJs + ")");
          this.EnhanceJS = new Obj(getAction,postAction,deleteAction);
          this.cgButtonJsHandler('created')
        }else{
          this.EnhanceJS = ''
        }
      },
      initCgButtonList(btnList){
        let linkArr = []
        let buttonArr = []
        if(btnList && btnList.length>0){
          for(let i=0;i<btnList.length;i++){
            let temp = btnList[i]
            if(temp.buttonStyle=='button'){
              buttonArr.push(temp)
            }else if(temp.buttonStyle=='link'){
              linkArr.push(temp)
            }
          }
        }
        this.cgButtonLinkList = [...linkArr]
        this.cgButtonList=[...buttonArr]
      },
      cgButtonJsHandler(buttonCode){
        if(this.EnhanceJS[buttonCode]){
          this.EnhanceJS[buttonCode](this)
        }
      },
      cgButtonActionHandler(buttonCode){
        //处理自定义button的 需要配置该button自定义sql
        if(!this.table.selectedRowKeys || this.table.selectedRowKeys.length==0){
          this.$message.warning("请先选中一条记录")
          return false
        }
        if(this.table.selectedRowKeys.length>1){
          this.$message.warning("请只选中一条记录")
          return false
        }
        let params = {
          formId:this.code,
          buttonCode:buttonCode,
          dataId:this.table.selectedRowKeys[0]
        }
        console.log("自定义按钮请求后台参数：",params)
        postAction(this.url.buttonAction,params).then(res=>{
          if(res.success){
            this.loadData()
            this.$message.success("处理完成!")
          }else{
            this.$message.warning("处理失败!")
          }
        })

      },
      cgButtonLinkHandler(record,buttonCode,optType){
        if(optType=="js"){
          if(this.EnhanceJS[buttonCode]){
            this.EnhanceJS[buttonCode](this,record)
          }
        }else if(optType=="action"){
          let params = {
            formId:this.code,
            buttonCode:buttonCode,
            dataId:record.id
          }
          console.log("自定义按钮link请求后台参数：",params)
          postAction(this.url.buttonAction,params).then(res=>{
            if(res.success){
              this.loadData()
              this.$message.success("处理完成!")
            }else{
              this.$message.warning("处理失败!")
            }
          })
        }
      },
      initButtonSwitch(hideColumns){
        Object.keys(this.buttonSwitch).forEach(key=>{
          this.buttonSwitch[key]=true
        })
        if(hideColumns && hideColumns.length>0){
          Object.keys(this.buttonSwitch).forEach(key=>{
            if(hideColumns.indexOf(key)>=0){
              this.buttonSwitch[key]=false
            }
          })
        }
      },

      // 高级查询
      handleSuperQuery(params, matchType) {
        if (!params || params.length === 0) {
          this.superQuery.params = ''
        } else {
          this.superQuery.params = JSON.stringify(params)
        }
        this.superQuery.matchType = matchType
        this.loadData(1)
      },

      settingColumnsHandler(columns){
        let str = Vue.ls.get(this.localCode)
        if(!str || str.length==0){
          this.settingColumns = []
          columns.forEach(column => {
            if(this.settingColumns.indexOf(column['dataIndex'])<0 && column['isDefaultHideList']!=1){
              this.settingColumns.push(column['dataIndex'])
            }
          })
        }else{
          this.settingColumns = str.split(',')
        }
      },
      popVisibleChange(visible){
        if(this.settingColumns && this.settingColumns.length>0){
          Vue.ls.set(this.localCode, this.settingColumns.join(','))
        }
      },
      fuzzyQuery(param) {
        // 查询项预处理，配置模糊查询
        let stringParams = [];
        if (this.queryInfo && this.queryInfo.length > 0) {
          this.queryInfo.forEach(function (item) {
            if (item.view == 'text' && item.fuzzyQueryFlag == 1) {
              stringParams.push(item.field);
            }
          })
          stringParams.forEach(function (str) {
            if (str in param) {
              param[str] = '*' + param[str].replace(/\*/g, '') + '*';
            }
          })
        }
      },
      // 全选切换
      onCheckAllChange(e) {
        this.allSelectableCols = [];
        this.defColumns.forEach(item => {
          if (item.key!='rowIndex' && item.dataIndex!='action'){
            this.allSelectableCols.push(item.dataIndex);
          }
        })
        Object.assign(this, {
          settingColumns: e.target.checked ? this.allSelectableCols : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>
<style>
  .ant-card-body .table-operator{
    margin-bottom: 18px;
  }
  .ant-table-tbody .ant-table-row td{
    padding-top:15px;
    padding-bottom:15px;
  }
  .anty-row-operator button{margin: 0 5px}
  .ant-btn-danger{background-color: #ffffff}

  .anty-img-wrap{height:25px;position: relative;}
  .anty-img-wrap > img{max-height:100%;}
  .ant-modal-cust-warp{height: 100%}
  .ant-modal-cust-warp .ant-modal-body{height:calc(100% - 110px) !important;overflow-y: auto}
  .ant-modal-cust-warp .ant-modal-content{height:90% !important;overflow-y: hidden}
</style>
