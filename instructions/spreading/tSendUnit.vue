<template><!--/单元发送/-->
<div class="s-send-unit-box">
    <div class="con-box">
      <ty-a-spin v-if="tyspining"/>
        <a-form-model ref="setUnitForm" :model="setSubForm" :rules='rules1' >
          <div class="con-box-wrapper">
            <div class="list-0">
                            <a-form-model-item label="发送中心号" class="item-0">
                <a-input  v-model="tmnlSelected.tmnlSendCenterNo" placeholder="请输入发送中心号"
                            disabled/>
            </a-form-model-item>
            <a-form-model-item label="重复次数" prop="triedTimes" class="item-0">
                <a-input v-model="setSubForm.triedTimes" placeholder="请输入重复次数" @change="triedTimesCallback"
                            allow-clear/>
            </a-form-model-item>
            <a-form-model-item label="定时发送时间" prop="timingSendTime" class="item-0">
                <a-date-picker
                        show-time
                        v-model="setSubForm.timingSendTime"
                        placeholder="定时发送时间">
                </a-date-picker>
            </a-form-model-item>
            <a-form-model-item label="超时时间(分钟)" prop='timeOver' class="item-0">
                <a-input v-model="setSubForm.timeOver" placeholder="超时时间" @change="timeOverCallback"
                            allow-clear>
              <template #suffix>
                <span class="suffix-1">(分)</span>
              </template>          
            </a-input>
            </a-form-model-item>
            
            
            
             <a-form-model-item label="设置个数" prop="unitCount" class="item-0">
                        <a-input v-model='setSubForm.unitCount' allow-clear  placeholder="发送单元设置个数"></a-input>
                    </a-form-model-item>
                    <a-form-item label="模板选择" class="item-0">
              <a-select v-model="tempId" allow-clear @change="selectTemp" placeholder="模板选择">
                <a-select-option v-for="temp in tempData" :key="temp.msstId">{{temp.msstName}}</a-select-option>
              </a-select>
            </a-form-item>
            </div>

          </div>
            
        </a-form-model>

        <a-table
          :data-source="tablepackData"
          :columns="columns"
          bordered
          stripe
          height="200px"
          :scroll="{ x: 3920}"
        >
          <template v-slot:action="text,column">
            <a @click="edit(column)">编辑 </a>
            <a-divider type="vertical" />
            <a @click="dele(column.key)">删除</a>
          </template>
        </a-table>


        <div  class="dialog-footer">
            <a-button type="primary" @click="addPackage">添加多包</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" @click="onSubmit">提交</a-button>
        </div>

        <!-- 表格table 区域-->
        <mo-send-unit-t
            ref="modalForm"
            :pgnIdsCopy="pgnIds"
            @ontypeParams="ontypeParams"
        />
    </div>
    </div>
</template>
<script>
import {sendCommMessage,getPGNInfo} from '@/api/infodevice'
import {getTempData,getParaData} from '@/api/tempUnit'
import {parseTime, parseDate,kmxCode} from '@/utils'
import moSendUnitT from '../modal/moSendUnitT'
import TyASpin from "@/components/TyASpin"
import cloneDeep from "lodash/cloneDeep"
export default {
    name: "tSendUnit",
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
      moSendUnitT,
      TyASpin
    },
    data () {
      let checkunitCount = (rule, value, callback) => {
          if (value==='') {
              callback(new Error("请输入发送单元设置个数"));
          }else if(value!=''){
            value = Number(value);
            if(value >=0 && value<=250 || value === 255){
              callback();
            }else{
              callback(new Error("取值范围0-250或255的整数"));
            }
          }
        };
        return {
            pgnIds:[],
            tyspining:false,
            rules1:{
                timeOver:[{required: true,trigger: 'blur',
                    validator:(rule,value,callback)=>{
                        value = value + ''
                        if(value === ''){
                            callback(new Error("该值不允许为空"));
                        }else{
                            var timeOutInd=value.indexOf(".")
                            var timeOutNum=Number(value)
                            if(timeOutNum>=0&&timeOutInd=="-1"){
                                callback();
                            }else{
                                callback(new Error("该值为大于等于0的整数"));
                            }
                        }
                    },
                }],
                triedTimes:[{required: true,trigger: 'blur',message:'请输入重复次数'}],
                unitCount:[{validator: checkunitCount,required: true,trigger: 'blur'}],
            },
            setSubForm:{
                sendType: '',
                sendTypes: [],
                timeOver:0,
                timingSendTime:null,//定时发送时间
                triedTimes:"1",
                unitCount:'',//发送单元设置个数
            },
            tempData:[],
            tempId:undefined,
            tablepackData: [],
            columns: [
              {title:'序号', key:110, width:60, align:'center', customRender(text, record, index) {return `${index + 1}`}},
              {title: 'PGN来源', key: 111,dataIndex: 'source', width: 90, align:'center',customRender:(text, record, index)=>{return record.text.sourcesText}},
              {title: '发送方式', key: 112,dataIndex: 'sendType', width: 90, align:'center',customRender:(text, record, index)=>{return record.text.sendTypesText}},
              {title: '发送包数', key: 113,dataIndex: 'packageNum', width: 90, align:'center'},
              {title: '多包时包与包之间间隔', key: 114,dataIndex: 'frequency', width: 160, align:'center'},
              {title: '定时发送间隔', key: 115,dataIndex: 'timingSend', width: 100, align:'center'},
              {title: 'PGN ID的帧格式', key: 116,dataIndex: 'frameFormat', width: 140, align:'center',customRender:(text, record, index)=>{return record.text.frameFormatsText}},
              {title: '有无数据ID', key: 117,dataIndex: 'isDataId', width: 90, align:'center',customRender:(text, record, index)=>{return record.text.isDataIdsText}},
              {title: 'PGN ID', key: 118,dataIndex: 'pgnId', width: 90, align:'center',customRender:(text, record, index)=>{return record.text.pgnIdsText ? record.text.pgnIdsText : record.pgnId}},
              {title: '数据ID长度', key: 119,dataIndex: 'dataIdLength', width: 90, align:'center'},
              {title: '数据ID起始字节', key: 120,dataIndex: 'dataIdBegin', width: 140, align:'center'},
              {title: '数据ID', key: 121,dataIndex: 'dataId', width: 90, align:'center'},
              {title: 'PGN请求ID的帧格式1', key: 122,dataIndex: 'frameFormat1', width: 150, align:'center',customRender:(text, record, index)=>{return record.text.frameFormatsText}},
              {title: 'PGN请求ID1', key: 123,dataIndex: 'pgnId1', width: 120, align:'center',customRender:(text, record, index)=>{return record.text.pgnIdsText}},
              {title: 'PGN请求数据长度1', key: 124,dataIndex: 'pgnDataLength1', width: 140, align:'center'},
              {title: 'PGN请求数据内容1', key: 125,dataIndex: 'pgnDataContent1', width: 140, align:'center'},
              {title: 'PGN请求ID的帧格式2', key: 126,dataIndex: 'frameFormat2', width: 150, align:'center',customRender:(text, record, index)=>{return record.text.frameFormatsText}},
              {title: 'PGN请求ID2', key: 127,dataIndex: 'pgnId2', width: 120, align:'center',customRender:(text, record, index)=>{return record.text.pgnIdsText}},
              {title: 'PGN请求数据长度2', key: 128,dataIndex: 'pgnDataLength2', width: 140, align:'center'},
              {title: 'PGN请求数据内容2', key: 129,dataIndex: 'pgnDataContent2', width: 140, align:'center'},
              {title: 'PGN请求ID的帧格式3', key: 130,dataIndex: 'frameFormat3', width: 150, align:'center',customRender:(text, record, index)=>{return record.text.frameFormatsText}},
              {title: 'PGN请求ID3', key: 131,dataIndex: 'pgnId3', width: 120, align:'center',customRender:(text, record, index)=>{return record.text.pgnIdsText}},
              {title: 'PGN请求数据长度3', key: 132,dataIndex: 'pgnDataLength3', width: 140, align:'center'},
              {title: 'PGN请求数据内容3', key: 133,dataIndex: 'pgnDataContent3', width: 140, align:'center'},
              {title: 'PGN请求ID的帧格式4', key: 134,dataIndex: 'frameFormat4', width:150, align:'center',customRender:(text, record, index)=>{return record.text.frameFormatsText}},
              {title: 'PGN请求ID4', key: 135,dataIndex: 'pgnId4', width: 120, align:'center',customRender:(text, record, index)=>{return record.text.pgnIdsText}},
              {title: 'PGN请求数据长度4', key: 136,dataIndex: 'pgnDataLength4', width: 140, align:'center'},
              {title: 'PGN请求数据内容4', key: 137,dataIndex: 'pgnDataContent4', width: 140, align:'center'},
              {title: 'PGN请求ID的帧格式5', key: 138,dataIndex: 'frameFormat5', width: 150, align:'center',customRender:(text, record, index)=>{return record.text.frameFormatsText}},
              {title: 'PGN请求ID5', key: 139,dataIndex: 'pgnId5', width: 120, align:'center',customRender:(text, record, index)=>{return record.text.pgnIdsText}},
              {title: 'PGN请求数据长度5', key: 140,dataIndex: 'pgnDataLength5', width: 140, align:'center'},
              {title: 'PGN请求数据内容5', key: 141,dataIndex: 'pgnDataContent5', width: 140, align:'center'},
              {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width:100,
                scopedSlots: { customRender: 'action' },
              },
            ],
            packdata:{}
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
    methods:{
      timeOverCallback(e){
          let val = e.target.value;
          val = val.replace(/[^\d]/g,'');
          if(val !== ''){val = Number(val);}
          this.setSubForm.timeOver= val;              
      },
      triedTimesCallback(e){
          let val = e.target.value;
          val = val.replace(/[^\d]/g,'');
          if(val !== ''){val = Number(val);}
          this.setSubForm.triedTimes= val;            
      },
      dele(key){
          this.tablepackData = this.tablepackData.filter((item)=>{
              return item.key != key
          })
      },
      edit(record){
          this.$refs.modalForm.edit(record);
          this.$refs.modalForm.title = '编辑';
      },
      add(){
          this.$refs.modalForm.add();
          this.$refs.modalForm.title = '新增';
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
      },
      selectTemp(val,option) {
        this.tablepackData = []
        if(!val){
          return ;
        }
        getParaData({'msstpMsstId':val,'pageNo':1,'pageSize':99999}).then(res=>{
          if(res.code==200){
            const list = res.result.records
            for (let i = 0; i < list.length; i++) {
              const data = list[i]
              var obj={
                "num":data.msstpId,
                "source": data.msstpSendproperty,//来源
                "packageNum": data.msstpPackagenum,//发送包数
                "frequency": data.msstpPackagegap,//多包与多包之间的间隔
                "sendTypeKind": data.msstpSendtype,//发送类别
                "timingSend": data.msstpSendgap,//定时发送间隔
                "frameFormat": data.msstpFrameformat,//PGN ID的帧格式
                "isDataId": data.msstpIsdataid,//有无数据ID
                "pgnId": data.msstpPgnid,//PGN ID
                "dataIdLength": data.msstpDataidlength,//数据ID长度
                "dataIdBegin": data.msstpDataidbegin,//数据ID起始字节
                "dataId": data.msstpDataid,//数据ID

                "frameFormat1":data.msstpPackageFrameformat1,
                "pgnId1":data.msstpPackagePgnid1,
                "pgnDataContent1":data.msstpPackagePgndatacontent1,
                "pgnDataLength1":data.msstpPackagePgndatalength1+'',

                "frameFormat2":data.msstpPackageFrameformat2,
                "pgnId2":data.msstpPackagePgnid2,
                "pgnDataContent2":data.msstpPackagePgndatacontent2,
                "pgnDataLength2":data.msstpPackagePgndatalength2+'',

                "frameFormat3":data.msstpPackageFrameformat3,
                "pgnId3":data.msstpPackagePgnid3,
                "pgnDataContent3":data.msstpPackagePgndatacontent3,
                "pgnDataLength3":data.msstpPackagePgndatalength3+'',

                "frameFormat4":data.msstpPackageFrameformat4,
                "pgnId4":data.msstpPackagePgnid4,
                "pgnDataContent4":data.msstpPackagePgndatacontent4,
                "pgnDataLength4":data.msstpPackagePgndatalength4+'',

                "frameFormat5":data.msstpPackageFrameformat5,
                "pgnId5":data.msstpPackagePgnid5,
                "pgnDataContent5":data.msstpPackagePgndatacontent5,
                "pgnDataLength5":data.msstpPackagePgndatalength5+'',
              }
              let tableDataTemp = {
                    ...obj,
                    key:data.msstpId,
                    text:this.$refs.modalForm.textFilter(obj)
                }
                this.tablepackData.push(tableDataTemp)
            }
            this.setSubForm.unitCount = list.length
          }
        })
      },
      getTempData(){
        getTempData({'pageNo':1,'pageSize':99999}).then((response)=>{
          const data= response;
          if(data.code==200){
            this.tempData = data.result.records
          }
        })
      },
        getPGNInfo(){
            getPGNInfo().then((response)=>{
                const data= response;
                if(data.code==200){
                    this.pgnIds=data.pgn_list
                }

            })
        },
        //有无数据ID
        isDataIdChange(val){
            // val = val.data
            if(val==1){
                this.packRules.dataIdLength[0].required=true
                this.packRules.dataIdBegin[0].required=true
                this.packRules.dataId[0].required=true
            }else{
                this.packRules.dataIdLength[0].required=false
                this.packRules.dataIdBegin[0].required=false
                this.packRules.dataId[0].required=false
            }
        },
        addPackage() {
          let unitCount =  this.setSubForm.unitCount;
          if(unitCount !== ''){
            unitCount = Number(unitCount);
            if([0,255].includes(unitCount)){
              this.$message.error('值为0，255，254添加多包无效，请直接提交！')
            }else if(!(unitCount >=0 && unitCount<=250 || unitCount === 255)){
              this.$message.error('取值范围0-250或255的整数')
            }else if (this.tablepackData.length >= unitCount) {
              this.$message.error('已超出PGN参数ID个数限制')
            } else {
              this.add();
            }
          }else{
            this.$message.error('请输入PGN参数ID个数')
          }
        },
        filterTableArr(arr){
          let unitSet = [];
          let sendDataPackage = [];
          arr.forEach((item) => {
            let obj = {};
            obj.source = item.source;
            obj.sendType = item.sendType;
            obj.packageNum = item.packageNum;
            obj.frequency = item.frequency;
            obj.timingSend = item.timingSend;
            obj.frameFormat = item.frameFormat;
            obj.isDataId = item.isDataId;
            obj.pgnId = item.pgnId;
            obj.dataIdLength = item.dataIdLength;
            obj.dataIdBegin = item.dataIdBegin;
            obj.dataId = item.dataId;
            sendDataPackage = [
              {frameFormat:item.frameFormat1,pgnId:item.pgnId1,pgnDataLength:item.pgnDataLength1,pgnDataContent:item.pgnDataContent1},
              {frameFormat:item.frameFormat2,pgnId:item.pgnId2,pgnDataLength:item.pgnDataLength2,pgnDataContent:item.pgnDataContent2},
              {frameFormat:item.frameFormat3,pgnId:item.pgnId3,pgnDataLength:item.pgnDataLength3,pgnDataContent:item.pgnDataContent3},
              {frameFormat:item.frameFormat4,pgnId:item.pgnId4,pgnDataLength:item.pgnDataLength4,pgnDataContent:item.pgnDataContent4},
              {frameFormat:item.frameFormat5,pgnId:item.pgnId5,pgnDataLength:item.pgnDataLength5,pgnDataContent:item.pgnDataContent5},
            ]
            obj.sendDataPackage = sendDataPackage.splice(0, +item.packageNum)
            unitSet.push(obj)
          })
          return unitSet;
        },
        onSubmit(){
          this.$refs.setUnitForm.validate(valid => {
            if(valid){
              try{
                if (this.tablepackData.length > 250) {
                  this.$message.error('已超出多包限制,请删除部分多包')
                  return ;
                }
              return new Promise(() => {
                let data = {
                  systemCode: kmxCode(this.recordData.vcl_dictvb_id),
                  accountName: this.userInfo.realname,
                  accountPwd: '123',
                  jsonVersion: '1.0',
                  infoid: 'F1',
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
                      infoId: 'F1',
                      seqNo: '000000',
                      unitCount: this.setSubForm.unitCount,
                      unitSet:this.filterTableArr(this.tablepackData)
                    }
                  }
                }
                console.log(data)
                sendCommMessage(data).then((res) => {
                  if (res.code == 200) {
                    this.$message.success(res.message)
                  } else {
                    this.$message.error(res.message)
                  }
                }).catch(error => {
                  this.$message.error('读取失败')
                })
              }).catch((e)=>{console.log(e)})
              }catch(e){console.log(e)}
              
            }
          })
        },

    }
}
</script>
<style lang="scss">

    .s-send-unit-box{
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
        .list-0{
            display: flex;
            flex-wrap: wrap;
            .item-0{
                display: flex;
                flex-basis: 50%;
                padding: 0;
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

