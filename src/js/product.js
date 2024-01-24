import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetail.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

/*import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";


function getLocalStorage(key) {
  return localStorage.getItem(key);
}

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let list = getLocalStorage("so-cart");

  if (list === null) {
    item = [product];
  } else if (Array.isArray(list)){
    list.push(product);
  } else {
    list = [product];
  }

  setLocalStorage("so-cart", list);
}


// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler); */
