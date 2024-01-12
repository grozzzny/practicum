import * as Pages from '../pages'
import Block from './Block'

const pages: Record<string, typeof Block<{}>> = {
  test: Pages.TestPage
  // login: Pages.LoginPage,
  // register: [Pages.RegisterPage],
  // chats: [Pages.ChatsPage],
  // dialog: [Pages.DialogPage],
  // removeUser: [Pages.RemoveUserPage],
  // addUser: [Pages.AddUserPage],
  // profile: [Pages.ProfilePage],
  // profileEdit: [Pages.ProfileEditPage],
  // profilePassword: [Pages.ProfilePasswordPage],
  // changeAvatar: [Pages.ChangeAvatarPage],
  // error: [Pages.ErrorPage]
}

export function navigate(page: string) {
  const app = document.getElementById('app')
  const Component = pages[page]
  const component = new Component()
  app?.append(component.getContent()!)
}
