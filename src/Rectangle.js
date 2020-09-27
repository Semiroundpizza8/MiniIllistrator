export default class Rectangle {

    constructor(context, x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color || 'rgb(200, 0, 0)';
        this.context = context;
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}