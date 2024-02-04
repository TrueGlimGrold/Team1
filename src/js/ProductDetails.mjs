import { getLocalStorage, getShoppingCartKey, setLocalStorage } from "./utils.mjs";

// Emiliano's Solution
function productDetailsTemplate(product) {
    const discountDifference = ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100;

    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}" />
        <p class="product-card__price">${product.FinalPrice}</p>
        <p class="product__color">Color: ${product.Colors[0].ColorName}</p>
        <p class="product__description">${product.DescriptionHtmlSimple}</p>
        <p class="discount-difference">Discount Difference: ${discountDifference.toFixed(0)}%</p>
        <div class="product-detail__add">
            <button id="productButton" data-id="${product.Id}" type="button">Add to Cart</button>
        </div>
    </section>`;
}

export default class ProductDetails {
    constructor(productID, dataSource, category) {
        this.productID = productID;
        this.product = [];
        this.dataSource = dataSource;
        this.category = category;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productID);

        // render HTML, once rendered we can bind the button
        this.renderProductDetails("main");

        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // once we have the product details we can render out the HTML
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        setTimeout(() => {
            document.getElementById("productButton")
                .addEventListener("click", this.addToCart.bind(this));
        }, 0);


        const breadcrumbText = `Home > Product listing: ${this.category} > Product pages > ${this.product.NameWithoutBrand}`;
        this.updateBreadcrumb(breadcrumbText);
    }

    // Armando's Week 1 Solution
    // Modified by Cooper
    addToCart() {
        let key = getShoppingCartKey();
        let cart_list = getLocalStorage(key);
        let list = [];
        let matchingProduct = false;
        if (cart_list != null) {
            cart_list.forEach(item => {
              if (item.Id == this.product.Id) {
                item.Quantity = Number(item.Quantity) + 1; // += 1 may work, but I'm so done.
                matchingProduct = true;
              }
              list.push(item);
            });
        }
        if (!matchingProduct) {
            this.product.Quantity = 1;
            list.push(this.product);


            // stretch challenge done!
            alertMessage("Item added to the cart!", true);
        }
        setLocalStorage(key, list);
    }

    updateBreadcrumb(text) {
        const breadcrumbElement = document.getElementById("breadcrumb");
        breadcrumbElement.innerHTML = `<p>${text}</p>`;
    }

    // TODO: Refactor this to work with the generic renderer in utils.js
    // Issue seems to be that this page only handles one product?
    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
        this.updateBreadcrumb(`Home > Product listing: ${this.category} > Product pages > ${this.product.NameWithoutBrand}`);
    }
}