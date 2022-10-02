/* eslint-disable no-restricted-globals */
import axios from 'axios';
import template from 'page/login.template';
import Store from 'store';
import { HttpResponse, LoginData, LoginResponse, UserProfile } from 'types';
import { IsTestPassword, IsTestUsername } from 'constact/validateRule';
import Page from './page';

const LOGIN_FIELD = '#login-field';

class Login extends Page {
  private loginFail: boolean;

  constructor(container: string, data: { store: Store }) {
    super(container, template, '로그인', data);

    this.loginFail = false;

    this.initField();
  }

  initField = () => {
    const idField = this.createField(LOGIN_FIELD, {
      id: 'username',
      label: '아이디',
      type: 'text',
      placeholder: '아이디 입력',
      required: true,
    });
    const passwordField = this.createField(LOGIN_FIELD, {
      id: 'password',
      label: '비밀번호',
      type: 'password',
      placeholder: '**********',
      required: true,
    });

    idField.addValidateRule(IsTestUsername);
    passwordField.addValidateRule(IsTestPassword);

    this.fields.push(idField);
    this.fields.push(passwordField);
  };

  buildData = () => ({ loginFail: this.loginFail });

  fetchFunction = (loginData: LoginData) => {
    axios
      .post('http://localhost:8080/auth/login', loginData)
      .then((res: HttpResponse<LoginResponse>) => res.data.result)
      .then(({ id, token }) => {
        if (!this.data) return;
        this.data.store.token = token;

        axios
          .get(`http://localhost:8080/user/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((res: HttpResponse<UserProfile>) => res.data.result)
          .then((userProfile: UserProfile) => {
            if (!this.data) return;
            this.data.store.userProfile = userProfile;
            location.href = '#profile';
          });
      });
  };
}

export default Login;
