import { canvas, context } from "../globals";
import Shape from "./Shape";

export default class Rectangle extends Shape {
  constructor(x, y, width, height, color) {
    super(x, y, color);
    this.width = width;
    this.height = height;
    this.type = "Rectangle";
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
        name: "width",
        value: () => this.width,
        update: (newWidth) => {
          this.width = newWidth;
          canvas.redrawCanvas();
        },
        type: "slider",
      },
      {
        name: "height",
        value: () => this.height,
        update: (newHeight) => {
          this.height = newHeight;
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
  Allows us to use the top left corner of our rect as a starting point for canvas' draw options
  */ 
  get adjustedX () {
    return this.x - (this.width / 2);
  }
  get adjustedY () {
    return this.y - (this.height / 2);
  }

  /*
  Draw a halo to surround / put emphasis on the rectangle
  */
  drawOutline() {
    // Add Outline
    context.fillStyle = "rgba(0, 0, 150, .5)";
    context.strokeStyle = "rgba(235, 235, 0)";
    context.lineWidth = 8;
    context.beginPath();
    context.rect(this.adjustedX - 10, this.adjustedY - 10, this.width + 20, this.height + 20);
    if (this.hover) context.fill();
    if (this.selected) context.stroke();
  }

  /*
  Draw the rectangle onto the canvas
  */
  drawShape() {
    // Draw Shape
    context.fillStyle = this.color;
    context.beginPath();
    context.rect(this.adjustedX, this.adjustedY, this.width, this.height);
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
  Detect if a point on the canvas is within the rectangle
  */
  isAtPoint(x, y) {
    
    return (
      this.adjustedX <= x &&
      x <= this.adjustedX + this.width &&
      this.adjustedY <= y &&
      y <= this.adjustedY + this.height
    );
  }
}
