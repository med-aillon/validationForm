const validationIcons = document.querySelectorAll(".icone-verif");
const validationTexts = document.querySelectorAll(".error-msg");

function showValidation({ index, validation }) {
  if (validation) {
    validationIcons[index].style.display = "inline";
    validationIcons[index].src = "ressources/check.svg";
    validationTexts[index].style.display = "none";
  } else {
    validationTexts[index].style.display = "block";
    validationIcons[index].style.display = "inline";
    validationIcons[index].src = "ressources/error.svg";
  }
}

const userInput = document.querySelector(".input-group:nth-child(1) input");
userInput.addEventListener("blur", userValidation);
userInput.addEventListener("input", userValidation);

function userValidation() {
  if (userInput.value.length >= 3) {
    showValidation({ index: 0, validation: true });
  } else {
    showValidation({ index: 0, validation: false });
  }
}

const emailInput = document.querySelector(".input-group:nth-child(2) input");
emailInput.addEventListener("blur", emailValidation);
emailInput.addEventListener("input", emailValidation);

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function emailValidation() {
  if (regexEmail.test(emailInput.value)) {
    showValidation({ index: 1, validation: true });
  } else {
    showValidation({ index: 1, validation: false });
  }
}
