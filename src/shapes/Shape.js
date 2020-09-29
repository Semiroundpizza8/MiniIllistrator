import { canvas } from "../globals";

export default class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.hover = false;
    this.selected = false;
    this.editor = null;
  }

  move(xMovement, yMovement) {
    this.x = this.x + xMovement;
    this.y = this.y + yMovement;
    canvas.redrawCanvas();
  }
  removeEditor() {
    this.editor.remove();
  }
}
