const productsContainer = document.querySelector('.products-container');
class Products {
  getProducts() {
    axios
      .get('https://fakestoreapi.com/products')
      .then((products) => this.createProducts(products.data));
  }
  createProducts(products) {
    console.log(products);
    let productsDOM = '';
    products.forEach((product) => {
      productsDOM += `
      <div class="product">
      <img src="${product.image}" alt="product-img" class="product-img">
      <div class="product-footer">
         <div class="product-desc">
            <p class="product-title">${product.title.slice(0, 15)}</p>
            <p class="product-price">${product.price}$</p>
         </div>
         <button class="add-to-cart-btn">Add To Cart</button>
      </div>
      </div>
    `;
      productsContainer.innerHTML = productsDOM;
    });
  }
}

export default new Products();
