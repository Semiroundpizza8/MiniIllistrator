import palettes from 'nice-color-palettes';
import Canvas from './Canvas';
import {
    paletteColorNodes,
    canvasElement
} from './page';

export const pullRandom = arr => arr[Math.floor(Math.random() * (arr.length))]

export let palette = pullRandom(palettes);
export const getRandomColor = () => pullRandom(palette);
export const newPalette = () => {
    palette = pullRandom(palettes);
    for(let i =0; i<paletteColorNodes.length; i++) {
        paletteColorNodes[i].style.background = palette[i];
    }    
} 
newPalette();

export const canvas = new Canvas(canvasElement);
export const context = canvas.context;