export default {
  state: {
    // 设计JSON
    designData: {},
    // 是否禁用拖拽
    editliable:0,
  },
  mutations: {
    'SET_DESIGN_DATA': (state, data) => state.designData = data,
    'SET_EDITLIABLE': (state, data) => state.editliable = data,
  },
  actions: {
    // 'SET_EDITABLE' (context) {
    //   context.commit('SET_EDITABLE')
    // }
  },
  getters: {
    designData: state => state.designData,
    designList: state => state.designData.list,
    designConfig: state => state.designData.config,
    editliable: state => state.editliable,
  }
}