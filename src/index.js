import Vuex from 'vuex'
import store from './store/'
import moment from 'moment'
import { DeviceMixins } from '@/mixins/vuexMixins'
import { handleEnquireScreen } from '@/util/device'

import Storage from 'vue-ls'
import { ACCESS_TOKEN, BASE_URL, } from '@/api/request'

import Print from 'vue-print-nb-jeecg'
import JLayouts from './components/global/JLayouts'
import MakingForm from './components/Container.vue'
import GenerateForm from './components/GenerateForm.vue'
import GenerateDialog from './components/GenerateDialog.vue'

import './styles/cover.scss'
import './styles/index.scss'
import './iconfont/iconfont.css'
import 'normalize.css/normalize.css'

MakingForm.install = function (Vue) {
  Vue.component(MakingForm.name, MakingForm)
}

GenerateForm.install = function (Vue) {
  Vue.component(GenerateForm.name, GenerateForm)
}

GenerateDialog.install = function (Vue) {
  Vue.component(GenerateDialog.name, GenerateDialog)
}

const install = function (Vue, opts = {}) {
  Vue.use(Vuex)
  Vue.use(MakingForm)
  Vue.use(GenerateForm)
  Vue.use(GenerateDialog)
  Vue.use(Print)
  Vue.use(JLayouts)
  Vue.use(Storage, {
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
  })

}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

handleEnquireScreen(store)
// moment.suppressDeprecationWarnings = true;
export default {
  store,
  moment,
  install,
  MakingForm,
  GenerateForm,
  GenerateDialog,
  mixins: {
    DeviceMixins,
  },
  constant: {
    BASE_URL,
    ACCESS_TOKEN
  },
}