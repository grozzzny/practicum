import template from './modalAddUser.hbs?raw'
import { ModalBlock, ModalProps } from '../modalBlock'
import { DataCreateForm } from '../../type'
import { FormCreate } from '../formCreate'

interface ModalAddUserProps extends ModalProps {
	onCreate: (data: DataCreateForm) => void
}

export class ModalAddUser extends ModalBlock<
	ModalAddUserProps,
	{
		form: FormCreate
	}
> {
	public modalName = 'addUser'

	constructor(props: ModalAddUserProps) {
		super({
			...props,
			onCreate: (data: DataCreateForm) => {
				console.log(data)
			}
		})
	}

	protected render(): string {
		return template
	}
}
