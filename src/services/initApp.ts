import router from '../core/Router'
import {
	ChatsPageConnect,
	ErrorPage,
	LoginPage,
	ProfileEditPageConnect,
	ProfilePageConnect,
	ProfilePasswordPage,
	RegisterPage
} from '../pages'
import { loadChats, redirectToHome, redirectToMessenger } from '../utils/middlewares'

export const initApp = async () => {
	router
		.use('/', LoginPage, [redirectToMessenger])
		.use('/sign-up', RegisterPage, [redirectToMessenger])
		.use('/settings', ProfilePageConnect, [redirectToHome])
		.use('/profile', ProfileEditPageConnect, [redirectToHome])
		.use('/password', ProfilePasswordPage, [redirectToHome])
		.use('/messenger', ChatsPageConnect, [redirectToHome, loadChats])
		.use(/.*?/, ErrorPage)

	await router.start()
}
