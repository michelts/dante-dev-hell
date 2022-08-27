import { Sprite } from "kontra";

export default class GameOverSplash {
  sprite: Sprite;

  constructor() {
    this.sprite = Sprite({
      x: 0,
      y: 0,
      width: window.gameCanvas.width,
      height: window.gameCanvas.height,
      color: "red",
    });
  }

  render(): void {
    this.sprite.render();
  }
}
