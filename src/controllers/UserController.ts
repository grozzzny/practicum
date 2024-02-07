import router from '../core/Router'
import { DataProfileEditForm, DataProfilePasswordForm } from '../type'
import { changePassword, changeProfile } from '../services/userService'

class UserController {
	public async changeProfile(data: DataProfileEditForm) {
		await changeProfile(data)
		router.go('/settings')
	}

	public async changePassword(data: DataProfilePasswordForm) {
		await changePassword(data)
		router.go('/settings')
	}
}

export default new UserController()
