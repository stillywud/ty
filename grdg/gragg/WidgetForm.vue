<template>
    <div class="widget-form-container">
        <div v-if="data.list.length == 0" class="form-empty">从左侧拖拽或点击来添加字段</div>
        <a-form-model layout="horizontal">
            <draggable class="widget-form-list" style="overflow-y:scroll;padding-bottom: 100px;"
                v-model="data.list" 
                v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.widget-view-li'}"
                @end="handleMoveEnd"
                @add="handleWidgetAdd"
            >
                <template v-for="(element, index) in data.list">
                    <widget-form-item 
                    v-if="element && element.key"  
                    :key="element.key" 
                    :element="element" 
                    :select.sync="selectWidget" 
                    :index="index" 
                    :data="data" />
                </template>    
            </draggable>
        </a-form-model>
    </div>
</template>
<script>
import Draggable from 'vuedraggable'
import WidgetFormItem from './WidgetFormItem'
import {cloneDeep} from 'lodash-es'
export default {
    name:'widget-form',
    components: {
        Draggable,
        WidgetFormItem
    },
    props: ['data', 'select'],
    data () {
        return {
            selectWidget: this.select
        }
    },
    mounted () {
        document.body.ondrop = function (event) {
        let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
            if (isFirefox) {
                event.preventDefault()
                event.stopPropagation()
            }
        }
    },
    methods: {
        handleMoveEnd ({newIndex, oldIndex}) {
            console.log('index', newIndex, oldIndex)
        },
        handleWidgetAdd (evt) {
            const newIndex = evt.newIndex
            const to = evt.to
            
            //为拖拽到容器的元素添加唯一 key
            const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
            let obj = {};
            let listNewIndex = cloneDeep(this.data.list[newIndex]);
            listNewIndex.key = key;
            if(listNewIndex.type === 'radio' || listNewIndex.type === 'checkbox' || listNewIndex.type === 'select') {
                listNewIndex.options.options = listNewIndex.options.options.map(item => ({
                    ...item
                }))
            }else if(listNewIndex.type === 'tabs'){
                listNewIndex.tabs = listNewIndex.tabs.map(item => ({...item, key:`Tab_${Math.ceil(99999 * Math.random())}`}))
                listNewIndex.options.activeName = listNewIndex.tabs[0].key
            }else if(listNewIndex.type === 'grid'){
                listNewIndex.columns = listNewIndex.columns.map(item => ({...item}))
            }   
            this.$set(this.data.list, newIndex, listNewIndex);
            this.selectWidget = this.data.list[newIndex]
        },
        
    },
    watch: {
        select (val) {
            console.log(val,'----')
            this.selectWidget = val
        },
        selectWidget: {
            handler (val) {
                console.log(val,'----0000')
                this.$emit('update:select', val)
            },
            deep: true
        }
    }   
}
</script>
<style lang="less">
.widget-form-container{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    margin: auto;
    .widget-view-li{
        position: relative;
        &::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            display: block;
            z-index: 1001;
        }
    }
    .widget-view {
        padding: 18px 10px 18px;
        margin: 0;
        position: relative;
        border-left: 5px solid transparent;
        &.active {
            border-left: 5px solid #409eff;
            background: #b3d8ff;
        }
    }
    .widget-form-list {
        background: #fff;
        border: 2px inset rgba(0,0,0,.1);
        height: 100%;
        // margin: 10px;
        // overflow: auto;
        .widget-col-list {
            min-height: 50px;
            border: 2px inset rgba(0,0,0,.1);
            background: #fff;
        }
        .widget-action-clone {
            position: absolute;
            right: 70px;
            bottom: -17px;
            z-index: 1009;
        }
        .widget-action-delete {
            position: absolute;
            right: 20px;
            bottom: -17px;
            z-index: 1009;
        }
        .ant-btn-primary{
            color: #1890ff;
            background: rgb(237, 246, 255);
            border-color: rgb(153, 206, 255);
        }
        .ant-btn-danger{
            color: #f56c6c;
            background: #fef0f0;
            border-color: #fbc4c4;
        }
        .widget-grid-container{
            .widget-grid {
                background: #f4f6fc;
                position: relative;
                border-left: 5px solid transparent;
                padding: 5px;
                margin: 0!important;
                &.active {
                    border-left: 5px solid #409eff;
                    background: #b3d8ff;
                }
            }
        }
    }
    .form-empty {
        position: absolute;
        text-align: center;
        width: 300px;
        height: 20px;
        font-size: 20px;
        top: 50%;
        width: 100%;
        margin-top: -10px;
        color: #ccc;
    }
    form,
    form>div {
        height: ~"calc(100% - 10px)";
    }
    .ghost {
        margin: 0!important;
        padding: 0!important;
        height: 4px!important;
        overflow: hidden!important;
        background: salmon!important;
        border-color: salmon!important;
        border: 1px dashed #1890ff;
    }
    li.ghost {
        height: 30px;
        list-style: none;
        font-size: 0;
    }
}
</style>