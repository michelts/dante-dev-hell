import { Sprite, emit } from "kontra";
import monster from "../assets/monster.svg";

export default class BaseMonster {
  sprite: Sprite;
  verticalSpeed: number;

  constructor({ speed }: { speed: number }) {
    this.verticalSpeed = speed;
    this.sprite = this.getSprite();
  }

  getSprite(): Sprite {
    return Sprite({
      x: 100,
      y: -80,
      width: 30,
      height: 30,
      image: this.image(),
    });
  }

  image(): HTMLImageElement {
    const img = new Image(30, 30);
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
    if (this.sprite.y > window.gameCanvas.height) {
      emit("monsterLeft");
    }
  }
}
