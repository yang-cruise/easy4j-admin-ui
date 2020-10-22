// 文件上传
import request from '@/framework/utils/request'

export const upload = data => request({
  url: '/sys_files',
  method: 'POST',
  data
})
