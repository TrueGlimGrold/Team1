import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const listSource = new ProductListing("tents");
const listing = new ProductListing("Tents", dataSource, element);

listing.init();

