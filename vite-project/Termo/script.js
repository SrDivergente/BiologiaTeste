import { palavra } from "./palavras.js";

let palavras = [];

for (const value of palavra) {
  let value2 = value.normalize("NFD").replace(/[\u0300-\u036f-\u0303]/g, "");
  palavras.push(value2);
}

const tries = 6;
let remainingTries = tries;
let thisTry = [];
let nextLetter = 0;
let rightTry = palavras[Math.floor(Math.random() * (0 - 11) + 11)];

function fazTabuleiro() {
  let tabuleiro = document.getElementById("tabuleiro");

  for (let i = 0; i < tries; i++) {
    let linha = document.createElement("div");
    linha.className = "linha";

    for (let a = 0; a < 5; a++) {
      let caixa = document.createElement("div");
      caixa.className = "caixa";
      linha.appendChild(caixa);
    }
    tabuleiro.appendChild(linha);
  }
}

fazTabuleiro();

document.addEventListener("keyup", (e) => {
  if (remainingTries === 0) {
    return;
  }

  let keyPress = String(e.key);
  console.log(keyPress);
  if (keyPress === "Backspace" && nextLetter !== 0) {
    deleteLetter();
    return;
  }

  if (keyPress === "Enter" && thisTry.length == 5) {
    checkTry();
    return;
  }

  let search = keyPress.match(/[a-z-ç]/gi);
  if (!search || search.length > 1) {
    return;
  } else {
    insertLetter(keyPress);
  }
});

function insertLetter(keyPress) {
  if (nextLetter === 5) {
    return;
  }
  keyPress = keyPress.toLowerCase();

  let row = document.getElementsByClassName("linha")[6 - remainingTries];
  let box = row.children[nextLetter];
  box.textContent = keyPress;
  box.classList.add("caixa-cheia");
  thisTry.push(keyPress);
  nextLetter += 1;
}
console.log(thisTry);

function deleteLetter() {
  let row = document.getElementsByClassName("linha")[6 - remainingTries];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("caixa-cheia");
  thisTry.pop();
  nextLetter -= 1;
}

function checkTry() {
  let row = document.getElementsByClassName("linha")[6 - remainingTries];
  let tryString = "";

  for (const value of thisTry) {
    tryString += value;
  }

  if (tryString.length != 5) {
    toastr.error("A resposta deve ter 5 letras!");
    return;
  }

  for (let i = 0; i < 5; i++) {
    let letterColor = "";
    let box = row.children[i];
    let letter = thisTry[i];

    let letterPos = rightTry.indexOf(thisTry[i]);
    if (letterPos === -1) {
      letterColor = "grey";
    } else {
      if (thisTry[i] === rightTry[i]) {
        letterColor = "green";
      } else {
        letterColor = "yellow";
      }
    }

    let delay = 250 * i;
    setTimeout(() => {
      box.style.backgroundColor = letterColor;
      shadeKeyBoard(letter, letterColor);
    }, delay);
  }

  if (tryString === rightTry) {
    toastr.success("Você Ganhou!");
    remainingTries = 0;
    return;
  } else {
    remainingTries -= 1;
    thisTry = [];
    nextLetter = 0;

    if (remainingTries === 0) {
      toastr.error("Você perdeu, a palavra certa era " + rightTry);
    }
  }
}

function shadeKeyBoard(letter, color) {
  for (const e of document.getElementsByClassName("botaoTeclado")) {
    if (e.textContent === letter) {
      let oldColor = e.style.backgroundColor;
      if (oldColor === "green") {
        return;
      }

      if (oldColor === "yellow" && color !== "green") {
        return;
      }

      e.style.backgroundColor = color;
      break;
    }
  }
}

document.getElementById("teclado").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("botaoTeclado")) {
    return;
  }
  let key = target.textContent;

  if (key == "Del") {
    key = "Backspace";
  }

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});
