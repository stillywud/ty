<template>
    <a-modal
      title="Title"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :width="800"
    ><!-- rowKey="HelpDetailID" -->
    <!-- <p>222</p> -->
        <a-table :pagination="pagination" 
        @change="handleTableChange" 
       
        :row-key="record => `${record.HelpDetailID}@@${record.RealName}`"
        :loading="loading" 
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
         :columns="columns" 
        :data-source="data" />
        <!-- <asd /> -->
    </a-modal>
</template>
<script>
import axios from 'axios'
// import asd from './three.vue'
export default {
    name:'ind2',
    data() {
        return {
            visible:false,
            loading:true,
            destroyOnClose:false,
            data:[],
            pagination:{
                pageSize:2
            },
            columns:[
                {
                        title: 'HelpDetailID',
                        dataIndex: 'HelpDetailID',
                    },
                    {
                        title: 'RealName',
                        dataIndex: 'RealName',
                    },
                    {
                        title: 'Status',
                        dataIndex: 'Status',
                    },
            ],
            selectedRowKeys: [], // Check here to configure the default column
        };
    },
    methods: {
        init(page,o){
            axios.get('https://www.fastmock.site/mock/ffb6c7bbbc1d29d2680b4ced9be90d58/58/api/helpList',{
                params:{
                    page
                }
            }).then(res => {
                this.loading = false;
                let {data} = res;
                let {info,total} = data;
                const pagination = { ...this.pagination };
                pagination.total = total;
                this.loading = false;
                this.data = info;
                this.pagination = pagination;
                if(Array.isArray(o) && o.length > 0){
                    this.selectedRowKeys = o;
                    console.log(this.selectedRowKeys)
                }
            })
        },
        show(o){
            this.visible = true;
            this.loading = true;
            this.init(1,o)
        },
        handleTableChange(pagination, filters, sorter) {
            this.loading = true;
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            let page = pagination.current
            this.init(page)
        },
        handleOk(e) {
            this.visible = false;
            this.$emit("emitlist",this.selectedRowKeys)
            this.resetal()
        },
        handleCancel(e) {
            this.visible = false;
            this.resetal()
        },
        onSelectChange(selectedRowKeys) {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
        },
        resetal(){
            
            this.selectedRowKeys = []
            const pager = { ...this.pagination };
            pager.current = 1;
            this.pagination = pager;
        }
    },
};
</script>