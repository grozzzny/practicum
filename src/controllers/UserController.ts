import router from '../core/Router'
import {
	DataAvatarForm,
	DataProfileEditForm,
	DataProfilePasswordForm
} from '../type'
import {
	changePassword,
	changeProfile,
	changeAvatar
} from '../services/userService'
import store from '../core/Store'

class UserController {
	public async changeProfile(data: DataProfileEditForm) {
		const user = await changeProfile(data)
		store.set('user', user)
		router.go('/settings')
	}

	public async changePassword(data: DataProfilePasswordForm) {
		await changePassword(data)
		router.go('/settings')
	}

	public async changeAvatar(data: DataAvatarForm) {
		const user = await changeAvatar(data)
		store.set('user', user)
	}
}

export default new UserController()
