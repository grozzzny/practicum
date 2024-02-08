import template from './modalRemoveUser.hbs?raw'
import { ModalBlock, ModalProps } from '../modalBlock'
import { DataFormOneField } from '../../type'
import { loginValidator, Validator } from '../../utils/validators'
import { FormOneField } from '../formOneField'

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
			onSend: (data: DataFormOneField) => {
				console.log(data)
				this.refs.form.showError(data.value)
				// this.setProps({
				// 	modalVisible: false
				// })
			}
		})
	}

	protected render(): string {
		return template
	}
}
