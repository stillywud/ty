<template>
    <van-row class="mtt-tpl-upload">
        <van-col span="6">
            <div class="mtt-tpl-block__title">{{title}}</div>
        </van-col>
        <van-col span="18">
            <van-uploader 
            
            :disabled="disabled"/>
        </van-col>
    </van-row>
</template>
<script>
export default {
    data(){
        return{
          
        }
    },
    props:{
        title:{
            type:String,
            default:''
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
    },
    methods:{
       
    }
}
</script>
<style lang="scss" scoped>
.mtt-tpl-upload{
    margin-bottom: 16px;
}
.mtt-tpl-block__title{
    margin: 0;
    padding: 32px 16px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
}
    
</style>
