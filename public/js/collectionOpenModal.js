const toggleCollectionModalState = (modalId) => {
    const collectionModal = document.querySelector(
        `#collectionModal-${modalId}`
        );
        collectionModal.classList.toggle("hidden");
        collectionModal.classList.toggle("flex");
    }

// open btns
const openBtns = document.querySelectorAll(".collectionModalOpenBtn");
for (let openBtn of openBtns) {
  openBtn.addEventListener("click", () => {
    const modalId = openBtn.id.split("-")[1];
    toggleCollectionModalState(modalId)
  });
}

// close btns
const closeBtns = document.querySelectorAll("button.collectionModalCloseBtn")
for (let closeBtn of closeBtns) {
    closeBtn.addEventListener("click", () => {
    const modalId = closeBtn.id.split("-")[1];
    toggleCollectionModalState(modalId)
    })
}

// close bg
// stop propagation
const modalsContent = document.querySelectorAll(".collectionModal-content")
for (let modalContent of modalsContent) {
    modalContent.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

// close instence
const closeBgs = document.querySelectorAll(".collectionModalCloseBg")
for (let closeBg of closeBgs) {
    closeBg.addEventListener("click", () => {
        const modalId = closeBg.id.split("-")[1];
        toggleCollectionModalState(modalId)
    })
}