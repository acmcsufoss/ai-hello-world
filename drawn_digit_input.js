export function createDrawnDigitInput({
  width,
  height,
  size,
  cellColor,
  predict,
}) {
  // Define the state of the canvas.
  const data = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );

  // Define the animate function.
  let isAnimating = false;
  function animate() {
    if (!isAnimating) {
      isAnimating = true;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cellHeight = canvas.height / size;
    const cellWidth = canvas.width / size;
    for (let i = 0; i < size; i++) {
      const y = i * cellHeight;
      for (let j = 0; j < size; j++) {
        const x = j * cellWidth;
        if (data[i][j] === 1) {
          ctx.fillStyle = cellColor;
        } else {
          ctx.fillStyle = "#fff";
        }
        ctx.fillRect(x, y, cellWidth, cellHeight);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.25;
        ctx.strokeRect(x, y, cellWidth, cellHeight);
      }
    }
    requestAnimationFrame(animate);
  }

  // Define the draw handler.
  function handleDraw(event, brush = [[1]]) {
    const cellHeight = canvas.height / size;
    const cellWidth = canvas.width / size;
    const i = Math.floor(event.offsetY / cellHeight);
    const j = Math.floor(event.offsetX / cellWidth);
    for (let ii = 0; ii < brush.length; ii++) {
      for (let jj = 0; jj < brush[ii].length; jj++) {
        if (brush[ii][jj] === 1) {
          const iii = i + ii - Math.floor(brush.length / 2);
          const jjj = j + jj - Math.floor(brush[ii].length / 2);
          if (iii >= 0 && iii < size && jjj >= 0 && jjj < size) {
            data[iii][jjj] = 1;
          }
        }
      }
    }
  }

  // Define the output update function.
  function updateOutput() {
    const prediction = predict(data);
    outputContainer.innerHTML = `Prediction: <b>${prediction}</b> - ${new Date().toLocaleTimeString()}`;
  }

  // Create the canvas element.
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  canvas.style.border = "1px solid black";
  canvas.addEventListener("click", () => {
    if (!isAnimating) {
      animate();
    }
  });
  let isDrawing = false;
  document.body.addEventListener("mousedown", (event) => {
    isDrawing = true;
  });
  document.body.addEventListener("mouseup", () => {
    isDrawing = false;
  });
  canvas.addEventListener("mousemove", (event) => {
    if (!isDrawing) {
      return;
    }

    handleDraw(event, [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ]);
  });

  const predictButton = document.createElement("button");
  predictButton.textContent = "Predict";
  predictButton.addEventListener("click", () => {
    updateOutput();
  });
  const clearButton = document.createElement("button");
  clearButton.textContent = "Clear";
  clearButton.addEventListener("click", () => {
    data.forEach((row) => row.fill(0));
  });
  const outputContainer = document.createElement("div");

  // Append the elements to the body.
  document.body.appendChild(predictButton);
  document.body.appendChild(clearButton);
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(canvas);
  document.body.appendChild(outputContainer);
}

// TODO: Allow user to edit input tensor by drawing on the canvas into 28x28 cells.
// TODO: Allow user to clear the canvas.
