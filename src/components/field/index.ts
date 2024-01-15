import Block from '../../core/Block'
import template from './field.hbs?raw'
import './field.css'
import { Input, InputType } from '../input'
import { Validator } from '../../utils/validators'
import { ErrorLine } from '../errorLine'

interface FieldProps {
	label: string
	name: string
	type: InputType
	onBlur: () => void
	validate?: Validator
}

const CLASS_NAME_ERROR = 'field--error'

export class Field extends Block<
	FieldProps,
	{
		input: Input
		errorLine: ErrorLine
	},
	HTMLElement
> {
	constructor(props: FieldProps) {
		super({
			...props,
			onBlur: () => this.validate()
		})
	}

	public value() {
		if (!this.validate()) {
			return null
		}

		return this.refs.input.value()
	}

	public setError(error: string) {
		this.refs.errorLine.setProps({ error })
		this.element.classList.add(CLASS_NAME_ERROR)
	}

	public removeError() {
		this.element.classList.remove(CLASS_NAME_ERROR)
		this.refs.errorLine.setProps({ error: undefined })
	}

	private validate() {
		const value = this.refs.input.value()
		const error = this.props.validate?.(value)

		if (error) {
			this.setError(error)

			return false
		}

		this.removeError()

		return true
	}

	protected render(): string {
		return template
	}
}
