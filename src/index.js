import "./styles.css";
import Circle from "./shapes/Circle";
import Rectangle from "./shapes/Rectangle";
import {
    canvas, newPalette,
} from './globals';
import {
    createCircleButton,
    createRectangleButton,
    clearCanvasButton,
    swapPaletteButton
} from './page';

createCircleButton.addEventListener("click", () => {
    let circleLocation = canvas.getRandomPoint();
    let circle = new Circle(circleLocation.x, circleLocation.y, 50);
    canvas.addShape(circle);
});

createRectangleButton.addEventListener("click", () => {
    let rectangleLocation = canvas.getRandomPoint();
    let rectangle = new Rectangle(rectangleLocation.x, rectangleLocation.y, 100, 100);
    canvas.addShape(rectangle);
});

clearCanvasButton.addEventListener("click", () => canvas.clearCanvas());
swapPaletteButton.addEventListener("click", () => newPalette());