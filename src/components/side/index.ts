import Block from '../../core/Block'
import template from './side.hbs?raw'
import './side.css'
import { Input } from '../input'
import { ChatType } from '../../data/chats'

interface SideProps {
  close?: boolean
  chats: ChatType[]
  onHandler: (event: Event, chat: ChatType) => void
}

export class Side extends Block<
  SideProps,
  {
    search: Input
  },
  HTMLElement
> {
  constructor(props: SideProps) {
    super({
      close: false,
      ...props
    })
  }

  protected render(): string {
    return template
  }
}
