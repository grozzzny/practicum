import Block from '../../core/Block'
import button from './button.hbs?raw'
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
    console.log('this', this)
    this.eventsElement = {
      click: this.props.onClick
    }
  }

  protected render(): string {
    return button
  }
}
