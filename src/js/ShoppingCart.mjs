import { getLocalStorage, getShoppingCartKey, removeItemFromLocalStorage, renderListWithTemplate, renderWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
    /**
     * @param {Element} parentElement - Element from html to insert cart templates into
     */
    constructor(parentElement) {
        this.cartKey = getShoppingCartKey(); // Sloppy but better than typing manually
        this.parentElement = parentElement;
    }

    init() {
        this.renderCart();
        this.change_value();
    }

    bindRemoveButtons() {
        document.getElementById("cart-list").addEventListener("click", (e) => {
            // e.target is clicked element
            // verify it is a button
            if (e.target && e.target.nodeName == "BUTTON") {
              // Use data-id to remove that item from the cart
              this.removeFromCart(e.target.getAttribute("data-id"));
            }
          });
    }




    getCart() {
        return getLocalStorage(this.cartKey);
    }

    // Original Code by Kjirsten Dunn
    // Modified by Cooper Anderson
    // Returns the total price of all items in the cart.
    getTotal() {
        let sum = 0;
        let cart = this.getCart();
        if (cart != null) {
            cart.forEach(element => {
                sum += Number(element.FinalPrice) * Number(element.Quantity);
            });
        }
        return sum;
    }

    /**
     * @param {string} id - Product ID to remove from cart
     */
    removeFromCart(id) {
        removeItemFromLocalStorage(this.cartKey, id, false);
        this.renderCart();
    }

    renderCart() {
        let cart = this.getCart();
        if (cart != null && cart.length != 0) {
            renderListWithTemplate(cartItemTemplate, this.parentElement, this.getCart(), "afterbegin", true);
            renderWithTemplate(cartTotalTemplate, this.parentElement, this.getTotal(), "beforeend", false);
        }
        else {
            renderWithTemplate(null, this.parentElement, emptyCartTemplate(), "afterbegin", true);
        }
        this.bindRemoveButtons();
    }

    /**
    * @param product - json of the product to be rendered.
    */

    change_value(){
        let cart = this.getCart();
        let total = this.getTotal();
        const change_number = document.getElementById("change_number");
            change_number.addEventListener("input", function(){
                //alert("num has changed");

                
                // Get the value of the input
                const inputValue = change_number.value;

                //console.log("Input value:", inputValue);

                
                cart.forEach(element => {
                    const final_total = Number(element.FinalPrice) * Number(inputValue);
                    //console.log(final_total);
                    document.getElementById("get_final_price").innerHTML = `Total: $${final_total.toFixed(2)}`;
                    //localStorage.setItem("FinalPrice", final_total);

    
                    const cartItem = localStorage.getItem("so-cart");
                    const cart = JSON.parse(cartItem);
                    cart.forEach(item => {
                        if (item.hasOwnProperty("FinalPrice")) {
                            item.FinalPrice = final_total;
                        }
                    });

                    // Convert the modified cart back to a string and store it back in localStorage
                    localStorage.setItem('so-cart', JSON.stringify(cart));
                });
                
            });
        }
}


/**
 * @param product - json of the product to be rendered.
 */
function cartItemTemplate(product) {
    return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="${product.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${product.Name}</h2>
    </a>
    <p class="cart-card__color">${product.Colors[0].ColorName}</p>
    <input type="number" id="change_number" class="cart-card__quantity" value="${product.Quantity}" min="1" >
    
    <p id="final_price" class="cart-card__price">$${(Number(product.FinalPrice) * Number(product.Quantity)).toFixed(2)}</p>
    <button class="cart-remove__button" data-id="${product.Id}">Remove</button>
  </li>`;
}

/**
 * @param totalPrice - total price of all products in cart
 */
function cartTotalTemplate(totalPrice) {
    return `<li class="cart-card cart-price divider" id="cart-total">

        <p id="get_final_price" class="cart-card__total_price">Total: $${totalPrice.toFixed(2)}<p>
        <a href="/checkout/index.html">
            <button>checkout</button>
        </a>
    </li>`;
}

function emptyCartTemplate() {
    return `<li class="cart-card">
    <p>Your cart is empty.</p>
    </li>`;
}

