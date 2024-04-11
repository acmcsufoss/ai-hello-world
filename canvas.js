// Define global variables.
const IMAGE_WIDTH = 28;
const IMAGE_HEIGHT = 28;

// TODO: Rename to drawn digit input.
export function createCanvas() {
  // Define the animate function.
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cellHeight = canvas.height / IMAGE_HEIGHT;
    const cellWidth = canvas.width / IMAGE_WIDTH;
    for (let i = 0; i < IMAGE_HEIGHT; i++) {
      const y = i * cellHeight;
      for (let j = 0; j < IMAGE_WIDTH; j++) {
        const x = j * cellWidth;
        const color = Math.floor(Math.random() * 256);
        ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
        ctx.fillRect(x, y, cellWidth, cellHeight);
      }
    }
    requestAnimationFrame(animate);
  }

  // Create the canvas element.
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 400;
  canvas.style.border = "1px solid black";
  canvas.addEventListener("load", () => {
    animate();
  });

  // Append the canvas element to the body.
  document.body.appendChild(canvas);
}

// TODO: Allow user to edit input tensor by drawing on the canvas into 28x28 cells.
// TODO: Allow user to clear the canvas.
