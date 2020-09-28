import request from '@/framework/utils/request'

const roleApi = {
  AddRole: '/sys_roles',
  GetRole: '/sys_roles/page',
  DeleteRole: '/sys_roles',
  EditRole: '/sys_roles',
  GetPermissions: '/sys_roles',
  GetMenuTree: '/sys_menus/tree',
  EditRolePermission: '/sys_roles'
}

export function addRole (data) {
  return request({
    url: roleApi.AddRole,
    method: 'post',
    data: data
  })
}

export function getRole (params) {
  return request({
    url: roleApi.GetRole,
    method: 'get',
    params: params
  })
}

export function deleteRole (ids) {
  return request({
    url: roleApi.DeleteRole + `/${ids}`,
    method: 'delete'
  })
}

export function uploadRole (data) {
  return request({
    url: roleApi.EditRole,
    method: 'put',
    data: data
  })
}

export function getPermissions (id) {
  return request({
    url: roleApi.GetPermissions + `/${id}/permissions`,
    method: 'get'
  })
}

export function getMenuTree () {
  return request({
    url: roleApi.GetMenuTree,
    method: 'get'
  })
}

export function uploadRolePermission (data) {
  return request({
    url: roleApi.EditRole + `/${data.id}/${data.menuIds}`,
    method: 'put'
  })
}
