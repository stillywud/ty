<template>
<div class="t-fault-info-box">
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
                    <a-form-model-item label="故障事件透传开关" prop="faultEventSwitch"  class="item-0">
                        <a-select 
                            v-model="setSubForm.faultEventSwitch"
                            placeholder="请选择故障事件透传开关"
                            allow-clear>
                            <a-select-option 
                                v-for="faultEventSwitch in faultEventSwitchArr"
                                :key="faultEventSwitch.key">
                                {{faultEventSwitch.value}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="故障类型个数" prop="faultTypeNum"  class="item-0">
                        <a-select 
                            v-model="setSubForm.faultTypeNum"
                            placeholder="请选择故障类型个数"
                            allow-clear>
                            <a-select-option 
                                v-for="faultTypeNum in faultTypeNumArr"
                                :key="faultTypeNum.key">
                                {{faultTypeNum.value}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="故障类型-J1939故障" prop="faultSourceAddr" class="item-0">
                        <a-input
                        @change="faultSourceAddrCallback"
                        v-model="setSubForm.faultPropertySetting.fault1939.faultSourceAddr"
                        placeholder="取值范围[0,255]"
                        allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="故障类型-KOM仪表故障码采集" prop="kmodel" class="item-0">
                        <a-select 
                            v-model="setSubForm.faultPropertySetting.komFault.model"
                            placeholder="请选择故障类型个数"
                            allow-clear>
                            <a-select-option 
                                v-for="model in typejiArr"
                                :key="model.key">
                                {{model.value}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="故障类型-BT叉车故障码采集" prop="bmodel" class="item-0">
                        <a-select 
                            v-model="setSubForm.faultPropertySetting.btFault.model"
                            placeholder="请选择故障类型个数"
                            allow-clear>
                            <a-select-option 
                                v-for="model in typejiArr"
                                :key="model.key">
                                {{model.value}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </div>
            </div>
            
        </a-form-model>
        <div class="dialog-footer">
            <a-button type="primary" html-type="submit" @click="sendCommMessage">
                提交
            </a-button>
        </div>
    </div>
</div>

</template>
<script>

import {typejiArr,faultTypeNumArr,faultEventSwitchArr} from "@/utils/constant"
import {sendCommMessage} from "@/api/infodevice"
import {parseTime, kmxCode} from "@/utils/index"
import {getToken, jwtDecodeToken} from "@/utils/auth"
import TyASpin from "@/components/TyASpin"
export default {
    name:"tFaultInfo",
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
    data(){
        return {
            faultEventSwitchArr,
            typejiArr,
            faultTypeNumArr,
            tyspining:false,
            setSubForm:{
                timingSendTime: "",
                triedTimes: "1",
                timeOver: "0",
                faultEventSwitch:1,
                faultTypeNum:0,
                faultPropertySetting:{
                    fault1939:{
                        faultType:1,
                        faultSourceAddr:""
                    },
                    komFault:{
                        faultType:2,
                        model:undefined
                    },
                    btFault:{
                        faultType:3,
                        model:undefined
                    }
                }
            },
            setSubRules:{
                faultEventSwitch:[{required:true,message:"请选择是否开启故障事件透传开关",trigger:"change"}],
                faultTypeNum:[{required:true,message:"请选择故障类型个数",trigger:"change"}],
                triedTimes:[{required:true,message:"重复次数不能为空",trigger:"blur"}],
                timeOver: [{required:true,message: "请输入时间",trigger: "blur"}],
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
        faultSourceAddrCallback(e){
            let val = e.target.value;
            val = val.replace(/[^\d]/g,"");
            if(val !== ""){val = Number(val);}
            if(val >255){
                val = 255;
            }
            this.setSubForm.faultPropertySetting.fault1939.faultSourceAddr = val;
        },
        filterParams(obj){
            let {timingSendTime,sendType,triedTimes,...data} = obj;
            return data;
        },
        sendCommMessage(){
            
            this.$refs.setSubForm.validate((valid) => {
                if (valid) {
                    this.tyspining = true;
                    return new Promise(() => {
                        let data = {
                            systemCode: kmxCode(this.recordData.vcl_dictvb_id),
                            accountName: this.userInfo.realname,
                            accountPwd: "123",
                            jsonVersion: "1.0",
                            infoid: "ED",
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
                                    infoId: "ED",
                                    seqNo:"000000",
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
    .t-fault-info-box{
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
                display: flex;
                flex-basis: 50%;
                .ant-form-item-label{
                    width: 200px;
                }
                .ant-form-item-control-wrapper{
                    width: 195px;
                }
            }
        }
    }
</style>