<template><!--/ 设置/回叫产权显示状态信息 /-->
<div class="s-set-property-right-box">
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
                    <a-form-model-item label="产权显示状态" prop="ownershipDisplayStatus" class="item-0">
                        <a-select 
                            v-model="setSubForm.ownershipDisplayStatus"
                            placeholder="请选择"
                            allow-clear>
                            <a-select-option
                                v-for="channel in ownershipDisplayStatuss"
                                :key="channel.key">
                                {{channel.value}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
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

import {ownershipDisplayStatuss} from '@/utils/constant'
import {sendCommMessage} from '@/api/infodevice'
import {parseTime, kmxCode} from '@/utils/index'
import {getToken, jwtDecodeToken} from '@/utils/auth'
import TyASpin from '@/components/TyASpin'
export default {
    name:'sSetPropertyRightInfo',
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
            ownershipDisplayStatuss,
            tyspining:false,
            setSubForm:{
                infoId: "45",
                seqNo: "000000",
                ownershipDisplayStatus: "1",
                timingSendTime: "",
                triedTimes: "1",
                timeOver: "0",
            },
            setSubRules:{
                ownershipDisplayStatus: [{
                    required: !0,
                    message: "请选择显示状态",
                    trigger: "change"
                }],
                timeOver: [{
                    required:true,
                    message: "请输入时间",
                    trigger: "blur"
                }],
                triedTimes: [{
                    required: !0,
                    message: "请输入重试次数",
                    trigger: "blur"
                }],
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
                            infoid: "45",
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
    .s-set-property-right-box{
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
                
                .ant-checkbox-group{
                    display:flex;
                    flex-wrap: wrap;
                }
                .item-0{
                    flex-basis: 20%;
                    margin-bottom:0;
                    .ant-form-item-children{
                        label{
                            font-size: 13px!important;
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