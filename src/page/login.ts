/* eslint-disable no-restricted-globals */
import axios from 'axios';
import template from 'page/login.template';
import TextField from 'components/text-field';
import Store from 'store';
import { HttpResponse, LoginResponse, UserProfile } from 'types';

const LOGIN_FIELD = '#login-field';

class Login {
  private template;

  private container: HTMLElement;

  private title: HTMLElement;

  private fields: TextField[];

  constructor(container: string, private data: { store: Store }) {
    this.container = document.querySelector(container) as HTMLElement;
    this.title = document.querySelector('title') as HTMLElement;
    this.template = template;
    this.fields = [];
  }

  private initField = () => {
    const idField = new TextField(LOGIN_FIELD, {
      id: 'userid',
      label: '아이디',
      type: 'text',
      placeholder: '아이디 입력',
      required: true,
    });
    const passwordField = new TextField(LOGIN_FIELD, {
      id: 'password',
      label: '비밀번호',
      type: 'password',
      placeholder: '**********',
      required: true,
    });

    this.fields.push(idField);
    this.fields.push(passwordField);
  };

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

    if (this.fields.length === 0) {
      this.initField();
    }

    this.fields.forEach(field => field.render());
    this.addEvent();
  };
}

export default Login;
