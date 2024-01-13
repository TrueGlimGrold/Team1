import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Armando Kamisaki's idea to move product specific logic to product.js
function addProductToCart(product) {
  let key = "so-cart";
  let oldCart = getLocalStorage(key);
  let newCart = [];
  if (oldCart != null) {
    oldCart.forEach(element => {
      newCart.push(element);
    });
  }
  newCart.push(product);
  setLocalStorage(key, newCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
