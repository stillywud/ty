<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    wrapClassName="plugins-set-unit-modal"
    cancelText="关闭">
    
      <a-form-model ref="ruleForm" :model="packForm" :rules="packRules" >
 
        <div class="checktable-1">
            <a-form-model-item label="PGN参数来源" prop="source" class="item-0">
                <a-select 
                    v-model="packForm.source"
                    placeholder="请选择PGN参数来源">
                    <a-select-option 
                    v-for="source in sources" 
                    :key="source.key">
                    {{source.value}}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="发送方式" prop="sendType" class="item-0">
                <a-select 
                    v-model="packForm.sendType"
                    @change="sendTypeCallback"
                    placeholder="请选择发送方式">
                    <a-select-option 
                    v-for="sendType in sendTypes" 
                    :key="sendType.key">
                    {{sendType.value}}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="发送包数" prop="packageNum" class="item-0">
                <a-select 
                    v-model="packForm.packageNum"
                    @change="packageNumCallback"
                    placeholder="请选择发送包数">
                    <a-select-option 
                    v-for="packageNum in packageNums" 
                    :key="packageNum.key">
                    {{packageNum.value}}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="多包时包与包之间间隔" prop="frequency" class="item-0">
                <a-input 
                    placeholder="请输入间隔"  
                    v-model="packForm.frequency"
                    allow-clear>
                <template #suffix>
                    <span class="suffix-1">(ms)</span>
                </template>          
                </a-input>
            </a-form-model-item>
            <a-form-model-item label="定时发送间隔" prop="timingSend" class="item-0">
                <a-input 
                    placeholder="范围值：[0，65535]"  
                    v-model="packForm.timingSend"
                    allow-clear>
                <template #suffix>
                    <span class="suffix-1">(ms)</span>
                </template>          
                </a-input>
            </a-form-model-item>

            <a-form-model-item label="PGN ID的帧格式" prop="frameFormat" class="item-0">
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
            <a-form-model-item label="PGN ID" prop="pgnId" class="item-0">
                <a-input 
                    placeholder="请输入PGN ID"  
                    v-model="packForm.pgnId"
                    allow-clear />
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
        <div class="checktable-1">
            <a-form-model-item  class="item-0" label="PGN请求ID的帧格式1"  prop="frameFormat1">
                <a-select 
                :disabled="disabled1"
                v-model="packForm.frameFormat1"
                placeholder="请选择PGN请求ID的帧格式">
                <a-select-option 
                    v-for="frameFormat in frameFormats"
                    :key="frameFormat.key">
                    {{frameFormat.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求ID1"  prop="pgnId1">
                <a-select 
                :disabled="disabled1"
                v-model="packForm.pgnId1"
                placeholder="请选择PGN请求ID">
                <a-select-option 
                    v-for="pgnId in pgnIds"
                    :key="pgnId.key">
                    {{pgnId.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求数据长度1"  prop="pgnDataLength1">
                <a-select 
                :disabled="disabled1"
                v-model="packForm.pgnDataLength1"
                placeholder="请选择PGN请求数据长度">
                <a-select-option 
                    v-for="pgnDataLength in pgnDataLengths"
                    :key="pgnDataLength.key">
                    {{pgnDataLength.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求数据内容1"  prop="pgnDataContent1">
                <a-input 
                :disabled="disabled1"
                placeholder="请输入PGN请求数据内容"  
                v-model="packForm.pgnDataContent1"
                allow-clear/>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求ID的帧格式2"  prop="frameFormat2">
                <a-select 
                :disabled="disabled2"
                v-model="packForm.frameFormat2"
                placeholder="请选择PGN请求ID的帧格式">
                <a-select-option 
                    v-for="frameFormat in frameFormats"
                    :key="frameFormat.key">
                    {{frameFormat.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求ID2"  prop="pgnId2">
                <a-select 
                :disabled="disabled2"
                v-model="packForm.pgnId2"
                placeholder="请选择PGN请求ID">
                <a-select-option 
                    v-for="pgnId in pgnIds"
                    :key="pgnId.key">
                    {{pgnId.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求数据长度2"  prop="pgnDataLength2">
                <a-select 
                :disabled="disabled2"
                v-model="packForm.pgnDataLength2"
                placeholder="请选择PGN请求数据长度">
                <a-select-option 
                    v-for="pgnDataLength in pgnDataLengths"
                    :key="pgnDataLength.key">
                    {{pgnDataLength.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求数据内容2"  prop="pgnDataContent2">
                <a-input 
                :disabled="disabled2"
                placeholder="请输入PGN请求数据内容"  
                v-model="packForm.pgnDataContent2"
                allow-clear/>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求ID的帧格式3"  prop="frameFormat3">
                <a-select 
                :disabled="disabled3"
                v-model="packForm.frameFormat3"
                placeholder="请选择PGN请求ID的帧格式">
                <a-select-option 
                    v-for="frameFormat in frameFormats"
                    :key="frameFormat.key">
                    {{frameFormat.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求ID3"  prop="pgnId3">
                <a-select 
                :disabled="disabled3"
                v-model="packForm.pgnId3"
                placeholder="请选择PGN请求ID">
                <a-select-option 
                    v-for="pgnId in pgnIds"
                    :key="pgnId.key">
                    {{pgnId.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求数据长度3"  prop="pgnDataLength3">
                <a-select 
                :disabled="disabled3"
                v-model="packForm.pgnDataLength3"
                placeholder="请选择PGN请求数据长度">
                <a-select-option 
                    v-for="pgnDataLength in pgnDataLengths"
                    :key="pgnDataLength.key">
                    {{pgnDataLength.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求数据内容3"  prop="pgnDataContent3">
                <a-input 
                :disabled="disabled3"
                placeholder="请输入PGN请求数据内容"  
                v-model="packForm.pgnDataContent3"
                allow-clear/>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求ID的帧格式4"  prop="frameFormat4">
                <a-select 
                :disabled="disabled4"
                v-model="packForm.frameFormat4"
                placeholder="请选择PGN请求ID的帧格式">
                <a-select-option 
                    v-for="frameFormat in frameFormats"
                    :key="frameFormat.key">
                    {{frameFormat.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求ID4"  prop="pgnId4">
                <a-select 
                :disabled="disabled4"
                v-model="packForm.pgnId4"
                placeholder="请选择PGN请求ID">
                <a-select-option 
                    v-for="pgnId in pgnIds"
                    :key="pgnId.key">
                    {{pgnId.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求数据长度4"  prop="pgnDataLength4">
                <a-select 
                :disabled="disabled4"
                v-model="packForm.pgnDataLength4"
                placeholder="请选择PGN请求数据长度">
                <a-select-option 
                    v-for="pgnDataLength in pgnDataLengths"
                    :key="pgnDataLength.key">
                    {{pgnDataLength.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求数据内容4"  prop="pgnDataContent4">
                <a-input 
                :disabled="disabled4"
                placeholder="请输入PGN请求数据内容"  
                v-model="packForm.pgnDataContent4"
                allow-clear/>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求ID的帧格式5"  prop="frameFormat5">
                <a-select 
                :disabled="disabled5"
                v-model="packForm.frameFormat5"
                placeholder="请选择PGN请求ID的帧格式">
                <a-select-option 
                    v-for="frameFormat in frameFormats"
                    :key="frameFormat.key">
                    {{frameFormat.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求ID5"  prop="pgnId5">
                <a-select 
                :disabled="disabled5"
                v-model="packForm.pgnId5"
                placeholder="请选择PGN请求ID">
                <a-select-option 
                    v-for="pgnId in pgnIds"
                    :key="pgnId.key">
                    {{pgnId.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求数据长度5"  prop="pgnDataLength5">
                <a-select 
                :disabled="disabled5"
                v-model="packForm.pgnDataLength5"
                placeholder="请选择PGN请求数据长度">
                <a-select-option 
                    v-for="pgnDataLength in pgnDataLengths"
                    :key="pgnDataLength.key">
                    {{pgnDataLength.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN请求数据内容5"  prop="pgnDataContent5">
                <a-input 
               :disabled="disabled5" 
                placeholder="请输入PGN请求数据内容"  
                v-model="packForm.pgnDataContent5"
                allow-clear/>
            </a-form-model-item>

        </div>
        </a-form-model>
  </a-modal>
</template>

<script>
let packFormCopy = {
    source:7,
    sendType:1,
    packageNum:2,
    frequency:"0",
    timingSend:"10",
    frameFormat:0,
    isDataId:0,
    pgnId:'',
    dataIdBegin:0,
    dataIdLength:1,
    dataId:"",
    frameFormat1:1,
    pgnId1:'18FF254A',
    pgnDataLength1:1,
    pgnDataContent1:'',
    frameFormat2:1,
    pgnId2:'18FF254A',
    pgnDataLength2:1,
    pgnDataContent2:'',
    frameFormat3:1,
    pgnId3:'18FF254A',
    pgnDataLength3:1,
    pgnDataContent3:'',
    frameFormat4:1,
    pgnId4:'18FF254A',
    pgnDataLength4:1,
    pgnDataContent4:'',
    frameFormat5:1,
    pgnId5:'18FF254A',
    pgnDataLength5:1,
    pgnDataContent5:''
}

import {frameFormats, setStates,packageNums,pgnDataLengths,sendTypes,isDataIds, sources, pgnIds, dataIdLengths, dataIdBegins} from '@/utils/constant'
export default {
    name: "countDemoModal",
    data () {
      return {
            title:"操作",
            visible: false,
            frameFormats,
            setStates,
            sendTypes,
            packageNums,
            pgnDataLengths,
            isDataIds,
            sources,
            pgnIds,
            dataIdLengths,
            dataIdBegins,
            disabled5:true,
            disabled4:true,
            disabled3:true,
            disabled2:true,
            disabled1:true,

            packForm:{},
            packRules:{
                timingSend:[{required: false,message: '请输入定时发送间隔', trigger: 'blur'}],
                frameFormat:[{required: false,message: '请选择PGN ID的帧格式', trigger: 'change'}],
                isDataId:[{required: false,message: '请选择有无数据ID', trigger: 'change'}],
                pgnId:[{required: false,message: '请输入pgnId', trigger: 'blur'}],

                dataIdLength:[{required: false,message: '请选择数据ID长度',trigger: 'change'}],
                dataIdBegin:[{required: false,message: '请选择数据ID起始字节',trigger: 'change'}],
                dataId:[{required: false,message: '请输入数据ID',trigger: 'blur'}],
            }
        }
    },
    created () {
    },
    mounted(){
    },
    methods: {
        packageNumCallback(){
            let packageNum = Number(this.packForm.packageNum);
            for(let i = 1;i<=packageNum;i++){
                console.log(`disabled${i}`)
                this[`disabled${i}`] = false;
            }
            let packageNums = 5 - packageNum;
            if(packageNums > 0){
                for(let i = 0;i<packageNums;i++){
                    console.log(`disabled${5-i}--`)
                    this[`disabled${5-i}`] = true;
                }
            }
        },
        sendTypeCallback(){
            let sendType = this.packForm.sendType;
            this.packRules.timingSend[0].required = sendType === 0 ? true : false;
            this.packRules.frameFormat[0].required = sendType === 1 ? true : false;
            this.packRules.isDataId[0].required = sendType === 1 ? true : false;
            this.packRules.pgnId[0].required = sendType === 1 ? true : false;
        },
        isDataIdcallback(){
            // 有无数据ID
            let isDataId = this.packForm.isDataId;
            this.packRules.dataIdLength[0].required =isDataId === 1 ?  true : false;
            this.packRules.dataIdBegin[0].required = isDataId === 1 ?  true : false;
            this.packRules.dataId[0].required = isDataId === 1 ?  true : false;
        },
        add () {

            this.edit({...packFormCopy});
        },
        edit (record) {
            this.visible = true;
            this.$nextTick(()=>{
                this.$refs.ruleForm.resetFields();
                this.packForm = Object.assign({}, record);
                this.isDataIdcallback();
                this.sendTypeCallback();
                this.packageNumCallback();
            })
        },
        close () {
            this.$refs.ruleForm.resetFields();
            this.visible = false;
        },
        handleOk () {
            // 触发表单验证
            this.$refs.ruleForm.validate((valid, err) => {
                if (valid){
                    try{
                        let arrParams = [
                            "source","sendType","packageNum","frequency","timingSend","frameFormat","isDataId","pgnId","dataIdLength","dataIdBegin","dataId",
                            "frameFormat1","pgnId1","pgnDataLength1","pgnDataContent1",
                            "frameFormat2","pgnId2","pgnDataLength2","pgnDataContent2",
                            "frameFormat3","pgnId3","pgnDataLength3","pgnDataContent3",
                            "frameFormat4","pgnId4","pgnDataLength4","pgnDataContent4",
                            "frameFormat5","pgnId5","pgnDataLength5","pgnDataContent5",
                        ];
                        let typeParams = this.filterParams(arrParams);
                        if(this.packForm.key){
                            typeParams.key = this.packForm.key;
                        }

                        typeParams.text = this.textFilter(this.packForm);
                        this.$emit("ontypeParams", typeParams );
                        this.close()
                    }catch(e){console.log(e)}
                    
                }
            })
        },
        textFilter(obj){
            let isDataIdsText = this.eachArrParams(this.isDataIds,obj.isDataId);
            let sourcesText = this.eachArrParams(this.sources,obj.source);
            let frameFormatsText = this.eachArrParams(this.frameFormats,obj.frameFormat);
            let pgnIdsText = this.eachArrParams(this.pgnIds,obj.pgnId);
            let sendTypesText = this.eachArrParams(this.sendTypes,obj.sendType);
            let frameFormat1sText = this.eachArrParams(this.frameFormats,obj.frameFormat1);
            let pgnId1sText = this.eachArrParams(this.pgnIds,obj.pgnId1);
            let frameFormat2sText = this.eachArrParams(this.frameFormats,obj.frameFormat2);
            let pgnId2sText = this.eachArrParams(this.pgnIds,obj.pgnId2);
            let frameFormat3sText = this.eachArrParams(this.frameFormats,obj.frameFormat3);
            let pgnId3sText = this.eachArrParams(this.pgnIds,obj.pgnId3);
            let frameFormat4sText = this.eachArrParams(this.frameFormats,obj.frameFormat4);
            let pgnId4sText = this.eachArrParams(this.pgnIds,obj.pgnId4);
            let frameFormat5sText = this.eachArrParams(this.frameFormats,obj.frameFormat5);
            let pgnId5sText = this.eachArrParams(this.pgnIds,obj.pgnId5);
            return {isDataIdsText,sourcesText,frameFormatsText,pgnIdsText,sendTypesText,frameFormat1sText,pgnId1sText,frameFormat2sText,pgnId2sText,frameFormat3sText,pgnId3sText,frameFormat4sText,pgnId4sText,frameFormat5sText,pgnId5sText}
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
        filterParams(arr){
            let obj = {};
            arr.forEach((item) => {
                obj[item] = this.packForm[item] === undefined || this.packForm[item] === '' ? 0 : this.packForm[item]
            })
            return obj;
        },
        handleCancel () {
            this.close()
        }
    }
}
</script>

<style lang="scss">
.plugins-set-unit-modal{
    .checktable-1{
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item-0{
          
          display: flex;
          &:nth-child(2n+1){
            flex-basis: 40%;
            padding-right: 15px;
            .ant-form-item-label{
                width: 150px;
            }
          }
          &:nth-child(2n+2){
            .ant-form-item-label{
                width: auto;
            }
            
          } 
          .ant-form-item-control-wrapper{
              width: 195px;
            }
            .ant-input[disabled]{
                background-color: transparent;
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