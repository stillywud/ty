<template>
  <div class="fm-uplaod-container"
    :id="uploadId"
  >
    <div 
      :id="item.key"
      :style="{width: width+'px', height: height+'px'}"
      :class="{uploading: item.status=='uploading', 'is-success': item.status=='success'}"
      class="upload-file" v-for="(item) in fileList" :key="item.key">
      <img :src="item.url" />

      <el-progress v-if="item.status=='uploading'" :width="miniWidth*0.9" class="upload-progress" type="circle" :percentage="item.percent"></el-progress>

      <label class="item-status" v-if="item.status=='success'">
        <i class="el-icon-upload-success el-icon-check"></i>
      </label>

      <div class="uplaod-action">
        <i class="el-icon-view" @click="handlePreviewFile(item.key)" :style="{'font-size': miniWidth/4+'px'}"></i>
        <i v-if="!readOnly" class="el-icon-delete" @click="handleRemove(item.key)" :style="{'font-size': miniWidth/4+'px'}"></i>
      </div>
    </div>

    <!-- update-begin--Author:sunjianlei Date:20190709 for：解决偶尔不显示的问题 -->
    <div class="el-upload el-upload--picture-card"
      v-if="!readOnly && (!isMaxUpload) && (alwaysShow || token)"
      :style="{width: width+'px', height: height+'px'}"
      :class="{'event-none': readOnly}"
    >
      <i class="el-icon-plus" :style="{fontSize:miniWidth/4+'px',marginTop: (-miniWidth/8)+'px', marginLeft: (-miniWidth/8)+'px'}"></i>
      <input accept="image/*"  multiple ref="uploadInput" @change="handleChange" type="file" :style="{width: width+'px', height: height+'px'}" name="file" class="el-upload__input upload-input">
    </div>
    <!-- update-end--Author:sunjianlei Date:20190709 for：解决偶尔不显示的问题 -->
  </div>
</template>

<script>
import * as _api from '@/api'
import Viewer from 'viewerjs'
import * as qiniu from 'qiniu-js'
require('viewerjs/dist/viewer.css')

export default {
  props: {
    // update-begin--Author:sunjianlei Date:20190724 for：fm-upload 组件优化 --
    value: {
      type: [Array, String],
      default: () => []
    },
    // update-end--Author:sunjianlei Date:20190724 for：fm-upload 组件优化 --
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    token: {
      type: String,
      default: ''
    },
    domain: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: true
    },
    length: {
      type: Number,
      default: 9
    },
    // update-begin--Author:sunjianlei Date:20190724 for：fm-upload 组件优化 --
    readOnly: {
      type: Boolean,
      default: false
    },
    // update-end--Author:sunjianlei Date:20190724 for：fm-upload 组件优化 --
  },
  data () {
    return {
      fileList: [],
      viewer: null,
      uploadId: 'upload_' + new Date().getTime(),
      // update-begin--Author:sunjianlei Date:20190709 for：解决偶尔不显示的问题 -----------
      alwaysShow: true, // 设置为true代表不获取到token的时候也显示组件
      upload: {
        domain: this.domain,
        region: 'z0'
      },
      innerToken: '',
      // <!-- update-begin--Author:sunjianlei Date:20190709 for：解决偶尔不显示的问题 ----------
    }
  },
  computed: {
    miniWidth () {
      if (this.width > this.height) {
        return this.height
      } else {
        return this.width
      }
    },
    // update-begin--Author:sunjianlei Date:20190716 for：修复图片上传长度控制不生效的问题 -----
    currentFileCount() {
      return this.fileList.length
    },
    isMaxUpload() {
      return this.currentFileCount === this.length
    },
    // update-end--Author:sunjianlei Date:20190716 for：修复图片上传长度控制不生效的问题 -----
  },
  created() {
    if (window['qiniuConfig']) {
      Object.assign(this.upload, window['qiniuConfig'])
    }
    _api.getQiniuUploadToken().then(res => {
      this.innerToken = res.message
    })
  },
  methods: {
    handleChange () {
      console.log(this.$refs.uploadInput.files)
      const files = this.$refs.uploadInput.files

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        const key = (new Date().getTime()) + '_' + Math.ceil(Math.random() * 99999)

        reader.readAsDataURL(file)
        reader.onload = () => {
          this.fileList.push({
            key,
            url: reader.result,
            percent: 0,
            status: 'uploading'
          })

          this.$nextTick(() => {
            this.uplaodAction2(reader.result, file, key)
          })
        }
      }

      this.$refs.uploadInput.value = []
    }, 

    uplaodAction2 (res, file, key) {
      const _this = this

      // update-begin--Author:sunjianlei Date:20190711 for：修改图片上传的地区 -----------
      const observable = qiniu.upload(file, key, this.innerToken || this.token, {
        fname: key,
        mimeType: []
      }, {
        useCdnDomain: true,
        region: qiniu.region[this.upload.region]
      })
      // update-end--Author:sunjianlei Date:20190711 for：修改图片上传的地区 -----------

      observable.subscribe({
        next (res) {
          _this.$set(_this.fileList[_this.fileList.findIndex(item => item.key === key)], 'percent', parseInt(res.total.percent))
          
        },
        error (err) {
          _this.$set(_this.fileList, _this.fileList.findIndex(item => item.key === key), {
            ..._this.fileList[_this.fileList.findIndex(item => item.key === key)],
            status: 'error'
          })
          _this.fileList.splice(_this.fileList.findIndex(item => item.key === key), 1)
        },
        complete (res) {
          // update-begin--Author:sunjianlei Date:20190711 for：domain 优化 -----------
          let domain = _this.upload.domain
          if (domain && domain.lastIndexOf('/') != (domain.length - 1)) {
            domain += '/'
          }
          _this.$set(_this.fileList, _this.fileList.findIndex(item => item.key === key), {
            ..._this.fileList[_this.fileList.findIndex(item => item.key === key)],
            url: domain + res.key,
            percent: 100
          })
          // update-end--Author:sunjianlei Date:20190711 for：domain 优化 -----------
          setTimeout(() => {
            _this.$set(_this.fileList, _this.fileList.findIndex(item => item.key === key), {
              ..._this.fileList[_this.fileList.findIndex(item => item.key === key)],
              status: 'success'
            })

            _this.$emit('input', _this.fileList)
          }, 200)
        }
      })
    },

    handleRemove(key) {
      this.fileList.splice(this.fileList.findIndex(item => item.key === key), 1)
      this.$emit('input', this.fileList)
    },

    handlePreviewFile (key) {
      this.viewer && this.viewer.destroy()
      this.uploadId = 'upload_' + new Date().getTime()

      console.log(this.viewer)
      // update-begin--Author:sunjianlei Date:20190724 for：fm-upload 组件优化 --
      this.$nextTick(() => {
        this.viewer = new Viewer(document.getElementById(this.uploadId), {
          hidden: () => {
            this.$emit('dialogChange', false)
          }
        })
        this.viewer.view(this.fileList.findIndex(item => item.key === key))
      })
      this.$emit('dialogChange', true)
      // update-end--Author:sunjianlei Date:20190724 for：fm-upload 组件优化 --
    }
  },
  watch: {
    // update-begin--Author:sunjianlei Date:20190724 for：fm-upload 组件优化 --
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        let value = val
        if (typeof val === 'string') {
          value = JSON.parse(val)
        }

        this.fileList = value.map(item => {
          item.key = (item.key ? item.key : (new Date().getTime()) + '_' + Math.ceil(Math.random() * 99999))
          item.percent = (item.percent ? item.percent : 100)
          item.status = (item.status ? item.status : 'success')
          return item
        })
      }
    },
    // update-end--Author:sunjianlei Date:20190724 for：fm-upload 组件优化 --

  }
}
</script>

<style lang="scss">
.fm-uplaod-container{
  .upload-file{
    margin: 0 10px 10px 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    // background: #fff;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    position: relative;
    vertical-align: top;

    &:hover{
      .uplaod-action{
        display: flex;
      }
    }

    .uplaod-action{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,0.6);
      display: none;
      justify-content: center;
      align-items: center;

      i{
        color: #fff;
        cursor: pointer;
        margin: 0 5px;
      }
    }

    &.is-success{
      .item-status{
        position: absolute;
        right: -15px;
        top: -6px;
        width: 40px;
        height: 24px;
        background: #13ce66;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);

        &>i{
          font-size: 12px;
          margin-top: 11px;
          color: #fff;
          transform: rotate(-45deg);
        }
      }
    }

    &.uploading{
      &:before{
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.3);
      }
    }

    .upload-progress{
      position: absolute;

      .el-progress__text{
        color: #fff;
        font-size: 16px !important;
      }
    }

    img{
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
  }

  .el-upload--picture-card{
    position: relative;
    overflow: hidden;

    .el-icon-plus{
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }

  .upload-input{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    opacity: 0;
    cursor: pointer;
  }

  /* update-begin--Author:sunjianlei Date:20190724 for：fm-upload 组件优化 */
  .event-none {
    pointer-events: none;
  }
  /* update-begin--Author:sunjianlei Date:20190724 for：fm-upload 组件优化 */

}
</style>
