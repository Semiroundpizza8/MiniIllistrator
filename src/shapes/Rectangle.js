import { context, getRandomColor } from "../globals";

export default class Rectangle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color || getRandomColor();
    this.hover = false;
    this.selected = false;
  }

  draw() {
    let hover = true;
    let selected = true;

    // Add Outline
    context.fillStyle = "rgba(0, 0, 150, .5)";
    context.strokeStyle = "rgba(235, 235, 0)";
    context.lineWidth = 8;
    context.beginPath();
    context.rect(this.x - 10, this.y - 10, this.width + 20, this.height + 20);
    if (this.hover === true) context.fill();
    if (this.selected === true) context.stroke();

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
}
