<template>
    <div class="ty-m-list">
        <div class="search-filter-list">
            <el-input
                class="search-list"
                placeholder="请输入内容"
                v-model="seaInpVal"
                >
                <i slot="suffix" @click.stop="search" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button class="filter-list" @click="drawer = true" icon="el-icon-office-building">筛选</el-button>
        </div>
        <div class="infinite-list-wrapper" style="overflow:auto">
            <div
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled">
                <el-card
                    v-for="i in count"
                    :body-style="{ padding: '0px 10px'}"
                    :key="i"
                    class="el-card-tpl"
                    shadow="always">
                    <div class="list-item">
                        <div>{{i}}</div>
                        <p class="item-1">
                            <span>{{paramsFn()[0] || ''}}</span>
                            <span>{{paramsFn()[1] || ''}}</span>
                        </p>
                        <p class="item-2">{{paramsFn()[2] || ''}}</p>
                        <p class="item-3">
                            <span>{{paramsFn()[3] || ''}}</span>
                            <span>{{paramsFn()[4] || ''}}</span>
                        </p>
                    </div>
                </el-card>
            </div>
            <p v-if="loading" align="center">加载中...</p>
            <p v-if="noMore" align="center">没有更多了</p>
        </div>
        <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :with-header="false">
            <span>我来啦!</span>
            </el-drawer>
    </div>
</template>
<script>
import Until from './until.js'
import _api from '@/api'
export default {
    name:"TyMListp",
    data(){
        return {
            count: 10,
            loading: false,
            drawer: false,
            seaInpVal:'',
            list:[]
        }
    },
    props:['data'],
    computed: {
        noMore () {
            return this.count >= 20
        },
        disabled () {
            return this.loading || this.noMore
        }
    },
    mounted(){
        console.log(this.data)
    },
    methods:{
        load () {
            this.loading = true
            setTimeout(() => {
            this.count += 2
            this.loading = false
            }, 2000)
        },
        paramsFn(){
            // return []
            let val = this.data.list[0].options.cardFeild;
            let valArr = val.split(',')
            return valArr
        },
        search(){
            let element = this.data.list[0];
            let cardUrl = element.options.cardUrl;
            _api.getMlistCardURL(cardUrl,{keyword:seaInpVal,page:1,pageSize:20}).then(res=>{
                let {success, result, message} = res;
                let {records} = result
                if(success){
                    this.list = records;
                }
            })
        }
    }
}
</script>
<style lang="scss">
.ty-m-list{
    .search-filter-list{
        display: flex;
        margin-bottom:10px;
        .filter-list{
            min-width: 60px;
            margin-left: 10px;
            padding: 0;
        }
        .search-list{
            
            flex: 1;
        }
    }
    .infinite-list-wrapper{
        height: 400px;
        overflow: auto;
    }
    .el-card-tpl{
        margin-bottom: 15px;
    }
    .list-item{
        p{
            display: flex;
            justify-content: space-between;
            color: #AAAAAA;
            &.item-1{
                color: #333;
                span:nth-child(2){
                    font-size: 13px;
                }
            }
            &.item-3{
                span:nth-child(2){
                    font-size: 13px;
                }
            }
        }
    }
}
</style>