import { Sprite, emit } from "kontra";

export default class BaseMonster {
  sprite: Sprite;
  verticalSpeed: number;

  constructor({ speed }: { speed: number }) {
    this.verticalSpeed = speed;
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
    this.sprite.y += 2 * this.verticalSpeed;
    this.restartWhenOutCanvas();
  }

  restartWhenOutCanvas(): void {
    if (this.sprite.y > window.gameCanvas.height) {
      emit("monsterLeft");
    }
  }
}
