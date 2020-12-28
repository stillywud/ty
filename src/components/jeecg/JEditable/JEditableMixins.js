import { DeviceMixins } from '@/mixins/vuexMixins'
import JSelectUser from '@/components/jeecgbiz/JSelectUser'
import JSelectDepart from '@/components/jeecgbiz/JSelectDepart'
import FmUpload from '@/components/Upload'
import JAreaLinkage from '@/components/jeecg/JAreaLinkage'
import JFileUpload from '@/components/jeecg/JFileUpload'
import JRate from '@/components/jeecg/JRate'
import JSlider from '@/components/jeecg/JSlider'

export default {
  mixins: [DeviceMixins],
  components: { JSelectUser, JSelectDepart, JAreaLinkage, FmUpload, JFileUpload, JRate, JSlider },
  props: {
    value: {
      type: [String, Array],
      default: '[]'
    },
    columns: {
      type: Array,
      default: () => []
    },
    element: {
      type: Object,
      default: () => ({})
    },
    // 是否是只读表格
    readOnly: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    realColumns() {
      return this.columns
    },
    defaultRows() {
      return this.element.options['defaultRows']
    },
    showCheckbox() {
      return this.element.options['showCheckbox']
    },
    showNumber() {
      return this.element.options['showNumber']
    },
    showRowButton() {
      return this.element.options['showRowButton']
    },
    allowAdd() {
      return this.element.options['allowAdd']
    },
    tableHeight() {
      return this.element.options['autoHeight'] ? null : 300
    },
  },
  methods: {
    getWReadOnly(widget) {
      return this.readOnly || widget.options.readonly
    },
    getWDisabled(widget) {
      return this.readOnly || widget.options.disabled
    },
  },
}