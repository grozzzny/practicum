import template from './modalAddUser.hbs?raw'
import { ModalBlock, ModalProps } from '../modalBlock'
import { Field } from '../field'
import {
	NameValidator,
	Validator,
	loginValidator
} from '../../utils/validators'

interface ModalAddUserProps extends ModalProps {
	onSend: (event: PointerEvent) => void
	validators: Record<NameValidator, Validator>
}

export class ModalAddUser extends ModalBlock<
	ModalAddUserProps,
	{
		login: Field
	}
> {
	public modalName = 'addUser'

	constructor(props: ModalAddUserProps) {
		super({
			...props,
			validators: {
				login: loginValidator
			},
			onSend: (event: PointerEvent) => {
				event.preventDefault()
				const login = this.refs.login.value()

				if (!login) {
					return
				}

				const data: { login: string } = {
					login
				}

				console.log(data)

				this.setProps({
					modalVisible: false
				})
			}
		})
	}

	protected render(): string {
		return template
	}
}
