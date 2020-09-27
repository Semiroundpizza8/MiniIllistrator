import palettes from 'nice-color-palettes';
import Canvas from './Canvas';

const pullRandom = arr => arr[Math.floor(Math.random() * (arr.length - 1))]

const palette = pullRandom(palettes)
const getRandomColor = () => pullRandom(palette);

const canvas = new Canvas("canvas");
const context = canvas.context;


export {
    canvas,
    context,
    palette,
    getRandomColor
}