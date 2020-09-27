import "./styles.css";
import Circle from "./shapes/Circle";
import Rectangle from "./shapes/Rectangle";
import {
    canvas,
} from './globals'

// Add functionality to CreateCircle
let createCircleButton = document.getElementById("createCircle");
createCircleButton.addEventListener("click", () => {
    let circleLocation = canvas.getRandomPoint();
    let circle = new Circle(circleLocation.x, circleLocation.y, 50);
    canvas.addShape(circle);
});

let createRectangleButton = document.getElementById("createRectangle");
createRectangleButton.addEventListener("click", () => {
    let rectangleLocation = canvas.getRandomPoint();
    let rectangle = new Rectangle(rectangleLocation.x, rectangleLocation.y, 100, 100);
    canvas.addShape(rectangle);
});