<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      :right-text="type=='detail' ? '编辑' : ''"
      left-arrow
      @click-right="onClickRight"
      @click-left="onClickLeft"/>
    <div style=" overflow: hidden;" v-bind:style="{height: height + 'px'}">
      <iframe id="iframe" v-if="changeIframe" :height="height+'px'" width="100%" :src="src" frameborder="0"
              scrolling="auto"/>
    </div>
  </div>
</template>

<script>
  import { NavBar } from 'vant'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'

  Vue.use(NavBar)
  export default {
    name: 'OnlCgformAutoAppIFrame',
    data() {
      return {
        height: 0,
        code: '',
        src: '',
        type: '',
        title: '',
        changeIframe: false
      }
    },
    mounted() {
      this.code = this.$route.query.code
      this.type = this.$route.query.type
      let tableCode = this.$route.query.table
      switch (this.type) {
        case 'add':
          this.title = '新增'
          this.src = window._CONFIG['domianURL'] + '/desform/add/' + tableCode + '?token=' + this.$route.query.token
          break
        case 'detail':
          this.title = '详情'
          this.src = window._CONFIG['domianURL'] + '/desform/detail/' + tableCode + '/' + this.$route.query.id + '?token=' + this.$route.query.token
          break
      }
      console.log('src', this.src)
      this.changeIframe = true
      this.height = document.body.clientHeight - 50
      window.addEventListener('resize', this.windowResize(), false)
    },
    methods: {
      windowResize() {
        setTimeout(() => {
          this.height = document.body.clientHeight - 50
        }, 300)
      },
      onClickLeft() {
        this.$router.push({ path: '/out/online/cgformAppList/' + this.code + '?token=' + this.$route.query.token })
      },
      onClickRight() {
        this.changeIframe = false
        this.title = '编辑'
        this.type = 'edit'
        let tableCode = this.$route.query.table
        this.src = window._CONFIG['domianURL'] + '/desform/edit/' + tableCode + '/' + this.$route.query.id + '?token=' + this.$route.query.token
        this.changeIframe = true
      }
    }
  }
</script>

<style scoped>

</style>