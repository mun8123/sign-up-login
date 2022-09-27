export default class PageNotFound {
  private container: HTMLElement;

  constructor(container: string) {
    this.container = document.querySelector(container) as HTMLElement;
  }

  render = () => {
    this.container.innerHTML =
      '<p class="text-5xl">페이지를 찾을 수 없습니다</p>';
  };
}
