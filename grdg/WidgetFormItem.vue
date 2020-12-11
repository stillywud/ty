<template>
    <a-form-item 
        class="widget-view"
        v-if="element && element.key" 
        :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
        :label="element.name"
        @click.native.stop="handleSelectWidget(index)"
    >
        <template v-if="element.type == 'input'">
            <a-input 
                v-model="element.options.defaultValue"
                :style="{width: element.options.width}"
                :placeholder="element.options.placeholder"
                :disabled="element.options.disabled"
            ></a-input>
        </template>
        <a-button title="复制" type="primary" shape="circle" class="widget-action-clone" icon="copy" @click="handleWidgetClone(index)" v-if="selectWidget.key == element.key"/>
        <a-button title="删除" type="danger" shape="circle" class="widget-action-delete" icon="delete" @click="handleWidgetDelete(index)" v-if="selectWidget.key == element.key"/>
    </a-form-item>
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
<style lang="scss">

</style>