import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { getShoppingCartKey } from "./utils.mjs";


const check = new CheckoutProcess(getShoppingCartKey(), ".order-summary");
check.init();

console.log(getLocalStorage(getShoppingCartKey()));

document.querySelector("#checkoutSubmit")
.addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms["form-data"];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status) {
    check.checkout();  
    const emptyCart = [];
    setLocalStorage(getShoppingCartKey(), emptyCart);
  }
});


loadHeaderFooter(
  "header",
  "footer",
  "/partials/header.html",
  "/partials/footer.html"
);
