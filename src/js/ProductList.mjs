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
        // const because we shouldn't ever modify this data on the fly
        this.renderList(products);
    }

    // Render HTML for each product
    renderList(products) {
        const htmlItems = products.map((item) => productCardTemplate(item));
        this.listElement.innerHTML = htmlItems.join("");
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