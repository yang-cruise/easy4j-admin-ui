import request from '@/framework/utils/request'

const Api = {
  userInfo: '/sys_users/self_info',

  // 分页查询用户列表
  getSysUsersPage: '/sys_users/page',

  // 新增系统用户
  postSysUser: '/sys_users',

  // 更新用户
  putSysUser: '/sys_users',

  // 删除用户
  deleteSysUser: '/sys_users',

  // 修改个人密码
  putSelfPassword: '/sys_users/self_password',

  // TODO
  // 别的模块的接口，到时候要换引入路径
  // 查询全部角色
  getSysRoles: '/sys_roles'
}

export function getSysUsersPage (parameter) {
  return request({
    url: Api.getSysUsersPage,
    method: 'get',
    params: parameter
  })
}

export function getUserInfo () {
  return request({
    url: Api.userInfo,
    method: 'get'
  })
}

export function putUserInfo (parameter) {
  return request({
    url: Api.userInfo,
    method: 'put',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function postSysUser (parameter) {
  return request({
    url: Api.postSysUser,
    method: 'post',
    data: parameter
  })
}

export function getSysRoles (parameter) {
  return request({
    url: Api.getSysRoles,
    method: 'get',
    params: parameter
  })
}

export function putSysUser (parameter) {
  return request({
    url: Api.putSysUser,
    method: 'put',
    data: parameter
  })
}

export function deleteSysUser (parameter) {
  return request({
    url: `${Api.deleteSysUser}/${parameter.ids}`,
    method: 'delete'
  })
}

// 管理员重置密码
export function putSysUserPassword (parameter) {
  return request({
    url: `/sys_users/${ parameter.userId }/password`,
    method: 'put',
    data: parameter
  })
}

// 切换状态
export function putSysUserStatus (parameter) {
  return request({
    url: `/sys_users/${ parameter.userId }/status`,
    method: 'put',
    data: parameter
  })
}

export function putSelfPassword (parameter) {
  return request({
    url: Api.putSelfPassword,
    method: 'put',
    data: parameter
  })
}
