import template from './profileEdit.hbs?raw'
import Block from '../../core/Block'

export class ProfileEditPage extends Block<{}> {
  protected render(): string {
    return template
  }
}
