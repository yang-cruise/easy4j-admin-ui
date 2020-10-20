import storage from 'store'
import { login, getSysMenusSelfPermissions } from '@/framework/api/login'
import { getUserInfo } from '@/framework/api/user'
import { ACCESS_TOKEN, BTN_PERMISSIONS, USER_INFO } from '@/framework/store/mutation-types'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    btnPermissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_BTN_PERMISSIONS: (state, btnPermissions) => {
      state.btnPermissions = btnPermissions
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          storage.set(ACCESS_TOKEN, response.data, 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const result = response.data
          commit('SET_INFO', result)
          storage.set(USER_INFO, result)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取所有按钮权限
    GetBtnPermissions ({ commit }) {
      return new Promise((resolve, reject) => {
        getSysMenusSelfPermissions().then(response => {
          const result = response.data
          storage.set(BTN_PERMISSIONS, result)
          commit('SET_BTN_PERMISSIONS', result)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_BTN_PERMISSIONS', [])
        storage.clearAll()
        window.location.reload()
        resolve()
      })
    }
  }
}

export default user
