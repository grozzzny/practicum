import Block, { PropsType, RefType } from '../../core/Block'
import { Validators } from '../../utils/validators'
import { ErrorLine } from '../errorLine'

export interface FormProps extends PropsType {
	validators?: Validators
}

export interface FormRefs extends RefType {
	errorLine: ErrorLine
}

export class Form<
	Props extends FormProps,
	Refs extends FormRefs = FormRefs,
	Element extends HTMLElement | null = null
> extends Block<Props, Refs, Element> {

	constructor(props: Props) {
		super({
			validators: {},
			...props
		})
	}

	protected onSubmit(event: Event) {
		event.preventDefault()
	}

	public showError(error: string) {
		this.refs.errorLine.setProps({
			error
		})
		setTimeout(() => {
			this.refs.errorLine.setProps({
				error: undefined
			})
		}, 3000)
	}

	protected init(): void {
		this.eventsElement = {
			submit: this.onSubmit.bind(this)
		}
	}

	setProps = (nextProps: Partial<FormProps>) => {
		if (!nextProps) {
			return
		}

		Object.assign(this.props, nextProps)
	}
}
