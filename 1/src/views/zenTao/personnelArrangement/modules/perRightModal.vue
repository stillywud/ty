<template>
    <a-card class="jm-leri-right-card-box" :bordered="false">
        <a-spin :indicator="indicator" :spinning="spinning">
            <div style="position:absolute;left:0;top:0;">
                <a-date-picker @change="onChange" />
            </div>
            <FullCalendar
                class='demo-app-calendar'
                ref="fullCalendar"
                :locale="zhLocale"
                :header="{
                    left: '', // prev,next today
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }"
                :buttonText="{
                    today:    '今天',
                    month:    '月',
                    week:     '周',
                    day:      '日',
                }"
                :plugins="calendarPlugins"
                :eventLimit="true"
                @loading="loadingCallback"
                :handleWindowResize="false"
                eventLimitText="more"
                :height="heightY"
                :events="eventsCallback"
                @eventClick="handleEventClick"
                />
            </a-spin>

    </a-card>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import zhLocale from '@fullcalendar/core/locales/zh-cn';
import {axios,cancelToken} from '@/utils/request'
import { mixin } from '@/utils/mixin.js'
// 测试数据
import moment from 'moment'
import { getAction , postAction } from '@/api/manage'


const CancelToken = cancelToken;
let cancel;
export default {
    data(){
        return{
            zhLocale,
            calendarPlugins: [ // plugins must be defined in the JS
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin // needed for dateClick
            ],
            personnelUrl:'/online/cgreport/api/getColumnsAndData/1333690079197208577?_t=1606879328&order=desc&pageNo=1&pageSize=9999&person=',
            calendarWeekends: true,
            getApi:{},
            spinning:false,
            filterAlls:[],
            statusColor:{closed:'#06081b',done:'#298a75',doing:'#2700d3',
            wait:'#2e98cd',pause:'#cd617e'},
            indicator:<a-icon type="loading" style="font-size: 24px" spin />
        }
    },
    mixins: [mixin],
    props:{
        heightY:{
            default:500
        },
        selecto:{
            default:[]
        }
    },
    watch:{
        heightY:{
            handler(n,o){
                //console.log(n,o,'heightY')
                this.$nextTick(()=>{
                  //this.heightY = n;
                  this.getApi.updateSize && this.getApi.updateSize()
                })
            },
            immediate:true,
            deep:true
        },
        selecto:{
            handler(n,o){
                //console.log(n,o,'selecto')
                this.getApi.refetchEvents && this.getApi.refetchEvents()
            },
            immediate:true,
            deep:true
        },
        primaryColor:{
            handler(n,o){
                //console.log(n,o,'primaryColor')
                setTimeout(()=>{
                    // "fc-prev-button","fc-next-button",,"fc-today-button"
                    ["fc-dayGridMonth-button","fc-timeGridWeek-button","fc-timeGridDay-button"].forEach(it => {
                        document.querySelector(`.${it}`).style.backgroundColor = n
                        document.querySelector(`.${it}`).style.borderColor = n
                    })
                },500)
            },
            immediate:true,
        }
    },
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    mounted(){
        this.$nextTick(()=>{
            this.getApi = this.$refs.fullCalendar.getApi();
        })
    },
    methods:{
        onChange(date, dateString){
            this.getApi.gotoDate && this.getApi.gotoDate(dateString)
        },
        handleEventClick(event){
            this.$emit("onHandleEventClick",event)
        },
        loadingCallback(bol){
            if(bol){
                this.spinning = true
            }else{
                this.spinning = false
            }
        },
        eventsCallback(info, successCallback, failureCallback){
            //测试数据
          console.log("点击数据：：",info)
          if(this.selecto == null||this.selecto.length<=0){
            successCallback([])
            return;
          }

          let filterAll = []
          this.getTaskData(filterAll,0,function(array){
            successCallback(array)
          });

          //console.log(this.filterAll)


        },
      getTaskData(filterAll,index,array){
        getAction(this.personnelUrl+this.selecto[index].value).then((res) => {
          if (res.success) {
            let alldata = [];
            for (let key in res.result.data.records) {
              let data = res.result.data.records[key];
              let filter = {};
              filter.title = data.name;
              filter.id = data.id
              filter.textColor = '#fff'
              filter.start = data.eststarted
              filter.end = data.realstarted
              filter.color = this.statusColor[data.status];
              alldata.push(filter);
            }
            filterAll.push.apply(filterAll,alldata);
            if(index >= this.selecto.length-1){
              array(filterAll) ;
            }else{
              this.getTaskData(filterAll,index+1,array);
            }
          }
        })

      }
    }
}
</script>
<style lang="less">

</style>