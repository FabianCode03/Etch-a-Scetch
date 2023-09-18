// Constants
const pixelContainer = document.querySelector(".pixel-container");
const setGridBtn = document.getElementById("Set-grid-button");
const rainbowModeBtn = document.getElementById("rainbow-mode-button");
const clearBtn = document.getElementById("clear-button");
const gridLinesBtn = document.getElementById("grid-lines-button");
const defaultPixelsPerRow = 20;

// State variables
let penColorState = "black";
let drawingState = false;
let displayGridLines = true;
let pixelsPerRow = defaultPixelsPerRow; // Initialize pixelsPerRow with default value

// Event listeners
setGridBtn.addEventListener("click", setGridSize);
rainbowModeBtn.addEventListener("click", toggleRainbowMode);
pixelContainer.addEventListener("mouseover", draw);
pixelContainer.addEventListener("click", toggleDrawingState);
clearBtn.addEventListener("click", clear);
gridLinesBtn.addEventListener("click", toggleGridLines);

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

function toggleRainbowMode() {
  penColorState = penColorState === "black" ? "rainbow" : "black";
}

function draw(e) {
  if (drawingState && e.target.classList.contains("pixel")) {
    e.target.style.backgroundColor = getPenColor();
  }
}

function toggleDrawingState() {
  drawingState = !drawingState;
}

function getRandomColorValue() {
  return Math.floor(Math.random() * 256);
}

function getPenColor() {
  if (penColorState === "black") {
    return "black";
  }
  if (penColorState === "rainbow") {
    const redValue = getRandomColorValue();
    const greenValue = getRandomColorValue();
    const blueValue = getRandomColorValue();
    return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
  }
}

function clear() {
  addPixels(Math.sqrt(pixelContainer.childElementCount));
}

function toggleGridLines() {
  toggleGridLinesState();
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.classList.toggle("grid-lines");
  });
}

function toggleGridLinesState() {
  displayGridLines = !displayGridLines;
}

// Initialize the grid
addPixels(defaultPixelsPerRow);
