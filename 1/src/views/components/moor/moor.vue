<template>
<div id="body">
    <div id="softphonebar" style="position: relative;" v-if="isLogin">
            <div class="mrg5" id="peerStatus">
                <span id="phoneAgentStatus">
                    <a href="#" @click="m7SetBusy(0)" id="IdleDisable" class="IdleDisable userStatus" style="color: #53d466;">
                        <span class="ponit" style="background-color: #53d466;"></span>空闲
                        <span class="line"></span>
                    </a>
                    <a href="#" @click="m7SetBusy(2)" id="RestDisable" class="RestDisable userStatus">
                        <span class="ponit"></span>小休
                        <span class="line"></span>
                    </a>
                    <a href="#" @click="m7SetBusy(1)" id="BusyDisable" class="BusyDisable userStatus">
                        <span class="ponit"></span>忙碌
                        <span class="line"></span>
                    </a>
                    <span id="phoneConfigStatus"></span>
                </span>
                <span class="softphone_timer">
                    <span id="softphonebar.peerState" style="margin-left: 10px"></span>
                    <span id="softphonebar.peerTimeState" class="peerTimeState">00:00:00</span>
                </span>
            </div>
            <div class="mrg5" id="callStatus">
                <input type="text" id="moorCall-dialout-input" placeholder="输入手机号" value=""
                @keydown="watchPhone($event)" class="ipt fl"  v-model="phoneNum"/>
                <ul id="callStatusList">
                    <li>
                        <a href="#" class="DialEnable" id="DialEnable" @click="dialout('')" >外呼
                            <span class="icon outcallIcon"></span>
                        </a>
                        <a href="#" class="DialDisable disable" id="DialDisable" style="display: none">外呼
                            <span class="icon outcallIcon"></span>
                        </a>
                    </li>
                    <li style="display:none">
                        <a href="#" class="DialEnable" id="smallDialEnable" style="width: 102px;" @click="dialout('smallPhone')" >小号外呼
                            <span class="icon outcallIcon"></span>
                        </a>
                        <a href="#" class="DialDisable disable" id="smallDialDisable" style="display: none;width: 102px;">小号外呼
                            <span class="icon outcallIcon"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="HangupEnable" id="HangupEnable" style="display: none"
                            @click="hangup">挂机
                            <span class="icon handupIcon"></span>
                        </a>
                        <a href="#" class="HangupDisable disable" id="HangupDisable">挂机
                            <span class="icon handupIcon"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="HoldEnable" id="HoldEnable" style="display: none"
                            @click="hold">保持
                            <span class="icon holdIcon"></span>
                        </a>
                        <a href="#" class="HoldDisable disable" id="HoldDisable">保持
                            <span class="icon holdIcon"></span>
                        </a>
                        <a href="#" class="HoldGetEnable" id="HoldGetEnable" style="display: none"
                            @click="unhold">继续
                            <span class="icon holdIcon"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="TransferEnable" id="TransferEnable" style="display: none"
                            @click="m7ToTransfer">
                            转移<span class="icon transferIcon"></span>
                        </a>
                        <a href="#" class="TransferDisable disable" id="TransferDisable">
                            转移<span class="icon transferIcon"></span>
                        </a>
                        <a href="#" class="TransferEnable" id="ConsultTransferEnable" style="display: none"
                            @click="transfer">
                            转移<span class="icon transferIcon"></span>
                        </a>
                        <a href="#" class="TransferDisable" id="ConsultTransferDisable" style="display: none">
                            转移<span class="icon transferIcon"></span>
                        </a>
					</li>                 
                </ul>
            </div>
			<div id="netMessage"></div>
			
	</div>
	<div v-else>
		<a href="#" @click="login">重新登录</a>
	</div>
	<a-modal v-model="loading" @cancel="cancelFunc">
		<div id="hollyc5.loading.message">
			{{loadMessage}}
		</div>
		<div>
			<a-button @click="m7exCancelConsult(consultNum)" v-if="isConsult">取消咨询</a-button>
		</div>
		<slot name="footer"></slot>
	</a-modal>

	<a-modal v-model="m7Loading" @cancel="m7cancelFunc">
		<div id="hollyc5.loading.message">
			<div v-if="connectType == 'transfer'">
				<a-input v-model="phoneNum" placeholder='请输入手机号或工号' onKeyDown="m7exTransfer(phoneNum,$event)"></a-input>
				<a-button  @click="m7exTransfer(phoneNum)">转接</a-button>
		    </div>
            <div v-if="connectType == 'consult'">
				<a-input v-model="phoneNum" placeholder='请输入手机号或工号' onKeyDown="m7exConsult(phoneNum,$event)"></a-input>
				<a-button  @click="m7exConsult(phoneNum)">咨询</a-button>
		     </div>
		</div>
		<slot name="footer"></slot>
	</a-modal>

</div>
</template>
<script>
/**
 * 容联工具条组件
 */
import {moorlogin,moorlogout,moorring,moorafterPhone,softphoneBar,phone,catchError,catchSuccess,catchLoading,catchInput} from '@/views/components/moor/m7Mix.js'
export default {
   name: "moor",
   data(){
      return {
        phoneNum:'',
		isLogin:false,
		loading:false,
		loadMessage:'',
		isConsult:false,
		consultNum:'',
		connectType:'',
		m7Loading:false
      }
   },
   mounted(){
		//初始化
		this.init();
   },
   beforeDestroy(){
	    console.log('logout')
		//退出登录
		moorlogout()
   },
   methods:{
	   //初始化
	   init(){
		   	//容联登录
	        this.login();
		     //绑定容联错误消息回调
			catchError((message)=>{
				this.$error({title:message})
			})
			//绑定容联成功消息回调
			catchSuccess((message)=>{
				this.$success({title:message})
			})
			//自定义loading弹窗
			catchLoading((message, parentId, obj)=>{
				this.loadMessage = message;
				this.loading = true;
				if (obj.type && obj.type == 'consult') {
					this.consultNum = obj.num;
				}
			})
			//绑定容联input回调
			catchInput(connectType=>{
				this.connectType = connectType;
				this.m7Loading = true;		
			})
		

	   },
	   //重新登录
	   login(){
			moorlogin('8001@tiany','a9rR9Oj58001','Local',"0",()=>{
				this.isLogin = true;
			});
	   },
	   //退出
	   logOut(){

	   },
       //设置坐席状态
       m7SetBusy(status){
          phone.m7SetBusy(false,status)
       },
       //呼出
       dialout(name){
        softphoneBar.dialout(this.phoneNum, name)
       },
       //挂断
       hangup(){
           phone.hangup()
       },
       //保持
       hold(){
           phone.hold();
       },
       //取消保持
       unhold(){
           phone.unhold();
       },
       //呼叫转移
       m7ToTransfer(){
       		softphoneBar.m7ToTransfer();
       },
       //呼叫转移
       transfer(){
        	phone.transfer('9333333','external', {})
	   },
	   //取消咨询
	   m7exCancelConsult(num){
			softphoneBar.m7exCancelConsult(num);
	   },
	   //转接
	   m7exTransfer(num,event){
		   if(event&&event.keyCode == 13){
			   softphoneBar.m7exTransfer(num);
		   }else{
			   softphoneBar.m7exTransfer(num);
		   }
	   },
	   //咨询
	   m7exConsult(num,event){
		   if(event&&event.keyCode == 13){
			   softphoneBar.m7exConsult(num);
		   }else{
			   softphoneBar.m7exConsult(num);
		   }
	   },
	   //取消方法
	   m7cancelFunc(){
			this.m7Loading = false;
			this.connectType = '';
	   },
	   //取消loading方法
	   cancelFunc(){
			this.consultNum = '';
			this.loadMessage = '';
			this.isConsult = false;

	   },
       //监听电话变化
       watchPhone(event){
			if(event.keyCode == 13){
				softphoneBar.dialout(this.phoneNum)
			}
       }
   }
}
</script>
<style scoped>
#softphonebar {
	height:160px;
	margin: 10px;
}
.mrg5 {
	margin: 20px;
}

.clear1, .clear2, .clear5, .clear10 {
	overflow: hidden;
	clear: both;
}

.clear1{
	height:1px;
}

.clear2{
	height:2px;
}

.clear5{
	height:5px;
}

.clear10{
	height:10px;
}

.fl {
	float: left;
}

.fr {
	float: right;
}
.peerTimeState {
	color: #74dc83;
	margin-left: 10px;
}

.userStatus {
	color: #8a8a8a;
	text-decoration: none;
}
.ponit {
	width: 6px;
	height: 6px;
	display: inline-block;
	border-radius: 50%;
	background-color: #8a8a8a;
	margin-right: 5px;
	margin-bottom: 1px;
}
.line {
	height: 10px;
	width: 1px;
	margin: 0px 10px;
	display: inline-block;
	background-color: #cccccc;
}
#callStatus {
	clear: both;
	overflow: hidden;
}
#callStatus .ipt {
	width:240px;
	height:30px;
	overflow: hidden;
	text-indent: 10px;
	padding-top: 4px;
}
#callStatus ul {
	float: left;
}
#callStatus ul li {
	float: left;
	list-style: none;
	margin-left: 10px;
}
#callStatus ul li a {
	display: inline-block;
	border-radius: 4px;
	background-color: #4DB690;
	width: 74px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	color: #ffffff;
	text-decoration: none;
}
#callStatus ul li .disable {
	display: inline-block;
	border-radius: 4px;
	background-color: #B2B2B2;
	width: 74px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	color: #ffffff;
}
#callStatus ul li :hover {
	cursor: pointer;
}
.icon {
	margin-top: 1px;
	margin-left: 7px;
	padding-left: 6px;
	width: 17px;
	height: 18px;
	display: inline-block;
}
table {
	border-bottom: 1px solid #cccccc;
	height:30px;
	line-height: 30px;
}
table tr td {
	font-weight: normal;
	color: #424242;
}
.first-tr td{
	font-weight: bold;
}
.operation {
	color: #4DB690;
	text-decoration: none;
}
.dialoutBox {
	position: absolute;
	top: 0;
	background: #f2f2f2;
	filter: progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75);
	opacity: 0.6;
	left: 0;
	z-index: 10000;
}
.dialoutCenterBox {
	border-radius: 6px;
	background: #ffffff;
	position: absolute;
	font: 12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif;
	text-Align: left;
	line-height: 25px;
	z-index: 10001;
}

.logo {
	text-align: center;
	padding-top: 80px;
}
.content {
	position: relative;
	padding: 50px 20px 20px 42px;
	height: 317px;
	width: 360px;
	margin: 30px auto;
	background-color: #ffffff;
	border-radius: 4px;
	box-shadow: 1px 2px 3px 2px RGBA(0, 0, 0, 0.06);
	box-sizing: border-box;
}
.content input {
	border-radius: 4px;
	border: 1px solid #cbcbcb;
	width: 280px;
	height: 36px;
	/*text-indent: 6px;*/
	margin-bottom: 25px;
	padding-left: 44px;
	box-sizing: border-box;
}
.content select {
	width: 280px;
	height: 36px;
	border: 1px solid #cbcbcb;
	border-radius: 4px;
}
.conLabel {
	display: block;
	margin-bottom: 10px;
	font-weight: bold;
}
.content .login {
	width: 280px;
	height: 42px;
	color: #ffffff;
	text-align: center;
	display: block;
	margin-top: 12px;
	line-height: 42px;
	text-decoration: none;
	border-radius: 4px;
	background-color: RGBA(77, 182, 144, 1);
}
.dialoutCenterBox .confirm {
	color: #ffffff;
	background-color: #4DB690;
	width: 52px;
	height: 30px;
	display: block;
	line-height: 30px;
	text-decoration: none;
	border-radius: 4px;
	margin-left: 30px;
}
#cover{
	position:absolute;
	left:0px;
	top:0px;
	background-color:#000000;
	width:100%;
	height:100%;
	filter:alpha(opacity=60);
	opacity:0.6;
	display:none;
	z-Index:999;
}
.ipt {
	float: left;
	margin-left:5px;
	height: 28px;
	text-indent: 4px;
	border: 1px solid #ccc
}
.btn {
	float: left;
	margin-left: 5px;
	color: #ffffff;
	background-color: #4DB690;
	border: 1px solid;
	padding: 6px 10px;
	margin-top: 1px
}
.chooseStatusBtn {
	display: none;
}
.chooseStatusBtnLabel {
	width: 40px;
	height: 20px;
	display: inline-block;
	border-radius: 20px;
	position: relative;
	background-color: #4DB690;
	overflow: hidden;
	vertical-align: middle;
}
.chooseStatusBtnLabel:before {
	content: '';
	position: absolute;
	right: 0;
	width: 20px;
	height: 20px;
	display: inline-block;
	border-radius: 20px;
	background-color: #fff;
	z-index: 20;
	-webkit-transition: all 0.5s;
	transition: all 0.5s;
}
.chooseStatusBtn:checked + label.chooseStatusBtnLabel:before {
	right: 20px;
}
.chooseStatusBtn:checked + label.chooseStatusBtnLabel {
	background-color: #c1c1c1;
}
.loginTap {
	clear: both;
	overflow: hidden;
	height: 30px;
	line-height: 30px;
	margin-top: 15px;
}
.loginTap .conLabelLogin {
	font-size: 14px;
}
.loginTap #icc-login-loginType {
	width: 66px;
	height: 30px;
	border: none;
	outline: none;
	font-size: 14px;
}
.loginTapContent {
	float: left;
}
.statusBtn {
	float: right;
	margin-right: 35px;
}
</style>