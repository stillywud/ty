<template>
    <div class="ty-m-list">
        <div class="search-filter-list">
            <el-input
                class="search-list"
                :readonly="true"
                :placeholder="element.options.searchPlaceholder"
                >
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button class="filter-list" icon="el-icon-office-building">筛选</el-button>
        </div>
        <el-card
            :body-style="{ padding: '0px 10px' }"
            shadow="always">
            <div class="list-item">
                <p class="item-1">
                    <span>{{paramsFn()[0] || '第一个字段'}}</span>
                    <span>{{paramsFn()[1] || '第二个字段'}}</span>
                </p>
                <p class="item-2">{{paramsFn()[2] || '第三个字段'}}</p>
                <p class="item-3">
                    <span>{{paramsFn()[3] || '第四个字段'}}</span>
                    <span>{{paramsFn()[4] || '第五个字段'}}</span>
                </p>
            </div>
        </el-card>
        <!-- 操作按钮 -->
      <el-button
          title="删除"
          style="bottom: -20px;"
          class="widget-action-delete"
          type="danger" circle plain
          @click.stop="handleWidgetDelete(index)"
      >
        <i class="iconfont icon-trash"></i>
      </el-button>
    </div>
</template>
<script>
import { ElementAction, WidgetDraggable } from '@/mixins/CommonMixins'
import Until from './until.js'
export default {
    name:"TyMList",
    data(){
        return {
          
        }
    },
    mixins: [ElementAction, WidgetDraggable],
    props:['placeholder','element','rules','data','index'],
    methods:{
        paramsFn(){
            let val = this.element.options.cardFeild;
            let valArr = val.split(',')
            return valArr
        }
    }
}
</script>
<style lang="scss">
.ty-m-list{
    position: relative;
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