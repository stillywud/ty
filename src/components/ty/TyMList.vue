<template>
    <div class="ty-m-list">
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
    </div>
</template>
<script>
import Until from './until.js'
export default {
    name:"TyMList",
    data(){
        return {
          
        }
    },
    props:['placeholder','element','rules'],
    methods:{
        paramsFn(){
            let val = this.element.options.cardFeild;
            console.log(val)
            let valArr = val.split(',')
            return valArr
        }
    }
}
</script>
<style lang="scss">
.ty-m-list{
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