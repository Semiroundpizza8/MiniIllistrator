import palettes from 'nice-color-palettes';

const pullRandom = arr => arr[Math.floor(Math.random() * (arr.length - 1))]

const palette = pullRandom(palettes)
const getRandomColor = () => pullRandom(palette);

const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

export {
    canvas,
    context,
    palette,
    getRandomColor
}