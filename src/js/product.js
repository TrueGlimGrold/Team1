import { getParam, setLocalStorageItem, getLocalStorageItem } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices("tents");
const productID = getParam("product");

// Try to get the category from localStorage
const storedCategory = getLocalStorageItem("category");

// If not available in localStorage, use the current URL parameter
const category = storedCategory || getParam("category");

const product = new ProductDetails(productID, dataSource, category);
product.init();

loadHeaderFooter(
  "header",
  "footer",
  "/partials/header.html",
  "/partials/footer.html"
);