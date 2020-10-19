<template><!--/终端参数设置/-->
<div class="t-set-terminal-param-box">
    <div class="con-box">
        <ty-a-spin v-if="tyspining"/>
        <a-form-model
        ref="setSubForm" 
        :model="setSubForm" 
        :rules="setSubRules" 
        >
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
                    <a-form-model-item label="中心接收号" prop="rcvNo" class="item-0">
                    <a-input  v-model="setSubForm.rcvNo"
                                placeholder="请输入中心接收号"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="中心发送号" prop="sendNo" class="item-0">
                    <a-input  v-model="setSubForm.sendNo"
                                placeholder="请输入中心发送号"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="短信中心号码" prop="smsCenter" class="item-0">
                    <a-input  v-model="setSubForm.smsCenter"
                                placeholder="请输入短信中心号码设置"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="关机定时信息间隔" prop="keyoffInfoInterval" class="item-0">
                    <a-input  v-model="setSubForm.keyoffInfoInterval" 
                                placeholder="请输入关机定时信息间隔"
                                allow-clear>
                        <template #suffix>
                        <span class="suffix-1">(分)</span>
                        </template>         
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item  label="关机报警距离" prop="keyoffDistance" class="item-0">
                        <a-input  v-model="setSubForm.keyoffDistance" 
                                placeholder="请输入关机报警距离(米)"
                                allow-clear>
                        <template #suffix>
                        <span class="suffix-1">(米)</span>
                        </template>         
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="GPRS下载问询周期" prop="askCyc" class="item-0">
                    <a-input  v-model="setSubForm.askCyc"
                                placeholder="请输入GPRS下载问询周期"
                                allow-clear>
                        <template #suffix>
                        <span class="suffix-1">(秒)</span>
                        </template>         
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="信息传输方式" prop="infoTransPort" class="item-0">
                    <a-select  placeholder="请选择信息传输方式"
                                v-model="setSubForm.infoTransPort">
                        <a-select-option v-for="infoTransPort in infoTransPorts" :key="infoTransPort.key">{{infoTransPort.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="IP地址切换功能" prop="ipChange" class="item-0">
                    <a-select  v-model="setSubForm.ipChange">
                        <a-select-option v-for="ipChange in ipChanges" :key="ipChange.key">{{ipChange.value}} </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="IP连接错误上限次数"  prop="ipMaxConn" class="item-0">
                    <a-input  v-model="setSubForm.ipMaxConn"
                                placeholder="请输入IP连接错误上限次数"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="自动短信投递周期" prop="autoSmsCyc" class="item-0">
                    <a-input 
                                v-model="setSubForm.autoSmsCyc" placeholder="请输入自动短信投递周期(分)"
                                allow-clear>
                        <template #suffix>
                        <span class="suffix-1">(分)</span>
                    </template>         
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="CAN1波特率设置" prop="can1BaudRate" class="item-0">
                    <a-input 
                                v-model="setSubForm.can1BaudRate"
                                placeholder="请输入CAN1波特率设置"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="CAN2波特率设置" prop="can2BaudRate" class="item-0">
                    <a-input 
                                v-model="setSubForm.can2BaudRate"
                                placeholder="请输入CAN2波特率设置"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="CAN2插头复用功能设置" prop="can2PlugReuse" class="item-0">
                    <a-input 
                                v-model="setSubForm.can2PlugReuse"
                                placeholder="请输入CAN2插头复用功能设置"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="用户扩展信息" prop="userExtendInfo" class="item-0">
                    <a-input 
                                v-model="setSubForm.userExtendInfo" placeholder="请输入用户扩展信息"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="注册网络模式" prop="networkModel" class="item-0">
                    <a-select  v-model="setSubForm.networkModel" placeholder="请选择注册网络模式">
                        <a-select-option v-for="networkModel in networkModels" :key="networkModel.key"
                                        >{{networkModel.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="IMU设置" prop="imuSet" class="item-0">
                    <a-input  v-model="setSubForm.imuSet"
                                placeholder="请输入IMU设置"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="锁车类型" prop="lockCarType" class="item-0">
                    <a-select  v-model="setSubForm.lockCarType"
                    >
                        <a-select-option v-for="lockCarType in lockCarTypes" :key="lockCarType.key">{{lockCarType.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="时区配置" prop="timezoneConfig" class="item-0">
                    <a-select  v-model="setSubForm.timezoneConfig"
                                placeholder="请选择时区配置"
                    >
                        <a-select-option v-for="timezoneConfig in timezoneConfigs"
                                        :key="timezoneConfig.timezone_id">{{timezoneConfig.timezone_cityname}}</a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="开机滞留点半径" prop="stratingRetentionPointRadius" class="item-0">
                    <a-input  v-model="setSubForm.stratingRetentionPointRadius"
                            placeholder="请输入开机滞留点半径"
                            allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="开机滞留点起始时间" prop="stratingRetentionPointBeginTime" class="item-0">
                    <a-input  type="number" v-model="setSubForm.stratingRetentionPointBeginTime"
                            placeholder="请输入开机滞留点起始时间(分钟)" allow-clear
                    >
                        <template #suffix>
                        <span class="suffix-1">(分)</span>
                        </template>         
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="GPS定位异常起始时间" prop="localExceptionStartTime" class="item-0">
                    <a-input  v-model="setSubForm.localExceptionStartTime"
                            placeholder="请输入GPS定位异常起始时间(分钟)"
                            allow-clear>
                        <template #suffix>
                        <span class="suffix-1">(分)</span>
                        </template>         
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="透传定时开关" prop="timingSwitch" class="item-0">
                    <a-select  v-model="setSubForm.timingSwitch" @change="timingSwitchCallback">
                        <a-select-option v-for="timingSwitch  in timingSwitchs " :key="timingSwitch.key">{{timingSwitch.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="定时透传开始时间" prop="timingStartTime" class="item-0">
                    <a-date-picker
                        v-model="setSubForm.timingStartTime"
                        placeholder="定时透传开始时间"
                        show-time
                        format="YYYY-MM-DD HH:mm:ss">
                    </a-date-picker>
                    </a-form-model-item>
                    <a-form-model-item label="定时透传结束时间" prop="timingEndTime" class="item-0">
                    <a-date-picker
                        v-model="setSubForm.timingEndTime"
                        placeholder="定时透传结束时间"
                        show-time
                        format="YYYY-MM-DD HH:mm:ss">
                    </a-date-picker>
                    </a-form-model-item>
                    <a-form-model-item label="限时透传时间" prop="limitTime" class="item-0">
                    <a-input  v-model="setSubForm.limitTime"
                            placeholder="请输入限时透传时间"
                            allow-clear>
                        <template #suffix>
                        <span class="suffix-1">(分)</span>
                        </template>         
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="GPS模块选择开关" prop="selectSwitch"  class="item-0">
                    <a-select  v-model="setSubForm.selectSwitch" dropdownClassName="width238"
                    >
                        <a-select-option v-for="selectSwitch in selectSwitchs" :key="selectSwitch.key" :title="selectSwitch.value"
                                    >{{selectSwitch.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="GPRS开关" prop="gprsSwitch" class="item-0">
                    <a-select  v-model="setSubForm.gprsSwitch" dropdownClassName="width328">
                        <a-select-option v-for="gprsSwitch  in gprsSwitchs " :key="gprsSwitch.key" :title="gprsSwitch.value">{{gprsSwitch.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="摄像头MAC地址" prop="cameraMac" class="item-0">
                    <a-input  v-model="setSubForm.cameraMac"
                            placeholder="请输入摄像头MAC地址"
                            allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="Frame Type 1的Bitmap" prop="bitmap" class="item-0">
                    <a-input  v-model="setSubForm.bitmap"
                            placeholder="Bitmap,由512个0或1组成"
                            allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="参数采集的源地址" prop="bitmapSourceAddress" class="item-0">
                    <a-input  v-model="setSubForm.bitmapSourceAddress"
                            placeholder="请输入参数采集的源地址"
                            allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="Frame Type 1采集频率" prop="frameType1Frequency" class="item-0">
                    <a-input  v-model="setSubForm.frameType1Frequency"
                            placeholder="请输入采集频率,范围[1,3600]"
                            allow-clear>
                        <template #suffix>
                        <span class="suffix-1">(秒)</span>
                        </template>         
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="Frame Type 80采集频率" prop="frameType80Frequency" class="item-0">
                    <a-input  v-model="setSubForm.frameType80Frequency"
                            placeholder="请输入采集频率,范围[1,3600]"
                            allow-clear>
                        <template #suffix>
                        <span class="suffix-1">(秒)</span>
                        </template>         
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="Frame Type 83采集频率" prop="frameType83Frequency" class="item-0">
                    <a-input  v-model="setSubForm.frameType83Frequency"
                            placeholder="请输入采集频率,范围[10,86400]，值为10的倍数"
                            allow-clear>
                        <template #suffix>
                        <span class="suffix-1">(秒)</span>
                        </template>         
                    </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="J1939参数ID的帧格式" prop="gprsSwitch" class="item-0">
                    <a-select  v-model="setSubForm.frameType">
                        <a-select-option v-for="frameType  in frameFormats " :key="frameType.key">{{frameType.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="J1939参数请求ID" prop="canId" class="item-0">
                    <a-input  v-model="setSubForm.canId"
                            placeholder="请输入J1939参数请求ID"
                            allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="DM1 SA源地址个数" prop="number" class="item-0">
                    <a-select  v-model="setSubForm.sourceAddressDM1.number" placeholder="请选择DM1 SA源地址个数">
                        <a-select-option v-for="number  in sourceAddressDM1s " :key="number.key">{{number.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="DM1 SA源地址" prop="canId" class="item-0">
                    <a-input  v-model="setSubForm.sourceAddressDM1.sourceAddress"
                            placeholder="请输入DM1 SA源地址，默认6个"
                            allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="短信日志开关控制" prop="selectSwitch"  class="item-0">
                    <a-select  v-model="setSubForm.smsLogSwitch"
                    >
                        <a-select-option v-for="smsLogSwitch in smsLogSwitchs" :key="smsLogSwitch.key" :title="smsLogSwitch.value"
                                    >{{smsLogSwitch.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="车牌识别设备选择" prop="gprsSwitch" class="item-0">
                    <a-select  v-model="setSubForm.lprType" placeholder="请选择终车牌识别设备">
                        <a-select-option v-for="lprType  in lprTypes " :key="lprType.key">{{lprType.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="车辆身份" prop="vehicleIdentity" class="item-0">
                    <a-select  v-model="setSubForm.vehicleIdentityConfig.vehicleIdentity" placeholder="请选择车辆身份" @change="vehicleIdentityCallback">
                        <a-select-option v-for="vehicleIdentity  in vehicleIdentitys " :key="vehicleIdentity.key">{{vehicleIdentity.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="车牌号" prop="numberPlate" class="item-0">
                    <a-input  v-model="setSubForm.vehicleIdentityConfig.numberPlate" :maxLength="5"
                            placeholder="请输入车牌号，最多5位"
                            allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="诊断模式开关" prop="diagnosticPatternSwitch" class="item-0">
                    <a-select  v-model="setSubForm.diagnosticPatternSwitch" placeholder="请选择诊断模式开关">
                        <a-select-option v-for="diagnosticPatternSwitch  in diagnosticPatternSwitchs " :key="diagnosticPatternSwitch.key">{{diagnosticPatternSwitch.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="终端源码上行信息回执" prop="gprsSwitch" class="item-0">
                    <a-select  v-model="setSubForm.receiptSwitch" placeholder="请选择终端源码上行信息回执">
                        <a-select-option v-for="receiptSwitch  in receiptSwitchs " :key="receiptSwitch.key">{{receiptSwitch.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="装车超时时间设置" prop="loadTimeout" class="item-0">
                    <a-input  v-model="setSubForm.loadTimeout"
                            placeholder="请输入装车超时时间设置"
                            allow-clear>
                        <template #suffix>
                        <span class="suffix-1">(秒)</span>
                        </template>         
                    </a-input>
                    </a-form-model-item>
                </div>
                <div class="checklist-3">
                    <a-form-model-item label="透传数据采集配置个数" prop="gatherConfign" class="item-1">
                        <a-select  v-model="gatherConfign" placeholder="请选择透传数据采集配置" @change="gatherConfigCallback">
                            <a-select-option v-for="gatherConfig  in gatherConfigs " :key="gatherConfig.key">{{gatherConfig.value}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <div>
                    <div class="checklist-3-list" v-for="(item, index) in setSubForm.gatherConfig" :key="item.id">
                        <a-form-model-item :label="`采集间隔${index + 1}`" class="item-0" prop="maskInterval">
                        <a-input  v-model="item.maskInterval" placeholder="范围：[0,65535]" @change="maskIntervalChange($event, index, 'maskInterval')"
                                />
                        </a-form-model-item>
                        <a-form-model-item :label="`起始字节${index + 1}`" class="item-0" prop="maskBeginByte">
                        <a-input  v-model="item.maskBeginByte" placeholder="范围：[0,255]"  @change="maskBeginByteChange($event, index, 'maskBeginByte')"
                                />
                        </a-form-model-item>
                        <a-form-model-item :label="`掩码长度${index + 1}`"  class="item-0" prop="maskLength">
                        <a-input  v-model="item.maskLength" placeholder="范围：[0,16]"  @change="maskLengthChange($event, index, 'maskLength')"/>
                        </a-form-model-item>
                        <a-form-model-item :label="`掩码内容${index + 1}`"  class="item-0" prop="maskContent">
                        <a-input  v-model="item.maskContent" placeholder="最多16个字" :maxLength="16"/>
                        </a-form-model-item>
                    </div>
                    </div> 
                </div>
                <div class="list-0">
                    <a-form-model-item label="UDS参数采集配置类型" prop="configType"  class="item-0">
                    <a-select v-model="setSubForm.udsGatherConfig.configType" placeholder="请选择配置类型">
                        <a-select-option v-for="configType in configTypes" :key="configType.key"
                                        >{{configType.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="UDS参数采集配置组号" prop="configGroupNumber"   class="item-0">
                    <a-input 
                            v-model="setSubForm.udsGatherConfig.configGroupNumber"
                            placeholder="请输入配置组号"
                            allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="UDS参数采集周期"  prop="gatherPeriod"  class="item-0">
                    <a-input 
                            v-model="setSubForm.udsGatherConfig.gatherPeriod"
                            placeholder="请输入采集周期"
                            type="number"/>
                    </a-form-model-item>
                    <a-form-model-item label="UDS参数追加UDSID内容" prop="appendUdsId"   class="item-0">
                    <a-input 
                            v-model="setSubForm.udsGatherConfig.appendUdsId"
                            placeholder="2字节一组"
                            allow-clear/>
                    </a-form-model-item>
                </div>
                <div class="list-0">
                    <a-form-model-item label="车辆司机卡号配置类型" prop="type"  class="item-0">
                    <a-select v-model="setSubForm.driverCard.type" placeholder="请选择配置类型">
                        <a-select-option v-for="riverCardType in driverCardTypes" :key="riverCardType.key" :title="riverCardType.value"
                                        >{{riverCardType.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="车辆司机卡号的个数" prop="count"  class="item-0">
                    <a-select v-model="countn" placeholder="请选择设置司机卡号的个数"  @change="driverCardCountCallback">
                        <a-select-option v-for="driverCardCount in driverCardCounts" :key="driverCardCount.key"
                                        >{{driverCardCount.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                </div>
                <div class="list-0" v-for="item in setSubForm.driverCard.driverCardArray" :key="item.id">
                    <a-form-model-item label="车辆司机卡号"  class="item-0">
                    <a-input 
                            v-model="item.cardNumber"
                            :maxLength = "4"
                            placeholder="请输入卡号，4位"
                            allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="车辆机手可操作机种编号"  class="item-0">
                    <a-select v-model="item.kind" placeholder="请选择机手可操作机种编号">
                        <a-select-option v-for="kind in kinds" :key="kind.key" :title="kind.value"
                                        >{{kind.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-model-item>
                </div>

                <div class="checklist-0">
                    <a-form-model-item label="中心默认地址IP" prop="rcvIp1" class="list-rcvip">
                        <a-input  v-model="setSubForm.rcvIp1" 
                                placeholder="请输入中心默认地址IP"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="端口号" prop="rcvPort1" class="list-rcvpost">
                        <a-input  v-model="setSubForm.rcvPort1" placeholder="请输入端口号"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="接入点" prop="accessPoint1" class="list-rcvpoint">
                        <a-input  v-model="setSubForm.accessPoint1" placeholder="请输入接入点"
                                allow-clear/>
                    </a-form-model-item>
                </div>
                <div class="checklist-0">
                    <a-form-model-item label="中心备用地址IP"
                                        prop="rcvIp2" class="list-rcvip">
                        <a-input  v-model="setSubForm.rcvIp2"
                                placeholder="请输入中心备用地址IP"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="端口号"
                                        prop="rcvPort2" class="list-rcvpost">
                        <a-input  v-model="setSubForm.rcvPort2" placeholder="请输入端口号"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="接入点"
                                        prop="accessPoint2" class="list-rcvpoint">
                        <a-input  v-model="setSubForm.accessPoint2" placeholder="请输入接入点"
                                allow-clear/>
                    </a-form-model-item>
                </div>
                <div class="checklist-0">
                    <a-form-model-item label="远程升级地址IP" 
                                        prop="upgradeIp" class="list-rcvip">
                        <a-input  v-model="setSubForm.upgradeIp" 
                                placeholder="请输入远程升级地址IP"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="端口号" 
                                        prop="upgradePort" class="list-rcvpost">
                        <a-input  v-model="setSubForm.upgradePort" placeholder="请输入端口号"
                                allow-clear/>
                    </a-form-model-item>
                    <a-form-model-item label="接入点"
                                        prop="upgradeAccessPoint" class="list-rcvpoint">
                        <a-input  v-model="setSubForm.upgradeAccessPoint" placeholder="请输入接入点"
                                allow-clear/>
                    </a-form-model-item>
                </div>
            </div>
        </a-form-model>
        <div class="dialog-footer">
            <a-button type="primary" @click="sendCommMessage">提交</a-button>
        </div>
    </div>
</div>
    
</template>
<script>
import {infoTransPorts, driverCardCounts,ipChanges,kinds,configTypes,gatherConfigs,frameFormats,sourceAddressDM1s, timingSwitchs,networkModels, lockCarTypes,
gprsSwitchs, smsLogSwitchs, selectSwitch, lprTypes, vehicleIdentitys,diagnosticPatternSwitchs,driverCardTypes,receiptSwitchs,
 selectSwitchs} from '@/utils/constant'
import {sendCommMessage, getTimeZone} from '@/api/infodevice'
import {parseTime, kmxCode} from '@/utils/index'
import {getToken, jwtDecodeToken} from '@/utils/auth'
import TyASpin from "@/components/TyASpin"
import cloneDeep from 'lodash/cloneDeep'
export default {
    name: "tSetTmnlParam",
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
      TyASpin
    },
    data() {
        return {
            infoTransPorts,
            smsLogSwitchs,
            gatherConfigs,
            gprsSwitchs,
            selectSwitchs,
            vehicleIdentitys,
            diagnosticPatternSwitchs,
            driverCardTypes,
            driverCardCounts,
            receiptSwitchs,
            configTypes,
            kinds,
            sourceAddressDM1s,
            lprTypes,
            lockCarTypes,
            frameFormats,
            timingSwitchs,
            networkModels,
            ipChanges,
            timezoneConfigs:[],
            gatherConfign:1,
            gatherConfignOld:1,
            countn:1,
            countnOld:1,
            tyspining:false,
            setSubForm: {
                infoId: 'E5',
                seqNo: '000000',
                timeOver: 0,
                timingSendTime: "",
                triedTimes: "1",
                paramCount:1,
                rcvNo: '100102146657',
                sendNo: '100102146657',
                rcvIp1: '192.168.5.123',
                accessPoint1: 'cmnet',
                rcvPort1: '1058',
                rcvIp2: '192.168.5.123',
                accessPoint2: 'cmnet',
                rcvPort2: '1058',
                upgradeIp: '192.168.5.123',
                upgradeAccessPoint: 'cmnet',
                upgradePort: '1058',
                smsCenter: '1065751546',
                keyoffInfoInterval: '180',
                keyoffDistance: '200',
                askCyc: '600',
                infoTransPort: 2,
                ipChange: "2",
                ipMaxConn: '9',
                autoSmsCyc: '60',
                can1BaudRate: '2',
                can2BaudRate: '0',
                can2PlugReuse: '00A001A0',
                userExtendInfo: '0001',
                networkModel: 1,
                imuSet: '0101',
                lockCarType: 0,
                timezoneConfig: undefined,
                stratingRetentionPointRadius: '100',
                stratingRetentionPointBeginTime: '10',
                gatherConfig:[{
                    maskInterval:'',
                    maskBeginByte:'',
                    maskLength:'',
                    maskContent:'',
                    id:1
                }],
                localExceptionStartTime: '10',
                timingSwitch:1,
                timingStartTime:"",
                timingEndTime:"",
                limitTime:'10',
                selectSwitch:0,
                smsLogSwitch:0,
                gprsSwitch:0,
                cameraMac:'',
                bitmap:'',
                bitmapSourceAddress:'',
                frameType1Frequency:'1',
                frameType80Frequency:'1',
                frameType83Frequency:'10',
                frameType:0,
                canId:'',
                sourceAddressDM1:{
                    number:6,
                    sourceAddress:'00,01,90,BA,F1,27'
                },
                udsGatherConfig: {
                    configType:1,
                    configGroupNumber:'1',
                    gatherPeriod:'60',
                    appendUdsId:'0102,0304'
                },
                lprType:1,
                vehicleIdentityConfig:{
                    vehicleIdentity:0,
                    numberPlate:'',
                },
                diagnosticPatternSwitch:0,
                driverCard:{
                    version:'0',
                    type:0,
                    count:1,
                    driverCardArray:[
                        {cardNumber:'',kind:1,id:1}
                    ]
                },
                receiptSwitch:0,
                loadTimeout:'180'
            },
            tablepackData: [],
            
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
                timingSendTime: [{required: false, message: '请选择定时发送时间', trigger: 'change'}],
                timingStartTime: [{required: false, message: '请选择定时透传开始时间', trigger: 'change'}],
                timingEndTime: [{required: false, message: '请选择定时透传结束时间', trigger: 'change'}],
                limitTime: [{required: false, message: '请输入限时透传时间（分）', trigger: 'blur'}],
            }
        }
    },
    computed: {
        userInfo() {
            return this.$store.getters.userInfo
        }
    },
    mounted() {
        this.getTimeZone();
    },
    methods: {
        regexpcomTwo(val,i,t,n){
            let sNum = val;
            sNum = sNum.replace(/[^\d]/g,"");
            if(sNum !==""){sNum = Number(val);}
            if(sNum > n){sNum = n}
            this.$set(this.setSubForm.gatherConfig,i,{...this.setSubForm.gatherConfig[i],[t]:sNum})
        },
        maskIntervalChange(e, i, t){
            this.regexpcomTwo(e.target.value,i,t,65535)
        },
        maskBeginByteChange(e, i, t){
           this.regexpcomTwo(e.target.value,i,t,255)
        },  
        maskLengthChange(e, i, t){
            this.regexpcomTwo(e.target.value,i,t,16)
        }, 

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
        getTimeZone(){
            getTimeZone().then(response => {
                if(response.code === 200){
                this.timezoneConfigs = response.timezone_list
                }
            }).catch(error => {
                this.$message.error('时区数据错误')
            })
        },
        driverCardCountCallback(){
            this.commonMapArr('count',{cardNumber:'', kind:1});
        },
        gatherConfigCallback(){
            this.commonMapArr('gatherConfig',{maskInterval:'', maskBeginByte:'', maskLength:'', maskContent:'',});
        },
        commonMapArr(type,obt){
            try{
            let reduceVal ;
            let len;
            let valNew = this[`${type}n`];
            let valOld = this[`${type}nOld`];
            if(valNew > valOld){
            if(type === 'gatherConfig'){
                len = this.setSubForm.gatherConfig.length;
            }else if(type === 'count'){
                len = this.setSubForm.driverCard.driverCardArray.length;
            }
            reduceVal = valNew - len;
            if(reduceVal > 0){
                for(let i=0;i<reduceVal;i++){
                let obj = {...obt}
                obj.id = len+1+i;
                if(type === 'gatherConfig'){
                    this.setSubForm.gatherConfig.push(obj)
                }else if(type === 'count'){
                    this.setSubForm.driverCard.driverCardArray.push(obj)
                }
                }
            }
            }else if(valNew < valOld){
            if(type === 'gatherConfig'){
                this.setSubForm.gatherConfig =  this.setSubForm.gatherConfig.slice(0, valNew)
            }else if(type === 'count'){
                this.setSubForm.driverCard.driverCardArray =  this.setSubForm.driverCard.driverCardArray.slice(0, valNew)
            }
            }
            this[`${type}nOld`] = this[`${type}n`];
            if(type === 'count'){
            this.setSubForm.driverCard.count = this.count;
            }
            }catch(e){console.log(e)}

        },
        timezoneConfigsFilter(arr){
            let arrcopy = [];
            arr.forEach((item)=>{
            let obj = {}
            obj.key = item.pgn_pgnid;
            obj.value = item.pgn_name;
            arrcopy.push(obj)
            });
            return arrcopy;
        },
        vehicleIdentityCallback(val) {
            if(val === '0'){
            this.setSubForm.loadTimeout = '180'
            }else if(val === '1'){
            this.setSubForm.loadTimeout = '600'
            }
        },
        timingSwitchCallback(){
            let val = this.setSubForm.timingSwitch;
            console.log(val)
            if(val === '2'){
            this.setSubRules.timingStartTime[0].required = true;
            this.setSubRules.timingEndTime[0].required = true;
            this.setSubRules.limitTime[0].required = false;
            }else if(val === '3'){
            this.setSubRules.timingStartTime[0].required = false;
            this.setSubRules.timingEndTime[0].required = false;
            this.setSubRules.limitTime[0].required = true;
            }else{
            this.setSubRules.timingStartTime[0].required = false;
            this.setSubRules.timingEndTime[0].required = false;
            this.setSubRules.limitTime[0].required = false;
            }
        },
        filterParams(obj){
            let newObj = cloneDeep(obj)
            newObj.udsGatherConfig.appendUdsId = newObj.udsGatherConfig.appendUdsId.split(',');
            newObj.sourceAddressDM1.sourceAddress = newObj.sourceAddressDM1.sourceAddress.split(',')
            let {timeOver,
                timingSendTime,
                triedTimes,...data} = newObj;
            for(let i in data){
                if(data[i] === undefined){
                    data[i] = "";
                }
            }
            return data
        },
        sendCommMessage() {
            this.$refs.setSubForm.validate((valid) => {
                if (valid) {
                    this.tyspining = true;
                    return new Promise(() => {
                    let data = {
                        systemCode: kmxCode(this.recordData.vcl_dictvb_id),
                        accountName: this.userInfo.realname,
                        accountPwd: "123",
                        jsonVersion: "1.0",
                        infoid: 'E5',
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
                            paramContent: this.filterParams(this.setSubForm)
                        }
                    }

                    sendCommMessage(data).then(response => {
                        this.tyspining = false;
                        if (response.code == 200) {
                        this.$message.success(response.message)
                        this.$refs.setSubForm.resetFields() // 表单重置
                        } else {
                        this.$message.error(response.message)
                        }

                    }).catch(error => {
                        this.tyspining = false;
                        this.$message.error('提交失败')
                    })
                    })
                }
            })
        }
    }
}
</script>
<style lang="less">
.t-set-terminal-param-box {
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
    .checklist-0{
      overflow:hidden;
      .list-checkbox{
        width:20px!important;
        .ant-col{
          margin-top:11px;
          .ant-form-item-control{
            line-height: normal;
          }
        }
      }
      .ant-form-item{
        display:flex;
        align-items:center;
        float:left;
        label{
          display:inline-block;
        }
      }
      .list-rcvip{
        width:35%;
        label{
          width:120px;
        }
      }
      .list-rcvpost{
        width:30%;
        label{
          width:80px;
        }
      }
      .list-rcvpoint{
        width:30%;
        label{
          width:80px;
        }
      }
    }
    .checklist-3{
      .item-1{
        display: flex;
        .ant-form-item-control-wrapper{
          width: 195px;
        }
        .ant-form-item-label{
          width: 170px;
        }
      }
      .checklist-3-list{
        display: flex;
        flex-flow: wrap;
        .item-0{
          display: flex;
          flex-basis: 25%;
          .ant-form-item-control-wrapper{
            width: 135px;
          }
        }
      }
    }
    .list-0{
      display: flex;
      flex-flow: wrap;
      .item-0{
        display: flex;
        flex-basis: 50%;
        padding-right: 5px;
        .ant-form-item-control-wrapper{
          width: 195px;
        }
        .ant-form-item-label{
          width: 170px;
        }
      }
 
    }
  }
</style>