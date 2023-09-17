const pixelContainer = document.querySelector(".pixel-container");
const setGridBtn = document.getElementById("Set-grid-button");

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
