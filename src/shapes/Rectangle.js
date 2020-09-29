import { canvas, context, getRandomColor } from "../globals";
import { createEditor } from '../editorRow';
import Shape from './Shape';
export default class Rectangle extends Shape {
  constructor(x, y, width, height, color) {
    super(x, y, color);
    this.width = width;
    this.height = height;
    this.type = "Rectangle";
  }

  draw() {
    // Add Outline
    context.fillStyle = "rgba(0, 0, 150, .5)";
    context.strokeStyle = "rgba(235, 235, 0)";
    context.lineWidth = 8;
    context.beginPath();
    context.rect(this.x - 10, this.y - 10, this.width + 20, this.height + 20);
    if (this.hover) context.fill();
    if (this.selected) context.stroke();

    // Draw Shape
    context.fillStyle = this.color;
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fill();
  }

  isAtPoint(x, y) {
    return (
      this.x <= x &&
      x <= this.x + this.width &&
      this.y <= y &&
      y <= this.y + this.height
    );
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
      }
    });
  }
}
