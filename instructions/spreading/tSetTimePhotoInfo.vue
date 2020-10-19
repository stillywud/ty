<template><!--/ 定时拍照设置 /-->
<div class="s-set-time-photo-info-box">
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
                    <a-form-model-item label="超时时长" prop="timeOver" class="item-0">
                        <a-input v-model="setSubForm.timeOver" placeholder="0" allow-clear @change="timeOverCallback">
                            <template #suffix>
                            <span class="suffix-1">(分)</span>
                            </template> 
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="定时发送时间" prop="timingSendTime"  class="item-0">
                        <a-date-picker
                        v-model="setSubForm.timingSendTime"
                        show-time
                        placeholder="定时发送时间">
                        </a-date-picker>
                    </a-form-model-item>
                    <a-form-model-item label="定时间隔" prop="timingSpan" class="item-0">
                        <a-input
                        v-model.trim="setSubForm.timingSpan"
                        placeholder="取值范围[0,255]"
                        @change="timingSpanCallback"
                        allow-clear>
                        <template #suffix>
                        <span class="suffix-1">(天)</span>
                        </template>         
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="发动机启动时间" prop="engineOnTime" class="item-0">
                        <a-input
                        @change="engineOnTimeCallback"
                        v-model.trim="setSubForm.engineOnTime"
                        placeholder="请输入发动机启动时间"
                        allow-clear>
                        <template #suffix>
                        <span class="suffix-1">(分)</span>
                        </template>         
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="采集时间段起始时间" prop="gatherBegin" class="item-0">
                        <a-select 
                            v-model="setSubForm.gatherBegin"
                            placeholder="请选择起始时间"
                            allow-clear>
                            <a-select-option
                                v-for="channel in gather8n18"
                                :disabled="channel.key > setSubForm.gatherEnd"
                                :key="channel.key">
                                {{channel.value}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="摄像头通道" prop="channel"  class="item-0">
                        <a-select 
                            v-model="setSubForm.channel"
                            placeholder="请选择摄像头通道"
                            allow-clear>
                            <a-select-option 
                                v-for="channel in channelArr"
                                :key="channel.key">
                                {{channel.value}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    
                    <a-form-model-item label="采集时间段结束时间" prop="gatherEnd" class="item-0">
                        <a-select 
                            v-model="setSubForm.gatherEnd"
                            placeholder="请选择起始时间"
                            allow-clear>
                            <a-select-option
                                v-for="channel in gather8n18"
                                :disabled="channel.key < setSubForm.gatherBegin"
                                :key="channel.key">
                                {{channel.value}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="亮度" prop="bright" class="item-0">
                        <a-input
                        @change="brightCallback"
                        v-model.trim="setSubForm.bright"
                        placeholder="请输入亮度"
                        allow-clear/>
                    </a-form-model-item>
                </div>
            </div>
        </a-form-model>
        <div class="dialog-footer">
            <a-button type="primary" @click="sendCommMessage">
                提交
            </a-button>
        </div>
    </div>
</div>
</template>
<script>

import {channelArr, gather8n18} from "@/utils/constant"
import {sendCommMessage} from "@/api/infodevice"
import {parseTime, kmxCode} from "@/utils/index"
import {getToken, jwtDecodeToken} from "@/utils/auth"
import TyASpin from "@/components/TyASpin"
import cloneDeep from 'lodash/cloneDeep'
export default {
    name:"tSetTimePhotoInfo",
    props:{
        recordData:{
            default:{}
        },
        send:{},
        tmnlSelected:{
            default:{}
        }
    },
    components:{
        TyASpin
    },
    data(){
        return {
            channelArr,
            gather8n18,
            tyspining:false,
            setSubForm:{
                infoId: "F3",
                seqNo:"000000",
                timingSendTime:"",
                triedTimes:1,
                timingSpan:1,
                engineOnTime:10,
                gatherBegin:8,
                gatherEnd:18,
                bright:25,
                channel:0,
                timeOver:0

            },
            setSubRules:{
                timingSpan:[
                    {
                        required: true,
                        trigger: "blur",
                        message:"定时间隔不能为空"
                    }
                ],
                engineOnTime:[{required:true,message:"请输入发动机启动时间",trigger:"blur"}],
                gatherBegin:[
                    {
                        required: true,
                        trigger: "change",
                        message:"请选择起始时间"
                    }
                ],
                gatherEnd:[
                    {
                        required: true,
                        trigger: "blur",
                        message:"请选择结束时间"
                    }
                ],
                triedTimes:[
                    {
                        required: true,
                        trigger: "blur",
                        message:"输入的重复次数"
                    }
                ],
                bright:[
                    {
                        required: true,
                        trigger: "blur",
                        message:"请输入亮度"
                    }
                ],
                timeOver: [{
                    required:true,
                    message: "请输入时间",
                    trigger: "blur"
                }],
                channel:[{required:true,message:"请选择摄像头通道",trigger:"change"}]
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
        brightCallback(e){
            this.regexpcomOne(e.target.value,"bright")  
        },
        engineOnTimeCallback(e){
            this.regexpcomOne(e.target.value,"engineOnTime")   
        },
        triedTimesCallback(e){
            this.regexpcomOne(e.target.value,"triedTimes")            
        },
        timingSpanCallback(e){
            let val = e.target.value;
            val = val.replace(/[^\d]/g,"");
            if(val !== ""){
                val = Number(val);
                if(val > 255){val = 255}
                this.setSubRules.engineOnTime[0].required = !(val === 0 || val === 254 || val === 255) ?  true : false;
                this.setSubRules.gatherBegin[0].required = !(val === 0 || val === 254 || val === 255) ?  true : false;
                this.setSubRules.gatherEnd[0].required = !(val === 0 || val === 254 || val === 255) ?  true : false;
                this.setSubRules.bright[0].required = !(val === 0 || val === 254 || val === 255) ?  true : false;
                this.setSubRules.channel[0].required = !(val === 0 || val === 254 || val === 255) ?  true : false;
            }
            this.setSubForm.timingSpan= val;  
        },
        filerParams(obj){
            let newObj = cloneDeep(obj)
            let {timeOver,
                timingSendTime,
                triedTimes,...data} = newObj;
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
                            accountPwd: "CT100B",
                            jsonVersion: "1.0",
                            infoid: "F3",
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
                                paramContent: this.filerParams(this.setSubForm) 
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
    .s-set-time-photo-info-box{
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
                padding: 0;
                .ant-form-item-label{
                    width: 150px;
                }
                .ant-form-item-control-wrapper{
                    // flex: 1;
                    width: 195px;
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