import Block from '../../core/Block'
import template from './dialog.hbs?raw'
import './dialog.css'
import { ChatType } from '../../data/chats'

interface DialogProps {
  id: number
  active: boolean
  avatar: string
  time: string
  name: string
  message: string
  count: number
  onHandler: (event: Event, chat: ChatType) => void
}

export class Dialog extends Block<
  DialogProps,
  Record<string, never>,
  HTMLElement
> {
  constructor(props: DialogProps) {
    super({
      ...props
    })
  }

  protected init() {
    this.eventsElement = {
      click: (event) => this.props.onHandler(event, this.props)
    }
  }

  protected render(): string {
    return template
  }
}
