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
          :value="inputValue"
          :disabled="disabled"
          :readonly="true"
          placeholder="点击选择用户">

        <i slot="prefix" class="iconfont icon-user"></i>
      </el-input>
    </div>

    <j-select-user-modal
        :visible.sync="modalVisible"
        :value="translMap[selectedValue]"
        :width="modalWidth"
        :multiple="multiple"
        :dataSource="dataSource"
        @ok="handleOK"
        @closed="handleClosed"
    />
  </div>
</template>

<script>
  import JSelectUserModal from './modal/JSelectUserModal'
  import JSelectBizMixins from './mixins/JSelectBizMixins'

  export default {
    name: 'JSelectUser',
    mixins: [JSelectBizMixins],
    components: {
      JSelectUserModal
    },
    props: {},
    data() {
      return {
        selectedValue: '',
        selectedArray: [],
        // 查询方法
        requestFunctionName: 'getUserList',
        // 显示名称
        displayModel: 'realname',
        saveKey: 'username',
        translKeys: ['id', 'username'],
      }
    },
    methods: {

      handleWatchValue(val) {
        try {
          if (typeof val === 'string') {
            if (this.defaultLogin) {
              this.currentLoginValue = val
            } else {
              this.selectedValue = val
              this.selectedArray = val.split(',')
            }
          } else if (val instanceof Array) {
            this.selectedValue = val.join(',')
            this.selectedArray = val
          } else {
            this.selectedValue = ''
            this.selectedArray = []
          }
        } catch (e) {
          console.error(e)
        }
      },

      /** 请求用户信息 */
      requestSuccess(result) {
        let { records } = result
        this.dataSource = records
        records.forEach(record => {
          this.setTranslMap(record)
          // 判断是否是默认值
          if (record.username === this.currentLoginValue) {
            let value = record[this.returnKey]
            this.selectedValue = value
            this.selectedArray = [value]
            this.handleOK(value, record[this.displayModel], [record])
          }
        })
      },
      requestError(res) {
        console.error('用户信息查询失败：', res)
      },

      handleOK(username, realname, rows) {
        let value = rows.map(row => row[this.returnKey]).join(',')
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
    .icon-user {
      font-size: 16px;
      position: relative;
      left: 4px;
      cursor: pointer;
      color: #333333;
    }
  }
</style>