import Block from '../../core/Block'
import template from './button.hbs?raw'
import { PagesName } from '../../core/navigate'
import './button.css'

interface ButtonProps {
  label: string
  type: 'primary' | 'link'
  buttonType?: 'submit' | 'button' | 'reset'
  page: PagesName
  onClick: () => void
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      buttonType: 'button',
      ...props
    })
  }

  protected init(): void {
    this.eventsElement = {
      click: this.props.onClick
    }
  }

  protected render(): string {
    return template
  }
}
