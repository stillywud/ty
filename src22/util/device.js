import enquireJs from 'enquire.js'
import { DEVICE_TYPE, TOGGLE_DEVICE } from '@/store/mutation-types'

export function enquireScreen(call) {
  const callback = call || (() => 0)
  enquireJs.register('screen and (max-width: 1080px)', {
    // tablet
    match: () => callback(0),
    // desktop
    unmatch: () => callback(-1),
  })
  enquireJs.register('screen and (max-width: 768px)', {
    // mobile
    match: () => callback(1),
  })
}

function toggleDevice(store, device) {
  store.commit(TOGGLE_DEVICE, device)
}

export function handleEnquireScreen(store) {
  if (navigator && navigator.userAgent) {
    // 新版使用的是根据UA判断是否为移动端
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      toggleDevice(store, DEVICE_TYPE.mobile)
    } else {
      toggleDevice(store, DEVICE_TYPE.desktop)
    }
  } else {
    // 旧版使用的是根据宽度判断是否为移动端，
    enquireScreen(deviceType => {
      if (deviceType === 0 || deviceType === 1) {
        toggleDevice(store, DEVICE_TYPE.mobile)
      } else {
        toggleDevice(store, DEVICE_TYPE.desktop)
      }
    })
  }
}