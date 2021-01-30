<template>
  <div>
    <!--轮播图-->
    <template>
      <a-carousel autoplay>
        <template v-for="(item, index) in carouselImg" v-if="carouselImg.length>0">
          <img :src="getAvatarView(item)" :key="index" style="height: 220px;width:100%"/>
        </template>
        <template v-else>
          <!--<img src="@assets/nodata.png" :key="index" style="height: 220px;width:100%"/>-->
          <a-empty />
        </template>
      </a-carousel>
    </template>
    <a-row :gutter="24">
      <!--目录树结构-->
      <a-card style="width: 100%;margin:12px 12px;" :style="{height:'700px' }">
        <a-col :span="4">
          <template>
            <a-directory-tree
              @select="onSelect"
              :defaultSelectedKeys="defaultSelectedKeys"
              :treeData="treeData"
              :load-data="onLoadData"
              @expand="onExpand">
            </a-directory-tree>
          </template>
        </a-col>
        <!--目录内容-->
        <a-col :span="16">
          <eoa-cms-menu-article-modal ref="eoaCmsMenuArticleModal"></eoa-cms-menu-article-modal>
        </a-col>
      </a-card>

    </a-row>
  </div>

</template>

<script>

  import ACol from "ant-design-vue/es/grid/Col"
  import { getFileAccessHttpUrl,getAction } from '@/api/manage'
  import { getSiteInfo} from '@/api/api'
  import EoaCmsMenuArticleModal from './modules/EoaCmsMenuArticleModal'

  export default {
    name: "OnlineHelp",
    components: {
      ACol,
      EoaCmsMenuArticleModal
    },
    data() {
      return {
        carouselImg:[],
        defaultSelectedKeys:[],
        url:{
          childList: "/chat/eoaCmsMenu/childList",
        },
        rootNode: "1346372606758719490",
        treeData:[
          {
            title: '在线帮助',
            id: '1346372606758719490',
            key: 'A05',
            isLeaf: false
          },
        ]
       }
    },
    created() {

    },
    mounted () {
      // this.getChildList(this.rootNode);
      this.$refs.eoaCmsMenuArticleModal.loadList('A05');
      this.loadMenuArticle()
    },
    methods: {
      loadMenuArticle () {
        var _this=this;
        getSiteInfo().then((res)=>{
          if(res.success && res.result.site[0].carouselImg){
            _this.carouselImg=res.result.site[0].carouselImg.split(",");
          }
        })
      },
      onSelect(keys) {
       if(keys[0]!=='A0'){
         this.$refs.eoaCmsMenuArticleModal.loadList(keys[0]);
       }
      },
      onExpand() {
        console.log('Trigger Expand');
      },
      handleInfiniteOnLoad() {
        this.$message.warning('已加载全部');
      },
      getAvatarView(url){
        return getFileAccessHttpUrl(url)
      },
      getChildList(menuCode) {
        let params = {id:menuCode}
        getAction(this.url.childList, params).then((res) => {

        })
      },
      onLoadData(treeNode){
        return new Promise(resolve => {
          if (treeNode.dataRef.children) {
            resolve();
            return;
          }
          let params = {id:treeNode.dataRef.id}
          getAction(this.url.childList, params).then((res) => {
            treeNode.dataRef.children = res.result.map(item => {
              item.key = item.menuCode;
              item.title = item.menuName;
              item.isLeaf = !item.hasChild
              return item
            });
            this.treeData = [...this.treeData];
            resolve();
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .ant-list-item-meta-title {
   font-weight: 600;
  }
  .demo-infinite-container {
    border: 1px solid #e8e8e8;
    overflow: auto;
    padding: 8px 24px;
    overflow: auto;
    height: 100px;
  }
  .demo-loading-container {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
  }
</style>