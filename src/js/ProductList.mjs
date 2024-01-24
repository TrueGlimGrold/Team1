import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
    // Requires product category, datasource, and HTML element to render in
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    // Populate list of products
    async init() {
        const products = await this.dataSource.getData();
        const filteredProducts = this.filterByDenylist(products);

        this.renderList(filteredProducts);
    }

    // Remove products that are marked as not ready.
    filterByDenylist(products) {
        // Tedious but it works. Ideally the database would have a field for if the data can be public.
        // Barring that, this list would be synced up with a nice GUI for marketing.
        const idDenylist = ["989CG", "880RT"];

        return products.filter(
            (item) => !idDenylist.includes(item.Id)
        );
    }

    // Render HTML for each product
    renderList(products) {
        renderListWithTemplate(productCardTemplate, this.listElement, products);
    }
}

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.NameWithoutBrand}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.FinalPrice}</p>
    </a>
  </li>`;
}


/*

export default class ProductListing {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }

    async init() {
      const list = await this.dataSource.getData();
    }

  

  productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/index.html?product=">
        <img src="" alt="Image of ">
        <h3 class="card__brand"></h3>
        <h2 class="card__name"></h2>
        <p class="product-card__price">$</p>
      </a>
    </li>`
  }

  // Method to render the list of products to the DOM
  renderList(productList) {
    // Assuming productList is an array of product objects

    // Get the container element where you want to append the product list
    const productListContainer = document.getElementById('product-list-container');

    // Use map to transform each product into HTML using the template
    const productCards = productList.map((product) => this.productCardTemplate(product));

    // Insert the generated HTML into the container
    productListContainer.innerHTML = `<ul>${productCards.join('')}</ul>`;
  }
  
}

const productListInstance = new ProductList();

*/