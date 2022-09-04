import { Sprite } from "kontra";
import { Language } from "./types";

const COLORS = {
  [Language.Python]: "green",
  [Language.Ruby]: "red",
  [Language.Javascript]: "blue",
};

export default class Background {
  constructor(language: Language) {
    this.sprite = Sprite({
      x: 0,
      y: -1 * window.gameCanvas.height,
      width: window.gameCanvas.width,
      height: window.gameCanvas.height * 2,
      color: COLORS[language],
      render: function () {
        renderShadow(this.context);
      },
      dy: 4,
    });
  }

  render(): void {
    this.sprite.render();
  }

  update(): void {
    this.sprite.update();
    if (this.sprite.y >= 0) {
      this.sprite.y = -1 * window.gameCanvas.height;
    }
  }
}

function renderShadow(ctx) {
  const width = 80;
  const height = 300;
  const xScale = window.gameCanvas.width / width;
  const yScale = window.gameCanvas.height / height;
  ctx.scale(xScale, yScale);

  const path = new Path2D(
    "m 0,2.3e-4 v 300 h 22.456648 c 54.700501,-159.09789 -53.017428,-147.98695 0,-300 z"
  );
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fill(path);

  ctx.beginPath();
  ctx.ellipse(100, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
  ctx.fill();

  ctx.translate(0, 300);
  ctx.fill(path);

  ctx.beginPath();
  ctx.ellipse(100, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
  ctx.fill();
}
