import { BasicLayout } from '@/framework/layouts'
import { constantRouterMap } from '@/framework/config/router.config'
import { menu } from '@/framework/api/menu'
// 前端根据项目目录生成的路由列表，如不需要前端自动生成则删除以下的引入
import { localRouter } from '@/framework/router/local-router-path'
// import { RouteView as routeViews } from '@/framework/layouts/RouteView.vue'
// 组合处理router数据
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

const localRouterFlat = [...localRouter]

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
}
// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  path: '/',
  component: BasicLayout,
  redirect: '/home',
  meta: {
    title: '首页'
  },
  children: []
}

// 隐藏菜单
let hideMenu = localRouter
const handleRoutersList = (list = [], target, parentPath = '/') => {
  list.forEach((item) => {
    hideMenu = hideMenu.filter(ele => ele.path !== item.url)
    const localCurrentItemIndex = localRouter.findIndex(ele => ele.path === item.url)
    const localCurrentItem = localRouter[localCurrentItemIndex] || null
    const child = {
      children: [],
      meta: {
        title: item.name,
        show: true,
        icon: item.icon,
        parentPath
      },
      path: item.url || `/${item.id}`,
      component: RouteView,
      name: item.url || `/${item.id}`,
      key: `${item.id}`
    }
    if (localCurrentItem) {
      child.component = localCurrentItem.component
      child.name = localCurrentItem.name
      child.hidden = false
      localRouterFlat[localCurrentItemIndex].path = child.path
      localRouterFlat[localCurrentItemIndex].meta = child.meta
    }
    if (item.type === 'D' && item.children && item.children.length) {
      child.redirect = getFirstPath(item.children)
      child.path = `/${item.id}`
    }
    if (item.children && item.children.length) {
      handleRoutersList(item.children, child.children, child.path)
    } else {
      delete child.children
    }
    target.push(child)
  })
  return list
}
const getFirstPath = (list) => {
  let path = ''
  for (const i in list) {
    const item = list[i]
    if (item.url) {
      path = item.url
      break
    } else if (item.children && item.children.length) {
      item.url = getFirstPath(item.children)
    }
  }
  return path
}

// 根级菜单
const rootRouterFlat = {
  ...rootRouter,
  children: [...localRouterFlat, notFoundRouter]
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    localRouters: [],
    loaclRoutersFlat: [rootRouterFlat] // 扁平化路由数据
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      const firstNav = routers[0].children[0]
      routers[0].redirect = firstNav.redirect || firstNav.path
      state.localRouters = routers
      state.routers = constantRouterMap.concat(state.localRouters)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        menu().then(res => {
          const root = { ...rootRouter }
          const menuNav = []
          const childrenNav = []
          handleRoutersList(res.data, childrenNav)
          root.children = childrenNav
          root.children.push(...hideMenu)
          menuNav.push(root)
          menuNav.push(notFoundRouter)
          commit('SET_ROUTERS', menuNav)
          resolve()
        }).catch(() => {
          const root = { ...rootRouter }
          root.children = localRouter
          commit('SET_ROUTERS', [root, notFoundRouter])
        })
      })
    }
  }
}

export default permission
