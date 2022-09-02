import { init, initKeys, initPointer } from "kontra";
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
  initPointer();
  return canvas;
}

function createCanvas() {
  const container = document.getElementById("game");
  if (isPortrait()) {
    container.parentNode.classList.add("full");
  }
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", container.offsetWidth);
  canvas.setAttribute("height", container.offsetHeight);
  container.appendChild(canvas);
  return canvas;
}

function isPortrait() {
  return (
    document.documentElement.clientHeight > document.documentElement.clientWidth
  );
}

window.gameCanvas = initCanvas();

const app = new App();
app.init();
