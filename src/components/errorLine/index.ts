import Block, { RefType } from '../../core/Block'
import template from './errorLine.hbs?raw'

interface ErrorLineProps {
  error: string
  className: string
}

export class ErrorLine extends Block<ErrorLineProps, RefType, HTMLElement> {
  protected render(): string {
    return template
  }
}
