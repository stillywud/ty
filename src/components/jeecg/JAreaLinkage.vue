<template>
  <el-cascader
      class="j-area-linkage"
      :value="innerValue"
      :options="options"
      :props="props"
      popper-class="j-area-linkage-popper"
      v-bind="$attrs"
      v-on="$listeners"
      @change="handleChange"
  />
</template>

<script>

  import { pcaa } from 'area-data'


  export default {
    name: 'JAreaLinkage',
    props: ['value'],
    data() {
      return {
        props: {
          lazy: true,
          lazyLoad: (node, resolve) => {
            let { value } = node
            let options = this.loadDataByCode(value)
            this.hasChildren(options)
            resolve(options)
          }
        },
        options: [],
        innerValue: [],
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(value) {
          // this.innerValue = [value]
          this.loadDataByValue(value)
        }
      },
    },
    created() {
    },
    methods: {
      loadDataByCode(value) {
        let options = []
        let data = pcaa[value]
        if (data) {
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              options.push({ value: key, label: data[key], })
            }
          }
          return options
        } else {
          return []
        }
      },
      /** 判断是否有子节点 */
      hasChildren(options) {
        options.forEach(option => {
          let data = this.loadDataByCode(option.value)
          option.leaf = data.length === 0
        })
      },

      handleChange(values) {
        let value = values[values.length - 1]
        this.$emit('input', value)
      },

      /** 通过 value 反推 options */
      loadDataByValue(value) {
        // 获取第一级数据
        let options = this.loadDataByCode('86')
        this.hasChildren(options)
        let currentOptions = options
        if (value) {
          // 转换成内部 a-cascader 可识别的值
          value = (typeof value === 'string' ? value : '').trim()
          let innerValue = [value], length = value.length
          let level = 1, num = 2, flag = true
          // 获取上级的方式就是将后两位变成 00
          do {
            let endIndex = num * level++
            // 末尾补零
            let zeroPadding = [...new Array(length - endIndex)].map(i => '0').join('')
            // 裁剪并补零
            let code = value.substring(0, endIndex) + zeroPadding
            // 找到在选项中的位置
            let findIt = false
            for (let option of currentOptions) {
              if (option.value === code) {
                if (option.leaf) {
                  flag = false
                } else {
                  let data = this.loadDataByCode(code)
                  this.hasChildren(data)
                  option.children = data
                  currentOptions = data
                  innerValue.splice(innerValue.length - 1, 0, code)
                }
                findIt = true
                break
              }
            }
            if (findIt) {
              findIt = false
            } else {
              flag = false
            }
          } while (flag)
          this.innerValue = innerValue
        } else {
          this.innerValue = []
        }
        this.options = options
      },

    },
  }
</script>

<style scoped>

</style>

<style lang="scss">
  /* 兼容编译后，莫名其妙的原因导致底部出现滚动条 */
  .j-area-linkage-popper {

    .el-scrollbar {
      overflow: hidden !important;
    }

    .el-scrollbar__wrap {
      height: 204px !important;
      overflow-x: hidden !important;
      overflow-y: scroll !important;
    }
  }
</style>