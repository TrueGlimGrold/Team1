import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, setLocalStorageItem, loadHeaderFooter } from "./utils.mjs";

const category = getParam("category");

// Set the category in localStorage
setLocalStorageItem("category", category);

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);
productList.init();



// Here we load the header and the footer
loadHeaderFooter(
  "header",
  "footer",
  "/partials/header.html",
  "/partials/footer.html"
);
