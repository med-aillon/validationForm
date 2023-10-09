const validationIcons = document.querySelectorAll(".icone-verif");
const validationTexts = document.querySelectorAll(".error-msg");

const inputsValidity = {
  username: false,
  email: false,
  password: false,
  confirmationPassword: false,
};

const form = document.querySelector("form");
const container = document.querySelector(".container");

form.addEventListener("submit", handleForm);

let isAnimating = false;
function handleForm(e) {
  e.preventDefault();

  const keys = Object.keys(inputsValidity);
  const failedInputs = keys.filter((key) => !inputsValidity[key]);

  if (failedInputs.length && !isAnimating) {
    isAnimating = true;
    container.classList.add("shake");

    setTimeout(() => {
      container.classList.remove("shake");
      isAnimating = false;
    }, 400);

    failedInputs.forEach((input) => {
      const index = keys.indexOf(input);
      showValidation({ index: index, validation: false });
    });
  } else {
    alert("Donneés envoyées avec succés.");
  }
  console.log(failedInputs);
}

function showValidation({ index, validation }) {
  if (validation) {
    validationIcons[index].style.display = "inline";
    validationIcons[index].src = "ressources/check.svg";
    if (validationTexts[index]) validationTexts[index].style.display = "none";
  } else {
    validationIcons[index].style.display = "inline";
    validationIcons[index].src = "ressources/error.svg";
    if (validationTexts[index]) validationTexts[index].style.display = "block";
  }
}

const userInput = document.querySelector(".input-group:nth-child(1) input");
userInput.addEventListener("blur", userValidation);
userInput.addEventListener("input", userValidation);

function userValidation() {
  if (userInput.value.length >= 3) {
    showValidation({ index: 0, validation: true });
    inputsValidity.username = true;
  } else {
    showValidation({ index: 0, validation: false });
    inputsValidity.username = false;
  }
}

const emailInput = document.querySelector(".input-group:nth-child(2) input");
emailInput.addEventListener("blur", emailValidation);
emailInput.addEventListener("input", emailValidation);

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function emailValidation() {
  if (regexEmail.test(emailInput.value)) {
    showValidation({ index: 1, validation: true });
    inputsValidity.email = true;
  } else {
    showValidation({ index: 1, validation: false });
    inputsValidity.email = false;
  }
}

const pswInput = document.querySelector(".input-group:nth-child(3) input");

pswInput.addEventListener("blur", passwordValidation);
pswInput.addEventListener("input", passwordValidation);

const passwordVerification = {
  length: false,
  symbol: false,
  number: false,
};

const regexList = {
  symbol: /[^a-zA-Z0-9\s]/,
  number: /[0-9]/,
};

let passwordValue;

function passwordValidation() {
  passwordValue = pswInput.value;
  let validationResult = 0;

  for (const prop in passwordVerification) {
    if (prop === "length") {
      if (passwordValue.length < 6) {
        passwordVerification.length = false;
      } else {
        passwordVerification.length = true;
        validationResult++;
      }
      continue;
    }

    if (regexList[prop].test(passwordValue)) {
      passwordVerification[prop] = true;
      validationResult++;
    } else {
      passwordVerification[prop] = false;
    }
  }

  if (validationResult !== 3) {
    showValidation({ index: 2, validation: false });
    inputsValidity.password = false;
  } else {
    showValidation({ index: 2, validation: true });
    inputsValidity.password = true;
  }
  passwordStrength();

  if (validationIcons[3].style.display === "inline") {
    confirmPassword();
  }
}

const lines = document.querySelectorAll(".lines div");

function passwordStrength() {
  const passwordLenght = pswInput.value.length;

  if (!passwordLenght) {
    addLines(0);
  } else if (passwordLenght > 9 && passwordVerification.symbol && passwordVerification.number) {
    addLines(3);
  } else if ((passwordLenght > 6 && passwordVerification.symbol) || passwordVerification.number) {
    addLines(2);
  } else {
    addLines(1);
  }

  function addLines(numberOfLines) {
    lines.forEach((el, index) => {
      if (index < numberOfLines) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    });
  }
}

const confirmInput = document.querySelector(".input-group:nth-child(4) input");

confirmInput.addEventListener("blur", confirmPassword);
confirmInput.addEventListener("input", confirmPassword);

function confirmPassword() {
  const confirmValue = confirmInput.value;
  if (!confirmValue && !passwordValue) {
    validationIcons[3].style.display = "none";
  } else if (confirmValue !== passwordValue) {
    showValidation({ index: 3, validation: false });
    inputsValidity.confirmationPassword = false;
  } else {
    showValidation({ index: 3, validation: true });
    inputsValidity.confirmationPassword = true;
  }
}
