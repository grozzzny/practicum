import template from './profilePassword.hbs?raw'
import Block from '../../core/Block'

export class ProfilePasswordPage extends Block<{}> {
  protected render(): string {
    return template
  }
}
