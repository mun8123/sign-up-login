import template from 'page/sign-up.template';
import TextField from 'components/text-field';
import {
  CantContainWhitespace,
  CantStartNumber,
  MinimumLengthLimit,
} from 'constact/validateRule';

const REQUIRE_FIELDS = '#required-fields';

class SignUp {
  private template;

  private container: HTMLElement;

  private title: HTMLElement;

  private fields: TextField[];

  constructor(container: string) {
    this.container = document.querySelector(container) as HTMLElement;
    this.title = document.querySelector('title') as HTMLElement;
    this.template = template;
    this.fields = [];

    this.initField();
  }

  private initField = () => {
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
  };

  private createSignUpData = () =>
    this.fields
      .map(field => ({ [field.name]: field.value }))
      .reduce((prevTexts, text) => ({ ...prevTexts, ...text }), {});

  private onSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const isValid = this.fields.reduce((areAllFieldValid, field) => {
      field.validate();
      return areAllFieldValid ? field.isValid : false;
    }, true);

    if (!isValid) {
      this.render();
    }
  };

  private addEvent = () => {
    const signUpForm = this.container.querySelector('form') as HTMLElement;
    signUpForm.addEventListener('submit', this.onSubmit);
  };

  render = () => {
    this.title.innerText = '회원가입';
    this.container.innerHTML = this.template({});
    this.addEvent();

    this.fields.forEach(field => {
      field.render();
      field.clearValid();
    });
  };
}

export default SignUp;
