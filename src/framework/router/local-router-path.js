/*
* 根据目录结构来生成路由数据
* 自动遍历目录/biz/views下的index.vue为页面
 */
const files = require.context('@/framework/easy4j/system', true, /index\.vue$/)
const generator = []
const bizFiles = require.context('@/biz/views', true, /index\.vue$/)

files.keys().forEach(key => {
  const routerPath = `/sys/${key.replace(/(\.\/|\/index\.vue)/g, '')}`
  const currentRouter = {
    path: routerPath,
    component: files(key).default || files(key),
    hidden: true // 本地路由默认隐藏
  }
  generator.push(currentRouter)
})

bizFiles.keys().forEach(key => {
  const routerPath = `/${key.replace(/(\.\/|\/index\.vue)/g, '')}`
  const file = bizFiles(key).default || bizFiles(key)
  const fileName = file.metaTitle
  const currentRouter = {
    path: routerPath,
    component: bizFiles(key).default || bizFiles(key),
    hidden: true,
    meta: {
      title: fileName
    }
  }
  generator.push(currentRouter)
})

// 默认基础路由
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}
const defaultRouter = [
  {
    path: '/account',
    component: RouteView,
    redirect: '/account/center',
    name: 'account',
    hidden: true,
    meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
    children: [
      {
        path: '/account/center',
        name: 'center',
        component: () => import('@/framework/views/account/center'),
        meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
      },
      {
        path: '/account/settings',
        name: 'settings',
        component: () => import('@/framework/views/account/settings/Index'),
        meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
        redirect: '/account/settings/password',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/account/settings/password',
            name: 'Password',
            component: () => import('@/framework/views/account/settings/UpdatePassword'),
            meta: { title: '修改密码', hidden: true, keepAlive: true, permission: [ 'user' ] }
          }
        ]
      }
    ]
  }
]

const localRouter = [ ...generator, ...defaultRouter ]

// console.log('localRouter', localRouter)

export {
  localRouter
}
