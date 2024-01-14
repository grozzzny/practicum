import template from './dialog.hbs?raw'
import Block from '../../core/Block'

export class DialogPage extends Block<{}> {
  protected render(): string {
    return template
  }
}
