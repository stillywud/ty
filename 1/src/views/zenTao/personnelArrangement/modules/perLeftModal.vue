<template>
    <a-card class="jm-leri-left-card-box" :bordered="false" >
        <div class="leri-left-btn">
            <div style="font-size:16px">员工列表</div>
            <!-- <a-button v-if="userNameList.length > 0" @click="searchFullCalendarCal" type="primary">确认</a-button> -->
        </div>
        <div v-if="userNameList.length > 0">
            <a-table
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                :columns="columns"
                rowKey="value"
                :data-source="userNameList"
                :pagination="false"
                :bordered="true"
                :scroll="{y: 360 }"
            />
        </div>
    </a-card>
</template>
<script>
export default {
    data(){
        return{
            selectedRowKeys:[],
            columns:[
                {
                    title: '姓名',
                    dataIndex: 'label',
                    width:100
                },
                {
                    title: '技能',
                    dataIndex: 'name',
                    width:160,
                    ellipsis: true,
                    customRender:(text, record, index)=>{
                        return <a-tooltip placement="topLeft">
                                <template slot="title">{text}</template>
                                {text}
                            </a-tooltip>
                    }
                },
            ],
        }
    },
    props:{
        userNameList:{
            default:[]
        }
    },
    watch:{
        userNameList:{
            handler(val, oldVal){
                this.selectedRowKeys = [];
            },
            deep:true,
            immediate: true
        }
    },
    methods:{
        onSelectChange(selectedRowKeys, selectedRows){
            this.selectedRowKeys = selectedRowKeys;
            this.$emit("onSearchFullCalendarCal",selectedRows)
        }
    }
}
</script>
<style lang="less">

</style>