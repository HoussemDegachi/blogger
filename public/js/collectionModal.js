const collectionModal = document.querySelector("#collectionModal");
const toggleCollectionModalState = () => {
  collectionModal.classList.toggle("hidden");
  collectionModal.classList.toggle("flex");
};

document
  .querySelector("#collectionModalOpenBtn")
  .addEventListener("click", toggleCollectionModalState);

document
  .querySelector("button.collectionModalCloseBtn")
  .addEventListener("click", toggleCollectionModalState);

document
  .querySelector("#collectionModal-content")
  .addEventListener("click", (e) => {
    e.stopPropagation();
  });

document
  .querySelector(".collectionModalCloseBtn")
  .addEventListener("click", toggleCollectionModalState);
