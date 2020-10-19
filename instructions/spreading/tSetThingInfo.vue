<template><!--/事件设置信息/-->
<div class="s-set-thing-info-box">
    <div class="con-box">
      <ty-a-spin v-if="tyspining"/>
    
    <a-form-model
      ref="setSubForm" 
      :model="setSubForm" 
      :rules="setSubRules">
      <div class="con-box-wrapper">
        <div class="list-0">
          <a-form-model-item label="发送中心号" class="item-0">
              <a-input v-model="tmnlSelected.tmnlSendCenterNo" placeholder="请输入发送中心号" disabled/>
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
          :scroll="{ x: 2573 }"
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

    <mo-set-thing-info-t 
      :addDialogPack.sync="addDialogPack"
      :packFormCopy="packFormCopy"
      @ontypeParams = "ontypeParams"
    />
  </div>
</div>
</template>
<script>
import {sendCommMessage} from "@/api/infodevice"
import {parseTime, kmxCode} from "@/utils/index"
import {getToken, jwtDecodeToken} from "@/utils/auth"
import moSetThingInfoT from "../modal/moSetThingInfoT"
import TyASpin from "@/components/TyASpin"
import cloneDeep from "lodash/cloneDeep"
export default {
    name: "tSetThingInfo",
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
      moSetThingInfoT
    },
    data() {
      return {
        tyspining:false,
        addDialogPack:false,
        settmnlData: {},
        packFormCopy:{},
        setSubForm: {
          timeOver: 0,
          timingSendTime: "",
          triedTimes: "1",
          eventCount:""
        },
        tablepackData: [
        ],
        columns:[
          {title:"序号",customRender:(text, record, index)=>{return `${index+1}`},key:1,width:60,align:"center"},
          {title:"设置状态",dataIndex:"setState",key:2,width:120,align:"center",customRender:(text, record, index)=>{return record.setStatesText}},
          {title:"位置序号",dataIndex:"serialNumber",key:3,width:90,align:"center"},
          {title:"事件种类",dataIndex:"eventType",key:4,width:443,align:"center",customRender:(text, record, index)=>{return record.eventTypesText}},
          {title:"PGN ID的帧格式",dataIndex:"frameFormat",key:5,width:160,align:"center",customRender:(text, record, index)=>{return record.frameFormatsText}},
          {title:"有无数据ID",dataIndex:"isDataId",key:6,width:100,align:"center",customRender:(text, record, index)=>{return record.isDataIdsText}},
          {title:"PGN ID",dataIndex:"pgnId",key:7,width:100,align:"center",customRender:(text, record, index)=>{return record.pgnIdsText} },
          {title:"参数的长度",dataIndex:"paramLength",key:8,width:100,align:"center"},
          {title:"高字节位置",dataIndex:"highByte",key:9,width:140,align:"center",customRender:(text, record, index)=>{return record.highBytesText}},
          {title:"发生条件",dataIndex:"happenCondition",key:10,width:280,align:"center",customRender:(text, record, index)=>{return record.happenConditionsText}},
          {title:"参数在PGN中所处的起始位置",dataIndex:"startStation",key:11,width:220,align:"center"},
          {title:"参数设定值",dataIndex:"paramValue",key:12,width:100,align:"center"},
          {title:"参数变化最大时长",key:13,dataIndex:"paramChangeDuration",width:140,align:"center"},
          {title:"事件条件满足后需持续时间",dataIndex:"duration",key:14,width:200,align:"center"},
          {title:"数据ID长度",dataIndex:"dataIdLength",key:15,width:100,align:"center"},
          {title:"数据ID起始字节",dataIndex:"dataIdBegin",key:16,width:160,align:"center"},
          {title:"数据ID",dataIndex:"dataId",key:17,width:60,align:"center"},
          {title:"操作",key:18,scopedSlots: { customRender: "action"},width:120,align:"center",fixed:"right"},
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
          eventCount: [{
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
                    this.$message.error("事件个数值为0，255添加多包无效，请直接提交！")
                }else if (eventCount > 100 && eventCount !== 255) {
                    this.$message.error("事件个数：取值范围为0-100或255的整数")
                }else if(this.tablepackData.length > eventCount){
                    this.$message.error("超出多包");
                }else{
                    this.add();
                }
            }else{
                this.$message.error("请输入事件个数！")
            }
      },
      ontypeParams(o,t){
        let key = o.key;
        let indexo = null;
        let obj = {...o,...o.text};
        console.log(o,"0",obj)
        try{
          if(!!key){
         this.tablepackData.forEach((item, index) => {
            if(item.key === key){
              indexo = index
              console.log(item,"item")
            }
          })
          this.$set(this.tablepackData, indexo, obj)
        }else{
          obj.key = parseInt(new Date().getTime()/1000)
          this.tablepackData.push(obj)
        }
        }catch(e){console.log(e)}
        
        
      },
      sendCommMessage() {
        this.$refs.setSubForm.validate((valid) => {
          if (valid) {
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
                  systemCode:  kmxCode(this.recordData.vcl_dictvb_id),
                  accountName:  this.userInfo.realname,
                  accountPwd: "CT100B",
                  jsonVersion: "1.0",
                  infoid: "D5",
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
                        infoId: "D5",
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
                this.$message.error("提交失败")
              })
            })
          }

        })
      },
      filterTableArr(){
        let arr = [];
        let obj = {}
        this.tablepackData.forEach((item)=>{
          obj["setState"] = item.setState;
          obj["serialNumber"] = item.serialNumber;
          obj["eventType"] = item.eventType;
          obj["pgnThreshold"] = item.pgnThreshold;
          obj["pgnSwitch"] = item.pgnSwitch;
          obj["pgnCompatThreshold"] = item.pgnCompatThreshold;
          obj["pgnCompatSwitch"] = item.pgnCompatSwitch;
          arr.push(obj)
        })
        return arr;
      },
      dele(key){
        this.tablepackData = this.tablepackData.filter((item)=>{
          return item.key != key
        })
      },
      edit(item){
        this.packFormCopy = Object.assign({},item);
        this.packFormCopy.edit = true;
        this.addDialogPack = true;
      },
      reset() {
        this.$refs.setSubForm.resetFields()
      }
    }
  }
</script>

<style lang="scss">
  .s-set-thing-info-box {
        height: 500px;
        position: relative;
        .con-box{
            height: 500px;
            overflow-y: auto;
        }
    .dialog-footer{
      text-align:right;
      margin-top: 40px;
      padding:20px;
      .addduobao{
        margin-right:20px
      }
    }
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
      padding: 6px;
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
