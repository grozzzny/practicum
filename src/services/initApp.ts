import router from '../core/Router'
import { ChatsPage, ErrorPage, LoginPage, ProfilePage, RegisterPage } from '../pages'
import { checkAuth } from '../utils/middlewares'

export const initApp = async () => {
	router
		.use('/', LoginPage)
		.use('/sign-up', RegisterPage)
		.use('/settings', ProfilePage, [checkAuth])
		.use('/messenger', ChatsPage, [checkAuth])
		.use(/.*?/, ErrorPage)

	await router.start()
}
