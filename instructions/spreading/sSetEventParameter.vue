<template><!--/ 事件参数设置 /-->
<div class="s-set-event-parameter-box">
    <div class="con-box">
        <ty-a-spin v-if="tyspining"/>    
        <a-form-model
        ref="setSubForm" 
        :model="setSubForm" 
        :rules="setSubRules" >
            <div class="con-box-wrapper">
                <div class="list-0">
                    <a-form-model-item label="发送中心号" class="item-0" props="tmnl_sendCenterNo">
                        <a-input
                        :value="tmnlSelected.tmnl_sendCenterNo"
                        placeholder="请输入发送中心号"
                        disabled="disabled"/>
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
                    <a-form-model-item label="定时发送时间" prop="timingSendTime"  class="item-0">
                        <a-date-picker
                        v-model="setSubForm.timingSendTime"
                        show-time
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="定时发送时间">
                        </a-date-picker>
                    </a-form-model-item>
                    <a-form-model-item label="重复次数" prop="triedTimes"  class="item-0">
                        <a-input
                        @change="triedTimesCallback"
                        v-model.trim="setSubForm.triedTimes" 
                        placeholder="请输入重复次数"
                        allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="事件设置个数" prop="eventCount"  class="item-0">
                        <a-input
                        @change="eventCountCallback"
                        v-model.trim="setSubForm.eventCount" 
                        triedTimes
                        placeholder="请输入事件设置个数"
                        allow-clear/>
                    </a-form-model-item>
                </div>
            </div>
        </a-form-model>
        <div class="table-0">
            <a-table
            :data-source="tablepackData"
            bordered
            stripe
            height="200px"
            :columns="columns"
            :scroll="{ x: 2663 }"
            >
            <template v-slot:action="text, column">
                <a @click="edit(column)">编辑 </a>
                <a-divider type="vertical" />
                <a @click="dele(column.key)">删除</a>
            </template>
            </a-table>
        </div>
        <div class="dialog-footer">
            <a-button type="primary" @click="addPackage" class="addduobao">添加多包</a-button>
            <a-button type="primary" @click="onSubmit">提交</a-button>
        </div>

        <mo-set-event-parameter-s
            ref="modalForm"
            @ontypeParams="ontypeParams"
        />
    </div>
</div>
</template>
<script>
import {sendCommMessage} from "@/api/infodevice"
import {parseTime, kmxCode} from "@/utils/index"
import {getToken, jwtDecodeToken} from "@/utils/auth"
import moSetEventParameterS from "../modal/moSetEventParameterS"
import TyASpin from "@/components/TyASpin"
export default {
    name:"sSetEventParameter",
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
      moSetEventParameterS,
      TyASpin
    },
    data() {
      return {
            tyspining:false,
            setSubForm: {
                timeOver: 0,
                timingSendTime: undefined,
                triedTimes: "1",
                eventCount:"1"
            },
            tablepackData: [],
            columns:[
                {title:"序号",customRender:(text, record, index)=>{return `${index+1}`},key:1,width:60,align:"center"},
                {title:"设置状态",dataIndex:"setState",key:2,width:120,align:"center",customRender:(text, record, index)=>{return record.setStatesText}},
                {title:"位置序号",dataIndex:"serialNumber",key:3,width:90,align:"center"},
                {title:"事件种类",dataIndex:"eventType",key:4,width:243,align:"center",customRender:(text, record, index)=>{return record.eventTypesText}},
                {title:"PGN ID的帧格式",dataIndex:"frameFormat",key:5,width:160,align:"center",customRender:(text, record, index)=>{return record.frameFormatsText}},
                {title:"有无数据ID",dataIndex:"isDataId",key:6,width:100,align:"center",customRender:(text, record, index)=>{return record.isDataIdsText}},
                {title:"PGN ID",dataIndex:"pgnId",key:7,width:100,align:"center"},
                {title:"参数的长度",dataIndex:"paramLength",key:8,width:100,align:"center"},
                {title:"高字节位置",dataIndex:"highByte",key:9,width:140,align:"center",customRender:(text, record, index)=>{return record.highBytesText}},
                {title:"发生条件",dataIndex:"happenCondition",key:10,width:280,align:"center",customRender:(text, record, index)=>{return record.happenConditionsText}},
                {title:"参数在PGN中所处的起始位置",dataIndex:"startStation",key:11,width:220,align:"center"},
                {title:"参数设定值",dataIndex:"paramValue",key:12,width:100,align:"center"},
                {title:"触发值",key:13,dataIndex:"trigger",width:140,align:"center",customRender:(text, record, index)=>{return record.triggersText}},
                {title:"开关参数在PGN中所处的字节位置",dataIndex:"paramStation",key:19,width:250,align:"center"},
                {title:"事件条件满足后需持续时间",dataIndex:"duration",key:14,width:200,align:"center"},
                {title:"数据ID长度",dataIndex:"dataIdLength",key:15,width:100,align:"center"},
                {title:"数据ID起始字节",dataIndex:"dataIdBegin",key:16,width:160,align:"center"},
                {title:"数据ID",dataIndex:"dataId",key:17,width:100,align:"center"},
                {title:"操作",key:18,scopedSlots: { customRender: "action"},width:120,align:"center",fixed:"right"},
            ],
            setSubRules: {
                eventCount:[{required: true,
                validator:(rule, value, callback)=>{
                    if(value === ""){
                        callback(new Error("事件个数不能为空"))
                    }else{
                        let pgnCount = Number(value);
                        if (pgnCount > 100 && pgnCount !== 255) {
                            callback(new Error("取值范围为0-100或255的整数"))
                        }else{
                            callback()
                        }
                    }
                }, trigger: "blur"}],
                timeOver: [{required: true, message: "请输入超时时间(分钟)", trigger: "blur"}],
                triedTimes: [{required: true, message: "请输入重复次数", trigger: "change"}],
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
    methods: {
        addPackage() {
            let eventCount =  this.setSubForm.eventCount;
            if(eventCount !== ""){
                eventCount = +eventCount;
                if([0,255].includes(eventCount)){
                    this.$message.error("事件个数值为0，255添加多包无效，请直接提交！")
                }else if (eventCount > 100 && eventCount !== 255) {
                    this.$message.error("事件个数：取值范围为0-30或255的整数")
                } else if(this.tablepackData.length > eventCount){
                    this.$message.error("超出多包");
                }else{
                    this.add();
                }
            }else{
                this.$message.error("请输入事件个数！")
            }
        },
        eventCountCallback(e){
            let val = e.target.value;
            val = val.replace(/[^\d]/g,"");
            if(val !== ""){val = Number(val);}
            if(val > 255){val = 255}
            this.setSubForm.eventCount= val;   
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
        ontypeParams(o,t){
            let key = o.key;
            let indexo = null;
            let obj = {...o,...o.text};
            console.log(o,"0",obj)
            try{
            if(!!key){
            this.tablepackData.forEach((item, index) => {
                if(item.key === key){
                indexo = index
                console.log(item,"item")
                }
            })
            this.$set(this.tablepackData, indexo, obj)
            }else{
            obj.key = parseInt(new Date().getTime()/1000)
            this.tablepackData.push(obj)
            }
            }catch(e){console.log(e)}
            
            
        },
        onSubmit() {
            this.$refs.setSubForm.validate((valid) => {
                if (valid) {
                    let eventCount = Number(this.setSubForm.eventCount)
                    if(this.tablepackData.length < eventCount){
                        return this.$message.error("缺少多包，请添加");
                    }else if(this.tablepackData.length > eventCount){
                        return this.$message.error("超出多包，请删除");
                    }
                    this.tyspining = true;
                    return new Promise(() => {
                        let data = {
                            systemCode: kmxCode(this.recordData.vcl_dictvb_id),
                            accountName: this.userInfo.realname,
                            accountPwd: "CT100B",
                            jsonVersion: "1.0",
                            infoid: "B5",
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
                                    infoId: "B5",
                                    seqNo: "000000",
                                    eventCount:this.setSubForm.eventCount,
                                    eventSet:this.filterTableArr()
                                }
                            }
                        }
                        sendCommMessage(data).then(response => {
                            this.tyspining = false;
                            if (response.code == 200) {
                                this.$message.success(response.message)
                                this.$refs.setSubForm.resetFields() // 表单重置
                                this.tablepackData = [];
                            } else {
                                this.$message.error(response.message)
                            }

                        }).catch(error => {
                            this.tyspining = false;
                            this.$message.error("提交失败")
                        })
                    })
                }
            })
        },
        filterTableArr(){
            let arr = [];
            let obj = {}
            this.tablepackData.forEach((item)=>{
                obj["setState"] = item.setState;
                obj["serialNumber"] = item.serialNumber;
                obj["eventType"] = item.eventType;
                obj["pgnThreshold"] = item.pgnThreshold;
                obj["pgnSwitch"] = item.pgnSwitch;
                arr.push(obj)
            })
            return arr;
        },
        dele(key){
            this.tablepackData = this.tablepackData.filter((item)=>{
            return item.key != key
            })
        },
        edit(record){
            this.$refs.modalForm.edit(record);
            this.$refs.modalForm.title = "编辑";
            this.$refs.modalForm.disableSubmit = false;
        },
        add(){
            this.$refs.modalForm.add();
            this.$refs.modalForm.title = "新增";
            this.$refs.modalForm.disableSubmit = false;
        }
    }
}
</script>

<style lang="scss">
.s-set-event-parameter-box {
    height: 500px;
    position: relative;
    .con-box{
        height: 500px;
        overflow-y: auto;
    }
    .dialog-footer{
        text-align:right;
        margin-top: 40px;
        padding:20px;
        .addduobao{
            margin-right:20px
        }
    }
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
        padding: 6px;
    }
    .list-0{
        display:flex;
        flex-wrap: wrap;
        .item-0{
            display: flex;
            flex-basis: 50%;
            .ant-form-item-label{
            width: 120px;
            }
            .ant-form-item-children{
            > input{
                min-width: 195px;
            }
            }
        }
    }
}

</style>
