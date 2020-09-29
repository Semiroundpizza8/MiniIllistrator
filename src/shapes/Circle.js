import { canvas, context } from "../globals";
import Shape from "./Shape";

export default class Circle extends Shape {
  constructor(x, y, radius, color) {
    super(x, y, color);
    this.radius = radius;
    this.type = "Circle";
    this.editorOptions = [
      {
        name: "x location",
        value: () => this.x,
        type: "static",
      },
      {
        name: "y location",
        value: () => this.y,
        type: "static",
      },
      {
        name: "radius",
        value: () => this.radius,
        update: (newRadius) => {
          this.radius = newRadius;
          canvas.redrawCanvas();
        },
        type: "slider",
      },
      {
        name: "color",
        value: () => this.color,
        update: (newColor) => {
          this.color = newColor;
          canvas.redrawCanvas();
        },
        type: "color",
      },
    ];
  }

  /*
  Draw a halo to surround / put emphasis on the circle
  */
  drawOutline() {
    context.fillStyle = "rgba(0, 0, 150, .5)";
    context.strokeStyle = "rgba(255, 255, 0)";
    context.lineWidth = 8;
    context.beginPath();
    context.arc(this.x, this.y, this.radius + 10, 0, 360);
    if (this.hover) context.fill();
    if (this.selected) context.stroke();
  }

  /*
  Draw the circle onto the canvas
  */
  drawShape() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 360);
    context.fill();
  }

  /*
  Calls functions needed to visualize the shape and its state onto the canvas
  */
  draw() {
    if (this.hover || this.selected) this.drawOutline();
    this.drawShape();
  }

  /*
  Detect if a point on the canvas is within the circle
  */
  isAtPoint(x, y) {
    let xDiff = x - this.x;
    let yDiff = y - this.y;
    return Math.sqrt(xDiff ** 2 + yDiff ** 2) < this.radius;
  }
}
