import template from './register.hbs?raw'
import Block from '../../core/Block'

export class RegisterPage extends Block<{}> {
  protected render(): string {
    return template
  }
}
