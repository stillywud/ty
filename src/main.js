import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import router from './router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

// import 'form-making/dist/FormMaking.css'
// import FormMaking from 'form-making'
import FormMaking from './index'
Vue.use(FormMaking)

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })

// update-begin--Author:sunjianlei Date:20190528 for：添加 vue-ls、添加测试Token --------------------
import Storage from 'vue-ls'
import {BASE_URL, TEST_BASE_URL, ACCESS_TOKEN, TEST_TOKEN} from '@/api/request'

Vue.use(Storage, {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
})
Vue.ls.set(BASE_URL, TEST_BASE_URL)
Vue.ls.set(ACCESS_TOKEN, TEST_TOKEN)
// update-end--Author:sunjianlei Date:20190528 for：添加 vue-ls、添加测试Token --------------------


// update-begin--Author:sunjianlei Date:20190808 for：添加全局的布局组件，防止互为父子组件的悖论 --------------------
import JLayouts from './components/global/JLayouts'
Vue.use(JLayouts)
// update-end--Author:sunjianlei Date:20190808 for：添加全局的布局组件，防止互为父子组件的悖论 --------------------

// update-begin--Author:sunjianlei Date:20190813 for：添加打印组件 --------------------
import Print from 'vue-print-nb-jeecg'
Vue.use(Print)
// update-end--Author:sunjianlei Date:20190813 for：添加打印组件 --------------------

// update-begin--Author:sunjianlei Date:20200119 for：检测设备变化 --------------------
import { handleEnquireScreen } from '@/util/device'
handleEnquireScreen(store)
// update-begin--Author:sunjianlei Date:20200119 for：检测设备变化 --------------------

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
