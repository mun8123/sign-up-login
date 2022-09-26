import template from 'components/text-field.template';
import { TextFieldData } from 'types';

const defaultData = {
  id: '',
  label: '',
  type: 'text',
  placeholder: '',
  required: false,
};

class TextField {
  template;

  container: HTMLElement;

  data;

  constructor(container: string, data: TextFieldData) {
    this.container = document.querySelector(container) as HTMLElement;
    this.template = template;
    this.data = { ...defaultData, ...data };
  }

  render = () => {
    this.container.insertAdjacentHTML('beforeend', this.template(this.data));
  };
}

export default TextField;
