<template>
    <div>
        <span @click="asfe">弹层</span>
        <comment-forward
            :title="commentForward.title"
            :placeholder="commentForward.placeholder"
            ref="commentForward"
        />
    </div>
</template>
<script>
import commentForward from './index3/commentForward.vue'
export default {
    name:'sdf',
    data(){
        return {
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
        asfe(){
            this.$refs.commentForward.show()
        }
    }
}
</script>
<style lang="scss">
.mtt-comment-forward-box-A{
    font-size: 12px;
    .van-action-sheet__header{
        display: flex;
        padding: 0 16px;
    }
}
</style>