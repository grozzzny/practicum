import template from './modalRemoveUser.hbs?raw'
import { ModalBlock, ModalProps } from '../modalBlock'
import { DataFormOneField } from '../../type'
import { loginValidator, Validator } from '../../utils/validators'
import { FormOneField } from '../formOneField'
import { ErrorAPIType } from '../../utils/HTTPTransport'
import { removeUser } from '../../services/chatService'

interface ModalRemoveUserProps extends ModalProps {
	onSend: (data: DataFormOneField) => void
	validator: Validator
}

export class ModalRemoveUser extends ModalBlock<
	ModalRemoveUserProps,
	{
		form: FormOneField
	}
> {
	public modalName = 'removeUser'

	constructor(props: ModalRemoveUserProps) {
		super({
			...props,
			validator: loginValidator,
			onSend: ({ value: login }: DataFormOneField) => {
				removeUser({ login })
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
