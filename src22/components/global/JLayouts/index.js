import JGridLayout from './JGridLayout'
import JGridGenerate from './JGridGenerate'
import JEditableForDesign from './JEditableForDesign'
import JCard from './JCard'
import JTabs from './JTabs'
import JFormItem from './common/JFormItem'

export default {
  install(Vue) {
    Vue.component('j-grid-layout', JGridLayout)
    Vue.component('j-grid-generate', JGridGenerate)

    Vue.component('j-editable-for-design', JEditableForDesign)

    Vue.component('j-card', JCard)
    Vue.component('j-tabs', JTabs)

    Vue.component('j-form-item', JFormItem)
  }
}