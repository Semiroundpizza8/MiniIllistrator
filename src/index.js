import "./styles.css";
import Circle from "./shapes/Circle";
import Rectangle from "./shapes/Rectangle";
import { canvas, getRandomColor, newPalette } from "./globals";
import {
  createRectangleButton,
  clearBackgroundButton,
  splatterShapesButton,
  createCircleButton,
  clearCanvasButton,
  swapPaletteButton,
  canvasElement,
} from "./page";

let currHoveredShape = null;
let shiftDown = false;
let mouseIsDown = false;

canvasElement.addEventListener("mousemove", (event) => {
  const { shapes, selectedShapes } = canvas;
  let hoveringOverShape = false;

  // If our mouse is held down, only try moving the shapes currently selected
  if (mouseIsDown) {
    // Placed up here as opposed to in detector to allow us to move faster when dragging
    selectedShapes.forEach((shape) => {
      shape.move(event.movementX, event.movementY);
    });
    return;
  }

  // Otherwise, try to detect us hovering
  for (var i = shapes.length - 1; i >= 0; i--) {
    // Since we only care about the shape closest to us, start from the back of the array
    let currShape = shapes[i];

    // If our mouse is currently hovering over the shape...
    if (currShape.isAtPoint(event.offsetX, event.offsetY)) {
      hoveringOverShape = true;

      // If we're in the same shape as last time stop looking for one
      if (currShape.id === currHoveredShape?.id) break;

      // Set the hover to the current shape
      if (currHoveredShape) currHoveredShape.hover = false;
      currHoveredShape = currShape;
      currShape.hover = true;
      canvas.redrawCanvas();
      break;
    }
  }

  // If we're no longer hovering over a shape reset currHoveredShape
  if (!hoveringOverShape && currHoveredShape !== null) {
    currHoveredShape.hover = false;
    currHoveredShape = null;
    canvas.redrawCanvas();
  }
});

canvasElement.addEventListener("mousedown", (event) => {
  mouseIsDown = true;

  // If we're currently hovering over a shape...
  if (currHoveredShape) {
    let { selected } = currHoveredShape;

    // Deselect it if we're holding shift
    if (selected && shiftDown) canvas.deselectShape(currHoveredShape);
    // Select it if it hasn't been selected yet
    else if (!selected) {
      if (!shiftDown) canvas.clearSelectedShapes();
      canvas.selectShape(currHoveredShape);
    }
  }

  // Prevents us from accidentally losing all currently selected shapes if we're holding shift
  else if (!shiftDown) canvas.clearSelectedShapes();
  canvas.redrawCanvas();
});

// Flags when dragging the mouse
canvasElement.addEventListener("mouseup", () => {
  mouseIsDown = false;
});

// Flags when shift is being held down or released
window.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "shift") shiftDown = true;
});
window.addEventListener("keyup", (event) => {
  if (event.key.toLowerCase() === "shift") shiftDown = false;
});


const drawRandomCircle = () => {
  // Gather random data for creating a circle
  let circleLocation = canvas.getRandomPoint();
  let radius = 10 + Math.random() * 40;
  let color = getRandomColor();

  // Create the circle
  let circle = new Circle(circleLocation.x, circleLocation.y, radius, color);
  canvas.addShape(circle);
}

const drawRandomRectangle = () => {
  // Gather random data for creating a rectangle
  let rectangleLocation = canvas.getRandomPoint();
  let width = Math.floor(20 + Math.random() * 80);
  let height = Math.floor(20 + Math.random() * 80);
  let color = getRandomColor();

  // Subtract dimensions from location to prevent from flying off screen
  rectangleLocation.x -= width / 2;
  rectangleLocation.height -= height / 2;

  // Create rect
  let rectangle = new Rectangle(
    rectangleLocation.x,
    rectangleLocation.y,
    width,
    height,
    color
  );
  canvas.addShape(rectangle);
}

createCircleButton.addEventListener("click", drawRandomCircle);
createRectangleButton.addEventListener("click", drawRandomRectangle);
splatterShapesButton.addEventListener("click", () => {
  let shapesToGenerate = 50;
  for(var i=0; i<shapesToGenerate; i++) {
    let coinFlip = Math.random() > .5;
    if(coinFlip) drawRandomCircle();
    else drawRandomRectangle();
  }
})

clearBackgroundButton.addEventListener("click", () =>
  canvas.removeBackground()
);
clearCanvasButton.addEventListener("click", () => canvas.clearCanvas());
swapPaletteButton.addEventListener("click", () => newPalette());
