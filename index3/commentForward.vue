<template>
    <div>
        <van-action-sheet v-model="commentForwardShow" @cancel="cancelCl" @closed="closedCl" :close-on-click-overlay="false" :round="false" :title="title" class="mtt-comment-forward-box-A">
            <div class="content">
                <div class="contentA">
                    <van-field
                    class="content-textarea"
                    v-model="commentForwardMessage"
                    rows="3"
                    autosize
                    type="textarea"
                    :placeholder="placeholder"
                    show-word-limit
                    />
                    <div class="content-pepole">
                        <div class="content-pepole-hed" style="" @click="pepoleCl">@</div>
                        <div class="content-pepole-list">
                            <div class="list-item" v-for="(item,index) in pepolelist.slice(0,2)" :key="item.userid">
                                <van-icon name="plus" class="item-4" v-if="index !==0"/>
                                <van-icon name="close" class="item-1" @click="pepoleRemove(item.userId)"/>
                                <div class="item-2"><van-icon name="contact" /></div>
                                <p class="item-3">{{item.realname}}</p>
                            </div>
                            <div class="list-item" @click="pepoleAllBCl" v-if="pepolelist.length >2">
                                <van-icon name="plus" class="item-4"/>
                                <div class="item-2"><van-icon name="contact" /></div>
                                <p class="item-3">查看全部</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contentB">
                    <van-button plain type="info" @click="commentForwardShow=false">取消</van-button>
                    <van-button type="info" @click="okCl" style="margin-left:20px">确认</van-button>
                </div>
            </div>
        </van-action-sheet>
        <van-popup v-model="allPepoleShow" position="bottom" :style="{ height: '100vh' }">
            <van-nav-bar
                title="查看全部"
                left-text="返回"
                left-arrow
                @click-left="onClickLeftPepole"
                />
            <div class="content-pepole">
                <div class="content-pepole-list content-pepole-list-All">
                    <div class="list-item" v-for="(item,index) in pepolelist" :key="item.userid">
                        <van-icon name="close" class="item-1" @click="pepoleRemove(item.userId)"/>
                        <div class="item-2"><van-icon name="contact" /></div>
                        <p class="item-3">李三思</p>
                        <van-icon name="plus" class="item-4" v-if="index%5 !== 0"/>
                    </div>
                </div>
            </div>
        </van-popup>
        <comment-forward-lu
            ref="commentForwardLu"
            
        />
    </div>
</template>
<script>
import commentForwardLu from './commentForwardLu.vue'
export default {
    name:'sdf',
    data(){
        return {
            commentForwardShow:false,
            commentForwardMessage:'',
            allPepoleShow:false,
            AddPepoleShow:false,
            pepolelist:[
                {userId:1,realname:'李三思'},
                {userId:11,realname:'李三思'},
                {userId:21,realname:'李三思'},
                {userId:31,realname:'李三思'},
                {userId:41,realname:'李三思'},
                {userId:51,realname:'李三思'},
                {userId:61,realname:'李三思'},
                {userId:71,realname:'李三思'},
                {userId:81,realname:'李三思'},
                {userId:91,realname:'李三思'},
                {userId:101,realname:'李三思'},
                {userId:111,realname:'李三思'}
            ]
        }
    },
    props:['title','placeholder'],
    components:{
        commentForwardLu
    },
    methods:{
        show(){
            this.commentForwardShow = true
        },
        cancelCl(){
            console.log(1)
        },
        closedCl(){
            console.log(2)

        },
        okCl(){},
        pepoleCl(){
            this.$refs.commentForwardLu.show()
        },
        pepoleRemove(userId){
            this.pepolelist = this.pepolelist.filter(item => {
                return item.userId !== userId
            })
        },
        pepoleAllBCl(){
            this.allPepoleShow = true
        },
        onClickLeftPepole(){
            this.allPepoleShow = false
        },
    }
}
</script>
<style lang="scss" scoped>
.mtt-comment-forward-box-A{
    font-size: 12px;
    .content{
        padding-bottom: 10px;
    }
    .contentA{
        border: 1px solid #ddd;
        border-left: 0;
        border-right: 0;
        padding: 10px 20px;
        .content-textarea{
            border: 1px solid #ddd;
            width: auto;
            border-radius: 5px;
            padding: 5px 8px;
        }
    }
    .contentB{
        text-align: center;
        margin-top: 10px;
        button{
            height: 30px;
        }
    }
    
    .van-action-sheet__header{
        display: flex;
        padding: 0 16px;
    }
    .van-hairline--bottom{
        height: 1px;
        &::after{
            border-color: #000;
        }
    }
}
.content-pepole{
    padding-top: 10px;
    .content-pepole-hed{
        color:#1989fa;
        font-size:20px
    }
    
    .content-pepole-list{
        padding: 10px 20px 0;
        font-size: 10px;
        display: flex;
        text-align: center;
        .list-item{
            position: relative;
            width: 50px;
            height: 50px;
            text-align: center;
            margin-right: 20px;
            .item-1{
                position: absolute;
                right: -4px;
                top: -8px;
                z-index: 1;
                color: #000;
                font-size: 16px;
            }
            .item-2{
                width: 36px;
                height: 31px;
                border: 1px solid #eee;
                font-size: 26px;
                padding-top: 1px;
                border-radius: 2px;
                text-align: center;
                margin: 0 auto;
            }
            .item-3{
                
            }
            .item-4{
                position: absolute;
                left: -20px;
                top: 34%;
                transform: translateY(-50%);
                font-size: 20px;
            }
        }
    }
    .content-pepole-list-All{
        .list-item{
            margin-bottom: 10px;
            margin-right: 24px;
        }
    }
}
</style>