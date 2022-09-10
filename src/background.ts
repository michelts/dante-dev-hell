import { Sprite } from "kontra";
import { Language } from "./types";

const COLORS = {
  [Language.Python]: "#4B8BBE",
  [Language.Javascript]: "#323330",
  [Language.Ruby]: "#820C02",
  [Language.PHP]: "#6c7eb7",
  [Language.Pascal]: "#f7931e",
  [Language.Julia]: "#4d64ae",
  [Language.Java]: "#ec2024",
  [Language.Go]: "#00acd7",
  [Language.Typescript]: "#3178c6",
  [Language.Dart]: "#00d2b8",
  [Language.Kotlin]: "#c757bc",
  [Language.Swift]: "#f05138",
  [Language.C]: "#6a7582",
  [Language.Malbolge]: "#b50500",
  [Language.HolyC]: "#c37c2e",
  [Language.Assembly]: "#721481",
  [Language.COBOL]: "#01325a",
};

export default class Background {
  background: Sprite;
  shadow: Sprite;

  constructor(language: Language) {
    this.background = Sprite({
      x: 0,
      y: 0,
      width: window.gameCanvas.width,
      height: window.gameCanvas.height,
      color: COLORS[language],
    });
    this.shadow = Sprite({
      x: 0,
      y: -1 * window.gameCanvas.height,
      width: window.gameCanvas.width,
      height: window.gameCanvas.height * 2,
      render: function () {
        renderShadow(this.context);
      },
      dy: 4,
    });
  }

  render(): void {
    this.background.render();
    this.shadow.render();
  }

  update(): void {
    this.shadow.update();
    if (this.shadow.y >= 0) {
      this.shadow.y = -1 * window.gameCanvas.height;
    }
  }
}

function renderShadow(ctx: CanvasRenderingContext2D) {
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
