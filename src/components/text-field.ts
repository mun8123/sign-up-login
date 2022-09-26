import template from 'components/text-field.template';
import { TextFieldData } from 'types';

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

  private container: HTMLElement;

  private data;

  constructor(container: string, data: TextFieldData) {
    this.container = document.querySelector(container) as HTMLElement;
    this.template = template;
    this.data = { ...defaultData, ...data };
  }

  get name() {
    return this.data.id;
  }

  get value() {
    return this.data.text;
  }

  private onChange = (e: Event) => {
    const { id, value } = <HTMLInputElement>e.target;

    if (id === this.data.id) {
      this.data.id = id;
      this.data.text = value;
    }
  };

  private addEvent = () => {
    this.container.addEventListener('change', this.onChange);
  };

  render = () => {
    this.container.insertAdjacentHTML('beforeend', this.template(this.data));
    this.addEvent();
  };
}

export default TextField;
