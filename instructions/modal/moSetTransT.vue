<template>
  <a-modal
    :title="title"
    :width="790"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    wrapClassName="plugins-set-trans-modal"
    
    cancelText="关闭">
    
      <a-form-model ref="ruleForm" :model="packForm" :rules="packRules" >
 
        <div class="checktable-1">
            <a-form-model-item label="PGN ID的帧格式" prop="frameFormat" class="item-0">
                <a-select 
                    v-model="packForm.frameFormat"
                    placeholder="请选择帧格式">
                    <a-select-option 
                    v-for="frameFormat in frameFormats" 
                    :key="frameFormat.key">
                    {{frameFormat.value}}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="是否多包"  prop="isPackage">
                <a-select 
                    v-model="packForm.isPackage"
                    @change="isPackageCallback"
                    placeholder="请选择是否多包">
                    <a-select-option 
                    v-for="isPackage in isPackages" 
                    :key="isPackage.key">
                    {{isPackage.value}}
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
            <a-form-model-item label="PGN参数来源" prop="source"  class="item-0">
                <a-select 
                    v-model="packForm.source"
                    placeholder="请选择PGN参数来源">
                    <a-select-option 
                    :title="source.value"
                    v-for="source in sources"
                    :key="source.key">
                    {{source.value}}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="PGN ID"  prop="pgnId">
                <a-select 
                v-model="packForm.pgnId"
                placeholder="请选择PGN ID">
                <a-select-option 
                    v-for="pgnId in pgnIds"
                    :key="pgnId.key">
                    {{pgnId.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="采集频率"  prop="frequency">
              <a-input 
                placeholder="请输入采集频率"  
                v-model="packForm.frequency"
                allow-clear>
                <template #suffix>
                    <span class="suffix-1">(ms)</span>
                </template>          
                </a-input>
            </a-form-model-item>
            <a-form-model-item label="多包广播ID的帧格式" prop="multiRadioFrameFormat"  class="item-0">
                <a-select 
                    v-model="packForm.multiRadioFrameFormat"
                    placeholder="请选择多包广播ID的帧格式">
                    <a-select-option 
                    :title="multiRadioFrameFormat.value"
                    v-for="multiRadioFrameFormat in frameFormats"
                    :key="multiRadioFrameFormat.key">
                    {{multiRadioFrameFormat.value}}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="多包广播ID"  prop="multiRadioId">
                <a-input 
                placeholder="请输入多包广播ID"  
                v-model="packForm.multiRadioId"
                allow-clear/>
            </a-form-model-item>
            <a-form-model-item label="多包数据ID的帧格式" prop="multiDataFrameFormat"  class="item-0">
                <a-select 
                v-model="packForm.multiDataFrameFormat"
                placeholder="请选择PGN ID的帧格式">
                <a-select-option 
                    v-for="multiDataFrameFormat in frameFormats"
                    :key="multiDataFrameFormat.key">
                    {{multiDataFrameFormat.value}}
                </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item  class="item-0" label="多包数据ID"  prop="mutiDataId">
                <a-input 
                    placeholder="请输入多包数据ID"  
                    v-model="packForm.mutiDataId"
                    allow-clear/>
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
    frameFormat:1,
    isPackage:0,
    isDataId:0,
    source:7,
    pgnId:"18FF254A",
    frequency:"10000",
    multiRadioFrameFormat:1,
    multiRadioId:"18ECFF4A",
    multiDataFrameFormat:1,
    mutiDataId:"18EBFF4A",
    dataIdBegin:0,
    dataIdLength:1,
    dataId:""
}

import {frameFormats, isPackages, isDataIds, sources, pgnIds, dataIdLengths, dataIdBegins} from '@/utils/constant'
export default {
    name: "JeecgDemoModal",
    data () {
      return {
            title:"操作",
            visible: false,
            frameFormats,
            isPackages,
            isDataIds,
            sources,
            pgnIds,
            dataIdLengths,
            dataIdBegins,
            packForm:{},
            packRules:{
                frameFormat:[{required: true,trigger: "change",message:"请选择PGN ID的帧格式"}],
                isPackage:[{required: true,trigger: "change",message:"请选择是否多包"}],
                isDataId:[{required: true,trigger: "change",message:"请选择有无数据ID"}],
                source:[{required: true,trigger: "change",message:"请选择PGN参数来源"}],
                pgnId:[{required: true,trigger: "change",message:"请选择PGN ID"}],
                frequency:[{required: true,trigger: "blur",message:"请输入采集频率"}],

                multiRadioFrameFormat:[{required: false,trigger: "change",message:"请选择多包广播ID的帧格式"}],
                multiRadioId:[{required: false,trigger: "blur",message:"请输入多包广播ID"}],
                multiDataFrameFormat:[{required: false,trigger: "change",message:"请选择多包数据ID的帧格式"}],
                mutiDataId:[{required: false,trigger: "blur",message:"请输入多包数据ID"}],

                dataIdLength:[{required: false,trigger: "change",message:"请选择数据ID长度"}],
                dataIdBegin:[{required: false,trigger: "change",message:"请选择数据ID起始字节"}],
                dataId:[{required: false,trigger: "blur",message:"请输入数据ID"}],
            }
        }
    },
    created () {
    },
    mounted(){
    },
    methods: {
        isPackageCallback(){
            // 多包
            let isPackage = this.packForm.isPackage;
            this.packRules.multiRadioFrameFormat[0].required =isPackage === 1 ?  true : false;
            this.packRules.multiRadioId[0].required = isPackage === 1 ?  true : false;
            this.packRules.multiDataFrameFormat[0].required = isPackage === 1 ?  true : false;
            this.packRules.mutiDataId[0].required = isPackage === 1 ?  true : false; 
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
                this.isPackageCallback();
                this.isDataIdcallback();
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
                        let arrParams = ["frameFormat","isDataId","pgnId","isPackage","source","frequency","multiRadioFrameFormat","multiRadioId","multiDataFrameFormat","mutiDataId","dataIdLength","dataIdBegin","dataId"];
                        let typeParams = this.filterParams(arrParams);
                        let frameFormatsText = this.eachArrParams(this.frameFormats,this.packForm.frameFormat);
                        let isPackagesText = this.eachArrParams(this.isPackages,this.packForm.isPackage);
                        let isDataIdsText = this.eachArrParams(this.isDataIds,this.packForm.isDataId);
                        let sourcesText = this.eachArrParams(this.sources,this.packForm.source);
                        let pgnIdsText = this.eachArrParams(this.pgnIds,this.packForm.pgnId);
                        let multiRadioFrameFormatsText = this.eachArrParams(this.frameFormats,this.packForm.multiRadioFrameFormat);
                        let multiDataFrameFormatsText = this.eachArrParams(this.frameFormats,this.packForm.multiDataFrameFormat);
                        if(this.packForm.key){
                            typeParams.key = this.packForm.key;
                        }
                        typeParams.text = {isPackagesText,isDataIdsText,sourcesText,multiDataFrameFormatsText,multiRadioFrameFormatsText,frameFormatsText,pgnIdsText};
                        this.$emit("ontypeParams", typeParams );
                        this.close()
                    }catch(e){console.log(e)}
                    
                }
            })
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
.plugins-set-trans-modal{
    .checktable-1{
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item-0{
          
          display: flex;
          &:nth-child(2n+1){
            flex-basis: 50%;
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