<template>
    <div class="widget-form-container">
        <div v-if="data.list.length == 0" class="form-empty">从左侧拖拽或点击来添加字段</div>
        <a-form-model layout="horizontal" :labelCol="{ span: 4 }" :wrapperCol="{ span: 14 }">
        <draggable class="widget-form-list" 
            v-model="data.list" 
            v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.widget-view-li'}"
            @end="handleMoveEnd"
            @add="handleWidgetAdd"
        >{{selectWidget}}====
            <!-- <transition-group name="fade" tag="div" class=""> -->
                <template v-for="(element, index) in data.list">
                    <template v-if="element.type == 'grid'">
                        <div class="widget-grid-container data-grid" :key="element.key" style="position: relative">
                            <a-row 
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
                                            filter="widget-grid-container"
                                            :no-transition-on-drag="true"
                                            v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.widget-view-li'}"
                                            @end="handleMoveEnd"
                                            @add="handleWidgetColAdd($event, element, colIndex)"
                                        >
                                            <template v-for="(el, i) in col.list">
                                                {{el}}---{{i}}
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
                            </a-row>
                        </div>
                    </template>
                <!--     <template v-if="element.type == 'grid'">
                        <a-row 
                            class="widget-col widget-view" 
                            v-if="element && element.key" 
                            :key="element.key" 
                            type="flex"
                            :class="{active: selectWidget.key == element.key}"
                            :gutter="element.options.gutter ? element.options.gutter : 0"
                            :justify="element.options.justify"
                            :align="element.options.align"
                            @click.native="handleSelectWidget(index)">
                            <a-col  v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0">
                                {{colIndex}}{{col}}
                                <draggable
                                    v-model="col.list"
                                    :no-transition-on-drag="true"
                                    v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.widget-view-li'}"
                                    @end="handleMoveEnd"
                                    @add="handleWidgetColAdd($event, element, colIndex)"
                                >
                                    <transition-group name="fade" tag="div" class="widget-col-list a1">
                                        <template v-for="(el, i) in col.list">
                                            {{JSON.stringify(el)}}---{{i}}
                                            <widget-form-item
                                                :key="el.key"
                                                v-if="el.key"
                                                :element="el" 
                                                :select.sync="selectWidget" 
                                                :index="i" 
                                                :data="col">
                                            </widget-form-item>
                                        </template>
                                    </transition-group>
                                </draggable>
                            </a-col> -->
                            <!-- <a-icon type="plus-square" />
                            <a-button title="添加列" type="primary" shape="circle" class="widget-action-clone" icon="plus-square" @click="handleWidgetColAdd(index)" v-if="selectWidget.key == element.key"/> -->
                            <!-- <a-button title="复制" type="primary" shape="circle" class="widget-action-clone" icon="copy" @click="handleWidgetClone(index)" v-if="selectWidget.key == element.key"/>
                            <a-button title="删除" type="danger" shape="circle" class="widget-action-delete" icon="delete" @click="handleWidgetDelete(index)" v-if="selectWidget.key == element.key"/>
    
                        </a-row>
                    </template>-->
                    <template v-else>
                        <widget-form-item 
                        v-if="element && element.key"  
                        :key="element.key" 
                        :element="element" 
                        :select.sync="selectWidget" 
                        :index="index" 
                        :data="data" />
                    </template>
                </template> 
            <!-- </transition-group> -->
        </draggable>
        </a-form-model>
    </div>
</template>
<script>
import Draggable from 'vuedraggable'
import WidgetFormItem from './WidgetFormItem'
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
        handleSelectWidget (index) {
        console.log(index, '#####')
        this.selectWidget = this.data.list[index]
        },
        handleWidgetAdd (evt) {
            console.log('add', evt)
            console.log('end', evt)
            const newIndex = evt.newIndex
            const to = evt.to
            console.log(to)
            
            //为拖拽到容器的元素添加唯一 key
            const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
            this.$set(this.data.list, newIndex, {
                ...this.data.list[newIndex],
                options: {
                ...this.data.list[newIndex].options,
                remoteFunc: 'func_' + key
                },
                key,
                // 绑定键值
                model: this.data.list[newIndex].type + '_' + key,
                rules: []
            })
    console.log(3)
            if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox' || this.data.list[newIndex].type === 'select') {
                this.$set(this.data.list, newIndex, {
                ...this.data.list[newIndex],
                options: {
                    ...this.data.list[newIndex].options,
                    options: this.data.list[newIndex].options.options.map(item => ({
                    ...item
                    }))
                }
                })
            }
            console.log(1)
            if (this.data.list[newIndex].type === 'grid') {
                console.log(2)
                this.$set(this.data.list, newIndex, {
                ...this.data.list[newIndex],
                columns: this.data.list[newIndex].columns.map(item => ({...item}))
                })
            }

            this.selectWidget = this.data.list[newIndex]
        },
        handleWidgetColAdd: function(e, t, n) {
            var r = e.item
                , i = e.newIndex
                , a = e.oldIndex;
                console.log(r.dataset.type)
                return
            // if (!E.r(r.dataset.type))
            //     return "DIV" === r.tagName && this.data.list.splice(a, 0, t.columns[n].list[i]),
            //     t.columns[n].list.splice(i, 1),
            //     this.$message({
            //         message: "子表内暂不支持使用该组件",
            //         type: "warning"
            //     }),
            //     !1;
            // var o = E.n()
            //     , l = E.b(t.columns[n].list[i]);
            // l.key || (l.key = o,
            // l.rules = [],
            // l.model = l.type + "_" + o,
            // l.jeecg_auth = {
            //     enabled: !1,
            //     title: null,
            //     field: null
            // }),
            // l.isSubItem = !0,
            // E.t(l),
            // this.$set(t.columns[n].list, i, l),
            // this.selectWidget = t.columns[n].list[i]
        },
        // handleWidgetColAdd ($event, row, colIndex) {
        //     console.log('coladd', $event, row, colIndex)
        //     const newIndex = $event.newIndex
        //     const oldIndex = $event.oldIndex
        //     const item = $event.item

        //     // 防止布局元素的嵌套拖拽
        //     if (item.className.indexOf('data-grid') >= 0) {

        //         // 如果是列表中拖拽的元素需要还原到原来位置
        //         item.tagName === 'DIV' && this.data.list.splice(oldIndex, 0, row.columns[colIndex].list[newIndex])

        //         row.columns[colIndex].list.splice(newIndex, 1)

        //         return false
        //     }

        //     console.log('from', item)

        //     const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)

        //     this.$set(row.columns[colIndex].list, newIndex, {
        //         ...row.columns[colIndex].list[newIndex],
        //         options: {
        //         ...row.columns[colIndex].list[newIndex].options,
        //         remoteFunc: 'func_' + key
        //         },
        //         key,
        //         // 绑定键值
        //         model: row.columns[colIndex].list[newIndex].type + '_' + key,
        //         rules: []
        //     })

        //     if (row.columns[colIndex].list[newIndex].type === 'radio' || row.columns[colIndex].list[newIndex].type === 'checkbox' || row.columns[colIndex].list[newIndex].type === 'select') {
        //         this.$set(row.columns[colIndex].list, newIndex, {
        //         ...row.columns[colIndex].list[newIndex],
        //         options: {
        //             ...row.columns[colIndex].list[newIndex].options,
        //             options: row.columns[colIndex].list[newIndex].options.options.map(item => ({
        //             ...item
        //             }))
        //         }
        //         })
        //     }

        //     this.selectWidget = row.columns[colIndex].list[newIndex]
        // },
        handleWidgetClone (index) {
            const key = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
            let cloneData = {
                ...this.data.list[index],
                options: {
                ...this.data.list[index].options,
                remoteFunc: 'func_' + key
                },
                key,
                model: this.data.list[index].type + '_' + key,
                rules: this.data.list[index].rules || []
            }

            if (this.data.list[index].type === 'radio' || this.data.list[index].type === 'checkbox' || this.data.list[index].type === 'select') {

                cloneData = {
                ...cloneData,
                options: {
                    ...cloneData.options,
                    options: cloneData.options.options.map(item => ({...item}))
                }
                }
            }

            this.data.list.splice(index, 0, cloneData)

            this.$nextTick(() => {
                this.selectWidget = this.data.list[index + 1]
            })
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
        min-height: 100%;
        margin: 10px;
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
        height: calc(100% - 10px);
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