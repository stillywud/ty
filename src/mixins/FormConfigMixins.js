import { BASE_URL } from '@/api/request'
import { mapMutations } from 'vuex'
import { DEVICE_TYPE, TOGGLE_DEBUG_DEVICE } from '@/store/mutation-types'


export default {
  data() {
    return {
      qrCode: null,
      qrCodeVisible: false,
    }
  },
  computed: {
    externalLink() {
      return `/desform/ext/${window.desformCode}`
    },
    fullExternalLink() {
      return this.$ls.get(BASE_URL) + this.externalLink
    },
  },
  watch: {
    ['data.designMobileView'](val) {
      this.toggleDebugDevice(val ? DEVICE_TYPE.mobile : DEVICE_TYPE.desktop)
    },
  },
  mounted() {

  },
  methods: {
    ...mapMutations({
      toggleDebugDevice: TOGGLE_DEBUG_DEVICE
    }),
    openExternalLink() {
      window.open(this.fullExternalLink, '_blank')
    },
    qrCodeExternalLink() {
      this.qrCodeVisible = true
      this.$nextTick(() => {
        document.getElementById('externalQrCode').innerHTML = ''
        this.qrCode = new QRCode('externalQrCode', {
          margin: 20
        })
        this.qrCode.makeCode(this.fullExternalLink, {
          margin: 10
        })
      })
    },
    downloadQrCodeExternalLink() {
      let src = document.getElementById('externalQrCode').getElementsByTagName('img')[0].getAttribute('src')


      console.log('src: ', src)
      this.downloadFile('二维码.png', src)
    },
    downloadFile(fileName, content) {
      let aLink = document.createElement('a')
      let blob = this.base64ToBlob(content) //new Blob([content]);
      let evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', true, true)//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName
      aLink.href = URL.createObjectURL(blob)
      aLink.click()
    },
    base64ToBlob(code) {
      let parts = code.split(';base64,')
      let contentType = parts[0].split(':')[1]
      let raw = window.atob(parts[1])
      let rawLength = raw.length

      let uInt8Array = new Uint8Array(rawLength)

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uInt8Array], { type: contentType })
    }
  },
}