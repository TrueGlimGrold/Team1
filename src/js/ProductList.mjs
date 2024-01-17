import renderListWithTemplate from "./ProductListing.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
        src="${product.Image}"
        alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
      // We passed in this information to make our class as reusable as possible.
      // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    }

    async filterProducts() {
        const list = await this.dataSource.getData();

        const filteredList = list.slice(0, 4);

        this.renderList(filteredList);
    }

    renderList(list) {
        const htmlStrings = list.map(productCardTemplate);
        this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    }



    async init() {
      // our dataSource will return a Promise...so we can use await to resolve it.
        await this.renderList();
        const list = await this.dataSource.getData();
      // render the list - to be completed
    }
}