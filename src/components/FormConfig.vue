<template>
  <div class="form-config-container">
    <el-form label-position="top" size="small">

      <!-- update-begin--Author:sunjianlei Date:20190522 for：新增Online表单选择器 -->
      <el-form-item v-if="cgformOptions != null" label="Online表单">
        <el-select
            v-model="data.onlineForm"
            filterable
            placeholder="请选择Online表单"
            style="width:100%">
          <el-option
              v-for="item in cgformOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <!-- update-begin--Author:sunjianlei Date:20200210 for：新增外部链接配置 -->
      <el-form-item label="">
        <j-line-switch v-model="data.allowExternalLink" label="启用外部链接"/>
        <template v-if="data.allowExternalLink">
          <el-button icon="el-icon-link" @click="openExternalLink">打开外部链接</el-button>
          <el-button icon="el-icon-picture-outline-round" @click="qrCodeExternalLink">生成二维码</el-button>
        </template>
        <p class="j-p-tip">在外部链接中将无法使用用户、部门组件</p>
      </el-form-item>
      <el-dialog title="生成二维码" :visible.sync="qrCodeVisible" width="300px" append-to-body destroy-on-close>
        <div id="externalQrCode"></div>
        <div slot="footer" class="dialog-footer">
          <slot name="action">
            <el-button type="primary" @click="downloadQrCodeExternalLink">下载</el-button>
            <el-button @click="qrCodeVisible=false">关闭</el-button>
          </slot>
        </div>
      </el-dialog>
      <!-- update-begin--Author:sunjianlei Date:20200210 for：新增外部链接配置 -->

      <el-form-item label="">
        <j-line-switch v-model="data.allowPrint" label="启用打印"/>
      </el-form-item>

      <el-form-item label="">
        <j-line-switch v-model="data.disabledAutoGrid" label="禁用自适应"/>
        <p class="j-p-tip">当打印出现布局混乱的时候可以勾上此项</p>
      </el-form-item>

      <el-form-item label="">
        <j-line-switch v-model="data.designMobileView" label="设计移动视图"/>
        <p class="j-p-tip">可用于设计移动端的表单</p>
      </el-form-item>

      <!-- update-end--Author:sunjianlei Date:20190522 for：新增Online表单选择器 -->

      <el-form-item label="标签对齐方式">
        <el-radio-group v-model="data.labelPosition">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="表单字段宽度">
        <el-input-number v-model="data.labelWidth" :min="0" :max="200" :step="10"></el-input-number>
      </el-form-item>

      <el-form-item label="组件尺寸">
        <el-radio-group v-model="data.size">
          <el-radio-button label="medium">大</el-radio-button>
          <el-radio-button label="small">中</el-radio-button>
          <el-radio-button label="mini">小</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <!-- update-begin--Author:sunjianlei Date:20190712 for：新增弹窗控制属性 -->
        <el-form-item label="弹窗宽度">
          <el-input-number v-model="data.dialogOptions.width" :min="320"/>
        </el-form-item>
        <el-form-item label="弹窗顶部距离">
          <el-input-number v-model="data.dialogOptions.top" :min="0" />
        </el-form-item>
        <el-form-item label="表单内边距">
          上：<el-input-number v-model="data.dialogOptions.padding.top" :min="0"/><br>
          右：<el-input-number v-model="data.dialogOptions.padding.right" :min="0"/><br>
          下：<el-input-number v-model="data.dialogOptions.padding.bottom" :min="0"/><br>
          左：<el-input-number v-model="data.dialogOptions.padding.left" :min="0"/>
        </el-form-item>
      <!-- update-end--Author:sunjianlei Date:20190712 for：新增弹窗控制属性 -->

      <el-form-item label="自定义接收URL">

        <el-row v-for="(item,idx) of data.customRequestURL" :key="idx" :gutter="8">

          <el-col :span="24"><!-- 21 -->
            <el-input v-model="item.url" size="mini"/>
          </el-col>
          <!-- 注释 - begin ：多自定义URL的实现 -->
          <!--          <el-col v-if="idx===0" :span="3">-->
          <!--            <el-button-->
          <!--                type="success" size="mini" plain circle icon="el-icon-plus" style="padding: 4px;"-->
          <!--                @click="data.customRequestURL.push({url:''})"-->
          <!--            />-->
          <!--          </el-col>-->
          <!--          <el-col v-else :span="3">-->
          <!--            <el-button-->
          <!--                type="danger" size="mini" plain circle icon="el-icon-minus" style="padding: 4px;"-->
          <!--                @click="data.customRequestURL.splice(idx,1)"-->
          <!--            />-->
          <!--          </el-col>-->
          <!-- 注释 - end ：多自定义URL的实现 -->
        </el-row>

      </el-form-item>

      <el-form-item label="">
        <j-line-switch v-model="data.transactional" label="启用事务"/>
        <p class="j-p-tip">启用后，自定义接收URL接口的请求必须成功，否则数据将会保存失败。</p>
      </el-form-item>

      <!-- update-begin--Author:sunjianlei Date:20190620 for：新增JS和CSS增强 -->
      <div class="ta-full-screen-box" :data-full-screen="fs.js">
        <el-button v-if="!fs.js" class="ta-fs-button" @click="fs.js=true">全屏</el-button>
        <el-button v-else class="ta-fs-button-close" @click="fs.js=false" type="danger" icon="el-icon-close" circle plain></el-button>
        <el-form-item label="JS增强">
          <div class="ta-fs-content">
            <el-input type="textarea" :rows="5" v-model="data.expand.js"/>
          </div>
        </el-form-item>
      </div>

      <el-form-item label="JS外部增强">
        <el-input v-model="data.expand.url.js"/>
      </el-form-item>

      <div class="ta-full-screen-box" :data-full-screen="fs.css">
        <el-button v-if="!fs.css" class="ta-fs-button" @click="fs.css=true">全屏</el-button>
        <el-button v-else class="ta-fs-button-close" type="danger" icon="el-icon-close" circle plain @click="fs.css=false"></el-button>
        <el-form-item label="CSS增强">
          <div class="ta-fs-content">
            <el-input type="textarea" :rows="5" v-model="data.expand.css"/>
          </div>
        </el-form-item>
      </div>

      <el-form-item label="CSS外部增强">
        <el-input v-model="data.expand.url.css"/>
      </el-form-item>
      <!-- update-end--Author:sunjianlei Date:20190620 for：新增JS和CSS增强 -->

    </el-form>
  </div>
</template>

<script>
  // update-begin--Author:sunjianlei Date:20190528 for：新增内部查询OnlineForm方法 --------------------
  import {getOnlineFormList} from '@/api'
  import {packageOptions} from '@/util/utils'
  import FormConfigMixins from '../mixins/FormConfigMixins'
  import JLineSwitch from '@/components/jeecg/JLineSwitch'
  import CusDialog from '@/components/CusDialog'


  export default {
    components: { CusDialog, JLineSwitch },
    mixins: [FormConfigMixins],
    props: ['data'],
    data() {
      return {
        cgformList: null,
        cgformOptions: null,
        // update-begin--Author:sunjianlei Date:20190625 for：新增全屏按钮 -------
        fs: {
          js: false,
          css: false,
        }
        // update-end--Author:sunjianlei Date:20190625 for：新增全屏按钮 -------

      }
    },
    // update-end--Author:sunjianlei Date:20190528 for：新增内部查询OnlineForm方法 -----------------------
    watch: {
      // update-begin--Author:sunjianlei Date:20190522 for：新增Online表单选择器变化时触发事件 -----------------------
      "data.onlineForm": {
        deep: true,
        handler(val) {
          if (val === null) {
            this.$set(this.data, 'onlineForm', undefined)
          } else if (val === undefined) {
            return
          }
          new Promise((resolve, reject) => {
            let timer = setInterval(() => {
              if (this.cgformList != null) {
                clearInterval(timer)
                resolve()
              }
            })
          }).then(() => {
            this.$emit('cgformChange', this.cgformList[val])
          })
        }
      }
      // update-end--Author:sunjianlei Date:20190522 for：新增Online表单选择器变化时触发事件 -----------------------
    },

    // update-begin--Author:sunjianlei Date:20190528 for：新增内部查询OnlineForm方法 -----------------------
    created() {
      // pageSize: 9999 是临时的查询所有数据的解决方案
      this.loadOnlineFormList()
    },
    methods: {
      loadOnlineFormList() {
        getOnlineFormList({
          pageNo: 1,
          pageSize: 9999
        }).then(res => {

          // console.log('0826 getOnlineFormList: ',res.result.records)

          let records = res.result.records.filter(record => (record.tableType != 3 && record.copyType != 1))
          this.cgformOptions = packageOptions(records, 'tableTxt,tableName', 'tableName')
          this.cgformOptions.splice(0, 0, { label: '请选择', value: null })

          let cgformList = {}
          for (let table of res.result.records) {
            cgformList[table.tableName] = {
              id: table.id,
              subTableStr: table.subTableStr
            }
          }
          this.cgformList = cgformList

        })
      }
    }
    // update-end--Author:sunjianlei Date:20190528 for：新增内部查询OnlineForm方法 -----------------------

  }
</script>
