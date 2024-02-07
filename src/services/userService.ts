import UserAPI from '../api/UserAPI'
import { DataAvatarForm, DataProfileEditForm, DataProfilePasswordForm } from '../type'

export const changeProfile = (data: DataProfileEditForm) => {
	return UserAPI.changeProfile(data)
}

export const changePassword = (data: DataProfilePasswordForm) => {
	return UserAPI.changePassword(data)
}

export const changeAvatar = (data: DataAvatarForm) => {
	return UserAPI.changeAvatar(data.avatar)
}

export const getUrlAvatar = (path: string) => {
	return `//ya-praktikum.tech/api/v2/resources${path}`
}
