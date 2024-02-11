import Block from '../../core/Block'
import template from './uploadFile.hbs?raw'
import './uploadFile.css'

export interface UploadFileProps {
	error: string
	message: string
	name: string
}

export class UploadFile extends Block<
	UploadFileProps,
	{
		label: HTMLElement
		error: HTMLElement
		message: HTMLElement
	},
	HTMLElement
> {
	private file: File | null = null

	protected init(): void {
		this.eventsElement = {
			change: (event) => {
				const input = event.target as HTMLInputElement
				if (input.files) {
					this.file = input.files[0]
					this.refs.label.textContent = this.file.name
				}
			}
		}
	}

	public showError(error: string) {
		this.element.classList.add('uploadFile--error')
		this.refs.error.innerText = error
		setTimeout(() => {
			this.element.classList.remove('uploadFile--error')
		}, 3000)
	}

	public value(): File | null {
		return this.file
	}

	protected render(): string {
		return template
	}
}
