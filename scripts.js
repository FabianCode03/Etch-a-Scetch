// Constants
const pixelContainer = document.querySelector(".pixel-container");
const setGridBtn = document.getElementById("Set-grid-button");
const blackPenBtn = document.getElementById("black-mode-button");
const shadowPenBtn = document.getElementById("shadow-mode-button");
const rainbowPenBtn = document.getElementById("rainbow-mode-button");
const clearBtn = document.getElementById("clear-button");
const gridLinesBtn = document.getElementById("grid-lines-button");
const defaultPixelsPerRow = 20;

// State variables
let penColorState = "black";
let drawingState = false;
let displayGridLines = true;
let pixelsPerRow = defaultPixelsPerRow; // Initialize pixelsPerRow with default value
let currentPixelColor;

// Event listeners
setGridBtn.addEventListener("click", () => setGridSize());
blackPenBtn.addEventListener("click", () => {
  changePenColorState("black");
  setButtonToggleEffect(blackPenBtn);
});
shadowPenBtn.addEventListener("click", () => {
  changePenColorState("shadow");
  setButtonToggleEffect(shadowPenBtn);
});
rainbowPenBtn.addEventListener("click", () => {
  changePenColorState("rainbow");
  setButtonToggleEffect(rainbowPenBtn);
});
pixelContainer.addEventListener("mouseover", e => draw(e));
pixelContainer.addEventListener("click", () => toggleDrawingState());
clearBtn.addEventListener("click", () => clear());
gridLinesBtn.addEventListener("click", () => {
  toggleGridLines();
  setButtonToggleEffect(gridLinesBtn);
});

// Functions
function addPixels(pixelsPerRow) {
  pixelContainer.innerHTML = "";
  for (let i = 0; i < pixelsPerRow * pixelsPerRow; i++) {
    const tempPixel = createPixel();
    pixelContainer.appendChild(tempPixel);
  }
}

function createPixel() {
  const tempPixel = document.createElement("div");
  tempPixel.classList.add("pixel");
  if (displayGridLines) {
    tempPixel.classList.add("grid-lines");
  }
  tempPixel.style.flexBasis = `${100 / pixelsPerRow}%`;
  return tempPixel;
}

function setGridSize() {
  const input = parseInt(prompt("Select pixels per row (max. 100)"));
  if (input >= 1 && input <= 100) {
    pixelsPerRow = input; // Update the global variable
    addPixels(pixelsPerRow);
  } else {
    alert("Please enter a number between 1 and 100.");
  }
}

function changePenColorState(penColor) {
  penColorState = penColor;
}

function draw(e) {
  if (drawingState && e.target.classList.contains("pixel")) {
    currentPixelColor = e.target.style.backgroundColor
      ? e.target.style.backgroundColor
      : "rgb(255, 255, 255)";
    e.target.style.backgroundColor = getPenColor();
    currentPixelColor = e.target.style.backgroundColor;
  }
}

function toggleDrawingState() {
  drawingState = !drawingState;
}

function getRandomColorValue() {
  return Math.floor(Math.random() * 256);
}

function getPenColor() {
  switch (penColorState) {
    case "black":
      return "rgb(0, 0, 0)";
    case "shadow":
      return getShadowColor();
    case "rainbow":
      return getRandomColor();
  }
}

function getShadowColor() {
  const shadesOfBlack = [
    "rgb(255, 255, 255)",
    "rgb(226, 226, 226)",
    "rgb(198, 198, 198)",
    "rgb(170, 170, 170)",
    "rgb(141, 141, 141)",
    "rgb(113, 113, 113)",
    "rgb(85, 85, 85)",
    "rgb(56, 56, 56)",
    "rgb(28, 28, 28)",
    "rgb(0, 0, 0)",
  ];
  if (shadesOfBlack.includes(currentPixelColor)) {
    const index = shadesOfBlack.indexOf(currentPixelColor);
    return shadesOfBlack[index + 1];
  } else {
    return "rgb(255, 255, 255)";
  }
}

function getRandomColor() {
  const redValue = getRandomColorValue();
  const greenValue = getRandomColorValue();
  const blueValue = getRandomColorValue();
  return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

function clear() {
  addPixels(Math.sqrt(pixelContainer.childElementCount));
}

function toggleGridLines() {
  toggleGridLinesState();
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach(pixel => {
    pixel.classList.toggle("grid-lines");
  });
}

function toggleGridLinesState() {
  displayGridLines = !displayGridLines;
}

function setButtonToggleEffect(button) {
  const penButtons = [blackPenBtn, shadowPenBtn, rainbowPenBtn];
  if (penButtons.includes(button)) {
    penButtons.forEach(penButton => {
      if (penButton !== button) {
        penButton.classList.remove("toggled-on");
      }
    });
    button.classList.add("toggled-on");
  } else {
    button.classList.toggle("toggled-on");
  }
}

// Initialize the grid
addPixels(defaultPixelsPerRow);
