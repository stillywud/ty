import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import form from './modules/form'

if (Vue) {
  Vue.use(Vuex)
}

export default new Vuex.Store({
  modules: { app, form },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
})
