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

  get name() {
    return this.data.id;
  }

  get value() {
    return this.data.text;
  }

  private onClick = (container: HTMLElement) => {
    new window.daum.Postcode({
      oncomplete: (data: DaumAddress) => {
        const { roadAddress, sigunguCode } = data;

        const addressBaseElement = container.querySelector(
          '#address-base',
        ) as HTMLInputElement;
        this.data.text = `(${sigunguCode}) ${roadAddress}`;
        addressBaseElement.value = `(${sigunguCode}) ${roadAddress}`;
      },
    }).open();
  };

  private onChange = (e: Event) => {
    const { value } = <HTMLInputElement>e.target;
    this.data.text = `${this.data.text} ${value.trim()}`;
  };

  render = () => {
    const container = document.querySelector(this.container) as HTMLElement;
    container.insertAdjacentHTML('beforeend', this.template({}));
    const searchAddressButton = container.querySelector(
      '#search-address',
    ) as HTMLElement;

    searchAddressButton.addEventListener('click', () =>
      this.onClick(container),
    );
    container.addEventListener('change', this.onChange);
  };
}

export default AddressField;
