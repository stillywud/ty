<template>
    <a-card :loading="cardloading" class="zt-perarr-leri-wrapper" :bordered="false">
        <a-row class="leri-box">
            <a-row>
              <!-- 查询条件模块，关联modules的search.vue -->
                <zt-per-arr-search
                    @onSubmitForm="onSubmitForm"
                />
            </a-row>
            <div class="leri-box-con">
                <div class="leri-box-sel-1">
                  <!--员工列表模块，关联modules的perLeftModal.vue -->
                    <per-left-modal
                        :userNameList="userNameList"
                        @onSearchFullCalendarCal="onSearchFullCalendarCal"
                    />
                </div>
                <div class="leri-box-sel-2" ref="leriBoxSel2">
                  <!--日历模块，关联modules的perRightModal.vue-->
                    <per-right-modal
                        ref="perRightModal"
                        :heightY="heightY"
                        :calendarEvents="calendarEvents"
                        :selecto="selecto"
                        @onHandleEventClick="onHandleEventClick"
                    />
                </div>
            </div>
            <per-detail-modal ref="baseModal"/>
        </a-row>
    </a-card>

</template>
<script>


import ztPerArrSearch from './modules/search'
import perDetailModal from './modules/perDetailModal'
import perLeftModal from './modules/perLeftModal'
import perRightModal from './modules/perRightModal'
//   import { mixin } from '@/utils/mixin.js'

import {queryByOrgCodeForAddressList,onlinecgformList1,onlinecgreportList} from '@/api/user'
import { getAction , postAction } from '@/api/manage'

export default {
    components: {
        perDetailModal,
        perLeftModal,
        perRightModal,
        ztPerArrSearch,

    },
    // mixins: [mixin],
    data() {
        return {
            cardloading:true,
            onlinecgformListArrCopy:[],// 所有技术人员
            userNameListOrgCode:[], // 根据部门茶人
            userNameList: [],
            calendarEvents:[],
            heightY:500,
            selecto:[],
          personnelUrl:'/online/cgreport/api/getColumnsAndData/1333651696970309634?_t=1606805091&order=desc&pageNo=1&pageSize=9999'
        }
    },
    created(){
        this.init();
    },
    methods:{
        async init(){
            this.getDataList('');
        },
        // 部门与技术类型获取人员取相同数据
        onSubmitForm(n){
          let name = n.orgCode;//部门
          let type = n.type;//类型
          let sql  ='';
          if(name!=undefined){
                sql += "&deptname="+name;
          }
          /*if(type!=undefined){
            sql += "&techtypeid="+type;
          }*/
          this.getDataList(sql,type);
        },
        getDataList(resta,type){
          getAction(this.personnelUrl+resta).then((res) => {
            if (res.success) {
              let filterAll = []
              for (let key in res.result.data.records) {
                let data = res.result.data.records[key];
                if(type!=null&&type.length!=0&&data.techtypeid!=null){
                  if(!RegExp(type.join('|')).test(data.techtypeid)){
                    continue;
                  }
                }
                let filter = {};
                filter.label = data.realname;
                filter.name = data.techtypename;
                filter.techtypeid = data.techtypeid;
                filter.value = data.account;
                filterAll.push(filter);
              }
              this.cardloading = false;
              this.$nextTick(()=>{
                this.userNameList = filterAll;
                this.heightY = this.$refs.leriBoxSel2.clientHeight - 50;
              })
            }
          })
        },
      onSearchFullCalendarCal(o){
        this.selecto = o;
      },
        onHandleEventClick(event){
            console.log(event,'event')
            let { id } = event
            this.$refs.baseModal.showDetail(id)

        },
    }
}

</script>
<style lang='less'>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
.zt-perarr-leri-wrapper{
    background: #f0f2f5;
    > .ant-card-body{
        padding: 0;
    }
}
.leri-box{
    .leri-box-con{
        margin-top: 10px;
        display: flex;
        height: calc(100vh - 280px);
        .leri-box-sel-1{
            width: 420px;
            margin-right: 10px;
        }
        .leri-box-sel-2{
            flex: 1;
        }
    }
    .jm-leri-left-card-box{
        background: #fff;
        height: 100%;
        min-height: 500px;
        .ant-card-body{
            padding: 14px 14px 14px 21px;
        }
        .leri-left-btn{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 32px;
            margin-bottom: 25px;
        }
        .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
            padding: 10px;
        }
        .ant-table-selection-col{
            width: 30px;
        }
        .ant-checkbox-group{
        text-align: left;
        display:block;

        }
        .ant-checkbox-group-item{
        display: block;
        margin-bottom: 16px;
        }
    }
    .jm-leri-right-card-box{
        background: #fff;
        height: 100%;
        min-height: 500px;
        .ant-card-body{
            padding: 14px 21px 14px 14px;
        }
        .fc-button .fc-icon{
            vertical-align: sub;
        }
        .fc-view-container{
        }
        .fc-button-primary{
            background-color: #1890FF;
            border-color: #1890FF;
        }
        .fc-button-active{
            background-color: #096dd9;
            border-color: #096dd9;
        }
    }
}
</style>
