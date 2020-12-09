<template>
    <a-card class="zt-perarr-search-wrapper" :bordered="false">
        <a-form-model
            ref="searchForm"
            :model="searchForm"
            >
            <!--:rules="searchRuleForm"-->
            <div class="zt-perarr-search-box">
                <div class="item-1">
                    <a-form-model-item label="所属小组" prop="departsName" class="select-1 select-0">
                      <a-select v-model="searchForm.departsName" placeholder="请选择小组">
                        <a-select-option class="radioGroup" value="">全部</a-select-option>
                        <a-select-option class="radioGroup" v-for="(i, index) in departments" :key="index" :value="index">{{ i }}
                        </a-select-option>
                      </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="技术类型" prop="type" class="select-1 select-2">
                        <a-checkbox-group
                            v-model="searchForm.type"
                            name="onlinecgformSelect"
                            :options="onlinecgformSelect"
                            />
                    </a-form-model-item>
                </div>
                <div class="item-2">
                    <a-form-model-item class="select-1">
                        <a-button class="sel-btn-1" icon="search" type="primary" @click="submitForm('searchForm')">
                            搜索
                        </a-button>
                        <!--<a-button icon="redo" type="primary" @click="resetForm('searchForm')">
                            重置
                        </a-button>-->
                    </a-form-model-item>
                </div>
            </div>

        </a-form-model>
    </a-card>
</template>
<script>
import {onlinecgformList} from '@/api/user'
import { getAction , postAction } from '@/api/manage'
export default {
    name:"ztPerArrSearch",
    data(){
        return {
            onlinecgformSelect:[],
            departsNames: [],
            departsNamesAll: [],
            departsNamesSelect: [],
            orgCode:'',
            searchForm:{
                departsName:undefined,
                type:[]
            },
            searchRuleForm:{
                departsName:[{required:true,message:"请选择部门",trigger:"change"}],
                type:[{required:true,message:"请勾选技术类型",trigger:"change"}],
            },

          departmentsAll:[],
          departments:[],
          departmentUrl:'/online/cgform/api/getData/00bd850b126c4c51aa5a3bad7b009ef7?_t=1606716274&column=createTime&order=desc&pageNo=1&pageSize=100&superQueryMatchType=and',
        }
    },
    created(){
        this.queryDepartTreeList();
        this.onlinecgformList();
    },
    methods:{
        // 获取技术类型
        onlinecgformList(){
            return new Promise(()=>{
                onlinecgformList().then(res => {
                    console.log(res)
                    if(res.success){
                        let {records} = res.result;
                        if(Array.isArray(records) && records.length > 0){
                            let arrEmpty = []
                            records.forEach(item => {
                                let obj = {};
                                obj.value = item.id;
                                obj.label = item.name
                                arrEmpty.push(obj)
                            })
                            this.onlinecgformSelect = arrEmpty;
                        }
                    }else{
                        this.$message.error(res.message)
                    }
                })
            })
        },
        // 部门列表all
        queryDepartTreeList() {
            return new Promise(() => {
              getAction(this.departmentUrl).then((res) => {
                if (res.success) {
                  let dataArrays = [];
                  let dataArraysId  = [];

                  for (let key in res.result.records) {
                    dataArrays.push(res.result.records[key].de_name)
                    dataArraysId.push(res.result.records[key].id)
                  }
                  this .departments = dataArrays;
                  this .departmentsAll = dataArraysId;
                }
              })
            })
        },
        departsNameFor(n,key){
            if(key){
                for(let it of n){
                    if(it.key === key){
                        this.orgCode = it.orgCode
                        break;
                    }
                    if(it.children){
                        this.departsNameFor(it.children,key)
                    }
                }
            }else{
                this.orgCode = undefined
            }

        },
        resetForm(){
            this.searchForm = {
                departsName:undefined,
                type:[]
            }
        },
        submitForm(formName){

                    let data = {};
                    data.type = this.searchForm.type;
                    data.orgCode = this.departments[this.searchForm.departsName];

                    //console.log("查询数据",data)
                    this.$emit("onSubmitForm",data)
        }
    }

}
</script>
<style lang="less">
.zt-perarr-search-wrapper{
    .ant-card-body{
        padding: 14px 24px 0;
    }
        .zt-perarr-search-box{
        display: flex;
        .item-1{
            // display: flex;
            .ant-form-item-with-help{
                margin-block-start: 0;
            }
        }
        .item-2{
            flex: 1;
            max-width: 200px;
            align-self: flex-end;
            .sel-btn-1{
                margin-right: 10px;
            }
        }
        .ant-select-disabled{
            .ant-select-selection{
                background: #fff;
            }
        }

        .select-1{
            display: flex;
            margin-bottom: 14px;
            .ant-form-item-label{
                width: 80px;
            }
            &.select-0{
                .ant-form-item-control-wrapper{

                    width: 195px;
                }
            }
        }
        .select-2{
            // margin-left: 20px;
            .ant-form-item-label{
            }
            .ant-checkbox-wrapper{
                width: 90px;
                margin-left: 0!important;
                margin-right: 0;
                margin-bottom: 0;
            }
            .ant-form-item-control-wrapper{
                flex: 1;
            }
        }
        .select-3{

        }
    }
}

</style>