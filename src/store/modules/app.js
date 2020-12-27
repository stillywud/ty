import { DEVICE_TYPE, TOGGLE_COLOR, TOGGLE_DEBUG_DEVICE, TOGGLE_DEVICE, TOGGLE_IS_EXTERNAL, TOGGLE_MOBILE_WIDTH } from '@/store/mutation-types'

function device(state) {
  return state.debugDevice === 'auto' ? state.device : state.debugDevice
}

export default {
  state: {
    device: DEVICE_TYPE.desktop,
    debugDevice: 'auto',
    mobileWidth: '375px',
    color: null,
    isExternal: false,
    action: 'preview',
  },
  mutations: {
    [TOGGLE_DEVICE]: (state, device) => state.device = device,
    [TOGGLE_DEBUG_DEVICE]: (state, device) => state.debugDevice = device,
    [TOGGLE_MOBILE_WIDTH]: (state, mobileWidth) => state.mobileWidth = mobileWidth,
    [TOGGLE_COLOR]: (state, color) => state.color = color,
    [TOGGLE_IS_EXTERNAL]: (state, isExternal) => state.isExternal = isExternal,
    SET_ACTION: (state, action) => state.action = action,
  },
  actions: {},
  getters: {
    color: state => state.color,
    device: state => device(state),
    isMobile: state => device(state) === DEVICE_TYPE.mobile,
    isDesktop: state => device(state) === DEVICE_TYPE.desktop,
    isExternal: state => state.isExternal,
    action: state => state.action,
    isPreviewAction: state => state.action === 'preview',
    isAddAction: state => state.action === 'add',
    isEditAction: state => state.action === 'edit',
    isDetailAction: state => state.action === 'detail',
  }
}