import Handlebars from 'handlebars'
import template from './chats.hbs?raw'
import Block from '../../core/Block'

Handlebars.registerHelper('dialogs', () => {
  return [
    {
      time: '10:49',
      name: 'Dmitriy',
      message: 'Hello, my friend!'
    },
    {
      time: '10:49',
      name: 'Dmitriy',
      message: 'Hello, my friend!',
      count: 3
    },
    {
      time: '10:49',
      name: 'Dmitriy',
      message: 'Hello, my friend!'
    },
    {
      active: true,
      time: '10:49',
      name: 'Dmitriy',
      message: 'Hello, my friend!'
    },
    {
      time: '10:49',
      name: 'Dmitriy',
      message: 'Hello, my friend!',
      count: 3
    },
    {
      time: '10:49',
      name: 'Dmitriy',
      message: 'Hello, my friend!'
    },
    {
      time: '10:49',
      name: 'Dmitriy',
      message: 'Hello, my friend!'
    },
    {
      time: '10:49',
      name: 'Dmitriy',
      message: 'Hello, my friend!'
    },
    {
      time: '10:49',
      name: 'Dmitriy',
      message: 'Hello, my friend!'
    },
    {
      time: '10:49',
      name: 'Dmitriy',
      message: 'Hello, my friend!'
    },
    {
      time: '10:49',
      name: 'Dmitriy',
      message: 'Hello, my friend!'
    },
    {
      time: '10:49',
      name: 'Dmitriy',
      message: 'Hello, my friend!'
    },
    {
      time: '10:49',
      name: 'Dmitriy',
      message: 'Hello, my friend!'
    }
  ]
})

export class ChatsPage extends Block<{}> {
  protected render(): string {
    return template
  }
}
