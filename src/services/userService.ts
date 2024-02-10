import UserAPI from '../api/UserAPI'
import { DataAvatarForm, DataLogin, DataProfileEditForm, DataProfilePasswordForm, User } from '../type'
import { ErrorAPI } from '../utils/HTTPTransport'

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

export const search = async (data: DataLogin): Promise<User> | never => {
	const users = await UserAPI.search(data)
	const foundUser = users.find(user => user.login === data.login)
	if (foundUser) {
		return foundUser
	} else {
		throw new ErrorAPI('User not found')
	}
}
