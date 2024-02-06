import router from '../core/Router'
import {
	ChatsPage,
	ErrorPage,
	LoginPage,
	ProfileEditPage,
	ProfilePage,
	ProfilePasswordPage,
	RegisterPage,
} from '../pages'
import { redirectToHome, redirectToMessenger } from '../utils/middlewares'

export const initApp = async () => {
	router
		.use('/', LoginPage, [redirectToMessenger])
		.use('/sign-up', RegisterPage, [redirectToMessenger])
		.use('/settings', ProfilePage, [redirectToHome])
		.use('/profile', ProfileEditPage, [redirectToHome])
		.use('/password', ProfilePasswordPage, [redirectToHome])
		.use('/messenger', ChatsPage, [redirectToHome])
		.use(/.*?/, ErrorPage)

	await router.start()
}
