import { DeviceMixins } from '@/mixins/vuexMixins'

export default {
  mixins: [DeviceMixins],
  props: ['config'],
  data() {
    return {}
  },
  watch: {},
  computed: {
    // 获取下拉选项，同样适用radio、checkbox
    selectOptions() {
      let { dictOptions, options } = this.element
      if (options.remote === 'dict') {
        return dictOptions || []
      } else if (options.remote === 'dict_obj' || options.remote === true) {
        return null
      } else {
        return options.options
      }
    },
    _width() {
      let { options, isSubItem } = this.element
      return isSubItem ? '100%' : options.width
    },
  },
  created() {
  },
  methods: {}
}