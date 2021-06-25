import request from '@/framework/utils/request'

const myApi = {
  sysBusinessLogs: '/sys_business_logs'
}

export const sysBusinessLogs = data => request({
  url: myApi.sysBusinessLogs,
  method: 'get',
  data
})
