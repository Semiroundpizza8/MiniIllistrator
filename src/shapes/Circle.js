import {
    context,
    getRandomColor
} from '../globals'

export default class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color || getRandomColor();
    }

    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 360);
        context.fill();
    }
}