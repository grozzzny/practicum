import router from '../core/Router'
import {
	ChatsPageConnect,
	ErrorPage,
	LoginPage,
	ProfileEditPage,
	ProfilePageConnect,
	ProfilePasswordPage,
	RegisterPage
} from '../pages'
import { redirectToHome, redirectToMessenger } from '../utils/middlewares'

export const initApp = async () => {
	router
		.use('/', LoginPage, [redirectToMessenger])
		.use('/sign-up', RegisterPage, [redirectToMessenger])
		.use('/settings', ProfilePageConnect, [redirectToHome])
		.use('/profile', ProfileEditPage, [redirectToHome])
		.use('/password', ProfilePasswordPage, [redirectToHome])
		.use('/messenger', ChatsPageConnect, [redirectToHome])
		.use(/.*?/, ErrorPage)

	await router.start()
}
