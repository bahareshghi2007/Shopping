const cartIcon = document.querySelector('.fa-cart-shopping');
const cartContainer = document.querySelector('.cart-container');
const backdrop = document.querySelector('.backdrop');
const clearBtn = document.querySelector('.clear-btn');

class CartModal {
  constructor() {
    cartIcon.addEventListener('click', () => this.showCart());
    backdrop.addEventListener('click', () => this.hideCart());
    clearBtn.addEventListener('click', () => this.hideCart());
  }

  showCart() {
    cartContainer.style.transform = 'translateY(0vh)';
  }

  hideCart() {
    cartContainer.style.transform = 'translateY(-200vh)';
  }
}

export default new CartModal();
