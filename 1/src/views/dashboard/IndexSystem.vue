<template>
  <div>
    <div  v-for="item in analysis" :key="item.id">
      <a :href="item.urlLink" class="alink" target="_blank">{{item.text}}</a>
    </div>


  </div>
</template>

<script>
    import Vue from 'vue'
    import { ACCESS_TOKEN } from '@/store/mutation-types'

  export default {
    name: "IndexSystem",

    data() {
      return {
          analysis:[],
          token:''
      }
    },
    created() {
        this.token = Vue.ls.get(ACCESS_TOKEN);
    },
      mounted(){
          this.analysis=[{
              urlLink:'http://192.168.30.185:91/dashboard/analysis?token='+this.token,
              id:1,
              // token :  this.token,
              text:'租赁系统'
          },
              {
                  urlLink:'http://192.168.30.185:93/dashboard/analysis?token='+this.token,
                  id:2,
                  // token :  this.token,
                  text:'销售系统'
              }]

      },
    methods: {

    }
  }
</script>
<style scoped>
  .alink{
    width: 100px;
    height: 100px;
      line-height: 100px;
      text-align: center;
    display: block;
    border: 1px solid #999;
    float: left;
    margin-left: 20px;
      color: #333;
  }
</style>
