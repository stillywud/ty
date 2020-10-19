<template><!--/定时透传设置/-->
<div class="t-set-terminal-info-box">
    <div class="con-box">
        <ty-a-spin v-if="tyspining"/>
        <a-form-model ref="setSubForm" :model="setSubForm" :rules="setSubRules">
            <div class="con-box-wrapper">
                <a-form-model-item label="发送中心号" class="item-0">
                    <a-input  v-model="tmnlSelected.tmnlSendCenterNo" placeholder="请输入发送中心号"
                            allow-clear disabled/>
                </a-form-model-item>
                <a-form-model-item label="超时时长" prop="timeOver" class="item-0">
                    <a-input  v-model="setSubForm.timeOver" @change="timeOverCallback"
                            allow-clear>
                    <template #suffix>
                        <span class="suffix-1">(分)</span>
                    </template>          
                    </a-input>
                </a-form-model-item>
                <a-form-model-item label="重复次数" prop="triedTimes" class="item-0">
                    <a-input  v-model="setSubForm.triedTimes" placeholder="请输入重复次数" @change="triedTimesCallback"
                            allow-clear/>
                </a-form-model-item>
                <a-form-model-item label="模板选择" class="item-0" prop="tempId">
                    <a-select allow-clear v-model="tempId" @change="selectTemp" placeholder="请选择模板">
                    <a-select-option v-for="temp in tempData" :value="temp.mtstId" :key="temp.mtstId">
                        {{ temp.mtstName }}
                    </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="定时发送时间"  prop="timingSendTime" class="item-0">
                    <a-date-picker
                    v-model="setSubForm.timingSendTime"
                    show-time
                    placeholder="定时发送时间">
                    </a-date-picker>
                </a-form-model-item>
                <a-form-model-item label="PGN参数ID个数" prop="pgnCount" class="item-0">
                    <a-input  v-model="setSubForm.pgnCount" placeholder="请输入PGN参数ID个数" allow-clear @change="pgnCountCallback"/>
                </a-form-model-item>
            </div>
        </a-form-model>
        <a-table
            :data-source="tablepackData"
            bordered
            stripe
            height="200px"
            :scroll="{ x: 1560 }"
            :columns="columns"
        >
            <template v-slot:action="text,column">
                <a @click="edit(column)">编辑 </a>
                <a-divider type="vertical" />
                <a @click="dele(column.key)">删除</a>
            </template>
        </a-table>
        <div class="dialog-footer">
            <a-button type="primary" @click="addPackage">添加多包</a-button>
            <a-divider type="vertical" />
            <a-button type="primary" @click="sendCommMessage">提交</a-button>
        </div>
    </div>
    <!-- 表格table 区域 弹出-->
    <mo-set-time-info-t
        ref="modalForm"
        :pgnIdsCopy="pgnIds"
        @ontypeParams="ontypeParams"
    />
</div>
</template>
<script>
import {sendCommMessage, getPGNInfo} from "@/api/infodevice"
import {parseTime, kmxCode} from "@/utils/index"
import {getToken, jwtDecodeToken} from "@/utils/auth"
import {getParaData, getTempData} from "@/api/tempTiming"
import TyASpin from "@/components/TyASpin"
import moSetTimeInfoT from "../modal/moSetTimeInfoT"
export default {
    name: "tSetTimeInfo",
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
      moSetTimeInfoT,
      TyASpin
    },
    data() {
        return {
            pgnIds:[],
            packFormCopy:{},
            tempData: [],
            tempId: undefined,
            tyspining:false,
            setSubForm: {
                pgnCount: "1",
                timeOver: 1,
                timingSendTime: "",
                triedTimes: "1"
            },
            addDialogPack: false,
            tablepackData: [],
            columns: [
                {
                    title:"序号", key:110, width:60, align:"center", customRender(text, record, index) {return `${index + 1}`}
                },
                {
                    dataIndex: "isDataId",title: "有无数据ID",key: 111, width: 110, align:"center", customRender:(text, record, index)=>{return record.text.isDataIdsText}
                },
                {
                    dataIndex: "dataIdBegin",title: "数据ID起始字节", key: 112, width: 140, align:"center",
                },
                {
                    dataIndex: "dataIdLength",title: "数据ID长度", key: 124, width: 140, align:"center",
                },
                {
                    dataIndex: "dataId",title: "数据ID", key: 113, width: 80, align:"center",
                },
                {
                    title: "PGN ID的帧格式", key: 114, dataIndex: "frameFormat", width: 140, align:"center",customRender:(text, record, index)=>{return record.text.frameFormatsText}
                },
                {
                    title: "PGN来源", key: 115,dataIndex: "source", width: 90, align:"center",customRender:(text, record, index)=>{return record.text.sourcesText}
                },
                {
                    title: "PGN ID",key: 116,dataIndex: "pgnId",width: 140, align:"center",customRender:(text, record, index)=>{return record.text.pgnIdsText}
                },
                {
                    title: "多包广播ID帧格式", key: 117,dataIndex: "multiRadioFrameFormat", width: 140, align:"center",customRender:(text, record, index)=>{return record.text.multiRadioFrameFormatsText}
                },
                {
                    title: "多包广播ID", key: 118, dataIndex: "multiRadioId", width: 100, align:"center",
                },
                {
                    title: "采集频率",key: 119,dataIndex: "frequency", width: 140, align:"center",
                },
                {
                    title: "多包数据ID帧格式",key: 120,dataIndex: "multiDataFrameFormat", width: 140, align:"center",customRender:(text, record, index)=>{return record.text.multiDataFrameFormatsText}
                },
                {
                    title: "多包数据ID", key: 121, dataIndex: "mutiDataId", width: 100, align:"center",
                },
                {
                    title: "是否多包", key: 122,dataIndex: "isPackage",width: 140, align:"center",customRender:(text, record, index)=>{return record.text.isPackagesText}
                },
                {
                    title: "操作", key: "operation", fixed: "right",key:123,width: 120, align:"center", scopedSlots: { customRender: "action" }
                }
            ],
            setSubRules: {
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
                pgnCount: [{
                    required: true,
                    trigger: "blur",
                    message: "请输入个数",
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
        this.getPGNInfo();
        this.getTempData()
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
        pgnCountCallback(e){
            let val = e.target.value;
            val = val.replace(/[^\d]/g,"");
            if(val !== ""){val = Number(val);}
            if(val > 255){val = 255}
            this.setSubForm.pgnCount= val;   
        },
        ontypeParams(o){
            let key = o.key;
            let indexo = null;
            let obj = {...o};
            try{
            if(!!key){
                this.tablepackData.forEach((item, index) => {
                if(item.key === key){
                    indexo = index
                }
                })
                this.$set(this.tablepackData, indexo, obj)
            }else{
                obj.key = parseInt(new Date().getTime()/1000)
                this.tablepackData.unshift(obj)
            }
            }catch(e){console.log(e)}
        },
        getTempData() {
            getTempData({ page: 1, pageSize: 99999 }).then(response => {
                const data = response
                if (data.code == 200) {
                    this.tempData = data.result.records
                }
            })
        },
        selectTemp(val,option) {
            this.tablepackData = []
            if(!val){
            return ;
            }
            getParaData({ mtstpMtstId: val, pageNo: 1, pageSize: 99999 }).then(res => {
            if (res.code == 200) {
                    const list = res.result.records
                    for (let i = 0; i < list.length; i++) {
                        const data = list[i];
                        let obj = {
                            num: data.mtstpId,
                            source: this.emptyValue(data.mtstpSource), //来源
                            frameFormat: this.emptyValue(data.mtstpFrameformat), //PGN ID的帧格式
                            isDataId: this.emptyValue(data.mtstpIsdataid), //有无数据ID
                            pgnId: this.emptyValue(data.mtstpPgnid), //PGN ID
                            dataIdLength: data.mtstpDataidlength, //数据ID长度
                            dataIdBegin: data.mtstpDataidbegin, //数据ID起始字节
                            dataId: data.mtstpDataid, //数据ID
                            isPackage: this.emptyValue(data.mtstpIspackage),
                            multiRadioFrameFormat: this.emptyValue(data.mtstpRadioformat),
                            multiDataFrameFormat: this.emptyValue(data.mtstpMdataformat),
                            multiRadioId: data.mtstpRadioid,
                            frequency: data.mtstpFrequency,
                            mutiDataId: data.mtstpMdataid,
                        }
                        let tableDataTemp = {
                            ...obj,
                            key:data.mtstpId,
                            text:this.$refs.modalForm.textFilter(obj)
                        }
                        this.tablepackData.push(tableDataTemp)
                    }
                    this.setSubForm.pgnCount = list.length
                }
            })
        },
        emptyValue(val){
            // 下拉框赋值是空不展示placeholder,需要改为undefined
            let bool = [""].includes(val)
            if(bool){
                return undefined
            }
            return val
        },
        getPGNInfo() {
            getPGNInfo().then(response => {
                const data = response
                if (data.code == 200) {
                    this.pgnIds = data.pgn_list
                }
            })
        },
        // 添加多包数据
        addPackage() {
            let pgnCount =  this.setSubForm.pgnCount;
            if(pgnCount !== ""){
                pgnCount = Number(pgnCount);
                if([0,255,254].includes(pgnCount)){
                this.$message.error("值为0，255，254添加多包无效，请直接提交！")
                }else if(pgnCount > 250 && pgnCount !== 255 && pgnCount!==254){
                this.$message.error("取值范围0-250或255、254的整数")
                }else if (this.tablepackData.length > pgnCount) {
                this.$message.error("已超出PGN参数ID个数限制")
                } else {
                this.add();
                }
            }else{
                this.$message.error("请输入PGN参数ID个数")
            }
        },
        sendCommMessage() {
            this.$refs.setSubForm.validate(valid => {
                if (valid) {
                    let pgnCount = Number(this.setSubForm.pgnCount)
                    if(this.tablepackData.length < pgnCount){
                        return this.$message.error("缺少多包，请添加");
                    }else if(this.tablepackData.length > pgnCount){
                        return this.$message.error("超出多包，请删除");
                    }
                    this.tyspining = true;
                    return new Promise(() => {
                        var data = {
                            systemCode: kmxCode(this.recordData.vcl_dictvb_id),
                            accountName: this.userInfo.realname,
                            accountPwd: "123",
                            jsonVersion: "1.0",
                            infoid: "D1",
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
                                    infoId: "D1",
                                    seqNo: "000000",
                                    pgnCount: this.setSubForm.pgnCount,
                                    pgnPackage: this.filterTableArr(this.tablepackData)
                                }
                            }
                        }
                        sendCommMessage(data)
                        .then(response => {
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
            this.tablepackData.forEach((item)=>{
                let {text,key,...data} = item;
                arr.push(data)
            })
            return arr;
        }, 
        edit(record){
            this.$refs.modalForm.edit(record);
            this.$refs.modalForm.title = "编辑";
        },
        add(){
            this.$refs.modalForm.add();
            this.$refs.modalForm.title = "新增";
        },
        dele(key){
            this.tablepackData = this.tablepackData.filter((item) =>{
                return item.key != key;
            })
        }
    }
}
</script>
<style lang="scss">
.t-set-terminal-info-box {
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
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
        padding: 6px;
    }
    .con-box-wrapper{
        display: flex;
        flex-flow: wrap;
        .item-0{
            display: flex;
            flex-basis: 50%;
            .ant-form-item-control-wrapper{
                width: 195px;
            }
            .ant-form-item-label{
                width: 120px;
            }
        }
    }
}
</style>