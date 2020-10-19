<template><!--/ 回叫终端参数信息  /-->
<div class="s-callback-terminal-info-box">
    <div class="con-box">
        <ty-a-spin v-if="tyspining"/>
        <a-form-model
            ref="setSubForm" 
            :model="setSubForm" 
            :rules="setSubRules" >

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
                        placeholder="定时发送时间">
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
                    <a-form-model-item label="参数版本(分组)" prop="paramVersion" class="item-0">
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
                <div class="checklist-0 checklist-1" v-if="setSubForm.paramVersion === '01'">
                    <a-form-model-item prop="ctrlTSerialNo"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.ctrlTSerialNo"
                            @change="comCheck($event,'ctrlTSerialNo')">GPS终端的监控中心号</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="timingSetting"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.timingSetting"
                            @change="comCheck($event,'timingSetting')">定时信息设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="faultSetting"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.faultSetting"
                            @change="comCheck($event,'faultSetting')">故障信息设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="burglarAlarmSetting"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.burglarAlarmSetting"
                            @change="comCheck($event,'burglarAlarmSetting')">防盗动作通知信息设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="repairNoticeSetting"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.repairNoticeSetting"
                            @change="comCheck($event,'repairNoticeSetting')">维修通知信息设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="fuelNoticeSetting"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.fuelNoticeSetting"
                            @change="comCheck($event,'fuelNoticeSetting')">燃料余量通知信息设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="logSetting"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.logSetting"
                            @change="comCheck($event,'logSetting')">日志信息设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="tmnlDiagnoseSetting"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.tmnlDiagnoseSetting"
                            @change="comCheck($event,'tmnlDiagnoseSetting')">终端诊断信息设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="tmnlVersion"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.tmnlVersion"
                            @change="comCheck($event,'tmnlVersion')">设置终端版本号</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="ctrlTPartNo"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.ctrlTPartNo"
                            @change="comCheck($event,'ctrlTPartNo')">控制器T部件编号</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="rcvOrSendIp2"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.rcvOrSendIp2"
                            @change="comCheck($event,'rcvOrSendIp2')">中心备用接收/发送IP地址</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="upgradeRcvOrSendIp"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.upgradeRcvOrSendIp"
                            @change="comCheck($event,'upgradeRcvOrSendIp')">远程升级接收/发送IP地址</a-checkbox>
                    </a-form-model-item>

                    <a-form-model-item prop="gsmAerialLockSetting"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.gsmAerialLockSetting"
                            @change="comCheck($event,'gsmAerialLockSetting')">GSM天线锁设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="gpsAerialLockSetting"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.gpsAerialLockSetting"
                            @change="comCheck($event,'gpsAerialLockSetting')">GPS天线锁设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="simCardLockSetting"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.simCardLockSetting"
                            @change="comCheck($event,'simCardLockSetting')">SIM卡锁设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="simCardIdentifySetting"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param1.simCardIdentifySetting"
                            @change="comCheck($event,'simCardIdentifySetting')">SIM卡标识设置</a-checkbox>
                    </a-form-model-item>
                </div>
                <div class="checklist-0 checklist-2" v-if="setSubForm.paramVersion === '02'">
                    <a-form-model-item prop="rcvOrSendIp1"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.rcvOrSendIp1"
                            @change="comCheck($event,'rcvOrSendIp1')">中心默认接收/发送IP地址</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="accessPoint1"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.accessPoint1"
                            @change="comCheck($event,'accessPoint1')">中心默认GPRS接入点</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="rcvOrSendIp2"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.rcvOrSendIp2"
                            @change="comCheck($event,'rcvOrSendIp2')">中心备用接收/发送IP地址</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="accessPoint2"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.accessPoint2"
                            @change="comCheck($event,'accessPoint2')">中心备用GPRS接入点</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="upgradeRcvOrSendIp"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.upgradeRcvOrSendIp"
                            @change="comCheck($event,'upgradeRcvOrSendIp')">远程升级接收/发送IP地址</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="upgradeRcvOrSendIp"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.upgradeRcvOrSendIp"
                            @change="comCheck($event,'upgradeRcvOrSendIp')">远程升级GPRS接入点</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="ownershipDisplaySetting"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.ownershipDisplaySetting"
                            @change="comCheck($event,'ownershipDisplaySetting')">车辆所有权显示设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="sampleInterval"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.sampleInterval"
                            @change="comCheck($event,'sampleInterval')">取样间隔</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="samplePeriod"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.samplePeriod"
                            @change="comCheck($event,'samplePeriod')">取样周期</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="afterChangeSampleTime"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.afterChangeSampleTime"
                            @change="comCheck($event,'afterChangeSampleTime')">目标发动机转数变更后取样时间</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="beforeChangeSampleTime"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.beforeChangeSampleTime"
                            @change="comCheck($event,'beforeChangeSampleTime')">目标发动机转数变更前取样时间</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="ipChange"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.ipChange"
                            @change="comCheck($event,'ipChange')">IP地址切换功能</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="ipMaxConn"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.ipMaxConn"
                            @change="comCheck($event,'ipMaxConn')">IP连接错误上限次数</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="autoSmsCyc"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.autoSmsCyc"
                            @change="comCheck($event,'autoSmsCyc')">自动短信投递周期</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="sleepSwitch"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.sleepSwitch"
                            @change="comCheck($event,'sleepSwitch')">睡眠模式开关</a-checkbox>
                    </a-form-model-item>
                    
                </div>
                <div class="checklist-0 checklist-3" v-if="setSubForm.paramVersion === '02'">
                    <a-form-model-item prop="upperSwingTravelOffTime"  class="item-0">
                        <a-checkbox
                            :checked="!!setSubForm.param2.upperSwingTravelOffTime"
                            @change="comCheck($event,'upperSwingTravelOffTime')">上部机体（Upper）、回转(Swing)、行走(Travel)OFF后取样开始的时间</a-checkbox>
                    </a-form-model-item>
                </div>
            </div>
        </a-form-model>
        <div class="dialog-footer">
            <a-button type="primary" html-type="submit" @click="onSubmit">
                提交
            </a-button>
        </div>
    </div>
</div>
</template>
<script>

import {paramVersions} from '@/utils/constant'
import {sendCommMessage} from '@/api/infodevice'
import {parseTime, kmxCode} from '@/utils/index'
import {getToken, jwtDecodeToken} from '@/utils/auth'
import TyASpin from '@/components/TyASpin'
import cloneDeep from 'lodash/cloneDeep'
export default {
    name:'sCallbackTerminalInfo',
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
            tyspining:false,
            setSubForm:{
                infoId: "39",
                seqNo: "000000",
                timingSendTime: "",
                triedTimes: "1",
                timeOver: "0",
                paramVersion: undefined,
                param1: {
                    ctrlTSerialNo: 1,
                    timingSetting: 0,
                    faultSetting: 0,
                    burglarAlarmSetting: 0,
                    repairNoticeSetting: 0,
                    fuelNoticeSetting: 0,
                    logSetting: 0,
                    tmnlDiagnoseSetting: 0,
                    tmnlVersion: 1,
                    ctrlTPartNo: 1,
                    rcvOrSendIp2: 1,
                    upgradeRcvOrSendIp: 1,
                    gsmAerialLockSetting: 0,
                    gpsAerialLockSetting: 0,
                    simCardLockSetting: 0,
                    simCardIdentifySetting: 0
                },
                param2: {
                    rcvOrSendIp1: 1,
                    accessPoint1: 1,
                    rcvOrSendIp2: 1,
                    accessPoint2: 1,
                    upgradeRcvOrSendIp: 1,
                    upgradeAccessPoint:1,
                    ownershipDisplaySetting: 1,
                    sampleInterval: 1,
                    samplePeriod: 1,
                    afterChangeSampleTime: 1,
                    beforeChangeSampleTime: 1,
                    upperSwingTravelOffTime: 1,
                    ipChange: 1,
                    ipMaxConn: 1,
                    autoSmsCyc: 1,
                    sleepSwitch:1
                }
            },
            setSubRules:{
                paramVersion: [{
                    required: !0,
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
        comCheck(event, type){
            this.setSubForm[type] = event.target.checked ? 1 : 0;
        },
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
            return data;
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
                            infoid: "39",
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
    .s-callback-terminal-info-box{
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
                        // flex: 1;
                        width: 195px;

                    }
                }
            }
            .checklist-0{
                display:flex;
                flex-wrap: wrap;
                .item-0{
                    flex-basis: 50%;
                    margin-bottom:0;
                    .ant-form-item-children{
                        label{
                            font-size: 13px!important;
                        }
                    }
                    
                }
            }
            .checklist-2{
                .item-0{
                    flex-basis: 25%;
                }
            }
            .checklist-1{
                .item-0{
                    flex-basis: 25%;
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