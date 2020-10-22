import { siteMsg } from '@/framework/api/login'
import defaultLogo from '@/framework/assets/easy4j-logo.png'
import storage from 'store'
import { SYS_MSG } from '@/framework/store/mutation-types'

const systemSetting = {
	state: {
		siteName: '', // 网站名字
		logo: '',
		beian: '',
		copyright: '',
		slogan: ''
	},
	mutations: {
		SYS_MSG: (state, obj) => {
			state = Object.assign(state, obj)
			state.logo = obj.logo || defaultLogo
			if (state.logo && state.logo.indexOf('http') < 0) {
				state.logo = `${window.location.origin}${process.env.VUE_APP_API_BASE_URL}${state.logo}`
			}
			const link = document.querySelector("link[rel*='icon']") || document.createElement('link')
			link.type = 'image/x-icon'
			link.rel = 'shortcut icon'
			link.href = obj.logo || defaultLogo
			document.getElementsByTagName('head')[0].appendChild(link)
		}
	},
	actions: {
		GetSysMsg ({ commit }, obj) {
			return new Promise((resolve, reject) => {
				siteMsg().then(res => {
					commit('SYS_MSG', { ...res.data, ...obj })
					storage.set(SYS_MSG, res.data)
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}

export default systemSetting
