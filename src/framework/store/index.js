import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import setting from './modules/setting'
import Easy4jNav from './modules/easy4j-nav'
// 本地写入路由
// import permission from './modules/permission'

// 后端生成路由
// dynamic router permission control (Experimental)
// import permission from './modules/async-router'

// 本地自动生成路由
import permission from './modules/local-async-router'

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
    Easy4jNav,
    ...biz
  },
  state: {
    queryFormLoading: false, // 查询组件表单防抖设置
    dictStatus: [] // 字典节流
  },
  mutations: {
    QUERYLOADING: (state, loading) => {
      state.queryFormLoading = loading
    },
    DICTSTATUS: (state, data) => {
      state.dictStatus.push(data)
    }
  },
  actions: {
    setQueryFormStatus: ({ commit }, loading) => {
      commit('QUERYLOADING', loading)
    },
    setDictStatus: ({ commit }, data) => {
      commit('DICTSTATUS', data)
    }
  },
  getters
})
