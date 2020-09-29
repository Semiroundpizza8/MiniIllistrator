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
    newShape.id = this.generateShapeId(newShape.type);
    this.shapes.push(newShape);
    newShape.draw();
  }

  removeShape(shape) {
    shape.removeEditor();
    this.shapes = this.shapes.filter((currShape) => currShape.id !== shape.id);
    this.selectedShapes = this.selectedShapes.filter(
      (currShape) => currShape.id !== shape.id
    );
    this.redrawCanvas();
  }

  /*
    Generates a unique ID for a shape.
    returns: unique intiger
    */
  generateShapeId(shapeType) {
    return `${shapeType}-${++this.shapeIdCount}`;
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
  Selects a passed in shape and adds it to list of selected shapes
  */
  selectShape(shape) {
    shape.addEditor();
    shape.selected = true;
    this.selectedShapes.push(shape);
  }

  /*
  Deselects passed in shape and removes it from list of selected shapes
  */
  deselectShape(shape) {
    shape.removeEditor();
    shape.selected = false;
    this.selectedShapes = this.selectedShapes.filter(
      (selectedShapes) => selectedShapes.id !== shape.id
    );
  }

  /*
  Clears all currently selected shapes
  */
  clearSelectedShapes() {
    this.selectedShapes.forEach((shape) => this.deselectShape(shape));
  }
}

export default Canvas;
