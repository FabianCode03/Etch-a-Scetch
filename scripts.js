const pixelContainer = document.querySelector(".pixel-container");
const setGridBtn = document.getElementById("Set-grid-button");
const rainbowModeBtn = document.getElementById("rainbow-mode-button");
const clearBtn = document.getElementById("clear-button");
let penColorState = "black";

function addPixels(pixelsPerRow) {
  pixelContainer.innerHTML = "";
  for (let i = 0; i < pixelsPerRow * pixelsPerRow; i++) {
    const tempPixel = document.createElement("div");
    tempPixel.classList.add("pixel");
    tempPixel.style.flexBasis = `${100 / pixelsPerRow}%`;
    pixelContainer.appendChild(tempPixel);
  }
}

setGridBtn.addEventListener("click", () => {
  const pixelsPerRow = parseInt(prompt("Select pixels per row (max. 100)"));
  pixelsPerRow < 1
    ? alert("only positive numbers allowed")
    : pixelsPerRow > 100
    ? alert("number over 100 not allowed")
    : addPixels(pixelsPerRow);
});

rainbowModeBtn.addEventListener("click", () =>
  penColorState === "black"
    ? (penColorState = "rainbow")
    : (penColorState = "black")
);

rainbowModeBtn.addEventListener("click", (e) => {});

pixelContainer.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("pixel")) {
    e.target.style.backgroundColor = getPenColor();
  }
});

const getRandomColorValue = () => Math.floor(Math.random() * 256);

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

clearBtn.addEventListener("click", () =>
  addPixels(Math.sqrt(pixelContainer.childElementCount))
);
