import { init, initKeys } from "kontra";
import App from "./app";

declare global {
  interface Window {
    gameCanvas: HTMLCanvasElement;
  }
}

function initCanvas() {
  const canvas = createCanvas();
  init(canvas);
  initKeys();
  return canvas;
}

function createCanvas() {
  const container = document.getElementById("game");
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", container.offsetWidth);
  canvas.setAttribute("height", container.offsetHeight);
  container.appendChild(canvas);
  return canvas;
}

window.gameCanvas = initCanvas();

const app = new App();
app.init();
