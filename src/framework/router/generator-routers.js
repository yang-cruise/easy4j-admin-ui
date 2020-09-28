// eslint-disable-next-line
import * as loginService from '@/framework/api/login'
// eslint-disable-next-line
import {
  BasicLayout,
  BlankLayout,
  PageView,
  RouteView
} from '@/framework/layouts'
import { menu } from '@/framework/api/menu'
// import { delete } from 'node_modules/vue/types/umd'

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView, // 不带面包屑头部
  PageView: PageView, // 带面包屑头部
  '403': () => import(/* webpackChunkName: "error" */'@/framework/views/exception/403'),
  '404': () => import(/* webpackChunkName: "error" */'@/framework/views/exception/404'),
  '500': () => import(/* webpackChunkName: "error" */'@/framework/views/exception/500')
}

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
  path: '',
  component: 'BasicLayout',
  redirect: '',
  meta: {
    title: '首页'
  },
  children: []
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    menu().then(res => {
      const menuNav = []
      const childrenNav = []
      handleRoutersList(res.data, childrenNav)
      rootRouter.children = childrenNav
      menuNav.push(rootRouter)
      const routers = generator(menuNav)
      routers.push(notFoundRouter)
      resolve(routers)
    }).catch(err => {
      reject(err)
    })
    // loginService.getCurrentUserNav().then(res => {
    //   console.log(res)
    //   const {
    //     result
    //   } = res
    //   const menuNav = []
    //   const childrenNav = []
    //   // 后端数据, 根级树数组,  根级 PID
    //   // listToTree(result, childrenNav, 0)
    //   rootRouter.children = childrenNav
    //   menuNav.push(rootRouter)
    //   const routers = generator(menuNav)
    //   routers.push(notFoundRouter)
    //   resolve(routers)
    // }).catch(err => {
    //   reject(err)
    // })
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const {
      title,
      show,
      hideChildren,
      hiddenHeaderContent,
      target,
      icon
    } = item.meta || {}
    // 判断是否有理由本地文件
    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${parent && parent.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component: (constantRouterComponents[item.component || item.key]) || (resolve => require([`@/${item.component}.vue`], resolve)),
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target
        // permission: item.name
      }
    }
    // 是否设置了隐藏菜单
    currentRouter.hidden = (show === false)
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
/* const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}
 */

const getFirstPath = (list) => {
  let path = ''
  list.map(item => {
    if (item.url) {
      path = item.url
      return path
    } else if (item.children && item.children.length) {
      item.url = getFirstPath(item.children)
    }
  })
  return path
}

// 组合处理router数据
const handleRoutersList = (list = [], target) => {
  list.forEach(item => {
    const child = {
      children: [],
      meta: {
        title: item.name,
        show: true,
        hideChildren: false,
        hiddenHeaderContent: true,
        perms: item.perms
      },
      path: item.url,
      component: item.component || 'RouteView',
      key: item.id
    }
    if (item.type === 'D') {
      child.redirect = getFirstPath(item.children)
      child.path = child.redirect || ''
    }
    handleRoutersList(item.children, child.children)
    target.push(child)
  })
  return list
}
