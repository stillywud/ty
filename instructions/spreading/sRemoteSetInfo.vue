<template><!--/ 远程操作设置信息  /-->
<div class="s-remote-set-info-box">
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
                    <a-form-model-item label="参数组编号" prop="paramGroupNo" class="item-0">
                        <a-select 
                            v-model="setSubForm.paramGroupNo"
                            placeholder="请选择参数版本"
                            allow-clear>
                            <a-select-option
                                v-for="channel in paramGroupNos"
                                :key="channel.key">
                                {{channel.value}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </div>
                <div v-if="setSubForm.paramGroupNo === '2'">
                    <div class="list-0">
                        <a-form-model-item label="柴油粗滤" prop="fuelFilterPre" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.fuelFilterPre" 
                                    placeholder="请输入柴油粗滤"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="柴油细滤" prop="fuelFilterMain" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.fuelFilterMain" placeholder="请输入柴油细滤"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="机油" prop="engineOil" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.engineOil" placeholder="请输入机油"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="机油滤芯" prop="engineOilFilter" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.engineOilFilter"
                                    placeholder="请输入机油滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="空气滤芯"
                                            prop="airCleanerElement" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.airCleanerElement" placeholder="请输入空气滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="透气阀滤芯"
                                            prop="airBreatherElement" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.airBreatherElement" placeholder="请输入透气阀滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="先导油滤芯" 
                                            prop="pilotOilFilter" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.pilotOilFilter" 
                                    placeholder="请输入先导油滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="回油滤芯" 
                                            prop="returnFilter" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.returnFilter" placeholder="请输入回油滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="吸油滤"
                                            prop="suctionFilter" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.suctionFilter" placeholder="请输入吸油滤"
                                    allow-clear/>
                        </a-form-model-item>

                        <a-form-model-item label="液压油"
                                            prop="hydOilChange" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.hydOilChange" placeholder="请输入液压油"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="回转减速器齿轮油" 
                                            prop="swingReducerGearOil" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.swingReducerGearOil" 
                                    placeholder="请输入回转减速器齿轮油"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="行走减速器齿轮油" 
                                            prop="travelReducerGearOil" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.travelReducerGearOil" placeholder="请输入行走减速器齿轮油"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="空调滤芯"
                                            prop="conditionerFilter" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.conditionerFilter" placeholder="请输入空调滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="ATS滤芯"
                                            prop="atsFilter" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.atsFilter" placeholder="请输入ATS滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                    </div>
                </div>
                <div v-if="setSubForm.paramGroupNo === '3'">
                    <div class="list-0">
                        <a-form-model-item label="柴油粗滤" prop="fuelFilterPre" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.fuelFilterPre" 
                                    placeholder="请输入柴油粗滤"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="柴油细滤" prop="fuelFilterMain" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.fuelFilterMain" placeholder="请输入柴油细滤"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="机油" prop="engineOil" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.engineOil" placeholder="请输入机油"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="机油滤芯" prop="engineOilFilter" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.engineOilFilter"
                                    placeholder="请输入机油滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="空气滤芯"
                                            prop="airCleanerElement" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.airCleanerElement" placeholder="请输入空气滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="透气阀滤芯"
                                            prop="airBreatherElement" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.airBreatherElement" placeholder="请输入透气阀滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="先导油滤芯" 
                                            prop="pilotOilFilter" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.pilotOilFilter" 
                                    placeholder="请输入先导油滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="回油滤芯" 
                                            prop="returnFilter" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.returnFilter" placeholder="请输入回油滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="吸油滤"
                                            prop="suctionFilter" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.suctionFilter" placeholder="请输入吸油滤"
                                    allow-clear/>
                        </a-form-model-item>

                        <a-form-model-item label="液压油"
                                            prop="hydOilChange" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.hydOilChange" placeholder="请输入液压油"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="回转减速器齿轮油" 
                                            prop="swingReducerGearOil" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.swingReducerGearOil" 
                                    placeholder="请输入回转减速器齿轮油"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="行走减速器齿轮油" 
                                            prop="travelReducerGearOil" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.travelReducerGearOil" placeholder="请输入行走减速器齿轮油"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="空调滤芯"
                                            prop="conditionerFilter" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.conditionerFilter" placeholder="请输入空调滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="ATS滤芯"
                                            prop="atsFilter" class="item-0">
                            <a-input  v-model="setSubForm.maintenanceIntervalGroup.atsFilter" placeholder="请输入ATS滤芯"
                                    allow-clear/>
                        </a-form-model-item>
                    </div>
                </div>
                <div v-if="setSubForm.paramGroupNo === '6'">
                    <div class="list-0">
                        <a-form-model-item label="设置的参数" prop="intendedParameter" class="item-0">
                            <a-select 
                                v-model="setSubForm.vehicleParameterGroup.intendedParameter"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in intendedParameters"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="设置的值" prop="value" class="item-0">
                            <a-input  v-model="setSubForm.vehicleParameterGroup.value" 
                                    placeholder="请输入设置的值"
                                    allow-clear/>
                        </a-form-model-item>
                    </div>
                </div>
                <div v-if="setSubForm.paramGroupNo === '8'">
                    <div class="list-0">
                        <a-form-model-item label="车辆所有权显示设置" prop="resetRequest" class="item-0">
                            <a-select 
                                v-model="setSubForm.vehicleResetGroup.resetRequest"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in resetRequests"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </div>
                </div>
                <div v-if="setSubForm.paramGroupNo === '9'">
                    <div class="list-0">
                        <a-form-model-item label="测试对象" prop="intendedTest" class="item-0">
                            <a-select 
                                v-model="setSubForm.engineTestGroup.intendedTest"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in intendedTests"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="测试值" prop="resetRequest" class="item-0">
                            <a-input  v-model="setSubForm.engineTestGroup.resetRequest" 
                                    placeholder="请输入测试值"
                                    allow-clear/>
                        </a-form-model-item>
                        <a-form-model-item label="发动机装置测试结果" prop="testResult" class="item-0">
                            <a-select 
                                v-model="setSubForm.engineTestGroup.testResult"
                                placeholder="请选择"
                                allow-clear>
                                <a-select-option
                                    v-for="channel in testResults"
                                    :key="channel.key">
                                    {{channel.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </div>
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

import {intendedParameters, intendedTests, resetRequests, paramGroupNos, testResults} from "@/utils/constant"
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
            intendedParameters,
            intendedTests,
            resetRequests,
            paramGroupNos,
            testResults,
            tyspining:false,
            setSubForm:{
                infoId: "41",
                seqNo: "000000",
                paramGroupNo: undefined,
                timingSendTime: "",
                triedTimes: "1",
                timeOver: "0",
                maintenanceRemainGroup:{
                    fuelFilterPre:"",
                    fuelFilterMain:"",
                    engineOil:"",
                    engineOilFilter:"",
                    airCleanerElement:"",
                    airBreatherElement:"",
                    pilotOilFilter:"",
                    returnFilter:"",
                    suctionFilter:"",
                    hydOilChange:"",
                    swingReducerGearOil:"",
                    travelReducerGearOil:"",
                    conditionerFilter:"",
                    atsFilter:""
                },
                maintenanceIntervalGroup:{
                    fuelFilterPre:"",
                    fuelFilterMain:"",
                    engineOil:"",
                    engineOilFilter:"",
                    airCleanerElement:"",
                    airBreatherElement:"",
                    pilotOilFilter:"",
                    returnFilter:"",
                    suctionFilter:"",
                    hydOilChange:"",
                    swingReducerGearOil:"",
                    travelReducerGearOil:"",
                    conditionerFilter:"",
                    atsFilter:""
                },
                vehicleParameterGroup:{
                    intendedParameter:undefined,
                    value:""
                },
                vehicleResetGroup:{
                    resetRequest:undefined
                },
                engineTestGroup:{
                    intendedTest:undefined,
                    contents:"",
                    testResult:undefined
                }

            },
            setSubRules:{
                paramGroupNo: [{
                    required: true,
                    message: "请选择参数组编号",
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
            for(let i in newData.vehicleParameterGroup){
                if(newData.vehicleParameterGroup[i]=== undefined){
                    newData.vehicleParameterGroup[i] = "";
                }
            }
            for(let i in newData.vehicleResetGroup){
                if(newData.vehicleResetGroup[i]=== undefined){
                    newData.vehicleResetGroup[i] = "";
                }
            }
            for(let i in newData.engineTestGroup){
                if(newData.engineTestGroup[i]=== undefined){
                    newData.engineTestGroup[i] = "";
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
                            infoid: "41",
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
    .s-remote-set-info-box{
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
            .list-0{
                display: flex;
                flex-wrap: wrap;
                .item-0{
                    display: flex;
                    flex-basis: 50%;
                    padding: 0;
                    .ant-form-item-label{
                        width: 140px;
                    }
                    .ant-form-item-control-wrapper{
                        // flex: 1;
                        width: 195px;
                    }
                    // &:nth-child(2n+1){
                    //     .ant-form-item-label{
                    //         width: 140px;
                    //     }
                    // }
                    // &:nth-child(2n+2){
                    //     flex: 1;
                    //     padding-left: 10px;
                    //     .ant-form-item-label{
                    //         width: 360px;
                    //     }
                    //     .ant-form-item-control-wrapper{
                            
                    //     }
                    // }
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