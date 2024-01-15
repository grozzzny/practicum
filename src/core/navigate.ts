import * as Pages from '../pages'
import Block from './Block'

export type PagesName =
  | 'login'
  | 'register'
  | 'chats'
  | 'profile'
  | 'profileEdit'
  | 'profilePassword'
  | 'changeAvatar'
  | 'error'

const pages: Record<PagesName, typeof Block<object>> = {
  login: Pages.LoginPage,
  register: Pages.RegisterPage,
  chats: Pages.ChatsPage,
  profile: Pages.ProfilePage,
  profileEdit: Pages.ProfileEditPage,
  profilePassword: Pages.ProfilePasswordPage,
  changeAvatar: Pages.ChangeAvatarPage,
  error: Pages.ErrorPage
}

export function navigate(page: PagesName) {
  const app = document.getElementById('app')!
  const Component = pages[page]
  const component = new Component()

  app.innerHTML = ''
  app.append(component.getContent()!)
}
