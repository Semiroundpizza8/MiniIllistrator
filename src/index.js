import "./styles.css";
import Circle from "./shapes/Circle";
import Rectangle from "./shapes/Rectangle";
import { canvas, getRandomColor, newPalette } from "./globals";
import {
  createCircleButton,
  createRectangleButton,
  clearCanvasButton,
  swapPaletteButton,
  canvasElement,
} from "./page";

let currHoveredShape = null;
let shiftDown = false;
let mouseIsDown = false;

canvasElement.addEventListener("mousemove", (event) => {
  const { shapes, selectedShapes } = canvas;
  let inCircle = false;

  if (mouseIsDown) {
    // Placed up here as opposed to in detector to allow us to move faster when dragging
    selectedShapes.forEach((shape) => {
      shape.move(event.movementX, event.movementY);
    });
  } else {
    for (var i = shapes.length - 1; i >= 0; i--) {
      // Since we only care about the highest shape, start from the closest shape to user;
      let shape = shapes[i];
      // Check to see if we're currently over a shape
      if (shape.isAtPoint(event.offsetX, event.offsetY)) {
        inCircle = true;

        // If we're in the same shape as last time stop looking for one
        if (shape.id === currHoveredShape?.id) break;

        // Set the hover to the current shape
        if (currHoveredShape) currHoveredShape.hover = false;
        currHoveredShape = shape;
        shape.hover = true;
        canvas.redrawCanvas();
        break;
      }
    }
  }

  // If we've just left a circle, remove the outline for the hovered canvas
  if (!inCircle && currHoveredShape !== null) {
    currHoveredShape.hover = false;
    currHoveredShape = null;
    canvas.redrawCanvas();
  }
});

canvasElement.addEventListener("mousedown", (event) => {
  mouseIsDown = true;

  // If we're currently looking at a shape...
  if (currHoveredShape) {
    let { selected } = currHoveredShape;

    // Deselect it if we're holding shift
    if (currHoveredShape.selected && shiftDown)
      canvas.deselectShape(currHoveredShape);
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

canvasElement.addEventListener("mouseup", () => {
  mouseIsDown = false;
});

window.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "shift") shiftDown = true;
});

window.addEventListener("keyup", (event) => {
  if (event.key.toLowerCase() === "shift") shiftDown = false;
});

createCircleButton.addEventListener("click", () => {
  let circleLocation = canvas.getRandomPoint();
  let radius = 10 + Math.random() * 40;
  let circle = new Circle(
    circleLocation.x,
    circleLocation.y,
    radius,
    getRandomColor()
  );
  canvas.addShape(circle);
});

createRectangleButton.addEventListener("click", () => {
  let rectangleLocation = canvas.getRandomPoint();
  let width = Math.floor(20 + Math.random() * 80);
  let height = Math.floor(20 + Math.random() * 80);
  let rectangle = new Rectangle(
    rectangleLocation.x,
    rectangleLocation.y,
    width,
    height,
    getRandomColor()
  );
  canvas.addShape(rectangle);
});

clearCanvasButton.addEventListener("click", () => canvas.clearCanvas());
swapPaletteButton.addEventListener("click", () => newPalette());
