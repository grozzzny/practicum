import template from './removeUser.hbs?raw'
import Block from '../../core/Block'

export class RemoveUserPage extends Block<{}> {
  protected render(): string {
    return template
  }
}
