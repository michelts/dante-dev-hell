import { init, initKeys, initPointer } from "kontra";
import App from "./app";
import FlashLib from "./flash";
import "./style.scss";

declare global {
  interface Window {
    gameCanvas: HTMLCanvasElement;
    flashLib: FlashLib;
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
  const container = document.getElementById("game") as HTMLElement;
  if (isPortrait()) {
    (container.parentNode as HTMLElement).classList.add("full");
  }
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", String(container.offsetWidth));
  canvas.setAttribute("height", String(container.offsetHeight));
  container.appendChild(canvas);
  return canvas;
}

function isPortrait() {
  return (
    document.documentElement.clientHeight > document.documentElement.clientWidth
  );
}

window.gameCanvas = initCanvas();
window.flashLib = new FlashLib();

const app = new App();
app.init();
