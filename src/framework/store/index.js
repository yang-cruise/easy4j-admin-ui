import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import setting from './modules/setting'
// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'
// 客户端使用数据
import biz from '@/biz/store/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    setting,
    ...biz
  },
  state: {
  },
  mutations: {

  },
  actions: {

  },
  getters
})
