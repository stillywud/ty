<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    wrapClassName="plugins-set-count-modal"
    
    cancelText="关闭">
    
        <a-form-model ref="ruleForm" :model="form" :rules="rules" >
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
                        <a-select-option v-for="i in eventTypesC" :key="i.key">
                            {{ i.value }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="PGN参数条件个数" prop="paramConditionNum" class="item-0" 
                    v-if="form.eventType === 5 || form.eventType === 6">
                    <a-select v-model="form.paramConditionNum" placeholder="请选择PGN参数条件个数">
                        <a-select-option v-for="i in 15" :key="i">
                            {{ i }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="PGN参数分布个数" prop="paramDistributeNum" class="item-0" 
                    v-if="form.eventType === 6">
                    <a-select v-model="form.paramDistributeNum" placeholder="请选择PGN参数分布个数">
                        <a-select-option v-for="i in 15" :key="i">
                            {{ i }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="" prop="" class="item-0 iten-btn" 
                    v-if="form.eventType === 6 || form.eventType === 5">
                    <a-button v-if="form.eventType === 6 || form.eventType === 5" @click="addCon">添加PGN参数条件</a-button>
                    <a-button v-if="form.eventType === 6"  @click="addDis">添加PGN参数分布</a-button>
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
                <a-form-model-item label="发生条件" prop="happenCondition" class="item-0" 
                    v-if="form.eventType === 2">
                    <a-select v-model="form.happenCondition" placeholder="请选择取发生条件" dropdownClassName="width265">
                        <a-select-option v-for="i in happenConditionZs" :key="i.key">
                            {{ i.value }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="参数设定值" prop="paramValue" class="item-0" 
                    v-if="form.eventType === 2">
                    <a-input v-model="form.paramValue" placeholder="参数设定值" />
                </a-form-model-item>
                <a-form-model-item label="分布点数" prop="distribute" class="item-0" 
                    v-if="form.eventType === 3|| form.eventType === 4">
                    <a-select v-model="form.distribute" placeholder="请选择分布点数">
                        <a-select-option v-for="i in 10" :key="i">
                            {{ i }}
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
            </div>
            <div class="checktable-1" v-if="form.eventType === 5 || form.eventType === 6">
                <a-table
                :data-source="tablepackDataCon"
                bordered
                stripe
                height="200px"
                :columns="columnsCon"
                :scroll="{ x: 1920 }"
                >
                <template v-slot:action="text, column">
                    <a @click="editCon(column)">编辑 </a>
                    <a-divider type="vertical" />
                    <a @click="deleCon(column.key)">删除</a>
                </template>
                </a-table>
            </div>
            <div class="checktable-1" v-if="form.eventType === 6" style="margin-top:20px">
                <a-table
                :data-source="tablepackDataDis"
                bordered
                stripe
                height="200px"
                :columns="columnsDis"
                :scroll="{ x: 1310 }"
                >
                <template v-slot:action="text, column">
                    <a @click="editDis(column)">编辑 </a>
                    <a-divider type="vertical" />
                    <a @click="deleDis(column.key)">删除</a>
                </template>
                </a-table>
            </div>
        </a-form-model>
        <!-- 弹窗 区域-->
        <mo-set-count-two-t
            ref="modalForm"
            @ontypeParamsTwo="ontypeParamsTwo"
        />
  </a-modal>
</template>

<script>
let packFormCopy = {
    type:"",
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

    pgnId:"18FF254A",
    pgnId2:"18FF254A",

    startStation:0,
    startStation2:0,
    paramLength:1,
    paramLength2:1,
    paramValue:'100',
    value:0,
    happenCondition:0,
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

    paramConditionNum:undefined,
    paramDistributeNum:undefined
}
import moSetCountTwoT from './moSetCountTwoT'
import {setStates, eventTypesC, frameFormats, isDataIds,dataIdLengths,dataIdBegins, pgnIds,
paramLengths,startStations,highBytes,beginCounts,scopes,values,happenConditionZs} from '@/utils/constant';
export default {
    name: "countDemoModal",
    components:{
        moSetCountTwoT
    },
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


            visible: false,
            tablepackDataCon:[],
            tablepackDataDis:[],
            columnsCon:[
                {title:"序号",customRender:(text, record, index)=>{return `${index+1}`},key:1,width:60,align:"center"},
                {title:"PGN ID的帧格式",dataIndex:"frameFormat",key:2,width:140,align:"center",customRender:(text, record, index)=>{return record.text.frameFormatsText}},
                {title:"有无数据ID",dataIndex:"isDataId",key:3,width:100,align:"center",customRender:(text, record, index)=>{return record.text.isDataIdsText}},
                {title:"PGN ID",dataIndex:"pgnId",key:4,width:140,align:"center",customRender:(text, record, index)=>{return record.text.pgnIdsText} },
                {title:"高字节位置",dataIndex:"highByte",key:5,width:140,align:"center",customRender:(text, record, index)=>{return record.text.highBytesText} },
                {title:"发生条件",dataIndex:"happenCondition",key:6,width:300,align:"center",customRender:(text, record, index)=>{return record.text.happenConditionZsText} },
                {title:"参数的长度",dataIndex:"paramLength",key:7,width:100,align:"center"},
                {title:"参数起始位置",dataIndex:"startStation",key:8,width:100,align:"center"},
                {title:"开始计算条件",dataIndex:"beginCount",key:9,width:140,align:"center",customRender:(text, record, index)=>{return record.text.beginCountsText} },
                {title:"计算时间段",dataIndex:"scope",key:10,width:180,align:"center",customRender:(text, record, index)=>{return record.text.scopesText} },
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
                {title:"PGN ID",dataIndex:"pgnId",key:4,width:140,align:"center",customRender:(text, record, index)=>{return record.text.pgnIdsText} },
                {title:"高字节位置",dataIndex:"highByte",key:5,width:140,align:"center",customRender:(text, record, index)=>{return record.text.highBytesText} },
                {title:"参数的长度",dataIndex:"paramLength",key:7,width:100,align:"center"},
                {title:"参数起始位置",dataIndex:"startStation",key:8,width:100,align:"center"},
                {title:"开始计算条件",dataIndex:"beginCount",key:9,width:140,align:"center",customRender:(text, record, index)=>{return record.text.beginCountsText} },
                {title:"计算时间段",dataIndex:"scope",key:10,width:180,align:"center",customRender:(text, record, index)=>{return record.text.scopesText} },
                {title:"分布点数",dataIndex:"distribute",key:11,width:70,align:"center"},
                {title:"分布各点的设定数值",dataIndex:"distributeValue",key:12,width:140,align:"center"},
                {title:"操作",key:99,scopedSlots: { customRender: 'action'},width:120,align:"center",fixed:"right"},  
            ],

            form:{},
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
                happenCondition:[{required:false,message:"请选择条件",trigger:"change"}],
                paramValue:[{required:false,message:"参数设定值",trigger:"blur"}],
                dataIdLength:[{required:false,message:"请选择数据ID长度",trigger:"change"}],
                dataIdBegin:[{required:false,message:"请选择数据ID起始字节",trigger:"change"}],
                dataId:[{required:false,message:"请输入数据ID",validator:this.dataIdValidator,trigger:"blur"}],

                dataIdLength2:[{required:false,message:"请选择数据ID长度",trigger:"change"}],
                dataIdBegin2:[{required:false,message:"请选择数据ID起始字节",trigger:"change"}],
                dataId2:[{required:false,message:"请输入数据ID",validator:this.dataIdValidator,trigger:"blur"}],

                paramConditionNum:[{required:false,message:"请选择PGN参数条件个数",trigger:"change"}],
                paramDistributeNum:[{required:false,message:"请选择PGN参数分布个数",trigger:"change"}]
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
            this.rules.happenCondition[0].required = eventType === 2 ? true : false;
            this.rules.paramValue[0].required = eventType === 2 ? true : false;

            this.rules.paramConditionNum[0].required = eventType === 5 || eventType === 6 ? true : false;
            this.rules.paramDistributeNum[0].required = eventType === 6 ? true : false;


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
        add () {
            this.edit({...packFormCopy});
        },
        edit (record) {
            this.visible = true;
            this.$nextTick(()=>{
                this.$refs.ruleForm.resetFields();
                this.form = Object.assign({}, record);
                console.log(this.form)
                if(record.eventType === 5 || record.eventType === 6){
                    this.tablepackDataCon = record.paramConditionList;
                    if(record.eventType === 6){
                        this.tablepackDataDis = record.paramDistributeList;
                    }
                }
                
                this.eventTypeCallback();
                this.isDataIdCallback();
                this.isDataId2Callback();
            })
        },
        close () {
            try{
                this.$refs.ruleForm.resetFields();
                this.visible = false;
                this.tablepackDataCon = [];
                this.tablepackDataDis = []
            }catch(e){console.log(e)}
            
        },
        handleCancel () {
            this.close()
        },
        handleOk(){
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    try{
                        let eventType = this.form.eventType;
                        let form = this.form;
                        let obj = {
                            setState:form.setState,
                            serialNumber:form.serialNumber,
                            eventType:form.eventType,
                        }
                        let newObj = {};
                        if(eventType === 1){
                            let pgnLimitValue = {
                                // "type":"pgnLimitValue",
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
                                "dataId":form.dataId,
                            }
                            newObj = {...obj,...pgnLimitValue};
                            newObj.pgnLimitValue = pgnLimitValue;
                        }else if(eventType === 2){
                            let pgnCumulativeTime = {
                                // "type":"pgnCumulativeTime",
                                "frameFormat":form.frameFormat,
                                "isDataId":form.isDataId,
                                "pgnId":form.pgnId,
                                "paramLength":form.paramLength,
                                "startStation":form.startStation,
                                "highByte":form.highByte,
                                "happenCondition":form.happenCondition,
                                "paramValue":form.paramValue,
                                "beginCount":form.beginCount,
                                "scope":form.scope,
                                "dataIdLength":form.dataIdLength,
                                "dataIdBegin":form.dataIdBegin,
                                "dataId":form.dataId
                            }
                            newObj = {...obj,...pgnCumulativeTime};
                            newObj.pgnCumulativeTime = pgnCumulativeTime;
                        }else if(eventType === 3){
                            let singlePgnDistribute = {
                                // "type":"singlePgnDistribute",
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
                            newObj = {...obj,...singlePgnDistribute};
                            newObj.singlePgnDistribute = singlePgnDistribute;
                        }else if(eventType === 4){
                            let  doublePgnDistributeCopy = {
                                type:"doublePgnDistribute",
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
                                distributeValue: form.distributeValue,
                                distributeValue2: form.distributeValue2,
                                dataIdLength: form.dataIdLength,
                                dataIdLength2: form.dataIdLength2,
                                dataIdBegin: form.dataIdBegin,
                                dataIdBegin2: form.dataIdBegin2,
                                dataId: form.dataId,
                                dataId2: form.dataId2
                            }
                            let  doublePgnDistribute = {
                                pgnId1: form.pgnId,
                                pgnId2: form.pgnId2,
                                frameFormat1: form.frameFormat,
                                frameFormat2: form.frameFormat2,
                                isDataId1: form.isDataId,
                                isDataId2: form.isDataId2,
                                paramLength1: form.paramLength,
                                paramLength2: form.paramLength2,
                                startStation1: form.startStation,
                                startStation2: form.startStation2,
                                highByte1: form.highByte,
                                highByte2: form.highByte2,
                                beginCount1: form.beginCount,
                                beginCount2: form.beginCount2,
                                scope1: form.scope,
                                scope2: form.scope2,
                                distribute1: form.distribute,
                                distribute2: form.distribute2,
                                distributeValue1: form.distributeValue,
                                distributeValue2: form.distributeValue2,
                                dataIdLength1: form.dataIdLength,
                                dataIdLength2: form.dataIdLength2,
                                dataIdBegin1: form.dataIdBegin,
                                dataIdBegin2: form.dataIdBegin2,
                                dataId1: form.dataId,
                                dataId2: form.dataId2
                            }
                            newObj = {...obj,...doublePgnDistributeCopy};
                            newObj.doublePgnDistribute = doublePgnDistribute;
                        }else if(eventType === 5){
                            let len = this.tablepackDataCon.length;
                            let plen = this.form.paramConditionNum;
                            if(len < plen){
                                return this.$message.error('请修改PGN参数条件个数')
                            }
                            let multiplePgnCumulativeTimeCopy = {
                                ...this.tablepackDataCon[0],
                                paramConditionNum:plen,
                                paramConditionList:this.tablepackDataCon
                            }
                            delete multiplePgnCumulativeTimeCopy.key;
                            let multiplePgnCumulativeTime= {
                                paramConditionNum:plen,
                                paramConditionList:this.tablepackDataCon
                            }
                            newObj = {...obj, ...multiplePgnCumulativeTimeCopy}
                            newObj.multiplePgnCumulativeTime = multiplePgnCumulativeTime;
                        }else if(eventType === 6){
                            let len = this.tablepackDataDis.length;
                            let plen = this.form.paramConditionNum;
                            let len1 = this.tablepackDataDis.length;
                            let plen1 = this.form.paramDistributeNum;
                            if(len < plen){
                                return this.$message.error('请修改PGN参数条件个数')
                            }
                            if(len1 < plen1){
                                return this.$message.error('请修改PGN参数分布个数')
                            }
                            let multiplePgnDistributeCopy = {
                                ...this.tablepackDataCon[0],
                                ...this.tablepackDataDis[0],
                                paramConditionNum:plen,
                                paramDistributeNum:plen1,
                                paramDistributeList:this.tablepackDataDis,
                                paramConditionList:this.tablepackDataCon,
                            }
                            delete multiplePgnDistributeCopy.key;
                            let multiplePgnDistribute = {
                                paramConditionNum:plen,
                                paramDistributeNum:plen1,
                                paramDistributeList:this.tablepackDataDis,
                                paramConditionList:this.tablepackDataCon,
                            }
                            newObj = {...obj, ...multiplePgnDistributeCopy}
                            newObj.multiplePgnDistribute = multiplePgnDistribute;
                        }
                        if(this.form.key){
                            newObj.key = this.form.key;
                        }
                        newObj.text = this.textFilter(newObj);
                        console.log(newObj,'newObj')
                        this.$emit("ontypeParams", newObj );
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

       addCon(){
           let paramConditionNum =  this.form.paramConditionNum;
            if(!!paramConditionNum){
                if(this.tablepackDataCon.length >= paramConditionNum){
                    this.$message.error('已超出多包限制')
                }else{
                    this.addConPack();
                }
            }else{
                this.$message.error('请输入事件设置个数！')
            }
       },
       addConPack(){
            this.$refs.modalForm.add(1);
            this.$refs.modalForm.title = "新增";
       },
       addDis(){
            let paramDistributeNum =  this.form.paramDistributeNum;
            if(!!paramDistributeNum){
                if(this.tablepackDataDis.length >= paramDistributeNum){
                    this.$message.error('已超出多包限制')
                }else{
                    this.addDisPack();
                }
            }else{
                this.$message.error('请输入事件设置个数！')
            }
       },
       addDisPack(){
            this.$refs.modalForm.add(2);
            this.$refs.modalForm.title = "新增";
       },
       editCon(record){
            console.log(record,'record')
            this.$refs.modalForm.edit(record,1);
            this.$refs.modalForm.title = "编辑";
       },
       deleCon(key){
            this.tablepackDataCon = this.tablepackDataCon.filter((item)=>{
                return item.key != key
            })
       },
       editDis(record){
            this.$refs.modalForm.edit(record,2);
            this.$refs.modalForm.title = "编辑";
       },
       deleDis(key){
            this.tablepackDataDis = this.tablepackDataDis.filter((item)=>{
                return item.key != key
            })
       },
       ontypeParamsTwo(o,np){
            let key = o.key;
            let type = o.type;
            let indexo = null;
            let obj = {...o};
            let name = np===1 ? "tablepackDataCon" : "tablepackDataDis"
            try{
                if(!!key){
                    this[name].forEach((item, index) => {
                        if(item.key === key){
                            indexo = index
                        }
                    })
                    this.$set(this[name], indexo, obj)
                }else{
                    obj.key = parseInt(new Date().getTime()/1000);
                    console.log(obj)
                    this[name].unshift(obj)
                }
            }catch(e){console.log(e)}
       }

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
.plugins-set-count-modal{
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
            &.iten-btn{
                .ant-form-item-control-wrapper{
                    width: auto;
                }
                button{
                    margin-right: 20px;
                }
            }
        }
    }
    .checktable-1{
        width: 100%;
    }
}
</style>