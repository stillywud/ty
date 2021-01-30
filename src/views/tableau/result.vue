<template>
  <div id="container" class="main-container" style='width:100%;height:700px;margin:0 auto;float:left;' >
    <object  width="100%" height="100%"  class="tableauViz"  style="display:none;">
      <param name="site_root" :value="zd" />
      <param name='toolbar' value='no'/>
      <param name="name" :value="param" />
      <param name="ticket" :value="key"/>
      <param name="filter" :value="code"/>
    </object>
  </div>
</template>
<script>
  import { postAction } from '@/api/manage'

  export default ({
    name: 'home',
    data() {
      return {
        username: 'DP9',
        zd: 'CTY',
        param:'CTY-9_1/sheet2',
        // param:'_0/sheet2',
        key: '',
        code:'',
        url:{
          getKeyUrl: 'http://192.168.30.61/trusted/',
          backUrl: '/tableau/getKey'
        }
      }
    },
    props:{
      apiUrl: {
        default: 'http://192.168.30.61/javascripts/api/viz_v1.js',
        // default: 'http://rp.tygps.com/javascripts/api/viz_v1.js',
        // default: 'https://komatsussl.tygps.com/javascripts/api/viz_v1.js',
      }
    },
    beforeCreate(){
    },
    created(){
    },
    mounted () {
      this.LoadingDate();
    },
    methods:{
      LoadingDate(){
        let params = {
          url: this.url.getKeyUrl,
          username: this.username,
          target_site: this.zd
        }
        postAction(this.url.backUrl,params).then(response => {
          this.zd='/t/'+this.zd
          this.key=response.message
          let recaptchaScript = document.createElement('script')
          recaptchaScript.async = true
          recaptchaScript.setAttribute('src', this.apiUrl+"?v="+new Date().getTime())
          this.tableauScript = document.head.appendChild(recaptchaScript)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
        //记录操作日志
        AddOpreationDate({"Content": this.$route.meta.title,"UserName":this.$store.getters.name}).then(response => {
        }).catch(error => {
        })
      }
    }
  })
</script>
<style scoped>
  .main-container{
    /* position: fixed;
     left:10%;
     top:50%;
     margin:10px 0 0 -175px!important;
     text-align: center;
     font-size: 40px; */
  }

</style>