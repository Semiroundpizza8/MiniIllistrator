import "./styles.css";
import Circle from "./Circle";

const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

// context.fillStyle = 'rgb(200, 0, 0)';
// context.fillRect(10, 10, 50, 50);

// context.fillStyle = 'rgba(0, 0, 200, 0.5)';
// context.fillRect(30, 30, 50, 50);

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
    let circle = new Circle(context, getRandomPoint(), getRandomPoint(), 50);
    shapes.push(circle);
    circle.draw();
});

console.log("hello world!");