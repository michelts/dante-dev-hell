import { Sprite } from "kontra";

export default class StandBySplash {
  sprite: Sprite;

  constructor() {
    this.sprite = Sprite({
      x: 0,
      y: 0,
      width: window.gameCanvas.width,
      height: window.gameCanvas.height,
      color: "blue",
    });
  }

  render(): void {
    this.sprite.render();
  }
}
