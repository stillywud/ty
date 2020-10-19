<template><!--/ 事件穿透信息 /-->
<div class="t-set-thing-trans-box">
    <div class="con-box">
        <ty-a-spin v-if="tyspining"/>
        <a-form-model ref="setSubForm" :model="setSubForm" :rules="rules">
            <div class="con-box-wrapper">
                <div class="list-0">
                    <a-form-model-item label="发送中心号" class="item-0" props="sendCenterNo">
                        <a-input
                        :value="tmnlSelected.tmnlSendCenterNo"
                        placeholder="请输入发送中心号"
                        disabled="disabled"/>
                    </a-form-model-item>
                    <a-form-model-item label="超时时长" prop="timeOver"  class="item-0">
                        <a-input
                        @change="timeOverCallback"
                        v-model.trim="setSubForm.timeOver"
                        placeholder="请输入超时时间"
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
                    <a-form-model-item label="重复次数" prop='triedTimes'  class="item-0">
                        <a-input
                        @change="triedTimesCallback"
                        v-model.trim="setSubForm.triedTimes" 
                        placeholder="请输入重复次数"
                        allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="事件设置个数" prop='pgnCount'  class="item-0">
                        <a-input 
                        @change="pgnCountCallback"
                        v-model.trim="setSubForm.pgnCount" 
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
            :scroll="{ x: 1660 }"
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
        <mo-set-trans-t
            ref="modalForm"
            @ontypeParams="ontypeParams"
        />
    </div>
</div>
</template>
<script>
import {sendCommMessage} from '@/api/infodevice'
import {parseTime, kmxCode} from '@/utils/index'
import {getToken, jwtDecodeToken} from '@/utils/auth'
import moSetTransT from '../modal/moSetTransT'
import TyASpin from "@/components/TyASpin"
export default {
    data() {
        return {
            pgnCountRuleBool:true,
            tyspining:false,
            tablepackData:[],
            settmnlData:this.recordData,
            columns:[
                {title:'序号',customRender:(text, record, index)=>{return `${index+1}`},key:1,width:60,align:'center'},
                {title:'PGN ID的帧格式',dataIndex:'frameFormat',key:2,width:140,align:'center',customRender:(text, record, index)=>{return record.text.frameFormatsText}},
                {title:'是否多包',dataIndex:'isPackage',key:3,width:100,align:'center',customRender:(text, record, index)=>{return record.text.isPackagesText}},
                {title:'有无数据ID',dataIndex:'isDataId',key:4,width:100,align:'center',customRender:(text, record, index)=>{return record.text.isDataIdsText}},
                {title:'PGN参数来源',dataIndex:'source',key:5,width:100,align:'center',customRender:(text, record, index)=>{return record.text.sourcesText} },
                {title:'PGN ID',dataIndex:'pgnId',key:6,width:100,align:'center',customRender:(text, record, index)=>{return record.text.pgnIdsText} },
                {title:'采集频率',dataIndex:'frequency',key:7,width:100,align:'center'},
                
                {title:'多包数据ID的帧格式',dataIndex:'multiDataFrameFormat',key:9,width:160,align:'center',customRender:(text, record, index)=>{return record.text.multiDataFrameFormatsText}},
                {title:'多包广播ID的帧格式',dataIndex:'multiRadioFrameFormat',key:10,width:160,align:'center',customRender:(text, record, index)=>{return record.text.multiRadioFrameFormatsText}},
                {title:'多包广播ID',dataIndex:'multiRadioId',key:11,width:120,align:'center'},
                {title:'多包数据ID',dataIndex:'mutiDataId',key:12,width:100,align:'center'},
                
                {title:'数据ID长度',dataIndex:'dataIdLength',key:15,width:100,align:'center'},
                {title:'数据ID起始字节',dataIndex:'dataIdBegin',key:16,width:140,align:'center'},
                {title:'数据ID',dataIndex:'dataId',key:17,width:60,align:'center'},
                {title:'操作',key:18,scopedSlots: { customRender: 'action'},width:120,align:'center',fixed:'right'},            
            ],
            setSubForm: {
                timeOver: '0',
                timingSendTime: "",
                triedTimes: '1',
                pgnCount:'1'
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
                pgnCount: [{
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
        moSetTransT,
        TyASpin
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
        pgnCountCallback(e){
            let val = e.target.value;
            val = val.replace(/[^\d]/g,"");
            if(val !== ""){val = Number(val);}
            if(val > 255){val = 255}
            this.setSubForm.pgnCount= val;   
        },
        addPackage() {
            let pgnCount =  this.setSubForm.pgnCount;
            if(pgnCount !== ''){
                pgnCount = +pgnCount;
                if([0,255].includes(pgnCount)){
                    this.$message.error('值为0，255添加多包无效，请直接提交！')
                }else if(pgnCount >30 && pgnCount !== 255){
                    this.$message.error('取值范围0-30或255的整数')
                }else if (this.tablepackData.length > pgnCount) {
                    this.$message.error('已超出多包限制')
                } else {
                    this.add();
                }
            }else{
                this.$message.error('请输入事件设置个数！')
            }
        },
        sendCommMessage(){
            this.$refs.setSubForm.validate(valid => {
                if(valid){
                    let pgnCount = Number(this.setSubForm.pgnCount)
                    if(![0,255].includes(pgnCount)){
                        if(this.tablepackData.length < pgnCount){
                            return this.$message.error("缺少多包，请添加");
                        }else if(this.tablepackData.length > pgnCount){
                            return this.$message.error("超出多包，请删除");
                        }
                    }
                    this.tyspining = true;
                    return new Promise(() => {
                        
                        let data = {
                            systemCode: kmxCode(this.settmnlData.vcl_dictvb_id),
                            accountName: this.userInfo.realname,
                            accountPwd: '123',
                            jsonVersion: '1.0',
                            infoid: 'D9',
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
                                    infoId: 'D9',
                                    seqNo: '000000',
                                    pgnCount:this.setSubForm.pgnCount,
                                    pgnPackage:this.filterTableArr()
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
                            this.$message.error('提交失败',error)
                        })
                    })
                }
            })
        },
        filterTableArr(){
            let arr = [];
            this.tablepackData.forEach((item)=>{
                delete item.text;
                delete item.key;
                arr.push(item)
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
            this.$refs.modalForm.title = '编辑';
            this.$refs.modalForm.disableSubmit = false;
        },
        add(){
            this.$refs.modalForm.add();
            this.$refs.modalForm.title = '新增';
            this.$refs.modalForm.disableSubmit = false;
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
                    this.tablepackData.push(obj)
                }
            }catch(e){console.log(e)}
        }
    },
};
</script>
<style lang="scss">
    .t-set-thing-trans-box{
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
                width: 195px;
            }
            }
        }
    }
</style>