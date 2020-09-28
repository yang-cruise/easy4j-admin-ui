import request from '@/framework/utils/request'

export function putSetting (parameter) {
  return request({
    url: '/sys_configs',
    method: 'put',
    data: parameter
  })
}
