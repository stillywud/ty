<template>
<div class="t-down-gprs-prompt-box">
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
                    <a-form-model-item label="升级区代码" prop="zone"  class="item-0">
                        <a-select 
                            v-model="setSubForm.zone"
                            placeholder="请选择升级区代码"
                            allow-clear>
                            <a-select-option 
                                v-for="zone in zoneArr"
                                :key="zone.key">
                                {{zone.value}}
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
import {zoneArr} from '@/utils/constant'
import {sendCommMessage} from '@/api/infodevice'
import {parseTime, kmxCode} from '@/utils/index'
import {getToken, jwtDecodeToken} from '@/utils/auth'
import TyASpin from "@/components/TyASpin"
export default {
    name:'tDownGprsDataPrompt',
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
            zoneArr,
            tyspining:false,
            setSubForm:{
                zone:undefined,
                timingSendTime: "",
                triedTimes: "1",
                timeOver: "0",
            },
            setSubRules:{
                zone:[{required:true,message:'请选择升级区代码',trigger:'change'}],
                triedTimes:[{required:true,message:'重复次数不能为空',trigger:'blur'}],
                timeOver: [{required:true,message: "请输入时间",trigger: "blur"}],
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
        timeOverCallback(e){
            this.regexpcomOne(e.target.value,"timeOver")
        },
        triedTimesCallback(e){
            this.regexpcomOne(e.target.value,"triedTimes")         
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
                            infoid: '63',
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
                                    infoId: '63',
                                    seqNo: '000000',
                                    zone:this.setSubForm.zone
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
                }
            });
        }
    }
}
</script>
<style lang="scss">
    .t-down-pgrs-prompt-box{
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
                    width: 120px;
                }
                .ant-form-item-control-wrapper{
                    width: 195px;
                }
            }
        }
    }
</style>