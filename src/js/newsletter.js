import { getParam, loadHeaderFooter, setClick } from "./utils.mjs";

// close button variables
const popUp = document.querySelector(".newsletter-container");

// submit variables
const submit = document.querySelector("#nl-submit");

setClick("#nl-close", () => {
    popUp.style.display = "none";
})

submit.addEventListener("click", (event) => {
    event.preventDefault();
    const firstName = getParam("firstName")
    const lastName = getParam("lastName")
    const email = getParam("email")
    console.log(firstName, lastName, email)
    location.replace("../newsletter/success.html")
  });


