import palettes from 'nice-color-palettes';
import Canvas from './Canvas';
import {
    paletteColorNodes
} from './page';

export const pullRandom = arr => arr[Math.floor(Math.random() * (arr.length - 1))]

export let palette = pullRandom(palettes);
export const getRandomColor = () => pullRandom(palette);
export const newPalette = () => {
    palette = pullRandom(palettes);
    for(let i =0; i<paletteColorNodes.length; i++) {
        paletteColorNodes[i].style.background = palette[i];
    }    
} 
newPalette();

export const canvas = new Canvas("canvas");
export const context = canvas.context;