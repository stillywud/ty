import { mapGetters, mapState } from 'vuex'
import { DEVICE_TYPE } from '@/store/mutation-types'

const vuexMixins = {
  computed: {
    ...mapState({
      primaryColor: state => state.app.color,
    })
  }
}

const DeviceMixins = {
  computed: {
    ...mapState({
      realDevice: state => state.app.device,
      mobileWidth: state => state.app.mobileWidth,
    }),
    ...mapGetters(['device', 'isMobile', 'isDesktop']),
    $DEVICE_TYPE: () => DEVICE_TYPE,
  },
  methods: {}
}

const DesignDataMixins = {
  computed: {
    ...mapGetters(['designData', 'designList', 'designConfig']),
  },
  methods: {
    $SET_DESIGN_DATA(designData) {
      this.$store.commit('SET_DESIGN_DATA', designData)
    }
  }
}

export { vuexMixins, DeviceMixins, DesignDataMixins }