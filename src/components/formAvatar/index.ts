import template from './formAvatar.hbs?raw'
import { Form, FormProps, FormRefs } from '../form'
import { DataAvatarForm } from '../../type'
import { UploadFile } from '../uploadFile'

interface FormAvatarProps extends FormProps {
	onSave: (data: DataAvatarForm) => void
}

interface FormAvatarRefs extends FormRefs {
	avatar: UploadFile
}

export class FormAvatar extends Form<
	FormAvatarProps,
	FormAvatarRefs,
	HTMLElement
> {
	constructor(props: FormAvatarProps) {
		super({
			...props
		})
	}

	protected onSubmit(event: Event) {
		event.preventDefault()
		const avatar = this.refs.avatar.value()

		if (!avatar) {
			this.refs.avatar.showError('You need to select a file')
			return
		}

		this.props.onSave({
			avatar
		})
	}

	public showError(error: string) {
		this.refs.avatar.showError(error)
	}

	protected render(): string {
		return template
	}
}
