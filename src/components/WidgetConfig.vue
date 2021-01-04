<template>
  <div v-if="show">{{list}}
    <el-form label-position="top" size="small">
      <div 
        class="secIdCard-elAlart"
        v-if="data.type === 'secIdCard'">
        <i class="el-icon-warning"></i>将自动检验身份证号码的正确性
      </div>
      <div 
        class="secIdCard-elAlart"
        v-if="data.type === 'tels'">
        <i class="el-icon-warning"></i>将自动检验号码的正确性,可在手机上直接点击拨打
      </div>
      <!-- update-begin--Author:sunjianlei Date:20190708 for：修改标题的展示逻辑 -->
      <el-form-item label="标题" v-if=" !data.hideLabel">
        <el-input v-model="data.name"></el-input>
        <div style="text-align: right">
          <el-checkbox v-model="data.hideTitle">隐藏标题</el-checkbox>
        </div>
      </el-form-item>
      <!-- update-end--Author:sunjianlei Date:20190708 for：修改标题的展示逻辑 -->

      <!-- update-begin--Author:sunjianlei Date:20200218 for：新增卡片属性 -->
      <template v-if="data.type === ctypes.card">
        <el-form-item label="卡片标题">
          <el-input v-model="data.name"></el-input>
        </el-form-item>
      </template>
      <!-- update-end--Author:sunjianlei Date:20200218 for：新增卡片属性 -->

      <el-form-item label="宽度" v-if="optionsKeys.includes('width')">
        <el-input v-if="data.isSubItem" v-model="data.subOptions.width"/>
        <el-input v-else v-model="data.options.width"/>
      </el-form-item>

      <el-form-item label="高度" v-if="Object.keys(data.options).indexOf('height')>=0">
        <el-input v-model="data.options.height"></el-input>
      </el-form-item>

      <el-form-item label="大小" v-if="Object.keys(data.options).indexOf('size')>=0">
        <div style="margin-bottom: 4px">
          <span>宽度：</span>
          <el-input-number v-model.number="data.options.size.width" controlsPosition="right"/>
        </div>
        <div>
          <span>高度：</span>
          <el-input-number v-model.number="data.options.size.height" controlsPosition="right"/>
        </div>
      </el-form-item>

      <template v-if="data.type ==='daterange'">
        <el-form-item label="开始时间标题" >
          <el-input v-model="data.options.startName"></el-input>
        </el-form-item>
        <el-form-item label="结束时间标题">
          <el-input v-model="data.options.endName"></el-input>
        </el-form-item>
        <el-form-item label="开始时间占位符" >
          <el-input v-model="data.options.startPlaceholder"></el-input>
        </el-form-item>
        <el-form-item label="结束时间占位符">
          <el-input v-model="data.options.endPlaceholder"></el-input>
        </el-form-item>
        <el-form-item label="日期类型">
          <el-select v-model="data.options.formatType" placeholder="请选择">
            <el-option label="年-月-日" :value="1"></el-option>
            <el-option label="年-月-日 时:分:秒" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自动计算时长">
          <el-switch v-model="data.options.durationType" ></el-switch>
        </el-form-item>
        <el-form-item label="时长标题">
          <el-input v-model="data.options.durationName"></el-input>
        </el-form-item>
      </template>

      <el-form-item label="占位内容" v-if="Object.keys(data.options).indexOf('placeholder')>=0 && (data.type!='time' || data.type!='date')">
        <el-input v-model="data.options.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="布局方式" v-if="Object.keys(data.options).indexOf('inline')>=0">
        <el-radio-group v-model="data.options.inline">
          <el-radio-button :label="false">块级</el-radio-button>
          <el-radio-button :label="true">行内</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示输入框" v-if="Object.keys(data.options).indexOf('showInput')>=0">
        <el-switch v-model="data.options.showInput" ></el-switch>
      </el-form-item>
      <!-- 金额是否开启大写-->
      <el-form-item v-if="data.type==='amountWords'">
        <template #label>
          <span>显示大写<span style="font-size:12px;padding-left:5px">(输入自然数后自动显示大写)</span></span>
        </template>
        <el-switch v-model="data.options.capitaled" />
      </el-form-item>
      <!--电话开启固话手机--->
      <el-form-item label="类型" v-if="data.type==='tels'">
        <el-radio-group v-model="data.options.telType">
          <el-radio :label="1">手机和固话</el-radio>
          <el-radio :label="2">仅手机</el-radio>
          <el-radio :label="3">仅固话</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- update-begin--Author:sunjianlei Date:20190611 for：修改计数器默认值 -->
      <el-form-item label="控制按钮" v-if="Object.keys(data.options).indexOf('controls')>=0">
        <el-switch v-model="data.options.controls"/>
      </el-form-item>
      <el-form-item label="控制按钮位置" v-if="Object.keys(data.options).indexOf('controlsPosition')>=0">
        <el-select v-model="data.options.controlsPosition" placeholder="请选择控制按钮位置" style="width:100%">
          <el-option label="两侧" :value="null"/>
          <el-option label="右侧" value="right"/>
        </el-select>
      </el-form-item>
      <el-form-item label="最小值" v-if="Object.keys(data.options).indexOf('min')>=0">
        <el-input-number v-model="data.options.min" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="最大值" v-if="Object.keys(data.options).indexOf('max')>=0">
        <el-input-number v-model="data.options.max" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="步长" v-if="Object.keys(data.options).indexOf('step')>=0">
        <el-input-number v-model="data.options.step" :step="1"></el-input-number>
      </el-form-item>
      <!-- update-end--Author:sunjianlei Date:20190611 for：修改计数器默认值 -->
      <el-form-item label="是否多选" v-if="data.type=='select'">
        <el-switch v-model="data.options.multiple" @change="handleSelectMuliple"></el-switch>
      </el-form-item>
      <el-form-item label="是否可搜索" v-if="data.type=='select'">
        <el-switch v-model="data.options.filterable"></el-switch>
      </el-form-item>
      <el-form-item label="允许半选" v-if="Object.keys(data.options).indexOf('allowHalf')>=0">
        <el-switch
            v-model="data.options.allowHalf"
          >
          </el-switch>
      </el-form-item>
      <el-form-item label="支持透明度选择" v-if="Object.keys(data.options).indexOf('showAlpha')>=0">
        <el-switch
            v-model="data.options.showAlpha"
          >
          </el-switch>
      </el-form-item>
      <el-form-item label="是否显示标签" v-if="Object.keys(data.options).indexOf('showLabel')>=0">
        <el-switch
            v-model="data.options.showLabel"
          >
        </el-switch>
      </el-form-item>

      <!-- update-begin--Author:sunjianlei Date:20200220 for：switch新增属性  -->
      <el-form-item label="开启时的值" v-if="optionsKeys.includes('activeValue')">
        <el-input :value="data.options.activeValue" placeholder="不填默认为 true" @input="v=>handleSwitchActiveChange(true, v)"/>
      </el-form-item>
      <el-form-item label="关闭时的值" v-if="optionsKeys.includes('inactiveValue')">
        <el-input :value="data.options.inactiveValue" placeholder="不填默认为 false" @input="v=>handleSwitchActiveChange(false, v)"/>
        <p v-if="activeValueEqInactiveValue" class="j-p-tip" style="color: red;">开启时的值和关闭时的值不能相同</p>
      </el-form-item>
      <!-- update-begin--Author:sunjianlei Date:20200220 for：switch新增属性  -->

      <el-form-item label="选项" v-if="Object.keys(data.options).indexOf('options')>=0">
        <el-radio-group v-model="data.options.remote" size="mini" style="margin-bottom:10px;">
          <el-radio-button :label="false">静态数据</el-radio-button>
          <!-- update-begin--Author:sunjianlei Date:20190521 for：新增数据字典对接参数 -->
          <el-radio-button label="dict">数据字典</el-radio-button>
          <el-radio-button :label="true">远端数据</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote === 'dict'">
          <el-select
              v-model="data.options.dictCode"
              filterable
              placeholder="请选择数据字典"
              style="width:100%"
              @change="handleOptionsDictChange"
          >
            <el-option
                v-for="item in dictOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
            </el-option>
          </el-select>
          <template v-if="!!data.dictOptions">
            <div style="padding: 4px 0;">
              <span>默认值</span>
              <el-divider direction="vertical"/>
              <el-button type="text" @click="handleOptionsClearDefaultValue">清空</el-button>
            </div>
            <!-- radio 默认值-->
            <template v-if="data.type === 'radio'">
              <el-radio-group v-model="data.options.defaultValue" :style="{width: '100%'}">
                <el-radio
                        v-for="(item, index) in data.dictOptions" :key="item.value + index"
                        :style="{display: 'inline-block' }"
                        :label="item.value"
                >
                  {{item.label}}
                </el-radio>
              </el-radio-group>
            </template>
            <!-- checkbox 默认值 -->
            <template v-else-if="data.type === 'checkbox'">
              <el-checkbox-group v-model="data.options.defaultValue" :style="{width: '100%'}">
                <el-checkbox
                        v-for="(item, index) in data.dictOptions" :key="item.value + index"
                        :style="{display: 'inline-block' }"
                        :label="item.value"
                >
                  {{item.label}}
                </el-checkbox>
              </el-checkbox-group>
            </template>
            <!-- select 默认值 -->
            <template v-else-if="data.type === 'select'">
              <el-select
                      v-model="data.options.defaultValue"
                      :multiple="data.options.multiple"
                      :style="{width: '100%'}"
              >
                <el-option
                        v-for="item in data.dictOptions"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                ></el-option>
              </el-select>
            </template>
          </template>
        </template>
        <!-- update-end--Author:sunjianlei Date:20190521 for：新增数据字典对接参数 -->
        <template v-else-if="data.options.remote">
          <div class="j-input-prepend-mini">
            <el-input size="mini" v-model="data.options.remoteFunc">
              <template slot="prepend">URL</template>
            </el-input>
            <el-input size="mini" v-model="data.options.props.value">
              <template slot="prepend">值</template>
            </el-input>
            <el-input size="mini" v-model="data.options.props.label">
              <template slot="prepend">标签</template>
            </el-input>
          </div>
        </template>
        <template v-else>
          <template v-if="data.type=='radio' || (data.type=='select'&&!data.options.multiple)">
            <el-radio-group v-model="data.options.defaultValue">
              <draggable tag="ul" :list="data.options.options"
                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index" >
                  <el-radio
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.value"></el-input>
                    <el-input style="width:90px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                    <!-- <input v-model="item.value"/> -->
                  </el-radio>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-bars"></i></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>

            </el-radio-group>
          </template>

          <template v-if="data.type=='checkbox' || (data.type=='select' && data.options.multiple)">
            <el-checkbox-group v-model="data.options.defaultValue">

              <draggable tag="ul" :list="data.options.options"
                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index" >
                  <el-checkbox
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.value"></el-input>
                    <el-input style="width:90px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                  </el-checkbox>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-bars"></i></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>
            </el-checkbox-group>
          </template>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddOption">添加选项</el-button>
            <el-divider direction="vertical"/>
            <el-button type="text" @click="handleRemoveDefaultValue">清空默认值</el-button>
            <template v-if="data.type==='radio'">
              <el-divider direction="vertical"/>
              <el-button type="text" @click="handleBehaviorLinkage">选项关联<span v-if="dvValue[`${data.model}_dvValueBo`]">(已设置)</span></el-button>
            </template>
            
          </div>
        </template>

      </el-form-item>

      <el-form-item label="远端数据" v-if="data.type=='cascader'">
        <div>
          <el-input size="mini" style="" v-model="data.options.remoteFunc">
            <template slot="prepend">远端方法</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.value">
            <template slot="prepend">值</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.label">
            <template slot="prepend">标签</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.children">
            <template slot="prepend">子选项</template>
          </el-input>
        </div>
      </el-form-item>

      <!-- update-begin--Author:sunjianlei Date:20190710 for：扩展默认值字段  -->
      <el-form-item label="默认值" v-if="Object.keys(data.options).indexOf('defaultValue')>=0 && (['select-depart','select-user','textarea','input','number','rate','color','switch','date','slider','area-linkage','editor','table-dict'].indexOf(data.type)>=0)">
        <el-input v-if="data.type=='textarea'" type="textarea" :rows="5" v-model="data.options.defaultValue"></el-input>
        <el-input v-if="data.type=='input'" v-model="data.options.defaultValue"></el-input>
        <el-input-number v-if="data.type=='number'" v-model="data.options.defaultValue"/>
        <el-rate v-if="data.type == 'rate'" style="display:inline-block;vertical-align: middle;" :max="data.options.max" :allow-half="data.options.allowHalf" v-model="data.options.defaultValue"></el-rate>
        <el-button type="text" v-if="data.type == 'rate'" style="display:inline-block;vertical-align: middle;margin-left: 10px;" @click="data.options.defaultValue=0">清空</el-button>
        <el-color-picker
          v-if="data.type == 'color'"
          v-model="data.options.defaultValue"
          :show-alpha="data.options.showAlpha"
        ></el-color-picker>

        <el-switch
            v-if="data.type=='switch'"
            v-model="data.options.defaultValue"
            :active-value="data.options.activeValue||true"
            :inactive-value="data.options.inactiveValue||false"
        />

        <template v-if="data.type === 'date'" >
           <el-radio-group v-model="data.options.defaultValueType" size="mini" @input="data.options.defaultValue=''" >
              <el-radio-button :label="1">选择值</el-radio-button>
              <el-radio-button :label="2">输入值</el-radio-button>
           </el-radio-group>
          <div style="padding: 4px 0;"></div>
           <el-date-picker
               v-if="data.options.defaultValueType==1"
               v-model="data.options.defaultValue"
               placeholder="请选择日期"
               style="width: 100%"
           />
          <el-input v-else v-model="data.options.defaultValue" placeholder="请输入日期"/>
        </template>

        <template v-if="data.type === 'slider'" >
          <el-input-number
              v-model="data.options.defaultValue"
              :min="data.options.min"
              :max="data.options.max"
          />
        </template>
        <template v-if="data.type === 'select-user'">
          <j-select-user v-model="data.options.defaultValue" :disabled="data.options.defaultLogin" :element="data"/>
          <div style="text-align: right">
            <el-checkbox v-model="data.options.defaultLogin">默认为当前登录用户</el-checkbox>
          </div>
        </template>
        <template v-if="data.type === 'select-depart'">
          <j-select-depart v-model="data.options.defaultValue" :disabled="data.options.defaultLogin" :element="data"/>
          <div style="text-align: right">
            <el-checkbox v-model="data.options.defaultLogin">默认为当前登录部门</el-checkbox>
          </div>
        </template>

        <template v-if="data.type === 'area-linkage'">
          <j-area-linkage v-model="data.options.defaultValue" />
        </template>

        <template v-if="data.type === 'editor'">
          <el-input v-model="data.options.defaultValue"/>
        </template>
        <template v-if="data.type=='table-dict'">
          <j-table-dict v-model="data.options.defaultValue" :element="data"/>
        </template>
      </el-form-item>
      <!-- update-end--Author:sunjianlei Date:20190710 for：扩展默认值字段  -->

      <!-- update-begin--Author:sunjianlei Date:20200103 for：新增填值规则字段  -->
      <el-form-item label="填值规则" v-if="data.type === 'input' || data.type === 'textarea'">
        <el-input v-model="data.options.fillRuleCode"/>
      </el-form-item>
      <!-- update-end--Author:sunjianlei Date:20200103 for：新增填值规则字段  -->

      <template v-if="data.type == 'time' || data.type == 'date'">
        <el-form-item label="显示类型" v-if="data.type == 'date'">
          <el-select v-model="data.options.type">
            <el-option value="year"></el-option>
            <el-option value="month"></el-option>
            <el-option value="date"></el-option>
            <el-option value="dates"></el-option>
            <!-- <el-option value="week"></el-option> -->
            <el-option value="datetime"></el-option>
            <el-option value="datetimerange"></el-option>
            <el-option value="daterange"></el-option>
          </el-select>
        </el-form-item>
        <!-- update-begin--Author:sunjianlei Date:20190731 for：日期格式位置调整 -->
        <el-form-item label="格式">
          <el-input v-model="data.options.format"></el-input>
        </el-form-item>
        <!-- update-end--Author:sunjianlei Date:20190731 for：日期格式位置调整 -->

        <el-form-item label="是否为范围选择" v-if="data.type == 'time'">
          <el-switch
            v-model="data.options.isRange"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="是否获取时间戳" v-if="data.type == 'date'">
          <el-switch
            v-model="data.options.timestamp"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="占位内容" v-if="(!data.options.isRange && data.type == 'time') || (data.type != 'time' && data.options.type != 'datetimerange' && data.options.type != 'daterange')">
          <el-input v-model="data.options.placeholder"></el-input>
        </el-form-item>
        <el-form-item label="开始时间占位内容" v-if="(data.options.isRange) || data.options.type=='datetimerange' || data.options.type=='daterange'">
          <el-input v-model="data.options.startPlaceholder"></el-input>
        </el-form-item>
        <el-form-item label="结束时间占位内容" v-if="data.options.isRange || data.options.type=='datetimerange' || data.options.type=='daterange'">
          <el-input v-model="data.options.endPlaceholder"></el-input>
        </el-form-item>
        <el-form-item label="默认值" v-if="data.type=='time' && Object.keys(data.options).indexOf('isRange')>=0">
          <el-time-picker
            key="1"
            style="width: 100%;"
            v-if="!data.options.isRange"
            v-model="data.options.defaultValue"
            :arrowControl="data.options.arrowControl"
            :valueFormat="data.options.format"
          >
          </el-time-picker>
          <el-time-picker
            key="2"
            v-if="data.options.isRange"
            style="width: 100%;"
            v-model="data.options.defaultValue"
            is-range
            :arrowControl="data.options.arrowControl"
            :valueFormat="data.options.format"
          >
          </el-time-picker>
        </el-form-item>
      </template>

      <!-- update-begin--Author:sunjianlei Date:20190716 for：修复图片上传长度控制不生效的问题 -->
      <template v-if="data.type=='imgupload'">
        <el-form-item label="最大上传数">
          <el-input-number v-model.number="data.options.length" :min="1"/>
        </el-form-item>
        <el-form-item v-if="false" label="Domain" :required="true">
          <el-input v-model="data.options.domain"></el-input>
        </el-form-item>
        <el-form-item v-if="false" label="获取七牛Token方法" :required="true">
          <el-input v-model="data.options.tokenFunc"></el-input>
        </el-form-item>
      </template>
      <!-- update-end--Author:sunjianlei Date:20190716 for：修复图片上传长度控制不生效的问题 -->

      <template v-if="data.type=='blank'">
        <el-form-item label="绑定数据类型">
          <el-select v-model="data.options.defaultType">
            <el-option value="String" label="字符"></el-option>
            <el-option value="Object" label="对象"></el-option>
            <el-option value="Array" label="数组"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <!-- update-begin--Author:sunjianlei Date:20190529 for：子表属性 -->
      <template v-if="data.type == 'sub-table'">
        <el-form-item label="选择子表">
          <el-select v-model="data.options.subTableName" @change="handleSubTableChange">
            <el-option
                v-for="item in subTableOptions"
                :key="item.value"
                :label="item.label || item.value"
                :value="item.value"
                :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="列配置项">

          <div class="subtab-column" v-for="(item, index) in data.options.subTableColumns" :key="index">
            <div class="subtab-label">Key：</div>
            <!--<el-input class="subtab-input" placeholder="Key" size="mini" v-model="item.prop"/>-->
            <el-select class="subtab-input" v-model="item.prop" size="mini"  filterable allow-create>
              <el-option
                  v-for="item in currentSubtabFields"
                  :key="item.value"
                  :label="item.label || item.value"
                  :value="item.value"
                  :disabled="item.disabled">
              </el-option>
            </el-select>
            <br>
            <div class="subtab-label">标题：</div>
            <el-input class="subtab-input" placeholder="标题" size="mini" v-model="item.label"/>
            <br>
            <div class="subtab-label">宽度：</div>
            <el-input class="subtab-input" placeholder="宽度" size="mini" v-model="item.width"/>
            <br>
            <div class="subtab-label">默认值：</div>
            <el-input class="subtab-input" placeholder="默认值" size="mini" v-model="item.defaultValue"/>

            <div class="subtab-btns smini">
              <el-button type="danger" plain @click="()=>handleSubTableRemove(index)">删除</el-button>
            </div>

          </div>

          <div class="subtab-btns smini">
            <el-button type="primary" plain @click="handleSubTableAdd">添加一列</el-button>
          </div>

        </el-form-item>
      </template>
      <!-- update-end--Author:sunjianlei Date:20190529 for：子表属性 -->

      <!-- update-begin--Author:sunjianlei Date:20190531 for：新增设计子表属性 -->
      <template v-if="data.type == 'sub-table-design'">
        <el-form-item label="绑定子表">
          <el-select v-model="data.options.subTableName" placeholder="请选择子表" style="width: 100%" @change="handleSubTableChange">
            <el-option
                v-for="item in subTableOptions"
                :key="item.value"
                :label="item.label || item.value"
                :value="item.value"
                :disabled="item.disabled">
            </el-option>
          </el-select>
          <div v-if="currentSubtabFieldSource.length>0" style="margin-top: 8px;text-align: right;" >
            <el-button type="primary" plain @click="handleClickGenerateSubTable" >生成表单</el-button>
          </div>
        </el-form-item>

        <el-form-item label="布局列数">
          <el-radio-group v-model="data.options.columnNumber" size="mini" @change="handleChangeColumnNumber" >
            <el-radio-button :label="1">单列</el-radio-button>
            <el-radio-button :label="2">双列</el-radio-button>
            <el-radio-button :label="3">三列</el-radio-button>
            <el-radio-button :label="4">四列</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="默认行数">
          <el-input-number v-model="data.options.defaultRows" :min="0"/>
        </el-form-item>
        <el-form-item label="操作控制">
          <el-checkbox v-model="data.options.allowAdd" style="margin-right: 0;">允许新增</el-checkbox>
          <el-divider direction="vertical"/>
          <el-checkbox v-model="data.options.showCheckbox">显示复选框</el-checkbox>
          <el-checkbox v-model="data.options.showNumber" style="margin-right: 0;">显示序号</el-checkbox>
          <el-divider direction="vertical"/>
          <el-checkbox v-model="data.options.showRowButton">显示操作按钮</el-checkbox>
          <el-checkbox v-model="data.options.autoHeight">自适应高度</el-checkbox>
        </el-form-item>
      </template>
      <!-- update-end--Author:sunjianlei Date:20190531 for：新增设计子表属性 -->

      <!-- update-begin--Author:sunjianlei Date:20190614 for：新增自定义组件的属性 -->
      <template v-if="data.type == 'table-dict'">
        <el-form-item label="风格选择" :required="true">
          <el-radio-group v-model="data.options.style" size="mini">
            <el-radio-button label="popup">弹出选择</el-radio-button>
            <el-radio-button label="select">下拉选择</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字典Table" :required="true" >
          <el-input placeholder="请输入字典Table" v-model="data.options.dictTable"/>
        </el-form-item>
        <el-form-item label="字典Code" :required="true" >
          <el-input placeholder="请输入字典Code" v-model="data.options.dictCode"/>
        </el-form-item>
        <el-form-item label="字典Text" :required="true" >
          <el-input placeholder="请输入字典Text" v-model="data.options.dictText"/>
        </el-form-item>
      </template>

      <template v-if="data.type == ctypes.fileUpload">
        <el-form-item label="允许拖拽">
          <el-switch v-model="data.options.drag"/>
        </el-form-item>
        <el-form-item label="最大上传数量" :required="true">
          <el-input-number v-model="data.options.length" :min="1"/>
        </el-form-item>
        <el-form-item label="允许多选">
          <el-switch v-model="data.options.multiple"/>
        </el-form-item>
        <el-form-item label="上传按钮文字">
          <el-input v-model="data.options.buttonText"/>
        </el-form-item>
      </template>
      <!-- update-end--Author:sunjianlei Date:20190614 for：新增自定义组件的属性 -->

      <!-- update-begin--Author:sunjianlei Date:20190613 for：新增按钮属性 -->
      <template v-if="data.type == 'buttons'">
        <el-form-item label="显示文字">
          <!-- 兼容使用 element.name 的旧版本 -->
          <el-input v-if="data.name!=='按钮'" v-model="data.name" @input="data.options.text=data.name;data.name='按钮'"/>
          <el-input v-else v-model="data.options.text" @input="data.name='按钮'"/>
        </el-form-item>
        <el-form-item label="按钮尺寸">
          <el-select v-model="data.options.btnSize">
            <el-option value="default" label="默认尺寸"/>
            <el-option value="medium" label="中等按钮"/>
            <el-option value="small" label="小型按钮"/>
            <el-option value="mini" label="超小按钮"/>
          </el-select>
        </el-form-item>
        <el-form-item label="按钮类型">
          <el-select v-model="data.options.type">
            <el-option value="default" label="默认按钮"/>
            <el-option value="primary" label="主要按钮"/>
            <el-option value="success" label="成功按钮"/>
            <el-option value="info" label="信息按钮"/>
            <el-option value="warning" label="警告按钮"/>
            <el-option value="danger" label="危险按钮"/>
            <el-option value="text" label="文字按钮"/>
          </el-select>
        </el-form-item>
        <el-form-item label="图标类名">
          <el-input v-model="data.options.icon"></el-input>
        </el-form-item>
        <el-form-item label="属性">
          <el-checkbox v-model="data.options.plain">朴素按钮</el-checkbox>
          <br>
          <el-checkbox v-model="data.options.round">圆角按钮</el-checkbox>
          <br>
          <el-checkbox v-model="data.options.circle">圆形按钮</el-checkbox>
          <br>
          <el-checkbox v-model="data.options.disabled">禁用	</el-checkbox>
        </el-form-item>
        <div class="ta-full-screen-box" :data-full-screen="fs.btn">
          <el-button v-if="!fs.btn" class="ta-fs-button" @click="fs.btn=true">全屏</el-button>
          <el-button v-else class="ta-fs-button-close" type="danger" icon="el-icon-close" circle plain @click="fs.btn=false"></el-button>
          <el-form-item label="点击事件">
            <div class="ta-fs-content">
              <el-input type="textarea" :rows="5" v-model="data.event.click"/>
            </div>
          </el-form-item>
        </div>
      </template>
      <!-- update-end--Author:sunjianlei Date:20190613 for：新增按钮属性 -->

      <!-- update-begin--Author:sunjianlei Date:20190620 for：新增卡片属性 -->
      <template v-if=" data.type == ctypes.card">
      </template>
      <!-- update-end--Author:sunjianlei Date:20190620 for：新增卡片属性 -->

      <!-- update-begin--Author:sunjianlei Date:20190621 for：新增Tabs属性 -->
      <template v-if=" data.type == ctypes.tabs">
        <el-form-item label="风格类型">
          <el-radio-group v-model="data.options.type" size="mini">
            <el-radio-button label="default">默认样式</el-radio-button>
            <el-radio-button label="card">选项卡样式</el-radio-button>
            <el-radio-button label="border-card">卡片化样式</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选项卡所在位置">
          <el-radio-group v-model="data.options.position" size="mini">
            <el-radio-button label="top">顶部</el-radio-button>
            <el-radio-button label="right">右侧</el-radio-button>
            <el-radio-button label="bottom">底部</el-radio-button>
            <el-radio-button label="left">左侧</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <h3>子Tab属性</h3>
        <div v-for="(pane,i) of data.panes" :key="i" v-if="pane.name === data.options.activeName">
          <el-form-item label="Tab标题">
            <el-input placeholder="Tab标题" v-model="pane.label"/>
          </el-form-item>
        </div>
      </template>
      <!-- update-end--Author:sunjianlei Date:20190621 for：新增Tabs属性 -->

      <!-- update-begin--Author:sunjianlei Date:20190704 for：新增Text属性 -->
      <template v-if="data.type==ctypes.text">
        <el-form-item label="文本内容">
          <el-input type="textarea" v-model="data.options.text"/>
        </el-form-item>
        <el-form-item label="行高">
          <el-input v-model="data.options.lineHeight"/>
        </el-form-item>
        <el-form-item label="对齐方式">
          <el-radio-group v-model="data.options.align" size="mini">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="center">居中对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字体大小">
          <el-input-number v-model="data.options.fontSize" :step="1" :min="1" :max="100"/> px
        </el-form-item>
        <el-form-item label="字体颜色">
          <el-row :gutter="8">
            <el-col :span="10">
              <el-input v-model="data.options.fontColor"/>
            </el-col>
            <el-col :span="4">
              <el-color-picker v-model="data.options.fontColor"/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="字体样式">
          <el-checkbox v-model="data.options.fontBold">加粗</el-checkbox>
          <el-checkbox v-model="data.options.fontItalic">斜体</el-checkbox>
          <el-checkbox v-model="data.options.fontUnderline">下划线</el-checkbox>
          <el-checkbox v-model="data.options.fontLineThrough">删除线</el-checkbox>
        </el-form-item>
      </template>
      <!-- update-end--Author:sunjianlei Date:20190704 for：新增Text属性 -->

      <!-- update-begin--Author:sunjianlei Date:20190704 for：新增 分割符 属性 -->
      <template v-if="data.type === ctypes.divider">
        <el-form-item label="类型">
          <el-radio-group v-model="data.options.type" size="mini">
            <el-radio-button label="horizontal">横向分隔符</el-radio-button>
            <el-radio-button label="vertical">纵向分隔符</el-radio-button>
            <el-radio-button label="placeholder">占位符</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="边距">
          <el-input-number v-model="data.options.heightNumber" :min="0"/>
        </el-form-item>
        <template v-if="data.options.type==='horizontal'">
          <el-form-item label="展示文本">
            <el-input v-model="data.options.text" placeholder="显示在分隔符上的文字" />
          </el-form-item>
          <el-form-item label="文本方向">
            <el-radio-group v-model="data.options.position" size="mini">
              <el-radio-button label="left">左边</el-radio-button>
              <el-radio-button label="center">中间</el-radio-button>
              <el-radio-button label="right">右边</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </template>
      </template>
      <!-- update-end--Author:sunjianlei Date:20190704 for：新增 分割符 属性 -->

      <template v-if="data.type == 'grid'">
        <el-form-item label="栅格间隔">
          <el-input-number v-model.number="data.options.gutter" controlsPosition="right"/>
        </el-form-item>
        <el-form-item label="列配置项">
          <draggable tag="ul" :list="data.columns"
            v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
            handle=".drag-item"
          >
            <li v-for="(item, index) in data.columns" :key="index" >
              <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-bars"></i></i>
              <el-input-number v-model.number="item.span" placeholder="栅格值"  controlsPosition="right"/>

              <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddColumn">添加列</el-button>
          </div>
        </el-form-item>
        <el-form-item label="水平排列方式">
          <el-select v-model="data.options.justify">
            <el-option value="start" label="左对齐"></el-option>
            <el-option value="end" label="右对齐"></el-option>
            <el-option value="center" label="居中"></el-option>
            <el-option value="space-around" label="两侧间隔相等"></el-option>
            <el-option value="space-between" label="两端对齐"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="垂直排列方式">
          <el-select v-model="data.options.align">
            <el-option value="top" label="顶部对齐"></el-option>
            <el-option value="middle" label="居中"></el-option>
            <el-option value="bottom" label="底部对齐"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <!-- update-begin--Author:sunjianlei Date:20190705 for：新增其他通用属性 -->


      <template v-if="['select-user','select-depart'].indexOf(data.type)>=0">
        <el-form-item label="自定义返回字段">
          <el-select v-model="data.options.customReturnField" style="width: 100%">
            <template v-for="option of customReturnFieldOptions[data.type]">
              <el-option :value="option.value" :label="option.label"/>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item label="数据绑定映射">
          <el-button @click="data.options.keyMaps.push({from:'',to:''})" style="margin-bottom: 8px">新增映射</el-button>
          <el-row v-for="(item,i) of data.options.keyMaps" :key="i" :gutter="8" style="margin-bottom: 8px">
            <el-col :span="10">
              <el-input v-model="item.from" placeholder="From"/>
            </el-col>
            <el-col :span="10">
              <el-input v-model="item.to" placeholder="To"/>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" icon="el-icon-delete" circle @click="data.options.keyMaps.splice(i,1)"/>
            </el-col>
          </el-row>
        </el-form-item>
      </template>



      <el-form-item label="CSS类名" v-if="Object.keys(data).indexOf('className')>=0">
        <el-input v-model="data.className"/>
      </el-form-item>
      <!-- update-end--Author:sunjianlei Date:20190705 for：新增其他通用属性 -->

      <!-- update-begin--Author:sunjianlei Date:20190531 for：新增设计子表属性 -->
      <template v-if="data.type != 'grid' && data.type != 'sub-table-design' && data.type != 'buttons' && data.type != ctypes.card && data.type != ctypes.tabs && data.type!=ctypes.text && data.type!=ctypes.divider">
        <!-- update-end--Author:sunjianlei Date:20190531 for：新增设计子表属性 -->

        <el-form-item label="数据绑定Key">
          <!-- update-begin--Author:sunjianlei Date:20190521 for：新增Online对接参数 -->
          <el-select v-if="data.isSubItem === true && currentSubtabFields.length > 0" v-model="data.model" filterable allow-create style="width:100%">
              <el-option v-for="item in currentSubtabFields" :key="item.value" :label="item.label || item.value" :value="item.value" :disabled="item.disabled"/>
          </el-select>
          <el-select v-else-if="cgformFields.length > 0" v-model="data.model" filterable allow-create style="width:100%" @change="handleModelChange($event,cgformFields)">
            <el-option v-for="item in cgformFields" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
          <el-input v-else v-model="data.model"/>
          <!-- update-end--Author:sunjianlei Date:20190521 for：新增Online对接参数 -->
        </el-form-item>
        <el-form-item label="操作属性">
          <el-checkbox v-model="data.options.showIcon" v-if="Object.keys(data.options).indexOf('showIcon')>=0">显示图标</el-checkbox>
          <el-checkbox v-model="data.options.readonly" v-if="Object.keys(data.options).indexOf('readonly')>=0">完全只读</el-checkbox>
          <el-checkbox v-model="data.options.disabled" v-if="Object.keys(data.options).indexOf('disabled')>=0">禁用	</el-checkbox>
          <el-checkbox v-model="data.options.hidden" v-if="Object.keys(data.options).indexOf('hidden')>=0">隐藏</el-checkbox>
          <el-checkbox v-model="data.options.editable" v-if="Object.keys(data.options).indexOf('editable')>=0">文本框可输入</el-checkbox>
          <el-checkbox v-model="data.options.clearable" v-if="Object.keys(data.options).indexOf('clearable')>=0">显示清除按钮</el-checkbox>
          <el-checkbox v-model="data.options.arrowControl" v-if="Object.keys(data.options).indexOf('arrowControl')>=0">使用箭头进行时间选择</el-checkbox>
        </el-form-item>
        <el-form-item label="校验" v-if="data.type !== 'switch'">
          <div>
            <el-checkbox v-model="data.options.required">必填</el-checkbox>
          </div>
          <el-select v-if="Object.keys(data.options).indexOf('dataType')>=0" v-model="data.options.dataType" size="mini" >
            <el-option :value="null" label="无校验"></el-option>
            <el-option value="string" label="字符串"></el-option>
            <el-option value="number" label="数字"></el-option>
            <el-option value="boolean" label="布尔值"></el-option>
            <el-option value="integer" label="整数"></el-option>
            <el-option value="float" label="浮点数"></el-option>
            <el-option value="url" label="URL地址"></el-option>
            <el-option value="email" label="邮箱地址"></el-option>
            <el-option value="phone" label="手机号码"></el-option>
            <el-option value="identity" label="身份证号"></el-option>
            <el-option value="hex" label="十六进制"></el-option>
          </el-select>

          <div v-if="Object.keys(data.options).indexOf('pattern')>=0">
            <el-input size="mini" v-model.lazy="data.options.pattern"  style=" width: 240px;" placeholder="填写正则表达式"></el-input>
          </div>
        </el-form-item>
      </template>

      <!-- update-begin--Author:sunjianlei Date:20200110 for：新增远程取值API配置 -->
      <template v-if="!data.isSubItem && data.remoteAPI">
        <el-form-item label="远程取值接口">
          <el-input v-model="data.remoteAPI.url"></el-input>
        </el-form-item>
      </template>
      <!-- update-end--Author:sunjianlei Date:20200110 for：新增远程取值API配置 -->

      <!-- update-begin--Author:sunjianlei Date:20190906 for：新增权限控制 -->
      <el-form-item v-if="data.jeecg_auth" :label="'权限控制' + (data.isSubItem ? '（子表）' : '')">
        <el-checkbox
            v-model="data.jeecg_auth.enabled"
            @change="v=>handleAuthChange(v,data)"
        >开启权限控制
        </el-checkbox>
        <template v-if="data.jeecg_auth.enabled">
          <el-row style="margin: 8px 0;">
            <el-col :span="8" style="text-align: right;">权限名称：</el-col>
            <el-col :span="16">
              <el-input v-model="data.jeecg_auth.title"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" style="text-align: right;">权限字段：</el-col>
            <el-col :span="16">
              <el-input v-model="data.jeecg_auth.field"></el-input>
            </el-col>
          </el-row>
        </template>
      </el-form-item>
      <!-- update-end--Author:sunjianlei Date:20190906 for：新增权限控制 -->

    </el-form>
    <!--//选项关联 -->
    <el-dialog

      title="单选框-选项关联"
      :visible.sync="dvLinkage"
      append-to-body
      destroy-on-close
      custom-class="linkDialog--1pgLy"
      width="700px"
      @closed="dvLinkageClosed">
      <div class="linkModal--1pgLy">
        {{data}}--{{dvValue}}--{{data.model}}
        <div class="description--1CkVL">根据选择的选项，显示其他控件。当前控件和上级选项不能被关联显示。</div>
        <el-table
          :data="dvTableData"
          :header-cell-style="{background:'#f5f7fa'}"
          border
          style="width: 100%">
          <el-table-column
            prop="value"
            label="当前选项为"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.value }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="targets"
            label="显示以下控件">
            <template slot-scope="scope">{{scope.row.targets}}
              <el-select
                style="width:100%"
                v-model="scope.row.targets"
                multiple
                size="medium"
                @change="dvChange"
                @remove-tag="dvRemoveTag"
                placeholder="请选择文章标签">
                <el-option
                  v-for="item in dvOptions"
                  :key="item.fieldId"
                  :label="item.label"
                  :disabled="item.disabled"
                  :value="item.fieldId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dvLinkage = false">取 消</el-button>
        <el-button type="primary" @click="handleSureBtn('dv')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  // update-begin--Author:sunjianlei Date:20190528 for：新增内部查询字典方法 --------------------
  import _api from '../api'
  import { findElementParent, packageOptions } from '@/util/utils'
  import { ctypes } from './componentsConfig'
  import JSelectUser from './jeecgbiz/JSelectUser'
  import JSelectDepart from './jeecgbiz/JSelectDepart'
  import WidgetConfigMixins from '../mixins/WidgetConfigMixins'
  import JAreaLinkage from '@/components/jeecg/JAreaLinkage'
  import FmEditor from './Editor/tinymce'
  import JTableDict from '@/components/jeecgbiz/JTableDict'
  // update-end--Author:sunjianlei Date:20190528 for：新增内部查询字典方法 --------------------

export default {
  mixins: [WidgetConfigMixins],
  components: {
    JTableDict,
    JAreaLinkage, FmEditor,
    // update-begin--Author:sunjianlei Date:20190710 for：扩展组件 --------------------
    Draggable, JSelectUser, JSelectDepart
    // update-end--Author:sunjianlei Date:20190710 for：扩展组件 --------------------

  },
  // update-begin--Author:sunjianlei Date:20190528 for：新增内部查询cgform方法 --------------------
  props: ['data', 'cgform', 'list'],
  // update-end--Author:sunjianlei Date:20190528 for：新增内部查询cgform方法 --------------------
  data() {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null
      },

      // update-begin--Author:sunjianlei Date:20190528 for：新增内部查询方法 --------------------
      ctypes,
      dictOptions: [{label: "Loading...", value: "loading", disabled: true}],
      cgformFields: [],
      subtabFields: {},
      subtabFieldSource: {},
      subTableOptions: [{value: "当前Online表单没有子表", disabled: true}, {label: '点击重新选择Online表单', value: "__reselect-cgform__"}],
      fs: {btn: false}
      // update-end--Author:sunjianlei Date:20190528 for：新增内部查询方法 --------------------

      ,dvLinkage:false,
      dvTableData:[{
				"value": "option_0",
				"targets": [{
          "behavior": "NORMAL",
          "name":"ww1",
					"fieldId": "textarea_1609753889931_528773"
				}]
			}, {
				"value": "option_1",
				"targets": [{
          "behavior": "NORMAL",
          "name":"ww2",
					"fieldId": "textarea_1609753889931_528773"
				}]
			}, {
				"value": "option_2",
				"targets": [{
          "behavior": "NORMAL",
          "name":"ww3",
					"fieldId": "textarea_1609753889931_528773"
				}]
			}],
      // dvDataValue:[],
      dvValue:{
      },
      cacheDvValue:{},
      dvOptions:[]
    }
  },
  computed: {
    show () {
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    },
    // update-begin--Author:sunjianlei Date:20190724 for：修复子表绑定值不正确的问题 --
    currentSubTableName() {
      let subTableName = this.data.options.subTableName

      let parent = findElementParent(this.list, this.data)
      if (parent != null) {
        subTableName = parent.options.subTableName
      }

      if (subTableName !== '__reselect-cgform__') {
        this.querySubTable(subTableName)
      }

      return subTableName
    },
    currentSubtabFieldSource() {
      return this.subtabFieldSource[this.currentSubTableName] || []
    },
    currentSubtabFields() {
      return this.subtabFields[this.currentSubTableName] || []
    },
    // update-end--Author:sunjianlei Date:20190724 for：修复子表绑定值不正确的问题 --

  },
  created() {
    // update-begin--Author:sunjianlei Date:20190528 for：新增内部查询字典方法 --------------------
    this.loadDictList()
    // update-end--Author:sunjianlei Date:20190528 for：新增内部查询字典方法 --------------------
    this.radioLinkInit()
  },
  methods: {

    // update-begin--Author:sunjianlei Date:20190529 for：新增子表操作事件 --------------------
    handleSubTableAdd() {
      let newColumn = {}
      let index = this.data.options.subTableColumns.length + 1
      this.data.options.subTableColumns.push({
        key: "title" + index,
        title: "标题" + index,
        width: 100
      })
    },

    handleSubTableRemove(index) {
      this.data.options.subTableColumns.splice(index, 1)
    },

    /** 生成subtable表单 */
    handleClickGenerateSubTable() {
      const h = this.$createElement;
      this.$msgbox({
        title: '生成表单',
        message: h('p', null, [
          h('span', null, '生成表单会根据当前选择的子表生成组件，但是会 '),
          h('span', {style: 'color: red'}, '替换掉现有的组件'),
          h('span', null, '，你确定要生成表单吗？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            try {
              let fullObject = this.data.columns.map(i => {
                i.list = []
                return i.list
              })
              // 当前已填充的下标
              let fullIndex = 0
              this.currentSubtabFieldSource.forEach(item => {
                let {dbFieldName, dbFieldTxt, dbDefaultVal, dbIsNull} = item
                if (!this.isIgnoreField(dbFieldName)) {
                  // 这里由于存的是内存地址，所以直接push就能改变jsonObject
                  fullObject[fullIndex].push(this.packageInput(dbFieldName, dbFieldTxt, dbDefaultVal, (dbIsNull === 0)))
                  if (++fullIndex >= fullObject.length) {
                    fullIndex = 0
                  }
                }
              })
            } catch (e) {
              console.error(e)
            }

            done()
          } else {
            done()
          }
        }
      }).catch(() => {
      })
    },
    /** 判断当前字段是否是被忽略的字段 */
    isIgnoreField(fieldName) {
      let ignores = ['id', 'create_by', 'create_time', 'update_by', 'update_time']
      for (let ignore of ignores) {
        if (fieldName.toLowerCase() === ignore.toLowerCase()) {
          return true
        }
      }
      return false
    },
    packageInput(model, name, defaultValue, required = false) {
      console.log('packageInput')
      return {
        type: 'input',
        name: name,
        icon: 'icon-input',
        options: {
          width: '100%',
          defaultValue: defaultValue,
          required: required,
          dataType: 'string',
          pattern: '',
          placeholder: '请输入' + name
        },
        key: model,
        model: model,
        rules: [
          { type: 'string', message: name + '格式不正确' },
          { required: required, message: name + '必须填写' }
        ],
        isSubItem: true
      }
    },
    // update-end--Author:sunjianlei Date:20190529 for：新增子表操作事件 --------------------

    handleOptionsRemove (index) {
      if (this.data.type === 'grid') {
        this.data.columns.splice(index, 1)
      } else {
        // 如果删除的项是默认值，那就清空默认值
        if (this.data.options.defaultValue === this.data.options.options[index].value) {
          this.data.options.defaultValue = ''
        }
        this.data.options.options.splice(index, 1)
      }

    },
    handleAddOption () {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          value: '新选项',
          label: '新选项'
        })
      } else {
        this.data.options.options.push({
          value: '新选项'
        })
      }

    },
    handleAddColumn () {
      this.data.columns.push({
        span: '',
        list: []
      })
    },

    // update-begin--Author:sunjianlei Date:20190531 for：新增布局列数配置 ------------
    handleChangeColumnNumber(value) {
      let {columns} = this.data, span = 24 / value
      // 生成新的列表
      let tempColumns = [...new Array(value)].map(() => ({span, list: []}))

      let prevIndex = 0
      columns.forEach((column, index) => {
        if (tempColumns[index]) {
          prevIndex  = index
          tempColumns[index].list = column.list
        } else {
          // 需要将该列中的所有项目迁移至上一列中
          tempColumns[prevIndex ].list = tempColumns[prevIndex ].list.concat(column.list)
        }
      })
      console.log('this.data[\'columns\'] = tempColumns')
      this.data['columns'] = tempColumns
    },
    // update-end--Author:sunjianlei Date:20190531 for：新增布局列数配置 ------------
    generateRule () {
      this.data.rules = []
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) {
          this.data.rules.push(this.validator[key])
        }
      })
    },
    handleSelectMuliple (value) {
      if (value) {
        if (this.data.options.defaultValue) {
          this.data.options.defaultValue = [this.data.options.defaultValue]
        } else {
          this.data.options.defaultValue = []
        }

      } else {
        if (this.data.options.defaultValue.length>0){
          this.data.options.defaultValue = this.data.options.defaultValue[0]
        } else {
          this.data.options.defaultValue = ''
        }

      }
    },

    // update-begin--Author:sunjianlei Date:20190528 for：新增内部查询方法 --------------------
    loadDictList() {
      // pageSize: 9999 是临时的查询所有数据的解决方案
      _api.getDictList({
        pageNo: 1,
        pageSize: 9999
      }).then(res => {
        this.dictOptions = packageOptions(res.result.records, 'dictName,dictCode', 'dictCode')
      })
    },
    loadCgformFieldList(headId) {
      _api.getOnlineFormFieldList({
        headId: headId
      }).then(res => {
        this.cgformFields = packageOptions(res.result, 'dbFieldTxt,dbFieldName', 'dbFieldName')
      })
    },
    // update-end--Author:sunjianlei Date:20190528 for：新增内部查询方法 --------------------

    // update-begin--Author:sunjianlei Date:20190614 for：新增子表操作事件 --------------------
    handleSubTableChange(code) {
      if (code === '__reselect-cgform__') return
      // 修改子表的 model
      this.$set(this.data, 'model', `sub-table-design_${code}`)
    },
    // update-end--Author:sunjianlei Date:20190614 for：新增子表操作事件 --------------------

    // update-begin--Author:sunjianlei Date:20190722 for：新增数据字典的处理 --------------------
    handleOptionsDictChange(value) {
      // 通过 code 查询字典 item
      _api.getDictItems({
        code: value
      }).then(dictOptions => {
        this.$set(this.data, 'dictOptions', dictOptions)
      })
      this.$set(this.data.options, 'dictCode', value)
      this.handleRemoveDefaultValue()
    },
    /** 清空默认值 */
    handleOptionsClearDefaultValue() {
      if (this.data.type === 'checkbox') {
        this.$set(this.data.options, 'defaultValue', [])
      } else {
        this.$set(this.data.options, 'defaultValue', null)
      }
    },
    // update-end--Author:sunjianlei Date:20190722 for：新增数据字典的处理 --------------------
    radioLinkInit(){
      console.log(this.data)
    },
    handleBehaviorLinkage(){
      // radio关联选项
      
      // let dvTableData = [];
      let dvOptions = []
      // this.data.options.options.forEach(item => {
      //   let obj = {...item}
      //   obj.name = item.value;
      //   dvTableData.push(obj)
      // })
      // this.dvTableData = dvTableData;
      // console.log(this.dvTableData)
      this.list.forEach(item => {
        if(item.data !=='tabs' && item.data !=='card' && item.data !== 'divider' && item.data !== 'editor'){
          let obj = {};
          obj.value = item.model
          obj.label = item.name
          obj.fieldId = item.model
          if(item.model === this.data.model){
            obj.disabled = true;
          }
          dvOptions.push(obj)
        }
      })
     
      this.dvOptions = dvOptions;
       console.log(this.list,this.dvOptions)
      // let arr;
      // if(!this.cacheDvValue[this.data.model]){
      //   arr = []
      // }
      // let isEmptyArr = [].concat(...this.cacheDvValue[this.data.model])
      // if(isEmptyArr.length === 0){
      //   this.$set(this.dvValue,this.data.model,[])
      // }else{
      //   this.$set(this.dvValue,this.data.model,)
      // }
      
      this.dvLinkage = true;
      // this.$emit('onBehaviorLinkage',this.data)
    },
    dvChange(v){
      console.log(v,2,this.dvValue,this.cacheDvValue)
    },
    dvRemoveTag(v){
      console.log(v,1,this.dvValue,this.cacheDvValue)
    },
    dvLinkageClosed(){
      console.log(222,this.dvValue,this.cacheDvValue)
    },
    handleSureBtn(n){
      this.dvLinkage = false
      let dvValueBo = false;
      if(n === 'dv'){
        this.cacheDvValue = Object.assign({},this.dvValue);
        for(let arri of this.dvValue[this.data.model]){
          if(arri.length >0){
            dvValueBo = true;
            break;
          }
        }
        if(dvValueBo){
          this.dvValue[`${this.data.model}_dvValueBo`] = true
        }else{
          this.dvValue[`${this.data.model}_dvValueBo`] = false
        }
         console.log(333)
      }
    },

    // update-begin--Author:sunjianlei Date:20190724 for：修复子表绑定值不正确的问题 --
    querySubTable(code) {
      if (!Object.keys(this.subtabFields).includes(code)) {
        _api.getOnlineFormFieldListByCode({
          headCode: code
        }).then(res => {
          if (res.success) {
            this.$set(this.subtabFieldSource, code, res.result)
            this.$set(this.subtabFields, code, packageOptions(res.result, 'dbFieldTxt,dbFieldName', 'dbFieldName'))
          }
        })
      }
    },
    // update-end--Author:sunjianlei Date:20190724 for：修复子表绑定值不正确的问题 --

  },
  watch: {

    // update-begin--Author:sunjianlei Date:20190528 for：新增内部查询方法 --------------------
    cgform: {
      deep: true,
      handler(val) {
        if (typeof val === 'object') {
          console.log('new cgform:', val)
          this.loadCgformFieldList(val.id)
          if (val.subTableStr) {
            this.subTableOptions = val.subTableStr.split(",").map(item => {
                return {value: item}
            })

            // 查询 子表
            _api.getOnlineFormListByTableNames({
              tableNames: val.subTableStr
            }).then((res) => {
              if (res.success) {
                this.subTableOptions = res.result.map(item => {
                  return { value: item['tableName'], label: `${item['tableTxt']}（${item['tableName']}）` }
                })
              }
            })

          } else {
            this.subTableOptions = [
              {value: "当前Online表单没有子表", disabled: true},
              {label: '点击重新选择Online表单', value: "__reselect-cgform__"}
            ]
          }
          console.log('  this.subTableOptions : ',this.subTableOptions)
        } else {
          this.cgformFields = []
          this.subTableOptions = [
            { value: '当前Online表单没有子表', disabled: true },
            { label: '点击重新选择Online表单', value: '__reselect-cgform__' }
          ]
        }
      }
    },
    // update-end--Author:sunjianlei Date:20190528 for：新增内部查询方法 --------------------

    'data.options.isRange': function (isRange) {
      // update-begin--Author:sunjianlei Date:20200420 for：解决这里会清空时间选择器默认值的问题 --------------------
      if (typeof isRange !== 'undefined') {
        let { defaultValue } = this.data.options
        // 是范围选择
        if (isRange) {
          if (defaultValue && !Array.isArray(defaultValue)) {
            this.$nextTick(() => {
              this.data.options.defaultValue = [defaultValue, defaultValue]
            })
          }
        } else {
          if (defaultValue && Array.isArray(defaultValue)) {
            this.data.options.defaultValue = defaultValue[0]
          }
        }
      }
      // update-end--Author:sunjianlei Date:20200420 for：解决这里会清空时间选择器默认值的问题 --------------------
    },
    'data.options.required': function(val) {
      if(this.data.type !== 'daterange'){
        if (val) {
          this.validator.required = {required: true, message: `${this.data.name}必须填写`}
        } else {
          this.validator.required = null
        }

        this.$nextTick(() => {
          this.generateRule()
        })
      }
    },
    'data.options.dataType': function (val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.type = {type: val, message: this.data.name + '格式不正确'}
      } else {
        this.validator.type = null
      }

      this.generateRule()
    },
    'data.options.pattern': function (val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.pattern = {pattern: val, message: this.data.name + '格式不匹配'}
      } else {
        this.validator.pattern = null
      }

      this.generateRule()
    },
    dvValue(a,b){
      console.log(a,b)
    }
  }
}
</script>
<!--update-begin--Author:sunjianlei Date:20190529 for：新增子表操作事件 ---------------------->
<style lang="scss" scoped>
  .subtab-column {

    padding: 8px 8px 4px;
    border: 1px solid #cccccc;
    &+.subtab-column {
      margin-top: 8px;
    }

    .subtab-label{
      width: 24%;
      text-align: right;
      display: inline-block;
    }
    .subtab-input{
      width: 76%;
      display: inline-block;
    }
  }

  .subtab-btns {
    text-align: right;

    &.smini button {
      padding: 3px 8px;
    }

  }

  .j-input-prepend-mini {
    /deep/ .el-input-group__prepend {
      padding: 0;
      min-width: 42px;
      text-align: center;
    }

    /deep/ .el-input__inner {
      padding: 0 8px;
    }
  }
  .secIdCard-elAlart{
    background:rgb(198, 226, 255);
    border: 1px solid rgb(121, 187, 255);
    padding: 10px;
    border-radius: 4px;
    color: #606266;
    .el-icon-warning{
      color: rgb(121, 187, 255);
      margin-right: 5px;
    }
  }

</style>
<style lang="scss">
  .linkDialog--1pgLy{
    .el-dialog__header{
      border-bottom: 1px solid #DCDFE6;
    }
        
  }
  .linkModal--1pgLy{
    .description--1CkVL{
      margin-bottom: 10px;
    }
    .el-select__tags,
    .el-select__input{
      width: 100%!important;
      max-width: 100%!important;
    }
    .cellLinkage--9tg5O{
      opacity: .6;
    }
  }
</style>
<!--update-end--Author:sunjianlei Date:20190529 for：新增子表操作事件 ---------------------->