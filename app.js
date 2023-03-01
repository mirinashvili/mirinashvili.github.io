// @ts-nocheck
// Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

// Options to choose from
const options = {
  fruits: ["Apple", "Peach", "Watermalon"],
  animals: ["Dog", "Cat", "Tiger"],
  countries: ["Georgia", "USA", "Japan"],
};

let winCount = 0;
let count = 0;
let mistakes = 0;

let chosenWord = "";

const displayOptions = () => {
  optionsContainer.innerHTML = "Please select an Option from below";
  let buttonsContainer = document.createElement("div");
  for (let value in options) {
    buttonsContainer.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonsContainer);
};

function generateWord(optionValue) {
  console.log(optionValue);
  let optionButtons = document.querySelectorAll(".options");
  optionButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("selected");
    }
    button.disabled = true;
  });

  const optionsArray = options[optionValue];

  chosenWord = optionsArray[Math.floor(Math.random() * 3)];

  chosenWord = chosenWord.toUpperCase();

  const diplayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  userInputSection.innerHTML = diplayItem;
}

function displayLetters() {
  letterContainer.innerHTML = "";
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letter");
    button.innerText = String.fromCharCode(i);
    letterContainer.append(button);
  }
}

const initializer = () => {
  winCount = 0;
  count = 0;
  mistakes = 0;

  userInputSection.innerHTML = "";
  letterContainer.innerHTML = "";
  optionsContainer.innerHTML = "";
  newGameContainer.classList.add("hide");
  letterContainer.classList.add("hide");

  displayLetters();

  const letterBtns = document.querySelectorAll(".letter");
  letterBtns.forEach((button) => {
    button.addEventListener("click", () => {
      let letter = button.innerText;
      button.disabled = true;
      button.classList = "disabled";
      // TODO: BUG!
      const index = chosenWord.indexOf(letter);
      if (chosenWord.includes(letter)) {
        let dashes = document.querySelectorAll(".dashes");
        for (let i = 0; i < chosenWord.length; i++) {
          if (chosenWord[i] === letter) {
            dashes[i].innerText = letter;
            count++;
          }
        }
        if (count === chosenWord.length) {
          resultText.innerText = "You Win";
          newGameContainer.style.display = "flex";
        }
      } else {
        mistakes++;
        if (mistakes === 6) {
          resultText.innerText = "You Lose";
          newGameContainer.style.display = "flex";
        }
        drawMan(mistakes);
      }
    });
    letterContainer.append(button);
  });

  displayOptions();
  let { initialDrawing } = canvasCreator();

  initialDrawing();
};

window.onload = initializer;
newGameButton.addEventListener("click", initializer);

const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

const drawMan = (mistakeAmount) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (mistakeAmount) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

// დავალება:
// არ აარჩევინოთ მომხარებელს ასო, თუ არჩეული არ  ექნება კატეგორია.
// ასევე, გააკეთეთ ისე რომ მოგება-წაგება, მომხარებელს ცალკე ფეიჯზე აცნობოთ.
// ჩამოხრჩობის მაგივრად, დაუწერეთ რამდენი ცდა დარჩა.
// გაასწორეთ ის შეცდომა, რაც ჩვენ დავუშვით (74 ხაზი)

// * თუ შეძლებთ, cavnasCreatorის დახმარებით, დაასრულეთ თამაში.
