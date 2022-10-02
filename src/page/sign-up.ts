/* eslint-disable class-methods-use-this */
import axios from 'axios';
import template from 'page/sign-up.template';
import Page from 'page/page';
import TextField from 'components/text-field';
import { HttpResponse, SignUpData } from 'types';
import {
  CantContainWhitespace,
  CantStartNumber,
  MinimumLengthLimit,
} from 'constact/validateRule';
import AddressField from 'components/address-field';

const REQUIRE_FIELDS = '#required-fields';
const OPTIONAL_FIELDS = '#optional-fields';

class SignUp extends Page {
  private submitted;

  constructor(container: string) {
    super(container, template, '회원가입', null);

    this.submitted = false;

    this.initField();
  }

  initField = () => {
    const nameField = new TextField(REQUIRE_FIELDS, {
      id: 'name',
      label: '이름',
      type: 'text',
      placeholder: '이름을 입력해주세요',
      required: true,
    });

    const idField = new TextField(REQUIRE_FIELDS, {
      id: 'id',
      label: '아이디',
      type: 'text',
      placeholder: '아이디를 입력해주세요',
      required: true,
    });

    const emailField = new TextField(REQUIRE_FIELDS, {
      id: 'email',
      label: '이메일',
      type: 'email',
      placeholder: '이메일을 입력해주세요',
      required: true,
    });

    const passwordField = new TextField(REQUIRE_FIELDS, {
      id: 'password',
      label: '비밀번호',
      type: 'password',
      placeholder: '비밀번호를 입력해주세요',
      required: true,
    });

    const addressField = new AddressField(OPTIONAL_FIELDS, {
      id: 'address',
      label: '주소',
    });

    nameField.addValidateRule(CantContainWhitespace);
    idField.addValidateRule(CantContainWhitespace);
    idField.addValidateRule(CantStartNumber);
    idField.addValidateRule(MinimumLengthLimit(3));
    passwordField.addValidateRule(MinimumLengthLimit(6));
    passwordField.addValidateRule(CantContainWhitespace);
    emailField.addValidateRule(CantContainWhitespace);

    this.fields.push(nameField);
    this.fields.push(idField);
    this.fields.push(emailField);
    this.fields.push(passwordField);
    this.fields.push(addressField);
  };

  buildData = () => ({ submitted: this.submitted });

  fetchFunction = (signUpData: SignUpData) => {
    axios
      .post('http://localhost:8080/signup', signUpData)
      .then((res: HttpResponse<number>) => res.data.result)
      .then(submitted => {
        this.submitted = !!submitted;
        this.container.innerHTML = this.template(this.buildData());
      })
      .catch(error => {
        console.log(error.response);
      });
  };
}

export default SignUp;
