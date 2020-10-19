<template><!--/ 回叫终端参数/-->
<div class="t-call-tmnl-param-box">
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
                    <a-form-model-item label="重复次数" prop="triedTimes" class="item-0">
                        <a-input
                        @change="triedTimesCallback"
                        v-model.trim="setSubForm.triedTimes"
                        placeholder="请输入重复次数"
                        allow-clear/>
                    </a-form-model-item>
                </div>
                <div class="checklist-1">
                    <a-form-model-item  prop="paramCount">
                    <a-checkbox
                        :checked="!!setSubForm.paramCount"
                        @change="comCheck($event,'paramCount')">终端参数设置个数</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="rcvNo">
                    <a-checkbox
                        :checked="!!setSubForm.rcvNo"
                        @change="comCheck($event,'rcvNo')">中心接收号</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="sendNo">
                    <a-checkbox
                        :checked="!!setSubForm.sendNo"
                        @change="comCheck($event,'sendNo')">中心发送号</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="rcvIp1">
                    <a-checkbox
                        :checked="!!setSubForm.rcvIp1"
                        @change="comCheck($event,'rcvIp1')">中心默认接收/发送IP地址</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="accessPoint1">
                    <a-checkbox
                        :checked="!!setSubForm.accessPoint1"
                        @change="comCheck($event,'accessPoint1')">中心默认GPRS接入点</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="rcvIp2">
                    <a-checkbox
                        :checked="!!setSubForm.rcvIp2"
                        @change="comCheck($event,'rcvIp2')">中心备用接收/发送IP地址</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="accessPoint2">
                    <a-checkbox
                        :checked="!!setSubForm.accessPoint2"
                        @change="comCheck($event,'accessPoint2')">中心备用GPRS接入点</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="upgradeIp">
                    <a-checkbox
                        :checked="!!setSubForm.upgradeIp"
                        @change="comCheck($event,'upgradeIp')">远程升级接收/发送IP地址</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="upgradeAccessPoint">
                    <a-checkbox 
                        :checked="!!setSubForm.upgradeAccessPoint"
                        @change="comCheck($event,'upgradeAccessPoint')">远程升级GPRS接入点</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="smsCenter">
                    <a-checkbox 
                        :checked="!!setSubForm.smsCenter"
                        @change="comCheck($event,'smsCenter')">短信中心号码设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="keyoffInfoInterval">
                    <a-checkbox
                        :checked="!!setSubForm.keyoffInfoInterval"
                    @change="comCheck($event,'keyoffInfoInterval')">关机定时信息间隔(分)</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="keyoffDistance">
                    <a-checkbox
                        :checked="!!setSubForm.keyoffDistance"
                        @change="comCheck($event,'keyoffDistance')">关机报警距离(米)</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="askCyc">
                    <a-checkbox
                        :checked="!!setSubForm.askCyc"
                        @change="comCheck($event,'askCyc')">GPRS下载问询周期(秒)</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="infoTransPort">
                    <a-checkbox
                        :checked="!!setSubForm.infoTransPort"
                        @change="comCheck($event,'infoTransPort')">信息传输方式</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="ipChange">
                    <a-checkbox
                    :checked="!!setSubForm.ipChange"
                    @change="comCheck($event,'ipChange')">IP地址切换功能</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="ipMaxConn">
                    <a-checkbox
                    :checked="!!setSubForm.ipMaxConn"
                    @change="comCheck($event,'ipMaxConn')">IP连接错误上限次数</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="autoSmsCyc">
                    <a-checkbox
                    :checked="!!setSubForm.autoSmsCyc"
                        @change="comCheck($event,'autoSmsCyc')">自动短信投递周期(分) </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="can1BaudRate">
                    <a-checkbox
                    :checked="!!setSubForm.can1BaudRate"
                    @change="comCheck($event,'can1BaudRate')">CAN1波特率设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="can2BaudRate">
                    <a-checkbox
                    :checked="!!setSubForm.can2BaudRate"
                        @change="comCheck($event,'can2BaudRate')">CAN2波特率设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="can2PlugReuse">
                    <a-checkbox
                    :checked="!!setSubForm.can2PlugReuse"
                        @change="comCheck($event,'can2PlugReuse')">CAN2插头复用功能设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="userExtendInfo">
                    <a-checkbox
                    :checked="!!setSubForm.userExtendInfo"
                        @change="comCheck($event,'userExtendInfo')">用户扩展信息</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="networkModel">
                    <a-checkbox
                    :checked="!!setSubForm.networkModel"
                        @change="comCheck($event,'networkModel')">注册网络模式</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="imuSet">
                    <a-checkbox
                    :checked="!!setSubForm.imuSet"
                        @change="comCheck($event,'imuSet')">IMU设置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="gatherConfig">
                    <a-checkbox
                    :checked="!!setSubForm.gatherConfig"
                        @change="comCheck($event,'gatherConfig')">透传数据采集配置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="lockCarType">
                    <a-checkbox
                    :checked="!!setSubForm.lockCarType"
                        @change="comCheck($event,'lockCarType')">锁车类型</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="timezoneConfig">
                    <a-checkbox
                    :checked="!!setSubForm.timezoneConfig"
                        @change="comCheck($event,'timezoneConfig')">时区配置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="stratingRetentionPointRadius">
                    <a-checkbox
                    :checked="!!setSubForm.stratingRetentionPointRadius"
                        @change="comCheck($event,'stratingRetentionPointRadius')">开机滞留点半径</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="stratingRetentionPointBeginTime">
                    <a-checkbox
                    :checked="!!setSubForm.stratingRetentionPointBeginTime"
                        @change="comCheck($event,'stratingRetentionPointBeginTime')">开机滞留点起始时间(分钟)</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="localExceptionStartTime">
                    <a-checkbox
                    :checked="!!setSubForm.localExceptionStartTime"
                        @change="comCheck($event,'localExceptionStartTime')">GPS定位异常起始时间(分钟)</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="timingSwitch">
                    <a-checkbox
                    :checked="!!setSubForm.timingSwitch"
                        @change="comCheck($event,'timingSwitch')">透传定时开关</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="selectSwitch">
                    <a-checkbox
                    :checked="!!setSubForm.selectSwitch"
                        @change="comCheck($event,'selectSwitch')">GPS模块选择开关</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="smsLogSwitch">
                    <a-checkbox
                    :checked="!!setSubForm.smsLogSwitch"
                        @change="comCheck($event,'smsLogSwitch')">短信日志开关</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="gprsSwitch">
                    <a-checkbox
                    :checked="!!setSubForm.gprsSwitch"
                        @change="comCheck($event,'gprsSwitch')">GPRS开关</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="udsGatherConfig">
                    <a-checkbox
                    :checked="!!setSubForm.udsGatherConfig"
                        @change="comCheck($event,'udsGatherConfig')">UDS参数采集配置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="bitmap">
                    <a-checkbox
                    :checked="!!setSubForm.bitmap"
                        @change="comCheck($event,'bitmap')">Frame Type 1 Bitmap</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="bitmapSourceAddress">
                    <a-checkbox
                    :checked="!!setSubForm.bitmapSourceAddress"
                        @change="comCheck($event,'bitmapSourceAddress')">Frame Type 1参数采集源地址</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="frequency">
                    <a-checkbox
                    :checked="!!setSubForm.frequency"
                        @change="comCheck($event,'frequency')">Frame Type 1采集频率</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="param1939">
                    <a-checkbox
                    :checked="!!setSubForm.param1939"
                        @change="comCheck($event,'param1939')">J1939参数请求ID配置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="sourceAddressDM1">
                    <a-checkbox
                    :checked="!!setSubForm.sourceAddressDM1"
                        @change="comCheck($event,'sourceAddressDM1')">DM1 SA配置</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="lprType">
                    <a-checkbox
                    :checked="!!setSubForm.lprType"
                        @change="comCheck($event,'lprType')">车牌识别设备选择</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="vehicleIdentityConfig">
                    <a-checkbox
                    :checked="!!setSubForm.vehicleIdentityConfig"
                        @change="comCheck($event,'vehicleIdentityConfig')">车辆身份识别</a-checkbox>
                    </a-form-model-item>
                    
                    <a-form-model-item prop="diagnosticPatternSwitch">
                    <a-checkbox
                    :checked="!!setSubForm.diagnosticPatternSwitch"
                        @change="comCheck($event,'diagnosticPatternSwitch')">诊断模式开关</a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item prop="driverCard">
                    <a-checkbox
                    :checked="!!setSubForm.driverCard"
                        @change="comCheck($event,'driverCard')">车辆司机卡号设置</a-checkbox>
                    </a-form-model-item>
                    
                    <a-form-model-item prop="loadTimeout">
                    <a-checkbox
                        :checked="!!setSubForm.loadTimeout"
                        @change="comCheck($event,'loadTimeout')">装车超时时间设置</a-checkbox>
                    </a-form-model-item>
                </div>
                <div>
                    <a-form-model-item prop="receiptSwitch">
                    <a-checkbox
                    :checked="!!setSubForm.receiptSwitch"
                        @change="comCheck($event,'receiptSwitch')">终端源码上行信息回执设置开关</a-checkbox>
                    </a-form-model-item>
                </div>
            </div>
        </a-form-model>
        <div class="dialog-footer">
            <a-button type="primary" @click="sendCommMessage">提交</a-button>
        </div>
    </div>
</div>
</template>
<script>
import {sendCommMessage} from '@/api/infodevice'
import {parseTime, kmxCode} from '@/utils/index'
import {getToken, jwtDecodeToken} from '@/utils/auth'
import TyASpin from "@/components/TyASpin"
export default {
    name:"tCallTmnlParam",
    props:{
        recordData:{
            default:{}
        },
        send:{},
        tmnlSelected:{
            default:{}
        }
    },
    components:{TyASpin},
    data() {
        return {
            setSubRules:{
                triedTimes:[{required:true,message:'重复次数不能为空',trigger:'blur'}],
                timeOver: [{required:true,message: "请输入时间",trigger: "blur"}],
            },
            tyspining:false,
            setSubForm: {
                timingSendTime: "",
                triedTimes: "1",
                timeOver: "0",
                paramCount:1,
                rcvNo:1,
                sendNo:1,
                rcvIp1:1,
                accessPoint1:1,
                rcvIp2:1,
                accessPoint2:1,
                upgradeIp:1,
                upgradeAccessPoint:1,
                smsCenter:1,
                keyoffInfoInterval:1,
                keyoffDistance:1,
                askCyc:1,
                infoTransPort:1,
                ipChange:1,
                ipMaxConn:1,
                autoSmsCyc:1,
                can1BaudRate:1,
                can2BaudRate:1,
                can2PlugReuse:1,
                userExtendInfo:1,
                networkModel:1,
                imuSet:1,
                gatherConfig:1,
                lockCarType:1,
                timezoneConfig:1,
                stratingRetentionPointRadius:1,
                stratingRetentionPointBeginTime:1,
                localExceptionStartTime:1,
                timingSwitch:1,
                selectSwitch:1,
                smsLogSwitch:1,
                gprsSwitch:1,
                udsGatherConfig:1,
                bitmap:1,
                bitmapSourceAddress:1,
                frequency:1,
                param1939:1,
                sourceAddressDM1:1,
                lprType:1,
                vehicleIdentityConfig:1,
                loadTimeout:1,
                receiptSwitch:1,
                driverCard:1,
                diagnosticPatternSwitch:1,
            },
        }
    },
    computed: {
        userInfo() {
            return this.$store.getters.userInfo
        }
    },
    methods: {
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
        comCheck(event, type){
            this.setSubForm[type] = event.target.checked ? 1 : 0;
        },
        sendCommMessage() {
            this.tyspining = true;
            return new Promise(() => {
            let data = {
                systemCode: kmxCode(this.recordData.vcl_dictvb_id),
                accountName: this.userInfo.realname,
                accountPwd: "123",
                jsonVersion: "1.0",
                infoid: 'E7',
                orderList: {
                    encodeFlag: "2",
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
                        infoId: 'E7',
                        seqNo: '000000',
                        ...this.filterParams(this.setSubForm) 
                    }
                }
            }
            sendCommMessage(data).then(response => {
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
        },
        filterParams(obj){
            let {triedTimes,timingSendTime,...data} = obj;
            return data
        },
        reset() {
            this.$refs.setSubForm.resetFields()
        }
    }
}
</script>
<style lang="scss">
.t-call-tmnl-param-box{
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
    .list-0{
        display: flex;
        flex-wrap: wrap;
        .item-0{
            display:flex;
            flex-basis: 50%;
            .ant-form-item-control-wrapper{
                width: 195px;
            }
            .ant-form-item-label{
                width: 120px;
            }
        }
    }
    .checklist-1{
        display:flex;
        flex-wrap: wrap;
        > .ant-form-item{
            flex-basis: 25%;
            margin-bottom:0;
            .ant-form-item-children,
            .ant-form-item{
                display:inline-block;
            }
        }
    }
}
</style>