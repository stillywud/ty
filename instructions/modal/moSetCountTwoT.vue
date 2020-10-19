<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    wrapClassName="plugins-set-counttwo-modal"
    
    cancelText="关闭">
    
        <a-form-model ref="ruleForm" :model="form" :rules="rules" >
            <div class="list-1">
                <a-form-model-item label="PGN ID的帧格式" prop="frameFormat" class="item-0" 
                    >
                    <a-select v-model="form.frameFormat" placeholder="请选择格式">
                        <a-select-option v-for="i in frameFormats" :key="i.key">
                            {{ i.value }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="PGN ID" prop="pgnId" class="item-0" 
                    >
                    <a-select v-model="form.pgnId" placeholder="请选择PGN ID">
                        <a-select-option v-for="i in pgnIds" :key="i.key">
                            {{ i.value }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="参数的长度" prop="paramLength" class="item-0" 
                    >
                    <a-select v-model="form.paramLength" placeholder="请选择参数的长度">
                        <a-select-option v-for="i in paramLengths" :key="i.key">
                            {{ i.value }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="参数起始位置" prop="startStation" class="item-0" 
                    >
                    <a-select v-model="form.startStation" placeholder="请选择参数起始位置">
                        <a-select-option v-for="i in startStations" :key="i.key">
                            {{ i.value }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="高字节位置" prop="highByte" class="item-0" 
                    >
                    <a-select v-model="form.highByte" placeholder="请选择高字节位置">
                        <a-select-option v-for="i in highBytes" :key="i.key">
                            {{ i.value }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                
                <a-form-model-item label="开始计算条件" prop="beginCount" class="item-0" 
                    >
                    <a-select v-model="form.beginCount" placeholder="请选择开始计算条件">
                        <a-select-option v-for="i in beginCounts" :key="i.key">
                            {{ i.value }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="计算时间段" prop="scope" class="item-0" 
                   >
                    <a-select v-model="form.scope" placeholder="请选择计算时间段">
                        <a-select-option v-for="i in scopes" :key="i.key">
                            {{ i.value }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="发生条件" prop="happenCondition" class="item-0" 
                    v-if="np === 1">
                    <a-select v-model="form.happenCondition" placeholder="请选择取发生条件" dropdownClassName="width265">
                        <a-select-option v-for="i in happenConditionZs" :key="i.key">
                            {{ i.value }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="参数设定值" prop="paramValue" class="item-0" 
                    v-if="np === 1">
                    <a-input v-model="form.paramValue" placeholder="参数设定值" />
                </a-form-model-item>
                <a-form-model-item label="分布点数" prop="distribute" class="item-0" 
                    v-if="np === 2">
                    <a-select v-model="form.distribute" placeholder="请选择分布点数">
                        <a-select-option v-for="i in 10" :key="i">
                            {{ i }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="分布各点的设定数值" prop="distributeValue" class="item-0" 
                    v-if="np === 2">
                    <a-input v-model="form.distributeValue" placeholder="多值用逗号分隔,如:1,2,3" />
                </a-form-model-item>
                
                <a-form-model-item label="有无数据ID" prop="isDataId" class="item-0" 
                    v-if="np === 1">
                    <a-select v-model="form.isDataId" placeholder="请选择有无数据ID" @change="isDataIdCallback">
                        <a-select-option v-for="i in isDataIds" :key="i.key">
                            {{ i.value }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="数据ID长度" prop="dataIdLength" class="item-0" 
                    v-if="np === 1">
                    <a-select v-model="form.dataIdLength" placeholder="请选择数据ID长度">
                        <a-select-option v-for="i in dataIdLengths" :key="i.key">
                            {{ i.value }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="数据ID起始字节" prop="dataIdBegin" class="item-0" 
                    v-if="np === 1">
                    <a-select v-model="form.dataIdBegin" placeholder="请选择数据ID起始字节">
                        <a-select-option v-for="i in dataIdBegins" :key="i.key">
                            {{ i.value }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="数据ID" prop="dataId" class="item-0" 
                    v-if="np === 1">
                    <a-input v-model="form.dataId" placeholder="请输入数据ID" />
                </a-form-model-item>
            </div>
        </a-form-model>
  </a-modal>
</template>

<script>
let packFormCopy = {
    type:"",

    frameFormat:1,
    isDataId:0,
    dataIdLength:1,
    dataIdBegin:0,
    dataId:'',
    pgnId:"18FF254A",
    startStation:0,
    paramLength:1,
    paramValue:'',
    happenCondition:0,
    highByte:0,
    beginCount:0,
    scope:0,
}
let packFormCopy1 = {
    type:"",

    frameFormat:1,
    isDataId:0,
    pgnId:"18FF254A",
    startStation:0,
    paramLength:1,
    highByte:0,
    beginCount:0,
    scope:0,
    distribute:3,
    distributeValue:''
}
import {setStates, eventTypesC, frameFormats, isDataIds,dataIdLengths,dataIdBegins, pgnIds,
paramLengths,startStations,highBytes,beginCounts,scopes,values,happenConditionZs} from '@/utils/constant';
export default {
    name: "countDemotModal",
    data () {
      return {
            title:"操作",
            setStates,
            eventTypesC,
            frameFormats,
            isDataIds,
            dataIdLengths,
            dataIdBegins,
            pgnIds,
            startStations,
            paramLengths,
            highBytes,
            beginCounts,
            scopes,
            values,
            happenConditionZs,

            np:0,
            visible: false,
            paramConditionList:[],
            tablepackDataDis:[],
            columnsCon:[
                {title:"序号",customRender:(text, record, index)=>{return `${index+1}`},key:1,width:60,align:"center"},
                {title:"PGN ID的帧格式",dataIndex:"frameFormat",key:2,width:140,align:"center",customRender:(text, record, index)=>{return record.text.frameFormatsText}},
                {title:"有无数据ID",dataIndex:"isDataId",key:3,width:100,align:"center",customRender:(text, record, index)=>{return record.text.isDataIdsText}},
                {title:"PGN ID",dataIndex:"pgnId",key:4,width:100,align:"center",customRender:(text, record, index)=>{return record.text.pgnIdsText} },
                {title:"高字节位置",dataIndex:"highByte",key:5,width:140,align:"center",customRender:(text, record, index)=>{return record.text.highBytesText} },
                {title:"发生条件",dataIndex:"happenCondition",key:6,width:300,align:"center",customRender:(text, record, index)=>{return record.text.happenConditionZsText} },
                {title:"参数的长度",dataIndex:"paramLength",key:7,width:100,align:"center"},
                {title:"参数起始位置",dataIndex:"startStation",key:8,width:100,align:"center"},
                {title:"开始计算条件",dataIndex:"beginCount",key:9,width:140,align:"center",customRender:(text, record, index)=>{return record.text.beginCountsText} },
                {title:"计算时间段",dataIndex:"scope",key:10,width:150,align:"center",customRender:(text, record, index)=>{return record.text.scopesText} },
                {title:"参数设定值",dataIndex:"paramValue",key:11,width:100,align:"center"},
                {title:"数据ID长度",dataIndex:"dataIdLength",key:12,width:100,align:"center"},
                {title:"数据ID起始字节",dataIndex:"dataIdBegin",key:13,width:140,align:"center"},
                {title:"数据ID",dataIndex:"dataId",key:14,width:60,align:"center"},
                {title:"操作",key:99,scopedSlots: { customRender: 'action'},width:120,align:"center",fixed:"right"},  
            ],
            columnsDis:[
                {title:"序号",customRender:(text, record, index)=>{return `${index+1}`},key:1,width:60,align:"center"},
                {title:"PGN ID的帧格式",dataIndex:"frameFormat",key:2,width:140,align:"center",customRender:(text, record, index)=>{return record.text.frameFormatsText}},
                {title:"有无数据ID",dataIndex:"isDataId",key:3,width:100,align:"center",customRender:(text, record, index)=>{return record.text.isDataIdsText}},
                {title:"PGN ID",dataIndex:"pgnId",key:4,width:100,align:"center",customRender:(text, record, index)=>{return record.text.pgnIdsText} },
                {title:"高字节位置",dataIndex:"highByte",key:5,width:140,align:"center",customRender:(text, record, index)=>{return record.text.highBytesText} },
                {title:"参数的长度",dataIndex:"paramLength",key:7,width:100,align:"center"},
                {title:"参数起始位置",dataIndex:"startStation",key:8,width:100,align:"center"},
                {title:"开始计算条件",dataIndex:"beginCount",key:9,width:140,align:"center",customRender:(text, record, index)=>{return record.text.beginCountsText} },
                {title:"计算时间段",dataIndex:"scope",key:10,width:150,align:"center",customRender:(text, record, index)=>{return record.text.scopesText} },
                {title:"分布点数",dataIndex:"distribute",key:11,width:70,align:"center"},
                {title:"分布各点的设定数值",dataIndex:"distributeValue",key:12,width:140,align:"center"},
                {title:"操作",key:99,scopedSlots: { customRender: 'action'},width:120,align:"center",fixed:"right"},  
            ],

            form:{},
            rules:{

                frameFormat:[{required:true,message:"请选择PGN ID的帧格式",trigger:"change"}],
                isDataId:[{required:true,message:"请选择有无数据ID",trigger:"change"}],
                pgnId:[{required:true,message:"请选择PGN ID",trigger:"change"}],
                startStation:[{required:true,message:"请选择参数起始位置",trigger:"change"}],
                paramLength:[{required:true,message:"请选择参数的长度",trigger:"change"}],
                highByte:[{required:true,message:"请选择高字节位置",trigger:"change"}],
                beginCount:[{required:true,message:"请选择开始计算条件",trigger:"change"}],
                happenCondition:[{required:false,message:"请选择发生条件",trigger:"change"}],
                scope:[{required:true,message:"请选择计算时间段",trigger:"change"}],
                distribute:[{required:false,message:"请选择分布点数",trigger:"change"}],
                distributeValue:[{required:false,validator:this.distributeValueValidator,trigger:"blur"}],
                paramValue:[{required:false,message:"参数设定值",trigger:"blur"}],
                dataIdLength:[{required:false,message:"请选择数据ID长度",trigger:"change"}],
                dataIdBegin:[{required:false,message:"请选择数据ID起始字节",trigger:"change"}],
                dataId:[{required:false,message:"请输入数据ID",validator:this.dataIdValidator,trigger:"blur"}],
                paramDistributeNum:[{required:false,message:"请选择PGN参数分布个数",trigger:"change"}],
            }
        }
    },
    created () {
    },
    mounted(){

    },
    methods: {
        serialNumberValidator(rule, value, callback){
            try{
                if(value === ""){
                    callback(new Error('位置序号不能为空'))
                }else if(value.indexOf(".") !==-1){
                    console.log(typeof value, value)
                    callback(new Error('位置序号不能为小数'))
                }else{
                    value = Number(value);
                    if(value >= 0 && value <=50){
                        callback()
                    }else{
                        callback(new Error('范围[0-50]的整数'))
                    }
                }
            }catch(e){console.log(e)}
            
        },
        dataIdValidator(rule, value, callback){
            try{
                if(value === ""){
                    callback(new Error('数据ID不能为空'))
                }else if(value.indexOf(".") !==-1){
                    callback(new Error('数据ID不能为小数'))
                }else{
                    value = Number(value);
                    if(value >= 0){
                        callback()
                    }else{
                        callback(new Error('数据ID不能是负数'))
                    }
                }
            }catch(e){console.log(e)}            
        },
        distributeValueValidator(rule, value, callback){
            try{
                if(value === ""){
                    callback(new Error('数值不能为空'))
                }else if(value.indexOf(".") !==-1){
                    callback(new Error('数值不能为小数'))
                }else if(value.indexOf("-") !==-1){
                    callback(new Error('数值必须是整数'))
                }else{
                    let valArr = value.split(',');
                    let valLen = valArr.length;
                    if(valArr.includes("")){
                        callback(new Error('设置数不能为空'))
                    }else if(valLen !== this.form.distribute){
                        callback(new Error('设置个数要与布点数一致'))
                    }else{
                        callback();
                    }
                }
            }catch(e){console.log(e)}   
        },
        eventTypeCallback(n){
            this.rules.distribute[0].required = n===2 ? true : false;
            this.rules.distributeValue[0].required = n===2 ? true : false;
            this.rules.happenCondition[0].required =n===1 ? true : false;
            this.rules.paramValue[0].required = n===1 ? true : false;
            this.rules.paramDistributeNum[0].required = n===2 ? true : false;
        },
        isDataIdCallback(){
            // 有无数据
            let isDataId = this.form.isDataId;
            this.rules.dataIdLength[0].required = isDataId === 1 ? true : false;
            this.rules.dataIdBegin[0].required = isDataId === 1 ? true : false;
            this.rules.dataId[0].required = isDataId === 1 ? true : false;
            this.rules.dataId[0].validator = isDataId === 1 ? this.dataIdValidator : null;

        },
        add (n) {
            this.np = n;
            if(n === 1){
                this.edit({...packFormCopy},n);
            }else if(n === 2){
                this.edit({...packFormCopy1},n);
            }
            
        },
        edit (record,n) {
            this.visible = true;
            this.$nextTick(()=>{
                this.$refs.ruleForm.resetFields();
                this.form = Object.assign({}, record);
                this.eventTypeCallback(n);
                this.isDataIdCallback();
            })
        },
        close () {
            try{
                this.$refs.ruleForm.resetFields();
                this.visible = false;
            }catch(e){console.log(e)}
            
        },
        handleCancel () {
            this.close()
        },
        handleOk(){
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    try{
                        let np = this.np;
                        let newObj = {};
                        if(np === 1){
                            newObj = {
                                // type:"multiplePgnCumulativeTime",
                                frameFormat:this.form.frameFormat,
                                isDataId:this.form.isDataId,
                                dataIdLength:this.form.dataIdLength,
                                dataIdBegin:this.form.dataIdBegin,
                                dataId:this.form.dataId,
                                pgnId:this.form.pgnId,
                                startStation:this.form.startStation,
                                paramLength:this.form.paramLength,
                                paramValue:this.form.paramValue,
                                happenCondition:this.form.happenCondition,
                                highByte:this.form.highByte,
                                beginCount:this.form.beginCount,
                                scope:this.form.scope,
                            }
                        }else if(np === 2){
                            let paramDistributeListcopy = {
                                frameFormat1:this.form.frameFormat,
                                isDataId1:this.form.isDataId,
                                pgnId1:this.form.pgnId,
                                highByte:this.form.highByte,
                                paramLength:this.form.paramLength,
                                startStation:this.form.startStation,
                                beginCount:this.form.beginCount,
                                scope:this.form.scope,
                                distribute:this.form.distribute,
                                distributeValue:this.form.distributeValue,
                            }
                            newObj = {
                                // type:"multiplePgnDistribute",
                                frameFormat:this.form.frameFormat,
                                isDataId:this.form.isDataId,
                                pgnId:this.form.pgnId,
                                highByte:this.form.highByte,
                                paramLength:this.form.paramLength,
                                startStation:this.form.startStation,
                                beginCount:this.form.beginCount,
                                scope:this.form.scope,
                                distribute:this.form.distribute,
                                distributeValue:this.form.distributeValue,
                                paramDistributeList:paramDistributeListcopy
                            }
                            
                        }
                            console.log(newObj,'newObjnewObj-newObj')
                        if(this.form.key){
                            newObj.key = this.form.key;
                        }
                        newObj.text = this.textFilter(newObj);
                        this.$emit("ontypeParamsTwo", newObj ,np);
                        this.close()
                    }catch(e){console.log(e)}
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        filterParams(arr){
            let obj = {};
            arr.forEach((item) => {
                obj[item] = this.packForm[item] === undefined || this.packForm[item] === '' ? 0 : this.packForm[item]
            })
            return obj;
        },
        eachArrParams(arr, type){
            if(typeof type === "undefined"){
                return '';
            }
            let text = '';
            arr.forEach((item)=>{
                if(item.key === type){
                    text = item.value;
                }
            })
            return text;
        },
        textFilter(obj){
            try{
            let setStatesText = this.eachArrParams(this.setStates,obj.setState);
            let eventTypesText = this.eachArrParams(this.eventTypesC,obj.eventType);
            let frameFormatsText = this.eachArrParams(this.frameFormats,obj.frameFormat);
            let frameFormat2sText = this.eachArrParams(this.frameFormats,obj.frameFormat2);
            let isDataIdsText = this.eachArrParams(this.isDataIds,obj.isDataId);
            let isDataId2sText = this.eachArrParams(this.isDataIds,obj.isDataId2);
            let pgnIdsText = this.eachArrParams(this.pgnIds,obj.pgnId);
            let pgnId2sText = this.eachArrParams(this.pgnIds,obj.pgnId2);
            let valuesText = this.eachArrParams(this.values,obj.value);
            let beginCountsText = this.eachArrParams(this.beginCounts,obj.beginCount);
            let beginCount2sText = this.eachArrParams(this.beginCounts,obj.beginCount2);
            let scopesText = this.eachArrParams(this.scopes,obj.scope);
            let scope2sText = this.eachArrParams(this.scopes,obj.scope2);
            let highBytesText = this.eachArrParams(this.highBytes,obj.highByte)
            let highByte2sText = this.eachArrParams(this.highBytes,obj.highByte2)
            let happenConditionZsText = this.eachArrParams(this.happenConditionZs,obj.happenCondition)


            return {
                setStatesText,
                eventTypesText,
                frameFormatsText,frameFormat2sText,isDataIdsText,isDataId2sText,pgnIdsText,pgnId2sText ,valuesText,
                beginCountsText,
                beginCount2sText,
                scopesText,scope2sText,highBytesText,happenConditionZsText,highByte2sText
                
                }
            }catch(e){console.log(e)}
       },

    }
}
</script>

<style lang="scss">
.width345{
    width: 345px!important;
}
.width295{
    width: 300px!important;
}
.width265{
    width: 265px!important;
}
.plugins-set-counttwo-modal{
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
        padding: 6px;
    }
    .list-1{
        display: flex;
        flex-wrap: wrap;
        .item-0{
            flex-basis: 50%;
            display: flex;
            .ant-form-item-label{
                width: 155px;
            }
            .ant-form-item-control-wrapper{
                width: 190px;
            }
        }
    }
    .checktable-1{
        width: 100%;
    }
}
</style>