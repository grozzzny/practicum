import { isGuest } from '../services/authService'
import { Middleware } from '../core/Router'
import { getChats } from '../services/chatService'
import store from '../core/Store'

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
	const chats = await getChats({ limit: '500' })
	store.set('chats', chats)
	next()
}
