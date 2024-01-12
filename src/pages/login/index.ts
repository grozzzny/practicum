import Block from '../../core/Block'
import template from './login.hbs?raw'
// import { navigate } from '../../core/navigate'

interface LoginPageProps {
  onLogin: (event: PointerEvent) => void
}

export class LoginPage extends Block<LoginPageProps> {
  constructor() {
    super({
      onLogin: (event: PointerEvent) => {
        event.preventDefault();
        console.log('onLogin')
        // navigate('list')
      }
    })
  }

  protected render(): string {
    return template
  }
}
