import Block, { PropsType, RefType } from '../../core/Block'

export interface ModalProps extends PropsType {
  modalVisible?: boolean
}

export class ModalBlock<
  Props extends ModalProps,
  Refs extends RefType = RefType,
  Element extends HTMLElement | null = null
> extends Block<Props, Refs, Element> {
  public modalName = ''

  constructor(props: Props) {
    super({
      modalVisible: false,
      ...props
    })
  }

  protected init(): void {
    this.eventsElement = {
      click: (event: Event) => {
        const target = event.target as HTMLElement

        if (target.classList.contains('modal__background')) {
          this.setProps({
            modalVisible: false
          })
        }
      }
    }
    super.init()
  }

  setProps = (nextProps: Partial<ModalProps>) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }
}
