<template>
  <el-dialog :visible='showApplsit' width="100%" fullscreen custom-class="appListDialog" @close='close' title="App列表设计">
    <div class="appmain" style="height:100%; border: 1px solid #eee">
      <el-container style="height:100%">
        <el-container class="center-container" direction="vertical" style="border-left:0">
          <el-main class="widget-main" id="widget-main" ref="widgetMain" style="position:relative;">
            <van-search v-model='keyword' :placeholder=" '请输入'+KeywordList.join('/')" show-action>
              <template #action>
                <van-icon name='filter-o' size='20' color='#1890FF' @click="handleToggleSearch"></van-icon>
              </template>
            </van-search>
            <div v-show="toggleSearchStatus" position='right' class="draw-cont">
              <van-icon name='close' size='20' @click="toggleSearchStatus = !toggleSearchStatus"
                        style="position:absolute;right: 10px;top:10px;cursor:pointer"></van-icon>
              <el-form ref="filters" label-position="top">
                <div v-for="item in fieldList" :key="item.id">
                  <el-form-item v-if="item.appQueryConfigFlag == 1" :key="item.id" :label='item.dbFieldTxt'>
                    <el-date-picker
                        type="date"
                        :placeholder="'请输入'+item.dbFieldTxt"
                        v-model="queryParam[item.dbFieldName]"
                        v-if="item.appQueryShowType == 'date'"
                        style="width:100%"
                        popper-class="applist_date">
                    </el-date-picker>
                    <el-date-picker
                        type="datetime"
                        v-model="queryParam[item.dbFieldName]"
                        :placeholder="'请输入'+item.dbFieldTxt"
                        v-if="item.appQueryShowType == 'datetime'"
                        style="width:100%"
                        popper-class="applist_date">
                    </el-date-picker>
                    <el-select allowClear v-model="queryParam[item.dbFieldName]" v-if="item.appQueryShowType == 'list'"
                               style="width:100%">
                      <el-option v-for="(el, key) in item.options" :key="key" :value="el.value">
                          <span style="display: inline-block;width: 100%;" :title=" el.text || el.label ">
                            {{ el.text || el.label }}
                          </span>
                      </el-option>
                    </el-select>
                    <el-input v-if="item.appQueryShowType == 'text'" :placeholder="'请输入'+item.dbFieldTxt"
                              v-model="queryParam[item.dbFieldName]"></el-input>
                  </el-form-item>
                </div>
              </el-form>
              <div class="flexRow draw-footer">
                <el-button type='primary' size="mini" icon='el-icon-search'
                           @click="toggleSearchStatus = !toggleSearchStatus">查询
                </el-button>
                <el-button type='primary' size="mini" icon='el-icon-refresh-right'
                           @click="toggleSearchStatus = !toggleSearchStatus">重置
                </el-button>
              </div>
            </div>
            <div class="pageCont" :style="{'height':pageHeight,'overflow': 'auto','padding': '0 15px'}">
              <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    style="margin: 0px 0px"
                    @load="onLoad"
                    :immediate-check='false'>
                  <van-cell :border='false'
                            style="margin-top:10px">
                    <div v-for="item in fieldList" :key="item.id">
                      <div v-if="item.appShowFlag == 1"
                           :style="{'fontSize': item.styleFontSize+'px','fontWeight': item.styleFontWeight==1?'bold': 'normal'}">
                        {{item.dbFieldTxt}}:{{item.dbDefaultVal}}
                      </div>
                    </div>
                  </van-cell>
                </van-list>
              </van-pull-refresh>
            </div>

          </el-main>
        </el-container>
        <el-aside class="widget-config-container">
          <el-tabs class="widget-app" stretch>
            <el-tab-pane label='卡片设置' class="config-content">
              <el-form ref="cardForm" label-position="left" class="form-config-container"
                       v-bind:style="{height: viewHeight+'px'}">
                <draggable tag="ul" :list="fieldList"
                           v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                           handle=".drag-item">
                  <li v-for="(item, index) in fieldList" :key="index+'item'" class="el-form-item">
                    <div class="flexRow flexStart" style="line-height: 32px;">
                      <i class="drag-item" style="font-size: 16px;margin: 0 2px;cursor: move;"><i
                          class="iconfont icon-bars"></i></i>
                      <div class="flexRow" style="flex:1">
                        <label>{{item.dbFieldTxt}}</label>
                        <el-switch v-model="item.appShowFlag" :active-value="1" :inactive-value="0"></el-switch>
                      </div>
                    </div>
                    <div class="j-p-tip flexRow" style="line-height: 18px;">
                      <span>{{item.dbFieldName}}</span>
                      <a class="edit-link" v-show='item.appShowFlag == 1'
                         @click="changeStyle(item)">编辑样式
                      </a>
                    </div>
                  </li>
                </draggable>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label='模糊搜索' class="config-content">
              <el-form ref="searchForm" label-position="left" class="form-config-container"
                       v-bind:style="{height: viewHeight+'px'}">
                <el-form-item v-for="item in fieldList" :key="item.id">
                  <div class=" flexRow">
                    <label>{{item.dbFieldTxt}}</label>
                    <el-switch v-model="item.appKeywordFlag" :active-value="1" :inactive-value="0"></el-switch>
                  </div>
                  <p class="j-p-tip flexRow">{{item.dbFieldName}}
                  </p>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label='条件筛选' class="config-content">
              <el-form ref="filterForm" label-position="left" class="form-config-container"
                       v-bind:style="{height: viewHeight+'px'}">
                <el-form-item v-for="item in fieldList" :key="item.id">
                  <div class=" flexRow">
                    <label>{{item.dbFieldTxt}}</label>
                    <el-switch v-model="item.appQueryConfigFlag" :active-value="1" :inactive-value="0"></el-switch>
                  </div>
                  <p class="j-p-tip flexRow">
                    <span>{{item.dbFieldName}}</span>
                    <a class="edit-link" v-show='item.appQueryConfigFlag' @click="changeFilter(item)">编辑</a>
                  </p>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-aside>
      </el-container>
      <app-set-dialog ref='AppSetDialog' :visible='showSetDialog' @closeDialog='closeDialog'
                      @confirmDialog='confirmDialog'></app-set-dialog>
    </div>
    <span slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
  </el-dialog>

</template>

<script>
  import Vue from 'vue'
  import {List, PullRefresh, Cell, Form, Popup, Search, Icon, Field} from 'vant'

  Vue.use(List).use(PullRefresh).use(Cell).use(Form).use(Popup).use(Search).use(Icon).use(Field)
  import {getOnlineFormFieldList, getMainTableDictItems} from '@/api'
  import AppSetDialog from './components/AppSetDialog'
  import JLineSwitch from '@/components/jeecg/JLineSwitch'
  import Draggable from 'vuedraggable'

  export default {
    name: 'Appindex',
    props: {
      cgform: {
        type: Object,
        default: null
      },
      widgetForm: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        viewHeight: 0,
        showApplsit: false,
        id: null,
        pageHeight: 0,
        keyword: '',
        queryParam: {},
        loading: false,
        finished: false,
        refreshing: false,
        dataSource: [],
        defColumns: [],
        dictOptions: {},
        queryInfo: [],
        toggleSearchStatus: false,
        fieldList: [],
        showSetDialog: false,
        KeywordList: []
      }
    },
    components: {
      AppSetDialog,
      JLineSwitch,
      Draggable
    },
    watch: {
      cgform: {
        deep: true,
        handler(val) {
          if (typeof val === 'object') {
            this.id = val.id
            this.getFieldList()
            console.log('cgform1', this.cgform)
          }
        }
      },
      fieldList: {
        handler(val) {
          for (let i = 0; i < val.length; i++) {
            if (val[i].appKeywordFlag == 1) {
              console.log(val[i].dbFieldTxt, 11, val.indexOf(val[i].dbFieldTxt))
              if (this.KeywordList.indexOf(val[i].dbFieldTxt) == -1) {
                this.KeywordList.push(val[i].dbFieldTxt)
              }
            } else {
              console.log(val[i].dbFieldTxt, 22, this.KeywordList.indexOf(val[i].dbFieldTxt))
              if (this.KeywordList.indexOf(val[i].dbFieldTxt) > -1) {
                this.KeywordList.splice(this.KeywordList.indexOf(val[i].dbFieldTxt), 1)
              }
            }
          }
          console.log(this.KeywordList)
        },
        deep: true
      }
    },
    created() {
      this.pageHeight = (667 - 54) + 'px'
    },
    mounted() {
      this.viewHeight = window.innerHeight - 240
      console.log('cgform2', this.cgform)
      if (this.cgform) {
        this.id = this.cgform.id
        this.getFieldList()
      }
    },
    methods: {
      init() {
        this.showApplsit = true
      },
      getFieldList() {
        getOnlineFormFieldList({headId: this.cgform.id}).then((res) => {
          console.log('--onlineList-列表数据', res)
          console.log(this.widgetForm.appList, '--onlapplistineList-列表数据')
          if (res.success) {
            // this.fieldList =  Object.assign([], res.result)
            let data = Object.assign([], res.result)
            let map = {}
            data.map((key, i) => {
              map[key.id] = key
            });
            console.log(map)
            if(this.widgetForm && this.widgetForm.appList && this.widgetForm.appList.length > 0 ){
              for (let n = 0; n < this.widgetForm.appList.length; n++) {
                let e = this.widgetForm.appList[n]
                if (!map[e.id]) {
                  this.widgetForm.appList.splice(n, 1)
                } else {
                  e.dbFieldTxt = map[e.id].dbFieldTxt
                  e.dbFieldName = map[e.id].dbFieldName
                  let el = Object.assign({}, e)
                  this.fieldList.push(el)
                  delete map[e.id]
                }
              }
            }
            for (let m in map) {
              console.log(map[m],22,map[m].appKeywordFlag)
              let el = Object.assign({}, map[m])
              el.appKeywordFlag = 0
              el.appQueryConfigFlag = 0
              el.appShowFlag = 0
              this.fieldList.push(el)
            }
            console.log(this.fieldList, 'this.fieldList')
          }
        })
      },
      handleToggleSearch() {
        this.toggleSearchStatus = !this.toggleSearchStatus
      },
      changeStyle(data) {
        this.$refs.AppSetDialog.init(data, 0)
        this.showSetDialog = true
      },
      changeFilter(data) {
        this.$refs.AppSetDialog.init(data, 1)
        this.showSetDialog = true
      },
      closeDialog() {
        this.showSetDialog = false
      },
      confirmDialog(data) {
       
        this.showSetDialog = false
      },
      close() {
        this.fieldList = []
        this.showApplsit = false
        console.log(this.widgetForm.appList, this.filter)
        this.$emit('changeWidgetForm', this.widgetForm.appList)
      },
      confirm() {
        console.log(this.fieldList)
        this.showApplsit = false
        let data = Object.assign([], this.fieldList)
        console.log(data)
        this.$emit('changeWidgetForm', data)
        this.fieldList = []
      },
      onLoad() {
        setTimeout(() => {
          if (this.refreshing) {
            this.queryParam = {}
            this.dataSource = []
            // this.loadData(1)
            this.refreshing = false
          } else {
            // this.loadData()
          }
        }, 1000)
      },
      onRefresh() {
        // 清空列表数据
        this.finished = false
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true
        this.onLoad()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .fm2-container {
    .el-container {
      height: auto !important;
    }
  }

  .widget-main {
    margin: 10px auto;
    width: 377px;
    height: 669px;
    border: 1px solid #eee;
    background-color: #f7f8fa;
  }

  .flexRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flexStart {
    justify-content: flex-start;
  }

  //  j-p-tip

  .draw-cont {
    height: 100%;
    width: 80%;
    position: absolute;
    right: 0;
    top: 0;
    padding: 30px 10px;
    z-index: 1;
    background-color: #fff;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .draw-footer {
    width: 100%;
    padding: 10px;
    position: absolute;
    bottom: 0;
    left: 0
  }

  .edit-link {
    line-height: 18px;
    color: #1989fa;
    cursor: pointer;
    padding-right: 5px;
  }

  .widget-config-container .config-content {
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
<style>

  .applist_date.el-date-picker {
    width: 290px !important;
  }

  .applist_date.el-date-picker .el-picker-panel__content {
    width: 260px !important;
  }

  .applist_date.el-date-picker .el-time-panel {
    width: 140px !important;
  }

  .widget-app .el-tabs__header {
    margin: 0 0 0px;
  }
</style>
