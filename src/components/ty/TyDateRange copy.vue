<template>
    <div 
        class="widget-view"
        :class="{active: selectWidget.key == element.key}"
        :data-type="element.type"
        @click.stop="handleSelectWidget(index)"
    >{{data}}222
        <el-form-item
            :label="element.options.startName"
            :required="element.options.required"
            >
            <el-date-picker
            v-model="value1"
            :type="`${element.options.formatType === 1 ? 'date' : 'datetime'}`"
            :placeholder="element.options.startPlaceholder"/>
        </el-form-item>
        <el-form-item
            :label="element.options.endName"
            :required="element.options.required"
            >
            <el-date-picker
            v-model="value2"
            :type="`${element.options.formatType === 1 ? 'date' : 'datetime'}`"
            :placeholder="element.options.endPlaceholder" />
        </el-form-item>
        <el-form-item
            v-if="element.options.durationType"
            :label="`${element.options.durationName}(${element.options.formatType === 1 ? '天' : '小时'})`"
            >
            <el-input 
            v-model="value3"
            :readonly="true"
            :placeholder="`请输入${element.options.durationName}`" />
        </el-form-item>
        <!-- 操作按钮 -->
        <template v-if="mode === 'daterange' && selectWidget.key == element.key">
        <el-button
            title="删除"
            style="bottom: -20px;"
            class="widget-action-delete"
            type="danger" circle plain
            @click.stop="handleWidgetDelete(index)"
        >
            <i class="iconfont icon-trash"></i>
        </el-button>
        <el-button
            title="复制"
            style="bottom: -20px;"
            class="widget-action-clone"
            type="primary" circle plain
            @click.stop="handleWidgetClone(index)"
        >
            <i class="iconfont icon-clone"></i>
        </el-button>
        </template>
    </div>
</template>
<script>
import { ElementAction, WidgetDraggable } from '../../mixins/CommonMixins'
export default {
    data:"TyDateRange",
    mixins: [ElementAction, WidgetDraggable],
    data(){
        return {
            value1:'',
            value2:'',
            selectWidget: this.select || {}
        }
    },
    mounted(){
        this.value1 = this.element.options.defaultValue[0];
        this.value2 = this.element.options.defaultValue[1];
        if(this.element.options.required){
            console.log(this.rules)
            // this.rules = [{required:true,message:'请选择开始时间'},{required:true,message:'请选择结束时间'}]
        }
    },
    computed:{
        value3:{
            get(){
                if(this.value1 && this.value2){
                    let formatType = this.element.options.formatType;
                    let num = new Date(this.value2).getTime() - new Date(this.value1).getTime();
                    if(num > 0){
                        if(formatType === 1){
                            num = Math.floor(num / 1000/60);
                            num = Math.floor(num / 60 / 24)+1
                            return num;
                        }else{
                            num = Math.floor(num / 1000/60);
                            num = parseFloat((num / 60).toFixed(1), 10)
                            return num
                        }
                    }else if(num <=0){
                        return 0
                    }
                }
                return ''
                
            },
            set(){
                this.value1 = this.element.options.defaultValue[0]
                this.value2 = this.element.options.defaultValue[1]
            }
            
        }
    },
    props:['mode', 'config', 'data', 'index', 'element', 'select', 'remote', 'models', 'rules', 'readOnly'],
    methods:{
    },
    watch:{
        value1(a,b){
            this.$set(this.element.options.defaultValue, 0, a)
        },
        value2(a,b){
            this.$set(this.element.options.defaultValue, 1, a)
        },
        value3(a,b){
            this.$set(this.element.options.defaultValue, 2, a)
            if(this.element.options.formatType === 2){
                if(a > 168){
                    this.$nextTick(()=>{
                        this.$alert('所选时间已超过168小时', {
                            confirmButtonText: '确定',
                        });
                    })
                    
                }
            }
        }
    }
}
</script>
<style lang="scss">

</style>