/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import Store from 'store';
import TextField from 'components/text-field';
import AddressField from 'components/address-field';

abstract class Page {
  protected template;

  protected container: HTMLElement;

  private titleElement: HTMLElement;

  protected fields: (TextField | AddressField)[];

  constructor(
    container: string,
    template: HandlebarsTemplateDelegate<any>,
    private title: string,
    protected data: { store: Store } | null,
  ) {
    this.container = document.querySelector(container) as HTMLElement;
    this.titleElement = document.querySelector('title') as HTMLElement;
    this.template = template;
    this.fields = [];
  }

  protected abstract initField(): void;

  private validateFields = () =>
    this.fields.reduce((areAllFieldValid, field) => {
      if (!(field instanceof TextField)) {
        return areAllFieldValid;
      }

      field.validate();
      return areAllFieldValid ? field.isValid : false;
    }, true);

  private createSubmitData = () =>
    this.fields
      .map(field => {
        if (!field.value) return {};
        return { [field.name]: field.value };
      })
      .reduce((prevTexts, text) => ({ ...prevTexts, ...text }), {});

  protected abstract fetchFunction(submitData: object): void;

  protected abstract buildData(): object;

  private onSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const isValid = this.validateFields();
    if (!isValid) {
      this.render();
      return;
    }

    const submitData = this.createSubmitData();
    if (submitData) {
      this.fetchFunction(submitData);
    }
  };

  private addEvent = () => {
    const form = this.container.querySelector('form') as HTMLElement;
    form.addEventListener('submit', this.onSubmit);
  };

  render = () => {
    this.titleElement.innerText = this.title;
    this.container.innerHTML = this.template(this.buildData());
    this.addEvent();

    this.fields.forEach(field => {
      field.render();
      if (field instanceof TextField) {
        field.clearValid();
        field.initValue();
      }
    });
  };
}

export default Page;
