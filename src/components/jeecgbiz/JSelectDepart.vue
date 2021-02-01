<template>
  <div v-if="isExternal">
    <el-input
        :value="inputValue"
        :disabled="disabled"
        @input="handleInput"
    />
  </div>
  <div v-else class="j-select-depart">
    <div @click="handleClickOpenDialog">
      <el-input
          type="text"
          placeholder="点击选择部门"
          :value="inputValue"
          :readonly="true"
          :disabled="disabled">

        <i slot="prefix" class="iconfont icon-depart2"></i>
      </el-input>
    </div>

    <j-select-depart-modal
        :visible.sync="modalVisible"
        :width="modalWidth"
        :multiple="multiple"
        :dataSource="dataSource"
        :checkedKeys="selectedValue"
        :defaultExpandAll="defaultExpandAll"
        @ok="handleOK"
        @closed="handleClosed"
    />
  </div>
</template>

<script>
  import JSelectBizMixins from './mixins/JSelectBizMixins'
  import JSelectDepartModal from './modal/JSelectDepartModal'

  export default {
    name: 'JSelectDepart',
    mixins: [JSelectBizMixins],
    components: {
      JSelectDepartModal
    },
    props: {
      defaultExpandAll: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        departNames: '',
        selectedValue: '',
        // 查询方法
        requestFunctionName: 'queryDepartTreeList',
        // 显示名称
        displayModel: 'departName',
        translKeys: ['id'],
      }
    },
    methods: {

      handleWatchValue(val) {
        if (typeof val === 'string' && this.defaultLogin) {
          this.currentLoginValue = val
        } else {
          this.selectedValue = val
        }
      },

      /** 请求部门信息 */
      requestSuccess(result) {
        this.dataSource = result
        const getChildren = (children) => {
          if (children.id) {
            this.setTranslMap(children)
            if (children['orgCode'] === this.currentLoginValue) {
              this.selectedValue = children[this.returnKey]
              this.handleOK([children], children.id)
            }
          }
          if (children.children) {
            children.children.forEach(record => {
              getChildren(record)
            })
          }
        }
        result.forEach(record => {
          getChildren(record)
        })
      },
      requestError(res) {
        console.error('部门信息查询失败：', res)
      },

      handleOK(rows, idstr) {
        let value = rows.map(row => row[this.returnKey]).join(',')
        // this.$emit("input", this.selectedValue)
        this.$emit('input', value)
        this.putKeyMaps(rows)
      },

    }
  }
</script>

<style lang="scss">
  .j-select-depart {
    .el-input input {
      cursor: pointer;
    }

  }
</style>

<style lang="scss" scoped>
  .j-select-depart {
    .icon-depart2 {
      font-size: 16px;
      position: relative;
      left: 4px;
      cursor: pointer;
      color: #333333;
    }
  }
</style>