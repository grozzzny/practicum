import template from './formOneField.hbs?raw'
import {
	Validator,
} from '../../utils/validators'
import { Form, FormProps, FormRefs } from '../form'
import { DataFormOneField } from '../../type'
import { Field } from '../field'

interface FormOneFieldProps extends FormProps {
	onSend: (data: DataFormOneField) => void
	label: string
	btnText: string
	validator: Validator
}

interface FormOneFieldRefs extends FormRefs {
	field: Field
}

export class FormOneField extends Form<
	FormOneFieldProps,
	FormOneFieldRefs,
	HTMLElement
> {
	constructor(props: FormOneFieldProps) {
		super({
			...props,
		})
	}

	protected onSubmit(event: Event) {
		event.preventDefault()
		const value = this.refs.field.value()

		if (!value) {
			return
		}

		this.props.onSend({
			value
		})
	}

	protected render(): string {
		return template
	}
}
