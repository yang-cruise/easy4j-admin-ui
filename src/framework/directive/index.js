import Vue from 'vue'
import storage from 'store'
import { BTN_PERMISSIONS } from '@/framework/store/mutation-types'

Vue.directive('permission', {
  inserted: (el, binding, vnode) => {
    const permissionList = storage.get(BTN_PERMISSIONS)
    // 以下任一情况，都不展示
    // 1.权限列表为空
    // 2.未传入权限标识
    // 3.权限标识不存在
    if (!binding.value || !permissionList || !permissionList.length || !permissionList.includes(binding.value)) {
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }
  }
})
