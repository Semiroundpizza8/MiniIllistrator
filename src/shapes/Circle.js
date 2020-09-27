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
        let hover = true;
        let selected = true;

        // Add Outline
        context.fillStyle = 'rgba(0, 0, 150, .5)';
        context.strokeStyle = 'rgba(255, 255, 0)';
        context.beginPath();
        context.arc(this.x, this.y, this.radius + 10, 0, 360);
        context.lineWidth = 8;
        if(hover === true) context.fill();
        if(selected === true) context.stroke();

        // drawShape
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 360);
        context.fill();
    }
}