import template from './profile.hbs?raw'
import Block from '../../core/Block'

export class ProfilePage extends Block {
  protected render(): string {
    return template
  }
}
