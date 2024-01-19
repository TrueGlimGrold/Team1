import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

console.log("test");
const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list")
const productList = new ProductListing("tents", dataSource, element);

productList.init();