<template>
    <div class="mtt-tpl-making">
        <!-- <van-row>
            <van-col span="8">span: 8</van-col>
            <van-col span="8">span: 8</van-col>
            <van-col span="8">span: 8</van-col>
        </van-row>
        <van-field  v-model="value" label="" placeholder="请输入用户名" />
        <mtt-upload 
            :title="title"
            :disabled="disabled"
            :accept="accept"
        /> -->
        <!-- <mt-input 

        /> -->
        <van-form @submit="onSubmit">
            <mt-preview
                v-for="(it, index) in list"
                :key="index"
                :elementData="it"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                提交
                </van-button>
            </div>
        </van-form>

        <div @click="sdf">111</div>
    </div>
</template>
<script>
import MttUpload from './com/upload.vue'
import MtInput from './com/MtInput.vue'
import MtPreview from './com/MtPreview.vue'
export default {
    data(){
        return{
            value:'',
            list:[
                {type:'input',name:"请示主题",typeType:"text",required:false,pattern:'/\d{6}/',options:{defaultValue:undefined,maxlength:2}},
                {type:'input',name:"错误信息",typeType:"textarea",required:true,pattern:'/\d{6}/',options:{defaultValue:undefined}}
            ]
        }
    },
    components:{
        MttUpload,
        MtInput,
        MtPreview
    },
    mounted(){
        
    },
    methods:{
       sdf(){
            console.log(this.list)
        },
        onSubmit(){
            console.log(this.list,1)
        }
    }
}
</script>
<style lang="scss">
.mtt-tpl-making{
    background: #fff;
    min-height: 100vh;
    font-size: 14px;
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
}
    
</style>
