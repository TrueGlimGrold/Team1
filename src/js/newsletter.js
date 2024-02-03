const closeButton = document.querySelector("#nl-close");
const popUp = document.querySelector(".newsletter-container");

closeButton.addEventListener("click", () => {
    popUp.style.display = "none";
});