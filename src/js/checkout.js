import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { getShoppingCartKey } from "./utils.mjs";



const check = new CheckoutProcess(getShoppingCartKey(), ".order-summary");
check.init();

console.log(getLocalStorage(getShoppingCartKey()));


document.querySelector(".checkoutSubmit")
.addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const check_form = myForm.checkValidity();
  myForm.reportValidity()
  if (check_form) {
    // If form is valid, redirect to another HTML page
    window.location.href = "success.html"; 
    localStorage.clear();
  } else {
    // If form is not valid, continue with your existing logic
    check.checkout();
  }
}); 




loadHeaderFooter(
  "header",
  "footer",
  "/partials/header.html",
  "/partials/footer.html"
);
