<template>
  <div :id="upload.id" class="j-file-upload-container">

    <el-upload
        class="upload-demo"
        :action="upload.action"
        :data="upload.data"
        :file-list="upload.fileList"
        :limit="options.length"
        :drag="options.drag"
        :multiple="options.multiple"
        :disabled="readOnly"
        :before-remove="_beforeRemove"
        :before-upload="_beforeUpload"
        :on-remove="_onRemove"
        :on-exceed="_onExceed"
        :on-preview="_onPreview"
        :on-success="_onSuccess"
    >
      <template v-if="options.drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </template>
      <el-button v-else size="small" :disabled="readOnly" type="primary">{{ options.buttonText }}</el-button>
    </el-upload>

  </div>
</template>

<script>
  import * as _api from '@/api'
  import * as _utils from '../../util/utils'

  export default {
    name: 'JFileUpload',
    props: {
      element: {
        type: Object,
        default: () => ({})
      },
      value: {
        type: [Array, String],
        default: () => []
      },
      readOnly: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        upload: {
          id: 'j-file-upload_' + Date.now(),
          // 上传地址
          action: 'http://upload.qiniup.com/',
          domain: 'http://img.h5huodong.com/',
          // 上传附加参数
          data: {},
          // 上传文件列表
          fileList: [],
        },
        token: '',
      }
    },
    watch: {
      value: {
        deep: true,
        immediate: true,
        handler(val) {
          let value = val
          if (typeof val === 'string') {
            value = JSON.parse(val)
          }

          this.upload.fileList = value.map(item => {
            return {
              uid: item.uid,
              name: item.name,
              url: item.url,
            }
          })

        }
      }
    },
    computed: {
      options() {
        return this.element.options || {}
      },

    },
    created() {
      if (window['qiniuConfig']) {
        Object.assign(this.upload, window['qiniuConfig'])
      }
      _api.getQiniuUploadToken().then(res => {
        this.token = res.message
      })
    },
    methods: {

      _confirm(options) {
        this.$emit('dialogChange', true)
        return this.$confirm(options.message, options).then(() => {
          this.$emit('dialogChange', false)
          return Promise.resolve()
        }, () => {
          this.$emit('dialogChange', false)
          return Promise.reject()
        })
      },

      /** 文件上传之前的钩子 */
      _beforeUpload(file) {
        const key = 'file_' + _utils.randomKey()
        this.upload.data = {
          token: this.token || this.options.token,
          key: key,
          fname: key
        }
        return this.$nextTick()
      },

      /** 文件删除之前的钩子 */
      _beforeRemove(file, fileList) {
        return this._confirm({
          type: 'warning',
          center: true,
          title: '移除文件',
          message: `确定要移除 "${file.name}" 吗？`,
        })
      },

      /** 文件列表中的文件被删除后的操作 */
      _onRemove(file, fileList) {
        this.$emit('input', fileList.map(item => {
          return {
            name: item.name,
            url: item.url,
            uid: item.uid
          }
        }))
      },

      /** 文件上传成功后的钩子 */
      _onSuccess(response, file, fileList) {
        this.$emit('input', fileList.map(item => {
          return {
            uid: item.uid,
            name: item.name,
            url: item.response ? (this.upload.domain + item.response.key) : item.url,
          }
        }))
      },

      _onPreview(file) {
        return this._confirm({
          type: 'info',
          center: true,
          width: 1200,
          title: '下载文件',
          message: `是否下载 "${file.name}" ？`,
        }).then(() => {
          window.open(file.url + `?attname=${encodeURIComponent(file.name)}`)
        }, () => {
        })
      },

      /** 文件长度超出限制后的操作 */
      _onExceed(files, fileList) {
        this.$message.warning(`你最多可以上传 ${this.options.length} 个文件！`)
      },

    }
  }
</script>

<style lang="scss">
  .j-file-upload-container {

    // 进度条样式
    .el-upload-list__item .el-progress {
      top: 34px;
    }

    // 左图标
    .el-upload-list__item-name .el-icon-document {
      font-size: 28px;
      vertical-align: middle
    }

    // 右图标
    .el-upload-list__item-status-label,
    .el-icon-close {
      line-height: 1.9em;
      font-size: 22px;
    }
  }
</style>
<style lang="scss" scoped>
  .j-file-upload-container {
    .event-none {
      pointer-events: none;
    }
  }
</style>
