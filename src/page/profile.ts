import template from 'page/profile.template';
import Store from 'store';

class Profile {
  private template;

  private container: HTMLElement;

  private title: HTMLElement;

  constructor(container: string, private data: { store: Store }) {
    this.container = document.querySelector(container) as HTMLElement;
    this.title = document.querySelector('title') as HTMLElement;
    this.template = template;
  }

  render = () => {
    this.title.innerText = '프로필';
    this.container.innerHTML = this.template(this.data.store.userProfile);
  };
}

export default Profile;
