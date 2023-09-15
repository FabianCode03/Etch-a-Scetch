const pixelContainer = document.querySelector(".pixel-container");

console.log(pixelContainer);

function addPixels(pixelsPerRow) {
  for (let i = 0; i < pixelsPerRow * pixelsPerRow; i++) {
    const tempPixel = document.createElement("div");
    tempPixel.classList.add("pixel");
    tempPixel.style.flexBasis = `${100 / pixelsPerRow}%`;
    pixelContainer.appendChild(tempPixel);
  }
}

addPixels(10);
