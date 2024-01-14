import Block from '../../core/Block'
import template from './field.hbs?raw'
import './field.css'
import { Input, InputType } from '../input'
import { Validator } from '../../utils/validators'
import { ErrorLine } from '../errorLine'

interface FieldProps {
  error: string
  label: string
  name: string
  type: InputType
  onBlur: () => void
  validate?: Validator
}

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

  private validate() {
    const value = this.refs.input.value()
    const error = this.props.validate?.(value)
    if (error) {
      this.refs.errorLine.setProps({ error })
      return false
    }
    this.refs.errorLine.setProps({ error: undefined })
    return true
  }

  protected render(): string {
    return template
  }
}
