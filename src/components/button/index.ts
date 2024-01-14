import Block from '../../core/Block'
import template from './button.hbs?raw'
import { PagesName } from '../../core/navigate'
import './button.css'

interface ButtonProps {
  label: string
  type: 'primary' | 'link'
  page: PagesName
  onClick: () => void
}

export class Button extends Block<ButtonProps> {
  protected init(): void {
    this.eventsElement = {
      click: this.props.onClick
    }
  }

  protected render(): string {
    return template
  }
}
