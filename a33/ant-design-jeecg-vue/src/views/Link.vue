<template>
  <div class="main">
    <a-spin class="loading-style" size="large"></a-spin>
  </div>
</template>

<script>

  // 外部全屏访问，输入地址
  // http://localhost:3000/out/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiQXV0aG9yaXphdGlvblNlcnZlciJdLCJ1c2VyX25hbWUiOiJ0ZXN0YV9hZG1pbiIsInNjb3BlIjpbImFwaSJdLCJncm91cGlkIjoiREIxIiwiZXhwIjoxNTkxMTgwMDQxLCJqdGkiOiI1ZWFhZmUwOS0xNGIwLTRjM2QtYjgxMS1iODZjMWI1ZTBjMTUiLCJjbGllbnRfaWQiOiJjbGllbnRfcGFzc18xIn0.2_n3Idcvc76xPLn8x3G4AKK743-qleJf22SdjWDf9sM&redirect=/out/isystem/user

  import { getInfo } from '@/api/login'
  import { mapActions } from 'vuex'

  export default {
    name: 'Link',
    data() {
      return {}
    },
    mounted() {
      let token = this.$route.query.token
      let redirect = this.$route.query.redirect
      if (token) {
        this.SaveToken(token).then(() => {
          console.log('token', token)
          // 读取token校验token是否有效，如果无效，跳转到错误页面或者弹出错误消息
          getInfo().then((res) => {
            console.log('res', res)
            if (res.status === 200) {
              res['token'] = token
              // 如果token有效，需要保存token和userInfo
              this.SaveUserInfo(res).then(() => {
                if (redirect) {
                  console.log('target', redirect)
                  this.$router.push('/out' + redirect)
                }
              })
            } else {
              this.showError()
              console.error('实体查询失败:', res)
            }
          }).catch((error) => {
            this.showError()
            console.error('实体查询失败:', error)
          })
        })
      } else {
        this.showError()
      }
    },
    methods: {
      ...mapActions(['SaveToken', 'SaveUserInfo', 'Logout']),
      showError() {
        const h = this.$createElement
        this.$info({
          title: '跳转失败',
          content: h('div', {}, [
            h('p', '身份验证失败，请重试')
          ]),
          onOk() {
            window.location.href = '/'
          }
        })
      }
    }
  }
</script>

<style scoped>
  .main {
    min-height: 500px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>