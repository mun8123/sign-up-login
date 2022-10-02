/* eslint-disable class-methods-use-this */
/* eslint-disable function-paren-newline */
import template from 'components/address-field.template';
import { AddressFieldData, DaumAddress } from 'types';

const defaultData: AddressFieldData = {
  id: '',
  label: 'label',
  required: false,
};

class AddressField {
  private template;

  private container: string;

  private data;

  constructor(container: string, data: AddressFieldData) {
    this.container = container;
    this.template = template;
    this.data = { ...defaultData, ...data };
  }

  render = () => {
    const container = document.querySelector(this.container) as HTMLElement;
    container.insertAdjacentHTML('beforeend', this.template({}));
  };
}

export default AddressField;
