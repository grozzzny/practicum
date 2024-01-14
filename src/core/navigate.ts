import * as Pages from '../pages'
import Block from './Block'

export type PagesName =
  | 'login'
  | 'register'
  | 'chats'
  | 'dialog'
  | 'removeUser'
  | 'addUser'
  | 'profile'
  | 'profileEdit'
  | 'profilePassword'
  | 'changeAvatar'
  | 'error'

const pages: Record<PagesName, typeof Block<{}>> = {
  login: Pages.LoginPage,
  register: Pages.RegisterPage,
  chats: Pages.ChatsPage,
  dialog: Pages.DialogPage,
  removeUser: Pages.RemoveUserPage,
  addUser: Pages.AddUserPage,
  profile: Pages.ProfilePage,
  profileEdit: Pages.ProfileEditPage,
  profilePassword: Pages.ProfilePasswordPage,
  changeAvatar: Pages.ChangeAvatarPage,
  error: Pages.ErrorPage,
}

export function navigate(page: PagesName) {
  const app = document.getElementById('app')!
  const Component = pages[page]
  const component = new Component()
  app.innerHTML = ''
  app.append(component.getContent()!)
}
