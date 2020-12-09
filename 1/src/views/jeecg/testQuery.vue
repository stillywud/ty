<template>
  <div style="">
    <div class="table-page-search-wrapper" style="z-index: 2;">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8" style="width: 46%;">
            <a-form-item label="选择地址:">
              <a-select v-model="select.databases" placeholder="请选择地址">
                <a-select-option class="radioGroup" v-for="(i, index) in databases" :key="index" :value="index">{{ i }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="sqlDiv" style="z-index: 2;">
      <div style="display: inline-block;width: 80%;">
        <a-form>
          <a-form-item label="查 询 sql   " :labelCol="labelCol" :wrapperCol="wrapperCol" >
            <div class="coder-cust-height">
              <j-code-editor
                ref="codeEditor"
                language="sql"
                placeholder="请输入SQL语句"
                :language-change="false"
                :lineNumbers="false"
                :fullScreen="true"
                @input="handleInputCgbSql"></j-code-editor>
            </div>
            <a-textarea   :hidden="true" v-decorator="['cgbSql']"/>
          </a-form-item>
        </a-form>
      </div>
      <div class="queryButtom">
        <a-button type="primary" @click="issearchQuery && searchQuery()" icon="search" :style="{background: colorQuery}">{{ buttonName }}</a-button>
        <div><pre style="margin-bottom: 0em;">    </pre></div>
      </div>
    </div>


    <div >
      <div class="ant-table ant-table-scroll-position-left ant-table-middle ant-table-bordered ant-table-empty">
        <div class="ant-table-content"><!---->
          <div class="ant-table-body" style="overflow:scroll;width: 100%;" v-show="!isShow">
            <table class="lecteh" oncopy="alert('对不起，数据不能复制！');return false;" style="-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;">
              <colgroup>
                <col class="ant-table-selection-col">
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
              </colgroup>
              <thead class="ant-table-thead">
                <tr id="theadth">
                </tr>
              </thead>
              <tbody class="ant-table-tbody">
                <tr class="ant-table-row ant-table-row-level-0" data-row-key="1295269605844635650" :key="index" v-for=" (data2, index) in tablettbody">
                  <td class="" style="text-align: center;" :key="ins" v-for="(d, ins) in data2" v-if="ins!='d1231231323'&&ins!='c12312313331113444'" :title="d" >{{d | ellipsis }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="ant-table-placeholder" v-show="isShow">
            <div class="ant-empty ant-empty-normal">
              <div class="ant-empty-image">
                <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                    <ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                    <g fillRule="nonzero" stroke="#D9D9D9">
                      <path
                        d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                      <path
                        d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                        fill="#FAFAFA"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <p class="ant-empty-description" id="message">{{ message }}</p></div>
          </div>
        </div>
      </div>
      <ul unselectable="unselectable" class="ant-pagination mini ant-table-pagination">
        <li class="ant-pagination-total-text">{{ (tablePage - 1) * tableSize }}-{{ tablePage * tableSize }} 共{{ tablePageSize }}条</li>
        <li title="上一页" aria-disabled="true" class="ant-pagination-prev" @click="prevPage"><a
          class="ant-pagination-item-link"><i aria-label="图标: left" class="anticon anticon-left">
          <svg
            viewBox="64 64 896 896"
            data-icon="left"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class="">
            <path
              d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
          </svg>
        </i></a></li>

        <li v-if="tablePage-2>1?true:false" @click="jumpBlurIn(1)" title="1" tabindex="0" class="ant-pagination-item ant-pagination-item-1"><a>1</a></li>
        <li v-if="tablePage-2>1?true:false"  @click="jumpBlurFront" title="向前 5 页" tabindex="0" class="ant-pagination-jump-prev ant-pagination-jump-prev-custom-icon">
          <a class="ant-pagination-item-link">
            <div class="ant-pagination-item-container">
              <i aria-label="图标: double-left" class="anticon anticon-double-left ant-pagination-item-link-icon">
                <svg viewBox="64 64 896 896" data-icon="double-left" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
                  <path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"></path>
                </svg>
              </i>
              <span class="ant-pagination-item-ellipsis">•••</span>
            </div>
          </a>
        </li>

        <li v-for="(i, index) in pageAll" :key="index" :title="i" tabindex="0"  class="ant-pagination-item" :class="i==tablePage?'ant-pagination-item-active':''" @click="jumpBlurIn(i)"><a>{{ i }}</a></li>


        <li v-if="tablePage+2<maxPages?true:false" @click="jumpBlurAfter" title="向后 5 页" tabindex="0" class="ant-pagination-jump-next ant-pagination-jump-next-custom-icon">
          <a class="ant-pagination-item-link"><div class="ant-pagination-item-container">
            <i aria-label="图标: double-right" class="anticon anticon-double-right ant-pagination-item-link-icon">
              <svg viewBox="64 64 896 896" data-icon="double-right" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
                <path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"></path>
              </svg>
            </i>
            <span class="ant-pagination-item-ellipsis">•••</span>
          </div>
          </a>
        </li>

        <li v-if="tablePage+2<maxPages?true:false" @click="jumpBlurIn(maxPages)" :title="maxPages" tabindex="0" class="ant-pagination-item ant-pagination-item-50"><a>{{maxPages}}</a></li>

        <li title="下一页" aria-disabled="true" class=" ant-pagination-next" @click="nextPage"><a
          class="ant-pagination-item-link"><i aria-label="图标: right" class="anticon anticon-right">
          <svg
            viewBox="64 64 896 896"
            data-icon="right"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class="">
            <path
              d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
          </svg>
        </i></a></li>
        <li class="ant-pagination-options">
          <a-select defaultValue="10 条/页"  @change="v=>{handleChangeSelect(v,index)}">
            <a-select-option class="radioGroup" v-for="(i, index) in pageTexts" :key="index" :value="index">{{ i }}
            </a-select-option>
          </a-select>
        </li>

        <li class="ant-pagination-options">
          <div class="ant-pagination-options-quick-jumper">跳至<input type="text" @blur="jumpBlur" id="jumpBlurPage">页</div>
        </li>
      </ul>
      <div v-show="tableCover" style="width: 88.5%;background-color:#ffffff;position: absolute;opacity: 0.5;z-index: 0;"  :style="tablettbody.length<=10?'height: 58%;top: 34%;':'height: 85%;top: 12%;'">
        <div style="margin-left: 50%;margin-top: 15%;">
          <div class="ant-spin ant-spin-spinning">
              <span class="ant-spin-dot ant-spin-dot-spin">
              <i class="ant-spin-dot-item"></i>
              <i class="ant-spin-dot-item"></i>
              <i class="ant-spin-dot-item"></i>
              <i class="ant-spin-dot-item"></i>
              </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //引入发送get请求方法
  import {initDictOptions, filterDictText} from '@/components/dict/JDictSelectUtil'
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  import { getAction , postAction } from '@/api/manage'
  import JCodeEditor from '@/components/jeecg/JCodeEditor.vue'

  export default {
    components: { initDictOptions, ATextarea,JCodeEditor },
    created() {

      this.initDictConfig();

    },
    data() {
      return {
        url: '/query/operate/query',//查询数据后台
        select: {},//数据库类型
        params: {},//查询参数
        keywordUrl: '/query/operate/getTykeywordinfo',//数据库关键字初始化后台
        operatequeryconfigUrl: '/query/operate/getTime',//超时时间初始化后台
        databaseUrl: '/query/operate/queryDatabase',//初始化数据库信息后台
        filterFieldUrl: '/query/operate/filterFieldinfo',
        querySql: '',//sql语句
        databaseData: [],//数据库信息
        id: this.$route.query.id,//数据申请表id

        tabletthead: [],//数据列表表头
        tableData: [],//查询出的总数据
        tablettbody: [],
        tableCover:false,//遮罩层

        tableSize: 10,//列表显示数据条数
        tablePage: 1,//当前页数
        tablePageSize: 0,//总页数
        pageAll:[],//显示页数
        pageTexts:['10 条/页','20 条/页','30 条/页'],
        maxPages:0,

        mysqlKeyword: [],//mysql关键字
        sqlserverKeyword: [],//sqlserver关键字


        queryTime: 0,//超时时间
        gdqueryTime: 0,//超时时间
        dbqueryTime: 0,//后台超时时间
        queryTimeFun: null,//查询时间倒计时

        issearchQuery: true,//是否可以点击查询
        isShow: false,//是否显示（查询结果提示）
        colorQuery: '#40a9ff',//查询按钮样式
        message: '暂无数据',//查询结果提示
        buttonName: '查询',//查询按钮上的显示

        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        databases: [],//数据库下拉数据selecrfrom
        dataBaseDictOptions: []
      }
    },
    mounted: function  () {
      //数据申请id
      if (this.id == null){
        this.id = '';
      }

      //初始化数据库关键字数据
      getAction(this.keywordUrl).then((res) => {
        if (res.success && res.result != null && res.result.length !== 0) {
          let mysqlkey = [];
          let sqlserverkey = [];
          for (let key in res.result) {
            if (res.result[key].kwtype == '1') {
              mysqlkey.push(' ' + res.result[key].kwcontent + ' ');
            } else if (res.result[key].kwtype == '2') {
              sqlserverkey.push(' ' + res.result[key].kwcontent + ' ');
            }
          };
          this.mysqlKeyword = mysqlkey;
          this.sqlserverKeyword = sqlserverkey;
        }
      })
      //初始化超时时间
      getAction(this.operatequeryconfigUrl).then((res) => {
        if (res.success && res.result != null && res.result.length !== 0) {
          this.queryTime = res.result.exectime;
          this.gdqueryTime = res.result.opertime;
          this.dbqueryTime = res.result.exectime;
        }
      })

    },
    methods: {
      //查询数据
      searchQuery: function() {//查询sql
        let sql = this.querySql.trim().toUpperCase();
        if(this.select.databases==null){
          this.$message.error('请选择数据库');
          return true;
        }
        if(sql.indexOf(";")+1==sql.length){
          sql = sql.replace(';','');
        }
        sql = ' '+sql+' ';
        let IP = this.databaseData[this.select.databases].serverip;
        let NAME = this.databaseData[this.select.databases].databasename;
        let TYPE = this.databaseData[this.select.databases].databasetype;
        let id = this.id;
        let databaseId = this.databaseData[this.select.databases].id;
        let historyState = 1;
        //验证
        if (this.verification(TYPE, sql,NAME)) {
          return;
        }
        this.tablePage = 1;
        if(this.params.historyState!=null){
          if(sql == this.params.sql && IP == this.params.ip && TYPE == this.params.type && NAME == this.params.name){
            historyState = this.params.historyState;
          }
        }
        postAction(this.filterFieldUrl,{'databaseId':databaseId,'sql':sql}).then((res) => {
          if (res.success) {
            for(let i=0;i<res.result.length;i++){
              console.log(res.result[i]);
              if(sql.indexOf(res.result[i])!=-1){
                this.$message.error('错误：‘'+res.result[i]+'’是敏感数据无法查询！');
                return;
              }
            }
          }
        })
        this.params = {'sql': sql, 'applyid': id, 'databaseId': databaseId, 'time': this.dbqueryTime, 'page': this.tablePage, 'pageSize': this.tableSize, 'historyState':historyState,'time': this.dbqueryTime}
        //按钮置灰
        this.buttonName = '查询（' + this.gdqueryTime + ')';
        this.colorQuery = '#788896';
        this.issearchQuery = false;
        this.queryTimeFun = setInterval(this.setButtonName, 1000);
        //查询
        this.visitbackstage(this.params);
      },
      prevPage: function() {//上一页
        if (this.tablePage === 1) {
          return;
        }
        this.tablePage = this.tablePage - 1;
        this.params.page = this.tablePage;
        this.visitbackstage(this.params);
      },
      nextPage: function() {//下一页
        if (this.tablePage >= this.tablePageSize / this.tableSize) {
          return;
        }
        if (this.tablePage < this.tablePageSize / this.tableSize) {
          this.tablePage = this.tablePage + 1;
          this.params.page = this.tablePage;
        }
        this.visitbackstage(this.params);
      },
      jumpBlur: function() {//跳转
        let str = document.getElementById('jumpBlurPage').value;
        let regPos = /^[0-9]+.?[0-9]*/;
        let pageNum = Math.ceil(this.tablePageSize / this.tableSize);
        if (regPos.test(str)) {
          this.tablePage = Number(str) >= pageNum ? pageNum : Number(str);
          this.params.page = this.tablePage;
          this.visitbackstage(this.params);
        }
      },
      jumpBlurIn: function(str) {//跳转
        let regPos = /^[0-9]+.?[0-9]*/;
        let pageNum = Math.ceil(this.tablePageSize / this.tableSize);
        if (regPos.test(str)) {
          this.tablePage = Number(str) >= pageNum ? pageNum : Number(str);
          this.params.page = this.tablePage;
          this.visitbackstage(this.params);
        }
      },
      jumpBlurFront: function(){
        if(this.tablePage-5<=0){
          this.tablePage=1;
        }else{
          this.tablePage=this.tablePage-5;
        }
        this.params.page = this.tablePage;
        this.visitbackstage(this.params);
      },
      jumpBlurAfter: function(){
        if(this.tablePage+5>=this.maxPages){
          this.tablePage=this.maxPages;
        }else{
          this.tablePage=this.tablePage+5;
        }
        this.params.page = this.tablePage;
        this.visitbackstage(this.params);
      },
      verification: function(TYPE, sql,NAME) {//验证
        let message = '';
        if(sql.trim().length<=0){
          this.$message.error('请输入要执行的sql');
          return true;
        }
        let vsql = sql.trim()
        if(vsql.indexOf(";")!=-1&&vsql.indexOf(";")+1!=vsql.length){
          this.$message.error('“;”附近有语法错误');
          return true;
        }
        if(TYPE === '1'){
          let values = vsql.split( / FROM | JOIN |\\*FROM /);
          for(let i=1;i<values.length;i++){
            let va = values[i].trim().split(" ");
            if(va[0].indexOf(".")!=-1){
              this.$message.error('“.”附近有语法错误');
              return true;
            }
          }
        }else if(TYPE === '2'){
          let values = vsql.split( / FROM | JOIN |\\*FROM /);
          for(let i=1;i<values.length;i++){
            let va = values[i].trim().split(" ");
            if(va[0].indexOf("[")!==-1&&va[0].indexOf("]")!==-1){
              let dn = va[0].substring(va[0].indexOf("[")+1,va[0].indexOf("]"));
              if(dn !== NAME.toUpperCase()){
                this.$message.error('不允许跨库查询');
                return true;
              }
            }
          }
        }
        if (TYPE === '1') {
          this.mysqlKeyword.forEach((e) => {
            if (sql.indexOf(e.toUpperCase()) !== -1) {
              if (message.length !== 0) {
                message += ',';
              }
              message += e;
            }
          })
        } else if (TYPE === '2') {
          this.sqlserverKeyword.forEach((e) => {
            if (sql.indexOf(e.toUpperCase()) !== -1) {
              if (message.length !== 0) {
                message += ',';
              }
              message += e;
            }
          })
        }
        if (message.length !== 0) {
          this.$message.error('不允许的关键字:' + message);
          return true;
        }
      },
      visitbackstage: function(params){//查询后台数据并赋值
        this.tableCover = true;
        postAction(this.url, params).then((res) => {
          clearInterval(this.queryTimeFun);//结束查询超时
          this.returnData(res);
          this.params.historyState = this.params.historyState+1;
          this.buttonName = '查询';
          this.queryTime = this.dbqueryTime;
          this.issearchQuery = true;
          this.colorQuery = '#40a9ff';
          this.tableCover = false;
        })
      },
      returnData: function(res) {//数据列表赋值
        if (res.success && !this.isNull(res.result)&& !this.isNull(res.result.data.length)) {//查询成功
          let isarr = '';
          for (let key in res.result.data[0]) {
            if(key == 'c12312313331113444'|| key == 'd1231231323'){
              continue;
            }
            isarr += '<th class="ant-table-align-center" style="text-align: center;" :key="index" v-for=" (d, index) in tabletthead"><span\n' +
              '                    class="ant-table-header-column"><div><span class="ant-table-column-title">' + key + '</span><span\n' +
              '                    class="ant-table-column-sorter"></span></div></span></th>';
          };
          //赋值
          document.getElementById('theadth').innerHTML = isarr;
          this.tabletthead = isarr;
          this.tableData = res.result.data;
          this.tablettbody = res.result.data.slice(0, this.tableSize);
          let pageAlls = [];
          let maxSize = Math.ceil(res.result.count/ this.tableSize);
          for(let a=0;a < 5;a++){
            if(this.tablePage==1||this.tablePage==2||this.tablePage==3){
             if(a+1<=maxSize){
               pageAlls.push(a+1);
             }
            }else{
              if(a+this.tablePage-2<=maxSize){
                if(a+this.tablePage-2>0){
                  pageAlls.push(a+this.tablePage-2);
                }
              }
            }
          }
          if(maxSize<this.tablePage){
            this.tablePage = maxSize;
            this.params.page = this.tablePage;
            this.visitbackstage(this.params);
          }
          if(this.tablePage-2>1){
            this.isFront = true;
          }
          if(maxSize-2>this.tablePage){
            this.isAfter = true;
          }
          this.maxPages = maxSize;
          this.pageAll=pageAlls;
          this.tablePageSize = res.result.count;
          this.isShow = false;
        } else if (res.code === 500) {//查询出错
          this.isShow = true;
          this.message = "系统提示 "+res.message;
        } else {//其他
          this.isShow = true;
          this.message = '暂无数据';
        }
      },
      handleChangeSelect: function(v,index){
        this.tableSize = (v+1)*10;
        if(this.tablePageSize == 0){
          return;
        }
        if(this.params.databaseId!=null){
          this.params.pageSize = this.tableSize;
          this.visitbackstage(this.params);
        }
      },
      isNull: function(ret){
        return ret == null || ret.length==0;
      },
      initDictConfig() {
        initDictOptions('databaseType').then((res) => {
          if (res.success) {
            this.dataBaseDictOptions = res.result;
            //初始化数据库信息
            getAction(this.databaseUrl,{ 'id': this.id }).then((res) => {
              if (res.success && res.result != null && res.result.length !== 0) {
                let databaseArray = [];
                for (let key in res.result) {
                  //'申请原因:'+res.result[key].appreason+
                  let baseType  = filterDictText(this.dataBaseDictOptions, res.result[key].databasetype);
                  databaseArray.push('IP:' + res.result[key].serverip + ', 数据库名称:' + res.result[key].databasename + ', 数据库类型:' +  baseType);
                }
                this.databases = databaseArray;
                this.databaseData = res.result;
              }else{
                this.isShow = true;
                this.message = '系统提示：该时间没有数据库操作申请！';
                this.issearchQuery = false;
                this.colorQuery = '#788896';
              }
            })
          }
        });
      },
      handleInputCgbSql(value) {//sql语句
        this.querySql = value
      },
      setButtonName: function() {//改变查询按钮样式

        if (this.queryTime > this.gdqueryTime) {//未超时
          this.queryTime = this.queryTime - 1;
          this.buttonName = '查询（' + (this.queryTime-(this.dbqueryTime-this.gdqueryTime)) + ')';
        }else  if(this.queryTime > 0){
          this.isShow = true;
          this.message = '正在查询！请等待...';
          this.buttonName = '查询';
          this.queryTime = this.queryTime - 1;
          this.issearchQuery = true;
          this.colorQuery = '#40a9ff';
          this.cancel = true;
          this.tableCover = false;
          this.pageAll = [];
          this.maxPages = 0;
          this.tablePage = 1;
          this.tablePageSize = 0;
        }else {//已超时
          this.isShow = true;
          this.buttonName = '查询';
          this.queryTime = this.gdqueryTime;
          this.message = '查询超时！'
          this.issearchQuery = true;
          this.colorQuery = '#40a9ff';
          this.cancel = true;
          this.tableCover = false;
          this.pageAll = [];
          this.maxPages = 0;
          this.tablePage = 1;
          this.tablePageSize = 0;
          clearInterval(this.queryTimeFun);
        }
      }
    },
    filters: {//数据列表过滤过长字段
      ellipsis (value) {
        if (!value) return ''
        if (value.length > 40) {
          return value.slice(0, 40) + '...'
        }
        return value
      }
    }

  }</script>
<style>
  .lecteh > thead > tr > th, .lecteh > tbody > tr > td {
    min-width: 100px;
    max-width: 400px;
  }
  .sqlDiv{
    width: 77%;
  }
  .queryButtom{
    display: inline-block;
  }
  .sqlDiv  >  div  > form > div  > .ant-col-sm-4{
    width: 7.5%;
    text-align: left;
  }
  .sqlDiv  >  div  > form > div  > .ant-col-sm-16{
    width: 91.666667%;
  }
  /*.ant-col-sm-4{
    width: 6.666667%;
  }

  .ant-col-sm-16{
    width: 92.666667%;
  }*/
</style>
