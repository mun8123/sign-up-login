/* eslint-disable no-restricted-globals */
import axios from 'axios';
import template from 'page/login.template';
import Store from 'store';
import { HttpResponse, LoginResponse, UserProfile } from 'types';

class Login {
  private template;

  private container: HTMLElement;

  private title: HTMLElement;

  constructor(container: string, private data: { store: Store }) {
    this.container = document.querySelector(container) as HTMLElement;
    this.title = document.querySelector('title') as HTMLElement;
    this.template = template;
  }

  private onSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const loginData = {
      username: 'kminchelle',
      password: '0lelplR',
    };

    axios
      .post('http://localhost:8080/auth/login', loginData)
      .then((res: HttpResponse<LoginResponse>) => res.data.result)
      .then(({ id, token }) => {
        this.data.store.token = token;

        axios
          .get(`http://localhost:8080/user/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((res: HttpResponse<UserProfile>) => res.data.result)
          .then((userProfile: UserProfile) => {
            this.data.store.userProfile = userProfile;
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
