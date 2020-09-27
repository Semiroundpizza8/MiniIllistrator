import "./styles.css";
import Circle from "./shapes/Circle";
import Rectangle from "./shapes/Rectangle";
import {
    canvas,
} from './globals'

const getRandomPoint = (...args) => {
    // Decide params based on arguments (for convenience)
    let min = 0;
    let max = canvas.width;
    if(args.length === 1) [max] = args;
    else if(args.length > 1)[min, max] = args;

    // Grab random point between min and max
    return Math.floor( min + (Math.random() * (max - min)));
}

let shapes = [];

// Add functionality to CreateCircle
let createCircleButton = document.getElementById("createCircle");
createCircleButton.addEventListener("click", () => {
    let circle = new Circle(getRandomPoint(), getRandomPoint(), 50);
    shapes.push(circle);
    circle.draw();
});

let createRectangleButton = document.getElementById("createRectangle");
createRectangleButton.addEventListener("click", () => {
    let rectangle = new Rectangle(getRandomPoint(), getRandomPoint(), 100, 100);
    shapes.push(rectangle);
    rectangle.draw();
});