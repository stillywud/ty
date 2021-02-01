import { DeviceMixins } from '@/mixins/vuexMixins'

export default {
  mixins: [DeviceMixins],
  computed: {},
  methods: {

    /** 获取 col span 等属性*/
    getColProps(col) {
      let config = this.config || {}
      let props = {}
      if (config.designMobileView || (this.isMobile && !config.disabledAutoGrid)) {
        props['span'] = 24
      } else {
        props['span'] = col.span
      }
      return props
    },

  }
}