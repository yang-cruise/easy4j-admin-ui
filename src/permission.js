import router from './framework/router'
import store from './framework/store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/framework/components/NProgress/nprogress.less' // progress bar custom style
import { setDocumentTitle } from '@/framework/utils/domUtil'
import { ACCESS_TOKEN, SYS_MSG } from '@/framework/store/mutation-types'
import { i18nRender } from '@/framework/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const loginRoutePath = '/user/login'
const defaultRoutePath = '/'

router.beforeEach((to, from, next) => {
  const toDom = typeof storage.get(SYS_MSG) !== 'undefined' ? storage.get(SYS_MSG).siteName : 'easy4j'
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${toDom}`))
  /* has token */
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath, replace: true })
      NProgress.done()
    } else {
      // check login user.roles is null
      if (!store.getters.addRouters || store.getters.addRouters.length === 0) {
        store.dispatch('GenerateRoutes').then(() => {
          // 根据roles权限生成可访问的路由表
          // 动态添加可访问路由表
          router.addRoutes(store.getters.localRouters)
          // 请求带有 redirect 重定向时，登录自动重定向到该地址
          const redirect = decodeURIComponent(from.query.redirect || to.path || '/')
          if (to.path === redirect) {
            // set the replace: true so the navigation will not leave a history record\
            next({ ...to, replace: true })
          } else {
            // 跳转到目的路由
            next({ path: redirect, replace: true })
          }
        })
      } else {
        if (to.matched.length === 0) {
          store.dispatch('GenerateRoutes').then(() => {
            router.addRoutes(store.getters.localRouters)
            next({ ...to, replace: true })
          })
        } else {
          next()
        }
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
