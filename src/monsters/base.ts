import { Sprite, emit } from "kontra";
import monster from "../assets/monster-1.svg";

export default class BaseMonster {
  private readonly width = 100;
  private readonly height = 80;
  sprite: Sprite;
  verticalSpeed: number;
  nextMonsterCalled = false;
  monsterLeftScreen = false;

  constructor({ speed, frequency }: { speed: number, frequency: number }) {
    this.verticalSpeed = speed;
    this.nextMonsterLimit = window.gameCanvas.height * frequency;
    this.sprite = this.getSprite();
  }

  getSprite(): Sprite {
    const maxWidth = window.gameCanvas.width - this.width;
    const x = parseInt(Math.random() * maxWidth);
    return Sprite({
      x,
      y: -80,
      width: this.width,
      height: this.height,
      image: this.image(),
    });
  }

  image(): HTMLImageElement {
    const img = new Image(this.width, this.height);
    img.src = monster;
    return img;
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
    if (!this.nextMonsterCalled && this.sprite.y > this.nextMonsterLimit) {
      this.nextMonsterCalled = true;
      emit("callNextMonster");
    }
    if (!this.monsterLeftScreen && this.sprite.y > window.gameCanvas.height) {
      this.monsterLeftScreen = true;
      emit("destroyMonster");
    }
  }
}
