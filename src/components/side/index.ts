import Block from '../../core/Block'
import template from './side.hbs?raw'
import './side.css'
import { Input } from '../input'
import { ChatType, User } from '../../type'
import { getUrlAvatar } from '../../services/userService'
import { connect } from '../../utils/connect'

interface SideProps {
	close?: boolean
	chats: ChatType[]
	user?: User
	activeChat?: ChatType
	avatar: string | undefined
	onModal: (event: Event, modal: string | undefined) => void
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
			...props,
			avatar: props.user?.avatar ? getUrlAvatar(props.user.avatar) : undefined
		})
	}

	protected render(): string {
		return template
	}
}

export const SideConnect = connect(Side, (state) => ({
	user: state.user,
	chats: state.chats,
	activeChat: state.activeChat
}))
