<template>
    <div>
        <van-popup v-model="AddPepoleShow" position="bottom" :style="{ height: '100vh' }">
            <van-nav-bar
                title="通讯录"
                left-text="返回"
                left-arrow
                @click-left="onClickLeftPepole"
                />
            <form action="/">
                <van-search 
                    v-model="value" 
                    @search="onSearch"
                    @cancel="onCancel"
                    placeholder="请输入搜索关键词" />
            </form>
        </van-popup>
    </div>
</template>
<script>
export default {
    name:'commentForwardLu',
    data(){
        return {
            value:'',
            AddPepoleShow:false
        }
    },
    methods:{
        show(){
            this.AddPepoleShow = true
        },
        onSearch(val) {
            this.$toast(val);
        },
        onCancel(){
            this.$toast('取消');
        },
        onClickLeftPepole(){
            this.AddPepoleShow = false
        },
        
    }
}
</script>
<style lang="scss">

</style>