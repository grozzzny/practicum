import Handlebars from 'handlebars'

export { default as ChatsPage } from './chats.hbs?raw'

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
