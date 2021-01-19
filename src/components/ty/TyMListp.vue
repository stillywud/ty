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
        <div class="a1" @click="a1drawer" v-if="drawer">
            <div class="a1-body" @click.stop="a1body">
                <div class="a1-hed">
                    <i class="el-icon-close" @click="a1close"></i>
                </div>
                <div class="a1-con">
                    <div class="a1-con-list">
                        <div class="a1-con-list-1">
                            <div :class="[groupName === item.groupName] ? 'active' : '' ">{{item.groupName}}</div>
                            <div>测试数据测试数据测试数据</div>
                            <div>测试数据测试数据测试数据</div>
                            <div>测试数据测试数据测试数据</div>
                            <div>测试数据测试数据测试数据</div>
                            <div>测试数据测试数据测试数据</div>
                            <div>测试数据测试数据测试数据</div>
                            <div>测试数据测试数据测试数据</div>
                            <div>测试数据测试数据测试数据</div>
                        </div>
                    </div>
                </div>
                <div class="a1-fot">
                    <el-button>重置</el-button>
                    <el-button type="primary">确认</el-button>
                </div>
            </div>
        </div>
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
            list:[],
            groupName:''
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
        },
        a1close(){
            this.drawer = false
        },
        a1body(){},
        a1drawer(){
            this.drawer = false
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
    .a1{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        z-index: 10;
        height: 100%;
        width: 100%;
        .a1-body{
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: 85%;
            background: #fff;
            display: flex;
            flex-direction: column;
            .a1-hed{
                width: 100%;
                height: 40px;
                position: relative;
                .el-icon-close{
                    position: absolute;
                    right: 5px;
                    top: 10px;
                    font-size: 20px;
                }
            }
            .a1-con{
                flex: 1;
                position: relative;
                background-color: #f7f7f7;
                overflow: hidden;
                .a1-con-list{
                    -webkit-overflow-scrolling: touch;
                    overflow: hidden;
                    overflow-y: auto;
                    box-sizing: border-box;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1;
                    width: calc(100% + 17px);
                    .a1-con-list-1{
                        background: #fff;
                        position: relative;
                        margin: 0;
                        padding: 10px 0 0 10px;
                        &::after{
                            content: "";
                            display: block;
                            clear: both;
                        }
                        > div{
                            box-sizing: border-box;
                            float: left;
                            width: 29.99%;
                            padding-right: 10px;
                            height: 30px;
                            line-height: 30px;
                            margin-bottom: 10px;
                            margin-right: 10px;
                            padding: 0 5px;
                            color: #666;
                            background-color: #f7f7f7;
                            border-radius: 4px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        
                    }
                }
            }
            .a1-fot{
                width: 100%;
                height: 50px;
                border-top: 1px solid #ddd;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>