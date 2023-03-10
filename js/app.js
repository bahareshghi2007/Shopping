import CartModal from './CartModal.js';
import Products from './Products.js';
import Storage from './Storage.js';
const sortDrop = document.querySelector('.sort-drop');

document.addEventListener('DOMContentLoaded', () => {
  //cart Modal:
  CartModal;
  // create Products:
  Products.getProducts();
  // create CartItems:
  const cartItems = Storage.getCart();
  Products.createCartItem(cartItems);
  // resetApp:
  Products.resetApp();
  sortDrop.value = 'all';
  // cart Logig:
  Products.cartLogic();
});
