const productsContainer = document.querySelector('.products-container');
const searchInput = document.querySelector('.search-input');
let allProducts = [];
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
        checkTitleLength == 'long title' ? `...` : ''
      }</p>
               <p class="product-price">${product.price}$</p>
            </div>
            <button class="add-to-cart-btn">Add To Cart</button>
         </div>
         </div>
       `;
    });
    productsContainer.innerHTML = productsDOM;
    // addEvent to searchInput:
    searchInput.addEventListener('input', (e) =>
      this.searchProducts(e.target.value)
    );
  }

  searchProducts(searchValue) {
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    this.createProducts(filteredProducts);
  }
}

export default new Products();
