import { context } from "../globals";
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
    ];
  }

  draw() {
    // Add Outline
    context.fillStyle = "rgba(0, 0, 150, .5)";
    context.strokeStyle = "rgba(255, 255, 0)";
    context.lineWidth = 8;
    context.beginPath();
    context.arc(this.x, this.y, this.radius + 10, 0, 360);
    if (this.hover) context.fill();
    if (this.selected) context.stroke();

    // drawShape
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 360);
    context.fill();
  }

  isAtPoint(x, y) {
    let xDiff = x - this.x;
    let yDiff = y - this.y;
    return Math.sqrt(xDiff ** 2 + yDiff ** 2) < this.radius;
  }
}
