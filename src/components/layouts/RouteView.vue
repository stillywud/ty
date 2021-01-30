<template>
  <div class="main">
    <keep-alive>
      <router-view v-if="keepAlive" />
    </keep-alive>
    <!-- 给meta中keepalive为false的组件加上key，防止出现两个隐藏组件数据相同问题 -->
    <router-view v-if="!keepAlive" :key="activePage"/>
  </div>
</template>

<script>
    export default {
        name: "RouteView",
        data(){
            return {
                activePage:'',
                linkList:[],
            }
        },
        computed: {
            keepAlive () {
                return this.$route.meta.keepAlive
            }
        },
        watch: {
            '$route': function(newRoute) {
                this.activePage = newRoute.fullPath
                // -~- //
                if (this.linkList.indexOf(newRoute.fullPath) < 0) {
                    this.linkList.push(newRoute.fullPath)
                }
            }
        }
    }
</script>
