<template>

  <!-- update-begin--Author:sunjianlei Date:20190808 for：布局组件封装进 formItem 组件中 -->
  <j-grid-layout
      v-if="element.type === 'grid'"
      :data="data"
      :config="config"
      :element="element"
      :select.sync="selectWidget"
      :index="index"
  ></j-grid-layout>

  <j-editable-for-design
      v-else-if="element.type === 'sub-table-design'"
      :element="element"
      :select.sync="selectWidget"
      :index="index"
      :data="data"
  ></j-editable-for-design>

  <j-card
      v-else-if="element.type === ctypes.card"
      mode="design"
      :element="element"
      :select.sync="selectWidget"
      :index="index"
      :data="data"
  ></j-card>

  <j-tabs
      v-else-if="element.type === ctypes.tabs"
      mode="design"
      :element="element"
      :select.sync="selectWidget"
      :index="index"
      :data="data"
  ></j-tabs>
  <!-- update-end--Author:sunjianlei Date:20190808 for：布局组件封装进 formItem 组件中 -->

  <!--  update-begin--Author:sunjianlei Date:20190530 for：新增data-type属性 -->
  <el-form-item class="widget-view"
      v-else-if="element && element.key"
      :class="[element.cellLinkage ?'cellLinkage--9tg5O':'', formItemClass]"
      :label="formItemLabel"
      :data-type="element.type"
      @click.native.stop="handleSelectWidget(index)"
    >
    <!--  update-end--Author:sunjianlei Date:20190530 for：新增data-type属性 -->
        <template v-if="element.type == 'input'">
          <el-input
            v-model="element.options.defaultValue"
            :style="{width: _width}"
            :disabled="element.options.disabled"
            :placeholder="element.options.placeholder"
          ></el-input>
        </template>

        <template v-if="element.type == 'textarea'">
          <el-input type="textarea" :rows="5"
            v-model="element.options.defaultValue"
            :style="{width: _width}"
            :disabled="element.options.disabled"
            :placeholder="element.options.placeholder"
          ></el-input>
        </template>

        <template v-if="element.type == 'number'">
          <!-- update-begin--Author:sunjianlei Date:20190611 for：修改计数器默认值 -->
          <el-input-number
            v-model="element.options.defaultValue"
            :disabled="element.options.disabled"
            :controls-position="element.options.controlsPosition"
            :style="{width: _width}"
            :min="element.options.min"
            :max="element.options.max"
            :step="element.options.step"
            :controls="element.options.controls"
          ></el-input-number>
          <!-- update-end--Author:sunjianlei Date:20190611 for：修改计数器默认值 -->
        </template>

        <template v-if="element.type == 'radio'">
          <el-radio-group v-show="selectOptions!=null" v-model="element.options.defaultValue"
            :style="{width: _width}"
            :disabled="element.options.disabled"
          >
            <el-radio  
              :style="{display: element.options.inline ? 'inline-block' : 'block'}"
              :label="item.value" v-for="(item, index) in selectOptions" :key="item.value + index"
            >
              {{element.options.showLabel ? item.label : item.value}}
            </el-radio>
          </el-radio-group>
          <div v-show="selectOptions==null" class="j-p-tip">仅在预览时可用</div>
          <div v-if="handleBhlfil(element.behaviorLinkage)>0" class="leftCornerMark--3_a15"></div>
        </template>

        <template v-if="element.type == 'checkbox'">
          <el-checkbox-group v-show="selectOptions!=null" v-model="element.options.defaultValue"
            :style="{width: _width}"
            :disabled="element.options.disabled"
          >
            <el-checkbox
              :style="{display: element.options.inline ? 'inline-block' : 'block'}"
              :label="item.value" v-for="(item, index) in selectOptions" :key="item.value + index"
            >
              {{element.options.showLabel ? item.label : item.value}}
            </el-checkbox>
          </el-checkbox-group>
          <div v-show="selectOptions==null" class="j-p-tip">仅在预览时可用</div>
        </template>

        <template v-if="element.type == 'time'">
          <el-time-picker 
            v-model="element.options.defaultValue"
            :is-range="element.options.isRange"
            :placeholder="element.options.placeholder"
            :start-placeholder="element.options.startPlaceholder"
            :end-placeholder="element.options.endPlaceholder"
            :readonly="element.options.readonly"
            :disabled="element.options.disabled"
            :editable="element.options.editable"
            :clearable="element.options.clearable"
            :arrowControl="element.options.arrowControl"
            :style="{width: _width}"
            :valueFormat="element.options.format"
          >
          </el-time-picker>
        </template>

        <template v-if="element.type == 'date'">
          <el-date-picker
            v-model="element.options.defaultValue"
            :type="element.options.type"
            :is-range="element.options.isRange"
            :placeholder="element.options.placeholder"
            :start-placeholder="element.options.startPlaceholder"
            :end-placeholder="element.options.endPlaceholder"
            :readonly="element.options.readonly"
            :disabled="element.options.disabled"
            :editable="element.options.editable"
            :clearable="element.options.clearable"
            :style="{width: _width}"  
          >
          </el-date-picker>
        </template>

        <template v-if="element.type == 'rate'">
          <el-rate v-model="element.options.defaultValue"
            :max="element.options.max"
            :disabled="element.options.disabled"
            :allow-half="element.options.allowHalf"
          ></el-rate>
        </template>

        <template v-if="element.type == 'color'">
          <el-color-picker 
            v-model="element.options.defaultValue"
            :disabled="element.options.disabled"
            :show-alpha="element.options.showAlpha"
          ></el-color-picker>
        </template>

        <template v-if="element.type == 'select'">
          <el-select
            v-model="element.options.defaultValue"
            :disabled="element.options.disabled"
            :multiple="element.options.multiple"
            :clearable="element.options.clearable"
            :placeholder="element.options.placeholder"
            :style="{width: _width}"
          >
            <el-option v-for="item in (element.dictOptions || element.options.options)" :key="item.value" :value="item.value" :label="element.options.showLabel?item.label:item.value"></el-option>
          </el-select>
          <div v-if="handleBhlfil(element.behaviorLinkage)>0" class="leftCornerMark--3_a15"></div>
        </template>

        <template v-if="element.type=='switch'">
          <el-switch
            v-model="element.options.defaultValue"
            :disabled="element.options.disabled"
            :active-value="element.options.activeValue||true"
            :inactive-value="element.options.inactiveValue||false"
          >
          </el-switch>
        </template>

        <template v-if="element.type=='slider'">
          <el-slider 
            v-model="element.options.defaultValue"
            :min="element.options.min"
            :max="element.options.max"
            :disabled="element.options.disabled"
            :step="element.options.step"
            :show-input="element.options.showInput"
            :range="element.options.range"
            :style="{width: _width}"
          ></el-slider>
        </template>

        <template v-if="element.type=='imgupload'">
          <fm-upload
            v-model="element.options.defaultValue"
            :disabled="element.options.disabled"
            :style="{'width': _width}"
            :width="element.options.size.width"
            :height="element.options.size.height"
            token="xxx"
            domain="xxx"
          >
            
          </fm-upload>
        </template>

        <template v-if="element.type == 'cascader'">
          <el-cascader
            v-model="element.options.defaultValue"
            :disabled="element.options.disabled"
            :clearable="element.options.clearable"
            :placeholder="element.options.placeholder"
            :style="{width: _width}"
            :options="element.options.remoteOptions"
          >

          </el-cascader>
        </template>

        <template v-if="element.type == 'editor'">
          <fm-editor
            v-model="element.options.defaultValue"
            :width="_width"
            :height="element.options.height"
          >

          </fm-editor>
        </template>

        <template v-if="element.type=='blank'">
          <div style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;">自定义区域</div>
        </template>

        <!-- update-begin--Author:sunjianlei Date:20190527 for：新增子表组件区域 -->
        <template v-if="element.type=='sub-table'">
          <j-editable :columns="element.options.subTableColumns"/>
        </template>
        <!-- update-end--Author:sunjianlei Date:20190527 for：新增子表组件区域 -->

        <!-- update-begin--Author:sunjianlei Date:20190613 for：新增自定义组件 -->
        <template v-if="element.type=='select-user'">
          <j-select-user v-model="element.options.defaultValue" :style="{width: _width}" :disabled="element.options.disabled" :element="element"/>
        </template>

        <template v-if="element.type=='select-depart'">
          <j-select-depart v-model="element.options.defaultValue" :style="{width: _width}" :disabled="element.options.disabled" :element="element"/>
        </template>

        <template v-if="element.type=='buttons'">
          <j-button :element="element"/>
        </template>

        <template v-if="element.type=='table-dict'">
          <j-table-dict v-model="element.options.defaultValue" :element="element"/>
        </template>

        <template v-if="element.type==ctypes.text">
          <j-text :element="element"/>
        </template>

        <template v-if="element.type==ctypes.divider">
          <j-divider :element="element"/>
        </template>

        <template v-if="element.type==ctypes.fileUpload">
          <j-file-upload
              :element="element"
              v-model="element.options.defaultValue"
              :readOnly="element.options.disabled"
          />
        </template>

        <template v-if="element.type === 'area-linkage'">
          <j-area-linkage
              v-model="element.options.defaultValue"
              :disabled="element.options.disabled"
              :placeholder="element.options.placeholder"
              :style="{width: _width}"
          />
        </template>
        <!-- update-end--Author:sunjianlei Date:20190613 for：新增自定义组件 -->

        <el-button title="删除" @click.stop="handleWidgetDelete(index)" class="widget-action-delete" v-if="selectWidget.key == element.key" circle plain type="danger">
          <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
          <i class="iconfont icon-trash"></i>
        </el-button>
        <el-button title="复制" @click.stop="handleWidgetClone(index)" class="widget-action-clone" v-if="selectWidget.key == element.key" circle plain type="primary">
          <!-- <icon name="icon-clone" style="width: 12px;height: 12px;"></icon> -->
          <i class="iconfont icon-clone"></i>
        </el-button>
        
    </el-form-item>
</template>

<script>
import FmUpload from './Upload'
import FmEditor from './Editor/tinymce'
import _api from '../api'
// update-begin--Author:sunjianlei Date:20190527 for：新增子表组件区域
import JEditable from './jeecg/JEditable/JEditable'
// update-begin--Author:sunjianlei Date:20190613 for：新增自定义组件 --------
// import * as _util from '../util/utils'
import {handleBhlfil} from '@/util/utils'
import { WidgetDraggable } from '../mixins/CommonMixins'
import WidgetFormItemMixins from '../mixins/WidgetFormItemMixins'
import {ctypes} from './componentsConfig'
import JSelectUser from './jeecgbiz/JSelectUser'
import JSelectDepart from './jeecgbiz/JSelectDepart'
import JButton from './jeecg/JButton'
import JTableDict from './jeecgbiz/JTableDict'
import JText from './jeecg/JText'
import JDivider from './jeecg/JDivider'
import JFileUpload from './jeecg/JFileUpload'
import JAreaLinkage from './jeecg/JAreaLinkage'


export default {
  name: 'WidgetFormItem',
  mixins: [WidgetDraggable, WidgetFormItemMixins],
  props: ['element', 'select', 'index', 'data'],
  components: {
    FmUpload,
    FmEditor,
    JEditable,
    // update-end--Author:sunjianlei Date:20190527 for：新增子表组件区域
    JSelectUser, JSelectDepart, JButton, JTableDict, JText, JDivider, JFileUpload, JAreaLinkage
    // update-end--Author:sunjianlei Date:20190613 for：新增自定义组件 --------
  },
  data () {
    return {
      ctypes,
      handleBhlfil
      // selectWidget: this.select
    }
  },
  computed: {
  // update-begin--Author:sunjianlei Date:20190613 for：匹配按钮组件 --------
    isButton() {
      return this.element.type === 'buttons'
    },
    formItemLabel() {
      if (this.isButton || this.element.hideLabel === true || this.element.hideTitle === true) {
        return null
      }
      return this.element.name
    },
    formItemClass() {
      return {
        'active': this.selectWidget.key == this.element.key,
        'is_req': this.element.options.required,
        'is-j-button': this.isButton
      }
    }
    // update-end--Author:sunjianlei Date:20190613 for：匹配按钮组件 --------
  },
  mounted () {
      // update-begin--Author:sunjianlei Date:20190722 for：新增数据字典的处理 ----------------
      if (this.element.options.remote === 'dict' && this.element.options.dictCode) {
          // 如果是数据字典，就通过 code 查询字典 item
          _api.getDictItems({
              code: this.element.options.dictCode
          }).then(dictOptions => {
            this.$set(this.element, 'dictOptions', dictOptions)
            let arr = [];
            dictOptions.forEach(item => {
              let obj = {...item}
              obj.value = item.value;
              obj.targets = [];
              // 如果出现数字典修改的情况
              if(Array.isArray(this.element.behaviorLinkage)){
                 this.element.behaviorLinkage.forEach(it=>{
                  if(obj.value === it.value){
                    obj.targets = it.targets
                  }
                }) 
              }
              
              arr.push(obj)
            })
            this.$set(this.element, 'behaviorLinkage', arr)
            this.fllinkage();
          })
      }
      // update-end--Author:sunjianlei Date:20190722 for：新增数据字典的处理 ----------------
      else if(this.element.options.remote === 'dict_obj' && this.element.options.dictObjCode){
        // 对象字典
        _api.getDictObjItems({
            code: this.element.options.dictObjCode
        }).then(dictObjOptions => {
          this.$set(this.element, 'dictObjOptions', dictObjOptions)
        })
      }
  },
  methods: {
    fllinkage(){
      // 选中的组件添加（删除）一个class类
      let arr = [];
      this.data.list.forEach(item=>{
        if(Array.isArray(item.behaviorLinkage)){
          let behaviorLinkage = item.behaviorLinkage;
          if(Array.isArray(behaviorLinkage) && behaviorLinkage.length >0){
            behaviorLinkage.forEach(it => {
              let targets = it.targets;
              if(Array.isArray(targets) && targets.length > 0){
                targets.forEach(li => {
                  arr.push(li);
                })
              }
            })
          }
        }
      })
      this.data.list.map(item=>{
        // let items = {...item}
        if(item.model !== this.data.model){
          if(arr.includes(item.model)){
            item.cellLinkage = true
          }else{
            item.cellLinkage = false;
            item.assoStatus = 2
          }
        }
        return item
      })
    },
    // handleSelectWidget (index) {
    //   this.selectWidget = this.data.list[index]
    // },
    // handleWidgetDelete (index) {
    //   if (this.data.list.length - 1 === index) {
    //     if (index === 0) {
    //       this.selectWidget = {}
    //     } else {
    //       this.selectWidget = this.data.list[index - 1]
    //     }
    //   } else {
    //     this.selectWidget = this.data.list[index + 1]
    //   }
    //
    //   this.$nextTick(() => {
    //     this.data.list.splice(index, 1)
    //   })
    // },
    // -- update-begin--Author:sunjianlei Date:20190807 for：复制逻辑封装 --
    // handleWidgetClone(index) {
    //   _util.cloneWidget(this, index)
    // },
    // -- update-begin--Author:sunjianlei Date:20190807 for：复制逻辑封装 --
  },
  // watch: {
  //   select (val) {
  //     this.selectWidget = val
  //   },
  //   selectWidget: {
  //     handler (val) {
  //       this.$emit('update:select', val)
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<!-- update-begin--Author:sunjianlei Date:20190613 for：匹配按钮组件 -->
<style lang="scss">
   .widget-view{
     &.is-j-button {
        padding-top: 10px !important;
        padding-bottom: 10px !important;
      }
      &.cellLinkage--9tg5O {
          opacity: 0.6;
      }
      .leftCornerMark--3_a15 {
        position: absolute;
        top: -47px;
        left: -10px;
        width: 0;
        height: 0;
        border-top: 16px solid #409EFF;
        border-right: 16px solid transparent;
        z-index: 10;
        opacity: 1 !important;
      }
   }

</style>
<style lang="scss" scoped>
</style>
<!-- update-end--Author:sunjianlei Date:20190613 for：匹配按钮组件 -->