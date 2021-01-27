export default {
  state: {
    // 设计JSON
    designData: {},
    selectVal:{}
  },
  mutations: {
    'SET_DESIGN_DATA': (state, data) => state.designData = data,
    'SET_SELECT_VAL': (state, data) => state.selectVal = data,
  },
  actions: {},
  getters: {
    designData: state => state.designData,
    designList: state => state.designData.list,
    designConfig: state => state.designData.config,
    selectVal: state => state.selectVal
  }
}