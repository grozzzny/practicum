import template from './formSend.hbs?raw'
import {
	loginValidator,
	messageValidator,
	passwordValidator
} from '../../utils/validators'
import { Form, FormProps, FormRefs } from '../form'
import { DataFormSend } from '../../type'
import { Input } from '../input'

const CLASS_NAME_INPUT_ERROR = 'input__error'

interface FormSendProps extends FormProps {
	onSend: (data: DataFormSend) => void
}

interface FormSendRefs extends FormRefs {
	message: Input
}

export class FormSend extends Form<FormSendProps, FormSendRefs, HTMLElement> {
	constructor(props: FormSendProps) {
		super({
			...props,
			validators: {
				login: loginValidator,
				password: passwordValidator
			}
		})
	}

	protected onSubmit(event: Event) {
		event.preventDefault()
		const message = this.refs.message.value()
		const error = messageValidator(message)

		if (error) {
			this.showError(error)
			return
		}

		const data: { message: string } = {
			message
		}

		this.props.onSend(data)
	}

	public showError(error: string) {
		console.error(error)
		this.refs.message.element.classList.add(CLASS_NAME_INPUT_ERROR)
		setTimeout(() => {
			this.refs.message.element.classList.remove(CLASS_NAME_INPUT_ERROR)
		}, 3000)
	}

	public clear() {
		this.refs.message.clear()
	}

	public focus() {
		this.refs.message.focus()
	}

	protected render(): string {
		return template
	}

	componentDidMount() {
		this.refs.message.focus()
	}
}
