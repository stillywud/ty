<template>
  <a-modal
    :title="title"
    :width="790"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    wrapClassName="plugins-set-event-parameterinfo-modal"
    cancelText="关闭">
        <a-form-model ref="ruleForm" :model="packForm" :rules="packRules" >
            <div class="list-0">
                <a-form-model-item label="设置状态" prop="setState" class="item-0">
                    <a-select 
                        v-model="packForm.setState"
                        @change="setStateCallback"
                        placeholder="请选择设置状态">
                        <a-select-option 
                        v-for="setState in setStates" 
                        :key="setState.key">
                        {{setState.value}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item  class="item-0" label="位置序号"  prop="serialNumber">
                    <a-input
                        @change="serialNumberCallback"
                        placeholder="请输入位置序号"  
                        v-model.trim="packForm.serialNumber"
                        allow-clear/>
                </a-form-model-item>
                <a-form-model-item label="事件种类" prop="eventType"  class="item-0">
                    <a-select 
                        v-model="packForm.eventType"
                        @change="eventTypecallback">
                        <a-select-option 
                        :title="eventType.value"
                        v-for="eventType in eventTypesS"
                        :key="eventType.key">
                        {{eventType.value}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="有无数据ID" prop="isDataId"  class="item-0">
                    <a-select 
                        v-model="packForm.isDataId"
                        @change="isDataIdcallback"
                        placeholder="请选择数据ID">
                        <a-select-option 
                        v-for="isDataId in isDataIds"
                        :key="isDataId.key">
                        {{isDataId.value}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item  class="item-0" label="PGN ID"  prop="pgnId">
                    <a-input 
                    placeholder="请输入PGN ID"  
                    v-model="packForm.pgnId"
                    allow-clear/>
                </a-form-model-item>
                <a-form-model-item label="PGN ID的帧格式" prop="frameFormat"  class="item-0">
                <a-select 
                    v-model="packForm.frameFormat"
                    placeholder="请选择PGN ID的帧格式">
                    <a-select-option 
                    v-for="frameFormat in frameFormats"
                    :key="frameFormat.key">
                    {{frameFormat.value}}
                    </a-select-option>
                </a-select>
                </a-form-model-item>
                <a-form-model-item label="发生条件" prop="happenCondition"  class="item-0">
                    <a-select 
                        dropdownClassName="width290"
                        v-model="packForm.happenCondition"
                        placeholder="请选择发生条件">
                        <a-select-option 
                        :title="happenCondition.value"
                        v-for="happenCondition in happenConditions"
                        :key="happenCondition.key">
                        {{happenCondition.value}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="高字节位置" prop="highByte"  class="item-0">
                    <a-select 
                        v-model="packForm.highByte"
                        placeholder="请选择高字节位置">
                        <a-select-option 
                        v-for="highByte in highBytes"
                        :key="highByte.key">
                        {{highByte.value}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item  class="item-0" label="参数的长度"  prop="paramLength">
                    <a-select 
                        v-model="packForm.paramLength"
                        placeholder="请选择起始位置">
                        <a-select-option 
                        v-for="paramLength in paramLengths"
                        :key="paramLength.key">
                        {{paramLength.value}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item  class="item-0" label="起始位置"  prop="startStation">
                    <a-select 
                        v-model="packForm.startStation"
                        placeholder="请选择起始位置">
                        <a-select-option 
                        v-for="highByte in 8"
                        :key="highByte-1">
                        {{highByte-1}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item  class="item-0" label="参数设定值"  prop="paramValue">
                    <a-input 
                        @change="paramValueCallback"
                        placeholder="请输入参数设定值"  
                        v-model="packForm.paramValue"
                        allow-clear/>
                </a-form-model-item>
                <a-form-model-item  class="item-0" label="开关参数在PGN中所处的字节位置"  prop="paramStation">
                    <a-select 
                        v-model="packForm.paramStation"
                        placeholder="请选择字节位置">
                        <a-select-option 
                        v-for="highByte in 8"
                        :key="highByte-1">
                        {{highByte-1}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="触发值" prop="trigger"  class="item-0">
                    <a-select 
                        v-model="packForm.trigger"
                        placeholder="请选择触发值">
                        <a-select-option 
                        v-for="trigger in triggers" 
                        :key="trigger.key">
                        {{trigger.value}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item  class="item-0" label="事件条件满足后需持续时间"  prop="duration">
                    <a-input
                        @change="durationCallback"
                        placeholder="请输入持续时间"  
                        v-model="packForm.duration"
                        allow-clear>
                    <template #suffix>
                        <span class="suffix-1">(ms)</span>
                    </template>          
                    </a-input>
                </a-form-model-item>
                
                <a-form-model-item label="数据ID长度" prop="dataIdLength"  class="item-0">
                    <a-select 
                        v-model="packForm.dataIdLength"
                        placeholder="请选择数据ID长度">
                        <a-select-option 
                        v-for="dataIdLength in dataIdLengths" 
                        :key="dataIdLength.key">
                        {{dataIdLength.value}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="数据ID起始字节" prop="dataIdBegin"  class="item-0">
                    <a-select 
                        v-model="packForm.dataIdBegin"
                        placeholder="请选择数据ID起始字节">
                        <a-select-option 
                        v-for="dataIdBegin in dataIdBegins"
                        :key="dataIdBegin.key">
                        {{dataIdBegin.value}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item  class="item-0" label="数据ID"  prop="dataId">
                    <a-input 
                        placeholder="请输入数据ID"  
                        v-model="packForm.dataId"
                        allow-clear/>
                </a-form-model-item>
            </div>
        </a-form-model>
    </a-modal>
</template>
<script>


let packFormCopy = {
    serialNumber:2,
    setState:1,
    eventType:0,

    frameFormat:1,
    isDataId:0,
    pgnId:0,
    paramLength:0,
    highByte:0,
    happenCondition:0,
    paramStation:0,
    startStation:0,
    trigger:"0",
    paramValue:100,
    duration:10,
    dataIdLength:0,
    dataIdBegin:0,
    dataId:''
}

import {frameFormats,highBytes,setStates, isDataIds, paramLengths, eventTypesS,  dataIdLengths, dataIdBegins, triggers} from '@/utils/constant'
export default {
    name:"moSetEventparameterS",
    data(){
        return {
            title:"操作",
            visible: false,
            setStates,
            eventTypesS,
            isDataIds,
            dataIdBegins,
            paramLengths,
            dataIdLengths,
            happenConditions:[
                {key:0,value:"当参数大于“参数设定”时事件发生条件满足"},
                {key:1,value:"当参数小于“参数设置”时事件发生条件满足"},
            ],
            frameFormats,
            highBytes,
            triggers,
            packForm:{
            },
            packRules:{
                serialNumber:[{
                    required: true,
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        let val = Number(value);
                        if (val === 0) {
                            callback(new Error('该值不允许为空,范围是：[1-100]'))
                        }else{
                            callback()
                        }
                    }
                }],
                frameFormat:[{required: true,trigger: "change",message:"请选择PGN ID的帧格式"}],
                isDataId:[{required: true,trigger: "change",message:"请选择PGN ID的帧格式"}],
                pgnId:[{required: true,trigger: "blur",message:"请输入PGN ID"}],
                highByte:[{required: false,trigger: "change",message:"请选择高字节位置"}],
                happenCondition:[{required: false,trigger: "change",message:"请选择发生条件"}],
                eventType:[{required: false,trigger: "change",message:"请选择事件种类"}],
                startStation:[{required: false,trigger: "change",message:"请选择起始位置"}],
                trigger:[{required: false,trigger: "change",message:"请选择触发值"}],
                paramValue:[{required: false,trigger: "blur",message:"请输入参数设定值"}],
                paramStation:[{required: false,trigger: "change",message:"请选择触发值"}],
                duration:[{required: true,trigger: "blur",message:"请输入持续时间"}],
                dataIdLength:[{required: false,trigger: "change",message:"请选择数据ID长度"}],
                dataIdBegin:[{required: false,trigger: "change",message:"请选择数据ID起始字节"}],
                dataId:[{required: false,trigger: "blur",message:"请输入数据ID"}],
            },
        }
    },
    methods:{
        durationCallback(e){
            let val = e.target.value;
            val = val.replace(/[^\d]/g,"");
            if(val !== ""){val = Number(val);}
            this.packForm.duration= val; 
        },
        paramValueCallback(e){
            let val = e.target.value;
            val = val.replace(/[^\d]/g,"");
            if(val !== ""){val = Number(val);}
            this.packForm.paramValue= val; 
        },
        serialNumberCallback(e){
            let val = e.target.value;
            val = val.replace(/[^\d]/g,"");
            if(val !== ""){val = Number(val);}
            if(val > 100){val = 100}
            this.packForm.serialNumber= val; 
        },
        eventTypecallback(){
            // 选择事件种类
            try{
            let eventType = this.packForm.eventType;
            this.packRules.paramValue[0].required = eventType ===0 ?true : false;
            this.packRules.startStation[0].required = eventType ===0 ?true : false;
            this.packRules.highByte[0].required = eventType ===0 ?true : false;
            this.packRules.paramStation[0].required = eventType ===1 ?true : false;
            this.packRules.happenCondition[0].required = eventType ===0 ? true : false;
            this.packRules.trigger[0].required = eventType ===1 ? true : false;
            }catch(e){console.log(e)}

        },
        isDataIdcallback(){
            // 有无数据ID
            try{
            let isDataId = this.packForm.isDataId;
            this.packRules.dataIdLength[0].required =isDataId === 1 ?  true : false;
            this.packRules.dataIdBegin[0].required = isDataId === 1 ?  true : false;
            this.packRules.dataId[0].required = isDataId === 1 ?  true : false;
            }catch(e){console.log(e)}

        },
        add () {
            this.edit({...packFormCopy});
        },
        edit (record) {
            this.visible = true;
            this.$nextTick(()=>{
                this.$refs.ruleForm.resetFields();
                this.packForm = Object.assign({}, record);
                this.eventTypecallback();
                this.isDataIdcallback();
                this.setStateCallback();
            })
        },
        close () {
            this.$refs.ruleForm.resetFields();
            this.visible = false;
        },
        setStateCallback(){
            let val = this.packForm.setState;
            this.packRules.eventType[0].required = val === 1 ? true :false;
        },
        filterParams(arr){
            let obj = {};
            arr.forEach((item) => {
            obj[item] = this.packForm[item]
            })
            return obj;
        },
        eachObjParams(arr,obj){
            let newObj = {}
            arr.forEach((item)=>{
                newObj[item] = obj[item]
            })
            return newObj;
        },
        eachArrParams(arr, type){
            let text = '';
            arr.forEach((item)=>{
                if(item.key === type){
                    text = item.value;
                }
            })
            return text;
        },
        handleCancel () {
            this.close()
        },
        handleOk () {
            // 触发表单验证
            this.$refs.ruleForm.validate((valid, err) => {
                if (valid){
                    try{
                        let arrParams = ["setState","serialNumber","eventType",
                        "frameFormat","isDataId","pgnId","paramLength","highByte","trigger","paramStation",
                        "happenCondition","startStation","paramValue",
                        "duration","dataIdLength","dataIdBegin","dataId"];
                        let arrParamsCopy = [];
                        let type = '';
                        let typeParamsCopy = {};
                        let typeParams = this.filterParams(arrParams);
                        let pgnThreshold = ["frameFormat","isDataId","pgnId","paramLength",
                        "highByte","happenCondition","startStation","paramValue","duration","dataIdLength","dataIdBegin","dataId"]
                        typeParams["pgnThreshold"] = this.eachObjParams(pgnThreshold, typeParams);
                        let pgnSwitch = ["frameFormat","isDataId","pgnId","trigger",
                        "paramStation","duration","dataIdLength","dataIdBegin","dataId"]
                        typeParams["pgnSwitch"] = this.eachObjParams(pgnSwitch, typeParams);
                        if(this.packForm.eventType === 0){
                            type="pgnThreshold"
                        }else if(this.packForm.eventType === 1){
                            type="pgnSwitch"
                        }
                        let setStatesText = this.eachArrParams(this.setStates,this.packForm.setState);
                        let isDataIdsText = this.eachArrParams(this.isDataIds,this.packForm.isDataId);
                        let eventTypesText = this.eachArrParams(this.eventTypesS,this.packForm.eventType);
                        let highBytesText = this.eachArrParams(this.highBytes,this.packForm.highByte);
                        let happenConditionsText = this.eachArrParams(this.happenConditions,this.packForm.happenCondition);
                        let frameFormatsText = this.eachArrParams(this.frameFormats,this.packForm.frameFormat);
                        let triggersText = this.eachArrParams(this.triggers,this.packForm.trigger);
                        typeParams.type = type;
                        typeParams.text = {setStatesText,isDataIdsText,eventTypesText,highBytesText,frameFormatsText,triggersText,happenConditionsText};
                        if(this.packForm.key){
                            typeParams.key = this.packForm.key;
                        }
                        this.$emit("ontypeParams", typeParams );
                        this.close()
                    }catch(e){console.log(e)}
                }
            })
        },
    }
}
</script>
<style lang="scss">
.plugins-set-event-parameterinfo-modal{
    .list-0{
        display:flex;
        flex-wrap: wrap;
        .item-0{
            display: flex;
            //   flex-basis: 50%;
            &:nth-child(2n+1){
                .ant-form-item-label{
                    width: 100px;
                }
            }
            &:nth-child(2n+2){
                margin-left: 10px;
                .ant-form-item-label{
                    width: 240px;
                }
                .ant-form-item-control-wrapper{
                    // width: 220px;
                }
            } 
            .ant-form-item-control-wrapper{
                width: 195px;
            }
        }
        .item-8{
            .ant-form-item-label{
                display: flex;
                align-items: baseline;
            }
            .ant-form-item-label{
                padding-right: 8px;
                label{
                    white-space: break-spaces;
                    line-height: 1;
                    display: inline-block;
                    padding-top: 8px;
                    &::after{
                        margin: 0 0 0 2px;
                    }
                }
            }
        }
    }
}
</style>