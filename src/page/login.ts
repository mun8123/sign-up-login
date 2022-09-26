/* eslint-disable no-restricted-globals */
import axios from 'axios';
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

  private onSubmit = e => {
    e.preventDefault();

    const loginData = {
      username: 'kminchelle',
      password: '0lelplR',
    };

    axios
      .post('http://localhost:8080/auth/login', loginData)
      .then(res => res.data.result)
      .then(({ id, token }) => {
        axios
          .get(`http://localhost:8080/user/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then(res => res.data.result)
          .then(profile => {
            location.href = '#profile';
          });
      });
  };

  private addEvent = () => {
    this.container.addEventListener('submit', this.onSubmit);
  };

  render = () => {
    this.title.innerText = '로그인';
    this.container.innerHTML = this.template({ loginFail: true });
    this.addEvent();
  };
}

export default Login;
