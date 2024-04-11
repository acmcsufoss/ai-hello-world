// Define global variables.
const IMAGE_WIDTH = 28;
const IMAGE_HEIGHT = 28;

// Create the canvas element.
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
canvas.style.border = "1px solid black";

// Append the canvas element to the body.
document.body.appendChild(canvas);

// TODO: Allow user to edit input tensor by drawing on the canvas into 28x28 cells.
