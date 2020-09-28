class Canvas {
  constructor(canvasEle) {
    this.canvas = canvasEle;
    this.context = this.canvas.getContext("2d");
    this.dimensions = {
      width: this.canvas.width,
      height: this.canvas.height,
    };
    this.shapes = [];
    this.selectedShapes = [];
    this.shapeIdCount = 0;
  }

  /*
    Grabs a random point off of the canvas
    returns: {
        x: random x location between canvas bounds
        y: random y location between canvas bounds
    }
    */
  getRandomPoint() {
    let randomX = Math.floor(Math.random() * this.dimensions.width);
    let randomY = Math.floor(Math.random() * this.dimensions.height);
    // Grab random point between min and max
    return {
      x: randomX,
      y: randomY,
    };
  }

  /*
    Adds a random shape to the canvas, adding it to our current shapes before visualizing it
    */
  addShape(newShape) {
    newShape.id = this.generateShapeId();
    this.shapes.push(newShape);
    newShape.draw();
  }
  
  /*
    Generates a unique ID for a shape.
    returns: unique intiger
    */
  generateShapeId() {
    return ++this.shapeIdCount;
  }

  /*
    Clears canvas and redraws every element
    */
  redrawCanvas() {
    this.context.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.shapes.forEach((shape) => shape.draw());
  }

  /*
    Erases whats currently on the canvas
    */
  clearCanvas() {
    this.shapes = [];
    this.context.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  /*
  Selects a passed in shape
  */
  selectShape(shape) {
    shape.selected = true;
    this.selectedShapes.push(shape);
  }

  /*
  Clears all currently selected shapes
  */
  clearSelectedShapes() {
    this.selectedShapes.forEach(shape => shape.selected = false);
    this.selectedShapes = [];
  }
}

export default Canvas;
