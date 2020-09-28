import request from '@/framework/utils/request'

const userApi = {
  list: '/sys_menus/tree', // 目录，菜单，按钮
  handle: '/sys_menus', // 新增，更新，删除
  sort: '/sys_menus/sort', // 排序
  menu: '/sys_menus/self_tree' // 目录，菜单
}

export const getList = params =>
  request({
    url: userApi.list,
    method: 'GET',
    params
  })

export const insert = data =>
  request({
    url: userApi.handle,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })

export const update = data =>
  request({
    url: userApi.handle,
    method: 'PUT',
    data
  })

export const del = params =>
  request({
    url: `${userApi.handle}/${params.ids}`,
    method: 'DELETE',
    params
  })

export const sort = data =>
  request({
    url: userApi.sort,
    method: 'PUT',
    data
  })

export const menu = params =>
  request({
    url: userApi.menu,
    method: 'GET',
    params
  })
