import template from './formCreate.hbs?raw'
import {
	loginValidator,
} from '../../utils/validators'
import { Form, FormProps, FormRefs } from '../form'
import { DataCreateForm } from '../../type'
import { Field } from '../field'

interface FormCreateProps extends FormProps {
	onCreate: (data: DataCreateForm) => void
}

interface FormCreateRefs extends FormRefs {
	login: Field
}

export class FormCreate extends Form<
	FormCreateProps,
	FormCreateRefs,
	HTMLElement
> {
	constructor(props: FormCreateProps) {
		super({
			...props,
			validators: {
				login: loginValidator
			}
		})
	}

	protected onSubmit(event: Event) {
		event.preventDefault()
		const login = this.refs.login.value()

		if (!login) {
			return
		}

		this.props.onCreate({
			login
		})
	}

	protected render(): string {
		return template
	}
}
