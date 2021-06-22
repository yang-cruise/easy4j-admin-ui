/* easy4j 页面缓存名单 */

export default {
  state: {
    keepList: []
  },
  getters: {},
  mutations: {
    SET_KEEP_LIST: (state, data = []) => {
      state.keepList = [...data]
    }
  },
  actions: {
    SetKeep ({ commit, state }, data) {
      let list = [...state.keepList]
      if (data) {
        list.push(data)
        list = [...new Set(list)]
        commit('SET_KEEP_LIST', list)
      }
    },
    RemoveKepp ({ commit, state }, data) {
      const list = [...state.keepList].filter(ele => ele !== data)
      commit('SET_KEEP_LIST', list)
    }
  }
}
