import UserAPI from '../api/UserAPI'
import { DataProfileEditForm, DataProfilePasswordForm } from '../type'

export const changeProfile = (data: DataProfileEditForm) => {
	return UserAPI.changeProfile(data)
}

export const changePassword = (data: DataProfilePasswordForm) => {
	return UserAPI.changePassword(data)
}
