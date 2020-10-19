<template><!--/ 回叫终端参数 / -->
    <div class="l-call-tmnl-param-box">
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
                    <a-form-model-item label="超时时间" prop='timeOver' class="item-0">
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
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="定时发送时间">
                        </a-date-picker>
                    </a-form-model-item>
                    <a-form-model-item label="中心接收号" prop="rcvNo" class="item-0">
                        <a-input 
                        v-model="setSubForm.rcvNo" 
                        placeholder="请输入中心接收号"  allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="中心发送号" prop="sendNo" class="item-0">
                        <a-input 
                        v-model="setSubForm.sendNo" 
                        placeholder="请输入中心发送号" allow-clear
                        />
                    </a-form-model-item>
                    <a-form-model-item label="RTC设置时间点" prop="rtcSet"  class="item-0">
                        <a-date-picker
                            v-model="setSubForm.rtcSet"
                            show-time
                            placeholder="RTC设置时间点">
                            </a-date-picker>
                    </a-form-model-item>
                </div>

                <div class="list-1">
                    <a-form-model-item label="" class="item-0" props="wakeUpInterval">
                        <a-checkbox :checked="!!setSubForm.wakeUpInterval">
                            终端唤醒时间
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="gpsSet" class="item-0">
                        <a-checkbox :checked="!!setSubForm.gpsSet">
                            GPS设置
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="smsTimeoutTime" class="item-0">
                        <a-checkbox :checked="!!setSubForm.smsTimeoutTime">
                            等待短信超时时间
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="shakeSet" class="item-0">
                        <a-checkbox :checked="!!setSubForm.shakeSet">
                            震动设置
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="shakeTimeSet" class="item-0">
                        <a-checkbox :checked="!!setSubForm.shakeTimeSet">
                            震动时间设置
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="askCyc" class="item-0">
                        <a-checkbox :checked="!!setSubForm.askCyc">
                            GPRS下载问询周期
                        </a-checkbox>
                    </a-form-model-item>

                    <a-form-model-item label="" prop="infoTransPort" class="item-0">
                        <a-checkbox :checked="!!setSubForm.infoTransPort">
                            信息传输方式
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="ipChange" class="item-0">
                        <a-checkbox :checked="!!setSubForm.ipChange">
                            IP地址切换功能
                        </a-checkbox>
                    </a-form-model-item>
                    
                    <a-form-model-item label="" prop="ipMaxConn" class="item-0">
                        <a-checkbox :checked="!!setSubForm.ipMaxConn">
                            IP连接错误上限次数
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="staticThreshold" class="item-0">
                        <a-checkbox :checked="!!setSubForm.staticThreshold">
                            加速度阈值（静止）
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="motionThreshold" class="item-0">
                        <a-checkbox :checked="!!setSubForm.motionThreshold">
                            加速度阈值（运动）
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="wakeUpBeginTime" class="item-0">
                        <a-checkbox :checked="!!setSubForm.wakeUpBeginTime">
                            唤醒开始时间
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="wakeUpEndTime" class="item-0">
                        <a-checkbox :checked="!!setSubForm.wakeUpEndTime">
                            唤醒结束时间
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="wakeUpSet" class="item-0">
                        <a-checkbox :checked="!!setSubForm.wakeUpSet">
                            唤醒功能设置
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="rcvIp1" class="item-0">
                        <a-checkbox :checked="!!setSubForm.rcvIp1">
                            中心默认IP地址
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="rcvPort1" class="item-0">
                        <a-checkbox :checked="!!setSubForm.rcvPort1">
                            中心默认IP端口
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="accessPoint1" class="item-0">
                        <a-checkbox :checked="!!setSubForm.accessPoint1">
                            中心默认GPRS接入点
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="rcvIp2" class="item-0">
                        <a-checkbox :checked="!!setSubForm.rcvIp2">
                            中心备用IP地址
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="rcvPort2" class="item-0">
                        <a-checkbox :checked="!!setSubForm.rcvPort2">
                            中心备用IP地址
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="accessPoint2" class="item-0">
                        <a-checkbox :checked="!!setSubForm.accessPoint2">
                            中心备用GPRS接入点
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="upgradeIp" class="item-0">
                        <a-checkbox :checked="!!setSubForm.upgradeIp">
                            远程升级IP地址
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="upgradePort" class="item-0">
                        <a-checkbox :checked="!!setSubForm.upgradePort">
                            远程升级IP端口
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="" prop="upgradeAccessPoint" class="item-0">
                        <a-checkbox :checked="!!setSubForm.upgradeAccessPoint">
                            远程升级GPRS接入点
                        </a-checkbox>
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
    name:"lCallTmnlParam",
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
                type:1,
                timingSendTime:undefined,
                timeOver:"0",
                triedTimes:"1",
                wakeUpInterval:"60",
                rcvNo:"",
                sendNo:"",
                rtcSet:"",
                gpsSet:1,
                gpsTimeSet:"",
                smsTimeoutTime:1,
                shakeSet:1,
                shakeTimeSet:1,
                rcvIp1:1,
                rcvPort1:1,
                accessPoint1:1,
                rcvIp2:1,
                rcvPort2:1,
                accessPoint2:1,
                upgradeIp:1,
                upgradePort:1,
                upgradeAccessPoint:1,
                askCyc:1,
                infoTransPort:1,
                ipChange:1,
                ipMaxConn:1,
                staticThreshold:1,
                motionThreshold:1,
                wakeUpBeginTime:1,
                wakeUpEndTime:1,
                wakeUpSet:1
            },
            setSubRules:{
                type:[{required:true,message:"请选择信息类型",trigger:"change"}],
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
        timeOverCallback(e){
            let sNum = e.target.value;
            sNum = sNum.replace(/[^\d]/g,"");
            if(sNum !==""){sNum = Number(sNum);}
            this.setSubForm.timeOver = sNum;
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
        filterParams(obj){
            // infoId
            let {timeOver, triedTimes,timingSendTime,...data} = obj;
            for(let i in data){
                if(data[i] === undefined){
                    data[i] = ""
                }
                if(i === "rtcSet"){
                    data["rtcSet"] = !data["rtcSet"] ? parseTime(new Date()) : parseTime(new Date(data["rtcSet"]))
                }
            }
            return data;
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
                                    seqNo: '000000',
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
.l-call-tmnl-param-box{
    max-height: 500px;
    overflow-y:auto;
    overflow-x:hidden;
    .dialog-footer{
        text-align: right;
        padding: 20px;
        margin:0;
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
            flex-basis: 25%;
            padding: 0;
            margin-bottom: 0;
            .ant-form-item-label{
                width: auto;
            }
            .ant-form-item-control-wrapper{
                width: auto;
            }
        }       
    }
}
</style>