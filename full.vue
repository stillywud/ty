<template>
    <div>
        <FullCalendar 
        ref="fullCalendar"
        :plugins="calendarPlugins" 
        :header="calendarHeader"
        :buttonText="calendarButtonText"
        :locale="calendarLocale"
        :eventLimit="2"
        eventLimitText="more"
        @eventClick="calendarEventClick"
        @dateClick="calendarDateClick"
        @select="calendarSelect"
        @prev="calendarprev"
        events='https://fullcalendar.io/demo-events.json?overload-day'
        />
        <!--
            :selectable="true"  // 开启以后可使用select方法
            eventLimit 限制一天中显示的事件数 bool int
            :eventLimitClick="calendarEventLimitClick" 点击event 出现什么
        -->
    </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import znLocale from '@fullcalendar/core/locales/zh-cn'
import interactionPlugin from '@fullcalendar/interaction' 

export default {
    name:"Full",
    data(){
        return{
            calendarPlugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin, ],
            calendarHeader: {
                left: 'dayGridMonth,timeGridWeek,timeGridDay custom1',
                center: 'title',
                right: 'custom2 prevYear,prev,next,nextYear'
            },
            calendarLocale: znLocale,
            calendarButtonText:{
                today:    '今天',
                month:    '月',
                week:     '周',
                day:      '日',
                list:     '列'
            }
        }
    },
    components:{
        FullCalendar 
    },
    methods:{
        calendarEventClick(eventClickInfo){
            console.log("如果设置了events，用户点击日历上的event触发",eventClickInfo)
        },
        calendarDateClick(selectInfo){
            // 这两个获取api
            let getApi = this.$refs.fullCalendar.getApi();
            let calendarApi = selectInfo.view.context.calendar
            console.log(calendarApi,getApi,'calendarDateClick')
        },
        calendarSelect(info){
            console.log(info,'calendarSelect')
        },
        calendarEventLimitClick(){
            console.log('calendarEventLimitClick')
        },
        calendarprev(){
             console.log('calendarprev')
        }
    }
}
</script>
<style lang="less">
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
</style>