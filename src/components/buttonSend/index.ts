import Block from '../../core/Block'
import template from './buttonSend.hbs?raw'

interface ButtonSendProps {
  formName: string
  buttonType?: 'submit' | 'button' | 'reset'
  onClick: () => void
}

export class ButtonSend extends Block<ButtonSendProps> {
  constructor(props: ButtonSendProps) {
    super({
      buttonType: 'submit',
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
