/* eslint-disable no-underscore-dangle */
import template from 'components/text-field.template';
import { TextFieldData, ValidateRule } from 'types';

const defaultData = {
  id: '',
  label: '',
  text: '',
  type: 'text',
  placeholder: '',
  required: false,
};

class TextField {
  private template;

  private container: string;

  private data;

  private validateRules: ValidateRule[];

  constructor(container: string, data: TextFieldData) {
    this.container = container;
    this.template = template;
    this.data = { ...defaultData, ...data };
    this.validateRules = [];
  }

  get name() {
    return this.data.id;
  }

  get value() {
    return this.data.text;
  }

  private validate = () => {
    const target = this.data.text;

    const invalidateRules = this.validateRules.filter(validateRule => {
      const { rule, match } = validateRule;
      const isRegExp = rule instanceof RegExp;
      const test = isRegExp ? rule.test : validateRule.test;

      if (!test) {
        throw new Error(
          `"${validateRule.message}"의 test 함수를 작성해주세요.`,
        );
      }

      return test(target) !== match;
    });

    return invalidateRules ? invalidateRules[0] : null;
  };

  private buildData = () => {
    if (this.data.text === '') return this.data;

    const valid = this.validate();

    if (valid) {
      return {
        ...this.data,
        isNotValid: true,
        validateMessage: valid.message,
      };
    }

    return { ...this.data, isNotValid: false, validateMessage: '' };
  };

  private onChange = (e: Event) => {
    const { id, value } = <HTMLInputElement>e.target;

    if (id === this.data.id) {
      this.data.id = id;
      this.data.text = value.trim();
    }
  };

  addValidateRule = (rule: ValidateRule) => this.validateRules.push(rule);

  render = () => {
    const container = document.querySelector(this.container) as HTMLElement;
    container.addEventListener('change', this.onChange);
    container.insertAdjacentHTML('beforeend', this.template(this.buildData()));
  };
}

export default TextField;
