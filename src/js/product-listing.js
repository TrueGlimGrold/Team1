import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productListing = new ProductList(category, dataSource, element);
productListing.init();
