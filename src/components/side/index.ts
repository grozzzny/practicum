import Block from '../../core/Block'
import template from './side.hbs?raw'
import './side.css'
import { Input } from '../input'
import { ChatType } from '../../data/chats'
import { User } from '../../type'
import { getUrlAvatar } from '../../services/userService'

interface SideProps {
	close?: boolean
	chats: ChatType[]
	onHandler: (event: Event, chat: ChatType) => void
	user?: User,
	avatar: string | undefined
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
