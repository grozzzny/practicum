import template from './changeAvatar.hbs?raw'
import Block from '../../core/Block'

export class ChangeAvatarPage extends Block {
  protected render(): string {
    return template
  }
}
