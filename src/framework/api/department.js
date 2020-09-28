import request from '@/framework/utils/request'

// 查询全部部门树
export function getSysDeptsTree (parameter) {
  return request({
    url: '/sys_depts/tree',
    method: 'get',
    params: parameter
  })
}

// 新增部门
export function postSysDept (parameter) {
  return request({
    url: '/sys_depts',
    method: 'post',
    data: parameter
  })
}

// 更新部门
export function putSysDept (parameter) {
  return request({
    url: '/sys_depts',
    method: 'put',
    data: parameter
  })
}

// 删除部门
export function deleteSysDept (parameter) {
  return request({
    url: `/sys_depts/${ parameter.ids }`,
    method: 'delete'
  })
}
