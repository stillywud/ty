<template>
  <div>
    <!-- 操作按钮区域 -->
    <div v-if="!readOnly" class="editable-action-btn">
      <el-button v-if="allowAdd" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      <template v-if="showRowButton">
        <template v-if="currentEdits.length > 1">
          <el-button type="primary" plain icon="el-icon-check" @click="handleSaveAll">全部保存</el-button>
        </template>
      </template>
      <template v-if="multipleSelection.length > 0">
        <el-popover
            placement="top"
            width="220"
            v-model="visible.popover"
            style="margin-left: 8px;">
          <p>确定要删除这 {{ multipleSelection.length }} 项吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible.popover = false">取消</el-button>
            <el-button type="primary" size="mini" @click="handleDelBatch">确定</el-button>
          </div>
          <el-button slot="reference" type="primary" plain icon="el-icon-minus">批量删除</el-button>
        </el-popover>
      </template>
    </div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        :height="tableHeight"
        :border="true"
        size="mini"
        style="width: 100%"
        class="j-editable-table"
        @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="showCheckbox && (!readOnly)" type="selection" width="40" align="center" fixed :resizable="false" className="my-table-columns"/>
      <el-table-column v-if="showNumber" label="#" type="index" width="60" align="center" fixed :resizable="false" className="my-table-columns is-index-action">
        <template slot-scope="scope">
          <div v-if="showRowButton && !readOnly" class="btns-action">
            <el-button
                v-if="isCurrentEditLine(scope.$index)"
                key="open"
                circle
                size="mini"
                type="primary"
                style="font-size: 14px;padding: 7px;"
                icon="el-icon-document-checked"
                @click="()=>handleClickTableEdit(scope.$index, false)"
            />
            <el-button
                v-else
                key="close"
                circle
                size="mini"
                type="primary"
                style="font-size: 14px;padding: 7px;"
                icon="el-icon-edit-outline"
                @click="()=>handleClickTableEdit(scope.$index, true)"
            />
          </div>
          <span class="text-index">{{scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <template v-for="(col,colIndex) of realColumns">

        <el-table-column
            :key="col.prop || col.key"
            :label="col.label"
            :prop="col.prop"
            :minWidth="col.width"
            :className="`my-table-columns ${col.type==='slider'?'is-slider':''}`"
        >

          <template slot-scope="scope">
            <template v-if="isCurrentEditLine(scope.$index)">

              <el-tooltip v-bind="__packageTooltipProps(scope,col)">
                <template v-if="col.type === 'input'">
                  <el-input
                      class="j-editable-theme"
                      v-model="scope.row[col.prop]"
                      :readonly="getWReadOnly(col)"
                      :disabled="getWDisabled(col)"
                      v-bind="__packageInnerProps(scope,col)"
                      @input="(v)=>__commonInnerChange(scope, col,v)"
                      @keyup.enter.native="()=>handleEnterInput(scope.$index)"/>
                </template>

                <template v-else-if="col.type === 'number'">
                  <el-input-number
                      class="j-editable-theme"
                      v-model="scope.row[col.prop]"
                      :min="col.options.min"
                      :max="col.options.max"
                      :step="col.options.step"
                      :controls="col.options.controls"
                      :controls-position="col.options.controlsPosition"
                      :placeholder="col.placeholder||''"
                      :readonly="getWReadOnly(col)"
                      :disabled="getWDisabled(col)"
                      :style="{width:col.options.width || '100%'}"
                      @keyup.enter.native="()=>handleEnterInput(scope.$index)"
                      v-bind="__packageInnerProps(scope,col)"
                      @input="(v)=>__commonInnerChange(scope, col,v)"
                  />
                </template>

                <template v-else-if="col.type == 'select'">
                  <el-select
                      class="j-editable-theme"
                      v-model="scope.row[col.prop]"
                      :readonly="getWReadOnly(col)"
                      :disabled="getWDisabled(col)"
                      :multiple="col.options.multiple"
                      :clearable="col.options.clearable"
                      :placeholder="col.options.placeholder"
                      :style="{width: col.options.width || '100%'}"
                      :filterable="col.options.filterable"
                      @input="(v)=>__commonInnerChange(scope, col,v)"
                      v-bind="__packageInnerProps(scope,col)"
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
                      v-model="scope.row[col.prop]"
                      :readonly="getWReadOnly(col)"
                      :disabled="getWDisabled(col)"
                      :placeholder="col.options.placeholder"
                      :style="{width: col.options.width || '100%'}"
                      v-bind="__packageInnerProps(scope,col)"
                      @input="(v)=>__commonInnerChange(scope, col,v)"
                  />
                </template>

                <template v-else-if="col.type=='date'">
                  <el-date-picker
                      class="j-editable-theme"
                      v-model="scope.row[col.prop]"
                      :type="col.options.type"
                      :placeholder="col.options.placeholder"
                      :start-placeholder="col.options.startPlaceholder"
                      :end-placeholder="col.options.endPlaceholder"
                      :readonly="getWReadOnly(col)"
                      :disabled="getWDisabled(col)"
                      :editable="col.options.editable"
                      :clearable="col.options.clearable"
                      :value-format="col.options.timestamp ? 'timestamp' : col.options.format"
                      :format="col.options.format"
                      :style="{width: col.options.width || '100%'}"
                      v-bind="__packageInnerProps(scope,col)"
                      @input="(v)=>__commonInnerChange(scope, col,v)"
                  />
                </template>

                <template v-else-if="col.type == 'time'">
                  <el-time-picker
                      class="j-editable-theme"
                      v-model="scope.row[col.prop]"
                      :is-range="col.options.isRange"
                      :placeholder="col.options.placeholder"
                      :start-placeholder="col.options.startPlaceholder"
                      :end-placeholder="col.options.endPlaceholder"
                      :readonly="getWReadOnly(col)"
                      :disabled="getWDisabled(col)"
                      :editable="col.options.editable"
                      :clearable="col.options.clearable"
                      :arrowControl="col.options.arrowControl"
                      :value-format="col.options.format"
                      :style="{width: col.options.width || '100%'}"
                      v-bind="__packageInnerProps(scope,col)"
                      @input="(v)=>__commonInnerChange(scope, col,v)"
                  >
                  </el-time-picker>
                </template>

                <template v-else-if="col.type == 'radio'">
                  <el-radio-group
                      class="j-editable-theme"
                      v-model="scope.row[col.prop]"
                      :style="{width: col.options.width || '100%'}"
                      :disabled="getWDisabled(col)"
                      v-bind="__packageInnerProps(scope,col)"
                      @input="(v)=>__commonInnerChange(scope, col,v)"
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
                      :disabled="getWDisabled(col)"
                      v-model="scope.row[col.prop]"
                      :style="{width: col.options.width}"
                      v-bind="__packageInnerProps(scope,col)"
                      @input="(v)=>__commonInnerChange(scope, col,v)"
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
                      v-model="scope.row[col.prop]"
                      :disabled="getWDisabled(col)"
                      :style="{width:col.options.width}"
                      :keyMaps="col.options.keyMaps"
                      :element="col"
                      v-bind="__packageInnerProps(scope,col)"
                      @input="(v)=>__commonInnerChange(scope, col,v)"
                      @dialogChange="handleDialogChange"
                      @putKeyMaps="handlePutKeyMaps(scope.row,$event)"
                  />
                </template>

                <template v-else-if="col.type == 'select-depart'">
                  <j-select-depart
                      v-model="scope.row[col.prop]"
                      :disabled="getWDisabled(col)"
                      :style="{width:col.options.width}"
                      :keyMaps="col.options.keyMaps"
                      :element="col"
                      v-bind="__packageInnerProps(scope,col)"
                      @input="(v)=>__commonInnerChange(scope, col,v)"
                      @dialogChange="handleDialogChange"
                      @putKeyMaps="handlePutKeyMaps(scope.row,$event)"
                  />
                </template>

                <template v-else-if="col.type === 'area-linkage'">
                  <j-area-linkage
                      v-model="scope.row[col.prop]"
                      :disabled="getWDisabled(col)"
                      :placeholder="col.options.placeholder"
                      :style="{width:col.options.width}"
                  />
                </template>

                <template v-else-if="col.type === 'imgupload'">
                  <fm-upload
                      v-model="scope.row[col.prop]"
                      :readOnly="getWReadOnly(col)"
                      :disabled="getWDisabled(col)"
                      :style="{width:col.options.width}"
                      :width="col.options.size.width"
                      :height="col.options.size.height"
                      :token="col.options.token"
                      :domain="col.options.domain"
                      :length="col.options.length"
                  />
                </template>

                <template v-else-if="col.type === 'file-upload'">
                  <j-file-upload
                      v-model="scope.row[col.prop]"
                      :element="col"
                      :readOnly="getWReadOnly(col)"
                  />
                </template>

                <template v-else-if="col.type === 'switch'">
                  <el-switch
                      v-model="scope.row[col.prop]"
                      :disabled="getWDisabled(col)"
                      :active-value="col.options.activeValue||true"
                      :inactive-value="col.options.inactiveValue||false"
                  />
                </template>

                <template v-else-if="col.type === 'slider'">
                  <j-slider v-model="scope.row[col.prop]" :widget="col" :disabled="getWDisabled(col)"/>
                </template>

                <template v-else-if="col.type === 'rate'">
                  <j-rate v-model="scope.row[col.prop]" :widget="col" :disabled="getWDisabled(col)"/>
                </template>

                <template v-else-if="col.type === 'color'">
                  <el-color-picker
                      v-model="scope.row[col.prop]"
                      :disabled="getWDisabled(col).disabled"
                      :show-alpha="col.options.showAlpha"
                  />
                </template>

                <template v-else>
                  <span class="column-span">{{ scope.row[col.prop] }}</span>
                </template>
              </el-tooltip>
            </template>

            <template v-else>
                <span class="column-span" @dblclick="()=>handleDBLClickSpan(scope.$index)">
                  <!-- select 展示 label 而不是 value -->
                  <template v-if="col.type == 'select'">{{ getCurrentSelectedLabel(col, scope.row[col.prop]) }}</template>
                  <template v-else>{{ scope.row[col.prop] }}</template>
                </span>
            </template>
          </template>

        </el-table-column>
      </template>

    </el-table>
  </div>
</template>

<script>
  import JEditableMixins from './JEditableMixins'

  export default {
    name: 'JEditable',
    mixins: [JEditableMixins],
    props: {},
    data() {
      return {
        // 当前正在编辑的行
        currentEdits: [],

        multipleSelection: [],
        visible: { popover: false },
        tableData: [],
        // 存储验证结果，和tableData一一对应
        checks: [],
      }
    },
    watch: {
      value: {
        // 立即以当前值触发回调
        immediate: true,
        handler(val) {
          if (val instanceof Array) {
            this.tableData = JSON.parse(JSON.stringify(val))
          } else {
            let json = decodeURIComponent(val)
            this.tableData = JSON.parse(json)
          }
        }
      },
    },
    computed: {},
    mounted() {
      // 判断是否是新增状态
      if (this.tableData.length === 0) {
        for (let i = 0; i < this.defaultRows; i++) {
          this.push()
        }
      }
    },
    methods: {
      log: console.log,

      /** 校验所有的输入值是否正确，返回true验证通过 */
      checkValues() {
        let errorCount = 0
        for (let column of this.realColumns) {
          let { rules, prop } = column
          for (let $index in this.tableData) {
            let { [prop]: value } = this.tableData[$index]

            let check = this.__commonInnerChange({ $index }, column, value)

            if (check[column.prop][0] === false) {
              errorCount++
              if (!this.isCurrentEditLine($index) && this.currentEdits.length < 10) {
                this.currentEdits.push(Number.parseInt($index))
              }
            }
          }
        }

        if (errorCount === 0) {
          // 没有错误就触发全部保存事件
          this.handleSaveAll()
          return true
        }
        return false
      },

      /** 公共内部组件change事件 */
      __commonInnerChange(scope, column, value) {
        let { $index } = scope
        let check = (this.checks[$index] || {})
        check[column.prop] = this.__validateValue(column.rules, value)
        this.$set(this.checks, $index, check)
        return check
      },

      /** 通过规则验证值是否正确 */
      __validateValue(rules, value) {
        let passed = true, message = ''
        // 判断有没有验证规则或验证规则格式正不正确，若条件不符合则默认通过
        if (rules instanceof Array) {
          for (let rule of rules) {
            // 当前值是否为空
            let isNull = (value == null || value === '')
            // 判断值是否是一个数组
            if (value instanceof Array) {
              isNull = value.length === 0
            }

            // 验证规则：非空
            if (rule.required === true && isNull) {
              passed = false
            } else // 使用 else-if 是为了防止一个 rule 中出现两个规则
            // 验证规则：正则表达式
            if (!!rule.pattern && !isNull) {
              passed = new RegExp(rule.pattern).test(value)
            }
            // 如果没有通过验证，则跳出循环。如果通过了验证，则继续验证下一条规则
            if (!passed) {
              message = rule.message
              break
            }
          }
        }
        return [passed, message]
      },

      __getCheckArray(index, prop) {
        let check = this.checks[index]
        if (check && check[prop]) {
          return check[prop]
        }
        return [true, '']
      },

      /** 包装内部组件需要的Props */
      __packageInnerProps(scope, column) {
        let { $index } = scope
        let { prop, placeholder } = column

        let [pass, message] = this.__getCheckArray($index, prop)

        let props = {}
        props['class'] = { 'inner-component': true }
        props['placeholder'] = placeholder || ''

        if (!pass) {
          props['class']['inner-check-not-pass'] = true
        }
        return props
      },

      /** 包装tooltip需要的Props */
      __packageTooltipProps(scope, column) {
        let { $index } = scope
        let { prop } = column

        let [pass, message] = this.__getCheckArray($index, prop)

        let props = {}
        props['placement'] = 'top'
        props['content'] = message
        props['disabled'] = pass

        return props
      },

      emitSave() {
        let json = JSON.stringify(this.tableData)
        this.$emit('input', encodeURIComponent(json))
      },

      push() {
        let value = {}
        this.columns.forEach(column => {
          let { type, prop: key, defaultValue } = column

          if (type === 'input') {
            value[key] = defaultValue || ''

          } else {
            value[key] = defaultValue || ''
          }
        })
        this.tableData.push(value)
        if (this.currentEdits.length < 10) {
          this.currentEdits.push(this.tableData.length - 1)
        }
        this.emitSave()
      },

      // 获取当前是否是正在编辑的行
      isCurrentEditLine(key) {
        if (this.showRowButton) {
          return this.currentEdits.indexOf(key) !== -1
        }
        return true
      },

      // 根据columns获取select的options
      getSelectOptionsByColumn(col) {
        return (col.options.remote ? col.options.remoteOptions : col.options.options)
      },

      // 根据options获取select的label
      getSelectLabelByOptions(col, opt) {
        return (col.options.showLabel || col.options.remote ? opt.label : opt.value)
      },

      // 获取当前选择的label
      getCurrentSelectedLabel(col, value) {
        let options = this.getSelectOptionsByColumn(col)
        for (let opt of options) {
          if (opt.value === value) {
            return this.getSelectLabelByOptions(col, opt)
          }
        }
        return value
      },

      handleAdd() {
        this.push()
      },
      // 全部保存
      handleSaveAll() {
        let copy = JSON.parse(JSON.stringify(this.currentEdits))
        if (!this.showRowButton) {
          copy = JSON.parse(JSON.stringify(this.tableData.map((v, i) => i)))
        }
        copy.forEach(item => {
          this.handleEnterInput(item, false)
        })
        this.emitSave()
      },
      // 全部删除
      handleDelBatch() {
        this.multipleSelection.forEach((item) => {
          let index = this.tableData.indexOf(item)
          this.tableData.splice(index, 1)
          // 删除该行的校验信息
          if (index < this.checks.length) {
            this.checks.splice(index, 1)
          }
          // 删除正在编辑的行
          let indexOf = this.currentEdits.indexOf(index)
          if (indexOf != -1) {
            this.currentEdits.splice(indexOf, 1)
          }
          // 正在编辑的行需要顺移一位
          this.currentEdits = this.currentEdits.map(current => (current >= index ? --current : current))
        })
        this.emitSave()
        this.visible.popover = false
        this.$refs.multipleTable.clearSelection()
      },
      /** 选择固定复选框时触发的事件 */
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      /** 编辑当前行 */
      handleClickTableEdit(index, edit) {
        if (edit) {
          this.handleDBLClickSpan(index)
        } else {
          this.handleEnterInput(index)
        }
      },
      /** 绑定span双击事件 */
      handleDBLClickSpan(index) {
        if (this.readOnly === true) {
          return
        }
        if (!this.isCurrentEditLine(index)) {
          if (this.currentEdits.length >= 10) {
            this.$message({ message: '最多只能同时编辑十条记录', type: 'warning' })
          } else {
            this.currentEdits.push(index)
          }
        }
      },
      /** 绑定input按下enter键事件 */
      handleEnterInput(index, save = true) {
        if (save === true) {
          this.emitSave()
        }
        let idx = this.currentEdits.indexOf(index)
        this.currentEdits.splice(idx, 1)
      },
      /** 处理弹窗变化事件 */
      handleDialogChange(val) {
        this.$emit('dialogChange', val)
      },
      /** 处理额外返回内容 */
      handlePutKeyMaps(row, maps) {
        let flag = false
        for (let key in maps) {
          if (maps.hasOwnProperty(key)) {
            flag = true
            this.$set(row, key, maps[key])
          }
        }
        if (flag) {
          this.emitSave()
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .editable-action-btn {
    margin-bottom: 8px;
  }

  .column-span {
    width: 100%;
    margin: 4px 0;
    font-size: 13px;
    padding: 1px 11px 0;
    display: inline-block;
    min-height: 18px;
  }
</style>

<style lang="scss">

  .j-editable-table {
    .is-index-action {

      .cell {
        position: relative;
        height: 32px;
      }

      .btns-action {
        position: absolute;
        top: 0;
        left: 14px;
        opacity: 0;
        z-index: 1;
        transition: opacity 0.2s;
      }
    }

    .hover-row {
      .btns-action {
        opacity: 1;
      }
    }
  }

  tbody {
    .my-table-columns {
      .cell {
        color: #000;
        padding-left: 10px;
        padding-right: 10px;

        .j-editable-theme {
          .el-input .el-input__inner {
            padding: 0 10px;
          }

          .el-date-editor .el-input__inner {
            padding-left: 30px;
          }

          &.j-editable-textarea .el-textarea__inner {
            resize: none;
            min-height: 69px !important;
            max-height: 69px !important;
          }
        }

        .el-input__prefix {
          top: 6px;
        }

      }

      &.is-slider {
        .el-slider__button-wrapper {
          z-index: 1;
        }
      }

      // 校验样式
      .inner-component {
        &.inner-check-not-pass {

          .el-input__inner,
          .el-textarea__inner {
            border: 1px solid red !important;
          }

          &.el-radio-group,
          &.el-checkbox-group {
            border: 1px solid red !important;
          }

        }

      }

    }
  }

  thead {
    .my-table-columns {
      .cell {
        color: #000;
        padding-left: 14px;
      }
    }
  }
</style>