import Block from '../../core/Block'
import template from './form.hbs?raw'
import './form.css'

interface FormProps {
  formName: string
  method?: 'PATH' | 'GET' | 'POST' | 'PUT'
}

export class Form extends Block<FormProps, Record<string, never>, HTMLElement> {
  constructor(props: FormProps) {
    super({
      method: 'POST',
      ...props
    })
  }

  protected render(): string {
    return template
  }
}
