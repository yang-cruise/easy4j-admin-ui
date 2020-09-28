// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './framework/router'
import store from './framework/store/'
import i18n from './framework/locales'
import { VueAxios } from './framework/utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'

import bootstrap from './framework/core/bootstrap'
import './framework/core/lazy_use'
import './permission' // permission control
import './framework/utils/filter' // global filter
import './global.less'
import '@/framework/easy4j/css/default.css'
import '@/framework/directive'

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(Antd)
Vue.use(VueAxios)
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
