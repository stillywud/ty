<template>
  <div class="j-editable-mobile">
    <div class="name-top" :style="{borderColor:(formDataLength === 0 ? 'transparent' : '#e0e0e0')}">{{ element.name }}</div>

    <el-form ref="form" :rules="rules" :model="formDataModels" :size="config.size">

      <div v-if="formDataLength === 0">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增一行</el-button>

      </div>
      <el-row v-for="(row, rowIndex) of formDataLength" :key="rowIndex" class="row">
        <el-col v-for="(col, colIndex) of realColumns" :key="colIndex" :span="24">

          <template v-for="(prop, propIndex) of [col.prop + '_' + rowIndex]">
            <el-form-item :label="col.label" :prop="prop" :key="propIndex" :data-prop="prop">

              <template v-if="col.type === 'input'">
                <el-input
                  class="j-editable-theme"
                  v-model="formDataModels[prop]"
                  :readonly="col.options.readonly"
                  :disabled="col.options.disabled"
                  v-bind="__packageInnerProps(col)"
                />
              </template>

              <template v-else-if="col.type === 'number'">
                <el-input-number
                  class="j-editable-theme"
                  v-model="formDataModels[prop]"
                  :min="col.options.min"
                  :max="col.options.max"
                  :step="col.options.step"
                  :controls="col.options.controls"
                  :controls-position="col.options.controlsPosition"
                  :placeholder="col.placeholder||''"
                  :readonly="col.options.readonly"
                  :disabled="col.options.disabled"
                  :style="{width:col.options.width || '100%'}"
                  v-bind="__packageInnerProps(col)"
                />
              </template>

              <template v-else-if="col.type == 'select'">
                <el-select
                  class="j-editable-theme"
                  v-model="formDataModels[prop]"
                  :readonly="col.options.readonly"
                  :disabled="col.options.disabled"
                  :multiple="col.options.multiple"
                  :clearable="col.options.clearable"
                  :placeholder="col.options.placeholder"
                  :style="{width: col.options.width || '100%'}"
                  :filterable="col.options.filterable"
                  v-bind="__packageInnerProps(col)"
                >
                  <el-option
                    v-for="item in getSelectOptionsByColumn(col)"
                    :key="item.value"
                    :value="item.value"
                    :label="getSelectLabelByOptions(col, item)"/>
                </el-select>
              </template>

              <template v-else-if="col.type == 'textarea'">
                <el-input
                  class="j-editable-theme j-editable-textarea"
                  type="textarea"
                  :rows="3"
                  v-model="formDataModels[prop]"
                  :readonly="col.options.readonly"
                  :disabled="col.options.disabled"
                  :placeholder="col.options.placeholder"
                  :style="{width: col.options.width || '100%'}"
                  v-bind="__packageInnerProps(col)"
                />
              </template>

              <template v-else-if="col.type=='date'">
                <el-date-picker
                  class="j-editable-theme"
                  v-model="formDataModels[prop]"
                  :type="col.options.type"
                  :placeholder="col.options.placeholder"
                  :start-placeholder="col.options.startPlaceholder"
                  :end-placeholder="col.options.endPlaceholder"
                  :readonly="col.options.readonly"
                  :disabled="col.options.disabled"
                  :editable="col.options.editable"
                  :clearable="col.options.clearable"
                  :value-format="col.options.timestamp ? 'timestamp' : col.options.format"
                  :format="col.options.format"
                  :style="{width: col.options.width || '100%'}"
                  v-bind="__packageInnerProps(col)"
                />
              </template>

              <template v-else-if="col.type == 'time'">
                <el-time-picker
                  class="j-editable-theme"
                  v-model="formDataModels[prop]"
                  :is-range="col.options.isRange"
                  :placeholder="col.options.placeholder"
                  :start-placeholder="col.options.startPlaceholder"
                  :end-placeholder="col.options.endPlaceholder"
                  :readonly="col.options.readonly"
                  :disabled="col.options.disabled"
                  :editable="col.options.editable"
                  :clearable="col.options.clearable"
                  :arrowControl="col.options.arrowControl"
                  :value-format="col.options.format"
                  :style="{width: col.options.width || '100%'}"
                  v-bind="__packageInnerProps(col)"
                >
                </el-time-picker>
              </template>

              <template v-else-if="col.type == 'radio'">
                <el-radio-group
                  class="j-editable-theme"
                  v-model="formDataModels[prop]"
                  :style="{width: col.options.width || '100%'}"
                  v-bind="__packageInnerProps(col)"
                >
                  <el-radio
                    :style="{display: isMobile ? 'block' : col.options.inline ? 'inline-block' : 'block'}"
                    :label="item.value"
                    v-for="(item, index) in (col.options.remote ? col.options.remoteOptions : col.options.options)"
                    :key="index"
                  >
                    <template v-if="col.options.remote">{{item.label}}</template>
                    <template v-else>{{col.options.showLabel ? item.label : item.value}}</template>
                  </el-radio>
                </el-radio-group>
              </template>

              <template v-else-if="col.type == 'checkbox'">
                <el-checkbox-group
                  class="j-editable-theme"
                  v-model="formDataModels[prop]"
                  :style="{width: col.options.width}"
                  v-bind="__packageInnerProps(col)"

                >
                  <el-checkbox

                    :style="{display: isMobile ? 'block' : col.options.inline ? 'inline-block' : 'block'}"
                    :label="item.value"
                    v-for="(item, index) in (col.options.remote ? col.options.remoteOptions : col.options.options)"
                    :key="index"
                  >
                    <template v-if="col.options.remote">{{item.label}}</template>
                    <template v-else>{{col.options.showLabel ? item.label : item.value}}</template>
                  </el-checkbox>
                </el-checkbox-group>
              </template>

              <template v-else-if="col.type == 'select-user'">
                <j-select-user
                  v-model="formDataModels[prop]"
                  :disabled="col.options.disabled"
                  :style="{width:col.options.width}"
                  :keyMaps="col.options.keyMaps"
                  :element="col"
                  v-bind="__packageInnerProps(col)"

                  @dialogChange="handleDialogChange"
                  @putKeyMaps="handlePutKeyMaps(rowIndex, $event)"
                />
              </template>

              <template v-else-if="col.type == 'select-depart'">
                <j-select-depart
                  v-model="formDataModels[prop]"
                  :disabled="col.options.disabled"
                  :style="{width:col.options.width}"
                  :keyMaps="col.options.keyMaps"
                  :element="col"
                  v-bind="__packageInnerProps(col)"
                  @dialogChange="handleDialogChange"
                  @putKeyMaps="handlePutKeyMaps(rowIndex, $event)"
                />
              </template>

              <template v-else>
                <span class="column-span">{{ formDataModels[prop] }}</span>
              </template>

            </el-form-item>
          </template>
        </el-col>
        <div class="btn">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleInsert(rowIndex)">插入</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(rowIndex)">删除</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import JEditableMixins from './JEditableMixins'

  export default {
    name: 'JEditableMobile',
    mixins: [JEditableMixins],
    props: ['config'],
    data() {
      return {
        rules: {},
        formDataLength: 0,
        formDataModels: {},
        otherColumns: [],
      }
    },
    watch: {
      value: {
        // 立即以当前值触发回调
        immediate: true,
        handler(val) {
          console.log('value: ', val)

          if (val instanceof Array) {
            this.setFormData(JSON.parse(JSON.stringify(val)))
          } else {
            let json = decodeURIComponent(val)
            this.setFormData(JSON.parse(json))
          }
        }
      },
    },
    mounted() {
      for (let i = 0; i < this.defaultRows; i++) {
        this.handleAdd()
      }
    },
    methods: {

      /** 校验 */
      checkValues() {
        return new Promise((resolve, reject) => {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.emitSave()
              resolve(valid)
            } else {
              reject(valid)
            }
          })
        })
      },

      setFormData(json) {
        let formDataRules = {}
        let formDataModels = {}
        let otherColumns = []
        json.forEach((row, rowIndex) => {
          for (let rowKey in row) {
            if (row.hasOwnProperty(rowKey)) {
              let tempRules = []
              let findIt = false
              for (let column of this.columns) {
                let { prop, rules } = column
                if (prop === rowKey) {
                  findIt = true
                  tempRules = rules
                  break
                }
              }
              if (!findIt) {
                otherColumns.push(rowKey)
              }
              let formKey = (rowKey + '_' + rowIndex)
              formDataRules[formKey] = tempRules
              formDataModels[formKey] = row[rowKey]
            }
          }
        })
        this.rules = formDataRules
        this.formDataModels = formDataModels
        this.formDataLength = json.length
        this.otherColumns = otherColumns
      },

      /** 包装内部组件需要的Props */
      __packageInnerProps(column) {
        let { placeholder } = column
        let props = {}
        props['class'] = { 'inner-component': true }
        props['placeholder'] = placeholder || ''
        return props
      },

      // 根据columns获取select的options
      getSelectOptionsByColumn(col) {
        return (col.options.remote ? col.options.remoteOptions : col.options.options)
      },

      // 根据options获取select的label
      getSelectLabelByOptions(col, opt) {
        return (col.options.showLabel || col.options.remote ? opt.label : opt.value)
      },

      handleAdd() {
        this.formDataSplice(this.formDataLength, 0, 1)
      },

      handleInsert(rowIndex) {
        this.formDataSplice(rowIndex + 1, 0, 1)
      },

      formDataSplice(index, removeNum, addNum) {
        let length = this.formDataLength
        let columns = this.columns.concat(this.otherColumns.map(prop => ({ prop, defaultValue: '', rules: null })))
        // 先 remove
        if (typeof removeNum === 'number' && removeNum > 0) {
          for (let i = 0; i < removeNum; i++) {
            columns.forEach(column => {
              let { prop } = column
              // 向前移一位
              for (let mi = index; mi < length - 1; mi++) {
                let moveKey = prop + '_' + mi
                let moveKeyAfter = prop + '_' + (mi + 1)
                this.$set(this.rules, moveKey, this.rules[moveKeyAfter])
                this.$set(this.formDataModels, moveKey, this.formDataModels[moveKeyAfter])
              }

              let key = prop + '_' + (length - 1)
              // 删除校验规则和数据
              delete this.rules[key]
              delete this.formDataModels[key]
            })
            length--
          }
        }
        // 再添加
        if (typeof addNum === 'number' && addNum > 0) {
          for (let i = 0; i < addNum; i++) {
            columns.forEach(column => {
              let { prop, defaultValue, rules } = column
              let key = prop + '_' + index
              // 向后移一位
              for (let mi = length; mi > index; mi--) {
                let moveKey = prop + '_' + mi
                let moveKeyBefore = prop + '_' + (mi - 1)
                this.$set(this.rules, moveKey, this.rules[moveKeyBefore])
                this.$set(this.formDataModels, moveKey, this.formDataModels[moveKeyBefore])
              }
              this.$set(this.rules, key, rules || [])
              this.$set(this.formDataModels, key, defaultValue || '')
            })
            // 添加
            length++
          }
        }
        this.formDataLength = length
      },

      handleDelete(rowIndex) {
        this.$msgbox({
          title: '删除',
          message: '删除后不能撤销，确定要删除吗？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              try {
                this.formDataSplice(rowIndex, 1)
              } catch (e) {
                console.error(e)
              }
              done()
            } else {
              done()
            }
          }
        }).catch(() => (null))
      },

      /** 处理弹窗变化事件 */
      handleDialogChange(val) {
        this.$emit('dialogChange', val)
      },
      /** 处理额外返回内容 */
      handlePutKeyMaps(rowIndex, maps) {
        for (let key in maps) {
          if (maps.hasOwnProperty(key)) {
            this.otherColumns.push(key)
            this.$set(this.formDataModels, key + '_' + rowIndex, maps[key])
          }
        }
      },

      emitSave() {
        let columns = this.columns.concat(this.otherColumns.map(prop => ({ prop, defaultValue: '', rules: null })))
        let json = []
        for (let i = 0; i < this.formDataLength; i++) {
          let line = {}
          columns.forEach(column => {
            let { prop } = column
            let key = prop + '_' + i
            line[prop] = this.formDataModels[key]
          })
          json.push(line)
        }
        this.$emit('input', encodeURIComponent(JSON.stringify(json)))
      },

    }
  }
</script>

<style lang="scss" scoped>
  .j-editable-mobile {

    .name-top {
      position: sticky;
      top: 0;
      z-index: 10;
      margin-top: -52px;
      padding: 10px 10px 10px 0;
      background-color: #fff;
      border-bottom: 1px solid transparent;
    }

    .row {
      margin-bottom: 10px;
      padding: 10px 10px 10px 20px;
      background-color: #f0f0f0;


      &:nth-child(odd) {
        background-color: #f5f5f5;
      }

      &:last-child {
        margin-bottom: 0;
      }

      .btn {
        text-align: right;
      }
    }
  }
</style>
