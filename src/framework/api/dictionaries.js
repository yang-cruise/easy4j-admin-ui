import request from '@/framework/utils/request'

const Api = {
  dictionaries: '/sys_dicts/page',
  deletDic: '/sys_dicts',
  dictionInfo: '/sys_dicts/items'
}

export function getDictionaries (parameter) {
  console.log(parameter, 'parameter')
  return request({
    url: Api.dictionaries,
    method: 'get',
    params: parameter
  })
}

export function deleteDiction (parameter) {
  return request({
    url: `${Api.deletDic}/${parameter.ids}`,
    method: 'delete'
  })
}

export function addDiction (parameter) {
  return request({
    url: Api.deletDic,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function editDiction (parameter) {
  return request({
    url: Api.deletDic,
    method: 'put',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getSingleDiction (parameter) {
  return request({
    url: `/sys_dicts/${ parameter.id }/items`,
    method: 'get',
    params: parameter
  })
}

export function getDictionInfo (parameter) {
  return request({
    url: Api.dictionInfo,
    method: 'put',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function deleteDictionInfo (parameter) {
  return request({
    url: `${Api.dictionInfo}/${parameter.id}`,
    method: 'delete'
  })
}

export function addDictionInfo (parameter) {
  return request({
    url: Api.dictionInfo,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getSelectDiction (parameter) {
  return request({
    url: Api.dictionInfo,
    method: 'get',
    params: parameter
  })
}
