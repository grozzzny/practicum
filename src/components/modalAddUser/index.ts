import template from './modalAddUser.hbs?raw'
import { ModalBlock, ModalProps } from '../modalBlock'
import { DataFormOneField } from '../../type'
import { FormOneField } from '../formOneField'
import { loginValidator, Validator } from '../../utils/validators'

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
