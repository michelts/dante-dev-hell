import { init, initKeys } from "kontra";
import App from "./app";

declare global {
  interface Window {
    gameCanvas: HTMLCanvasElement;
  }
}

function initCanvas() {
  const { canvas } = init();
  initKeys();
  return canvas;
}

window.gameCanvas = initCanvas();

const app = new App();
app.init();
