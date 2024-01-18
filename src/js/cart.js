import { getLocalStorage, emptyLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // Make sure cart exists
  if (cartItems == null) {
    document.querySelector(".product-list").innerHTML = "";
  }
  else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    
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
document.getElementById("emptyCart").addEventListener("click", emptyCart)
