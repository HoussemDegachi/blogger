const modal = document.querySelector("#modal");
const toggleState = () => {
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
}

document.querySelector("#modalOpenBtn").addEventListener("click", toggleState);

document.querySelector("button.modalCloseBtn").addEventListener("click", toggleState);

document.querySelector("#modal-content").addEventListener("click", (e) => {
  e.stopPropagation();
});

document.querySelector(".modalCloseBtn").addEventListener("click", toggleState);
