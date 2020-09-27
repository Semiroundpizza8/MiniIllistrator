export default class Circle {

    constructor(context, x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color || 'rgb(200, 0, 0)';
        this.context = context;
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 360);
        this.context.fill();
    }
}