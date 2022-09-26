/* eslint-disable no-restricted-globals */
import template from 'page/login.template';

class Login {
  private template;

  private container: HTMLElement;

  private title: HTMLElement;

  constructor(container: string) {
    this.container = document.querySelector(container) as HTMLElement;
    this.title = document.querySelector('title') as HTMLElement;
    this.template = template;
  }

  render = () => {
    this.title.innerText = '로그인';
    this.container.innerHTML = this.template({ loginFail: true });
  };
}

export default Login;
