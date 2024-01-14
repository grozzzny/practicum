import Block from '../../core/Block'
import template from './field.hbs?raw'
import './field.css'
import { Input, InputType } from '../input'

interface FieldProps {
  error: string
  label: string
  name: string
  type: InputType
  onBlur: () => void
}

export class Field extends Block<
  FieldProps,
  HTMLElement,
  {
    input: Input,
  }
> {
  constructor(props: FieldProps) {
    super({
      ...props,
      onBlur: () => this.validate()
    })
  }

  public value() {
    // if (!this.validate()) {
    //   return null
    // }
    return this.refs.input.element.value
  }

  private validate() {
    // const value = this.refs.input.element.value
    console.log('this.refs', this.refs)
    // console.log('error', this.refs.error)
    // const error = this.props.validate?.(value)
    // if (error) {
    //   this.refs.errorLine.setProps({ error })
    //   return false
    // }
    // this.refs.errorLine.setProps({ error: undefined })
    // return true
  }

  protected render(): string {
    return template
  }
}
