import template from './error.hbs?raw'
import Block, { PropsType, RefType } from '../../core/Block'

export class ErrorPage extends Block<PropsType, RefType, HTMLElement> {
	protected render(): string {
		return template
	}
}
