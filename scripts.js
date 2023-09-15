const pixelContainer = document.querySelector(".pixel-container");

// const numberOfPixels = 16;

console.log(pixelContainer);

function addPixels(numberOfPixels) {
  for (let i = 0; i < numberOfPixels; i++) {
    const tempPixel = document.createElement("div");
    tempPixel.classList.add("pixel");
    pixelContainer.appendChild(tempPixel);
  }
}

addPixels(100);
