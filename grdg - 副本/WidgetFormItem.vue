<template>
    <div class="widget-view-li"  @click.stop="handleSelectWidget(index)">
        <a-form-model-item
            class="widget-view"
            v-if="element && element.key" 
            :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
            :label="element.name"
            
        >
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
<script>
export default {
    name:'widget-form-item',
    props: ['element', 'select', 'index', 'data'],
    data () {
        return {
        selectWidget: this.select
        }
    },
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
        handleTabEdit(){

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

</style>