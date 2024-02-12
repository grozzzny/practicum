import template from './modalAddUser.hbs?raw'
import { ModalBlock, ModalProps } from '../modalBlock'
import { DataFormOneField } from '../../type'
import { FormOneField } from '../formOneField'
import { loginValidator, Validator } from '../../utils/validators'
import { addUser } from '../../services/chatService'
import { ErrorAPIType } from '../../utils/HTTPTransport'

interface ModalAddUserProps extends ModalProps {
	onSend: (data: DataFormOneField) => void
	validator: Validator
}

export class ModalAddUser extends ModalBlock<
	ModalAddUserProps,
	{
		form: FormOneField
	}
> {
	public modalName = 'addUser'

	constructor(props: ModalAddUserProps) {
		super({
			...props,
			validator: loginValidator,
			onSend: ({ value: login }: DataFormOneField) => {
				addUser({ login })
					.then(() => {
						this.setProps({
							modalVisible: false
						})
					})
					.catch((error: ErrorAPIType) => {
						this.refs.form.showError(error.reason)
					})
			}
		})
	}

	protected render(): string {
		return template
	}
}
