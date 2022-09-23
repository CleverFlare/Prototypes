class UserCard extends HTMLElement {
  constructor() {
    super();
    this.innerText = `${this.getAttribute('name')}`;
  }
}

window.customElements.define('user-card', UserCard);