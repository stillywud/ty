<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    wrapClassName="plugins-set-time-modal"
    cancelText="关闭">
      <a-form-model ref="ruleForm" :model="packForm" :rules="packRules" >
        <div class="checktable-1">
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
          <a-form-model-item label="PGN来源" prop="source"  class="item-0" >
              <a-select 
                placeholder="请选择PGN来源"
                v-model="packForm.source">
                <a-select-option 
                  v-for="source in sources"
                  :key="source.key">
                  {{source.value}}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          <a-form-model-item  class="item-0" label="PGN ID"  prop="pgnId">
              <a-select 
              v-model="packForm.pgnId"
              placeholder="请选择PGN ID"
              >
              <a-select-option 
                v-for="pgnId in pgnIds"
                :key="pgnId.key">
                {{pgnId.value}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="采集频率" prop="frequency"  class="item-0">
            <a-input 
              placeholder="请输入采集频率"
              v-model="packForm.frequency"
              suffix="(ms)"
              allow-clear
              />
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
          <a-form-model-item label="是否多包" prop="isPackage" class="item-0">
              <a-select 
               placeholder="请选择是否多包"
                v-model="packForm.isPackage"
                @change="isPackageCallback">
                <a-select-option 
                  v-for="isPackage in isPackages" 
                  :key="isPackage.key">
                  {{isPackage.value}}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          <a-form-model-item label="多包广播ID帧格式" prop="multiRadioFrameFormat" class="item-0">
            <a-select 
             placeholder="请选择帧格式" 
              v-model="packForm.multiRadioFrameFormat">
              <a-select-option 
                v-for="multiRadioFrameFormat in frameFormats"
                :key="multiRadioFrameFormat.key">
                {{multiRadioFrameFormat.value}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="多包广播ID" prop="multiRadioId" class="item-0">
            <a-input 
              placeholder="请输入多包广播ID" 
              v-model="packForm.multiRadioId"
                      />
          </a-form-model-item>
          
          <a-form-model-item label="多包数据ID帧格式" prop="multiDataFrameFormat" class="item-0">
            <a-select 
              v-model="packForm.multiDataFrameFormat"
              placeholder="请选择帧格式" 
              >
              <a-select-option 
                v-for="multiDataFrameFormat in frameFormats"
                :key="multiDataFrameFormat.key">
                {{multiDataFrameFormat.value}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="多包数据ID" prop="mutiDataId" class="item-0">
              <a-input  
              placeholder="请输入多包数据ID" 
              v-model="packForm.mutiDataId"/>
            </a-form-model-item>
          <a-form-model-item label="数据ID起始字节" prop="dataIdBegin" class="item-0">
            <a-select 
            placeholder="请选择数据ID起始字节"
              v-model="packForm.dataIdBegin"
              >
              <a-select-option
                  v-for="dataIdBegin in dataIdBegins"
                  :key="dataIdBegin.key">
                {{dataIdBegin.value}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="数据ID长度" prop="dataIdLength" class="item-0">
            <a-select placeholder="请选择数据ID长度"   v-model="packForm.dataIdLength">
              <a-select-option 
                v-for='dataIdLength in dataIdLengths'
                :key="dataIdLength.key">
                {{dataIdLength.value}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="数据ID" prop="dataId" class="item-0">
            <a-input placeholder="请输入数据ID"  v-model="packForm.dataId"/>
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
    dataId:"",
}

import {frameFormats, setStates, eventTypesC,isPackages, isDataIds, sources, dataIdLengths, dataIdBegins} from '@/utils/constant'
export default {
    name: "TimeDemoModal",
    props:['pgnIdsCopy'],
    data () {
      return {
            title:"操作",
            visible: false,
            frameFormats,
            isPackages,
            setStates,
            isDataIds,
            sources,
            // pgnIds:this.pgnIds,
            dataIdLengths,
            eventTypesC,
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
    computed:{
      pgnIds(){
        let arr = [];
        this.pgnIdsCopy.forEach((item)=>{
          let obj = {}
          obj.key = item.pgn_pgnid;
          obj.value = item.pgn_name;
          arr.push(obj)
        });
        return arr;
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
                        let arrParams = ["frameFormat","isPackage","isDataId","source","pgnId","frequency","multiRadioFrameFormat","multiRadioId","multiDataFrameFormat","mutiDataId","dataIdLength","dataIdBegin","dataId"];
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
          
          let frameFormatsText = this.eachArrParams(this.frameFormats,obj.frameFormat);
          let isPackagesText = this.eachArrParams(this.isPackages,obj.isPackage);
          let isDataIdsText = this.eachArrParams(this.isDataIds,obj.isDataId);
          let sourcesText = this.eachArrParams(this.sources,obj.source);
          let pgnIdsText = this.eachArrParams(this.pgnIds,obj.pgnId);
          let multiRadioFrameFormatsText = this.eachArrParams(this.frameFormats,obj.multiRadioFrameFormat);
          let multiDataFrameFormatsText = this.eachArrParams(this.frameFormats,obj.multiDataFrameFormat);
          return {isPackagesText,isDataIdsText,sourcesText,multiDataFrameFormatsText,multiRadioFrameFormatsText,frameFormatsText,pgnIdsText}
        },
        eachArrParams(arr, type){
            let text = '';
            arr.forEach((item)=>{
                if(item.key === type){
                    text = item.value;
                }
            })
            return text || type;
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
.plugins-set-time-modal{
    .checktable-1{
        display:flex;
        flex-wrap: wrap;
        .item-0{
            flex-basis: 50%;
            display: flex;
            &{
              padding-right: 10px;
            }
            .ant-form-item-label{
                width: 137px;
            }
            .ant-form-item-control-wrapper{
                flex: 1;
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