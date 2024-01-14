import Block from '../../core/Block'
import template from './input.hbs?raw'
import './input.css'

export type InputType = 'search' | 'default'

export interface InputProps {
  onBlur: () => void
  type: InputType
  name: string
  value: string
  placeholder: string
}

export class Input extends Block<InputProps, HTMLInputElement> {
  protected init(): void {
    this.eventsElement = {
      blur: this.props.onBlur
    }
  }

  protected render(): string {
    return template
  }
}
