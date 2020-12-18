<template>
    <div>
        <template v-if="element.type == 'card'">
            <div
                class="widget-view  widget-grid-card"
                v-if="element && element.key" 
                :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
                :label="element.name"
                @click.stop="handleSelectWidget(index)"
             >
            <a-card class="grid-row" 
            :title="element.name" 
            :style="{width: element.options.width || '100%',position: 'relative'}"
            @click.native.stop="handleSelectWidget(index)">
                <div>
                    <div class="grid-col" style="border: 1px dashed rgb(153, 153, 153);">
                        <draggable
                            v-model="element.list"
                            class="widget-form-list"
                            style="padding-bottom:50px"
                            :no-transition-on-drag="true"
                            v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.widget-view-li'}"
                            @add="handleWidgetColAdd($event, element)"
                        >
                            <template v-for="(el, i) in element.list">
                                <widget-form-item
                                    :key="el.key"
                                    v-if="el.key"
                                    :element="el" 
                                    :select.sync="selectWidget" 
                                    :index="i" 
                                    :data="element" />
                            </template>
                        </draggable>
                    </div>
                </div>
                
            </a-card>
            <a-button title="复制" type="primary" shape="circle" class="widget-action-clone" icon="copy" @click="handleWidgetClone(index)" v-if="selectWidget.key == element.key"/>
            <a-button title="删除" type="danger" shape="circle" class="widget-action-delete" icon="delete" @click="handleWidgetDelete(index)" v-if="selectWidget.key == element.key"/>
        </div>
        </template>
        <template v-else-if="element.type == 'tabs'">
            <div
                class="widget-view widget-grid-tab"
                v-if="element && element.key"
                :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
                :key="element.key"
                @click.stop="handleSelectWidget(index)"
            >
                <a-tabs
                    v-model="element.options.activeName"
                    :tabBarGutter="element.options.tabBarGutter || null"
                    type="editable-card"
                    :key="element.key"
                    @edit="handleTabEdit"
                >
                <a-tab-pane
                    v-for="(tabItem, taIndex) in element.tabs"
                    :key="tabItem.key"
                    :tab="tabItem.title"
                    :forceRender="true"
                >
                    <div class="grid-col" style="border: 1px dashed rgb(153, 153, 153);">
                        <draggable
                            v-model="tabItem.list"
                            class="widget-form-list"
                            style="padding-bottom:50px"
                            :no-transition-on-drag="true"
                            v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.widget-view-li'}"
                            @add="handleWidgetColAdd($event, element, taIndex)"
                        >
                            <template v-for="(el, i) in tabItem.list">
                                <widget-form-item
                                    :key="el.key"
                                    v-if="el.key"
                                    :element="el" 
                                    :select.sync="selectWidget" 
                                    :index="i" 
                                    :data="tabItem" />
                            </template>
                        </draggable>
                    </div>
                </a-tab-pane>
                </a-tabs>
                <a-button title="复制" type="primary" shape="circle" class="widget-action-clone" icon="copy" @click="handleWidgetClone(index)" v-if="selectWidget.key == element.key"/>
                <a-button title="删除" type="danger" shape="circle" class="widget-action-delete" icon="delete" @click="handleWidgetDelete(index)" v-if="selectWidget.key == element.key"/>
            </div>
        </template>
        <template v-else-if="element.type == 'grid'">
            <div class="widget-grid-container data-grid" :key="element.key" style="position: relative">
                <a-row 
                    v-if="element && element.key" :key="element.key"
                    class="widget-grid" 
                    :class="{active: selectWidget.key == element.key}"
                    :gutter="element.options.gutter ? element.options.gutter : 0"
                    :justify="element.options.justify"
                    :align="element.options.align"
                    @click.native.stop="handleSelectWidget(index)"
                    >
                    <a-col v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0">
                        <div style="border:1px dashed #999">
                            <draggable
                                v-model="col.list"
                                class="widget-form-list"
                                style="padding-bottom:50px"
                                :no-transition-on-drag="true"
                                v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.widget-view-li'}"
                                @add="handleWidgetColAdd($event, element, colIndex)"
                            >
                                <template v-for="(el, i) in col.list">
                                    <widget-form-item
                                        :key="el.key"
                                        v-if="el.key"
                                        :element="el" 
                                        :select.sync="selectWidget" 
                                        :index="i" 
                                        :data="col">
                                    </widget-form-item>
                                </template>
                            </draggable>
                        </div>
                    </a-col>
                    <a-button title="复制" type="primary" shape="circle" class="widget-action-clone" icon="copy" @click="handleWidgetClone(index)" v-if="selectWidget.key == element.key"/>
                    <a-button title="删除" type="danger" shape="circle" class="widget-action-delete" icon="delete" @click="handleWidgetDelete(index)" v-if="selectWidget.key == element.key"/>
                </a-row>
            </div>
        </template>
        <template v-else>
            <div class="widget-view-li"  @click.stop="handleSelectWidget(index)">
                <a-form-model-item
                    class="widget-view"
                    v-if="element && element.key" 
                    :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
                    :label="element.name"
                    :labelCol="{
                         span: 3
                    }" 
                    :wrapperCol="{span: 15 }"
                >
                    <template v-if="element.type == 'ref_form'">
                        <a-button type="primary">选取数据</a-button>
                    </template>
                    <template v-if="element.type == 'input'">
                        <a-input 
                            v-model="element.options.defaultValue"
                            :style="{width: element.options.width}"
                            :placeholder="element.options.placeholder"
                            :disabled="element.options.disabled"
                        ></a-input>
                    </template>
                    <template v-if="element.type == 'textarea'">
                        <a-textarea type="textarea" :rows="5"
                            v-model="element.options.defaultValue"
                            :style="{width: element.options.width}"
                            :disabled="element.options.disabled"
                            :placeholder="element.options.placeholder"
                        ></a-textarea>
                    </template>
                    <template v-if="element.type == 'number'">
                        <a-input-number 
                            v-model="element.options.defaultValue" 
                            :style="{width: element.options.width}"
                            :disabled="element.options.disabled"
                        ></a-input-number>
                    </template>

                    <template v-if="element.type == 'radio'">
                        <a-radio-group v-model="element.options.defaultValue"
                            :style="{width: element.options.width}"
                            :disabled="element.options.disabled"
                        >
                            <a-radio  
                            :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                            :value="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"
                            >
                            {{ item.label}}
                            </a-radio>
                        </a-radio-group>
                    </template>

                    <template v-if="element.type == 'checkbox'">
                        <a-checkbox-group v-model="element.options.defaultValue"
                            :style="{width: element.options.width}"
                            :disabled="element.options.disabled"
                        >
                            <a-checkbox
                            :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                            :value="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"
                            >
                            {{item.label}}
                            </a-checkbox>
                        </a-checkbox-group>
                    </template>
                    <template v-if="element.type == 'select'">
                        <a-select
                            v-model="element.options.defaultValue"
                            :disabled="element.options.disabled"
                            :placeholder="element.options.placeholder"
                            :style="{width: element.options.width}"
                            :options="element.options.options"
                        />
                    </template>
                    <template v-if="element.type == 'datetime' || element.type === 'date'">
                        <a-date-picker
                            :show-time="element.type === 'date'"
                            :placeholder="element.options.placeholder"
                            v-model="element.options.defaultValue"
                        />
                    </template>
                    <template v-if="element.type == 'upload'">
                        <a-upload
                            name="avatar"
                            list-type="picture-card"
                            class="avatar-uploader"
                            :show-upload-list="false"
                            action=""
                        >
                            <a-icon type="plus" />
                            <div class="ant-upload-text">
                                {{element.options.placeholder}}
                            </div>
                        </a-upload>
                    </template>
                    <template v-if="element.type == 'timer'">
                        <div>
                            <span >{{element.options.defaultValue}}</span><span style="margin-left:10px;padding:2px 5px;line-height:1.2;background:#40a9ff;color:#fff;border-radius:4px">开始计时</span>
                        </div>
                    </template>
                </a-form-model-item> 
                <a-button title="复制" type="primary" shape="circle" class="widget-action-clone" icon="copy" @click="handleWidgetClone(index)" v-if="selectWidget.key == element.key"/>
                <a-button title="删除" type="danger" shape="circle" class="widget-action-delete" icon="delete" @click="handleWidgetDelete(index)" v-if="selectWidget.key == element.key"/>
            </div>
        </template>
    </div>
    
    
    
</template>
<script>
import Draggable from 'vuedraggable'
import {cloneDeep} from 'lodash-es'
export default {
    name:'widget-form-item',
    props: ['element', 'select', 'index', 'data'],
    data () {
        return {
        selectWidget: this.select
        }
    },
    components:{Draggable},
    methods:{
        handleSelectWidget (index) {
            this.selectWidget = this.data.list[index]
        },
        handleWidgetDelete (index) {
            if (this.data.list.length - 1 === index) {
                if (index === 0) {
                this.selectWidget = {}
                } else {
                this.selectWidget = this.data.list[index - 1]
                }
            } else {
                this.selectWidget = this.data.list[index + 1]
            }

            this.$nextTick(() => {
                this.data.list.splice(index, 1)
            })
        },
        handleWidgetClone (index) {
                
            //为拖拽到容器的元素添加唯一 key
            const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
            let obj = {};
            let listNewIndex = cloneDeep(this.data.list[index]);
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
            // this.$set(this.data.list, newIndex, listNewIndex);
            // this.selectWidget = this.data.list[newIndex]
            this.data.list.splice(index, 0, listNewIndex)

            this.$nextTick(() => {
                this.selectWidget = this.data.list[index + 1]
            })
        },
        handleTabEdit(r, e) {
            var i = this
                , a = this.element.tabs;
                
            if ("add" === e) {
                var t = `Tab_${Math.ceil(99999 * Math.random())}`;
                a.push({
                    title: "NewTab",
                    key: t,
                    list: []
                }),
                i.element.options.activeName = t
            } else if ("remove" === e) {
                if (1 === a.length){
                    return this.$message.warning("最后一项不能删除");
                }else{
                    i.$set(i.element, "tabs", a.filter(function(e) {
                        return e.key !== r
                    }));
                    console.log(this.element.tabs)
                   i.element.options.activeName = this.element.tabs[0].key
                }
            }
        },
        handleDraggableAdd(e,t){
            try{
                var n = t.newIndex
                    , r = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
                    , i = cloneDeep(e[n]);
                    i.type === "tabs" && (
                        i.tabs.forEach(function(e) {
                            return e.key = `Tab_${Math.ceil(99999 * Math.random())}`
                        }),
                        i.options.activeName = i.tabs[0].key
                    ),
                this.$set(e, n, {
                    ...i,
                    options: {
                    ...i.options,
                    },
                    key:r,
                });
                this.selectWidget = e[n]
            }catch(e){console.log(e)}
        },
        handleWidgetColAdd ($event, row, colIndex) {
            try{
            const newIndex = $event.newIndex
            const oldIndex = $event.oldIndex
            const item = $event.item
                let r = null;
                if(row.type ==="tabs"){
                    r = row.tabs[colIndex].list;
                }else if(row.type ==="card"){
                    r = row.list;
                }else{
                    r = row.columns[colIndex].list;
                }
                
                this.handleDraggableAdd(r, $event)
                }catch(e){console.log(e)}
        },
        callbackTabs(key,el){
            console.log(key,el,'keyeee')
            el
        }
    },
    watch: {
        select (val) {
            this.selectWidget = val
        },
        selectWidget: {
            handler (val) {
                this.$emit('update:select', val)
            },
            deep: true
        }
    }
}
</script>
<style lang="less">

</style>