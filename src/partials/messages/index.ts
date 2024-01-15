import './messages.css'
import Handlebars from 'handlebars'

export { default as Messages } from './messages.hbs?raw'

Handlebars.registerHelper('messages', () => [
	{
		self: false,
		read: true,
		time: '21:58',
		text:
			'In the world of modern technology, online chats have become an integral part of our everyday communication. Whether discussing the latest news, exchanging experiences, or simply having a pleasant conversation with new acquaintances, chats provide a unique platform for real-time interaction.\n' +
			'\n' +
			'Online chats break down geographical barriers, allowing people from around the world to connect in virtual space. With a variety of themed chat rooms, you can find discussions on any interest – from technology and science to arts and entertainment.'
	},
	{
		self: false,
		read: true,
		time: '21:59',
		image: 'example.png'
	},
	{
		self: true,
		read: true,
		time: '21:58',
		text: 'Hello, my friend!'
	},
	{
		self: false,
		read: false,
		time: '21:59',
		text: 'Hello!'
	}
])
