import { loadHeaderFooter } from "./utils.mjs";

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process.
  return items.map(item => {
    return {
      Id: item.Id,
      Name: item.Name,
      FinalPrice: item.FinalPrice,
    };
  });
}



export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.taxRate = 0.06; 
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    this.itemTotal = this.list.reduce((total, item) => total + item.FinalPrice, 0);
    const numItems = this.list.length;

    document.querySelector(this.outputSelector).innerHTML = `
      <p>Total Items: ${numItems}</p>
      <p>Item Total: $${this.itemTotal}</p>
    `;

    this.calculateOrderTotal();
  }

  calculateOrderTotal() {
    // Shipping: Use $10 for the first item plus $2 for each additional item after that.
    this.shipping = 10 + (this.list.length - 1) * 2;

    // Tax: Use 6% sales tax.
    this.tax = this.itemTotal * this.taxRate;

    // order total.
    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const orderSummary = `
      <p>Shipping: $${this.shipping}</p>
      <p>Tax: $${this.tax}</p>
      <p>Order Total: $${this.orderTotal}</p>
    `;

    document.querySelector(this.outputSelector).innerHTML += orderSummary;
  }
  
  async checkout(form) {
    // Build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const data = {
      items: packageItems(getLocalStorage(this.key)),
      itemTotal: this.itemTotal,
      shipping: this.shipping,
      tax: this.tax,
      orderTotal: this.orderTotal,
      customerInfo: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        // Add other customer information fields as needed
      },
    };

    try {
      // Call the checkout method in the ExternalServices module and send it our data object.
      const response = await ExternalServices.checkout(data);

      // Process the response as needed (e.g., show a success message to the user).
      console.log("Checkout successful:", response);
    } catch (error) {
      // Handle errors (e.g., display an error message to the user).
      console.error("Error during checkout:", error);
    }
  }
}





loadHeaderFooter(
  "header",
  "footer",
  "/partials/header.html",
  "/partials/footer.html"
);
