// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// get product type from URL
export function getParam(params) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(params);

  return product;
}

// @param
// key: identifier for cart to remove product from
// id: product id to remove
// removeAllMatchingItems: if true, remove all products with id
//    otherwise, remove only the first item encountered
export function removeItemFromLocalStorage(key, id, removeAllMatchingItems = false) {
  const cart = getLocalStorage(key);
  let newCart = [];
  let haveRemoved = false;

  // I feel like a var i = 0 loop may be more efficient, as I could
  // end early and splice the rest directly to the new cart.
  for (const element of cart) {
    if (element.Id != id) {
      // always add to new cart if not a match
      newCart.push(element);
    }
    else {
      // first time removing, skip rest of loop
      if (!haveRemoved) {
        haveRemoved = true;
        continue;
      }
      // if NOT removing all items
      // AND have already removed an item
      // add to new cart
      if (!removeAllMatchingItems && haveRemoved) {
        newCart.push(element);
      }
    }
  }
  setLocalStorage(key, newCart);
}

// render a list of products in HTML using a given template function
export function renderListWithTemplate(
  templateFunction,         // Function used to render the product
  parentElement,            // Target HTML element for rendering
  list,                     // List of products to be rendered
  position = "afterbegin",  // Used in insertAdjacentHTML(position, ...)
  clear = false             // True if the HTML Element needs to be cleared before render
  ) {
    // Clear the HTML element if requested
    if (clear) {
      parentElement.replaceChildren();
    }
    // Convert list into filled templates.
    const htmlItems = list.map((item) => templateFunction(item));
    // Insert filled templates into the HTML.
    parentElement.insertAdjacentHTML(position, htmlItems.join(""));
  }

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
