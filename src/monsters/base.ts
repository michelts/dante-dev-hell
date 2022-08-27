import { Sprite, emit } from "kontra";

export default class BaseMonster {
  sprite: Sprite;

  constructor() {
    this.sprite = this.getSprite();
  }

  getSprite(): Sprite {
    throw new Error("Not Implemented Yet");
  }

  render(): void {
    this.sprite.render();
  }

  fall(): void {
    this.sprite.update();
    this.restartWhenOutCanvas();
  }

  restartWhenOutCanvas(): void {
    if (this.sprite.y > window.gameCanvas.height) {
      emit("monsterLeft");
    }
  }
}
