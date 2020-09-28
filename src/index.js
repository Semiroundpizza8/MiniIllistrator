import "./styles.css";
import Circle from "./shapes/Circle";
import Rectangle from "./shapes/Rectangle";
import { canvas, newPalette } from "./globals";
import {
  createCircleButton,
  createRectangleButton,
  clearCanvasButton,
  swapPaletteButton,
  canvasElement,
} from "./page";

let currHoveredShape = null;
let shiftDown = false;

canvasElement.addEventListener("mousemove", (event) => {
  const { shapes } = canvas;
  let inCircle = false;

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

  // If we've just left a circle, remove the outline for the hovered canvas
  if (!inCircle && currHoveredShape !== null) {
    currHoveredShape.hover = false;
    currHoveredShape = null;
    canvas.redrawCanvas();
  }
});

canvasElement.addEventListener("click", () => {
  if(currHoveredShape) {
    let { selected } = currHoveredShape;
    if(currHoveredShape.selected && shiftDown) canvas.deselectShape(currHoveredShape);
    else if(!selected) {
      if(!shiftDown) canvas.clearSelectedShapes();
      canvas.selectShape(currHoveredShape);
    }
  } else if(!shiftDown) canvas.clearSelectedShapes();
  canvas.redrawCanvas();
});

window.addEventListener("keydown", (event) => {
  if(event.key.toLowerCase() === "shift") shiftDown = true;
})

window.addEventListener("keyup", (event) => {
  if(event.key.toLowerCase() === "shift") shiftDown = false;
})

createCircleButton.addEventListener("click", () => {
  let circleLocation = canvas.getRandomPoint();
  let circle = new Circle(circleLocation.x, circleLocation.y, 50);
  canvas.addShape(circle);
});

createRectangleButton.addEventListener("click", () => {
  let rectangleLocation = canvas.getRandomPoint();
  let rectangle = new Rectangle(
    rectangleLocation.x,
    rectangleLocation.y,
    100,
    100
  );
  canvas.addShape(rectangle);
});

clearCanvasButton.addEventListener("click", () => canvas.clearCanvas());
swapPaletteButton.addEventListener("click", () => newPalette());
