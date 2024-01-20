import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productListing = new ProductList("Tents", dataSource, element);
productListing.init();

// Make an alert (Luke did this)

const alertElement = document.getElementById("alert-holder");

const alert = new Alert(alertElement); 
alert.init();
// console.log(alert);