import request from '@/framework/utils/request'
import menuData from './data.json'

const userApi = {
  Login: '/sys_login/token_by_account',
  Easy4jLogin: '/sys_login/token_by_account',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  // 路由树
  UserMenu: '/sys_menus/tree',
  // 配置信息
  siteMsg: '/sys_configs/site_config',
  siteMsgdetail: '/sys_configs/detail',
  // 所有按钮权限
  getSysMenusSelfPermissions: '/sys_menus/self_permissions'
}

/**
 * login func
 * parameter: {
 *     account : '',
 *     password : ''
 * }
 * @param parameter
 * @returns {*}
 */

export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'get',
    params: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function siteMsg (parameter) {
  return request({
    url: userApi.siteMsg,
    method: 'get',
    params: parameter || {}
  })
}

export function siteMsgdetail (parameter) {
  return request({
    url: userApi.siteMsgdetail,
    method: 'get',
    params: parameter || {}
  })
}

export function getInfo () {
  return request({
    url: '/pro',
    method: 'post',
    data: {
      s: 'App.User.Profile'
    }
  })
}

export function getCurrentUserNav () {
  // return request({
  //   url: userApi.UserMenu,
  //   method: 'get'
  // })
  return new Promise((resolve, reject) => {
		resolve(menuData)
	})
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}

export function getSysMenusSelfPermissions (parameter) {
  return request({
    url: userApi.getSysMenusSelfPermissions,
    method: 'get',
    params: parameter
  })
}
