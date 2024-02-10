import Block, { RefType } from '../../core/Block'
import template from './messages.hbs?raw'
import './messages.css'
import Handlebars from 'handlebars'
import { ChatType, User } from '../../type'

export interface MessagesProps {
	activeChat: ChatType | null
	chatUsers: User[]
	isFewUsers: boolean
}

export class Messages extends Block<MessagesProps, RefType, HTMLElement> {
	constructor(props: MessagesProps) {
		super({
			...props,
			isFewUsers: props.chatUsers.length < 2
		})
	}

	protected render(): string {
		return template
	}

	async componentDidMount() {
		// const state = store.getState()
		// console.log('chatUsers', this.props.chatUsers)
		// console.log('state', state)
			this.element.parentElement!.scrollTop = this.element.parentElement!.scrollHeight
			this.element.classList.remove('messages--hidden')


		// const {token} = await getToken(state.activeChat?.id!)
		// console.log('token', token)
		// ChatWS.connect({
		// 	userId: state.user?.id!,
		// 	chatId: state.activeChat?.id!,
		// 	token: token
		// }).then(() => {
		// 	this.element.parentElement!.scrollTop = this.element.parentElement!.scrollHeight
		// 	this.element.classList.remove('messages--hidden')
		// }).catch((error) => {
		// 	console.error(error)
		// })
	}
}

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
