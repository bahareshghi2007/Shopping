import Storage from './Storage.js';
const productsContainer = document.querySelector('.products-container');
const searchInput = document.querySelector('.search-input');
const sortContainer = document.querySelector('.sort');
const cartContainer = document.querySelector('.cart-items');
const cartNumber = document.querySelector('.cart-number');
let allProducts = [];
let cart = Storage.getCart();

class Products {
  getProducts() {
    axios
      .get('https://fakestoreapi.com/products')
      .then((products) => (allProducts = products.data))
      .then(() => this.createProducts(allProducts));
  }

  createProducts(products) {
    let productsDOM = '';
    products.forEach((product) => {
      const checkTitleLength =
        product.title.length > 15 ? 'long title' : 'short title';
      productsDOM += `
         <div class="product">
         <img src="${product.image}" alt="product-img" class="product-img">
         <div class="product-footer">
            <div class="product-desc">
               <p class="product-title">${product.title.slice(0, 15)} ${
        checkTitleLength === 'long title' ? `...` : ''
      }</p>
               <p class="product-price">${product.price}$</p>
            </div>
            <button class="add-to-cart-btn" data-id=${
              product.id
            }>Add To Cart</button>
         </div>
         </div>
       `;
    });
    //   update DOM:
    productsContainer.innerHTML = productsDOM;
    // addEvent to searchInput:
    searchInput.addEventListener('input', (e) =>
      this.searchProducts(e.target.value)
    );

    //   addEvent to sortCotainer:
    sortContainer.addEventListener('click', (e) =>
      this.sortProducts(e.target.innerText)
    );

    // addToCartBtns:
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach((btn) => {
      // addEvent to btn
      btn.addEventListener('click', (e) => this.addCartItem(e.target));

      // btn DOM:

      const isInCart = cart.find(
        (item) => item.id === parseInt(btn.dataset.id)
      );
      if (isInCart) {
        btn.innerText = 'In Cart';
        btn.disabled = true;
      }
    });
    // update LocalStorage:
    Storage.saveProducts(products);
  }

  searchProducts(searchValue) {
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    //   update DOM:
    this.createProducts(filteredProducts);
  }

  sortProducts(sortValue) {
    const filteredProducts = allProducts.filter((product) =>
      product.category
        .toLowerCase()
        .includes(sortValue.slice(0, 5).toLowerCase())
    );
    //   update DOM:
    this.createProducts(filteredProducts);
  }

  addCartItem(e) {
    let addedProduct = allProducts.find(
      (product) => product.id === parseInt(e.dataset.id)
    );
    addedProduct = { ...addedProduct, quantity: 1 };
    console.log(addedProduct);
    cart = [...cart, addedProduct];
    this.createCartItem(addedProduct);
    // update DOM:
    e.innerText = 'In Cart';
    e.disabled = true;
  }

  createCartItem(item) {
    if (item.length === 0) {
      return;
    } else if (item.length >= 1) {
      item.forEach((i) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        const checkTitleLength =
          i.title.length > 10 ? 'long title' : 'short title';

        itemDiv.innerHTML = `
        <img src="${i.image}" alt="product-img" class="item-img">
        <div class="item-desc">
           <p class="item-title">${i.title.slice(0, 10)} ${
          checkTitleLength === 'long title' ? `...` : ''
        }</p>
           <p class="item-price">${i.price}$</p>
        </div>
        <div class="item-right" data-id="${i.id}">
           <div class="item-quantity">
              <i class="fa-solid fa-chevron-up"></i>
              <p class="item-number">${i.quantity}</p>
              <i class="fa-solid fa-chevron-down"></i>
           </div>
           <i class="fa-solid fa-trash"></i>
        </div>
        `;

        // update DOM:
        cartContainer.appendChild(itemDiv);
      });
      // addEvent to cartItem:
      document.querySelectorAll('.item-right').forEach((item) => {
        item.addEventListener('click', (e) => this.cartLogic(e.target));
      });
    } else {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');

      const checkTitleLength =
        item.title.length > 10 ? 'long title' : 'short title';

      itemDiv.innerHTML = `
        <img src="${item.image}" alt="product-img" class="item-img">
        <div class="item-desc">
           <p class="item-title">${item.title.slice(0, 10)} ${
        checkTitleLength === 'long title' ? `...` : ''
      }</p>
           <p class="item-price">${item.price}$</p>
        </div>
        <div class="item-right" data-id="${item.id}>
           <div class="item-quantity"">
              <i class="fa-solid fa-chevron-up"></i>
              <p class="item-number">${item.quantity}</p>
              <i class="fa-solid fa-chevron-down"></i>
           </div>
           <i class="fa-solid fa-trash"></i>
        </div>
        `;

      // update DOM:
      cartContainer.appendChild(itemDiv);
      // addEvent to cartItem:
      document
        .querySelector('.item-right')
        .addEventListener('click', (e) => this.cartLogic(e.target));
    }

    cartNumber.innerText = cartContainer.childNodes.length;
    // update LocalStorage:
    Storage.saveCart(cart);
  }

  cartLogic(e) {
    // const cartItems = Storage.getCart();
    if (e.classList.contains('fa-chevron-up')) {
      const incrementedItem = cart.find(
        (item) => item.id === parseInt(e.parentElement.parentElement.dataset.id)
      );
      incrementedItem.quantity++;
      // update DOM:
      e.parentElement.children[1].innerText++;
    } else if (e.classList.contains('fa-chevron-down')) {
      const decrementedItem = cart.find(
        (item) => item.id === parseInt(e.parentElement.parentElement.dataset.id)
      );
      if (decrementedItem.quantity === 1) {
        this.removeCartItem(e.parentElement.parentElement.parentElement);
      } else {
        decrementedItem.quantity--;
        // update DOM:
        e.parentElement.children[1].innerText--;
      }
    } else if (e.classList.contains('fa-trash')) {
      this.removeCartItem(e.parentElement.parentElement);
    }
    // update storage
    Storage.saveCart(cart);
  }

  removeCartItem(item) {
    // update DOM:
    cartContainer.removeChild(item);
    // update LocalStorage:
    const filteredItems = cart.filter(
      (i) => i.id !== parseInt(item.childNodes[5].dataset.id)
    );
    cart = filteredItems;
    Storage.saveCart(cart);
  }

  resetApp() {
    searchInput.value = '';
  }
}

export default new Products();
