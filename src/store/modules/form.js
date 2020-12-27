export default {
  state: {
    // 设计JSON
    designData: {}
  },
  mutations: {
    'SET_DESIGN_DATA': (state, data) => state.designData = data,
  },
  actions: {},
  getters: {
    designData: state => state.designData,
    designList: state => state.designData.list,
    designConfig: state => state.designData.config,
  }
}