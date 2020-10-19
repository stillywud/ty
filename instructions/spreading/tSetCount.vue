<template><!--/ 参数统计设置/-->
<div class="t-set-count-box">
    <div class="con-box">
      <ty-a-spin v-if="tyspining"/>
        <a-form-model ref="setSubForm" :model="setSubForm" :rules="rules">
            <div class="con-box-wrapper">
                <div class="list-0">
                    <a-form-model-item label="发送中心号" class="item-0" props="sendCenterNo">
                        <a-input
                        :value="setSubForm.sendCenterNo"
                        placeholder="请输入发送中心号"
                        disabled="disabled"/>
                    </a-form-model-item>
                    <a-form-model-item label="超时时长" prop="timeOver" class="item-0">
                        <a-input v-model="setSubForm.timeOver" placeholder="0" allow-clear @change="timeOverCallback">
                            <template #suffix>
                            <span class="suffix-1">(分)</span>
                            </template> 
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="定时发送时间" prop="timingSendTime" class="item-0">
                        <a-date-picker
                            v-model="setSubForm.timingSendTime"
                            show-time
                            placeholder="定时发送时间">
                        </a-date-picker>
                    </a-form-model-item>
                    <a-form-model-item label="重复次数" prop="triedTimes" class="item-0">
                        <a-input v-model="setSubForm.triedTimes" placeholder="请输入重复次数" allow-clear @change="triedTimesCallback"/>
                    </a-form-model-item>
                    <a-form-model-item label="事件设置个数" prop="eventCount"  class="item-0">
                        <a-input 
                        @change="eventCountCallback"
                        v-model.trim="setSubForm.eventCount"
                        placeholder="请输入事件设置个数"
                        allow-clear/>
                    </a-form-model-item>
                </div>
            </div>
        </a-form-model>
        <div class="checktable-1">
            <a-table
            :data-source="tablepackData"
            bordered
            stripe
            height="200px"
            :columns="columns"
            :scroll="{ x: 2540 }"
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
            <a-button type="primary" @click="sendCommMessage">提交</a-button>
        </div>
        <!-- 表格table 区域-->
        <mo-set-count-t
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
import moSetCountT from "../modal/moSetCountT"
import TyASpin from "@/components/TyASpin"
import cloneDeep from "lodash/cloneDeep"
export default {
    name:"tSetCount",
    data() {
        return {
            pgnCountRuleBool:true,
            tyspining:false,
            tablepackData:[],
            settmnlData:this.recordData,
            columns:[
                {title:"序号",customRender:(text, record, index)=>{return `${index+1}`},key:1,width:60,align:"center"},
                {title:"设置状态",dataIndex:"setState",key:15,width:100,align:"center",customRender:(text, record, index)=>{return record.text.setStatesText}},
                {title:"位置序号",dataIndex:"serialNumber",key:16,width:100,align:"center"},
                {title:"设置种类",dataIndex:"eventType",key:17,width:300,align:"center",customRender:(text, record, index)=>{return record.text.eventTypesText}},

                {title:"PGN ID的帧格式",dataIndex:"frameFormat",key:2,width:140,align:"center",customRender:(text, record, index)=>{return record.text.frameFormatsText}},
                {title:"有无数据ID",dataIndex:"isDataId",key:3,width:100,align:"center",customRender:(text, record, index)=>{return record.text.isDataIdsText}},
                {title:"PGN ID",dataIndex:"pgnId",key:4,width:100,align:"center",customRender:(text, record, index)=>{return record.text.pgnIdsText} },
                
                {title:"参数的长度",dataIndex:"paramLength",key:6,width:100,align:"center"},
                {title:"参数起始位置",dataIndex:"startStation",key:7,width:100,align:"center"},
                {title:"高字节位置",dataIndex:"highByte",key:8,width:140,align:"center",customRender:(text, record, index)=>{return record.text.highBytesText} },
                {title:"取最大最小值",dataIndex:"value",key:9,width:100,align:"center",customRender:(text, record, index)=>{return record.text.valuesText} },
                {title:"发生条件",dataIndex:"happenCondition",key:19,width:300,align:"center",customRender:(text, record, index)=>{return record.text.happenConditionZsText} },
                
                {title:"开始计算条件",dataIndex:"beginCount",key:10,width:140,align:"center",customRender:(text, record, index)=>{return record.text.beginCountsText} },
                {title:"计算时间段",dataIndex:"scope",key:11,width:150,align:"center",customRender:(text, record, index)=>{return record.text.scopesText} },

                {title:"分布点数",dataIndex:"distribute",key:20,width:70,align:"center"},
                {title:"分布各点的设定数值",dataIndex:"distributeValue",key:21,width:140,align:"center"},
                
                {title:"PGN参数条件个数",dataIndex:"paramConditionNum",key:35,width:140,align:"center"},
                {title:"PGN参数分布个数",dataIndex:"paramDistributeNum",key:36,width:140,align:"center"},
                
                
                {title:"参数设定值",dataIndex:"paramValue",key:18,width:100,align:"center"},
                {title:"数据ID长度",dataIndex:"dataIdLength",key:12,width:100,align:"center"},
                {title:"数据ID起始字节",dataIndex:"dataIdBegin",key:13,width:140,align:"center"},
                {title:"数据ID",dataIndex:"dataId",key:14,width:80,align:"center"},


                {title:"PGN ID的帧格式2",dataIndex:"frameFormat2",key:25,width:140,align:"center",customRender:(text, record, index)=>{return record.text.frameFormat2sText}},
                {title:"有无数据ID2",dataIndex:"isDataId2",key:26,width:100,align:"center",customRender:(text, record, index)=>{return record.text.isDataId2sText}},
                {title:"PGN ID2",dataIndex:"pgnId2",key:27,width:100,align:"center",customRender:(text, record, index)=>{return record.text.pgnId2sText} },
                {title:"参数的长度2",dataIndex:"paramLength2",key:28,width:100,align:"center"},
                {title:"参数起始位置2",dataIndex:"startStation2",key:29,width:110,align:"center"},
                {title:"高字节位置2",dataIndex:"highByte2",key:30,width:140,align:"center",customRender:(text, record, index)=>{return record.text.highByte2sText} },
                {title:"开始计算条件2",dataIndex:"beginCount2",key:31,width:140,align:"center",customRender:(text, record, index)=>{return record.text.beginCount2sText} },
                {title:"计算时间段2",dataIndex:"scope2",key:32,width:150,align:"center",customRender:(text, record, index)=>{return record.text.scope2sText} },
                {title:"分布点数2",dataIndex:"distribute2",key:33,width:80,align:"center"},
                {title:"分布各点的设定数值2",dataIndex:"distributeValue2",key:34,width:150,align:"center"},
                
                
                {title:"数据ID长度2",dataIndex:"dataIdLength2",key:22,width:100,align:"center"},
                {title:"数据ID起始字节2",dataIndex:"dataIdBegin2",key:23,width:140,align:"center"},
                {title:"数据ID2",dataIndex:"dataId2",key:24,width:80,align:"center"},
                {title:"操作",key:99,scopedSlots: { customRender: "action"},width:120,align:"center",fixed:"right"},            
            ],
            setSubForm: {
                sendCenterNo: this.tmnlSelected.tmnlSendCenterNo,
                timeOver: "0",
                timingSendTime: "",
                triedTimes: "1",
                eventCount:"1"
            },
            rules: {
                triedTimes: [{
                    required: true,
                    message: "请输入重试次数",
                    trigger: "blur"
                }],
                timeOver: [{
                    required:true,
                    message: "请输入时间",
                    trigger: "blur"
                }],
                eventCount: [{
                    required: true,
                    trigger: "blur",
                    message: "请输入个数",
                }]
            },
        };
    },
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
        TyASpin,
        moSetCountT
    },
    computed: {
        userInfo() {
            return this.$store.getters.userInfo
        }
    },
    mounted(){
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
                eventCountCallback(e){
            let val = e.target.value;
            val = val.replace(/[^\d]/g,"");
            if(val !== ""){val = Number(val);}
            if(val > 255){val = 255}
            this.setSubForm.eventCount= val;   
        },
        addPackage() {
            let eventCount =  this.setSubForm.eventCount;
            if(eventCount !== ""){
                eventCount = +eventCount;
                if([0,255].includes(eventCount)){
                    this.$message.error("值为0，255添加多包无效，请直接提交！")
                }else if(eventCount > 50 && eventCount !== 255){
                    this.$message.error("取值范围0-50或255的整数")
                }else if (this.tablepackData.length >= eventCount) {
                    this.$message.error("已超出多包限制")
                } else {
                    this.add();
                }
            }else{
                this.$message.error("请输入事件设置个数！")
            }
        },
        sendCommMessage(){
            this.$refs.setSubForm.validate(valid => {
                if(valid){
                    let eventCount = Number(this.setSubForm.eventCount)
                    if(![0,255].includes(eventCount)){
                        if(this.tablepackData.length < eventCount){
                            return this.$message.error("缺少多包，请添加");
                        }else if(this.tablepackData.length > eventCount){
                            return this.$message.error("超出多包，请删除");
                        }
                    }
                    this.tyspining = true;
                        return new Promise(() => {
                        let data = {
                            systemCode: kmxCode(this.settmnlData.vcl_dictvb_id),
                            accountName: this.userInfo.realname,
                            accountPwd: "123",
                            jsonVersion: "1.0",
                            infoid: "E9",
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
                                    infoId: "E9",
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
                            this.$message.error("提交失败",error)
                        })
                    })
                    
                }
            })
        },
        filterTableArr(){
            let arr = [];
            this.tablepackData.forEach((item)=>{
                let obj = {};
                obj.setState = item.setState;
                obj.serialNumber = item.serialNumber;
                obj.eventType = item.eventType;
                if(item.multiplePgnDistribute){
                    let paramDistributeListArr = item.multiplePgnDistribute.paramDistributeList;
                    let paramDistributeList = [];
                    paramDistributeListArr.forEach((item) =>{
                        let obj = {}
                        obj = item.paramDistributeList;
                        paramDistributeList.push(obj)
                    })
                    obj.multiplePgnDistribute = {
                        paramConditionNum:item.paramConditionNum,
                        paramConditionList:item.multiplePgnDistribute.paramConditionList,
                        paramDistributeNum:item.paramDistributeNum,
                        paramDistributeList,
                    }
                }
                if(item.pgnLimitValue){
                    obj.pgnLimitValue = item.pgnLimitValue
                }
                if(item.pgnCumulativeTime){
                    obj.pgnCumulativeTime = item.pgnCumulativeTime
                }
                if(item.singlePgnDistribute){
                    obj.singlePgnDistribute = item.singlePgnDistribute
                }
                if(item.doublePgnDistribute){
                    obj.doublePgnDistribute = item.doublePgnDistribute
                }
                if(item.multiplePgnCumulativeTime){
                    let arrObj = item.multiplePgnCumulativeTime.paramConditionList;
                    arrObj = arrObj.map((item) => {
                        delete item.text;
                        return item;
                    })
                    obj.multiplePgnCumulativeTime = {
                        paramConditionNum:item.paramConditionNum,
                        paramConditionList:arrObj
                    }
                }
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
            console.log(record,"record11")
            this.$refs.modalForm.edit(record);
            this.$refs.modalForm.title = "编辑";
        },
        add(){
            this.$refs.modalForm.add();
            this.$refs.modalForm.title = "新增";
        },
        ontypeParams(o){
            let key = o.key;
            let indexo = null;
            let obj = {...o};
            console.log(obj,"obj")
            try{
                if(!!key){
                    this.tablepackData.forEach((item, index) => {
                        if(item.key === key){
                            indexo = index
                        }
                    })
                    this.$set(this.tablepackData, indexo, obj)
                }else{
                    obj.key = parseInt(new Date().getTime()/1000);
                    this.tablepackData.unshift(obj)
                }
            }catch(e){console.log(e)}
        }
    },
};
</script>
<style lang="scss">
    .t-set-count-box{
        height: 500px;
        position: relative;
        .con-box{
            height: 500px;
            overflow-y: auto;
        }
        .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
      padding: 6px;
    }
        .dialog-footer{
        text-align:right;
        margin-top: 40px;
        padding:20px;
            .addduobao{
                margin-right:20px
            }
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
          .ant-form-item-control-wrapper{
              // flex: 1;
              width: 195px;
          }
            }
        }
    }
</style>