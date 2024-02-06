import { isGuest } from '../services/authService'
import { Middleware } from '../core/Router'

export const redirectToHome: Middleware = async (router, next) => {
	if (await isGuest()) {
		router.go('/')
	} else {
		next()
	}
}

export const redirectToMessenger: Middleware = async (router, next) => {
	if (!await isGuest()) {
		router.go('/messenger')
	} else {
		next()
	}
}
