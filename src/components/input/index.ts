import Block, { RefType } from '../../core/Block'
import template from './input.hbs?raw'
import './input.css'

export type InputType = 'search' | 'default' | 'error'

export interface InputProps {
  onBlur: () => void
  type: InputType
  name: string
  value: string
  placeholder: string
}

export class Input extends Block<InputProps, RefType, HTMLElement> {
  protected init(): void {
    this.eventsElement = {
      blur: this.props.onBlur
    }
  }

  public value(): string {
    return this.element.getElementsByTagName('input')[0].value
  }

  protected render(): string {
    return template
  }
}
