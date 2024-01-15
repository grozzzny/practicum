import template from './modalRemoveUser.hbs?raw'
import { ModalBlock, ModalProps } from '../modalBlock'
import { Field } from '../field'
import {
	NameValidator,
	Validator,
	loginValidator
} from '../../utils/validators'

interface ModalRemoveUserProps extends ModalProps {
	onSend: (event: PointerEvent) => void
	validators: Record<NameValidator, Validator>
}

export class ModalRemoveUser extends ModalBlock<
	ModalRemoveUserProps,
	{
		login: Field
	}
> {
	public modalName = 'removeUser'

	constructor(props: ModalRemoveUserProps) {
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
