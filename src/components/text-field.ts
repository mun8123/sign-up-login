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

  private valid: ValidateRule | null;

  constructor(container: string, data: TextFieldData) {
    this.container = container;
    this.template = template;
    this.data = { ...defaultData, ...data };
    this.validateRules = [];
    this.valid = null;
  }

  get name() {
    return this.data.id;
  }

  get value() {
    return this.data.text;
  }

  get isValid() {
    return !this.valid;
  }

  initValue = () => {
    this.data.text = '';
  };

  clearValid = () => {
    this.valid = null;
  };

  validate = () => {
    const target = this.data.text;

    const invalidateRules = this.validateRules.filter(validateRule => {
      const { rule, match } = validateRule;
      const isRegExp = rule instanceof RegExp;
      const test = isRegExp ? rule.test.bind(rule) : validateRule.test;

      if (!test) {
        throw new Error(
          `"${validateRule.message}"의 test 함수를 작성해주세요.`,
        );
      }

      return test(target) !== match;
    });

    this.valid = invalidateRules.length > 0 ? invalidateRules[0] : null;
  };

  private buildData = () => {
    if (this.data.text === '') return this.data;

    if (this.valid) {
      return {
        ...this.data,
        isNotValid: true,
        validateMessage: this.valid.message,
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
