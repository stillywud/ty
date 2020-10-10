<template>
    <a-form-model
        ref="setSubForm" 
        :model="setSubForm" 
        :rules="setSubRules" 
        class="lockInfoForm">
        <div class="list-box-1">
            <a-form-model-item label="发送中心号" prop="tmnlSendCenterNo" class="item-0">
                <a-input 
                v-model="tmnlSelected.tmnlSendCenterNo" 
                placeholder="请输入发送中心号"
                disabled    
                />
            </a-form-model-item>
            <a-form-model-item label="重复次数" prop="triedTimes" class="item-0">
                <a-input
                v-model="setSubForm.triedTimes"
                placeholder="请输入重复次数"
                />
            </a-form-model-item>
        </div>
        <div class="list-box">
            <a-form-model-item  class="item-0" prop="LockLevel" label="">
                <a-radio-group name="radioGroup" v-model="setSubForm.LockLevel" @change="radioGroupCallback">
                    <a-radio :value="1">
                        一级锁车
                    </a-radio>
                    <a-radio :value="2">
                        二级锁车
                    </a-radio>
                    <a-radio :value="3">
                        三级锁车
                    </a-radio>
                    <a-radio :value="4">
                        解车
                    </a-radio>
                    <a-radio :value="5">
                        全解车
                    </a-radio>
                </a-radio-group>
            </a-form-model-item>
        </div>
        <!-- <div v-if="setSubForm.LockLevel !== 5"> -->
            <div class="list-box">
                <a-form-model-item label="" prop="immediatelyv"  class="item-2">
                    <a-checkbox v-model="setSubForm.immediatelyv" @change="immediatelyvChange" :disabled="setSubForm.disabled">
                        立即锁
                    </a-checkbox>
                </a-form-model-item>
            </div>
            <div class="list-box">
                <a-form-model-item label="" prop="workingHoursv"  class="item-2">
                    <a-checkbox v-model="setSubForm.workingHoursv" @change="workingHoursvChange" :disabled="setSubForm.disabled">
                        按工作小时数
                    </a-checkbox>
                </a-form-model-item>
                <a-form-model-item label="" prop="workingHoursLockTime"  class="item-0">
                    <a-input
                    :disabled="setSubForm.disabled1"
                    v-model="setSubForm.workingHoursLockTime"
                    placeholder="请输入工作时间"
                    >
                    <template #suffix>
                        <span class="suffix-1">(时)</span>
                    </template>          
                    </a-input>
                </a-form-model-item>
            </div>
            <div class="list-box">
                <a-form-model-item label="" prop="datev"  class="item-2">
                    <a-checkbox v-model="setSubForm.datev" @change="datevChange" :disabled="setSubForm.disabled">
                        预置时间点
                    </a-checkbox>
                </a-form-model-item>
                <a-form-model-item label="" prop="dateLockDate"  class="item-0">
                    <a-date-picker
                        :disabled="setSubForm.disabled2"
                        :disabled-date="disabledDate"
                        style="width:193px"
                        v-model="setSubForm.dateLockDate"
                        show-time
                        placeholder="预置时间点">
                        </a-date-picker>
                </a-form-model-item>
            </div>
            <div class="list-box">
                <a-form-model-item label="" prop="cycDatev"  class="item-2">
                    <a-checkbox v-model="setSubForm.cycDatev" @change="cycDatevChange" :disabled="setSubForm.disabled">
                        按循环日期锁车
                    </a-checkbox>
                </a-form-model-item>
                <a-form-model-item label="" prop="cycDate"  class="item-0">
                    <a-date-picker
                        :disabled="setSubForm.disabled3"
                        style="width:193px"
                        v-model="setSubForm.cycDate"
                        show-time
                        placeholder="选择日期">
                        </a-date-picker>
                </a-form-model-item>
                <a-form-model-item label="锁车期数" prop="cycDateLockNum"  class="item-0">
                    <a-select
                        :disabled="setSubForm.disabled3"
                        style="width:193px"
                        v-model="setSubForm.cycDateLockNum"
                        placeholder="请选择锁车期数"
                        >
                        <a-select-option 
                            v-for="cycDateLockNum in 48"
                            :key="cycDateLockNum">
                            {{cycDateLockNum}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </div>
            <div class="list-box">
                <a-form-model-item label="" prop="areaLockv"  class="item-2">
                    <a-checkbox v-model="setSubForm.areaLockv" @change="areaLockvChange" :disabled="setSubForm.disabled">
                        按指定位置锁车
                    </a-checkbox>
                </a-form-model-item>
                <a-form-model-item label="纬度" prop="areaLockLat" class="item-0 item-1">
                    <a-input
                    read-only
                    v-model="setSubForm.areaLockLat"
                    placeholder="纬度"
                    />
                </a-form-model-item>
                <a-form-model-item label="经度" prop="areaLockLng" class="item-0 item-1">
                    <a-input
                    read-only
                    v-model="setSubForm.areaLockLng"
                    placeholder="经度"
                    />
                </a-form-model-item>
                <a-form-model-item label="半径" prop="areaLockRange" class="item-0 item-1">
                    <a-input
                    read-only
                    v-model="setSubForm.areaLockRange"
                    placeholder="半径"
                    >
                    <template #suffix>
                        <span class="suffix-1">(米)</span>
                    </template>          
                    </a-input>
                </a-form-model-item>
                <a-form-model-item class="item-0" >
                     <a-button style="margin-left:15px"  v-if="!setSubForm.disabled4" @click="areaLo">点击画圆</a-button>
                     <a-button style="margin-left:15px" type="primary" html-type="submit" @click="sendCommMessage">提交</a-button>
                </a-form-model-item>
            </div>
            <div class="list-map" id="container11">

            </div>
        <!-- </div> -->
    </a-form-model>
</template>
<script>

let mapAli = null;
let draw = null;
import {allUnlockSetIds, immediatelyLockSetIds,immediatelyLockLevels,immediatelyLockAffirms,workingHoursLockSetIds,dateLockSetIds,cycDateLockSetIds,areaLockSetIds} from '@/utils/constant';
import {sendCommMessage, getParaLast,getParaLast1} from '@/api/infodevice'
import {parseTime, kmxCode} from '@/utils/index'
import {getToken, jwtDecodeToken} from '@/utils/auth'
import {getTimeZone} from '@/api/common'
import moment from 'dayjs'
export default {
    name:"downGprsDataPrompt",
    props:[
        'recordData',
        'send',
        'tmnlSelected'
    ],
    data(){
        return {
            
            workingHoursLockSetIds,
            immediatelyLockLevels,
            immediatelyLockAffirms,
            cycDateLockSetIds,
            allUnlockSetIds,
            dateLockSetIds,
            areaLockSetIds,
            immediatelyLockSetIds,
            
            settmnlData: this.recordData || {},
            setSubForm:{
                disabled:false,
                disabled1:true,
                disabled2:true,
                disabled3:true,
                disabled4:true,


                LockLevel:undefined,
                LockSetId:undefined,
                immediatelyv:undefined,
                workingHoursv:undefined,
                areaLockv:undefined,
                cycDateLockNum:undefined,
                cycDatev:undefined,

                immediatelyLockLevel:"",
                immediatelyLockSetId:"",
                immediatelyLockAffirm:"",
                immediatelyLockPwdCardinality:"",

                workingHoursLockSetId:"",
                workingHoursLockLevel:"",
                workingHoursLockAffirm:"",
                workingHoursLockPwdCardinality:"",
                workingHoursLockTime:'',
                


                cycDateLockDates:'',
                sendType:this.send,
                triedTimes:1,
                allUnlockSetId:"F1",

                dateLockSetId:"",
                dateLockLevel:"",
                dateLockAffirm:"",
                dateLockPwdCardinality:'',
                dateLockDate:"",

                cycDate:undefined,
                cycDateLockSetId:"",
                cycDateLockLevel:"",
                cycDateLockAffirm:"",
                cycDateLockPwdCardinality:"",
                cycDateLockYear:"",
                cycDateLockMonth:"",
                cycDateLockDay:"",
                cycDateLockDay1:"",

                areaLockSetId:"",
                areaLockLevel:"",
                areaLockAffirm:"",
                areaLockPwdCardinality:'',
                areaLockLat:'',
                areaLockLng:'',
                areaLockRange:'',
            },
            setSubRules:{

                workingHoursLockTime:[{required:false,message:"请输入工作时间",trigger:"blur"}],

                dateLockDate:[{required:false,message:"请输入工作时间",trigger:"blur"}],

                cycDate:[{required:false,message:"请选择时间",trigger:"change"}],
                cycDateLockNum:[{required:false,message:"请选择锁车期数",trigger:"change"}],

                areaLockLevel:[{required:false,message:"请选择级别",trigger:"change"}],
                areaLockAffirm:[{required:false,message:"请确认",trigger:"change"}],
                areaLockPwdCardinality:[{required:false,message:"请输入密码基数",trigger:"blur"}],
                areaLockLat:[{required:false,message:"请输入中心点纬度",trigger:"blur"}],
                areaLockLng:[{required:false,message:"请输入中心点经度",trigger:"blur"}],
                areaLockRange:[{required:false,message:"请输入锁车范围半径",trigger:"blur"}],
            }
        }
    },
    mounted() {
        //this.mapaliInit();
        //this.getParaLast();
    },
    methods:{
        mapaliInit(){
            mapAli = new TYMapOptions({
                contentId: 'container11',						//必填，地图容器
                lnglat: new TYLngLat(114.50, 38.000),	//可选 默认ip定位
                mapLevel: 12							//可选默认 12
            });
            TYInitialize(mapAli);
            let configOption = new TYConfigOption();
            TYMapConfig(configOption);
            draw = new TYOverlayOption();
            draw.isClearOverlay = true;
            draw.isShowMath = false;
            draw.callfunc = this.drawPLR;
        },
        drawPLR(e){
            console.log(e)
            TYDrawStop(true)
        },
        getParaLast(){
            getParaLast({
                vcl_id:"1334000014",
                para_id:"TC_0001_00_1",
                page_size:10,
                page:1,
                sys_id:8,
                brand_id:8
            }).then((response)=>{
                console.log(response);
                if (response.code == 200) {
                    this.point = [],
                    0 == response.vcl_list.length && this.$message.error("暂无位置信息");
                    for (let r = 0; r < a.vcl_list.length; r++)
                        for (let i = 0; i < a.vcl_list[r].para_list.length; i++) {
                            let n = JSON.parse(a.vcl_list[r].para_list[i].para_value);
                            n.para_name = a.vcl_list[r].para_list[i].para_name,
                            n.vcl_id = a.vcl_list[r].vcl_id,
                            n.vcl_NO = a.vcl_list[r].vcl_no,
                            this.point.push(n)
                        }
                    this.addpoints(!0)
                    this.$message.success(response.message)
                
                } else {
                this.$message.error(response.message)
                }

            }).catch(error => {
                this.$message.error('提交失败')
            })
        },
        addpoints: function(e) {
            TYClear(),
            this.data = [];
            for (var t = 0; t < this.point.length; t++) {
                var a = new TYMarker({
                    pointId: "a~" + this.point[t].vcl_id + "," + this.point[t].vcl_NO,
                    label: new TYLabel({
                        offset: new TYPixel(25,15)
                    }),
                    lnglat: new TYLngLat(Number(this.point[t].Lo),Number(this.point[t].La)),
                    icon: this.carSrc
                });
                this.data.push(a)
            }
            var r = new TYPointOption;
            r.pointData = this.data,
            r.pointState.isClearOverlay = !0,
            r.pointState.isGather = !0,
            r.pointState.isSetView = !0;
            var i = new TYOverlayEvent;
            i.mouseEvent = TYEnumEvent.TY_CLICK,
            i.mouseFunc = function(e) {
                var t = e.pointId.split("~")[1].split(",")[0]
                    , a = e.pointId.split(",")[1]
                    , r = (n.getlockData.vcl_sys_id,
                n.getlockData.vcl_dictvb_id,
                JSON.parse(n.dataJSon.vcl_list[0].para_list[0].para_value))
                    , i = r.La
                    , o = r.Lo;
                if (200 == n.dataJSon.code) {
                    var s = function(t) {
                        var i = new TYInfoWindowOptions;
                        i.width = 300,
                        i.height = 200,
                        i.offset = new TYPixel(0,-30),
                        i.content = "机号：" + a + "<br>速度：" + r.Speed + "km/h<br>最新位置：" + t.geocodes[0].description,
                        i.position = new TYLngLat(e.GPSLngLat.GPSLng,e.GPSLngLat.GPSLat),
                        i.showShadow = !0,
                        i.isCustom = !1,
                        i.enableCloseOnClick = !0,
                        TYInfoWindow(i)
                    }
                        , l = [];
                    !function(e) {
                        l[0] = e ? new TYLngLat(e.location.GPSLng,e.location.GPSLat) : new TYLngLat(Number(o),Number(i));
                        var t = new TYGeoCoderOptions;
                        t.callback = s,
                        t.location = l,
                        t.type = TYEnumGeocoder.TY_NEAR_DESC,
                        TYGeoCoder(t)
                    }()
                }
            }
            ,
            r.pointState.overlayEvent = i;
            var n = this;
            TYDrawPoint(r)
        },
        areaLo(){
            draw.overlayType = TYEnumOverLay.TY_CIRCLE;
            TYDrawOverlay(draw);
        },
        disabledDate(current) {
            // Can not select days before today and today
            return current && current < moment().startOf('day');
        },
        radioGroupCallback(){
            console.log(LockLevel === 5)
            let LockLevel = this.setSubForm.LockLevel;
            // this.setSubForm.disabled = LockLevel === 4 ?  true : false;
            this.setSubForm.disabled = LockLevel === 5 ? true : false;
            this.workingHoursvChange();
            this.datevChange();
            this.cycDatevChange();
            this.areaLockvChange();
        },  
        immediatelyvChange(){
            let immediatelyv = this.setSubForm.immediatelyv;
            let LockLevel = this.setSubForm.LockLevel;
            console.log(immediatelyv,'immediatelyv')
            if(immediatelyv){
                this.setSubForm.immediatelyLockSetId = LockLevel < 4 ? "01" : "11";
                this.setSubForm.immediatelyLockLevel = LockLevel;
                this.setSubForm.immediatelyLockAffirm = "0";
                this.setSubForm.immediatelyLockPwdCardinality = "8";
            }else{
                this.setSubForm.immediatelyLockSetId = "";
                this.setSubForm.immediatelyLockLevel = "";
                this.setSubForm.immediatelyLockAffirm = "";
                this.setSubForm.immediatelyLockPwdCardinality = "";
            }
        },
        workingHoursvChange(){
            let workingHoursv = this.setSubForm.workingHoursv;
            let LockLevel = this.setSubForm.LockLevel;
            if(workingHoursv){
                this.setSubForm.workingHoursLockSetId = LockLevel < 4 ? "02" : "12";
                this.setSubForm.workingHoursLockLevel = LockLevel;
                this.setSubForm.workingHoursLockAffirm = "0";
                this.setSubForm.workingHoursLockPwdCardinality = "8";
                this.setSubRules.workingHoursLockTime[0].required = LockLevel >= 4 ? false : true;
            }else{
                this.setSubForm.workingHoursLockSetId = "";
                this.setSubForm.workingHoursLockLevel = "";
                this.setSubForm.workingHoursLockAffirm = "";
                this.setSubForm.workingHoursLockPwdCardinality = "";
                this.setSubForm.workingHoursLockTime = "";
                this.setSubRules.workingHoursLockTime[0].required = false;
            }
        },
        datevChange(){
            let datev = this.setSubForm.datev;
            let LockLevel = this.setSubForm.LockLevel;
            if(datev){
                this.setSubForm.dateLockSetId = LockLevel < 4 ? "04" : "14";
                this.setSubForm.dateLockLevel = LockLevel;
                this.setSubForm.dateLockAffirm = "0";
                this.setSubForm.dateLockPwdCardinality = "8";
                this.setSubRules.dateLockDate[0].required = LockLevel >= 4 ? false : true;
            }else{
                this.setSubForm.dateLockSetId = "";
                this.setSubForm.dateLockLevel = "";
                this.setSubForm.dateLockAffirm = "";
                this.setSubForm.dateLockPwdCardinality = "";
                this.setSubRules.dateLockDate[0].required = false;
            }
        },
        cycDatevChange(){
           let cycDatev = this.setSubForm.cycDatev;
            let LockLevel = this.setSubForm.LockLevel;
            if(cycDatev){
                this.setSubForm.cycDateLockSetId = LockLevel < 4 ? "07" : "17";
                this.setSubForm.cycDateLockLevel = LockLevel;
                this.setSubForm.cycDateLockAffirm = "0";
                this.setSubForm.cycDateLockPwdCardinality = "8";
                this.setSubRules.cycDateLockNum[0].required = LockLevel >= 4 ? false : true;
                this.setSubRules.cycDate[0].required = LockLevel >= 4 ? false : true;
            }else{
                this.setSubForm.cycDateLockSetId = "";
                this.setSubForm.cycDateLockLevel = "";
                this.setSubForm.cycDateLockAffirm = "";
                this.setSubForm.cycDateLockPwdCardinality = "";
                this.setSubRules.cycDateLockNum[0].required = false;
                this.setSubRules.cycDate[0].required = false;
            }
        },
        areaLockvChange(){
            let areaLockv = this.setSubForm.areaLockv;
            let LockLevel = this.setSubForm.LockLevel;
            if(areaLockv){
                this.setSubForm.areaLockSetId = LockLevel < 4 ? "03" : "13";
                this.setSubForm.areaLockLevel = LockLevel;
                this.setSubForm.areaLockAffirm = "0";
                this.setSubForm.areaLockPwdCardinality = "8";
                this.setSubRules.areaLockLat[0].required = LockLevel >= 4 ? false : true;
                this.setSubRules.areaLockLng[0].required = LockLevel >= 4 ? false : true;
                this.setSubRules.areaLockRange[0].required = LockLevel >= 4 ? false : true;
            }else{
                this.setSubForm.areaLockSetId = "";
                this.setSubForm.areaLockLevel = "";
                this.setSubForm.areaLockAffirm = "";
                this.setSubForm.areaLockPwdCardinality = "";
                this.setSubForm.areaLockLat = "";
                this.setSubForm.areaLockLng = "";
                this.setSubForm.areaLockRange = "";
                this.setSubRules.areaLockLat[0].required = false;
                this.setSubRules.areaLockLng[0].required = false;
                this.setSubRules.areaLockRange[0].required = false;
            }            
        },

        cycDateLockNumCallback(num, date){
            let arr = [];
            for(let i =0;i<num;i++){
                arr.push(date)
            }
            this.setSubForm.cycDateLockDay = arr;
        },
        paramsFilter(){
            let LockLevel = this.setSubForm.LockLevel;
            
            let workingHoursLockAffirm = this.setSubForm.workingHoursLockAffirm;
            let workingHoursLockLevel = this.setSubForm.workingHoursLockLevel;

            let areaLockAffirm = this.setSubForm.areaLockAffirm;
            let areaLockLevel = this.setSubForm.areaLockLevel;

            let cycDateLockAffirm = this.setSubForm.cycDateLockAffirm;
            let cycDateLockLevel = this.setSubForm.cycDateLockLevel;

            let dateLockLevel = this.setSubForm.dateLockLevel;
            let dateLockAffirm =   this.setSubForm.dateLockAffirm;
            let immediatelyLockLevel  =  this.setSubForm.immediatelyLockLevel;
            let immediatelyLockAffirm = this.setSubForm.immediatelyLockAffirm;

            let cycDate = this.setSubForm.cycDate;
            let cycDateLockNum = this.setSubForm.cycDateLockNum ;
            let cycDatev = this.setSubForm.cycDatev;

            if(cycDate && cycDateLockNum && cycDatev){
                console.log(cycDate, cycDateLockNum, cycDatev,parseTime(new Date(cycDate)))
                let time = parseTime(new Date(cycDate));
                let timeArr = (time.slice(0,10)).split('-');
                this.setSubForm.cycDateLockYear = timeArr[0];
                this.setSubForm.cycDateLockMonth = timeArr[1];
                this.cycDateLockNumCallback(cycDateLockNum, timeArr[2]);
            }

            return {
                
                allUnlockSetId:LockLevel=== 5 ? "F1" : "",
                areaLockAffirm: LockLevel=== 5 ? "" : !areaLockAffirm ? '' : areaLockAffirm,
                areaLockLat: LockLevel=== 5 ? "" : this.setSubForm.areaLockLat,
                areaLockLevel: LockLevel=== 5 ? "" : !areaLockLevel ? '' : areaLockLevel,
                areaLockLng: LockLevel=== 5 ? "" : this.setSubForm.areaLockLng,
                areaLockPwdCardinality: LockLevel=== 5 ? "" : this.setSubForm.areaLockPwdCardinality,
                areaLockRange: LockLevel=== 5 ? "" : this.setSubForm.areaLockRange,
                areaLockSetId: LockLevel=== 5 ? "" : this.setSubForm.areaLockSetId,

                cycDateLockAffirm: LockLevel=== 5 ? "" : !cycDateLockAffirm ? '' : cycDateLockAffirm,
                cycDateLockDay: LockLevel=== 5 ? [] : this.setSubForm.cycDateLockDay,
                cycDateLockLevel: LockLevel=== 5 ? "" : !cycDateLockLevel ? '' : cycDateLockLevel,
                cycDateLockMonth: LockLevel=== 5 ? "" : this.setSubForm.cycDateLockMonth,
                cycDateLockPwdCardinality: LockLevel=== 5 ? "" : this.setSubForm.cycDateLockPwdCardinality,
                cycDateLockSetId: LockLevel=== 5 ? "" : this.setSubForm.cycDateLockSetId,
                cycDateLockYear: LockLevel=== 5 ? "" : this.setSubForm.cycDateLockYear,

                dateLockAffirm: LockLevel=== 5 ? "" : !dateLockAffirm ? '' : dateLockAffirm,
                dateLockDate: LockLevel=== 5 ? "" : this.setSubForm.dateLockDate,
                dateLockLevel: LockLevel=== 5 ? "" : !dateLockLevel ? '' : dateLockLevel,
                dateLockPwdCardinality: LockLevel=== 5 ? "" : this.setSubForm.dateLockPwdCardinality,
                dateLockSetId: LockLevel=== 5 ? "" : this.setSubForm.dateLockSetId,

                immediatelyLockAffirm: LockLevel=== 5 ? "" : !immediatelyLockAffirm ? '' : immediatelyLockAffirm,
                immediatelyLockLevel: LockLevel=== 5 ? "" : !immediatelyLockLevel ? '' : immediatelyLockLevel,
                immediatelyLockPwdCardinality: LockLevel=== 5 ? "" : this.setSubForm.immediatelyLockPwdCardinality,
                immediatelyLockSetId: LockLevel=== 5 ? "" : this.setSubForm.immediatelyLockSetId,

                workingHoursLockAffirm: LockLevel=== 5 ? "" : !workingHoursLockAffirm ? '' : workingHoursLockAffirm,
                workingHoursLockLevel: LockLevel=== 5 ? "" : !workingHoursLockLevel ? '' : workingHoursLockLevel,
                workingHoursLockPwdCardinality: LockLevel=== 5 ? "" : this.setSubForm.workingHoursLockPwdCardinality,
                workingHoursLockSetId: LockLevel=== 5 ? "" : this.setSubForm.workingHoursLockSetId,
                workingHoursLockTime: LockLevel=== 5 ? "" : this.setSubForm.workingHoursLockTime,
            }
        },
        sendCommMessage(){
            // 获取级别
            let LockLevel = this.setSubForm.LockLevel;
            if(!LockLevel){
                return this.$message.error("请选择级别")
            }
            let lockCount = 0;
            // console.log(this.setSubForm.immediatelyLockSetId,'333')
            // return;
            ["areaLockSetId", "cycDateLockSetId", "dateLockSetId", "workingHoursLockSetId", "immediatelyLockSetId"].forEach((item) =>{
                if(this.setSubForm[item]){
                    console.log(this.setSubForm[item],'this.setSubForm[item]')
                    lockCount = lockCount + 1;
                }
            });
            if(!lockCount && LockLevel !==5){
                return this.$message.error("请选择类型")
            }
            // 获取是否立即锁
            this.immediatelyvChange();

            // 预定工作小时锁/解
            this.workingHoursvChange();

            // 指定时间点
            this.cycDatevChange()

            // 区域
            this.areaLockvChange()


            this.$refs.setSubForm.validate((valid) => {
                if (valid) {
                    return new Promise(() => {
                        let data = {
                            'systemCode': kmxCode(this.settmnlData.vcl_dictvb_id),
                            'accountName': this.$store.getters.userInfo.realname,
                            'accountPwd': '123',
                            'jsonVersion': '1.0',
                            'infoid': '81',
                            'orderList': {
                                'encodeFlag': '2',
                                'brandId': this.settmnlData.vcl_dictvb_id,
                                'model': this.settmnlData.vcl_dictvt_id,
                                'vclId': this.tmnlSelected.vclId,
                                'tmnlId': this.tmnlSelected.tmnlId,
                                'imei': this.tmnlSelected.tmnlImei,
                                'simNo': this.tmnlSelected.tmnlSimNo,
                                'softwareVersion':this.tmnlSelected.tmnlSoftwareVersion,
                                'sendType': this.setSubForm.sendType,
                                'sendCenterNo': this.tmnlSelected.tmnlSendCenterNo,
                                'setTime': parseTime(new Date()),
                                //'timeOut': "0",
                                //'timingSendTime': parseTime(new Date(this.setSubForm.timingSendTime)),
                                'triedTimes': this.setSubForm.triedTimes,
                                'onlyCode': "uuid",
                                'timeOver': "0",
                                'paramContent': {
                                    'infoId': '81',
                                    "seqNo":"000000",
                                    lockCount:LockLevel === 5 ? 1 : lockCount,
                                    ...this.paramsFilter()
                                }
                            }
                        }
                        sendCommMessage(data).then(response => {
                            if (response.code == 200) {
                            this.$message.success(response.message)
                            this.$refs.setSubForm.resetFields() // 表单重置
                            this.setSubForm.disabled = false;
                            lockCount = 0;
                            } else {
                            this.$message.error(response.message)
                            }

                        }).catch(error => {
                            this.$message.error('提交失败')
                        })
                    })
                }
            });
        }
    }
}
</script>
<style lang="scss">
    .lockInfoForm{
        height: 500px;
        overflow-y: auto;
        overflow-x: hidden;
        .dialog-footer{
            text-align:right;
            margin-top: 40px;
            padding:20px
        }
        .list-1-title{
            font-size: 15px;
            color: #000;
        }
        .list-box-1{
            display: flex;
            flex-wrap: wrap;
            .item-0{
                display: flex;
                flex-basis: 50%;
                padding: 0;
                .suffix-1{
                    margin-left: 5px;
                    line-height: 1;
                }
                .ant-form-item-label{
                    width: 100px;
                }
                .ant-form-item-control-wrapper{
                    // width: 193px;
                }
            }
        }
        .list-map{
            width: 100%;
            height: 300px;
        }
        .list-box{
            display: flex;
            flex-wrap: wrap;
            .item-2{
                width: 140px;
            }
            .item-0{
                display: flex;
                padding: 0;
                .suffix-1{
                    margin-left: 5px;
                    line-height: 1;
                }
                .ant-select-disabled .ant-select-selection{
                    color: rgba(0, 0, 0, 0.25);
                    background-color: #f5f5f5;
                    cursor: not-allowed;
                    opacity: 1;
                }
                .ant-form-item-label{
                    width: 100px;
                }
                .ant-form-item-control-wrapper{
                    // width: 193px;
                }
            }
            .item-1{
                .ant-form-item-label{
                    width: 65px;
                }
                .ant-form-item-control-wrapper{
                    width: 120px;
                }
            }
        }
    }
</style>