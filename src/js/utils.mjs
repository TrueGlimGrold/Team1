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
    
  // Sort according to select option 
  const sortBySelection = document.getElementById("sortBy");
  let sortByValue = sortBySelection.value;
    
    sortBySelection.addEventListener("change", SortListAlphabetically)
    sortByValue = sortBySelection.value;
    // Sort Alphabetically (Ascending)
    function SortListAlphabetically() {
      if (sortByValue == "ascending") {
        list.sort((a, b) => (a.NameWithoutBrand < b.NameWithoutBrand) ? 1 : -1)
        console.log(list)
        return list
      }
      else if (sortBySelection == "descending"){
        list.sort((a, b) => (a.NameWithoutBrand < b.NameWithoutBrand) ? 1 : -1)
        console.log(list)
        return list
      }
    }

    // Clear the HTML element if requested
    if (clear) {
      parentElement.replaceChildren();
    }
    // Convert list into filled templates.
    const htmlItems = list.map((item) => templateFunction(item));
    // Insert filled templates into the HTML.
    parentElement.insertAdjacentHTML(position, htmlItems.join(""));
  }


export function renderWithTemplate(
  template,         // Function used to render the product
  parentElement,            // Target HTML element for rendering
  position = "afterbegin",  // Used in insertAdjacentHTML(position, ...)
  clear = false             // True if the HTML Element needs to be cleared before render
  ) {
    // Clear the HTML element if requested
    if (clear) {
      parentElement.replaceChildren();
    }
    // Insert filled templates into the HTML.
    parentElement.insertAdjacentHTML(position, template);
  }

export async function loadHeaderFooter(headerID, footerID, headerPath, footerPath) {
  const header_element = document.getElementById(headerID);
  const footer_element = document.getElementById(footerID);

  const header_response = await fetch(headerPath);
  const footer_response = await fetch(footerPath);
  
  const header_template = await header_response.text();
  const footer_template = await footer_response.text();

  renderWithTemplate(header_template, header_element);
  renderWithTemplate(footer_template, footer_element);

  // if (header_response.ok) {
  //   const header_data = await header_response.text();
  //   const header_template = document.createElement("template");
  //   header_template.innerHTML = header_data;
  //   // header_element.insertAdjacentHTML("afterbegin", header_template);
  //   renderWithTemplate(header_template, header_element);
  // }
  // if (footer_response.ok) {
  //   const footer_data = await footer_response.text();
  //   const footer_template = document.createElement("template");
  //   footer_template.innerHTML = footer_data;
  //   renderWithTemplate(footer_template, footer_element);
  // }
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
