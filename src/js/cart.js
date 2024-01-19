import {
  getLocalStorage,
  emptyLocalStorage,
  renderListWithTemplate,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const element = document.querySelector(".product-list");
  // Make sure cart exists
  if (cartItems == null) {
    element.innerHTML = "";
  } else {
    renderListWithTemplate(cartItemTemplate, element, cartItems);
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function emptyCart() {
  emptyLocalStorage("so-cart");
  // TODO: Figure out how to set cart key somewhere global, been typed out 4-5 times
  renderCartContents();
}

renderCartContents();
document.getElementById("emptyCart").addEventListener("click", emptyCart);
