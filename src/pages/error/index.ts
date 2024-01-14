import template from './error.hbs?raw'
import Block from '../../core/Block'

export class ErrorPage extends Block<{}> {
  protected render(): string {
    return template
  }
}
