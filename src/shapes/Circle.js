import { context, getRandomColor } from "../globals";
import { createEditor } from "../editorRow";
export default class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color || getRandomColor();
    this.hover = false;
    this.selected = false;
  }

  draw() {
    // Add Outline
    context.fillStyle = "rgba(0, 0, 150, .5)";
    context.strokeStyle = "rgba(255, 255, 0)";
    context.beginPath();
    context.arc(this.x, this.y, this.radius + 10, 0, 360);
    context.lineWidth = 8;
    if (this.hover) context.fill();
    if (this.selected === true) context.stroke();

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

  addEditor() {
    this.editor = createEditor(this, {
      x: {
        value: this.x,
        type: "static",
      },
      y: {
        value: this.y,
        type: "static",
      },
      radius: {
        value: this.radius,
        type: "range",
      },
    });
  }

  removeEditor() {
    this.editor.remove();
  }
}
