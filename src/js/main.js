import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import Alert from "./Alert.js"; 

const dataSource = new ProductData("tents");
const listSource = new ProductListing("tents");
const listing = new ProductListing("Tents", dataSource, element);

listing.init();

// Make an alert

const alert = new Alert(); 
console.log(alert);

