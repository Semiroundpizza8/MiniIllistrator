class Canvas {

    constructor(id) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.dimensions = {
            width: this.canvas.width,
            height: this.canvas.height
        };
        this.shapes = [];
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
            y: randomY
        };
    }

    /*
    Adds a random shape to the canvas, adding it to our current shapes before visualizing it
    */
    addShape(newShape) {
        this.shapes.push(newShape);
        newShape.draw();
    }

    /*
    Erases whats currently on the canvas
    */
    clearCanvas() {
        this.shapes = [];
        this.context.clearRect(0, 0, this.dimensions.width, this.dimensions.height)
    }
}

export default Canvas;