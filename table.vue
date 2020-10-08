<template>
    <div>
        <a-modal
            width="800px"
            title="Title"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            >
              <a-form-model
                    ref="ruleForm"
                    :model="form"
                    :rules="rules"
                >

                    <div class="list-1">
                        <a-form-model-item label="设置状态" prop="setState" class="item-0">
                            <a-select v-model="form.setState" placeholder="请选择设置状态" @change="setStateCallback">
                                <a-select-option v-for="i in setStates" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="位置序号" prop="serialNumber" class="item-0">
                            <a-input v-model="form.serialNumber" placeholder="取值范围[0-50]" />
                        </a-form-model-item>
                        <a-form-model-item label="设置种类" prop="eventType" class="item-0">
                            <a-select v-model="form.eventType" placeholder="请选择设设置种类" @change="eventTypeCallback" dropdownClassName="width295">
                                <a-select-option v-for="i in eventTypes" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>

                        <a-form-model-item label="PGN ID的帧格式" prop="frameFormat" class="item-0" 
                            v-if="form.eventType === 1 || form.eventType === 2|| form.eventType === 3|| form.eventType === 4">
                            <a-select v-model="form.frameFormat" placeholder="请选择格式">
                                <a-select-option v-for="i in frameFormats" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="PGN ID" prop="pgnId" class="item-0" 
                            v-if="form.eventType === 1 || form.eventType === 2|| form.eventType === 3|| form.eventType === 4">
                            <a-select v-model="form.pgnId" placeholder="请选择PGN ID">
                                <a-select-option v-for="i in pgnIds" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="参数的长度" prop="paramLength" class="item-0" 
                            v-if="form.eventType === 1 || form.eventType === 2|| form.eventType === 3|| form.eventType === 4">
                            <a-select v-model="form.paramLength" placeholder="请选择参数的长度">
                                <a-select-option v-for="i in paramLengths" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="参数起始位置" prop="startStation" class="item-0" 
                            v-if="form.eventType === 1 || form.eventType === 2|| form.eventType === 3|| form.eventType === 4">
                            <a-select v-model="form.startStation" placeholder="请选择参数起始位置">
                                <a-select-option v-for="i in startStations" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="高字节位置" prop="highByte" class="item-0" 
                            v-if="form.eventType === 1 || form.eventType === 2|| form.eventType === 3|| form.eventType === 4">
                            <a-select v-model="form.highByte" placeholder="请选择高字节位置">
                                <a-select-option v-for="i in highBytes" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="开始计算条件" prop="beginCount" class="item-0" 
                            v-if="form.eventType === 1 || form.eventType === 2|| form.eventType === 3|| form.eventType === 4">
                            <a-select v-model="form.beginCount" placeholder="请选择开始计算条件">
                                <a-select-option v-for="i in beginCounts" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="计算时间段" prop="scope" class="item-0" 
                            v-if="form.eventType === 1 || form.eventType === 2|| form.eventType === 3|| form.eventType === 4">
                            <a-select v-model="form.scope" placeholder="请选择计算时间段">
                                <a-select-option v-for="i in scopes" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="取最大最小值" prop="value" class="item-0" 
                            v-if="form.eventType === 1">
                            <a-select v-model="form.value" placeholder="请选择取最大最小值">
                                <a-select-option v-for="i in values" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="分布点数" prop="distribute" class="item-0" 
                            v-if="form.eventType === 3|| form.eventType === 4">
                            <a-select v-model="form.distribute" placeholder="请选择分布点数">
                                <a-select-option v-for="i in distributes" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="分布各点的设定数值" prop="distributeValue" class="item-0" 
                            v-if="form.eventType === 3|| form.eventType === 4">
                            <a-input v-model="form.distributeValue" placeholder="多值用逗号分隔,如:1,2,3" />
                        </a-form-model-item>
                        
                        <a-form-model-item label="有无数据ID" prop="isDataId" class="item-0" 
                            v-if="form.eventType === 1 || form.eventType === 2|| form.eventType === 3|| form.eventType === 4">
                            <a-select v-model="form.isDataId" placeholder="请选择有无数据ID" @change="isDataIdCallback">
                                <a-select-option v-for="i in isDataIds" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="数据ID长度" prop="dataIdLength" class="item-0" 
                            v-if="form.eventType === 1 || form.eventType === 2|| form.eventType === 3|| form.eventType === 4">
                            <a-select v-model="form.dataIdLength" placeholder="请选择数据ID长度">
                                <a-select-option v-for="i in dataIdLengths" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="数据ID起始字节" prop="dataIdBegin" class="item-0" 
                            v-if="form.eventType === 1 || form.eventType === 2|| form.eventType === 3|| form.eventType === 4">
                            <a-select v-model="form.dataIdBegin" placeholder="请选择数据ID起始字节">
                                <a-select-option v-for="i in dataIdBegins" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="数据ID" prop="dataId" class="item-0" 
                            v-if="form.eventType === 1 || form.eventType === 2|| form.eventType === 3|| form.eventType === 4">
                            <a-input v-model="form.dataId" placeholder="请输入数据ID" />
                        </a-form-model-item>



                        <a-form-model-item label="PGN ID的帧格式2" prop="frameFormat2" class="item-0" 
                            v-if="form.eventType === 4">
                            <a-select v-model="form.frameFormat2" placeholder="请选择格式">
                                <a-select-option v-for="i in frameFormats" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="PGN ID2" prop="pgnId2" class="item-0" 
                            v-if="form.eventType === 4">
                            <a-select v-model="form.pgnId2" placeholder="请选择PGN ID">
                                <a-select-option v-for="i in pgnIds" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="参数的长度2" prop="paramLength2" class="item-0" 
                            v-if="form.eventType === 4">
                            <a-select v-model="form.paramLength2" placeholder="请选择参数的长度">
                                <a-select-option v-for="i in paramLengths" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="参数起始位置2" prop="startStation2" class="item-0" 
                            v-if="form.eventType === 4">
                            <a-select v-model="form.startStation2" placeholder="请选择参数起始位置">
                                <a-select-option v-for="i in startStations" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="高字节位置2" prop="highByte2" class="item-0" 
                            v-if="form.eventType === 4">
                            <a-select v-model="form.highByte2" placeholder="请选择高字节位置">
                                <a-select-option v-for="i in highBytes" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="开始计算条件2" prop="beginCount2" class="item-0" 
                            v-if="form.eventType === 4">
                            <a-select v-model="form.beginCount2" placeholder="请选择开始计算条件">
                                <a-select-option v-for="i in beginCounts" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="计算时间段2" prop="scope2" class="item-0" 
                            v-if="form.eventType === 4">
                            <a-select v-model="form.scope2" placeholder="请选择计算时间段">
                                <a-select-option v-for="i in scopes" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="分布点数2" prop="distribute2" class="item-0" 
                            v-if="form.eventType === 4">
                            <a-select v-model="form.distribute2" placeholder="请选择分布点数">
                                <a-select-option v-for="i in distributes" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="分布各点的设定数值2" prop="distributeValue2" class="item-0" 
                            v-if="form.eventType === 4">
                            <a-input v-model="form.distributeValue2" placeholder="多值用逗号分隔,如:1,2,3" />
                        </a-form-model-item>

                        <a-form-model-item label="有无数据ID2" prop="isDataId2" class="item-0" 
                            v-if="form.eventType === 4">
                            <a-select v-model="form.isDataId2" placeholder="请选择有无数据ID" @change="isDataId2Callback">
                                <a-select-option v-for="i in isDataIds" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="数据ID长度2" prop="dataIdLength2" class="item-0" 
                            v-if="form.eventType === 4">
                            <a-select v-model="form.dataIdLength2" placeholder="请选择数据ID长度">
                                <a-select-option v-for="i in dataIdLengths" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="数据ID起始字节2" prop="dataIdBegin2" class="item-0" 
                            v-if="form.eventType === 4">
                            <a-select v-model="form.dataIdBegin2" placeholder="请选择数据ID起始字节">
                                <a-select-option v-for="i in dataIdBegins" :key="i.key">
                                    {{ i.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="数据ID2" prop="dataId2" class="item-0" 
                            v-if="form.eventType === 4">
                            <a-input v-model="form.dataId2" placeholder="请输入数据ID" />
                        </a-form-model-item>

                        <!-- <a-button @click="submit">提交</a-button> -->
                    </div>

              </a-form-model>
            <div>
                
            </div>

        </a-modal>
    </div>
</template>
<script>
import {setStates, eventTypes, frameFormats, isDataIds,dataIdLengths,dataIdBegins, pgnIds,
paramLengths,startStations,highBytes,beginCounts,scopes,values,distributes} from '@/constp.js';
export default {
    data(){
        return {
            setStates,
            eventTypes,
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
            distributes,


            visible: true,
            form:{
                setState:1,
                serialNumber:'2',
                eventType:2,

                frameFormat:1,
                frameFormat2:1,

                isDataId:0,
                dataIdLength:1,
                dataIdBegin:0,
                dataId:'',
                isDataId2:0,
                dataIdLength2:1,
                dataIdBegin2:0,
                dataId2:'',

                pgnId:1,
                pgnId2:1,

                startStation:0,
                startStation2:0,
                paramLength:1,
                paramLength2:1,

                value:0,

                highByte:0,
                highByte2:0,
                beginCount:0,
                beginCount2:0,
                scope:0,
                scope2:0,

                distribute:3,
                distribute2:3,
                distributeValue:'',
                distributeValue2:'',






                type:'',
            },
            rules:{
                setState:[{required:true,message:"请选择设置状态",trigger:"change"}],
                eventType:[{required:true,message:"请选择设置状态",trigger:"change"}],
                serialNumber:[{required:true,validator:this.serialNumberValidator,trigger:"blur"}],
                frameFormat:[{required:false,message:"请选择PGN ID的帧格式",trigger:"change"}],
                frameFormat2:[{required:false,message:"请选择PGN ID的帧格式",trigger:"change"}],
                isDataId:[{required:false,message:"请选择有无数据ID",trigger:"change"}],
                isDataId2:[{required:false,message:"请选择有无数据ID",trigger:"change"}],
                pgnId:[{required:false,message:"请选择PGN ID",trigger:"change"}],
                pgnId2:[{required:false,message:"请选择PGN ID",trigger:"change"}],
                startStation:[{required:false,message:"请选择参数起始位置",trigger:"change"}],
                startStation2:[{required:false,message:"请选择参数起始位置",trigger:"change"}],
                paramLength:[{required:false,message:"请选择参数的长度",trigger:"change"}],
                paramLength2:[{required:false,message:"请选择参数的长度",trigger:"change"}],
                highByte:[{required:false,message:"请选择高字节位置",trigger:"change"}],
                highByte2:[{required:false,message:"请选择高字节位置",trigger:"change"}],
                beginCount:[{required:false,message:"请选择开始计算条件",trigger:"change"}],
                beginCount2:[{required:false,message:"请选择开始计算条件",trigger:"change"}],
                scope:[{required:false,message:"请选择计算时间段",trigger:"change"}],
                scope2:[{required:false,message:"请选择计算时间段",trigger:"change"}],
                distribute:[{required:false,message:"请选择分布点数",trigger:"change"}],
                distribute2:[{required:false,message:"请选择分布点数",trigger:"change"}],
                distributeValue:[{required:false,validator:this.distributeValueValidator,trigger:"blur"}],
                distributeValue2:[{required:false,validator:this.distributeValueValidator,trigger:"blur"}],

                value:[{required:false,message:"请选择取最大最小值",trigger:"change"}],

                dataIdLength:[{required:false,message:"请选择数据ID长度",trigger:"change"}],
                dataIdBegin:[{required:false,message:"请选择数据ID起始字节",trigger:"change"}],
                dataId:[{required:false,message:"请输入数据ID",validator:this.dataIdValidator,trigger:"blur"}],

                dataIdLength2:[{required:false,message:"请选择数据ID长度",trigger:"change"}],
                dataIdBegin2:[{required:false,message:"请选择数据ID起始字节",trigger:"change"}],
                dataId2:[{required:false,message:"请输入数据ID",validator:this.dataIdValidator,trigger:"blur"}],


            },
            columns: [{
                prop: "setState",
                label: "事件状态",
                key: 111,
                width: 100
            }, {
                prop: "serialNumber",
                label: "位置序号",
                key: 112
            }, {
                prop: "eventType",
                label: "参数统计设置种类",
                key: 113
            }, {
                label: "PGN ID的帧格式",
                key: 114,
                prop: "frameFormat"
            }, {
                prop: "isDataId",
                label: "有无数据ID",
                key: 115
            }, {
                label: "PGN ID",
                key: 116,
                prop: "pgnId"
            }, {
                label: "参数长度",
                key: 117,
                prop: "paramLength"
            }, {
                label: "起始位置",
                key: 118,
                prop: "startStation"
            }, {
                label: "参数高字节位置",
                key: 119,
                prop: "highByte"
            }, {
                label: "获取值类别",
                key: 120,
                prop: "value"
            }, {
                label: "开始计算条件",
                key: 121,
                prop: "beginCount"
            }, {
                label: "计算时间段",
                key: 122,
                prop: "scope"
            }, {
                label: "分布点数",
                key: 123,
                prop: "distribute"
            }, {
                label: "参数设定",
                key: 124,
                prop: "paramValue"
            }, {
                label: "数据ID长度",
                key: 125,
                prop: "dataIdLength"
            }, {
                label: "数据ID起始字节",
                key: 126,
                prop: "dataIdBegin"
            }, {
                label: "数据ID",
                key: 127,
                prop: "dataId"
            }, {
                label: "PGN ID的帧格式2",
                key: 128,
                prop: "frameFormats2"
            }, {
                label: "PGN 有无数据ID2",
                key: 129,
                prop: "isDataIds2"
            }, {
                label: "PGN ID2",
                key: 130,
                prop: "pgnId2"
            }, {
                label: "参与参数的长度2",
                key: 131,
                prop: "paramLengths2"
            }, {
                label: "起始位置2",
                key: 132,
                prop: "startStation2"
            }, {
                label: "参数高字节位置2",
                key: 133,
                prop: "highByte2"
            }, {
                label: "获取值类别2",
                key: 134,
                prop: "value2"
            }, {
                label: "开始计算条件2",
                key: 135,
                prop: "beginCounts2"
            }, {
                label: "计算时间段2",
                key: 136,
                prop: "scopes2"
            }, {
                label: "分布点数2",
                key: 137,
                prop: "distribute2"
            }, {
                label: "参数设定2",
                key: 138,
                prop: "paramValue2"
            }, {
                label: "数据ID长度2",
                key: 139,
                prop: "dataIdLength2"
            }, {
                label: "数据ID起始字节2",
                key: 140,
                prop: "dataIdBegin2"
            }, {
                label: "数据ID2",
                key: 141,
                prop: "dataId2"
            }]
        }
    },
    mounted(){
        this.eventTypeCallback();
        this.isDataIdCallback();
        this.isDataId2Callback()
    },
    methods:{
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
                    if(valLen !== this.form.distribute){
                        return callback(new Error('设置个数要与布点数一致'))
                    }else{
                        callback();
                    }
                }
            }catch(e){console.log(e)}   
        },
        setStateCallback(){},
        eventTypeCallback(){
            // 更改设置种类
            let eventType = this.form.eventType;
            this.rules.frameFormat[0].required = eventType === 1 || eventType === 2 || eventType === 3 || eventType === 4 ? true : false;
            this.rules.isDataId[0].required = eventType === 1 || eventType === 2 || eventType === 3 || eventType === 4 ? true : false;
            this.rules.pgnId[0].required = eventType === 1 || eventType === 2 || eventType === 3 || eventType === 4 ? true : false;
            this.rules.paramLength[0].required = eventType === 1 || eventType === 2 || eventType === 3 || eventType === 4 ? true : false;
            this.rules.startStation[0].required = eventType === 1 || eventType === 2 || eventType === 3 || eventType === 4 ? true : false;
            this.rules.highByte[0].required = eventType === 1 || eventType === 2 || eventType === 3 || eventType === 4 ? true : false;
            this.rules.beginCount[0].required = eventType === 1 || eventType === 2 || eventType === 3 || eventType === 4 ? true : false;
            this.rules.scope[0].required = eventType === 1 || eventType === 2 || eventType === 3 || eventType === 4 ? true : false;
            this.rules.value[0].required = eventType === 1 ? true : false;
            this.rules.distribute[0].required = eventType === 3 || eventType === 4 ? true : false;
            this.rules.distributeValue[0].required = eventType === 3 || eventType === 4 ? true : false;
            


            this.rules.isDataId2[0].required = eventType === 4 ? true : false;
            this.rules.frameFormat2[0].required = eventType === 4 ? true : false;
            this.rules.pgnId2[0].required = eventType === 4 ? true : false;
            this.rules.paramLength2[0].required = eventType === 4 ? true : false;
            this.rules.startStation2[0].required = eventType === 4 ? true : false;
            this.rules.highByte2[0].required = eventType === 4 ? true : false;
            this.rules.beginCount2[0].required = eventType === 4 ? true : false;
            this.rules.scope2[0].required = eventType === 4 ? true : false;
            this.rules.distribute2[0].required = eventType === 4 ? true : false;
            this.rules.distributeValue2[0].required = eventType === 4 ? true : false;
        },
        isDataIdCallback(){
            // 有无数据
            let isDataId = this.form.isDataId;
            this.rules.dataIdLength[0].required = isDataId === 1 ? true : false;
            this.rules.dataIdBegin[0].required = isDataId === 1 ? true : false;
            this.rules.dataId[0].required = isDataId === 1 ? true : false;
            this.rules.dataId[0].validator = isDataId === 1 ? this.dataIdValidator : null;

        },
        isDataId2Callback(){
            // 有无数据2
            let isDataId = this.form.isDataId2;
            this.rules.dataIdLength2[0].required = isDataId === 1 ? true : false;
            this.rules.dataIdBegin2[0].required = isDataId === 1 ? true : false;
            this.rules.dataId2[0].required = isDataId === 1 ? true : false;
            this.rules.dataId2[0].validator = isDataId === 1 ? this.dataIdValidator : null;


        },

        // handleOk(){},
        handleCancel(){},
        handleOk(){
            console.log(1,this.$refs.ruleForm)
            this.$refs.ruleForm.validate(valid => {
                console.log(valid)
                if (valid) {
                    let eventType = this.form.eventType;
                    let form = this.form;
                    let obj = {
                        setState:form.setState,
                        serialNumber:form.serialNumber,
                        eventType:form.eventType,
                    }
                    if(eventType === 1){
                        let pgnLimitValue = {
                            "frameFormat":form.frameFormat,
                            "isDataId":form.isDataId,
                            "pgnId":form.pgnId,
                            "paramLength":form.paramLength,
                            "startStation":form.startStation,
                            "highByte":form.highByte,
                            "value":form.value,
                            "beginCount":form.beginCount,
                            "scope":form.scope,
                            "dataIdLength":form.dataIdLength,
                            "dataIdBegin":form.dataIdBegin,
                            "dataId":form.dataId
                        }
                        obj.pgnLimitValue = pgnLimitValue;
                    }else if(eventType === 2){
                        let pgnCumulativeTime = {
                            "frameFormat":form.frameFormat,
                            "isDataId":form.isDataId,
                            "pgnId":form.pgnId,
                            "paramLength":form.paramLength,
                            "startStation":form.startStation,
                            "highByte":form.highByte,
                            "beginCount":form.beginCount,
                            "scope":form.scope,
                            "dataIdLength":form.dataIdLength,
                            "dataIdBegin":form.dataIdBegin,
                            "dataId":form.dataId
                        }
                        obj.pgnCumulativeTime = pgnCumulativeTime;
                    }else if(eventType === 3){
                        let singlePgnDistribute = {
                            "frameFormat":form.frameFormat,
                            "isDataId":form.isDataId,
                            "pgnId":form.pgnId,
                            "paramLength":form.paramLength,
                            "startStation":form.startStation,
                            "highByte":form.highByte,
                            "beginCount":form.beginCount,
                            "scope":form.scope,
                            "distribute":form.distribute,
                            "distributeValue":form.distributeValue,
                            "dataIdLength":form.dataIdLength,
                            "dataIdBegin":form.dataIdBegin,
                            "dataId":form.dataId
                        }
                        obj.singlePgnDistribute = singlePgnDistribute;
                    }else if(eventType === 4){
                        let  doublePgnDistribute = {
                            pgnId: form.pgnId,
                            pgnId2: form.pgnId2,
                            frameFormat: form.frameFormat,
                            frameFormat2: form.frameFormat2,
                            isDataId: form.isDataId,
                            isDataId2: form.isDataId2,
                            paramLength: form.paramLength,
                            paramLength2: form.paramLength2,
                            startStation: form.startStation,
                            startStation2: form.startStation2,
                            highByte: form.highByte,
                            highByte2: form.highByte2,
                            beginCount: form.beginCount,
                            beginCount2: form.beginCount2,
                            scope: form.scope,
                            scope2: form.scope2,
                            distribute: form.distribute,
                            distribute2: form.distribute2,
                            distributeValue: form.paramValue,
                            distributeValue2: form.paramValue2,
                            dataIdLength: form.dataIdLength,
                            dataIdLength2: form.dataIdLength2,
                            dataIdBegin: form.dataIdBegin,
                            dataIdBegin2: form.dataIdBegin2,
                            dataId: form.dataId,
                            dataId2: form.dataId2
                        }
                        obj.doublePgnDistribute = doublePgnDistribute;
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="scss">
.width295{
    width: 300px!important;
}
    .list-1{
        display: flex;
        flex-wrap: wrap;
        .item-0{
            flex-basis: 50%;
            display: flex;
            .ant-form-item-control-wrapper{
                width: 190px;
            }
        }
    }
</style>