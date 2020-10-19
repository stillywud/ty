<template><!--/ 设置定时信息  /-->
    <div class="l-set-time-info-box">
        <div class="con-box">
            <ty-a-spin v-if="tyspining"/>
            <a-form-model
            ref="setSubForm" 
            :model="setSubForm" 
            :rules="setSubRules">
                <div class="list-0">
                    <a-form-model-item label="发送中心号" prop="tmnlSendCenterNo" class="item-0">
                        <a-input 
                        v-model="tmnlSelected.tmnlSendCenterNo" 
                        placeholder="请输入发送中心号"
                        disabled    
                        />
                    </a-form-model-item>
                    <a-form-model-item label="超时时间" prop="timeOver" class="item-0">
                        <a-input  v-model="setSubForm.timeOver" @change="timeOverCallback" allow-clear>
                        <template #suffix>
                            <span class="suffix-1">(分)</span>
                        </template>          
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="重复次数" prop="triedTimes" class="item-0">
                        <a-input  v-model="setSubForm.triedTimes" placeholder="请输入重复次数"  @change="triedTimesCallback" allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="信息类型" prop="type" class="item-0">
                        <a-select  v-model="setSubForm.type" placeholder="请选择信息类型">
                            <a-select-option v-for="item in types" :key="item.key">
                                {{ item.value }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="定时发送时间" prop="timingSendTime"  class="item-0">
                        <a-date-picker
                        v-model="setSubForm.timingSendTime"
                        show-time
                        placeholder="定时发送时间">
                        </a-date-picker>
                    </a-form-model-item>
                    <a-form-model-item label="终端唤醒时间" class="item-0" props="wakeUpInterval">
                        <a-input
                        @change="wakeUpIntervalCallback"
                        @blur="wakeUpIntervalBlurCallback"
                        v-model="setSubForm.wakeUpInterval"
                        placeholder="时间,范围60-1440" allow-clear>
                        <template #suffix>
                            <span class="suffix-1">(分)</span>
                        </template>          
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="中心接收号" prop="rcvNo" class="item-0">
                        <a-input 
                        v-model="setSubForm.rcvNo" 
                        placeholder="请输入中心接收号" allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="中心发送号" prop="sendNo" class="item-0">
                        <a-input 
                        v-model="setSubForm.sendNo" 
                        placeholder="请输入中心发送号" allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="GPS设置" prop="gpsSet" class="item-0">
                        <a-select  v-model="setSubForm.gpsSet" placeholder="请选择GPS设置" @change="gpsSetCallback">
                            <a-select-option v-for="item in gpsSets" :key="item.key">
                                {{ item.value }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="RTC设置时间点" prop="rtcSet"  class="item-0">
                        <a-date-picker
                            v-model="setSubForm.rtcSet"
                            show-time
                            placeholder="RTC设置时间点">
                            </a-date-picker>
                    </a-form-model-item>
                    
                    <a-form-model-item label="GPS时间设置" prop="gpsTimeSet" class="item-0">
                        <a-input 
                        v-model="setSubForm.gpsTimeSet" 
                        placeholder="时间，范围[6-63]"
                        @change="gpsTimeSetCallback"
                        @blur="gpsTimeSetBlurCallback" allow-clear
                        >
                        <template #suffix>
                            <span class="suffix-1">(秒)</span>
                        </template>          
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="等待短信超时时间" prop="smsTimeoutTime" class="item-0">
                        <a-input 
                        @change="smsTimeoutTimeCallback"
                        v-model="setSubForm.smsTimeoutTime" 
                        placeholder="时间，范围[1-255]" allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="震动设置" prop="shakeSet" class="item-0">
                        <a-select  v-model="setSubForm.shakeSet" placeholder="请选择震动设置" @change="shakeSetCallback">
                            <a-select-option v-for="item in shakeSets" :key="item.key">
                                {{ item.value }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="震动时间设置" prop="shakeTimeSet" class="item-0">
                        <a-input 
                        @change="shakeTimeSetCallback"
                        @blur="shakeTimeSetBlurCallback"
                        v-model="setSubForm.shakeTimeSet" 
                        placeholder="时间，范围[60-1440]" allow-clear
                        >
                        <template #suffix>
                            <span class="suffix-1">(分)</span>
                        </template>          
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="GPRS下载问询周期" prop="askCyc" class="item-0">
                        <a-input 
                        @change="askCycCallback"
                        v-model="setSubForm.askCyc" 
                        placeholder="请输入下载问询周期" allow-clear
                        >
                        <template #suffix>
                            <span class="suffix-1">(秒)</span>
                        </template>          
                        </a-input>
                    </a-form-model-item>

                    <a-form-model-item label="信息传输方式" prop="infoTransPort" class="item-0">
                        <a-select  v-model="setSubForm.infoTransPort" placeholder="请选择信息传输方式">
                            <a-select-option v-for="item in infoTransPortsT" :key="item.key">
                                {{ item.value }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="IP地址切换功能" prop="ipChange" class="item-0">
                        <a-select  v-model="setSubForm.ipChange" placeholder="请选择IP地址切换功能">
                            <a-select-option v-for="item in ipChanges" :key="item.key">
                                {{ item.value }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    
                    <a-form-model-item label="IP连接错误上限次数" prop="ipMaxConn" class="item-0">
                        <a-input 
                        @change="ipMaxConnCallback"
                        v-model="setSubForm.ipMaxConn" 
                        placeholder="请输入IP连接错误次数" allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="唤醒开始时间" prop="wakeUpBeginTime" class="item-0">
                        <a-select 
                            v-model="setSubForm.wakeUpBeginTime"
                            placeholder="请选择开始时间"
                            allow-clear>
                            <a-select-option
                                v-for="channel in 24"
                                :disabled="channel-1 > setSubForm.wakeUpEndTime"
                                :key="channel-1">
                                {{channel-1}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    
                    
                    <a-form-model-item label="加速度阈值(运动)" prop="motionThreshold" class="item-0">
                        <a-input 
                        @change="motionThresholdCallback"
                        v-model="setSubForm.motionThreshold" 
                        placeholder="请输入加速度阈值间" allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="唤醒结束时间" prop="wakeUpEndTime" class="item-0">
                        <a-select 
                            v-model="setSubForm.wakeUpEndTime"
                            placeholder="请选择结束时间"
                            allow-clear>
                            <a-select-option
                                v-for="channel in 24"
                                :disabled="channel-1 < setSubForm.wakeUpBeginTime"
                                :key="channel-1">
                                {{channel-1}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="加速度阈值(静止)" prop="staticThreshold" class="item-0">
                        <a-input 
                        @change="staticThresholdCallback"
                        v-model="setSubForm.staticThreshold" 
                        placeholder="请输入加速度阈值" allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="唤醒功能设置" prop="wakeUpSet" class="item-0">
                        <a-select  v-model="setSubForm.wakeUpSet" placeholder="请选择唤醒功能设置">
                            <a-select-option v-for="item in wakeUpSets" :key="item.key">
                                {{ item.value }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>

                </div>
                <div class="list-1">
                    <a-form-model-item label="中心默认IP地址" prop="rcvIp1" class="item-0">
                        <a-input 
                        v-model="setSubForm.rcvIp1" 
                        placeholder="请输入IP地址" allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="中心默认IP端口" prop="rcvPort1" class="item-0">
                        <a-input 
                        v-model="setSubForm.rcvPort1" 
                        placeholder="请输入IP端口" allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="中心默认GPRS接入点" prop="accessPoint1" class="item-0">
                        <a-input 
                        v-model="setSubForm.accessPoint1" 
                        placeholder="请输入接入点" allow-clear
                        />
                    </a-form-model-item>
                </div>
                <div class="list-1">
                    <a-form-model-item label="中心备用IP地址" prop="rcvIp2" class="item-0">
                        <a-input 
                        v-model="setSubForm.rcvIp2" 
                        placeholder="请输入IP地址" allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="中心备用IP端口" prop="rcvPort2" class="item-0">
                        <a-input 
                        v-model="setSubForm.rcvPort2" 
                        placeholder="请输入IP端口" allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="中心备用GPRS接入点" prop="accessPoint2" class="item-0">
                        <a-input 
                        v-model="setSubForm.accessPoint2" 
                        placeholder="请输入接入点" allow-clear
                        />
                    </a-form-model-item>
                </div>
                <div class="list-1">
                    <a-form-model-item label="远程升级IP地址" prop="upgradeIp" class="item-0">
                        <a-input 
                        v-model="setSubForm.upgradeIp" 
                        placeholder="请输入IP地址" allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="远程升级IP端口" prop="upgradePort" class="item-0">
                        <a-input 
                        v-model="setSubForm.upgradePort" 
                        placeholder="请输入IP端口" allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="远程升级GPRS接入点" prop="upgradeAccessPoint" class="item-0">
                        <a-input 
                        v-model="setSubForm.upgradeAccessPoint" 
                        placeholder="请输入接入点" allow-clear
                        />
                    </a-form-model-item>
                </div>
            </a-form-model>
            <div class="dialog-footer">
                <a-button type="primary" @click="onSubmit">提交</a-button>
            </div>
        </div>
    </div>
</template>
<script>
import {types, gpsSets, shakeSets,wakeUpSets, infoTransPortsT,ipChanges} from "@/utils/constant";

import {sendCommMessage} from "@/api/infodevice"
import {parseTime, kmxCode} from "@/utils/index"
import {getToken, jwtDecodeToken} from "@/utils/auth"
import TyASpin from "@/components/TyASpin"
import cloneDeep from "lodash/cloneDeep"
export default {
    name:"lSetTimeInfo",
    props:{
        recordData:{
            default:{}
        },
        send:{},
        tmnlSelected:{}
    },
    components:{TyASpin},
    data(){
        return {
            types,
            gpsSets,
            shakeSets,
            ipChanges,
            infoTransPortsT,
            wakeUpSets,
            tyspining:false,
            setSubForm:{
                type:0,
                timingSendTime:undefined,
                timeOver:"0",
                triedTimes:"1",
                wakeUpInterval:"60",
                rcvNo:"",
                sendNo:"",
                rtcSet:"",
                gpsSet:undefined,
                gpsTimeSet:"",
                smsTimeoutTime:"180",
                shakeSet:undefined,
                shakeTimeSet:"60",
                rcvIp1:"192.168.5.123",
                rcvPort1:"1058",
                accessPoint1:"cmnet",
                rcvIp2:"192.168.5.123",
                rcvPort2:"1058",
                accessPoint2:"cmnet",
                upgradeIp:"192.168.5.123",
                upgradePort:"1058",
                upgradeAccessPoint:"cmnet",
                askCyc:"600",
                infoTransPort:undefined,
                ipChange:undefined,
                ipMaxConn:"9",
                staticThreshold:"150",
                motionThreshold:"250",
                wakeUpBeginTime:"0",
                wakeUpEndTime:"0",
                wakeUpSet:0

            },
            setSubRules:{
                type:[{required:true,message:"请选择信息类型",trigger:"change"}],
                gpsTimeSet:[{required:false,message:"请设置GPS时间",trigger:"blur"}],
                shakeTimeSet:[{required:false,message:"请设置震动时间",trigger:"blur"}],
                timeOver:[{required:true,message:"请设置超时时间",trigger:"blur"}],
                triedTimes:[{required:true,message:"请设置重复",trigger:"blur"}],
            }
        }
    },
    computed: {
        userInfo() {
            return this.$store.getters.userInfo
        }
    },
    methods:{
        regexpcomOne(val,type){
            let sNum = val;
            sNum = sNum.replace(/[^\d]/g,"");
            if(sNum !==""){sNum = Number(sNum);}
            this.setSubForm[type] = sNum;
        },
        regexpcomTwo(val,type){
            let sNum = val;
            if(sNum === ""){return}
            sNum = sNum.replace(/[^\d]/g,"");
            if(sNum !== ""){sNum = Number(sNum);}
            if(sNum > 1440){
                sNum = 1440;
            }
            if(sNum === 0){
                sNum = 1;
            }
            this.setSubForm[type] = sNum;  
        },
        regexpcomBlurTwo(val,type){
            let sNum = val;
            if(sNum === ""){return}
            sNum = sNum.replace(/[^\d]/g,"");
            if(sNum !== ""){sNum = Number(sNum);}
            if(sNum < 60){
                sNum = 60;
            }
            this.setSubForm[type] = sNum; 
        },
        askCycCallback(e){
            this.regexpcomOne(e.target.value,"askCyc")
        },
        ipMaxConnCallback(e){
            this.regexpcomOne(e.target.value,"ipMaxConn")
        },
        staticThresholdCallback(e){
            this.regexpcomOne(e.target.value,"staticThreshold")
        },
        motionThresholdCallback(e){
            this.regexpcomOne(e.target.value,"motionThreshold")
        },
        timeOverCallback(e){
            this.regexpcomOne(e.target.value,"timeOver")
        },
        triedTimesCallback(e){
            let sNum = e.target.value;
            sNum = sNum.replace(/[^\d]/g,"");
            if(sNum !== ""){sNum = Number(sNum);}
            if(sNum === 0){
                sNum = 1;
            }
            this.setSubForm.triedTimes = sNum;
        },
        gpsTimeSetCallback(e){
            let sNum = e.target.value;
            sNum = sNum.replace(/[^\d]/g,"");
            if(sNum !== ""){sNum = Number(sNum);}
            if(sNum >63){
                sNum = 63;
            }
            this.setSubForm.gpsTimeSet = sNum;            
        },
        gpsTimeSetBlurCallback(e){
            let sNum = e.target.value;
            if(sNum === ""){return}
            sNum = sNum.replace(/[^\d]/g,"");
            if(sNum !== ""){sNum = Number(sNum);}
            if(sNum < 6){
                sNum = 6;
            }
            this.setSubForm.gpsTimeSet = sNum;  
        },
        wakeUpIntervalBlurCallback(e){
            this.regexpcomBlurTwo(e.target.value, "wakeUpInterval")
        },
        wakeUpIntervalCallback(e){
            this.regexpcomTwo(e.target.value, "wakeUpInterval") 
        },
        shakeTimeSetCallback(e){
            this.regexpcomTwo(e.target.value, "shakeTimeSet")           
        },
        shakeTimeSetBlurCallback(e){
            this.regexpcomBlurTwo(e.target.value, "shakeTimeSet")
        },
        smsTimeoutTimeCallback(e){
             let sNum = e.target.value;
            sNum = sNum.replace(/[^\d]/g,"");
            if(sNum !== ""){sNum = Number(sNum);}
            if(sNum >255){
                sNum = 255;
            }
            if(sNum === 0){
                sNum = 1;
            }
            this.setSubForm.smsTimeoutTime = sNum;            
        },
        wakeUpBeginTimeCallback(e){
            let sNum = e.target.value;
            if(sNum === ""){return}
            sNum = sNum.replace(/[^\d]/g,"");
            if(sNum !== ""){sNum = Number(sNum);}
            if(sNum >23){
                sNum = 23;
            }
            this.setSubForm.wakeUpBeginTime = sNum;             
        },
        wakeUpEndTimeCallback(e){
             let sNum = e.target.value;
            if(sNum === ""){return}
            sNum = sNum.replace(/[^\d]/g,"");
            if(sNum !== ""){sNum = Number(sNum);}
            if(sNum >23){
                sNum = 23;
            }
            this.setSubForm.wakeUpEndTime = sNum;              
        },
        wakeUpEndTimeBlurCallback(e){
             let sNum = e.target.value;
            if(sNum === ""){return}
            sNum = sNum.replace(/[^\d]/g,"");
            if(sNum !== ""){sNum = Number(sNum);}
            if(sNum < +this.setSubForm.wakeUpBeginTime){
                sNum = this.setSubForm.wakeUpBeginTime;
            }
            this.setSubForm.wakeUpEndTime = sNum;             
        },
        gpsSetCallback(){
            let gpsSet = this.setSubForm.gpsSet;
            this.setSubRules.gpsTimeSet[0].required = gpsSet === 1 ? true : false;
        },
        shakeSetCallback(){
            let shakeSet = this.setSubForm.shakeSet;
            this.setSubRules.shakeTimeSet[0].required = shakeSet === 1 ? true : false;
        },
        filterParams(obj){
            // infoId
            let {timeOver, triedTimes,timingSendTime,...data} = obj;
            let newObj = cloneDeep(data);
            for(let i in newObj){
                if(newObj[i] === undefined){
                    newObj[i] = ""
                }
                if(i === "rtcSet"){
                    newObj["rtcSet"] = !newObj["rtcSet"] ? parseTime(new Date()) : parseTime(new Date(newObj["rtcSet"]))
                }
            }
            return newObj;
        },
        onSubmit() {
            this.$refs.setSubForm.validate(valid => {
                if (valid) {
                    this.tyspining = true;
                    return new Promise(() => {
                        let data = {
                            systemCode: kmxCode(this.recordData.vcl_dictvb_id),
                            accountName: this.userInfo.realname,
                            accountPwd: "123",
                            jsonVersion: "1.0",
                            infoid: "82",
                            orderList: {
                                encodeFlag: "1",
                                brandId: this.recordData.vcl_dictvb_id,
                                model: this.recordData.vcl_dictvt_id,
                                vclId: this.recordData.vcl_id,
                                tmnlId: this.tmnlSelected.tmnlId,
                                imei: this.tmnlSelected.tmnlImei,
                                simNo: this.tmnlSelected.tmnlSimNo,
                                softwareVersion: this.tmnlSelected.tmnlSoftwareVersion,
                                sendType: this.send,
                                sendCenterNo: this.tmnlSelected.tmnlSendCenterNo,
                                setTime: parseTime(new Date().getTime()),
                                timeOut: 0,
                                timingSendTime:!this.setSubForm.timingSendTime ? parseTime(new Date()): parseTime(new Date(this.setSubForm.timingSendTime)),
                                triedTimes: this.setSubForm.triedTimes,
                                onlyCode: "uuid",
                                timeOver: this.setSubForm.timeOver,
                                paramContent: {
                                    infoId: "82",
                                    seqNo: "000000",
                                    ...this.filterParams(this.setSubForm)
                                }
                            }
                        }
                        sendCommMessage(data)
                        .then(response => {
                            this.tyspining = false;
                            if (response.code == 200) {
                            this.$message.success(response.message)
                            this.$refs.setSubForm.resetFields() // 表单重置
                            } else {
                            this.$message.error(response.message)
                            }
                        }).catch((e)=>{
                            this.tyspining = false;
                            this.$message.error("提交失败")
                        })
                    })
                }
            })
        },
    }
}
</script>
<style lang="scss">
.l-set-time-info-box{
    height: 500px;
    position: relative;
    .con-box{
        height: 500px;
        overflow-y: auto;
    }
    .dialog-footer{
        text-align: right;
        padding:20px;
        margin: 0;
    }
    .list-0{
        display: flex;
        flex-wrap: wrap;
        .item-0{
            display: flex;
            flex-basis: 50%;
            padding: 0;
            .ant-form-item-label{
                width: 150px;
            }
            .ant-form-item-control-wrapper{
                width: 195px;
            }
        }
    }
    .list-1{
        display: flex;
        flex-wrap: wrap;
        .item-0{
            display: flex;
            flex-basis: 33.3%;
            padding: 0;
            .ant-form-item-label{
                width: auto;
            }
            .ant-form-item-control-wrapper{
                width: 140px;
            }
        }       
    }
}
</style>