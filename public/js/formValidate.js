const form = document.querySelector(".form-validate");
const inputs = document.querySelectorAll(".form-validate input");
form.addEventListener("submit", (event) => {
  for (let input of inputs) {
    const inputId = input.id;
    const errorEl = document.querySelector(`#${inputId} + .error-message`);
    if (!input.validity.valid) {
      event.preventDefault();
      addErrListener(input, errorEl);
      showError(input);
    } else {
      if (errorEl.classList.contains("block")) {
        errorEl.innerText = "";
        errorEl.classList.remove("block");
        errorEl.classList.add("hidden");
        input.classList.remove("border-b-red-400");
      }
    }
  }
});

function showError(input) {
  const inputId = input.id;
  const errorEl = document.querySelector(`#${inputId} + .error-message`);
  const displayError = (err) => {
    errorEl.innerText = "";
    errorEl.append(err);
  };
  if (input.validity.valueMissing) {
    displayError("Please fill in this field");
  } else if (input.validity.typeMismatch) {
    displayError("This field is invalid");
  } else if (input.validity.tooShort) {
    displayError(
      `Input is too short, must be at least ${input.minLength} characters`
    );
  } else {
    displayError("This field is invalid");
  }
  errorEl.classList.remove("hidden");
  errorEl.classList.add("block");
  input.classList.add("border-b-red-400");
}

function addErrListener(input, errorEl) {
  input.addEventListener("input", () => {
    if (!input.validity.valid) {
      showError(input);
    } else {
      if (errorEl.classList.contains("block")) {
        errorEl.innerText = "";
        errorEl.classList.remove("block");
        errorEl.classList.add("hidden");
        input.classList.remove("border-b-red-400");
      }
    }
  });
}
