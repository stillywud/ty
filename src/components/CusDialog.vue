<template>
  <!-- update-begin--Author:sunjianlei Date:20190716 for：新增用户自定义弹窗边距 -->
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    :modal="modal"
    :center="center"
    ref="elDialog"
    :id="id"
    v-bind="dialogProps"
    >
    <!-- update-end--Author:sunjianlei Date:20190716 for：新增用户自定义弹窗边距 -->

    <template slot="title">
      <el-row class="j-modal-title-row" type="flex">
        <el-col class="left">
          <slot name="title">{{ title }}</slot>
        </el-col>
        <el-col v-if="switchFullscreen" class="right">
          <div class="j-btn-fullscreen el-dialog__headerbtn" @click="toggleFullscreen">
            <i class="el-dialog__close" :class="[fullscreenButtonIcon]"/>
          </div>
        </el-col>
      </el-row>
    </template>

    <span v-if="show">
      <slot></slot>
    </span>

    <span v-if="action" slot="footer" class="dialog-footer" v-loading="loading"
      :element-loading-text="loadingText">
      <slot name="action">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit" >确 定</el-button>
      </slot>
    </span>
  </el-dialog>
</template>

<script>
// update-begin--Author:sunjianlei Date:20190716 for：新增用户自定义弹窗边距 -----
import {cssExpand} from '../util/utils'
import {DeviceMixins} from '@/mixins/vuexMixins'

// update-begin--Author:sunjianlei Date:20190716 for：新增用户自定义弹窗边距 -----

export default {
  name: 'CusDialog',
  mixins:[DeviceMixins],
  props: {
    visible: Boolean,
    loadingText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '600px'
    },
    form: {
      type: Boolean,
      default: true
    },
    action: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    // update-begin--Author:sunjianlei Date:20190716 for：新增用户自定义弹窗边距 -----
    center: {
      type: Boolean,
      default: true
    },
    dialogOptions: {
      type: Object,
      default: () => ({})
    },
    // 是否全屏弹窗，当全屏时无论如何都会禁止 body 滚动。可使用 .sync 修饰符
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 是否允许切换全屏（允许后右上角会出现一个按钮）
    switchFullscreen: {
      type: Boolean,
      default: false
    },
    // update-end--Author:sunjianlei Date:20190716 for：新增用户自定义弹窗边距 -----
  },
  computed: {
    show () {
      if (this.form) {
        return this.showForm
      } else {
        return true
      }
    },
    // update-begin--Author:sunjianlei Date:20190716 for：新增用户自定义弹窗边距 -----
    dialogProps() {
      let {dialogWidth, dialogOptions: options} = this
      let props = {
        'width': dialogWidth,
        'class': ["cus-dialog-container"],
        'fullscreen': this.innerFullscreen
      }
      if (options.top != null) {
        props['top'] = `${options.top}px`
      }

      if (options.padding != null) {
        props['class'].push('preview-dialog')
        let {top, right, bottom, left} = options.padding
        cssExpand(`
          .cus-dialog-container.preview-dialog .el-dialog__body {
            padding: ${top}px ${right}px ${bottom}px ${left}px;
          }
        `, "__cus-dialog-css-expand")
      }
      return props
    },
    dialogWidth() {
      if (this.isMobile){
        return this.mobileWidth
      }
      if (this.dialogOptions && this.dialogOptions.width != null) {
        return this.dialogOptions.width + 'px'
      } else {
        return this.width
      }
    },
    // 切换全屏的按钮图标
    fullscreenButtonIcon() {
      return this.innerFullscreen ? 'el-icon-full-screen' : 'el-icon-full-screen'
    },
    // update-end--Author:sunjianlei Date:20190716 for：新增用户自定义弹窗边距 -----
  },
  data () {
    return {
      loading: false,
      dialogVisible: this.visible,
      id: 'dialog_' + new Date().getTime(),
      showForm: false,
      innerFullscreen: this.fullscreen,
    }
  },
  methods: {
    close () {
      this.dialogVisible = false
    },
    submit () {
      this.loading = true

      this.$emit('on-submit')
    },
    end () {
      this.loading = false
    },
    /** 切换全屏 */
    toggleFullscreen() {
      this.innerFullscreen = !this.innerFullscreen
    },
  },
  mounted () {
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        this.loading = false
        this.$emit('on-close')
        setTimeout(() => {
          this.showForm = false
        }, 300)
      } else {
        this.showForm = true
      }
    },
    visible (val) {
      this.dialogVisible = val
    },
    fullscreen(val) {
      this.innerFullscreen = val
    },
    innerFullscreen(val) {
      this.$emit('update:fullscreen', val)
    },
  }
}
</script>

<style lang="scss">
.cus-dialog-container{
  .el-dialog__footer{
    margin: 0 20px;
    // border-top: 1px dashed #ccc;
    padding: 15px 0 16px;
    text-align: center;
    position: relative;

    .dialog-footer{
      display: block;

      .circular{
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        height: 24px;
      }

      .el-loading-text{
        display: inline-block;
        vertical-align: middle;
      }

      .el-loading-spinner{
        margin-top: -12px;
      }
    }
  }
}

.j-modal-title-row {

  .left {
    width: calc(100% - 56px);
  }

  .right {
    width: 56px;

    .j-btn-fullscreen {
      top: 1px;
      right: 30px;
      font-size: 13px;
    }
  }
}
</style>
