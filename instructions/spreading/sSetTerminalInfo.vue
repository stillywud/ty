<template><!--/设置终端参数信息/-->
<div class="s-set-terminal-info-box">
    <div class="con-box">
        <ty-a-spin v-if="tyspining"/>
        <a-form-model
            ref="setSubForm" 
            :model="setSubForm" 
            :rules="setSubRules">
            <div class="con-box-wrapper">
                <div class="list-0">
                    <a-form-model-item label="发送中心号" prop="tmnlSendCenterNo" class="item-0">
                        <a-input 
                        v-model="tmnlSelected.tmnlSendCenterNo" 
                        placeholder="请输入发送中心号"
                        disabled    
                        allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="重复次数" prop="triedTimes" class="item-0">
                        <a-input
                        @change="triedTimesCallback"
                        v-model.trim="setSubForm.triedTimes"
                        placeholder="请输入重复次数"
                        allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="定时发送时间" prop="timingSendTime"  class="item-0">
                        <a-date-picker
                        v-model="setSubForm.timingSendTime"
                        show-time
                        placeholder="请选择定时发送时间">
                        </a-date-picker>
                    </a-form-model-item>
                    <a-form-model-item label="超时时长" prop="timeOver" class="item-0">
                        <a-input
                        v-model.trim="setSubForm.timeOver"
                        placeholder="请输入超时时长"
                        @change="timeOverCallback"
                        allow-clear>
                        <template #suffix>
                        <span class="suffix-1">(分)</span>
                        </template>         
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="参数版本" prop="paramVersion" class="item-0">
                        <a-select 
                            v-model="setSubForm.paramVersion"
                            placeholder="请选择参数版本"
                            allow-clear>
                            <a-select-option
                                v-for="channel in paramVersions"
                                :key="channel.key">
                                {{channel.value}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </div>
                <div v-if="setSubForm.paramVersion === '01'">
                    <div class="list-0">
                        <a-form-model-item label="控制器T序列号" prop="ctrlTSerialNo" class="item-0">
                            <a-input
                            v-model.trim="setSubForm.param1.ctrlTSerialNo"
                            placeholder="请输入控制器T序列号"
                            allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="定时信息设置" prop="timingSetting" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.timingSetting"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in sendOrNot"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="故障信息设置" prop="faultSetting" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.faultSetting"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in sendOrNot"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="防盗动作通知信息设置" prop="burglarAlarmSetting" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.burglarAlarmSetting"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in sendOrNot"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="维修通知信息设置" prop="repairNoticeSetting" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.repairNoticeSetting"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in sendOrNot"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="燃料余量通知信息设置" prop="fuelNoticeSetting" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.fuelNoticeSetting"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in sendOrNot"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="日志信息设置" prop="logSetting" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.logSetting"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in sendOrNot"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        
                        
                        
                        
                        <a-form-model-item label="中心备用接收/发送IP地址" prop="rcvOrSendIp2" class="item-0">
                            <a-input
                            v-model.trim="setSubForm.param1.rcvOrSendIp2"
                            placeholder="请输入IP地址"
                            allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="控制器T部件编号" prop="ctrlTPartNo" class="item-0">
                            <a-input
                            v-model.trim="setSubForm.param1.ctrlTPartNo"
                            placeholder="请输入编号，长度12位"
                            allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="中心备用接收/发送IP端口" prop="rcvOrSendPort2" class="item-0">
                            <a-input
                            v-model.trim="setSubForm.param1.rcvOrSendPort2"
                            placeholder="请输入IP端口"
                            allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="终端诊断信息设置" prop="tmnlDiagnoseSetting" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.tmnlDiagnoseSetting"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in sendOrNot"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="远程升级接收/发送IP地址" prop="upgradeRcvOrSendIp" class="item-0">
                            <a-input
                            v-model.trim="setSubForm.param1.upgradeRcvOrSendIp"
                            placeholder="请输入IP地址"
                            allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="设置终端版本号" prop="tmnlVersion" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.tmnlVersion"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in tmnlVersions"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="远程升级接收/发送IP端口" prop="upgradeRcvOrSendPort" class="item-0">
                            <a-input
                            v-model.trim="setSubForm.param1.upgradeRcvOrSendPort"
                            placeholder="请输入IP端口"
                            allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="GSM天线锁功能" prop="gsmAerialLockSetting" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.gsmAerialLockSetting"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in gsmAerialLockSettings"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="GSM天线锁等级" prop="gsmAerialLockType" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.gsmAerialLockType"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in aerialLockTypes"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="GPS天线锁功能" prop="gpsAerialLockSetting" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.gpsAerialLockSetting"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in gpsAerialLockSettings"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="GPS天线锁等级" prop="gpsAerialLockType" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.gpsAerialLockType"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in aerialLockTypes"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="SIM卡锁功能" prop="simCardLockSetting" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.simCardLockSetting"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in simCardLockSettings"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="SIM锁等级" prop="simCardLockType" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.simCardLockType"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in aerialLockTypes"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="SIM卡标识设置" prop="simCardIdentifySetting" class="item-0">
                            <a-select 
                                v-model="setSubForm.param1.simCardIdentifySetting"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in simCardIdentifySettings"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </div>
                    
                </div>
                <div v-if="setSubForm.paramVersion === '02'">
                    <div class="list-0">
                        <a-form-model-item label="IP地址切换功能" prop="ipChange" class="item-0">
                            <a-select 
                                v-model="setSubForm.param2.ipChange"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in ipChanges"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="车辆所有权显示设置" prop="ownershipDisplaySetting" class="item-0">
                            <a-select 
                                v-model="setSubForm.param2.ownershipDisplaySetting"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in ownershipDisplaySettings"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="取样间隔" prop="sampleInterval" class="item-0">
                            <a-input  v-model="setSubForm.param2.sampleInterval" 
                                placeholder="请输入取样间隔"
                                allow-clear>
                                <template #suffix>
                                <span class="suffix-1">(毫秒)</span>
                                </template>         
                            </a-input>
                        </a-form-model-item>
                        
                        <a-form-model-item label="发动机转数变更后取样时间" prop="afterChangeSampleTime" class="item-0">
                            <a-input  v-model="setSubForm.param2.afterChangeSampleTime" 
                                placeholder="变更后取样时间"
                                allow-clear>
                                <template #suffix>
                                <span class="suffix-1">(秒)</span>
                                </template>         
                            </a-input>
                        </a-form-model-item>
                        <a-form-model-item label="取样周期" prop="samplePeriod" class="item-0">
                            <a-input  v-model="setSubForm.param2.samplePeriod" 
                                placeholder="请输入取样周期"
                                allow-clear>
                                <template #suffix>
                                <span class="suffix-1">(秒)</span>
                                </template>         
                            </a-input>
                        </a-form-model-item>
                        <a-form-model-item label="发动机转数变更前取样时间" prop="beforeChangeSampleTime" class="item-0">
                            <a-input  v-model="setSubForm.param2.beforeChangeSampleTime" 
                                placeholder="变更前取样时间"
                                allow-clear>
                                <template #suffix>
                                <span class="suffix-1">(秒)</span>
                                </template>         
                            </a-input>
                        </a-form-model-item>
                        
                        
                        <a-form-model-item label="自动短信投递周期" prop="autoSmsCyc" class="item-0">
                            <a-input  v-model="setSubForm.param2.autoSmsCyc" 
                                placeholder="请输入时间间隔"
                                allow-clear>
                                <template #suffix>
                                <span class="suffix-1">(分)</span>
                                </template>         
                            </a-input>
                        </a-form-model-item>
                        <a-form-model-item label="IP连接错误上限次数" prop="ipMaxConn" class="item-0">
                            <a-input  v-model="setSubForm.param2.ipMaxConn" 
                                placeholder="请输入上限次数"
                                allow-clear>
                                <template #suffix>
                                <span class="suffix-1">(次)</span>
                                </template>         
                            </a-input>
                        </a-form-model-item>
                        <a-form-model-item label="车辆所有权显示设置" prop="ownershipDisplaySetting" class="item-0">
                            <a-select 
                                v-model="setSubForm.param2.sleepSwitch"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in sleepSwitchs"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="上部机体（Upper）、回转(Swing)、行走(Travel)OFF后的时间" prop="upperSwingTravelOffTime" class="item-0">
                            <a-input  v-model="setSubForm.param2.upperSwingTravelOffTime" 
                                placeholder="请输入开始的时间"
                                allow-clear>
                                <template #suffix>
                                <span class="suffix-1">(秒)</span>
                                </template>         
                            </a-input>
                        </a-form-model-item>
                    </div>
                    <div class="list-1">
                        <a-form-model-item label="中心默认接收/发送地址IP" prop="rcvOrSendIp1" class="item-0">
                            <a-input  v-model="setSubForm.param2.rcvOrSendIp1" 
                                    placeholder="IP地址"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="中心默认接收/发送端口号" prop="rcvOrSendPort1" class="item-0">
                            <a-input  v-model="setSubForm.param2.rcvOrSendPort1" placeholder="端口号"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="中心默认GPRS接入点" prop="accessPoint1" class="item-0">
                            <a-input  v-model="setSubForm.param2.accessPoint1" placeholder="接入点"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="中心备用接收/发送地址IP" prop="rcvOrSendIp2" class="item-0">
                            <a-input  v-model="setSubForm.param2.rcvOrSendIp2"
                                    placeholder="IP地址"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="中心备用接收/发送端口号"
                                            prop="rcvOrSendPort2" class="item-0">
                            <a-input  v-model="setSubForm.param2.rcvOrSendPort2" placeholder="端口号"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="中心备用GPRS接入点"
                                            prop="accessPoint2" class="item-0">
                            <a-input  v-model="setSubForm.param2.accessPoint2" placeholder="接入点"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="远程升级接收/发送地址IP" 
                                            prop="upgradeRcvOrSendIp" class="item-0">
                            <a-input  v-model="setSubForm.param2.upgradeRcvOrSendIp" 
                                    placeholder="IP地址"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="远程升级接收/发送端口号" 
                                            prop="upgradeRcvOrSendPort" class="item-0">
                            <a-input  v-model="setSubForm.param2.upgradeRcvOrSendPort" placeholder="端口号"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="远程升级GPRS接入点"
                                            prop="upgradeAccessPoint" class="item-0">
                            <a-input  v-model="setSubForm.param2.upgradeAccessPoint" placeholder="接入点"
                                    allow-clear/>
                        </a-form-model-item>
                    </div>
                </div>
                
            </div>
        </a-form-model>
        <div class="dialog-footer">
            <a-button type="primary" @click="onSubmit">提交</a-button>
        </div>
    </div>
</div>
</template>
<script>

import {paramVersions,tmnlVersions,sendOrNot,ownershipDisplaySettings,
gsmAerialLockSettings,simCardLockSettings,sleepSwitchs,ipChanges, simCardIdentifySettings, aerialLockTypes, gpsAerialLockSettings} from "@/utils/constant"
import {sendCommMessage} from "@/api/infodevice"
import {parseTime, kmxCode} from "@/utils/index"
import {getToken, jwtDecodeToken} from "@/utils/auth"
import TyASpin from "@/components/TyASpin"
import cloneDeep from "lodash/cloneDeep"
export default {
    name:"sSetTerminalInfo",
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
            paramVersions,
            ownershipDisplaySettings,
            sleepSwitchs,
            ipChanges,
            ownershipDisplaySetting,
            gsmAerialLockSettings,
            sendOrNot,
            tmnlVersions,
            simCardIdentifySettings,
            aerialLockTypes,
            gpsAerialLockSettings,
            simCardLockSettings,
            tyspining:false,
            setSubForm:{
                infoId: "37",
                seqNo: "000000",
                paramVersion: undefined,
                timingSendTime: "",
                triedTimes: "1",
                timeOver: "0",
                param1: {
                    ctrlTSerialNo: "",
                    timingSetting:"0",
                    faultSetting: "0",
                    burglarAlarmSetting: "0",
                    repairNoticeSetting: "0",
                    fuelNoticeSetting: "0",
                    logSetting: "0",
                    tmnlDiagnoseSetting: "0",
                    tmnlVersion: "2",
                    ctrlTPartNo: "",
                    rcvOrSendIp2: "",
                    rcvOrSendPort2: "",
                    upgradeRcvOrSendIp: "",
                    upgradeRcvOrSendPort: "",
                    gsmAerialLockSetting: "0",
                    gsmAerialLockType: "1",
                    gpsAerialLockSetting: "0",
                    gpsAerialLockType: "1",
                    simCardLockSetting: "0",
                    simCardLockType: "1",
                    simCardIdentifySetting: undefined
                },
                param2: {
                    rcvOrSendIp1: "",
                    rcvOrSendPort1: "",
                    accessPoint1: "",
                    rcvOrSendIp2: "",
                    rcvOrSendPort2: "",
                    accessPoint2: "",
                    upgradeRcvOrSendIp: "",
                    upgradeRcvOrSendPort: "",
                    upgradeAccessPoint: "",
                    ownershipDisplaySetting: "1",
                    sampleInterval: "50",
                    samplePeriod: "5",
                    afterChangeSampleTime: "5",
                    beforeChangeSampleTime: "0.5",
                    upperSwingTravelOffTime: "5",
                    ipChange: "0",
                    ipMaxConn: "9",
                    autoSmsCyc: "60",
                    sleepSwitch:undefined
                }

            },
            setSubRules:{
                paramVersion: [{
                    required: true,
                    message: "请选择参数版本",
                    trigger: "change"
                }],
                triedTimes: [{
                    required: true,
                    message: "请输入重试次数",
                    trigger: "blur"
                }],
                timeOver: [{
                    required:true,
                    message: "请输入时间",
                    trigger: "blur"
                }]
            }
        }
    },
    computed: {
        userInfo() {
            return this.$store.getters.userInfo
        }
    },
    mounted() {
    },
    methods:{
        regexpcomOne(val,type){
            let sNum = val;
            sNum = sNum.replace(/[^\d]/g,"");
            if(sNum !==""){sNum = Number(sNum);}
            this.setSubForm[type] = sNum;
        },
        timeOverCallback(e){
            this.regexpcomOne(e.target.value,"timeOver")
        },
        triedTimesCallback(e){
            this.regexpcomOne(e.target.value,"triedTimes")         
        },
        filerParams(obj){
            let {sendType,
                timingSendTime,
                triedTimes,timeOver,...data} = obj;
            let newData = cloneDeep(data)
            for(let i in newData.param1){
                if(newData.param1[i]=== undefined){
                    newData.param1[i] = "";
                }
            }
            for(let i in newData.param2){
                if(newData.param2[i]=== undefined){
                    newData.param2[i] = "";
                }
            }
            return newData;
        },
        onSubmit(){
            this.$refs.setSubForm.validate((valid) => {
                if (valid) {
                    this.tyspining = true;
                    return new Promise(() => {
                        let t = {
                            systemCode:  kmxCode(this.recordData.vcl_dictvb_id),
                            accountName:  this.userInfo.realname,
                            accountPwd: "CT100B",
                            jsonVersion: "1.0",
                            infoid: "37",
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
                                paramContent: this.filerParams(this.setSubForm)
                            }
                        }
                        sendCommMessage(t).then(response => {
                            this.tyspining = false;
                            if (response.code == 200) {
                            this.$message.success(response.message)
                            this.$refs.setSubForm.resetFields() // 表单重置
                            } else {
                            this.$message.error(response.message)
                            }

                        }).catch(error => {
                            this.tyspining = false;
                            this.$message.error("提交失败")
                        })
                    })
                }
            });
        }
    }
}
</script>
<style lang="scss">
    .s-set-terminal-info-box{
        height: 500px;
        position: relative;
        .con-box{
            height: 500px;
            overflow-y: auto;
        }
        .dialog-footer{
            text-align:right;
            margin-top: 40px;
            padding:20px
        }
        .suffix-1{
            line-height: 1!important;
            margin-left: 2px;
        }
        .con-box-wrapper{
            label{
                font-size: 13px!important;
            }
            .ant-calendar-picker{
                width: 180px!important;
                min-width: auto!important;
            }
            .list-0{
                display: flex;
                flex-wrap: wrap;
                .item-0{
                    display: flex;
                    padding: 0;
                    .ant-form-item-label{
                        width: 240px;
                    }
                    .ant-form-item-control-wrapper{
                        // flex: 1;
                        width: 180px!important;
                    }
                    &:nth-child(2n+1){
                        .ant-form-item-label{
                            width: 140px;
                        }
                    }
                    &:nth-child(2n+2){
                        flex: 1;
                        padding-left: 10px;
                        .ant-form-item-label{
                            width: 360px;
                        }
                        .ant-form-item-control-wrapper{
                            
                        }
                    }
                }
            }
            
            .list-1{
                display: flex;
                flex-wrap: wrap;
                .item-0{
                    display: flex;
                    // flex-basis: 33.33333%;
                    margin-right: 12px;
                    padding: 0;
                    .ant-form-item-label{
                        width: 160px;
                    }
                    .ant-form-item-control-wrapper{
                        // flex: 1;
                        width: 130px;
                    }
                    &:nth-child(3n+3){
                        margin-right: 0;
                        .ant-form-item-label{
                            width: 135px;
                        }
                    }
                }
            }
            .item-8{
                .ant-form-item-label{
                    label{
                        white-space: break-spaces;
                        line-height: 1;
                        display: inline-block;
                        margin-top: 8px;
                    }
                }
            }
        }
    }
</style>