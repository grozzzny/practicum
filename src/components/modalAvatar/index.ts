import template from './modalAvatar.hbs?raw'
import { ModalBlock, ModalProps } from '../modalBlock'
import { FormAvatar } from '../formAvatar'
import { DataAvatarForm } from '../../type'
import UserController from '../../controllers/UserController'
import { ErrorAPIType } from '../../utils/HTTPTransport'

interface ModalAvatarProps extends ModalProps {
	onSave: (data: DataAvatarForm) => void
}

export class ModalAvatar extends ModalBlock<
	ModalAvatarProps,
	{
		form: FormAvatar
	}
> {
	public modalName = 'modalAvatar'

	constructor(props: ModalAvatarProps) {
		super({
			...props,
			onSave: (data: DataAvatarForm) => {
				UserController.changeAvatar(data).then(() => {
					this.setProps({
						modalVisible: false
					})
				}).catch((error: ErrorAPIType) => {
					this.refs.form.showError(error.reason)
				})
			}
		})
	}

	protected render(): string {
		return template
	}
}
