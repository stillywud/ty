<template>
  <div style="display:flex;width:100%;position: relative;"> 
      <a-input name="address"  v-model="tmpAddress" :disabled="isDisable"/>&nbsp;<a-input name="lnglat"  v-model="tmpLnglat"/>
      <a-icon type="environment" class="mapicon" @click="openMap()" v-if="!isDisable"></a-icon>
      <a-modal
        v-model="isOpen"
        title="地图"
        :mask-closable="false"
        class-name="vertical-center-modal"
        style="overflow: hidden;padding-top: 30px;"
        :width="920">
      <a-drawer
        placement="left"
        :closable="true"
        :visible="visible"
        :get-container="false"
        :mask="false"
        :wrap-style="{ position: 'absolute',left:'-20px',top:'54px',height:'570px' }"
        @close="onClose"
      >
      <div class="listArea">
          <ul>
            <li v-for="(item,index) in lists">
                <a @click="showMaker(item.pointer)">{{item.title}} </a>
                <p>{{item.description}}</p>
            </li>
          </ul>
        </div>
      </a-drawer>
         <div :id="mapId" style="width:100%;height:450px"></div>
         <div class="myPageTop">
            <div class="position">{{address}}</div> <input :id="tipId" ref="keywords" placeholder="请输入关键词" style="display: none"/>&nbsp;<a-button @click="showDrawer">列表</a-button>
         </div>
         <div class="mapBtn">
           <a-button type="primary" @click="ok">确定</a-button>
         </div>
         <div slot="footer"></div>
     </a-modal>
  </div>
</template>
<script>
  // online表单控件使用
import $initTyMap from './map.js';
export default {
  name: 'mapInput',
  props:
  {
    // pointer: { // 1: 表单可输入   2: 表单只读
    //   type: String
    // },
    // area:{
    //   type: String
    // },
    isDisable:{
      type:Boolean,
      default:false
    },
    value:{
      type:String
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      mapId:'',
      tipId:'',
      map:'',
      geocoder:'',
      placeSearch:'',
      auto:'',
      marker:'',
      lnglat: '',//地图标注坐标
      address: '',//地图标注
      tmpAddress: '',//地址
      tmpLnglat:'',
      hasMaker:false,//是否标点
      isOpen: false,
      isOld:false,
      defaultLnglat:'116.4,39.9',
      jsonArea:{
        provice:"",
        city:"",
        country:""
      },
      visible:false,
      lists:[
      ],
      makers:[]
    }
  },
  watch:{
    pointer(val){
      console.log("pointer::",val)
      this.lnglat = val;
    },
    value(val){
      console.log("area::",val)
      if(val){
        let arr = val.split("|");
        this.tmpAddress = arr[0];
        this.tmpLnglat = arr[1];
      }
    },
    tmpAddress(val){
      this.lnglat = val?this.lnglat:'';
      this.$emit('getLngLat',val+'|'+this.lnglat);
    }
  },
  created() {
    this.mapId = 'mapId'+new Date().valueOf();
    this.tipId = 'tipId'+new Date().valueOf();

    $initTyMap((res)=>{
      if(res){
        console.log(res);
      }
       console.log('mapInput map',window.AMap);
        this.mapInit();
        this.addMaker(true);
    });
  },
  mounted(){ 
  },
  beforeDestroy(){
      console.log('销毁地图')
      this.map&&this.map.destroy();
  },
  methods: {
    addMakers(){
      let maker=null;
        for(let i=0; i<this.lists.length; i++){
          let pos = this.lists[i]['pointer']
          pos = pos.split(',');
          maker = new window.AMap.Marker({ 
            map:this.map,
            icon: require("@/assets/images/mapBlue.png"),
            position: [pos[0], pos[1]],
            offset: new window.AMap.Pixel(-13, -30)
          });
          AMap.event.addListener(maker, 'click', (e)=>{
              this.addMaker(false,e.lnglat.lng+','+e.lnglat.lat);
          });
          this.makers.push(maker);
        }
        
        this.map.setFitView();
    },
    showMaker(poi){
      this.addMaker(false,poi);
      // this.visible = false;
    },
    showDrawer(){
      this.visible = !this.visible;
      if(this.visible){
        //添加点标记
      }else{
       //移除点标记
       //this.map.remove(this.makers);
      }
    },

    onClose(){
      this.visible = false;
    },
    //
    openMap(){
      this.isOpen=true;
      this.$nextTick(()=>{
        this.mapInit();
        this.addMaker(true);
         this.addMakers();
        this.$refs.keywords.value = '';
      })
    },
    // 初始化地图
    mapInit: function () {
      let that = this;
      let temp;
      //数据默认值
      this.lnglat     = this.tmpLnglat?this.tmpLnglat:this.lnglat;
      console.log(this.lnglat,'111')
      this.address    = this.tmpAddress?this.tmpAddress:'地理位置';
      if(!this.lnglat){
        temp = this.defaultLnglat.split(',');
      }else{
        temp = this.lnglat.split(',');
      }
      this.map = new window.AMap.Map(this.mapId, {
        resizeEnable: true,
        center: [temp[0], temp[1]],
        zoom: 13
      });
      //注册地理信息插件
      this.map.plugin(['AMap.Geocoder'], () =>{
        this.map.addControl(new window.AMap.Geocoder());
      })
      //注册插件
      this.map.plugin(['AMap.Autocomplete'],()=>{
        this.map.addControl(new AMap.Autocomplete())
      });

      //注册插件
      this.map.plugin(['AMap.PlaceSearch'],()=>{
        this.map.addControl(new AMap.PlaceSearch())
      });

    //   //输入提示
    //   var autoOptions = {
    //       input: this.tipId
    //   };
    //   that.auto = new AMap.Autocomplete(autoOptions);
    //   that.placeSearch = new AMap.PlaceSearch({
    //       map: this.map
    //   });  //构造地点查询类
    //   //注册监听，当选中某条记录时会触发
    //   AMap.event.addListener(that.auto, "select", select);
    //   function select(e) {
    //       that.placeSearch.setCity(e.poi.adcode);
    //       that.placeSearch.search(e.poi.name);
    //       that.lnglat = e.poi.location.lng+','+e.poi.location.lat;
    //       that.addMaker(true,that.lnglat);
    //   };
    //  //监听点击搜索覆盖物事件
    //   AMap.event.addListener(that.placeSearch,"markerClick",clickSearch);
    //   function clickSearch(e) {
    //       that.lnglat  = e.data.location.lng+','+e.data.location.lat;
    //       that.address = e.data.name;
    //       that.addMaker(true,that.lnglat,that.address);
    //   };
      //点击地图获取
      that.map.on('click', function (e) {
        that.lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat();
        that.addMaker(false,that.lnglat);
      })
    },
    //  根据坐标获取地区
    regeoCode: function () {
      let that = this;
      if (!this.geocoder) {
        this.geocoder = new window.AMap.Geocoder();
      }
      let lnglat = this.lnglat;
      this.geocoder.getAddress(lnglat, function (status, result) {
        if (status === 'complete' && result.regeocode) {
          that.jsonArea.provice=result.regeocode.addressComponent.province;
          that.jsonArea.city=result.regeocode.addressComponent.city;
          that.jsonArea.country=result.regeocode.addressComponent.district;
          that.$emit("areaJson",that.jsonArea)
          let address = result.regeocode.formattedAddress;
          that.address = address;
        }
      })
      
    },

    //根据地理位置获取坐标
     geoCode:function(addr) {
        let that = this;
        if(!this.geocoder){
            this.geocoder = new window.AMap.Geocoder();
        }
        var res=  this.geocoder.getLocation(addr, function(status, result) {
            if (status === 'complete'&&result.geocodes.length) {
                that.lnglat = result.geocodes[0].location.lng+','+result.geocodes[0].location.lat;
            }
        });
    },
    // 添加标点
    addMaker: function (isInit,lnglats='',address='') {
      let lnglat;
      if(lnglats){
          lnglat = lnglats.split(',');
          this.lnglat  = lnglats;
          this.address = address;
      }else if(this.lnglat){
          lnglat = this.lnglat.split(',');
      }else{
          lnglat = '';
      }
      if (this.marker) {
        this.marker.setMap(null);
        this.marker = null;
      }
      if (lnglat) {
        this.marker = new window.AMap.Marker({ 
          // icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
          icon: require("@/assets/images/mapRed.png"),
          position: [lnglat[0], lnglat[1]],
          offset: new window.AMap.Pixel(-13, -30)
        });
        this.marker.setMap(this.map);
        this.map.setCenter([lnglat[0], lnglat[1]]);
        if (!this.address || !isInit) {
          this.regeoCode();
        }
      }
    },
    ok () {
      //传值地址默认为输入
      if(this.$refs.keywords.value){
           this.tmpAddress = this.$refs.keywords.value;
      }
      //如果已经标点，修改回传,
      if (this.lnglat) {
         this.tmpAddress = this.address;
         this.tmpLnglat = this.lnglat;
         this.$emit('change', this.address+'|'+this.lnglat);
      }else{
         this.$emit('change', this.tmpAddress+'|'+this.lnglat);
      }
      this.lnglat = '';
      this.isOpen = false;  
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.amap-icon img,
.amap-marker-content img{
  width: 25px;
  height: 34px;
}
</style>
<style scoped>
.mapBtn{
  text-align: center;
  padding:10px 0;
}

.marker {
  position: absolute;
  top: -20px;
  right: -118px;
  color: #fff;
  padding: 4px 10px;
  box-shadow: 1px 1px 1px rgba(10, 10, 10, .2);
  white-space: nowrap;
  font-size: 12px;
  font-family: "";
  background-color: #25A5F7;
  border-radius: 3px;
}
.input-card{
  width: 32rem;
  z-index: 170;
}
.input-card .btn{
  margin-right: .8rem;
}
.input-card .btn:last-child{
  margin-right: 0;
}
.mapicon{
  width: 24px;
  height: 30px;
  font-size: 24px!important;
  line-height: 30px;
  margin: 0 10px;
  color:#ff6600;
  cursor: pointer;
}

.button-group {
	position: absolute;
	bottom: 20px;
	right: 20px;
	font-size: 12px;
	padding: 10px;
}

.button-group .button {
	height: 28px;
	line-height: 28px;
	background-color: #0D9BF2;
	color: #FFF;
	border: 0;
	outline: none;
	padding-left: 5px;
	padding-right: 5px;
	border-radius: 3px;
	margin-bottom: 4px;
	cursor: pointer;
}
.button-group .inputtext {
	height: 26px;
	line-height: 26px;
	border: 1px;
	outline: none;
	padding-left: 5px;
	padding-right: 5px;
	border-radius: 3px;
	margin-bottom: 4px;
	cursor: pointer;
}
.tip {
	background-color: #fff;
	padding-left: 10px;
	padding-right: 10px;
	position: absolute;
	font-size: 12px;
	right: 10px;
	top: 20px;
	border-radius: 3px;
	border: 1px solid #ccc;
	line-height: 30px;
}
.amap-info-content {
	font-size: 12px;
}
.myPageTop {
	position: absolute;
	top: -5px;
	right: 50px;
	margin: 10px auto;
	padding:6px;
	font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
	font-size: 14px;
}
.myPageTop label {
	margin: 0 20px 0 0;
	color: #666666;
	font-weight: normal;
}
.myPageTop input {
	width: 170px;
}
.position{
  width: 700px;
  display: inline-block;
  font-weight: bold;
}
.listArea{
  margin-top:10px;
}
.listArea li{
  list-style: none;
  line-height: 25px;
  border-bottom: 1px dotted #ccc;
}
</style>
