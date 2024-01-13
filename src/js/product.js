import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

var products = []

if (localStorage.getItem("so-cart") != null){
  products = JSON.parse(localStorage.getItem("so-cart"));
} else {
  products = []
}

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  products.push(product);
  localStorage.setItem("so-cart", JSON.stringify(products));
  
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
