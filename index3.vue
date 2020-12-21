<template>
    <div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :required="true"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :required="true"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field name="radio" :required="true" label="单选框" :rules="[{ required: true, message: '请填写单选框' }]">
                <template #input>
                    <van-radio-group v-model="radio" direction="horizontal">
                    <van-radio name="1">单选框 1</van-radio>
                    <van-radio name="2">单选框 2</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field name="uploader" label="文件上传" :required="true" :rules="[{ required: true, message: '请填写文件上传' }]">
                <template #input>
                    <van-uploader v-model="uploader" />
                </template>
            </van-field>
            <van-field
            readonly
            clickable
            :required="true"
            name="datetimePicker"
            :value="value"
            label="时间选择"
            placeholder="点击选择时间"
            @click="showPicker = true"
            :rules="[{ required: true, message: '请填写时间选择' }]"
            />
            <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
                type="time"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
            </van-popup>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
        <span @click="asfe">弹层</span>
        <comment-forward
            :title="commentForward.title"
            :placeholder="commentForward.placeholder"
            ref="commentForward"
        />
        <p class="as" ref="asas">
            <span v-for="(item,index) in nav" :key="index" @click="uuu(index)">{{item.name}}<van-icon name="arrow" /></span>
        </p>
        <van-checkbox-group v-model="result" ref="checkboxGroup" @change="change2">
        <van-checkbox name="a">复选框 a</van-checkbox>
        <van-checkbox name="b">复选框 b</van-checkbox>
        <van-checkbox name="c">复选框 c</van-checkbox>
        </van-checkbox-group>
    </div>
</template>
<script>
import commentForward from './index3/commentForward.vue'
export default {
    name:'sdf',
    data(){
        return {
            username: '',
      password: '',
      radio: '',
      uploader:[],
      value:'',
      showPicker:false,
            nav:[{id:1000,name:'全部'}],
            result:[],
            id:0,
            commentForwardShow:false,
            commentForward:{
                title:'评论',
                placeholder:'请输入内容'
            }
        }
    },
    components:{
        commentForward
    },
    methods:{
        onConfirm(){},
         onSubmit(values) {
      console.log('submit', values);
    },
        change2(p){
            console.log(p,this.result)
        },
        uuu(index){
            this.nav = this.nav.slice(0,index+1)
        },
        asfe(){
            this.nav.push({id:new Date().getTime(),name:"上纲上线分"+(++this.id)})
            // this.$refs.commentForward.show()
            this.$nextTick(()=>{
                let asas = this.$refs.asas
                let s = this.$refs.asas.children[this.nav.length-1].getBoundingClientRect();
                asas.scrollLeft += s.left - window.innerWidth / 2
                console.log(asas)
            })
            
        }
    }
}
</script>
<style lang="scss">
*{
    padding: 0;
    margin: 0;
    font-size: 12px;
}
.as{
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    // display: flex;
    white-space: nowrap;
    padding: 10px ;
    overflow-y: auto;
    overflow-y: hidden;
    span{
        font-size: 20px;
        // display: flex;
        // align-items: center;
        line-height: 1;
    }
}
.mtt-comment-forward-box-A{
    font-size: 12px;
    .van-action-sheet__header{
        display: flex;
        padding: 0 16px;
    }
}
</style>