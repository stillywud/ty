<template>
    <a-modal
      :width="1000"
      :body-style="{padding:'24px 74px 24px 24px'}"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel"
      cancelText="关闭">

        <a-spin :spinning="confirmLoading">
            <a-tabs default-active-key="1" :animated="false">
                <a-tab-pane key="1" tab="基本信息">
                    <ul class="plan-detail-ul-box">
                        <li>
                            <span class="item-1">所属项目</span>
                            <span class="item-2">天远大数据平台 v0.1.12</span>
                        </li>
                        <li>
                            <span class="item-1">所属模块</span>
                            <span class="item-2">小客户平台<a-icon type="right" />网站</span>
                        </li>
                        <li>
                            <span class="item-1">相关需求</span>
                            <span class="item-2">天远大数据平台 v0.1.12</span>
                        </li>
                        <li>
                            <span class="item-1">指派</span>
                            <span class="item-2">谢广朋 于 2020-11-19 10:59:50</span>
                        </li>
                        <li>
                            <span class="item-1">任务类型</span>
                            <span class="item-2">开发</span>
                        </li>
                        <li>
                            <span class="item-1">优先级</span>
                            <span class="item-2"><span class="red">2</span></span>
                        </li>
                        <li>
                            <span class="item-1">抄送给</span>
                            <span class="item-2">天远大数据平台</span>
                        </li>
                    </ul>
                </a-tab-pane>
                <a-tab-pane key="2" tab="任务的一生">
                    <ul class="plan-detail-ul-box">
                        <li>
                            <span class="item-1">由谁创建</span>
                            <span class="item-2">谢广朋 于 2020-11-19 10:52:58</span>
                        </li>
                        <li>
                            <span class="item-1">由谁完成</span>
                            <span class="item-2">谢广朋 于 2020-11-19 10:52:58</span>
                        </li>
                        <li>
                            <span class="item-1">由谁取消</span>
                            <span class="item-2">谢广朋 于 2020-11-19 10:52:58</span>
                        </li>
                        <li>
                            <span class="item-1">由谁关闭</span>
                            <span class="item-2">暂无</span>
                        </li>
                        <li>
                            <span class="item-1">关闭原因</span>
                            <span class="item-2">暂无</span>
                        </li>
                        <li>
                            <span class="item-1">最后编辑</span>
                            <span class="item-2">檀玉康 于 2020-11-19 10:59:50</span>
                        </li>
                    </ul>
                </a-tab-pane>
                <a-tab-pane key="3" tab="工时信息">
                    <ul class="plan-detail-ul-box">
                        <li>
                            <span class="item-1">预计开始</span>
                            <span class="item-2">2020-11-16</span>
                        </li>
                        <li>
                            <span class="item-1">实际开始</span>
                            <span class="item-2">2020-11-16</span>
                        </li>
                        <li>
                            <span class="item-1">截止日期</span>
                            <span class="item-2">2020-11-16</span>
                        </li>
                        <li>
                            <span class="item-1">最初预计</span>
                            <span class="item-2">0工时</span>
                        </li>
                        <li>
                            <span class="item-1">总消耗</span>
                            <span class="item-2">0工时</span>
                        </li>
                        <li>
                            <span class="item-1">预计剩余</span>
                            <span class="item-2">0工时</span>
                        </li>
                    </ul>
                </a-tab-pane>
            </a-tabs>
      </a-spin>
    </a-modal>
</template>
<script>
export default {
    data(){
        return{
            title:"详情",
            confirmLoading:false,
            visible:false,
            list:[]
        }
    },
    methods:{
        handleCancel(){
            this.visible = false
        },
        showDetail(){
            this.visible = true
        }
    }
}
</script>
<style lang="less">
    .plan-detail-ul-wrapper{
        display: flex;
        flex-wrap: wrap; 
        
    }
    .plan-detail-ul-box{
        list-style: none;
        padding: 0;
        flex-basis: 50%;
        
        li{
            margin-bottom: 10px;
            > span{
                display: inline-block;
            }
            .item-1{
                width: 70px;
                text-align: right;
                margin-right: 20px;
            }
            .red{
                display: inline-block;
                min-width: 20px;
                max-width: 67px;
                height: 20px;
                padding: 0 4px;
                overflow: hidden;
                line-height: 17px;
                border: 1px solid red;
                color: red;
                border-radius: 100%;
                vertical-align: text-top;
                text-align: center;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>