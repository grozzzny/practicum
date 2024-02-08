import template from './modalAddChat.hbs?raw'
import { ModalBlock, ModalProps } from '../modalBlock'
import { DataFormOneField } from '../../type'
import { FormOneField } from '../formOneField'
import { emptyValidator, Validator } from '../../utils/validators'
import { createChat } from '../../services/chatService'
import { ErrorAPI } from '../../utils/HTTPTransport'

interface ModalAddChatProps extends ModalProps {
	onSend: (data: DataFormOneField) => void
	validator: Validator
}

export class ModalAddChat extends ModalBlock<
	ModalAddChatProps,
	{
		form: FormOneField
	}
> {
	public modalName = 'addChat'

	constructor(props: ModalAddChatProps) {
		super({
			...props,
			validator: emptyValidator,
			onSend: ({ value: title }: DataFormOneField) => {
				createChat({ title })
					.then(() => {
						this.setProps({
							modalVisible: false
						})
					})
					.catch((error: ErrorAPI) => {
						this.refs.form.showError(error.reason)
					})
			}
		})
	}

	protected render(): string {
		return template
	}
}
