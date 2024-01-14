import template from './addUser.hbs?raw'
import Block from '../../core/Block'

export class AddUserPage extends Block<{}> {
  protected render(): string {
    return template
  }
}
