<template>
        <div style="display:flex;width:100%;position: relative;"> 
        <a-input name="address"  v-model="tmpAddress" :disabled="isDisable"/>
        <a-input name="lnglat"  v-model="tmpLnglat"/>
        <a-icon type="environment" class="mapicon" @click="openMap()"></a-icon>
        <a-modal
        v-model="isOpen"
        title="地图"
        :width="920"
        style="overflow: hidden;padding-top: 30px;"
        >
        <div :id="mapId" class="container"></div>
        <div class="mapBtn">
            <a-button type="primary" @click="ok">确定</a-button>
        </div>
        <div slot="footer"></div>
        </a-modal>
    </div>
</template>
<script>
  export default {
    name: 'tymap',
    props:{
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
    watch:{
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
    data(){
        return {
            mapId:'',
            pointerId:'',
            isOpen:false,
            visible:true,
            lnglat: '',//地图坐标
            address: '',//地图地址
            tmpAddress: '',//地址
            tmpLnglat:'',//坐标
            active:0,
            lists:[
            ],
            item:{},
        }
    },
    created(){
        this.mapId = 'mapId'+new Date().valueOf();
    },
    mounted(){
    },
    beforeDestroy(){
        this.clearMap();
    },
    methods:{
        openMap(){
           this.isOpen = true;
           this.$nextTick(()=>{
            this.mapInit();
           })
        },
        showDrawer(){
            this.visible = !this.visible;
        },
        //显示标注
        showMaker(poi,item,index){
          let pointer = poi.split(',')
          this.item = item;
          this.address = item.description;
          this.lnglat  = item.pointer
          this.active = index;
          TYSetCenter(new TYLngLat(parseFloat(pointer[0]),parseFloat(pointer[1])))
        },
        mapInit(){
            var option = new TYMapOptions({
                contentId: this.mapId,//必填，地图容器
                lnglat: '',//可选 默认ip定位
                mapLevel:12  //可选默认 12
            });
            TYInitialize(option);
            this.mapMaker();
            this.mapEvent();
        },
        onClose(){
            this.visible = false;
        },
        //地图标点
        mapMaker(){
            //实例化事件参数
            var draw = new TYOverlayOption();
            TYMapConfig(new TYConfigOption());
            draw.isClearOverlay = true;
            draw.isShowMath = true;
            draw.markerStyle = {};
            //绑定标点回调函数
            draw.callfunc = (e)=>{
                //移除之前的覆盖物
                this.pointerId && TYRemove(this.pointerId);
                this.pointerId = e.Id;
            };
            draw.overlayType = TYEnumOverLay.TY_POINT;
            TYDrawOverlay(draw);
        },
        mapEvent(){
            TYAddMapEvent(new TYEventOptions({//地图增加事件
                event: TYEnumEvent.TY_CLICK,//单击触发
                callback: this.geo//点击触发geo函数
            }))
        },
         geo(E) {
             let arr = [];
            if (E){
                this.lnglat = E.location.GPSLng+','+E.location.GPSLat
                arr[0] = new TYLngLat(E.location.GPSLng, E.location.GPSLat);
                var geos = new TYGeoCoderOptions();//逆地理编码参数实例化
                //geos.batch=false;//是否批量转换 默认不是
                geos.callback = this.geoFunction;//转换后的回调函数
                geos.location = arr;// arr;//需要转换的经纬度数组
                geos.type = TYEnumGeocoder.TY_NEAR_DESC;//转换类型，“附近类型”描述
                TYGeoCoder(geos);
            }
        },
        geoFunction(e){
            if(e&&e.status==true){
                this.address = e.geocodes[0].description;
            }
        },
        //清除地图
        clearMap(){
            // TYClear();
        },
        ok(){
            if(this.lnglat){
                this.tmpAddress = this.address;
                this.tmpLnglat = this.lnglat;
            }
            console.log(this.item,'111')
            this.$emit('change',this.address+'|'+this.lnglat);
            this.lnglat = '';
            this.isOpen = false;
            
        }
    }
}
</script>
<style scoped>
    .container {
        width: 100%;
        height: 500px;
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
    .mapBtn{
        text-align: center;
        padding:10px 0;
    }
    .mapTitle{
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
  .active{
    font-weight: bold;
  }
</style>