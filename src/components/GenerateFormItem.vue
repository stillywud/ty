<template>

  <!-- update-begin--Author:sunjianlei Date:20190909 for：新增字段权限控制 -->
  <div v-if="_isHidden" >
    <!-- 这是个空标签，什么都不显示，代表隐藏该字段 -->
  </div>
  <!-- update-end--Author:sunjianlei Date:20190909 for：新增字段权限控制 -->

  <!-- update-begin--Author:sunjianlei Date:20190808 for：新增自定义组件 -->
  <j-grid-generate
      ref="jGrid"
      v-else-if="widget.type == 'grid'"
      :config="config"
      :element="widget"
      :models.sync="dataModels"
      :remote="remote"
      :rules="rules"
      :readOnly="readOnly"
      :className="className"
      @popupCgreportOk="handlePopupCgreportOk"
      @dialogChange="handleDialogChange"
  ></j-grid-generate>

  <j-card
      ref="jCard"
      v-else-if="widget.type === ctypes.card "
      mode="form"
      :config="config"
      :element="widget"
      :remote="remote"
      :models.sync="dataModels"
      :rules="rules"
      :readOnly="readOnly"
      :class="className"
      @popupCgreportOk="handlePopupCgreportOk"
      @dialogChange="handleDialogChange"
  ></j-card>

  <j-tabs
      ref="jTabs"
      v-else-if="widget.type === ctypes.tabs"
      mode="form"
      :config="config"
      :element="widget"
      :remote="remote"
      :models.sync="dataModels"
      :rules="rules"
      :readOnly="readOnly"
      :class="className"
      @popupCgreportOk="handlePopupCgreportOk"
      @dialogChange="handleDialogChange"
  />
  <!-- update-end--Author:sunjianlei Date:20190808 for：新增自定义组件  :rules.sync="dataRules"-->
    <div v-else-if="widget.type === 'daterange' && widget.assoStatus !==1">
      <ty-date-range
          :element="widget"
          :config="config"
          :models.sync="dataModels"
          :rules.sync="rules"
          :readOnly="readOnly"
          :class="className"
      />
    </div>

  <el-form-item 
    v-else-if="widget.assoStatus !==1"
    :id="widget.key" 
    :label="formItemLabel" 
    :prop="widget.model" 
    :style="formItemStyle">
    <template v-if="widget.type == 'input'">
      <el-input-number
          v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
          v-model.number="dataModel"
          :placeholder="widget.options.placeholder"
          :style="{width: _width}"
          :disabled="widget.options.disabled"
          :readOnly="readOnly || widget.options.readonly"
          class="j-input-number-mode"
          :class="className"
          controlsPosition="right"
      />
      <el-input
        v-else
        :type="widget.options.dataType"
        v-model="dataModel"
        :placeholder="widget.options.placeholder"
        :style="{width: _width}"
        :disabled="widget.options.disabled"
        :readOnly="readOnly || widget.options.readonly"
        :class="className"
      ></el-input>
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-input
        type="textarea"
        :rows="5"
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: _width}"
        :readOnly="readOnly || widget.options.readonly"
        :class="className"
      ></el-input>
    </template>

    <template v-if="widget.type == 'number'">
      <!-- update-begin--Author:sunjianlei Date:20190611 for：修改计数器默认值 -->
      <el-input-number
        v-model="dataModel"
        :style="{width: _width}"
        :min="widget.options.min"
        :max="widget.options.max"
        :step="widget.options.step"
        :controls="widget.options.controls"
        :controls-position="widget.options.controlsPosition"
        :disabled="readOnly || widget.options.disabled"
        :class="className"
      ></el-input-number>
      <!-- update-end--Author:sunjianlei Date:20190611 for：修改计数器默认值 -->
    </template>

    <template v-if="widget.type == 'radio'">
      <j-radio-group
          v-model="dataModel"
          :width="_width"
          :element="widget"
          :options="_options"
          :readOnly="readOnly"
          :class="className"
          @inpAsso="inpAsso"
      />
    </template>

    <template v-if="widget.type == 'checkbox'">
      <!-- update-begin--Author:sunjianlei Date:20190724 for：checkbox组件优化 -->
      <j-checkbox-group
          v-model="dataModel"
          :width="_width"
          :element="widget"
          :options="_options"
          :readOnly="readOnly"
          :class="className"
      />
      <!-- update-end--Author:sunjianlei Date:20190724 for：checkbox组件优化 -->
    </template>

    <template v-if="widget.type == 'time'">
      <el-time-picker
        v-model="dataModel"
        :is-range="widget.options.isRange"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="readOnly || widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :arrowControl="widget.options.arrowControl"
        :valueFormat="widget.options.format"
        :style="{width: _width}"
        :class="className"
      >
      </el-time-picker>
    </template>

    <template v-if="widget.type=='date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="readOnly || widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
        :format="widget.options.format"
        :style="{width: _width}"
        :class="className"
      >
      </el-date-picker>
    </template>

    <template v-if="widget.type =='rate'">
      <el-rate v-model="dataModel"
        :max="widget.options.max"
        :disabled="readOnly || widget.options.disabled"
        :allow-half="widget.options.allowHalf"
        :class="className"
      ></el-rate>
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker
        v-model="dataModel"
        :disabled="readOnly || widget.options.disabled"
        :show-alpha="widget.options.showAlpha"
        :class="className"
      ></el-color-picker>
    </template>

    <template v-if="widget.type == 'select'">
      <j-select
          v-model="dataModel"
          :width="_width"
          :element="widget"
          :options="_options"
          :readOnly="readOnly"
          :class="className"
      >
      </j-select>
    </template>

    <template v-if="widget.type=='switch'">
      <el-switch
        v-model="dataModel"
        :disabled="readOnly || widget.options.disabled"
        :class="className"
        :active-value="widget.options.activeValue||true"
        :inactive-value="widget.options.inactiveValue||false"
      >
      </el-switch>
    </template>

    <template v-if="widget.type=='slider'">
      <el-slider
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="readOnly || widget.options.disabled"
        :step="widget.options.step"
        :show-input="widget.options.showInput"
        :range="widget.options.range"
        :style="{width: _width}"
        :class="className"
      ></el-slider>
    </template>

    <template v-if="widget.type=='imgupload'">
      <!-- update-begin--Author:sunjianlei Date:20190724 for：fm-upload 组件优化 -->
      <fm-upload
        v-model="dataModel"
        :disabled="readOnly || widget.options.disabled"
        :readOnly="readOnly || widget.options.readonly"
        :style="{'width': _width}"
        :width="widget.options.size.width"
        :height="widget.options.size.height"
        :token="widget.options.token"
        :domain="widget.options.domain"
        :length="widget.options.length"
        :class="className"
        @dialogChange="handleDialogChange"
      >
      </fm-upload>
      <!-- update-end--Author:sunjianlei Date:20190724 for：fm-upload 组件优化 -->
    </template>

    <template v-if="widget.type == 'editor'">
      <fm-editor
        v-model="dataModel"
        :width="_width"
        :height="widget.options.height"
        :readOnly="readOnly"
        :disabled="readOnly || widget.options.disabled"
        :class="className"
      >

      </fm-editor>
    </template>

    <template v-if="widget.type == 'cascader'">
      <el-cascader
        v-model="dataModel"
        :disabled="readOnly || widget.options.disabled"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: _width}"
        :options="widget.options.remoteOptions"
        :class="className"
      >
      </el-cascader>
    </template>

    <!-- update-begin--Author:sunjianlei Date:20190527 for：新增子表组件区域 -->
    <template v-if="widget.type=='sub-table'">
      <j-editable v-model="dataModel" :element="widget" :columns="widget.options.subTableColumns" :readOnly="readOnly" :class="className" @dialogChange="handleDialogChange"/>
    </template>
    <!-- update-end--Author:sunjianlei Date:20190527 for：新增子表组件区域 -->

    <!-- update-begin--Author:sunjianlei Date:20190531 for：新增设计子表组件区域 -->
    <template v-if="widget.type=='sub-table-design'">
      <template v-if="isMobile">
        <j-editable-mobile ref="jeditable" v-model="dataModel" :config="config" :element="widget" :columns="subTableColumns" :readOnly="readOnly" :class="className" @dialogChange="handleDialogChange"/>
      </template>
      <template v-else>
        <j-editable ref="jeditable" v-model="dataModel" :element="widget" :columns="subTableColumns" :readOnly="readOnly" :class="className" @dialogChange="handleDialogChange"/>
      </template>
    </template>
    <!-- update-end--Author:sunjianlei Date:20190531 for：新增设计子表组件区域 -->

    <!-- update-begin--Author:sunjianlei Date:20190612 for：新增自定义组件 -->
    <template v-if="widget.type=='select-user'">
       <j-select-user
           v-model="dataModel"
           :class="className"
           :disabled="readOnly || widget.options.disabled"
           :style="{width: _width}"
           :keyMaps="widget.options.keyMaps"
           :element="widget"
           @dialogChange="handleDialogChange"
           @putKeyMaps="handlePutKeyMaps"
       />
    </template>

    <template v-if="widget.type=='select-depart'">
      <j-select-depart
          v-model="dataModel"
          :class="className"
          :disabled="readOnly || widget.options.disabled"
          :style="{width: _width}"
          :keyMaps="widget.options.keyMaps"
          :element="widget"
          @dialogChange="handleDialogChange"
          @putKeyMaps="handlePutKeyMaps"
      />
    </template>

    <template v-if="widget.type=='buttons'">
      <j-button :element="widget" :models="models" :readOnly="readOnly" :class="className"/>
    </template>

    <template v-if="widget.type=='table-dict'">
      <j-table-dict v-model="dataModel" :element="widget" @ok="handlePopupCgreportOk" :disabled="readOnly" :class="className" @dialogChange="handleDialogChange"/>
    </template>

    <template v-if="widget.type==ctypes.text">
      <j-text :element="widget" :class="className"/>
    </template>

    <template v-if="widget.type==ctypes.divider">
      <j-divider :element="widget" :class="className"/>
    </template>

    <template v-if="widget.type==ctypes.fileUpload">
      <j-file-upload
          :element="widget"
          v-model="dataModel"
          :readOnly="readOnly || widget.options.disabled"
          :class="className"
          @dialogChange="handleDialogChange"
      />
    </template>

    <template v-if="widget.type === 'area-linkage'">
      <j-area-linkage
          v-model="dataModel"
          :disabled="readOnly || widget.options.disabled"
          :placeholder="widget.options.placeholder"
          :class="className"
          :style="{width: _width}"
      />
    </template>
    <!-- update-end--Author:sunjianlei Date:20190612 for：新增自定义组件 -->

  </el-form-item>
</template>

<script>
import FmUpload from './Upload'
import FmEditor from './Editor/tinymce'
// update-begin--Author:sunjianlei Date:20190527 for：新增子表组件区域
import JEditable from './jeecg/JEditable/JEditable'
import JEditableMobile from './jeecg/JEditable/JEditableMobile'
import {subTableCheckType} from '@/util/utils.js'
import _api from '../api'
import GenerateFormItemMixins from '../mixins/GenerateFormItemMixins'
import JAreaLinkage from './jeecg/JAreaLinkage'
//  update-begin--Author:sunjianlei Date:20190612 for：新增自定义组件 ---------
import {ctypes} from './componentsConfig'
import JSelectUser from './jeecgbiz/JSelectUser'
import JSelectDepart from './jeecgbiz/JSelectDepart'
import JButtons from './jeecg/JButtons'
import JButton from './jeecg/JButton'
import JTableDict from './jeecgbiz/JTableDict'
import JText from './jeecg/JText'
import JDivider from './jeecg/JDivider'
import JCheckboxGroup from './jeecg/JCheckboxGroup'
import JFileUpload from './jeecg/JFileUpload'
import moment from 'moment'
import JSelect from '@/components/jeecg/JSelect'
import JRadioGroup from '@/components/jeecg/JRadioGroup'
// 日期
import TyDateRange from './ty/TyDateRange.vue'
export default {
  name: 'GenerateFormItem',
  mixins: [GenerateFormItemMixins],
  props: ['config', 'widget', 'models', 'rules', 'remote', 'readOnly', 'className'],
  components: {
    JSelect,
    JRadioGroup,
    FmUpload,
    FmEditor,
    JEditable,
    JEditableMobile,
    // update-end--Author:sunjianlei Date:20190527 for：新增子表组件区域
    JSelectUser, JSelectDepart, JButtons, JButton, JTableDict, JText, JDivider, JCheckboxGroup, JFileUpload, JAreaLinkage
    //  update-end--Author:sunjianlei Date:20190612 for：新增自定义组件 ---------
    ,TyDateRange
  },
  data () {
    return {
      ctypes,
      dataModel: this.models[this.widget.model],
      dataModels: this.models,
      dataRules:this.rules,
    }
  },
  computed: {
    // update-begin--Author:sunjianlei Date:20190531 for：新增设计子表组件区域 ---------
    subTableColumns() {
      if (this.widget.type == 'sub-table-design') {
        let {columns} = this.widget
        let subTableColumns = []
        columns.forEach(columns => {
          let {list} = columns
          list.forEach(item => {
            // 判断子表内是否支持该组件
            if (subTableCheckType(item.type)) {
              // 判断权限控制是否通过，通过后才显示该字段，禁用项会在方法内自动完成
              if (this.checkSubTableAuth(item)) {
                let obj = {
                  label: item.name,
                  prop: item.model,
                  type: item.type,
                  placeholder: item.options.placeholder,
                  defaultValue: item.options.defaultValue,
                  options: item.options,
                  rules: item.rules
                }
                // 处理子表宽度
                if (item.subOptions.width !== '100%') {
                  obj.width = item.subOptions.width
                } else {
                  obj.width = '200px'
                }
                // 处理子表的数据字典
                if (item.options.remote === 'dict' && item.options.dictCode) {
                  _api.getDictItems({
                    code: item.options.dictCode
                  }).then(dictOptions => {
                    this.$set(item.options, 'remoteOptions', dictOptions)
                  })
                }
                subTableColumns.push(obj)
              }
            }
          })
        })
        return subTableColumns
      }else{
        return []
      }
    },
    // update-end--Author:sunjianlei Date:20190531 for：新增设计子表组件区域 ---------

    // update-begin--Author:sunjianlei Date:20190708 for：新增自定义computed ---------
    isButton() {
      return this.widget.type === 'buttons'
    },
    formItemLabel() {
      if (this.isButton || this.widget.hideLabel === true || this.widget.hideTitle === true) {
        return null
      }
      return this.widget.name
    },
    formItemStyle() {
      let style = {}
      if (this.widget.formItemMargin === true) {
        style['margin-bottom'] = 0
      }
      return style
    }
    // update-end--Author:sunjianlei Date:20190708 for：新增自定义computed ---------
  },
  created () {

    if (this.widget.type === 'imgupload' || this.widget.type === ctypes.fileUpload) {
      this.remote[this.widget.options.tokenFunc]((data) => {
        this.widget.options.token = data
      })
    }

  },
  methods: {

    // update-begin--Author:sunjianlei Date:20190705 for：新增自定义事件 -----------
    /** 处理PopupCgreport组件事件 */
    handlePopupCgreportOk(values) {
      this.$emit('popupCgreportOk', values)
    },
    /** 处理弹窗变化事件 */
    handleDialogChange(val) {
      this.$emit('dialogChange', val)
    },
    /** 处理额外返回内容 */
    handlePutKeyMaps(maps) {
      for (let key in maps) {
        if (maps.hasOwnProperty(key)) {
          this.$set(this.models, key, maps[key])
        }
      }
    },
    // update-end--Author:sunjianlei Date:20190705 for：新增自定义事件 -----------
    inpAsso(val){
      this.$emit("inpAsso",val)
    }
  },
  watch: {
    rules:{
      deep: true,
      handler(val) {
        if(this.widget.type === 'daterange'){
          this.$emit('update:rules', val)
        }
      }
    },
    dataModel: {
      deep: true,
      handler (val) {
        this.models[this.widget.model] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: val
        })
      }
    },
    dataModels: {
      deep: true,
      handler(val) {
        this.$emit('update:models', val)
      }
    },
    models: {
      immediate: true,
      deep: true,
      handler(val) {
        // update-begin--Author:sunjianlei Date:20191211 for：特殊类型特殊处理
        let model = val[this.widget.model]
        if (this.widget.type === 'date' && model) {
          let format = this.widget.options.format
          format = format.replace(/yyyy/g, 'YYYY')
          format = format.replace(/dd/g, 'DD')
          // 修复bug---maxiong 20210101
          // model = moment(model).format(format)
          Array.isArray(model) ? model.forEach(function(item,index){
            return model[index] = moment(item).format(format)
          }) : model = moment(model).format(format)
        }
        this.dataModel = model
        // update-end--Author:sunjianlei Date:20191211 for：特殊类型特殊处理
        this.dataModels = val
      }
    }
  }
}
</script>
