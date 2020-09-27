import "./styles.css";
import Circle from "./Circle";
import Rectangle from "./Rectangle";

import palettes from 'nice-color-palettes';
const currPalette = palettes[Math.floor(Math.random() * (palettes.length - 1))]
const getRandomColor = () => currPalette[Math.floor(Math.random() * (currPalette.length - 1))];

const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

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
    let circle = new Circle(context, getRandomPoint(), getRandomPoint(), 50, getRandomColor());
    shapes.push(circle);
    circle.draw();
});

let createRectangleButton = document.getElementById("createRectangle");
createRectangleButton.addEventListener("click", () => {
    let rectangle = new Rectangle(context, getRandomPoint(), getRandomPoint(), 100, 100, getRandomColor());
    shapes.push(rectangle);
    rectangle.draw();
});