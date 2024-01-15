export type ChatType = {
  id: number
  time: string
  name: string
  message: string
  count?: number
  active?: boolean
}

const chats: ChatType[] = [
  {
    id: 1,
    time: '10:49',
    name: 'Dmitriy',
    message: 'Hello, my friend!'
  },
  {
    id: 2,
    time: '10:49',
    name: 'Sam',
    message: 'Hello, my friend!',
    count: 3
  },
  {
    id: 3,
    time: '10:49',
    name: 'Leo',
    message: 'Hello, my friend!'
  },
  {
    id: 4,
    active: true,
    time: '10:49',
    name: 'Alex',
    message: 'Hello, my friend!'
  },
  {
    id: 5,
    time: '10:49',
    name: 'Pit',
    message: 'Hello, my friend!',
    count: 3
  },
  {
    id: 6,
    time: '10:49',
    name: 'Kris',
    message: 'Hello, my friend!'
  },
  {
    id: 7,
    time: '10:49',
    name: 'John',
    message: 'Hello, my friend!'
  },
  {
    id: 8,
    time: '10:49',
    name: 'Dmitriy',
    message: 'Hello, my friend!'
  },
  {
    id: 9,
    time: '10:49',
    name: 'Dmitriy',
    message: 'Hello, my friend!'
  },
  {
    id: 10,
    time: '10:49',
    name: 'Dmitriy',
    message: 'Hello, my friend!'
  },
  {
    id: 11,
    time: '10:49',
    name: 'Dmitriy',
    message: 'Hello, my friend!'
  },
  {
    id: 12,
    time: '10:49',
    name: 'Dmitriy',
    message: 'Hello, my friend!'
  },
  {
    id: 13,
    time: '10:49',
    name: 'Dmitriy',
    message: 'Hello, my friend!'
  }
]

export default chats
