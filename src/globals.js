import $ from "jquery";

import palettes from "nice-color-palettes";
import Canvas from "./Canvas";
import { paletteColors, canvasElement } from "./page";

export const pullRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const canvas = new Canvas(canvasElement);
export const context = canvas.context;

export let palette = pullRandom(palettes);
export const getRandomColor = () => pullRandom(palette);
export const newPalette = () => {
  palette = pullRandom(palettes);
  for (let i = 0; i < palette.length; i++) {
    $('<span class="paletteColor"></span>')
      .on("click", () => canvas.changeBackground(palette[i]))
      .css("background", palette[i])
      .appendTo(paletteColors);
  }
};
newPalette();
