import router from '../core/Router'
import { ChatsPage, ErrorPage, LoginPage, RegisterPage } from '../pages'

export const initApp = async () => {
	router
		.use('/', LoginPage)
		.use('/sign-up', RegisterPage)
		.use('/messenger', ChatsPage)
		.use(/.*?/, ErrorPage)

	await router.start()
}

