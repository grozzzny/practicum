import { isGuest } from '../services/authService'
import { Middleware } from '../core/Router'
import { getChats } from '../services/chatService'

export const redirectToHome: Middleware = async (router, next) => {
	if (await isGuest()) {
		router.go('/')
	} else {
		next()
	}
}

export const redirectToMessenger: Middleware = async (router, next) => {
	if (!(await isGuest())) {
		router.go('/messenger')
	} else {
		next()
	}
}

export const loadChats: Middleware = async (_router, next) => {
	await getChats({ limit: '500' })
	setInterval(() => {
		getChats({ limit: '500' })
	}, 1000)
	next()
}
