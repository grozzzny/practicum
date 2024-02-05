import router from '../core/Router'
import { ChatsPage, ErrorPage, LoginPage, RegisterPage } from '../pages'
import { checkAuth } from '../utils/middlewares'

export const initApp = async () => {
	router
		.use('/', LoginPage)
		.use('/sign-up', RegisterPage)
		.use('/messenger', ChatsPage, [checkAuth])
		.use(/.*?/, ErrorPage)

	await router.start()
}
