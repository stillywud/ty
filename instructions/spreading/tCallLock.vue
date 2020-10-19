<template>
    <a-form-model
        ref="setSubForm" 
        :model="setSubForm" 
        :rules="setSubRules" 
        class="callLockForm">

        <div class="call-lock-wrapper">
            
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
            <a-form-model-item label="重复次数" prop="triedTimes" class="item-0">
                <a-input
                @change="triedTimesCallback"
                v-model.trim="setSubForm.triedTimes"
                placeholder="请输入重复次数"
                allow-clear/>
            </a-form-model-item>
            <a-form-model-item label="回叫锁车设置层" prop="backLockType"  class="item-0">
                <a-select 
                    v-model="setSubForm.backLockType"
                    placeholder="请选择回叫锁车设置层"
                    allow-clear>
                    <a-select-option 
                        v-for="backLockType in backLockTypeArr"
                        :key="backLockType.key">
                        {{backLockType.value}}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
        </div>
        <a-form-model-item class="dialog-footer">
            <a-button type="primary" html-type="submit" @click="sendCommMessage">
                提交
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
import {backLockTypeArr} from '@/utils/constant'
import {sendCommMessage} from '@/api/infodevice'
import {parseTime, kmxCode} from '@/utils/index'
import {getToken, jwtDecodeToken} from '@/utils/auth'
export default {
    name:'tCalllock',
    props:[
        'recordData',
        'send',
        'tmnlSelected'
    ],
    data(){
        return {
            backLockTypeArr,
            settmnlData: this.recordData || {},
            setSubForm:{
                timingSendTime:undefined,
                triedTimes:1,
                backLockType:0
            },
            setSubRules:{
                triedTimes:[
                    {
                        required: true,
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            value = value+'';
                            let pgnCountInd = value.toString().indexOf('.');
                            if(value === ''){
                                callback(new Error('请输入重复次数'))
                                return ;
                            }
                            if(pgnCountInd === -1){
                                let valueNum1 = Number(value)
                                if(valueNum1 >=0){
                                     callback()
                                }
                            }
                             callback(new Error('输入的重复次数需为整数'))
                        }
                    }
                ],
                backLockType:[{required:true,message:'请选择摄回叫锁车设置层',trigger:'change'}]
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
        triedTimesCallback(e){
            
            let val = e.target.value;
            console.log(val)
            val = val.replace(/[^\d]/g,'');
            if(val !== ''){val = Number(val);}
            this.setSubForm.triedTimes= val;            
        },
        sendCommMessage(){
            
            this.$refs.setSubForm.validate((valid) => {
                if (valid) {
                    return new Promise(() => {
                        let data = {
                            'systemCode': kmxCode(this.settmnlData.vcl_dictvb_id),
                            'accountName': this.userInfo.realname,
                            'accountPwd': '123',
                            'jsonVersion': '1.0',
                            'infoid': '83',
                            'orderList': {
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
                                    'paramContent': {
                                        'infoId': '83',
                                        "seqNo":"000000",
                                        'backLockType':this.setSubForm.backLockType
                                    }
                                }
                            }
                        sendCommMessage(data).then(response => {
                            if (response.code == 200) {
                            this.$message.success(response.message)
                            this.$refs.setSubForm.resetFields() // 表单重置
                            } else {
                            this.$message.error(response.message)
                            }

                        }).catch(error => {
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
    .callLockForm{
        .dialog-footer{
            text-align:right;
            margin-top: 40px;
            padding:20px
        }
        .call-lock-wrapper{
            display: flex;
            flex-wrap: wrap;
            .item-0{
                display: flex;
                flex-basis: 50%;
                padding: 0 10px;
                .ant-form-item-label{
                    width: 120px;
                }
                .ant-form-item-control-wrapper{
                    // flex: 1;
                    width: 191px;
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