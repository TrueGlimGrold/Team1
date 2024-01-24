import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

listing.init();

/*
// main.js
import ProductData from './ProductData.mjs';  // Update the path

const productInstance = new ProductData('your_category');  // Replace 'your_category' with the desired category

// Fetch and display the list of products
productInstance.getData()
  .then((products) => {
    console.log('List of products:', products);
    // Now you can do something with the list of products, e.g., render them in your UI
  })
  .catch((error) => {
    console.error('Error fetching product data:', error.message);
  });
*/