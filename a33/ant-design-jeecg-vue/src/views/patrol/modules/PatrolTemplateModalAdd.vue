<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    fullscreen
    @cancel="handleCancel"
    :footer="null">
    <div class="xjbox">
      <a-row v-if="visible" type="flex" style="height: 100%;border:solid 1px #ebedf0;">
        <!--模板设置-->
        <a-col style="height: 100%;width: calc(100% - 360px);text-align: center;">
          <div style="line-height: 80px;">模板设置</div>

          <div class="xj-temp-set-box">
            <div class="xj-group-box">
              <label style="color: red;">*</label><label>模板编码</label>
              <a-input :disabled="id != undefined" placeholder="请输入模板编码" v-model="xjTemplateData.category_code" style="margin:10px 0;"/>
            </div>
            <a-divider style="height: 5px;margin:0;"></a-divider>
            <!--基础信息-->
            <div class="xj-group-box">
              <label class="xj-group-box-title">基础信息</label>
              <!--基础信息控件-->
              <div>
                <div @click.stop="comClick(baseCom)" v-for="baseCom in xjTemplateData.data.base_info.elements" :class="[baseCom.id === xjActiveComId?'xj-component-box-active':'xj-component-box']" :key="baseCom.id">
                  <a-icon @click.stop="delCom(xjTemplateData.data.base_info.elements,baseCom)" v-show="baseCom.id === xjActiveComId" type="delete" style="float:right;" /><br>
                  <x-j-text v-if="baseCom.type === 'text'" :xjdata="baseCom"></x-j-text>
                  <x-j-number v-else-if="baseCom.type === 'number'" :xjdata="baseCom"></x-j-number>
                  <x-j-radio v-else-if="baseCom.type === 'radio'" :xjdata="baseCom"></x-j-radio>
                  <x-j-check-box v-else-if="baseCom.type === 'checkbox'" :xjdata="baseCom"></x-j-check-box>
                  <x-j-date v-else-if="baseCom.type === 'yyyy-MM-dd'" :xjdata="baseCom"></x-j-date>
                  <x-j-date-time-minute v-else-if="baseCom.type === 'yyyy-MM-dd HH:mm'" :xjdata="baseCom"></x-j-date-time-minute>
                  <x-j-single-image v-else-if="baseCom.type === 'singleimage'" :xjdata="baseCom"></x-j-single-image>
                  <x-j-multiple-image v-else-if="baseCom.type === 'multipleimage'" :xjdata="baseCom"></x-j-multiple-image>
                  <x-j-single-video v-else-if="baseCom.type === 'singlevideo'" :xjdata="baseCom"></x-j-single-video>
                  <x-j-multiple-video v-else-if="baseCom.type === 'multiplevideo'" :xjdata="baseCom"></x-j-multiple-video>
                  <x-j-timer v-else-if="baseCom.type === 'timer'" :xjdata="baseCom"></x-j-timer>
                </div>
              </div>
              <!--添加-->
              <div style="text-align: center;margin-top: 10px;">
                <a-dropdown>
                  <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                    添加 <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a href="javascript:;" @click="addText(xjTemplateData.data.base_info.elements)">文本</a>
                    </a-menu-item>
<!--                    <a-menu-item>-->
<!--                      <a href="javascript:;" @click="addNumber(xjTemplateData.data.base_info.elements)">数字输入框</a>-->
<!--                    </a-menu-item>-->
<!--                    <a-menu-item>-->
<!--                      <a href="javascript:;" @click="addRadio(xjTemplateData.data.base_info.elements)">单选</a>-->
<!--                    </a-menu-item>-->
<!--                    <a-menu-item>-->
<!--                      <a href="javascript:;" @click="addCheckBox(xjTemplateData.data.base_info.elements)">多选</a>-->
<!--                    </a-menu-item>-->
<!--                    <a-menu-item>-->
<!--                      <a href="javascript:;" @click="addDateTimeMinute(xjTemplateData.data.base_info.elements)">日期时间</a>-->
<!--                    </a-menu-item>-->
<!--                    <a-menu-item>-->
<!--                      <a href="javascript:;" @click="addDate(xjTemplateData.data.base_info.elements)">日期</a>-->
<!--                    </a-menu-item>-->
<!--                    <a-menu-item>-->
<!--                      <a href="javascript:;" @click="addSingleImage(xjTemplateData.data.base_info.elements)">单张图片</a>-->
<!--                    </a-menu-item>-->
<!--                    <a-menu-item>-->
<!--                      <a href="javascript:;" @click="addMultipleImage(xjTemplateData.data.base_info.elements)">多张图片</a>-->
<!--                    </a-menu-item>-->
<!--                    <a-menu-item>-->
<!--                      <a href="javascript:;" @click="addSingleVideo(xjTemplateData.data.base_info.elements)">单个视频</a>-->
<!--                    </a-menu-item>-->
<!--                    <a-menu-item>-->
<!--                      <a href="javascript:;" @click="addMultipleVideo(xjTemplateData.data.base_info.elements)">多个视频</a>-->
<!--                    </a-menu-item>-->
<!--                    <a-menu-item>-->
<!--                      <a href="javascript:;" @click="addTimer(xjTemplateData.data.base_info.elements)">计时器</a>-->
<!--                    </a-menu-item>-->
                  </a-menu>
                </a-dropdown>
              </div>
            </div>
            <a-divider style="height: 5px;margin:0;"></a-divider>

            <!--巡检信息-->
            <div>
              <a-tabs v-model="activeKey" hideAdd type="editable-card" @edit="onEdit" @tabClick="tabClick">
                <template slot="tabBarExtraContent">
                  <label @click.stop="addTabPane" class="xj-label-btn" style="margin-right: 20px;">添加标签</label>
                </template>
                <a-tab-pane v-for="(xjGroup,index) in xjTemplateData.data.check_group" :key="xjGroup.group_id" :closable="index > 0">
  <!--                style="background-color: #F6FCFF"-->
                  <span slot="tab">
                    {{ xjGroup.group_name }}
                  </span>

                  <!--巡检分组-->
                  <div v-for="cardObj in xjGroup.components" @click.stop="groupClick(cardObj)" :class="[cardObj.component_id === xjActiveComId?'xj-component-box-active':'xj-component-box', 'xj-card']" :key="cardObj.component_id">
                    <div style="height: 40px;line-height:40px;border-bottom: solid 1px #ebedf0;">
                      <label class="xj-group-box-title">{{ cardObj.component_name }}</label>
                      <a-icon @click.stop="delGroup(xjGroup.components,cardObj)" type="close" style="float: right;line-height:40px;cursor: pointer;" />
                    </div>
                    <div style="padding: 10px 0;">
                      <div @click.stop="comClick(baseCom)" v-for="baseCom in cardObj.elements" :class="[baseCom.id === xjActiveComId?'xj-component-box-active':'xj-component-box']" :key="baseCom.id">
                        <a-icon @click.stop="delCom(cardObj.elements,baseCom)" v-show="baseCom.id === xjActiveComId" type="delete" style="float:right;" /><br>
                        <x-j-text v-if="baseCom.type === 'text'" :xjdata="baseCom"></x-j-text>
                        <x-j-number v-else-if="baseCom.type === 'number'" :xjdata="baseCom"></x-j-number>
                        <x-j-radio v-else-if="baseCom.type === 'radio'" :xjdata="baseCom"></x-j-radio>
                        <x-j-check-box v-else-if="baseCom.type === 'checkbox'" :xjdata="baseCom"></x-j-check-box>
                        <x-j-date v-else-if="baseCom.type === 'yyyy-MM-dd'" :xjdata="baseCom"></x-j-date>
                        <x-j-date-time-minute v-else-if="baseCom.type === 'yyyy-MM-dd HH:mm'" :xjdata="baseCom"></x-j-date-time-minute>
                        <x-j-single-image v-else-if="baseCom.type === 'singleimage'" :xjdata="baseCom"></x-j-single-image>
                        <x-j-multiple-image v-else-if="baseCom.type === 'multipleimage'" :xjdata="baseCom"></x-j-multiple-image>
                        <x-j-single-video v-else-if="baseCom.type === 'singlevideo'" :xjdata="baseCom"></x-j-single-video>
                        <x-j-multiple-video v-else-if="baseCom.type === 'multiplevideo'" :xjdata="baseCom"></x-j-multiple-video>
                        <x-j-timer v-else-if="baseCom.type === 'timer'" :xjdata="baseCom"></x-j-timer>
                      </div>
                    </div>
                    <!--添加-->
                    <div style="text-align: center;margin-top: 10px;">
                      <a-dropdown>
                        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                          添加 <a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                          <a-menu-item>
                            <a href="javascript:;"  @click="addText(cardObj.elements)">文本</a>
                          </a-menu-item>
                          <a-menu-item>
                            <a href="javascript:;" @click="addNumber(cardObj.elements)">数字输入框</a>
                          </a-menu-item>
                          <a-menu-item>
                            <a href="javascript:;" @click="addRadio(cardObj.elements)">单选</a>
                          </a-menu-item>
                          <a-menu-item>
                            <a href="javascript:;" @click="addCheckBox(cardObj.elements)">多选</a>
                          </a-menu-item>
                          <a-menu-item>
                            <a href="javascript:;" @click="addDateTimeMinute(cardObj.elements)">日期时间</a>
                          </a-menu-item>
                          <a-menu-item>
                            <a href="javascript:;" @click="addDate(cardObj.elements)">日期</a>
                          </a-menu-item>
                          <a-menu-item>
                            <a href="javascript:;" @click="addSingleImage(cardObj.elements)">单张图片</a>
                          </a-menu-item>
                          <a-menu-item>
                            <a href="javascript:;" @click="addMultipleImage(cardObj.elements)">多张图片</a>
                          </a-menu-item>
                          <a-menu-item>
                            <a href="javascript:;" @click="addSingleVideo(cardObj.elements)">单个视频</a>
                          </a-menu-item>
                          <a-menu-item>
                            <a href="javascript:;" @click="addMultipleVideo(cardObj.elements)">多个视频</a>
                          </a-menu-item>
                          <a-menu-item>
                            <a href="javascript:;" @click="addTimer(cardObj.elements)">计时器</a>
                          </a-menu-item>
                        </a-menu>
                      </a-dropdown>
                    </div>
                  </div>
                  <!--添加分组-->
                  <div style="text-align: center;line-height:30px;margin:20px 0;">
                    <label class="xj-label-btn" @click.stop="addGroup(xjGroup.components)">添加分组</label>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
          </div>
          <div style="text-align: center;line-height: 80px;">
            <a-button type="primary" style="margin-right: 60px;" @click="openPreview">
              预览
            </a-button>
            <a-button type="primary" @click="saveTemplate">
              完成
            </a-button>
          </div>
        </a-col>

        <!--属性-->
        <a-col style="border-left: solid 1px #ebedf0;height: 100%;width:360px;">
          <div style="border-bottom: solid 1px #ebedf0;line-height: 40px;padding: 0 20px;">
            属性设置
            <label style="float: right;color: #a1a1a1">{{ xjActiveTypeText }}</label>
          </div>
          <div xj-box="proBox" style="padding: 20px 20px;">
            <x-j-text-pros v-if="xjActiveType === 'text'" :xjpro="nowPros"></x-j-text-pros>
            <x-j-number-pros v-else-if="xjActiveType === 'number'" :xjpro="nowPros"></x-j-number-pros>
            <x-j-radio-pros v-else-if="xjActiveType === 'radio'" :xjpro="nowPros"></x-j-radio-pros>
            <x-j-check-box-pros v-else-if="xjActiveType === 'checkbox'" :xjpro="nowPros"></x-j-check-box-pros>
            <x-j-date-time-minute-pros v-else-if="xjActiveType === 'yyyy-MM-dd HH:mm'" :xjpro="nowPros"></x-j-date-time-minute-pros>
            <x-j-date-pros v-else-if="xjActiveType === 'yyyy-MM-dd'" :xjpro="nowPros"></x-j-date-pros>
            <x-j-single-image-pros v-else-if="xjActiveType === 'singleimage'" :xjpro="nowPros"></x-j-single-image-pros>
            <x-j-multiple-image-pros v-else-if="xjActiveType === 'multipleimage'" :xjpro="nowPros"></x-j-multiple-image-pros>
            <x-j-single-video-pros v-else-if="xjActiveType === 'singlevideo'" :xjpro="nowPros"></x-j-single-video-pros>
            <x-j-multiple-video-pros v-else-if="xjActiveType === 'multiplevideo'" :xjpro="nowPros"></x-j-multiple-video-pros>
            <x-j-timer-pros v-else-if="xjActiveType === 'timer'" :xjpro="nowPros"></x-j-timer-pros>
            <x-j-card-pros v-else-if="xjActiveType === 'card'" :xjpro="nowPros"></x-j-card-pros>
            <x-j-tab-pros v-else-if="xjActiveType === 'tab'" :xjpro="nowPros"></x-j-tab-pros>
          </div>
        </a-col>
      </a-row>
      <patrol-template-preview ref="addPreviewModal"></patrol-template-preview>
    </div>
  </j-modal>
</template>

<script>

  import { httpAction,getAction } from '@/api/manage'
  import JDate from '@/components/jeecg/JDate'
  import XJText from "../xjcom/XJText";
  import XJTextPros from "../xjcom/XJTextPros";
  import XJNumber from "../xjcom/XJNumber";
  import XJNumberPros from "../xjcom/XJNumberPros";
  import XJRadio from "../xjcom/XJRadio";
  import XJRadioPros from "../xjcom/XJRadioPros";
  import XJCheckBox from "../xjcom/XJCheckBox";
  import XJCheckBoxPros from "../xjcom/XJCheckBoxPros";
  import XJDate from "../xjcom/XJDate";
  import XJDatePros from "../xjcom/XJDatePros";
  import XJDateTimeMinute from "../xjcom/XJDateTimeMinute";
  import XJDateTimeMinutePros from "../xjcom/XJDateTimeMinutePros";
  import XJSingleImage from "../xjcom/XJSingleImage";
  import XJSingleImagePros from "../xjcom/XJSingleImagePros";
  import XJMultipleImage from "../xjcom/XJMultipleImage";
  import XJMultipleImagePros from "../xjcom/XJMultipleImagePros";
  import XJSingleVideo from "../xjcom/XJSingleVideo";
  import XJSingleVideoPros from "../xjcom/XJSingleVideoPros";
  import XJMultipleVideo from "../xjcom/XJMultipleVideo";
  import XJMultipleVideoPros from "../xjcom/XJMultipleVideoPros";
  import XJTimer from "../xjcom/XJTimer";
  import XJTimerPros from "../xjcom/XJTimerPros";
  import XJTabPros from "../xjcom/XJTabPros";
  import XJCardPros from "../xjcom/XJCardPros";

  import PatrolTemplatePreview from "./PatrolTemplatePreview";
  import {randomUUID} from "../../../utils/util";

  export default {
    name: "PatrolTemplateModalAdd",
    components: {
      XJCheckBoxPros,
      JDate,
      XJText,
      XJTextPros,
      XJNumber,
      XJNumberPros,
      XJRadio,
      XJRadioPros,
      XJCheckBox,
      XJDate,
      XJDatePros,
      XJDateTimeMinute,
      XJDateTimeMinutePros,
      XJSingleImage,
      XJSingleImagePros,
      XJMultipleImage,
      XJMultipleImagePros,
      XJSingleVideo,
      XJSingleVideoPros,
      XJMultipleVideo,
      XJMultipleVideoPros,
      XJTimer,
      XJTimerPros,
      XJTabPros,
      XJCardPros,
      PatrolTemplatePreview
    },
    data () {
      return {
        id:undefined,
        title:"操作",
        width:1000,
        visible: false,
        confirmLoading: false,
        url: {
          addTemplate: "/patrol/patrolTemplate/addTemplate",
          queryById: "/patrol/patrolTemplate/queryById",
          editTemplate: "/patrol/patrolTemplate/editTemplate"
        },
        // 巡检模板数据
        xjTemplateData:{
          category_code:"",
          template_version:"",
          data:{
            base_info:{
              title:"基本信息",
              elements:[
              ]
            },
            check_group:[
              { group_id: randomUUID(), group_name:"标题", components:[] }
            ]
          }
        },
        xjActiveComId: "",
        xjActiveType: "",
        nowPros: undefined,
        activeKey: undefined,
      }
    },
    created () {
    },
    methods: {
      add () {
        Object.assign(this.$data, this.$options.data());
        this.id = undefined;
        this.visible = true;
        this.activeKey = this.xjTemplateData.data.check_group[0].group_id;
      },
      edit (record) {
        Object.assign(this.$data, this.$options.data());
        this.id = record.id;
        this.xjTemplateData.category_code = record.categoryCode;
        this.visible = true;
        const that = this
        getAction(that.url.queryById,{ id: this.id }).then((res)=>{
          if(res.success){
            if(res.result.templateJson != null){
              this.xjTemplateData = JSON.parse(res.result.templateJson)
              this.activeKey = this.xjTemplateData.data.check_group[0].group_id;
            }
            else {
              that.$message.warning("未获取到模板数据");
            }
          }else{
            that.$message.warning(res.message);
          }
        }).finally(() => {
          that.confirmLoading = false;
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        that.confirmLoading = false;
        that.close();
      },
      handleCancel () {
        this.close()
      },
      // 删除标签
      onEdit(targetKey, action) {
        this[action](targetKey);
      },
      // 添加标签
      addTabPane() {
        let checkGroup = this.xjTemplateData.data.check_group;
        let groupObj = { group_id: randomUUID(), group_name:"标题", components:[] };
        checkGroup.push(groupObj);
        this.activeKey = groupObj.group_id;
        this.xjActiveType = "tab";
        this.nowPros = groupObj;
      },
      // 删除标签
      remove(targetKey) {
        let checkGroups = this.xjTemplateData.data.check_group;
        let delIndex = undefined;
        for(let i=0;i<checkGroups.length;i++){
          if (checkGroups[i].group_id === targetKey) {
            checkGroups.splice(i,1);
            delIndex = i;
            break;
          }
        }
        if(this.activeKey === targetKey) {
          this.activeKey = checkGroups[delIndex-1].group_id;
          if(this.xjActiveType === "tab") {
            this.xjActiveType = "";
            this.nowPros = undefined;
          }
        }
      },
      // 点击标签
      tabClick(key) {
        this.xjActiveComId = "";
        // this.activeKey = key;
        this.xjActiveType = "tab";
        let checkGroup = this.xjTemplateData.data.check_group;
        let groupObj = undefined;
        for(let i=0;i<checkGroup.length;i++) {
          if(checkGroup[i].group_id === key) {
            groupObj = checkGroup[i];
            break;
          }
        }
        this.nowPros = groupObj;
      },
      // 点击组件
      comClick(baseComJSON) {
        this.xjActiveComId = baseComJSON.id;
        this.xjActiveType = baseComJSON.type;
        this.nowPros = baseComJSON;
      },
      // 删除组件
      delCom(parentObj,comJson) {
        let arr = parentObj;
        for(let i=0;i<arr.length;i++){
          if(arr[i].id === comJson.id) {
            arr.splice(i,1);
            break;
          }
        }
        this.xjActiveComId = "";
        this.xjActiveType = "";
        this.nowPros = undefined;
      },
      // 添加组件
      addComBase(parentObj,comTempJSON) {
        parentObj.push(comTempJSON);
        this.xjActiveComId = comTempJSON.id;
        this.xjActiveType = comTempJSON.type;
        this.nowPros = comTempJSON;
      },
      // 添加文本
      addText(parentObj) {
        let textTempJSON = { id: randomUUID(), type:"text", name:"标题", title:"请输入",business_key:"", max_length: null, required:0,readonly:0,　value:""};
        this.addComBase(parentObj,textTempJSON);
      },
      // 添加数字输入框
      addNumber(parentObj) {
        let numberTempJSON = { id: randomUUID(), type:"number", name:"标题", title:"请输入数字", min: null, max: null, required:0, value: null};
        this.addComBase(parentObj,numberTempJSON);
      },
      // 添加单选框
      addRadio(parentObj) {
        let radioTempJSON = { id: randomUUID(),type:"radio", name:"标题", required:0, value: null,options:[{ id: randomUUID(),name:"选项"}, { id: randomUUID(), name: "选项"}] };
        this.addComBase(parentObj,radioTempJSON);
      },
      // 添加多选框
      addCheckBox(parentObj) {
        let checkBoxTempJSON = { id: randomUUID(),type:"checkbox", name:"标题", required:0, value: [],options:[{ id: randomUUID(),name:"选项"}, { id: randomUUID(), name: "选项"}] };
        this.addComBase(parentObj,checkBoxTempJSON);
      },
      // 添加日期时间-精确到分钟
      addDateTimeMinute(parentObj) {
        let dateTimeMinuteTempJSON = { id: randomUUID(),type:"yyyy-MM-dd HH:mm", name:"标题",title: "请选择时间", required:0, value: "" };
        this.addComBase(parentObj,dateTimeMinuteTempJSON);
      },
      // 添加日期
      addDate(parentObj) {
        let dateTempJSON = { id: randomUUID(),type:"yyyy-MM-dd", name:"标题",title: "请选择日期", required:0, value: "" };
        this.addComBase(parentObj,dateTempJSON);
      },
      // 添加单张图片
      addSingleImage(parentObj) {
        let singleImageTempJSON = { id: randomUUID(),type:"singleimage", max_size: null, required:0, value: {} };
        this.addComBase(parentObj,singleImageTempJSON);
      },
      // 添加多张图片
      addMultipleImage(parentObj) {
        let multipleImageTempJSON = { id: randomUUID(),type:"multipleimage", max_size: null, max_count: null, required:0, value: [] };
        this.addComBase(parentObj,multipleImageTempJSON);
      },
      // 添加单个视频
      addSingleVideo(parentObj) {
        let singleVideoTempJSON = { id: randomUUID(),type:"singlevideo", max_size: null,required:0, value: "" };
        this.addComBase(parentObj,singleVideoTempJSON);
      },
      // 添加多个视频
      addMultipleVideo(parentObj) {
        let multipleVideoTempJSON = { id: randomUUID(),type:"multiplevideo", max_size: null,max_count: null,required:0, value: [] };
        this.addComBase(parentObj,multipleVideoTempJSON);
      },
      // 添加计时器
      addTimer(parentObj) {
        let timerTempJSON = { id: randomUUID(),type:"timer",name:"标题", required:0, value: null };
        this.addComBase(parentObj,timerTempJSON);
      },
      // 添加分组
      addGroup(parentObj) {
        let groupTempJson = {
          component_id: randomUUID(),
          component_name: "标题",
          elements: []
        };
        parentObj.push(groupTempJson);
        this.xjActiveComId = groupTempJson.component_id;
        this.xjActiveType = "card";
        this.nowPros = groupTempJson;
      },
      // 删除分组
      delGroup(parentObj,cardObj) {
        let arr = parentObj;
        for(let i=0;i<arr.length;i++){
          if(arr[i].component_id === cardObj.component_id) {
            arr.splice(i,1);
            break;
          }
        }
        this.xjActiveComId = "";
        this.xjActiveType = "";
        this.nowPros = undefined;
      },
      // 点击组
      groupClick(cardObj) {
        this.xjActiveComId = cardObj.component_id;
        this.xjActiveType = "card";
        this.nowPros = cardObj;
      },
      // 完成
      saveTemplate() {
        if(this.xjTemplateData.category_code.trim() === "") {
          this.$message.error('模板编码不能为空');
        }
        else {
          const that = this
          console.log(JSON.stringify(this.xjTemplateData))
          let httpUrl = ""
          // 新增
          if(this.id === undefined){
            httpUrl = that.url.addTemplate
          }
          else { // 编辑
            httpUrl = that.url.editTemplate
          }
          httpAction(httpUrl,that.xjTemplateData,"POST").then((res)=>{
            if(res.success){
              that.$message.success(res.message);
              that.$emit('ok');
              that.close();
            }else{
              that.$message.warning(res.message);
            }
          }).finally(() => {
            that.confirmLoading = false;
          })
        }
      },
      // 预览
      openPreview() {
        this.$refs.addPreviewModal.openPreview(this.xjTemplateData,'preview')
      }
    },
    computed: {
      xjActiveTypeText: function () {
        switch (this.xjActiveType) {
          case "text":
            return "文本";
            break;
          case "radio":
            return "单选";
            break;
          case "checkbox":
            return "多选";
            break;
          case "singleimage":
            return "单张图片";
            break;
          case "multipleimage":
            return "多张图片";
            break;
          case "singlevideo":
            return "单个视频";
            break;
          case "multiplevideo":
            return "多个视频";
            break;
          case "timer":
            return "计时器";
            break;
          case "yyyy-MM-dd HH:mm":
            return "日期时间";
            break;
          case "yyyy-MM-dd":
            return "日期";
            break;
          case "number":
            return "数字输入框";
            break;
          case "card":
            return "分组";
            break;
          case "tab":
            return "标签";
            break;
          default:
            return "";
            break;
        }
      }
    }
  }
</script>

<style>
  .xjbox {
    width: 100%;
    height: 100%;
  }
  .xj-group-box {
    padding: 16px 10px;
  }

  .xj-group-box-title {
    margin-bottom: 10px;
    padding: 0 10px;
    display: inline-block;
  }

  .xjbox .ant-tabs.ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
    border-bottom: 2px solid #1890FF !important;
  }

  .xjbox .xj-label-btn {
    color: #1890FF;
    cursor: pointer;
  }

  .xjbox .ant-tabs-bar {
    margin: 0 0 0 0;
    border-bottom: 5px solid #e8e8e8;
    outline: none;
    transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .xjbox .ant-tabs-tab {
    height: auto!important;
  }

  .xj-card {
    border-bottom: solid 5px #e8e8e8!important;
    padding: 0 20px 16px 20px;
  }

  .xj-component-box-active{
    border: solid 1px #e8e8e8;
    background-color: #F6FCFF;
    padding:5px 10px 10px 10px;
  }

  .xj-component-box{
    padding:5px 10px 10px 10px;
  }

  .xj-temp-set-box {
    height: calc(100% - 160px);
    width: 400px;
    border: solid 1px #ebedf0;
    border-radius: 5px;
    margin:0 auto;
    text-align: left;
    overflow-y: auto;
  }

  .xjbox .ant-upload.ant-upload-select-picture-card {
    width: 76px;
    height: 76px;
  }
</style>