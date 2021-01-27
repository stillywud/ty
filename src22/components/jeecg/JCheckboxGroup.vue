<template>
    <el-checkbox-group
        v-model="dataModel"
        :style="{width: width}"
        :disabled="readOnly || element.options.disabled"
        :class="className"
    >
        <el-checkbox
            v-for="(item, index) in innerOptions"
            :key="index"
            :label="item.value"
            :style="{display: isMobile ? 'block' : element.options.inline ? 'inline-block' : 'block'}"
        >
            <template v-if="element.options.remote">{{item.label}}</template>
            <template v-else>{{element.options.showLabel ? item.label : item.value}}</template>
        </el-checkbox>
    </el-checkbox-group>
</template>

<script>

import { DeviceMixins } from '@/mixins/vuexMixins'

export default {
    name: 'JCheckboxGroup',
    mixins: [DeviceMixins],
    props: {
        value: {
            type: [Array, String, Number],
            default: () => []
        },
        width: String,
        element: {
            type: Object,
            default: () => ({})
        },
        options: {
          type: Array,
          default: () => ([])
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        className: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            log: console,
            dataModel: []
        }
    },
    computed: {
      innerOptions() {
        let { options } = this
        if (options && Array.isArray(options) && options.length > 0) {
          return options.map(opt => {
            return {
              value: (opt.value || '').toString(),
              label: (opt.label || opt.value)
            }
          })
        }
        return []
      }
    },
    watch: {
        value: {
            deep: true,
            immediate: true,
            handler(val) {
                if (!val) {
                    this.$emit('input', [])
                } else if (typeof val === 'string') {
                    try {
                        let parseTemp = JSON.parse(val)
                        if (parseTemp instanceof Array) {
                            this.$emit('input', parseTemp)
                        } else if (typeof parseTemp === 'number') {
                            this.$emit('input', [`${parseTemp}`])
                        } else {
                            this.log.warn('JCheckboxGroup：未知的值：', parseTemp, `(${typeof parseTemp})`)
                            this.$emit('input', parseTemp)
                        }
                    } catch (e) {
                        this.$emit('input', val.split(','))
                    }
                } else if (typeof val === 'number'){
                    this.dataModel = [val.toString()]
                } else {
                    this.dataModel = val
                }
            }
        },
        dataModel(val) {
            this.$emit('input', val)
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped></style>