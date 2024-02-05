import { isGuest } from '../services/authService'
import { Middleware } from '../core/Router'

export const checkAuth: Middleware = async (router, next) => {
	if (await isGuest()) {
		router.go('/')
	} else {
		next()
	}
}
