<template>
    <a-modal
        title="关联表单"
        :width="1000"
        :visible="visible"
        :style="{ top: '0', padding: '0' }"
        :bodyStyle="{padding: '0'}"
        :maskClosable="false"
        :destroyOnClose="true"
        :keyboard="false"
        @cancel="handleCancel"
        @ok="handleOk"
    >
        <a-form-model layout="inline" :model="formInline" ref="formInline" style="padding:16px 16px 0">
            <a-form-model-item label="表单名称" prop="formName">
                <a-input v-model="formInline.formName"  placeholder="请输入表单名称" allow-clear/>
            </a-form-model-item>
            <a-form-model-item>
                <a-space>
                    <a-button type="primary" @click="souBtn">搜索</a-button>
                    <a-button type="primary" @click="resetBtn">重置</a-button>
                </a-space>
            </a-form-model-item>
        </a-form-model>
        <a-table
            style="margin:20px"
            ref="table"
            bordered
            :row-key="record => `${record.desformCode}@@${record.formType}`"
            :columns="columns"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            :dataSource="dataSource"
            :pagination="false"
            :loading="tableLoading"
            :scroll="{ y: 400 }"
            @change="handleTableChange"
        >
            <span slot="formType" slot-scope="text, column">
                <span v-if="column.formType === 'online_form'">online在线开发表单</span>
                <span v-if="column.formType === 'design_form'">设计器表单</span>
                <span v-if="column.formType === 'outer_form'">外部表单</span>
            </span>
            <span slot="action" slot-scope="text,column">
                <a-space>
                    <a :href="`${column.getdataUrl}/${column.id}`" target="_blank">查看</a>
                </a-space>
            </span>  
        </a-table>
    </a-modal>
</template>
<script>

import {approvalFormInfoGetALLFormList} from '@/api/approval'
import exconst from '../../exconst.js'
import dayjs from 'dayjs'
export default {
    data(){
        return {
            visible: false,
            tableLoading:true,
            // 表头
            columns: exconst.columns1,
            formInline:{
                formName:''
            },
            dataSource:[],
            selectedRowKeys:[],
            selectArr:[],
            cachelit:{},
            ipagination:{
                showSizeChanger:true,
                showQuickJumper:true,
                showLessItems:true,
                pageSizeOptions:["10", "20", "50"],
                pageNo:1,
                pageSize:9999
            },
        }
    },
    methods:{
        onSelectChange(selectedRowKeys, selectedRows){
            console.log(selectedRowKeys)
            this.selectedRowKeys = selectedRowKeys;
        },
        handleCancel(){
            this.visible = false;
            this.$emit("ref_form_list", this.selectArr);
            this.resetal();
        },
        filterParentData(){
            this.dataSource.forEach(item => {
                this.selectedRowKeys.forEach(it => {
                    if(it === `${item.desformCode}@@${item.formType}`){
                        this.selectArr.push(item);
                    }
                })
            })
        },
        handleOk(){
            this.filterParentData(this.selectedRowKeys);
            this.$emit("ref_form_list", this.selectArr);
            this.resetal();
        },
        resetal(){
            this.visible = false;
            this.selectedRowKeys = [];
            this.selectArr = [];
            const pager = { ...this.ipagination };
            pager.current = 1;
            this.ipagination = pager;
        },
        show(o){
            this.visible = true;
            this.tableLoading = true;
            this.initTable({pageNo:1,pageSize:this.ipagination.pageSize},o);
        },
        resetBtn(){
            this.tableLoading = true;
            this.$refs.formInline.resetFields();
            this.initTable({pageNo:1,pageSize:this.ipagination.pageSize});
        },
        souBtn(){
            this.initTable({pageNo:1,pageSize:this.ipagination.pageSize,...this.formInline});
        },
        donwOnlineBtnCl(column, index, type){
            this.tableLoading = true;
            let onlineState = column.onlineState;
            onlineState = type
            approvalFormInfoChangeOnlineState({onlineState,id:column.id}).then(res=>{
                this.tableLoading = false;
                let {success, message} = res;
                if(success){
                    let columnCache = {...column};
                    columnCache.onlineState = onlineState
                    this.$set(this.dataSource, index, columnCache)
                }else{
                    this.$message.error(message)
                }

            }).catch(e=>{
                this.tableLoading = false
            })
        },
        initTable(params,o){
            approvalFormInfoGetALLFormList(params).then(res => {
                this.tableLoading = false;
                let {success, result, message} = res;
                if(success){
                    let {records, total, current} = result;
                    this.dataSource = records;
                    if(Array.isArray(o) && o.length > 0){
                        this.selectArr = []
                        this.selectedRowKeys = o;
                        this.filterParentData();
                    }
                    this.ipagination = this.fnPage({total,pageNo:current,pageSize:params.pageSize})//pagination
                    
                }else{
                    this.$message.error(message)
                }
            }).catch(e => {
                this.tableLoading = false;
            })
        },
        handleTableChange(pagination, filters, sorter, currentDataSource){
            let groupId = this.groupId;
            let formName = this.formInline.formName;
            let pageNo = pagination.current;
            let pageSize = pagination.pageSize;
            this.ipagination = this.fnPage({pageNo,pageSize})
            this.tableLoading = true;
            this.initTable({pageNo, pageSize, formName})
        },
        fnPage(o){
            let paginationCache = {...this.pagination}
            paginationCache = {...paginationCache,...o}
            return paginationCache
        }
    }
}
</script>
<style lang="less">

</style>