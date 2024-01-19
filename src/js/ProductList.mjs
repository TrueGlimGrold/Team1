import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    return `<li class="product-card">
        <a href="product_pages/?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`
    
}


export default class ProductListing{
    constructor(category, dataSource, outputElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.outputElement = outputElement;
    }

    async init(){
        const list = await this.dataSource.getData()
        this.renderList(list);
    }

    renderList(productList) {
        renderListWithTemplate(productCardTemplate, this.outputElement, productList);
    }

}